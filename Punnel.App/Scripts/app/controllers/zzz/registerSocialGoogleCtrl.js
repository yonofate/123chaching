angular.module("punnelApp").controller("registerSocialGoogleCtrl", ["$state", "$scope", "$translate", "$stateParams", "$window", "$rootScope", "$auth", "$restful", "$ladiService", function ($state, $scope, $translate, $stateParams, $window, $rootScope, $auth, $restful, $ladiService) {
    if (interval) {
        clearInterval(interval);
    }
    if (PN_PAGE.useIntercom === 1) {
        Intercom("shutdown");
        var event = {
            app_id: "pvof7mzc",
            source: "web punnel"
        };
    }
    Intercom("boot", event);
    var k = location.host;
    if (-1 == k.search("#")) {
        k.replace("host", k + "/#");
        window.location.href = k;
    }
    $scope.user = "false";
    $scope.name = "";
    $scope.email = "";
    $scope.phone = "";
    $scope.password = "";
    if ($stateParams.code && $stateParams.code.length > 0) {
        $restful.get("/auth/OAuth2Google", {
            code: $stateParams.code
        }, function (err, result) {
            console.log("r: ", result);
            console.log("e: ", err);
        });
    } else {
        $state.go("auth.register");
    }
    $scope.updateRegisterGoogle = function () {
        if ($scope.checkval) {
            $restful.put("/user/me", {
                full_name: $scope.name,
                phone: $scope.phone,
                password: $scope.password
            }, function (err, result) {
                if (result && 200 == result.code) {
                    PN_PAGE.account.full_name = $scope.name;
                    PN_PAGE.account.phone = $scope.phone;
                    $state.go("dashboard.main");
                } else {
                    if (result) {
                        PN_PAGE.messageLadi(result.messager);
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                }
            });
        } else {
            PN_PAGE.messageLadi("Vui l\u00f2ng \u0111i\u1ec1n \u0111\u1ea7y \u0111\u1ee7 th\u00f4ng tin ho\u1eb7c th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
        }
    };
    $scope.registerFacebook = function () {
    };
    $scope.checkval = function () {
        return $scope.name && $scope.phone && $scope.password ? true : false;
    };
}]);
