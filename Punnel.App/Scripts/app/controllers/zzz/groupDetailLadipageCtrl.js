angular.module("punnelApp").controller("groupDetailLadipageCtrl", ["$scope", "$rootScope", "$stateParams", "$restful", "$state", "$auth", "Upload", function ($scope, $rootScope, $stateParams, $restful, $state, $auth, Upload) {
    $scope.idGroup = $stateParams.id;
    $scope.nameGroup = $rootScope.nameGroup;
    $scope.listLadi = [];
    $scope.start = 1;
    $scope.is_publish = "";
    $scope.loadMore = "true";
    $scope.nameSearchLadi = "";
    $scope.noItem = "false";
    $scope.email = PN_PAGE.account.email;
    $scope.urlEditor = urlBaseEditor;
    $scope.loadLadipageInGroup = function () {
        $scope.noItem = "false";
        $(".parLoading").show();
        $restful.get("/landingpage", {
            name: $scope.nameSearchLadi,
            coid: $scope.idGroup,
            page: $scope.start,
            limit: 50,
            is_publish: $scope.is_publish
        }, function (err, result) {
            if ($(".parLoading").hide(), err) {
                PN_PAGE.messageLadi("Vui l\u00f2ng t\u1ea3i l\u1ea1i trang ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
            } else {
                if (result && 200 == result.code) {
                    var key = 0;
                    for (; key < result.data.length; key++) {
                        $scope.listLadi.push(result.data[key]);
                    }
                    if (result.data.length < 50) {
                        $scope.loadMore = "false";
                    } else {
                        $scope.loadMore = "true";
                    }
                    $scope.searching = 0;
                    if ($scope.listLadi.length <= 0) {
                        $scope.noItem = "true";
                    }
                } else {
                    PN_PAGE.messageLadi(result.messager);
                }
            }
        });
    };
    if ($scope.nameGroup) {
        $scope.loadLadipageInGroup();
    } else {
        $restful.post("/Collection/FindByID", {
            id: $scope.idGroup
        }, function (err, result) {
            if (err) {
                PN_PAGE.messageLadi("Vui l\u00f2ng t\u1ea3i l\u1ea1i trang ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
            } else {
                if (result && 200 == result.code) {
                    $scope.idGroup = result.data.id;
                    $scope.nameGroup = result.data.Name;
                    $rootScope.nameGroup = result.data.Name;
                    $rootScope.idGroup = result.data.id;
                    $scope.loadLadipageInGroup();
                } else {
                    PN_PAGE.messageLadi(result.messager);
                }
            }
        });
    }
    $scope.ladiEdit = {
        id: "",
        name: "",
        vt: 0
    };
    $scope.showEditName = function (id, name, vt) {
        $scope.ladiEdit.id = id;
        $scope.ladiEdit.name = name;
        $scope.ladiEdit.vt = vt;
        $("#edit-name-all").modal("show");
    };
    $scope.editNameGroupLadi = function () {
        $("button").attr("disabled", "disabled");
        if ($scope.ladiEdit.name && $scope.ladiEdit.name.length > 0) {
            $restful.put("/landingpage", {
                id: $scope.ladiEdit.id,
                name: $scope.ladiEdit.name,
                opt:"name"
            }, function (err, result) {
                $("button").removeAttr("disabled");
                if (err) {
                    PN_PAGE.messageLadi("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i");
                } else {
                    if (result && 200 == result.code) {
                        $scope.listLadi[$scope.ladiEdit.vt].name = $scope.ladiEdit.name;
                        $("#edit-name-all").modal("hide");
                        PN_PAGE.messageLadi("\u0110\u1ed5i t\u00ean th\u00e0nh c\u00f4ng");
                    } else {
                        PN_PAGE.messageLadi(result.messager);
                    }
                }
            });
        } else {
            $("button").removeAttr("disabled");
            PN_PAGE.messageLadi("Vui l\u00f2ng nh\u1eadp t\u00ean Landing Page");
        }
    };
    $scope.closeModalEditName = function () {
        $("#edit-name-all").modal("hide");
    };
    $scope.goEditLadipage = function (id) {
        $state.go("editor", {
            id: id
        });
    };
    $scope.idExport = "";
    $scope.showSubmenu = function (obj, idExport) {
        $scope.idExport = idExport;
        obj.stopPropagation();
        var submenu = $('.dropdown[pn-item="' + idExport + '"] .submenu');
        if ("none" == submenu.css("display")) {
            $(".dropdown .submenu").hide();
            submenu.show();
        } else {
            submenu.hide();
        }
    };
    $scope.backToGroupAll = function () {
        $state.go("dashboard.landingpage", {}, {
            reload: true
        });
    };
    $scope.goCreateNewLandingpage = function () {
        if (PN_PAGE.account.dayExpired > 0) {
            $(".modal-backdrop").remove();
            $("#selecte-create-new-ladi").modal("hide");
            $state.go("main.newLandingpage");
        } else {
            $("#inforupgrade").modal("show");
        }
    };
    $("body").unbind("scroll").scroll(function () {
        if ("true" == $scope.loadMore) {
            $scope.start++;
            $scope.loadLadipageInGroup();
        }
    });
    $scope.ladiMove = {
        id: "",
        vt: 0,
        coid: "",
        nameG: ""
    };
    $scope.showMoveLadi = function (id, vt) {
        $scope.ladiMove.id = id;
        $scope.ladiMove.vt = vt;
        $("#move-group").modal("show");
    };
    $scope.nameGroupCreate = "";
    $scope.nameGroupSearch = "";
    $scope.createGroupNew = function () {
        $("button").attr("disabled", "disabled");
        $(".parLoading").show();
        if ($scope.nameGroupCreate && $scope.nameGroupCreate.length > 0) {
            $restful.post("/Collection", {
                type: 1,
                name: $scope.nameGroupCreate
            }, function (err, result) {
                $("button").removeAttr("disabled");
                $(".parLoading").hide();
                if (err) {
                    PN_PAGE.messageLadi("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i");
                } else {
                    if (result && 200 == result.code) {
                        $scope.nameGroupCreate = "";
                        $scope.ladiMove.coid = result.data.id;
                        $scope.ladiMove.nameG = result.data.Name;
                        $scope.nameGroupSearch = result.data.Name;
                        $scope.listGroup.unshift(result.data);
                    } else {
                        PN_PAGE.messageLadi(result.messager);
                    }
                }
            });
        } else {
            $("button").attr("disabled", "disabled");
            $(".parLoading").hide();
            PN_PAGE.messageLadi("Vui l\u00f2ng nh\u1eadp t\u00ean nh\u00f3m");
        }
    };
    $scope.listGroup = [];
    $scope.getAllGroup = function () {
        $restful.get("/collection", {
            tid: 1
        }, function (err, result) {
            if (!err) {
                if (result && 200 == result.code) {
                    $scope.listGroup = result.data;
                }
            }
        });
    };
    $scope.getAllGroup();
    $scope.searchGroup = function () {
        if ($scope.nameGroupSearch && $scope.nameGroupSearch.length > 0) {
            var searchContactPanel = $(".submenu-group-search");
            searchContactPanel.hide();
            var c = $(".submenu-group-search li");
            c.hide();
            c.each(function () {
                if (-1 != $(this).attr("pn-n-g").search($scope.nameGroupSearch)) {
                    $(this).show();
                    searchContactPanel.show();
                }
            });
        } else {
            $(".submenu-group-search").show();
        }
    };
    $scope.selecteGroup = function (coid, nameGroupSearch, obj) {
        obj.stopPropagation();
        obj.preventDefault();
        $(".submenu-group-search").hide();
        $(".submenu-group-search li").show();
        $scope.ladiMove.coid = coid;
        $scope.ladiMove.nameG = nameGroupSearch;
        $scope.nameGroupSearch = nameGroupSearch;
    };
    $scope.moveLadi = function () {
        $restful.post("/Collection/AddListCollection", {
            type: 1,
            coidold: $scope.idGroup,
            ids: [$scope.ladiMove.id],
            coid: $scope.ladiMove.coid
        }, function (err, result) {
            $(".parLoading").hide();
            if (err) {
                PN_PAGE.messageLadi("vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i");
            } else {
                if (result && 200 == result.code) {
                    $scope.listLadi.splice($scope.ladiMove.vt, 1);
                    $scope.cancelMove();
                } else {
                    PN_PAGE.messageLadi(result.messager);
                }
            }
        });
    };
    $scope.cancelMove = function () {
        $("#move-group").modal("hide");
    };
    $scope.ladiDelete = {
        id: "",
        vt: 0,
        name: ""
    };
    $scope.showDeleteLadi = function (id, name, vt) {
        $scope.ladiDelete.id = id;
        $scope.ladiDelete.name = name;
        $scope.ladiDelete.vt = vt;
        $(".delate-ladi").modal("show");
    };
    $scope.hideModalRemove = function () {
        $(".delate-ladi").modal("hide");
    };
    $scope.remove = function () {
        $restful.put("/landingpage/delete", {
            id: $scope.ladiDelete.id
        }, function (err, result) {
            if (result && 200 == result.code) {
                swal("\u0110\u00e3 x\u00f3a!", "", "success");
                $scope.listLadi.splice($scope.ladiDelete.vt, 1);
                $(".delate-ladi").modal("hide");
                $scope.ladiDelete = {
                    id: "",
                    vt: 0,
                    name: ""
                };
            } else {
                swal("Error", err, "error");
            }
        });
    };
    $scope.searching = 0;
    $scope.searchLadipage = function (id) {
        $scope.start = 1;
        $scope.listLadi = [];
        if (0 == $scope.searching) {
            $scope.loadLadipageInGroup();
            $scope.searching = 1;
        }
    };
    $scope.typePage = "";
    $scope.changetypeLadi = function (type) {
        if ("" != type) {
            type = parseFloat(type);
        }
        $scope.typePage = type + "";
        $scope.is_publish = type + "";
        $scope.start = 1;
        $scope.listLadi = [];
        $scope.loadLadipageInGroup();
    };
    $(window).scrollStopped(function (b) {
        if ("true" == $scope.loadMore) {
            $scope.start++;
            $scope.loadLadipageInGroup();
        }
    });
    $scope.stopLadipage = function (id, index) {
        swal({
            title: "Th\u00f4ng b\u00e1o ",
            text: "B\u1ea1n c\u00f3 ch\u1eafc mu\u1ed1n t\u1ea1m d\u1eebng Landing Page n\u00e0y? (Kh\u00e1ch h\u00e0ng s\u1ebd kh\u00f4ng th\u1ec3 truy c\u1eadp \u0111\u01b0\u1ee3c Landing Page v\u1edbi t\u00ean mi\u1ec1n n\u00e0y n\u1eefa)!",
            showCancelButton: true,
            confirmButtonColor: "#009FE3",
            confirmButtonText: "T\u1ea1m ng\u01b0ng",
            cancelButtonText: "Kh\u00f4ng",
            closeOnConfirm: true
        }, function (result) {
            if (result) {
                $restful.post("/landingpage/stop", {
                    id: id,
                    is_publish: "0"
                }, function (err, res) {
                    if (res && res.data && 200 == res.code) {
                        $scope.listLadi[index].is_publish = "0";
                        swal({
                            title: "Th\u00f4ng b\u00e1o ",
                            text: "T\u1ea1m d\u1eebng th\u00e0nh c\u00f4ng: Landing Page n\u00e0y \u0111\u00e3 t\u1ea1m d\u1eebng v\u00e0 \u0111\u01b0\u1ee3c chuy\u1ec3n sang m\u1ee5c B\u1ea3n nh\u00e1p.",
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
            }
        });
    };
    $scope.outGroup = function (id, vt) {
        swal({
            title: "R\u1eddi nh\u00f3m",
            text: "Landing Page c\u1ee7a b\u1ea1n s\u1ebd kh\u00f4ng thu\u1ed9c nh\u00f3m n\u00e0o",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "\u0110\u1ed3ng \u00fd",
            cancelButtonText: "H\u1ee7y"
        }, function (animate_param) {
            console.log(animate_param);
            if (animate_param) {
                $(".parLoading").css({
                    opacity: "0.4"
                }).show();
                $scope.ladiMove.id = id;
                $scope.ladiMove.coid = "";
                $scope.ladiMove.vt = vt;
                $scope.moveLadi();
            }
        });
    };
    $scope.duplicatePage = function (code, name) {
        if (PN_PAGE.account.dayExpired && parseFloat(PN_PAGE.account.dayExpired) > 0) {
            $restful.post("/landingpage", {
                name: name + " (copy)",
                code: code,
                type: "10",
                cid: "",
                coid: $scope.idGroup
            }, function (b, data) {
                if (data && data.data && 200 == data.code) {
                    $scope.listLadi.unshift(data.data);
                    var text = "Nh\u00e2n b\u1ea3n th\u00e0nh c\u00f4ng, k\u00e9o l\u00ean \u0111\u1ea7u trang \u0111\u1ec3 ch\u1ec9nh s\u1eeda LadiPage v\u1eeba nh\u00e2n b\u1ea3n!";
                    swal({
                        title: "Th\u00f4ng b\u00e1o ",
                        text: text,
                        showCancelButton: false,
                        closeOnConfirm: true
                    });
                } else {
                    if (data) {
                        PN_PAGE.messageLadi(data.messager);
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                }
            });
        } else {
            $("#inforupgrade").modal("show");
        }
    };
    $scope.checkKeySearch = function (key) {
        if (13 == key.keyCode) {
            $scope.searchLadipage(key);
        }
    };
    $scope.showCreateBlankLadipage = function () {
        $("#add-name-blank-ladi").modal("show");
        $("#selecte-create-new-ladi").modal("hide");
    };
    $scope.createBlankLadiapge = function () {
        if ($scope.nameLadiCreateNew && $scope.nameLadiCreateNew.length > 0) {
            $("#add-name-blank-ladi").modal("hide");
            PN_PAGE.loading.show()
            $restful.post("/landingpage", {
                name: $scope.nameLadiCreateNew,
                coid: $scope.idGroup,
                type: "0",
            }, function (err, result) {
                if (result && result.data && 200 == result.code) {
                    if ("TYPE_ERROR" != result.data) {
                        $rootScope.idGroup = "";
                        $rootScope.nameGroup = "";
                        $state.go("editor", {
                            id: result.data.id
                        }, "_top");
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
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
            PN_PAGE.messageLadi("Vui l\u00f2ng nh\u1eadp t\u00ean Landing Page");
        }
    };
    $scope.cancelCreateLadi = function () {
        $("#add-name-blank-ladi").modal("hide");
        $("#selecte-create-new-ladi").modal("show");
    };
    $scope.urlExport = ApiPath + "/Landingpage/Export?id=";
    $scope.tokenEx = "&token=" + $auth.getToken();
    $scope.uploadFilesladi = function (result) {
        if (result && result.length) {
            $("#selecte-create-new-ladi").modal("hide");
            PN_PAGE.importLadipage(Upload, result, "/Landingpage/Import", $scope.idGroup, function (result) {
                if (result && 200 == result.data.code) {
                    PN_PAGE.messageLadi("Import file th\u00e0nh c\u00f4ng");
                    $scope.changetypeLadi($scope.typePage);
                } else {
                    $("#selecte-create-new-ladi").modal("show");
                }
            });
        }
    };
}]);
