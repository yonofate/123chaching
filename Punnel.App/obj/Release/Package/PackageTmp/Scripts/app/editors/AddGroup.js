var AddGroup = function() {};
AddGroup.prototype.init = function() {
    this.addGroupTmp()
},
AddGroup.prototype.addGroupTmp = function () {
    if ("group_tmp" == keyDownSl) {
        var a = selectedItem,
            b = !1;
        if (0 == groupElement.length) PN_PAGE.checkItemSlider(a) && (groupElement.push(a.attr("id")), parentGroup = a.parent().attr("id"));
        else {
            for (var c = 0; c < groupElement.length; c++) groupElement[c] == a.attr("id") && (groupElement.splice($.inArray(a.attr("id"), groupElement), 1), this.createDivGroup(groupElement, parentGroup), b = !0), a.parent().attr("id") != parentGroup && (b = !0, this.createDivGroup(groupElement, parentGroup));
            a.hasClass("widget-group") && "group-tmp" == a.attr("pn-type") && (b = !0, this.createDivGroup(groupElement, parentGroup)), parentGroup == a.parent().attr("id") && 0 == b && PN_PAGE.checkItemSlider(wg) && (groupElement.push(a.attr("id")), this.createDivGroup(groupElement, parentGroup))
        }
    }
},
AddGroup.prototype.getGroupTmp = function () {
    var a = PN_PAGE.getElement('div[pn-type="group-tmp"]');
    return a
},
AddGroup.prototype.getElement = function (a) {
    return PN_PAGE.getElement("#" + a)
},
AddGroup.prototype.getParentGroup = function () {
    return PN_PAGE.getElement("#" + parentGroup)
},
AddGroup.prototype.removeGroupTmp = function () {
    var a = this.getGroupTmp(),
        b = PN_PAGE.getIndexElement("GROUP_TMP");
    b && (apiElement.splice(b, 1), PN_PAGE.getElement("#GROUP_TMP").remove()), a.remove()
},
AddGroup.prototype.getElementGroupTmp = function () {
    return PN_PAGE.getElement("#GROUP_TMP")
},
AddGroup.prototype.createDivGroup = function (a, b) {
    this.removeGroupTmp(), a.length > 0 && null != b && (this.getParentGroup().prepend(htmlGroup), this.CalculatedGroup(a, this.getGroupTmp()), selectedItem = this.getElementGroupTmp())
},
AddGroup.prototype.CalculatedGroup = function (a, b) {
    var c, d, e, f, g, h, i, j, k, l, m = (PN_PAGE.PUNNEL_EDIT.offset().top, PN_PAGE.PUNNEL_EDIT.offset().left, PN_PAGE.PUNNEL_EDIT.scrollTop()),
        n = new Rotate,
        o = this.getElement(a[0]);
    k = (n.valueEle(o).height - o.outerHeight()) / 2, l = (n.valueEle(o).width - o.outerWidth()) / 2, g = o.offset().left, h = g + n.valueEle(o).width, i = o.offset().top, j = i + n.valueEle(o).height;
    for (var p = 0; p < a.length; p++) {
        var q = this.getElement(a[p]);
        k = (n.valueEle(q).height - q.outerHeight()) / 2, l = (n.valueEle(q).width - q.outerWidth()) / 2;
        var r = q.offset().left,
            s = q.offset().top,
            t = r + n.valueEle(q).width,
            u = s + n.valueEle(q).height;
        g > r && (g = r), t > h && (h = t), i > s && (i = s), u > j && (j = u)
    }
    var v = b.parent();
    if (c = i - v.offset().top, d = g - v.offset().left, e = h - g, f = j - i, b.hasClass("widget-group")) {
        var w = b;
        w.css({
            top: c + m + "px",
            left: d + "px",
            width: e + "px",
            height: f + "px"
        }), w.find(".widget-content").eq(0).css({
            width: e - 2 + "px",
            height: f - 2 + "px"
        }), apiElement[apiElement.length - 1].lp_type = "widget-element", apiElement[apiElement.length - 1].mobile = 0, apiElement[apiElement.length - 1].media.desktop.width = e + "px", apiElement[apiElement.length - 1].media.desktop.height = f + "px", apiElement[apiElement.length - 1].media.mobile.width = e + "px", apiElement[apiElement.length - 1].media.mobile.height = f + "px", apiElement[apiElement.length - 1].media.desktop.top = c + "px", apiElement[apiElement.length - 1].media.desktop.left = d + "px", apiElement[apiElement.length - 1].media.mobile.top = c + "px", apiElement[apiElement.length - 1].media.mobile.left = d + "px"
    }
},
AddGroup.prototype.createGroup = function (a) {
    var b, c, d = this,
        e = new Rotate,
        f = this.getElementGroupTmp();
    b = f.offset().top, c = f.offset().left;
    for (var g = f.outerWidth() + 1, h = f.outerHeight() + 1, i = a.length - 1, j = i; j >= 0; j--) {
        var k = this.getElement(a[j]),
            l = (e.valueEle(k).height - k.outerHeight()) / 2,
            m = (e.valueEle(k).width - k.outerWidth()) / 2,
            n = k.offset().top - b + l,
            o = k.offset().left - c + m;
        k.css({
            top: n + "px",
            left: o + "px"
        }).appendTo(f);
        var p = PN_PAGE.getIndexElement(k.attr("id"));
        apiElement[p].media["" + deviceEdit].top = n + "px", apiElement[p].media["" + deviceEdit].left = o + "px", k.removeClass("widget-snap"), k.draggable("disable")
    }
    var q = PN_PAGE.getIndexElement("GROUP_TMP"),
        r = new Date;
    f.attr("id", "LADI" + r.getTime()), f.attr("pn-type", "group"), f.css({
        width: g + "px",
        height: h + "px"
    }), f.find(".widget-content").eq(0).css({
        width: g + "px",
        height: h + "px"
    }), apiElement[q].id = f.attr("id"), apiElement[q].mobile = 0, apiElement[q].lp_type = "widget-element", apiElement[q].media.desktop.width = g + "px", apiElement[q].media.desktop.height = h + "px", apiElement[q].media.mobile.width = g + "px", apiElement[q].media.mobile.height = h + "px";
    var s = f.find(".widget-group");
    s.each(function() {
        d.removeGroup($(this)), $(this).remove()
    });
    for (var j = apiElement.length - 1; j >= 0; j--) "GROUP_TMP" == apiElement[j].id && apiElement.splice(j, 1)
},
AddGroup.prototype.removeGroup = function (a) {
    if (a.hasClass("widget-group")) {
        var b = new Rotate,
            c = a.parent(),
            d = a.find(".widget-element");
        d.each(function() {
            var a = (b.valueEle($(this)).height - $(this).outerHeight()) / 2,
                d = (b.valueEle($(this)).width - $(this).outerWidth()) / 2,
                e = $(this).offset().top - c.offset().top + a,
                f = $(this).offset().left - c.offset().left + d;
            $(this).css({
                top: e + "px",
                left: f + "px"
            }), $(this).appendTo(c), $(this).addClass("widget-snap"), PN_PAGE.getElement("#" + $(this).attr("id")).draggable("enable");
            var g = PN_PAGE.getIndexElement($(this).attr("id"));
            apiElement[g].media["" + deviceEdit].top = e, apiElement[g].media["" + deviceEdit].left = f
        });
        var e = PN_PAGE.getIndexElement(a.attr("id"));
        e && apiElement.splice(e, 1)
    }
},
AddGroup.prototype.resetGroup = function (a, b) {
    if (a.length > 0) {
        for (var c, d, e, f, g = $("#resizable-element"), h = this.getItemLeftMin(a), i = this.getItemTopMin(a), j = PN_PAGE.getElement("#" + h).offset().left - b.offset().left, k = PN_PAGE.getElement("#" + i).offset().top - b.offset().top, l = 0; l < a.length; l++) void 0 != a[l] && "undefined" != a[l] && "" != a[l] && "GROUP_TMP" != a[l] && (c = PN_PAGE.getElement("#" + a[l]), d = PN_PAGE.getIndexElement(a[l]), e = parseFloat(c.css("left")) - j, f = parseFloat(c.css("top")) - k, c.css({
            top: f + "px",
            left: e + "px"
        }), apiElement[d].media[deviceEdit].top = c.css("top"), apiElement[d].media[deviceEdit].left = c.css("left"));
        g.css({
            top: parseFloat(g.css("top")) - k + "px",
            left: parseFloat(g.css("left")) - j + "px"
        })
    }
},
AddGroup.prototype.getItemLeftMin = function (a) {
    if (a.length > 0)
        for (var b = a.length - 1; b >= 0; b--) PN_PAGE.getElement("#" + a[b]).length <= 0 && a.splice(b, 1);
    for (var c = PN_PAGE.getElement("#" + a[0]).offset().left, d = a[0], b = 0; b < a.length; b++)
        if (void 0 != a[b] && "undefined" != a[b] && "" != a[b] && "GROUP_TMP" != a[b]) {
            var e = PN_PAGE.getElement("#" + a[b]),
                f = e.offset().left;
            c > f && (c = f, d = a[b])
        }
    return d
},
AddGroup.prototype.getItemTopMin = function (a) {
    if (a.length > 0)
        for (var b = a.length - 1; b >= 0; b--) PN_PAGE.getElement("#" + a[b]).length <= 0 && a.splice(b, 1);
    for (var c = PN_PAGE.getElement("#" + a[0]).offset().top, d = a[0], b = 0; b < a.length; b++)
        if (void 0 != a[b] && "undefined" != a[b] && "" != a[b] && "GROUP_TMP" != a[b]) {
            var e = PN_PAGE.getElement("#" + a[b]).offset().top;
            c > e && (c = e, d = a[b])
        }
    return d
},
AddGroup.prototype.getItemTopMax = function (a) {
    if (a.length > 0)
        for (var b = a.length - 1; b >= 0; b--) PN_PAGE.getElement("#" + a[b]).length <= 0 && a.splice(b, 1);
    var c, d = new Rotate;
    c = PN_PAGE.getElement("#" + a[0]);
    for (var e = c.offset().top + d.valueEle(c).height, f = a[0], b = 0; b < a.length; b++)
        if (void 0 != a[b] && "undefined" != a[b] && "" != a[b] && "GROUP_TMP" != a[b]) {
            c = PN_PAGE.getElement("#" + a[b]);
            var g = c.offset().top + d.valueEle(c).height;
            g > e && (e = g, f = a[b])
        }
    return f
},
AddGroup.prototype.getItemLeftMax = function (a) {
    if (a.length > 0)
        for (var b = a.length - 1; b >= 0; b--) PN_PAGE.getElement("#" + a[b]).length <= 0 && a.splice(b, 1);
    var c, d = new Rotate;
    c = PN_PAGE.getElement("#" + a[0]);
    for (var e = c.offset().left + d.valueEle(c).width, f = a[0], b = 0; b < a.length; b++)
        if (void 0 != a[b] && "undefined" != a[b] && "" != a[b] && "GROUP_TMP" != a[b]) {
            c = PN_PAGE.getElement("#" + a[b]);
            var g = c.offset().left + d.valueEle(c).width;
            g > e && (e = g, f = a[b])
        }
    return f
},
AddGroup.prototype.createGroupTmp = function (a) {
    if (void 0 != a && a.length > 0 && a.length > 1 && "desktop" == deviceEdit) {
        var b = new AddGroup,
            c = PN_PAGE.getElement("#" + b.getItemTopMin(a)),
            d = PN_PAGE.getElement("#" + b.getItemLeftMin(a)),
            e = PN_PAGE.getElement("#" + b.getItemTopMax(a)),
            f = PN_PAGE.getElement("#" + b.getItemLeftMax(a)),
            g = new Rotate,
            h = g.valueEle(c).top + topScroll - PN_PAGE.PUNNEL_EDIT.offset().top + "px",
            i = g.valueEle(d).left - LEFT_FRAME - PN_PAGE.PUNNEL_EDIT.offset().left + "px",
            j = g.valueEle(f).left + g.valueEle(f).width + -g.valueEle(d).left + "px",
            k = g.valueEle(e).top + g.valueEle(e).height + -g.valueEle(c).top + "px";
        PN_PAGE.getElement('div[pn-type="group-tmp"]').remove(), PN_PAGE.PUNNEL_EDIT.append(htmlGroup), PN_PAGE.getElement("#GROUP_TMP").css({
            top: h,
            left: i,
            width: j,
            height: k
        });
        var l = new AddToFrame;
        l.apiDefault("group", "group", "GROUP_TMP", "", h, i, j, k), selectedItem = PN_PAGE.getElement("#GROUP_TMP"), selectedItem.find(".widget-content").eq(0).css({
            outline: "0"
        });
        var m = new ShowBoxResize;
        m.showBox(selectedItem), $("#resizable-section").hide()
    }
};