angular.module("punnelApp").controller("projectCtr", ["$scope", "$timeout", "APP_CONFIG", "$localStorage", "$restful", "$state", "$window", function ($scope, $timeout, APP_CONFIG, $localStorage, $restful, $state, $window) {
    function AppCtrl() {
        PN_PAGE.loading.show();
        $scope.start = 1;
        $restful.get("/landingpage/findbyuser", {
            user: $scope.$user.id,
            is_publish: $scope.ispublish,
            type: 0,
            limit: 30,
            page: 1,
            name: $scope.searchName,
            deleted: $scope.deleteLp
        }, function (err, res) {
            if (res && res.data && 200 == res.code) {
                $scope.data = res.data;
                if (res.data.length < 20) {
                    $scope.start = 1;
                    $scope.checkLoad = false;
                } else {
                    $scope.checkLoad = true;
                }
                $(".parLoading").hide();
            } else {
                $(".parLoading").hide();
            }
        });
    }
    $scope.checkB = function () {
        var userAgent = $window.navigator.userAgent;
        var browsers = {
            chrome: /chrome/i,
            safari: /safari/i,
            firefox: /firefox/i,
            ie: /internet explorer/i
        };
        var browser;
        for (browser in browsers) {
            if (browsers[browser].test(userAgent)) {
                return browser;
            }
        }
        return "unknown";
    };
    if ("chrome" != $scope.checkB()) {
        $state.go("not-suport");
    }
    if (interval) {
        clearInterval(interval);
    }
    $scope.ispublish = 1;
    $scope.deleteLp = 0;
    $scope.start = 1;
    $scope.checkLoad = true;
    $scope.checkEditName = true;
    $scope.loadingData = false;
    $scope.email_upgrade = "";
    $scope["package"] = 30;
    $scope.typeList = "list-page";
    $scope.searchName = "";
    $scope.timeUpdate = 1;
    var i = 0;
    $scope.loadMore = function () {
        i++;
        PN_PAGE.loading.show();
        if ($scope.checkLoad) {
            $scope.start++;
            $restful.get("/landingpage/findbyuser", {
                limit: 30,
                page: $scope.start,
                is_publish: $scope.ispublish,
                user: $scope.$user.id,
                type: 0,
                name: $scope.searchName,
                deleted: $scope.deleteLp
            }, function (err, res) {
                if (res && res.data && 200 == res.code) {
                    var tupleIndex = 0;
                    for (; tupleIndex < res.data.length; tupleIndex++) {
                        $scope.data.push(res.data[tupleIndex]);
                    }
                    if (res.data.length < 20) {
                        $scope.checkLoad = false;
                        $scope.start = 1;
                    } else {
                        $scope.checkLoad = true;
                    }
                    $(".parLoading").hide();
                } else {
                    $(".parLoading").hide();
                }
            });
        } else {
            $(".parLoading").hide();
        }
    };
    AppCtrl();
    $scope.maxLadipage = PN_PAGE.account.type;
    setTimeout(function () {
        $scope.maxLadipage = PN_PAGE.account.type;
    }, 2e3);
    $scope.searchNameLadi = function () {
        $scope.start = 1;
        $scope.data = [];
        AppCtrl();
    };
    $scope.changeStyleList = function (clazz, typeList, elem) {
        $(".dashboard-page ." + clazz).addClass(typeList).removeClass(elem);
        $scope.typeList = typeList;
    };
    $scope.donechangeName = function (obj) {
        var parentPg = $(obj.target).parent();
        parentPg.parent().find(".edit-title").show();
        parentPg.parent().find("i").show();
        parentPg.parent().find("input").hide();
        parentPg.parent().find(".done").hide();
    };
    $scope.showInputchange = function (obj, value) {
        var parentPg = $(obj.target).parent();
        parentPg.parent().find(".edit-title").hide();
        parentPg.parent().find("i").hide();
        parentPg.parent().find(".done").show();
        parentPg.parent().find("input").val(value).show().focus();
    };
    $scope.changeNameProject = function (id, parent, kind) {
        var parentPg = $(parent.target).parent();
        var name = parentPg.parent().find("input").val();
        $restful.put("/landingpage", {
            id: id,
            name: name,
            opt:"name"
        }, function (err, res) {
            if (res && res.data && 200 == res.code) {
                $scope.data[kind].name = name;
                parentPg.parent().find(".edit-title").show();
                parentPg.parent().find("i").attr({
                    style: ""
                });
                parentPg.parent().find("input").hide();
                parentPg.parent().find(".done").hide();
            } else {
                if (res) {
                    PN_PAGE.messageLadi(res.messager);
                } else {
                    PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                }
            }
        });
    };
    $scope.createNewLandingpage = function () {
        $state.go("main.newLandingpage");
    };
    $scope.clone = function (origin_template, name, type, cid) {
        if (PN_PAGE.account.dayExpired && parseFloat(PN_PAGE.account.dayExpired) > 0) {
            $restful.post("/landingpage", {
                name: name + " (copy)",
                templateid: origin_template,
                type: type + "",
                cid: cid
            }, function (err, res) {
                if (res && res.data && 200 == res.code) {
                    if (1 != $scope.ispublish) {
                        $scope.data.unshift(res.data);
                    }
                    var txt = "Nh\u00e2n b\u1ea3n th\u00e0nh c\u00f4ng, k\u00e9o l\u00ean \u0111\u1ea7u trang \u0111\u1ec3 ch\u1ec9nh s\u1eeda LadiPage v\u1eeba nh\u00e2n b\u1ea3n!";
                    if (1 == $scope.ispublish) {
                        txt = "Nh\u00e2n b\u1ea3n th\u00e0nh c\u00f4ng, qua ph\u1ea7n b\u1ea3n nh\u00e1p \u0111\u1ec3 ch\u1ec9nh LadiPage v\u1eeba nh\u00e2n b\u1ea3n!";
                    }
                    swal({
                        title: "Th\u00f4ng b\u00e1o ",
                        text: txt,
                        showCancelButton: false,
                        closeOnConfirm: true
                    });
                } else {
                    if (res) {
                        PN_PAGE.messageLadi(res.messager);
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                }
            });
        } else {
            $("#inforupgrade").modal("show");
        }
    };
    $scope.editLandingpage = function (id) {
        $state.go("editor", {
            id: id
        });
    };
    $scope.showRemoveLadi = function (removeid, removeDomain, removeVt) {
        $scope.removeid = removeid;
        $scope.removeDomain = removeDomain;
        $scope.removeVt = removeVt;
        $("#delate-ladi").modal("show");
    };
    $scope.hideModalRemove = function () {
        $("#delate-ladi").modal("hide");
    };
    $scope.remove = function () {
        if (PN_PAGE.account.dayExpired && parseFloat(PN_PAGE.account.dayExpired) > 0) {
            $restful.put("/landingpage/delete", {
                id: $scope.removeid
            }, function (err, res) {
                if (res && 200 == res.code) {
                    swal("\u0110\u00e3 x\u00f3a!", "", "success");
                    $scope.removeid = "";
                    $scope.data.splice($scope.removeVt, 1);
                    $("#delate-ladi").modal("hide");
                } else {
                    swal("Error", err, "error");
                }
            });
        } else {
            $("#inforupgrade").modal("show");
        }
    };
    $scope.khoiphuc = function (id, idxC) {
        $restful.put("/Landingpage/restore", {
            id: id
        }, function (err, res) {
            if (res && 200 == res.code) {
                swal("\u0110\u00e3 kh\u00f4i ph\u1ee5c!", "", "success");
                $scope.data.splice(idxC, 1);
            } else {
                swal("Error", err, "error");
            }
        });
    };
    $scope.setpackage = function (pkg) {
        $scope["package"] = pkg;
        $("#upgrade .all-pac").hide();
    };
    $scope.showallPac = function () {
        if ("none" == $("#upgrade .all-pac").css("display")) {
            $("#upgrade .all-pac").show();
        } else {
            $("#upgrade .all-pac").hide();
        }
    };
    $scope.tmpChangeGiahan = function (data) {
        var _date;
        var value = parseFloat(data);
        _date = $scope.expired && $scope.expired.length > 0 ? new Date($scope.expired) : new Date;
        var month = _date.getMonth();
        month = parseFloat(month) + value;
        _date.setMonth(month);
        $scope.expiredNext = _date;
    };
    $scope.changeGetPublishLadi = function (current, a) {
        $scope.ispublish = parseFloat(current);
        $scope.deleteLp = parseFloat(a);
        AppCtrl();
    };
    $scope.stopLadipage = function (txProposalId, idxC) {
        swal({
            title: "Th\u00f4ng b\u00e1o ",
            text: "B\u1ea1n c\u00f3 ch\u1eafc mu\u1ed1n t\u1ea1m d\u1eebng Landing Page n\u00e0y? (Kh\u00e1ch h\u00e0ng s\u1ebd kh\u00f4ng th\u1ec3 truy c\u1eadp \u0111\u01b0\u1ee3c Landing Page v\u1edbi t\u00ean mi\u1ec1n n\u00e0y n\u1eefa)!",
            showCancelButton: true,
            confirmButtonColor: "#009FE3",
            confirmButtonText: "T\u1ea1m ng\u01b0ng",
            cancelButtonText: "Kh\u00f4ng",
            closeOnConfirm: true
        }, function (canCreateDiscussions) {
            if (canCreateDiscussions) {
                $restful.post("/landingpage/stop", {
                    id: txProposalId,
                    is_publish: "0"
                }, function (canCreateDiscussions, warn) {
                    if (warn && warn.data && 200 == warn.code) {
                        $scope.data.splice(idxC, 1);
                        $('.list-page .site-element[pn-item="' + txProposalId + '"]').hide();
                        swal({
                            title: "Th\u00f4ng b\u00e1o ",
                            text: "T\u1ea1m d\u1eebng th\u00e0nh c\u00f4ng: Landing Page n\u00e0y \u0111\u00e3 t\u1ea1m d\u1eebng v\u00e0 \u0111\u01b0\u1ee3c chuy\u1ec3n sang m\u1ee5c B\u1ea3n nh\u00e1p.",
                            showCancelButton: false,
                            closeOnConfirm: true
                        });
                    } else {
                        if (warn) {
                            PN_PAGE.messageLadi(warn.messager);
                        } else {
                            PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                        }
                    }
                });
            }
        });
    };
    $scope.viewLadipage = function (config) {
        var _url = "";
        if (config.domain && config.domain.length > 0 && -1 != config.domain.search("ladipage.me")) {
            _url = -1 == config.domain.search("http") ? "http://" + config.domain : config.domain;
        } else {
            if (config.domain && config.domain.length > 0 && parseFloat($scope.maxLadipage) > 0) {
                _url = -1 == config.domain.search("http") ? "http://" + config.domain : config.domain;
            } else {
                if (-1 != config.domain.search("theme.punnel.com")) {
                    _url = -1 == config.domain.search("http") ? "http://" + config.domain : config.domain;
                } else {
                    if (config.domain && config.domain.length > 0) {
                        _url = ApiDemo + config.id;
                    }
                }
            }
        }
        if (_url && "" != _url && _url.length > 0) {
            openLink(_url, "_blank");
        }
    };
}]);
