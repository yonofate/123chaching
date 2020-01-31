var SortElementMobile = function() {};
SortElementMobile.prototype.init = function () { },
SortElementMobile.prototype.sortItem = function () {
    for (var a, b = dummyData.viewport.size_mobile, c = 0; c < apiElement.length; c++) {
        var d;
        if (apiElement[c] && apiElement[c].id && apiElement[c].id.length > 0 && (d = PN_PAGE.getElement("#" + apiElement[c].id)), d && "none" != d.css("display"))
            if (("textinline" == d.attr("pn-type") || "textparagraph" == d.attr("pn-type") || "button" == d.attr("pn-type") || "listop" == d.attr("pn-type") || "textsymbol" == d.attr("pn-type")) && (void 0 != apiElement[c].media[deviceEdit]["font-size"] && d.find(".widget-content").eq(0).css({
                    "font-size": apiElement[c].media[deviceEdit]["font-size"]
                }), 1 != apiElement[c].sortmobile && this.resetValueHeightText(d), d.css({
                    height: apiElement[c].media.mobile.height
                }), "item_slider" == d.attr("pn-type") ? d.find(".widget-content").eq(0).css({
                    height: "100%"
                }) : d.find(".widget-content").eq(0).css({
                    height: apiElement[c].media.mobile.height
                })), "menu_header" == apiElement[c].type_plugin && (this.isVal(apiElement[c].media[deviceEdit].icon_color) && d.find(".menuMobile svg").css({
                    fill: apiElement[c].media[deviceEdit].icon_color
                }), this.isVal(apiElement[c].media[deviceEdit].icon_bg_color) && d.find(".menuMobile svg").css({
                    background: apiElement[c].media[deviceEdit].icon_bg_color
                }), this.isVal(apiElement[c].media[deviceEdit].icon_border_color && this.isVal(apiElement[c].media[deviceEdit].icon_border_width)) && d.find(".menuMobile svg").css({
                    border: apiElement[c].media[deviceEdit].icon_border_width + " solid " + apiElement[c].media[deviceEdit].icon_border_color
                }), this.isVal(apiElement[c].media[deviceEdit].icon_radius_width) && d.find(".menuMobile svg").css({
                    "border-radius": apiElement[c].media[deviceEdit].icon_radius_width
                })), "true" == d.attr("pn-navigation") || "item_menu" == d.attr("pn-type")) {
                var e = apiElement[c].media.mobile.top,
                    f = apiElement[c].media.mobile.left,
                    g = apiElement[c].media.mobile.width,
                    h = apiElement[c].media.mobile.height;
                d.css({
                    top: e,
                    left: f,
                    width: g,
                    height: h
                }), d.find(".widget-content").eq(0).css({
                    width: g,
                    height: h
                })
            } else if (d.hasClass("widget-element"))
            if (void 0 != apiElement[c].media[deviceEdit]["font-size"] && d.find(".widget-content").eq(0).css({
                    "font-size": apiElement[c].media[deviceEdit]["font-size"]
                }), void 0 != apiElement[c].media[deviceEdit]["text-align"] && d.css({
                    "text-align": apiElement[c].media[deviceEdit]["text-align"]
                }), void 0 != apiElement[c].media.mobile.line_spacing && "mobile" == deviceEdit && d.find(".widget-content").eq(0).css({
                    "line-height": apiElement[c].media.mobile.line_spacing
                }), "vertical" == apiElement[c].media[deviceEdit].item_vertical ? d.attr("pn-direction", apiElement[c].media[deviceEdit].item_vertical) : d.attr("pn-direction", ""), this.isVal(apiElement[c].media[deviceEdit].display) && d.css({
                    display: apiElement[c].media[deviceEdit].display
                }), "image" == d.attr("pn-type") && parseFloat(apiElement[c].media.desktop.width) > b && (d.css({
                    height: apiElement[c].media.mobile.height
                }), d.find(".widget-content").eq(0).css({
                    height: apiElement[c].media.mobile.height
                })), 1 != apiElement[c].sortmobile) {
                a = new OptionWiget;
                var i = a.getParentElement(d);
                if (i.hasClass("widget-element"))
                    if (parseFloat(d.css("width")) > parseFloat(i.css("width"))) d.css({
                        width: i.css("width"),
                        left: "0px"
                    }), "item_slider" == d.attr("pn-type") ? d.find(".widget-content").eq(0).css({
                        width: "100%"
                    }) : d.find(".widget-content").eq(0).css({
                        width: i.css("width")
                    });
                    else {
                        var j = PN_PAGE.getIndexElement(i.attr("id"));
                        parseFloat(apiElement[j].media.desktop.width) > b ? d.css({
                            left: (parseFloat(i.css("width")) - parseFloat(d.css("width"))) / 2 + "px"
                        }) : (d.css({
                            top: apiElement[c].media.desktop.top,
                            left: apiElement[c].media.desktop.left,
                            width: apiElement[c].media.desktop.width,
                            height: apiElement[c].media.desktop.height
                        }), apiElement[c].sortmobile = 1, apiElement[c].mobile = 1), "item_slider" == d.attr("pn-type") && d.css({
                            left: "0px",
                            width: i.css("width")
                        })
                    }
                else parseFloat(d.css("width")) > b ? (d.css({
                    width: "355px",
                    left: "10px"
                }), "item_slider" == d.attr("pn-type") ? d.find(".widget-content").eq(0).css({
                    width: "100%"
                }) : d.find(".widget-content").eq(0).css({
                    width: "355px"
                })) : d.css({
                    left: (b - parseFloat(d.css("width"))) / 2 + "px"
                });
                apiElement[c].media.mobile.width = d.css("width"), apiElement[c].media.mobile.left = d.css("left"), 1 != apiElement[c].sortmobile && this.resetValueHeightText(d)
            } else {
                var e = apiElement[c].media.mobile.top,
                    f = apiElement[c].media.mobile.left,
                    g = apiElement[c].media.mobile.width,
                    h = apiElement[c].media.mobile.height;
                d.css({
                    top: e,
                    left: f,
                    width: g,
                    height: h
                }), "item_slider" == d.attr("pn-type") ? d.find(".widget-content").eq(0).css({
                    width: "100%",
                    height: "100%"
                }) : d.find(".widget-content").eq(0).css({
                    width: g,
                    height: h
                })
            }
        else if ("true" == d.attr("pn-popup")) {
            d.css({
                width: "100%",
                height: $(window).outerHeight() + "px"
            });
            var k = d.find(".container");
            this.isVal(apiElement[c].media[deviceEdit].width_container) ? k.css({
                width: apiElement[c].media[deviceEdit].width_container
            }) : k.css({
                width: dummyData.viewport.size_desktop + "px"
            }), this.isVal(apiElement[c].media[deviceEdit].height_container) ? k.css({
                height: apiElement[c].media[deviceEdit].height_container
            }) : k.css({
                height: "500px"
            })
        } else d.css({
            height: apiElement[c].media[deviceEdit].height
        })
    }
    for (var c = 0; c < apiElement.length; c++)
        if ("slider" == apiElement[c].type_plugin) {
            var l = $("#" + apiElement[c].id),
                m = l.find('.widget-element[pn-type="item_slider"]');
            m.hide(), m.eq(0).show()
        }
    var n = void 0;
    if (n = dummyData.saveMobileMain, 1 != n) {
        dummyData.saveMobileMain = 1;
        var o = PN_PAGE.getElement(".widget-section");
        o.each(function() {
            var a = new ResizeSection;
            a.setHeightSection($(this))
        })
    }
},
SortElementMobile.prototype.setCssElement = function (a) {
    for (var b = 0; b < apiElement.length; b++) {
        var c = PN_PAGE.getElement("#" + apiElement[b].id);
        if (c.hasClass("widget-element") ? (this.isVal(apiElement[b].usingTopButon) || this.isVal(apiElement[b].usingLeftRight) ? (c.css({
                position: "fixed"
            }), "top" == apiElement[b].usingTopButon ? c.css({
                top: apiElement[b].fixedTop,
                bottom: ""
            }) : c.css({
                top: "",
                bottom: apiElement[b].fixedBottom
            }), "left" == apiElement[b].usingLeftRight ? c.css({
                left: apiElement[b].fixedLeft,
                right: ""
            }) : c.css({
                left: "",
                right: apiElement[b].fixedRight
            })) : c.css({
                top: apiElement[b].media["" + a].top,
                left: apiElement[b].media["" + a].left
            }), c.css({
                width: apiElement[b].media["" + a].width,
                height: apiElement[b].media["" + a].height
            }), c.find(".widget-content").eq(0).css({
                width: apiElement[b].media["" + a].width,
                height: apiElement[b].media["" + a].height
            }), void 0 != apiElement[b].media[a]["font-size"] && c.find(".widget-content").eq(0).css({
                "font-size": apiElement[b].media["" + a]["font-size"]
            }), void 0 != apiElement[b].media[a]["text-align"] && c.css({
                "text-align": apiElement[b].media[a]["text-align"]
            }), apiElement[b].line_spacing && c.find(".widget-content").eq(0).css({
                "line-height": apiElement[b].line_spacing
            }), "vertical" == apiElement[b].media[deviceEdit].item_vertical ? c.attr("pn-direction", apiElement[b].media[deviceEdit].item_vertical) : c.attr("pn-direction", ""), this.isVal(apiElement[b].media[deviceEdit].display) && c.css({
                display: apiElement[b].media[deviceEdit].display
            })) : "true" == c.attr("pn-popup") ? ($("#ID_BOX_RESIZE_POPUP").hide(), c.css({
                width: "100%"
            }), c.find(".container").css({
                width: apiElement[b].media["" + a].width_container,
                height: apiElement[b].media["" + a].height_container
            })) : c.css({
                width: apiElement[b].media["" + a].width,
                height: apiElement[b].media["" + a].height
            }), "googlemap" == c.attr("pn-type")) {
            var d = PN_PAGE.getIndexElement(c.attr("id"));
            if (d) {
                var e, f, g = "";
                apiElement[d].value_google_map ? (e = apiElement[d].value_google_map.zoom, f = apiElement[d].value_google_map.address) : (e = 14, f = "HCM, Việt Nam"), apiElement[d].value_google_map && apiElement[d].value_google_map.icon ? g = '<div class="pn-maptitle"><p><img src="' + apiElement[d].value_google_map.icon + '"></p><p>' + apiElement[d].value_google_map.title + "</p></div>" : apiElement[d].value_google_map && (g = apiElement[d].value_google_map.title);
                var h = c.find(".widget-content").eq(0)[0],
                    i = new OptionWiget;
                i.createMapsgoogle(h, e, f, g)
            }
        }
    }
},
SortElementMobile.prototype.isVal = function (a) {
    return void 0 == a || "" == a || "undefined" == a ? !1 : !0
},
SortElementMobile.prototype.sortTopEle = function (a) {
    if (void 0 != a && a.length > 0) {
        for (var b = {}, c = 0; c < a.length; c++)
            for (var d = c + 1; d < a.length; d++) a[d].top < a[c].top && (b.id = a[c].id, b.top = a[c].top, a[c].id = a[d].id, a[c].top = a[d].top, a[d].id = b.id, a[d].top = b.top);
        return a
    }
    return void 0
},
SortElementMobile.prototype.fixSizeParentElement = function (a) {
    if (void 0 != a && a.length > 0) {
        var b, c, d = new OptionWiget,
            e = d.getParentElement(a),
            f = a.offset().top + a.outerHeight(),
            g = e.offset().top + e.outerHeight();
        f > g && (b = PN_PAGE.getIndexElement(e.attr("id")), c = 30 == typeAddNew ? f - e.find(".container:eq(0)").offset().top + 20 : f - e.offset().top + 10, apiElement[b].media.mobile.height = c + "px", e.hasClass("widget-element") ? (e.css({
            height: c + "px"
        }), "item_slider" == e.attr("pn-type") ? e.find(".widget-content").eq(0).css({
            height: "100%"
        }) : e.find(".widget-content").eq(0).css({
            height: c + "px"
        })) : e.css({
            height: c + "px"
        }), "true" == e.attr("pn-popup") && (e.css({
            height: "100%"
        }), e.find(".container").eq(0).css({
            height: c + "px"
        })))
    }
},
SortElementMobile.prototype.resetValueHeightText = function (a) {
    if (void 0 != a && a.length > 0) {
        var b, c = a.attr("pn-type"),
            d = $(".editor-text"),
            e = a.find(".widget-content").eq(0)[0].outerHTML;
        if (d.html(e), b = d.find(".widget-content").eq(0), b.css({
                height: ""
            }), ("textinline" == c || "textparagraph" == c || "textsymbol" == c || "listop" == c) && void 0 != b && b.length > 0) {
            a.find(".widget-content").eq(0).css({
                height: ""
            });
            var f = new Rotate,
                g = f.valueEle(a.find(".widget-content").eq(0)).height;
            if (g > 10) {
                a.css({
                    height: g + "px"
                }), a.find(".widget-content:eq(0)").css({
                    height: g + "px"
                });
                var h = PN_PAGE.getIndexElement(a.attr("id"));
                apiElement[h].media.mobile.height = g + "px"
            }
        }
    }
},
SortElementMobile.prototype.getIndexArr = function (a, b) {
    if (void 0 != a && void 0 != b && b.length > 0)
        for (var c = 0; c < b.length; c++)
            if (a == b[c].id) return c;
    return void 0
},
SortElementMobile.prototype.getArrInPar = function (a) {
    if (void 0 != a && a.length > 0) {
        var b = new OptionWiget,
            c = b.getParentElement(a),
            d = void 0,
            e = [];
        d = c.hasClass("widget-section") ? c.find(".container > .widget-element:visible") : "slide_show" == c.attr("pn-type") ? a.parent().parent().find(".main-slide > .widget-element") : c.find(".widget-content:eq(0) > .widget-element:visible"), d.each(function() {
            var a = PN_PAGE.getIndexElement($(this).attr("id")),
                b = {
                    id: $(this).attr("id"),
                    top: parseFloat(apiElement[a].media.desktop.top)
                };
            "none" != $(this).css("display") && e.push(b)
        }), e = this.sortTopEle(e);
        var f = this.getIndexArr(a.attr("id"), e);
        return {
            arr: e,
            index: f
        }
    }
},
SortElementMobile.prototype.sortFormHightToLow = function (a) {
    var b;
    30 == typeAddNew ? (b = $('#punnel-editor .widget-section[pn-popup="true"]').eq(0), b.show()) : b = $("#punnel-editor .widget-section");
    var c = this;
    b && b.length > 0 && b.each(function() {
        var b;
        if (b = $(this).find(".container > .widget-element:visible"), b && b.length > 0) {
            var d = PN_PAGE.getIndexElement($(this).attr("id"));
            (1 != apiElement[d].mobile || 1 != apiElement[d].sortMobile) && c.sortItemWgWidthTop(b, a)
        }
    });
    var d = PN_PAGE.getElement(".widget-element");
    d && d.length > 0 && d.each(function() {
        if ("none" != $(this).css("display")) {
            var a = PN_PAGE.getIndexElement($(this).attr("id"));
            if (apiElement[a] && apiElement[a].id && apiElement[a].id.length > 0 && (apiElement[a].media.mobile.top = $(this).css("top"), apiElement[a].media.mobile.left = $(this).css("left"), apiElement[a].media.mobile.width = $(this).css("width"), apiElement[a].media.mobile.height = $(this).css("height"), apiElement[a].sortmobile = 1, apiElement[a].mobile = 1, "videoyoutube" == $(this).attr("pn-type"))) {
                var b = parseFloat(apiElement[a].media.mobile.width) / 1.8 - 20 + "px";
                apiElement[a].media.mobile.height = b, $(this).css({
                    height: b
                }), $(this).find(".widget-content").eq(0).css({
                    height: b
                })
            }
        }
    });
    var e = PN_PAGE.getElement('.widget-element[pn-type="item_slider"]');
    e && e.length > 0 && e.each(function() {
        c.sortItemSlider($(this))
    });
    for (var f = 0; f < apiElement.length; f++) apiElement[f].mobile = 1, apiElement[f].sortMobile = 1
},
SortElementMobile.prototype.sortItemWgWidthTop = function (a, b) {
    if (void 0 != a && a.length > 0) {
        var c = [];
        if (a.each(function() {
                if ("true" != $(this).attr("pn-navigation")) {
                    var a = PN_PAGE.getIndexElement($(this).attr("id"));
                    if (a) {
                        var d = {
                            id: $(this).attr("id"),
                            top: parseFloat(apiElement[a].media[b].top)
                        };
                        "none" != $(this).css("display") && c.push(d)
                    }
                }
            }), void 0 != c && c.length > 0) {
            c = this.sortTopEle(c);
            for (var d = 0; d < c.length; d++) {
                var e = PN_PAGE.getElement("#" + c[d].id),
                    f = PN_PAGE.getIndexElement(e.attr("id")),
                    g = e.css("top");
                if (1 != apiElement[f].sortmobile)
                    if (0 == d) g = "20px", apiElement[f].media.mobile.top = "20px";
                    else {
                        var h = PN_PAGE.getElement("#" + c[d - 1].id);
                        e.parent().is(h.parent()) ? (g = parseFloat(h.css("top")) + parseFloat(h.css("height")) + 10 + "px", apiElement[f].media.mobile.top = g) : (g = "20px", apiElement[f].media.mobile.top = "20px")
                    }
                "desktop" != deviceEdit && e.css({
                    top: g
                });
                var i = void 0;
                if ("slide_show" == e.attr("pn-type")) {
                    apiElement[f].sortmobile = 1, apiElement[f].mobile = 1;
                    var j = e.find(".widget-content:eq(0) > .item_slide > li");
                    if (void 0 != j && j.length > 0) {
                        var k = this;
                        j.each(function() {
                            i = $(this).find(".main-slide:eq(0) > .widget-element"), void 0 != i && i.length > 0 && k.sortItemWgWidthTop(i, b)
                        })
                    }
                } else this.fixSizeParentElement(e), 1 != apiElement[f].sortmobile && this.resetSortElement(e), i = e.find(".widget-content:eq(0) > .widget-element"), void 0 != i && i.length > 0 && this.sortItemWgWidthTop(i, b)
            }
        }
    }
},
SortElementMobile.prototype.resetSortElement = function (a) {
    var b = void 0;
    if (b = dummyData.saveMobileMain, 1 == b) {
        var c = this.getArrInPar(a);
        if (void 0 != c && void 0 != c.arr && c.arr.length > 0)
            for (var d = PN_PAGE.getIndexElement(a.attr("id")), e = parseFloat(a.css("height")), f = c.index + 1; f < c.arr.length; f++) {
                var g = PN_PAGE.getElement("#" + c.arr[f].id),
                    h = PN_PAGE.getIndexElement(c.arr[f].id),
                    i = parseFloat(apiElement[d].media.mobile.top),
                    j = parseFloat(apiElement[h].media.mobile.top);
                if (1 == apiElement[h].sortmobile && j > i && i + e > j) {
                    var k = parseFloat(g.css("top")) + e + 10 + "px";
                    apiElement[h].media.mobile.top = k, "desktop" != deviceEdit && g.css({
                        top: k
                    })
                }
            }
    }
},
SortElementMobile.prototype.resetSortElementDelete = function (a) {
    if (void 0 != a && a.length > 0) {
        var b = this.getArrInPar(a),
            c = void 0,
            d = PN_PAGE.getIndexElement(a.attr("id"));
        if (c = dummyData.saveMobileMain, 1 == c && 1 == apiElement[d].sortmobile && b && b.arr && b.arr.length > 0) {
            for (var e = apiElement[d].media.mobile.height, f = b.index + 1; f < b.arr.length; f++) {
                var g = PN_PAGE.getIndexElement(b.arr[f].id);
                if (1 == apiElement[g].sortmobile) {
                    var h = parseFloat(apiElement[g].media.mobile.top);
                    h >= parseFloat(apiElement[d].media.mobile.top) + parseFloat(apiElement[d].media.mobile.height) && (h = parseFloat(h) - parseFloat(e) + "px", apiElement[g].media.mobile.top = h)
                }
            }
            var i = new OptionWiget,
                j = i.getParentElement(a),
                k = PN_PAGE.getIndexElement(j.attr("id")),
                l = this.getHeightMaxChildMobile(j, a),
                m = parseFloat(apiElement[k].media.mobile.height) - parseFloat(e);
            l > m || (apiElement[k].media.mobile.height = m + "px")
        }
    }
},
SortElementMobile.prototype.getHeightMaxChildMobile = function (a, b) {
    if (void 0 != a && a.length > 0) {
        var c = void 0;
        if (a.hasClass("widget-section") ? c = a.find(".container > .widget-element") : "slide_show" != a.attr("pn-type") && (c = a.find(".widget-content:eq(0) > .widget-element")), void 0 != c && c.length > 0) {
            var d = 0;
            return c.each(function() {
                if (void 0 != b && b.length > 0 && b.attr("id") != $(this).attr("id")) {
                    var a = PN_PAGE.getIndexElement($(this).attr("id")),
                        c = parseFloat(apiElement[a].media.mobile.top) + parseFloat(apiElement[a].media.mobile.height);
                    c > d && (d = c)
                }
            }), d
        }
    }
    return !1
},
SortElementMobile.prototype.sortItemSlider = function (a) {
    if (a && a.length > 0 && "item_slider" == a.attr("pn-type")) {
        var b, c = PN_PAGE.getIndexElement(a.attr("id")),
            d = parseFloat(apiElement[c].media.desktop.width),
            e = parseFloat(apiElement[c].media.mobile.width),
            f = a.find(".widget-content:eq(0) > .widget-element");
        f && f.length > 0 && (e > d ? (b = (e - d) / 2, f.each(function() {
            var a = PN_PAGE.getIndexElement($(this).attr("id"));
            if (1 != apiElement[a].sortmobile || 1 != apiElement[a].mobile) {
                var c = parseFloat(apiElement[a].media.desktop.width),
                    d = parseFloat(apiElement[a].media.desktop.left);
                d += b, $(this).css({
                    width: c + "px",
                    left: d + "px"
                }), $(this).find(".widget-content").eq(0).css({
                    width: c + "px"
                }), apiElement[a].media.mobile.width = c + "px", apiElement[a].media.mobile.left = d + "px", apiElement[a].sortmobile = 1, apiElement[a].mobile = 1
            }
        })) : (b = e / d, f.each(function() {
            var a = PN_PAGE.getIndexElement($(this).attr("id"));
            if (1 != apiElement[a].sortmobile || 1 != apiElement[a].mobile) {
                var c = parseFloat(apiElement[a].media.desktop.width),
                    d = parseFloat(apiElement[a].media.desktop.left);
                c *= b, d *= b, $(this).css({
                    width: c + "px",
                    left: d + "px"
                }), $(this).find(".widget-content").eq(0).css({
                    width: c + "px"
                }), apiElement[a].media.mobile.width = c + "px", apiElement[a].media.mobile.left = d + "px", apiElement[a].sortmobile = 1, apiElement[a].mobile = 1
            }
        })))
    }
};