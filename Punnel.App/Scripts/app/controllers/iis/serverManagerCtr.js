angular.module("punnelApp").controller("serverManagerCtr", ["$scope", "$restful", function ($scope, $restful) {
    $scope.sites = [];
    $scope.initSites = function () {
        PN_PAGE.dbLoading.show();
        $restful.get("/cloudserver", {}).then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.sites = res.data;
        });
    }

    $scope.remove = function (id) {
        swal({
            title: "Chú ý",
            type: "warning",
            text: "Bạn có chắc chắn xoá?",
            showCancelButton: !0,
            confirmButtonColor: "#d9534f",
            confirmButtonText: "Xóa",
            cancelButtonText: "Không",
            closeOnConfirm: !0
        }, function (ok) {
            if (ok) {
                $(".parLoading").show();
                $restful.delete("/cloudserver", {
                    id: id
                }).then(function (res) {
                    $(".parLoading").hide();
                    $scope.initSites();
                });
            }
        });
    }
}]);