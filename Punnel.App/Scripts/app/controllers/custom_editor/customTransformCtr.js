angular.module("punnelApp").controller("customTransformCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", function (a, b, c, d, e, f) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", c.rotateDeg = 0, a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (void 0 != apiElement[a].customStyle) {
                c.rotateDeg = apiElement[a].customStyle.transform.origin;
            } else c.rotateDeg = 0;
            //c.idTMP = selectedItem.attr("id");
            //var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            //c.rotate = apiElement[a].rotate, c.skewx = apiElement[a].skewx, c.skewy = apiElement[a].skewy, c.opacity = apiElement[a].opacity, (void 0 == c.opacity || "" == c.opacity) && (c.opacity = 1, apiElement[a].opacity = 1), (void 0 == c.rotate || "" == c.rotate || null == c.rotate) && (c.rotate = 0), (void 0 == c.skewx || "" == c.skewx || null == c.skewx) && (c.skewx = 0), (void 0 == c.skewy || "" == c.skewy || null == c.skewy) && (c.skewy = 0), $('.item[pn-setting="custom-transform"] .open-close-properties').hasClass("ion-android-arrow-dropdown") ? ($('.advanced[pn-setting="custom-transform"] .pn-content-settings').show(), $('.item[pn-setting="custom-transform"] .open-close-properties').parent().parent().addClass("active")) : ($('.advanced[pn-setting="custom-transform"] .pn-content-settings').hide(), $('.item[pn-setting="custom-transform"] .open-close-properties').parent().parent().removeClass("active"))
        }
    }), c.setOpacity = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].opacity = c.opacity;
            var b;
            b = selectedItem.hasClass("widget-element") ? selectedItem.find(".widget-content").eq(0) : selectedItem, b.css({
                opacity: c.opacity
            })
        }
    }, c.setRotate = function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var a = selectedItem.find(".widget-element").length;
            if (a > 0);
            else {
                var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                c.setStranform(c.rotate, c.skewx, c.skewy), apiElement[b].rotate = c.rotate
            }
        }
    }, c.setskewx = function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var a = selectedItem.find(".widget-element").length;
            if (a > 0);
            else {
                var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                c.setStranform(c.rotate, c.skewx, c.skewy), apiElement[b].skewx = c.skewx
            }
        }
    }, c.setskewy = function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var a = selectedItem.find(".widget-element").length;
            if (a > 0);
            else {
                var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                c.setStranform(c.rotate, c.skewx, c.skewy), apiElement[b].skewy = c.skewy
            }
        }
    }, c.setStranform = function (a, b, c) {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var d = $("#resizable-element");
            selectedItem.css({
                transform: "skewY(" + c + "deg) skewX(" + b + "deg) rotate(" + a + "deg)"
            }), selectedItem.css({
                mozTransform: "skewY(" + c + "deg) skewX(" + b + "deg) rotate(" + a + "deg)"
            }), selectedItem.css({
                msTransform: "skewY(" + c + "deg) skewX(" + b + "deg) rotate(" + a + "deg)"
            }), selectedItem.css({
                webkitTransform: "skewY(" + c + "deg) skewX(" + b + "deg) rotate(" + a + "deg)"
            }), selectedItem.css({
                oTransform: "skewY(" + c + "deg) skewX(" + b + "deg) rotate(" + a + "deg)"
            }), d.css({
                transform: "skewY(" + c + "deg) skewX(" + b + "deg) rotate(" + a + "deg)"
            }), d.css({
                mozTransform: "skewY(" + c + "deg) skewX(" + b + "deg) rotate(" + a + "deg)"
            }), d.css({
                msTransform: "skewY(" + c + "deg) skewX(" + b + "deg) rotate(" + a + "deg)"
            }), d.css({
                webkitTransform: "skewY(" + c + "deg) skewX(" + b + "deg) rotate(" + a + "deg)"
            }), d.css({
                oTransform: "skewY(" + c + "deg) skewX(" + b + "deg) rotate(" + a + "deg)"
            })
        }
    }, c.showContentSetting = function (a) {
        var b = $('.advanced[pn-setting="' + a + '"] .pn-content-settings');
        "none" == b.css("display") ? b.css({
            display: "block"
        }) : b.css({
            display: "none"
        })
    },
        c.setValueRotateDeg = function () {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                b = parseInt(c.rotateDeg);
            void 0 == apiElement[a].customStyle && (apiElement[a].customStyle = {});
            var d = "transform",
                e = {
                    value: "rotate(" + b + "deg)",
                    after: "",
                    origin: b
                };
            if (0 != b) {
                apiElement[a].customStyle[d] = e,
                    apiElement[a].customStyle["-webkit-transform"] = e,
                    $(selectedItem).find(".widget-content")[0].style.setProperty(d, e.value, e.after),
                    $(selectedItem).find(".widget-content")[0].style.setProperty("-webkit-transform", e.value, e.after)
            } else {
                delete apiElement[a].customStyle[d], delete apiElement[a].customStyle["-webkit-transform"],
                    $(selectedItem).find(".widget-content").css(d, ""),
                    $(selectedItem).find(".widget-content").css("-webkit-transform", "")
            }
            var f = new ShowBoxResize;
            f.showBox(selectedItem)
        },
        c.setWidth = function () {

        }
}]);