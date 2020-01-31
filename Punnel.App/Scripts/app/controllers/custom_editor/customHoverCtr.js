angular.module("punnelApp").controller("customHoverCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", function (a, b, c, d, e, f) {
    c.typeColor = "", d.use(localStorage.getItem("lang")), c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id"), c.colorBg = "", c.colorText = "", c.colorBorder = "", c.colorShadow = "", c.zoomEle = 1, c.colorUsing = "", c.opacityEle = 1, $(".item.hover-setting .option").hide();
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            "menu-header" == selectedItem.attr("pn-type") ? (c.colorBorder = apiElement[a].media.border_hover, c.colorText = apiElement[a].media.hover_text, c.colorBg = apiElement[a].media.hover_bg, (void 0 == c.colorBorder || "" == c.colorBorder) && (c.colorBorder = "rgba(0,0,0,0)"), (void 0 == c.colorText || null == c.colorText || "" == c.colorText) && (c.colorText = "rgba(33,150,243,1)"), (void 0 == c.colorBg || null == c.colorBg || "" == c.colorBg) && (c.colorBg = "rgba(0,0,0,0)"), $('.item.hover-setting .option[pn-hover-content="background"]').show(), $('.item.hover-setting .option[pn-hover-content="border"]').show(), $('.item.hover-setting .option[pn-hover-content="text"]').show()) : ($(".item.hover-setting .option").show(), void 0 != apiElement[a].hover_element && "" != apiElement[a].hover_element && (void 0 != apiElement[a].hover_element.colorBg && "" != apiElement[a].hover_element.colorBg && (c.colorBg = apiElement[a].hover_element.colorBg), void 0 != apiElement[a].hover_element.colorText && "" != apiElement[a].hover_element.colorText && (c.colorText = apiElement[a].hover_element.colorText), void 0 != apiElement[a].hover_element.colorBorder && "" != apiElement[a].hover_element.colorBorder && (c.colorBorder = apiElement[a].hover_element.colorBorder), void 0 != apiElement[a].hover_element.colorShadow && "" != apiElement[a].hover_element.colorShadow && (c.colorShadow = apiElement[a].hover_element.colorShadow), void 0 != apiElement[a].hover_element.zoomEle && "" != apiElement[a].hover_element.zoomEle && (c.zoomEle = apiElement[a].hover_element.zoomEle), void 0 != apiElement[a].hover_element.opacityEle && "" != apiElement[a].hover_element.opacityEle && (c.opacityEle = apiElement[a].hover_element.opacityEle))), $('.item.hover-setting[pn-setting="hover-setting"] .open-close-properties').addClass("ion-android-arrow-dropdown"), $('.item.hover-setting[pn-setting="hover-setting"] .open-close-properties').removeClass("ion-android-arrow-dropright"), $('.advanced.hover-setting[pn-setting="hover-setting"] .pn-content-settings').show(), $(".advanced.click-setting .open-close-properties").parent().parent().addClass("active")
        }
    }), c.setValueOpacity = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            (void 0 == apiElement[a].hover_element || "" == apiElement[a].hover_element) && (apiElement[a].hover_element = {}), apiElement[a].hover_element.opacityEle = c.opacityEle
        }
    }, c.setValueZoom = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            (void 0 == apiElement[a].hover_element || "" == apiElement[a].hover_element) && (apiElement[a].hover_element = {}), apiElement[a].hover_element.zoomEle = c.zoomEle
        }
    }, c.setColor = function (a) {
        var a = PN_PAGE.checkColor(a);
        if (a && void 0 != selectedItem && selectedItem.length > 0) {
            c.colorUsing = a;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ((void 0 == apiElement[b].hover_element || "" == apiElement[b].hover_element) && (apiElement[b].hover_element = {}), "background" == c.typeColor)
                if (c.colorBg = a, selectedItem.find(".widget-item-child").length > 0) {
                    var d = selectedItem.find(".widget-item-child");
                    void 0 != d && d.length > 0 && (d.each(function () {
                        var b = PN_PAGE.getIndexElement($(this).attr("id"));
                        (void 0 == apiElement[b].hover_element || "" == apiElement[b].hover_element) && (apiElement[b].hover_element = {}), apiElement[b].hover_element.colorBg = a
                    }), apiElement[b].media.hover_bg = a)
                } else apiElement[b].hover_element.colorBg = a;
            if ("border" == c.typeColor)
                if (c.colorBorder = a, selectedItem.find(".widget-item-child").length > 0) {
                    var d = selectedItem.find(".widget-item-child");
                    void 0 != d && d.length > 0 && (d.each(function () {
                        var b = PN_PAGE.getIndexElement($(this).attr("id"));
                        (void 0 == apiElement[b].hover_element || "" == apiElement[b].hover_element) && (apiElement[b].hover_element = {}), apiElement[b].hover_element.colorBorder = a
                    }), apiElement[b].media.border_hover = a)
                } else apiElement[b].hover_element.colorBorder = a;
            if ("shadow" == c.typeColor && (c.colorShadow = a, apiElement[b].hover_element.colorShadow = a), "text" == c.typeColor)
                if (c.colorText = a, selectedItem.find(".widget-item-child").length > 0) {
                    var d = selectedItem.find(".widget-item-child");
                    void 0 != d && d.length > 0 && (d.each(function () {
                        var b = PN_PAGE.getIndexElement($(this).attr("id"));
                        (void 0 == apiElement[b].hover_element || "" == apiElement[b].hover_element) && (apiElement[b].hover_element = {}), apiElement[b].hover_element.colorText = a
                    }), apiElement[b].media.hover_text = a)
                } else apiElement[b].hover_element.colorText = a
        }
    }, c.showContentSetting = function (a) {
        var b = $('.advanced[pn-setting="' + a + '"] .pn-content-settings');
        "none" == b.css("display") ? b.css({
            display: "block"
        }) : b.css({
            display: "none"
        })
    }, c.close = function () {
        $(".ngdialog.custom_hover").remove()
    }, c.showColor = function (a) {
        c.typeColor = a
    }
}]);