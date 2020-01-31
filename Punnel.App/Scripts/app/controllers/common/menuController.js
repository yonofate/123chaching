angular.module("punnelApp").controller("menuCtr", ["$rootScope", "$auth", "$state", "$stateParams", "$scope", "$restful", "popupService", function ($rootScope, $auth, $state, $stateParams, $scope, $restful, popupService) {
    $scope.getClass = function (path) {
        var x = $state.current.name;
        return (x.indexOf(path)>=0) ? 'active' : '';
    }

    $scope.showCreatePageOption = function () {
        popupService.show('addLandingPage.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.hide = function (res) { };

            $scope.goCreateNewLandingpage = function () {
                $scope.cancel();
                $state.go("main.newLandingpage");
            };

            $scope.showCreatePageByCode = function () {
                $scope.cancel();
                popupService.show('addLandingPageByCode.html', {}, ['$scope', '$restful', '$mdDialog', function ($scope, $restful, $mdDialog) {
                    $scope.createPageByCode = function () {
                        if ($scope.shareCode && $scope.shareCode.length > 0 && $scope.pageName && $scope.pageName.length > 0) {
                            PN_PAGE.pageLoading.show();
                            PN_PAGE.btnLoading.show();
                            $restful.post("/landingpage", {
                                code: $scope.shareCode,
                                name: $scope.pageName
                            }).then(function (result) {
                                PN_PAGE.pageLoading.hide();
                                $scope.cancel();
                                $state.go("editor", {
                                    id: result.data.id,
                                    type: 'p'
                                }, "_top");
                            });
                        } else {
                            PN_PAGE.showMessage("Vui l\u00f2ng nh\u1eadp t\u00ean Landing Page", 'alert');
                        }
                    };
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };
                }], function (res) { });
            };

        }], function (res) {
        });
    };

    
    $scope.user_profile = $auth.getProfile();
    $scope.user_level = $auth.level();
    $scope.endday = $auth.endday();
    $scope.sent = 0;

    $scope.sendVerifyEmail = function () {
        PN_PAGE.loading.show();
        $restful.post("/auth/send-verify-email", { email: $scope.user_profile.email }).then(function (result) {
            $scope.user_profile.isVerifyEmail = true;
            PN_PAGE.loading.hide();
            if (result.data == true) {
                swal("Thông báo!", "Punnel vừa gửi email xác thực đến email " + $scope.user_profile.email + " của bạn. Bạn vui lòng kiểm tra hộp thư để xác thực email này", "success");
            } else {
                PN_PAGE.showMessage("Email của bạn đã được xác thực!");
                $restful.get("/user", {}).then(function (result) {
                    $auth.setProfile(result.data);
                    $scope.user_profile = result.data;
                });
            }
        });
    }

    $scope.sendVerifyMobile = function () {
        PN_PAGE.loading.show();
        $restful.post("/auth/send-verify-mobile", { email: $scope.user_profile.mobile}).then(function (result) {
            $scope.user_profile.isVerifyMobile = true;
            $scope.sent = 1;
            PN_PAGE.loading.hide();
            if (result.data == true) {
                $state.go("auth.complete-verifymobile");
            } else {
                PN_PAGE.showMessage("Số điện thoại của bạn đã được xác thực!");
                $restful.get("/user", {}).then(function (result) {
                    $auth.setProfile(result.data);
                    $scope.user_profile = result.data;
                });
            }
        });
    }

    $scope.goUpgrade = function () {
        $state.go("main.upgrade");
    }

    $scope.goRenewal = function (level) {
        popupService.show('paymentOrder.html', { level: level }, ['$scope', '$state', '$mdDialog', '$filter', function ($scope, $state, $mdDialog, $filter) {
            $scope.title = 'Chọn dịch vụ gia hạn';
            $scope.data = {
                code: '',
                serviceId: level,
                timeId: null,
                promotionCode: '',
                discountAmount: 0,
                amount: 0,
                totalAmount: 0
            }

            $scope.serviceOptions = [{ i: 1, p: 99000, n: 'Economy   -   99K/tháng' }, { i: 2, p: 199000, n: 'Business   -   199K/tháng' }, { i: 3, p: 299000, n: 'VIP   -   299K/tháng' }];
            $scope.timeOptions = [{ i: 3, n: '3 tháng',p:0 }, { i: 6, n: '6 tháng [tiết kiệm 15%]',p:15 }, { i: 12, n: '1 năm [tiết kiệm 25%]',p:25 }];

            $scope.calc = function () {
                if ($scope.data.serviceId && $scope.data.serviceId > 0 && $scope.data.timeId && $scope.data.timeId > 0) {
                    var s = $filter('filter')($scope.serviceOptions, function (d) { return d.i === $scope.data.serviceId });
                    var t = $filter('filter')($scope.timeOptions, function (d) { return d.i === $scope.data.timeId });

                    if (s.length > 0) {
                        $scope.data.amountbf = s[0].p * $scope.data.timeId;
                        $scope.data.amount = s[0].p * $scope.data.timeId * (100 - t[0].p)/100;
                        $scope.data.totalAmount = $scope.data.amount - $scope.data.discountAmount;
                    }
                }
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.hide = function (a) {
                $mdDialog.hide(a);
            };

            $scope.validatePromotionCode = function () {
                PN_PAGE.loading.show();
                $restful.get("/promotion", { serviceId: $scope.data.serviceId, code: $scope.data.promotionCode }).then(function (result) {
                    PN_PAGE.loading.hide();
                    var res = result.data;
                    if (res.isDiscountPercent) {
                        $scope.data.discountAmount = $scope.data.amount * res.discount / 100;
                    } else
                        $scope.data.discountAmount = res.discount;
                    $scope.calc();
                });
            };

            $scope.submit = function (a) {
                PN_PAGE.loading.show();
                $restful.post("/invoice/order", $scope.data).then(function (result) {
                    PN_PAGE.loading.hide();
                    $scope.hide(result.data);
                });
            };
        }], function (res) {
            $state.go("main.payment", { id: res });
        }, false);
    }

    $scope.checkVerifyEmail = function () {
        if ($scope.user_profile.isVerifyEmail == true) {
            $state.go("main.dashboard");
        }
    }

    $scope.checkVerifyMobile = function () {
        if ($scope.user_profile.isVerifyMobile == true) {
            $state.go("main.dashboard");
        }
    }

    $scope.code = '';

    $scope.validateSmsCode = function () {
        var data = {
            mobile: $scope.user_profile.mobile || '',
            code: $scope.code || ''
        }
        if (data.mobile == '' || data.code == '') return;

        PN_PAGE.btnLoading.show();
        $restful.post('/auth/validate-sms-code', data).then(function (res) {
            if (res.data == false) {
                swal('', 'Mã không hợp lệ', 'error');
            } else {
                
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
                        PN_PAGE.showMessage("Đã xác thực thành công!");
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
            }
        });
    }

    $scope.showSupport = function () {
        popupService.show('formReqSupport.html', {}, ['$scope', '$state', '$auth', '$mdDialog', function ($scope, $state, $auth, $mdDialog) {
            var profile = $auth.getProfile();
            $scope.subjects = [{ n: 'Tư vấn cách sử dụng' }, { n: 'Hỗ trợ thiết kế landing page' }, { n: 'Hỗ trợ kỹ thuật' }, { n: 'Hỗ trợ thanh toán' }, { n: 'Vấn đề khác' }];
            $scope.timeranges = [{ n: 'Sớm nhất có thể' }, { n: 'Sáng 8h - 12h' }, { n: 'Trưa 12h - 1h30' }, { n: 'Chiều 1h30 - 5h' }];
            $scope.industries = [{ n: 'Đào tạo' }, { n: 'Bất động sản' }, { n: 'Bán hàng online' }, { n: 'Khác' }];
            $scope.ticket = {
                subject: '',
                time: '',
                industry: ''            
            }

            $scope.submit = function () {
                PN_PAGE.btnLoading.show();
                $restful.post('/ticket', $scope.ticket).then(function (res) {
                    PN_PAGE.btnLoading.hide();
                    PN_PAGE.showMessage('Đã gửi yêu cầu!');
                    $scope.cancel();
                });
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function (res) {
                $mdDialog.hide($scope.profile);
            };
        }], function (res) {
        });
    }


    $scope.logOut = function () {
        $auth.clearUser();
        $state.go("auth.login");
    }
}]);