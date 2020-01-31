angular.module("punnelApp").controller("customNotifyCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.sheetid = "", c.typePosition = "topleft", c.idTMP = "", c.typePositionOptions = [{ i: "default", n: "Mặc định" }, { i: "topleft", n: "Trên cùng trái" }, { i: "bottomleft", n: "Dưới cùng trái" }, { i: "topright", n: "Trên cùng phải" }, { i: "bottomright", n: "Dưới cùng phải" }]
    a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.sheetid = apiElement[a].media[deviceEdit]["notify-sheetid"];
            var b = apiElement[a].media[deviceEdit]["notify-position"];
            c.typePosition = void 0 == b || 0 == b.length ? c.typePosition : b
        }
    }),
        c.gettypePosition = function (i) {
            var k = $.grep(c.typePositionOptions, function (item) {
                return item.i == i;
            });
            if (k.length>0) return k[0].n;
        },
        c.setSheetid = function () {
        var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[a].media.desktop["notify-sheetid"] = c.sheetid, apiElement[a].media.mobile["notify-sheetid"] = c.sheetid;
        var b = selectedItem.find(".widget-content").parents(".pn-notify").eq(0);
        b.data("notify").sheetid = c.sheetid, b.attr("data-notify", JSON.stringify(b.data("notify")))
        },
        c.setTypePosition = function (a) {
        c.typePosition = a;
        var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[b].media.desktop["notify-position"] = a, apiElement[b].media.mobile["notify-position"] = a;
        var d = selectedItem.find(".widget-content").parents(".pn-notify").eq(0);
        d.data("notify").position = a, d.attr("data-notify", JSON.stringify(d.data("notify")))
        },
        c.selectAllText = function () {
        document.execCommand("selectAll", !1, null)
    }
}])