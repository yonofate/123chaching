angular.module("punnelApp").controller("loginCtrl", ["$state", "$scope", "$translate", "$stateParams", "$window", "$rootScope", "$auth", "$restful", "$ladiService", "authService", function ($state, $scope, $translate, $stateParams, $window, $rootScope, $auth, $restful, $ladiService, authService) {
    if (interval) {
        clearInterval(interval);
    }
    if (PN_PAGE.useIntercom === 1) {
        Intercom("shutdown");
        var data_intercom = {
            app_id: "pvof7mzc",
            source: "web punnel"
        };
        Intercom("boot", data_intercom);
    }
    $translate.use(localStorage.getItem("lang"));
    $scope.email = "";
    $scope.pass = "";
    if ($auth.getToken()) {
        if ($stateParams.idLa && $stateParams.idLa.length > 0) {
            $restful.get("/user", {}, function (b, result) {
                if (result && 200 == result.code) {
                    try {
                        //switch (parseFloat(result.data.me.type)) {
                        //    case 0:
                        //        fbq("track", "UserFree");
                        //        break;
                        //    case 1:
                        //        fbq("track", "UserTrial");
                        //        fbq("track", "Purchase");
                        //        break;
                        //    case 2:
                        //        fbq("track", "UserPremium");
                        //        fbq("track", "Purchase");
                        //        break;
                        //    case 3:
                        //        fbq("track", "UserAgency");
                        //        fbq("track", "Purchase");
                        //}
                    } catch (err) {
                    } finally {
                        $state.go("using-themes", {
                            idLa: $stateParams.idLa
                        });
                    }
                } else {
                    PN_PAGE.messageLadi("Vui l\u00f2ng t\u1ea3i l\u1ea1i trang v\u00e0 th\u1eed l\u1ea1i!\n Ho\u1eb7c li\u00ean h\u1ec7 Livechat \u0111\u1ec3 \u0111\u01b0\u1ee3c h\u1ed7 tr\u1ee3!");
                }
            });
        } else {
            $state.go("dashboard.main", {}, {
                reload: true
            });
        }
    }
    $scope.submit = function (data) {
        if ("cntt510@gmail.com" == $scope.email || "tataxa206@gmail.com" == $scope.email || "maipham.ltu@gmail.com" == $scope.email || "haat2608@gmail.com" == $scope.email || "dat.tmd@gmail.com" == $scope.email) {
            $scope.functionSubmit();
        } else {
            $scope.functionSubmit();
        }
    };

    $scope.functionSubmit = function () {
        if ($scope.FormLogIn.$valid) {
            var c = $(".signup .btn-dang-nhap");
            c.attr("disabled", "true");
            c.attr("value", "Vui l\u00f2ng \u0111\u1ee3i...");

            var loginData = {
                "userName": $scope.email,
                "password": $scope.pass,
                "grant_type": "password"
            };

            authService.login(loginData).then(function (res) {
                var data = {
                    user: {
                        id: res.userName,
                        role: res.role || 'member'
                    },
                    token: res.token_type + ' ' + res.access_token
                }
                $auth.setUser(data);
                $restful.get("/user", {}, function (b, result) {
                    if (result && 200 == result.code) {
                        try {

                        } catch (b) {
                        } finally {
                            if ($stateParams.idLa && $stateParams.idLa.length > 0) {
                                console.log("create project");
                                $state.go("using-themes", {
                                    idLa: $stateParams.idLa
                                });
                            } else {
                                console.log("go dashboard");
                                $state.go("dashboard.main");
                            }
                        }
                    }
                });
            },
            function (err) {
             console.log("Err e: " + err.error_description);
             PN_PAGE.messageLadi(err.error_description);
             c.removeAttr("disabled");
             c.attr("value", "\u0110\u0103ng nh\u1eadp");
            });
        }
    };

    $scope.getKeyDown = function (key) {
        var c = key.which || key.keyCode;
        if (13 === c) {
            $scope.functionSubmit();
        }
    };
    $scope.goRecover = function () {
        $state.go("auth.forgot_password");
    };
    $scope.goRegister = function () {
        $state.go("auth.register", {
            idLa: $stateParams.idLa
        });
    };
    $scope.changeLang = function (lang) {
        localStorage.setItem("lang", lang);
        $translate.use(localStorage.getItem("lang"));
    };
}]);
