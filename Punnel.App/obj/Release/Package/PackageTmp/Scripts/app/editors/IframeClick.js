var IframeClick = function() {};
IframeClick.prototype.init = function() {
    var a = new ShowBoxResize,
        b = new AddGroup,
        c = new IframeClick;
    $("#punnel-editor").unbind("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll", function(a) {
        topScroll = $(this).scrollTop(), $("#resizable-element").hide(), $("#resizable-section").hide()
    }), $("#resizable-section").unbind("mousewheel").on("mousewheel", function() {
        $("#resizable-section").hide(), PN_PAGE.getElement(".widget-group .widget-content").eq(0).css({
            outline: "0px"
        }), $(".settings").removeClass("active"), $(".ngdialog.ng-scope").remove()
    }), $("#resizable-section").unbind("click").click(function(b) {
        var d = getElementClick(b.pageY, b.pageX, selectedItem);
        c.addClassSelected(d), selectedItem && selectedItem.length > 0 && (selectedItem.hasClass("widget-section") || a.showBox(selectedItem))
    }),
    $("#resizable-element").unbind("contextmenu").contextmenu(function (a) {
        a.preventDefault(), selectedItem && selectedItem.length > 0 && (console.log(selectedItem.attr("pn-type")), "item_form" != selectedItem.attr("pn-type") && (console.log(1), $(".click-right").css({
            top: a.pageY + "px",
            left: a.pageX + "px"
        }).show()))
    }),
    $("#resizable-element").unbind("click").click(function (b) {
        if (b.preventDefault(), "resizable-element" == $(b.target).attr("id")) {
            var d = getElementClick(b.pageY, b.pageX, PN_PAGE.PUNNEL_EDIT);
            c.addClassSelected(d), selectedItem && selectedItem.length > 0 && (selectedItem.hasClass("widget-section") || a.showBox(selectedItem))
        }
    }), $("#resizable-element").unbind("mousewheel").on("mousewheel", function() {
        PN_PAGE.getElement(".widget-group .widget-content").eq(0).css({
            outline: "0px"
        }), $("#resizable-element").hide(), $(".settings").removeClass("active")
    }), $(".iframe-content").unbind("scroll").scroll(function() {
        $(".click-right").hide(), PN_PAGE.showElementEditorText(), b.removeGroupTmp(), showAddNewSection()
    })
},
IframeClick.prototype.checkElement = function (a, b, c) {
    if (void 0 != a && void 0 != a.offset()) {
        var d = b - PN_PAGE.PUNNEL_EDIT.offset().top,
            e = new Rotate,
            f = a.offset().top,
            g = a.offset().left + PN_PAGE.PUNNEL_EDIT.offset().left,
            h = e.valueEle(a).width,
            i = e.valueEle(a).height;
        if (d > f && f + i > d && c > g && g + h > c) return a
    }
    return !1
},
IframeClick.prototype.getItemToWg = function (a, b, c, d) {
    var e = void 0,
        f = void 0,
        g = this;
    return e = $(b.find(".widget-element:visible").get().reverse()), void 0 != e && e.length > 0 ? (e.each(function() {
        return f = g.checkElement($(this), c, d), void 0 != f && f.length > 0 ? !1 : void 0
    }), void 0 != f && f.length > 0 ? f : a) : a
},
IframeClick.prototype.getElementToScreen = function (a, b) {
    for (var c = arrIdOnScreen.length, d = c - 1; d >= 0; d--) {
        var e = PN_PAGE.getElement("#" + arrIdOnScreen[d]),
            f = this.checkElement(e, a, b);
        if (void 0 != f && f.length > 0) return e
    }
},
IframeClick.prototype.addClassSelected = function (a) {
    pageSave = !1, $(".widgets").removeClass("active"), $(".layers").hide(), $(".aside-left li").removeClass("active");
    var b = new AddGroup,
        c = new ShowBoxResize;
    $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide(), PN_PAGE.getElement(".selected").removeClass("selected"), void 0 != a && (0 == mouseIsMove ? $(a).hasClass("widget-section") ? ($(a).addClass("selected"), selectedItem = $(a), groupElement = [], b.removeGroupTmp(), dbClickBox = !1, PN_PAGE.getElement(".widget-group .widget-content").eq(0).css({
        outline: "0px"
    })) : ($("#resizable-section").hide(), $(a).hasClass("widget-element") && (selectedItem = $(a), selectedItem.addClass("selected"))) : groupElement.length > 1 ? (selectedItem = PN_PAGE.getElement("#GROUP_TMP"), selectedItem.addClass("selected"), c = new ShowBoxResize, c.showBox(selectedItem)) : 1 == groupElement.length ? (selectedItem = PN_PAGE.getElement("#" + groupElement[0]), c.showBox(selectedItem)) : b.removeGroupTmp(), clickIframe = !0, checkClick = 0, this.showOptionProperties(selectedItem), selectedItem && selectedItem.hasClass("widget-element") && this.showControlEditPlugin(selectedItem))
},
IframeClick.prototype.showOptionProperties = function (a) {
    if ($(".aside-setting .widget-item").hide(), document.removeEventListener("click", documentClick), document.addEventListener("click", documentClick), a && a.length > 0) {
        var b = a.attr("pn-type"), ispopup = false;
        if (b == 'widget_section' && a.attr("pn-popup") == 'true') {
            ispopup = true;
        }
        a.attr("pn-lang");
        if ($(".aside-setting .heading-title .id-element").text("#ID:  " + a.attr("id")), "desktop" == deviceEdit) {
            if (advanceSetting[b] && advanceSetting[b].length > 0) {
                for (var c = 0; c < advanceSetting[b].length; c++) {
                    if (ispopup == false && advanceSetting[b][c] != 'custom-popup') {
                        var d = $(".aside-setting .widget-item." + advanceSetting[b][c]);
                        d && d.length > 0 && d.show()
                    } else if (advanceSetting[b][c] != 'custom-animation' && advanceSetting[b][c] != 'custom-section' && advanceSetting[b][c] != 'custom-sticky') {
                        var d = $(".aside-setting .widget-item." + advanceSetting[b][c]);
                        d && d.length > 0 && d.show()
                    }
                }
                $(".aside-setting .widget-item:visible .group-content-setting").hide(), $(".aside-setting .widget-item:visible .widget-title .ion-arrow-down-b").addClass("ion-arrow-right-b").removeClass("ion-arrow-down-b"), $(".aside-setting .widget-item:visible").eq(0).find(".widget-title i").addClass("ion-arrow-down-b").removeClass("ion-arrow-right-b"), $(".aside-setting .widget-item:visible").eq(0).find(".group-content-setting").show()
            } else $(".aside-setting .widget-item").hide();
            "button" == b && a.attr("pn-parent") && ($(".aside-setting .widget-item.custom-links").hide(), $(".aside-setting .widget-item.custom-sticky").hide()), $(".aside-setting .widget-item.custom-section").hide(), $(".aside-setting .widget-item.custom-readmore .desktop").show(), $(".aside-setting .widget-item.custom-readmore .mobile").hide()
        } else {
            "textinline" == b || "button" == b || "textparagraph" == b || "countdown" == b ? $(".aside-setting .widget-item.custom-text-mobile").show() : "listop" == b ? $(".aside-setting .widget-item.custom-list-mobile").show() : $(".aside-setting .widget-item").hide(), $(".aside-setting .widget-item.custom-section").show();
            var e = $('.widget-section[pn-popup="true"]');
            e && e.length > 0 && (arrIdPopup = [], e.each(function () {
                arrIdPopup.push($(this).attr("id"))
            })), $(".aside-setting .widget-item.custom-section .group-content-setting").show(), $(".aside-setting .widget-item.custom-section .widget-title .ion-arrow-right-b").addClass("ion-arrow-down-b"), $(".aside-setting .widget-item.custom-section .widget-title .ion-arrow-right-b").removeClass("ion-arrow-right-b"), -1 != $.inArray("custom-background", advanceSetting[b]), a.hasClass("widget-section") && ($(".aside-setting .widget-item.custom-background").show(), $(".aside-setting .widget-item.custom-readmore").show()), $(".aside-setting .widget-item.custom-readmore .desktop").hide(), $(".aside-setting .widget-item.custom-readmore .mobile").show();
            if (ispopup == true) $(".aside-setting .widget-item.custom-popup").show();
        }
        var f = new OptionWiget,
            g = f.getParentElement(a);
        !g.hasClass("widget-section")
    }
},
IframeClick.prototype.showControlEditPlugin = function (a) {
    if (a && a.length > 0) {
        var b = $("#resizable-element"),
            c = b.find(".edit-element");
        c.find("li").hide();
        var d = a.attr("pn-type");
        if ("desktop" == deviceEdit) {
            if (control_setting[d] && control_setting[d].length > 0) {
                for (var e = 0; e < control_setting[d].length; e++) {
                    var f = c.find('li[pn-show="' + control_setting[d][e] + '"]');
                    f && f.length > 0 && f.show()
                }
                "button" == d && a.attr("pn-parent") && (c.find('li[pn-show="custom-link"]').hide(), c.find('li[pn-show="delete"]').hide(), c.find('li[pn-show="nhanban"]').hide()), ("widget_section" != a.parents("[pn-type]").attr("pn-type") && "contact_form" != a.parents("[pn-type]").attr("pn-type")) && c.find('li[pn-show="move_position"]').hide()
                //"button" == d && a.attr("pn-parent") && (c.find('li[pn-show="custom-link"]').hide(), c.find('li[pn-show="delete"]').hide())
            }
            "important" == a.attr("pn-type-background") ? c.find('li[pn-show="setBackground"]').hide() : c.find('li[pn-show="setElement"]').hide()//, c.find('li[pn-show="hide-element-mobile"]').hide()
        }
        else {
            c.find('li[pn-show="hide-element-mobile"]').show(), "item_form" == d && c.find('li[pn-show="selectForm"]').show(), "slider" == d && (c.find('li[pn-show="prev-slider"]').show(), c.find('li[pn-show="next-slider"]').show());
            var f = c.find('li[pn-show="move_position"]');
            f && f.length > 0 && f.show(), ("widget_section" != a.parents("[pn-type]").attr("pn-type") && "contact_form" != a.parents("[pn-type]").attr("pn-type")) && c.find('li[pn-show="move_position"]').hide()
            var media_id = PN_PAGE.getIndexElement(a.attr("id"));
            var isScroll = apiElement[media_id].media.mobile.auto_scroll || false;
            if (apiElement[media_id].lang == 'GROUP') {
                if (isScroll == true) {
                    c.find('li[pn-show="hide-element-mobile unscroll"]').show();
                    c.find('li[pn-show="hide-element-mobile scroll"]').hide();
                } else {
                    c.find('li[pn-show="hide-element-mobile unscroll"]').hide();
                    c.find('li[pn-show="hide-element-mobile scroll"]').show();
                }
            } else {
                c.find('li[pn-show="hide-element-mobile unscroll"]').hide();
                c.find('li[pn-show="hide-element-mobile scroll"]').hide();
            }
            //var f = c.find('li[pn-show="move_position"]');
            //f && f.length > 0 && f.show() //, "widget_section" != a.parents("[pn-type]").attr("pn-type") && c.find('li[pn-show="move_position"]').hide()
            //c.find('li[pn-show="hide-element-mobile"]').show(), "item_form" == d && c.find('li[pn-show="selectForm"]').show(), "slider" == d && (c.find('li[pn-show="prev-slider"]').show(), c.find('li[pn-show="next-slider"]').show());
        }
        if (b.offset().left + b.outerWidth() > $(".iframe-content").offset().left + $(".iframe-content").outerWidth()) {
            var g = b.offset().left + b.outerWidth() - $(".iframe-content").offset().left - $(".iframe-content").outerWidth();
            var lx = $('.aside-setting').is(":visible") == true ? 5 : 0; 
            c.css({
                right: (g + lx) + "px"
            })
        } else c.css({
            right: "-1px"
        });
        /*
        if (b.outerWidth() < 140) {
            var h = c.find("li"),
                i = 0;
            h && h.length > 0 && (h.each(function() {
                "none" != $(this).css("display") && (console.log($(this).outerWidth()), i += $(this).outerWidth() + 12)
            }), c.css({
                "min-width": i + "px"
            }))
        } else c.css({
            "min-width": ""
        })
        */

        /*set min-width for .edit-element*/
        var h = c.find("li"),
            i = 0;
        h && h.length > 0 && (h.each(function() {
            "none" != $(this).css("display") && (i += 1)
        }));
        if(i == 4){
            i = 0;
            h && h.length > 0 && (h.each(function() {
                "none" != $(this).css("display") && (i += $(this).outerWidth() + 12)
            }), c.css({
                "min-width": i + "px"
            }))
        }else{
            i = 0;
            h && h.length > 0 && (h.each(function() {
                "none" != $(this).css("display") && (i += $(this).outerWidth() + 4)
            }), c.css({
                "min-width": i + "px"
            }))

        }

    }
    };
IframeClick.prototype.getElementClickGroup = function (a) {
    if ($(a).parents('[pn-type="contact_form"]').length > 0 || void 0 != $(a).attr("pn-parent") && -1 != $(a).attr("pn-parent").indexOf("FORM")) {
        var b = $(a).parents('[pn-type="contact_form"]');
        1 != b.length || b.hasClass("selected") || selectedItem && 0 != selectedItem.length && 1 == selectedItem.parents('[pn-type="contact_form"]').length && selectedItem.parents('[pn-type="contact_form"]').attr("id") == b.attr("id") || (a = b.first())
    } else {
        var b = $(a).parents(".widget-element");
        if ($(a).hasClass("widget-group")) return a;
        b.length > 1 && "ITEM-CAROUSEL" == b.first().attr("pn-lang") && (b = b.first().parents('[pn-lang="CAROUSEL"]')), 1 != b.length || b.hasClass("selected") || selectedItem && 0 != selectedItem.length && 1 == selectedItem.parents(".widget-element").length && selectedItem.parents(".widget-element").attr("id") == b.attr("id") || (a = b.first()), b.length > 1 && !b.first().hasClass("selected") && (!selectedItem || 0 == selectedItem.length || selectedItem.parents(".widget-element").length <= 1 || selectedItem.parents(".widget-element").first().attr("id") != b.first().attr("id")) && (a = b.first())
    }
    return a
};