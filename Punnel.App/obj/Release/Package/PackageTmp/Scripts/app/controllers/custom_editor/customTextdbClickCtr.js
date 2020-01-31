angular.module("punnelApp").controller("customTextdbClickCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.color_font = apiElement[a].media.desktop.color, (void 0 == c.color_font || "" == c.color_font) && (c.color_font = "rgba(0,0,0,1)"), c.font_weight = apiElement[a].media.font_weight, c.text_decoration = apiElement[a].media.text_decoration, c.font_style = apiElement[a].media.font_style, c.linkAdd = apiElement[a].action, c.font_size = apiElement[a].media.desktop["font-size"], void 0 == c.font_size || "" == c.font_size ? c.font_size = 13 : c.font_size = parseFloat(apiElement[a].media.desktop["font-size"]), $('.item[pn-setting="custom-text-dblick"] .open-close-properties').hasClass("ion-android-arrow-dropdown") ? ($('.advanced[pn-setting="custom-text-dblick"] .pn-content-settings').show(), $('.item[pn-setting="custom-text-dblick"] .open-close-properties').parent().parent().addClass("active")) : ($('.advanced[pn-setting="custom-text-dblick"] .pn-content-settings').hide(), $('.item[pn-setting="custom-text-dblick"] .open-close-properties').parent().parent().removeClass("active")), $('.item[pn-setting="custom-text-dblick"] .font-format .column').removeClass("active")
        }
    }), c.items = lp_colors_all, c.setFontSize = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = $("#ID_BOX_EDITOR .contentEditor"),
                b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].media["" + deviceEdit]["font-size"] = c.font_size + "px", 1 != apiElement[b].sortmobile && (apiElement[b].media.mobile["font-size"] = c.font_size + "px"), selectedItem.find(".widget-content").eq(0).css({
                "font-size": c.font_size + "px"
            }), $("iframe.contentEditor").contents().find(".widget-content").eq(0).css({
                "font-size": c.font_size + "px"
            });
            var d = new OptionWiget;
            d.resetValueHeightText(selectedItem), $("#ID_BOX_EDITOR").css({
                height: apiElement[b].media[deviceEdit].height
            }), a.contents().find("body .widget-content").eq(0).attr("contenteditable", "true")
        }
    }, c.setColor = function (a) {
        var a = PN_PAGE.checkColor(a);
        if (a && selectedItem && selectedItem.length > 0) {
            c.color_font = a, restoreSelection(savedSel);
            var b = "",
                d = $("iframe.contentEditor"),
                e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            [].forEach.call(d, function (a) {
                b = a.contentWindow.getSelection().toString()
            });
            var f = selectedItem.find(".widget-content").eq(0);
            if ("" != b) {
                if (d[0].contentWindow.document.execCommand("foreColor", !1, a), b.length + 1 == selectedItem.text().length) {
                    var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                    apiElement[e].media.desktop.color = a, apiElement[e].media.mobile.color = a
                }
                if ("button" == selectedItem.attr("pn-type")) {
                    var g = d.contents().find(".widget-content").eq(0).html(),
                        h = d.contents().find(".widget-content").eq(0).find("span");
                    h.length < 1 && d.contents().find(".widget-content").eq(0).html("<span>" + g + "</span>"), f.find(">span").remove(), f.prepend(d.contents().find(".widget-content").eq(0).html())
                } else f.html(d.contents().find(".widget-content").eq(0).html());
                apiElement[e].text = d.contents().find(".widget-content").eq(0).html()
            } else f.css({
                color: a
            }), apiElement[e].media.desktop.color = a, apiElement[e].media.mobile.color = a, "block" == $("#ID_BOX_EDITOR").css("display") && d.contents().find(".widget-content").eq(0).css({
                color: a
            });
            colorUsing = a
        }
    }, c.setbold = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ("block" == $("#ID_BOX_EDITOR").css("display"));
            else if ($(a.target).parent().hasClass("active")) apiElement[b].media.font_weight = 700;
            else
                for (var c = 0; c < pn_fonts.length; c++)
                    if (pn_fonts[c].name == apiElement[b].media.font_name) {
                        apiElement[b].media.font_weight = pn_fonts[c].font_weight;
                        break
                    }
        }
    }, c.setItalic = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            "block" == $("#ID_BOX_EDITOR").css("display") || ($(a.target).parent().hasClass("active") ? apiElement[b].media.font_style = "italic" : apiElement[b].media.font_style = "")
        }
    }, c.setUnderline = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            "block" == $("#ID_BOX_EDITOR").css("display") || ($(a.target).parent().hasClass("active") ? (c.text_decoration = "underline", apiElement[b].media.text_decoration = "underline", $(a.target).parent().parent().find('.column[pn-active="line-through"]').removeClass("active")) : apiElement[b].media.text_decoration = "")
        }
    }, c.seStrike = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            "block" == $("#ID_BOX_EDITOR").css("display") || ($(a.target).parent().hasClass("active") ? (c.text_decoration = "line-through", apiElement[b].media.text_decoration = "line-through", $(a.target).parent().parent().find('.column[pn-active="underline"]').removeClass("active")) : apiElement[b].media.text_decoration = "")
        }
    }, c.showCustomLink = function () { }, c.removeCustomLink = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a, b = $("iframe.contentEditor");
            "none" != b.css("display") ? ([].forEach.call(b, function (b) {
                a = b.contentWindow.getSelection().toString()
            }), void 0 != a && null != a && "" != a ? b[0].contentWindow.document.execCommand("unlink", !1, null) : (selectedItem.find("a").attr({
                href: "",
                target: ""
            }), b.contents().find("a").attr({
                href: "",
                target: ""
            }))) : selectedItem.find("a").attr({
                href: "",
                target: ""
            })
        }
    }, c.showFont = function () { }, c.addActiveEditor = function (a) {
        $(a.target).parent().hasClass("active") ? $(a.target).parent().removeClass("active") : $(a.target).parent().addClass("active")
    }, c.show_color = function () {
        colorUsing = c.color_font
    }
}]);