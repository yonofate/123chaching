angular.module("punnelApp").controller("custom_more_textsymbolCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$window", function (a, b, c, d, e, f) {
    c.groupTextSymbol = group_symbol, c.typeLoad = group_symbol[0].value, c.textSelect = "", c.selecttextSymbol = function () {
        if (void 0 != selectedItem && selectedItem.length > 0)
            if (c.textSelect = $.trim($(".more-textsymbol .list-shape-copy .column.active").text()), "" != c.textSelect) {
                var a, b = $("#ID_BOX_EDITOR");
                if ("none" != b.css("display")) {
                    var d = (new Rotate, new SelectRangeText);
                    d.insertText(c.textSelect), b.find(".contentEditor").contents().find(".widget-content").eq(0).attr("contenteditable", !0), a = b.find(".contentEditor").contents().find(".widget-content").eq(0).html();
                    var e = (b.find(".contentEditor").contents().find(".widget-element"), b.find(".contentEditor").contents().find(".widget-content").eq(0)),
                        f = e.outerWidth();
                    selectedItem.css({
                        width: f + "px"
                    }), selectedItem.find(".widget-content").eq(0).css({
                        width: f + "px"
                    })
                } else a = selectedItem.find(".widget-content").eq(0).html(), a = a + " " + c.textSelect;
                selectedItem.find(".widget-content").eq(0).html(a);
                var g = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[g].text = a, apiElement[g].media[deviceEdit].width = selectedItem.css("width");
                var h = new OptionWiget;
                h.resetValueHeightText(selectedItem), c.cancelShape(), h.addElementUndo("", selectedItem)
            } else {
                var i = new AlertPnotify("Vui lòng chọn biểu tượng!");
                i.createMessage()
            }
    }, c.addActive = function (a) {
        $(".more-textsymbol .list-shape-copy .column").removeClass("active"), $('.more-textsymbol .list-shape-copy .column[pn-add-active="' + a + '"]').addClass("active"), c.textSelect = $.trim($('.more-textsymbol .list-shape-copy .column[pn-add-active="' + a + '"]').text())
    }, c.cancelShape = function () {
        $(".custom_more_textsymbol.ngdialog").remove();
        var a = $("#ID_BOX_EDITOR");
        "none" != a.css("display") && a.find(".contentEditor").contents().find(".widget-content").eq(0).attr("contenteditable", !0), $('.settings[pn-setting="custom-event"]').addClass("active")
    }, c.changeTypeLoad = function (a) {
        c.typeLoad = a, c.itemTextSymbolGroup = lp_symbol_json[c.typeLoad]
    }
}]);