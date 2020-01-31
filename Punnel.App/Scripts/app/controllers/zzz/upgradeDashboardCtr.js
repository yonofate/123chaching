angular.module("punnelApp").controller("upgradeDashboardCtr", ["$scope", "$timeout", "APP_CONFIG", "$localStorage", "$restful", function ($scope, $timeout, APP_CONFIG, $localStorage, $restful) {
    $scope.email_upgrade = "";
    $scope["package"] = 20;
    $scope.partner = false;
    $scope.timeUpdate = 12;
    $scope.numLadipage = 10;
    $scope.typeUser = "1";
    $scope.ref = "";
    if (interval) {
        clearInterval(interval);
    }
    $scope.checkparner = function (obj) {
        if ($(obj.target).is(":checked")) {
            $scope.partner = true;
        } else {
            $scope.partner = false;
        }
    };
    $scope.showUpgrade = function () {
        $("#upgrade").unbind("modal").modal("show");
    };
    $scope.setpackage = function (pkg) {
        $scope["package"] = pkg;
        $("#upgrade .all-pac").hide();
    };
    $scope.upgrade = function () {
        if ($scope.typeUser && parseFloat($scope.typeUser) >= 0 && $scope.email_upgrade && $scope.email_upgrade.length > 0 && $scope.numLadipage && parseFloat($scope.numLadipage) > 0 && $scope.timeUpdate && parseFloat($scope.timeUpdate) > 0) {
            var data;
            data = {
                email: $scope.email_upgrade,
                months: $scope.timeUpdate,
                numLadi: $scope.numLadipage,
                referral: $scope.ref,
                type: parseFloat($scope.typeUser)
            };
            $restful.get("/user/upgrade", data, function (err, res) {
                if (res && 200 == res.code) {
                    PN_PAGE.messageLadi("N\u00e2ng c\u1ea5p th\u00e0nh c\u00f4ng!");
                } else {
                    if (res) {
                        PN_PAGE.messageLadi(res.messager);
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                }
            });
        } else {
            var pix_color = "";
            if (!$scope.email_upgrade) {
                pix_color = pix_color + "Email: ";
            }
            if (!$scope.numLadipage) {
                pix_color = pix_color + "S\u1ed1 l\u01b0\u1ee3ng punnel: ";
            }
            if (!$scope.timeUpdate) {
                pix_color = pix_color + "Th\u1eddi gian s\u1eed d\u1ee5ng: ";
            }
            if (!$scope.typeUser) {
                pix_color = pix_color + "Lo\u1ea1i: ";
            }
            PN_PAGE.messageLadi(pix_color + "kh\u00f4ng \u0111\u01b0\u1ee3c \u0111\u1ec3 tr\u1ed1ng!");
        }
    };
    $scope.showallPac = function () {
        if ("none" == $("#upgrade .all-pac").css("display")) {
            $("#upgrade .all-pac").show();
        } else {
            $("#upgrade .all-pac").hide();
        }
    };
    $scope.checkUserNhan = function () {
        if ($scope.email_upgrade && $scope.email_upgrade.length > 0) {
            $restful.post("/user/check", {
                email: $scope.email_upgrade
            }, function (err, res) {
                if (console.log(res), console.log(res.data), res && 200 == res.code) {
                    if (res.data) {
                        var s = "";
                        var i = 0;
                        for (; i < res.data.length; i++) {
                            var cmark = "G\u00f3i mi\u1ec5n ph\u00ed";
                            switch (res.data[i].type) {
                                case 1:
                                    cmark = "G\u00f3i tr\u1ea3i nghi\u1ec7m";
                                    break;
                                case 2:
                                    cmark = "G\u00f3i n\u00e2ng cao";
                                    break;
                                case 3:
                                    cmark = "G\u00f3i chuy\u00ean s\u00e2u";
                            }
                            if (s = s + ("H\u1ecd t\u00ean: " + res.data[i].full_name + "\n"), s = s + ("Email: " + res.data[i].email + "\n"), res.data[i].dateTrial && res.data[i].dateTrial.length > 0 && (s = s + ("D\u00f9ng th\u1eed: " + res.data[i].dateTrial + " ng\u00e0y\n")), res.data[i].expired && res.data[i].expired.length > 0) {
                                var dTempDate1 = new Date(res.data[i].expired);
                                var h = dTempDate1.getDate() + "/" + (dTempDate1.getMonth() + 1) + "/" + dTempDate1.getFullYear();
                                s = s + ("Ng\u00e0y h\u1ebft h\u1ea1n: " + h + "\n");
                            }
                            if (res.data[i].username && res.data[i].username.length > 0) {
                                $scope.ref = res.data[i].username;
                                s = s + ("M\u00e3 gi\u1edbi thi\u1ec7u: " + res.data[i].username + "\n");
                            }
                            s = s + cmark;
                        }
                        if (s && s.length > 0) {
                            PN_PAGE.messageLadi(s);
                        } else {
                            PN_PAGE.messageLadi("Kh\u00f4ng c\u00f3 ng\u01b0\u1eddi d\u00f9ng ph\u00f9 h\u1ee3p! Vui l\u00f2ng ki\u1ec3m tra l\u1ea1i!");
                        }
                    }
                } else {
                    if (res) {
                        PN_PAGE.messageLadi(res.messager);
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                }
            });
        } else {
            PN_PAGE.messageLadi("Vui l\u00f2ng nh\u1eadp email!");
        }
    };
    $scope.setTypeUser = function (typeUser) {
        $scope.typeUser = typeUser;
    };
    $scope.setNumLadipage = function (numLadipage) {
        $scope.numLadipage = numLadipage;
    };
    $scope.setTimeUpdate = function (timeUpdate) {
        $scope.timeUpdate = timeUpdate;
    };
}]);
