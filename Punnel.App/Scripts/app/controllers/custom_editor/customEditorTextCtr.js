angular.module("punnelApp").controller("customEditorTextCtr", ["$rootScope", "$scope", "$translate", function (a, b, c) {
    function d(element) {
        if (Boolean(element)) {
            var p_element = null;
            if ($(element).hasClass("pn-text-animated") == true) {
                return element;
            } else if ($(element).parents(".pn-text-animated").length > 0) {
                return $(element).parents(".pn-text-animated")
            }
        }
        return null;
    }

    function e(a, b) {
        if (a += "", b += "", b.length <= 0) return a.length + 1;
        var c = b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return (a.match(new RegExp(c, "gi")) || []).length
    }
    c.use(localStorage.getItem("lang")), b.idTMP = "", b.edTextLink = "", b.typeAnimatedHeadline = "", b.textAnimated = "", b.currentElementClick = null, b.listAnimated = [{
        name: "rotate-1",
        text: "rotate-1"
    }, {
        name: "rotate-2",
        text: "rotate-2"
    }, {
        name: "rotate-3",
        text: "rotate-3"
    }, {
        name: "type",
        text: "type"
    }, {
        name: "scale",
        text: "scale"
    }, {
        name: "loading-bar",
        text: "loading-bar"
    }, {
        name: "slide",
        text: "slide"
    }, {
        name: "clip",
        text: "clip"
    }, {
        name: "zoom",
        text: "zoom"
    }, {
        name: "push",
        text: "push"
    }], a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && b.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            b.idTMP = selectedItem.attr("id");
            selectedItem.attr("pn-type");
            b.color_font = "rgba(0,0,0,1)"
        }
        }), $(".colorpicker.dropdown-menu").blur(function () { }),
        window.documentClickCustomEditor = function (element) {
            var p_element = d(element);
            if (Boolean(p_element)) {
                var context = new saveAndRestoreRange;
                b.currentElementClick = p_element;
                b.typeAnimatedHeadline = $(p_element).attr("data-type");
                b.textAnimated = context.convertAnimatedToString($(p_element).find(".pn-text-word").attr("data-word"));
                if (void 0 != $(p_element).parents(".widget-content").attr("contenteditable")) {
                    $(p_element).parents(".widget-content").attr("contenteditable", false);
                }
                $(p_element).find(".pn-text-word").attr("contenteditable", true);
                $("#custom-text-editor-link").hide();
                $("#setting_animated_box").parents(".widget-item").show();
                $("#custom-text-full-editor").hide();
                context.selectAllElement($(p_element).find(".pn-text-word")[0]);
                context.saveRange();
            } else {
                if ($(element).hasClass("widget-content")) {
                    b.currentElementClick = null;
                    b.typeAnimatedHeadline = "";
                    b.textAnimated = "";
                    if (void 0 != $(element).attr("contenteditable")) {
                        $(element).attr("contenteditable", true);
                    }
                    $(element).find(".pn-text-animated .pn-text-word").attr("contenteditable", false);
                } else {
                    if ($(element).parents(".widget-content").length > 0) {
                        b.currentElementClick = null;
                        b.typeAnimatedHeadline = "";
                        b.textAnimated = "";
                        if (void 0 != $(element).parents(".widget-content").attr("contenteditable")) {
                            $(element).parents(".widget-content").attr("contenteditable", true);
                        }
                        $(element).parents(".widget-content").find(".pn-text-animated .pn-text-word").attr("contenteditable", false);
                    }
                }
                $("#custom-text-editor-link").show();
            }
            if (!b.$$phase) {
                b.$digest();
            }
        },
        b.removeTypeAnimated = function () {
        var a = d(b.currentElementClick);
        if (a) {
            $(a).removeClass("pn-text-animated").removeClass($(a).attr("data-type")).removeAttr("data-type"), $(a).find(".pn-text-word").removeClass("pn-text-word").removeAttr("data-word").removeAttr("contenteditable"), e($(a).html(), "style=") == e($(a).html(), 'style=""') && $(a).text($(a).text()), e($(a).parents(".widget-content").html(), "style=") == e($(a).parents(".widget-content").html(), 'style=""') && 0 == $(a).parents(".widget-content").find(".pn-text-animated").length && $(a).parents(".widget-content").text($(a).parents(".widget-content").text());
            var c = $(".editor-text").find(".widget-content").eq(0),
                f = $("#" + $(".editor-text").attr("pn-id")),
                g = c.html(),
                h = PN_PAGE.getIndexElement(f.attr("id"));
            apiElement[h].text = g, f.find(".widget-content").eq(0).attr("contenteditable", "true").html(g), b.typeAnimatedHeadline = "", b.textAnimated = "";
            var i = new saveAndRestoreRange;
            i.restorRange(), $("#setting_animated_box").parents(".widget-item").hide()
        }
        },
        b.setTextAnimated = function () {
        var a = d(b.currentElementClick),
            c = new saveAndRestoreRange;
        if (a) {
            $(a).find(".pn-text-word").attr("data-word", c.convertStringToAnimated(b.textAnimated));
            var e = $(".editor-text").find(".widget-content").eq(0),
                f = $("#" + $(".editor-text").attr("pn-id")),
                g = e.html(),
                h = PN_PAGE.getIndexElement(f.attr("id"));
            apiElement[h].text = g, f.find(".widget-content").eq(0).attr("contenteditable", "true").html(g)
        } else {
            var i = b.setTypeAnimated("");
            window.documentClickCustomEditor(i)
        }
        $("#textAnimated").focus()
        },
        b.selectAllTextAnimated = function () {
        var a = d(b.currentElementClick);
        if (a) {
            var c = new saveAndRestoreRange;
            c.selectAllElement($(a).find(".pn-text-word")[0]), c.saveRange()
        }
    }, b.setTypeAnimated = function (a) {
        b.typeAnimatedHeadline = a;
        var c = d(b.currentElementClick),
            e = new saveAndRestoreRange;
        e.restorRange();
        var f = e.setAnimatedHeadline(c, b.typeAnimatedHeadline, e.convertStringToAnimated(b.textAnimated), b.listAnimated);
        return e.selectAllElement($(f).find(".pn-text-word")[0]), e.saveRange(), Boolean(a) ? (b.setText(), e.saveRange(),
            window.documentClickCustomEditor(f), void 0) : f
    }, b.saveRangeElement = function (a) {
        a.stopPropagation()
    }, b.setBold = function (a) {
        a.preventDefault(), a.stopPropagation();
        var c = new saveAndRestoreRange;
        c.restorRange(), document.execCommand("bold", !1, null), b.setText(), c.saveRange()
    }, b.setItalic = function (a) {
        a.preventDefault(), a.stopPropagation();
        var c = new saveAndRestoreRange;
        c.restorRange(), document.execCommand("italic", !1, null), b.setText(), c.saveRange()
    }, b.setUnderline = function (a) {
        a.preventDefault(), a.stopPropagation();
        var c = new saveAndRestoreRange;
        c.restorRange(), document.execCommand("underline", !1, null);
        var d = window.getSelection().focusNode.parentNode;
        $(d).addClass("pn-underline"), b.setText(), c.saveRange()
    }, b.seStrike = function (a) {
        a.preventDefault(), a.stopPropagation();
        var c = new saveAndRestoreRange;
        c.restorRange(), document.execCommand("strikeThrough", !1, null);
        var d = window.getSelection().focusNode.parentNode;
        $(d).addClass("pn-strikeThrough"), b.setText(), c.saveRange()
    }, b.setText = function () {
        var a = $(".editor-text").find(".widget-content").eq(0),
            b = $("#" + $(".editor-text").attr("pn-id")),
            c = a.html(),
            d = PN_PAGE.getIndexElement(b.attr("id"));
        a.css({
            height: ""
        }), apiElement[d].text = c, b.find(".widget-content").eq(0).attr("contenteditable", "true").html(c);
        var e = b.find(".widget-content").eq(0).outerWidth() + "px";
        apiElement[d].media[deviceEdit].width = e, $(".editor-text").css({
            width: e
        });
        var f = a.outerHeight() + "px";
        parseFloat(a.outerHeight()) > 10 && (a.css({
            width: e,
            height: f
        }), apiElement[d].media[deviceEdit].height = f, b.css({
            width: e,
            height: f
        }), b.find(".widget-content").eq(0).css({
            width: e,
            height: f
        }), $("#resizable-element").css({
            height: f
        }).hide())
    }, b.setChangeColorInput = function (a, c) {
        var d = new saveAndRestoreRange;
        d.restorRange();
        var e = c;
        void 0 != c && "" != c ? $("input.minicolor").colorpicker("setValue", e) : e = void 0 == a ? $("input.minicolor").val() : $(a.target).val(), b.eidtor_text_color = e, d.saveRange()
    }, b.setColor = function (a) {
        var c = new saveAndRestoreRange;
        c.restorRange();
        var a = PN_PAGE.checkColor(a);
        a && (document.execCommand("foreColor", !1, b.eidtor_text_color), b.setText(), c.saveRange())
    }, b.showColorSetting = function (b) {
        var c = new saveAndRestoreRange;
        c.restorRange(), a.typeColorPicker = b, a.colorPickerUsing = document.queryCommandValue("ForeColor"), $("#lpColorPickerCtrl").colorpicker("setValue", a.colorPickerUsing), $(".widget-item.custom-color-picker").show()
    }, b.setLinkEd = function () {
        var a = new saveAndRestoreRange;
        a.restorRange();
        var c = document.getSelection();
        if (b.edTextLink && b.edTextLink.length > 0) {
            document.execCommand("createlink", !1, b.edTextLink);
            c.anchorNode.parentElement.target = "_blank"
        } else document.execCommand("unlink", !1, !1);
        a.saveRange(), a.restorRange(), b.setText()
    }, b.changeValueEdText = function () {
        var a = new saveAndRestoreRange;
        a.restorRange(), a.saveRange(), a.restorRange(), $(".edit-text-link").focus()
    }
}]);