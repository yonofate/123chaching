angular.module("punnelApp").controller("plgmenuCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    a.$watch(function () {
        c.name = a.name
    }), c.itemMenu = [], c.changeStypeMenu = function (a) {
        var b = c.itemMenu[a]["class"],
            d = selectedItem.attr("pn-style");
        void 0 != d ? (selectedItem.removeClass("" + d), selectedItem.addClass("" + b).attr("pn-style", b)) : selectedItem.addClass("" + b).attr("pn-style", b), selectedItem.find(".widget-content .ulMenuDeskTop li").eq(0).addClass("active")
    }, c.changeName = function (b) {
        var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        c.name = $(b.target).text(), a.name = c.name, selectedItem.attr("pn-lang", c.name), apiElement[d].lang = c.name
    }, c.focus = function (a) {
        $(a.target).focus();
        var b = new SelectRangeText;
        b.selectRange($(a.target)[0])
    }, c.showSettingItems = function () {
        $(".settings.active").removeClass("active")
    }, c.showCustomMenu = function () {
        $('.settings[pn-setting="menu-header"]').removeClass("active")
    }, c.show_custom = function (a) {
        var b = selectedItem.attr("pn-type");
        $('.settings[pn-setting="' + b + '"]').removeClass("active"), $('.settings[pn-setting="custom-event"]').addClass("active"), $(".advanced").hide();
        for (var c = 0; c < a.length; c++) $('.advanced[pn-setting="' + a[c] + '"]').show(), $('.advanced[pn-setting="' + a[c] + '"] .pn-content-settings').show()
    }, c.show_animate = function () {
        $(".settings").removeClass("active")
    }, c.closeSetting = function () {
        $('.settings[pn-setting="menu-header"]').removeClass("active")
    }
}]);