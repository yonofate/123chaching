angular.module("punnelApp").controller("accountCtr", ["$state", "$scope", "$translate", "$stateParams", "$restful", "Upload", "APP_CONFIG", "$rootScope", function ($state, $scope, $translate, $stateParams, $restful, Upload, APP_CONFIG, $rootScope) {
    $scope.pass = "";
    $scope.repass = "";
    var tm= setTimeout(function () {
        if ($rootScope.loadProfile == 1) {
            $scope.name = PN_PAGE.account.full_name;
            $scope.email = PN_PAGE.account.email;
            $scope.phone = PN_PAGE.account.phone;
            $scope.avatar = PN_PAGE.account.avatar;
            $scope.role = PN_PAGE.account.role;
            $scope.creditme = PN_PAGE.account.credit;
            $scope.user_name = PN_PAGE.account.user_name;
            $scope.idUser = PN_PAGE.account.id;
            $scope.gt = PN_PAGE.gt;
            $(".change-avatar-user").attr("src", $scope.avatar);
            clearTimeout(tm);
        }
    }, 2e3);
    $scope.check = function () {
        $restful.post("/user", {
            email: $scope.email
        }, function (status, result) {
            if (result && 200 == result.code) {
                if (result.data) {
                    $scope.credit = result.data.credit;
                }
            } else {
                if (result) {
                    PN_PAGE.messageLadi(result.messager);
                } else {
                    PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                }
            }
        });
    };
    $scope.uploadFiles = function (files) {
        if (files && files.length) {
            var i = 0;
            for (; i < files.length; i++) {
                if (files[i].size > 5242880) {
                    return PN_PAGE.messageLadi("\u1ea2nh v\u01b0\u1ee3t qu\u00e1 dung l\u01b0\u1ee3ng cho ph\u00e9p 5Mb, vui l\u00f2ng th\u1eed l\u1ea1i!"), $(".loading").css({
                        opacity: "1"
                    }).hide(), false;
                }
            }
            i = 0;
            for (; i < files.length; i++) {
                PN_PAGE.pageLoading.show();
                PN_PAGE.uploadImageLadi(Upload, files[i], "/api/upload", 3, "", function (res) {
                    PN_PAGE.pageLoading.hide();
                    $scope.avatar = "";
                    $scope.show_avatar = false;
                    $scope.avatar = APP_CONFIG.URL_IMAGE_S + res.data.data.path;
                    if (res.data.data.path && res.data.data.path != null) $scope.show_avatar = true; 
                    $(".image-avatar-user").attr("src", $scope.avatar);
                    $(".change-avatar-user").attr("src", $scope.avatar);
                });
            }
        }
    };
    $scope.changeProfile = function () {
        if ($scope.FormChangeProfile.$valid) {
            if ($scope.email && $scope.email.length > 0 && $scope.name && $scope.name.length > 0 && $scope.phone && $scope.phone.length > 0) {
                $restful.put("/user", {
                    full_name: $scope.name,
                    email: $scope.email,
                    phone: $scope.phone,
                    user_name: $scope.user_name
                }, function (a, result) {
                    if (result && 200 == result.code) {
                        PN_PAGE.account.full_name = $scope.name;
                        PN_PAGE.account.email = $scope.email;
                        PN_PAGE.account.phone = $scope.phone;
                        PN_PAGE.account.user_name = $scope.user_name;
                        PN_PAGE.messageLadi("Thay \u0111\u1ed5i th\u00f4ng tin th\u00e0nh c\u00f4ng");
                    } else {
                        if (result) {
                            PN_PAGE.messageLadi(result.messager);
                        } else {
                            PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                        }
                    }
                });
            } else {
                PN_PAGE.messageLadi("Vui l\u00f2ng \u0111i\u1ec1n \u0111\u1ea7y \u0111\u1ee7 th\u00f4ng tin kh\u00f4ng \u0111\u1ec3 d\u1eef li\u1ec7u tr\u1ed1ng!");
            }
        }
    };
    $scope.changPass = function () {
        if ($scope.pass && $scope.repass && $scope.pass == $scope.repass) {
            $restful.post("/account/update-password", {
                pass: $scope.pass,
                code:1
            }, function (a, result) {
                if (result && 200 == result.code) {
                    PN_PAGE.messageLadi("\u0110\u00e3 \u0111\u1ed5i m\u1eadt kh\u1ea9u m\u1edbi");
                } else {
                    if (result) {
                        PN_PAGE.messageLadi(result.messager);
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                }
            });
        } else {
            if ($scope.pass && $scope.repass) {
                PN_PAGE.messageLadi("Gi\u00e1 tr\u1ecb hai \u00f4 nh\u1eadp kh\u00f4ng tr\u00f9ng nhau");
            } else {
                PN_PAGE.messageLadi("Vui l\u00f2ng \u0111i\u1ec1n pass v\u00e0o \u00f4 nh\u1eadp");
            }
        }
    };
    $scope.setActive = function (thread) {
        $("#manager-user #myTab li").removeClass("active");
        $('#manager-user #myTab li[pn-active="' + thread + '"]').addClass("active");
        $("#manager-user .tab-content .tab-pane").removeClass("active");
        $("#manager-user #" + thread).addClass("active");
    };
    $scope.close = function () {
        $(".ngdialog.setting-account").remove();
    };
    $scope.email_move = "";
    $scope.number_ladi = "";
    $scope.moveLadi = function () {
        if ($scope.email_move && $scope.email_move.length > 0 && $scope.email_move.search("@") > 0 && $scope.email_move != $scope.email) {
            $restful.get("/user-access/upgrade", {
                email: $scope.email_move,
                credit: $scope.number_ladi
            }, function (a, result) {
                if (result && 200 == result.code) {
                    if (result.data) {
                        PN_PAGE.messageLadi("Chuy\u1ec3n th\u00e0nh c\u00f4ng");
                        $scope.creditme = parseFloat($scope.creditme) - parseFloat($scope.number_ladi);
                    } else {
                        PN_PAGE.messageLadi(result.messager);
                    }
                } else {
                    if (result) {
                        PN_PAGE.messageLadi(result.messager);
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                }
            });
        } else {
            PN_PAGE.messageLadi("Vui l\u00f2ng nh\u1eadp Email nh\u1eadn!");
        }
    };
    $scope.checkUserNhan = function () {
        if ($scope.email_move && $scope.email_move.length > 0) {
            $restful.post("/user/check", {
                email: $scope.email_move
            }, function (a, result) {
                if (result && 200 == result.code) {
                    if (result.data) {
                        var ret = "";
                        var i = 0;
                        for (; i < result.data.length; i++) {
                            ret = ret + ("H\u1ecd t\u00ean: " + result.data[i].full_name + "\n");
                            ret = ret + ("Email: " + result.data[i].email + "\n");
                            ret = ret + ("M\u00e3 gi\u1edbi thi\u1ec7u: " + result.data[i].referral + "\n");
                        }
                        if (ret && ret.length > 0) {
                            PN_PAGE.messageLadi(ret);
                        } else {
                            PN_PAGE.messageLadi("Kh\u00f4ng c\u00f3 ng\u01b0\u1eddi d\u00f9ng ph\u00f9 h\u1ee3p! Vui l\u00f2ng ki\u1ec3m tra l\u1ea1i!");
                        }
                    }
                } else {
                    if (result) {
                        PN_PAGE.messageLadi(result.messager);
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                }
            });
        } else {
            PN_PAGE.messageLadi("Vui l\u00f2ng nh\u1eadp Email ho\u1eb7c S\u1ed1 \u0111i\u1ec7n tho\u1ea1i ng\u01b0\u1eddi nh\u1eadn Credit");
        }
    };
}]);
