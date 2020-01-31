angular.module("punnelApp").controller("fontManagerCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "editorSvr", "$timeout", "$restful", "Upload", function ($rootScope, $state, $scope, $translate, $stateParams, editorSvr, $timeout, $restful, Upload) {
    $scope.type = "2";
    $scope.pathBase = ApiStatic.substr(0, ApiStatic.length - 1);
    $scope.fontSelect = [];
    $scope.fontSearch = "";
    $scope.getFont = function () {
        $restful.post("/File", {
            page: $scope.start,
            name: $scope.imageSearch,
            type: parseFloat($scope.type)
        }, function (a, data) {
            if (data && 200 == data.code) {
                $scope.fonts = data.data;
                if (data.data.length < 20) {
                    $scope.checkLoad = false;
                }
            } else {
                if (data) {
                    PN_PAGE.messageLadi(data.messager);
                } else {
                    PN_PAGE.messageLadi("Vui l\u00f2ng t\u1ea3i l\u1ea1i trang v\u00e0 th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                }
            }
        });
    };
    $scope.getFont();
    $scope.uploadFiles = function (files) {
        if ($(".loading").css({
            opacity: "0.4"
        }).show(), files && files.length) {
            var i = 0;
            for (; i < files.length; i++) {
                PN_PAGE.uploadImageLadi(Upload, files[i], "/upload", parseFloat($scope.type), "", function (storeCfg) {
                    $scope.fonts.unshift(storeCfg.data.data);
                    if (i > files.length - 3) {
                        $(".loading").css({
                            opacity: "1"
                        }).hide();
                    }
                });
            }
        } else {
            $(".loading").css({
                opacity: "1"
            }).hide();
        }
    };
    $scope.selectFont = function (font, index, obj) {
        var brandToggle = $(obj.target);
        if (brandToggle.hasClass("active")) {
            brandToggle.removeClass("active");
            $scope.fontSelect.splice(index, 1);
        } else {
            brandToggle.addClass("active");
            $scope.fontSelect.push(font);
        }
        $("#managerFont .item-font.active");
    };
    $scope.deleteImage = function () {
        $(".loading").css({
            opacity: "0.4"
        }).show();
        if ($scope.fontSelect && $scope.fontSelect.length > 0) {
            swal({
                title: "X\u00f3a Font ch\u1eef",
                text: "B\u1ea1n s\u1ebd kh\u00f4ng th\u1ec3 ph\u1ee5c h\u1ed3i sau khi x\u00f3a",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "\u0110\u1ed3ng \u00fd",
                cancelButtonText: "Kh\u00f4ng x\u00f3a",
                closeOnConfirm: true
            }, function (a) {
                if (a) {
                    var i = 0;
                    for (; i < $scope.fontSelect.length; i++) {
                        $(".loading").css({
                            opacity: "0.4"
                        }).show();
                        $restful.delete("/file", {
                            id: $scope.fontSelect[i]
                        }, function (a, result) {
                            if (result && 200 == result.code) {
                                $scope.start = 1;
                                $scope.getFont();
                                $("#managerFont .container-image .item.active").removeClass("active");
                            }
                            $(".loading").css({
                                opacity: "1"
                            }).hide();
                        });
                    }
                } else {
                    $(".loading").css({
                        opacity: "1"
                    }).hide();
                }
            });
        } else {
            $(".loading").css({
                opacity: "1"
            }).hide();
            PN_PAGE.messageLadi("Vui l\u00f2ng ch\u1ecdn font ch\u1eef \u0111\u1ec3 x\u00f3a!");
        }
    };
    $scope.searchNameFont = function () {
        if ($scope.fontSearch && $scope.fontSearch.length > 0) {
            $(".loading").css({
                opacity: "0.4"
            }).show();
            $scope.start = 1;
            $restful.post("/File", {
                page: $scope.start,
                name: $scope.fontSearch,
                type: parseFloat($scope.type)
            }, function (a, result) {
                if (result && 200 == result.code) {
                    if (result.data && result.data.length > 0) {
                        $scope.fonts = result.data;
                    }
                } else {
                    if (result) {
                        PN_PAGE.messageLadi(result.messager);
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng t\u1ea3i l\u1ea1i trang v\u00e0 th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                }
                $(".loading").css({
                    opacity: "1"
                }).hide();
            });
        } else {
            $scope.getFont();
        }
    };
}]);
