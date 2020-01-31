angular.module("punnelApp").controller("invoiceManagerCtrl", ["$scope", "$restful", "$auth", "$filter", "notificationSvc", "notifyUserService", function ($scope, $restful, $auth, $filter, notificationSvc, notifyUserService) {

    $scope.query = {
        limit: 20,
        page: 1,
        keyword: '',
        fromdate: null,
        todate: null,
        datetype: 2,
        serviceid: null,
        paymenttype: null
    };

    $scope.isAdmin = $auth.isAdmin();

    $scope.serviceOptions = profile_level_filter;
    $scope.dateTypeOptions = [{ i: 1, n: 'Ngày thanh toán' }, { i: 2, n: 'Ngày mua' }];

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
        getInvoices();
    };

    $scope.pageChanged = function () {
        getInvoices();
    }

    $scope.$watch("wdate.dateRange", function (newValue, oldValue) {
        $scope.query.fromDate = $scope.wdate.dateRange.startDate;
        $scope.query.toDate = $scope.wdate.dateRange.endDate;
    });

    function getInvoices() {
        PN_PAGE.dbLoading.show();
        $restful.post("/invoice/list", $scope.query).then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.invoices = res.data.data;
            $scope.total = res.data.total;
        });       
    }

    $scope.serviceDisplay = function (id) {
        if (id == 0) return '---';
        return profile_level[id].n;
    }

    $scope.paid = function (item) {
        $restful.post("/invoice/paid", { code: item.code }).then(function (res) {
            PN_PAGE.showMessage("Đã cập nhật thanh toán!");
            $filter('filter')($scope.invoices, function (d) { return d.code === item.code; })[0].status = 1;
            notificationSvc.sendCmd(data.id, 'UPGRADE');
            notifyUserService.sendNotifyToUser(data.id, "Thông báo!", "Bạn đã thanh toán thành công phí dịch vụ Punnel. Cảm ơn & chúc bạn thành công!", "", function (r) { });
        });
    }

    $scope.delete = function (item) {
        swal({
            title: "Xóa hóa đơn " + item.code,
            text: "Bạn chắc chắn xóa hóa đơn này?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "\u0110\u1ed3ng \u00fd",
            cancelButtonText: "Kh\u00f4ng x\u00f3a",
            closeOnConfirm: true
        }, function (ok) {
            if (ok == true) {
                PN_PAGE.dbLoading.show();
                $restful.delete("/invoice", { code: item.code }).then(function (res) {
                    PN_PAGE.dbLoading.hide();
                    PN_PAGE.showMessage("Đã xóa!");
                    getInvoices();
                    return;
                });
            }
        });
    }
}]);