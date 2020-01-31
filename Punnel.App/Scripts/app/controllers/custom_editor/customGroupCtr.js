angular.module("punnelApp").controller("customGroupCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", function (a, b, c, d, e, f) {
    c.typeColor = "", c.opacity = 1, c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && selectedItem.hasClass("widget-group") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.colorBg = apiElement[a].media.desktop["background-color"], (void 0 == c.colorBg || "" == c.colorBg) && "rgba(255,255,255,0)" == c.colorBg, c.colorText = apiElement[a].media.desktop.color, (void 0 == c.colorText || "" == c.colorText) && (c.colorText = "rgba(0,0,0,1)"), c.opacity = apiElement[a].opacity, (void 0 == c.opacity || "" == c.opacity) && (c.opacity = 1), $('.dialog.group-setting-element input[type="number"]').blur()
        }
    }), c.setValueOpacity = function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-group") && "GROUP_TMP" != selectedItem.attr("id")) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[a].opacity = c.opacity, selectedItem.find(".widget-element").length > 0) {
                var b = selectedItem.find(".widget-element");
                b.each(function () {
                    var a = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[a].opacity = c.opacity, $(this).find(".widget-content").eq(0).css({
                        opacity: c.opacity
                    })
                })
            }
            selectedItem.find(".widget-content").eq(0).css({
                opacity: c.opacity
            })
        }
    }, c.setColor = function (a) {
        var a = PN_PAGE.checkColor(a);
        if (a && void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-group") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.colorUsing = a;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ("background" == c.typeColor && (c.colorBg = a, selectedItem.find(".widget-element").length > 0)) {
                var d = selectedItem.find(".widget-element");
                d.each(function () {
                    if ("box" == $(this).attr("pn-type") || "button" == $(this).attr("pn-type")) {
                        var b = PN_PAGE.getIndexElement($(this).attr("id"));
                        apiElement[b].bg_type = "color", apiElement[b].media.desktop["backgroud-color"] = a, apiElement[b].media.mobile["backgroud-color"] = a, $(this).find(".widget-content").eq(0).css({
                            "background-color": a
                        })
                    }
                }), apiElement[b].bg_type = "color", apiElement[b].media.desktop["backgroud-color"] = a, apiElement[b].media.mobile["backgroud-color"] = a
            }
            if ("text" == c.typeColor && (c.colorText = a, selectedItem.find(".widget-element").length > 0)) {
                var d = selectedItem.find(".widget-element");
                d.each(function () {
                    var b = $(this).attr("pn-type");
                    if ("textinline" == b || "button" == b || "textsymbol" == b || "textparagraph" == b || "shape" == b) {
                        var c = PN_PAGE.getIndexElement($(this).attr("id"));
                        apiElement[c].media.desktop.color = a, apiElement[c].media.mobile.color = a, "shape" == b ? $(this).find("svg").eq(0).attr("fill", a) : ($(this).find(".widget-content:eq(0) *").attr("color", ""), $(this).find(".widget-content:eq(0) *").attr("color", a), $(this).find(".widget-content").eq(0).css({
                            color: a
                        }))
                    }
                }), apiElement[b].media.desktop.color = a, apiElement[b].media.mobile.color = a
            }
        }
    }, c.close = function () {
        $(".ngdialog.custom_group").remove()
    }, c.showContentSetting = function (a) {
        var b = $('.advanced[pn-setting="' + a + '"] .pn-content-settings');
        "none" == b.css("display") ? b.css({
            display: "block"
        }) : b.css({
            display: "none"
        })
    }, c.showColor = function (a) {
        c.typeColor = a
    }
}]);