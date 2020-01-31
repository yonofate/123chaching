var setStyleElement = function() {};
setStyleElement.prototype.init = function(a, b) {
    for (var c = 0; c < a.length; c++) {
        var d = PN_PAGE.getElement("#" + a[c].id);
        d.hasClass("widget-element") ? (this.setStyleItem(a[c], b), this.setStyleList(a[c])) : this.setStyleSection(a[c], b)
    }
    if (30 == typeAddNew) {
        selectedItem = $('#punnel-editor .widget-section[pn-popup="true"]').eq(0);
        var e = new IframeClick;
        e.addClassSelected(selectedItem), selectedItem.show();
        var f = new ShowBoxResize;
        f.showBoxSection(selectedItem)
    }
},
setStyleElement.prototype.setStyleItem = function (a, b) {
    var c = new RenCssMobile,
        d = "",
        e = "",
        f = PN_PAGE.getElement("#" + a.id),
        g = f.find(".widget-content").eq(0);

    if (c.isVal(a.media.padding_left) && g.css({
            "padding-left": a.media.padding_left + "px"
        }), c.isVal(a.media.padding_right) && g.css({
            "padding-right": a.media.padding_right + "px"
        }), "facebook_messages" == f.attr("pn-type")) {
        parseFloat(a.media[b].width) > 500 && (a.media[b].width = "500px", f.css({
            width: "500px"
        }), f.find(".widget-content").eq(0).css({
            width: "500px"
        }), $("#resizable-element").css({
            width: "500px"
        }));
        var h = "https://www.facebook.com/v2.5/plugins/page.php?adapt_container_width=true&app_id=113869198637480&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Dfc17a1604%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff1e8e518fc%26relation%3Dparent.parent&container_width=613&hide_cover=true&locale=vi_VN&sdk=joey&show_facepile=true&small_header=true&tabs=messages&width=" + parseFloat(a.media[b].width) + "&height=" + parseFloat(a.media[b].height) + "&href=" + a.value_facebook_messages.url;
        f.find(".widget-content").eq(0).attr("src", h), f.find(".widget-content").eq(0).css({
            height: parseFloat(a.media[b].height)
        })
    }
    if (c.isVal(a.media[b].padding) && "slider" != f.attr("pn-type") && f.css({
            padding: a.media[b].padding
        }), c.isVal(a.media.placeholderColor)) {
        PN_PAGE.getElement("head #" + a.id).remove();
        var i = "";
        i = i + '<style id="' + a.id + 'placeholder">#' + a.id + " .widget-content::-webkit-input-placeholder{color:" + a.media.placeholderColor + "}", i = i + "#" + a.id + " .widget-content:-moz-placeholder{color:" + a.media.placeholderColor + "}", i = i + "#" + a.id + " .widget-content::-moz-placeholder{color:" + a.media.placeholderColor + "}", i = i + "#" + a.id + " .widget-content:-ms-input-placeholder{color:" + a.media.placeholderColor + "}</style>", $("head").append(i), "item_form" == f.attr("pn-type") && f.find(".widget-content").attr("name") && f.find(".widget-content").attr("name").search("select") >= 0 && (f.find("select.widget-content").css({
            color: a.media.placeholderColor
        }), f.find("select.widget-content option:first-child").css({
            color: a.media.placeholderColor
        }), console.log(f))
    }
    if ("image" == f.attr("pn-type") && c.isVal(a.media.overlay_color) && f.find(".punnel-widget-overlay").css({
            "background-color": a.media.overlay_color
        }), c.isVal(a.media[b]["background-image"]) || c.isVal(a.media[b]["background-color"]) || c.isVal(a.media.overlay_color))
        if ("image" == f.attr("pn-type")) {
            var j = new OptionWiget;
            e = 1 - j.getOpacityOverLay(a.media.overlay_color), d = j.getHex(a.media.overlay_color), 0 == parseFloat(e) || 1 == parseFloat(e) ? (f.find(".widget-content:eq(0)").css({
                background: "rgba(0,0,0,0)"
            }), f.find(".widget-content:eq(0) img").eq(0).css({
                opacity: "1"
            })) : (f.find(".widget-content:eq(0)").css({
                background: d
            }), f.find(".widget-content:eq(0) img").eq(0).css({
                opacity: e
            }))
        } else if (c.isVal(a.media[b]["background-image"])) {
        -1 != a.media[b]["background-image"].search("hstatic.punnel.com//") && (a.media[b]["background-image"] = a.media[b]["background-image"].replace("hstatic.punnel.com//", "hstatic.punnel.com/")), -1 != a.media[b]["background-image"].search(ApiStaticM) && (a.media[b]["background-image"] = a.media[b]["background-image"].replace(ApiStaticM, apiStaticDefault)), -1 != a.media[b]["background-image"].search("hstatic.punnel.com/d/") && (a.media[b]["background-image"] = a.media[b]["background-image"].replace(ApiStaticT, apiStaticDefault)), -1 != a.media[b]["background-image"].search("hstatic.punnel.com/t/") && (a.media[b]["background-image"] = a.media[b]["background-image"].replace(ApiStaticD, apiStaticDefault)), (void 0 == a.media.overlay_color || "undefined" == a.media.overlay_color || "" == a.media.overlay_color) && (a.media.overlay_color = "rgba(255,255,255,0)");
            var k = a.media[b]["background-image"];
            var grd = "linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ')',
                grdC = PN_PAGE.toGradientColor(a.media[b].colorGradient),
                gc = grdC == PN_PAGE.nonGradientColor ? grd : grdC;
        "image" != f.attr("pn-type") && g.css({
            "background-color": a.media[b]["background-color"]
        }), g.css({
            "background-image": gc + ',url("' + k + '")'
        }), g.css({
            "background-image": '-o-' + gc + ',url("' + k + '")'
        }), g.css({
            "background-image": '-ms-' + gc + ',url("' + k + '")'
        }), g.css({
            "background-image": '-moz-' + gc + ',url("' + k + '")'
        }), g.css({
            "background-image": '-webkit-' + gc + ',url("' + k + '")'
        });

        var l;
        l = a.media[b].typePosBgImg ? a.media[b].typePosBgImg : a.media.typePosBgImg ? a.media.typePosBgImg : "center";
        var m = "";
        switch (m = a.media[deviceEdit].typeBgImage ? a.media[deviceEdit].typeBgImage : a.media.typeBgImage) {
            case "para":
                g.css({
                    "background-size": "cover",
                    "background-attachment": "",
                    "background-position": " top " + l
                });
                break;
            case "stre":
                g.css({
                    "background-size": "cover",
                    "background-attachment": "scroll",
                    "background-position": " top " + l
                });
                break;
            case "streWH":
                g.css({
                    "background-size": "100% 100%",
                    "background-attachment": "scroll",
                    "background-position": " top " + l
                });
                break;
            case "streW":
                g.css({
                    "background-size": "100% auto",
                    "background-attachment": "scroll",
                    "background-position": " top " + l
                });
                break;
            case "streH":
                g.css({
                    "background-size": "auto 100%",
                    "background-attachment": "scroll",
                    "background-position": " top " + l
                });
                break;
            case "title":
                g.css({
                    "background-repeat": "repeat",
                    "background-size": ""
                });
                break;
            default:
                g.css({
                    "background-repeat": "no-repeat",
                    "background-size": ""
                })
            }
        } else if (PN_PAGE.toGradientColor(a.media[b].colorGradient) != PN_PAGE.nonGradientColor && c.isVal(a.media[b]["background-image"]) == false && ("image" != f.attr("pn-type"))) {
            g.css({
                "background-image": PN_PAGE.toGradientColor(a.media[b].colorGradient)
            });
            g.css({
                "background-image": "-webkit-" + PN_PAGE.toGradientColor(a.media[b].colorGradient)
            });
            g.css({
                "background-image": "-o-" + PN_PAGE.toGradientColor(a.media[b].colorGradient)
            });
            g.css({
                "background-image": "-ms-" + PN_PAGE.toGradientColor(a.media[b].colorGradient)
            });
            g.css({
                "background-image": "-moz-" + PN_PAGE.toGradientColor(a.media[b].colorGradient)
            });
        } else c.isVal(a.media[b]["background-color"]) && ("image" != f.attr("pn-type") ? g.css({
        "background-color": a.media[b]["background-color"]
    }) : g.css({
        "background-color": a.media[b]["background-color"]
    }));
    else g.css({
        "background-color": "",
        "background-image": ""
    });
    if ("image" == a.type_plugin && g.find(".pn-show-image").eq(0).css({
            "background-image": 'url("' + a.link + '")'
        }), "none" == a.media.display) {
        if (f.css({
                display: "none"
            }), "button" == f.attr("pn-type")) {
            var i = f.attr("style"),
                n = i.split(";");
            if (i = "", n && n.length > 0) {
                for (var o = 0; o < n.length; o++) - 1 != n[o].search("display") && (n[o] = "display:none!important"), i += n[o] + ";"; - 1 == i.search("display") && (i += "display:none!important")
            }
            f.attr("style", i)
        }
    } else f.css({
        display: "block"
    });
    if ("none" == a.media[b].display) {
        f.css({
            display: "none"
        });
        //if(f.hasClass('hid_dk')==false) f.addClass('hid_dk');
        if ("button" == f.attr("pn-type")) {
            var i = f.attr("style"),
                n = i.split(";");
            if (i = "", n && n.length > 0) {
                for (var o = 0; o < n.length; o++) - 1 != n[o].search("display") && (n[o] = "display:none!important"), i += n[o] + ";"; - 1 == i.search("display") && (i += "display:none!important")
            }
            f.attr("style", i)
        }
    } else f.css({
        display: "block"
    });
    if (c.isVal(a.media[b].top) && f.css({
            top: a.media[b].top
        }), c.isVal(a.media[b].left) && f.css({
            left: a.media[b].left
        }), c.isVal(a.typeFixed)) {
        switch (a.typeFixed) {
            case "topleft":
                f.find(".widget-content").eq(0).css({
                    top: a.fixedTop,
                    left: a.fixedLeft,
                    bottom: "",
                    right: ""
                });
                break;
            case "topright":
                f.find(".widget-content").eq(0).css({
                    top: a.fixedTop,
                    left: "",
                    bottom: "",
                    right: a.fixedRight
                });
                break;
            case "bottomleft":
                f.find(".widget-content").eq(0).css({
                    top: "",
                    left: a.fixedLeft,
                    bottom: a.fixedBottom,
                    right: ""
                });
                break;
            case "bottomright":
                f.find(".widget-content").eq(0).css({
                    top: "",
                    left: "",
                    bottom: a.fixedBottom,
                    right: a.fixedRight
                })
        }
        f.find(".widget-content").eq(0).css({
            position: "fixed"
        })
    }
    if (c.isVal(a.media[b].width) && (f.css({
            width: a.media[b].width
        }), "item_slider" == f.attr("pn-type") ? g.css({
            width: "100%"
        }) : g.css({
            width: a.media[b].width
        })), c.isVal(a.media[b].height) && (f.css({
            height: a.media[b].height
        }), "item_slider" == f.attr("pn-type") ? g.css({
            height: "100%"
        }) : "facebook_messages" == a.type_plugin ? g.css({
            height: parseFloat(a.media[b].height) + "px"
        }) : g.css({
            height: a.media[b].height
        })), (c.isVal(a.rotate) || c.isVal(a.skewx) || c.isVal(a.skewy)) && (f.css({
            transform: "skewY(" + a.skewy + "deg) skewX(" + a.skewx + "deg) rotate(" + a.rotate + "deg)"
        }), f.css({
            mozTransform: "skewY(" + a.skewy + "deg) skewX(" + a.skewx + "deg) rotate(" + a.rotate + "deg)"
        }), f.css({
            msTransform: "skewY(" + a.skewy + "deg) skewX(" + a.skewx + "deg) rotate(" + a.rotate + "deg)"
        }), f.css({
            webkitTransform: "skewY(" + a.skewy + "deg) skewX(" + a.skewx + "deg) rotate(" + a.rotate + "deg)"
        }), f.css({
            oTransform: "skewY(" + a.skewy + "deg) skewX(" + a.skewx + "deg) rotate(" + a.rotate + "deg)"
        })), c.isVal(a.media[b]["text-align"]) && f.css({
            "text-align": a.media[b]["text-align"]
        }), c.isVal(a.opacity) && g.css({
            opacity: a.opacity
        }), c.isVal(a.media.font_family)) g.css({
        "font-family": a.media.font_family
    });
    else {
        var p = f.attr("pn-type");
        ("textinline" == p || "textparagraph" == p || "button" == p || "countdown" == p) && g.css({
            "font-family": '"Open Sans", sans-serif'
        }), "textinline" == p && g.css({
            "font-weight": "700"
        })
    }
    c.isVal(a.media[b]["font-size"]) && g.css({
        "font-size": a.media[b]["font-size"]
    }), c.isVal(a.media[b].color) && ("item_form" == g.parent().attr("pn-type") && g.attr("name") && g.attr("name").search("select") >= 0 ? g.find("option").css({
        color: a.media[b].color
    }) : g.css({
        color: a.media[b].color
    }), "shape" == g.parent().attr("pn-type") && g.find("svg").eq(0).attr("fill", a.media[b].color)), c.isVal(a.media.font_weight) && g.css({
        "font-weight": a.media.font_weight
    }), c.isVal(a.media.font_style) && g.css({
        "font-style": a.media.font_style
    }), c.isVal(a.media.text_decoration) && g.css({
        "text-decoration": a.media.text_decoration
    }), c.isVal(a.line_spacing) && g.css({
        "line-height": a.line_spacing
    }), c.isVal(a.character_spacing) && g.css({
        "letter-spacing": a.character_spacing
    });
    var l;
    l = a.media[b].typePosBgImg ? a.media[b].typePosBgImg : a.media.typePosBgImg ? a.media.typePosBgImg : "center";
    var m = "";
    m = a.media[b].typeBgImage ? a.media[b].typeBgImage : a.media.typeBgImage;
    var q = a.repeatBg;
    switch (q || (q = "no-repeat"), m) {
        case "para":
            g.css({
                "background-size": "cover",
                "background-attachment": "",
                "background-position": " top " + l,
                "background-repeat": q
            });
            break;
        case "stre":
            g.css({
                "background-size": "cover",
                //"background-origin": "content-box",
                "background-position": " top " + l,
                "background-repeat": q
            });
            break;
        case "streWH":
            g.css({
                "background-size": "100% 100%",
                //"background-origin": "content-box",
                "background-position": " top " + l,
                "background-repeat": q
            });
            break;
        case "streW":
            g.css({
                "background-size": "100% auto",
                //"background-origin": "content-box",
                "background-position": " top " + l,
                "background-repeat": q
            });
            break;
        case "streH":
            g.css({
                "background-size": "auto 100%",
                //"background-origin": "content-box",
                "background-position": " top " + l,
                "background-repeat": q
            });
            break;
        case "title":
            g.css({
                "background-size": "",
                "background-repeat": q
            });
            break;
        default:
            g.css({
                "background-size": "",
                "background-repeat": q
            })
    }
    c.isVal(a.media.text_Transform) && g.css({
        "text-transform": a.media.text_Transform
    }), this.setBorderElement(f, a, b);
    var r = "boxshadow";
    ("textinline" == a.type_plugin || "textinline2" == a.type_plugin || "textinline3" == a.type_plugin || "textinline5" == a.type_plugin || "textparagraph" == a.type_plugin || "textsymbol" == a.type_plugin || "listop" == a.type_plugin) && (r = "textshadow"), c.isVal(a.media[b]["shadow-x"]) && c.isVal(a.media[b]["shadow-y"]) && c.isVal(a.media[b]["shadow-blur"]) && c.isVal(a.media[b]["shadow-color"]) && ("boxshadow" == r ? g.css({
        "box-shadow": a.media[b]["shadow-x"] + " " + a.media[b]["shadow-y"] + " " + a.media[b]["shadow-blur"] + " " + a.media[b]["shadow-color"]
    }) : g.css({
        "text-shadow": a.media[b]["shadow-x"] + " " + a.media[b]["shadow-y"] + " " + a.media[b]["shadow-blur"] + " " + a.media[b]["shadow-color"]
    })), c.isVal(a.media.color_value) && g.find(".widget-element .widget-content").css({
        color: a.media.color_value
    }), c.isVal(a.media.background_input_color) && g.find(".widget-element .widget-content").css({
        background: a.media.background_input_color
    }), c.isVal(a.media.items) && (c.isVal(a.media.items["background-color"]) && g.find(".ulMenuDeskTop li").css({
        "background-color": a.media.items["background-color"]
    }), c.isVal(a.media.items.width) && g.find(".ulMenuDeskTop li").css({
        width: a.media.items.width
    }), c.isVal(a.media.items["margin-left"]) && (g.find(".ulMenuDeskTop li").css({
        "margin-left": a.media.items["margin-left"]
    }), g.find(".ulMenuDeskTop li").eq(0).css({
        "margin-left": "0px"
    })), c.isVal(a.media.items["margin-right"]) && g.find(".ulMenuDeskTop li").css({
        "margin-right": a.media.items["margin-right"]
    })), void 0 == a.objectfit || "undefined" == a.objectfit || "" == a.objectfit ? (a.objectfit = "cover", g.css({
        "object-fit": "cover"
    })) : g.css({
        "object-fit": a.objectfit
    }), c.isVal(a.target) && ("a" == g[0].tagName || "A" == g[0].tagName ? g.attr("target", a.target) : ("a" == g.parent()[0].tagName || "A" == g.parent()[0].tagName) && g.parent().attr("target", a.target)), c.isVal(a.action) && ("a" == g[0].tagName || "A" == g[0].tagName ? g.attr("href", a.action) : ("a" == g.parent()[0].tagName || "A" == g.parent()[0].tagName) && g.parent().attr("href", a.action)), c.isVal(a.style_line) && (c.isVal(a.style_line["border-top"]) && g.find(".line").eq(0).css({
        "border-top-width": a.style_line["border-top"]
    }), c.isVal(a.style_line["border-right"]) && g.find(".line").eq(0).css({
        "border-right-width": a.style_line["border-right"]
    }), c.isVal(a.style_line["border-left"]) && g.find(".line").eq(0).css({
        "border-left-width": a.style_line["border-left"]
    }), c.isVal(a.style_line["border-bottom"]) && g.find(".line").eq(0).css({
        "border-bottom-width": a.style_line["border-bottom"]
    }), c.isVal(a.style_line["border-style"]) && g.find(".line").eq(0).css({
        "border-style": a.style_line["border-style"]
    }), c.isVal(a.style_line["border-color"]) && g.find(".line").eq(0).css({
        "border-color": a.style_line["border-color"]
    }), c.isVal(a.style_line["margin-top"]) && g.find(".line").eq(0).css({
        "margin-top": a.style_line["margin-top"]
    })), c.isVal(a.style_linevertical) && (c.isVal(a.style_linevertical["border-top"]) && g.find(".linevertical").eq(0).css({
        "border-top-width": a.style_linevertical["border-top"]
    }), c.isVal(a.style_linevertical["border-right"]) && g.find(".linevertical").eq(0).css({
        "border-right-width": a.style_linevertical["border-right"]
    }), c.isVal(a.style_linevertical["border-left"]) && g.find(".linevertical").eq(0).css({
        "border-left-width": a.style_linevertical["border-left"]
    }), c.isVal(a.style_linevertical["border-bottom"]) && g.find(".linevertical").eq(0).css({
        "border-bottom-width": a.style_linevertical["border-bottom"]
    }), c.isVal(a.style_linevertical["border-style"]) && g.find(".linevertical").eq(0).css({
        "border-style": a.style_linevertical["border-style"]
    }), c.isVal(a.style_linevertical["border-color"]) && g.find(".linevertical").eq(0).css({
        "border-color": a.style_linevertical["border-color"]
    }), c.isVal(a.style_linevertical["margin-left"]) && g.find(".linevertical").eq(0).css({
        "margin-left": a.style_linevertical["margin-left"]
    })), c.isVal(a.media.mobile.line_spacing) && "mobile" == b && g.css({
        "line-height": a.media.mobile.line_spacing
    });
},
setStyleElement.prototype.setBorderElement = function (a, b, c) {
    var d = new RenCssMobile,
        e = a,
        f = a.find(".punnel-widget-overlay").eq(0);
    e = "menu-header" == a.attr("pn-type") || "contact_form" == a.attr("pn-type") ? a.find(".widget-item-child .widget-content").eq(0) : a.find(".widget-content").eq(0), d.isVal(b.media[c]["border-bottom-right-radius"]) && (e.css({
        "border-bottom-right-radius": b.media[c]["border-bottom-right-radius"]
    }), f.css({
        "border-bottom-right-radius": b.media[c]["border-bottom-right-radius"]
    })), d.isVal(b.media[c]["border-bottom-left-radius"]) && (e.css({
        "border-bottom-left-radius": b.media[c]["border-bottom-left-radius"]
    }), f.css({
        "border-bottom-left-radius": b.media[c]["border-bottom-left-radius"]
    })), d.isVal(b.media[c]["border-top-left-radius"]) && (e.css({
        "border-top-left-radius": b.media[c]["border-top-left-radius"]
    }), f.css({
        "border-top-left-radius": b.media[c]["border-top-left-radius"]
    })), d.isVal(b.media[c]["border-top-right-radius"]) && (e.css({
        "border-top-right-radius": b.media[c]["border-top-right-radius"]
    }), f.css({
        "border-top-right-radius": b.media[c]["border-top-right-radius"]
    })), d.isVal(b.media[c]["border-bottom"]) && d.isVal(b.media[c]["border-right"]) && d.isVal(b.media[c]["border-left"]) && d.isVal(b.media[c]["border-top"]) && (d.isVal(b.media[c]["border-style"]) && e.css({
        "border-style": b.media[c]["border-style"]
    }), d.isVal(b.media[c]["border-color"]) && e.css({
        "border-color": b.media[c]["border-color"]
    }), e.css({
        "border-top-width": b.media[c]["border-top"]
    }), e.css({
        "border-left-width": b.media[c]["border-left"]
    }), e.css({
        "border-right-width": b.media[c]["border-right"]
    }), e.css({
        "border-bottom-width": b.media[c]["border-bottom"]
    }))
},
setStyleElement.prototype.setStyleSection = function (a, b) {
    var c = new RenCssMobile,
        d = PN_PAGE.getElement("#" + a.id),
        e = "";
    if ("none" == a.media.display ? d.css({
        display: "none"
    }) : d.css({
        display: "block"
    }), "none" == a.media[b].display ? d.css({
        display: "none"
    }) : d.css({
        display: "block"
    }), 1 == a.popup ? (d.css({
        width: "100%",
        height: $(window).outerHeight() + "px"
    }), e = d.find(".container"), c.isVal(a.media[b].width_container) ? e.css({
        width: a.media[b].width_container
    }) : e.css({
        width: dummyData.viewport.size_desktop + "px"
    }), c.isVal(a.media[b].height_container) ? e.css({
        height: a.media[b].height_container
    }) : e.css({
        height: "500px"
    }), d.css({
        display: "none"
    })) : (c.isVal(a.media[b].height) && d.css({
        height: a.media[b].height
    }), e = d), c.isVal(a.media[b]["background-image"]) || c.isVal(a.media[b]["background-color"]) || c.isVal(a.media.overlay_color))


        if (c.isVal(a.media[b]["background-color"]) && e.css({
                "background-color": a.media[b]["background-color"]
            }), c.isVal(a.media[b]["background-image"])) {
            (void 0 == a.media.overlay_color || "undefined" == a.media.overlay_color || "" == a.media.overlay_color) && (a.media.overlay_color = "rgba(255,255,255,0)");

            var f = a.media[b]["background-image"];
            var grd = "linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ')',
                grdC = PN_PAGE.toGradientColor(a.media[b].colorGradient),
                gc = grdC == PN_PAGE.nonGradientColor ? grd : grdC;
            e.css({
                "background-image": gc + ',url("' + f + '")'
            }), e.css({
                "background-image": '-o-' + gc + ',url("' + f + '")'
            }), e.css({
                "background-image": '-ms-' + gc + ',url("' + f + '")'
            }), e.css({
                "background-image": '-moz-' + gc + ',url("' + f + '")'
            }), e.css({
                "background-image": '-webkit-' + gc + ',url("' + f + '")'
            });


            //var f = a.media[b]["background-image"];
            //e.css({
            //    "background-image": "linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + '),url("' + f + '")'
            //}), e.css({
            //    "background-image": "-o-linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + '),url("' + f + '")'
            //}), e.css({
            //    "background-image": "-ms-linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + '),url("' + f + '")'
            //}), e.css({
            //    "background-image": "-moz-linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + '),url("' + f + '")'
            //}), e.css({
            //    "background-image": "-webkit-linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + '),url("' + f + '")'
            //});


            var g;
            g = a.media.typePosBgImg ? a.media.typePosBgImg : "center";
            var h = "";
            h = a.media[b].typeBgImage ? a.media[b].typeBgImage : a.media.typeBgImage;
            var i = a.repeatBg;
            switch (i || (i = "no-repeat"), h) {
                case "para":
                    "desktop" != b ? e.css({
                        "-moz-background-size": "cover",
                        "-webkit-background-size": "cover",
                        "background-attachment": "fixed",
                        "background-position": "center top",
                        "background-size": "cover",
                       // "background-origin": "content-box",
                        "background-repeat": i
                    }) : e.css({
                        "background-size": "cover",
                        "background-attachment": "fixed",
                        "background-position": " top " + g,
                        "background-repeat": i
                    });
                    break;
                case "stre":
                    e.css({
                        "background-size": "cover",
                        "background-attachment": "scroll",
                        "background-position": " top " + g,
                        "background-repeat": i
                    });
                    break;
                case "streWH":
                    e.css({
                        "background-size": "100% 100%",
                        "background-attachment": "scroll",
                        "background-position": " top " + g,
                        "background-repeat": i
                    });
                    break;
                case "streW":
                    e.css({
                        "background-size": "100% auto",
                        "background-attachment": "scroll",
                        "background-position": " top " + g,
                        "background-repeat": i
                    });
                    break;
                case "streH":
                    e.css({
                        "background-size": "auto 100%",
                        "background-attachment": "scroll",
                        "background-position": " top " + g,
                        "background-repeat": i
                    });
                    break;
                case "title":
                    e.css({
                        "background-repeat": i
                    });
                    break;
                default:
                    e.css({
                        "background-repeat": i
                    })
            }
        } else if (PN_PAGE.toGradientColor(a.media[b].colorGradient) != PN_PAGE.nonGradientColor) {
            e.css({
                "background-image": PN_PAGE.toGradientColor(a.media[b].colorGradient)
            });
            e.css({
                "background-image": "-webkit-" + PN_PAGE.toGradientColor(a.media[b].colorGradient)
            });
            e.css({
                "background-image": "-o-" + PN_PAGE.toGradientColor(a.media[b].colorGradient)
            });
            e.css({
                "background-image": "-ms-" + PN_PAGE.toGradientColor(a.media[b].colorGradient)
            });
            e.css({
                "background-image": "-moz-" + PN_PAGE.toGradientColor(a.media[b].colorGradient)
            });
        } else e.css({
            "background-image": ""
        });
    else e.css({
        "background-color": "",
        "background-image": ""
    })
},
setStyleElement.prototype.setStyleList = function (a) {
    PN_PAGE.setTypeListIcon(a)
};