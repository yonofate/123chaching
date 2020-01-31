angular.module("punnelApp").controller("customBorderCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function($rootScope, $state, $scope, $translate, $stateParams) {
    $translate.use(localStorage.getItem("lang"));
    $scope.items = lp_colors_all;
    $scope.border_width = 0;
    $scope.radius = 0;
    $scope.idTMP = "";
    $scope.borderWidthDefault = "0";
    $scope.typeborder = "solid";
    $rootScope.$watch(function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element") && $scope.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            $scope.idTMP = selectedItem.attr("id");
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $scope.border_style = apiElement[media_id].media.desktop["border-style"];
            $scope.border_color = apiElement[media_id].media.desktop["border-color"];
            $scope.border_type = "";
            $scope.radius_type = "";
            $scope.padding = apiElement[media_id].media.desktop.padding;
            if (void 0 == $scope.padding || "" == $scope.padding) {
                $scope.padding = 0;
            }
            if ("" == $scope.border_color || void 0 == $scope.border_color) {
                $scope.border_color = "rgba(0,0,0,1)";
            }
            if (void 0 == $scope.border_style || "" == $scope.border_style) {
                $scope.border_style = "solid";
            }
            $scope.getValueRadiusDefault();
            $scope.getValueBorderDefault();
            if ($scope.border_top == $scope.border_bottom && $scope.border_top == $scope.border_left && $scope.border_top == $scope.border_right) {
                $scope.border_width = $scope.border_top;
            } else {
                $scope.border_width = 0;
            }
            if ($scope.radius_bottom_left == $scope.radius_top_left && $scope.radius_top_left == $scope.radius_top_right && $scope.radius_top_left == $scope.radius_bottom_right) {
                $scope.radius = $scope.radius_top_left;
            } else {
                $scope.radius = 0;
            }
        }
    });

    $scope.showOptionSelect = function(obj){
        var context_list = $(obj.target).parent().find(".option-select").eq(0);
        if ("none" == context_list.css("display")) {
            context_list.show();
        } else {
            context_list.show();
        }
    };

    $scope.setValuetypeBorder = function(border_style) {
        $scope.border_style = border_style;
        $scope.setValueType();
        $(".type-border li").removeClass("active");
        $('.type-border li[pn-active="' + border_style + '"]').removeClass("active");
    };

    $scope.setborderdefault = function(border_width) {
        $scope.border_width = parseFloat(border_width);
        $scope.setValueBorder();
    };

    $scope.setValueBorderRadius = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            $scope.radius_bottom_left = $scope.radius_bottom_right = $scope.radius_top_left = $scope.radius_top_right = $scope.radius;
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["border-top-left-radius"] = $scope.radius + "px";
            apiElement[media_id].media.desktop["border-top-right-radius"] = $scope.radius + "px";
            apiElement[media_id].media.desktop["border-bottom-left-radius"] = $scope.radius + "px";
            apiElement[media_id].media.desktop["border-bottom-right-radius"] = $scope.radius + "px";
            apiElement[media_id].media.mobile["border-top-left-radius"] = $scope.radius + "px";
            apiElement[media_id].media.mobile["border-top-right-radius"] = $scope.radius + "px";
            apiElement[media_id].media.mobile["border-bottom-left-radius"] = $scope.radius + "px";
            apiElement[media_id].media.mobile["border-bottom-right-radius"] = $scope.radius + "px";
            $scope.setValueBorderRadiusElement();
            if (0 == $scope.radius) {
                $(".pn-border-radius .column").removeClass("active");
                $('.pn-border-radius .column[pn-active="top-left"] svg').attr("fill", "#aaa");
                $('.pn-border-radius .column[pn-active="top-right"] svg').attr("fill", "#aaa");
                $('.pn-border-radius .column[pn-active="bottom-right"] svg').attr("fill", "#aaa");
                $('.pn-border-radius .column[pn-active="bottom-left"] svg').attr("fill", "#aaa");
            } else {
                $(".pn-border-radius .column").addClass("active");
                $('.pn-border-radius .column[pn-active="top-left"] svg').attr("fill", "#000");
                $('.pn-border-radius .column[pn-active="top-right"] svg').attr("fill", "#000");
                $('.pn-border-radius .column[pn-active="bottom-right"] svg').attr("fill", "#000");
                $('.pn-border-radius .column[pn-active="bottom-left"] svg').attr("fill", "#000");
            }
        }
    };

    $scope.setValueTopLeftRadius = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["border-top-left-radius"] = $scope.radius_top_left + "px";
            apiElement[media_id].media.mobile["border-top-left-radius"] = $scope.radius_top_left + "px";
            $scope.setValueBorderRadiusElement();
            if (0 == $scope.radius_top_left) {
                $('.pn-border-radius .column[pn-active="top-left"] svg').attr("fill", "#aaa");
            } else {
                $('.pn-border-radius .column[pn-active="top-left"] svg').attr("fill", "#000");
            }
        }
    };

    $scope.setValueTopRightRadius = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["border-top-right-radius"] = $scope.radius_top_right + "px";
            apiElement[media_id].media.mobile["border-top-right-radius"] = $scope.radius_top_right + "px";
            $scope.setValueBorderRadiusElement();
            if (0 == $scope.radius_top_right) {
                $('.pn-border-radius .column[pn-active="top-right"] svg').attr("fill", "#aaa");
            } else {
                $('.pn-border-radius .column[pn-active="top-right"] svg').attr("fill", "#000");
            }
        }
    };

    $scope.setValueBottomLeftRadius = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["border-bottom-left-radius"] = $scope.radius_bottom_left + "px";
            apiElement[media_id].media.mobile["border-bottom-left-radius"] = $scope.radius_bottom_left + "px";
            $scope.setValueBorderRadiusElement();
            if (0 == $scope.radius_bottom_left) {
                $('.pn-border-radius .column[pn-active="bottom-left"] svg').attr("fill", "#aaa");
            } else {
                $('.pn-border-radius .column[pn-active="bottom-left"] svg').attr("fill", "#000");
            }
        }
    };

    $scope.setValueBottomRightRadius = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["border-bottom-right-radius"] = $scope.radius_bottom_right + "px";
            apiElement[media_id].media.mobile["border-bottom-right-radius"] = $scope.radius_bottom_right + "px";
            $scope.setValueBorderRadiusElement();
            if (0 == $scope.radius_bottom_right) {
                $('.pn-border-radius .column[pn-active="bottom-right"] svg').attr("fill", "#aaa");
            } else {
                $('.pn-border-radius .column[pn-active="bottom-right"] svg').attr("fill", "#000");
            }
        }
    };

    $scope.setValueBorderRadiusElement = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var item;
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            var $imagesToLoad = void 0;
            if (selectedItem.hasClass("widget-element")) {
                if ("contact_form" == selectedItem.attr("pn-type")) {
                    item = selectedItem.find('.widget-item-child[pn-type="item_form"] .widget-content');
                    $imagesToLoad = selectedItem.find('.widget-item-child[pn-type="item_form"]');
                } else {
                    if ("menu-header" == selectedItem.attr("pn-type")) {
                        item = selectedItem.find('.widget-item-child[pn-type="item_menu"] .widget-content');
                        $imagesToLoad = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
                    } else {
                        item = selectedItem.find(".widget-content").eq(0);
                    }
                }
            } else {
                item = selectedItem;
            }
            if (void 0 != $imagesToLoad && $imagesToLoad.length > 0) {
                $imagesToLoad.each(function() {
                    var media_id = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[media_id].media.desktop["border-top-left-radius"] = $scope.radius_top_left + "px";
                    apiElement[media_id].media.mobile["border-top-left-radius"] = $scope.radius_top_left + "px";
                    apiElement[media_id].media.desktop["border-top-right-radius"] = $scope.radius_top_left + "px";
                    apiElement[media_id].media.mobile["border-top-right-radius"] = $scope.radius_top_left + "px";
                    apiElement[media_id].media.desktop["border-bottom-left-radius"] = $scope.radius_top_left + "px";
                    apiElement[media_id].media.mobile["border-bottom-left-radius"] = $scope.radius_top_left + "px";
                    apiElement[media_id].media.desktop["border-bottom-right-radius"] = $scope.radius_top_left + "px";
                    apiElement[media_id].media.mobile["border-bottom-right-radius"] = $scope.radius_top_left + "px";
                });
            }
            item.css({
                "border-bottom-right-radius" : apiElement[media_id].media.desktop["border-bottom-right-radius"],
                "border-bottom-left-radius" : apiElement[media_id].media.desktop["border-bottom-left-radius"],
                "border-top-right-radius" : apiElement[media_id].media.desktop["border-top-right-radius"],
                "border-top-left-radius" : apiElement[media_id].media.desktop["border-top-left-radius"]
            });
        }
    };

    $scope.changeBoderWidth = function(border_width) {
        $(".value-border li").removeClass("active");
        $('.value-border li[pn-active="' + border_width + '"]').removeClass("active");
        $scope.border_width = border_width;
        $scope.setValueBorder();
    };

    $scope.setValueBorder = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $scope.border_top = $scope.border_left = $scope.border_right = $scope.border_bottom = $scope.border_width;
            apiElement[media_id].media.desktop["border-top"] = $scope.border_width + "px";
            apiElement[media_id].media.desktop["border-left"] = $scope.border_width + "px";
            apiElement[media_id].media.desktop["border-right"] = $scope.border_width + "px";
            apiElement[media_id].media.desktop["border-bottom"] = $scope.border_width + "px";
            apiElement[media_id].media.mobile["border-top"] = $scope.border_width + "px";
            apiElement[media_id].media.mobile["border-left"] = $scope.border_width + "px";
            apiElement[media_id].media.mobile["border-right"] = $scope.border_width + "px";
            apiElement[media_id].media.mobile["border-bottom"] = $scope.border_width + "px";
            if ($scope.border_width > 0) {
                apiElement[media_id].media.desktop["border-style"] = $scope.border_type;
                apiElement[media_id].media.mobile["border-style"] = $scope.border_type;
            }
            $scope.setValueBorderElement();
            if (0 == $scope.border_width) {
                $(".pn-border .column").removeClass("active");
                $('.pn-border .column[pn-active="top"]').removeClass("active");
                $('.pn-border .column[pn-active="left"]').removeClass("active");
                $('.pn-border .column[pn-active="right"]').removeClass("active");
                $('.pn-border .column[pn-active="bottom"]').removeClass("active");
            } else {
                $(".pn-border .column").addClass("active");
                $('.pn-border .column[pn-active="top"]').addClass("active");
                $('.pn-border .column[pn-active="left"]').addClass("active");
                $('.pn-border .column[pn-active="right"]').addClass("active");
                $('.pn-border .column[pn-active="bottom"]').addClass("active");
            }
        }
    };

    $scope.setValueBorderTop = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["border-top"] = $scope.border_top + "px";
            apiElement[media_id].media.mobile["border-top"] = $scope.border_top + "px";
            $scope.setValueBorderElement();
            if (0 == $scope.border_top) {
                $('.pn-border .column[pn-active="top"]').removeClass("active");
            } else {
                $('.pn-border .column[pn-active="top"]').addClass("active");
            }
        }
    };

    $scope.setValueBorderRight = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["border-right"] = $scope.border_right + "px";
            apiElement[media_id].media.mobile["border-right"] = $scope.border_right + "px";
            $scope.setValueBorderElement();
            if (0 == $scope.border_right) {
                $('.pn-border .column[pn-active="right"]').removeClass("active");
            } else {
                $('.pn-border .column[pn-active="right"]').addClass("active");
            }
        }
    };

    $scope.setValueBorderBottom = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["border-bottom"] = $scope.border_bottom + "px";
            apiElement[media_id].media.mobile["border-bottom"] = $scope.border_bottom + "px";
            $scope.setValueBorderElement();
            if (0 == $scope.border_bottom) {
                $('.pn-border .column[pn-active="bottom"]').removeClass("active");
            } else {
                $('.pn-border .column[pn-active="bottom"]').addClass("active");
            }
        }
    };

    $scope.setValueBorderLeft = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["border-left"] = $scope.border_left + "px";
            apiElement[media_id].media.mobile["border-left"] = $scope.border_left + "px";
            $scope.setValueBorderElement();
            if (0 == $scope.border_left) {
                $('.pn-border .column[pn-active="left"]').removeClass("active");
            } else {
                $('.pn-border .column[pn-active="left"]').addClass("active");
            }
        }
    };

    $scope.setChangeColorInput = function(obj, border_color) {
        new OptionWiget;
        if (void 0 != border_color && "" != border_color) {
            $scope.border_color = border_color;
            $("input.minicolor").colorpicker("setValue", border_color);
        } else {
            if (void 0 == obj) {
                $scope.border_color = $("input.minicolor").val();
            } else {
                $scope.border_color = $(obj.target).val();
            }
        }
        $scope.colorSelect = $scope.colorTmpSelect;
    };

    $scope.setColor = function(border_color) {
        border_color = PN_PAGE.checkColor(border_color);
        if (border_color && void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["border-color"] = border_color;
            apiElement[media_id].media.mobile["border-color"] = border_color;
            $scope.setValueBorderElement();
            $scope.border_color = border_color;
            colorUsing = border_color;
            var $imagesToLoad = void 0;
            if ("menu-header" == selectedItem.attr("pn-type")) {
                $imagesToLoad = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
            }
            if ("contact_form" == selectedItem.attr("pn-type")) {
                $imagesToLoad = selectedItem.find('.widget-item-child[pn-type="item_form"]');
            }
            if (void 0 != $imagesToLoad && $imagesToLoad.length > 0) {
                $imagesToLoad.each(function() {
                    var media_id = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[media_id].media.desktop["border-color"] = border_color;
                    apiElement[media_id].media.mobile["border-color"] = border_color;
                });
            }
        }
    };

    $scope.setcolorClose = function(border_color) {
        border_color = PN_PAGE.checkColor(border_color);
        if (border_color && selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["border-color"] = border_color;
            apiElement[media_id].media.mobile["border-color"] = border_color;
            $scope.setValueBorderElement();
            $scope.border_color = border_color;
            colorUsing = border_color;
        }
    };

    $scope.setValueType = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].media.desktop["border-style"] = $scope.border_style;
            apiElement[media_id].media.mobile["border-style"] = $scope.border_style;
            $scope.setValueBorderElement();
        }
    };

    $scope.setValueBorderElement = function() {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var element;
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[media_id].media.desktop["border-top"] = $scope.border_top + "px", apiElement[media_id].media.mobile["border-top"] = $scope.border_top + "px", apiElement[media_id].media.desktop["border-left"] = $scope.border_left + "px", apiElement[media_id].media.mobile["border-left"] = $scope.border_left + "px", apiElement[media_id].media.desktop["border-right"] = $scope.border_right + "px", apiElement[media_id].media.mobile["border-right"] = $scope.border_right + 
            "px", apiElement[media_id].media.desktop["border-bottom"] = $scope.border_bottom + "px", apiElement[media_id].media.mobile["border-bottom"] = $scope.border_bottom + "px", apiElement[media_id].media.desktop["border-color"] = $scope.border_color, apiElement[media_id].media.mobile["border-color"] = $scope.border_color, apiElement[media_id].media.desktop["border-style"] = $scope.border_style, apiElement[media_id].media.mobile["border-style"] = $scope.border_style, 
            selectedItem.hasClass("widget-section")) {
                element = selectedItem;
            } else {
                var $imagesToLoad = void 0;
                if ("contact_form" == selectedItem.attr("pn-type")) {
                    element = selectedItem.find('.widget-item-child[pn-type="item_form"] .widget-content');
                    $imagesToLoad = selectedItem.find('.widget-item-child[pn-type="item_form"]');
                } else {
                    if ("menu-header" == selectedItem.attr("pn-type")) {
                        element = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
                        $imagesToLoad = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
                    } else {
                        element = selectedItem.find(".widget-content").eq(0);
                    }
                }
                if (void 0 != $imagesToLoad && $imagesToLoad.length > 0) {
                    $imagesToLoad.each(function() {
                        var media_id = PN_PAGE.getIndexElement($(this).attr("id"));
                        apiElement[media_id].media.desktop["border-top"] = $scope.border_top + "px";
                        apiElement[media_id].media.mobile["border-top"] = $scope.border_top + "px";
                        apiElement[media_id].media.desktop["border-left"] = $scope.border_left + "px";
                        apiElement[media_id].media.mobile["border-left"] = $scope.border_left + "px";
                        apiElement[media_id].media.desktop["border-right"] = $scope.border_right + "px";
                        apiElement[media_id].media.mobile["border-right"] = $scope.border_right + "px";
                        apiElement[media_id].media.desktop["border-bottom"] = $scope.border_bottom + "px";
                        apiElement[media_id].media.mobile["border-bottom"] = $scope.border_bottom + "px";
                        apiElement[media_id].media.desktop["border-color"] = $scope.border_color;
                        apiElement[media_id].media.mobile["border-color"] = $scope.border_color;
                        apiElement[media_id].media.desktop["border-style"] = $scope.border_style;
                        apiElement[media_id].media.mobile["border-style"] = $scope.border_style;
                    });
                }
            }
            element.css({
                "border-top" : apiElement[media_id].media.desktop["border-top"],
                "border-left" : apiElement[media_id].media.desktop["border-left"],
                "border-bottom" : apiElement[media_id].media.desktop["border-bottom"],
                "border-right" : apiElement[media_id].media.desktop["border-right"],
                "border-style" : apiElement[media_id].media.desktop["border-style"],
                "border-color" : apiElement[media_id].media.desktop["border-color"]
            });
        }
    };

    $scope.resetBorder = function(border_type) {
        $scope.border_type = border_type;
        if ("" == border_type) {
            $scope.border_width = 0;
            $scope.setValueBorder();
        }
        if ("top" == border_type) {
            $scope.border_top = 0;
            $scope.setValueBorderTop();
        }
        if ("left" == border_type) {
            $scope.border_left = 0;
            $scope.setValueBorderLeft();
        }
        if ("bottom" == border_type) {
            $scope.border_bottom = 0;
            $scope.setValueBorderBottom();
        }
        if ("right" == border_type) {
            $scope.border_right = 0;
            $scope.setValueBorderRight();
        }
    };

    $scope.resetValueRadius = function(radius_type) {
        $scope.radius_type = radius_type;
        if ("" == radius_type) {
            $scope.radius = 0;
            $scope.setValueBorderRadius();
        }
        if ("top-left" == radius_type) {
            $scope.radius_top_left = 0;
            $scope.setValueTopLeftRadius();
        }
        if ("top-right" == radius_type) {
            $scope.radius_top_right = 0;
            $scope.setValueTopRightRadius();
        }
        if ("bottom-left" == radius_type) {
            $scope.radius_bottom_left = 0;
            $scope.setValueBottomLeftRadius();
        }
        if ("bottom-right" == radius_type) {
            $scope.radius_bottom_right = 0;
            $scope.setValueBottomRightRadius();
        }
    };

    $scope.showContentSetting = function(lp_setting, b) {
        var loadingMaskUI = $('.advanced[pn-setting="' + lp_setting + '"] .pn-content-settings');
        if ("none" == loadingMaskUI.css("display")) {
            loadingMaskUI.css({
                display : "block"
            });
        } else {
            loadingMaskUI.css({
                display : "none"
            });
        }
    };

    $scope.showColor = function() {
        colorUsing = $scope.border_color;
    };

    $scope.getColorBorder = function(a) {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var templateGridCol;
            templateGridCol = selectedItem.hasClass("widget-element") ? selectedItem.find(".widget-content").eq(0) : selectedItem;
            $scope.border_color = templateGridCol.css("border-color");
        }
    };

    $scope.back = function(to) {
        savedSel = "";
    };

    $scope.getValueRadiusDefault = function() {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $scope.radius_top_left = apiElement[media_id].media.desktop["border-top-left-radius"];
            if (void 0 == $scope.radius_top_left || "" == $scope.radius_top_left) {
                $scope.radius_top_left = 0;
            } else {
                $scope.radius_top_left = parseFloat(apiElement[media_id].media.desktop["border-top-left-radius"]);
            }
            $scope.radius_top_right = apiElement[media_id].media.desktop["border-top-right-radius"];
            if (void 0 == $scope.radius_top_right || "" == $scope.radius_top_right) {
                $scope.radius_top_right = 0;
            } else {
                $scope.radius_top_right = parseFloat(apiElement[media_id].media.desktop["border-top-right-radius"]);
            }
            $scope.radius_bottom_left = apiElement[media_id].media.desktop["border-bottom-left-radius"];
            if (void 0 == $scope.radius_bottom_left || "" == $scope.radius_bottom_left) {
                $scope.radius_bottom_left = 0;
            } else {
                $scope.radius_bottom_left = parseFloat(apiElement[media_id].media.desktop["border-bottom-left-radius"]);
            }
            $scope.radius_bottom_right = apiElement[media_id].media.desktop["border-bottom-right-radius"];
            if (void 0 == $scope.radius_bottom_right || "" == $scope.radius_bottom_right) {
                $scope.radius_bottom_right = 0;
            } else {
                $scope.radius_bottom_right = parseFloat(apiElement[media_id].media.desktop["border-bottom-right-radius"]);
            }
        }
    };

    $scope.getValueBorderDefault = function() {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $scope.border_bottom = apiElement[media_id].media.desktop["border-bottom"];
            if (void 0 == $scope.border_bottom || "" == $scope.border_bottom) {
                $scope.border_bottom = 0;
            } else {
                $scope.border_bottom = parseFloat(apiElement[media_id].media.desktop["border-bottom"]);
            }
            $scope.border_top = apiElement[media_id].media.desktop["border-top"];
            if (void 0 == $scope.border_top || "" == $scope.border_top) {
                $scope.border_top = 0;
            } else {
                $scope.border_top = parseFloat(apiElement[media_id].media.desktop["border-top"]);
            }
            $scope.border_left = apiElement[media_id].media.desktop["border-left"];
            if (void 0 == $scope.border_left || "" == $scope.border_left) {
                $scope.border_left = 0;
            } else {
                $scope.border_left = parseFloat(apiElement[media_id].media.desktop["border-left"]);
            }
            $scope.border_right = apiElement[media_id].media.desktop["border-right"];
            if (void 0 == $scope.border_right || "" == $scope.border_right) {
                $scope.border_right = 0;
            } else {
                $scope.border_right = parseFloat(apiElement[media_id].media.desktop["border-right"]);
            }
            $scope.border = 0;
        }
    };

    $scope.showColorSetting = function(typeColorPicker) {
        if (selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $rootScope.typeColorPicker = typeColorPicker;
            $rootScope.colorPickerUsing = apiElement[media_id].media[deviceEdit]["border-color"];
            $("#lpColorPickerCtrl").colorpicker("setValue", $rootScope.colorPickerUsing);
            $(".widget-item.custom-color-picker").show();
        }
    };
}]);