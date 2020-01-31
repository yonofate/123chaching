var parentGroup = void 0,
    nodeEle = {},
    resizeSec = void 0,
    boxxResize = $("#resizable-element"),
    arrGroupItemValue = [],
    valueResize = {},
    clicks = 0,
    option, shiftDown = void 0,
    wSt, hSt, mouseIsDown = !1,
    nodestart = {},
    checkMove = !1,
    nodeend = {},
    selectedTMP = void 0,
    draggHover = "false",
    dragPositionElementTopLeft = {},
    dragPositionListElement = [],
    dragPositionElementMinHeight = -1,
    box_hover_is_drag_start = !1,
    resizable_is_drag_start = !1;
$.fn.scrollStopped = function (a) {
    var b = this,
        c = $(b);
    c.scroll(function (d) {
        clearTimeout(c.data("scrollTimeout")), c.data("scrollTimeout", setTimeout(a.bind(b), 250, d))
    })
};
var getObjSelect = function (a) {
    var b = new OptionWiget,
        c = b.getParentElement(selectedItem),
        d = b.getParentElement(a);
    return d ? selectedItem && selectedItem.attr("id") == d.attr("id") || c && c.attr("id") == d.attr("id") ? a : d : a
},
    createGroupCtrl = function (a) {
        if (a.length > 1 && "desktop" == deviceEdit) {
            var b = new AddGroup,
                c = PN_PAGE.getElement("#" + b.getItemTopMin(a)),
                d = PN_PAGE.getElement("#" + b.getItemLeftMin(a)),
                e = PN_PAGE.getElement("#" + b.getItemTopMax(a)),
                f = PN_PAGE.getElement("#" + b.getItemLeftMax(a)),
                g = new Rotate,
                h = c.offset().top - PN_PAGE.PUNNEL_EDIT.offset().top + "px",
                i = d.offset().left - PN_PAGE.PUNNEL_EDIT.offset().left + "px",
                j = f.offset().left + g.valueEle(f).width - d.offset().left + "px",
                k = e.offset().top + g.valueEle(e).height - c.offset().top + "px";
            PN_PAGE.getElement('div[pn-type="group-tmp"]').remove(), PN_PAGE.PUNNEL_EDIT.append(htmlGroup), PN_PAGE.getElement("#GROUP_TMP").css({
                top: h,
                left: i,
                width: j,
                height: k
            });
            var l = new AddToFrame;
            l.apiDefault("group", "group", "GROUP_TMP", "", h, i, j, k), selectedItem = PN_PAGE.getElement("#GROUP_TMP"), selectedItem.find(".widget-content").eq(0).css({
                outline: "0",
                border: "0"
            }), selectedItem.css({
                border: "0"
            });
            var m = new ShowBoxResize;
            m.showBox(selectedItem), $("#resizable-section").hide()
        }
    },
    getItemGroupTmp = function (a) {
        var b = [];
        if (a && a.length > 0) {
            var c, d, e, f;
            c = a.offset().top, d = a.offset().left, f = a.outerWidth(), e = a.outerHeight();
            for (var g = (PN_PAGE.getElement("#GROUP_TMP"), arrGroupItemValue.length), h = 0; g > h; h++) {
                var i = PN_PAGE.getElement("#" + arrGroupItemValue[h].id + ":visible");
                if ("true" != i.attr("pn-fixed") && !i.hasClass("important") && !i.hasClass("widget-item-child") && i.hasClass("widget-element") && "group-tmp" != i.attr("pn-type") && "item_slider" != i.parent().attr("pn-type") && "group" != i.parent().attr("pn-type") && "GROUP_TMP" != i.attr("id")) {
                    var j = i.offset().top,
                        k = i.offset().left,
                        l = parseFloat(i.css("height")),
                        m = parseFloat(i.css("width"));
                    if (c > j + l || j > c + e || d > k + m || k > d + f);
                    else {
                        var n = i.attr("pn-group"),
                            o = i.parent().parent();
                        if (void 0 != n && "undefined" != n && "" != n || "box" == o.attr("pn-type") ? PN_PAGE.checkItemSlider(o) && b.push(o.attr("id")) : PN_PAGE.checkItemSlider(i) && b.push(i.attr("id")), "contact_form" == i.attr("pn-type")) {
                            var p = PN_PAGE.getElement('.widget-element[pn-parent="' + i.attr("id") + '"]');
                            PN_PAGE.checkItemSlider(p) && b.push(p.attr("id"))
                        }
                        void 0 != i.attr("pn-parent") && "undefined" != i.attr("pn-parent") && "" != i.attr("pn-parent") && PN_PAGE.checkItemSlider(i) && b.push(i.attr("pn-parent"))
                    }
                }
            }
        }
        return $.unique(b)
    },
    createGroupMove = function (a) {
        if (a && a.length > 0) {
            var b, c, d, e;
            b = a.offset().top, c = a.offset().left, e = a.outerWidth(), d = a.outerHeight();
            var f = new AddGroup;
            f.removeGroupTmp();
            var g = PN_PAGE.PUNNEL_EDIT;
            g.prepend(htmlGroup);
            var h = new AddToFrame;
            h.apiDefault("group", "group", "GROUP_TMP", "", b, c, e, d);
            var i = PN_PAGE.getElement("#GROUP_TMP"),
                j = $(".item-group-select-tmp");
            j && j.length > 0 && j.each(function () {
                groupElement.push($(this).attr("id"))
            });
            for (var k = [], l = 0; l < groupElement.length; l++)
                for (var m = $("#" + groupElement[l]), n = 0; n < groupElement.length; n++) m.find("#" + groupElement[n]) && m.find("#" + groupElement[n]).length > 0 && k.push(groupElement[n]);
            for (var o = groupElement.length - 1; o >= 0; o--)
                for (var p = 0; p < k.length; p++) groupElement[o] == k[p] && groupElement.splice(o, 1);
            if (groupElement.length > 1)
                if (void 0 != elementFullScreen && elementFullScreen.length > 0 && PN_PAGE.getElement("#" + elementFullScreen).find("#" + groupEle[0]).length <= 0) groupElement = [], f.removeGroupTmp();
                else {
                    f.CalculatedGroup(groupElement, i), selectedItem = PN_PAGE.getElement("#GROUP_TMP");
                    var q = new ShowBoxResize;
                    q.showBox(selectedItem), PN_PAGE.getElement("#GROUP_TMP").css({
                        width: selectedItem.css("width"),
                        height: selectedItem.css("height")
                    }), $("#resizable-section").hide();
                    var r = new IframeClick;
                    r.showOptionProperties(selectedItem), selectedItem && selectedItem.hasClass("widget-element") && r.showControlEditPlugin(selectedItem)
                }
            else 1 == groupElement.length ? (void 0 != elementFullScreen && elementFullScreen.length > 0 && PN_PAGE.getElement("#" + elementFullScreen).find("#" + groupElement[0]).length <= 0 ? groupElement = [] : selectedItem = PN_PAGE.getElement("#" + groupElement[0]), f.removeGroupTmp()) : f.removeGroupTmp()
        }
    },
    mouseHandler = function (a, b) {
        switch (a) {
            case "down":
                if ($("#box-hover-element").hide(), pageMouseX = b.pageX, pageMouseY = b.pageY, nodestart.x = b.pageX, nodestart.y = b.pageY, nodeend.x = b.pageX, nodeend.y = b.pageY, mouseIsDown = !0, arrGroupItemValue = [], arrGroupItemValue = getElementSnap(), selectedItem && "true" == selectedItem.attr("pn-popup")) {
                    selectedItem.show();
                    var c = new ShowBoxResize;
                    c.showBoxSection(selectedItem);
                }
                if ($(".aside-left .dropdown-menu").hide(), $(".aside-left .dropdown").removeClass("active"), "ctrl_down" == keyDownSl) {
                    if (selectedItem && selectedItem.length > 0 && "true" != selectedItem.attr("pn-fixed")) {
                        var d = new EventKey;
                        d.addGroupElement(selectedItem), createGroupCtrl(groupElement)
                    }
                }
                else if (selectedItem && selectedItem.length > 0) {
                    wSt = selectedItem.css("width"), hSt = selectedItem.css("height");
                    var e = new OptionWiget;
                    e.addElementUndo("", selectedItem);
                    if ("desktop" != deviceEdit) {
                        e.calulatorAllGroup(selectedItem);
                        selectedItem.hasClass("widget-section");
                        groupElement = [];
                        var f = new AddGroup;
                        f.removeGroupTmp();
                        parentGroup = selectedItem.find(".container").eq(0)
                    }
                    nodeEle.x = parseFloat(selectedItem.css("left")), nodeEle.y = parseFloat(selectedItem.css("top")), valueResize.top = parseFloat(boxxResize.css("top")), valueResize.left = parseFloat(boxxResize.css("left"))
                }
        else if (selectedItem && selectedItem.length > 0) {
            wSt = selectedItem.css("width"), hSt = selectedItem.css("height");
            var e = new OptionWiget;
            if ("desktop" != deviceEdit && selectedItem.hasClass("widget-section")) {
                groupElement = [];
                //e.calulatorAllGroup(selectedItem);
                var f = new AddGroup;
                f.removeGroupTmp(), parentGroup = selectedItem.find(".container").eq(0)
            }
            nodeEle.x = parseFloat(selectedItem.css("left")), nodeEle.y = parseFloat(selectedItem.css("top")), valueResize.top = parseFloat(boxxResize.css("top")), valueResize.left = parseFloat(boxxResize.css("left"))
        }
        mouseIsDown = !0;
        break;
            case "move":
                if ("false" == testResize && 1 == mouseIsDown && "ctrl_down" != keyDownSl && selectedItem && selectedItem.length > 0 && 1 != preview) {
                    if (checkMove = !0, selectedItem && selectedItem.length > 0) {
                        nodeend.x = b.pageX, nodeend.y = b.pageY, numMouseMove++ , PN_PAGE.getElement(".widget-element.widget-group > .widget-content").css({
                            outline: "0px"
                        });
                        var g = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                            h = new RenCssMobile;
                        if (h.isVal(apiElement[g].usingTopButon) || h.isVal(apiElement[g].usingLeftRight));
                        else if (selectedItem.hasClass("widget-section") && "true" != selectedItem.attr("pn-popup")) {
                            createGroupTmp(nodestart, nodeend);
                            var i = PN_PAGE.getElement("#GROUP_TMP"),
                                j = getItemGroupTmp(i),
                                k = j.length;
                            $(".widget-element").removeClass("item-group-select-tmp");
                            for (var l = 0; k > l; l++) PN_PAGE.PUNNEL_EDIT.find("#" + j[l]).addClass("item-group-select-tmp")
                        }
                    }
                    var m = nodeend.y - nodestart.y + nodeEle.y + "px",
                        n = nodeend.x - nodestart.x + nodeEle.x + "px";
                    if (selectedItem.hasClass("widget-element")) {
                        selectedItem.css({
                            top: m,
                            left: n
                        });
                        var o = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                        apiElement[o].media[deviceEdit].top = selectedItem.css("top"), apiElement[o].media[deviceEdit].left = selectedItem.css("left")
                    }
                    "GROUP_TMP" != selectedItem.attr("id") ? ($("#resizable-element").hide(), $(".control-edit").hide()) : $(".control-edit").css({
                        left: parseFloat($("#resizable-element").css("left")) + $("#resizable-element").outerWidth() - $(".control-edit").outerWidth(),
                        top: parseFloat($("#resizable-element").css("top")) - 45 + "px"
                    });
                }
                break;
            case "up":
                if (shiftDown = void 0, selectedItem && selectedItem.length > 0) {
                    if (clicks = 0, e = new OptionWiget,
                        e.addElementUndo("", selectedItem),
                        (selectedItem.hasClass("widget-item-child") || selectedItem.find(".widget-content > .widget-item-child").length > 0) && e.resetWidgetItemChild(selectedItem),
                        selectedItem.attr("pn-group") && e.calulatorAllGroup(selectedItem),
                        resizeSec = void 0, mouseIsDown = !1, nodeend = {}, nodestart = {}, valueResize = {}, mouseIsMove) {
                        var i = PN_PAGE.getElement("#GROUP_TMP");
                        createGroupMove(i)
                    } else selectedItem && "GROUP_TMP" == selectedItem.attr("id") || (groupElement = [], $("#GROUP_TMP").remove());
                    arrGroupItemValue = []
                }
                $('.diver-line-x').hide(), $('.diver-line-y').hide(),
                $(".item-group-select-tmp").removeClass("item-group-select-tmp"), $(".wg-hover").removeClass("wg-hover"), $(".show-hover").removeClass("show-hover"), mouseIsMove = !1
        }
    },
    createGroupTmp = function (a, b) {
        if (Math.abs(a.y - b.y) > 2 && Math.abs(a.x - b.x) > 2) {
            mouseIsMove = !0;
            var c, d, e, f, g = PN_PAGE.PUNNEL_EDIT.offset().top,
                h = PN_PAGE.PUNNEL_EDIT.offset().left,
                i = PN_PAGE.PUNNEL_EDIT.scrollTop();
            c = a.y < b.y ? a.y : b.y, d = a.x < b.x ? a.x : b.x, f = Math.abs(a.y - b.y), e = Math.abs(a.x - b.x), PN_PAGE.getElement('div[pn-type="group-tmp"]').remove(), PN_PAGE.PUNNEL_EDIT.append(htmlGroup), PN_PAGE.getElement("#GROUP_TMP").css({
                top: c - g + i + "px",
                left: d - h + "px",
                width: e + "px",
                height: f + "px"
            })
        }
    },
    dragForm = function (a, b, c) {
        if (a && b && "contact_form" == b.attr("pn-type")) {
            var d = b.attr("id"),
                e = PN_PAGE.getElement('.widget-element[pn-parent="' + d + '"]');
            if (e && e.length > 0) {
                var f = parseFloat(b.css("top")) + c.top,
                    g = parseFloat(b.css("left")) + c.left;
                e.css({
                    top: f + "px",
                    left: g + "px"
                });
                var h = PN_PAGE.getIndexElement(e.attr("id"));
                apiElement[h].media[deviceEdit].top = e.css("top"), apiElement[h].media[deviceEdit].left = e.css("left")
            }
        }
    },
    dragGroupTmp = function (a, b) {
        if (a && selectedItem && "GROUP_TMP" == selectedItem.attr("id")) {
            var c = a.position.top - a.originalPosition.top,
                d = a.position.left - a.originalPosition.left;
            if (groupElement && groupElement.length > 0)
                for (var e = 0; e < groupElement.length; e++) {
                    var f = PN_PAGE.getElement("#" + groupElement[e]);
                    f.css({
                        top: b[groupElement[e]].top + c + "px",
                        left: b[groupElement[e]].left + d + "px"
                    });
                    var g = PN_PAGE.getIndexElement(groupElement[e]);
                    apiElement[g].media[deviceEdit].top = f.css("top"), apiElement[g].media[deviceEdit].left = f.css("left")
                }
        }
    },
    getElementSnap = function () {
        $(".screenS").removeClass("screenS");
        var a = $(".is-maincontent").find(".widget-element:visible, .widget-section:visible, .grid-1:visible, .ruler-widget.widget-snap:visible"),
            b = [];
        if (a && a.length > 0) {
            var c, d, e, f, g = ($(".iframe-content").scrollTop(), $(window).outerHeight());
            a.each(function () {
                if ($(this).offset().top + $(this).outerHeight() < 0 || $(this).offset().top > g);
                else {
                    $(this).hasClass("widget-section") ? (c = $(this).find(".container").eq(0).offset().left, d = $(this).find(".container").eq(0).outerWidth()) : (c = $(this).offset().left, d = $(this).outerWidth()), e = $(this).offset().top, f = $(this).outerHeight();
                    var a = $(this).attr("id");
                    $(this).addClass("screenS");
                    var h = {
                        id: a,
                        top: e,
                        left: c,
                        width: d,
                        height: f
                    };
                    $(this).addClass("screenS"), b.push(h)
                }
            })
        }
        return b
    },
    snapElement = function (a, b, c, d) {
        if (c.size.width < 100 || c.size.height < 100) return;
        if ((c.originalSize.width != c.size.width || c.originalSize.height != c.size.height) && a && a.parent()) {
            $(".diver-line-y").hide(), $(".diver-line-x").hide();
            var e, f, g, h, i, j, k = 5,
                l = a.offset().top,
                m = a.offset().left,
                n = a.outerWidth(),
                o = a.outerHeight(),
                p = "";
            k = "desktop" == deviceEdit ? 10 : 2;
            for (var q = b.length, r = 0; q > r; r++) {
                var s = !1;
                p = r, e = b[r].left + b[r].width / 2, f = b[r].top + b[r].height / 2, g = b[r].top, h = b[r].left, i = b[r].width, j = b[r].height, i > 1 || (i = 0), j > 1 || (j = 0), e = h + i / 2, f = g + j / 2;
                var t;
                if (t = $(".is-maincontent").find("#" + b[p].id), t && t.length > 0 && b[p].id != a.attr("id")) {
                    var u = a.find("#" + t.attr("id"));
                    if (u && u.length > 0 || groupElement.length > 0 && groupElement.indexOf(t.attr("id")) >= 0);
                    else {
                        var v = -1,
                            w = -1,
                            x = -1,
                            y = -1,
                            z = PN_PAGE.getIndexElement(a.attr("id"));
                        if (c.originalSize.width != c.size.width && (c.originalPosition.left != c.position.left ? (v = a.outerWidth(), Math.abs(m - (h + i)) <= k && (s = !0, v = m + n - h - i, x = h + i, $(".diver-line-x").css({
                            display: "block",
                            left: h + i - 1 + "px"
                        }).show()), Math.abs(m - h) <= k && (s = !0, v = m + n - h, x = h, $(".diver-line-x").css({
                            display: "block",
                            left: h + "px"
                        }).show())) : (Math.abs(m + n - h) <= k && (s = !0, v = Math.abs(h - m), $(".diver-line-x").css({
                            display: "block",
                            left: h - 1 + "px"
                        }).show()), Math.abs(m + n - (h + i)) <= k && (s = !0, v = h + i - m, $(".diver-line-x").css({
                            display: "block",
                            left: h + i - 1 + "px"
                        }).show()))), c.originalSize.height != c.size.height && (c.originalPosition.top != c.position.top ? (w = a.outerHeight(), Math.abs(l - (g + j)) <= k && (s = !0, w = l + o - g - j, y = g + j, $(".diver-line-y").css({
                            display: "block",
                            top: g + j - 1 + "px"
                        }).show()), Math.abs(l - g) <= k && (s = !0, w = l + o - g, y = g, $(".diver-line-y").css({
                            display: "block",
                            top: g - 1 + "px"
                        }).show())) : (Math.abs(l + o - g) <= k && (s = !0, w = g - l, $(".diver-line-y").css({
                            display: "block",
                            top: g - 1 + "px"
                        }).show()), Math.abs(l + o - (g + j)) <= k && (s = !0, w = g + j - l, $(".diver-line-y").css({
                            display: "block",
                            top: g + j - 1 + "px"
                        }).show()))), d && -1 != v && (w = v / c.originalSize.width * c.originalSize.height), d && -1 != w && (v = w / c.originalSize.height * c.originalSize.width), -1 != x && (a.offset({
                            left: x + "px"
                        }), apiElement[z].media[deviceEdit].left = a.css("left")), -1 != v && (a.css({
                            width: v + "px"
                        }), a.find(".widget-content").eq(0).css({
                            width: v + "px"
                        }), apiElement[z].media[deviceEdit].width = a.css("width"), $("#resizable-element").css({
                            width: a.css("width")
                        })), -1 != y && (a.offset({
                            top: y + "px"
                        }), apiElement[z].media[deviceEdit].top = a.css("top")), -1 != w && (a.css({
                            height: w + "px"
                        }), a.find(".widget-content").eq(0).css({
                            height: w + "px"
                        }), apiElement[z].media[deviceEdit].height = a.css("height"), $("#resizable-element").css({
                            height: a.css("height")
                        })), a.hasClass("widget-group") && (void 0 == a.attr("pn-group") || "undefined" == a.attr("pn-group")) || "" == a.attr("pn-group")) {
                            var A = new AddGroup;
                            A.resetGroup(groupElement, a)
                        }
                        $("#resizable-element").css({
                            top: a.offset().top + "px",
                            left: a.offset().left + "px"
                        })
                    }
                }
            }
        }
    },
    showIntanceXY = function (a, b, c, d) {
        var e = {
            top: a.offset().top,
            left: a.offset().left,
            width: a.outerWidth(),
            height: a.outerHeight()
        },
            f = {
                top: b.offset().top,
                left: b.offset().left,
                width: b.outerWidth(),
                height: b.outerHeight()
            },
            g = 0,
            h = 0;
        "top" == c ? (e.left + e.width < f.left && (g = Math.floor(f.left - e.width - e.left), $(".distance.distance-x").css({
            left: e.left + e.width + "px"
        })), e.left > f.left + f.width && (g = Math.floor(e.left - f.width - f.left), $(".distance.distance-x").css({
            left: f.left + f.width + "px"
        })), $(".distance.distance-x").css({
            width: g + "px",
            top: $(".diver-line-y").css("top")
        }).show(), g > 0 ? $(".distance.distance-x span").text(g) : ($(".distance.distance-x").hide(), $(".distance.distance-x span").text(""))) : (e.top + e.height < f.top && (h = Math.floor(f.top - e.top - e.height), $(".distance.distance-y").css({
            top: e.top + e.height + "px"
        })), e.top > f.top + f.height && (h = Math.floor(e.top - f.top - f.height), $(".distance.distance-y").css({
            top: f.top + f.height + "px"
        })), $(".distance.distance-y").css({
            height: h + "px",
            left: $(".diver-line-x").css("left")
        }).show(), h > 0 ? $(".distance.distance-y span").text(h) : ($(".distance.distance-y span").text(""), $(".distance.distance-y").hide()))
    },
    snapElementDrag = function (a, b, c) {
        if (a && a.length > 0) {
            PN_PAGE.getIndexElement(a.attr("id"));
            $(".diver-line-y").hide(), $(".diver-line-x").hide(), $(".distance.distance-y").hide(), $(".distance.distance-x").hide();
            var d = 5,
                e = a.offset().top,
                f = a.offset().left,
                g = a.outerWidth(),
                h = a.outerHeight(),
                i = f + g / 2,
                j = e + h / 2,
                k = {
                    top: 0,
                    left: 0,
                    width: 0,
                    height: 0,
                    xgiua: 0,
                    ygiua: 0
                };
            d = "desktop" == deviceEdit ? 5 : 2;
            for (var l = {}, m = b.length, n = 0; m > n; n++) {
                k.top = b[n].top, k.left = b[n].left, k.width = b[n].width, k.height = b[n].height, k.xgiua = b[n].left + b[n].width / 2, k.ygiua = b[n].top + b[n].height / 2;
                var o;
                if (o = $(".is-maincontent").find("#" + b[n].id), o && o.length > 0 && b[n].id != a.attr("id")) {
                    var p = a.find("#" + o.attr("id"));
                    if (p && p.length > 0 || groupElement.length > 0 && groupElement.indexOf(o.attr("id")) >= 0);
                    else {
                        var q = "";
                        Math.abs(e - k.top) <= d && (q = "top", $(".diver-line-y").css({
                            top: k.top + "px"
                        }).show(), a.offset({
                            top: k.top
                        })), Math.abs(e - (k.top + k.height)) <= d && (q = "top", $(".diver-line-y").css({
                            top: k.top + k.height + "px"
                        }).show(), a.offset({
                            top: k.top + k.height
                        })), Math.abs(e + h - (k.top + k.height)) <= d && (q = "top", $(".diver-line-y").css({
                            top: k.top + k.height + "px"
                        }).show(), a.offset({
                            top: k.top + k.height - h
                        })), Math.abs(e + h - k.top) <= d && (q = "top", $(".diver-line-y").css({
                            top: k.top + "px"
                        }).show(), a.offset({
                            top: k.top - h
                        })), Math.abs(j - k.ygiua) <= d && (q = "top", $(".diver-line-y").css({
                            top: k.ygiua + "px"
                        }).show(), a.offset({
                            top: k.ygiua - h / 2
                        })), Math.abs(f - k.left) <= d && (q = "left", $(".diver-line-x").css({
                            left: k.left + "px"
                        }).show(), a.offset({
                            left: k.left
                        })), Math.abs(f - (k.left + k.width)) <= d && (q = "left", $(".diver-line-x").css({
                            left: k.left + k.width + "px"
                        }).show(), a.offset({
                            left: k.left + k.width
                        })), Math.abs(f + g - (k.left + k.width)) <= d && (q = "left", $(".diver-line-x").css({
                            left: k.left + k.width + "px"
                        }).show(), a.offset({
                            left: k.left + k.width - g
                        })), Math.abs(f + g - k.left) <= d && (q = "left", $(".diver-line-x").css({
                            left: k.left + "px"
                        }).show(), a.offset({
                            left: k.left - g
                        })), Math.abs(i - k.xgiua) <= d && (q = "left", $(".diver-line-x").css({
                            left: k.xgiua + "px"
                        }).show(), a.offset({
                            left: k.xgiua - g / 2
                        })), $("#resizable-element").css({
                            top: a.offset().top + "px",
                            left: a.offset().left + "px"
                        }), c.position = {
                            top: a.offset().top,
                            left: a.offset().left
                        }, q.length > 0 && (l[q] = o)
                    }
                }
            }
            Object.keys(l).forEach(function (b) {
                showIntanceXY(a, l[b], b, "")
            }), dragGroupTmp(c, groupTMP),
                dragForm(c, a, formData)
        }
    },
    getPositionSection = function () {
        var a = void 0,
            b = "duoi",
            c = new AddToFrame;
        a = c.eleAdd(!1).parent();
        return {
            elementAdd: a,
            vtAdd: b
        }
    },
    getPositionSectionNew = function () {
        var a = void 0,
            b = "duoi",
            c = new AddToFrame;
        a = selectedItem;
        return {
            elementAdd: a,
            vtAdd: b
        }
    },
    addNewSectiondrag = function () {
        $('.aside-left li[language="section"] li[data-type="element"]').each(function () {
            $(this).draggable({
                destroy: !0
            })
        }), $('.aside-left li[language="section"] li[data-type="element"]').draggable({
            appendTo: "body",
            revert: !0,
            helper: "clone",
            start: function (a, b) { },
            stop: function (a, b) {
                addNewSourceSection(PN_PAGE.account.source)
            }
        })
    },
    calElementInSection = function () {
    },
    addNewSourceSection = function (a) {
        var b, c = $(".resizable-popup");
        if (c && c.length > 0 && "none" != c.css("display")) b = new AlertPnotify, b.createMessage("Không thêm section trắng vào popup!");
        else {
            var d = $("#punnel-editor .widget-section");
            if (typeAddNew == typeSection && d && d.length > 0) b = new AlertPnotify, b.createMessage("Template section chỉ có section trắng duy nhất!");
            else if (a) {
                var e;
                e = "string" == typeof a ? JSON.parse(a) : a;
                var f, g = getPositionSectionNew(),// getPositionSection(),
                    h = g.elementAdd,
                    i = g.vtAdd,
                    j = e.apiElement,
                    k = new OptionWiget,
                    l = new setHtmlLadi,
                    m = new setStyleElement;
                j = k.resetIdElement(j);
                for (var n = 0; n < j.length; n++) l.getTemplate(j[n], j[n].type_plugin, function () {
                    $(".widget-element").attr("href", ""), $(".widget-element .widget-content").attr("href", "")
                }), apiElement.push(j[n]);
                m.init(j, deviceEdit), f = PN_PAGE.getElement("#" + j[0].id), h && h.length > 0 && ("tren" == i ? void 0 == h || f.insertBefore(h) : f.insertAfter(h)), PN_PAGE.PUNNEL_EDIT.find(".selected").removeClass("selected"), selectedItem = f, selectedItem.addClass("selected"), selectedItem.show();
                var o = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[o].idTmpSec = "";
                var p = new ShowBoxResize;
                p.showBoxSection(selectedItem), k.sortWg(), PN_PAGE.getElement(".widget-section").css({
                    "border-bottom": "1px dashed rgba(6,21,40,1)"
                }), k.addElementUndo("new", selectedItem), k.addElementUndo("", selectedItem), k.fixsizeBody(), $(".aside-left li.active").removeClass("active"), $('.aside-left li[language="section"] ul').hide();
                var q = new WindowResize;
                q.init(), idplugin = "", dragPlugin = "", typePlugin = "", arrIdOnScreen = [], arrIdOnScreen = k.getIdElementOnScreen(), $(".screen-overlay.section_widget_plugin").hide(), showAddNewSection()
            } else errorHandler("No element is selected!")
        }
    },
    formData = {},
    hoverPositionData = {},
    groupTMP = [],
    resetPage = function () { };
resetPage.prototype.init = function () {
    function a(a) {
        var b = PN_PAGE.getIndexElement(a.attr("id")),
            c = apiElement[b].parent.split(" ")[0];
        c.startsWith("#") && (c = c.substr(1));
        var d = PN_PAGE.getIndexElement(c),
            e = parseInt(apiElement[d].media[deviceEdit].height);
        return e -= parseInt(apiElement[b].media[deviceEdit].height)
    }

    function b(b, c, d, e) {
        return "mobile" == deviceEdit && (0 > c || c > a(b)) ? !1 : !0
    }
    $(".wg-hover").removeClass("wg-hover"), arrElementSnape = getElementSnap();
    var c = new WindowResize,
        d = (new IframeClick, new ShowBoxResize),
        e = new AddGroup,
        f = new IframeClick,
        g = new OptionWiget,
        h = new AddToFrame;
    h.init(), c.init();
    var i = !1;
    $(".is-maincontent .iframe-content .widget-section").unbind("mouseover").mouseover(function () {
        $(".is-maincontent").hasClass("punnel-mobile") && (PN_PAGE.IDSECTION_HOVER = $(this).attr("id"), $(".reset-mobile").show())
    }),
        $("#resizable-element").unbind("contextmenu").contextmenu(function (a) {
        a.preventDefault(), pageMouseX = a.pageX, pageMouseY = a.pageY, "desktop" == deviceEdit && selectedItem && selectedItem.length > 0 && "item_form" != selectedItem.attr("pn-type") && $(".click-right").css({
            top: a.pageY + "px",
            left: a.pageX + "px"
        }).show()
        }),
        $("#resizable-element").unbind("click").click(function (a) {
        if (!i && "resizable-element" == $(a.target).attr("id")) {
            var b;
            b = selectedItem && selectedItem.length > 0 && !selectedItem.hasClass("important") && selectedItem.find(".widget-element") && selectedItem.find(".widget-element").length > 0 ? getElementClick(a.pageY, a.pageX, selectedItem) : getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT);
            var c = new OptionWiget;
            b && b.hasClass("widget-item-child") && "item_slider" == b.attr("pn-type") && (b = c.getParentElement(b)), f.addClassSelected(b), selectedItem && selectedItem.length > 0 && (settings(), selectedItem.hasClass("widget-section") || (PN_PAGE.getElement(".selected").removeClass("selected"), selectedItem.addClass("selected"), d.showBox(selectedItem)))
        }
        i = !1
        }),
        $("#resizable-element").unbind("mousewheel").on("mousewheel", function () {
        $("#resizable-element").hide(), PN_PAGE.getElement(".widget-group .widget-content").eq(0).css({
            outline: "0px"
        }), $(".click-right").hide(), e.removeGroupTmp()
    }),
        $("#resizable-element").each(function () {
            $(this).draggable({
                destroy: !0
            })
        }),
        PN_PAGE.valueSelected = {
            top: 0,
            left: 0
        },

        $('#resizable-element [pn-show="move_position"]').draggable({
            scroll: !1,
            start: function (a, b) {
                if (selectedItem && selectedItem.length > 0) {
                    dragPositionElementMinHeight = -1;
                    var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                    dragPositionListElement = [];
                    for (var d = apiElement[c].parent.substr(0, apiElement[c].parent.indexOf(" ")), e = 0; e < apiElement.length; e++)
                        if (apiElement[e].parent.substr(0, apiElement[e].parent.indexOf(" ")) == d)
                            if (parseInt(apiElement[e].media[deviceEdit].top) < parseInt(apiElement[c].media[deviceEdit].top)) {
                                var f = parseInt(apiElement[e].media[deviceEdit].top) + parseInt(apiElement[e].media[deviceEdit].height);
                                dragPositionElementMinHeight = f > dragPositionElementMinHeight ? f : dragPositionElementMinHeight
                            } else dragPositionListElement.push(apiElement[e]);
                    $(this).css({
                        position: "initial"
                    }), dragPositionElementTopLeft.left = b.position.left, dragPositionElementTopLeft.top = b.position.top
                }
            },
            drag: function (a, b) {
                if (selectedItem && selectedItem.length > 0) {
                    var c = -1 * (dragPositionElementTopLeft.top - b.position.top),
                        d = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                        e = apiElement[d].parent.substring(0, apiElement[d].parent.indexOf(" ")).substring(1),
                        f = parseInt($("#" + e).css("height")) + c;
                    f > dragPositionElementMinHeight && ($("#" + e).css({
                        height: f + "px"
                    }), apiElement[PN_PAGE.getIndexElement(e)].media[deviceEdit].height = $("#" + e).css("height"));
                    var g = $("#resizable-element").position().top + c;
                    $("#resizable-element").css({
                        top: g + "px"
                    });
                    for (var h = 0; h < dragPositionListElement.length; h++) {
                        var i = $("#" + dragPositionListElement[h].id),
                            j = parseInt(i.css("top")) + c;
                        i.css({
                            top: j + "px"
                        })
                    }
                    dragPositionElementTopLeft.left = b.position.left, dragPositionElementTopLeft.top = b.position.top
                }
            },
            stop: function (a, b) {
                for (var c = 0; c < dragPositionListElement.length; c++) {
                    var d = $("#" + dragPositionListElement[c].id);
                    dragPositionListElement[c].media[deviceEdit].top = d.css("top")
                }
                $(this).css({
                    position: "relative",
                    top: "auto",
                    left: "auto"
                })
            }
        }),
        $("#box-hover-element").unbind("click").click(function (a) {
            if ("true" != draggHover) {
                var b = $(this).attr("id-hover");
                if (b && b.length > 0) {
                    var c = $(".editor-text").attr("pn-id");
                    c && c.length > 0 && (PN_PAGE.showElementEditorText(), $("#" + c).css({
                        visibility: "visible"
                    }));
                    var e;
                    var grp = selectedItem? selectedItem.attr("pn-group") || '' : '';
                    if (grp && grp.length > 0 && grp == b) {
                        e = $("#" + b) && $("#" + b).length > 0 && !$("#" + b).hasClass("important") && $("#" + b).find(".widget-element") && $("#" + b).find(".widget-element").length > 0 ? getElementClick(a.pageY, a.pageX, $("#" + b)) : getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT);
                    }
                    else e = $("#" + b);
                    var g = new OptionWiget;
                    e && e.hasClass("widget-item-child") && "item_slider" == e.attr("pn-type") && (e = g.getParentElement(e)), f.addClassSelected(e), selectedItem && selectedItem.length > 0 && (settings(), selectedItem.hasClass("widget-section") || (PN_PAGE.getElement(".selected").removeClass("selected"), selectedItem.addClass("selected"), d.showBox(selectedItem)))
                }
                $(this).hide().attr("id-hover", "")
            }
        }),
        //$("#box-hover-element").unbind("mousemove").mousemove(function (a) {
        //    //var hrr = $(this).attr("id-hover");
        //    //var grp = selectedItem.attr("pn-group");
        //    //if (!(grp && grp.length > 0 && grp == hrr)) {
        //    //    return;
        //    //}

        //    var b;
        //    b = getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT);
        //    var c = new OptionWiget;
        //    b && b.hasClass("widget-item-child") && "item_slider" == b.attr("pn-type") && (b = c.getParentElement(c.getParentElement(b))), b && b.length > 0 && (settings(), b.hasClass("widget-section") || "false" != draggHover || b.hasClass("selected") || d.showBoxHover(b))
        //}),
        $("#resizable-element").unbind("mousemove").mousemove(function (a) {
            if ($("#resizable-element").is('.ui-resizable-resizing') == true) return;
            var b;
            b = getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT);
            var c = new OptionWiget;
            b && b.hasClass("widget-item-child") && "item_slider" == b.attr("pn-type") && (b = c.getParentElement(c.getParentElement(b))), b && b.length > 0 && (settings(), b.hasClass("widget-section") || "false" != draggHover || b.hasClass("selected") || d.showBoxHover(b))
        }),
        $("#box-hover-element").each(function () {
            $(this).draggable({
                destroy: !0
            })
        });

    var j;
    $("#box-hover-element").draggable({
        scroll: !1,
        start: function () {
            j = null;
            if (void 0 != $("#box-hover-element").attr("id-hover") && $("#box-hover-element").attr("id-hover").length > 0 && (j = $("#" + $("#box-hover-element").attr("id-hover"))), selectedItem = j, selectedItem && selectedItem.length > 0 && "GROUP_TMP" == selectedItem.attr("id") && void 0 != $("#box-hover-element").attr("id-hover") && $("#box-hover-element").attr("id-hover").length > 0) {
                var a1 = new ShowBoxResize,
                    b1 = $("#" + $("#box-hover-element").attr("id-hover"));
                a1.showBox(b1), a1.showBoxHover(b1)
            }

            if ("none" != $(".resizable-popup").css("display")) {
                $(".screenS").removeClass("screenS");
                var a = $("#" + $(".resizable-popup").attr("pn-id-popup")).find(".widget-element");
                a && a.length > 0 && a.each(function () {
                    var a11 = {
                        id: $(this).attr("id"),
                        top: $(this).offset().top,
                        left: $(this).offset().left,
                        width: $(this).outerWidth(),
                        height: $(this).outerHeight()
                    };
                    arrElementSnape.push(a11), $(this).addClass("screenS")
                })
            } else arrElementSnape = getElementSnap();
            if (j && j.length && "contact_form" == j.attr("pn-type")) {
                var b = PN_PAGE.getElement('.widget-element[pn-parent="' + j.attr("id") + '"]');
                formData.top = parseFloat(b.css("top")) - parseFloat(j.css("top")), formData.left = parseFloat(b.css("left")) - parseFloat(j.css("left"))
            }
            j && j.length > 0 && (hoverPositionData.top = j.css("top"), hoverPositionData.left = j.css("left")), $("#GROUP_TMP").hide(), box_hover_is_drag_start = !0
        },
        drag: function (a, b) {
            if (box_hover_is_drag_start) {
                i = !0, draggHover = "true", $(".diver-line-y").hide(), $(".diver-line-x").hide();
                var c = !0;
                if (c = "desktop" == deviceEdit ? !0 : $(this).offset().left > $(".iframe-content").offset().left && $(this).offset().left + $(this).outerWidth() < $(".iframe-content").offset().left + $(".iframe-content").outerWidth() ? !0 : !0, !(j && j.length > 0 && c)) return !0;
                var d = PN_PAGE.getIndexElement(j.attr("id")),
                    e = b.position.top,
                    h = b.position.left;

                j.offset({
                    top: e,
                    left: h
                }), apiElement[d].media[deviceEdit].top = j.css("top"), apiElement[d].media[deviceEdit].left = j.css("left"), addElementToParent(j), snapElementDrag(j, arrElementSnape, b), $("#resizable-element").hide()
            }
        },
        stop: function (a, b) {
            box_hover_is_drag_start = !1;
            a.stopPropagation(),
                $(".diver-line-y").hide(), $(".diver-line-x").hide(), draggHover = "false", $(".distance.distance-y").hide(), $(".distance.distance-x").hide(), f.addClassSelected(j),
                selectedItem && selectedItem.length > 0 && (settings(), selectedItem.hasClass("widget-section") || (PN_PAGE.getElement(".selected").removeClass("selected"), selectedItem.addClass("selected"),
                    $(this).hide().attr("id-hover", ""),
                    h = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                    apiElement[h].media[deviceEdit].top = selectedItem.css("top"),
                    apiElement[h].media[deviceEdit].left = selectedItem.css("left")
                    , d.showBox(selectedItem)
                ))
        }
    });

        var sj;
        $("#resizable-element").draggable({
            cancel: "#resizable-element .edit-element, #resizable-element .w-h-el",
            scroll: !1,
            start: function () {
                $("#box-hover-element").hide();
                $("#resizable-element .edit-element").hide();
                if ("none" != $(".resizable-popup").css("display")) {
                    $(".screenS").removeClass("screenS");
                    var a = $("#" + $(".resizable-popup").attr("pn-id-popup")).find(".widget-element");
                    a && a.length > 0 && a.each(function () {
                        var a = {
                            id: $(this).attr("id"),
                            top: $(this).offset().top,
                            left: $(this).offset().left,
                            width: $(this).outerWidth(),
                            height: $(this).outerHeight()
                        };
                        arrElementSnape.push(a), $(this).addClass("screenS")
                    })
                } else arrElementSnape = getElementSnap();
                if (selectedItem || (selectedItem = PN_PAGE.getElement(".widget-element.selected")), i = !1, selectedItem && selectedItem.length && "contact_form" == selectedItem.attr("pn-type")) {
                    var b = PN_PAGE.getElement('.widget-element[pn-parent="' + selectedItem.attr("id") + '"]');
                    formData.top = parseFloat(b.css("top")) - parseFloat(selectedItem.css("top")), formData.left = parseFloat(b.css("left")) - parseFloat(selectedItem.css("left"))
                }
                //if (selectedItem && selectedItem.length && "GROUP_TMP" == selectedItem.attr("id") && (groupElement = groupElementTMP, groupElement && groupElement.length > 0))
                //    for (var c = 0; c < groupElement.length; c++) {
                //        var d = PN_PAGE.getElement("#" + groupElement[c]),
                //            e = {
                //                id: groupElement[c],
                //                top: parseFloat(d.css("top")),
                //                left: parseFloat(d.css("left"))
                //            };
                //        groupTMP[groupElement[c]] = e
                //    }

                if (selectedItem && selectedItem.length && "GROUP_TMP" == selectedItem.attr("id") && groupElement && groupElement.length > 0)
                    for (var c = 0; c < groupElement.length; c++) {
                        var d = PN_PAGE.getElement("#" + groupElement[c]),
                            e = {
                                id: groupElement[c],
                                top: parseFloat(d.css("top")),
                                left: parseFloat(d.css("left"))
                            };
                        groupTMP[groupElement[c]] = e
                    }

                selectedItem && selectedItem.attr("pn-fixed") && selectedItem.find(".widget-content").eq(0).css({
                    position: "",
                    top: "",
                    left: "",
                    bottom: "",
                    height: ""
                }), selectedItem && selectedItem.length > 0 && (PN_PAGE.valueSelected.top = selectedItem.css("top"), PN_PAGE.valueSelected.left = selectedItem.css("left"), selectedItem.addClass("zindex_max"), selectedItem.parents('[pn-lang="CAROUSEL"]').length > 0 && selectedItem.parents('[pn-lang="CAROUSEL"]').addClass("overflow-visible")), $("#box-hover-element").hide(), resizable_is_drag_start = !0, sj = selectedItem
            },
            drag: function (a, b) {
                if (resizable_is_drag_start) {
                    i = !0, $(".diver-line-y").hide(), $(".diver-line-x").hide();
                    var c = !0;
                    if (c = "desktop" == deviceEdit ? !0 : $(this).offset().left > $(".iframe-content").offset().left && $(this).offset().left + $(this).outerWidth() < $(".iframe-content").offset().left + $(".iframe-content").outerWidth() ? !0 : !0, !(sj && sj.length > 0 && c)) return !0;
                    if ("item_slider" == sj.attr("pn-type")) return !1;
                    var d = PN_PAGE.getIndexElement(sj.attr("id")),
                        e = b.position.top - b.originalPosition.top + parseFloat(PN_PAGE.valueSelected.top),
                        g = b.position.left - b.originalPosition.left + parseFloat(PN_PAGE.valueSelected.left);
                    if (sj.css({
                        top: e + "px",
                        left: g + "px"
                    }), apiElement[d].media[deviceEdit].top = sj.css("top"), apiElement[d].media[deviceEdit].left = sj.css("left"), addElementToParent(sj), snapElementDrag(sj, arrElementSnape, b), $(this).offset().left + $(this).outerWidth() > $(".iframe-content").offset().left + $(".iframe-content").outerWidth()) {
                        var h = $(this).offset().left + $(this).outerWidth() - $(".iframe-content").offset().left - $(".iframe-content").outerWidth();
                        $("#resizable-element .edit-element").css({
                            right: h + "px"
                        })
                    } else $("#resizable-element .edit-element").css({
                        right: "-5px"
                    })
                }
        },
        stop: function (a, b) {
            resizable_is_drag_start = !1;
            var co = new OptionWiget;
            a.stopPropagation(),
                $(".diver-line-y").hide(), $(".diver-line-x").hide(), draggHover = "false", $(".distance.distance-y").hide(), $(".distance.distance-x").hide(), f.addClassSelected(j),
                sj && sj.length > 0 && (settings(), sj.hasClass("widget-section") || (PN_PAGE.getElement(".selected").removeClass("selected"), sj.addClass("selected"),
                    $(this).hide().attr("id-hover", ""),
                h = PN_PAGE.getIndexElement(sj.attr("id")),
                apiElement[h].media[deviceEdit].top = sj.css("top"),
                apiElement[h].media[deviceEdit].left = sj.css("left")
                , d.showBox(sj),
                co.CalulatorSizeGroup(sj)
                ))
        }
            //stop: function (a, b) {
            //    resizable_is_drag_start = !1, $(".diver-line-y").hide(), $(".diver-line-x").hide(), selectedItem && selectedItem.attr("pn-fixed") && setValueFixed(selectedItem.attr("pn-fixed")), $(".distance.distance-y").hide(), $(".distance.distance-x").hide();
            //    var c = new OptionWiget;
            //    c.CalulatorSizeGroup(selectedItem), $(".edit-element").show(), selectedItem && selectedItem.length > 0 && selectedItem.removeClass("zindex_max"), selectedItem.parents('[pn-lang="CAROUSEL"]').length > 0 && selectedItem.parents('[pn-lang="CAROUSEL"]').removeClass("overflow-visible"), selectedItem && "GROUP_TMP" == selectedItem.attr("id") && calElementInSection()
            //}
        }), 
        $(".widget-section").unbind("dblclick").dblclick(function (a) {
        var b = $(a.target);
        if (1 != preview) {
            dbClickBox = !0, groupElement = [];
            new IframeClick;
            pageMouseX = a.pageX, pageMouseY = a.pageY;
            var c = new OptionWiget,
                d = c.getParentElement(b);
            d && d.length > 0 && selectedItem && selectedTMP && selectedItem.attr("id") == selectedTMP.attr("id") && "desktop" == deviceEdit && (c.setPositionSetting(), c.showPropertiesElement("edit"), window.angularControllerDbClickElement(a))
        }
        }),
        PN_PAGE.getElement("a").click(function (a) {
        a.preventDefault()
        }),
        PN_PAGE.PUNNEL_EDIT.unbind("mousedown").on("mousedown", function (a) {
        var b = $(".editor-text").attr("pn-id");
        b && b.length > 0 && "mobile" != deviceEdit && (PN_PAGE.showElementEditorText(), $("#" + b).css({
            visibility: "visible"
        })), $(".widget-element.parent-droped").removeClass("parent-droped"), $(".click-right").hide(), a.preventDefault(), $("#resizable-element").hide(),
            pageMouseX = a.pageX, pageMouseY = a.pageY, nodestart.x = a.pageX, nodestart.y = a.pageY, nodeend.x = a.pageX, nodeend.y = a.pageY;
        var c = $(a.target);
        dbClickBox = !1, numMouseMove = 0, PN_PAGE.getElement(".widget-group > .widget-content").css({
            outline: "0"
        }), $(".box_right_mouse").hide(), selectedTMP = selectedItem;
        var d = void 0,
            e = new IframeClick;
        if (d = c.hasClass("widget-section") || c.hasClass("widget-element") ? $(a.target) : c.hasClass("iframe-content") ? getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT) : g.getParentElement(c), d && (d.attr("pn-group") || g.getParentElement(d) && g.getParentElement(d).hasClass("widget-element")))
            if (d.attr("pn-group")) d = getObjSelect(d);
            else {
                var f = g.getParentElement(d);
                f && "contact_form" != f.attr("pn-type") ? f.offset().top <= a.pageY && f.offset().top + f.outerHeight() >= a.pageY && f.offset().left <= a.pageX && f.offset().left + f.outerWidth() >= a.pageX && (d = g.getParentElement(d)) : d = getObjSelect(d)
            } d && d.hasClass("important") && (d = g.getParentSection(d)), d && d.hasClass("widget-item-child") && "item_slider" == d.attr("pn-type") && (d = g.getParentElement(d)), e.addClassSelected(d), mouseIsDown = !0, settings(), "none" == $(".resizable-popup").css("display") && g.showHideElementDefault(), mouseHandler("down", a)
        }),
        PN_PAGE.PUNNEL_EDIT.unbind("mousemove").mousemove(function (a) { }),
        $(".resizable-popup .resize-content").unbind("mousedown").mousedown(function (a) {
        var b = $(".editor-text").attr("pn-id");
        if (b && b.length > 0 && (PN_PAGE.showElementEditorText(), $("#" + b).show(), $("#" + b).css({
            visibility: "visible"
        })), $(".widget-element.parent-droped").removeClass("parent-droped"), !selectedItem && "none" != $(".resizable-popup").css("display")) {
            var c = $(".resizable-popup").attr("pn-id-popup");
            c && c.length > 0 && (selectedItem = $("#punnel-editor #" + c), selectedItem.addClass("selected"))
        }
        a.preventDefault(), $("#resizable-element").hide(), pageMouseX = a.pageX, pageMouseY = a.pageY, nodestart.x = a.pageX, nodestart.y = a.pageY, nodeend.x = a.pageX, nodeend.y = a.pageY;
        $(a.target);
        $(".ngdialog.ng-scope").remove(), dbClickBox = !1, numMouseMove = 0, PN_PAGE.getElement(".widget-group > .widget-content").css({
            outline: "0"
        }), $(".box_right_mouse").hide(), selectedTMP = selectedItem;
        var e = getElementClick(a.pageY, a.pageX, selectedItem);
        if (e && (e.attr("pn-group") || g.getParentElement(e) && g.getParentElement(e).hasClass("widget-element")) && "desktop" == deviceEdit)
            if (e.attr("pn-group")) e = getObjSelect(e);
            else {
                var f = g.getParentElement(e);
                e = f && "contact_form" != f.attr("pn-type") ? g.getParentElement(e) : getObjSelect(e)
            } var h = new IframeClick;
        e && e.hasClass("widget-item-child") && "item_slider" == e.attr("pn-type") && (e = g.getParentElement(e)), h.addClassSelected(e), selectedItem && selectedItem.length > 0 && (selectedItem.hasClass("widget-section") || d.showBox(selectedItem)), mouseIsDown = !0, "none" == $(".resizable-popup").css("display") && g.showHideElementDefault(), settings(), mouseHandler("down", a)
        }),
        $(".resizable-popup").unbind("mousemove").mousemove(function (a) {
        if (mouseIsDown) {
            mouseHandler("move", a);
        }
        //else {
        //    var b;
        //    if (b = selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-section") ? getElementClick(a.pageY, a.pageX, selectedItem) : getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT), b && (b.attr("pn-group") || g.getParentElement(b) && g.getParentElement(b).hasClass("widget-element")))
        //        if (b.attr("pn-group")) b = getObjSelect(b);
        //        else {
        //            var c = g.getParentElement(b);
        //            c && "contact_form" != c.attr("pn-type") ? c.offset().top <= a.pageY && c.offset().top + c.outerHeight() >= a.pageY && c.offset().left <= a.pageX && c.offset().left + c.outerWidth() >= a.pageX && (b = g.getParentElement(b)) : b = getObjSelect(b)
        //        } b && b.hasClass("important") && (b = g.getParentSection(b)), b && b.hasClass("widget-item-child") && "item_slider" == b.attr("pn-type") && (b = g.getParentElement(b)), b && b.hasClass("widget-section") || b && "false" == draggHover && !b.hasClass("selected") && d.showBoxHover(b)
        //}
        }),
        $(".grid-system").unbind("mousedown").mousedown(function (a) {
        $(".widget-element.parent-droped").removeClass("parent-droped");
        var b = $(".editor-text").attr("pn-id");
        b && b.length > 0 && (PN_PAGE.showElementEditorText(), $("#" + b).css({
            visibility: "visible"
        })), a.preventDefault(), $("#resizable-element").hide(), pageMouseX = a.pageX, pageMouseY = a.pageY, nodestart.x = a.pageX, nodestart.y = a.pageY, nodeend.x = a.pageX, nodeend.y = a.pageY;
        $(a.target);
        dbClickBox = !1, numMouseMove = 0, PN_PAGE.getElement(".widget-group > .widget-content").css({
            outline: "0"
        }), $(".box_right_mouse").hide(), selectedTMP = selectedItem;
        var c = getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT);
        if (c.hasClass("widget-section") || c.hasClass("widget-element") || (c = g.getParentElement(c)), c && (c.attr("pn-group") || g.getParentElement(c) && g.getParentElement(c).hasClass("widget-element")))
            if (c.attr("pn-group")) c = getObjSelect(c);
            else {
                var e = g.getParentElement(c);
                e && "contact_form" != e.attr("pn-type") ? e.offset().top <= a.pageY && e.offset().top + e.outerHeight() >= a.pageY && e.offset().left <= a.pageX && e.offset().left + e.outerWidth() >= a.pageX && (c = g.getParentElement(c)) : c = getObjSelect(c)
            } var f = new IframeClick;
        c && c.hasClass("widget-item-child") && "item_slider" == c.attr("pn-type") && (c = g.getParentElement(c)), f.addClassSelected(c), selectedItem && selectedItem.length > 0 && (selectedItem.hasClass("widget-section") ? d.showBoxSection(selectedItem) : d.showBox(selectedItem)), mouseIsDown = !0, "none" == $(".resizable-popup").css("display") && g.showHideElementDefault(), settings(), mouseHandler("down", a)
        }),
        $(".grid-system").unbind("mousemove").mousemove(function (a) {
        mouseHandler("move", a)
        }),
        $(".grid-system").unbind("click").click(function (a) {
        if (a.preventDefault(), "resizable-element" == $(a.target).attr("id")) {
            var b = getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT);
            if (b.hasClass("widget-section") || b.hasClass("widget-element") || (b = g.getParentElement(target)), b && (b.attr("pn-group") || g.getParentElement(b) && g.getParentElement(b).hasClass("widget-element")))
                if (b.attr("pn-group")) b = getObjSelect(b);
                else {
                    var c = g.getParentElement(b);
                    b = c && "contact_form" != c.attr("pn-type") ? g.getParentElement(b) : getObjSelect(b)
                } b && b.hasClass("widget-item-child") && "item_slider" == b.attr("pn-type") && (b = g.getParentElement(b)), f.addClassSelected(b), selectedItem && selectedItem.length > 0 && (settings(), selectedItem.hasClass("widget-section") || d.showBox(selectedItem))
        }
        }),
        $("#resizable-section .resize-content").unbind("mousedown").mousedown(function (a) {
        $(".widget-element.parent-droped").removeClass("parent-droped");
        var b = $(".editor-text").attr("pn-id");
        if (b && b.length > 0) {
            $("#" + b);
            PN_PAGE.showElementEditorText(), $("#" + b).css({
                visibility: "visible"
            })
        }
        a.preventDefault(), $("#resizable-element").hide();
        $(a.target);
        dbClickBox = !1, numMouseMove = 0, PN_PAGE.getElement(".widget-group > .widget-content").css({
            outline: "0"
        }), $(".box_right_mouse").hide(), selectedTMP = selectedItem;
        var c;
        if (c = selectedItem && selectedItem.hasClass("widget-section") ? getElementClick(a.pageY, a.pageX, selectedItem) : getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT), c && (c.attr("pn-group") || g.getParentElement(c) && g.getParentElement(c).hasClass("widget-element")))
            if (c.attr("pn-group")) c = getObjSelect(c);
            else {
                var e = g.getParentElement(c);
                e && "contact_form" != e.attr("pn-type") ? e.offset().top <= a.pageY && e.offset().top + e.outerHeight() >= a.pageY && e.offset().left <= a.pageX && e.offset().left + e.outerWidth() >= a.pageX && (c = g.getParentElement(c)) : c = getObjSelect(c)
            } c && c.hasClass("important") && (c = g.getParentSection(c)), c && c.hasClass("widget-item-child") && "item_slider" == c.attr("pn-type") && (c = g.getParentElement(c));
        var f = new IframeClick;
        f.addClassSelected(c), selectedItem && selectedItem.length > 0 && (selectedItem.hasClass("widget-section") || d.showBox(selectedItem)), mouseIsDown = !0, "none" == $(".resizable-popup").css("display") && g.showHideElementDefault(), settings(), mouseHandler("down", a)
        }),
        $("#resizable-section .resize-content").unbind("mousemove").mousemove(function (a) {
        if (mouseIsDown) {
            if ($("#resizable-section").hasClass('ui-resizable-resizing') == true) return;
            mouseHandler("move", a);
        }
        //else {
        //    var b;
        //    b = selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-section") ? getElementClick(a.pageY, a.pageX, selectedItem) : getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT);
        //    var c = g.getParentElement(b);
        //    if (b && (b.attr("pn-group") || g.getParentElement(b) && g.getParentElement(b).hasClass("widget-element")))
        //        if (b.attr("pn-group")) b = getObjSelect(b);
        //        else {
        //            var e = g.getParentElement(b);
        //            e && "contact_form" != e.attr("pn-type") ? e.offset().top <= a.pageY && e.offset().top + e.outerHeight() >= a.pageY && e.offset().left <= a.pageX && e.offset().left + e.outerWidth() >= a.pageX && (b = c) : b = getObjSelect(b)
        //        } b && b.hasClass("important") && (b = g.getParentSection(b)), b && b.hasClass("widget-item-child") && "item_slider" == b.attr("pn-type") && (b = c), b.hasClass("widget-section") || "false" != draggHover || b.hasClass("selected") || d.showBoxHover(b)
        //}
        }),
        
        $("#resizable-element").resize(function (e) {
            $("#box-hover-element").hide();
        }),
        $("#resizable-section").resize(function (e) {
            $(".add-section").hide();
        }),
        $("#resizable-section").unbind("mousewheel").bind("mousewheel", function () {
             $("#resizable-section").hide(),
                //$("#resizable-element").hide(),
                PN_PAGE.getElement(".widget-group .widget-content").eq(0).css({
                    outline: "0px"
                })
        }),
        $("#resizable-section").unbind("click").bind("click", function (a) {
            var b = getElementClick(a.pageY, a.pageX, selectedItem);
            if (b && b.length > 0) {
                if (b && (b.attr("pn-group") || g.getParentElement(b) && g.getParentElement(b).hasClass("widget-element")))
                    if (b.attr("pn-group")) b = getObjSelect(b);
                    else {
                        var c = g.getParentElement(b);
                        b = c && "contact_form" != c.attr("pn-type") ? g.getParentElement(b) : getObjSelect(b)
                    } b && b.hasClass("important") && (b = g.getParentSection(b)), b && b.hasClass("widget-item-child") && "item_slider" == b.attr("pn-type") && (b = g.getParentElement(b)), f.addClassSelected(b), selectedItem && selectedItem.length > 0 && (settings(), selectedItem.hasClass("widget-section") || d.showBox(selectedItem))
            }
        }),
        $(".is-maincontent").unbind("click").click(function (a) {
        if ($(this).hasClass("punnel-mobile")) {
            var ele = getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT);
            if (ele.hasClass("widget-element") == false) $("#resizable-element").hide();
                //var b = $("#punnel-editor");
                //a.pageX > 80 && (a.pageX < b.offset().left || a.pageX > b.offset().left + b.outerWidth()) && $("#resizable-element").hide()
            }
        }),
        addNewSectiondrag(),

        $(window).unbind("mousemove").mousemove(function (a) {
        var isEditingText = $(".editor-text").is(":visible"); 
        var isDropDown = $(".dropdown-menu").is(":visible");
        var isPopup = $('.sweet-overlay').is(":visible");
        var isHoverEditElement = $('.edit-element:hover').length>0;// $('.edit-element').filter(":hover");
        if (isDropDown == true || isHoverEditElement== true) {
            $("#box-hover-element").hide();
        }
            if (isEditingText == true || isHoverEditElement == true || isDropDown == true || isPopup == true || box_hover_is_drag_start==true || resizable_is_drag_start==true || $("#resizable-section").hasClass('ui-resizable-resizing') == true || $('body').hasClass('md-dialog-is-showing')==true) {
                return;
            }
            var b;
            b = getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT);
            if (b == undefined || b == null) return;
            if (b && (b.hasClass("widget-element") == false || b.attr("id") == "GROUP_TMP") || b.is(":visible")==false) {
                return;
            }
            var hrr = b.attr('pn-group') || '0';
            var grp = selectedItem? selectedItem.attr("pn-group") || '1' : '1', isHoverInGroup = (grp == hrr);
            var CSNumber = new OptionWiget;
            if (b && (b.hasClass("widget-item-child") && "item_slider" == b.attr("pn-type"))) {
                b = CSNumber.getParentElement(CSNumber.getParentElement(b));
            } else if (b && b.hasClass("widget-item-child")) {
                b = CSNumber.getParentElement(b);
            } else if (b && b.closest(".widget-group").length > 0 && isHoverInGroup == false) {
                b = b.closest(".widget-group");
            }

        if (b && b.length > 0) {
                settings();
                if (!(b.hasClass("widget-section") || "false" != draggHover || b.hasClass("selected"))) {
                    d.showBoxHover(b);
                }
            }
            }),
        //    $(window).unbind("mousemove").mousemove(function (a) {
        //    if ("none" != $(".resizable-popup").css("display") && mouseHandler("move", event), !box_hover_is_drag_start && !resizable_is_drag_start) {
        //        var c;
        //        c = getElementClick(a.pageY, a.pageX, PN_PAGE.PUNNEL_EDIT);
        //        var d = new OptionWiget;
        //        if (c && c.hasClass("widget-item-child") && "item_slider" == c.attr("lp-type")) {
        //            c = d.getParentElement(d.getParentElement(c));
        //        }
        //        if (c && c.length > 0) {
        //            settings();
        //            if (!(c.hasClass("widget-section") || "false" != draggHover || c.hasClass("selected"))) {
        //                b.showBoxHover(c);
        //            }
        //        }
        //    }
        //})

        $(window).unbind("mouseup").mouseup(function (a) {
            nodeend.x = a.pageX;
            nodeend.y = a.pageY;
            pageMouseY = a.pageY;
            pageMouseX = a.pageX;
            if (!(selectedItem && "GROUP_TMP" == selectedItem.attr("id"))) {
                if (a.pageY > 47) {
                    mouseHandler("up", a);
                }
            }
            numMouseMove = 0;
            if (selectedItem && selectedItem.hasClass("widget-element")) {
                d.showBox(selectedItem);
            } else {
                if (selectedItem && selectedItem.hasClass("widget-section")) {
                    d.showBoxSection(selectedItem);
                    if (deviceEdit == "mobile") $(".add-section").hide();
                }
            }
        }),
        $(".iframe-content").unbind("scroll").scroll(function () {
            if ($("#resizable-section").hasClass('ui-resizable-resizing') == true) return;
               $("#resizable-section").hide();
                if ($(".click-right").hide(),
                    $("#box-hover-element").hide(), e.removeGroupTmp(), PN_PAGE.showElementEditorText(),
                    //$(".horizontal-guide-container").scrollTop(100),
                    "none" != $(".resizable-popup").css("display")) {
                    var a = $("#" + $(".resizable-popup").attr("pn-id-popup"));
                    a && a.length > 0 && $(".resizable-popup").css({
                        top: a.find(".container").eq(0).offset().top + "px"
                    })
                }
            if (selectedItem && selectedItem.length > 0 && "group-tmp" != selectedItem.attr("pn-type")) {
                var b = new ShowBoxResize;
                if (selectedItem.hasClass("widget-element") == true) {
                    b.changeTop(selectedItem)
                    //b.showBox(selectedItem)
                }
                //else b.changeTopSection(selectedItem);
                //selectedItem.hasClass("widget-element") ? b.showBox(selectedItem) : b.showBoxSection(selectedItem)
            } else {
                $("#resizable-element").hide()
            }
        }),
        //$(".iframe-content").scrollStopped(function (a) {
        //    //if (selectedItem && selectedItem.length > 0 && "group-tmp" != selectedItem.attr("pn-type")) {
        //    //    var b = new ShowBoxResize;
        //    //    //selectedItem.hasClass("widget-element") ? b.showBox(selectedItem) : b.showBoxSection(selectedItem)
        //    //}
        //    arrElementSnape = getElementSnap()
        //}),
        $(document).unbind("scroll").scroll(function () {
            void 0 != h && (h = clearTimeout(h), h = null)
            $(".resizable-popup").hide(),
            $("#box-hover-element").hide();
        if (selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element") == true) {
            //var b = new ShowBoxResize;
            //b.showBox(selectedItem)
        } else {
            $("#resizable-element").hide()
        }
        }),
        $(document).scrollStopped(function (a) {
            if ($("#resizable-element").css("display") == "block") return;
        if (void 0 != h && (h = clearTimeout(h)), selectedItem && selectedItem.length > 0 && "group-tmp" != selectedItem.attr("pn-type")) {
                var b = new ShowBoxResize;
                selectedItem.hasClass("widget-element") ? b.showBox(selectedItem) : b.showBoxSection(selectedItem)
            }
            arrElementSnape = getElementSnap()
        }),
        $(".resizable-popup").unbind("scroll").scroll(function () {
        $(".iframe-content").trigger("scroll"),
            $("#box-hover-element").hide();          
        }),
        ladiEditorText(),
        $(document).unbind("mousedown").mousedown(function (a) {
        var id = a.target.id;
        var isOutEditor = $(a.target).parents('#punnel-editor').length == 0;
        if (id != 'box-hover-element' && isOutEditor && $(a.target).hasClass("widget-element") == false && $(a.target).hasClass("widget-section") == false) {
                $("#box-hover-element").hide()
            }
        }),
        $("#punnel-editor .widget-section a").unbind("mousedown").mousedown(function (a) {
            a.preventDefault()
        }),
        $("#punnel-editor .widget-section .widget-element").unbind("mousedown").mousedown(function (a) {
            a.preventDefault()
        }),
        $(".horizontal-line").appendTo($(".iframe-content")), arrElementSnape = getElementSnap()
};