var ladiEditorText = function () {
    //$('#resizable-element li[pn-show="edittext"]').unbind("click").click(function () {
    //    showDivEdittext()
    //})
},
    showDivEdittext1 = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = selectedItem.attr("pn-type");
            if ("textinline" == a || "button" == a || "textparagraph" == a || "listop" == a) {
                var b = selectedItem.find(".widget-content").eq(0),
                    c = selectedItem.offset().top + "px",
                    d = selectedItem.offset().left + "px",
                    e = selectedItem.html();
                b.attr("contenteditable", "true"), $(".editor-text").attr("pn-id", selectedItem.attr("id")).css({
                    top: c,
                    left: d,
                    width: selectedItem.css("width"),
                    height: (a == "textparagraph" || a =="listop")? "auto" :selectedItem.css("height"),
                    "text-align": selectedItem.css("text-align")
                }).html(e).show(), "button" == a && ($(".editor-text .widget-content").css({
                    display: "table-cell",
                    "vertical-align": "middle"
                }), $(".editor-text").css({
                    display: "table"
                })), selectedItem.css({
                    visible: "hidden"
                }), selectedItem = void 0, $(".editor-text .widget-content").eq(0).attr({
                    contenteditable: "true",
                    onblur: "return false;"
                }).focus(), document.execCommand("selectAll", !1, null);
                var f = new OptionWiget;
                f.editextElement(), $("#resizable-element").hide(), $(".aside-setting .widget-item").hide(), $(".widget-item.custom-text").show()
            }
        }
    },
    showDivEdittext = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = selectedItem.attr("pn-type");
            if ("textinline" == a || "button" == a || "textparagraph" == a || "listop" == a) {
                var b = selectedItem.find(".widget-content").eq(0),
                    c = selectedItem.offset().top + "px",
                    d = selectedItem.offset().left + "px",
                    e = selectedItem.html();
                b.attr("contenteditable", "true"), $(".editor-text").attr("pn-id", selectedItem.attr("id")).css({
                    top: c,
                    left: d,
                    width: selectedItem.css("width"),
                    height: (a =="textinline" || a == "textparagraph" || a == "listop") ? "auto" : selectedItem.css("height"),
                    //height: selectedItem.css("height"),
                    "text-align": selectedItem.css("text-align")
                }).html(e).show(), "button" == a && ($(".editor-text .widget-content").css({
                    display: "table-cell",
                    "vertical-align": "middle"
                }), $(".editor-text").css({
                    display: "table"
                })), selectedItem.css({
                    visibility: "hidden"
                }), selectedItem = void 0, $(".editor-text .widget-content").eq(0).attr({
                    contenteditable: "true",
                    onblur: "return false;"
                }).focus(), $(".editor-text .widget-content").eq(0).unbind("blur").blur(function () {
                    var a = $(".editor-text").attr("pn-id");
                    a && a.length > 0 && $("#" + a).css({
                        visibility: "visible"
                    })
                }), $(".editor-text a").removeAttr("href");
                var f = new saveAndRestoreRange;
                f.selectAllElement($(".editor-text .widget-content")[0]),
                    f.saveRange();
                if ($($(".editor-text .widget-content")[0]).find(".pn-text-animated").length > 0 && 1 == $($(".editor-text .widget-content")[0]).children().length) {
                    window.documentClickCustomEditor($($(".editor-text .widget-content")[0]).find(".pn-text-animated")[0]);
                } else {
                    window.documentClickCustomEditor($(".editor-text .widget-content")[0]);
                }
                var g = new OptionWiget;
                g.editextElement(), $("#resizable-element").hide(), $(".aside-setting .widget-item").hide(), $(".widget-item.custom-editor-text").show(), $(".widget-item.custom-text").hide()
            }
        }
    },
    setValueFixed = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            console.log('setValueFixed' + selectedItem.offset().top);
            var b = selectedItem.offset().top,
                c = selectedItem.offset().left,
                d = $(window).outerWidth() - c - selectedItem.outerWidth(),
                e = $(window).outerHeight() - b - selectedItem.outerHeight(),
                f = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            switch (apiElement[f].fixedTop = b + "px", apiElement[f].fixedLeft = c + "px", apiElement[f].fixedRight = d + "px", apiElement[f].fixedBottom = e + "px", a) {
                case "none":
                    selectedItem.find(".widget-content").eq(0).css({
                        position: "",
                        height: "100%"
                    });
                    break;
                case "topleft":
                    selectedItem.find(".widget-content").eq(0).css({
                        position: "fixed",
                        top: b + "px",
                        left: c + "px",
                        bottom: "",
                        right: "",
                        height: selectedItem.css("height")
                    });
                    break;
                case "topright":
                    selectedItem.find(".widget-content").eq(0).css({
                        position: "fixed",
                        top: b + "px",
                        right: d + "px",
                        bottom: "",
                        left: "",
                        height: selectedItem.css("height")
                    });
                    break;
                case "bottomleft":
                    selectedItem.find(".widget-content").eq(0).css({
                        position: "fixed",
                        bottom: e + "px",
                        left: c + "px",
                        top: "",
                        right: "",
                        height: selectedItem.css("height")
                    });
                    break;
                case "bottomright":
                    selectedItem.find(".widget-content").eq(0).css({
                        position: "fixed",
                        bottom: e + "px",
                        right: d + "px",
                        top: "",
                        left: "",
                        height: selectedItem.css("height")
                    })
            }
        }
    },
    openLink = function (a, b) {
        var c = document.createElement("a");
        c.style.display = "none", c.setAttribute("href", a), c.setAttribute("target", b), c.style.display = "none", c.click(), c.remove()
    };

showAddNewSection = function () {
    var a = $("#punnel-editor .widget-section:visible").last(),
        b = $('#punnel-editor .widget-section[pn-popup!="true"]:visible'),
        c = $(window).outerHeight();
    a && a.length > 0 ? ($(".add-new-section").css({
        bottom: "20px"
    }), a.outerHeight() + a.offset().top + 40 <= c && "desktop" == deviceEdit && 0 == preview ? $(".add-new-section").show() : $(".add-new-section").hide(), $(".add-new-section").hide()) : ($(".add-new-section").css({
        bottom: "calc(50%)"
    }), $(".add-new-section").show());
    var d = 0;
    b.each(function () {
        d += $(this).outerHeight()
    });
    var e = d / 100;
    $(".horizontal-line .rulers-number").html("");
    for (var f = 0; e > f; f++) {
        var g = '<div class="punnel-number">' + 100 * f + "</div>";
        $(".horizontal-line .rulers-number").append(g)
    }
    $(".horizontal-line").css({
        height: d + "px"
    })
};

var addElementToParent = function (a) {
    var b = "";
    if ("desktop" == deviceEdit && a && a.length > 0) {
        var c = new OptionWiget,
            d = c.getParentSection(a);
        if (d && d.length > 0 && d.hasClass("widget-section")) {
            var e, f = a.offset().top,
                g = a.offset().left,
                h = a.outerWidth(),
                i = a.outerHeight(),
                j = d.find(".punnel-drop:visible");
            j && j.length > 0 && j.each(function () {
                var b = $(this).offset().top,
                    c = $(this).offset().left,
                    d = $(this).outerWidth(),
                    k = $(this).outerHeight();
                f >= b && g >= c && c + d >= g + h && b + k >= f + i && a.attr("id") != $(this).attr("id") ? e = $(this) : j.removeClass("parent-droped")
            }), e && e.length > 0 && e.hasClass("widget-element") ? (j.removeClass("parent-droped"), e.removeClass("parent-droped").addClass("parent-droped"), b = e) : b = d
        }
    }
    return b
},
    addElementWhenResize = function (a) {
        if ($(".widget-element.parent-droped").removeClass("parent-droped"), "desktop" == deviceEdit) {
            var b = new OptionWiget,
                c = b.getParentElement(a);
            if (PN_PAGE.checkItemSlider(c))
                if (c.hasClass("widget-group"));
                else {
                    var d = addElementToParent(a);
                    if (d && "slider" == d.attr("pn-type")) {
                        var e = d.find(".wrap-child").eq(0),
                            f = parseFloat(Math.abs(parseFloat(e.css("left"))) / d.outerWidth());
                        d = d.find('.widget-element[pn-type="item_slider"]').eq(f)
                    }
                    if (d && d.length > 0 && (d.hasClass("widget-section") || d.hasClass("widget-element")) && d.attr("id") != b.getParentElement(a).attr("id")) {
                        var g = d.attr("id");
                        if (a.hasClass("widget-item-child"));
                        else if (a.attr("pn-parent") && a.attr("pn-parent").length > 0);
                        else {
                            var h, i = PN_PAGE.getIndexElement(a.attr("id"));
                            d.hasClass("widget-element") ? (h = d.find(".widget-content").eq(0),
                                apiElement[i].parent = "#" + d.attr("id") + " .widget-content") : (h = d.find(".container").eq(0), apiElement[i].parent = "#" + d.attr("id") + " .container");
                            var j = a.offset().top - h.offset().top,
                                k = a.offset().left - h.offset().left;
                            if (h.append(a), a.css({
                                top: j + "px",
                                left: k + "px"
                            }), apiElement[i].media.desktop.top = j + "px", apiElement[i].media.desktop.left = k + "px", $(".parent-droped").removeClass("parent-droped"), "contact_form" == a.attr("pn-type")) {
                                var l = $('.widget-element[pn-parent="' + a.attr("id") + '"]');
                                l && l.length > 0 && (j = l.offset().top - h.offset().top, k = l.offset().left - h.offset().left, h.append(l), l.css({
                                    top: j + "px",
                                    left: k + "px"
                                }), i = PN_PAGE.getIndexElement(l.attr("id")), apiElement[i].media.desktop.top = j + "px", apiElement[i].media.desktop.left = k + "px", d.hasClass("widget-element") ? apiElement[i].parent = "#" + d.attr("id") + " .widget-content" : apiElement[i].parent = "#" + d.attr("id") + " .container")
                            }
                            d = $("#punnel-editor #" + g), resetSizeElementParent(d)
                        }
                    }
                }
        }
    },
    resetSizeElementParent = function (a) {
        if (a && a.length > 0 && a.hasClass("widget-element")) {
            var b = a.find(".widget-content:eq(0) > .widget-element"),
                c = a.offset().top,
                d = a.offset().left,
                e = a.outerWidth(),
                f = a.outerHeight(),
                g = d,
                h = d + e,
                i = c,
                j = c + f;
            if (b && b.length > 0) {
                b.each(function () {
                    $(this).offset().top < i && (i = $(this).offset().top), $(this).offset().top + $(this).outerHeight() > j && (j = $(this).offset().top + $(this).outerHeight()), $(this).offset().left < g && (g = $(this).offset().left), $(this).offset().left + $(this).outerWidth() > h && (h = $(this).offset().left + $(this).outerWidth())
                });
                var k = PN_PAGE.getIndexElement(a.attr("id"));
                a.css({
                    top: i - c + parseFloat(a.css("top")) + "px",
                    left: g - d + parseFloat(a.css("left")) + "px",
                    width: h - g + "px",
                    height: j - i + "px"
                }), a.find(".widget-content").eq(0).css({
                    width: h - g + "px",
                    height: j - i + "px"
                }), apiElement[k].media[deviceEdit].top = a.css("top"), apiElement[k].media[deviceEdit].left = a.css("left"), apiElement[k].media[deviceEdit].width = a.css("width"), apiElement[k].media[deviceEdit].height = a.css("height")
            }
        }
    },
    setVisiableElementSlider = function (a, b) {
        if (a && "slider" == a.attr("pn-type")) {
            var c = a.find('.widget-element[pn-type="item_slider"]'),
                d = c.eq(b).attr("id");
            a.find('.widget-element[id !="' + d + '"]').css({
                visibility: "hidden"
            }), c.eq(b).css({
                visibility: "visible"
            }), c.eq(b).find(".widget-element").css({
                visibility: "visible"
            })
        }
    },
    ApiDefault = function () { };

ApiDefault.prototype.widget_section = function () {
    return {
        mobile: 0,
        lp_type: "widget-section",
        type: "widget_section",
        type_plugin: "widget_section",
        parent: "body",
        lang: "SECTION",
        media: {
            desktop: {
                width: "100%",
                height: "500px"
            },
            mobile: {
                width: "100%",
                height: "500px"
            }
        }
    }
},
ApiDefault.prototype.notify = function () {
    return {
        mobile: 0,
        lang: "NOTIFY",
        lp_type: "widget-element",
        media: {
            desktop: {
                width: "355px",
                height: "63px"
            },
            mobile: {
                width: "355px",
                height: "63px"
            }
        }
    }
},
ApiDefault.prototype.group = function () {
    return {
        mobile: 0,
        lang: "GROUP",
        media: {
            desktop: {},
            mobile: {
                top: "10px",
                left: "15px"
            }
        }
    }
},
ApiDefault.prototype.widget_group = function () {
    return {
        mobile: 0,
        lang: "GROUP",
        lp_type: "widget-element",
        media: {
            desktop: {},
            mobile: {
                top: "10px",
                left: "15px"
            }
        }
    }
},
ApiDefault.prototype.button = function () {
    return {
        mobile: 0,
        lp_type: "widget-element",
        text: "CLICK NOW",
        lang: "BUTTON",
        bg_type: "color",
        action: "",
        line_spacing: "40px",
        media: {
            desktop: {
                "background-color": "#3D9BE9",
                "background-color-hover": "#3578E5",
                color: "#ffffff",
                "text-align": "center",
                "font-size": "14px",
                height: "40px",
                width: "160px",
                top: "10px",
                left: "15px",
                padding: "0px",
                "border-top-left-radius": "5px",
                "border-top-right-radius": "5px",
                "border-bottom-left-radius": "5px",
                "border-bottom-right-radius": "5px"
            },
            mobile: {
                "background-color": "#3D9BE9",
                "background-color-hover": "#3578E5",
                color: "#ffffff",
                "text-align": "center",
                "font-size": "14px",
                height: "40px",
                width: "160px",
                top: "10px",
                left: "15px",
                padding: "0px",
                "border-top-left-radius": "5px",
                "border-top-right-radius": "5px",
                "border-bottom-left-radius": "5px",
                "border-bottom-right-radius": "5px"
            }
        },
        font_weight: 400,
        font_family: '"Open Sans", sans-serif',
        animate_ext: 'pn-animate-hover'
    }
},
ApiDefault.prototype.slider = function () {
    return {
        mobile: 0,
        lang: "CAROUSEL",
        lp_type: "widget-element",
        sliderdelay: 5e3,
        media: {
            desktop: {
                width: dummyData.viewport.size_mobile + "px",
                height: dummyData.viewport.size_mobile + "px"
            },
            mobile: {
                width: dummyData.viewport.size_mobile + "px",
                height: dummyData.viewport.size_mobile + "px"
            }
        }
    }
},
ApiDefault.prototype.item_slider = function () {
    return {
        mobile: 0,
        lang: "ITEM CAROUSEL",
        lp_type: "widget-element",
        media: {
            desktop: {
                width: dummyData.viewport.size_mobile + "px",
                height: dummyData.viewport.size_mobile + "px"
            },
            mobile: {
                width: dummyData.viewport.size_mobile + "px",
                height: dummyData.viewport.size_mobile + "px"
            }
        }
    }
},
ApiDefault.prototype.slide_show = function () {
    return {
        mobile: 0,
        lp_type: "widget-element",
        auto_play: 1,
        time_out: 5e3,
        lang: "SLIDESHOW",
        image: [{
            src: URL_BASE + "/images/pn8668.jpg",
            title: "",
            desc: "",
            action: ""
        }, {
            src: URL_BASE + "/images/2.3d9e7eb2.jpg",
            title: "",
            desc: "",
            action: ""
        }, {
            src: URL_BASE + "/images/3.afad6c3a.jpg",
            title: "",
            desc: "",
            action: ""
        }, {
            src: URL_BASE + "/images/5.bf25488a.jpg",
            title: "",
            desc: "",
            action: ""
        }],
        media: {
            desktop: {
                width: "400px",
                height: "300px",
                top: "10px",
                left: "200px"
            },
            mobile: {
                width: "320px",
                height: "300px",
                top: "10px",
                left: "0px"
            }
        }
    }
},
ApiDefault.prototype.image = function () {
    return {
        mobile: 0,
        lp_type: "widget-element",
        link: URL_BASE + "/images/pn8668.jpg",
        lang: "IMAGE",
        media: {
            desktop: {
                width: "280px",
                height: "280px",
                top: "10px",
                left: "200px"
            },
            mobile: {
                width: "280px",
                height: "280px",
                top: "10px",
                left: "15px"
            }
        }
    }
},
ApiDefault.prototype.youtube = function () {
    return {
        mobile: 0,
        lang: "YOUTUBE",
        lp_type: "widget-element",
        link: "https://www.youtube.com/embed/R6HNvzchX5M",
        media: {
            desktop: {
                width: "356px",
                height: "200px"
            },
            mobile: {
                width: "356px",
                height: "110px",
                top: "10px",
                left: "15px"
            }
        }
    }
},
ApiDefault.prototype.vimeo = function () {
    return {
        mobile: 0,
        lang: "VIMEO",
        lp_type: "widget-element",
        link: "https://player.vimeo.com/video/304783732",
        media: {
            desktop: {
                width: "280px",
                height: "250px"
            },
            mobile: {
                width: "280px",
                height: "250px",
                top: "10px",
                left: "15px"
            }
        }
    }
},
ApiDefault.prototype.textinline = function () {
    return {
        mobile: 0,
        text: "Tiêu đề lớn",
        lp_type: "widget-element",
        lang: "HEADLINE",
        node: "h2",
        media: {
            desktop: {
                "font-size": "30px",
                "text-align": "left",
                color: "rgba(0,0,0,1)",
                width: "200px",
                height: "40px",
                padding: "0px"
            },
            mobile: {
                "font-size": "30px",
                "text-align": "left",
                color: "rgba(0,0,0,1)",
                width: "200px",
                height: "40px",
                top: "10px",
                left: "15px",
                padding: "0px"
            },
            font_weight: 400,
            font_family: '"Open Sans", sans-serif'
        },
        line_spacing: "36px"
    }
},
ApiDefault.prototype.textinline2 = function () {
    return {
        mobile: 0,
        text: "Nội dung tiêu đề",
        lp_type: "widget-element",
        lang: "HEADLINE",
        node: "h2",
        media: {
            desktop: {
                "font-size": "30px",
                "text-align": "left",
                color: "rgba(0,0,0,1)",
                width: "200px",
                height: "40px",
                padding: "0px"
            },
            mobile: {
                "font-size": "30px",
                "text-align": "left",
                color: "rgba(0,0,0,1)",
                width: "200px",
                height: "40px",
                top: "10px",
                left: "15px",
                padding: "0px"
            },
            font_weight: 400,
            font_family: '"Open Sans", sans-serif'
        },
        line_spacing: "36px"
    }
},
ApiDefault.prototype.textinline3 = function () {
    return {
        mobile: 0,
        text: "Nội dung tiêu đề",
        lp_type: "widget-element",
        lang: "HEADLINE",
        node: "h3",
        media: {
            desktop: {
                "font-size": "24px",
                "text-align": "left",
                color: "rgba(0,0,0,1)",
                width: "200px",
                height: "28px",
                padding: "0px"
            },
            mobile: {
                "font-size": "24px",
                "text-align": "left",
                color: "rgba(0,0,0,1)",
                width: "200px",
                height: "28px",
                top: "10px",
                left: "15px",
                padding: "0px"
            },
            font_weight: 400,
            font_family: '"Open Sans", sans-serif'
        },
        line_spacing: "30px"
    }
},
ApiDefault.prototype.textinline5 = function () {
    return {
        mobile: 0,
        text: "Nội dung ..",
        lp_type: "widget-element",
        lang: "HEADLINE",
        node: "h5",
        media: {
            desktop: {
                "font-size": "18px",
                "text-align": "left",
                color: "rgba(0,0,0,1)",
                width: "200px",
                height: "22px",
                padding: "0px"
            },
            mobile: {
                "font-size": "18px",
                "text-align": "left",
                color: "rgba(0,0,0,1)",
                width: "200px",
                height: "22px",
                top: "10px",
                left: "15px",
                padding: "0px"
            },
            font_weight: 400,
            font_family: '"Open Sans", sans-serif'
        },
        line_spacing: "24px"
    }
},
ApiDefault.prototype.textsymbol = function () {
    return {
        mobile: 0,
        text: "❤",
        lp_type: "widget-element",
        lang: "SYMBOLS",
        node: "h6",
        media: {
            desktop: {
                "font-size": "36px",
                "text-align": "left",
                color: "rgba(0,0,0,1)",
                width: "34px",
                height: "35px",
                padding: "0px"
            },
            mobile: {
                "font-size": "36px",
                "text-align": "left",
                color: "rgba(0,0,0,1)",
                width: "40px",
                height: "35px",
                top: "10px",
                left: "15px",
                padding: "0px"
            },
            font_family: '"Open Sans", sans-serif'
        },
        line_spacing: "42px"
    }
},
ApiDefault.prototype.textparagraph = function () {
    return {
        mobile: 0,
        lp_type: "widget-element",
        lang: "PARAGRAPH",
        node: "p",
        text: "Landing page (hay còn gọi là trang đích) nói đơn giản là 1 trang web đơn, chỉ tập trung nội dung vào 1 trang duy nhất nhằm dẫn dắt và thu hút người đọc thực hiện một mục tiêu chuyển đổi nhất định!",
        media: {
            desktop: {
                width: "280px",
                height: "90px",
                "text-align": "left",
                color: "rgba(0,0,0,1)",
                "font-size": "13px",
                padding: "0px"
            },
            mobile: {
                width: "280px",
                height: "75px",
                "text-align": "left",
                color: "rgba(0,0,0,1)",
                "font-size": "13px",
                top: "10px",
                left: "15px",
                padding: "0px"
            },
            font_weight: 400,
            font_family: '"Open Sans", sans-serif'
        },
        line_spacing: "19px"
    }
},
ApiDefault.prototype.box = function () {
    return {
        mobile: 0,
        lp_type: "widget-element",
        bg_type: "color",
        lang: "BOX",
        media: {
            desktop: {
                width: "270px",
                height: "270px",
                "background-color": "rgba(189,189,189,1)"
            },
            mobile: {
                width: "270px",
                height: "270px",
                "background-color": "rgba(189,189,189,1)",
                top: "10px",
                left: "15px"
            }
        }
    }
},
ApiDefault.prototype.shape = function () {
    return {
        mobile: 0,
        lp_type: "widget-element",
        bg_type: "color",
        lang: "SHAPE",
        viewBox: "0 0 24 24",
        media: {
            desktop: {
                color: "#000000",
                width: "32px",
                height: "32px",
                top: "10px",
                left: "15px"
            },
            mobile: {
                color: "#000000",
                width: "32px",
                height: "32px",
                top: "10px",
                left: "15px"
            }
        }
    }
},
ApiDefault.prototype.customhtml = function () {
    return {
        mobile: 0,
        lang: "HTML",
        lp_type: "widget-element",
        media: {
            desktop: {
                width: "450px",
                height: "280px",
                top: "10px",
                left: "15px"
            },
            mobile: {
                width: "280px",
                height: "280px",
                top: "10px",
                left: "15px"
            }
        }
    }
},
ApiDefault.prototype.contact_form = function () {
    return {
        mobile: 0,
        lp_type: "widget-element",
        bg_type: "color",
        style: "style 1",
        node: "h1",
        lang: "FORM",
        type_form: "google-sheet",
        item_form: [{
            type: "name",
            name: "name",
            label: "Họ và Tên",
            placeholder: "Họ và tên",
            required: "true",
            using: "true"
        }, {
            type: "email",
            name: "email",
            lable: "Địa chỉ email",
            placeholder: "Nhập email",
            required: "true",
            using: "true"
        }, {
            type: "phone",
            name: "phone",
            label: "Điện thoại",
            placeholder: "Nhập số điện thoại",
            required: "true",
            using: "true"
        }, {
            type: "message",
            name: "message",
            lable: "Lời nhắn",
            placeholder: "Để lại lời nhắn cho chúng tôi",
            required: "true",
            using: "true"
        }],
        itemText: [],
        custom_child: {
            background: "",
            color: ""
        },
        media: {
            desktop: {
                top: "0",
                left: "0",
                width: "300px",
                height: "235px"
            },
            mobile: {
                top: "0",
                left: "0",
                width: "300px",
                height: "235px"
            }
        }
    }
},
ApiDefault.prototype.countdown = function () {
    return {
        mobile: 0,
        lang: "COUNTDOWN",
        lp_type: "widget-element",
        line_spacing: "0px",
        media: {
            desktop: {
                width: "320px",
                height: "57px",
                top: "10px",
                left: "15px",
                "font-size": "40px",
                color: "rgba(0,0,0,1)"
            },
            mobile: {
                width: "320px",
                height: "57px",
                top: "10px",
                left: "15px",
                "font-size": "40px",
                color: "rgba(0,0,0,1)"
            },
            font_weight: 700,
            font_family: '"Open Sans", sans-serif'
        }
    }
},
ApiDefault.prototype.line = function () {
    return {
        mobile: 0,
        lang: "LINE",
        lp_type: "widget-element",
        style_line: {
            "border-top": "1px",
            "border-left": "0px",
            "border-right": "0px",
            "border-bottom": "0px",
            "border-style": "solid",
            "border-color": "rgba(0,0,0,1)",
            "margin-top": "12px"
        },
        media: {
            desktop: {
                width: "400px",
                height: "25px"
            },
            mobile: {
                width: "100%",
                height: "25px"
            }
        }
    }
},
ApiDefault.prototype.googlemap = function () {
    return {
        mobile: 0,
        lang: "GOOGLE_MAP",
        lp_type: "widget-element",
        value_google_map: {
            address: "Ho Chi Minh",
            title: "Quan 1, Ho Chi Minh, Viet Nam",
            zoom: 14,
            icon: ""
        },
        media: {
            desktop: {
                width: "500px",
                height: "300px"
            },
            mobile: {
                width: "300px",
                height: "200px"
            }
        }
    }
},
ApiDefault.prototype.facebook_comment = function () {
    return {
        mobile: 0,
        lp_type: "widget-element",
        lang: "FACEBOOK_COMMENT",
        value_facebook_comment: {
            url: "https://punnel.com/",
            number_post: 5,
            api_key: ""
        },
        media: {
            desktop: {
                width: "500px",
                height: "200px",
                "border-top": "0px",
                "border-left": "0px",
                "border-right": "0px",
                "border-bottom": "0px",
                "border-style": "solid",
                "border-color": "#000"
            },
            mobile: {
                width: "300px",
                height: "200px"
            }
        }
    }
},
ApiDefault.prototype.facebook_messages = function () {
    return {
        mobile: 0,
        lp_type: "widget-element",
        lang: "FACEBOOK_MESSAGES",
        value_facebook_messages: {
            url: "https://www.facebook.com/congdongpunnel/?ref=page_internal"
        },
        media: {
            desktop: {
                width: "340px",
                height: "512px",
                "border-top": "0px",
                "border-left": "0px",
                "border-right": "0px",
                "border-bottom": "0px",
                "border-style": "solid",
                "border-color": "#000"
            },
            mobile: {
                width: "320px",
                height: "512px"
            }
        }
    }
},
ApiDefault.prototype.menu_header = function () {
    return {
        mobile: 0,
        sortmobile: 0,
        lang: "MENU",
        lp_type: "widget-element",
        type_plugin: "menu_header",
        navigation: "false",
        item_menu: [{
            id: "",
            link_page: "",
            name: "GIỚI THIỆU",
            width: "125px"
        }, {
            id: "",
            link_page: "",
            name: "LIÊN HỆ",
            width: "125px"
        }],
        media: {
            desktop: {
                width: "250px",
                height: "50px",
                top: "0px",
                left: "0px"
            },
            mobile: {
                top: "0px",
                left: "0px",
                height: "50px",
                width: "250px"
            },
            items: {
                color: "#000000",
                width: "125px"
            }
        }
    }
},
ApiDefault.prototype.item_menu = function () {
    return {
        mobile: 0,
        sortmobile: 0,
        lang: "ITEM_MENU",
        lp_type: "widget-element",
        type_plugin: "item_menu",
        media: {
            desktop: {
                width: "125px",
                height: "50px",
                top: "0px",
                left: "0px",
                "text-align": "center",
                display: "table",
                color: "#000000"
            },
            mobile: {
                width: "100%",
                height: "50px",
                top: "0px",
                left: "0px",
                "text-align": "center",
                display: "table",
                color: "#000000"
            }
        }
    }
},
ApiDefault.prototype.item_form = function () {
    return {
        mobile: 0,
        lang: "ITEM_FORM",
        lp_type: "widget-element",
        type_plugin: "item_form",
        required_form: "true",
        media: {
            desktop: {
                width: "300px",
                height: "40px",
                top: "0px",
                left: "0px",
                "border-top": "1px",
                "border-left": "1px",
                "border-right": "1px",
                "border-bottom": "1px",
                "border-style": "solid",
                "border-color": "#eee"
            },
            mobile: {
                top: "0px",
                left: "0px",
                height: "40px",
                width: "300px",
                "border-top": "1px",
                "border-left": "1px",
                "border-right": "1px",
                "border-bottom": "1px",
                "border-style": "solid",
                "border-color": "#eee"
            }
        }
    }
},
ApiDefault.prototype.linevertical = function () {
    return {
        mobile: 0,
        lang: "LINEVERTICAL",
        lp_type: "widget-element",
        style_linevertical: {
            "border-top": "0px",
            "border-left": "1px",
            "border-right": "0px",
            "border-bottom": "0px",
            "border-style": "solid",
            "border-color": "rgba(0,0,0,1)",
            "margin-left": "12px"
        },
        media: {
            desktop: {
                width: "25px",
                height: "150px"
            },
            mobile: {
                width: "25px",
                height: "150px"
            }
        }
    }
},
ApiDefault.prototype.listop = function () {
    return {
        mobile: 0,
        lang: "LISTOP",
        lp_type: "widget-element",
        type_plugin: "listop",
        line_spacing: "20px",
        typeicon: "icon",
        widthIcon: "30px",
        heightIcon: "30px",
        lineList: "15px",
        font_icon: "15px",
        media: {
            desktop: {
                width: "200px",
                height: "55px",
                top: "0px",
                left: "0px",
                "text-align": "left",
                content: "decimal"
            },
            mobile: {
                height: "55px",
                width: "200px",
                top: "0px",
                left: "0px",
                "text-align": "left",
                content: "decimal",
                character_spacing_icon: "8px",
                widthIcon: "30px",
                heightIcon: "30px",
                lineList: "15px",
                topIcon: "0"
            },
            character_spacing_icon: "0px"
        }
    }
};