angular.module("punnelApp").controller("themesLadipageCtr", ["$rootScope", "$scope", "$timeout", "APP_CONFIG", "$restful", "$ladiService", "$state", function ($rootScope, $scope, $timeout, APP_CONFIG, $restful, $ladiService, $state) {
    if (interval) {
        clearInterval(interval);
    }
    $scope.classTemplateActive = "";
    $scope.classCategoryActive = "";
    $scope.allCategories = true;
    $scope.typepage = "10";
    $scope.checkLoad = true;
    $scope.start = 1;
    $scope.cid = "";
    $scope.urlPreview = ApiStatic + "/landingpages/";
    $scope.role = PN_PAGE.account.role;
    $timeout(function () {
        PN_PAGE.loading.hide();
        $scope.role = PN_PAGE.account.role;
    }, 2e3);
    $scope.changetypepage = function (id) {
        $scope.typepage = parseFloat(id);
        $scope.categories = [];
        $scope.getCate($scope.typepage);
        $scope.getTem($scope.typepage);
    };
    $scope.getCate = function (type) {
        $restful.get("/cate", {
            type: type,
            limit: 50,
            countTemplate: true
        }, function (err, result) {
            if (result && result.data && 200 == result.code) {
                $scope.categories = result.data;
            }
        });
    };
    $scope.getTem = function (type) {
        $scope.checkLoad = true;
        $restful.get("/template", {
            type: type,
            limit: 30,
            is_publish: "1"
        }, function (err, result) {
            if (result && result.data && result.data.length > 0 && 200 == result.code) {
                $scope.templates = result.data;
                if (result.data.length < 21) {
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
        });
    };
    $scope.getCate($scope.typepage);
    $scope.getTem($scope.typepage);
    $scope.preview = function (id, idPreview, path) {
        var url = path;
        if (url && url.length > 0) {
            if (!(-1 != url.search("http"))) {
                url = "http://" + path;
            }
        } else {
            url = id;
        }
        $scope.idPreview = idPreview;
        window.open(url, "_blank");
    };
    $scope.closePreview = function () {
        $(".popup-detail").hide();
    };
    $scope.loadmore = function () {
        $(".new-landipage .parLoading").show();
        $(".new-landipage .loading").show();
        if ($scope.checkLoad) {
            $scope.start++;
            $restful.get("/template", {
                type: $scope.typepage,
                limit: 30,
                cid: $scope.cid,
                page: $scope.start,
                is_publish: "1"
            }, function (err, result) {
                if (result && 200 == result.code) {
                    if (result.data && result.data.length > 0) {
                        var code = 0;
                        for (; code < result.data.length; code++) {
                            $scope.templates.push(result.data[code]);
                        }
                        if (result.data.length < 18) {
                            $scope.checkLoad = false;
                        } else {
                            $scope.checkLoad = true;
                        }
                    } else {
                        $scope.checkLoad = false;
                        $scope.start = 1;
                    }
                    $(".new-landipage .parLoading").hide();
                } else {
                    if (result) {
                        PN_PAGE.messageLadi(result.messager);
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                    $(".new-landipage .parLoading").hide();
                }
            });
        } else {
            $(".new-landipage .parLoading").hide();
        }
    };
    $scope.typePageCreate = "landingpage";
    $scope.createProject = function (id) {
        var cid = "";
        var typepage = $scope.typepage;
        if (0 != $scope.typepage) {
            cid = $scope.cid;
        }
        if ("editor" != $scope.role) {
            typepage = 0;
        }
        if ($rootScope.$user) {
            $ladiService.createProject(cid, id, typepage, $scope.role);
        } else {
            $state.go("login", {
                idLa: id
            });
        }
    };
    $scope.getTemplateByCategory = function (cid) {
        $(".new-landipage .parLoading").show();
        $(".new-landipage .loading").show();
        $scope.checkLoad = true;
        if ("all" === cid) {
            $scope.cid = "";
            $restful.get("/template", {
                type: $scope.typepage,
                limit: 30,
                is_publish: "1"
            }, function (err, result) {
                if (result && 200 == result.code) {
                    if (result.data && result.data.length > 0) {
                        if (result.data.length < 21) {
                            $scope.checkLoad = false;
                            $scope.start = 1;
                        } else {
                            $scope.checkLoad = true;
                            $scope.start = 1;
                        }
                        $scope.templates = result.data;
                    } else {
                        $scope.checkLoad = false;
                        $scope.start = 1;
                    }
                    $scope.classCategoryActive = "";
                    $timeout(function () {
                        $(".new-landipage .parLoading").hide();
                    }, 1e3);
                } else {
                    $(".new-landipage .parLoading").hide();
                }
            });
        } else {
            $scope.cid = cid;
            $restful.get("/template", {
                type: $scope.typepage,
                cid: cid,
                is_publish: "1",
                limit: 30
            }, function (err, result) {
                if (result && 200 == result.code) {
                    if (result.data && result.data.length > 0) {
                        $scope.templates = result.data;
                        if (result.data.length < 21) {
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
                    $timeout(function () {
                        $(".new-landipage .parLoading").hide();
                    }, 1e3);
                } else {
                    $(".new-landipage .parLoading").hide();
                }
            });
        }
    };
    $scope.activePage = function (page) {
        $("#myTab1 li").removeClass("active");
        $('#myTab1 li[pn-active="' + page + '"]').addClass("active");
    };
}]);
