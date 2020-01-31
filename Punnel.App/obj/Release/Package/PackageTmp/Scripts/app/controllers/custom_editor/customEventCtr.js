angular.module("punnelApp").controller("customEventCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.items = lp_colors_all, c.showbtTab = "true", d.use(localStorage.getItem("lang")), c.click = 0, c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id"), "desktop" == deviceEdit ? c.showbtTab = "true" : c.showbtTab = "false";
            var a = $('.settings[pn-setting="custom-event"] .event-tab .button[pn-active="list-hover"]');
            a.hide();
            for (var b = selectedItem.attr("pn-type"), d = 0; d < advanceHover.length; d++) advanceHover[d] == b && a.show();
            var e = selectedItem.attr("pn-lang");
            $('.settings[pn-setting="custom-event"] .header .text').text(e)
        } else (void 0 == selectedItem || "undefined" == selectedItem || selectedItem.length <= 0) && $('.settings[pn-setting="custom-event"] .advanced').hide()
    }), c.showContentEdit = function (a) {
        if (void 0 != selectedItem && selectedItem.length > 0)
            if (selectedItem.hasClass("widget-element")) {
                var b = new OptionWiget;
                b.showPropertiesElement("edit")
            } else $(".settings").removeClass("active"), $(".advanced").hide(), $('.advanced[pn-setting="custom-background"]').show(), $('.advanced[pn-setting="custom-background"] .pn-content-settings').show(), $('.advanced[pn-setting="custom-overlay"]').show(), $('.advanced[pn-setting="custom-overlay"] .pn-content-settings').show(), $(".toolbar").show(), $('.settings[pn-setting="custom-event"]').addClass("active"), $('.settings[pn-setting="custom-event"] .event-tab .button').removeClass("active"), $('.settings[pn-setting="custom-event"] .event-tab .button[pn-active="list"]').addClass("active"), $('.settings[pn-setting="custom-event"] .list-tab-event').hide(), $('.settings[pn-setting="custom-event"] .list-tab-event[pn-content="list"]').show()
    }, c.close = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var a = new OptionWiget;
            a.addElementUndo("", selectedItem)
        }
        savedSel = "", $('.settings[pn-setting="custom-event"]').removeClass("active")
    }
}]);