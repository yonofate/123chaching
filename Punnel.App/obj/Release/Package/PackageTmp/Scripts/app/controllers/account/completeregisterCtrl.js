angular.module("punnelApp").controller("completeregisterCtrl", ["$scope", "$translate", "$state", "$restful", "$auth", "authService", function ($scope, $translate, $state, $restful, $auth, authService) {
    $scope.savedSuccessfully = false;
    $scope.message = "";

    $scope.user = {
        UserName: authService.externalAuthData.userName,
        Password: '',
        Email: authService.externalAuthData.email,
        FullName: authService.externalAuthData.fullName,
        Provider: authService.externalAuthData.provider,
        ExternalAccessToken: authService.externalAuthData.externalAccessToken,
        Ref: null,
        AllowCallback: false
    };

    $scope.user.Ref = PN_PAGE.getCookie("referral");

    $scope.disableEmail = true;
    var em = $scope.user.Email || '';
    if (em == '') {
        $scope.disableEmail = false;
    }

    $scope.updateRegister = function () {
        PN_PAGE.btnLoading.show();
        authService.registerExternal($scope.user).then(function (res) {
            var data = {
                user_id: res.data.user_id,
                token: res.data.token_type + ' ' + res.data.access_token
            }
            $auth.setUser(data);

            $restful.get("/user", {}).then(function (result) {
                if (result.data) {
                    $scope.savedSuccessfully = true;
                    PN_PAGE.btnLoading.hide();
                    $auth.setProfile(result.data);
                    if (result.data.email && result.data.email.length > 0) {
                        if (result.data.isVerifyEmail == false) {
                            $state.go("auth.complete-verifyemail");
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
        });
    };
}]);
