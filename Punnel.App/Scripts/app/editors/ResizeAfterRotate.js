var ResizeAfterRotate = function () { };
ResizeAfterRotate.prototype.init = function () {
    this.resizeRote()
},
ResizeAfterRotate.prototype.resizeRote = function () {
    function a(a) {
        return parseInt(a, 10) || 0
    }

    function b(a, b, c, d, e) {
        var e = e * Math.PI / 180,
            f = -a / 2,
            g = b / 2,
            h = g * Math.sin(e) + f * Math.cos(e),
            i = g * Math.cos(e) - f * Math.sin(e),
            j = {
                left: h - f,
                top: i - g
            },
            k = a + c,
            l = b + d,
            f = -k / 2,
            g = l / 2,
            h = g * Math.sin(e) + f * Math.cos(e),
            i = g * Math.cos(e) - f * Math.sin(e),
            m = {
                left: h - f,
                top: i - g
            },
            n = {
                left: m.left - j.left,
                top: m.top - j.top
            };
        return n
    }

    function c(a) {
        var b = window.getComputedStyle(a, null),
            c = b.getPropertyValue("-webkit-transform") || b.getPropertyValue("-moz-transform") || b.getPropertyValue("-ms-transform") || b.getPropertyValue("-o-transform") || b.getPropertyValue("transform") || null;
        if (c && "none" != c) {
            var d = c.split("(")[1];
            d = d.split(")")[0], d = d.split(",");
            for (var e = d[0], f = d[1], g = Math.round(Math.atan2(f, e) * (180 / Math.PI)) ; g >= 360;) g = 360 - g;
            for (; 0 > g;) g = 360 + g;
            return g
        }
        return 0
    }

    function d(a) {
        return isNaN(parseFloat(a)) ? 0 : parseFloat(a)
    }

    function e(a) {
        return Math.round(100 * (a + 1e-5)) / 100
    }
    $.ui.resizable.prototype._mouseStart = function (b) {
        var c, d, e, f = this.options,
            g = this.element;
        return this.resizing = !0, this._renderProxy(), c = a(this.helper.css("left")), d = a(this.helper.css("top")), f.containment && (c += $(f.containment).scrollLeft() || 0, d += $(f.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
            left: c,
            top: d
        }, this.size = this._helper ? {
            width: this.helper.width(),
            height: this.helper.height()
        } : {
            width: g.width(),
            height: g.height()
        }, this.originalSize = this._helper ? {
            width: g.outerWidth(),
            height: g.outerHeight()
        } : {
            width: g.width(),
            height: g.height()
        }, this.sizeDiff = {
            width: g.outerWidth() - g.width(),
            height: g.outerHeight() - g.height()
        }, this.originalPosition = {
            left: c,
            top: d
        }, this.originalMousePosition = {
            left: b.pageX,
            top: b.pageY
        }, this.lastData = this.originalPosition, this.aspectRatio = "number" == typeof f.aspectRatio ? f.aspectRatio : this.originalSize.width / this.originalSize.height || 1, e = $(".ui-resizable-" + this.axis).css("cursor"), $("body").css("cursor", "auto" === e ? this.axis + "-resize" : e), g.addClass("ui-resizable-resizing"), this._propagate("start", b), !0
    }, $.ui.resizable.prototype._mouseDrag = function (a) {
        var f, g = c(this.element[0]),
            h = g * Math.PI / 180,
            i = this.helper,
            j = {},
            k = this.originalMousePosition,
            l = this.axis,
            m = this.position.top,
            n = this.position.left,
            o = this.size.width,
            p = this.size.height,
            q = a.pageX - k.left || 0,
            r = a.pageY - k.top || 0,
            s = this._change[l],
            t = this.size.width,
            u = this.size.height;
        if (!s) return !1;
        var v = Math.cos(h),
            w = Math.sin(h),
            x = q * v + r * w,
            y = r * v - q * w;
        q = x, r = y, f = s.apply(this, [a, q, r]), this._updateVirtualBoundaries(a.shiftKey), (this._aspectRatio || a.shiftKey) && (f = this._updateRatio(f, a)), f = this._respectSize(f, a);
        var z = {
            left: this.position.left,
            top: this.position.top
        };
        this._updateCache(f), this.position = {
            left: z.left,
            top: z.top
        };
        var A = {
            left: d(f.left || this.lastData.left) - d(this.lastData.left),
            top: d(f.top || this.lastData.top) - d(this.lastData.top)
        },
            B = {};
        B.left = A.left * v - A.top * w, B.top = A.top * v + A.left * w, B.left = e(B.left), B.top = e(B.top), this.position.left += B.left, this.position.top += B.top, this.lastData = {
            left: d(f.left || this.lastData.left),
            top: d(f.top || this.lastData.top)
        }, this._propagate("resize", a);
        var C = t - this.size.width,
            D = u - this.size.height,
            E = b(t, u, C, D, g);
        return this.position.left += E.left, this.position.top -= E.top, this.position.top !== m && (j.top = this.position.top + "px"), this.position.left !== n && (j.left = this.position.left + "px"), this.size.width !== o && (j.width = this.size.width + "px"), this.size.height !== p && (j.height = this.size.height + "px"), i.css(j), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), $.isEmptyObject(j) || this._trigger("resize", a, this.ui()), !1
    }
};

var CssResizeAfterRotate = function () { };
CssResizeAfterRotate.prototype.init = function () { },
CssResizeAfterRotate.prototype.setHandleResize = function () {
    var a = new Rotate,
        b = a.getMatrix($("#resizable-element")),
        c = a.getAngle(b),
        d = $("#resizable-element").find(".ui-resizable-e"),
        e = $("#resizable-element").find(".ui-resizable-n"),
        f = $("#resizable-element").find(".ui-resizable-s"),
        g = $("#resizable-element").find(".ui-resizable-w"),
        h = $("#resizable-element").find(".ui-resizable-ne"),
        i = $("#resizable-element").find(".ui-resizable-se"),
        j = $("#resizable-element").find(".ui-resizable-nw"),
        k = $("#resizable-element").find(".ui-resizable-sw");
    c >= 20 && 75 > c && (d.css({
        cursor: "se-resize"
    }), e.css({
        cursor: "ne-resize"
    }), f.css({
        cursor: "sw-resize"
    }), g.css({
        cursor: "nw-resize"
    }), j.css({
        cursor: "n-resize"
    }), h.css({
        cursor: "e-resize"
    }), k.css({
        cursor: "w-resize"
    }), i.css({
        cursor: "s-resize"
    })), c >= 75 && 110 > c && (d.css({
        cursor: "s-resize"
    }), e.css({
        cursor: "w-resize"
    }), f.css({
        cursor: "e-resize"
    }), g.css({
        cursor: "n-resize"
    }), j.css({
        cursor: "ne-resize"
    }), h.css({
        cursor: "se-resize"
    }), k.css({
        cursor: "nw-resize"
    }), i.css({
        cursor: "ne-resize"
    })), c >= 110 && 160 > c && (d.css({
        cursor: "sw-resize"
    }), e.css({
        cursor: "se-resize"
    }), f.css({
        cursor: "se-resize"
    }), g.css({
        cursor: "sw-resize"
    }), j.css({
        cursor: "e-resize"
    }), h.css({
        cursor: "s-resize"
    }), k.css({
        cursor: "s-resize"
    }), i.css({
        cursor: "e-resize"
    })), c >= 160 && 190 > c && (d.css({
        cursor: "e-resize"
    }), e.css({
        cursor: "n-resize"
    }), f.css({
        cursor: "s-resize"
    }), g.css({
        cursor: "w-resize"
    }), j.css({
        cursor: "nw-resize"
    }), h.css({
        cursor: "ne-resize"
    }), k.css({
        cursor: "sw-resize"
    }), i.css({
        cursor: "se-resize"
    })), c >= 190 && 240 > c && (d.css({
        cursor: "nw-resize"
    }), e.css({
        cursor: "sw-resize"
    }), f.css({
        cursor: "ne-resize"
    }), g.css({
        cursor: "se-resize"
    }), j.css({
        cursor: "s-resize"
    }), h.css({
        cursor: "w-resize"
    }), k.css({
        cursor: "e-resize"
    }), i.css({
        cursor: "s-resize"
    })), c >= 240 && 290 > c && (d.css({
        cursor: "s-resize"
    }), e.css({
        cursor: "e-resize"
    }), f.css({
        cursor: "e-resize"
    }), g.css({
        cursor: "s-resize"
    }), j.css({
        cursor: "sw-resize"
    }), h.css({
        cursor: "nw-resize"
    }), k.css({
        cursor: "nw-resize"
    }), i.css({
        cursor: "sw-resize"
    })), c >= 290 && 340 > c && (d.css({
        cursor: "ne-resize"
    }), e.css({
        cursor: "nw-resize"
    }), f.css({
        cursor: "nw-resize"
    }), g.css({
        cursor: "ne-resize"
    }), j.css({
        cursor: "e-resize"
    }), h.css({
        cursor: "s-resize"
    }), k.css({
        cursor: "s-resize"
    }), i.css({
        cursor: "e-resize"
    })), (c >= 340 && 360 >= c || c >= 0 && 20 > c) && (d.css({
        cursor: "e-resize"
    }), e.css({
        cursor: "n-resize"
    }), f.css({
        cursor: "s-resize"
    }), g.css({
        cursor: "w-resize"
    }), j.css({
        cursor: "nw-resize"
    }), h.css({
        cursor: "ne-resize"
    }), k.css({
        cursor: "sw-resize"
    }), i.css({
        cursor: "se-resize"
    }))
};