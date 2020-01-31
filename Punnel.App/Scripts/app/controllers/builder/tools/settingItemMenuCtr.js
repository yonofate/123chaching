angular.module("punnelApp").controller("settingItemMenuCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", function (a, b, c, d, e, f) {
    var g = function (a) {
        $(".dialog_lp_error p").text(a), $(".dialog_lp_error").show(), f(function () {
            $(".dialog_lp_error").hide()
        }, 2e3)
    };
    if (c.deviceTb = deviceEdit, c.itemMenus = [], void 0 != selectedItem && selectedItem.length > 0 && "menu-header" == selectedItem.attr("pn-type")) {
        "desktop" != deviceEdit && "true" == selectedItem.attr("pn-navigation") ? c.nav = "true" : c.nav = "false";
        PN_PAGE.getIndexElement(selectedItem.attr("id"));
        c.itemMenus = [];
        var h = selectedItem.find(".widget-content:eq(0) .widget-element");
        void 0 != h && h.length > 0 && h.each(function () {
            var a = PN_PAGE.getIndexElement($(this).attr("id")),
                b = {};
            "none" == apiElement[a].media[deviceEdit].display ? (b.show = "none", b.hide = "block") : (b.show = "block", b.hide = "none");
            var d = {
                id: $(this).attr("id"),
                text: $(this).text(),
                media: {
                    show: b.show,
                    hide: b.hide
                }
            };
            c.itemMenus.push(d)
        })
    }
    c.addnew = "", c.item_name = "", c.item_src = {
        link: "",
        name: ""
    }, c.indexEdit = "", c.idItemSelect = "", c.setLinkWeb = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(c.idItemSelect),
                b = $(".custom_link .content_link_website .input_link_web").val();
            apiElement[a].action = b
        }
    }, c.setTargetLink = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(c.idItemSelect),
                d = $(a.target).attr("pn-target");
            apiElement[b].target = d
        }
    }, c.removeLink = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(c.idItemSelect);
            apiElement[a].action = ""
        }
    }, c.hideItemMenu = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            $(b.target).parent().find('i[pn-type="show"]').show(), $(b.target).hide();
            var c = PN_PAGE.getIndexElement(a);
            apiElement[c].media[deviceEdit].display = "none", PN_PAGE.getElement("#" + a).css({
                visibility: "hidden"
            })
        }
    }, c.showItemMenu = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            $(b.target).parent().find('i[pn-type="hide"]').show(), $(b.target).hide();
            var c = PN_PAGE.getIndexElement(a);
            apiElement[c].media[deviceEdit].display = "table", PN_PAGE.getElement("#" + a).show(), PN_PAGE.getElement("#" + a).css({
                visibility: "visible"
            })
        }
    }, c.searchActionMenu = function (a, b) {
        if (void 0 != b) {
            c.item_src.name = $(b.target).val();
            var d = c.item_src.name.replace("#", ""),
                e = c.item_src.name.charAt(0),
                f = $(".pn-search-action-menu");
            "#" == e && (c.getIdElementSearch(d), f.show())
        }
    }, c.getIdElementSearch = function (a) {
        var b = PN_PAGE.getElement(".widget-element"),
            d = $(".pn-search-action-menu ul"),
            e = "";
        b.each(function () {
            -1 != $(this).attr("pn-lang").search(a) && (e = e + '<li pn-search="' + $(this).attr("id") + '">' + $(this).attr("pn-lang") + "</li>")
        }), d.html(e);
        var f = d.find("li");
        f.unbind("click").click(function () {
            c.item_src.name = "#" + $(this).text(), c.item_src.link = "#" + $(this).attr("pn-search").toString(), c.itemMenus[c.indexEdit].link_page = c.item_src.link, c.itemMenus[c.indexEdit].id = c.item_src.name, $(".pn-search-action-menu").hide()
        }), d.unbind("mouseleave").mouseleave(function () {
            $(".pn-search-action-menu").hide()
        })
    }, c.deleteItemMenu = function (a) {
        if (void 0 != selectedItem && selectedItem.length > 0 && "menu-header" == selectedItem.attr("pn-type")) {
            var b = void 0;
            if (b = PN_PAGE.getElement("#" + a).parent().parent(), b.find(".widget-element").length > 2) {
                PN_PAGE.getElement("#" + a).remove();
                var d = new OptionWiget;
                d.sortWg(), d.resetWidgetItemChild(b), $("#resizable-element").css({
                    width: selectedItem.css("width"),
                    height: selectedItem.css("height")
                }), c.resetItemMenu()
            } else g("Menu có ít nhất hai thành phẩn trở lên!")
        }
    }, c.cancelItemMenuValue = function () {
        $(".ngdialog.item_menu_value").remove()
    }, c.changeNameMenu = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            var c = $(b.target).text(),
                d = PN_PAGE.getIndexElement(a);
            apiElement[d].text = c, PN_PAGE.getElement("#" + a + " .widget-content").eq(0).text(c)
        }
    }, c.forcusSpan = function (a, b) {
        $(b.target)[0].focus();
        var c = new SelectRangeText;
        c.selectAllText($(b.target)[0])
    }, c.addNewItem = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                b = apiElement[a].media[deviceEdit].color,
                d = new AddToFrame;
            d.addItemMenu(selectedItem), apiElement[apiElement.length - 1].media.desktop.color = b, apiElement[apiElement.length - 1].media.mobile.color = b, selectedItem.find("#" + apiElement[apiElement.length - 1].id + " .widget-content").eq(0).css({
                color: b
            });
            var e = new OptionWiget;
            e.resetWidgetItemChild(selectedItem);
            var f = {
                id: apiElement[apiElement.length - 1].id,
                text: apiElement[apiElement.length - 1].text,
                media: {
                    show: "block",
                    hide: "none"
                }
            };
            c.itemMenus.push(f), $("#resizable-element").css({
                width: selectedItem.css("width"),
                height: selectedItem.css("height")
            });
            var g = selectedItem.find("#" + apiElement[apiElement.length - 1].id);
            e.setValueNewItem(g)
        }
    }, c.showCutomLink = function (a) {
        c.idItemMenu = a, c.idItemSelect = a, c.close(), $(".settings").removeClass("active")
    }, c.close = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var a = new OptionWiget;
            a.addElementUndo("", selectedItem)
        }
        $(".settings").removeClass("active"), $('.settings[pn-setting="' + selectedItem.attr("pn-type") + '"]').addClass("active"), fadeOutAnimate($(".ngdialog.setting_item_menu"))
    }, c.resetItemMenu = function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && "menu-header" == selectedItem.attr("pn-type")) {
            "desktop" != deviceEdit && "true" == selectedItem.attr("pn-navigation") ? c.nav = "true" : c.nav = "false";
            PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.itemMenus = [];
            var a = selectedItem.find(".widget-content:eq(0) .widget-element");
            void 0 != a && a.length > 0 && a.each(function () {
                var a = PN_PAGE.getIndexElement($(this).attr("id")),
                    b = {};
                "none" == apiElement[a].media.desktop.display ? (b.show = "none", b.hide = "block") : (b.show = "block", b.hide = "none");
                var d = {
                    id: $(this).attr("id"),
                    text: $(this).text(),
                    media: {
                        show: b.show,
                        hide: b.hide
                    }
                };
                c.itemMenus.push(d)
            })
        }
    }, c.resetHtmlItemMenu = function () { }
}]);