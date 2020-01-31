angular.module("punnelApp").controller("domainCtrl", ["$scope", "$restful", "popupService", function ($scope, $restful, popupService) {
    $scope.search = function () {
        getDomains();       
    };

    function getDomains() {
        PN_PAGE.dbLoading.show();
        $restful.get("/domain").then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.domains = res.data;
        });
    }

    $scope.delete = function (obj) {
        swal({
            title: "Xóa domain!",
            text: "Bạn chắc muốn xóa domain này?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "\u0110\u1ed3ng \u00fd",
            cancelButtonText: "Kh\u00f4ng x\u00f3a",
            closeOnConfirm: true
        }, function (value) {
            if (value == false) return;
            PN_PAGE.loading.show();
            $restful.delete("/domain", { id: obj.id }).then(function (res) {
                PN_PAGE.loading.hide();
                getDomains();
            });
            });
    }

    $scope.showVerify = function (data) {
        popupService.show('domainVerify.html', { data: data }, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.data = data;
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                PN_PAGE.btnLoading.show();
                $restful.put("/domain", $scope.data).then(function (res) {
                    PN_PAGE.btnLoading.hide();
                    PN_PAGE.showMessage('Xác thực domain thành công!');
                    $scope.hide();
                });
            };
        }], function () {
            getDomains();
        });
    }

    $scope.showAdd = function () {
        popupService.show('addDomain.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.title = 'Thêm tên miền(domain) mới';
            $scope.label = 'Domain hoặc SubDomain'
            $scope.info = 'ví dụ domain: nhadat.vn hoặc subdomain: duan.nhadat.com';
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                PN_PAGE.loading.show();
                PN_PAGE.btnLoading.show();
                var data = { id: $scope.name };
                $restful.post("/domain", data).then(function (res) {
                    PN_PAGE.loading.hide();
                    $scope.hide();
                });
            };
        }], function () {
            getDomains();
        });
    }
}]);