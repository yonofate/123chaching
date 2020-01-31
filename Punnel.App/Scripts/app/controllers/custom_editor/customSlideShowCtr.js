angular.module("punnelApp").controller("customSlideShowCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "slide_show" == selectedItem.attr("pn-type")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.colorNavigation = selectedItem.find(".widget-content").eq(0).attr("pn-style-navigation"), c.time_out = parseFloat(apiElement[a].time_out), c.auto_play = apiElement[a].auto_play, void 0 == c.colorNavigation && (c.colorNavigation = "", apiElement[a].colorNavigation = ""), (void 0 == c.time_out || "" == c.time_out) && (c.time_out = 5e3, apiElement[a].time_out = 5e3), (void 0 == c.auto_play || "" == c.auto_play) && (c.auto_play = 1, apiElement[a].auto_play = 1), c.images = apiElement[a].image, $('.item[pn-setting="custom-slide-show"] .open-close-properties').hasClass("ion-android-arrow-dropdown") ? ($('.advanced[pn-setting="custom-slide-show"] .pn-content-settings').show(), $('.item[pn-setting="custom-slide-show"] .open-close-properties').parent().parent().addClass("active")) : ($('.advanced[pn-setting="custom-slide-show"] .pn-content-settings').hide(), $('.item[pn-setting="custom-slide-show"] .open-close-properties').parent().parent().removeClass("active"))
        }
    }), c.changeColorNavigation = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.colorNavigation = a;
            var d = selectedItem.find(".widget-content").eq(0).attr("pn-style-navigation");
            selectedItem.find(".widget-content").eq(0).removeClass("" + d), selectedItem.find(".widget-content").eq(0).addClass("" + c.colorNavigation), selectedItem.find(".widget-content").eq(0).attr("pn-style-navigation", c.colorNavigation), apiElement[b].colorNavigation = a
        }
    }, c.setvalueTimeOut = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].time_out = c.time_out, selectedItem.attr("pn-timeout", c.time_out)
        }
    }, c.setAutoplay = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = $(a.target),
                d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            b.is(":checked") ? c.auto_play = 1 : c.auto_play = 0, apiElement[d].auto_play = c.auto_play, selectedItem.attr("pn-autoplay", c.auto_play)
        }
    }, c.showFileGalery = function () { }, c.close = function () {
        if (selectedItem && selectedItem.length > 0) {
            $('.advanced[pn-setting="custom-slide"]').removeClass("active").hide(), $('.settings[pn-setting="custom-event"]').removeClass("active");
            var a = selectedItem.attr("pn-type");
            $(".settings").removeClass("active"), $('.settings[pn-setting="' + a + '"]').addClass("active")
        }
    }, c.showContentSetting = function (a) {
        var b = $('.advanced[pn-setting="' + a + '"] .pn-content-settings');
        "none" == b.css("display") ? b.css({
            display: "block"
        }) : b.css({
            display: "none"
        })
    }
}]);