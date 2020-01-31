angular.module("punnelApp").controller("managerTemplateCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "APP_CONFIG", "$window", "$timeout", "templateSvr", function ($rootScope, $state, $scope, $translate, $stateParams, APP_CONFIG, $window, $timeout, templateSvr) {
    var service = new GetDataService;
    var data = (service.urlParam("uid"), service.urlParam("ladi"));
    var notice = function (error) {
        $scope.errorMessage = error;
        $timeout(function () {
            $(".ngdialog.error").remove();
        }, 1500);
    };
    $scope.guidUsing = "";
    $scope.guidCate = "";
    $scope.urlStatic = APP_CONFIG.URL_STATIC;
    $scope.nameSearch = "";
    $scope.start = 1;
    templateSvr.getTemplatePublish(typeTemplate, "", "", 1, function (result) {
        if (200 == result.code) {
            parse(result.data.data);
            $scope.itemsTemplate = result.data.data;
            $scope.totalItems = result.data.total_row;
        }
    }, function (err) {
        notice("\u0110\u00e3 x\u1ea3y ra l\u1ed7i!");
    });
    $scope.loadMoreItemLadipage = function () {
        $(".page-management .content").on("mousewheel", function () {
            $scope.start++;
            if ($scope.start <= $scope.totalItems / 8 + 1) {
                templateSvr.getTemplatePublish(typeTemplate, "", $scope.guidCate, $scope.start, function (result) {
                    if (200 == result.code) {
                        parse(result.data.data);
                        var a = 0;
                        for (; a < result.data.data.length; a++) {
                            $scope.itemsTemplate.push(result.data.data[a]);
                        }
                        $scope.totalItems = result.data.total_row;
                    } else {
                        notice(result.message);
                    }
                }, function (err) {
                    notice("\u0110\u00e3 x\u1ea3y ra l\u1ed7i!");
                });
            }
        });
    };
    templateSvr.loadCategory(typeTemplate, function (result) {
        if (200 == result.code) {
            $scope.itemsCategory = result.data;
        } else {
            notice(result.message);
        }
    }, function (b) {
        notice(b.message);
    });
    $scope.loadAllTemplate = function (obj) {
        $(".manager_template .list-category .item").removeClass("active");
        $(obj.target).parent().addClass("active");
        $scope.start = 1;
        $scope.guidCate = "";
        templateSvr.getTemplatePublish(typeTemplate, "", "", 1, function (result) {
            if (200 == result.code) {
                parse(result.data.data);
                $scope.itemsTemplate = result.data.data;
                $scope.totalItems = result.data.total_row;
            }
        }, function (err) {
            notice("\u0110\u00e3 x\u1ea3y ra l\u1ed7i!");
        });
    };
    $scope.loadTemplateByCate = function (cate, obj) {
        $(".select-template .list-category .item").removeClass("active");
        $(obj.target).parent().addClass("active");
        $scope.start = 1;
        $scope.guidCate = cate;
        templateSvr.getTemplatePublish(typeTemplate, "", cate, 1, function (result) {
            if (200 == result.code) {
                parse(result.data.data);
                $scope.itemsTemplate = result.data.data;
                $scope.totalItems = result.data.total_row;
            } else {
                notice(result.message);
            }
        }, function (err) {
            notice("\u0110\u00e3 x\u1ea3y ra l\u1ed7i!");
        });
    };
    $scope.createNewLadipage = function (navigatorType) {
        $(".ngdialog.manager_template").remove();
        $scope.guid_using = navigatorType;
    };
    $scope.usingTemplate = function () {
        if (void 0 != $scope.guidUsing && null != $scope.guidUsing && "" != $scope.guidUsing) {
            $scope.createNewLadipage($scope.guidUsing);
        }
    };
    $scope.searchTmp = function () {
        if ("" != $scope.nameSearch) {
            var a = $(".select-template .searchladi");
            a.hide();
            a.each(function () {
                var attr_search = $(this).attr("pn-search-ladi");
                if (-1 != attr_search.search($scope.nameSearch)) {
                    $(this).show();
                }
            });
        } else {
            $(".select-template .searchladi").show();
        }
    };
    $scope.addClassActive = function (obj) {
        $(".manager_template .templates.select-template .category .icon8-bg.active").removeClass("active");
        $(obj.target).addClass("active");
    };
    $scope.setItemSelect = function (val) {
        $(".templates .column").removeClass("active");
        $('.templates .column[pn-add-active="' + val + '"]').addClass("active");
        $scope.guidUsing = val;
    };
    $(".settings").removeClass("active");
    $scope.closePage = function () {
        if (void 0 != data && "" != data && null != data) {
            fadeOutAnimate($(".ngdialog.manager_template"));
        } else {
            if (0 == roleUser) {
                fadeOutAnimate($(".ngdialog.manager_template"));
            } else {
                fadeOutAnimate($(".ngdialog.manager_template"));
            }
        }
    };
    var parse = function (items) {
        angular.forEach(items, function (item, i) {
            if (void 0 != item.thumbnail && "" != item.thumbnail && null != item.thumbnail) {
                if (0 == item.thumbnail || -1 != item.thumbnail.search("https://hstatic.punnel.com") || "" == item.thumbnail) {
                    item.thumbnail = "css/img/noimage.png";
                } else {
                    item.thumbnail = $.base64.decode(item.thumbnail);
                }
            } else {
                item.thumbnail = "images/noimage.png";
            }
        });
    };
}]);
