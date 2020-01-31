var DragBoxResize = function() {};
DragBoxResize.prototype.init = function () { },
DragBoxResize.prototype.getItemScreen = function () {
    var a = "";
    void 0 != selectedItem && selectedItem.length > 0 && (a = selectedItem.attr("id"));
    var b = new Rotate,
        c = PN_PAGE.PUNNEL_EDIT;
    if (c && c.offset()) {
        var d, e = c.offset().left,
            f = [],
            g = $(".item-grid-snap");
        g.each(function() {
            var a = {
                id: $(this).attr("id"),
                width: b.valueEle($(this)).width,
                height: b.valueEle($(this)).height,
                top: $(this).offset().top,
                left: $(this).offset().left - e
            };
            f.unshift(a)
        });
        var h = $(".resizable-popup");
        if ("none" != h.css("display")) {
            var i = c.contents().find("#" + h.attr("pn-id-popup")),
                j = i.find(".widget-element");
            void 0 != j && j.length > 0 && j.each(function() {
                if (void 0 != $(this) && $(this).length > 0 && $(this).attr("id") != a) {
                    var c = {
                        id: $(this).attr("id"),
                        width: b.valueEle($(this)).width,
                        height: b.valueEle($(this)).height,
                        top: $(this).offset().top,
                        left: $(this).offset().left
                    };
                    f.push(c)
                }
            })
        } else
            for (var k = arrIdOnScreen.length, l = 0; k > l; l++)
                if (d = c.contents().find("#" + arrIdOnScreen[l] + ":visible"), void 0 != selectedItem && void 0 != d && d.length > 0 && selectedItem.find("#" + arrIdOnScreen[l]).length < 1 && arrIdOnScreen[l] != a && d.attr("pn-group") != a && -1 == groupElement.indexOf(arrIdOnScreen[l]) && !d.hasClass("widget-group")) {
                    var m = {
                        id: arrIdOnScreen[l],
                        width: b.valueEle(d).width,
                        height: b.valueEle(d).height,
                        top: d.offset().top,
                        left: d.offset().left
                    };
                    f.unshift(m)
                } else if (void 0 != d && d.length > 0) {
            var m = {
                id: arrIdOnScreen[l],
                width: b.valueEle(d).width,
                height: b.valueEle(d).height,
                top: d.offset().top,
                left: d.offset().left
            };
            f.unshift(m)
        }
        var n = this.arrSnapValue(f),
            o = n.arrWidth,
            p = n.arrHeight,
            q = this.resetArr(o),
            r = this.resetArr(p);
        return {
            arr: f,
            arrW: q,
            arrH: r
        }
    }
},
DragBoxResize.prototype.arrSnapValue = function (a) {
    for (var b = a.length, c = {
            arrWidth: [],
            arrHeight: []
        }, d = 0; b > d; d++) c.arrWidth.unshift(a[d].left), a[d].width > 1 && c.arrWidth.unshift(a[d].left + a[d].width), c.arrHeight.unshift(a[d].top), a[d].width > 1 && c.arrHeight.unshift(a[d].top + a[d].height);
    return c
},
DragBoxResize.prototype.resetArr = function (a) {
    for (var b = a.length, c = 0; b > c; c++)
        for (var d = 0; b > d; d++) a[c] == a[d] && c != d && a.splice(d, 1);
    return a
};