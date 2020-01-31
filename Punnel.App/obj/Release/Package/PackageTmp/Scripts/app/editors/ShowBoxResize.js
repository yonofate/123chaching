var ShowBoxResize = function () { };
ShowBoxResize.prototype.init = function () { },
    ShowBoxResize.prototype.changeTop = function (a) {
        var b = a.offset().top, g = $("#resizable-element");
        g.css({ top: b + 'px' });
    },
    ShowBoxResize.prototype.changeTopSection = function (a) {
        var b = a.offset().top, g = $("#resizable-section"), i = g.find(".edit-section");
        g.css({ top: b + 'px' });
        if ("none" == g.css("display")) g.show();
        if ("none" == i.css("display")) i.show();
    },
    ShowBoxResize.prototype.showBox = function (a) {
        //if ($("#resizable-element").css("display") == "block") return;
        if (0 == preview) {
            var b, c, d, e, f = (new Rotate, new CssResizeAfterRotate);
            PN_PAGE.PUNNEL_EDIT.find(".selected").removeClass("selected"), a.addClass("selected"), selectedItem = a, topScroll = PN_PAGE.PUNNEL_EDIT.scrollTop();
            var g = $("#resizable-element");
            if (this.setTransformboxResize(a), selectedItem && a.length > 0 && ($(".punnel-mobile #punnel-editor") && $(".punnel-mobile #punnel-editor").length > 0 ? (b = a.offset().top, c = a.offset().left) : (b = a.offset().top, c = a.offset().left)), d = parseFloat(a.css("width")), e = parseFloat(a.css("height")), selectedItem && selectedItem.attr("pn-fixed") && (b = selectedItem.find(".widget-content").eq(0).offset().top, c = selectedItem.find(".widget-content").eq(0).offset().left), "none" != $(".editor-text").css("display")) g.hide();
            else {
                g.css({
                    //top: parseInt(b) + "px",
                    //left: parseInt(c) + "px",
                    //width: parseInt(d) + "px",
                    //height: parseInt(e) + "px",
                    top: b + "px",
                    left: c + "px",
                    width: d + "px",
                    height: e + "px",
                    margin: "0",
                    position: "absolute",
                    display: "block",
                    background: "rgba(0,0,0,0)",
                    "min-height": "0"
                }).show();
                
                $(".w-h-el .w-el").text(Math.ceil(g.outerWidth()) + " x " + Math.ceil(g.outerHeight())).show(),
                    g.removeClass("widget-group"), g.css({
                    cursor: "context-menu"
                });
                switch (selectedItem.attr("pn-type")) {
                    case "widget_group":
                        g.addClass("widget-group").css({
                            cursor: "pointer"
                        });
                        break;
                    case "line":
                        break;
                    case "textinline":
                        break;
                    case "textparagraph":
                        break;
                    case "item_slider":
                        $(".ui-resizable-handle").hide();
                        break;
                    default:
                        g.removeClass("widget-group")
                }
                this.showPluginSetting(), this.showHandleResize(), f.setHandleResize();
                var h = new IframeClick;
                h.showControlEditPlugin(a);
                var i = new OptionWiget,
                    j = i.getParentSection(selectedItem);
                $(".reset-mobile li").eq(0).attr("data-original-title", "Sắp xếp lại " + j.attr("id")), $(".reset-mobile li").eq(1).attr("data-original-title", "Ẩn " + j.attr("id")).attr("id-section", j.attr("id"))
            }
            var i = new OptionWiget,
                k = i.getParentElement(selectedItem);
            k.hasClass("widget-section") || $(".aside-setting .widget-item.custom-sticky").hide();
                if (selectedItem && selectedItem.length > 0) {
                var idgroup = selectedItem[0].offsetParent.id;
                if (idgroup && idgroup.length > 0) {
                    gpr = $('#' + idgroup);
                    if (gpr && gpr.attr("pn-type") === 'widget_group') {
                        i.CalulatorSizeGroup(gpr);
                    }
                }
            }
        }
    },
    ShowBoxResize.prototype.showHandleResize = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = selectedItem.find(".widget-element").length;
            switch ($("#resizable-element").show(), a > 0 || "item_menu" == selectedItem.attr("pn-type") || selectedItem.hasClass("widget-group") || "contact_form" == selectedItem.attr("pn-type") || void 0 != selectedItem.attr("pn-bg-form") || void 0 != selectedItem.attr("pn-parent") || "facebook_comment" == selectedItem.attr("pn-type") || "facebook_messages" == selectedItem.attr("pn-type") ? ($("#resizable-element .ui-rotatable-handle").css({
                display: "none"
            }), ratio = "") : ("desktop" == deviceEdit ? $(".ui-rotatable-handle").css({
                display: "block"
            }) : $(".ui-rotatable-handle").css({
                display: "none"
            }), $("#resizable-section").hide()), selectedItem.attr("pn-type")) {
                case "shape":
                    $(".ui-resizable-handle").hide(), $(".ui-resizable-handle.ui-resizable-ne").show(), $(".ui-resizable-handle.ui-resizable-nw").show(), $(".ui-resizable-handle.ui-resizable-se").show(), $(".ui-resizable-handle.ui-resizable-sw").show(), ratio = 1;
                    break;
                case "line":
                    ratio = 0, $(".ui-resizable-handle").hide(), $(".ui-resizable-handle.ui-resizable-w").show(), $(".ui-resizable-handle.ui-resizable-e").show(), $("#resizable-element .ui-rotatable-handle").css({
                        display: "none"
                    });
                    break;
                case "linevertical":
                    ratio = 0, $(".ui-resizable-handle").hide(), $(".ui-resizable-handle.ui-resizable-n").show(), $(".ui-resizable-handle.ui-resizable-s").show(), $("#resizable-element .ui-rotatable-handle").css({
                        display: "none"
                    });
                    break;
                case "textinline":
                    $(".ui-resizable-handle").hide(), $(".ui-resizable-handle.ui-resizable-e").show(), $(".ui-resizable-handle.ui-resizable-w").show();
                    break;
                case "listop":
                    $(".ui-resizable-handle").hide(), $(".ui-resizable-handle.ui-resizable-e").show(), $(".ui-resizable-handle.ui-resizable-w").show();
                    break;
                case "textparagraph":
                    $(".ui-resizable-handle").hide(), $(".ui-resizable-handle.ui-resizable-e").show(), $(".ui-resizable-handle.ui-resizable-w").show();
                    break;
                case "item_slider":
                    $(".ui-resizable-handle").hide();
                    break;
                case "videoyoutube":
                    $(".ui-resizable-handle").hide(), "desktop" == deviceEdit ? $(".ui-resizable-handle").show() : ($(".ui-resizable-handle.ui-resizable-ne").show(), $(".ui-resizable-handle.ui-resizable-nw").show(), $(".ui-resizable-handle.ui-resizable-se").show(), $(".ui-resizable-handle.ui-resizable-sw").show());
                    break;
                default:
                    ratio = "", $(".ui-resizable-handle").show()
            }
            selectedItem.hasClass("important") && ($(".ui-resizable-handle").hide(), $(".ui-rotatable-handle").hide())
        }
    },
    ShowBoxResize.prototype.showPluginSetting = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var a = $("#resizable-element .edit-element"),
                b = $("#resizable-element");
            selectedItem.attr("pn-type");
            selectedItem.hasClass("important") ? a.css({
                top: pageMouseY + "px",
                left: "10px"
            }).show() : a.attr("style", "");
            var c = new OptionWiget,
                d = c.getParentSection(selectedItem);
            if (void 0 !== d && d.length > 0 && d.hasClass("widget-section")) {
                var e = d.find(".important");
                void 0 !== e && e.length > 0 && a.find('[pn-show="setBackground"]').hide()
            }
            b && b.length && b.offset().top < 90 ? a.css({
                top: "auto",
                bottom: "-40px"
            }) : a.css({
                top: "-40px",
                bottom: "auto"
            })
        }
    },
    ShowBoxResize.prototype.showBoxSection = function (a) {
        if (a && a.length > 0 && "none" != a.css("display") && 0 == preview) {
            a.addClass("selected");
            var b;
            if (a.hasClass("widget-section")) {
                $(".add-section").show();
                if ("true" == a.attr("pn-popup")) {
                    if (b = $(".resizable-popup"), a.find(".container:eq(0)").offset().top < 85 ? b.find(".edit-element").css({
                        top: 80 - a.find(".container:eq(0)").offset().top + "px"
                    }) : b.find(".edit-element").css({
                        top: "-40px"
                    }), b && b.length > 0) {
                        var c = a.find(".container").eq(0),
                            d = c.offset().top,
                            e = c.offset().left + "px",
                            f = c.outerWidth() + "px",
                            g = c.outerHeight() + "px";
                        b.css({
                            top: d,
                            left: e,
                            width: f,
                            height: g,
                            position: "absolute"
                        }).show(), b.find(".resize-content").css({
                            width: f,
                            height: g
                        }), b.attr("pn-id-popup", selectedItem.attr("id")).show(), a.css({
                            display: "flex"
                        });
                        var h = new ResizeSection;
                        h.resizePopup()
                    }
                } else if (b = $("#resizable-section"), b && b.length > 0) {
                    var i = b.find(".edit-section");
                    i.show();
                    var d = 0,
                        e = 0;
                    $(".punnel-mobile #punnel-editor") && $(".punnel-mobile #punnel-editor").length > 0 ? (e = PN_PAGE.PUNNEL_EDIT.offset().left + "px", d = a.offset().top) : PN_PAGE.PUNNEL_EDIT && PN_PAGE.PUNNEL_EDIT.length > 0 && (e = PN_PAGE.PUNNEL_EDIT.offset().left + "px", d = a.offset().top);
                    var f = a.outerWidth() + "px",
                        g = a.outerHeight() + 1 + "px";
                    b.css({
                        left: e,
                        top: d,
                        width: f,
                        height: g,
                        display: "block",
                        margin: "0",
                        position: "absolute",
                        background: "rgba(0,0,0,0)",
                        "min-height": "0"
                    }).show();
                    var j = pageMouseY - b.offset().top + "px",
                        k = PN_PAGE.getElement(".container").eq(0),
                        l = a.find(".important");
                    b.find('.edit-section li[pn-show="setElement"]').hide(), l && l.length > 0 && b.find('.edit-section li[pn-show="setElement"]').show(), k && k.length > 0 && (parseFloat(j) + b.offset().top + i.outerHeight() > a.offset().top + a.outerHeight() && (j = a.offset().top + a.outerHeight() - i.outerHeight - 150 + "px"), parseFloat(j) < 0 && (j = "10px"), i.css({
                        top: j
                    }), b.find(".ui-resizable-handle.ui-resizable-s").show(), "desktop" != deviceEdit && i.hide())
                }
                $(".reset-mobile li").eq(0).attr("data-original-title", "Sắp xếp lại " + a.attr("id")), $(".reset-mobile li").eq(1).attr("data-original-title", "Ẩn " + a.attr("id")).attr("id-section", a.attr("id"))
            }
        }
    },
    ShowBoxResize.prototype.setTransformboxResize = function (a) {
        var b = $("#resizable-element"),
            c = (b.find(".textRotate"), this.getTranformElement(a)),
            d = c.skewx,
            e = c.skewy,
            f = c.rotate;
        b.css({
            transform: "skewY(" + e + "deg) skewX(" + d + "deg) rotate(" + f + "deg)"
        }), b.css({
            mozTransform: "skewY(" + e + "deg) skewX(" + d + "deg) rotate(" + f + "deg)"
        }), b.css({
            msTransform: "skewY(" + e + "deg) skewX(" + d + "deg) rotate(" + f + "deg)"
        }), b.css({
            webkitTransform: "skewY(" + e + "deg) skewX(" + d + "deg) rotate(" + f + "deg)"
        }), b.css({
            oTransform: "skewY(" + e + "deg) skewX(" + d + "deg) rotate(" + f + "deg)"
        })
    },
    ShowBoxResize.prototype.getTranformElement = function (a) {
        if (void 0 != a && a.length > 0) {
            var b = PN_PAGE.getIndexElement(a.attr("id")),
                c = 0,
                d = 0,
                e = 0;
            return void 0 != apiElement[b] && (c = apiElement[b].skewx, d = apiElement[b].skewy, e = apiElement[b].rotate, (void 0 == c || "undefined" == c || "" == c) && (c = 0, apiElement[b].skewx = 0), (void 0 == e || "undefined" == e || "" == e) && (e = 0, apiElement[b].rotate = 0), (void 0 == d || "undefined" == d || "" == d) && (d = 0, apiElement[b].skewy = 0)), {
                skewx: c,
                skewy: d,
                rotate: e
            }
        }
    },
    ShowBoxResize.prototype.showBoxHover = function (a) {
        var rz = $("#resizable-element");
    if (a.hasClass("widget-group") == false && (rz.is('.ui-resizable-resizing') || rz.is('.ui-draggable-dragging'))) {
            return;
    }
        if ($("#resizable-section").is('.ui-resizable-resizing')) {
            return;
    }
    if (!(rz.is('.ui-draggable-dragging') || rz.is('.ui-resizable-resizing') || $("#GROUP_TMP").length > 0) && a && a.hasClass("widget-element")) {
        a && a.hasClass("widget-element") && $("#box-hover-element").css({
            top: a.offset().top + "px",
            left: a.offset().left + "px",
            width: a.outerWidth() + "px",
            height: a.outerHeight() + "px",
            display: "block",
            position: "absolute",
            cursor: "pointer"
        }).attr("id-hover", a.attr("id")).show(),
        a.hasClass("widget-group") ? $("#box-hover-element").addClass("group-hover") : $("#box-hover-element").removeClass("group-hover");
        //var b = new OptionWiget;
        //b.CalulatorSizeGroup(a)
    }
    };