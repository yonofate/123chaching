var lpService = DummyData,
    AddToFrame = function() {},
    dragSec = !1,
    pageYSec = 0,
    idplugin = "",
    dragPlugin = "",
    typePlugin = "";
AddToFrame.prototype.init = function() {
    typePlugin = $(".aside-left li.active").attr("language");
    var a = (new TreeWidget, !1);
    $(".resizable-popup");
    $('.aside-left li[data-type="group-element"]').unbind("hover").hover(function() {
        typePlugin = $(this).attr("language"), PN_PAGE.showElementEditorText()
    }), $('.aside-left li[data-type="element"]').unbind("hover").hover(function() {
        typePlugin = $(this).attr("language"), a = !1, selectedItem = void 0, idplugin = $(this).attr("language"), $(".widgets").removeClass("active"), $(".template-plugin-section").hide(), PN_PAGE.showElementEditorText()
    }), $('.aside-left li[data-type="element"]').unbind("click").click(function() {
        if (idplugin = $(this).attr("language"), $(".aside-left li").removeClass("active"), $(this).addClass("active"), !a) {
            var b = new AddToFrame;
            b.addNewElement(idplugin, dragPlugin)
        }
        dragPlugin = !1, dragSec = !1, idplugin = "", PN_PAGE.showElementEditorText()
    }), $('.aside-left li[data-type="element"]').each(function() {
        $(this).draggable({
            destroy: !0
        })
    }), $('.aside-left li[data-type="element"]').draggable({
        appendTo: "body",
        revert: !0,
        helper: "clone",
        start: function(b, c) {
            a = !1, PN_PAGE.showElementEditorText()
        },
        drag: function(b, c) {
            a = !0, dragPlugin = !0, idplugin = $(this).attr("language")
        },
        stop: function(a, b) {
            $(this).css({
                background: ""
            }), idplugin = ""
        }
    }), $(".widgets .elements li").unbind("mousedown").mousedown(function() {
        a = !1, selectedItem = void 0, idplugin = $(this).attr("language"), $(this).find("span").css({
            "vertical-align": "top"
        }), PN_PAGE.showElementEditorText()
    }), $(".widgets .elements li").unbind("click").click(function(b) {
        if (idplugin = $(this).attr("language"), !a) {
            var c = new AddToFrame;
            c.addNewElement(idplugin, dragPlugin)
        }
        dragPlugin = !1, idplugin = "", PN_PAGE.showElementEditorText()
    }), $(".widgets .elements li").each(function() {
        $(this).draggable({
            destroy: !0
        })
    }), $(".widgets .elements li").draggable({
        appendTo: "body",
        revert: !0,
        helper: "clone",
        start: function(b, c) {
            a = !1, PN_PAGE.showElementEditorText()
        },
        drag: function(b, c) {
            a = !0, dragPlugin = !0, idplugin = $(this).attr("language")
        },
        stop: function(a, b) {
            $(this).css({
                background: ""
            }), idplugin = "", dragPlugin = !1
        }
    })
},
AddToFrame.prototype.addElementDrag = function () {
    var a, b, c, d = this,
        e = 0,
        f = new TreeWidget;
    PN_PAGE.PUNNEL_EDIT = $("#punnel-editor");
    var g = $(".resizable-popup");
    if (g && g.length > 0 && "none" != g.css("display")) {
        var h = new OptionWiget;
        topScroll = 0, PN_PAGE.PUNNEL_EDIT.scrollTop(0), h.setValueFrameToScroll()
    }
    var i = d.eleAdd(event);
    if (dragPlugin)
        if ("section" != typePlugin && "popup" != typePlugin) {
            if (i && i.length > 0)
                if ("contact_form" == idplugin && (a = PN_PAGE.getElement('.widget-element[pn-type="contact_form"]')), "shape" == idplugin) typeselecteShape = "addnewshape", $("#managerShape").modal("show");
               // else if ("image" == idplugin) typeImage = "addnew", $("#managerImage").unbind("modal").modal("show");
            else {
                var j = i.offset().top,
                    k = i.offset().left;
                if (b = event.pageY - j, c = event.pageX - k, void 0 == valueTemplate[idplugin]);
                else {
                    pageSave = !1;
                    var l = {
                        html: PN_PAGE.PUNNEL_EDIT.html(),
                        api: apiElement
                    };
                    if (changePage.push(l), "textinline" == idplugin) {
                        var m = PN_PAGE.PUNNEL_EDIT.find("h1");
                        m && m.length > 0 ? i.append(valueTemplate.textinline2) : i.append(valueTemplate[idplugin])
                    } else i.append(valueTemplate[idplugin]);
                    var n = PN_PAGE.PUNNEL_EDIT.find("#pn-new");
                    n.css({
                        top: b + "px",
                        left: c + "px"
                    }), void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain && (e = dummyData.numLayerMain), n.attr("id", n.attr("pn-lang") + "" + e), e++, dummyData.numLayerMain = e, d.apiDefault(idplugin, "widget-element", n.attr("id"), "", b + "px", c + "px", "", ""), selectedItem = PN_PAGE.getElement("#" + n.attr("id"));
                    var h = new OptionWiget;
                    h.addElementUndo("new", selectedItem), h.addElementUndo("", selectedItem), h.showPropertiesElement("edit"), "contact_form" == idplugin && d.addItemFormDefault(selectedItem), "slider" == idplugin && this.addItemSlider(selectedItem);
                    var o = new IframeClick;
                    if (o.addClassSelected(selectedItem), i.parent().hasClass("widget-section") && "true" == i.parent().attr("pn-popup") && "none" != i.parent().css("display")) {
                        o.addClassSelected(i.parent());
                        var p = new ShowBoxResize;
                        p.showBoxSection(i.parent())
                    }
                    settings(), f.init(), dragPlugin = !1
                }
            }
        } else pageMouseX = event.pageX, pageMouseY = event.pageY, "section" == typePlugin && $("#modal-add-section").modal("show"), "popup" == typePlugin && $("#modal-add-popup").modal("show");
    dragPlugin = !1, $("#resizable-element").hide()
},
AddToFrame.prototype.getPositionSection = function () {
    var a = void 0,
        b = "tren",
        c = new AddToFrame;
    return a = c.eleAdd(!1).parent(), {
        elementAdd: a,
        vtAdd: b
    }
},
AddToFrame.prototype.addNewElement = function(type, options) {
    var self = new AddToFrame;
    if (!options) {
        var resizable_popup = $(".resizable-popup");
        if (resizable_popup && resizable_popup.length > 0 && "none" != resizable_popup.css("display")) {
            PN_PAGE.PUNNEL_EDIT.scrollTop(0);
        }
        topScroll = PN_PAGE.PUNNEL_EDIT.scrollTop();
        TOP_FRAME = PN_PAGE.PUNNEL_EDIT.offset().top;
        var updatesCount = (new TreeWidget, 0);
        if ("section" != type && "popup" != type) {
            if ("shape" == type) {
                typeselecteShape = "addnewshape";
                $("#managerShape").modal("show");
            } else {
                if ("image" == type) {
                    //typeImage = "addnew";
                    //$("#managerImage").unbind("modal").modal("show");
                } else {
                    var expRecords = PN_PAGE.PUNNEL_EDIT.find(".widget-section");
                    var elt = this.eleAdd(false);
                    if (elt && elt.length > 0) {
                        if (expRecords.length > 0) {
                            if (pageSave = false, elt = elt.length > 1 ? elt.eq(1) : elt.eq(0), "textinline" == type) {
                                var translatableContent = PN_PAGE.PUNNEL_EDIT.find("h1");
                                if (translatableContent && translatableContent.length > 0) {
                                    elt.append(valueTemplate.textinline2);
                                } else {
                                    elt.append(valueTemplate[type]);
                                }
                            } else {
                                elt.append(valueTemplate[type]);
                            }
                            var layerE = (new Date, PN_PAGE.getElement("#pn-new"));
                            if (void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain) {
                                updatesCount = dummyData.numLayerMain;
                            }
                            layerE.attr("id", layerE.attr("pn-lang") + "" + updatesCount);
                            updatesCount++;
                            dummyData.numLayerMain = updatesCount;
                            var orig_top;
                            var i;
                            orig_top = $(window).outerHeight() / 2 - elt.offset().top - TOP_FRAME - layerE.outerHeight() / 2;
                            if (orig_top + layerE.outerHeight() > elt.outerHeight()) {
                                orig_top = elt.outerHeight() - layerE.outerHeight();
                            } else {
                                if (0 > orig_top) {
                                    orig_top = 20;
                                }
                            }
                            i = 0;
                            layerE.css({
                                top : orig_top + "px",
                                left : i + "px"
                            });
                            self.apiDefault(type, "widget-element", layerE.attr("id"), "", orig_top + "px", i + "px", "", "");
                            selectedItem = PN_PAGE.getElement("#" + layerE.attr("id"));
                            this.setCenterWg(selectedItem);
                            var that = new OptionWiget;
                            that.addElementUndo("new", selectedItem);
                            that.addElementUndo("", selectedItem);
                            that.showPropertiesElement("edit");
                            if ("contact_form" == type) {
                                self.addItemFormDefault(selectedItem);
                            }
                            if ("slider" == type) {
                                self.addItemSlider(selectedItem);
                            }
                            var viewModel = new IframeClick;
                            viewModel.addClassSelected(selectedItem);
                            var show_resize = new ShowBoxResize;
                            show_resize.showBox(selectedItem);
                            settings();
                        }
                        $("#RIGHT_MOUSE .right-mouse").hide();
                        $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide();
                    }
                }
            }
        } else {
            if ("section" == type) {
                //$("#modal-add-section").modal("show");
            }
            if ("popup" == type) {
                //$("#modal-add-popup").modal("show");
            }
        }
    }
},
AddToFrame.prototype.addItemMenu = function (a) {
    var b = 0,
        c = this,
        d = "0px";
    void 0 != a.find(".widget-element") && a.find(".widget-element").length > 0 && (d = parseFloat(a.find(".widget-element").last().css("left")) + a.find(".widget-element").last().outerWidth() + "px"), a.find(".widget-content").eq(0).append(valueTemplate.item_menu);
    var e = a.find("#pn-new");
    void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain && (b = dummyData.numLayerMain), e.attr("id", e.attr("pn-lang") + "" + b), b++, dummyData.numLayerMain = b, e.css({
        top: "0px",
        left: d
    }), e.find(".widget-content").eq(0).text("NEW MENU"), c.apiDefault("item_menu", "widget-element", e.attr("id"), "", e.css("top"), e.css("left"), "", ""), apiElement[apiElement.length - 1].text = "NEW MENU";
    var f = PN_PAGE.getIndexElement(a.attr("id")),
        g = apiElement[f].media[deviceEdit].color;
    apiElement[apiElement.length - 1].media.desktop.color = g, apiElement[apiElement.length - 1].media.mobile.color = g, selectedItem.find("#" + apiElement[apiElement.length - 1].id + " .widget-content").eq(0).css({
        color: g
    })
},
AddToFrame.prototype.addItemFormDefault = function(a) {
    var ty = 0;
    var parts = ["name", "email", "phone", "message"];
    var self = this;
    var key = 0;
    for (var i = 0; i < parts.length; i++) {
        a.find(".widget-content:eq(0)").append(valueTemplate.item_form);
        var g = a.find("#pn-new");

        for (var c_it = 0; c_it < type_field_form.length; c_it++) {
            if (type_field_form[c_it].type == parts[i]) {
                key = c_it;
                break;
            }
        }
        if (g.append(type_field_form[key].html), void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain && (ty = dummyData.numLayerMain), g.attr("id", g.attr("pn-lang") + "" + ty), ty++, dummyData.numLayerMain = ty, g.css({
            top : 45 * i + "px",
            left : "0px"
        }), "message" == parts[i] && g.css({
            height : "100px"
        }), self.apiDefault("item_form", "widget-element", g.attr("id"), "", g.css("top"), g.css("left"), "", g.css("height")), apiElement[apiElement.length - 1].type_form = parts[i], apiElement[apiElement.length - 1].placeholder_form = type_field_form[key].placeholder, apiElement[apiElement.length - 1].name_form = type_field_form[key].name, apiElement[apiElement.length - 1].label_form = type_field_form[key].label, apiElement[apiElement.length - 
        1].required_form = type_field_form[key].required, apiElement[apiElement.length - 1].name_form_id = type_field_form[key].name, i == parts.length - 1) {
            a.parent().append(valueTemplate.button);
            g = PN_PAGE.getElement("#pn-new");
            g.css({
                top : a.offset().top - a.parent().offset().top + a.outerHeight() + 10 + "px",
                //top: a.offset().top - a.parent().offset().top + 45*(i+1) + 5 + "px",
                left: a.css("left")
            });
            //a.css({
            //    height: 45 * (i + 1) + "px"
            //})
            g.find(".widget-content span").text("Submit");
            if (void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain) {
                ty = dummyData.numLayerMain;
            }
            g.attr("id", g.attr("pn-lang") + "" + ty);
            ty++;
            dummyData.numLayerMain = ty;
            g.attr("pn-parent", a.attr("id"));
            g.find(".widget-content").eq(0).text("Submit");
            self.apiDefault("button", "widget-element", g.attr("id"), "", g.css("top"), g.css("left"), a[0].clientWidth+"px", "");
            apiElement[apiElement.length - 1].text = "Submit";
            apiElement[apiElement.length - 1].id_parent = a.attr("id");
            var i = new OptionWiget;
            i.sortWg();
        }
    }
},
AddToFrame.prototype.addItemSlider = function (a) {
    for (var b = 0, c = this, d = 0; 3 > d; d++) {
        a.find(".widget-content:eq(0)").find(".wrap-child").eq(0).append(valueTemplate.item_slider);
        var e = a.find("#pn-new");
        void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain && (b = dummyData.numLayerMain), e.attr("id", e.attr("pn-lang") + "" + b), e.css({
            top: "0px",
            left: dummyData.viewport.size_mobile * d + "px",
            width: dummyData.viewport.size_mobile + "px",
            height: dummyData.viewport.size_mobile + "px"
        }), b++, dummyData.numLayerMain = b, c.apiDefault("item_slider", "widget-element", e.attr("id"), "", e.css("top"), e.css("left"), "", e.css("height")), apiElement[apiElement.length - 1].parent = "#" + a.attr("id") + " .widget-content"
    }
},
AddToFrame.prototype.eleAdd = function (a) {
    var b, c, d = void 0;
    TOP_FRAME = PN_PAGE.PUNNEL_EDIT.offset().top;
    var e = $(".resizable-popup");
    if (e && e.length > 0 && "none" != e.css("display")) {
        var f = PN_PAGE.getElement("#" + e.attr("pn-id-popup"));
        return f.find(".container")
    }
    if (b = 0 != a ? a.pageY : $(window).outerHeight() / 2, dragSec && (b = pageYSec), c = PN_PAGE.getElement(".container"), c.each(function() {
            var a = parseFloat($(this).offset().top) + TOP_FRAME,
                c = parseFloat($(this).outerHeight());
            b > a && a + c > b && "none" != $(this).parent().css("display") && (d = $(this))
        }), void 0 == d) {
        var f = PN_PAGE.getElement(".widget-section:visible").length;
        d = PN_PAGE.getElement(".widget-section:visible").eq(f - 1).find(".container")
    }
    return d
},
AddToFrame.prototype.apiDefault = function (a, b, c, d, e, f, g, h) {
    var i = new ApiDefault,
        j = {};
    if (void 0 != d && "" != d && null != d) {
        var k = PN_PAGE.getIndexElement(d);
        j.id = c,
        j.type_plugin = apiElement[k].type_plugin,
        j.media = {},
        j.mobile = 0,
        j.lp_type = apiElement[k].lp_type,
        j.media = apiElement[k].media,
        j.image = apiElement[k].image,
        j.item_menu = apiElement[k].item_menu,
        j.item_form = apiElement[k].item_form,
        j.action = apiElement[k].action,
        j.text = apiElement[k].text,
        j.bg_type = apiElement[k].bg_type,
        j.auto_play = apiElement[k].auto_play,
        j.time_out = apiElement[k].time_out,
        j.link = apiElement[k].link
    } else void 0 === i["" + a] ? (j.id = c, j.type_plugin = PN_PAGE.getElement("#" + c).attr("pn-type"), j.media = {}, j.mobile = 0, j.media.desktop = {}, j.media.mobile = {}, j.lp_type = b, j.media.desktop.top = e, j.media.desktop.left = f, j.media.desktop.width = g, j.media.desktop.height = h) : (j = new i["" + a], j.id = c, j.type_plugin = a, j.mobile = 0, j.media.desktop.top = e, j.media.desktop.left = f, "group" == b && (j.media.desktop.width = g, j.media.desktop.height = h, j.media.mobile.width = g, j.media.mobile.height = h), "" != g && (j.media.desktop.width = g), "" != h && (j.media.desktop.height = h));
    j.type_plugin = PN_PAGE.getElement("#" + c).attr("pn-type");
    var l = new setStyleElement,
        m = PN_PAGE.getElement("#" + j.id);
    if (j.lang = m.attr("pn-lang"), j.media.display = "block", m.attr("pn-display", "block"), m.hasClass("widget-element") && "GROUP_TMP" != m.attr("id")) {
        l.setStyleItem(j, "desktop"), "listop" == m.attr("pn-type") && l.setStyleList(j);
        var n = m.parent();
        n.hasClass("container") && (j.parent = "#" + n.parent().attr("id") + " .container"), n.hasClass("widget-content") && (j.parent = "#" + n.parent().attr("id") + " .widget-content"), n.hasClass("wrap-child") && (j.parent = "#" + n.parent().parent().attr("id") + " .widget-content")
    } else l.setStyleSection(j, deviceEdit), j.parent = "body", showAddNewSection();
    if ("textinline" == a && PN_PAGE.PUNNEL_EDIT.find("h1") && PN_PAGE.PUNNEL_EDIT.find("h1").length > 0 && (j.node = "h2"), "googlemap" == m.attr("pn-type")) {
        var o = j.value_google_map.zoom,
            p = j.value_google_map.address,
            q = j.value_google_map.title,
            r = j.value_google_map.icon;
        void 0 != r && "" != r && (q = '<div class="pn-maptitle"><p><img scr="' + r + '"></p><p>' + q + "</p></div>");
        var s = m.find(".widget-content").eq(0)[0],
            t = new OptionWiget;
        t.createMapsgoogle(s, o, p, q)
    }
    if ("facebook_comment" == m.attr("pn-type")) {
        var u = "https://www.facebook.com/plugins/comments.php?api_key=" + j.value_facebook_comment.api_key + "&href=" + j.value_facebook_comment.url + "&amp;numposts=" + j.value_facebook_comment.number_post + "&amp;channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Df123138e34%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff281f41a98%26relation%3Dparent.parent&&amp;locale=vi_VN&amp;sdk=joey&amp;version=v2.3";
        m.find(".widget-content").eq(0).attr("src", u)
    }
    if ("facebook_messages" == m.attr("pn-type")) {
        var u = "https://www.facebook.com/v2.5/plugins/page.php?adapt_container_width=true&app_id=113869198637480&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Dfc17a1604%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff1e8e518fc%26relation%3Dparent.parent&container_width=613&hide_cover=true&locale=vi_VN&sdk=joey&show_facepile=true&small_header=true&tabs=messages&width=" + parseFloat(j.media[deviceEdit].width) + "&height=" + parseFloat(j.media[deviceEdit].height) + "&href=" + j.value_facebook_messages.url;
        m.find(".widget-content").eq(0).attr("src", u), m.find(".widget-content").eq(0).css({
            height: parseFloat(j.media[deviceEdit].height) + "px"
        })
    }
    $('.topbar .mtab li[pn-active="popup"]').hasClass("active") && m.hasClass("widget-section") && (j.popup = !0, m.attr("pn-popup", "true")), PN_PAGE.sortMobilePublish = 1, apiElement.push(j), dummyData.apiElement = apiElement, arrIdOnScreen.push(m.attr("id"));
    var v = new resetPage;
    v.init()
},
AddToFrame.prototype.generateGUID = function () {
    var a = (new Date).getTime(),
        b = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(b) {
            var c = (a + 16 * Math.random()) % 16 | 0;
            return a = Math.floor(a / 16), ("x" == b ? c : 3 & c | 8).toString(16)
        });
    return b
},
AddToFrame.prototype.setCenterWg = function (a) {
    if (void 0 != a && a.length > 0) {
        var b = a.parent(),
            c = (b.outerWidth() - a.outerWidth()) / 2 + "px",
            d = PN_PAGE.getIndexElement(a.attr("id"));
        apiElement[d].media[deviceEdit].left = c, a.css({
            left: c
        })
    }
},
AddToFrame.prototype.themDoanTrang = function () {
    var a = $(".resizable-popup");
    if ("none" != a.css("display")) {
        var b = new AlertPnotify;
        b.createMessage("Không thêm section trắng vào popup!")
    } else {
        var c = $("#punnel-editor .widget-section");
        if (typeAddNew == typeSection && c && c.length > 0) {
            var b = new AlertPnotify;
            b.createMessage("Template section chỉ có section trắng duy nhất!")
        } else {
            var d = new AddToFrame,
                e = 0;
            PN_PAGE.PUNNEL_EDIT.append(valueTemplate.widget_section);
            var f = PN_PAGE.getElement("#pn-new");
            void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain && (e = dummyData.numLayerMain), f.attr("id", f.attr("pn-lang") + "" + e), e++, dummyData.numLayerMain = e, d.apiDefault("widget_section", "widget_section", f.attr("id"), "", "", "", "100%", "500px");
            var g = getPositionSectionNew(),
                h = g.elementAdd,
                i = g.vtAdd,
                j = PN_PAGE.getElement("#" + f.attr("id"));
            if (h && h.length > 0 && ("tren" == i ? void 0 == h || j.insertBefore(h) : j.insertAfter(h)), PN_PAGE.getElement(".selected").removeClass("selected"), selectedItem = PN_PAGE.getElement("#" + f.attr("id")), selectedItem.addClass("selected"), dragSec) {
                var k = this.eleAdd(!1).parent();
                selectedItem.insertAfter(k)
            }
            $("#resizable-section").hide();
            var l = new OptionWiget;
            l.sortWg(), PN_PAGE.getElement(".widget-section").css({
                "border-bottom": "1px dashed rgba(6,21,40,1)"
            });
            var m = new ShowBoxResize;
            m.showBoxSection(selectedItem), l.fixsizeBody(), l.changeValuePage(), l.addElementUndo("new", selectedItem), l.addElementUndo("", selectedItem), showAddNewSection()
        }
    }
};