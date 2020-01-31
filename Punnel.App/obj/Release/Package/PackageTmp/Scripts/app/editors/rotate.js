var Rotate = function() {};
Rotate.prototype.init = function() {
    PN_PAGE.getElement(".selected .widget-content:first")
},
Rotate.prototype.rotateBox = function () {
    var a = this,
        b = 0,
        c = "",
        d = new AddGroup,
        e = [],
        f = "",
        g = "",
        h = "";
    $("#resizable-element").rotatable({
        destroy: !0
    }), $("#resizable-element").rotatable({
        start: function(d, i) {
            c = a.getMatrix(selectedItem), b = a.getAngle(c), $(this).startAngle = b, $("#resizable-element").find(".textRotate").show("slow").text(b), a.setTransform($("#resizable-element"), $("#resizable-element"), b), selectedItem.parent().hasClass("widget-group") && (g = selectedItem.parent(), f = g.attr("id"), e = [], h = g.find(".widget-element"), h.each(function() {
                e.push($(this).attr("id"))
            }), g.attr("id", "GROUP_TMP"))
        },
        rotate: function(f, h) {
            pageSave = !1, c = a.getMatrix(h.element), b = a.getAngle(c), a.setTransform(selectedItem, selectedItem, b), $("#resizable-element").find(".textRotate").text(b), "" != g && (d.removeGroup(g), d.CalculatedGroup(e, g))
        },
        stop: function(a, h) {
            var i = new CssResizeAfterRotate;
            i.setHandleResize(), c = "", h.angle.current = b, h.angle.start = b, h.angle.stop = b, "" != g && (d.createGroup(e), g.attr("id", f), e = [], g = ""), $("#resizable-element").find(".textRotate").hide("slow")
        }
    })
},
Rotate.prototype.getAngle = function (a) {
    if ("none" != a && void 0 != a && "" != a) var b = a.split("(")[1].split(")")[0].split(","),
        c = b[0],
        d = b[1],
        e = Math.round(Math.atan2(d, c) * (180 / Math.PI));
    else var e = 0;
    var f = 0;
    return f = 0 > e ? e += 360 : e
},
Rotate.prototype.getMatrix = function (a) {
    var b = a.css("-webkit-transform") || a.css("-moz-transform") || a.css("-ms-transform") || a.css("-o-transform") || a.css("transform");
    return b
},
Rotate.prototype.setTransform = function (a, b, c) {
    var d = PN_PAGE.getIndexElement(selectedItem.attr("id")),
        e = apiElement[d].skewx,
        f = apiElement[d].skewy;
    (void 0 == e || "undefined" == e || "" == e) && (e = 0, apiElement[d].skewx = 0), (void 0 == f || "undefined" == f || "" == f) && (f = 0, apiElement[d].skewy = 0), selectedItem.hasClass("important") ? ($("#resizable-element").css({
        transform: "skewY(0deg) skewX(0deg) rotate(0deg)"
    }), $("#resizable-element").css({
        mozTransform: "skewY(0deg) skewX(0deg) rotate(0deg)"
    }), $("#resizable-element").css({
        msTransform: "skewY(0deg) skewX(0deg) rotate(0deg)"
    }), $("#resizable-element").css({
        webkitTransform: "skewY(0deg) skewX(0deg) rotate(0deg)"
    }), $("#resizable-element").css({
        oTransform: "skewY(0deg) skewX(0deg) rotate(0deg)"
    }), apiElement[d].rotate = 0, apiElement[d].skewx = 0, apiElement[d].skewy = 0) : (apiElement[d].rotate = c, b.css({
        transform: "skewY(" + f + "deg) skewX(" + e + "deg) rotate(" + c + "deg)"
    }), b.css({
        mozTransform: "skewY(" + f + "deg) skewX(" + e + "deg) rotate(" + c + "deg)"
    }), b.css({
        msTransform: "skewY(" + f + "deg) skewX(" + e + "deg) rotate(" + c + "deg)"
    }), b.css({
        webkitTransform: "skewY(" + f + "deg) skewX(" + e + "deg) rotate(" + c + "deg)"
    }), b.css({
        oTransform: "skewY(" + f + "deg) skewX(" + e + "deg) rotate(" + c + "deg)"
    }), $("#resizable-element").css({
        transform: "skewY(" + f + "deg) skewX(" + e + "deg) rotate(" + c + "deg)"
    }), $("#resizable-element").css({
        mozTransform: "skewY(" + f + "deg) skewX(" + e + "deg) rotate(" + c + "deg)"
    }), $("#resizable-element").css({
        msTransform: "skewY(" + f + "deg) skewX(" + e + "deg) rotate(" + c + "deg)"
    }), $("#resizable-element").css({
        webkitTransform: "skewY(" + f + "deg) skewX(" + e + "deg) rotate(" + c + "deg)"
    }), $("#resizable-element").css({
        oTransform: "skewY(" + f + "deg) skewX(" + e + "deg) rotate(" + c + "deg)"
    }))
},
Rotate.prototype.valueEle = function (a) {
    if (void 0 != a) {
        var b = "";
        return b = a[0].getBoundingClientRect(), size = {
            width: b.width,
            height: b.height,
            left: b.left,
            right: b.right,
            top: b.top,
            bottom: b.bottom
        }
    }
};