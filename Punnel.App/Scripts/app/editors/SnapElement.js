var SnapElement = function() {};
SnapElement.prototype.getElementSnap = function() {
    if (void 0 != selectedItem && selectedItem.length > 0) {
        var a = new OptionWiget,
            b = a.getParentSection(),
            c = b.next(),
            d = b.prev(),
            e = [],
            f = (new Rotate, this);
        if (void 0 != b && b.length > 0 && b.hasClass("widget-section")) {
            var g = c.find(".widget-element:visible");
            void 0 != g && g.length > 0 && g.each(function() {
                $(this).attr("id") != selectedItem.attr("id") && e.push(f.returnValueItemSnap($(this)))
            })
        }
        if (void 0 != c && c.length > 0 && c.hasClass("widget-section")) {
            var h = c.find(".widget-element:visible");
            void 0 != h && h.length > 0 && h.each(function() {
                e.push(f.returnValueItemSnap($(this)))
            })
        }
        if (void 0 != d && d.length > 0 && d.hasClass("widget-section")) {
            var i = d.find(".widget-element:visible");
            void 0 != i && i.length > 0 && i.each(function() {
                e.push(f.returnValueItemSnap($(this)))
            })
        }
    }
},
SnapElement.prototype.returnValueItemSnap = function (a) {
    if (void 0 != a && a.length > 0) {
        var b = new Rotate,
            c = {
                id: a.attr("id"),
                width: b.valueEle(a).width,
                height: b.valueEle(a).height,
                top: a.offset().top,
                left: a.offset().left
            };
        return c
    }
};