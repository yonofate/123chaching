angular.module("punnelApp").controller("listopMobileCtr", ["$rootScope", "$state", "$scope", function (a, b, c) {
    c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id") && "listop" == selectedItem.attr("pn-type")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(c.idTMP);
            c.font_size = apiElement[a].media.mobile["font-size"], void 0 == c.font_size || "" == c.font_size ? (c.font_size = 13, apiElement[a].media.mobile["font-size"] = "13px") : c.font_size = parseFloat(apiElement[a].media.mobile["font-size"]), apiElement[a].media.mobile.lineList && apiElement[a].media.mobile.lineList.length > 0 ? c.lineList = parseFloat(apiElement[a].media.mobile.lineList) : c.lineList = 0, apiElement[a].media.mobile.character_spacing_icon && apiElement[a].media.mobile.character_spacing_icon.length > 0 ? c.character_spacing_icon = parseFloat(apiElement[a].media.mobile.character_spacing_icon) : c.character_spacing_icon = 8, apiElement[a].media.mobile.widthIcon && apiElement[a].media.mobile.widthIcon.length > 0 ? c.widthIcon = parseFloat(apiElement[a].media.mobile.widthIcon) : c.widthIcon = 30, apiElement[a].media.mobile.topIcon && apiElement[a].media.mobile.topIcon.length > 0 ? c.heightIcon = parseFloat(apiElement[a].media.mobile.topIcon) : c.heightIcon = 0, PN_PAGE.setTypeListIcon(apiElement[a])
        }
    }), c.itemkcc = number, c.itemkcd = number, c.itemFrontSize = number, c.setValueheightIcon = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.mobile.topIcon = c.heightIcon + "px", c.setValueIcon(selectedItem)
        }
    }, c.setValuewidthIcon = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.mobile.widthIcon = c.widthIcon + "px", apiElement[a].media.mobile.heightIcon = c.widthIcon + "px", c.setValueIcon(selectedItem)
        }
    }, c.changeKCCIcon = function (a) {
        c.character_spacing_icon = a, c.setValueCharacterSpacing()
    }, c.setValueCharacterSpacing = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.mobile.character_spacing_icon = c.character_spacing_icon + "px", c.setValueIcon(selectedItem);
            var b = new OptionWiget;
            b.resetValueHeightText(selectedItem)
        }
    }, c.setValuelineList = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.mobile.lineList = c.lineList + "px", c.setValueIcon(selectedItem)
        }
    }, c.changeFontSize = function (a) {
        selectedItem && selectedItem.length > 0 && (c.font_size = a, c.setFontSize())
    }, c.setFontSize = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media[deviceEdit]["font-size"] = c.font_size + "px", selectedItem.find(".widget-content").eq(0).css({
                "font-size": c.font_size + "px",
                height: ""
            }), apiElement[a].media[deviceEdit].height = selectedItem.find(".widget-content").eq(0).css("height"), $(".resizable-element").css({
                height: selectedItem.find(".widget-content").eq(0).css("height")
            });
            var b = new OptionWiget;
            b.resetValueHeightText(selectedItem), b.editextElement(), "listop" == selectedItem.attr("pn-type") && PN_PAGE.setTypeListIcon(apiElement[a])
        }
    }, c.setValueIcon = function (a) {
        if (a && a.length > 0) {
            var b = PN_PAGE.getIndexElement(a.attr("id"));
            PN_PAGE.setTypeListIcon(apiElement[b]);
            var c = new OptionWiget;
            c.resetValueHeightText(selectedItem)
        }
    }
}]);