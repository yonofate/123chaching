angular.module("punnelApp").controller("customMenuCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "ngDialog", function (a, b, c, d, e, f) {
    d.use(localStorage.getItem("lang")), c.checkNav = "true", c.radius, c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            "menu-header" == selectedItem.attr("pn-type") ? (void 0 == apiElement[a].media.items && (apiElement[a].media.items = {}), "true" == selectedItem.attr("pn-navigation") ? c.checkNav = "true" : c.checkNav = "false", c.bg_color = apiElement[a].media.items["background-color"], c.text_color = apiElement[a].media.items.color, c.font_size = apiElement[a].media["" + deviceEdit]["font-size"], c.item_text_align = apiElement[a].media[deviceEdit].item_text_align, c.item_vertical = apiElement[a].media[deviceEdit].item_vertical, c.font_family = apiElement[a].media.font_family, c.font_weight = apiElement[a].media.font_weight_item, c.font_style = apiElement[a].media.font_style_item) : (c.bg_color = apiElement[a].media[deviceEdit]["background-color"], c.text_color = apiElement[a].media[deviceEdit].color, c.font_size = apiElement[a].media[deviceEdit]["font-size"], c.font_family = apiElement[a].media.font_family, c.item_text_align = apiElement[a].media[deviceEdit]["text-align"], c.checkNav = "true", c.font_weight = apiElement[a].media.font_weight, c.font_style = apiElement[a].media.font_style), 700 == c.font_weight ? $('.item[pn-setting="custom-menu-header"] .column[pn-active="bold"]').addClass("active") : $('.item[pn-setting="custom-menu-header"] .column[pn-active="bold"]').removeClass("active"), "italic" == c.font_style ? $('.item[pn-setting="custom-menu-header"] .column[pn-active="italic"]').addClass("active") : $('.item[pn-setting="custom-menu-header"] .column[pn-active="italic"]').removeClass("active"), (void 0 == c.font_family || "" == c.font_family) && (c.font_family = "Open Sans"), (void 0 == c.item_vertical || "undefined" == c.item_vertical || "" == c.item_vertical) && (c.item_vertical = "", apiElement[a].media[deviceEdit].item_vertical = ""), (void 0 == c.item_text_align || "undefined" == c.item_text_align || "" == c.item_text_align) && (c.item_text_align = "center"), void 0 == c.font_size || null == c.font_size || "" == c.font_size ? c.font_size = 15 : c.font_size = parseFloat(c.font_size), (void 0 == c.bg_color || null == c.bg_color || "" == c.bg_color) && (c.bg_color = "", apiElement[a].bg_type = "color"), (void 0 == c.text_color || null == c.text_color || "" == c.text_color) && (c.text_color = "rgba(0,0,0,1)"), $('.item[pn-setting="custom-menu-header"] .open-close-properties[data-target="pn-items-menu-setting"]').hasClass("ion-android-arrow-dropdown") ? ($('.advanced[pn-setting="custom-menu-header"] .pn-items-menu-setting').show(), $('.item[pn-setting="custom-menu-header"] .open-close-properties[data-target="pn-items-menu-setting"]').parent().parent().addClass("active")) : ($('.advanced[pn-setting="custom-menu-header"] .pn-items-menu-setting').hide(), $('.item[pn-setting="custom-menu-header"] .open-close-properties[data-target="pn-items-menu-setting"]').parent().parent().removeClass("active")), $('.item[pn-setting="custom-menu-header"] .open-close-properties[data-target="pn-border-menu-setting"]').hasClass("ion-android-arrow-dropdown") ? ($('.advanced[pn-setting="custom-menu-header"] .pn-border-menu-setting').show(), $('.item[pn-setting="custom-menu-header"] .open-close-properties[data-target="pn-border-menu-setting"]').parent().parent().addClass("active")) : ($('.advanced[pn-setting="custom-menu-header"] .pn-border-menu-setting').hide(), $('.item[pn-setting="custom-menu-header"] .open-close-properties[data-target="pn-border-menu-setting"]').parent().parent().removeClass("active"))
        }
    }), c.type_color = "", c.setItalic = function (a) {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ("menu-header" == selectedItem.attr("pn-type")) {
                apiElement[b].media.font_style_item = a;
                var c = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
                void 0 != c && c.length > 0 && c.each(function () {
                    var b = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[b].media.font_style = a, $(this).find(".widget-content").eq(0).css({
                        "font-style": a
                    })
                })
            } else apiElement[b].media.font_style = a, selectedItem.find(".widget-content").eq(0).css({
                "font-style": a
            })
        }
    }, c.setbold = function (a) {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ("menu-header" == selectedItem.attr("pn-type")) {
                apiElement[b].media.font_weight_item = a;
                var c = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
                void 0 != c && c.length > 0 && c.each(function () {
                    var b = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[b].media.font_weight = a, $(this).find(".widget-content").eq(0).css({
                        "font-weight": a
                    })
                })
            } else apiElement[b].media.font_weight = a, selectedItem.find(".widget-content").eq(0).css({
                "font-weight": a
            })
        }
    }, c.changeTypeLoadItem = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            c.item_vertical = a;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ("true" != selectedItem.attr("pn-navigation") && (apiElement[b].media[deviceEdit].item_vertical = a, selectedItem.attr("pn-direction", a)), "vertical" == a) {
                var d = selectedItem.outerHeight() + "px",
                    e = selectedItem.find(".ulMenuDeskTop li"),
                    f = selectedItem.outerWidth() / e.length + "px";
                apiElement[b].media.items.width = "100%", e.css({
                    width: "100%"
                }), apiElement[b].media[deviceEdit].item_height = d, selectedItem.find(".ulMenuDeskTop li").css({
                    height: d
                }), selectedItem.css({
                    height: parseFloat(d) * parseFloat(e.length) + "px",
                    width: f
                }), selectedItem.find(".widget-content").css({
                    height: parseFloat(d) * parseFloat(e.length) + "px",
                    width: f
                }), apiElement[b].media[deviceEdit].height = parseFloat(d) * parseFloat(e.length) + "px", apiElement[b].media[deviceEdit].width = f
            } else {
                (void 0 == apiElement[b].media.items || "undefined" == apiElement[b].media.items) && (apiElement[b].media.items = {}), apiElement[b].media.items.width = selectedItem.outerWidth() + "px";
                var g = apiElement[b].item_menu.length * (selectedItem.outerWidth() + parseFloat(selectedItem.find(".ulMenuDeskTop li").css("margin-left"))) + "px";
                apiElement[b].media[deviceEdit].item_height = "100%", selectedItem.find(".ulMenuDeskTop li").css({
                    height: "",
                    width: apiElement[b].media.items.width
                }), selectedItem.css({
                    height: "70px",
                    width: g
                }), selectedItem.find(".widget-content").css({
                    height: "70px",
                    width: g
                }), apiElement[b].media[deviceEdit].height = "70px", apiElement[b].media[deviceEdit].width = g
            }
            var h = new ShowBoxResize;
            h.showBox(selectedItem)
        }
    }, c.changeTypeLoad = function (a) {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            c.item_text_align = a;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (selectedItem.find(".widget-content").eq(0).css({
                    "text-align": a
            }), "menu-header" == selectedItem.attr("pn-type") || "item_menu" == selectedItem.attr("pn-type")) {
                apiElement[b].media[deviceEdit].item_text_align = a;
                var d = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
                void 0 != d && d.length > 0 && d.each(function () {
                    var b = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[b].media[deviceEdit]["text-align"] = a, $(this).find(".widget-content").eq(0).css({
                        "text-align": a
                    })
                })
            } else apiElement[b].media[deviceEdit]["text-align"] = a
        }
    }, c.changeFontSize = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.desktop["font-size"] = c.font_size + "px", apiElement[a].media.mobile["font-size"] = c.font_size + "px", selectedItem.find(".widget-content").eq(0).css({
                "font-size": c.font_size + "px"
            });
            var b = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
            void 0 != b && b.length > 0 && b.each(function () {
                var a = PN_PAGE.getIndexElement($(this).attr("id"));
                apiElement[a].media.desktop["font-size"] = c.font_size + "px", apiElement[a].media.mobile["font-size"] = c.font_size + "px", $(this).find(".widget-content").eq(0).css({
                    "font-size": c.font_size + "px"
                })
            })
        }
    }, c.setColor = function (a) {
        var a = PN_PAGE.checkColor(a);
        a && (c.setValueColor(c.type_color, a), colorUsing = a)
    }, c.setcolorClose = function (a) {
        var a = PN_PAGE.checkColor(a);
        a && (c.setValueColor(c.type_color, a), $(".ngdialog.custom_color").remove(), colorUsing = a)
    }, c.addActiveEditor = function (a, b) {
        var d = $(a.target);
        switch (d.parent().hasClass("active") ? d.parent().removeClass("active") : d.parent().addClass("active"), b) {
            case "bold":
                d.parent().hasClass("active") ? c.font_weight = 700 : c.font_weight = 400, c.setbold(c.font_weight);
                break;
            case "italic":
                d.parent().hasClass("active") ? c.font_style = "italic" : c.font_style = "", c.setItalic(c.font_style)
        }
    }, c.showFont = function () { }, c.showColor = function (a) {
        switch (a) {
            case "border-hover":
                colorUsing = c.border_hover;
                break;
            case "bg":
                colorUsing = c.bg_color;
                break;
            case "text":
                colorUsing = c.text_color
        }
        c.type_color = a
    }, c.showContent = function (a) {
        var b = $(".ngdialog.custom_menu ." + a);
        "none" != b.css("display") ? b.hide() : b.show()
    }, c.showSettingItemMenu = function () { }, c.close = function () {
        fadeOutAnimate($(".ngdialog.custom_menu")), $('.settings[pn-setting="menu-header"]').addClass("active")
    }, c.setValueColor = function (a, b) {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            switch (a) {
                case "text":
                    if (c.text_color = b, "menu-header" == selectedItem.attr("pn-type")) {
                        void 0 == apiElement[d].media.items && (apiElement[d].media.items = {}), selectedItem.find(".menuMobile").css({
                            color: b
                        }), apiElement[d].media.items.color = b;
                        var e = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
                        void 0 != e && e.length > 0 && e.each(function () {
                            var a = PN_PAGE.getIndexElement($(this).attr("id"));
                            $(this).find(".widget-content").eq(0).css({
                                color: b
                            }), apiElement[a].media.desktop.color = b, apiElement[a].media.mobile.color = b
                        })
                    } else apiElement[d].media.desktop.color = b, apiElement[d].media.mobile.color = b, selectedItem.find(".widget-content").eq(0).css({
                        color: b
                    });
                    break;
                case "bg":
                    if (c.bg_color = b, "menu-header" == selectedItem.attr("pn-type")) {
                        void 0 == apiElement[d].media.items && (apiElement[d].media.items = {}), apiElement[d].media.items["background-color"] = b, apiElement[d].bg_type = "color";
                        var e = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
                        void 0 != e && e.length > 0 && e.each(function () {
                            var a = PN_PAGE.getIndexElement($(this).attr("id"));
                            $(this).find(".widget-content").eq(0).css({
                                background: b
                            }), apiElement[a].media.desktop["background-color"] = b, apiElement[a].media.mobile["background-color"] = b, apiElement[a].bg_type = "color"
                        })
                    } else apiElement[d].media[deviceEdit]["background-color"] = b, selectedItem.find(".widget-content").eq(0).css({
                        background: b
                    })
            }
        }
    }
}]);