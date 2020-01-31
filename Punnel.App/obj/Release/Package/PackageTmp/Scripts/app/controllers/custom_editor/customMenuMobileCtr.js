angular.module("punnelApp").controller("customMenuMobileCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    d.use(localStorage.getItem("lang")), c.icon_color = "", c.icon_bg_color = "", c.icon_border_color = "#cccccc", c.icon_border_width = 1, c.icon_radius_width = 0, c.type_color = "", c.vertical = "", c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "menu-header" == selectedItem.attr("pn-type")) {
            c.idTMP = selectedItem.attr("id"), "desktop" != deviceEdit && "true" == selectedItem.attr("pn-navigation") ? c.nav = "true" : c.nav = "false";
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            "" != apiElement[a].media.mobile.icon_color && void 0 != apiElement[a].media.mobile.icon_color && "underfined" != apiElement[a].media.mobile.icon_color && (c.icon_color = apiElement[a].media.mobile.icon_color), "" != apiElement[a].media.mobile.icon_bg_color && void 0 != apiElement[a].media.mobile.icon_bg_color && "underfined" != apiElement[a].media.mobile.icon_bg_color && (c.icon_bg_color = apiElement[a].media.mobile.icon_bg_color), "" != apiElement[a].media.mobile.icon_border_color && void 0 != apiElement[a].media.mobile.icon_border_color && "underfined" != apiElement[a].media.mobile.icon_border_color && (c.icon_border_color = apiElement[a].media.mobile.icon_border_color), "" != apiElement[a].media.mobile.icon_border_width && void 0 != apiElement[a].media.mobile.icon_border_width && "underfined" != apiElement[a].media.mobile.icon_border_width && (c.icon_border_width = parseFloat(apiElement[a].media.mobile.icon_border_width)), "" != apiElement[a].media.mobile.icon_radius_width && void 0 != apiElement[a].media.mobile.icon_radius_width && "underfined" != apiElement[a].media.mobile.icon_radius_width && (c.icon_radius_width = parseFloat(apiElement[a].media.mobile.icon_radius_width)), c.item_color = apiElement[a].media.mobile.item_color, (void 0 == c.item_color || "" == c.item_color || "undefined" == c.item_color) && (c.item_color = "rgba(0,0,0,1)"), c.item_bg_color = apiElement[a].media.mobile.item_bg_color, (void 0 == c.item_bg_color || "undefined" == c.item_bg_color || "" == c.item_bg_color) && (c.item_bg_color = "rgba(255,255,255,0)"), c.item_line_color = apiElement[a].media.mobile.item_line_color, (void 0 == c.item_line_color || "undefined" == c.item_line_color || "" == c.item_line_color) && (c.item_line_color = "rgba(0,0,0,0)"), c.item_line_width = parseFloat(apiElement[a].media.mobile.item_line_width), (void 0 == c.item_line_width || "undefined" == c.item_line_width || "" == c.item_line_width || "null" == c.item_line_width || null == c.item_line_width) && (c = 1, apiElement[a].media.mobile.item_line_width = "1px"), c.item_font_size = parseFloat(apiElement[a].media.mobile.item_font_size), (void 0 == c.item_font_size || "undefined" == c.item_font_size || "" == c.item_font_size || null == c.item_font_size || "null" == c.item_font_size) && (c.item_font_size = 13, apiElement[a].media.mobile.item_font_size = "13px"), c.item_font_family = apiElement[a].media.mobile.item_font_family, (void 0 == c.item_font_family || "undefined" == c.item_font_family || "" == c.item_font_family) && (apiElement[a].media.mobile.item_font_family = "Open Sans", c.item_font_family = "Open Sans"), c.item_text_align = apiElement[a].media.mobile.item_text_align, (void 0 == c.item_text_align || "undefined" == c.item_text_align || "" == c.item_text_align) && (c.item_text_align = "center", apiElement[a].media.mobile.item_text_align = "center"), c.item_vertical = apiElement[a].media.mobile.item_vertical, (void 0 == c.item_vertical || "undefined" == c.item_vertical || "" == c.item_vertical) && (c.item_vertical = "", apiElement[a].media.mobile.item_vertical = ""), c.item_height = parseFloat(apiElement[a].media.mobile.item_height), (void 0 == c.item_height || "undefined" == c.item_height || "" == c.item_height || null == c.item_height || "null" == c.item_height) && (c.item_height = 35, apiElement[a].media.mobile.item_height = "35px");
            var b = $('.item.mobile-menu-setting[pn-setting="mobile-menu-setting"] .open-close-properties');
            b.removeClass("ion-android-arrow-dropright"), b.addClass("ion-android-arrow-dropdown"), $(".item.mobile-menu-setting .pn-item-setting").show(), $(".item.mobile-menu-setting .pn-icon-setting").show(), b.parent().parent().addClass("active")
        }
    }), c.setValueHeightItem = function () {
        var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        if ("true" == selectedItem.attr("pn-navigation")) {
            apiElement[a].media.mobile.item_height = c.item_height + "px";
            var b = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
            void 0 != b && b.length > 0 && b.each(function () {
                var a = PN_PAGE.getIndexElement($(this).attr("id"));
                apiElement[a].media.mobile.height = c.item_height + "px"
            })
        }
    }, c.setValueFont = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            var c = selectedItem.attr("pn-type-font"),
                d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            void 0 == c || "" == c || null == c ? (selectedItem.find(".widget-content").eq(0).css({
                "font-family": b
            }), selectedItem.attr("pn-type-font", a)) : (selectedItem.find(".widget-content").eq(0).removeClass(c), selectedItem.find(".widget-content").eq(0).css({
                "font-family": b
            }), selectedItem.attr("pn-type-font", a)), apiElement[d].media.font_family = b, apiElement[d].media.classFont = a
        }
    }, c.setValueLine = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.mobile.item_line_width = c.item_line_width + "px";
            var b = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
            void 0 != b && b.length > 0 && b.each(function () {
                var a = PN_PAGE.getIndexElement($(this).attr("id"));
                apiElement[a].media.mobile["border-width"] = c.item_line_width + "px"
            })
        }
    }, c.setValueFontSize = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.mobile.item_font_size = c.item_font_size + "px";
            var b = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
            void 0 != b && b.length > 0 && b.each(function () {
                var a = PN_PAGE.getIndexElement($(this).attr("id"));
                apiElement[a].media.mobile["font-size"] = c.item_font_size + "px"
            })
        }
    }, c.changeTypeLoad = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            c.item_text_align = a;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].media.mobile.item_text_align = a;
            var d = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
            void 0 != d && d.length > 0 && d.each(function () {
                var b = PN_PAGE.getIndexElement($(this).attr("id"));
                apiElement[b].media.mobile["text-align"] = a
            })
        }
    }, c.changeTypeLoadItem = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            c.item_vertical = a;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            "true" != selectedItem.attr("pn-navigation") && (apiElement[b].media.mobile.item_vertical = a, selectedItem.attr("pn-direction", a))
        }
    }, c.setvalueBorder = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.mobile.icon_border_width = c.icon_border_width + "px",
                selectedItem.find(".menuMobile svg").css({
                    border: c.icon_border_width + "px solid " + c.icon_border_color
                })
        }
    }, c.setvalueBorderRadius = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = $("#radius-menu-mobile").val(),
                b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].media.mobile.icon_radius_width = a + "px", selectedItem.find(".menuMobile svg").css({
                "border-radius": a + "px"
            })
        }
    }, c.setColor = function (a) {
        var a = PN_PAGE.checkColor(a);
        if (a && selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            switch (c.type_color) {
                case "icon_color":
                    c.icon_color = a, apiElement[b].media.mobile.icon_color = a, selectedItem.find(".menuMobile svg").css({
                        fill: a
                    });
                    break;
                case "icon_bg_color":
                    c.icon_bg_color = a, apiElement[b].media.mobile.icon_bg_color = a, selectedItem.find(".menuMobile svg").css({
                        background: a
                    });
                    break;
                case "icon_border_color":
                    c.icon_border_color = a, apiElement[b].media.mobile.icon_border_color = a, selectedItem.find(".menuMobile svg").css({
                        border: c.icon_border_width + "px solid " + a
                    });
                    break;
                case "item_color":
                    c.item_color = a, apiElement[b].media.mobile.item_color = a;
                    var d = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
                    void 0 != d && d.length > 0 && d.each(function () {
                        var b = PN_PAGE.getIndexElement($(this).attr("id"));
                        apiElement[b].media.mobile.color = a
                    });
                    break;
                case "item_bg_color":
                    c.item_bg_color = a, apiElement[b].media.mobile.item_bg_color = a;
                    var d = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
                    void 0 != d && d.length > 0 && d.each(function () {
                        var b = PN_PAGE.getIndexElement($(this).attr("id"));
                        apiElement[b].media.mobile["background-color"] = a
                    });
                    break;
                case "item_line_color":
                    c.item_line_color = a, apiElement[b].media.mobile.item_line_color = a;
                    var d = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
                    void 0 != d && d.length > 0 && d.each(function () {
                        var b = PN_PAGE.getIndexElement($(this).attr("id"));
                        apiElement[b].media.mobile["border-color"] = a
                    })
            }
        }
    }, c.showFont = function () { }, c.showContent = function (a) {
        var b = $(".item.mobile-menu-setting ." + a);
        "none" != b.css("display") ? b.hide() : b.show()
    }, c.showColor = function (a) {
        switch (a) {
            case "icon_color":
                colorUsing = c.icon_color;
                break;
            case "icon_bg_color":
                colorUsing = c.icon_bg_color;
                break;
            case "icon_border_color":
                colorUsing = c.icon_border_color;
                break;
            case "item_line_color":
                colorUsing = c.item_line_color;
                break;
            case "item_bg_color":
                colorUsing = c.item_bg_color;
                break;
            case "item_color":
                colorUsing = c.item_color
        }
        c.type_color = a
    }
}]);