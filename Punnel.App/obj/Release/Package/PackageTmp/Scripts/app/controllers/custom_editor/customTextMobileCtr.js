angular.module("punnelApp").controller("customTextMobileCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = selectedItem.attr("pn-type");
            if ("button" == a || "textinline" == a || "textparagraph" == a || "textsymbol" == a || "countdown" == a) {
                var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                c.font_size = parseFloat(apiElement[b].media.mobile["font-size"]), (void 0 == c.font_size || "" == c.font_size || "undefined" == c.font_size || "null" == c.font_size || null == c.font_size) && (c.font_size = 13, apiElement[b].media.desktop["font-size"] = "13px"), c.text_align = apiElement[b].media.mobile["text-align"], (void 0 == c.text_align || "undefined" == c.text_align || "" == c.text_align) && (c.text_align = "center", apiElement[b].media.mobile["text-align"] = "center"), c.line_spacing = apiElement[b].media.mobile.line_spacing, void 0 == c.line_spacing || "" == c.line_spacing ? c.line_spacing = c.font_size : c.line_spacing = parseFloat(apiElement[b].media.mobile.line_spacing)
            }
        }
    }), c.itemFrontSize = font_size, c.itemkcd = number, c.changeTypeLoad = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.text_align = a, apiElement[b].media.mobile["text-align"] = a, selectedItem.css({
                "text-align": a
            }), $(".custom-text-mobile .text-align-custom li").removeClass("active"), $('.custom-text-mobile .text-align-custom li[pn-active="' + a + '"]').addClass("active")
        }
    }, c.setFontSize = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                b = parseFloat(apiElement[a].line_spacing) - parseFloat(apiElement[a].media.mobile["font-size"]);
            4 == b && (apiElement[a].media.mobile.line_spacing = c.font_size + 4 + "px", c.line_spacing = c.font_size + 4, selectedItem.find(".widget-content").eq(0).css({
                "line-height": c.line_spacing + "px"
            })), apiElement[a].media.mobile["font-size"] = c.font_size + "px", selectedItem.find(".widget-content").eq(0).css({
                "font-size": c.font_size + "px"
            });
            var d = new OptionWiget;
            d.resetValueHeightText(selectedItem)
        }
    }, c.changeFontSize = function (a) {
        c.font_size = a, c.setFontSize()
    }, c.changeKCD = function (a) {
        c.line_spacing = a, c.setValueLineSpacing()
    }, c.setValueLineSpacing = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.mobile.line_spacing = c.line_spacing + "px", selectedItem.find(".widget-content").eq(0).css({
                "line-height": c.line_spacing + "px"
            });
            var b = new OptionWiget;
            b.resetValueHeightText(selectedItem)
        }
    }, c.close = function () { }
}]);