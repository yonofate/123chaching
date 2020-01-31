angular.module("punnelApp").controller("guideverticalCtrl", ["$rootScope", "$scope", "$window", function (a, b, c) {
    b.createGuide = function (a) {
        if ($(a.target).hasClass("vertical-guide-container")) {
            var c = "rule-desktop";
            "desktop" != deviceEdit && (c = "rule-mobile");
            var d = $(".vertical-guide-container .horizontal-guide").eq(0).clone();
            d.offset({
                left: a.pageX
            }), d.addClass(c), d.attr("id", $.now()), d.find(".ruler-widget").attr("id", d.attr("id") + "rule").addClass("widget-snap"), $(".vertical-guide-container").append(d), b.dragElement(), b.selectHoriGuide(), b.deleteLine()
        }
    }, b.actionVer = function () {
        b.dragElement(), b.selectHoriGuide(), b.deleteLine()
    };
    var d = this;
    d.actionVer = function () {
        b.actionVer()
    }, c.angularControllerActionVer = d.actionVer, b.selectHoriGuide = function () {
        $(".vertical-guide-container .horizontal-guide").unbind("mouseover").mouseover(function (a) {
            var b = 960,
                c = 4;
            "desktop" != deviceEdit && (b = 376);
            var d = Math.round($(this).find(".ruler-widget").offset().left + c - ($(".iframe-content").outerWidth() - b) / 2);
            $(".vertical-guide-container .horizontal-guide").removeClass("active"), $(this).addClass("active"), $(this).find(".content-wrapper .number").text(d + "px")
        }), $(".vertical-guide-container .horizontal-guide").unbind("blur").blur(function (a) {
            $(this).removeClass("active")
        })
    }, b.deleteLine = function () {
        $(".vertical-guide-container .horizontal-guide .content-wrapper .trash").unbind("mousedown").mousedown(function (a) {
            a.stopPropagation(), $(this).parent().parent().parent().remove()
        }), $(".vertical-guide-container .content-wrapper").unbind("mousedown").mousedown(function (a) {
            a.stopPropagation()
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