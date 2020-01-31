angular.module("punnelApp").controller("customCountdownCtr", ["$rootScope", "$state", "$scope", "$translate", function (a, b, c, d) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", c.endtimeDown, c.endtime, a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "countdown" == selectedItem.attr("pn-type")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.color_font = apiElement[a].media.desktop.color, c.font_size = apiElement[a].media.desktop["font-size"], c.font_family = apiElement[a].media.font_family, (void 0 == c.color_font || "" == c.color_font) && (c.color_font = "rgba(0,0,0,1)", apiElement[a].media.desktop.color = "rgba(0,0,0,1)"), void 0 == c.font_size || "" == c.font_size || null == c.font_size ? c.font_size = 13 : c.font_size = parseFloat(apiElement[a].media.desktop["font-size"]), (void 0 == c.font_family || "" == c.font_family) && (apiElement[a].media.font_family = "Open Sans", c.font_family = "Open Sans", apiElement[a].media.classFont = "open-sans", apiElement[a].media.font_name = "Open Sans"), (apiElement[a].typeCoundown = "timedown") && (c.endtimeDown = parseFloat(apiElement[a].endtimeDown))
        }
    }), c.setEndTime = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].endtime = "" + c.endtime, selectedItem.attr("pn-endtime", c.endtime);
            var b = c.endTime(c.endtime),
                d = selectedItem.find(".widget-content div span");
            d.eq(0).text(b.ngay), d.eq(1).text(b.gio), d.eq(2).text(b.phut), d.eq(3).text(b.giay), apiElement[a].typeCoundown = "time"
        }
    }, c.setEndTimeDown = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].endtimeDown = "" + c.endtimeDown, selectedItem.attr("pn-endtime", c.endtimeDown);
            var b = new Date;
            b.setMinutes(b.getMinutes() + parseFloat(c.endtimeDown));
            var d = c.endTime(b),
                e = selectedItem.find(".widget-content div span");
            e.eq(0).text(d.ngay), e.eq(1).text(d.gio), e.eq(2).text(d.phut), e.eq(3).text(d.giay), apiElement[a].typeCoundown = "timedown"
        }
    }, c.setValueFont = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                d = selectedItem.attr("pn-font-family");
            selectedItem.removeClass("" + d), selectedItem.addClass("" + a), selectedItem.attr("pn-font-family", a), c.font_family = a, apiElement[b].media.font_family = a, $("iframe.contentEditor").contents().find(".widget-element").eq(0).addClass("" + a).attr("pn-font-family", a)
        }
    }, c.setColor = function (a) {
        var a = PN_PAGE.checkColor(a);
        if (a && selectedItem && selectedItem.length > 0) {
            c.color_font = a, restoreSelection(savedSel);
            var b, d = $("iframe.contentEditor");
            [].forEach.call(d, function (a) {
                b = a.contentWindow.getSelection().toString()
            });
            var e = selectedItem.find(".widget-content").eq(0);
            if ("" != b) d[0].contentWindow.document.execCommand("foreColor", !1, a);
            else {
                e.css({
                    color: a
                });
                var f = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[f].media.desktop.color = a, apiElement[f].media.mobile.color = a, "block" == $("#ID_BOX_EDITOR").css("display") && d.contents().find(".widget-content").eq(0).css({
                    color: a
                })
            }
            colorUsing = a
        }
    }, c.setcolorClose = function (a) {
        var a = PN_PAGE.checkColor(a);
        if (a && selectedItem && selectedItem.length > 0) {
            c.color_font = a, restoreSelection(savedSel);
            var b, d = $("iframe.contentEditor");
            [].forEach.call(d, function (a) {
                b = a.contentWindow.getSelection().toString()
            });
            var e = selectedItem.find(".widget-content").eq(0);
            if ("" != b) d[0].contentWindow.document.execCommand("foreColor", !1, a);
            else {
                e.css({
                    color: a
                });
                var f = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[f].media.desktop.color = a, apiElement[f].media.mobile.color = a, "block" == $("#ID_BOX_EDITOR").css("display") && d.contents().find(".widget-content").eq(0).css({
                    color: a
                })
            }
            colorUsing = a
        }
    }, c.setFontSize = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media["" + deviceEdit]["font-size"] = c.font_size + "px", selectedItem.find(".widget-content").eq(0).css({
                "font-size": c.font_size + "px"
            }), $("iframe.contentEditor").contents().find(".widget-content").eq(0).css({
                "font-size": c.font_size + "px"
            })
        }
    }, c.endTime = function (a) {
        var b = Date.parse(a) - Date.parse(new Date),
            c = Math.floor(b / 1e3 % 60),
            d = Math.floor(b / 1e3 / 60 % 60),
            e = Math.floor(b / 36e5 % 24),
            f = Math.floor(b / 864e5);
        return 0 > c && (c = 0), 0 > f && (f = 0), 0 > e && (e = 0), 0 > d && (d = 0), {
            total: b,
            ngay: f,
            gio: e,
            phut: d,
            giay: c
        }
    }, c.endTimeDown = function (a) {
        var b = Math.floor(a / 1e3 % 60),
            c = Math.floor(a / 1e3 / 60 % 60),
            d = Math.floor(a / 36e5 % 24),
            e = Math.floor(a / 864e5);
        return 0 > b && (b = 0), 0 > e && (e = 0), 0 > d && (d = 0), 0 > c && (c = 0), {
            total: a,
            ngay: e,
            gio: d,
            phut: c,
            giay: b
        }
    }, c.showFont = function () { }, c.show_color = function () {
        colorUsing = c.color_font
    }
}]);