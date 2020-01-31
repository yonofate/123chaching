angular.module("punnelApp").controller("forgotPassCtrl", ["$scope", "$restful", "$state", "$stateParams", "$auth", function ($scope, $restful, $state, $stateParams, $auth) {

    $scope.submit = function () {
        if ($scope.frmSignup.$valid == false) return;
        PN_PAGE.btnLoading.show();
        $restful.post('/auth/forgot-password', { email: $scope.email }).then(function (res) {
            PN_PAGE.btnLoading.hide();
            swal('Đã gửi thông tin', 'Bạn vui lòng kiểm tra email để tạo mật khẩu mới', 'success');
        });
    }

    $scope.validate = function () {
        var data = {
            userId: $stateParams.u,
            code: $stateParams.c
        }
        if (data.userId && data.userId.length > 0 && data.code && data.code.length > 0) {
            $restful.post('/auth/validate-link-resetpass', data).then(function (res) {
                if (res.data == false) {
                    swal('', 'Thông tin cung cấp không hợp lệ', 'error');
                    window.location.href = "/";
                }
            });
        } else {
            window.location.href = "/";
        }
    }

    $scope.verifyEmail = function () {
        var data = {
            userId: $stateParams.u,
            code: $stateParams.c
        }
        if (data.userId && data.userId.length > 0 && data.code && data.code.length > 0) {
            PN_PAGE.loading.show();
            $restful.post('/auth/verify-email', data).then(function (res) {
                PN_PAGE.loading.hide();
                if (res.data == false) {
                    swal({
                        title: "",
                        text: "Thông tin xác thực email không hợp lệ hoặc đã hết hạn",
                        type: "error",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    }, function (value) {
                        window.location.href = "/";
                    });
                } else {
                    PN_PAGE.account.isVerifyEmail = true;
                    swal({
                        title: "",
                        text: "Xác thực email thành công!",
                        type: "success",
                        showCancelButton: false,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "OK",
                        closeOnConfirm: true
                    }, function (value) {
                        var data = $auth.getProfile() || null;
                        if (data != null) {
                            data.isVerifyEmail = true;
                            $auth.setProfile(data);
                            if (data.count == 0) {
                                $state.go("main.newLandingpage");
                                PN_PAGE.showWelcome(data.full_name);
                            } else {
                                $state.go("dashboard.main");
                            }
                        } else window.location.href = "/";                       
                    });
                   
                }
            });
        } else {
            window.location.href = "/";
        }
    }

    $scope.account = {
        userId: $stateParams.u,
        code: $stateParams.c,
        password: '',
        passwordConfirm:''
    }

    $scope.resetPass = function () {
        if ($scope.frmSignup.$valid == false) return;
        if ($scope.account.password != $scope.account.passwordConfirm) {
            swal('', 'Vui lòng nhập lại nhập khẩu giống với mật khẩu mới', 'warning');
            return;
        }
        PN_PAGE.btnLoading.show();
        $restful.post('/auth/reset-password', $scope.account).then(function (res) {
            PN_PAGE.btnLoading.hide();
            swal('Cập nhật thành công!', 'Hãy đăng nhập lại bằng mật khẩu mới của bạn', 'success');
            $scope.goLogin();
        });
    }


    //for sms
    $scope.step = 1;
    $scope.sms = {
        mobile: '',
        code:''
    }

    $scope.sendSmsCode = function () {
        var mobile = $scope.sms.mobile || '';
        if (mobile == '') return;
        PN_PAGE.btnLoading.show();
        $restful.post('/auth/forgot-password-mobile', { email: mobile }).then(function (res) {
            PN_PAGE.btnLoading.hide();
            swal('Đã gửi mã', 'Bạn vui lòng kiểm tra tin nhắn trên điện thoại', 'success');
            $scope.goStep(2);
        });
    }

    $scope.validateSmsCode = function () {      
        var data = {
            mobile: $scope.sms.mobile || '',
            code: $scope.sms.code || ''
        }
        if (data.mobile=='' || data.code=='') return;

        $restful.post('/auth/validate-sms-code', data).then(function (res) {
            if (res.data == false) {
                swal('', 'Mã không hợp lệ', 'error');
            } else {
                debugger
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
                        if ($auth.isFullInfo() == true) {
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
                                $state.go("dashboard.main", {}, {
                                    reload: true
                                });
                            }
                        } else {
                            $state.go("auth.complete-register");
                        }
                    }
                });
                swal('', 'Bạn có thể vào Thông tin cá nhân để đổi lại mật khẩu mới', 'success');
            }
        });
    }

    $scope.goStep = function (step) {
        if (step == 2) $scope.step = 2;
        else $scope.step = 1;
    };

  $scope.goLogin = function() {
    $state.go("auth.login");
  };
  $scope.goRegister = function() {
      $state.go("auth.register");
  };
}])
