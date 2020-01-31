var checkChild = function(a, b) {
        if (a && a.length > 0 && b && b.length > 0) {
            var c = a.offset().top,
                d = a.outerHeight(),
                e = a.offset().left,
                f = a.outerWidth(),
                g = b.offset().top,
                h = b.outerHeight(),
                i = b.offset().left,
                j = b.outerWidth();
            return c >= g && e >= i && g + h >= c + d && i + j >= e + f ? !0 : !1
        }
        return !1
    },
    RunApp = function() {};
RunApp.prototype.init = function() {
    var a = new LandingPage,
        b = new AddToFrame,
        c = new BoxResizeClick,
        d = new EventKey,
        e = new ResizeAfterRotate,
        f = new ResizeSection,
        g = new OptionWiget,
        h = new AjaxPage,
        i = (new AddGroup, new TreeWidget),
        j = new LpResize,
        k = new Rotate,
        l = new resetPage;
    k.init(), j.init(), f.init(), e.init(), b.init(), d.init(), c.init(), g.init(), h.init(), i.init(), l.init(), resetPage(), a.init(), $(".aside-setting .widget-item").hide(), $(".minicolors").css({
        width: "80px"
    }), $(".value_shadow .minicolors").css({
        width: "87px"
    }), $(".bggradient2 .minicolors-panel").css({
        left: "-110px"
    }), g.showHideElementDefault();
    for (var m = 0; m < apiElement.length; m++) {
        var n = PN_PAGE.getElement("#" + apiElement[m].id),
            o = n.attr("pn-type");
        "image" == o && StartListImage.push(apiElement[m].link), "image" == apiElement[m].bg_type && StartListImage.push(apiElement[m].media[deviceEdit]["background-image"]), apiElement[m].animate && apiElement[m].animate.length > 0 && n.removeClass(apiElement[m].animate)
    }
    arrIdOnScreen = [];
    var p = new OptionWiget;
    arrIdOnScreen = p.getIdElementOnScreen(), selectedItem = PN_PAGE.getElement(".widget-section:visible").eq(0), $.unique(StartListImage), g.fixsizeBody(), $('input[type="number"]').unbind("keydown").bind("keydown", function(a) {
        if (38 === a.keyCode || 40 === a.keyCode) {
            a.preventDefault();
            var b = $(this).val();
            b = void 0 != b && "" != b ? parseFloat(b) : 0;
            var c = a.keyCode,
                d = $(this),
                e = $(this).attr("step"),
                f = $(this).attr("min"),
                g = $(this).attr("max");
            e = void 0 != e && "" != e ? parseFloat(e) : 1, setTimeout(function() {
                40 === c && (void 0 != f && "" != f && b <= parseFloat(f) ? b = parseFloat(f) : b -= e), 38 === c && (void 0 != g && "" != g && b >= parseFloat(g) ? b = parseFloat(g) : b += e), 1 > e && e > 0 && (b = b.toFixed(1)), d.val(b).change()
            }, 50)
        }
    })
};