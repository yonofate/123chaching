angular.module("punnelApp").controller("customLinkCtr", ["$rootScope", "$state", "$scope", "popupService", function (a, b, c, popupService) {
    c.idTMP = "", c.itemWgPopup = [], c.itemImage = [], c.itemSec = [], c.link_page = "", a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id"), c.itemWg = wgSectionItem, c.itemWgPopup = [], c.itemImage = [], c.itemSec = [];
            for (var a = PN_PAGE.getIndexElement(selectedItem.attr("id")), b = 0; b < wgSectionItem.length; b++) "true" == PN_PAGE.getElement("#" + wgSectionItem[b].id).attr("pn-popup") && c.itemWgPopup.push(wgSectionItem[b]), "true" != PN_PAGE.getElement("#" + wgSectionItem[b].id).attr("pn-popup") && PN_PAGE.getElement("#" + wgSectionItem[b].id).hasClass("widget-section") && c.itemSec.push(wgSectionItem[b]), "image" == PN_PAGE.getElement("#" + wgSectionItem[b].id).attr("pn-type") && c.itemImage.push(wgSectionItem[b]);
            c.link_page = apiElement[a].link_page, c.link_page || (c.link_page = ""), c.link_url = apiElement[a].link_url, c.link_phone = apiElement[a].link_phone, c.link_popup = apiElement[a].link_popup, c.link_popup || (c.link_popup = ""), c.link_email = apiElement[a].link_email, c.type_link = apiElement[a].type_link, c.target = apiElement[a].target, c.link_popup || (c.link_popup = "", apiElement[a].link_popup = ""), c.changeTypeLink(c.type_link)
        }
    }), c.hidecontent = function (a) {
        $(a.target).parent().find(".item-popup").hide()
    }, c.setLinkEmail = function () {
        if (c.link_email = $.trim(c.link_email), selectedItem && selectedItem.length > 0) {
            c.type_link = "email";
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].action = c.link_email, apiElement[a].link_email = c.link_email, apiElement[a].type_link = c.type_link
        }
    }, c.setLinkPhone = function () {
        if (c.link_phone = $.trim(c.link_phone), selectedItem && selectedItem.length > 0) {
            c.type_link = "phone";
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].action = c.link_phone, apiElement[a].link_phone = c.link_phone, apiElement[a].type_link = c.type_link
        }
    }, c.setLinkPage = function (a) {
        if (c.link_page = $.trim(a), selectedItem && selectedItem.length > 0) {
            c.type_link = "page";
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (c.link_page && c.link_page.length > 0) {
                apiElement[b].action = c.link_page, apiElement[b].link_page = c.link_page, apiElement[b].type_link = c.type_link;
                var d = "#" + c.link_page,
                    e = $(d).offset().top + $(".iframe-content").scrollTop();
                $(".iframe-content").animate({
                    scrollTop: e
                }, 1e3)
            } else apiElement[b].action = c.link_page, apiElement[b].link_page = c.link_page, apiElement[b].type_link = c.type_link
        }
    }, c.setLinkPagePopup = function (a) {
        if (c.link_popup = $.trim(a), selectedItem && selectedItem.length > 0) {
            c.type_link = "popup";
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[b].type_link = c.type_link, c.link_popup && c.link_popup.length > 0) {
                $('.widget-section[pn-popup="true"]').hide(), selectedItem.attr("pn-action-link", c.link_popup), apiElement[b].element_popup = c.link_popup, apiElement[b].link_popup = c.link_popup, apiElement[b].action = c.link_popup;
                var d = "#" + c.link_popup;
                selectedItem = $("#punnel-editor " + d), selectedItem.show();
                var e = new IframeClick;
                e.addClassSelected(selectedItem);
                var f = new ShowBoxResize;
                f.showBoxSection(selectedItem)
            } else apiElement[b].element_popup = "", apiElement[b].link_popup = "", apiElement[b].action = ""
        }
    }, c.setLinkElementOther = function () {
        if (c.link_url = $.trim(c.link_url), selectedItem && selectedItem.length > 0) {
            c.type_link = "url";
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].action = c.link_url, apiElement[a].link_url = c.link_url, apiElement[a].target = c.target, apiElement[a].type_link = c.type_link
        }
    }, c.setTargetElement = function (a) {
        if (c.target = a, selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].target = a, selectedItem.find(" > a").attr("target", a), c.type_link = "url", apiElement[b].type_link = c.type_link
        }
        }, c.createPopup = function () {
        selectedItem.attr("id");
        if (selectedItem && selectedItem.length > 0) {
            PN_PAGE.idShowPopup = selectedItem.attr("id"),
                popupService.popupManagerShow(),
                c.type_link = "popup";
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].type_link = c.type_link
        }
    }, c.previewPopup = function () {
        if (selectedItem && selectedItem.length > 0) {
            c.type_link = "popup";
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].type_link = "popup"
        }
        var b = new IframeClick,
            d = $("#" + c.link_popup),
            e = new ShowBoxResize;
        d.show(), e.showBoxSection(d), setTimeout(function () {
            e.showBoxSection(d)
        }, 200), $("#resizable-element").hide(), selectedItem = d, b.showOptionProperties(selectedItem)
    }, c.deletePopup = function () {
        if (selectedItem && selectedItem.length > 0) {
            c.link_popup = "";
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].type_link = c.type_link, apiElement[a].element_popup = "", apiElement[a].link_popup = "", $("#resizable-element").hide()
        }
    }, c.setLinkPopup = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            c.changeTypeLink("popup");
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (c.link_popup = $.trim(a), c.link_popup && c.link_popup.length > 0) {
                var d = $("#punnel-editor #" + c.link_popup);
                d && d.length > 0 ? (c.type_link = "popup", apiElement[b].type_link = c.type_link, apiElement[b].element_popup = c.link_popup, apiElement[b].link_popup = c.link_popup, apiElement[b].action = c.link_popup, c.previewPopup()) : (apiElement[b].type_link = c.type_link, apiElement[b].element_popup = "", apiElement[b].link_popup = "", apiElement[b].action = "")
            }
        }
    }, c.hideList = function (a) {
        switch (a) {
            case "sec":
                $(".custom-links .item-section").hide();
                break;
            case "pop":
                $(".custom-links .item-popup").hide()
        }
    }, c.showLayer = function (a) {
        var b = new TreeWidget;
        switch (a) {
            case "section":
                b.layerSection(), $(".custom-links .item-section").show();
                break;
            case "popup":
                $('.widget-section[pn-popup="true"]') && $('.widget-section[pn-popup="true"]').length > 0 && (b.layerPopup(), $(".custom-links .item-popup").show())
        }
        $(".layers-element").show()
    }, c.changeTypeLink = function (a) {
        if (c.type_link = a, "page" == a || "popup" == a) {
            var b = $(".widget-section");
            wgSectionItem = [], c.itemWgPopup = [], c.itemImage = [], c.itemSec = [], b && b.length > 0 && b.each(function () {
                var a = {
                    id: $(this).attr("id"),
                    name: $(this).attr("pn-lang")
                };
                wgSectionItem.push(a)
            });
            for (var d = 0; d < wgSectionItem.length; d++) "true" == PN_PAGE.getElement("#" + wgSectionItem[d].id).attr("pn-popup") && c.itemWgPopup.push(wgSectionItem[d]), "image" == PN_PAGE.getElement("#" + wgSectionItem[d].id).attr("pn-type") && c.itemImage.push(wgSectionItem[d]), "true" != PN_PAGE.getElement("#" + wgSectionItem[d].id).attr("pn-popup") && PN_PAGE.getElement("#" + wgSectionItem[d].id).hasClass("widget-section") && c.itemSec.push(wgSectionItem[d])
        }
        if ("url" == a && !c.target) {
            var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[e].target = "_top", c.target = "_top"
        }
    }
}]);