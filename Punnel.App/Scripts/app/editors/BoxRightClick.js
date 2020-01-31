var BoxRightClick = function () { };
BoxRightClick.prototype.init = function () { },
BoxRightClick.prototype.boxClick = function (a) {
    a.hasClass("widget-group") && "GROUP_TMP" == a.attr("id") ? ($("#RIGHT_MOUSE ul li").show(), $("#RIGHT_MOUSE ul .moveTop").hide(), $("#RIGHT_MOUSE ul .moveBot").hide(), $("#RIGHT_MOUSE ul li.clone").hide(), $("#RIGHT_MOUSE ul .ungroup").hide(), $("#RIGHT_MOUSE ul .cancelgroup").hide()) : ($("#RIGHT_MOUSE ul li").show(), a.hasClass("widget-group") ? $("#RIGHT_MOUSE ul .group").hide() : ($("#RIGHT_MOUSE ul .group").hide(), $("#RIGHT_MOUSE ul .ungroup").hide(), $("#RIGHT_MOUSE ul .cancelgroup").hide()));
    var b = new TreeWidget,
        c = this;
    $("#RIGHT_MOUSE li").unbind("click").bind("click", function (a) {
        var d = PN_PAGE.getElement(".selected"),
            e = $(this).attr("pn-optionmr");
        d.hasClass("selected") && ("moveTop" == e && (c.moveTop(), pageSave = !1), "moveBot" == e && (c.moveBottom(), pageSave = !1), "delete" == e && (c.boxRightDelete(), $("#RIGHT_MOUSE .right-mouse").hide(), $("#resizable-element").hide(), pageSave = !1), "clone" == e && (c.boxRightClone(), pageSave = !1), "group" == e && "desktop" == deviceEdit && (c.group(), pageSave = !1, $("#RIGHT_MOUSE .right-mouse").hide(), $("#resizable-element").hide()), "ungroup" == e && "desktop" == deviceEdit && (c.unGroup(), pageSave = !1, $("#RIGHT_MOUSE .right-mouse").hide(), $("#resizable-element").hide()), "copy" == e && c.copyElement(), "paste" == e && (c.pasteElement(!0), pageSave = !1), "copyss" == e && c.copyElement(), "pastess" == e && (c.pasteElement(!0), pageSave = !1), "cancelgroup" == e && (c.cancelgroup(), pageSave = !1)), b.init()
    })
},
BoxRightClick.prototype.moveTop = function () {
    var a = PN_PAGE.getElement(".selected");
    if (a.hasClass("widget-element"))
        if ("group-tmp" == a.attr("pn-type"));
        else {
            var b = a.parent();
            if (a.appendTo(b), "contact_form" == a.attr("pn-type")) {
                var c = PN_PAGE.getElement('.widget-element[pn-parent="' + a.attr("id") + '"]');
                c.insertAfter(a)
            }
        }
    if (a.hasClass("widget-section")) {
        var d = a.prev();
        d.insertAfter(a)
    }
    var e = new OptionWiget;
    e.sortWg(), e.fixsizeBody(), $("#RIGHT_MOUSE .right-mouse").hide(), $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide(), $("#resizable-section").hide()
},
BoxRightClick.prototype.moveBottom = function () {
    var a = PN_PAGE.getElement(".selected");
    if (a.hasClass("widget-element"))
        if ("group-tmp" == a.attr("pn-type"));
        else {
            var b = a.parent();
            if (a.prependTo(b), "contact_form" == a.attr("pn-type")) {
                var c = PN_PAGE.getElement('.widget-element[pn-parent="' + a.attr("id") + '"]');
                c.insertAfter(a)
            }
        }
    if (a.hasClass("widget-section")) {
        var d = a.next();
        a.insertAfter(d)
    }
    var e = new OptionWiget;
    e.sortWg(), e.fixsizeBody(), $("#RIGHT_MOUSE .right-mouse").hide(), $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide(), $("#resizable-section").hide()
},
BoxRightClick.prototype.boxRightDelete = function () {
    if (selectedItem && selectedItem.length > 0) {
        var a = void 0;
        selectedItem.attr("pn-group") && "" != selectedItem.attr("pn-group") && (a = PN_PAGE.getElement("#" + selectedItem.attr("pn-group")));
        var b = $(".resizable-popup"),
            c = new OptionWiget;
        if ("desktop" == deviceEdit) {
            var d = new SortElementMobile;
            if ("GROUP_TMP" != selectedItem.attr("id")) d.resetSortElementDelete(selectedItem);
            else
                for (var e = 0; e < groupElement.length; e++) {
                    var f = PN_PAGE.getElement("#" + groupElement[e]);
                    void 0 != f && f.length > 0 && d.resetSortElementDelete(f)
                }
        }
        if ("item_form" == selectedItem.attr("pn-type")) {
            var g = c.getParentElement(selectedItem);
            if (void 0 != g && g.length > 0 && "contact_form" == g.attr("pn-type")) {
                for (var h = PN_PAGE.getIndexElement(g.attr("id")), i = selectedItem.find(".widget-content").eq(0).attr("name"), j = apiElement[h].item_form.length, k = 0; j > k; k++)
                    if (apiElement[h].item_form[k].name == i) {
                        apiElement[h].item_form.splice(k, 1);
                        break
                    }
                itemFieldFormUsing = apiElement[h].item_form;
                for (var k = 0; k < type_field_form.length; k++) type_field_form[k].using = "true";
                for (var l = 0; l < itemFieldFormUsing.length; l++)
                    for (var k = 0; k < type_field_form.length; k++)
                        if (itemFieldFormUsing[l].type == type_field_form[k].type) {
                            type_field_form[k].using = "false";
                            break
                        }
                if (apiElement[h].positionItem) {
                    for (var m = $.grep(apiElement[h].positionItem, function (a) {
                            return a.id == selectedItem.attr("id")
                    }), n = 0, k = 0; k < apiElement[h].positionItem.length; k++) m[0].vt < apiElement[h].positionItem[k].vt && (apiElement[h].positionItem[k].vt = parseFloat(apiElement[h].positionItem[k].vt) - 1), apiElement[h].positionItem[k].id == selectedItem.attr("id") && (n = k);
                    apiElement[h].positionItem.splice(n, 1)
                }
            }
        }
        if ("none" != b.css("display") && selectedItem.hasClass("widget-section")) c.addElementUndo("remove", selectedItem), b.attr("pn-id-popup", ""), selectedItem.remove(), b.hide(), c.sortWg(), selectedItem = void 0;
        else {
            var o;
            if (PN_PAGE.getElement(".widget-section").length <= 1 && selectedItem.hasClass("widget-section")) {
                var p = new AlertPnotify;
                p.createMessage("Không được để trống!")
            } else {
                if (selectedItem.hasClass("widget-section") || selectedItem.hasClass("widget-element"))
                    if (selectedItem.hasClass("widget-group")) {
                        if (c.addElementUndo("remove", selectedItem), "GROUP_TMP" == selectedItem.attr("id") && groupElement.length > 0) {
                            for (var k = 0; k < groupElement.length; k++) {
                                var q = PN_PAGE.getElement("#" + groupElement[k]);
                                q.remove()
                            }
                            selectedItem.remove()
                        } else {
                            var r = selectedItem.attr("id"),
                                s = PN_PAGE.getElement('.widget-element[pn-group="' + r + '"]');
                            s.length > 0 && s.each(function () {
                                c.deleteFormContact($(this)), $(this).remove()
                            }), c.deleteFormContact(selectedItem), o = PN_PAGE.getIndexElement(selectedItem.attr("id"))
                        }
                        selectedItem.remove(), selectedItem = void 0;
                        var t = new OptionWiget;
                        t.fixsizeBody(), $("#RIGHT_MOUSE .right-mouse").hide(), $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide(), $("#resizable-section").hide(), $(".settings.active").removeClass("active")
                    } else if (void 0 != selectedItem.attr("pn-parent") || void 0 != selectedItem.attr("pn-parent"));
                    else {
                        c.addElementUndo("remove", selectedItem);
                        var u = selectedItem.find(".widget-element");
                        u.each(function () {
                            c.deleteFormContact($(this)), o = PN_PAGE.getIndexElement($(this).attr("id"))
                        }), c.deleteFormContact(selectedItem), o = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                        var v = void 0;
                        if (void 0 != selectedItem.attr("pn-group") && "undefined" != selectedItem.attr("pn-group") && "" != selectedItem.attr("pn-group")) {
                            var w = PN_PAGE.getElement("#" + selectedItem.attr("pn-group"));
                            1 == w.find(".widget-element").length && w.find(".widget-element").attr("id") == selectedItem.attr("id") ? (w.remove(), groupElement = []) : (v = PN_PAGE.getElement("#" + selectedItem.attr("pn-group")), selectedItem.remove())
                        } else selectedItem.remove();
                        selectedItem.remove(), selectedItem = void 0;
                        var t = new OptionWiget;
                        t.fixsizeBody(), void 0 != v && v.length > 0 && t.calulatorAllGroup(v), $("#RIGHT_MOUSE .right-mouse").hide(), $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide(), $("#resizable-section").hide(), $(".settings.active").removeClass("active")
                    }
                c.sortWg()
            }
        }
        a && a.length > 0 && this.resetElementGroup(a), topScroll = PN_PAGE.PUNNEL_EDIT.scrollTop(), arrIdOnScreen = [], c = new OptionWiget, arrIdOnScreen = c.getIdElementOnScreen(), c.setValueFrameToScroll(), selectedItem = void 0
    }
},
BoxRightClick.prototype.boxRightClone = function () {
    this.copyElement(), this.pasteElement(!0)
},
BoxRightClick.prototype.group = function () {
    if (void 0 != selectedItem && "undefined" != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-group")) {
        var a = new EventKey;
        a.createGroup(selectedItem)
    }
},
BoxRightClick.prototype.cancelgroup = function () {
    if (void 0 != selectedItem && "undefined" != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-group")) {
        var a = new EventKey;
        a.eventUngroup()
    }
},
BoxRightClick.prototype.unGroup = function () {
    selectedItem.remove();
    var a = new OptionWiget;
    a.sortWg(), selectedItem = void 0
},
BoxRightClick.prototype.copyElement = function (a) {
    var b;
    if (b = a && a.length > 0 ? a : selectedItem, void 0 != b && b.length > 0 && "item_slider" != b.attr("pn-type") && "item_form" != b.attr("pn-type") && "item_menu" != b.attr("pn-type")) {
        var c, d, e = (PN_PAGE.getElement(".selected"), []),
            f = "";
        if (b.hasClass("widget-section") && typeAddNew == typeSection) {
            var g = new AlertPnotify;
            g.createMessage(tranlateTT.khongcopy)
        } else {
            if (b.hasClass("widget-section") || b.hasClass("widget-group"))
                if ("GROUP_TMP" == b.attr("id") && groupElement.length > 0) {
                    for (var h = 0; h < groupElement.length; h++) {
                        var i = PN_PAGE.getElement("#" + groupElement[h]),
                            j = PN_PAGE.getIndexElement(i.attr("id"));
                        i.addClass("copy"), e.push(apiElement[j]);
                        var k = i.find(".widget-element");
                        k.each(function () {
                            var a = PN_PAGE.getIndexElement($(this).attr("id"));
                            e.push(apiElement[a]), $(this).addClass("copy copy-child")
                        }), f += i[0].outerHTML
                    }
                    var l = new AddGroup,
                        m = PN_PAGE.getElement("#" + l.getItemTopMin(groupElement)).css("top"),
                        n = PN_PAGE.getElement("#" + l.getItemLeftMin(groupElement)).css("left");
                    PN_PAGE.account.topMinGroup = m, PN_PAGE.account.leftMinGroup = n, localStorage.setItem("typeElementCopy", "group-tmp")
                } else b.addClass("copy"), c = PN_PAGE.getIndexElement(b.attr("id")), e.push(apiElement[c]), d = b.find(".widget-element"), d.each(function () {
                    c = PN_PAGE.getIndexElement($(this).attr("id")), e.push(apiElement[c]), $(this).addClass("copy")
                }), f = b[0].outerHTML, b.hasClass("widget-group") ? localStorage.setItem("typeElementCopy", "widget-group") : localStorage.setItem("typeElementCopy", "widget-section");
            else if ("contact_form" == b.attr("pn-type")) {
                b.addClass("copy"), c = PN_PAGE.getIndexElement(b.attr("id")), e.push(apiElement[c]), d = b.find(".widget-element"), d.each(function () {
                    c = PN_PAGE.getIndexElement($(this).attr("id")), e.push(apiElement[c]), $(this).addClass("copy")
                }), f = b[0].outerHTML;
                var o = PN_PAGE.getElement('.widget-element[pn-parent="' + b.attr("id") + '"]');
                o.addClass("copy"), c = PN_PAGE.getIndexElement(o.attr("id")), e.push(apiElement[c]);
                var p = o.find(".widget-element");
                void 0 != p && p.length > 0 && p.each(function () {
                    c = PN_PAGE.getIndexElement($(this).attr("id")), e.push(apiElement[c]), $(this).addClass("copy")
                });
                var q = o.offset().top - b.offset().top,
                    r = o.offset().left - b.offset().left;
                f += o[0].outerHTML, localStorage.setItem("typeElementCopy", "contact_form"), localStorage.setItem("kcLeft", r), localStorage.setItem("kcTop", q)
            } else if (void 0 != b.attr("pn-parent") && "" != b.attr("pn-parent") && "undefined" != b.attr("pn-parent")) {
                var g = new AlertPnotify;
                g.createMessage("Button này đi theo form không thể copy riêng lẻ!")
            } else b.addClass("copy"), c = PN_PAGE.getIndexElement(b.attr("id")), e.push(apiElement[c]), d = b.find(".widget-element"), d.each(function () {
                c = PN_PAGE.getIndexElement($(this).attr("id")), e.push(apiElement[c]), $(this).addClass("copy")
            }), f = b[0].outerHTML, localStorage.setItem("typeElementCopy", "widget-element");
            PN_PAGE.getElement(".copy").removeClass("copy"), localStorage.setItem("copy", f), localStorage.setItem("apiCopy", JSON.stringify(e)), $("#RIGHT_MOUSE .right-mouse").hide(), $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide(), PN_PAGE.getElement(".selected").removeClass("selected"), selectedItem.addClass("selected");
            var s = new ShowBoxResize;
            selectedItem.hasClass("widget-section") ? s.showBoxSection(selectedItem) : s.showBox(selectedItem)
        }
    }
},
BoxRightClick.prototype.pasteElement = function (a) {
    if (localStorage.getItem("copy") && localStorage.getItem("copy").length > 0) {
        var b, c = void 0,
            d = JSON.parse(localStorage.getItem("apiCopy"));
        if ("widget-section" == localStorage.getItem("typeElementCopy"))
            if (typeAddNew != typeSection) b = new OptionWiget, c = selectedItem.hasClass("widget-section") ? selectedItem : b.getParentSection(selectedItem), PN_PAGE.PUNNEL_EDIT.append(localStorage.getItem("copy")), PN_PAGE.getElement(".widget-section.copy").insertAfter(c), this.pastItem(localStorage.getItem("typeElementCopy"), d, PN_PAGE.PUNNEL_EDIT, a);
            else {
                var e = new AlertPnotify;
                e.createMessage("Template section chỉ có section trắng duy nhất!")
            }
        else {
            if (selectedItem.hasClass("widget-section")) c = selectedItem.find(".container").eq(0);
            else if ("group-tmp" == localStorage.getItem("typeElementCopy"))
                if ("GROUP_TMP" == selectedItem.attr("id")) {
                    b = new OptionWiget;
                    var f = PN_PAGE.getElement("#" + groupElement[0]);
                    c = f.parent()
                } else c = selectedItem.parent();
            else c = selectedItem.parent();
            c.append(localStorage.getItem("copy")), this.pastItem(localStorage.getItem("typeElementCopy"), d, c, a)
        }
        void 0 != c && c.hasClass("widget-content") ? (b = new OptionWiget, b.calulatorAllGroup(c.parent())) : void 0 != c && c.hasClass("widget-element") && (b = new OptionWiget, b.calulatorAllGroup(c))
    }
},
BoxRightClick.prototype.pastItem = function (a, b, c, d) {
    var e, f, g, h = 0,
        i = c,
        j = selectedItem,
        k = (new Rotate, 0);
    if (TOP_FRAME = 40, selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element") ? (k = topScroll, pageMouseY = 1 == d ? selectedItem.offset().top + TOP_FRAME + 40 + topScroll : selectedItem.offset().top + TOP_FRAME, pageMouseX = selectedItem.offset().left + LEFT_FRAME + 40) : (k = 0, selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-section")), void 0 != i && i.length > 0);
    else {
        var l = new AddToFrame;
        i = l.eleAdd(!1)
    }
    if ("widget-section" != a) {
        if ("widget-element" == a || "contact_form" == a) {
            j = i.find(".widget-element.copy").eq(0), i.hasClass("widget-section") ? (f = pageMouseY - i.find(".container").eq(0).offset().top - TOP_FRAME - k + "px", g = pageMouseX - i.find(".container").eq(0).offset().left - LEFT_FRAME + "px") : (f = pageMouseY - i.offset().top - TOP_FRAME - k + "px", g = pageMouseX - i.offset().left - LEFT_FRAME + "px"), j.css({
                top: f,
                left: g
            });
            var m = "";
            m = j.parent().parent().hasClass("widget-group") ? j.parent().parent().attr("id") : "", j.attr("pn-group", m);
            for (var n = 0; n < b.length; n++)
                if (b[n].id == j.attr("id")) {
                    b[n].idGroup = m;
                    break
                }
            var o = new LpResize;
            o.fixSizeWgGroup(j)
        }
        if ("widget-group" == a) {
            j = i.find(".widget-element.copy").eq(0), i.hasClass("widget-section") ? (f = pageMouseY - i.find(".container").eq(0).offset().top - TOP_FRAME - k + "px", g = pageMouseX - i.find(".container").eq(0).offset().left - LEFT_FRAME + "px") : (f = pageMouseY - i.offset().top - TOP_FRAME - k + "px", g = pageMouseX - i.offset().left - LEFT_FRAME + "px"), j.css({
                top: f,
                left: g
            }), j.hasClass("widget-group") && "GROUP_TMP" != j.attr("id") && j.find(".widget-content").eq(0).css({
                outline: "0"
            });
            var m = "";
            m = j.parent().parent().hasClass("widget-group") ? j.parent().parent().attr("id") : "", j.attr("pn-group", m);
            for (var p = 0; p < b.length; p++)
                if (b[p].id == j.attr("id")) {
                    b[p].idGroup = m;
                    break
                }
            var o = new LpResize;
            o.fixSizeWgGroup(j)
        }
        "group-tmp" == a && (j = i.find(".widget-element.copy").eq(0), i.hasClass("widget-section") ? (f = pageMouseY - i.find(".container").eq(0).offset().top - TOP_FRAME - k + "px", g = pageMouseX - LEFT_FRAME + "px") : (f = pageMouseY - i.offset().top - TOP_FRAME - k + "px", g = pageMouseX - i.offset().left - LEFT_FRAME + "px"))
    }
    var q = i.find(".copy");
    q.each(function () {
        if ($(this).hasClass("widget-element") && $(this).hasClass("copy") && "contact_form" == $(this).attr("pn-type")) {
            var a = i.find('.copy.widget-element[pn-type="button"][pn-parent="' + $(this).attr("id") + '"]');
            a.insertAfter($(this))
        }
    }), q = i.find(".copy"), groupElement = [], void 0 != q && "undefined" != q && q.length > 0 && q.each(function () {
        void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain && (h = dummyData.numLayerMain), "true" == $(this).attr("pn-popup") ? (e = "POPUP" + h, $('.widget-section[pn-popup="true"]').hide(), $(".resizable-popup").attr("pn-id-popup", e).show()) : e = $(this).attr("pn-lang") + h, h++, dummyData.numLayerMain = h, $(this).hasClass("widget-group") && $(this).find('.widget-element.copy[pn-group="' + $(this).attr("id") + '"]').attr("pn-group", e), $(this).hasClass("widget-element") && "contact_form" == $(this).attr("pn-type") && i.find('.copy.widget-element[pn-type="button"][pn-parent="' + $(this).attr("id") + '"]').attr("pn-parent", e);
        for (var c = 0; c < b.length; c++)
            if (b[c].id == $(this).attr("id")) {
                if (b[c].id = e, $(this).hasClass("widget-section")) b[c].parent = "body";
                else {
                    var d = $(this).parent();
                    "item_slider" == $(this).attr("pn-type") ? b[c].parent = "#" + d.parent().parent().attr("id") + " .widget-content" : d.hasClass("container") ? b[c].parent = "#" + d.parent().attr("id") + " .container" : d.hasClass("widget-content") ? b[c].parent = "#" + d.parent().attr("id") + " .widget-content" : d.hasClass("widget-section") ? b[c].parent = "#" + d.attr("id") : b[c].parent = ".widget-section:eq(0) .container"
                }
                if ("group-tmp" == a) {
                    var j = parseFloat($(this).css("top")) - parseFloat(PN_PAGE.account.topMinGroup) + parseFloat(f) + "px",
                        k = parseFloat($(this).css("left")) - parseFloat(PN_PAGE.account.leftMinGroup) + parseFloat(g) + "px";
                    $(this).hasClass("copy-child") || $(this).css({
                        top: j,
                        left: k
                    });
                    var l = "";
                    l = $(this).parent().parent().hasClass("widget-group") ? $(this).parent().parent().attr("id") : "", $(this).attr("pn-group", l);
                    for (var m = 0; m < b.length; m++)
                        if (b[m].id == e) {
                            b[m].idGroup = l;
                            break
                        }
                    var o = new LpResize;
                    o.fixSizeWgGroup($(this))
                } else void 0 != $(this).attr("pn-group") && "undefined" != $(this).attr("pn-group") && "" != $(this).attr("pn-group") && (b[c].idGroup = $(this).attr("pn-group"));
                if ("widget-element" == a && "button" == $(this).attr("pn-type") && "" != $(this).attr("pn-parent") && void 0 != $(this).attr("pn-parent") && "undefined" != $(this).attr("pn-parent")) {
                    var p = i.find("#" + $(this).attr("pn-parent"));
                    "contact_form" == localStorage.getItem("typeElementCopy") && $(this).css({
                        top: parseFloat(p.css("top")) + parseFloat(localStorage.getItem("kcTop")) + "px",
                        left: parseFloat(p.css("left")) + parseFloat(localStorage.getItem("kcLeft")) + "px"
                    })
                }
                if ("button" == $(this).attr("pn-type") && "" != $(this).attr("pn-parent") && void 0 != $(this).attr("pn-parent") && "undefined" != $(this).attr("pn-parent")) {
                    b[c].id_parent = $(this).attr("pn-parent");
                    var p = i.find("#" + $(this).attr("pn-parent"));
                    "contact_form" == localStorage.getItem("typeElementCopy") && $(this).css({
                        top: parseFloat(p.css("top")) + parseFloat(localStorage.getItem("kcTop")) + "px",
                        left: parseFloat(p.css("left")) + parseFloat(localStorage.getItem("kcLeft")) + "px"
                    })
                }
                0 == n && (b[c].mobile = 0, b[c].sortmobile = 0), PN_PAGE.sortMobilePublish = 1, b[c].media[deviceEdit].top = $(this).css("top"), b[c].media[deviceEdit].left = $(this).css("left"), $(this).attr("id", e), "group-tmp" == a ? groupElement.push(e) : groupElement = [], $(this).hasClass("copy") && !$(this).hasClass("copy-child") && (b[c].mobile = 0, b[c].sortmobile = 0), $(this).removeClass("copy"), $(this).removeClass("copy-child"), apiElement.push(b[c])
            }
        var q = new setStyleElement;
        q.setStyleItem(apiElement[apiElement.length - 1], deviceEdit), "listop" == $(this).attr("pn-type") && q.setStyleList(apiElement[apiElement.length - 1])
    });
    var r = new OptionWiget;
    if (r.sortWg(), r.fixsizeBody(), "group-tmp" == a) {
        for (var s = [], t = 0; t < groupElement.length; t++) {
            var u = PN_PAGE.getElement("#" + groupElement[t]),
                v = r.getParentElement(u);
            void 0 != v && v.length > 0 && -1 == groupElement.indexOf(v.attr("id")) && s.push(groupElement[t])
        }
        groupElement = [], groupElement = s;
        var w = new AddGroup;
        w.createGroupTmp(groupElement)
    } else groupElement = [], selectedItem = j;
    if (void 0 != selectedItem && selectedItem.length > 0) {
        $(".iframe-content .selected").removeClass("selected"), selectedItem.addClass("selected");
        var x = new ShowBoxResize;
        selectedItem.hasClass("widget-element") && x.showBox(selectedItem), selectedItem.hasClass("widget-section") && (x.showBoxSection(selectedItem), "true" == selectedItem.attr("pn-popup") && (selectedItem = PN_PAGE.getElement("#" + $(".resizable-popup").attr("pn-id-popup")), selectedItem.css({
            display: "flex"
        })));
        var y = r.getParentSection(selectedItem);
        r.addElementUndo("", y);
        var z = new IframeClick;
        z.addClassSelected(selectedItem)
    }
    arrIdOnScreen = [];
    var A = new OptionWiget;
    arrIdOnScreen = A.getIdElementOnScreen()
},
BoxRightClick.prototype.resetElementGroup = function (a) {
    if (a && a.length > 0 && a.hasClass("widget-group")) {
        var b = a.find(".widget-content:eq(0) > .widget-element");
        if (b && b.length > 1);
        else {
            var c = new OptionWiget;
            if (b && b.length > 0) {
                var d = c.getParentElement(a),
                    e = parseFloat(b.eq(0).css("top")) + parseFloat(a.css("top")),
                    f = parseFloat(b.eq(0).css("left")) + parseFloat(a.css("left"));
                b.attr("pn-group", ""), b.css({
                    top: e + "px",
                    left: f + "px"
                });
                var g = PN_PAGE.getIndexElement(b.attr("id"));
                if (apiElement[g].idGroup = "", d.hasClass("widget-section")) d.find(".container").eq(0).append(b), apiElement[g].parent = "#" + d.attr("id") + " .container:eq(0)";
                else if ("slide_show" == d.attr("pn-type")) {
                    var h = d.find(".widget-content:eq(0) .item_slide li:visible"),
                        i = d.find(".widget-content:eq(0) .item_slide li"),
                        j = h.index(i);
                    h.find(".main-slide").eq(0).append(b), apiElement[g].parent = "#" + d.attr("id") + " .widget-content:eq(0) > .item_slide li:eq(" + j + ") .main-slide:eq(0)"
                } else d.hasClass("widget-group") && "GROUP_TMP" != d.attr("id") && (b.attr("pn-group", d.attr("id")), apiElement[g].idGroup = d.attr("id")), d.find(".widget-content").eq(0).append(b), apiElement[g].parent = "#" + d.attr("id") + " .widget-content:eq(0)";
                apiElement[g].media[deviceEdit].top = e + "px", apiElement[g].media[deviceEdit].left = f + "px", apiElement[g].sortmobile = 0, apiElement[g].mobile = 0, PN_PAGE.sortMobilePublish = 1, a.remove(), c.sortWg()
            } else a.remove(), c.sortWg()
        }
    }
};