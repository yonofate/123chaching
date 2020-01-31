angular.module("punnelApp").controller("customShadowCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function ($rootScope, $state, $scope, $translate, $stateParams) {
    $translate.use(localStorage.getItem("lang"));
    $scope.idTMP = "";
    $rootScope.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && $scope.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            $scope.idTMP = selectedItem.attr("id");
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $scope.shadow_x = apiElement[media_id].media.desktop["shadow-x"];
            $scope.shadow_y = apiElement[media_id].media.desktop["shadow-y"];
            $scope.shadow_color = apiElement[media_id].media.desktop["shadow-color"];
            $scope.shadow_blur = apiElement[media_id].media.desktop["shadow-blur"];
            if (void 0 == $scope.shadow_x || "" == $scope.shadow_x) {
                $scope.shadow_x = 0;
            } else {
                $scope.shadow_x = parseFloat(apiElement[media_id].media.desktop["shadow-x"]);
            }
            if (void 0 == $scope.shadow_y || "" == $scope.shadow_y) {
                $scope.shadow_y = 0;
            } else {
                $scope.shadow_y = parseFloat(apiElement[media_id].media.desktop["shadow-y"]);
            }
            if (void 0 == $scope.shadow_blur || "" == $scope.shadow_blur) {
                $scope.shadow_blur = 0;
            } else {
                $scope.shadow_blur = parseFloat(apiElement[media_id].media.desktop["shadow-blur"]);
            }
            if (void 0 == $scope.shadow_color || "" == $scope.shadow_color) {
                $scope.shadow_color = "rgba(0,0,0,1)";
            }
        }
    });
    $scope.items = lp_colors_all;
    $scope.itemNumber = number;
    
    $scope.changeBlur = function (val) {
        $scope.shadow_blur = val;
        $scope.setValueBlur();
    };
    
    $scope.changeValueX = function (navigatorType) {
        $scope.shadow_x = navigatorType;
        $scope.setValueBlur();
    };
    
    $scope.changeValueY = function (navigatorType) {
        $scope.shadow_y = navigatorType;
        $scope.setValueBlur();
    };
    
    $scope.setChangeColorInput = function (city, time) {
        new OptionWiget;
        if (void 0 != time && "" != time) {
            $scope.shadow_color = time;
            $("input.minicolor").colorpicker("setValue", time);
        } else {
            if (void 0 == city) {
                $scope.shadow_color = $("input.minicolor").val();
            } else {
                $scope.shadow_color = $(city.target).val();
            }
        }
    };
    
    $scope.setValueBlur = function () {
        init($scope.shadow_color, $scope.shadow_x, $scope.shadow_y, $scope.shadow_blur);
    };
    
    $scope.setColor = function (color) {
        color = PN_PAGE.checkColor(color);
        if (color) {
            $scope.shadow_color = color;
            init($scope.shadow_color, $scope.shadow_x, $scope.shadow_y, $scope.shadow_blur);
            colorUsing = color;
        }
    };
    
    $scope.setcolorClose = function (shadow_color) {
        shadow_color = PN_PAGE.checkColor(shadow_color);
        if (shadow_color) {
            $scope.shadow_color = shadow_color;
            init($scope.shadow_color, $scope.shadow_x, $scope.shadow_y, $scope.shadow_blur);
            colorUsing = shadow_color;
        }
    };
    
    $scope.setValueX = function () {
        init($scope.shadow_color, $scope.shadow_x, $scope.shadow_y, $scope.shadow_blur);
    };
    
    $scope.setValueY = function () {
        init($scope.shadow_color, $scope.shadow_x, $scope.shadow_y, $scope.shadow_blur);
    };
    
    $scope.showContentSetting = function (lp_setting) {
        var loadingMaskUI = $('.advanced[pn-setting="' + lp_setting + '"] .pn-content-settings');
        if ("none" == loadingMaskUI.css("display")) {
            loadingMaskUI.css({
                display: "block"
            });
        } else {
            loadingMaskUI.css({
                display: "none"
            });
        }
    };
    
    $scope.showColor = function () {
        colorUsing = $scope.shadow_color;
    };
    
    $scope.back = function (obj) {
        savedSel = "";
        var oldActiveEntry = $(obj.target).parent().parent().parent();
        oldActiveEntry.removeClass("active");
    };
    
    var init = function (shadow_color, shadow_x, shadow_y, shadow_blur) {
        if (selectedItem && selectedItem.length > 0) {
            var joystick;
            joystick = selectedItem.hasClass("widget-element") ? selectedItem.find(".widget-content").eq(0) : selectedItem;
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["shadow-x"] = shadow_x + "px";
            apiElement[media_id].media.desktop["shadow-y"] = shadow_y + "px";
            apiElement[media_id].media.desktop["shadow-blur"] = shadow_blur + "px";
            apiElement[media_id].media.desktop["shadow-color"] = shadow_color;
            apiElement[media_id].media.mobile["shadow-x"] = shadow_x + "px";
            apiElement[media_id].media.mobile["shadow-y"] = shadow_y + "px";
            apiElement[media_id].media.mobile["shadow-blur"] = shadow_blur + "px";
            apiElement[media_id].media.mobile["shadow-color"] = shadow_color;
            var boxshadow = "boxshadow";
            apiElement[media_id].type_plugin = selectedItem.attr("pn-type");
            if ("textinline" == apiElement[media_id].type_plugin || "textinline2" == apiElement[media_id].type_plugin || "textinline3" == apiElement[media_id].type_plugin || "textinline5" == apiElement[media_id].type_plugin || "textparagraph" == apiElement[media_id].type_plugin || "textsymbol" == apiElement[media_id].type_plugin || "listop" == apiElement[media_id].type_plugin) {
                boxshadow = "textshadow";
            }
            if ("boxshadow" == boxshadow) {
                joystick.css({
                    "box-shadow": shadow_x + "px " + shadow_y + "px " + shadow_blur + "px " + shadow_color
                });
            } else {
                joystick.css({
                    "text-shadow": shadow_x + "px " + shadow_y + "px " + shadow_blur + "px " + shadow_color
                });
            }
        }
    };
    
    $scope.showColorSetting = function (typeColorPicker) {
        if (selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $rootScope.typeColorPicker = typeColorPicker;
            $rootScope.colorPickerUsing = apiElement[media_id].media[deviceEdit]["shadow-color"];
            $("#lpColorPickerCtrl").colorpicker("setValue", $rootScope.colorPickerUsing);
            $(".widget-item.custom-color-picker").show();
        }
    };
}]);
