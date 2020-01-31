angular.module("punnelApp").controller("customTemplatePluginCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$window", function (a, b, c, d, e, f) {
    d.use(localStorage.getItem("lang")), a.$watch(function () {
        c.name = a.name
    }), c.name = a.name, c.changeName = function (b) {
        if (selectedItem && selectedItem.length > 0) {
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.name = $(b.target).text(), a.name = c.name, selectedItem.attr("pn-lang", c.name), apiElement[d].lang = c.name
        }
    }, c.focus = function (a) {
        $(a.target).focus();
        var b = new SelectRangeText;
        b.selectRange($(a.target)[0])
    }, c.closeSetting = function () {
        $('.settings[pn-setting="template-plugin"]').removeClass("active")
    }
}]);