angular.module("punnelApp").controller("guidehorizontalCtrl", ["$rootScope", "$scope", "$window", function (a, b, c) {
    b.createGuide = function (a) {
        if (a.stopPropagation(), $(a.target).hasClass("horizontal-guide-container")) {
            var c = "rule-desktop";
            "desktop" != deviceEdit && (c = "rule-mobile");
            var d = $(".horizontal-guide-container .vertical-guide").eq(0).clone(),
                e = a.pageY - $(".horizontal-guide-container").offset().top,
                f = 0 - $(".horizontal-guide-container").offset().left;
            d.addClass(c), d.offset({
                top: e,
                left: f
            }), d.attr("id", $.now()), d.find(".ruler-widget").attr("id", d.attr("id") + "rule").addClass("widget-snap"), $(".horizontal-guide-container").append(d), b.dragElement(), b.selectHoriGuide(), b.deleteLine()
        }
    }, b.actionHer = function () {
        b.dragElement(), b.selectHoriGuide(), b.deleteLine()
    };
    var d = this;
    d.actionHer = function () {
        b.actionHer()
    }, c.angularControllerActionHer = d.actionHer, b.selectHoriGuide = function () {
        $(".horizontal-guide-container .vertical-guide").unbind("mouseover").mouseover(function (a) {
            var b = Math.round($(this).find(".ruler-widget").offset().top - $(".rulers-number").offset().top);
            $(".horizontal-guide-container .vertical-guide").removeClass("active"), $(this).addClass("active"), $(this).find(".content-wrapper").css({
                left: $(".iframe-content").outerWidth() - 100 + "px"
            }), $(this).find(".content-wrapper .number").text(b + "px")
        }), $(".horizontal-guide-container .vertical-guide").unbind("blur").blur(function (a) {
            $(this).removeClass("active")
        })
    }, b.deleteLine = function () {
        $(".horizontal-guide-container .vertical-guide .content-wrapper .trash").unbind("mousedown").mousedown(function (a) {
            a.stopPropagation(), $(this).parent().parent().parent().remove()
        }), $(".horizontal-guide-container .content-wrapper").unbind("mousedown").mousedown(function (a) {
            a.stopPropagation()
        })
    }, b.dragElement = function () {
        var a = $(".horizontal-guide-container .vertical-guide");
        a && a.length > 0 && (a.each(function () {
            $(this).draggable({
                destroy: !0
            })
        }), a.draggable({
            axis: "y",
            drag: function (a, b) {
                var c = Math.round($(a.target).find(".ruler-widget").offset().top - $(".rulers-number").offset().top);
                $(a.target).find(".content-wrapper .number").text(c + "px")
            },
            stop: function (a, b) {
                var c = Math.round($(a.target).find(".ruler-widget").offset().top - $(".rulers-number").offset().top);
                $(a.target).find(".content-wrapper .number").text(c + "px")
            }
        }))
    }
}]);