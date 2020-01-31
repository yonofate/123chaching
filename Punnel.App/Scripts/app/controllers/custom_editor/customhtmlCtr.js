
angular.module("punnelApp").controller("customhtmlCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && "GROUP_TMP" != selectedItem.attr("id")) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.name = a.name, c.htmlElement = apiElement[b].html
        }
    }), c.setValue = function (a) {
        var b = $(a.target).val(),
            d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        selectedItem.find(".widget-content").eq(0).html(""), selectedItem.find(".widget-content").eq(0).html(b), c.htmlElement = selectedItem.find(".widget-content").eq(0).html(), apiElement[d].html = selectedItem.find(".widget-content").eq(0).html();
        selectedItem.find(".widget-content").find("*")
    }, c.changeName = function (b) {
        var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        c.name = $(b.target).text(), a.name = c.name, selectedItem.attr("pn-lang", c.name), apiElement[d].lang = c.name
    }, c.focus = function (a) {
        $(a.target).focus();
        var b = new SelectRangeText;
        b.selectRange($(a.target)[0])
    }, c.closeSetting = function () {
        $('.settings[pn-setting="customhtml"]').removeClass("active")
    }, c.show_animate = function () {
        $(".settings").removeClass("active")
    }, c.show_custom = function (a) {
        var b = selectedItem.attr("pn-type");
        $('.settings[pn-setting="' + b + '"]').removeClass("active"), $('.settings[pn-setting="custom-event"]').addClass("active"), $(".advanced").hide();
        for (var c = 0; c < a.length; c++) $('.advanced[pn-setting="' + a[c] + '"]').show(), $('.advanced[pn-setting="' + a[c] + '"] .pn-content-settings').show()
    }
}]);