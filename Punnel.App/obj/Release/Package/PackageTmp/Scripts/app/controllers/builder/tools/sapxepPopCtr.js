angular.module("punnelApp").controller("sapxepPopCtr", ["$rootScope", "$scope", function (a, b) {
    b.idTMP = "", b.popselected = "", a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && b.idTMP != selectedItem.attr("id")) {
            var a = $('.widget-section[pn-popup="true"]');
            a && a.length > 0 && (arrIdPopup = [], a.each(function () {
                arrIdPopup.push($(this).attr("id"))
            })), b.idTMP = selectedItem.attr("id"), b.arrIdPop = arrIdPopup
        }
    }), b.showPopup = function (a) {
        if (a && a.length > 0) {
            b.popselected = a;
            var c = $("#" + a);
            if (c && c.length > 0 && "true" == c.attr("pn-popup")) {
                $("#punnel-editor .selected").removeClass("selected"), c.addClass("selected"), selectedItem = c;
                var d = new ShowBoxResize;
                d.showBoxSection(selectedItem)
            }
        }
    }, b.resetMobileSection = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a, b = new OptionWiget;
            if (a = selectedItem.hasClass("widget-section") ? selectedItem : b.getParentSection(selectedItem), a && a.length > 0) {
                var c, d = a.find(".widget-element");
                c = PN_PAGE.getIndexElement(a.attr("id")), apiElement[c].sortmobile = 0, apiElement[c].mobile = 0, d && d.length > 0 && d.each(function () {
                    c = PN_PAGE.getIndexElement($(this).attr("id")), apiElement[c].sortmobile = 0, apiElement[c].mobile = 0
                }), PN_PAGE.sortMobilePublish = 1;
                var e = new SortElementMobile;
                e.sortItem(), e.sortFormHightToLow("desktop"), $("#resizable-element").hide()
            }
            var f = new ResizeSection;
            f.setHeightSection(a)
        }
    }
}]);