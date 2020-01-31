var LpResize = function () { };
LpResize.prototype.init = function () {
    this.testResize()
},
LpResize.prototype.testResize = function () {
        var a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s = new setStyleElement,
            t = new Rotate,
            u = this,
            v = 5,
            w = new AddGroup,
            x = [],
            y = "DK",
            z = "NO",
            A = 0;
        $(function () {
            function B() {
                var a = $("#resizable-element");
                $(".w-h-el .w-el").text(Math.ceil(a.outerWidth()) + " x " + Math.ceil(a.outerHeight()));
            }

            function C(C) {
                $("#" + C).resizable("destroy"), $("#" + C).resizable({
                    handles: "n, w, e, s, ne, nw, se, sw",
                    aspectRatio: !1,
                    start: function (a, d) {
                        if (a.stopPropagation(), selectedItem && selectedItem.length > 0) {
                            u.resetCusorResize(), z = "YES";
                            var e = new OptionWiget;
                            m = new DragBoxResize, p = m.getItemScreen(), f = selectedItem.outerWidth(), g = selectedItem.outerHeight(), h = selectedItem.css("top"), i = selectedItem.css("left"), r = selectedItem.offset().left + t.valueEle(selectedItem).width, q = selectedItem.offset().top + t.valueEle(selectedItem).height, v = "desktop" == deviceEdit ? 5 : 2, void 0 != ctrlZElement && (0 == ctrlZElement.length ? e.addElementUndo("", selectedItem) : ctrlZElement.length > 0 && ctrlZElement[ctrlZElement.length - 1].id != selectedItem.attr("id") && e.addElementUndo("", selectedItem)), testResize = "true", $("#RIGHT_MOUSE .right-mouse").hide();
                            var j = selectedItem.attr("pn-type");
                            if ("button" == j && selectedItem.css({
                                display: "table"
                            }), selectedItem.hasClass("widget-group") || "contact_form" == j || "menu-header" == j || "slider" == j) {
                                if (b = $(this).outerWidth(), c = $(this).outerHeight(), n = parseFloat($(this).css("top")), o = parseFloat($(this).css("left")), k = [], "slider" == selectedItem.attr("pn-type")) {
                                    var s = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                                    A = Math.floor(s / selectedItem.outerWidth())
                                }
                                if (groupElement.length > 0 && "GROUP_TMP" == selectedItem.attr("id") && "mobile" != deviceEdit)
                                    for (var w = 0; w < groupElement.length; w++) {
                                        l = PN_PAGE.getElement("#" + groupElement[w]), l.removeClass("widget-snap");
                                        var x = {
                                            top: parseFloat(l.css("top")),
                                            left: parseFloat(l.css("left")),
                                            width: l.outerWidth(),
                                            height: l.outerHeight(),
                                            id: l.attr("id")
                                        };
                                        k.push(x)
                                    } else {
                                    var y = selectedItem.find(".widget-element");
                                    void 0 != y && "undefined" != y && y.length > 0 && y.each(function () {
                                        $(this).removeClass("widget-snap");
                                        var a = {
                                            top: parseFloat($(this).css("top")),
                                            left: parseFloat($(this).css("left")),
                                            width: $(this).outerWidth(),
                                            height: $(this).outerHeight(),
                                            id: $(this).attr("id")
                                        };
                                        k.push(a)
                                    })
                                }
                            } else m = new DragBoxResize, snapValue = m.getItemScreen()
                        }
                    },
                    resize: function (a, m) {
                        if (testResize = "true", selectedItem && selectedItem.length > 0) {
                            pageSave = !1;
                            var p = $("#resizable-element").attr("style");
                            p = p.replace("none", "block"), $("#resizable-element").attr("style", p), $(".objectx").hide(), $(".objecty").hide(), u.changeResize(f, g, h, i, m), $(".diver-line-y").hide(), $(".diver-line-x").hide(), snapElement(selectedItem, arrElementSnape, m, !1), selectedItem = PN_PAGE.getElement(".selected").eq(0), j = selectedItem.find(".widget-content").eq(0), u.resetWidthHeightText(f, g);
                            var q = selectedItem.attr("pn-type");
                            if (selectedItem.hasClass("widget-group") || "contact_form" == q || "menu-header" == q || "slider" == q) {
                                var r = $(this).outerWidth() / b,
                                    t = $(this).outerHeight() / c;
                                e = parseFloat($(this).outerHeight() - c), d = parseFloat($(this).outerWidth() - b);
                                var v = parseFloat($(this).css("top")) - n,
                                    x = parseFloat($(this).css("left")) - o;
                                if (groupElement.length > 1 && "GROUP_TMP" == selectedItem.attr("id") && "mobile" != deviceEdit) {
                                    for (var y = 0; y < groupElement.length; y++)
                                        if (void 0 != groupElement[y] && "undefined" != groupElement[y] && "" != groupElement[y] && "GROUP_TMP" != groupElement[y]) {
                                            l = w.getElement(groupElement[y]);
                                            var z = PN_PAGE.getIndexElement(l.attr("id"));
                                            l.css({
                                                top: parseFloat(k[y].top + v) + "px",
                                                left: parseFloat(k[y].left + x) + "px",
                                                width: parseFloat(k[y].width + d) + "px",
                                                height: parseFloat(k[y].height + e) + "px"
                                            }), l.find(".widget-content").eq(0).css({
                                                width: parseFloat(k[y].width + d) + "px",
                                                height: parseFloat(k[y].height + e) + "px"
                                            }), apiElement[z].media.desktop.top = parseFloat(k[y].top + v) + "px", apiElement[z].media.desktop.left = parseFloat(k[y].left + x) + "px", apiElement[z].media.desktop.width = parseFloat(k[y].width + d) + "px", apiElement[z].media.desktop.height = parseFloat(k[y].height + e) + "px"
                                        }
                                } else {
                                    var C = selectedItem.find(".widget-element");
                                    void 0 != C && "undefined" != C && C.length > 0 && C.each(function (a) {
                                        var b = PN_PAGE.getIndexElement($(this).attr("id"));
                                        $(this).css({
                                            top: parseFloat(k[a].top * t) + "px",
                                            left: parseFloat(k[a].left * r) + "px",
                                            width: parseFloat(k[a].width * r) + "px",
                                            height: parseFloat(k[a].height * t) + "px"
                                        }), "item_slider" == $(this).attr("pn-type") ? $(this).find(".widget-content").eq(0).css({
                                            width: selectedItem.css("width"),
                                            height: "100%",
                                            top: "0px",
                                            left: "auto!important"
                                        }) : $(this).find(".widget-content").eq(0).css({
                                            width: parseFloat(k[a].width * r) + "px",
                                            height: parseFloat(k[a].height * t) + "px"
                                        }), apiElement[b].media[deviceEdit].top = $(this).css("top"), apiElement[b].media[deviceEdit].left = $(this).css("left"), apiElement[b].media[deviceEdit].width = $(this).css("width"), apiElement[b].media[deviceEdit].height = $(this).css("height"), "slider" == q && "desktop" != deviceEdit && (apiElement[b].media[deviceEdit].top = "0px", apiElement[b].media[deviceEdit].left = "auto!important", apiElement[b].media[deviceEdit].width = selectedItem.css("width"), apiElement[b].media[deviceEdit].height = "100%")
                                    });
                                    var D = selectedItem.find(".wrap-child");
                                    D && D.length > 0 && D.css({
                                        left: 0 - A * selectedItem.outerWidth() + "px"
                                    })
                                }
                            }
                            if ("contact_form" == selectedItem.attr("pn-type")) {
                                var E, F = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                                    G = selectedItem.find(".widget-content form textarea"),
                                    H = selectedItem.find(".widget-content form");
                                E = selectedItem.outerHeight() - H.outerHeight() - parseFloat(selectedItem.find(".widget-content").eq(0).css("padding"));
                                var I = G.length,
                                    J = G.eq(0).outerHeight();
                                if (J = E / I + J, G.css({
                                    height: J + "px"
                                }), apiElement[F].media.heightArea = J + "px", selectedItem.hasClass("left-label")) {
                                    var K = selectedItem.outerWidth() - selectedItem.find(".widget-content form .item label").outerWidth() + "px";
                                    selectedItem.find(".widget-content form .item :not(label)").css({
                                        width: K
                                    })
                                } else selectedItem.find(".widget-content form .item label").css({
                                    width: ""
                                }), selectedItem.find(".widget-content form .item :not(label)").css({
                                    "margin-left": "",
                                    width: ""
                                })
                            }
                            var L;
                            L = new OptionWiget, u.widthMenu(selectedItem), "image" == selectedItem.attr("pn-type") && L.resetImageMobile(selectedItem), "button" != selectedItem.attr("pn-type") && L.resetValueHeightText(selectedItem);
                            var M = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                            s.setStyleItem(apiElement[M], deviceEdit), addElementToParent(selectedItem), B()
                        }
                    },
                    stop: function (b, c) {
                        if ($(".diver-line-y").hide(), $(".diver-line-x").hide(), $(".widget-element.parent-droped").removeClass("parent-droped"), z = "NO", selectedItem && selectedItem.length > 0) {
                            var f = new OptionWiget;
                            $(".left-page").show(), testResize = "false", void 0 != selectedItem.attr("pn-group") && "undefined" != selectedItem.attr("pn-group") && "" != selectedItem.attr("pn-group") && (u.fixSizeWgGroup(selectedItem), f = new OptionWiget, f.calulatorAllGroup(selectedItem));
                            new RenCssMobile, PN_PAGE.getIndexElement(selectedItem.attr("id"));
                            if ("googlemap" == selectedItem.attr("pn-type")) {
                                var g = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                                    h = apiElement[g].value_google_map.zoom,
                                    i = apiElement[g].value_google_map.address;
                                if (void 0 != apiElement[g].value_google_map.icon && "" != apiElement[g].value_google_map.icon) var j = '<div class="pn-maptitle"><p><img src="' + apiElement[g].value_google_map.icon + '"></p><p>' + apiElement[g].value_google_map.title + "</p></div>";
                                else var j = apiElement[g].value_google_map.title;
                                var k = selectedItem.find(".widget-content").eq(0)[0],
                                    l = new OptionWiget;
                                l.createMapsgoogle(k, h, i, j)
                            }
                            if ("facebook_messages" == selectedItem.attr("pn-type")) {
                                var m = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                                parseFloat(apiElement[m].media[deviceEdit].width) > 500 && (apiElement[m].media[deviceEdit].width = "500px", selectedItem.css({
                                    width: "500px"
                                }), selectedItem.find(".widget-content").eq(0).css({
                                    width: "500px"
                                }), $("#resizable-element").css({
                                    width: "500px"
                                }), c.size.width = "500px");
                                var n = "https://www.facebook.com/v2.5/plugins/page.php?adapt_container_width=true&app_id=113869198637480&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Dfc17a1604%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff1e8e518fc%26relation%3Dparent.parent&container_width=613&hide_cover=true&locale=vi_VN&sdk=joey&show_facepile=true&small_header=true&tabs=messages&width=" + parseFloat(apiElement[m].media[deviceEdit].width) + "&height=" + parseFloat(apiElement[m].media[deviceEdit].height) + "&href=" + apiElement[m].value_facebook_messages.url;
                                selectedItem.find(".widget-content").eq(0).attr("src", n), selectedItem.find(".widget-content").eq(0).css({
                                    height: parseFloat(apiElement[m].media[deviceEdit].height)
                                })
                            }
                            if (selectedItem.hasClass("widget-item-child")) {
                                var f = new OptionWiget;
                                f.resetWidgetItemChild(selectedItem)
                            }
                            $(".objectx").hide(), $(".objecty").hide(), e = "", d = "", a = "", x = [], addElementWhenResize(selectedItem)
                        }
                        u.resetCusorResize(), $(".widget-element.parent-droped").removeClass("parent-droped")
                    }
                }), y = "DK"
            }

            function D(C) {
                $("#" + C).resizable("destroy"), $("#" + C).resizable({
                    handles: "n, w, e, s, ne, nw, se, sw",
                    aspectRatio: !0,
                    start: function (a, d) {
                        if (a.stopPropagation(), selectedItem && selectedItem.length > 0) {
                            u.resetCusorResize(), z = "YES";
                            var e = new OptionWiget;
                            m = new DragBoxResize, p = m.getItemScreen(), f = selectedItem.outerWidth(), g = selectedItem.outerHeight(), h = selectedItem.css("top"), i = selectedItem.css("left"), r = selectedItem.offset().left + t.valueEle(selectedItem).width, q = selectedItem.offset().top + t.valueEle(selectedItem).height, v = "desktop" == deviceEdit ? 5 : 2, void 0 != ctrlZElement && (0 == ctrlZElement.length ? e.addElementUndo("", selectedItem) : ctrlZElement.length > 0 && ctrlZElement[ctrlZElement.length - 1].id != selectedItem.attr("id") && e.addElementUndo("", selectedItem)), testResize = "true", $("#RIGHT_MOUSE .right-mouse").hide();
                            var j = selectedItem.attr("pn-type");
                            if ("button" == j && selectedItem.css({
                                display: "table"
                            }), selectedItem.hasClass("widget-group") || "contact_form" == j || "menu-header" == j || "slider" == j) {
                                if (b = $(this).outerWidth(), c = $(this).outerHeight(), n = parseFloat($(this).css("top")), o = parseFloat($(this).css("left")), k = [], "slider" == selectedItem.attr("pn-type")) {
                                    var s = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                                    A = Math.floor(s / selectedItem.outerWidth())
                                }
                                if (groupElement.length > 0 && "GROUP_TMP" == selectedItem.attr("id") && "mobile" != deviceEdit)
                                    for (var w = 0; w < groupElement.length; w++) {
                                        l = PN_PAGE.getElement("#" + groupElement[w]), l.removeClass("widget-snap");
                                        var x = {
                                            top: parseFloat(l.css("top")),
                                            left: parseFloat(l.css("left")),
                                            width: l.outerWidth(),
                                            height: l.outerHeight(),
                                            id: l.attr("id")
                                        };
                                        k.push(x)
                                    } else {
                                    var y = selectedItem.find(".widget-element");
                                    void 0 != y && "undefined" != y && y.length > 0 && y.each(function () {
                                        $(this).removeClass("widget-snap");
                                        var a = {
                                            top: parseFloat($(this).css("top")),
                                            left: parseFloat($(this).css("left")),
                                            width: $(this).outerWidth(),
                                            height: $(this).outerHeight(),
                                            id: $(this).attr("id")
                                        };
                                        k.push(a)
                                    })
                                }
                            } else m = new DragBoxResize, snapValue = m.getItemScreen()
                        }
                    },
                    resize: function (a, m) {
                        if (testResize = "true", selectedItem && selectedItem.length > 0) {
                            pageSave = !1;
                            var p = $("#resizable-element").attr("style");
                            p = p.replace("none", "block"), $("#resizable-element").attr("style", p), $(".objectx").hide(), $(".objecty").hide(), u.changeResize(f, g, h, i, m), $(".diver-line-y").hide(), $(".diver-line-x").hide(), snapElement(selectedItem, arrElementSnape, m, !0), selectedItem = PN_PAGE.getElement(".selected").eq(0), j = selectedItem.find(".widget-content").eq(0), u.resetWidthHeightText(f, g);
                            var q = selectedItem.attr("pn-type");
                            if (selectedItem.hasClass("widget-group") || "contact_form" == q || "menu-header" == q || "slider" == q) {
                                var r = $(this).outerWidth() / b,
                                    t = $(this).outerHeight() / c;
                                e = parseFloat($(this).outerHeight() - c), d = parseFloat($(this).outerWidth() - b);
                                var v = parseFloat($(this).css("top")) - n,
                                    x = parseFloat($(this).css("left")) - o;
                                if (groupElement.length > 1 && "GROUP_TMP" == selectedItem.attr("id") && "mobile" != deviceEdit) {
                                    for (var y = 0; y < groupElement.length; y++)
                                        if (void 0 != groupElement[y] && "undefined" != groupElement[y] && "" != groupElement[y] && "GROUP_TMP" != groupElement[y]) {
                                            l = w.getElement(groupElement[y]);
                                            var z = PN_PAGE.getIndexElement(l.attr("id"));
                                            l.css({
                                                top: parseFloat(k[y].top + v) + "px",
                                                left: parseFloat(k[y].left + x) + "px",
                                                width: parseFloat(k[y].width + d) + "px",
                                                height: parseFloat(k[y].height + e) + "px"
                                            }), l.find(".widget-content").eq(0).css({
                                                width: parseFloat(k[y].width + d) + "px",
                                                height: parseFloat(k[y].height + e) + "px"
                                            }), apiElement[z].media.desktop.top = parseFloat(k[y].top + v) + "px", apiElement[z].media.desktop.left = parseFloat(k[y].left + x) + "px", apiElement[z].media.desktop.width = parseFloat(k[y].width + d) + "px", apiElement[z].media.desktop.height = parseFloat(k[y].height + e) + "px"
                                        }
                                } else {
                                    var C = selectedItem.find(".widget-element");
                                    void 0 != C && "undefined" != C && C.length > 0 && C.each(function (a) {
                                        var b = PN_PAGE.getIndexElement($(this).attr("id"));
                                        $(this).css({
                                            top: parseFloat(k[a].top * t) + "px",
                                            left: parseFloat(k[a].left * r) + "px",
                                            width: parseFloat(k[a].width * r) + "px",
                                            height: parseFloat(k[a].height * t) + "px"
                                        }), "item_slider" == $(this).attr("pn-type") ? $(this).find(".widget-content").eq(0).css({
                                            width: selectedItem.css("width"),
                                            height: "100%",
                                            top: "0px",
                                            left: "auto!important"
                                        }) : $(this).find(".widget-content").eq(0).css({
                                            width: parseFloat(k[a].width * r) + "px",
                                            height: parseFloat(k[a].height * t) + "px"
                                        }), apiElement[b].media[deviceEdit].top = $(this).css("top"), apiElement[b].media[deviceEdit].left = $(this).css("left"), apiElement[b].media[deviceEdit].width = $(this).css("width"), apiElement[b].media[deviceEdit].height = $(this).css("height"), "slider" == q && "desktop" != deviceEdit && (apiElement[b].media[deviceEdit].top = "0px", apiElement[b].media[deviceEdit].left = "auto!important", apiElement[b].media[deviceEdit].width = selectedItem.css("width"), apiElement[b].media[deviceEdit].height = "100%")
                                    });
                                    var D = selectedItem.find(".wrap-child");
                                    D && D.length > 0 && D.css({
                                        left: 0 - A * selectedItem.outerWidth() + "px"
                                    })
                                }
                            }
                            if ("contact_form" == selectedItem.attr("pn-type")) {
                                var E, F = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                                    G = selectedItem.find(".widget-content form textarea"),
                                    H = selectedItem.find(".widget-content form");
                                E = selectedItem.outerHeight() - H.outerHeight() - parseFloat(selectedItem.find(".widget-content").eq(0).css("padding"));
                                var I = G.length,
                                    J = G.eq(0).outerHeight();
                                if (J = E / I + J, G.css({
                                    height: J + "px"
                                }), apiElement[F].media.heightArea = J + "px", selectedItem.hasClass("left-label")) {
                                    var K = selectedItem.outerWidth() - selectedItem.find(".widget-content form .item label").outerWidth() + "px";
                                    selectedItem.find(".widget-content form .item :not(label)").css({
                                        width: K
                                    })
                                } else selectedItem.find(".widget-content form .item label").css({
                                    width: ""
                                }), selectedItem.find(".widget-content form .item :not(label)").css({
                                    "margin-left": "",
                                    width: ""
                                })
                            }
                            var L;
                            L = new OptionWiget, u.widthMenu(selectedItem), "image" == selectedItem.attr("pn-type") && L.resetImageMobile(selectedItem), "button" != selectedItem.attr("pn-type") && L.resetValueHeightText(selectedItem);
                            var M = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                            s.setStyleItem(apiElement[M], deviceEdit), addElementToParent(selectedItem), B()
                        }
                    },
                    stop: function (b, c) {
                        if ($(".diver-line-y").hide(), $(".diver-line-x").hide(), $(".parent-droped").removeClass("parent-droped"), z = "NO", selectedItem && selectedItem.length > 0) {
                            var f = new OptionWiget;
                            $(".left-page").show(), testResize = "false", void 0 != selectedItem.attr("pn-group") && "undefined" != selectedItem.attr("pn-group") && "" != selectedItem.attr("pn-group") && (u.fixSizeWgGroup(selectedItem), f = new OptionWiget, f.calulatorAllGroup(selectedItem));
                            new RenCssMobile, PN_PAGE.getIndexElement(selectedItem.attr("id"));
                            if ("googlemap" == selectedItem.attr("pn-type")) {
                                var g = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                                    h = apiElement[g].value_google_map.zoom,
                                    i = apiElement[g].value_google_map.address;
                                if (void 0 != apiElement[g].value_google_map.icon && "" != apiElement[g].value_google_map.icon) var j = '<div class="pn-maptitle"><p><img src="' + apiElement[g].value_google_map.icon + '"></p><p>' + apiElement[g].value_google_map.title + "</p></div>";
                                else var j = apiElement[g].value_google_map.title;
                                var k = selectedItem.find(".widget-content").eq(0)[0],
                                    l = new OptionWiget;
                                l.createMapsgoogle(k, h, i, j)
                            }
                            if ("facebook_messages" == selectedItem.attr("pn-type")) {
                                var m = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                                parseFloat(apiElement[m].media[deviceEdit].width) > 500 && (apiElement[m].media[deviceEdit].width = "500px", selectedItem.css({
                                    width: "500px"
                                }), selectedItem.find(".widget-content").eq(0).css({
                                    width: "500px"
                                }), $("#resizable-element").css({
                                    width: "500px"
                                }), c.size.width = "500px");
                                var n = "https://www.facebook.com/v2.5/plugins/page.php?adapt_container_width=true&app_id=113869198637480&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Dfc17a1604%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff1e8e518fc%26relation%3Dparent.parent&container_width=613&hide_cover=true&locale=vi_VN&sdk=joey&show_facepile=true&small_header=true&tabs=messages&width=" + parseFloat(apiElement[m].media[deviceEdit].width) + "&height=" + parseFloat(apiElement[m].media[deviceEdit].height) + "&href=" + apiElement[m].value_facebook_messages.url;
                                selectedItem.find(".widget-content").eq(0).attr("src", n), selectedItem.find(".widget-content").eq(0).css({
                                    height: parseFloat(apiElement[m].media[deviceEdit].height)
                                })
                            }
                            if (selectedItem.hasClass("widget-item-child")) {
                                var f = new OptionWiget;
                                f.resetWidgetItemChild(selectedItem)
                            }
                            $(".objectx").hide(), $(".objecty").hide(), snapElement(selectedItem, arrElementSnape, c, !0), e = "", d = "", a = "", x = [], addElementWhenResize(selectedItem)
                        }
                        u.resetCusorResize(), $(".widget-element.parent-droped").removeClass("parent-droped")
                    }
                }), y = "K"
            }
            $("#resizable-element").resizable({
                handles: "n, w, e, s, ne, nw, se, sw",
                start: function (a, d) {
                    if (a.stopPropagation(), selectedItem && selectedItem.length > 0) {
                        u.resetCusorResize(), z = "YES";
                        var e = new OptionWiget;
                        m = new DragBoxResize, p = m.getItemScreen(), f = selectedItem.outerWidth(), g = selectedItem.outerHeight(), h = selectedItem.css("top"), i = selectedItem.css("left"), r = selectedItem.offset().left + t.valueEle(selectedItem).width, q = selectedItem.offset().top + t.valueEle(selectedItem).height, v = "desktop" == deviceEdit ? 5 : 2, void 0 != ctrlZElement && (0 == ctrlZElement.length ? e.addElementUndo("", selectedItem) : ctrlZElement.length > 0 && ctrlZElement[ctrlZElement.length - 1].id != selectedItem.attr("id") && e.addElementUndo("", selectedItem)), testResize = "true", $("#RIGHT_MOUSE .right-mouse").hide();
                        var j = selectedItem.attr("pn-type");
                        if ("button" == j && selectedItem.css({
                            display: "table"
                        }), selectedItem.hasClass("widget-group") || "contact_form" == j || "menu-header" == j || "slider" == j) {
                            if (b = $(this).outerWidth(), c = $(this).outerHeight(), n = parseFloat($(this).css("top")), o = parseFloat($(this).css("left")), k = [], "slider" == selectedItem.attr("pn-type")) {
                                var s = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                                A = Math.floor(s / selectedItem.outerWidth())
                            }
                            if (groupElement.length > 0 && "GROUP_TMP" == selectedItem.attr("id"))
                                for (var w = 0; w < groupElement.length; w++) {
                                    l = PN_PAGE.getElement("#" + groupElement[w]), l.removeClass("widget-snap");
                                    var x = {
                                        top: parseFloat(l.css("top")),
                                        left: parseFloat(l.css("left")),
                                        width: l.outerWidth(),
                                        height: l.outerHeight(),
                                        id: l.attr("id")
                                    };
                                    k.push(x)
                                } else {
                                var y = selectedItem.find(".widget-element");
                                void 0 != y && "undefined" != y && y.length > 0 && y.each(function () {
                                    $(this).removeClass("widget-snap");
                                    var a = {
                                        top: parseFloat($(this).css("top")),
                                        left: parseFloat($(this).css("left")),
                                        width: $(this).outerWidth(),
                                        height: $(this).outerHeight(),
                                        id: $(this).attr("id")
                                    };
                                    k.push(a)
                                })
                            }
                        } else m = new DragBoxResize, snapValue = m.getItemScreen()
                    }
                },
                resize: function (a, m) {
                    if (testResize = "true", selectedItem && selectedItem.length > 0) {
                        pageSave = !1;
                        var p = $("#resizable-element").attr("style");
                        p = p.replace("none", "block"), $("#resizable-element").attr("style", p), $(".objectx").hide(), $(".objecty").hide(), u.changeResize(f, g, h, i, m), $(".diver-line-y").hide(), $(".diver-line-x").hide(), snapElement(selectedItem, arrElementSnape, m, !1), selectedItem = PN_PAGE.getElement(".selected").eq(0), j = selectedItem.find(".widget-content").eq(0), u.resetWidthHeightText(f, g);
                        var q = selectedItem.attr("pn-type");
                        if (selectedItem.hasClass("widget-group") || "contact_form" == q || "menu-header" == q || "slider" == q) {
                            var r = $(this).outerWidth() / b,
                                t = $(this).outerHeight() / c;
                            e = parseFloat($(this).outerHeight() - c), d = parseFloat($(this).outerWidth() - b);
                            var v = parseFloat($(this).css("top")) - n,
                                x = parseFloat($(this).css("left")) - o;
                            if (groupElement.length > 1 && "GROUP_TMP" == selectedItem.attr("id") && "mobile" != deviceEdit) {
                                for (var y = 0; y < groupElement.length; y++)
                                    if (void 0 != groupElement[y] && "undefined" != groupElement[y] && "" != groupElement[y] && "GROUP_TMP" != groupElement[y]) {
                                        l = w.getElement(groupElement[y]);
                                        var z = PN_PAGE.getIndexElement(l.attr("id"));
                                        l.css({
                                            top: parseFloat(k[y].top + v) + "px",
                                            left: parseFloat(k[y].left + x) + "px",
                                            width: parseFloat(k[y].width + d) + "px",
                                            height: parseFloat(k[y].height + e) + "px"
                                        }), l.find(".widget-content").eq(0).css({
                                            width: parseFloat(k[y].width + d) + "px",
                                            height: parseFloat(k[y].height + e) + "px"
                                        }), apiElement[z].media.desktop.top = parseFloat(k[y].top + v) + "px", apiElement[z].media.desktop.left = parseFloat(k[y].left + x) + "px", apiElement[z].media.desktop.width = parseFloat(k[y].width + d) + "px", apiElement[z].media.desktop.height = parseFloat(k[y].height + e) + "px"
                                    }
                            } else {
                                var C = selectedItem.find(".widget-element");
                                void 0 != C && "undefined" != C && C.length > 0 && C.each(function (a) {
                                    var b = PN_PAGE.getIndexElement($(this).attr("id"));
                                    $(this).css({
                                        top: parseFloat(k[a].top * t) + "px",
                                        left: parseFloat(k[a].left * r) + "px",
                                        width: parseFloat(k[a].width * r) + "px",
                                        height: parseFloat(k[a].height * t) + "px"
                                    }), "item_slider" == $(this).attr("pn-type") ? $(this).find(".widget-content").eq(0).css({
                                        width: selectedItem.css("width"),
                                        height: "100%",
                                        top: "0px",
                                        left: "auto!important"
                                    }) : $(this).find(".widget-content").eq(0).css({
                                        width: parseFloat(k[a].width * r) + "px",
                                        height: parseFloat(k[a].height * t) + "px"
                                    }), apiElement[b].media[deviceEdit].top = $(this).css("top"), apiElement[b].media[deviceEdit].left = $(this).css("left"), apiElement[b].media[deviceEdit].width = $(this).css("width"), apiElement[b].media[deviceEdit].height = $(this).css("height"), "slider" == q && "desktop" != deviceEdit && (apiElement[b].media[deviceEdit].top = "0px", apiElement[b].media[deviceEdit].left = "auto!important", apiElement[b].media[deviceEdit].width = selectedItem.css("width"), apiElement[b].media[deviceEdit].height = "100%", $(this).css({
                                        width: selectedItem.css("width"),
                                        height: "100%"
                                    }))
                                });
                                var D = selectedItem.find(".wrap-child");
                                D && D.length > 0 && D.css({
                                    left: 0 - A * selectedItem.outerWidth() + "px"
                                })
                            }
                        }
                        if ("contact_form" == selectedItem.attr("pn-type")) {
                            var E, F = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                                G = selectedItem.find(".widget-content form textarea"),
                                H = selectedItem.find(".widget-content form");
                            E = selectedItem.outerHeight() - H.outerHeight() - parseFloat(selectedItem.find(".widget-content").eq(0).css("padding"));
                            var I = G.length,
                                J = G.eq(0).outerHeight();
                            if (J = E / I + J, G.css({
                                height: J + "px"
                            }), apiElement[F].media.heightArea = J + "px", selectedItem.hasClass("left-label")) {
                                var K = selectedItem.outerWidth() - selectedItem.find(".widget-content form .item label").outerWidth() + "px";
                                selectedItem.find(".widget-content form .item :not(label)").css({
                                    width: K
                                })
                            } else selectedItem.find(".widget-content form .item label").css({
                                width: ""
                            }), selectedItem.find(".widget-content form .item :not(label)").css({
                                "margin-left": "",
                                width: ""
                            })
                        }
                        var L;
                        L = new OptionWiget, u.widthMenu(selectedItem), "image" == selectedItem.attr("pn-type") && L.resetImageMobile(selectedItem), "button" != selectedItem.attr("pn-type") && L.resetValueHeightText(selectedItem);
                        var M = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                        s.setStyleItem(apiElement[M], deviceEdit), addElementToParent(selectedItem), B()
                    }
                },
                stop: function (b, c) {
                    if ($(".diver-line-y").hide(), $(".diver-line-x").hide(), $(".parent-droped").removeClass("parent-droped"), z = "NO", selectedItem && selectedItem.length > 0) {
                        var f = new OptionWiget;
                        if ($(".left-page").show(), testResize = "false", void 0 != selectedItem.attr("pn-group") && "undefined" != selectedItem.attr("pn-group") && "" != selectedItem.attr("pn-group") && (u.fixSizeWgGroup(selectedItem), f = new OptionWiget, f.calulatorAllGroup(selectedItem)), void 0 != selectedItem) {
                            new RenCssMobile, PN_PAGE.getIndexElement(selectedItem.attr("id"));
                            if ("googlemap" == selectedItem.attr("pn-type")) {
                                var g = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                                    h = apiElement[g].value_google_map.zoom,
                                    i = apiElement[g].value_google_map.address;
                                if (void 0 != apiElement[g].value_google_map.icon && "" != apiElement[g].value_google_map.icon) var j = '<div class="pn-maptitle"><p><img src="' + apiElement[g].value_google_map.icon + '"></p><p>' + apiElement[g].value_google_map.title + "</p></div>";
                                else var j = apiElement[g].value_google_map.title;
                                var k = selectedItem.find(".widget-content").eq(0)[0],
                                    l = new OptionWiget;
                                l.createMapsgoogle(k, h, i, j)
                            }
                            if ("facebook_messages" == selectedItem.attr("pn-type")) {
                                var m = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                                parseFloat(apiElement[m].media[deviceEdit].width) > 500 && (apiElement[m].media[deviceEdit].width = "500px", selectedItem.css({
                                    width: "500px"
                                }), selectedItem.find(".widget-content").eq(0).css({
                                    width: "500px"
                                }), $("#resizable-element").css({
                                    width: "500px"
                                }), c.size.width = "500px");
                                var n = "https://www.facebook.com/v2.5/plugins/page.php?adapt_container_width=true&app_id=113869198637480&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Dfc17a1604%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff1e8e518fc%26relation%3Dparent.parent&container_width=613&hide_cover=true&locale=vi_VN&sdk=joey&show_facepile=true&small_header=true&tabs=messages&width=" + parseFloat(apiElement[m].media[deviceEdit].width) + "&height=" + parseFloat(apiElement[m].media[deviceEdit].height) + "&href=" + apiElement[m].value_facebook_messages.url;
                                selectedItem.find(".widget-content").eq(0).attr("src", n), selectedItem.find(".widget-content").eq(0).css({
                                    height: parseFloat(apiElement[m].media[deviceEdit].height)
                                })
                            }
                            if (selectedItem.hasClass("widget-item-child")) {
                                var f = new OptionWiget;
                                f.resetWidgetItemChild(selectedItem)
                            }
                            $(".objectx").hide(), $(".objecty").hide(), e = "", d = "", a = "", x = []
                        }
                        addElementWhenResize(selectedItem)
                    }
                    u.resetCusorResize(), $(".widget-element.parent-droped").removeClass("parent-droped")
                }
            }), $(document).on("mouseenter", "#resizable-element .ui-resizable-e, #resizable-element .ui-resizable-s, #resizable-element .ui-resizable-w, #resizable-element .ui-resizable-n", function () {
                if ("DK" != y && "YES" != z) {
                    var a = $(this).parent().attr("id");
                    C(a)
                }
            }), $(document).on("mouseenter", "#resizable-element .ui-resizable-se, #resizable-element .ui-resizable-ne, #resizable-element .ui-resizable-sw, #resizable-element .ui-resizable-nw", function () {
                if ("K" != y && "YES" != z) {
                    var a = $(this).parent().attr("id");
                    D(a)
                }
            })
        })
    },
LpResize.prototype.changeResize = function (a, b, c, d, e) {
    if (selectedItem && selectedItem.length > 0) {
        var f = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        if (e.originalPosition.left != e.position.left || e.originalPosition.top != e.position.top) {
            if (e.originalPosition.top != e.position.top) {
                var g = e.originalPosition.top - e.position.top,
                    h = (parseFloat(selectedItem.css("top")) + g, e.size.height);
                if (selectedItem.offset({
                    top: e.position.top
                }), selectedItem.css({
                    height: h + "px"
                }), selectedItem.find(".widget-content").eq(0).css({
                    height: h + "px"
                }), apiElement[f].media[deviceEdit].top = selectedItem.css("top"), apiElement[f].media[deviceEdit].height = selectedItem.css("height"), e.originalSize.width != e.size.width) {
                    var i = e.size.width;
                    selectedItem.css({
                        width: i + "px"
                    }), selectedItem.find(".widget-content").eq(0).css({
                        width: i + "px"
                    }), apiElement[f].media[deviceEdit].width = selectedItem.css("width")
                }
            }
            if (e.originalPosition.left != e.position.left) {
                var g = e.originalPosition.left - e.position.left,
                    i = (parseFloat(selectedItem.css("left")) + g, e.size.width);
                if (selectedItem.offset({
                    left: e.position.left
                }), selectedItem.css({
                    width: i + "px"
                }), selectedItem.find(".widget-content").eq(0).css({
                    width: i + "px"
                }), apiElement[f].media[deviceEdit].left = selectedItem.css("left"), apiElement[f].media[deviceEdit].width = selectedItem.css("width"), e.originalSize.height != e.size.height) {
                    var h = e.size.height;
                    selectedItem.css({
                        height: h + "px"
                    }), selectedItem.find(".widget-content").eq(0).css({
                        height: h + "px"
                    }), apiElement[f].media[deviceEdit].height = selectedItem.css("height")
                }
            }
        } else {
            if (e.originalSize.width != e.size.width) {
                var i = e.size.width;
                selectedItem.css({
                    width: i + "px"
                }), selectedItem.find(".widget-content").eq(0).css({
                    width: i + "px"
                }), apiElement[f].media[deviceEdit].width = selectedItem.css("width")
            }
            if (e.originalSize.height != e.size.height) {
                var h = e.size.height;
                selectedItem.css({
                    height: h + "px"
                }), selectedItem.find(".widget-content").eq(0).css({
                    height: h + "px"
                }), apiElement[f].media[deviceEdit].height = selectedItem.css("height")
            }
        }
        this.resetSizeMenu(), this.resetWidthHeightShape()
    }
},
LpResize.prototype.resetWidthHeightShape = function () {
    if (selectedItem && selectedItem.length > 0) {
        var a = selectedItem.attr("pn-type");
        if ("shape" == a) {
            var b = $("#resizable-element"),
                c = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                d = selectedItem.outerWidth() + "px";
            apiElement[c].media[deviceEdit].height = d, selectedItem.css({
                height: d
            }), selectedItem.find(".widget-content:eq(0)").css({
                height: d
            }), b.css({
                height: d
            })
        }
    }
},
LpResize.prototype.resetSizeMenu = function () {
    if (void 0 != selectedItem && selectedItem.length > 0) {
        var a = selectedItem.outerHeight(),
            b = selectedItem.attr("pn-type");
        if ("menu-header" == b)
            if ("desktop" != deviceEdit && "true" == selectedItem.attr("pn-navigation")) selectedItem.find(".menuMobile div").css({
                "line-height": a - 10 + "px"
            });
            else if ("vertical" == selectedItem.attr("pn-direction")) {
                var c = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                    d = a / selectedItem.find(".ulMenuDeskTop li").length + "px";
                apiElement[c].media[deviceEdit].item_height = d, selectedItem.find(".ulMenuDeskTop li").css({
                    height: d
                })
            } else {
                var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[c].media[deviceEdit].item_height = "100%", selectedItem.find(".ulMenuDeskTop li").css({
                    height: "100%"
                })
            }
    }
},
LpResize.prototype.widthMenu = function (a) {
    var b = "menu-header";
    if (a && a.attr("pn-type") == b) {
        var c, d, e = PN_PAGE.getIndexElement(a.attr("id")),
            f = a.find("li");
        a.attr("pn-navigation") && "desktop" == deviceEdit ? (e = PN_PAGE.getIndexElement(a.attr("id")), d = parseFloat(f.css("margin-left")), c = (a.outerWidth() - 2 * f.length * d) / f.length, void 0 == apiElement[e].media.items && (apiElement[e].media.items = {}), apiElement[e].media.items.width = c + "px", f.each(function () {
            f.css({
                width: c + "px"
            })
        })) : "vertical" == a.attr("pn-direction") ? f.css({
            width: "100%"
        }) : (e = PN_PAGE.getIndexElement(a.attr("id")), d = parseFloat(f.css("margin-left")), c = (a.outerWidth() - 2 * f.length * d) / f.length, void 0 == apiElement[e].media.items && (apiElement[e].media.items = {}), apiElement[e].media.items.width = c + "px", f.each(function () {
            f.css({
                width: c + "px"
            })
        }))
    }
},
LpResize.prototype.fixSizeWgGroup = function (a) {
    if (a && void 0 != a.attr("pn-group") && "undefined" != a.attr("pn-group") && "" != a.attr("pn-group")) {
        var b, c = PN_PAGE.getElement("#" + a.attr("pn-group")),
            d = new Rotate;
        if (a.offset().top + d.valueEle(a).height > c.offset().top + c.outerHeight()) {
            var e = a.offset().top + d.valueEle(a).height - c.offset().top;
            b = PN_PAGE.getIndexElement(c.attr("id")), apiElement[b].media[deviceEdit].height = e + "px", c.css({
                height: e + "px"
            }), c.find(".widget-content").eq(0).css({
                height: e + "px"
            })
        }
        if (a.offset().left + d.valueEle(a).width > c.offset().left + c.outerWidth()) {
            var f = a.offset().left + d.valueEle(a).width - c.offset().left + "px";
            b = PN_PAGE.getIndexElement(c.attr("id")), apiElement[b].media[deviceEdit].width = f, c.css({
                width: f
            }), c.find(".widget-content").eq(0).css({
                width: f
            })
        }
    }
},
LpResize.prototype.resetWidthHeightText = function (a, b) {
    if (void 0 != selectedItem && selectedItem.length > 0) {
        var c = selectedItem.attr("pn-type");
        if ("textinline" == c || "textparagraph" == c || "textsymbol" == c) {
            var d, e, f = $("#ID_BOX_RESIZE"),
                g = f.outerHeight(),
                h = $("#ID_BOX_EDITOR .contentEditor"),
                i = selectedItem[0].outerHTML;
            h.contents().find("body").html(i), e = h.contents().find(".widget-content").eq(0), e.css({
                height: ""
            }), void 0 !== e && (a != selectedItem.outerWidth() && (g = e.outerHeight()), b != selectedItem.outerHeight() && (d = e.outerHeight(), d > g && (g = d))), $("#resizable-element").css({
                height: g + "px"
            }), selectedItem.css({
                height: g + "px"
            }), selectedItem.find(".widget-content:eq(0)").css({
                height: g + "px"
            });
            var j = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[j].media[deviceEdit].height = g + "px"
        }
    }
},
LpResize.prototype.resetCusorResize = function () {
    if ($("#resizable-element .ui-resizable-s").css({
        cursor: "s-resize"
    }), $("#resizable-element .ui-resizable-e").css({
        cursor: "e-resize"
    }), $("#resizable-element .ui-resizable-n").css({
        cursor: "n-resize"
    }), $("#resizable-element .ui-resizable-w").css({
        cursor: "w-resize"
    }), $("#resizable-element .ui-resizable-se").css({
        cursor: "se-resize"
    }), $("#resizable-element .ui-resizable-sw").css({
        cursor: "sw-resize"
    }), $("#resizable-element .ui-resizable-ne").css({
        cursor: "ne-resize"
    }), $("#resizable-element .ui-resizable-nw").css({
        cursor: "nw-resize"
    }), selectedItem && selectedItem.length > 0) {
        var a = selectedItem.attr("pn-type");
        switch (a) {
            case "shape":
                $("#resizable-element .ui-resizable-handle").hide(), $("#resizable-element .ui-resizable-handle.ui-resizable-ne").show(), $("#resizable-element .ui-resizable-handle.ui-resizable-nw").show(), $("#resizable-element .ui-resizable-handle.ui-resizable-se").show(), $("#resizable-element .ui-resizable-handle.ui-resizable-sw").show(), ratio = 1;
                break;
            case "line":
                ratio = 0, $("#resizable-element .ui-resizable-handle").hide(), $("#resizable-element .ui-resizable-handle.ui-resizable-w").show(), $("#resizable-element .ui-resizable-handle.ui-resizable-e").show(), $("#resizable-element .ui-rotatable-handle").css({
                    display: "none"
                });
                break;
            case "linevertical":
                ratio = 0, $("#resizable-element .ui-resizable-handle").hide(), $("#resizable-element .ui-resizable-handle.ui-resizable-n").show(), $("#resizable-element .ui-resizable-handle.ui-resizable-s").show(), $("#resizable-element .ui-rotatable-handle").css({
                    display: "none"
                });
                break;
            case "textinline":
                $("#resizable-element .ui-resizable-handle").hide(), $("#resizable-element .ui-resizable-handle.ui-resizable-e").show(), $("#resizable-element .ui-resizable-handle.ui-resizable-w").show();
                break;
            case "listop":
                $("#resizable-element .ui-resizable-handle").hide(), $("#resizable-element .ui-resizable-handle.ui-resizable-e").show(), $("#resizable-element .ui-resizable-handle.ui-resizable-w").show();
                break;
            case "textparagraph":
                $("#resizable-element .ui-resizable-handle").hide(), $("#resizable-element .ui-resizable-handle.ui-resizable-e").show(), $("#resizable-element .ui-resizable-handle.ui-resizable-w").show();
                break;
            case "item_slider":
                $("#resizable-element .ui-resizable-handle").hide();
                break;
            case "videoyoutube":
                $("#resizable-element .ui-resizable-handle").hide(), "desktop" == deviceEdit ? $("#resizable-element .ui-resizable-handle").show() : ($("#resizable-element .ui-resizable-handle.ui-resizable-ne").show(), $("#resizable-element .ui-resizable-handle.ui-resizable-nw").show(), $("#resizable-element .ui-resizable-handle.ui-resizable-se").show(), $("#resizable-element .ui-resizable-handle.ui-resizable-sw").show());
                break;
            default:
                ratio = "", $("#resizable-element .ui-resizable-handle").show()
        }
    }
};