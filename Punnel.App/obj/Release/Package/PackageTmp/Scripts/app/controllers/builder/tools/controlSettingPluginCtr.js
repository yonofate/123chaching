angular.module("punnelApp").controller("controlSettingPluginCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$window", function (a, b, c, d, e, f) {
    d.use(localStorage.getItem("lang")), c.deleteElement = function () {
        if (selectedItem) {
            var a = new BoxRightClick;
            a.boxRightDelete()
        }
    }, c.showEditGroup = function () {
        c.removeNgdialog(), $(".settings.active").removeClass("active")
    };
    var g = this;
    g.showEditGroupWindown = function () {
        void 0 != selectedItem && selectedItem.hasClass("widget-group") && "GROUP_TMP" != selectedItem.attr("id") && c.showEditGroup()
    }, c.cloneGroup = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = new BoxRightClick;
            a.boxRightClone()
        }
    }, f.angularControllerEditGroup = g.showEditGroupWindown, c.showComment = function () {
        c.removeNgdialog(), $(".settings.active").removeClass("active")
    }, c.showNewComment = function () { }, c.exitSelectBackground = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            selectedItem = selectedItem.parent();
            var a = new ShowBoxResize;
            a.showBoxSection(selectedItem), PN_PAGE.getElement(".selected").removeClass("selected"), selectedItem.addClass("selected"), dbClickBox = !1, elementFullScreen = selectedItem.attr("id"), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide()
        }
    }, c.prevItemSlide = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var a = selectedItem.find(".widget-content:eq(0) .item_slide li:visible"),
                b = selectedItem.find(".widget-content:eq(0) .item_slide li").index(a);
            0 == b ? b = selectedItem.find(".widget-content:eq(0) .item_slide li").length - 1 : b -= 1, selectedItem.find(".widget-content:eq(0) .item_slide li").hide(), selectedItem.find(".widget-content:eq(0) .item_slide li").eq(b).show(), arrIdOnScreen = [];
            var c = new OptionWiget;
            arrIdOnScreen = c.getIdElementOnScreen()
        }
    }, c.nextItemSlide = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var a = selectedItem.find(".widget-content:eq(0) .item_slide li:visible"),
                b = selectedItem.find(".widget-content:eq(0) .item_slide li").index(a);
            b == selectedItem.find(".widget-content:eq(0) .item_slide li").length - 1 ? b = 0 : b += 1, selectedItem.find(".widget-content:eq(0) .item_slide li").hide(), selectedItem.find(".widget-content:eq(0) .item_slide li").eq(b).show(), arrIdOnScreen = [];
            var c = new OptionWiget;
            arrIdOnScreen = c.getIdElementOnScreen()
        }
    }, c.showEditAdvance = function (a) {
        f.angularControllerDbClickElement(a)
    }, c.showEditSymbolAdvance = function (a) {
        if (c.removeNgdialog(), $(".settings.active").removeClass("active"), void 0 != selectedItem && selectedItem.length > 0)
            if ("shape" == selectedItem.attr("pn-type")) f.angularControllerDbClickShape();
            else {
                var b = $("#ID_BOX_EDITOR");
                if ("none" != b.css("display")) {
                    var d = (b.find(".contentEditor").contents().find(".widget-content").eq(0).text(), new SelectRangeText);
                    postionSelectionText = d.getPositionSelection(b.find(".contentEditor").eq(0)[0].contentWindow)
                } else postionSelectionText = 0;
                f.angularControllerDbclickTextSymbol()
            }
    }, c.showCustomFontSizeMobile = function () {
        c.removeNgdialog(), $(".settings.active").removeClass("active")
    }, c.showCustomclick = function () {
        c.removeNgdialog(), $(".settings.active").removeClass("active")
    }, c.showCustomhtml = function () {
        c.removeNgdialog(), $(".settings.active").removeClass("active")
    }, c.showCustomLink = function () {
        c.removeNgdialog(), $(".settings.active").removeClass("active")
    }, c.convertElementToBackground = function () {
        var a = new OptionWiget;
        a.addElementUndo("", selectedItem), c.removeNgdialog(), $(".settings.active").removeClass("active");
        var b = PN_PAGE.getIndexElement(selectedItem.attr("id")),
            d = selectedItem.parent().parent();
        apiElement[b].parent = "#" + d.attr("id"), selectedItem.prependTo(d), selectedItem.addClass("important"), apiElement[b].addClassBackground = "important", selectedItem.attr("pn-type-background", "important");
        var e = new OptionWiget;
        if (e.sortWg(), "googlemap" == selectedItem.attr("pn-type")) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                f = apiElement[b].value_google_map.zoom,
                g = apiElement[b].value_google_map.address;
            if (void 0 != apiElement[b].value_google_map.icon && "" != apiElement[b].value_google_map.icon) var h = '<div class="pn-maptitle"><p><img src="' + apiElement[b].value_google_map.icon + '"></p><p>' + apiElement[b].value_google_map.title + "</p></div>";
            else var h = apiElement[b].value_google_map.title;
            var i = selectedItem.find(".widget-content").eq(0)[0],
                j = new OptionWiget;
            j.createMapsgoogle(i, f, g, h)
        }
        a = new OptionWiget, a.addElementUndo("", selectedItem), $("#resizable-element").hide()
    }, c.convertBackgroundToElement = function () {
        var a = new OptionWiget;
        a.addElementUndo("", selectedItem), c.removeNgdialog(), $(".settings.active").removeClass("active");
        var b = PN_PAGE.getIndexElement(selectedItem.attr("id")),
            d = selectedItem.parent();
        apiElement[b].parent = "#" + d.attr("id") + " .container", selectedItem.appendTo(d.find(".container")), selectedItem.removeClass("important"), apiElement[b].addClassBackground = "", selectedItem.attr("pn-type-background", "");
        var e = new OptionWiget;
        if (e.sortWg(), "googlemap" == selectedItem.attr("pn-type")) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                f = apiElement[b].value_google_map.zoom,
                g = apiElement[b].value_google_map.address;
            if (void 0 != apiElement[b].value_google_map.icon && "" != apiElement[b].value_google_map.icon) var h = '<div class="pn-maptitle"><p><img src="' + apiElement[b].value_google_map.icon + '"></p><p>' + apiElement[b].value_google_map.title + "</p></div>";
            else var h = apiElement[b].value_google_map.title;
            var i = selectedItem.find(".widget-content").eq(0)[0],
                j = new OptionWiget;
            j.createMapsgoogle(i, f, g, h)
        }
        a = new OptionWiget, a.addElementUndo("", selectedItem), $("#ID_BOX_RESIZE").hide(), $("#resizable-element .control-edit").hide()
    }, c.showEditItemForm = function () {
        c.removeNgdialog(), $(".settings.active").removeClass("active")
    }, c.showItemForm = function () {
        c.removeNgdialog(), $(".settings.active").removeClass("active")
    }, c.showRedirectForm = function () {
        c.removeNgdialog(), $(".settings.active").removeClass("active")
    }, c.showItemMenu = function () {
        c.removeNgdialog(), $(".settings.active").removeClass("active")
    }, c.showEdit = function (a) {
        c.removeNgdialog();
        var b = new OptionWiget;
        b.showPropertiesElement(a)
    }, c.showTemplate = function () {
        c.removeNgdialog(), $(".settings").removeClass("active");
        var a = selectedItem.attr("pn-type");
        ("textinline" == a || "textparagraph" == a || "textsymbol" == a) && (a = "textinline"), $('.settings[pn-setting="template-plugin"]').addClass("active"), $(".settings .list-template-plugin").hide(), $('.settings .list-template-plugin[pn-template="' + a + '"]').show()
    }, c.showAnimate = function () {
        c.removeNgdialog(), $(".settings").removeClass("active")
    }, c.removeNgdialog = function () {
        $(".ngdialog.dialog.settings").remove();
        var a = new OptionWiget;
        a.setPositionSetting()
    }, c.cancelgroupElement = function () {
        if (void 0 != selectedItem && "undefined" != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-group")) {
            var a = new EventKey;
            a.eventUngroup(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide()
        }
    }, c.creategroupElement = function () {
        if (void 0 != selectedItem && "undefined" != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-group")) {
            var a = new EventKey;
            a.createGroup(selectedItem), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide()
        }
    }, c.showItemSlideShow = function () {
        c.removeNgdialog(), $(".settings.active").removeClass("active")
    };
    var h = this;
    h.dbClickSlideShow = function () {
        c.showItemSlideShow()
    }, f.angularControllerDbclickSlideShow = h.dbClickSlideShow
}]);