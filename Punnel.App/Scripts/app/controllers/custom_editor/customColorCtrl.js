angular.module("punnelApp").controller("customColorCtrl", ["$rootScope", "$scope", function (a, b) {
    a.colorPickerUsing = "#ffaa00", b.colorPicker = "#ffaa00", b.listColor = lp_colors_all, b.listColorChild = [],
        $(function () {
        $("#lpColorPickerCtrl").colorpicker({
            color: a.colorPickerUsing,
            container: !0,
            inline: !0,
            format: "rgba",
            sliders: {
                saturation: {
                    maxLeft: 170,
                    maxTop: 170,
                    callLeft: "setSaturation",
                    callTop: "setBrightness"
                },
                hue: {
                    maxLeft: 0,
                    maxTop: 170,
                    callLeft: !1,
                    callTop: "setHue"
                },
                alpha: {
                    maxLeft: 0,
                    maxTop: 170,
                    callLeft: !1,
                    callTop: "setAlpha"
                }
            }
        }).on("changeColor", function () {
            var c = $("#lpColorPickerCtrl").colorpicker("getValue");
            a.colorPickerUsing = c, b.colorPicker = c, b.setValueColor(), b.listColorChild = b.listColor[b.checkColorHex(a.colorPickerUsing).list].group
        })
    }), b.checkColorHex = function (a) {
        for (var c = 0; c < b.listColor.length; c++) {
            if (b.hexToRgbA(b.listColor[c].hex) == a) return {
                list: c,
                group: 0
            };
            for (var d = 0; d < b.listColor[c].group.length; d++)
                if (b.hexToRgbA(b.listColor[c].group[d].hex) == a) return {
                    list: c,
                    group: d
                }
        }
        return {
            list: 0,
            group: 0
        }
    }, b.hexToRgbA = function (a) {
        var b;
        return /^#([A-Fa-f0-9]{3}){1,2}$/.test(a) ? (b = a.substring(1).split(""), 3 == b.length && (b = [b[0], b[0], b[1], b[1], b[2], b[2]]), b = "0x" + b.join(""), "rgba(" + [b >> 16 & 255, b >> 8 & 255, 255 & b].join(",") + ",1)") : a
    }, b.setColorList = function (a, c) {
        $("#lpColorPickerCtrl").colorpicker("setValue", a), b.listColor[c].group && b.listColor[c].group.length > 0 ? b.listColorChild = b.listColor[c].group : b.listColorChild = []
    }, b.setColorListChild = function (a) {
        $("#lpColorPickerCtrl").colorpicker("setValue", a)
    }, b.setValueColorChangeInput = function (c) {
        a.colorPickerUsing = c, b.colorPicker = c, $("#lpColorPickerCtrl").colorpicker("setValue", a.colorPickerUsing)
    }, b.close = function () {
        $(".widget-item.custom-color-picker").hide()
    }, b.setValueColor = function () {
        switch ($(".widget-item.custom-color-picker .pn-input-color").val(a.colorPickerUsing), a.typeColorPicker) {
            case "background":
                b.setValueColorBg();
                break;
            case "background-hover":
                b.setValueColorBgHover();
                break;
            case "overlay-bg":
                b.setOverlayBg();
                break;
            case "color-border":
                b.setColorBorder();
                break;
            case "color-border-hover":
                b.setColorBorderHover();
                break;
            case "color-shadow":
                b.setColorShadow();
                break;
            case "text-form":
                b.setColorTextForm();
                break;
            case "bg-input-form":
                b.setColorBgInputForm();
                break;
            case "placeholder-form":
                b.setColorPlaceholderForm();
                break;
            case "color-text-font":
                b.setColorTextFont();
                break;
            case "color-text-font-hover":
                b.setColorTextFontHover();
                break;
            case "color-text-editor":
                b.setColorTextEditor();
                break;         
            case "color-shape":
                b.setColorShape();
                break;
            case "color-line-ngang":
                b.setColorLineNgang();
                break;
            case "color-line-vertical":
                b.setColorLineVertical();
                break;
            case "color-image-overlay":
                b.setColorImageOverlay();
                break;
            case "colorList":
                b.setColorListOp()
        }
    }, b.setValueColorBg = function () {
        if (selectedItem && selectedItem.length > 0) {
            $(".custom-color-background input").val(a.colorPickerUsing), $(".custom-color-background span span").css({
                "background-color": a.colorPickerUsing
            });
            var c = b.getContentSetValue(),
                d = c.index,
                e = c.content;
            apiElement[d].media.desktop["background-color"] = a.colorPickerUsing, apiElement[d].media.mobile["background-color"] = a.colorPickerUsing, b.setValueColorBgWg(e, apiElement[d].media[deviceEdit]["background-image"], apiElement[d].media.overlay_color, apiElement[d].media.desktop["background-color"], apiElement[d].media[deviceEdit].colorGradient), $('[pn-show-bg-image="true"]').hide()
        }
        }, b.setValueColorBgHover = function () {
            if (selectedItem && selectedItem.length > 0) {
                $(".custom-color-background-hover input").val(a.colorPickerUsing), $(".custom-color-background-hover span span").css({
                    "background-color": a.colorPickerUsing
                });
                var c = b.getContentSetValue(),
                    d = c.index,
                    e = c.content;
                apiElement[d].media.desktop["background-color-hover"] = a.colorPickerUsing, apiElement[d].media.mobile["background-color-hover"] = a.colorPickerUsing //, b.setValueColorBgWg(e, apiElement[d].media[deviceEdit]["background-image"], apiElement[d].media.overlay_color, apiElement[d].media.desktop["background-color"]), $('[pn-show-bg-image="true"]').hide()
            }
        }, b.setValueColorBgWg = function (a, b, c, d, f) {
        var gr = PN_PAGE.toGradientColor(f), og = "linear-gradient(" + c + "," + c + ')',
            c = gr == PN_PAGE.nonGradientColor ? og : gr;
        b && b.length > 0 ? (a.css({
            "background-image": "" + c + ',url("' + b + '")'
        }), a.css({
            "background-image": "-o-" + c + ',url("' + b + '")'
        }), a.css({
            "background-image": "-ms-" + c + ',url("' + b + '")'
        }), a.css({
            "background-image": "-moz-" + c + ',url("' + b + '")'
        }), a.css({
            "background-image": "-webkit-" + c + ',url("' + b + '")'
        })) : f && f.color1.length > 0 ? a.css({
            "background-color": d
        }): a.css({
            "background-image": ""
        }), a.css({
            "background-color": d
        })
    }, b.setOverlayBg = function () {
        if (selectedItem && selectedItem.length > 0) {
            $(".pn-set-bg-over-color input").val(a.colorPickerUsing), $(".pn-set-bg-over-color span span").css({
                "background-color": a.colorPickerUsing
            });
            var c = b.getContentSetValue(),
                d = c.index,
                e = c.content;
            apiElement[d].media.overlay_color = a.colorPickerUsing, b.setValueColorBgWg(e, apiElement[d].media[deviceEdit]["background-image"], apiElement[d].media.overlay_color, apiElement[d].media.desktop["background-color"], apiElement[d].media.desktop.colorGradient)
        }
    }, b.setColorBorder = function () {
        if (selectedItem && selectedItem.length > 0) {
            $(".pn-color-boder input").val(a.colorPickerUsing), $(".pn-color-boder span span").css({
                "background-color": a.colorPickerUsing
            });
            var c = b.getContentSetValue(),
                d = c.index;
            c.content;
            if (apiElement[d].media.desktop["border-color"] = a.colorPickerUsing, apiElement[d].media.mobile["border-color"] = a.colorPickerUsing, "contact_form" == selectedItem.attr("pn-type")) {
                var e = selectedItem.find('.widget-element[pn-type="item_form"]');
                e && e.length > 0 && e.each(function () {
                    var b = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[b].media.desktop["border-color"] = a.colorPickerUsing, apiElement[b].media.mobile["border-color"] = a.colorPickerUsing
                }), selectedItem.find('.widget-element[pn-type="item_form"] .widget-content').css({
                    "border-color": a.colorPickerUsing
                })
            } else selectedItem.find(".widget-content").eq(0).css({
                "border-color": a.colorPickerUsing
            })
        }
        }, b.setColorBorderHover = function () {
            if (selectedItem && selectedItem.length > 0) {
                $(".pn-color-boder-hover input").val(a.colorPickerUsing), $(".pn-color-boder-hover span span").css({
                    "background-color": a.colorPickerUsing
                });
                var c = b.getContentSetValue(),
                    d = c.index;
                c.content;
                apiElement[d].media.desktop["border-color-hover"] = a.colorPickerUsing,
                    apiElement[d].media.mobile["border-color-hover"] = a.colorPickerUsing;
            }
        },
    b.setColorShadow = function () {
        if (selectedItem && selectedItem.length > 0) {
            $(".pn-color-shadow input").val(a.colorPickerUsing), $(".pn-color-shadow span span").css({
                "background-color": a.colorPickerUsing
            });
            var c = b.getContentSetValue(),
                d = c.index,
                e = c.content,
                f = "boxshadow";
            apiElement[d].type_plugin = selectedItem.attr("pn-type"), ("textinline" == apiElement[d].type_plugin || "textinline2" == apiElement[d].type_plugin || "textinline3" == apiElement[d].type_plugin || "textinline5" == apiElement[d].type_plugin || "textparagraph" == apiElement[d].type_plugin || "textsymbol" == apiElement[d].type_plugin || "listop" == apiElement[d].type_plugin) && (f = "textshadow"), apiElement[d].media.mobile["shadow-color"] = a.colorPickerUsing, apiElement[d].media.desktop["shadow-color"] = a.colorPickerUsing;
            var g = apiElement[d].media[deviceEdit]["shadow-x"],
                h = apiElement[d].media[deviceEdit]["shadow-y"],
                i = apiElement[d].media[deviceEdit]["shadow-blur"];
            "boxshadow" == f ? e.css({
                "box-shadow": g + " " + h + " " + i + " " + a.colorPickerUsing
            }) : e.css({
                "text-shadow": g + " " + h + " " + i + " " + a.colorPickerUsing
            })
        }
    }, b.setColorTextForm = function () {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ("contact_form" == selectedItem.attr("pn-type")) {
                apiElement[b].media.color_value = a.colorPickerUsing;
                var c = selectedItem.find('.widget-item-child[pn-type="item_form"]');
                void 0 != c && c.length > 0 && c.each(function () {
                    var b = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[b].media.desktop.color = a.colorPickerUsing, apiElement[b].media.mobile.color = a.colorPickerUsing
                })
            } else apiElement[b].media.desktop.color = a.colorPickerUsing, apiElement[b].media.mobile.color = a.colorPickerUsing;
            $(".color-text-form input").val(a.colorPickerUsing), $(".color-text-form span span").css({
                "background-color": a.colorPickerUsing
            })
        }
    }, b.setColorBgInputForm = function () {
        if (selectedItem && selectedItem.length > 0) {
            $(".color-input-bg-form input").val(a.colorPickerUsing), $(".color-input-bg-form span span").css({
                "background-color": a.colorPickerUsing
            });
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ("contact_form" == selectedItem.attr("pn-type")) {
                apiElement[b].media.background_input_color = a.colorPickerUsing;
                var c = selectedItem.find('.widget-item-child[pn-type="item_form"]');
                void 0 != c && c.length > 0 && c.each(function () {
                    var b = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[b].media.desktop["background-color"] = a.colorPickerUsing, apiElement[b].media.mobile["background-color"] = a.colorPickerUsing, apiElement[b].bg_type = "color", $(this).find(".widget-content").eq(0).css({
                        "background-color": a.colorPickerUsing
                    })
                })
            } else apiElement[b].media.desktop["background-color"] = a.colorPickerUsing, apiElement[b].media.mobile["background-color"] = a.colorPickerUsing, selectedItem.find(".widget-content").eq(0).css({
                "background-color": a.colorPickerUsing
            })
        }
    }, b.setColorPlaceholderForm = function () {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].media.placeholderColor = a.colorPickerUsing;
            var c = selectedItem.find('.widget-item-child[pn-type="item_form"]');
            void 0 != c && c.length > 0 && c.each(function () {
                var b = PN_PAGE.getIndexElement($(this).attr("id"));
                apiElement[b].media.placeholderColor = a.colorPickerUsing, $("head #" + $(this).attr("id")).remove();
                var c = "";
                c = c + '<style id="' + $(this).attr("id") + 'placeholder">#' + $(this).attr("id") + " .widget-content::-webkit-input-placeholder{color:" + a.colorPickerUsing + "}", c = c + "#" + $(this).attr("id") + " .widget-content:-moz-placeholder{color:" + a.colorPickerUsing + "}", c = c + "#" + $(this).attr("id") + " .widget-content::-moz-placeholder{color:" + a.colorPickerUsing + "}", c = c + "#" + $(this).attr("id") + " .widget-content:-ms-input-placeholder{color:" + a.colorPickerUsing + "}</style>", $("head").append(c), $(this).find("select.widget-content").css({
                    color: a.colorPickerUsing
                }), $(this).find("select.widget-content option:first-child").css({
                    color: a.colorPickerUsing
                })
            }), $(".color-placeholder-form input").val(a.colorPickerUsing), $(".color-placeholder-form span span").css({
                "background-color": a.colorPickerUsing
            })
        }
    }, b.setColorTextFont = function () {
        if (selectedItem && selectedItem.length > 0) {
            var c = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                d = $(".editor-text");
            if (selectedItem && selectedItem.length > 0 || "none" != d.css("display")) {
                "none" != d.css("display") && (selectedItem = $("#punnel-editor #" + d.attr("pn-id")), $("#resizable-element").hide()), b.color_font = a.colorPickerUsing;
                var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                selectedItem.find(".widget-content:eq(0) *").attr("color", ""), selectedItem.find(".widget-content:eq(0) *").css({
                    color: a.colorPickerUsing
                }), selectedItem.find(".widget-content").eq(0).css({
                    color: a.colorPickerUsing
                }), apiElement[c].media.desktop.color = a.colorPickerUsing, apiElement[c].media.mobile.color = a.colorPickerUsing, apiElement[c].text = selectedItem.find(".widget-content").eq(0).html();
                var e = new OptionWiget;
                e.resetValueHeightText(selectedItem)
            }
            $(".color-text-font input").val(a.colorPickerUsing), $(".color-text-font span span").css({
                "background-color": a.colorPickerUsing
            })
        }
        }, b.setColorTextFontHover = function () {
            if (selectedItem && selectedItem.length > 0) {
                var c = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                    d = $(".editor-text");
                if (selectedItem && selectedItem.length > 0 || "none" != d.css("display")) {
                    "none" != d.css("display") && (selectedItem = $("#punnel-editor #" + d.attr("pn-id")), $("#resizable-element").hide()), b.color_font = a.colorPickerUsing;
                    var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                    apiElement[c].media.desktop['color-hover'] = a.colorPickerUsing, apiElement[c].media.mobile['color-hover'] = a.colorPickerUsing, apiElement[c].text = selectedItem.find(".widget-content").eq(0).html();
                    var e = new OptionWiget;
                    e.resetValueHeightText(selectedItem)
                }
                $(".color-text-font-hover input").val(a.colorPickerUsing), $(".color-text-font-hover span span").css({
                    "background-color": a.colorPickerUsing
                })
            }
        },
        b.setColorTextEditor = function () {
        var b = new saveAndRestoreRange;
        b.restorRange(), document.execCommand("foreColor", !1, a.colorPickerUsing);
        var c = $(".editor-text").find(".widget-content").eq(0),
            d = $("#" + $(".editor-text").attr("pn-id")),
            e = c.html(),
            f = PN_PAGE.getIndexElement(d.attr("id"));
        c.css({
            height: ""
        }), apiElement[f].text = e, d.find(".widget-content").eq(0).attr("contenteditable", "true").html(e), b.saveRange(), $(".color-text-editor input").val(a.colorPickerUsing), $(".color-text-editor span span").css({
            "background-color": a.colorPickerUsing
        })
        }, b.setColorShape = function () {
        if (selectedItem && selectedItem.length > 0) {
            var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            selectedItem.find("svg").eq(0).attr("fill", a.colorPickerUsing), b.color_shape = a.colorPickerUsing, apiElement[c].media.desktop.color = a.colorPickerUsing, apiElement[c].media.mobile.color = a.colorPickerUsing, $(".color-shape input").val(a.colorPickerUsing), $(".color-shape span span").css({
                "background-color": a.colorPickerUsing
            })
        }
    }, b.setColorLineNgang = function () {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].style_line["border-color"] = a.colorPickerUsing, selectedItem.find(".widget-content .line").css({
                "border-color": a.colorPickerUsing
            }), $(".color-line-ngang input").val(a.colorPickerUsing), $(".color-line-ngang span span").css({
                "background-color": a.colorPickerUsing
            })
        }
    }, b.setColorLineVertical = function () {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].style_linevertical["border-color"] = a.colorPickerUsing, selectedItem.find(".widget-content .linevertical").css({
                "border-color": a.colorPickerUsing
            }), $(".color-line-vertical input").val(a.colorPickerUsing), $(".color-line-vertical span span").css({
                "background-color": a.colorPickerUsing
            })
        }
    }, b.setColorImageOverlay = function () {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            selectedItem.find(".punnel-widget-overlay").eq(0).css({
                background: a.colorPickerUsing
            }), apiElement[b].media.overlay_color = a.colorPickerUsing, $(".color-image-overlay input").val(a.colorPickerUsing), $(".color-image-overlay span span").css({
                "background-color": a.colorPickerUsing
            })
        }
    }, b.setColorListOp = function () {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].media.color_icon = a.colorPickerUsing, PN_PAGE.setTypeListIcon(apiElement[b]), $(".pn-color-listOp input").val(a.colorPickerUsing), $(".pn-color-listOp span span").css({
                "background-color": a.colorPickerUsing
            })
        }
    }, b.getContentSetValue = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a, b;
            if ("slider" == selectedItem.attr("pn-type")) {
                var c = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left")),
                    d = (Math.round(c / selectedItem.outerWidth()), $(".widget-item.custom-manager-slider .item-slider.active").attr("pn-active"));
                b = PN_PAGE.getIndexElement(d)
            } else b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            return a = selectedItem.hasClass("widget-element") ? $("#punnel-editor #" + apiElement[b].id).find(".widget-content").eq(0) : 1 == apiElement[b].popup ? selectedItem.find(".container") : selectedItem, {
                index: b,
                content: a
            }
        }
        return !1
        },
        b.randomColor = function () {
            for (var a = "#", b = 0; 6 > b; b++) a += "0123456789ABCDEF"[Math.floor(16 * Math.random())];
            $("#lpColorPickerCtrl").colorpicker("setValue", a);
        },
        b.clear = function () {
            var c= 'rgba(255,255,255,1)';
            a.colorPickerUsing = c, b.colorPicker = c, b.setValueColor(), b.listColorChild = b.listColor[b.checkColorHex(a.colorPickerUsing).list].group;
        }
}]);