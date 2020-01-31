angular.module("punnelApp").controller("promotionCodeManagerCtrl", ["$scope", "$restful", "$auth", "$state", "$stateParams", "$filter", "popupService", "authService", "notificationSvc", function ($scope, $restful, $auth, $state, $stateParams, $filter, popupService, authService, notificationSvc) {

    $scope.query = {
        limit: 20,
        page:1,
        keyword: '',
        fromdate: null,
        todate: null,
        datetype: 1,
        promotionid:null
    }

    $scope.query.promotionid = $stateParams.id;

    $scope.isAdmin = $auth.isAdmin();

    $scope.serviceOptions = profile_level_filter;
    $scope.dateTypeOptions = [{ i: 1, n: 'Ngày hiệu lực' }, { i: 2, n: 'Ngày hết hạn' }];

    //$scope.wdate = {
    //    dateRange: { startDate: moment().subtract(30, 'days'), endDate: moment() }
    //}
    //$scope.maxDate = moment().format("YYYY-MM-DD");
    //$scope.options = PN_PAGE.dateRangeOption;
    //$scope.$watch("wdate.dateRange", function (newValue, oldValue) {
    //    $scope.query.fromdate = $scope.wdate.dateRange.startDate;
    //    $scope.query.todate = $scope.wdate.dateRange.endDate;
    //    $scope.search();
    //});

    $scope.search = function () {
        $scope.query.page = 1;
        getList();
    };

    $scope.pageChanged = function () {
        getList();
    }

    //$scope.$watch("wdate.dateRange", function (newValue, oldValue) {
    //    $scope.query.fromDate = $scope.wdate.dateRange.startDate;
    //    $scope.query.toDate = $scope.wdate.dateRange.endDate;
    //});

    function getList() {
        PN_PAGE.dbLoading.show();
        $restful.get("/promotioncode", $scope.query).then(function (res) {
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
        popupService.show('promotionCodeDetail.html', { data: data }, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
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

            $scope.init = function () {
                PN_PAGE.dbLoading.show();
                $restful.get("/report/promotion-options").then(function (res) {
                    PN_PAGE.dbLoading.hide();
                    $scope.promotions = res.data;
                });   
            }

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                PN_PAGE.btnLoading.show();
                PN_PAGE.loading.show();
                $restful.post("/promotioncode", $scope.data).then(function (res) {
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

    
}]);