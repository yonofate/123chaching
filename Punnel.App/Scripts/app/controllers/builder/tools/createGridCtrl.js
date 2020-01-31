angular.module("punnelApp").controller("createGridCtrl", ["$rootScope", "$scope", function (a, b) {
    b.colNum = 3, b.colWith = 30, b.deleteGrid = function () {
        "desktop" == deviceEdit ? $(".vertical-guide-container .horizontal-guide.line-gird.rule-desktop").remove() : $(".vertical-guide-container .horizontal-guide.line-gird.rule-mobile").remove()
    }, b.addGrid = function () {
        b.deleteGrid();
        var a = 960,
            c = 5;
        if ("desktop" != deviceEdit && (a = 376), b.colNum > 0)
            for (var d = parseFloat(b.colNum) - 1, e = 0; d > e; e++) {
                var f;
                f = ($(".iframe-content").outerWidth() - a) / 2, 0 == e && d > 0 && (f -= c, b.createGuide(f)), e == d - 1 && (f = ($(".iframe-content").outerWidth() - a) / 2 + a, f -= c, b.createGuide(f)), f = ($(".iframe-content").outerWidth() - a) / 2, f += (a + b.colWith) / parseFloat(b.colNum) * (e + 1), f -= c, b.createGuide(f), b.colWith > 0 && (f -= b.colWith, b.createGuide(f))
            }
    }, b.createGuide = function (a) {
        var c = "rule-desktop";
        "desktop" != deviceEdit && (c = "rule-mobile");
        var d = $(".vertical-guide-container .horizontal-guide").eq(0).clone();
        d.offset({
            left: a
        }), d.addClass(c), d.addClass("line-gird"), d.attr("id", $.now()), d.find(".ruler-widget").attr("id", d.attr("id") + "rule").addClass("widget-snap"), $(".vertical-guide-container").append(d), b.dragElement(), b.selectHoriGuide(), b.deleteLine()
    }, b.deleteLine = function () {
        $(".vertical-guide-container .horizontal-guide .content-wrapper .trash").unbind("mousedown").mousedown(function (a) {
            a.stopPropagation(), $(this).parent().parent().parent().remove()
        }), $(".vertical-guide-container .content-wrapper").unbind("mousedown").mousedown(function (a) {
            a.stopPropagation()
        })
    }, b.selectHoriGuide = function () {
        $(".vertical-guide-container .horizontal-guide").unbind("mouseover").mouseover(function (a) {
            var b = 960,
                c = 4;
            "desktop" != deviceEdit && (b = 376);
            var d = Math.round($(this).find(".ruler-widget").offset().left + c - ($(".iframe-content").outerWidth() - b) / 2);
            $(".vertical-guide-container .horizontal-guide").removeClass("active"), $(this).addClass("active"), $(this).find(".content-wrapper .number").text(d + "px")
        }), $(".vertical-guide-container .horizontal-guide").unbind("blur").blur(function (a) {
            $(this).removeClass("active")
        })
    }, b.dragElement = function () {
        var a = $(".vertical-guide-container .horizontal-guide");
        a && a.length > 0 && (a.each(function () {
            $(this).draggable({
                destroy: !0
            })
        }), a.draggable({
            axis: "x",
            drag: function (a, b) {
                var c = 960,
                    d = 4;
                "desktop" != deviceEdit && (c = 376);
                var e = Math.round($(a.target).find(".ruler-widget").offset().left + d - ($(".iframe-content").outerWidth() - c) / 2);
                $(a.target).find(".content-wrapper .number").text(e + "px")
            },
            stop: function (a, b) {
                var c = 960,
                    d = 4;
                "desktop" != deviceEdit && (c = 376);
                var e = Math.round($(a.target).find(".ruler-widget").offset().left + d - ($(".iframe-content").outerWidth() - c) / 2);
                $(a.target).find(".content-wrapper .number").text(e + "px")
            }
        }))
    }
}]);