var doc = $(document),
    iframeDoc = $(".cover"),
    EventKey = function() {};
EventKey.prototype.init = function() {
    this.top = 0, this.left = 0, this.keyDownDocument(), this.keyDownIframe()
},
EventKey.prototype.keyDownDocument = function () {
    var a = new BoxRightClick;
    doc = $(document);
    var b = new TreeWidget,
        c = this;
    doc.unbind("keydown", "ctrl+z").bind("keydown", "ctrl+z", function (a) {
        a.preventDefault(), c.undoElement()
    }), doc.unbind("keydown", "ctrl+shift+z").bind("keydown", "ctrl+shift+z", function (a) {
        a.preventDefault(), c.redoElement()
    }), doc.unbind("keydown", "shift").bind("keydown", "shift", function (a) {
        a.preventDefault(), shiftdown = !0
    }), doc.unbind("keyup", "shift").bind("keyup", "shift", function (a) {
        a.preventDefault(), shiftdown = !1
    }), doc.unbind("keydown", "alt").bind("keydown", "alt", function (a) {
        a.preventDefault(), "desktop" == deviceEdit && (altdown = !0)
    }), doc.unbind("keyup", "alt").bind("keyup", "alt", function (a) {
        a.preventDefault(), altdown = !1
    }), doc.unbind("keydown", "ctrl").unbind("keydown", "ctrl").bind("keydown", "ctrl", function (a) {
        a.preventDefault(), keyDownSl = "ctrl_down", c.addGroupElement(selectedItem)
    }), doc.unbind("keydown", "ctrl+d").unbind("keydown", "ctrl+d").bind("keydown", "ctrl+d", function (b) {
        b.preventDefault(), 0 == checkClick && "desktop" == deviceEdit && (a = new BoxRightClick, a.copyElement(), a = new BoxRightClick, a.pasteElement(!0), checkClick = 1)
        }),
        doc.unbind("keydown", "ctrl+g").unbind("keydown", "ctrl+g").bind("keydown", "ctrl+g", function (a) {
        a.preventDefault(), a.stopPropagation(), "desktop" == deviceEdit && (c.createGroup(selectedItem), b.init())
        }),
        doc.unbind("keydown", "del").unbind("keydown", "del").bind("keydown", "del", function (a) {
        a.preventDefault(), "desktop" == deviceEdit && (c.setKeyDown(), c.eventDelete(), b.init())
        }),
        doc.unbind("keydown", "backspace").unbind("keydown", "backspace").bind("keydown", "backspace", function (a) {
            a.preventDefault(), "desktop" == deviceEdit && (c.setKeyDown(), c.eventDelete(), b.init())
        }),
        doc.unbind("keydown", "up").unbind("keydown", "up").bind("keydown", "up", function (a) {
        a.preventDefault(), selectedItem && "item_slider" == selectedItem.attr("pn-type") || (c.setKeyDown(), c.eventKeyDownUp())
        }),
        doc.unbind("keydown", "down").unbind("keydown", "down").bind("keydown", "down", function (a) {
        a.preventDefault(), selectedItem && "item_slider" == selectedItem.attr("pn-type") || (c.setKeyDown(), c.eventKeyDown())
        }),
        doc.unbind("keydown", "left").unbind("keydown", "left").bind("keydown", "left", function (a) {
        a.preventDefault(), selectedItem && "item_slider" == selectedItem.attr("pn-type") || (c.setKeyDown(), c.eventKeyLeft())
        }),
        doc.unbind("keydown", "right").unbind("keydown", "right").bind("keydown", "right", function (a) {
        a.preventDefault(), selectedItem && "item_slider" == selectedItem.attr("pn-type") || (c.setKeyDown(), c.eventKeyRight())
        }),
        doc.unbind("keyup", "ctrl").unbind("keyup", "ctrl").bind("keyup", "ctrl", function (a) {
        a.preventDefault(), mouseIsMove === !1 && (c.setKeyDown(), keyDownSl = "up", c.eventKeyUp())
        }),
        doc.unbind("keydown", "ctrl+c").unbind("keydown", "ctrl+c").bind("keydown", "ctrl+c", function (b) {
            b.preventDefault(), a = new BoxRightClick, a.copyElement(selectedItem)
        }),
        doc.unbind("keyup", "ctrl+v").unbind("keyup", "ctrl+v").bind("keyup", "ctrl+v", function (b) {
        b.preventDefault(), "desktop" == deviceEdit && (a = new BoxRightClick, a.pasteElement(!0))
        }),
        doc.unbind("keydown", "command+c").unbind("keydown", "command+c").bind("keydown", "command+c", function (b) {
            b.preventDefault(), a = new BoxRightClick, a.copyElement(selectedItem)
        }),
        doc.unbind("keyup", "command+v").unbind("keydown", "command+v").bind("keydown", "command+v", function (b) {
        b.preventDefault(), "desktop" == deviceEdit && (a = new BoxRightClick, a.pasteElement(!0))
        }),
        doc.unbind("keydown", "enter").unbind("keydown", "enter").bind("keydown", "enter", function (a) {
        a.preventDefault(), a.stopPropagation()
        }),
        doc.unbind("keydown", "alt").unbind("keydown", "alt").bind("keydown", "alt", function (a) {
        a.preventDefault(), c.showOption()
        })
        //doc.keyup(function (e) {
        //if (e.keyCode === 8 || e.keyCode == 46) {
        //    a.preventDefault(), "desktop" == deviceEdit && (c.setKeyDown(), c.eventDelete(), b.init())
        //    //if (selectedItem) c.eventDelete()
        //}})
},
EventKey.prototype.keyDownIframe = function () {
    var a = new BoxRightClick;
    iframeDoc = $(".cover");
    var b = this,
        c = new TreeWidget;
    iframeDoc.unbind("keydown", "ctrl+z").bind("keydown", "ctrl+z", function(a) {
        a.preventDefault(), b.undoElement()
    }), iframeDoc.unbind("keydown", "ctrl+shift+z").bind("keydown", "ctrl+shift+z", function(a) {
        a.preventDefault(), b.redoElement()
    }), iframeDoc.unbind("keydown", "shift").bind("keydown", "shift", function(a) {
        a.preventDefault(), shiftdown = !0
    }), iframeDoc.unbind("keyup", "shift").bind("keyup", "shift", function(a) {
        a.preventDefault(), shiftdown = !1
    }), iframeDoc.unbind("keydown", "alt").bind("keydown", "alt", function(a) {
        a.preventDefault(), "desktop" == deviceEdit && (altdown = !0)
    }), iframeDoc.unbind("keyup", "alt").bind("keyup", "alt", function(a) {
        a.preventDefault(), altdown = !1
    }), iframeDoc.unbind("keydown", "ctrl+d").unbind("keydown", "ctrl+d").bind("keydown", "ctrl+d", function(b) {
        b.preventDefault(), 0 == checkClick && "desktop" == deviceEdit && (a = new BoxRightClick, a.copyElement(), a = new BoxRightClick, a.pasteElement(!0), checkClick = 1)
    }), iframeDoc.unbind("keydown", "ctrl").bind("keydown", "ctrl", function(a) {
        a.preventDefault(), keyDownSl = "ctrl_down", b.addGroupElement(selectedItem)
    }), iframeDoc.unbind("keydown", "ctrl+g").unbind("keydown", "ctrl+g").bind("keydown", "ctrl+g", function(a) {
        a.preventDefault(), a.stopPropagation(), "desktop" == deviceEdit && (b.createGroup(selectedItem), c.init())
        }),
        iframeDoc.unbind("keydown", "del").unbind("keydown", "del").bind("keydown", "del", function (a) {
        a.preventDefault(), "desktop" == deviceEdit && (b.setKeyDown(), b.eventDelete(), c.init())
        }), iframeDoc.unbind("keydown", "backspace").unbind("keydown", "backspace").bind("keydown", "backspace", function (a) {
            a.preventDefault(), "desktop" == deviceEdit && (b.setKeyDown(), b.eventDelete(), c.init())
        }), iframeDoc.unbind("keydown", "up").unbind("keydown", "up").bind("keydown", "up", function(a) {
        a.preventDefault(), selectedItem && "item_slider" == selectedItem.attr("pn-type") || (b.setKeyDown(), b.eventKeyDownUp())
    }), iframeDoc.unbind("keydown", "down").unbind("keydown", "down").bind("keydown", "down", function(a) {
        a.preventDefault(), selectedItem && "item_slider" == selectedItem.attr("pn-type") || (b.setKeyDown(), b.eventKeyDown())
    }), iframeDoc.unbind("keydown", "left").unbind("keydown", "left").bind("keydown", "left", function(a) {
        a.preventDefault(), selectedItem && "item_slider" == selectedItem.attr("pn-type") || (b.setKeyDown(), b.eventKeyLeft())
    }), iframeDoc.unbind("keydown", "right").unbind("keydown", "right").bind("keydown", "right", function(a) {
        a.preventDefault(), selectedItem && "item_slider" == selectedItem.attr("pn-type") || (b.setKeyDown(), b.eventKeyRight())
    }), iframeDoc.unbind("keyup", "ctrl").unbind("keyup", "ctrl").bind("keyup", "ctrl", function(a) {
        a.preventDefault(), 0 == mouseIsMove && (b.setKeyDown(), keyDownSl = "up", b.eventKeyUp())
    }), iframeDoc.unbind("keydown", "ctrl+c").unbind("keydown", "ctrl+c").bind("keydown", "ctrl+c", function(b) {
        b.preventDefault(), a = new BoxRightClick, a.copyElement(selectedItem)
    }), iframeDoc.unbind("keyup", "ctrl+v").unbind("keyup", "ctrl+v").bind("keyup", "ctrl+v", function(b) {
        b.preventDefault(), "desktop" == deviceEdit && (a = new BoxRightClick, a.pasteElement(!0))
    }), iframeDoc.unbind("keydown", "command+c").unbind("keydown", "command+c").bind("keydown", "command+c", function(b) {
        b.preventDefault(), a = new BoxRightClick, a.copyElement(selectedItem)
    }), iframeDoc.unbind("keyup", "command+v").unbind("keydown", "command+v").bind("keydown", "command+v", function(b) {
        b.preventDefault(), "desktop" == deviceEdit && (a = new BoxRightClick, a.pasteElement(!0))
    }), iframeDoc.unbind("keydown", "enter").unbind("keydown", "enter").bind("keydown", "enter", function(a) {
        a.preventDefault(), a.stopPropagation()
    })
},
EventKey.prototype.eventGroupTmp = function () {
    if (0 == keyDownCtrl && (keyDownSl = "group_tmp", keyDownCtrl = !0, null != selectedItem && selectedItem.hasClass("widget-element"))) {
        pageSave = !1;
        var a = new AddGroup;
        a.init()
    }
},
EventKey.prototype.undoElement = function () {
    if (void 0 != ctrlZElement[deviceEdit][pageSelect] && ctrlZElement[deviceEdit][pageSelect].length > 0 && vitriUndo >= 0) {
        vitriUndo == ctrlZElement[deviceEdit][pageSelect].length - 1 && ctrlZElement[deviceEdit][pageSelect].length > 1 && "remove" != ctrlZElement[deviceEdit][pageSelect][vitriUndo].status && (vitriUndo = ctrlZElement[deviceEdit][pageSelect].length - 1), vitriUndo > 0 && vitriUndo--;
        var a = $.extend(!0, {}, ctrlZElement[deviceEdit][pageSelect][vitriUndo]);
        if ("new" == a.status) {
            var b = PN_PAGE.getElement("#" + a.id);
            b.hasClass("widget-group") && "GROUP_TMP" != b.attr("id") ? (selectedItem = PN_PAGE.getElement("#" + a.id), this.eventUngroup(), selectedItem = void 0) : ("true" == b.attr("pn-popup"), PN_PAGE.getElement("#" + a.id).remove(), selectedItem = void 0)
        } else this.setValueUndoRedoElement(a);
        var c = new OptionWiget;
        c.sortWg()
    }
},
EventKey.prototype.redoElement = function () {
    if (void 0 != ctrlZElement[deviceEdit][pageSelect] && ctrlZElement[deviceEdit][pageSelect].length > 0 && vitriUndo < ctrlZElement[deviceEdit][pageSelect].length) {
        vitriUndo < ctrlZElement[deviceEdit][pageSelect].length - 1 && vitriUndo++;
        var a = $.extend(!0, {}, ctrlZElement[deviceEdit][pageSelect][vitriUndo]);
        if ("remove" == a.status) {
            var b = PN_PAGE.getElement("#" + a.id);
            "true" == b.attr("pn-popup"), PN_PAGE.getElement("#" + a.id).remove(), selectedItem = void 0
        } else this.setValueUndoRedoElement(a);
        var c = new OptionWiget;
        c.sortWg()
    }
},
EventKey.prototype.setValueUndoRedoElement = function (a) {
    var b;
    if ("GROUP_TMP" == a.id) {
        b = a.apiChild;
        for (var c = 0; c < b.length; c++) this.setValueItemUndo(b[c])
    } else {
        if (this.setValueItemUndo(a.api), b = a.apiChild, void 0 != b && b.length > 0)
            for (var d = 0; d < b.length; d++) this.setValueItemUndo(b[d]);
        var e = PN_PAGE.getElement("#" + a.id);
        if (selectedItem = e, selectedItem.addClass("selected"), e.hasClass("widget-section")) {
            if (e.insertBefore(PN_PAGE.getElement(".widget-section").eq(a.vitri)), "true" == e.attr("pn-popup")) {
                $(".resizable-popup").attr("pn-id-popup", e.attr("id")), e.css({
                    display: "flex"
                });
                var f = new ShowBoxResize;
                f.showBoxSection(e)
            }
            var g = new OptionWiget;
            g.fixsizeBody()
        } else if (selectedItem.hasClass("widget-group")) {
            var f = new ShowBoxResize;
            f.showBox(selectedItem)
        }
    }
},
EventKey.prototype.setValueItemUndo = function (a) {
    if (void 0 != a && "undefined" != a) {
        var b = $.extend(!0, {}, a),
            c = PN_PAGE.getIndexElement(b.id);
        null != c && "null" != c && void 0 != c && "undefined" != c && "" != c ? apiElement[c] = $.extend(!0, {}, b) : (apiElement.push(b), c = PN_PAGE.getIndexElement(b.id));
        var d = void 0,
            e = new setHtmlLadi,
            f = new setStyleElement;
        if (PN_PAGE.getElement("#" + b.id).remove(), void 0 != b.type_plugin && "undefined" != b.type_plugin && (e.getTemplate(b, b.type_plugin, function() {
                $(".widget-element").attr("href", ""), $(".widget-element .widget-content").attr("href", "")
            }), d = PN_PAGE.getElement("#" + b.id), void 0 != d && d.length > 0)) {
            var g = 0,
                h = 0;
            if (d.hasClass("widget-section")) {
                f.setStyleSection(b, deviceEdit);
                var i = new OptionWiget;
                i.fixsizeBody()
            } else f.setStyleItem(b, deviceEdit);
            if ("contact_form" == d.attr("pn-type")) {
                var j = PN_PAGE.getElement('.widget-element[pn-parent="' + d.attr("id") + '"]');
                if (void 0 != j && j.length > 0) {
                    var k = parseFloat(d.css("top")) + d.outerHeight() + g + "px",
                        l = parseFloat(d.css("left")) + d.outerWidth() + h + "px";
                    j.css({
                        top: k,
                        left: l
                    });
                    var m = PN_PAGE.getIndexElement(j.attr("id"));
                    apiElement[m].media[deviceEdit].top = k, apiElement[m].media[deviceEdit].left = l
                }
            }
            PN_PAGE.getElement(".selected").removeClass("selected"), selectedItem = d, selectedItem.addClass("selected")
        }
        $("#resizable-element").hide(), $("#resizable-section").hide()
    }
},
EventKey.prototype.eventDelete = function () {
    var a = new BoxRightClick;
    a.boxRightDelete()
},
EventKey.prototype.eventUngroup = function () {
    var a;
    a = selectedItem.hasClass("widget-group") ? selectedItem.attr("id") : selectedItem.attr("pn-group");
    var b = PN_PAGE.getElement("#" + a),
        c = new SortElementMobile;
    c.resetSortElementDelete(b);
    var d, e = parseFloat(b.css("top")),
        f = parseFloat(b.css("left")),
        g = PN_PAGE.getElement('.widget-element[pn-group="' + a + '"]'),
        h = new OptionWiget,
        i = h.getParentElement(b);
    void 0 != g && "undefined" != g && g.length > 0 && g.each(function() {
        if ($(this).css({
                top: parseFloat($(this).css("top")) + e + "px",
                left: parseFloat($(this).css("left")) + f + "px"
            }), $(this).attr("pn-group", ""), d = PN_PAGE.getIndexElement($(this).attr("id")), apiElement[d].media[deviceEdit].top = $(this).css("top"), apiElement[d].media[deviceEdit].left = $(this).css("left"), apiElement[d].idGroup = "", apiElement[d].sortmobile = 0, apiElement[d].mobile = 0, PN_PAGE.sortMobilePublish = 1, i.hasClass("widget-section")) apiElement[d].parent = "#" + i.attr("id") + " .container", $(this).appendTo(i.find(".container"));
        else if (i.hasClass("widget-element"))
            if ("slide_show" == i.attr("pn-type")) {
                var a = i.find(".widget-content:eq(0) .item_slide li:visible"),
                    b = i.find(".widget-content:eq(0) .item_slide li"),
                    c = b.index(a);
                apiElement[d].parent = "#" + i.attr("id") + " .widget-content:eq(0) .item_slide li:eq(" + c + ") .main-slide", $(this).appendTo(a.find(".main-slide:eq(0)"))
            } else i.hasClass("widget-group") && (apiElement[d].idGroup = i.attr("id"), $(this).attr("pn-group", i.attr("id"))), apiElement[d].parent = "#" + i.attr("id") + " .widget-content", $(this).appendTo(i.find(".widget-content:eq(0)"))
    }), d = PN_PAGE.getIndexElement(b.attr("id")), apiElement.splice(d, 1), b.remove(), selectedItem = void 0, $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide(), arrIdOnScreen = [];
    var j = new OptionWiget;
    arrIdOnScreen = j.getIdElementOnScreen()
},
EventKey.prototype.eventKeyDownUp = function () {
    var a = selectedItem;
    if (void 0 != selectedItem && selectedItem.length > 0 && null !== a && selectedItem.hasClass("widget-element"))
        if ("GROUP_TMP" == selectedItem.attr("id") && groupElement.length < 2);
        else {
            pageSave = !1;
            var b = PN_PAGE.getIndexElement(a.attr("id")),
                c = "px",
                d = parseFloat(a.css("top"));
            if (null != d && "null" != d && void 0 != d && "undefined" != d) {
                c = a.css("top").replace(d, ""), a.css({
                    top: d - 1 + c
                }), apiElement[b].media[deviceEdit].top = d - 1 + c;
                var e = new ShowBoxResize;
                e.showBox(a)
            }
            if ("GROUP_TMP" == selectedItem.attr("id"))
                for (var f = groupElement.length, g = 0; f > g; g++) {
                    var h = PN_PAGE.getElement("#" + groupElement[g]),
                        i = parseFloat(h.css("top"));
                    h.css({
                        top: i - 1 + "px"
                    });
                    var j = PN_PAGE.getIndexElement(groupElement[g]);
                    apiElement[j].media[deviceEdit].top = h.css("top")
                }
        }
},
EventKey.prototype.eventKeyDown = function () {
    var a = selectedItem;
    if (void 0 != selectedItem && selectedItem.length > 0 && null !== a && selectedItem.hasClass("widget-element"))
        if ("GROUP_TMP" == selectedItem.attr("id") && groupElement.length < 2);
        else {
            var b = PN_PAGE.getIndexElement(a.attr("id")),
                c = "px";
            pageSave = !1;
            var d = parseFloat(a.css("top"));
            if (null != d && "null" != d && void 0 != d && "undefined" != d) {
                c = a.css("top").replace(d, ""), a.css({
                    top: d + 1 + c
                }), apiElement[b].media[deviceEdit].top = d + 1 + c;
                var e = new ShowBoxResize;
                e.showBox(a)
            }
            if ("GROUP_TMP" == selectedItem.attr("id"))
                for (var f = groupElement.length, g = 0; f > g; g++) {
                    var h = PN_PAGE.getElement("#" + groupElement[g]),
                        i = parseFloat(h.css("top"));
                    h.css({
                        top: i + 1 + "px"
                    });
                    var j = PN_PAGE.getIndexElement(groupElement[g]);
                    apiElement[j].media[deviceEdit].top = h.css("top")
                }
        }
},
EventKey.prototype.eventKeyLeft = function () {
    var a = selectedItem;
    if (void 0 != selectedItem && selectedItem.length > 0 && null !== a && selectedItem.hasClass("widget-element"))
        if ("GROUP_TMP" == selectedItem.attr("id") && groupElement.length < 2);
        else {
            var b = PN_PAGE.getIndexElement(a.attr("id")),
                c = "px";
            pageSave = !1;
            var d = parseFloat(a.css("left"));
            if (null != d && "null" != d && void 0 != d && "undefined" != d) {
                c = a.css("left").replace(d, ""), a.css({
                    left: d - 1 + c
                }), apiElement[b].media[deviceEdit].left = d - 1 + c;
                var e = new ShowBoxResize;
                e.showBox(a)
            }
            if ("GROUP_TMP" == selectedItem.attr("id"))
                for (var f = groupElement.length, g = 0; f > g; g++) {
                    var h = PN_PAGE.getElement("#" + groupElement[g]),
                        i = parseFloat(h.css("left"));
                    h.css({
                        left: i - 1 + "px"
                    });
                    var j = PN_PAGE.getIndexElement(groupElement[g]);
                    apiElement[j].media[deviceEdit].left = h.css("left")
                }
        }
},
EventKey.prototype.eventKeyRight = function () {
    var a = selectedItem;
    if (void 0 != selectedItem && selectedItem.length > 0 && null !== a && selectedItem.hasClass("widget-element"))
        if ("GROUP_TMP" == selectedItem.attr("id") && groupElement.length < 2);
        else {
            pageSave = !1;
            var b = PN_PAGE.getIndexElement(a.attr("id")),
                c = "px",
                d = parseFloat(a.css("left"));
            if (null != d && "null" != d && void 0 != d && "undefined" != d) {
                c = a.css("left").replace(d, ""), a.css({
                    left: d + 1 + c
                }), apiElement[b].media[deviceEdit].left = d + 1 + c;
                var e = new ShowBoxResize;
                e.showBox(a)
            }
            if ("GROUP_TMP" == selectedItem.attr("id"))
                for (var f = groupElement.length, g = 0; f > g; g++) {
                    var h = PN_PAGE.getElement("#" + groupElement[g]),
                        i = parseFloat(h.css("left"));
                    h.css({
                        left: i + 1 + "px"
                    });
                    var j = PN_PAGE.getIndexElement(groupElement[g]);
                    apiElement[j].media[deviceEdit].left = h.css("left")
                }
        }
},
EventKey.prototype.eventKeyUp = function () {
    if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-group") && "GROUP_TMP" != selectedItem.attr("id")) {
        var a = new ShowBoxResize;
        a.showBox(selectedItem)
    }
},
EventKey.prototype.createGroup = function (group_temp) {
    if (groupElement.length > 1) {
        var newId;
        var idx = 0;
        var option_widget = new OptionWiget;
        if (void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain) {
            idx = dummyData.numLayerMain;
        }
        newId = "GROUP" + idx;
        idx++;
        dummyData.numLayerMain = idx;
        var e;
        var new_group_index;
        pageSave = false;
        var context = {
            html: PN_PAGE.PUNNEL_EDIT.html(),
            api: apiElement
        };
        changePage.push(context);
        var container_element;
        var first_element = PN_PAGE.getElement("#" + groupElement[0]);
        var fitst_option_widget = new OptionWiget;
        var parent_element = option_widget.getParentElement(first_element);
        if (parent_element.hasClass("widget-section")) {
            parent_element.find(".container").eq(0).append(valueTemplate.widget_group);
            container_element = parent_element.find(".container").eq(0);
        } else {
            parent_element.find(".widget-content").eq(0).append(valueTemplate.widget_group);
            container_element = parent_element.find(".widget-content").eq(0);
        }
        var leftpx;
        var that = PN_PAGE.getElement("#pn-new");
        var group_new = new AddGroup;
        var toppx = PN_PAGE.getElement("#" + group_new.getItemTopMin(groupElement)).offset().top - container_element.offset().top + "px";
        leftpx = parent_element.hasClass("widget-section") ? PN_PAGE.getElement("#" + group_new.getItemLeftMin(groupElement)).offset().left - container_element.offset().left + "px" : PN_PAGE.getElement("#" + group_new.getItemLeftMin(groupElement)).offset().left - parent_element.offset().left + "px";
        var plugin = new AddToFrame;
        that.css({
            top: toppx,
            left: leftpx,
            width: group_temp.css("width"),
            height: group_temp.css("height")
        });
        that.find(".widget-content").eq(0).css({
            width: group_temp.css("width"),
            height: group_temp.css("height"),
            outline: "0"
        });
        that.attr("id", newId);
        plugin.apiDefault("widget_group", "group", that.attr("id"), "", that.css("top"), that.css("left"), group_temp.css("width"), group_temp.css("height"));
        selectedItem = PN_PAGE.getElement("#" + that.attr("id"));
        PN_PAGE.getElement("#GROUP_TMP").remove();
        new_group_index = PN_PAGE.getIndexElement(that.attr("id"));
        apiElement[new_group_index].parent = "#" + parent_element.attr("id") + " .container";
        var touchSystem;
        var pfi = 0;
        for (; pfi < groupElement.length; pfi++) {
            if ("GROUP_TMP" != groupElement[pfi]) {
                touchSystem = new Rotate;
                e = PN_PAGE.getElement("#" + groupElement[pfi]);
                var s = new SortElementMobile;
                s.resetSortElementDelete(e);
                var sdkPanelHeight = (touchSystem.valueEle(e).height - e.outerHeight()) / 2;
                var v_height_diff = (touchSystem.valueEle(e).width - e.outerWidth()) / 2;
                var i = PN_PAGE.getIndexElement(e.attr("id"));
                apiElement[i].idGroup = newId;
                e.attr("pn-group", newId);
                var toppx = e.offset().top - that.offset().top + sdkPanelHeight + "px";
                var left_px = e.offset().left - that.offset().left + v_height_diff + "px";
                apiElement[i].parent = "#" + that.attr("id") + " .widget-content:eq(0)";
                e.css({
                    top: toppx,
                    left: left_px
                }).prependTo(that.find(".widget-content").eq(0));
                apiElement[i].media[deviceEdit].top = e.css("top");
                apiElement[i].media[deviceEdit].left = e.css("left");
            }
        }
        option_widget.addElementUndo("new", selectedItem);
        option_widget.addElementUndo("", selectedItem);
        groupElement = [];
        var $scope = new ShowBoxResize;
        $scope.showBox(selectedItem);
        fitst_option_widget.sortWg();
        var i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[i].mobile = 0;
        apiElement[i].sortmobile = 0;
        var widget_elements = selectedItem.find(".widget-content:eq(0) > .widget-element");
        if (void 0 != widget_elements && widget_elements.length > 0) {
            widget_elements.each(function () {
                var i = PN_PAGE.getIndexElement($(this).attr("id"));
                apiElement[i].mobile = 0;
                apiElement[i].sortmobile = 0;
            });
        }
        PN_PAGE.sortMobilePublish = 1;
        arrIdOnScreen = [];
        arrIdOnScreen = option_widget.getIdElementOnScreen();
    }
},
EventKey.prototype.setKeyDown = function () {
    keyDownCtrl = false;
    keyDownCtrlG = false;
},
EventKey.prototype.addGroupElement = function (n) {
    if (void 0 != n && "undefined" != n && n.length > 0) {
        var field;
        var url = n.attr("pn-group");
        var d = n.parent().parent();
        if (field = groupElement.length > 0 ? PN_PAGE.getElement("#" + groupElement[0]).parent().parent() : d, (void 0 == url || "undefined" == url || "" == url) && field.attr("id") == d.attr("id")) {
            var e = 0;
            var i = 0;
            for (; i < groupElement.length; i++) {
                if (n.attr("id") == groupElement[i]) {
                    e = 1;
                    break;
                }
            }
            if (0 == e) {
                groupElement.push(selectedItem.attr("id"));
                if ("contact_form" == selectedItem.attr("pn-type")) {
                    groupElement.push(PN_PAGE.getElement('.widget-element[pn-parent="' + selectedItem.attr("id") + '"]').attr("id"));
                }
                if (void 0 != selectedItem.attr("pn-parent") && "" != selectedItem.attr("pn-parent")) {
                    groupElement.push(selectedItem.attr("pn-parent"));
                }
            }
        }
    }
};

EventKey.prototype.showOption = function () {
    $('.aside-setting').css({
        'position': 'fixed',
        'display': 'block'
    });
};

EventKey.prototype.alignGroup = function (group_temp, pos) {
    if (groupElement.length > 1) {
        var that = PN_PAGE.getElement("#GROUP_TMP");

        var option_widget = new OptionWiget;
        var first_element = PN_PAGE.getElement("#" + groupElement[0]);
        var parent_element = option_widget.getParentElement(first_element);
        if (parent_element.hasClass("widget-section")) {
            //parent_element.find(".container").eq(0).append(valueTemplate.widget_group);
            container_element = parent_element.find(".container").eq(0);
        } else {
            //parent_element.find(".widget-content").eq(0).append(valueTemplate.widget_group);
            container_element = parent_element.find(".widget-content").eq(0);
        }

        var group_new = new AddGroup;
        var leftpx = parent_element.hasClass("widget-section") ? PN_PAGE.getElement("#" + group_new.getItemLeftMin(groupElement)).offset().left - container_element.offset().left : PN_PAGE.getElement("#" + group_new.getItemLeftMin(groupElement)).offset().left - parent_element.offset().left;
        var toppx = parent_element.hasClass("widget-section") ? PN_PAGE.getElement("#" + group_new.getItemTopMin(groupElement)).offset().top - container_element.offset().top : PN_PAGE.getElement("#" + group_new.getItemTopMin(groupElement)).offset().top - parent_element.offset().top;

        var t_width = that[0].clientWidth;
        var t_height = that[0].clientHeight;
        PN_PAGE.getElement("#GROUP_TMP").remove();
        var temp = [];
        if (pos == 'dis_horiz') {
            var t = 0;
            $.each(groupElement, function (key, value) {
                var ux = PN_PAGE.getElement("#" + value);
                temp.push(ux);
                t = t + ux[0].clientWidth;
            });
            var pad = (t_width - t) / (groupElement.length - 1);
            if (pad < 0) return;

            temp.sort(function (a, b) {
                if (a[0].offsetLeft > b[0].offsetLeft) { return 1 }
                if (a[0].offsetLeft < b[0].offsetLeft) { return -1 }
                return 0;
            });

            for (var j = 0; j < temp.length; j++) {
                var e = temp[j];
                var i = PN_PAGE.getIndexElement(e.attr("id"));
                if (j == 0) left_px = leftpx;
                else {
                    var prev = temp[j - 1];
                    left_px = parseInt(prev.css("left").replace('px', '')) + pad + prev[0].clientWidth;
                }

                e.css({
                    left: left_px + "px"
                });
                apiElement[i].media[deviceEdit].left = e.css("left");
            }
        }
        else if (pos == 'dis_vert') {
            var t = 0;
            $.each(groupElement, function (key, value) {
                var ux = PN_PAGE.getElement("#" + value);
                temp.push(ux);
                t = t + ux[0].clientHeight;
            });
            var pad = (t_height - t) / (groupElement.length - 1);
            if (pad < 0) return;

            temp.sort(function (a, b) {
                if (a[0].offsetTop > b[0].offsetTop) { return 1 }
                if (a[0].offsetTop < b[0].offsetTop) { return -1 }
                return 0;
            });

            for (var j = 0; j < temp.length; j++) {
                var e = temp[j];
                var i = PN_PAGE.getIndexElement(e.attr("id"));
                if (j == 0) top_px = toppx;
                else {
                    var prev = temp[j - 1];
                    top_px = parseInt(prev.css("top").replace('px', '')) + pad + prev[0].clientHeight;
                }

                e.css({
                    top: top_px + "px"
                });
                apiElement[i].media[deviceEdit].top = e.css("top");
            }
        }
        else if (pos == 'center' || pos == 'right' || pos == 'left') {
            for (var pfi = 0; pfi < groupElement.length; pfi++) {
                if ("GROUP_TMP" != groupElement[pfi]) {
                    var e = PN_PAGE.getElement("#" + groupElement[pfi]);
                    var i = PN_PAGE.getIndexElement(e.attr("id"));

                    var left_px = 0;
                    if (pos == 'center') {
                        left_px = leftpx + (t_width / 2 - e[0].clientWidth / 2) + "px";
                    } else if (pos == 'right') {
                        left_px = leftpx + (t_width - e[0].clientWidth) + "px";
                    } else if (pos == 'left') {
                        left_px = leftpx + "px";
                    }
                    e.css({
                        // top: toppx,
                        left: left_px,
                        "text-align": pos
                    });//.prependTo(that.find(".widget-content").eq(0));
                    //apiElement[i].media[deviceEdit].top = e.css("top");
                    apiElement[i].media[deviceEdit].left = e.css("left");
                }
            }
        }
        else if (pos == 'top' || pos == 'bottom' || pos == 'middle') {
            for (var pfi = 0; pfi < groupElement.length; pfi++) {
                if ("GROUP_TMP" != groupElement[pfi]) {
                    var e = PN_PAGE.getElement("#" + groupElement[pfi]);
                    var i = PN_PAGE.getIndexElement(e.attr("id"));

                    var top_px = 0;
                    if (pos == 'middle') {
                        top_px = toppx + (t_height / 2 - e[0].clientHeight / 2) + "px";
                    } else if (pos == 'bottom') {
                        top_px = toppx + (t_height - e[0].clientHeight) + "px";
                    } else if (pos == 'top') {
                        top_px = toppx + "px";
                    }
                    e.css({
                        top: top_px,
                        "vertical-align": pos
                    });
                    apiElement[i].media[deviceEdit].top = e.css("top");
                }
            }
        }
    }
};
