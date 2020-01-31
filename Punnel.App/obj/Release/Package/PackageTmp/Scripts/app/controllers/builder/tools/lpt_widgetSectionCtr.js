angular.module("punnelApp").controller("lpt_widgetSectionCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    d.use(localStorage.getItem("lang")), a.$watch(function () {
        c.name = a.name
    }), c.name = a.name, c.changeName = function (b) {
        if (selectedItem && selectedItem.length > 0) {
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.name = $(b.target).text(), a.name = c.name, selectedItem.attr("pn-lang", c.name), apiElement[d].lang = c.name
        }
    }, c.closeSetting = function () {
        $('.settings[pn-setting="widget-section"]').removeClass("active")
    }, c.show_animate = function () { }, c.show_custom = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = selectedItem.attr("pn-type");
            $('.settings[pn-setting="' + b + '"]').removeClass("active"), $('.settings[pn-setting="custom-event"]').addClass("active"), $(".advanced").hide();
            for (var c = 0; c < a.length; c++) $('.advanced[pn-setting="' + a[c] + '"]').show(), $('.advanced[pn-setting="' + a[c] + '"] .pn-content-settings').show()
        }
    }
}]);