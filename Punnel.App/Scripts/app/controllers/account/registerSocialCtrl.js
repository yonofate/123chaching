angular.module("punnelApp").controller("registerSocialCtrl", ["$scope", "$state", "$restful", "$stateParams", "$auth", "authService", function ($scope, $state, $restful, $stateParams, $auth, authService) {


    if (PN_PAGE.useIntercom === 1) {
        Intercom("shutdown");
        var event = {
            app_id: "pvof7mzc",
            source: "web punnel"
        };
        Intercom("boot", event);
    }

    $scope.account = {
        email: '',
        fullName: '',
        mobile: '',
        password: '',
        ref: ''
    }
    $scope.showReferral = false;

    function showRef() {
        var ref = PN_PAGE.getCookie("referral");
        if (ref && ref.length > 0) {
            $scope.user_referral = ref;
            $scope.showReferral = true;
        } else {
            $scope.user_referral = null;
            $scope.showReferral = false;
        }
    }

    if ($stateParams.ref && $stateParams.ref.length > 0) {
        $scope.account.ref = $stateParams.ref;
    } else {
        $scope.account.ref = PN_PAGE.getCookie("referral");
    }

    if ($scope.account.ref && $scope.account.ref.length > 0) {
        $restful.post("/auth/check-ref", {
            code: $scope.account.ref
        }).then(function (result) {
            if (result.data == true) {
                PN_PAGE.setCookie("referral", $scope.account.ref, 120);
            }
            showRef();
        });
    }

    function login(loginData) {
        authService.login(loginData).then(function (res) {
            var data = {
                user_id: res.data.user_id,
                token: res.data.token_type + ' ' + res.data.access_token,
                refresh_token: res.data.refresh_token,
                useRefreshTokens: true
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
                                cf:'themes'
                            });
                        }
                        else if (result.data.count == 0) {
                            $state.go("main.newLandingpage");
                            PN_PAGE.showWelcome(result.data.full_name);
                        } else {
                            $state.go("dashboard.main");
                        }     
                    } else {
                        $state.go("auth.complete-register");
                    }
                }
            });
        },
        function (err) {
            PN_PAGE.showMessage(err.data.error_description, 'error');
        });
    }

    $scope.goLogin = function () {
        $state.go("auth.login", {
            tid: $stateParams.tid
        });
    };

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

    $scope.register = function () {
        if ($scope.frmSignup.$valid == false) return;
        PN_PAGE.btnLoading.show();
        $restful.post("/auth/sign-up", $scope.account).then(function (result) {           
            setTimeout(function () {
                var loginData = {
                    "userName": $scope.account.email,
                    "password": $scope.account.password,
                    "grant_type": "password"
                };
                login(loginData);
                PN_PAGE.btnLoading.hide();
            }, 1e3);
        });
    };
}]);
