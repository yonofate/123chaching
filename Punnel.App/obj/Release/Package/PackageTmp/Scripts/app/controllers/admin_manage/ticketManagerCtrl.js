angular.module("punnelApp").controller("ticketManagerCtrl", ["$scope", "$restful", "$filter", "$stateParams", "$location", "popupService", "$q", function ($scope, $restful, $filter, $stateParams, $location, popupService, $q) {
    $scope.query = {
        keyword: '',
        page: 1,
        limit: 12,
        status: null
    }

    $scope.condition = {
        statusOptions: [{ i: null, n: 'Tất cả' }, { i: 1, n: 'Mới' }, { i: 2, n: 'Đang xử lý' }, { i: 3, n: 'Đã xử lý' }, { i: 3, n: 'Đã đóng' }],
        changed: function () {
            $scope.search();
        }
    }

    $scope.totalItem = 0;

    $scope.pageChanged = function () {
        getTickets();
    }

    $scope.search = function () {
        $scope.query.page = 1;
        getTickets();
    };


    $scope.delete = function (id) {
        swal({
            title: "Xóa ticket!",
            text: "Bạn chắc muốn xóa?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "\u0110\u1ed3ng \u00fd",
            cancelButtonText: "Kh\u00f4ng x\u00f3a",
            closeOnConfirm: true
        }, function (value) {
            if (value == true) {
                PN_PAGE.loading.show();
                var data = {
                    id: id
                }
                $restful.delete("/ticket", data).then(function (res) {
                    PN_PAGE.loading.hide();
                    getTickets();
                    return;
                });
            }
        });
    }

    function getTickets() {
        $scope.tickets = [];
        PN_PAGE.dbLoading.show();
        $restful.get("/ticket", $scope.query).then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.totalItem = res.data.total;
            $scope.tickets = res.data.data;
        });
    }

    $scope.showAddNote = function (data) {
        popupService.show('addNote.html', { data: data }, ['$scope', '$mdDialog', function ($scope, $mdDialog) {
            $scope.title = 'Ghi chú'
            $scope.label = 'Nội dung';
            $scope.note = data.note;

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.hide = function (res) {
                $mdDialog.hide(res);
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                PN_PAGE.btnLoading.show();
                $restful.put("/ticket", {
                    id: data.id,
                    status: data.status,
                    note: $scope.note
                }).then(function (result) {
                    PN_PAGE.btnLoading.hide();
                    $scope.hide($scope.note);
                });
            };
        }], function (res) {
            $filter('filter')($scope.tickets, function (d) { return d.id === data.id; })[0].note = res;
            data.note = res;
        });
    }
}]);