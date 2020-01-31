angular.module("punnelApp").controller("newpasswordCtr", ["$state", "$scope", "$timeout", "$stateParams", "$auth", "$restful", function ($state, $scope, $timeout, $stateParams, $auth, $restful) {
    if (interval) {
        clearInterval(interval);
    }
    if (PN_PAGE.useIntercom === 1) {
        Intercom("shutdown");
        var event = {
            app_id: "pvof7mzc",
            source: "web punnel"
        };
        Intercom("boot", event);
    }
    if (!$stateParams.keycode) {
        $state.go("auth.login");
    }
    $scope.getKeyDown = function (key) {
        if (13 == key.keyCode) {
            $scope.submit(key);
        }
    };
    $scope.submit = function (data) {
        $(data.target).attr("disabled", "true");
        $(data.target).attr("value", "Vui l\u00f2ng \u0111\u1ee3i...");
        if ($scope.formSubmit.$valid) {
            if ($scope.pass == $scope.repass) {
                $restful.post("/account/update-password", {
                    code: $stateParams.keycode,
                    password: $scope.pass
                }, function (err, result) {
                    $(data.target).removeAttr("disabled");
                    $(data.target).attr("value", "T\u1ea1o m\u1eadt kh\u1ea9u m\u1edbi");
                    if (result && 200 == result.code) {
                        PN_PAGE.messageLadi("Thay \u0111\u1ed5i m\u1eadt kh\u1ea9u th\u00e0nh c\u00f4ng!");
                        setTimeout(function () {
                            $state.go("auth.login");
                        }, 3e3);
                    } else {
                        if (result) {
                            PN_PAGE.messageLadi(result.messager);
                        } else {
                            PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra l\u1ea1i k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                        }
                    }
                });
            } else {
                $(data.target).removeAttr("disabled");
                $(data.target).attr("value", "T\u1ea1o m\u1eadt kh\u1ea9u m\u1edbi");
                PN_PAGE.messageLadi("N\u1ed9i dung hai \u00f4 nh\u1eadp ph\u1ea3i tr\u00f9ng nhau");
            }
        } else {
            $(data.target).removeAttr("disabled");
            $(data.target).attr("value", "T\u1ea1o m\u1eadt kh\u1ea9u m\u1edbi");
            PN_PAGE.messageLadi("Vui l\u00f2ng \u0111i\u1ec1n \u0111\u1ea7y \u0111\u1ee7 th\u00f4ng tin");
        }
    };
}]);
