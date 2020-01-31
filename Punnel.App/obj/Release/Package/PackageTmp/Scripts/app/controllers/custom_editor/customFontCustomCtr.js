angular.module("punnelApp").controller("customFontCustomCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.itemsFont = pn_fonts, d.use(localStorage.getItem("lang")), c.setValueFont = function (a, b, c, d) {
        if (selectedItem && selectedItem.length > 0) {
            var e = selectedItem.attr("pn-type-font"),
                f = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            void 0 == e || "" == e || null == e ? (selectedItem.find(".widget-content").eq(0).css({
                "font-family": b,
                "font-weight": c
            }), selectedItem.attr("pn-type-font", a)) : (selectedItem.find(".widget-content").eq(0).removeClass(e), selectedItem.find(".widget-content").eq(0).css({
                "font-family": b,
                "font-weight": c
            }), selectedItem.attr("pn-type-font", a)), apiElement[f].media.font_family = b, apiElement[f].media.classFont = a, apiElement[f].media.font_weight = c
        }
    }, c.addClassActive = function (a) {
        $(".dialog.settings.font-family.active .list ul li.active").removeClass("active"), $('.dialog.settings.font-family.active .list ul li[pn-add-active="' + a + '"]').addClass("active")
    }, c.close = function () {
        savedSel = "", fadeOutAnimate($(".ngdialog.custom_font"))
    }
}]);