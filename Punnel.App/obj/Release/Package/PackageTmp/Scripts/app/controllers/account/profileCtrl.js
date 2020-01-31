angular.module("punnelApp").controller("profileCtrl", ["$state", "$scope", "$restful", "$auth", "Upload", "APP_CONFIG", "popupService", function ($state, $scope, $restful, $auth, Upload, APP_CONFIG, popupService) {
    
    $scope.loadProfile = function () {
        var ck = PN_PAGE.getCookie("last_lg");
        var profile = $auth.getProfile();
        if (profile && ck && ck == 1) {
            $scope.profile = profile;
        } else {
            $restful.get("/user", {}).then(function (result) {
                $auth.setProfile(result.data);
                $scope.profile = result.data;
                PN_PAGE.setCookie("last_lg", 1, 1);
            });
        }
    };
    

    $scope.logout = function () {
        $auth.clearUser();
        $state.go("auth.login");
    };

    $scope.showProfileManager = function (data) {
        popupService.show('profileManager.html', { data: data }, ['$scope', '$state', '$auth', '$mdDialog', 'data', function ($scope, $state, $auth, $mdDialog, data) {
            $scope.profile = $auth.getProfile();
            $scope.level = profile_level[$scope.profile.level];
            $scope.isChangePass = '0';
            $scope.acc = { pass: '', repass: '' };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function (res) {
                $mdDialog.hide($scope.profile);
            };

            $scope.updateProfile = function () {
                PN_PAGE.btnLoading.show();
                $restful.put("/user", $scope.profile).then(
                    function (result) {
                        PN_PAGE.account = $scope.profile;
                        if ($scope.isChangePass === '1') {
                            if ($scope.acc.pass && $scope.acc.repass && $scope.acc.pass == $scope.acc.repass) {
                                $restful.post("/auth/update-password", {
                                    pass: $scope.acc.pass,
                                    code: 1
                                }).then(function (result) {
                                    PN_PAGE.btnLoading.hide();
                                    PN_PAGE.showMessage("Đã cập nhật thông tin!");
                                    $scope.cancel();
                                });
                            } else {
                                if ($scope.acc.pass && $scope.acc.repass) {
                                    PN_PAGE.showMessage("Nhập lại mật khẩu phải giống mật khẩu mới", 'error');
                                } else {
                                    PN_PAGE.messageErr('Vui lòng nhập mật khẩu');
                                }
                                PN_PAGE.btnLoading.hide();
                            }
                        } else {
                            PN_PAGE.btnLoading.hide();
                            PN_PAGE.showMessage("Đã cập nhật thông tin!");
                            $scope.hide();
                        }
                    });
            };

            $scope.uploadFiles = function (files) {
                if (files && files.length) {
                    var i = 0;
                    for (; i < files.length; i++) {
                        if (files[i].size > 3242880) {
                            return PN_PAGE.showMessage("\u1ea2nh v\u01b0\u1ee3t qu\u00e1 dung l\u01b0\u1ee3ng cho ph\u00e9p 3Mb, vui l\u00f2ng th\u1eed l\u1ea1i!", 'error'), $(".loading").css({
                                opacity: "1"
                            }).hide(), false;
                        }
                    }
                    i = 0;
                    for (; i < files.length; i++) {
                        PN_PAGE.loading.show();
                        PN_PAGE.uploadImageLadi(Upload, files[i], "/api/upload", 3, "", function (res) {
                            PN_PAGE.loading.hide();
                            if (res.data.data.path && res.data.data.path != null) {
                                $scope.profile.hasAvatar = true;
                                $scope.profile.avatar = APP_CONFIG.URL_IMAGE_S + res.data.data.path;
                                PN_PAGE.account.avatar = $scope.profile.avatar;
                                PN_PAGE.account.hasAvatar = true;
                            }
                            $scope.hide();
                        });
                    }
                }
            };

            $scope.validateMobile = function () {
                if ($scope.submitForm.mobile.$valid !=true) return
                $restful.post("/auth/check-mobile", { email: $scope.profile.mobile }).then(
                    function (result) {
                    });
            }
            $scope.validateEmail = function () {
                if ($scope.submitForm.email.$valid != true) return
                $restful.post("/auth/check-email", { email: $scope.profile.email }).then(
                    function (result) {
                    });
            }

            $scope.sendVerifyMobile = function () {
                var mobile = $scope.profile.mobile || '';
                if (mobile == '') return;
                PN_PAGE.loading.show();
                $restful.post("/auth/send-verify-mobile", { email: $scope.profile.mobile }).then(function (result) {
                    $scope.profile.isVerifyMobile = true;
                    PN_PAGE.loading.hide();                 
                    if (result.data == true) {
                        $state.go("auth.complete-verifymobile");
                    } else {
                        PN_PAGE.showMessage("Số điện thoại của bạn đã được xác thực!");
                        $scope.hide();
                    }
                });
            }

            $scope.sendVerifyEmail = function () {
                var email = $scope.profile.email || '';
                if (email == '') return;
                PN_PAGE.loading.show();
                $restful.post("/auth/send-verify-email", { email: $scope.profile.email }).then(function (result) {
                    PN_PAGE.loading.hide();
                    $scope.profile.isVerifyMobile = true;
                    if (result.data == true) {
                        PN_PAGE.showMessage("Punnel vừa gửi xác nhận đến email" + $scope.profile.email + " của bạn. Vui lòng kiểm tra hộp thư để xác thực email");
                    } else {
                        PN_PAGE.showMessage("Email của bạn đã được xác thực!");
                        $scope.hide();
                    }
                });
            }

        }], function (res) {
                $auth.setProfile(res);
                $scope.loadProfile();
        });
    };

}]);