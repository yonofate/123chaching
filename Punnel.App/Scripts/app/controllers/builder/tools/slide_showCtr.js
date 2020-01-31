angular.module("punnelApp").controller("slide_showCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    a.$watch(function () {
        c.name = a.name
    }), c.name = a.name, c.itemSlide = [], c.changeName = function (b) {
        var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        c.name = $(b.target).text(), a.name = c.name, selectedItem.attr("pn-lang", c.name), apiElement[d].lang = c.name
    }, c.changeTypePlugin = function (a) {
        var b = selectedItem.attr("pn-style"),
            c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        void 0 != b ? (selectedItem.removeClass("" + b), selectedItem.addClass("" + a), selectedItem.attr("pn-style", a)) : (selectedItem.addClass("" + a), selectedItem.attr("pn-style", a)), apiElement[c].addClass = a
    }, c.focus = function (a) {
        $(a.target).focus();
        var b = new SelectRangeText;
        b.selectRange($(a.target)[0])
    }, c.closeSetting = function () {
        $('.settings[pn-setting="slide_show"]').removeClass("active")
    }, c.show_animate = function () {
        $(".settings").removeClass("active")
    }, c.show_custom = function (a) {
        var b = selectedItem.attr("pn-type");
        $('.settings[pn-setting="' + b + '"]').removeClass("active"), $('.settings[pn-setting="custom-event"]').addClass("active"), $(".advanced").hide();
        for (var c = 0; c < a.length; c++) $('.advanced[pn-setting="' + a[c] + '"]').show(), $('.advanced[pn-setting="' + a[c] + '"] .pn-content-settings').show()
    }
}]);