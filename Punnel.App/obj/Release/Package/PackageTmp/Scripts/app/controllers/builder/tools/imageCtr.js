angular.module("punnelApp").controller("imageCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$window", "popupService", function ($rootScope, $state, $scope, $translate, $stateParams, $window, popupService) {
    $scope.IDTMP = "";
    $rootScope.$watch(function () {
        if (void 0 != selectedItem && "image" == selectedItem.attr("pn-type") && $scope.IDTMP != selectedItem.attr("id")) {
            $scope.IDTMP = selectedItem.attr("id");
            var i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $scope.name = $rootScope.name;
            $scope.url_image = apiElement[i].link;
            $scope.color_overlay = apiElement[i].media.overlay_color;
            if (void 0 == $scope.color_overlay || "" == $scope.color_overlay) {
                $scope.color_overlay = "rgba(255,255,255,0)";
                apiElement[i].media.overlay_color = "rgba(255,255,255,0)";
            }
            $scope.objectfit = apiElement[i].objectfit;
            if (void 0 == $scope.objectfit || "undefined" == $scope.objectfit || "" == $scope.objectfit) {
                $scope.objectfit = "cover";
                apiElement[i].objectfit = "cover";
            }
        }
    });
    $scope.name = $rootScope.name;
    $scope.itemsImage = [];
    $scope.setChangeColorInput = function (city, time) {
        var hideIndentation = (new OptionWiget, time);
        if (void 0 != time && "" != time) {
            $("input.minicolor").colorpicker("setValue", hideIndentation);
        } else {
            hideIndentation = void 0 == city ? $("input.minicolor").val() : $(city.target).val();
        }
        $scope.color_overlay = hideIndentation;
    };
    $scope.changetypeImage = function (a) {
        typeImage = a;
        popupService.imageManagerShow({}, function (res) {
            imgUtils.process(res, typeImage, "");
        });
    };
    $scope.setObjectfit = function (a) {
    };
    $scope.changeTypeImagePlugin = function (walltime, format) {
        var onStartupFailed = selectedItem.find(".widget-content").eq(0);
        var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        $.extend(apiElement[media_id].media.desktop, apiElement[media_id].media.desktop, $scope.itemsImage[format].media.desktop);
        $.extend(apiElement[media_id].media.mobile, apiElement[media_id].media.mobile, $scope.itemsImage[format].media.mobile);
        var localServer = new CheckApiElement;
        localServer.setValueInJson(onStartupFailed, $scope.itemsImage[format].media.desktop);
        $rootScope.id = "reset";
        $rootScope.id = selectedItem.attr("id");
    };
    $scope.changeName = function (event) {
        var i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        $scope.name = $(event.target).text();
        $rootScope.name = $scope.name;
        selectedItem.attr("pn-lang", $scope.name);
        apiElement[i].lang = $scope.name;
    };
    $scope.changeImage = function () {
        if (-1 != $scope.url_image.search(ApiStaticD)) {
            $scope.url_image = $scope.url_image.replace(ApiStaticD, apiStaticDefault);
        } else {
            if (-1 != $scope.url_image.search(ApiStaticT)) {
                $scope.url_image = $scope.url_image.replace(ApiStaticT, apiStaticDefault);
            } else {
                if (-1 != $scope.url_image.search(ApiStaticM)) {
                    $scope.url_image = $scope.url_image.replace(ApiStaticM, apiStaticDefault);
                }
            }
        }
        $scope.setUrlImage($scope.url_image);
    };
    $scope.addImage = function (options) {
        if ($scope.url_image = options, void 0 != selectedItem && selectedItem.length > 0) {
            $scope.setUrlImage($scope.url_image);
        } else {
            var item = new Image;
            item.src = $scope.url_image;
            var position = item.width;
            var size = item.height;
            var f = new AddToFrame;
            var l = f.eleAdd(false);
            var top_ = (l.outerHeight() - size) / 2 + "px";
            var p = (l.outerWidth() - position) / 2 + "px";
            $scope.createPluginImage(l, top_, p, position, size, $scope.url_image);
        }
        $(".ngdialog.lp_image_manager").remove();
    };
    $scope.createPluginImage = function (test, y, e, x, height, a) {
        var renderedAnnotation = PN_PAGE.PUNNEL_EDIT;
        var updatesCount = 0;
        var self = new AddToFrame;
        test.append(valueTemplate.image);
        var $sub = renderedAnnotation.contents().find("#pn-new");
        if (void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain) {
            updatesCount = dummyData.numLayerMain;
        }
        $sub.attr("id", $sub.attr("pn-lang") + "" + updatesCount);
        updatesCount++;
        dummyData.numLayerMain = updatesCount;
        if (parseFloat(y) < 0) {
            y = "0px";
        }
        if (parseFloat(x) > 960) {
            height = 960 * parseFloat(height) / parseFloat(x);
            x = 960;
        }
        $sub.css({
            top: y,
            left: e,
            width: x + "px",
            height: height + "px"
        });
        $sub.find(".widget-content").eq(0).css({
            top: y,
            left: e,
            width: x + "px",
            height: height + "px"
        });
        self.apiDefault("image", "widget-element", $sub.attr("id"), "", y, e, $sub.css("width"), $sub.css("height"));
        selectedItem = renderedAnnotation.contents().find("#" + $sub.attr("id"));
        $scope.setUrlImage(a);
        var that = new OptionWiget;
        if (that.addElementUndo("new", selectedItem), void 0 != elementFullScreen && elementFullScreen.length > 0) {
            var assetListDiv = renderedAnnotation.contents().find("#" + elementFullScreen);
            if (assetListDiv.find("#" + selectedItem.attr("id")).length > 0) {
                var $scope = new ShowBoxResize;
                $scope.showBox(selectedItem);
            }
        }
        that.resetImageMobile(selectedItem);
        var viewModel = new OptionWiget;
        viewModel.fixSizeParent(selectedItem);
        var BDA = new TreeWidget;
        BDA.init();
    };
    $scope.applyFileManage = function () {
        var data;
        var val;
        var size;
        var l;
        var matches = [];
        var g = $(".lp_image_manager .column.active img");
        if (void 0 != g && g.length > 0) {
            if (g.each(function () {
                matches.push($(this).attr("src"));
            }), matches.length <= 0) {
            } else {
                if (void 0 != selectedItem && selectedItem.length > 0) {
                    if ("image" == selectedItem.attr("pn-type")) {
                        if (1 == matches.length) {
                            $scope.url_image = matches[0];
                            $scope.setUrlImage($scope.url_image);
                        } else {
                            $scope.url_image = matches[0];
                            $scope.setUrlImage($scope.url_image);
                            var j = 1;
                            for (; j < matches.length; j++) {
                                $scope.url_image = matches[j];
                                data = new Image;
                                data.src = matches[j];
                                val = data.width;
                                size = data.height;
                                l = selectedItem.parent();
                                $scope.createPluginImage(l, selectedItem.css("top"), selectedItem.css("left"), val, size, $scope.url_image);
                            }
                        }
                    } else {
                        j = 0;
                        for (; j < matches.length; j++) {
                            $scope.url_image = matches[j];
                            data = new Image;
                            data.src = matches[j];
                            val = data.width;
                            size = data.height;
                            if (parseFloat(val) > 960) {
                                size = 960 * parseFloat(size) / parseFloat(val);
                                val = 960;
                            }
                            var index = new AddToFrame;
                            l = index.eleAdd(false);
                            var i = (l.outerHeight() - size) / 2 + "px";
                            var right = (l.outerWidth() - val) / 2 + "px";
                            $scope.createPluginImage(l, i, right, val, size, $scope.url_image);
                        }
                    }
                } else {
                    j = 0;
                    for (; j < matches.length; j++) {
                        $scope.url_image = matches[j];
                        data = new Image;
                        data.src = matches[j];
                        val = data.width;
                        size = data.height;
                        if (parseFloat(val) > 960) {
                            size = 960 * parseFloat(size) / parseFloat(val);
                            val = 960;
                        }
                        index = new AddToFrame;
                        l = index.eleAdd(false);
                        i = (l.outerHeight() - size) / 2 + "px";
                        right = (l.outerWidth() - val) / 2 + "px";
                        $scope.createPluginImage(l, i, right, val, size, $scope.url_image);
                    }
                }
                $(".ngdialog.lp_image_manager").remove();
            }
        }
    };
    $scope.getgoogle = function (event) {
        function initialize() {
            new FilePicker({
                apiKey: "AIzaSyB36Ys5AGYvw26wiPLImIBYrrKiq50qALY",
                clientId: 916817526922,
                buttonEl: document.getElementById("imagepiker"),
                onSelect: function (o) {
                    var filename = o.thumbnailLink;
                    filename = filename.replace("=s220", "");
                    $scope.addImage(filename);
                }
            });
        }
        event.stopPropagation();
        initialize();
    };
    $scope.setColor = function (color) {
        color = PN_PAGE.checkColor(color);
        if (color && selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            selectedItem.find(".punnel-widget-overlay").eq(0).css({
                background: color
            });
            apiElement[media_id].media.overlay_color = color;
        }
    };
    $scope.showColor = function () {
        colorUsing = $scope.color_overlay;
        var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        var item = new OptionWiget;
        var completeTitleOpacity = 1 - item.getOpacityOverLay($scope.color_overlay);
        var backgroundAttr = item.getHex($scope.color_overlay);
        selectedItem.find(".widget-content:eq(0)").css({
            background: backgroundAttr
        });
        selectedItem.find(".widget-content:eq(0) img").css({
            opacity: completeTitleOpacity
        });
        apiElement[media_id].media.overlay_color = $scope.color_overlay;
    };
    $scope.cancelFileManager = function () {
        $(".ngdialog.lp_image_manager").remove();
    };
    $scope.showFileMange = function () {
    };
    $scope.setUrlImage = function (name) {
        if (selectedItem && selectedItem.length > 0) {
            var i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[i].link = name;
            var pix_color = "";
            pix_color = pix_color + (name.replace(apiStaticDefault, ApiStaticM) + " 768w, " + name.replace(apiStaticDefault, ApiStaticT) + " 960w, " + name.replace(apiStaticDefault, ApiStaticD) + " 1280w");
            selectedItem.find(".pn-show-image").eq(0).css({
                "background-image": 'url("' + name + '")'
            });
            var that = new OptionWiget;
            that.addElementUndo("", selectedItem);
        }
    };
    $scope.showColorSetting = function (filterToolbarOptions) {
        if (selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $rootScope.typeColorPicker = filterToolbarOptions;
            $rootScope.colorPickerUsing = apiElement[media_id].media.overlay_color;
            $("#lpColorPickerCtrl").colorpicker("setValue", $rootScope.colorPickerUsing);
            $(".widget-item.custom-color-picker").show();
        }
    };
}]);
