angular.module("punnelApp").controller("textinlineCtr", ["$rootScope", "$state", "$scope", function (a, b, c) {
    c.idTMP = "", a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && "GROUP_TMP" != selectedItem.attr("id") && c.idTMP != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.nodeEl = apiElement[a].node
        }
    }), c.changeNode = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            var d = selectedItem.find(".widget-content").eq(0),
                e = d.html();
            d.html("");
            var f = "" + selectedItem.html(),
                g = d.attr("pn-node"),
                h = "<" + g,
                i = "<" + a;
            f = f.replace(h, i), h = "</" + g + ">", i = "</" + a + ">", f = f.replace(h, i), selectedItem.html(""), selectedItem.append(f), selectedItem.find(".widget-content").eq(0).append(e), selectedItem.find(".widget-content").eq(0).attr("pn-node", a);
            var j = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            selectedItem.find(".widget-content").eq(0).css({
                "font-size": b
            }), selectedItem.find(".widget-content").eq(0).css({
                "line-height": parseFloat(b) + 6 + "px"
            }), apiElement[j].media[deviceEdit]["font-size"] = b, apiElement[j].line_spacing = parseFloat(b) + 6 + "px", apiElement[j].node = a, $('input[punnel-fontsize="font-size"]').val(parseFloat(b)), $('input[punnel-fontsize="line-spacing"]').val(parseFloat(b) + 6), c.nodeEl = a;
            var k = new OptionWiget;
            k.resetValueHeightText(selectedItem)
        }
    }
}]);