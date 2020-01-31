var setHtmlLadi = function() {};
setHtmlLadi.prototype.init = function () { },
    setHtmlLadi.prototype.checkVal = function (a) {
        return void 0 == a || "" == a ? !0 : !1
    },
    setHtmlLadi.prototype.getTemplate = function (a, b, c) {
        var d = this;
        d[b] && (d[b](a, valueTemplate[b], function () {
            d.setLightbox(a), a.action && a.action.length > 0 && d.addLinkElement(a), d.addChecking(a), d.checkFixed(a), d.setSticky(a), d.setDatabind(a), d.setTextAnimatedHeadline(a), d.setElementCustomStyle(a), d.setAutoScroll(a)
        }), c())
    },
    setHtmlLadi.prototype.widget_section = function (a, b, c) {
        if (PN_PAGE.PUNNEL_EDIT && PN_PAGE.PUNNEL_EDIT.length > 0) {
            if (this.checkElement(a)) {
                var d;
                PN_PAGE.PUNNEL_EDIT.append(b), d = PN_PAGE.getElement("#pn-new"), d.attr({
                    id: a.id,
                    "pn-lang": a.lang
                }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), this.checkPopup(a, d), this.setDisplayNone(a, d), showAddNewSection()
            }
            this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.item_menu = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), d.find(".widget-content").eq(0).html(a.text), void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setDisplayNone(a, d), this.setDisplayItemChild(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.notify = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);

            e.append(b), d = e.find("#pn-new"),
                d.attr({
                    id: a.id,
                    "pn-lang": a.lang
                });
            if (d.data("notify")) {
                void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent),
                    d.data("notify").sheetid = a.media[deviceEdit]["notify-sheetid"] || '', d.data("notify").position = a.media[deviceEdit]["notify-position"] || 'topright', (void 0 == d.data("notify").position || "" == d.data("notify").position) && (d.data("notify").position = "bottomleft"), d.attr("data-notify", JSON.stringify(d.data("notify"))), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d)
            }
        }
    },
    setHtmlLadi.prototype.button = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            if (e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), d.find(".widget-content").eq(0).html(a.text), void 0 != a.element_click && "" != a.element_click && null != a.element_click) {
                for (var f = "", g = "", h = 0; h < a.element_click.length; h++) "show" == a.element_click[h].click ? f = f + ";" + a.element_click[h].id : g = g + ";" + a.element_click[h].id;
                d.attr("pn-click-show", f), d.attr("pn-click-hide", g)
            }
            void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c(), this.setanimate_ext(a)
        }
    },
    setHtmlLadi.prototype.contact_form = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = a.message_form_post,
                f = "",
                g = {},
                h = PN_PAGE.getElement(a.parent).eq(0);
            h.append(b);
            d = h.find("#pn-new");
            if (a.autoReply && a.autoReply > 0) {
                d.attr('pn-auto-reply', a.autoReply);
            } else d.attr('pn-auto-reply', 0);

            if (a.tracking && a.tracking > 0) {
                d.attr('pn-tracking', a.tracking);
            }

            switch (a.positionItem && a.positionItem.length > 0 && d.attr("pn-vt-item", JSON.stringify(a.positionItem)), a.type_form) {
                case "pc":
                    break;
                case "linkpost":
                    f = a.url_form_post;
                    break;
                case "mailchimp":
                    d.attr({
                        id: a.id,
                        "pn-lang": a.lang,
                        "pn-type-form": "mailchimp",
                        "pn-action": a.apiKeyMailchimp,
                        "pn-name-mailchimp": a.nameMailchimp,
                        "pn-message-form": e,
                        "pn-ss-f": JSON.stringify(a.valueApiForm)
                    });
                    break;
                case "getresponse":
                    d.attr({
                        id: a.id,
                        "pn-lang": a.lang,
                        "pn-type-form": "getresponse",
                        "pn-action": a.apiKeyGetresponse,
                        "pn-name-getresponse": a.nameGetresponse,
                        "pn-message-form": e,
                        "pn-ss-f": JSON.stringify(a.valueApiForm)
                    });
                    break;
                case "google":
                    f = a.settingsForm.action, void 0 == a.settingsForm && (a.settingsForm = {}), g.items = a.settingsForm.items, g.itemsSave = a.settingsForm.itemsSave, g.fvv = a.settingsForm.fvv, g.draftResponse = a.settingsForm.draftResponse, g.pageHistory = a.settingsForm.pageHistory, g.fbzx = a.settingsForm.fbzx, g.action = a.settingsForm.action, d.attr({
                        id: a.id,
                        "pn-lang": a.lang,
                        "pn-type-form": a.type_form,
                        "pn-action": f,
                        "pn-message-form": e,
                        "pn-data-form": JSON.stringify(g),
                        "pn-ss-f": JSON.stringify(a.valueApiForm)
                    });
                    break;
                case "email":
                    d.attr({
                        id: a.id,
                        "pn-lang": a.lang,
                        "pn-type-form": "email",
                        "pn-action": a.actionEmail,
                        "pn-message-form": e,
                        "pn-ss-f": JSON.stringify(a.valueApiForm)
                    });
                    break;
                case "google-sheet":
                    d.attr({
                        id: a.id,
                        "pn-lang": a.lang,
                        "pn-type-form": "google-sheet",
                        "pn-action": a.idSheetPublish,
                        "pn-message-form": e,
                        "pn-ss-f": JSON.stringify(a.valueApiForm)
                    });
                    break;
                case "api":
                    d.attr({
                        id: a.id,
                        "pn-lang": a.lang,
                        "pn-type-form": "api",
                        "pn-action": a.urlApi,
                        "pn-message-form": e,
                        "pn-data-form": JSON.stringify(a.valueApiForm),
                        "pn-ss-f": JSON.stringify(a.valueApiForm)
                    });
                    break;
                default:
                    d.attr({
                        id: a.id,
                        "pn-lang": a.lang,
                        "pn-type-form": "email",
                        "pn-action": a.actionEmail,
                        "pn-message-form": e,
                        "pn-ss-f": JSON.stringify(a.valueApiForm)
                    })
            }
            a.configFormClient && a.configFormClient.length > 0 && (d.attr("pn-config-client", JSON.stringify(a.configFormClient)), d.attr("pn-ss-f", JSON.stringify(a.valueApiForm))), a.formdetailid && a.formdetailid.length > 0 && a.configFormServe && a.configFormServe.length > 0 && d.attr("id-conf-sv", a.formdetailid), a.idPopupSub && (a.idPopupSub + '').length > 0 && (1 == a.idPopupSub ? d.attr("pn-id-pop-url", a.urlSubmit) : d.attr("pn-id-pop-sub", a.idPopupSub)), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c();
        }
    },
    setHtmlLadi.prototype.item_form = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            if (e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), a.html_form && a.html_form.length > 0) d.html(a.html_form), d.find(".widget-content").eq(0).attr("placeholder", a.placeholder_form), d.find(".widget-content").eq(0).attr("name", a.name_form), d.find(".widget-content").eq(0).attr("pn-label", a.label_form), d.find(".widget-content").eq(0).attr("pn-name-id", a.name_form_id), (1 == a.required_form || "true" == a.required_form) && d.find(".widget-content").eq(0).attr("required", "required"),
                this.setValueItemForm(a, d);
            else
                for (var f = 0; f < type_field_form.length; f++)
                    if (type_field_form[f].type == a.type_form) {
                        d.html(type_field_form[f].html), d.find(".widget-content").eq(0).attr("placeholder", a.placeholder_form), d.find(".widget-content").eq(0).attr("name", a.name_form), d.find(".widget-content").eq(0).attr("pn-label", a.label_form), d.find(".widget-content").eq(0).attr("pn-name-id", a.name_form_id), (1 == a.required_form || "true" == a.required_form) && d.find(".widget-content").eq(0).attr("required", "required"), this.setValueItemForm(a, d);
                        break
                    }
            this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.image = function (a, b, c) {
        if (this.checkElement(a)) {
            (-1 != a.link.search(ApiStaticM) || a.link.search(ApiStaticT) || a.link.search(ApiStaticD)) && (a.link = a.link.replace(ApiStaticM, ApiStatic), a.link = a.link.replace(ApiStaticT, ApiStatic), a.link = a.link.replace(ApiStaticD, ApiStatic));
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            if ("important" == a.addClassBackground ? (e.prepend(b), e.find("#pn-new").addClass("important").attr("pn-type-background", "important")) : e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), -1 != a.link.search(".svg") || -1 != a.link.search(".SVG")) d.find(".widget-content:eq(0) img:first-child").attr({
                src: a.link
            });
            else {
                a.link = a.link.replace("hstatic.punnel.com//", "hstatic.punnel.com/");
                var f = a.link.replace(apiStaticDefault, ApiStaticM),
                    g = (a.link.replace(apiStaticDefault, ApiStaticT), a.link.replace(apiStaticDefault, ApiStaticD), "");
                parseFloat(a.media.desktop.width) < 768 ? d.find(".widget-content:eq(0) img:first-child").attr({
                    src: f
                }) : d.find(".widget-content:eq(0) img:first-child").attr({
                    src: f,
                    size: "100vw",
                    srcset: g
                })
            }
            void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c(), this.setanimate_ext(a)
        }
    },
    setHtmlLadi.prototype.slide_show = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            if ("important" == a.addClassBackground ? (e.prepend(b), e.find("#pn-new").addClass("important").attr("pn-type-background", "important")) : e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang,
                "pn-timeout": a.time_out,
                "pn-autoplay": a.auto_play
            }), d.find(".widget-content").eq(0).addClass(a.colorNavigation).attr("pn-style-navigation", a.colorNavigation), void 0 != d.find(".widget-content .item_slide li").eq(0)[0] && void 0 != d.find(".widget-content .pager div").eq(0)[0]) {
                var f = d.find(".widget-content .item_slide li").eq(0)[0].outerHTML,
                    g = d.find(".widget-content .pager div").eq(0)[0].outerHTML;
                d.find(".widget-content .item_slide").html(""), d.find(".widget-content .pager").html("");
                for (var h = 0; h < a.image.length; h++) d.find(".widget-content .item_slide").append(f), d.find(".widget-content .pager").append(g), d.find(".widget-content .item_slide li").eq(h).find("img").eq(0).attr("src", a.image[h].src), d.find(".widget-content .item_slide li").eq(h).find("img").eq(0).attr("alt", a.image[h].title), d.find(".widget-content .pager .pager-item").eq(h).find("a").attr("data-slide-index", h)
            }
            d.find(".item_slide li").hide(), d.find(".item_slide li:eq(0)").show(), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.menu_header = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), d.find(".widget-content .ulMenuDeskTop").html(""), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), "true" == a.navigation && d.attr("pn-navigation", "true"), "vertical" == a.media[deviceEdit].item_vertical && d.attr("pn-direction", "vertical"), d.attr("vertical-mobile", a.media.mobile.item_vertical).attr("vertical-desktop", a.media.desktop.item_vertical), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.box = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c(), this.setanimate_ext(a)
        }
    },
    setHtmlLadi.prototype.shape = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            if (e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), void 0 != a.htmlShape && "" != a.htmlShape && (a.htmlShape = a.htmlShape.replace("&lt;", "<"), a.htmlShape = a.htmlShape.replace("&lt;", "<"), a.htmlShape = a.htmlShape.replace("&gt;", ">"), a.htmlShape = a.htmlShape.replace("&gt;", ">"), d.find(".widget-content").eq(0).html(""), d.find(".widget-content").eq(0).append($(a.htmlShape)), d.find(".widget-content svg").attr("fill", a.media[deviceEdit].color)), void 0 != a.element_click && "" != a.element_click && null != a.element_click) {
                for (var f = "", g = "", h = 0; h < a.element_click.length; h++) "show" == a.element_click[h].click ? f = f + ";" + a.element_click[h].id : g = g + ";" + a.element_click[h].id;
                d.attr("pn-click-show", f), d.attr("pn-click-hide", g)
            }
            void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c(), this.setanimate_ext(a)
        }
    },
    setHtmlLadi.prototype.customhtml = function (a, b, c) {
        if (this.checkElement(a)) {
            void 0 == typeof $.base64 && ($.base64 = window.BASE64);
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            });
            var f = "";
            a.html && a.html.length > 0 && (f = decodeURI($.base64.decode(a.html))), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), this.setgroup(a);
            PN_PAGE.getIndexElement(a.id);
            this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.textinline = function (a, b, c) {
        if (this.checkElement(a)) {
            a.media.desktop["background-color"] = "", a.media.mobile["background-color"] = "";
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            if (this.isVal(a.node)) {
                var f = "<" + a.node,
                    g = "</" + a.node;
                b = b.replace("<h2", f), b = b.replace("</h2", g)
            }
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), d.find(".widget-content").eq(0).attr("pn-node", a.node).html(a.text), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.textinline2 = function (a, b, c) {
        if (this.checkElement(a)) {
            a.media.desktop["background-color"] = "", a.media.mobile["background-color"] = "";
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            if (this.isVal(a.node)) {
                var f = "<" + a.node,
                    g = "</" + a.node;
                b = b.replace("<h2", f), b = b.replace("</h2", g)
            }
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), d.find(".widget-content").eq(0).attr("pn-node", a.node).html(a.text), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.textinline3 = function (a, b, c) {
        if (this.checkElement(a)) {
            a.media.desktop["background-color"] = "", a.media.mobile["background-color"] = "";
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            if (this.isVal(a.node)) {
                var f = "<" + a.node,
                    g = "</" + a.node;
                b = b.replace("<h2", f), b = b.replace("</h2", g)
            }
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), d.find(".widget-content").eq(0).attr("pn-node", a.node).html(a.text), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.textinline5 = function (a, b, c) {
        if (this.checkElement(a)) {
            a.media.desktop["background-color"] = "", a.media.mobile["background-color"] = "";
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            if (this.isVal(a.node)) {
                var f = "<" + a.node,
                    g = "</" + a.node;
                b = b.replace("<h2", f), b = b.replace("</h2", g)
            }
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), d.find(".widget-content").eq(0).attr("pn-node", a.node).html(a.text), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.textsymbol = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            if (this.isVal(a.node)) {
                var f = "<" + a.node,
                    g = "</" + a.node;
                b = b.replace("<i", f), b = b.replace("</i", g)
            }
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), d.find(".widget-content").eq(0).attr("pn-node", a.node).html(a.text), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.textparagraph = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            if (this.isVal(a.node)) {
                var f = "<" + a.node,
                    g = "</" + a.node;
                b = b.replace("<p", f), b = b.replace("</p", g)
            }
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), d.find(".widget-content").eq(0).attr("pn-node", a.node).html(a.text), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.vimeo = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            "important" == a.addClassBackground ? (e.prepend(b), e.find("#pn-new").addClass("important").attr("pn-type-background", "important")) : e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), d.find(".widget-content").attr("src", a.link), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.videoyoutube = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            "important" == a.addClassBackground ? (e.prepend(b), e.find("#pn-new").addClass("important").attr("pn-type-background", "important")) : e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), d.find(".widget-content").attr({
                src: a.link
            }), a.id_parent && a.id_parent.length > 0 && d.attr("pn-parent", a.id_parent), a.autoPlay && a.autoPlay.length > 0 && d.attr("pn-autoPlay", a.autoPlay);
            for (var f = 0, g = 0; g < a.link.length; g++) "?" == a.link[g] && (f = 1);
            var h = a.link;
            1 == f ? (0 == a.hideTitle || 1 == a.hideTitle || (a.hideTitle = 0), h += "&rel=0&showinfo=" + a.hideTitle, d.find(".widget-content").eq(0).attr("src", h)) : (0 == a.hideTitle || 1 == a.hideTitle || (a.hideTitle = 0), h += "?rel=0&showinfo=" + a.hideTitle, d.find(".widget-content").eq(0).attr("src", h)), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.youtube = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            "important" == a.addClassBackground ? (e.prepend(b), e.find("#pn-new").addClass("important").attr("pn-type-background", "important")) : e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), d.find(".widget-content").attr({
                src: a.link
            }), a.id_parent && a.id_parent.length > 0 && d.attr("pn-parent", a.id_parent), a.autoPlay && a.autoPlay.length > 0 && d.attr("pn-autoPlay", a.autoPlay);
            for (var f = 0, g = 0; g < a.link.length; g++) "?" == a.link[g] && (f = 1);
            var h = a.link;
            1 == f ? (0 == a.hideTitle || 1 == a.hideTitle || (a.hideTitle = 0), h += "&rel=0&showinfo=" + a.hideTitle, d.find(".widget-content").eq(0).attr("src", h)) : (0 == a.hideTitle || 1 == a.hideTitle || (a.hideTitle = 0), h += "?rel=0&showinfo=" + a.hideTitle, d.find(".widget-content").eq(0).attr("src", h)), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.countdown = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent);
            var f, g = d.find(".widget-content div span");
            if (void 0 != a.endtime && "" != a.endtime && "time" == a.typeCoundown && (d.attr("pn-endtime", a.endtime), d.attr("pn-endtimeType", a.typeCoundown), f = this.endtime(a.endtime), g.eq(0).text(f.ngay), g.eq(1).text(f.gio), g.eq(2).text(f.phut), g.eq(3).text(f.giay)), void 0 != a.endtimeDown && "" != a.endtimeDown && "timedown" == a.typeCoundown) {
                d.attr("pn-endtime", a.endtimeDown), d.attr("pn-endtimeType", a.typeCoundown);
                var h = new Date;
                h.setMinutes(h.getMinutes() + parseFloat(a.endtimeDown)), f = this.endtime(h), g.eq(0).text(f.ngay), g.eq(1).text(f.gio), g.eq(2).text(f.phut), g.eq(3).text(f.giay)
            }
            this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.line = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.linevertical = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.googlemap = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            "important" == a.addClassBackground ? (e.prepend(b), e.find("#pn-new").addClass("important").attr("pn-type-background", "important")) : e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent);
            var f = a.value_google_map.zoom,
                g = a.value_google_map.address,
                h = a.value_google_map.title,
                i = a.value_google_map.icon;
            d.attr({
                "pn-mapzoom": f,
                "pn-mapaddress": g,
                "pn-maptitletext": h,
                "pn-maptitleimage": i
            }), (void 0 == f || "" == f) && (f = 14, a.value_google_map.zoom = 14), (void 0 == g || "" == g) && (g = "Ha Noi", a.value_google_map.address = "Ha Noi"), void 0 == h && "Ha Noi" == g && (h = "Hoan Kiem, Ha Noi, Viet Nam", a.value_google_map.title = "Hoan Kiem, Ha Noi, Viet Nam"), void 0 != i && "" != i && (h = '<div class="pn-maptitle"><p><img src="' + a.value_google_map.icon + '"></p><p>' + a.value_google_map.title + "</p></div>");
            var j = d.find(".widget-content").eq(0)[0],
                k = new OptionWiget;
            k.createMapsgoogle(j, f, g, h), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.facebook_comment = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            "important" == a.addClassBackground ? (e.prepend(b), e.find("#pn-new").addClass("important").attr("pn-type-background", "important")) : e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent);
            var f = "https://www.facebook.com/plugins/comments.php?api_key=" + a.value_facebook_comment.api_key + "&href=" + a.value_facebook_comment.url + "&amp;numposts=" + a.value_facebook_comment.number_post + "&amp;channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Df123138e34%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff281f41a98%26relation%3Dparent.parent&&amp;locale=vi_VN&amp;sdk=joey&amp;version=v2.3";
            d.find(".widget-content").eq(0).attr("src", f), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.facebook_messages = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            "important" == a.addClassBackground ? (e.prepend(b), e.find("#pn-new").addClass("important").attr("pn-type-background", "important")) : e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent);
            var f = "https://www.facebook.com/v2.5/plugins/page.php?adapt_container_width=true&app_id=113869198637480&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Dfc17a1604%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff1e8e518fc%26relation%3Dparent.parent&container_width=613&hide_cover=true&locale=vi_VN&sdk=joey&show_facepile=true&small_header=true&tabs=messages&width=" + parseFloat(a.media[deviceEdit].width) + "&height=" + parseFloat(a.media[deviceEdit].height) + "&href=" + a.value_facebook_messages.url;
            d.find(".widget-content").eq(0).attr("src", f), d.find(".widget-content").eq(0).css({
                height: parseFloat(a.media[deviceEdit].height) + "px"
            }), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.slider = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang,
                "pn-delay": a.sliderdelay,
                "pn-autoPlay": a.sliderAutoPlay
            }), d.data("carousel").autoplay = 1 == a.sliderAutoPlay, d.data("carousel").delay = a.sliderdelay, d.attr("data-carousel", JSON.stringify(d.data("carousel"))), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.item_slider = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            e.find(".wrap-child:eq(0)").append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.listop = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), d.find(".widget-content").eq(0).attr("pn-node", a.node).html(a.text), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), void 0 != a.element_click && "" != a.element_click && null != a.element_click && this.setElementClick(a, d), this.setgroup(a), this.setDisplayNone(a, d), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.endtime = function (a) {
        var b = Date.parse(a) - Date.parse(new Date),
            c = Math.floor(b / 1e3 % 60),
            d = Math.floor(b / 1e3 / 60 % 60),
            e = Math.floor(b / 36e5 % 24),
            f = Math.floor(b / 864e5);
        return 0 > c && (c = 0), 0 > d && (d = 0), 0 > e && (e = 0), 0 > f && (f = 0), {
            total: b,
            ngay: f,
            gio: e,
            phut: d,
            giay: c
        }
    },
    setHtmlLadi.prototype.addLinkElement = function (a, b) {
        var c = PN_PAGE.getElement("#" + a.id);
        if (a.type_link && a.type_link.length > 0 && (c.attr("pn-action-link", a.action), c.attr("pn-action-type", a.type_link), c.attr("pn-target", a.target), c.attr("href", ""), "button" == c.attr("pn-type") && "url" == a.type_link && (c.attr("href", a.action).attr("target", a.target), b && "a" != c.prop("tagName").toLowerCase()))) {
            var d = $("<a></a>");
            $.each(c[0].attributes, function () {
                this.specified && d.attr(this.name, this.value)
            }), d.html(c.html()), c.replaceWith(d)
        }
    },
    //setHtmlLadi.prototype.addLinkElement = function (a) {
    //    var b = PN_PAGE.getElement("#" + a.id);
    //    a.type_link && a.type_link.length > 0 && (b.attr("pn-action-link", a.action), b.attr("pn-action-type", a.type_link), b.attr("pn-target", a.target), b.attr("href", ""), "button" == b.attr("pn-type") && "url" == a.type_link && b.attr("href", a.action).attr("target", a.target))
    //},
    setHtmlLadi.prototype.isVal = function (a) {
        return void 0 != a && "undefined" != a && "" != a ? !0 : !1
    },
    setHtmlLadi.prototype.group = function (a, b, c) {
      c()
    },
    setHtmlLadi.prototype.widget_group = function (a, b, c) {
        if (this.checkElement(a)) {
            var d, e = PN_PAGE.getElement(a.parent).eq(0);
            "important" == a.addClassBackground ? (e.prepend(b), e.find("#pn-new").addClass("important").attr("pn-type-background", "important")) : e.append(b), d = e.find("#pn-new"), d.attr({
                id: a.id,
                "pn-lang": a.lang
            }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent), this.setDisplayNone(a, d), this.setgroup(a), this.addClass(a, d), c()
        }
    },
    setHtmlLadi.prototype.setgroup = function (a) {
        if (void 0 != a.idGroup && "" != a.idGroup) {
            var b = PN_PAGE.getElement("#" + a.id);
            b.attr("pn-group", a.idGroup)
        }
    },
    setHtmlLadi.prototype.setLightbox = function (a) {
        if (void 0 != a.lightbox && "" != a.lightbox) {
            var b = PN_PAGE.getElement("#" + a.id);
            b.attr("pn-lightbox", a.lightbox)
        }
    },
    setHtmlLadi.prototype.setElementClick = function (a, b) {
        void 0 != a.element_click && "" != a.element_click && null != a.element_click && b.attr("pn-click-element", JSON.stringify(a.element_click))
    },
    setHtmlLadi.prototype.checkPopup = function (a, b) {
        1 == a.popup ? (b.attr("pn-popup", "true"), $('.topbar .mtab li[pn-active="popup"]').hasClass("active") || b.hide(), a.showPopupPage && "1" == a.showPopupPage && b.attr("pn-show-popup-page", "1"), a.delayShowPopupPage && b.attr("pn-delay-show-popup-page", a.delayShowPopupPage), a.showPopupExitPage && "1" == a.showPopupExitPage && b.attr("pn-show-popup-exit-page", "1"), a.idShowScroll && a.idShowScroll.length > 0 && b.attr("pn-show-popup-id-scroll", a.idShowScroll), (a.trackingPopHead && a.trackingPopHead.length > 0 || a.trackingPopBody && a.trackingPopBody.length > 0) && b.attr("pn-url-tracking", "true"), b.find(".container").prepend('<div class="overlay-container-popup"></div>')) : $('.topbar .mtab li[pn-active="popup"]').hasClass("active") && b.hide()
    },
    setHtmlLadi.prototype.setDisplayNone = function (a, b) {  
    "none" == a.media.display ? b.attr("pn-display", "none") : "button" == b.attr("pn-type") || "item_menu" == b.attr("pn-type") ? b.attr("pn-display", "table") : b.attr("pn-display", "block");
    if ("none" == a.media.desktop.display) b.attr("pn-display", "none");
    },
    setHtmlLadi.prototype.setDisplayItemChild = function (a, b) {
        void 0 != a.media.desktop.display && "undefined" != a.media.desktop.display && "" != a.media.desktop.display && b.attr("pn-desktop-display", a.media.desktop.display), void 0 != a.media.mobile.display && "undefined" != a.media.mobile.display && "" != a.media.mobile.display && b.attr("pn-mobile-display", a.media.mobile.display)
    },
    setHtmlLadi.prototype.demo = function (a, b, c) {
        var d, e = PN_PAGE.getElement(a.parent).eq(0);
        "important" == a.addClassBackground ? (e.prepend(b), e.find("#pn-new").addClass("important").attr("pn-type-background", "important")) : e.append(b), d = e.find("#pn-new"), d.attr({
            id: a.id,
            "pn-lang": a.lang
        }), void 0 != a.id_parent && "" != a.id_parent && d.attr("pn-parent", a.id_parent)
    },
    setHtmlLadi.prototype.checkElement = function (a) {
        var b = PN_PAGE.getElement("#" + a.id);
        return b && b.length > 0 ? !1 : !0
    },
    setHtmlLadi.prototype.addChecking = function (a) {
        var b = $("#" + a.id);
        a.tracking && b.attr("pn-tracking", a.tracking)
        //var b = $("#" + a.id);
        //a.tracking && b.attr("pn-tracking", "true"), b.attr("pn-traking-cus", JSON.stringify(a.eventTk))
    },
    setHtmlLadi.prototype.checkFixed = function (a) {
        var b = $("#" + a.id);
        a.typeFixed && b.attr("pn-fixed", a.typeFixed)
    },
    setHtmlLadi.prototype.setDatabind = function (a) {
        var b = $("#" + a.id);
        if (b.hasClass('widget-element') && a.dataBindId && a.dataBindId.length > 0) {
            b.attr("pn-data-bind", a.dataBindId);
        }
        //(-1 != a.parent.search("container") || b.hasClass("widget-section")) && (a.dataBindId && a.dataBindId.length > 0 && b.attr("pn-data-bind", a.dataBindId))
    },
    setHtmlLadi.prototype.setSticky = function (a) {
        var b = $("#" + a.id);
        (-1 != a.parent.search("container") || b.hasClass("widget-section")) && "1" == a.stickyUsing && (b.attr("pn-sticky", "1"), a.stickyPos && a.stickyPos.length > 0 && b.attr("pn-sticky-pos", a.stickyPos), parseFloat(a.stickykc) >= 0 ? b.attr("pn-sticky-kc", a.stickykc) : b.attr("pn-sticky-kc", "0px"))
    },
    setHtmlLadi.prototype.setElementCustomStyle = function (a) {
        var b = $("#" + a.id);
        Boolean(a.customStyle) && Object.keys(a.customStyle).forEach(function (c) {
            var d = a.customStyle[c];
            "string" == typeof d ? b.find(".widget-content")[0].style.setProperty(c, d) : "object" == typeof d && b.find(".widget-content")[0].style.setProperty(c, d.value, d.after)
        })
    }, setHtmlLadi.prototype.setTextAnimatedHeadline = function (a) {
        var b = $("#" + a.id);
        b.find(".pn-text-animated .pn-text-word").removeAttr("contenteditable")
    },
    setHtmlLadi.prototype.setValueItemForm = function (a, b) {
        if (-1 != a.type_form.search("select")) {
            var c = '<option value="">' + a.placeholder_form + "</option>";
            if (b.find(".widget-content").eq(0).append(c), a.value_form && a.value_form.length > 0)
                for (var d = 0; d < a.value_form.length; d++) c = '<option value="' + a.value_form[d] + '">' + a.value_form[d] + "</option>", b.find(".widget-content").eq(0).append(c)
        }
    },
    setHtmlLadi.prototype.addClass = function (a, b) {
        b && b.length > 0 && a.addClass && a.addClass.length > 0 && (b.hasClass("widget-section") ? b.find(".container").eq(0).addClass(a.addClass) : b.find(".widget-content").eq(0).addClass(a.addClass))
    },
    setHtmlLadi.prototype.setanimate_ext = function (a) {
        if (a != void 0 && a.animate_ext) {
            var o = $("#" + a.id);
            if ($.inArray(a.animate_ext, pn_animate_ext_inherit) >= 0) {
                var ch = o.find(".widget-content").eq(0);
                if (ch.hasClass(a.animate_ext) == false) ch.addClass(a.animate_ext);
            } else {
                if (o.hasClass(a.animate_ext) == false) o.addClass(a.animate_ext);
            }
        }
    },
    setHtmlLadi.prototype.setAutoScroll = function (a) {
        if (a != void 0 && (a.media.mobile.auto_scroll || false) == true) {
            var b = $("#" + a.id);
            if (b.hasClass('pn-auto-scroll') == false) b.addClass("pn-auto-scroll");
        }
    };