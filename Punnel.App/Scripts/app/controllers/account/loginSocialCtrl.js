angular.module("punnelApp").controller("loginSocialCtrl", ["$state", "authService", "$scope", "$translate", "$stateParams", "$window", "$rootScope", "$auth", "$restful", "$ladiService", function ($state, authService, $scope, $translate, $stateParams, $window, $rootScope, $auth, $restful, $ladiService) {
    $(".modal-backdrop").remove();
    if (PN_PAGE.useIntercom === 1) {
        Intercom("shutdown");
        var intercom_data = {
            app_id: "pvof7mzc",
            source: "web punnel"
        };
        Intercom("boot", intercom_data);
    }
    $translate.use(localStorage.getItem("lang"));

    $scope.account = {
        userName: null,
        password: null,
        grant_type: 'password',
        useRefreshTokens:true
    }

    if ($auth.getUser()) {
        $state.go("dashboard.main", {}, {
            reload: true
        });
    }

    $scope.applyTemplate = function (tid) {
        var data = tid;
        popupService.show('addName.html', { data: data }, ['$scope', '$state', '$stateParams', '$mdDialog', function ($scope, $state, $stateParams, $mdDialog) {
            $scope.title = 'Tạo mới landing page';
            $scope.label = 'Đặt tên landing page';
            $scope.name = '';

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.hide = function (res) {
                $mdDialog.hide(res);
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                PN_PAGE.loading.show();
                PN_PAGE.btnLoading.show();
                $restful.post("/landingpage", {
                    name: $scope.name,
                    type: 10,
                    templateid: data
                }).then(function (result) {
                    PN_PAGE.loading.hide();
                    $scope.cancel();
                    $state.go("editor", {
                        id: result.data.id,
                        type: 'p'
                    }, "_top");
                });
            };
        }], function (res) {
        });
    };

    $scope.submit = function () {
        if ($scope.FormLogIn.$valid) {
            PN_PAGE.btnLoading.show();
            authService.login($scope.account).then(function (res) {
                var data = {
                    user_id: res.data.user_id,
                    token: res.data.token_type + ' ' + res.data.access_token,
                    refresh_token: res.data.refresh_token,
                    useRefreshTokens:true
                }
                $auth.setUser(data);
                $restful.get("/user", {}).then(function (result) {
                    if (result.data) {                       
                        $auth.setProfile(result.data);
                        if (result.data.email && result.data.email.length > 0) {
                            if (result.data.isVerifyEmail == false) {
                                $state.go("auth.complete-verifyemail");
                            }
                            else if ($stateParams.tid && $stateParams.tid.length > 0) {
                                $state.go("preview-template", {
                                    id: $stateParams.tid,
                                    type: 'p',
                                    cf: 'themes'
                                });
                            }
                            else if (result.data.count == 0) {
                                $state.go("main.newLandingpage");
                            } else {
                                $state.go("dashboard.main");
                            }
                        } else {
                            $state.go("auth.complete-register");
                        }
                        PN_PAGE.btnLoading.hide();
                    }
                });
            },
            function (err) {
                PN_PAGE.showMessage(err.data.error_description,'error');
             c.removeAttr("disabled");
             c.attr("value", "Đăng nhập");
         });
        }
    };

    $scope.goRecover = function () {
        $state.go("forgot_password");
    };
    $scope.goRegister = function () {
        $state.go("auth.register", {
            tid: $stateParams.tid
        });
    };
    $scope.changeLang = function (lang) {
        localStorage.setItem("lang", lang);
        $translate.use(localStorage.getItem("lang"));
    };

    function LoginExt(provider) {
        var redirectUri = location.protocol + '//' + location.host + '/authcomplete.html';
        var externalProviderUrl = "/" + "api/auth/ExternalLogin?provider=" + provider
                                                                    + "&response_type=token&client_id=" + "ngAuthApp"
                                                                    + "&redirect_uri=" + redirectUri;
        window.$windowScope = $scope;

        var oauthWindow = window.open(externalProviderUrl, "Xác thực tài khoản", "location=0,status=0,width=700,height=600");
    };

    $scope.registerGoogle = function () {
        LoginExt('Google');
    };
    $scope.registerFacebook = function () {
        LoginExt('Facebook');
    };
    $scope.registerZalo = function () {
        LoginExt('Zalo');
    };

    $scope.authCompletedCB = function (fragment) {
        $scope.$apply(function () {
            if (fragment.haslocalaccount == 'False') {
                authService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    email: fragment.external_email,
                    fullName: fragment.external_full_name,
                    externalAccessToken: fragment.external_access_token
                    //hasAccount: fragment.haslocalaccount
                };
                $state.go("auth.complete-register");
            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token, userName: fragment.external_user_name, userName: fragment.external_email };
                authService.obtainAccessToken(externalData).then(function (result) {
                    if (result.status === 200) {
                        var res = result.data;
                        var data = {
                            user_id: res.user_id,
                            token: res.token_type + ' ' + res.access_token
                        }
                        $auth.setUser(data);
                        $restful.get("/user", {}).then(function (result) {
                            if (result.data) {
                                $auth.setProfile(result.data);
                                if (result.data.email && result.data.email.length > 0) {
                                    if ($stateParams.tid && $stateParams.tid.length > 0) {
                                        $state.go("preview-template", {
                                            id: $stateParams.tid,
                                            type: 'p',
                                            cf: 'themes'
                                        });
                                    }
                                    else if (result.data.count == 0) {
                                        $state.go("main.newLandingpage");
                                    } else {
                                        $state.go("dashboard.main");
                                    }
                                } else {
                                    $state.go("auth.complete-register");
                                }
                            }
                        });
                    }
                },
             function (err) {
                 $scope.message = err.error_description;
             });
            }

        });
    }

    $scope.authCompletedZalo = function (fragment) {
        $scope.$apply(function () {
            var data = {
                code: fragment.code,
                uid: fragment.uid,
                state: fragment.state
            }

            $restful.post('/auth/validate-zalo-token', data).then(function (result) {
                if (result.data.status == 0) {
                    authService.externalAuthData = {
                        provider: 'Zalo',
                        userName: '',
                        fullName: result.data.profile.name,
                        externalAccessToken: fragment.code
                    };
                    $state.go("auth.complete-register");
                }
                else if (result.data.status == 1) {
                    var res = result.data.token;
                    var data = {
                        user_id: res.user_id,
                        token: res.token_type + ' ' + res.access_token
                    }
                    $auth.setUser(data);
                    $restful.get("/user", {}).then(function (result) {
                        if (result.data) {
                            $auth.setProfile(result.data);
                            if (result.data.email && result.data.email.length > 0) {
                                if ($stateParams.tid && $stateParams.tid.length > 0) {
                                    $state.go("preview-template", {
                                        id: $stateParams.tid,
                                        type: 'p',
                                        cf: 'themes'
                                    });
                                }
                                else if (result.data.count == 0) {
                                    $state.go("main.newLandingpage");
                                } else {
                                    $state.go("dashboard.main");
                                }
                            } else {
                                $state.go("auth.complete-register");
                            }
                        }
                    });
                }
            });
        });
    }
}]);
