angular.module("punnelApp").controller("landingpageCtr", ["$scope", "$timeout", "APP_CONFIG", "$localStorage", "$restful", "$state", function ($scope, $timeout, APP_CONFIG, $localStorage, $restful, $state) {
    function getServerRecoveryCode() {
        $restful.get("/landingpage/findbyuser", function (b, result) {
            if (result && result.data && 200 == result.code) {
                $scope.data = result.data;
                if (result.data.length < 9) {
                    $scope.checkLoad = false;
                }
            }
        });
    }
    if (interval) {
        clearInterval(interval);
    }
    $scope.start = 1;
    $scope.checkLoad = true;
    getServerRecoveryCode();
    $scope.createNewLandingpage = function () {
        $state.go("main.newLandingpage");
    };
    $scope.clone = function (template) {
        $restful.post("/landingpage", {
            name: "Untitle",
            templateid: template
        }, function (a, err) {
            if (err && err.data && 200 == err.code) {
                $state.go("editor", {
                    id: err.data.id
                });
            } else {
                if (err) {
                    PN_PAGE.messageLadi(err.messager);
                } else {
                    PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                }
            }
        });
    };
    $scope.editLandingpage = function (id) {
        $state.go("editor", {
            id: id
        });
    };
    $scope.loadMore = function () {
        if ($scope.checkLoad) {
            $scope.start++;
            $restful.get("/landingpage/findbyuser", {
                limit: 9,
                page: $scope.start
            }, function (b, result) {
                if (result && result.data && 200 == result.code) {
                    var tupleIndex = 0;
                    for (; tupleIndex < result.data.length; tupleIndex++) {
                        $scope.data.push(result.data[tupleIndex]);
                    }
                    if (result.data.length < 9) {
                        $scope.checkLoad = false;
                        $scope.start = 1;
                    }
                }
            });
        }
    };
    $scope.remove = function (id, title) {
        swal({
            title: "X\u00f3a " + title,
            text: "B\u1ea1n s\u1ebd kh\u00f4ng th\u1ec3 ph\u1ee5c h\u1ed3i " + title + " sau khi x\u00f3a",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "\u0110\u1ed3ng \u00fd",
            cancelButtonText: "Kh\u00f4ng x\u00f3a",
            closeOnConfirm: false
        }, function () {
            $restful.put("/landingpage/delete", {
                id: id
            }).then(function (result) {
                swal("\u0110\u00e3 x\u00f3a!", "", "success");
                getServerRecoveryCode();
            });
        });
    };
}]);
