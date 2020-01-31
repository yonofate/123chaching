angular.module("punnelApp").controller("reLoginCtrl", ["$rootScope", "$scope", "$auth", "$restful", "authService", "$mdDialog", function ($rootScope, $scope, $auth, $restful, authService, $mdDialog) {
    $scope.account = {
        userName: null,
        password: null,
        grant_type: 'password',
        useRefreshTokens: true
    }

    $scope.submit = function () {
        if ($scope.FormLogIn.$valid) {
            PN_PAGE.btnLoading.show();
            authService.login($scope.account).then(function (res) {
                var data = {
                    user_id: res.data.user_id,
                    token: res.data.token_type + ' ' + res.data.access_token,
                    refresh_token: res.data.refresh_token,
                    useRefreshTokens: true
                }
                $auth.setUser(data);
                $restful.get("/user", {}).then(function (result) {
                    if (result.data) {
                        PN_PAGE.btnLoading.hide();
                        $auth.setProfile(result.data);
                        $scope.hide();
                    }
                });
            },
                function (err) {
                    PN_PAGE.btnLoading.hide();
                    PN_PAGE.showMessage(err.data.error_description, 'error');
                });
        }
    }

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

    $scope.authCompletedCB = function (fragment) {
        $scope.$apply(function () {
            if (fragment.haslocalaccount == 'False') {
                authService.externalAuthData = {
                    provider: fragment.provider,
                    userName: fragment.external_user_name,
                    fullName: fragment.external_full_name,
                    externalAccessToken: fragment.external_access_token
                };
                $state.go("auth.complete-register");
            }
            else {
                //Obtain access token and redirect to orders
                var externalData = { provider: fragment.provider, externalAccessToken: fragment.external_access_token, userName: fragment.external_user_name };
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
                                $scope.hide();
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

    $scope.hide = function (res) {
        $mdDialog.hide(res);
    };
}])
