var getElementClick = function (a, b, c) {
        if (c && c.length > 0) {
            var d = $(".resizable-popup");
            if ("none" != d.css("display")) {
                var e, f, g, h, i = $("#" + d.attr("pn-id-popup")),
                    j = a,
                    k = b,
                    l = [],
                    m = $(i.find('.widget-element[pn-type!="item_slider"]:visible').get().reverse());
                return m.each(function() {
                    e = $(this).offset().top, f = $(this).offset().left, g = $(this).outerWidth(), h = $(this).outerHeight(), j >= e && k >= f && e + h >= j && f + g >= k && (i = $(this), "hidden" != i.css("visibility") && l.push(i))
                }), "hidden" != i.css("visibility") && l.push(i), l[0]
            }
            var e, f, g, h, i = c,
                j = a,
                k = b,
                l = [],
                m = $(c.find('.widget-element[pn-type!="item_slider"]:visible').get().reverse());
            return m.each(function() {
                e = $(this).offset().top, f = $(this).offset().left, g = $(this).outerWidth(), h = $(this).outerHeight(), j >= e && k >= f && e + h >= j && f + g >= k && (i = $(this), "hidden" != i.css("visibility") && l.push(i))
            }), "hidden" != i.css("visibility") && l.push(i), l[0]
        }
    },
    BoxResizeClick = function() {};
BoxResizeClick.prototype.init = function() {
   // this.clickRightMouse()
},
BoxResizeClick.prototype.clickRightMouse = function () {
    $("#resizable-element").contextmenu(function(a) {
        a.preventDefault()
    })
},
BoxResizeClick.prototype.dbClickBox = function (a) { };