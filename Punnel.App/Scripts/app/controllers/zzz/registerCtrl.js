angular.module("punnelApp").controller("registerCtrl", ["$scope", "$translate", "$state", "$restful", "$stateParams", function ($scope, $translate, $state, $restful, $stateParams) {
    if (interval) {
        clearInterval(interval);
    }
    if (PN_PAGE.useIntercom === 1) {
        Intercom("shutdown");
        var intercom_data = {
            app_id: "pvof7mzc",
            source: "web punnel"
        };
    }
    Intercom("boot", intercom_data);
    $translate.use(localStorage.getItem("lang"));
    $scope.user_name = "";
    $scope.user_pass = "";
    $scope.user_phone = "";
    $scope.user_email = "";
    $scope.user_referral = $stateParams.ref;
    $scope.checkUser = true;
    $scope.showReferral = "false";
    if ($stateParams.ref && $stateParams.ref.length > 0) {
        PN_PAGE.setCookie("referral", $stateParams.ref, 60);
        $scope.user_referral = $stateParams.ref;
    } else {
        $scope.user_referral = PN_PAGE.getCookie("referral");
    }
    if ($scope.user_referral && $scope.user_referral.length > 0 && 0 != $scope.user_referral && "" != $scope.user_referral) {
        $scope.showReferral = "true";
        $restful.post("/app/checkUsername", {
            code: $scope.user_referral
        }, function (err, result) {
            console.log("check", 3);
            if (result && 200 == result.code) {
                console.log("check", 4);
                if ("1" == result.data) {
                    console.log("check", 5);
                } else {
                    $scope.showReferral = "false";
                    $scope.user_referral = "";
                    PN_PAGE.setCookie("referral", "", 60);
                    console.log("check", 6);
                }
            } else {
                $scope.showReferral = "false";
            }
        });
    } else {
        $scope.showReferral = "false";
    }
    $scope.user_register = function () {
        console.log("register");
        $scope.user_referral.trim();
        var b = $(".signup .btn-register");
        console.log("val form: ", $scope.formSubmit.$valid);
        console.log("val checkbox: ", $('input[type="checkbox"]').is(":checked"));
        var c = $("input");
        c.each;
        if ($scope.formSubmit.$valid && $('input[type="checkbox"]').is(":checked")) {
            console.log(1);
            b.attr("disabled", "true");
            b.attr("value", "Vui l\u00f2ng \u0111\u1ee3i...");
            console.log(2);
            $scope.submitRegister();
        } else {
            console.log(3);
            b.removeAttr("disabled");
            b.attr("value", "\u0110\u0103ng k\u00fd");
        }
        console.log(4);
    };
    $scope.submitRegister = function () {
        var btnSignUp = $(".signup .btn-register");
        btnSignUp.attr("disabled", "true");
        btnSignUp.attr("value", "Vui l\u00f2ng \u0111\u1ee3i...");
        $restful.post("/auth/sign-up", {
            email: $scope.user_email,
            full_name: $scope.user_name,
            password: $scope.user_pass,
            phone: $scope.user_phone,
            referral: $scope.user_referral
        }, function (a, result) {
            if (btnSignUp.removeAttr("disabled"), btnSignUp.attr("value", "\u0110\u0103ng k\u00fd"), a) {
                PN_PAGE.messageLadi(a.message);
            } else {
                if (result && 200 == result.code) {
                    try {
                        fbq("track", "CompleteRegistration");
                    } catch (err) {
                    } finally {
                        PN_PAGE.messageLadi("\u0110\u0103ng k\u00fd th\u00e0nh c\u00f4ng! Vui l\u00f2ng \u0111\u0103ng nh\u1eadp \u0111\u1ec3 b\u1eaft \u0111\u1ea7u s\u1eed d\u1ee5ng!");
                        $state.go("login", {
                            idLa: $stateParams.idLa
                        });
                    }
                } else {
                    if (result) {
                        PN_PAGE.messageLadi(result.messager);
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng t\u1ea3i l\u1ea1i trang v\u00e0 th\u1eed l\u1ea1i!\n Ho\u1eb7c li\u00ean h\u1ec7 Livechat \u0111\u1ec3 \u0111\u01b0\u1ee3c h\u1ed7 tr\u1ee3!");
                    }
                }
            }
        });
    };
    $scope.submitForm = function (event) {
        var c = event.which || event.keyCode;
        if (13 === c) {
            $scope.user_register();
        }
    };
}]);
