angular.module("punnelApp").controller("boxCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    a.$watch(function () {
        c.name = a.name
    }), c.name = a.name, c.itemsbox = lp_itemsBox, c.changeName = function (b) {
        var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        c.name = $(b.target).text(), a.name = c.name, selectedItem.attr("pn-lang", c.name), apiElement[d].lang = c.name
    }, c.selectType = function (b, d) {
        var e = (selectedItem.attr("pn-style"), selectedItem.find(".widget-content").eq(0)),
            f = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        $.extend(apiElement[f].media.desktop, apiElement[f].media.desktop, c.itemsbox[d].media.desktop), $.extend(apiElement[f].media.mobile, apiElement[f].media.mobile, c.itemsbox[d].media.mobile);
        var g = new CheckApiElement;
        g.setValueInJson(e, c.itemsbox[d].media.desktop), a.id = "reset", a.id = selectedItem.attr("id")
    }, c.focus = function (a) {
        $(a.target).focus();
        var b = new SelectRangeText;
        b.selectRange($(a.target)[0])
    }, c.closeSetting = function () {
        $('.settings[pn-setting="box"]').removeClass("active")
    }, c.show_animate = function () {
        $(".settings").removeClass("active")
    }, c.show_custom = function (a) {
        var b = selectedItem.attr("pn-type");
        $('.settings[pn-setting="' + b + '"]').removeClass("active"), $('.settings[pn-setting="custom-event"]').addClass("active"), $(".advanced").hide();
        for (var c = 0; c < a.length; c++) $('.advanced[pn-setting="' + a[c] + '"]').show(), $('.advanced[pn-setting="' + a[c] + '"] .pn-content-settings').show()
    }
}]);