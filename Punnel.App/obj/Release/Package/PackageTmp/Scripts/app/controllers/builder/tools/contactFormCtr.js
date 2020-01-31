angular.module("punnelApp").controller("contactFormCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    a.$watch(function () {
        c.name = a.name
    }), c.itemForm = item_tpl_form, c.changeTypeForm = function (a) {
        for (var b = PN_PAGE.getIndexElement(selectedItem.attr("id")), c = [], d = {}, e = 0; e < c.length; e++)
            if (c[e]["class"] === a) {
                d = c[e];
                break
            }
        apiElement.mobile = 0, apiElement[b].media.desktop.width = d.media.desktop.width, apiElement[b].media.mobile.width = d.media.mobile.width;
        var f = selectedItem.attr("pn-type-form");
        void 0 == f || "" == f || null == f || selectedItem.removeClass(f), selectedItem.attr("pn-type-form", d["class"]), selectedItem.addClass(d["class"]), selectedItem.css({
            width: apiElement[b].media.desktop.width
        }), selectedItem.find(".widget-content").eq(0).css({
            width: apiElement[b].media.desktop.width
        }), "left-label" == a ? apiElement[b].media.desktop.height = 2 * parseFloat(selectedItem.find(".widget-content").eq(0).css("padding")) + selectedItem.find(".widget-content form").eq(0).outerHeight() + "px" : apiElement[b].media.desktop.height = 2 * parseFloat(selectedItem.find(".widget-content").eq(0).css("padding")) + selectedItem.find(".widget-content form").eq(0).outerHeight() + "px", apiElement[b].media.mobile.height = apiElement[b].media.desktop.height, selectedItem.css({
            height: apiElement[b].media.desktop.height
        }), selectedItem.find(".widget-content").eq(0).css({
            height: apiElement[b].media.desktop.height
        }), $("#resizable-element").css({
            width: apiElement[b].media.desktop.width,
            height: apiElement[b].media.desktop.height
        })
    }, c.changeName = function (b) {
        var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        c.name = $(b.target).text(), a.name = c.name, selectedItem.attr("pn-lang", c.name), apiElement[d].lang = c.name
    }, c.focus = function (a) {
        $(a.target).focus();
        var b = new SelectRangeText;
        b.selectRange($(a.target)[0])
    }, c.showMangeItem = function () {
        $(".settings.active").removeClass("active")
    }, c.showFormRedirect = function () {
        $(".settings.active").removeClass("active")
    }, c.closeSetting = function () {
        $('.settings[pn-setting="contact_form"]').removeClass("active")
    }, c.show_animate = function () {
        $(".settings").removeClass("active")
    }, c.show_custom = function (a) {
        var b = selectedItem.attr("pn-type");
        $('.settings[pn-setting="' + b + '"]').removeClass("active"), $('.settings[pn-setting="custom-event"]').addClass("active"), $(".advanced").hide();
        for (var c = 0; c < a.length; c++) $('.advanced[pn-setting="' + a[c] + '"]').show(), $('.advanced[pn-setting="' + a[c] + '"] .pn-content-settings').show()
    }
}]);