angular.module("punnelApp").controller("promotionManagerCtrl", ["$scope", "$restful", "$auth", "$state", "$filter", "popupService", "authService", "notificationSvc", function ($scope, $restful, $auth, $state, $filter, popupService, authService, notificationSvc) {

    $scope.query = {
        limit: 20,
        page:1,
        keyword: '',
        fromdate: null,
        todate: null,
        datetype: 1,
        serviceid:null
    }

    $scope.isAdmin = $auth.isAdmin();

    $scope.serviceOptions = profile_level_filter;
    $scope.dateTypeOptions = [{ i: 1, n: 'Ngày hiệu lực' }, { i: 2, n: 'Ngày hết hạn' }];

    $scope.wdate = {
        dateRange: { startDate: moment().subtract(30, 'days'), endDate: moment() }
    }
    $scope.maxDate = moment().format("YYYY-MM-DD");
    $scope.options = PN_PAGE.dateRangeOption;
    $scope.$watch("wdate.dateRange", function (newValue, oldValue) {
        $scope.query.fromdate = $scope.wdate.dateRange.startDate;
        $scope.query.todate = $scope.wdate.dateRange.endDate;
        $scope.search();
    });

    $scope.search = function () {
        $scope.query.page = 1;
        getList();
    };

    $scope.pageChanged = function () {
        getList();
    }

    $scope.$watch("wdate.dateRange", function (newValue, oldValue) {
        $scope.query.fromDate = $scope.wdate.dateRange.startDate;
        $scope.query.toDate = $scope.wdate.dateRange.endDate;
    });

    function getList() {
        PN_PAGE.dbLoading.show();
        $restful.get("/promotion", $scope.query).then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.list = res.data.data;
            $scope.total = res.data.total;
        });       
    }

    $scope.serviceDisplay = function (id) {
        if (id == 0) return '---';
        return profile_level[id].n;
    }

    $scope.detail = function (data) {
        popupService.show('promotionDetail.html', { data: data }, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.serviceOptions = profile_level;
            if (data && data != null) {
                $scope.data = data;
            }
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function (r) {
                $mdDialog.hide(r);
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                PN_PAGE.btnLoading.show();
                PN_PAGE.loading.show();
                $restful.post("/promotion", $scope.data).then(function (res) {
                    PN_PAGE.loading.hide();
                    PN_PAGE.showMessage("Đã cập nhật");
                    $scope.hide(1);
                });
            };
        }], function (res) {
            if (res == 1) {
                getList();
            }
        });
    }


    $scope.code = function (promotionId) {
        $state.go("dashboard.promotioncodemanager", {
            id: promotionId,
        }, "_top");
    }
}]);