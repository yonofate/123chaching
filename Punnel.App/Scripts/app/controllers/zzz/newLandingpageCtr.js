angular.module("punnelApp").controller("newLandingpageCtr", ["$scope", "$timeout", "APP_CONFIG", "$restful", "$state", "$stateParams", "$rootScope", function($scope, $timeout, APP_CONFIG, $restful, $state, $stateParams, $rootScope) {
    if (interval) {
        clearInterval(interval);
    }
    $scope.loadingData = false;
    $scope.classTemplateActive = "";
    $scope.classCategoryActive = "";
    $scope.allCategories = true;
    $scope.typepage = "10";
    $scope.checkLoad = true;
    $scope.start = 1;
    $scope.cid = "";
    $scope.urlPreview = ApiStatic + "/landingpages/";
    $scope.role = PN_PAGE.account.role;
    $timeout(function() {
        $scope.role = PN_PAGE.account.role;
    }, 2e3);
    $scope.changetypepage = function(type) {
        $scope.typepage = parseFloat(type);
        $scope.categories = [];
        $scope.getCate($scope.typepage);
        $scope.getTem($scope.typepage);
    };
    $scope.getCate = function(type) {
        $restful.get("/cate", {
            type : type,
            limit : 50,
            countTemplate : true
        }, function(b, result) {
            if (result && result.data && 200 == result.code) {
                $scope.categories = result.data;
            }
        });
    };
    $scope.getTem = function(type) {
        $(".new-landipage .parLoading").show();
        $(".new-landipage .loading").show();
        $scope.checkLoad = true;
        $restful.get("/template", {
            type : type,
            limit : 20,
            is_publish : "1"
        }, function(a, result) {
            $(".new-landipage .parLoading").hide();
            $(".new-landipage .loading").hide();
            if (result && result.data && result.data.length > 0 && 200 == result.code) {
                $scope.templates = $scope.resetImage(result.data);
                if (result.data.length < 20) {
                    $scope.checkLoad = false;
                    $scope.start = 1;
                } else {
                    $scope.checkLoad = true;
                    $scope.start = 1;
                }
            } else {
                $scope.checkLoad = false;
                $scope.start = 1;
                $scope.templates = [];
            }
            $timeout(function() {
                $scope.loadingData = true;
                $scope.loadingDataTemplate = true;
            }, 500);
        });
    };
    $scope.getCate($scope.typepage);
    $scope.getTem($scope.typepage);
    $scope.closePreview = function() {
        $(".popup-detail").hide();
    };
    $scope.usingPreview = function() {
        $scope.createProject($scope.idPreview);
    };
    $scope.loadmore = function() {
        $(".new-landipage .parLoading").show();
        $(".new-landipage .loading").show();
        if ($scope.checkLoad) {
            $scope.start++;
            $restful.get("/template", {
                type : $scope.typepage,
                limit : 30,
                cid : $scope.cid,
                page : $scope.start,
                is_publish : "1"
            }, function(e, result){
                if (result && 200 == result.code) {
                    if (result.data && result.data.length > 0) {
                        result.data = $scope.resetImage(result.data);
                        for (var e = 0; e < result.data.length; e++) {
                            $scope.templates.push(result.data[e]);
                        }
                        if (result.data.length < 20) {
                            $scope.checkLoad = false;
                        } else {
                            $scope.checkLoad = true;
                        }
                    } else {
                        $scope.checkLoad = false;
                        $scope.start = 1;
                    }
                    $timeout(function() {
                        $scope.loadingData = true;
                        $scope.loadingDataTemplate = true;
                    }, 500);
                    $(".new-landipage .parLoading").hide();
                } else {
                    if (result) {
                        PN_PAGE.showMessage(result.messager);
                    } else {
                        PN_PAGE.showMessage("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                    $(".new-landipage .parLoading").hide();
                }
            });
        } else {
            $(".new-landipage .parLoading").hide();
        }
    };
    $scope.typePageCreate = "landingpage";
    $scope.origin_template = "";

    $scope.createProject = function(template) {
        $scope.origin_template = template;
        var result = "";
        var typePage = $scope.typepage;
        if (0 != $scope.typepage) {
            result = $scope.cid;
        }
        if ("editor" != $scope.role) {
            typePage = 0;
        }
        new Date;
        if (0 == typePage && "editor" != $scope.role || 0 != typePage && "editor" == $scope.role && result.length > 0) {
            $("#add-group").modal("show");
        } else {
            PN_PAGE.showMessage("Vui lòng chọn danh mục trước khi tạo mới!");
        }
    };
    $scope.nameNewGroup = $rootScope.nameGroup;
    $scope.idGroup = $rootScope.idGroup;
    $scope.nameSearchGroup = "";
    $scope.nameLadiCreateNew = "";
    $scope.createNewGroup = function(id) {
        var clientId = "";
        var type = $scope.typepage;
        if (0 != $scope.typepage) {
            clientId = $scope.cid;
        }
        if ("editor" != $scope.role) {
            type = 0;
        }
        new Date;
        $("button").attr("disabled", "disabled");
        if ($scope.nameLadiCreateNew && $scope.nameLadiCreateNew.length > 0) {
            $restful.post("/landingpage", {
                name : $scope.nameLadiCreateNew,
                coid : $scope.idGroup,
                type : type + "",
                templateid : $scope.origin_template,
                cid : clientId
            }, function(a, result) {
                $("button").removeAttr("disabled");
                if (result && result.data && 200 == result.code) {
                    if ("TYPE_ERROR" != result.data) {
                        $rootScope.idGroup = "";
                        $rootScope.nameGroup = "";
                        $state.go("editor", {
                            id: result.data.id,
                            type: 'p'
                        }, "_top");
                    } else {
                        PN_PAGE.showMessage("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                } else {
                    if (result) {
                        PN_PAGE.showMessage(result.messager);
                    } else {
                        PN_PAGE.showMessage("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                }
            });
        } else {
            $("button").removeAttr("disabled");
            PN_PAGE.showMessage("Vui l\u00f2ng nh\u1eadp t\u00ean Landing Page");
        }
    };
    $scope.deleteLandingpage = function(id) {
        $restful.delete("/landingpage", {
            id : id
        }, function(err, result) {
            if (result) {
                swal("\u0110\u00e3 x\u00f3a!", "", "success");
            } else {
                swal("Error", err, "error");
            }
            $scope.getTemplateByCategory($scope.cid);
        });
    };
    $scope.deleteTemplate = function (id) {
        $restful.delete("/template", {
            id: id
        }).then(function (result) {
            swal("\u0110\u00e3 x\u00f3a!", "", "success");
            $scope.getTemplateByCategory($scope.cid);
        });
    };
    $scope.getTemplateByCategory = function(cid) {
        $(".new-landipage .parLoading").show();
        $(".new-landipage .loading").show();
        $scope.checkLoad = true;
        $scope.loadingDataTemplate = false;
        if ("all" === cid) {
            $scope.cid = "";
            $restful.get("/template", {
                type : $scope.typepage,
                limit : 30,
                is_publish : "1"
            }, function(e, result) {
                if (result && 200 == result.code) {
                    if (result.data && result.data.length > 0) {
                        if (result.data.length < 20) {
                            $scope.checkLoad = false;
                            $scope.start = 1;
                        } else {
                            $scope.checkLoad = true;
                            $scope.start = 1;
                        }
                        $scope.templates = $scope.resetImage(result.data);
                    } else {
                        $scope.checkLoad = false;
                        $scope.start = 1;
                    }
                    $scope.classCategoryActive = "";
                    $timeout(function() {
                        $(".new-landipage .parLoading").hide();
                        $scope.loadingDataTemplate = true;
                    }, 1e3);
                } else {
                    $(".new-landipage .parLoading").hide();
                }
            });
        } else {
            $scope.cid = cid;
            $restful.get("/template", {
                type : $scope.typepage,
                cid : cid,
                is_publish : "1",
                limit : 30
            }, function(e, result) {
                if (result && 200 == result.code) {
                    if (result.data && result.data.length > 0) {
                        $scope.templates = $scope.resetImage(result.data);
                        if (result.data.length < 20) {
                            $scope.checkLoad = false;
                            $scope.start = 1;
                        } else {
                            $scope.checkLoad = true;
                            $scope.start = 1;
                        }
                    } else {
                        $scope.templates = [];
                        $scope.checkLoad = false;
                        $scope.start = 1;
                    }
                    $scope.classCategoryActive = cid;
                    $timeout(function() {
                        $(".new-landipage .parLoading").hide();
                        $scope.loadingDataTemplate = true;
                    }, 1e3);
                } else {
                    $(".new-landipage .parLoading").hide();
                }
            });
        }
    };
    $scope.activePage = function(newPage) {
        $("#myTab1 li").removeClass("active");
        $('#myTab1 li[pn-active="' + newPage + '"]').addClass("active");
    };
    $scope.resetImage = function(img) {
        if (!(img && img.length > 0)) {
            return img;
        }
        var j = 0;
        for (; j < img.length; j++) {
            if (img[j].thumbnail = img[j].thumbnail.replace("hstatic.punnel.com//", "hstatic.punnel.com/"), img[j].thumbnail = img[j].thumbnail.replace(ApiStatic, ApiStatic + "s360x250/"), j == img.length - 1) {
                return img;
            }
        }
    };
}]);
