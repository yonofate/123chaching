var OptionWiget = function() {};
OptionWiget.prototype.init = function() {
    this.propertiesOption()
},
OptionWiget.prototype.propertiesOption = function () {
    this.showMenuLeft();
    var a = PN_PAGE.getElement(".container");
    if ("desktop" == deviceEdit) {
        var b = $(".cover").outerWidth();
        $(".follow2").css({
            left: b / 2 + "px"
        }), $(".follow1").css({
            left: b / 2 - 480 + "px"
        }), $(".follow3").css({
            left: b / 2 + 480 + "px"
        })
    } else if (a.length > 0) {
        var c = a.eq(0).offset().left + PN_PAGE.PUNNEL_EDIT.offset().left;
        $(".follow1").css({
            left: c + "px"
        }), $(".follow2").css({
            left: c + 160 + "px"
        }), $(".follow3").css({
            left: c + 320 + "px"
        }), $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide()
    }
},
OptionWiget.prototype.showMenuLeft = function () {
    var a = $('.aside-left li[data-type="group-element"]');
    a.unbind("hover").hover(function() {
        if ($(".aside-left li").removeClass("active"), $(".secondary-column.pn-layers").css({
                display: "none"
            }), $(this).hasClass("active")) $(".widgets").removeClass("active"), $(this).removeClass("active");
        else if (a.removeClass("active"), $(this).addClass("active"), "section" == $(this).attr("language")) $(".widgets").removeClass("active"), $(".template-plugin-section").show();
        else {
            $(".template-plugin-section").hide(), $(".widgets .elements").show();
            var b = $(this).attr("language");
            if ("all" == b) $(".widgets .elements li").show();
            else {
                $(".widgets .elements li").hide();
                for (var c = 0; c < thumbGroup.length; c++)
                    if (thumbGroup[c].name == b)
                        for (var d = 0; d < thumbGroup[c].child.length && ($('.widgets .elements li[language="' + thumbGroup[c].child[d].name + '"]').show(), d != thumbGroup[c].child.length - 1); d++);
            }
            $(".widgets").addClass("active")
        }
    })
},
OptionWiget.prototype.fixSizeParent = function (a) {
    if (void 0 != a && a.length > 0 && a.parent().hasClass("container")) {
        var b, c, d = a.parent().parent(),
            e = a.offset().top + a.outerHeight(),
            f = d.offset().top + d.outerHeight();
        e > f && (b = PN_PAGE.getIndexElement(d.attr("id")), c = e - d.offset().top, apiElement[b].media["" + deviceEdit].height = c + "px", d.css({
            height: c + "px"
        }))
    }
},
OptionWiget.prototype.fixSizeParentElement = function (a) {
    if (a && a.length > 0) {
        var b = this.getParentElement(a);
        if (b.hasClass("widget-element") || b.hasClass("wiget-section")) {
            var c, d, e = a.offset().top + a.outerHeight(),
                f = b.offset().top + b.outerHeight();
            e > f && (c = PN_PAGE.getIndexElement(b.attr("id")), d = e - b.offset().top, apiElement[c].media[deviceEdit].height = d + "px", b.css({
                height: d + "px"
            }), b.hasClass("widget-element") && b.find(".widget-content").eq(0).css({
                height: d + "px"
            }), "true" == b.attr("pn-popup") && (b.css({
                height: "100%"
            }), b.find(".container").eq(0).css({
                height: d + "px"
            })), this.fixSizeParentElement(b))
        }
    }
},
OptionWiget.prototype.sortWg = function () {
    var a, b = [],
        c = [],
        d = PN_PAGE.getElement(".widget-section"),
        e = PN_PAGE.getElement(".widget-element");
    d.each(function() {
        a = {
            id: $(this).attr("id")
        }, b.push(a)
    }), e.each(function() {
        a = {
            id: $(this).attr("id")
        }, b.push(a)
    });
    for (var f = 0; f < b.length; f++)
        for (var g = 0; g < apiElement.length; g++)
            if (b[f].id == apiElement[g].id) {
                c.push(apiElement[g]);
                break
            }
    for (var f = c.length - 1; f >= 0; f--) "group" == c[f].type_plugin && (PN_PAGE.getElement("#" + c[f].id).remove(), c.splice(f, 1));
    apiElement = c;
    for (var h = apiElement.length - 1, f = h; f >= 0; f--) {
        var i = PN_PAGE.getElement("#" + apiElement[f].id),
            j = i.attr("pn-parent");
        if (j && j.length > 0) {
            var k = PN_PAGE.getElement("#" + j);
            if (k && k.length > 0) {
                var l = PN_PAGE.getElement('.widget-element[pn-parent="' + j + '"]');
                if (l && l.length > 1) {
                    var m = PN_PAGE.getIndexElement(i.attr("id"));
                    apiElement.splice(m, 1), i.remove()
                }
            } else {
                var m = PN_PAGE.getIndexElement(i.attr("id"));
                apiElement.splice(m, 1), i.remove()
            }
        }
    }
    dummyData.apiElement = apiElement
},
OptionWiget.prototype.deleteFormContact = function (a) {
    var b, c;
    if (a && a.length > 0) {
        var d = this.getParentElement(a);
        if ("contact_form" == a.attr("pn-type")) c = PN_PAGE.getElement('.widget-element[pn-parent="' + a.attr("id") + '"]'), void 0 != c && c.length > 0 && (b = PN_PAGE.getIndexElement(c.attr("id")), void 0 != b && c.remove());
        else if ("item_form" == a.attr("pn-type")) {
            var e = d.find('.widget-element[pn-type="item_form"]');
            e && 1 == e.length && (c = PN_PAGE.getElement('.widget-element[pn-parent="' + d.attr("id") + '"]'), void 0 != c && c.length > 0 && (b = PN_PAGE.getIndexElement(c.attr("id")), void 0 != b && c.remove()))
        }
    }
},
OptionWiget.prototype.hexToRgba = function (a, b) {
    var c;
    if (a && a.length > 0)
        if (-1 != a.search("rgba")) c = a;
        else if (-1 != a.search("rgb")) {
        var d; - 1 != a.search(",)") ? (d = "1)", c = a.replace(")", d)) : (d = ",1)", c = a.replace(")", d))
    } else {
        a = a.replace("#", "");
        var e = parseInt(a.substring(0, 2), 16),
            f = parseInt(a.substring(2, 4), 16),
            g = parseInt(a.substring(4, 6), 16);
        c = "rgba(" + e + "," + f + "," + g + "," + b + ")"
    }
    return c
},
OptionWiget.prototype.getOpacityOverLay = function (a) {
    if (-1 != a.search("#")) return .5;
    var b = a.split(","),
        c = parseFloat(b[b.length - 1]);
    return c
},
OptionWiget.prototype.getHex = function (a) {
    var a = a;
    if (-1 != a.search("#")) return a;
    var b = a.replace("rgba(", ""),
        c = b.split(","),
        d = "#" + parseFloat(c[0]).toString(16) + parseFloat(c[1]).toString(16) + parseFloat(c[2]).toString(16);
    return d
},
OptionWiget.prototype.resetIdElement = function (a) {
    for (var b, c, d = 0, e = 0; e < a.length; e++) {
        b = new Date;
        var f = a[e].id;
        void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain && (d = dummyData.numLayerMain), a[e].popup && 1 == a[e].popup && "widget_section" == a[e].type_plugin ? (a[e].popup = !0, c = "POPUP" + d) : c = a[e].lang + d, d++, dummyData.numLayerMain = d;
        for (var g = 0; g < a.length; g++) {
            f == a[g].id_parent && (a[g].id_parent = c);
            var h = f + " "; - 1 != a[g].parent.search(h) && (a[g].parent = a[g].parent.replace(f, c)), a[g].idGroup == f && (a[g].idGroup = c)
        }
        a[e].id = c
    }
    return a
},
OptionWiget.prototype.createMapsgoogle = function (a, b, c, d) {
    var e;
    e = new google.maps.Geocoder, e.geocode({
        address: c
    }, function(c, e) {
        if (e == google.maps.GeocoderStatus.OK) {
            var f = new google.maps.Map(a, {
                    zoom: b,
                    center: c[0].geometry.location
                }),
                g = new google.maps.Marker({
                    map: f,
                    position: c[0].geometry.location
                }),
                h = new google.maps.InfoWindow({
                    content: d
                });
            h.open(f, g)
        }
    })
},
OptionWiget.prototype.resetText = function (a) {
    var b = a;
    return b = b.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a"), b = b.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o"), b = b.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e"), b = b.replace(/ù|ú|ụ|ủ|ũ|ừ|ứ|ự|ử|ữ|ư/g, "u"), b = b.replace(/í|ì|ỉ|ị|ĩ/g, "i"), b = b.replace(/ý|ỳ|ỷ|ỵ|ỹ/g, "y"), b = b.replace(/đ/g, "d"), b = b.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "a"), b = b.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ổ|Ộ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "o"), b = b.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "e"), b = b.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ừ|Ứ|Ự|Ử|Ữ|Ư/g, "u"), b = b.replace(/Í|Ì|Ỉ|Ị|Ĩ/g, "i"), b = b.replace(/Ý|Ỳ|Ỷ|Y|Ỹ/g, "y"), b = b.replace(/Đ/g, "d")
},
OptionWiget.prototype.resetID = function (a) {
    var b = a;
    return b = b.replace(/\-/g, "_"), b = b.replace(/\ /g, "_"), b = b.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "A"), b = b.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "O"), b = b.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "E"), b = b.replace(/ù|ú|ụ|ủ|ũ|ừ|ứ|ự|ử|ữ|ư/g, "U"), b = b.replace(/í|ì|ỉ|ị|ĩ/g, "I"), b = b.replace(/ý|ỳ|ỷ|ỵ|ỹ/g, "Y"), b = b.replace(/đ/g, "D"), b = b.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A"), b = b.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ổ|Ộ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O"), b = b.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E"), b = b.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ừ|Ứ|Ự|Ử|Ữ|Ư/g, "U"), b = b.replace(/Í|Ì|Ỉ|Ị|Ĩ/g, "I"), b = b.replace(/Ý|Ỳ|Ỷ|Y|Ỹ/g, "Y"), b = b.replace(/Đ/g, "D")
},
OptionWiget.prototype.createGrid = function () {
    var a, b, c, d, e = $(".item-grid"),
        f = PN_PAGE.getElement(".container:visible").eq(0).outerWidth();
    if (e.css({
            width: f + "px"
        }), e.html(""), f > 320)
        for (var g = 0; 12 > g; g++) a = '<div id="id-item-grid-' + g + '-0" class="item-grid-60 item-grid-snap" style="width: 60px; height: 100%;float: left;background: rgba(6,21,40,1); opacity: 0.1;"></div>', b = '<div id="id-item-grid-' + g + '-1" class="item-grid-20 item-grid-snap" style="width: 10px; height:100%;float: left;background: #ECE9DC; opacity: 0.2;"></div>', e.append(b), e.append(a), b = '<div id="id-item-grid-' + g + '-2" class="item-grid-20 item-grid-snap" style="width: 10px; height:100%;float: left;background: #ECE9DC; opacity: 0.2;"></div>', e.append(b);
    if (320 == f) {
        for (var g = 0; 4 > g; g++) c = '<div id="id-item-grid-' + g + '-0" class="item-grid-65 item-grid-snap" style="width: 65px; height: 100%;float: left;background: rgba(6,21,40,1); opacity: 0.1;"></div>', d = '<div id="id-item-grid-' + g + '-1" class="item-grid-12 item-grid-snap" style="width: 12px; height:100%;float: left;background: #ECE9DC; opacity: 0.2;"></div>', e.append(d), e.append(c);
        e.append(d)
    }
},
OptionWiget.prototype.addSectionEmpty = function (a, b, c, d) {
    var e = $(".resizable-popup");
    if ("none" != e.css("display") && void 0 != e.css("display") && "undefined" != e.css("display")) {
        var f = new AlertPnotify;
        f.createMessage("Không thêm section trắng vào popup!")
    } else {
        var g = $("#punnel-editor .widget-element");
        if (typeAddNew == typeSection && g && g.length > 0) {
            var f = new AlertPnotify;
            f.createMessage("Template section chỉ có section trắng duy nhất!")
        } else {
            var h = (new Date, new AddToFrame),
                i = (new OptionWiget, void 0),
                j = c + topScroll,
                k = PN_PAGE.getElement(".widget-section"),
                l = 0,
                m = "duoi";
            void 0 != k && k.length > 0 && k.each(function() {
                var a = parseFloat($(this).offset().top) + TOP_FRAME,
                    b = parseFloat($(this).outerHeight());
                j > a && a + b / 2 > j && (i = $(this), m = "tren")
            }), PN_PAGE.PUNNEL_EDIT.append(valueTemplate.widget_section);
            var n = PN_PAGE.getElement("#pn-new");
            void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain && (l = dummyData.numLayerMain), "widget-popup" == d ? n.attr("id", "POPUP" + l) : n.attr("id", n.attr("pn-lang") + "" + l), l++, dummyData.numLayerMain = l, a && (void 0 == i || ("tren" == m ? n.insertBefore(i) : n.insertAfter(i))), h.apiDefault("widget_section", "widget_section", n.attr("id"), "", "", "", "100%", "500px"), PN_PAGE.getElement(".selected").removeClass("selected"), selectedItem = PN_PAGE.getElement("#" + n.attr("id")), selectedItem.addClass("selected"), $("#resizable-section").hide(), this.sortWg(), PN_PAGE.getElement(".widget-section").css({
                "border-bottom": "1px dashed rgba(6,21,40,1)"
            }), $(".screen-overlay.section_widget_plugin").hide();
            var o = new ShowBoxResize;
            if ("widget-popup" == d) {
                var p = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[p].popup = !0, apiElement[p].media.desktop.width_container = "600px", apiElement[p].media.mobile.width_container = "100%", apiElement[p].media.desktop.height_container = "400px", apiElement[p].media.mobile.height_container = "400px", apiElement[p].media.desktop["background-color"] = "rgba(255,255,255,1)", apiElement[p].media.mobile["background-color"] = "rgba(255,255,255,1)", selectedItem.attr("pn-popup", "true"), selectedItem.css({
                    height: $(window).outerHeight() + "px"
                }), selectedItem.find(".container").eq(0).css({
                    width: "600px",
                    height: "400px"
                }), o.showBoxSection(selectedItem), $(".secondary-column.widgets").removeClass("active"), $("#CONTENT").scrollTop(0)
            }
            o.showBoxSection(selectedItem), this.fixsizeBody(), this.changeValuePage(), this.addElementUndo("new", selectedItem), this.addElementUndo("", selectedItem)
        }
    }
},
OptionWiget.prototype.createGroup = function () {
    groupElement = [];
    var a = selectedItem.attr("pn-group"),
        b = PN_PAGE.getElement('.widget-element[pn-group="' + a + '"]'),
        c = new AddGroup;
    b.each(function() {
        groupElement.push($(this).attr("id"))
    }), PN_PAGE.getElement('div[pn-type="group-tmp"]').remove(), PN_PAGE.getElement("body").prepend(htmlGroup), PN_PAGE.getElement("#GROUP_TMP").attr("id", a);
    var b = {
        id: a,
        lang: "group",
        lp_type: "widget-element",
        media: {
            desktop: {
                top: selectedItem.css("top"),
                left: selectedItem.css("left"),
                width: selectedItem.css("width"),
                height: selectedItem.css("height")
            },
            mobile: {
                top: selectedItem.css("top"),
                left: selectedItem.css("left"),
                width: selectedItem.css("width"),
                height: selectedItem.css("height")
            }
        },
        mobile: 0,
        type_plugin: "group"
    };
    apiElement.push(b), c.CalculatedGroup(groupElement, PN_PAGE.getElement("#" + a)), selectedItem = PN_PAGE.getElement("#" + a);
    var d = new ShowBoxResize;
    d.showBox(selectedItem), PN_PAGE.getElement("#GROUP_TMP").css({
        width: selectedItem.css("width"),
        height: selectedItem.css("height")
    }), $("#resizable-section").hide()
},
OptionWiget.prototype.getParentSection = function (a) {
    var b = a,
        c = 0;
    if (b && b.hasClass("widget-section")) return b;
    do c++, b = b.parent(); while (!b.hasClass("widget-section") && 50 > c);
    return b
},
OptionWiget.prototype.calulatorAllGroup = function (a) {
    if (deviceEdit == "mobile") return;
    var b = a,
        c = this,
        d = 0;
    do b.hasClass("widget-group") && "GROUP_TMP" != b.attr("id") && c.CalulatorGroup(b), b = b.parent(), d++; while (!b.hasClass("widget-section") && 50 > d)
    },
    OptionWiget.prototype.CalulatorGroup = function (a) {
        var b, c = void 0;
        a.hasClass("widget-group") && "GROUP_TMP" != a.attr("id") ? c = a : "" != a.attr("pn-group") && "undefined" != a.attr("pn-group") && void 0 != a.attr("pn-group") && (c = PN_PAGE.getElement("#" + a.attr("pn-group"))), void 0 != c && "undefined" != c && c.length > 0 && (groupElement = [], b = c.find(".widget-content:eq(0) > .widget-element:visible"), b.length > 0 && b.each(function () {
            $(this) && $(this).length > 0 && "none" != $(this).css("display") && groupElement.push($(this).attr("id"))
        }), groupElement = this.resetArrGroupEle(groupElement))
    },
    OptionWiget.prototype.CalulatorSizeGroup = function (a) {
    if (a && a.length > 0) {
        var inGroup = a.parent().hasClass('container');// || a.hasClass('widget-item-child');
            if ("GROUP" == a.attr("pn-lang") && "GROUP_TMP" != a.attr("id")) {
                var b = a.parent(),
                    c = a.find(".widget-content:first > .widget-element"),
                    d = [];
                c.each(function () {
                    d.push($(this).attr("id"))
                });
                var e = new AddGroup,
                    f = e.getItemTopMin(d),
                    g = e.getItemTopMax(d),
                    h = e.getItemLeftMin(d),
                    i = e.getItemLeftMax(d),
                    j = PN_PAGE.getElement("#" + f),
                    k = PN_PAGE.getElement("#" + g),
                    l = PN_PAGE.getElement("#" + h),
                    m = PN_PAGE.getElement("#" + i),
                    xx = (inGroup==true) ? b.offset().left + 1 : b.offset().left,
                    n = j.offset().top - b.offset().top + "px",
                    o = l.offset().left - xx + "px",
                    p = k.offset().top + k.height() - j.offset().top + "px",
                    q = m.offset().left + m.width() - l.offset().left + "px";
                    c.each(function () {
                        var a = PN_PAGE.getIndexElement($(this).attr("id"));
                        apiElement[a].media[deviceEdit].top = $(this).offset().top - b.offset().top - parseFloat(n) + "px",
                            apiElement[a].media[deviceEdit].left = $(this).offset().left - xx - parseFloat(o) + "px",
                            $(this).css({
                            top: apiElement[a].media[deviceEdit].top,
                            left: apiElement[a].media[deviceEdit].left
                        })
                    }),
                    a.css({
                    top: n,
                    left: o,
                    width: q,
                    height: p
                    }),
                        a.find(".widget-content").eq(0).css({
                    width: q,
                    height: p,
                    outline: "0"
                });
                var r = PN_PAGE.getIndexElement(a.attr("id"));
                apiElement[r].media[deviceEdit].top = n, apiElement[r].media[deviceEdit].left = o, apiElement[r].media[deviceEdit].width = q, apiElement[r].media[deviceEdit].height = p
            }
            if (a.parents(".widget-group").length > 0) {
                var s = a.parents(".widget-group").first();
                this.CalulatorSizeGroup(s)
            }
        }
    },
OptionWiget.prototype.isVal = function (a) {
    return a && a.length > 0 ? !0 : !1
},
OptionWiget.prototype.resetArrGroupEle = function (a) {
    if (void 0 != a && "" != a && a.length > 0)
        for (var b = a.length - 1; b >= 0; b--)(void 0 == a[b] || "undefined" == a[b] || "" == a[b] || void 0 == PN_PAGE.getElement("#" + a[b]) || "undefined" == PN_PAGE.getElement("#" + a[b])) && a.splice(b, 1);
    return a
},
OptionWiget.prototype.scrollBox = function () {
    $(".enscroll-track.track").parent().remove(), $(".scrollbox").unbind("enscroll").enscroll({
        showOnHover: !0,
        verticalTrackClass: "track",
        verticalHandleClass: "handle",
        zIndex: 99999,
        minScrollbarLength: 60
    })
},
OptionWiget.prototype.fixsizeBody = function () {
    1 != preview && PN_PAGE.getElement(".widget-section").css({
        "border-bottom-width": "1px",
        "border-style": "dashed",
        "border-color": "rgb(6, 21, 40)"
    }), topScroll = PN_PAGE.PUNNEL_EDIT.scrollTop()
},
OptionWiget.prototype.setPositionSetting = function () {
    var a;
    if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
        var b = 300,
            c = new Rotate,
            d = selectedItem.offset().left,
            e = c.valueEle(selectedItem).width,
            f = $(".cover").outerWidth();
        a = $(".settings"), d > f - b ? (a.css({
            right: "300px"
        }), a.find(".dialog.settings").css({
            right: "auto"
        })) : d + e > f - b ? f - b - d > b ? (a.css({
            right: "20px"
        }), a.find(".dialog.settings").css({
            right: "auto"
        })) : (a.css({
            right: f - d + "px"
        }), a.find(".dialog.settings").css({
            right: "auto"
        })) : (a.css({
            right: "20px"
        }), a.find(".dialog.settings").css({
            right: "auto"
        }))
    } else a = $(".settings"), a.css({
        right: "20px"
    }), a.find(".dialog.settings").css({
        right: "auto"
    })
},
OptionWiget.prototype.changeValuePage = function () {
    dummyData.apiElement = apiElement
},
OptionWiget.prototype.showHideElementDefault = function () {
    if ("desktop" == deviceEdit) {
        PN_PAGE.getElement(".widget-element").hide(), PN_PAGE.getElement('.widget-element[pn-display="block"]').show(), PN_PAGE.getElement('.widget-element[pn-display="table"]').css({
            display: "table"
        }), PN_PAGE.getElement(".widget-section").hide(), $('.topbar .mtab li[pn-active="popup"]').hasClass("active") ? PN_PAGE.getElement('.widget-section[pn-display="block"][pn-popup="true"]').show() : (PN_PAGE.getElement('.widget-section[pn-display="block"]').show(),
            PN_PAGE.getElement('.widget-element[pn-display="table"]').css({
                display: "table"
            }), PN_PAGE.getElement('.widget-section[pn-popup="true"]').hide());
        var a = PN_PAGE.getElement(".widget-item-child");
        if (void 0 != a && a.length > 0 && a.each(function() {
                var a = PN_PAGE.getIndexElement($(this).attr("id")),
                    b = apiElement[a].media[deviceEdit].display;
                void 0 != b && "undefined" != b && "" != b && ("none" == b ? $(this).css({
                    visibility: "hidden"
                }) : $(this).css({
                    display: b
                }))
            }), 30 == typeAddNew) {
            var b = new ShowBoxResize;
            selectedItem = $('#punnel-editor .widget-section[pn-popup="true"]').eq(0), selectedItem.show(), b.showBoxSection(selectedItem)
        }
    }
},
OptionWiget.prototype.resetValueHeightText = function (a) {
    if (a && a.length > 0) {
        var b, c = $("#resizable-element"),
            d = a.attr("pn-type"),
            e = $(".editor-text"),
            f = a.find(".widget-content").eq(0)[0].outerHTML;
        if (e.html(f), b = e.find(".widget-content").eq(0), b.css({
                height: ""
            }), ("textinline" == d || "textparagraph" == d || "textsymbol" == d || "button" == d || "listop" == d) && void 0 != b && b.length > 0) {
            "button" != d && a.css({
                height: ""
            }), a.find(".widget-content").eq(0).css({
                height: ""
            });
            var g = new Rotate,
                h = g.valueEle(a.find(".widget-content").eq(0)).height;
            if (h >= 10) {
                c.css({
                    height: h + "px"
                }), a.css({
                    height: h + "px"
                }), a.find(".widget-content:eq(0)").css({
                    height: h + "px"
                });
                var i = PN_PAGE.getIndexElement(a.attr("id"));
                if (apiElement[i].media[deviceEdit].height = h + "px", apiElement[i].media.mobile.height = h + "px", "desktop" == deviceEdit) {
                    var j = new SortElementMobile;
                    j.resetSortElementDelete(a), apiElement[i].sortmobile = 0, apiElement[i].mobile = 0, PN_PAGE.sortMobilePublish = 1
                }
                addElementWhenResize(a)
            }
        }
    }
},
OptionWiget.prototype.resetWidgetItemChild = function (a) {
    if (void 0 != a && a.length > 0 && a.hasClass("widget-element")) {
        var b = void 0;
        b = a.hasClass("widget-item-child") ? a.parent().parent() : a;
        var c = b.attr("pn-type");
        if ("contact_form" == c || "menu-header" == c && "desktop" == deviceEdit || "menu-header" == c && "true" != b.attr("pn-navigation")) {
            var d = b.find(".widget-content:eq(0) .widget-item-child");
            if (void 0 != d && d.length > 0) {
                var inGroup = a.parent().hasClass('container') || a.hasClass('widget-item-child');
                var e = this.getitemLeftMinWgChild(b),
                    f = this.getitemLeftMaxWgChild(b),
                    g = this.getitemTopMinWgChild(b),
                    h = this.getitemTopMaxWgChild(b),
                    i = b.offset().left - e,
                    j = b.offset().top - g,
                    xx = (deviceEdit == 'desktop' && inGroup==true) ? b.parent().offset().left + 1 : b.parent().offset().left;
                b.css({
                    top: g - b.parent().offset().top + "px",
                    left: e - xx + "px",
                    width: f - e + "px",
                    height: h - g + "px"
                }), b.find(".widget-content:eq(0)").css({
                    width: f - e + "px",
                    height: h - g + "px"
                });
                var k = PN_PAGE.getIndexElement(b.attr("id"));
                apiElement[k].media[deviceEdit].top = b.css("top"),
                    apiElement[k].media[deviceEdit].left = b.css("left"),
                    apiElement[k].media[deviceEdit].width = b.css("width"),
                    apiElement[k].media[deviceEdit].height = b.css("height"),

                    d.each(function () {
                    $(this).css({
                        top: parseFloat($(this).css("top")) + j + "px",
                        left: parseFloat($(this).css("left")) + i + "px"
                    }), k = PN_PAGE.getIndexElement($(this).attr("id")),
                        apiElement[k].media[deviceEdit].top = $(this).css("top"),
                        apiElement[k].media[deviceEdit].left = $(this).css("left")
                })
            }
        }
    }
},
OptionWiget.prototype.getitemLeftMinWgChild = function (a) {
    var b = 0;
    if (void 0 != a && a.length > 0) {
        var c = a.find(".widget-content:eq(0) .widget-item-child");
        void 0 != c && c.length > 0 && (b = c.eq(0).offset().left, c.each(function() {
            b > $(this).offset().left && (b = $(this).offset().left)
        }))
    }
    return b
},
OptionWiget.prototype.getitemTopMinWgChild = function (a) {
    var b = 0;
    if (void 0 != a && a.length > 0) {
        var c = a.find(".widget-content:eq(0) .widget-item-child");
        void 0 != c && c.length > 0 && (b = c.eq(0).offset().top, c.each(function() {
            b > $(this).offset().top && (b = $(this).offset().top)
        }))
    }
    return b
},
OptionWiget.prototype.getitemTopMaxWgChild = function (a) {
    var b = 0,
        c = new Rotate;
    if (void 0 != a && a.length > 0) {
        var d = a.find(".widget-content:eq(0) .widget-item-child");
        void 0 != d && d.length > 0 && (b = d.eq(0).offset().top + c.valueEle(d.eq(0)).height, d.each(function() {
            b < $(this).offset().top + c.valueEle($(this)).height && (b = $(this).offset().top + c.valueEle($(this)).height)
        }))
    }
    return b
},
OptionWiget.prototype.getitemLeftMaxWgChild = function (a) {
    var b = 0,
        c = new Rotate;
    if (void 0 != a && a.length > 0) {
        var d = a.find(".widget-content:eq(0) .widget-item-child");
        void 0 != d && d.length > 0 && (b = d.eq(0).offset().left + c.valueEle(d.eq(0)).width, d.each(function() {
            b < $(this).offset().left + c.valueEle($(this)).width && (b = $(this).offset().left + c.valueEle($(this)).width)
        }))
    }
    return b;
},
OptionWiget.prototype.getParentElement = function (a) {
    if (void 0 != a && a.length > 0) {
        for (var b = a.parent(), c = 0; !b.hasClass("widget-element") && 20 > c && !b.hasClass("widget-section");) b = b.parent(), c++;
        return b
    }
},
OptionWiget.prototype.addElementUndo = function (a, b) {
    if (void 0 != b && b.length > 0) {
        var c = $.extend(!0, {}, ctrlZElement[deviceEdit][pageSelect][vitriUndo]);
        this.resetArrUndo();
        var d = PN_PAGE.getIndexElement(b.attr("id")),
            e = [],
            f = $.extend(!0, {}, apiElement[d]),
            g = b.find(".widget-element");
        void 0 != g && g.length > 0 && g.each(function() {
            var a = PN_PAGE.getIndexElement($(this).attr("id")),
                b = $.extend(!0, {}, apiElement[a]);
            e.push(b)
        });
        var h = PN_PAGE.getElement('.widget-element[pn-parent="' + b.attr("id") + '"]');
        if (void 0 != h && h.length > 0) {
            var i = PN_PAGE.getIndexElement(h.attr("id")),
                j = $.extend(!0, {}, apiElement[i]);
            e.push(j)
        }
        if ("GROUP_TMP" == b.attr("id") && groupElement.length > 0)
            for (var k = 0; k < groupElement.length; k++) {
                var i = PN_PAGE.getIndexElement(groupElement[k]),
                    j = $.extend(!0, {}, apiElement[i]);
                e.push(j)
            }
        var l = void 0;
        b.hasClass("widget-section") && (l = PN_PAGE.getElement(".widget-section").index(b));
        var m = ctrlZElement[deviceEdit][pageSelect].length - 1,
            n = $.extend(!0, {}, ctrlZElement[deviceEdit][pageSelect][m]),
            o = {
                id: b.attr("id"),
                apiChild: e,
                api: f,
                vitri: l,
                status: a
            };
        m > 0 && o.id == n.id && JSON.stringify(o) === JSON.stringify(n) || (o.id == c.id && JSON.stringify(o) == JSON.stringify(c) ? (ctrlZElement[deviceEdit][pageSelect].splice(vitriUndo, 0, o), ctrlZElement[deviceEdit][pageSelect].length > 50 && ctrlZElement[deviceEdit][pageSelect].splice(0, 1)) : (ctrlZElement[deviceEdit][pageSelect].splice(vitriUndo + 1, m - vitriUndo), ctrlZElement[deviceEdit][pageSelect].push(o), ctrlZElement[deviceEdit][pageSelect].length > 50 && ctrlZElement[deviceEdit][pageSelect].splice(0, 1), vitriUndo = ctrlZElement[deviceEdit][pageSelect].length - 1))
    }
},
OptionWiget.prototype.resetArrUndo = function () {
    for (var a = ctrlZElement[deviceEdit][pageSelect].length - 1, b = a; b > 0; b--) {
        var c = ctrlZElement[deviceEdit][pageSelect][b],
            d = ctrlZElement[deviceEdit][pageSelect][b - 1];
        if (c.id == d.id && JSON.stringify(c) == JSON.stringify(d)) ctrlZElement[deviceEdit][pageSelect].splice(b, 1);
        else {
            var e = PN_PAGE.getIndexElement(c.id),
                f = $.extend(!0, {}, apiElement[e]);
            c.id == d.id && JSON.stringify(c.api) == JSON.stringify(f) && ctrlZElement[deviceEdit][pageSelect].splice(b, 1)
        }
    }
},
OptionWiget.prototype.getIdElementOnScreen = function () {
    if (PN_PAGE.PUNNEL_EDIT && PN_PAGE.PUNNEL_EDIT.offset()) {
        for (var a = [], b = topScroll - PN_PAGE.PUNNEL_EDIT.offset().top, c = $(window).outerHeight(), d = apiElement.length, e = 0; d > e; e++) {
            var f = PN_PAGE.getElement("#" + apiElement[e].id);
            if (f.is(":visible")) {
                var g = f.offset().top,
                    h = f.outerHeight();
                g >= b + c || b >= g + h || (f.hasClass("important") ? a.unshift(apiElement[e].id) : a.push(apiElement[e].id))
            }
        }
        return a
    }
},
OptionWiget.prototype.showPropertiesElement = function(cmd) {
    if (selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
        var type = selectedItem.attr("pn-type");
        $('.settings[pn-setting!="custom-event"]').removeClass("active");
        $('.settings[pn-setting="custom-event"] .item.advanced').hide();
        for (var i = 0; i < advanceSetting[type].length; i++) {
            $('.item.advanced[pn-setting="' + advanceSetting[type][i] + '"]').show();
        }
        if ("menu-header" == selectedItem.attr("pn-type") && "desktop" != deviceEdit && "true" == selectedItem.attr("pn-navigation")) {
            $(".item.advanced").hide();
            $('.item.advanced[pn-setting="mobile-menu-setting"]').show();
        } else {
            $('.item.advanced[pn-setting="mobile-menu-setting"]').hide();
        }
        $('.settings[pn-setting="custom-event"]').addClass("active");
        if ("setting" == cmd) {
            if ("item_form" == selectedItem.attr("pn-type")) {
                $('.settings[pn-setting="custom-event"]').removeClass("active");
                $scope.showEditItemForm();
            } else {
                $('.settings[pn-setting="custom-event"] .event-tab .button').removeClass("active");
                $('.settings[pn-setting="custom-event"] .event-tab .button[pn-active="list-position"]').addClass("active");
                $('.settings[pn-setting="custom-event"] .list-tab-event').hide();
                $('.settings[pn-setting="custom-event"] .list-tab-event[pn-content="list-position"]').show();
                $('.settings[pn-setting="custom-event"] .list-tab-event[pn-content="list-position"] .item').show();
                $('.settings[pn-setting="custom-event"]').addClass("active");
            }
        }
        if ("edit" == cmd) {
            $('.settings[pn-setting="custom-event"] .event-tab .button').removeClass("active");
            $('.settings[pn-setting="custom-event"] .event-tab .button[pn-active="list"]').addClass("active");
            $('.settings[pn-setting="custom-event"] .list-tab-event').hide();
            $('.settings[pn-setting="custom-event"] .list-tab-event[pn-content="list"]').show();
            $('.settings[pn-setting="custom-event"]').addClass("active");
        }
        if ("textinline" == type || "button" == type || "textsymbol" == type || "textparagraph" == type) {
            $('.item[pn-setting="custom-text-dbclick"]').hide();
        }
        var editor = new OptionWiget;
        var item = editor.getParentElement(selectedItem);
        console.log(item);
        if (!item.hasClass("widget-section")) {
            $(".aside-setting .widget-item.custom-sticky").hide();
        }
    }
},
OptionWiget.prototype.setValueFrameToScroll = function () {
    var a, b = $(".punnel-scroll").outerHeight() - 100,
        c = PN_PAGE.PUNNEL_EDIT.outerHeight() - $(window).outerHeight(),
        d = PN_PAGE.PUNNEL_EDIT.scrollTop();
    a = 0 >= c ? 0 : d / c * b, $(".punnel-scroll-child").css({
        top: a + "px"
    }), $("#resizable-section").hide(), $("#resizable-element").hide(), $("#RIGHT_MOUSE .box_right_mouse").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide()
},
OptionWiget.prototype.showButtonAddSection = function () {
    var a = $(".punnel-scroll").outerHeight(),
        b = parseFloat($(".punnel-scroll-child").css("top")) + 100;
    Math.abs(a - b) <= 5 ? ($(".button-par-add-new-section-empty").show(), $(".button-par-add-new-section-empty .button-chil-add-new-section-empty").css({
        color: "#ccc"
    })) : $(".button-par-add-new-section-empty").hide()
},
OptionWiget.prototype.setValueNewItem = function (a) {
    var b = this.getParentElement(a);
    if (b.hasClass("widget-element")) {
        var c = PN_PAGE.getIndexElement(b.attr("id")),
            d = PN_PAGE.getIndexElement(a.attr("id"));
        "menu-header" == b.attr("pn-type") && (apiElement[d].media.desktop["background-color"] = apiElement[c].media.items["background-color"], apiElement[d].media.mobile["background-color"] = apiElement[c].media.items["background-color"], apiElement[d].media.desktop.color = apiElement[c].media.items.color, apiElement[d].media.mobile.color = apiElement[c].media.items.color, apiElement[d].media.desktop["font-size"] = apiElement[c].media["" + deviceEdit]["font-size"], apiElement[d].media.mobile["font-size"] = apiElement[c].media["" + deviceEdit]["font-size"], apiElement[d].media.desktop["text-align"] = apiElement[c].media[deviceEdit].item_text_align, apiElement[d].media.mobile["text-align"] = apiElement[c].media[deviceEdit].item_text_align, apiElement[d].media.font_family = apiElement[c].media.font_family, apiElement[d].media.font_weight = apiElement[c].media.font_weight_item, apiElement[d].media.font_style = apiElement[c].media.font_style_item), "contact_form" == b.attr("pn-type") && (apiElement[d].media.desktop["background-color"] = apiElement[c].media.background_input_color, apiElement[d].media.placeholderColor = apiElement[c].media.placeholderColor, apiElement[d].media.desktop.color = apiElement[c].media.color_value, apiElement[d].media.mobile.color = apiElement[c].media.color_value), apiElement[d].media.desktop["border-top-left-radius"] = apiElement[c].media.desktop["border-top-left-radius"], apiElement[d].media.desktop["border-top-right-radius"] = apiElement[c].media.desktop["border-top-right-radius"], apiElement[d].media.desktop["border-bottom-left-radius"] = apiElement[c].media.desktop["border-bottom-left-radius"], apiElement[d].media.desktop["border-bottom-right-radius"] = apiElement[c].media.desktop["border-bottom-right-radius"], apiElement[d].media.mobile["border-top-left-radius"] = apiElement[c].media.mobile["border-top-left-radius"], apiElement[d].media.mobile["border-top-right-radius"] = apiElement[c].media.mobile["border-top-right-radius"], apiElement[d].media.mobile["border-bottom-left-radius"] = apiElement[c].media.mobile["border-bottom-left-radius"], apiElement[d].media.mobile["border-bottom-right-radius"] = apiElement[c].media.mobile["border-bottom-right-radius"], apiElement[d].media.desktop["border-bottom"] = apiElement[c].media.desktop["border-bottom"], apiElement[d].media.desktop["border-left"] = apiElement[c].media.desktop["border-left"], apiElement[d].media.desktop["border-top"] = apiElement[c].media.desktop["border-top"], apiElement[d].media.desktop["border-right"] = apiElement[c].media.desktop["border-right"], apiElement[d].media.mobile["border-bottom"] = apiElement[c].media.mobile["border-bottom"], apiElement[d].media.mobile["border-left"] = apiElement[c].media.mobile["border-left"], apiElement[d].media.mobile["border-top"] = apiElement[c].media.mobile["border-top"], apiElement[d].media.mobile["border-right"] = apiElement[c].media.mobile["border-right"], apiElement[d].media.desktop["border-style"] = apiElement[c].media.desktop["border-style"], apiElement[d].media.desktop["border-color"] = apiElement[c].media.desktop["border-color"], apiElement[d].media.mobile["border-style"] = apiElement[c].media.mobile["border-style"], apiElement[d].media.mobile["border-color"] = apiElement[c].media.mobile["border-color"];
        var e = new setStyleElement;
        e.setStyleItem(apiElement[d], deviceEdit)
    }
},
OptionWiget.prototype.resetImageMobile = function (a) {
    if (void 0 != a && a.length > 0 && "image" == a.attr("pn-type")) {
        var b = PN_PAGE.getIndexElement(a.attr("id"));
        if (1 != apiElement[b].sortmobile && parseFloat(apiElement[b].media.desktop.width) > 320 && "desktop" == deviceEdit) {
            var c = parseFloat(apiElement[b].media.desktop.height),
                d = 320 / parseFloat(apiElement[b].media.desktop.width),
                e = c * d + "px";
            apiElement[b].media.mobile.height = e
        }
    }
    },
    OptionWiget.prototype.editextElement = function () {
        var a = $(".editor-text").find(".widget-content").eq(0);
        a.unbind("keydown").keydown(function (a) {
            var b = $("#" + $(".editor-text").attr("pn-id"));
            if (b.css({
                visibility: "hidden"
            }), 13 === a.keyCode) {
                if (b && "listop" == b.attr("pn-type")) return $(".editor-text > .widget-content").focus(), !0;
                var c = window.getSelection();
                return c.anchorNode && c.anchorNode.length > c.anchorOffset ? document.execCommand("insertHTML", !1, "<br>") : document.execCommand("insertHTML", !1, "<br><br>"), !1
            }
            var d = $(".editor-text").find(".widget-content").eq(0),
                e = d.html(),
                f = PN_PAGE.getIndexElement(b.attr("id"));
            d.css({
                height: ""
            }), apiElement[f].text = e, b.find(".widget-content").eq(0).attr("contenteditable", "true").html(e);
            var g = b.find(".widget-content").eq(0).outerWidth() + "px";
            apiElement[f].media[deviceEdit].width = g, $(".editor-text").css({
                width: g
            });
            var h = d.outerHeight() + "px";
            parseFloat(d.outerHeight()) > 10 && (d.css({
                width: g,
                height: h
            }), apiElement[f].media[deviceEdit].height = h, b.css({
                width: g,
                height: h
            }), b.find(".widget-content").eq(0).css({
                width: g,
                height: h
            }), $("#resizable-element").css({
                height: h
            }), $(".iframe-content .selected").removeClass("selected"), apiElement[f].sortmobile = 0, apiElement[f].mobile = 0, selectedItem = void 0)
        }), a.unbind("keyup").keyup(function (a) {
            var b = $(".editor-text").find(".widget-content").eq(0),
                c = $("#" + $(".editor-text").attr("pn-id")),
                d = b.html(),
                e = PN_PAGE.getIndexElement(c.attr("id"));
            b.css({
                height: ""
            }), apiElement[e].text = d, c.find(".widget-content").eq(0).attr("contenteditable", "true").html(d);
            var f = c.find(".widget-content").eq(0).outerWidth() + "px";
            apiElement[e].media[deviceEdit].width = f, $(".editor-text").css({
                width: f
            });
            var g = b.outerHeight() + "px";
            parseFloat(b.outerHeight()) > 10 && (b.css({
                width: f,
                height: g
            }), apiElement[e].media[deviceEdit].height = g, c.css({
                width: f,
                height: g
            }), c.find(".widget-content").eq(0).css({
                width: f,
                height: g
            }), $(".iframe-content .selected").removeClass("selected"), apiElement[e].sortmobile = 0, apiElement[e].mobile = 0, selectedItem = void 0);
            var h = window.getSelection().toString();
            h.length > 0 && $(this).text().length >= h.length ? ($(".widget-item.custom-editor-text").show(), $(".widget-item.custom-text").hide()) : ($(".widget-item.custom-editor-text").hide(), $(".widget-item.custom-text").show())
        }), a.unbind("mouseup").mouseup(function (a) {
            var b = window.getSelection().toString();
            if (b.length > 0 && $(this).text().length >= b.length) {
                $(".widget-item.custom-editor-text").show(), $(".widget-item.custom-text").hide();
                var c = window.getSelection().focusNode.parentNode,
                    d = $(c).css("color"),
                    e = $(".custom-editor-text .pn-color-editor-text"),
                    f = $(c).attr("href");
                $(".custom-editor-text .edit-text-link").val(f), e.val(d), e.parent().find("span span").css({
                    "background-color": d
                })
            } else $(".widget-item.custom-editor-text").hide(), $(".widget-item.custom-text").show(), $(".aside-setting .widget-item:visible").eq(0).find(".widget-title i").addClass("ion-arrow-down-b").removeClass("ion-arrow-right-b"), $(".aside-setting .widget-item:visible").eq(0).find(".group-content-setting").addClass("show-opt-setting");
            $("#resizable-element").hide();
            var g = new saveAndRestoreRange;
            g.saveRange(), saveSelection()
        }), a.unbind("mousedown").mousedown(function (a) {
            var b = new saveAndRestoreRange;
            b.saveRange(), saveSelection(), $("#resizable-element").hide()
        })
    },
//OptionWiget.prototype.editextElement = function () {
//    var a = $(".editor-text").find(".widget-content").eq(0);
//    new Rotate;
//    a.unbind("keydown").keydown(function(a) {
//        var b = $("#" + $(".editor-text").attr("pn-id"));
//        if (b.css({
//                visible: "hidden"
//            }), 13 === a.keyCode) {
//            if (b && "listop" == b.attr("pn-type")) return $(".editor-text > .widget-content").focus(), !0;
//            var c = window.getSelection();
//            return c.anchorNode && c.anchorNode.length > c.anchorOffset ? document.execCommand("insertHTML", !1, "<br>") : document.execCommand("insertHTML", !1, "<br><br>"), !1
//        }
//        var d = $(".editor-text").find(".widget-content").eq(0),
//            e = d.html(),
//            f = PN_PAGE.getIndexElement(b.attr("id"));
//        d.css({
//            height: ""
//        }), apiElement[f].text = e, b.find(".widget-content").eq(0).attr("contenteditable", "true").html(e);
//        var g = b.find(".widget-content").eq(0).outerWidth() + "px";
//        apiElement[f].media[deviceEdit].width = g, $(".editor-text").css({
//            width: g
//        });
//        var h = d.outerHeight() + "px";
//        parseFloat(d.outerHeight()) > 10 && (d.css({
//            width: g,
//            height: h
//        }), apiElement[f].media[deviceEdit].height = h, b.css({
//            width: g,
//            height: h
//        }), b.find(".widget-content").eq(0).css({
//            width: g,
//            height: h
//        }), addElementWhenResize(b), $("#resizable-element").css({
//            height: h
//        }), $(".iframe-content .selected").removeClass("selected"), apiElement[f].sortmobile = 0, apiElement[f].mobile = 0, selectedItem = void 0)
//    }), a.unbind("keyup").keyup(function(a) {
//        var b = $(".editor-text").find(".widget-content").eq(0),
//            c = $("#" + $(".editor-text").attr("pn-id")),
//            d = b.html(),
//            e = PN_PAGE.getIndexElement(c.attr("id"));
//        b.css({
//            height: ""
//        }), apiElement[e].text = d, c.find(".widget-content").eq(0).attr("contenteditable", "true").html(d);
//        var f = c.find(".widget-content").eq(0).outerWidth() + "px";
//        apiElement[e].media[deviceEdit].width = f, $(".editor-text").css({
//            width: f
//        });
//        var g = b.outerHeight() + "px";
//        parseFloat(b.outerHeight()) > 10 && (b.css({
//            width: f,
//            height: g
//        }), apiElement[e].media[deviceEdit].height = g, c.css({
//            width: f,
//            height: g
//        }), c.find(".widget-content").eq(0).css({
//            width: f,
//            height: g
//        }), addElementWhenResize(c), $(".iframe-content .selected").removeClass("selected"), apiElement[e].sortmobile = 0, apiElement[e].mobile = 0, selectedItem = void 0);
//        var h = window.getSelection().toString();
//        h.length > 0 && $(this).text().length > h.length ? ($(".widget-item.custom-editor-text").show(), $(".widget-item.custom-text").hide()) : ($(".widget-item.custom-editor-text").hide(), $(".widget-item.custom-text").show())
//    }), a.unbind("mouseup").mouseup(function(a) {
//        var b = window.getSelection().toString();
//        if (b.length > 0 && $(this).text().length > b.length) {
//            $(".widget-item.custom-editor-text").show(), $(".widget-item.custom-text").hide();
//            var c = window.getSelection().focusNode.parentNode,
//                d = $(c).css("color"),
//                e = $(".custom-editor-text .pn-color-editor-text"),
//                f = $(c).attr("href");
//            $(".custom-editor-text .edit-text-link").val(f), e.val(d), e.parent().find("span span").css({
//                "background-color": d
//            })
//        } else $(".widget-item.custom-editor-text").hide(), $(".widget-item.custom-text").show(), $(".aside-setting .widget-item:visible").eq(0).find(".widget-title i").addClass("ion-arrow-down-b").removeClass("ion-arrow-right-b"), $(".aside-setting .widget-item:visible").eq(0).find(".group-content-setting").show();
//        $("#resizable-element").hide();
//        var g = new saveAndRestoreRange;
//        g.saveRange(), saveSelection()
//    }), a.unbind("mousedown").mousedown(function(a) {
//        var b = new saveAndRestoreRange;
//        b.saveRange(), saveSelection(), $("#resizable-element").hide()
//    })
//},
OptionWiget.prototype.sapXepAnHienMobile = function (a) {
    var b, c = new OptionWiget;
    b = a.hasClass("widget-section") ? a : c.getParentSection(a);
    var d = new ResizeSection;
    d.setHeightSection(b);
    var e = new ShowBoxResize;
    e.showBoxSection(b)
};