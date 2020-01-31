angular.module("punnelApp").controller("notificationCtr", ["$rootScope", "$state", "$auth", "$restful", "$scope", "APP_CONFIG", "popupService", "notificationSvc", function ($rootScope, $state, $auth, $restful, $scope, APP_CONFIG, popupService, notificationSvc) {
    function addNotification(data) {
        var obj = jQuery.parseJSON(data);
        //obj.d = toLocalTime(obj.d);
        obj.l = buildLink(obj.l);
        $scope.notify.items.unshift(obj);
        $scope.notify.unViewTotal += 1;
        console.log($scope.notify.unViewTota);
        displayMessage(obj);
    }

    function displayMessage(obj) {
        if (obj.l && obj.l.length > 0 && obj.t!=1) {
            swal({
                title: obj.h,
                type: 'success',
                text: obj.b,
                showCancelButton: false,
                confirmButtonText:
                    'Xem',
                confirmButtonColor: "#DD6B55",
                closeOnConfirm: true
            }, function (ok) {
                if (ok) {
                    $scope.notifySvc.read(obj.i);
                    window.href.location = obj.l;
                }
            });
        } else if (obj.t == 1) {
            swal({
                title: obj.h,
                type: 'success',
                text: obj.b,
                showCancelButton: false,
                confirmButtonText:
                    'Xem',
                confirmButtonColor: "#DD6B55",
                closeOnConfirm: true
            }, function (ok) {
                if (ok) {
                    $scope.notify.gotoDetail(obj);
                }
            });
        }
        else {
            swal({
                type: 'success',
                title: h,
                text: obj.b,
                showConfirmButton: false,
                timer: 2000
            });
        }
        swal(obj.h, obj.b, "success");
    }

    function getNotification() {
        $restful.get("/notification", $scope.squery).then(function (res) {  
            $scope.notify.total = res.data.total;           
            angular.forEach(res.data.items, function (item, index) {
                //item.d = toLocalTime(item.d);
                item.l = buildLink(item);
                $scope.notify.items.push(item);
            });
            if ($scope.squery.start > 0) $('.scroll-body').slimScroll({ scrollBy: '220px' });
            $rootScope.$state = 1;
        });
    }

    function toLocalTime(utcTime) {
        var localTime = moment.utc(utcTime).toDate();
        return moment(localTime);
    }

    function buildLink(item) {
        switch (item.t) {
            case 1:
                return "#";
                break;
            case 2:
                return 'http://' + item.l;
                break;
            default:
                return 'http://' + item.l;
        }

        //if (item.l && item.l.length > 0) return item.l;
        //else if (item.r && item.r.length > 0) {
            
        //}
    }

    function loadProfile() {
        $restful.get("/user", {}).then(function (result) {
            $auth.setProfile(result.data);
            $scope.profile = result.data;
            PN_PAGE.setCookie("last_lg", 1, 1);
        });
    }

    //----------------------------

    $scope.squery = {
        limit: 10,
        start: 0
    }

    $scope.notify = {
        options: { height: '260px' },
        total:0,
        unViewTotal: 0,
        items: [],
        init: function () {
            $scope.squery.start = 0;
            getNotification();
        },
        getNext: function () {
            $scope.squery.start += 1;
            getNotification();
        },
        resetCount: function () {
            var date = moment.utc().valueOf();
            $scope.notifySvc.resetCount(date);
            $scope.notify.unViewTotal = 0;
        },
        gotoDetail: function (item) {
            item.v = true;
            if (item.t == 1) {
                $scope.Lead.showDetail(item.r);
            } else if (item.l && item.l.length > 0) window.location.href = item.l;
            $scope.notifySvc.read(item.i);
        }
    }

    $scope.Lead = {
        showDetail: function (id) {
            popupService.show('leadDetail.html', { id: id }, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
                $scope.lead = {};
                $scope.statusOptions = lead_status;
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };


                $scope.init = function () {
                    PN_PAGE.loading.show();
                    $restful.get("/lead", { lid: id }).then(function (res) {
                        PN_PAGE.loading.hide();
                        $scope.lead = res.data;
                        $scope.moreData = [];
                        if (res.data.jsonData != null && res.data.jsonData.length > 0) $scope.moreData = JSON.parse(res.data.jsonData);
                    });
                }

                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.submit = function () {
                    if ($scope.myForm.$valid == false) return;
                    PN_PAGE.loading.show();
                    PN_PAGE.btnLoading.show();
                    $restful.post("/lead", $scope.lead).then(function (res) {
                        PN_PAGE.loading.hide();
                        $scope.hide();
                    });
                };
            }], function () {
            });
        }
    }

    $scope.notifySvc = notificationSvc;

    $rootScope.$on('eUnView', function (event, data) {
        $scope.notify.unViewTotal = data;
    });
    $rootScope.$on('eSubcrible', function (event, data) {
        addNotification(data);
    });
    $rootScope.$on('eNotifyUrl', function (event, data) {
        addNotification(data);
    });
    $rootScope.$on('eCommand', function (event, data) {
        console.log('cmd' + data);
        if (data == 'PROFILE') {
            loadProfile(data);
            if ($state.current.name == "dashboard.expires") $state.go("dashboard.main");
        }
    });
}]);