angular.module("punnelApp").controller("vimeoCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.urlVideo = "", c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "videovimeo" == selectedItem.attr("pn-type")) {
            c.idTMP = selectedItem.attr("id");
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.name = a.name, c.urlVideo = apiElement[b].link, $('.item[pn-setting="custom-vimeo"] .open-close-properties').hasClass("ion-android-arrow-dropdown") ? ($('.advanced[pn-setting="custom-vimeo"] .pn-content-settings').show(), $('.item[pn-setting="custom-vimeo"] .open-close-properties').parent().parent().addClass("active")) : ($('.advanced[pn-setting="custom-vimeo"] .pn-content-settings').hide(), $('.item[pn-setting="custom-vimeo"] .open-close-properties').parent().parent().removeClass("active"))
        } else $('.item[pn-setting="custom-vimeo"]').hide()
    }), c.name = a.name, c.changeName = function (b) {
        var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        c.name = $(b.target).text(), a.name = c.name, selectedItem.attr("pn-lang", c.name), apiElement[d].lang = c.name
    }, c.setValueUrl = function () {
        c.urlVideo.trim();
        for (var a = "", b = c.urlVideo.length; b >= 0; b--)
            if ("/" === c.urlVideo[b]) {
                a = c.urlVideo.substr(b + 1, c.urlVideo.length);
                break
            }
        var d = "https://player.vimeo.com/video/" + a + "?badge=0";
        selectedItem.find(".widget-content").attr("src", d);
        var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[e].link = d, c.urlVideo = d
    }, c.showContentSetting = function (a) {
        var b = $('.advanced[pn-setting="' + a + '"] .pn-content-settings');
        "none" == b.css("display") ? b.css({
            display: "block"
        }) : b.css({
            display: "none"
        })
    }, c.focus = function (a) {
        $(a.target).focus();
        var b = new SelectRangeText;
        b.selectRange($(a.target)[0])
    }, c.closeSetting = function () {
        $('.settings[pn-setting="videovimeo"]').removeClass("active")
    }, c.show_animate = function () {
        $(".settings").removeClass("active")
    }, c.show_custom = function (a) {
        var b = selectedItem.attr("pn-type");
        $('.settings[pn-setting="' + b + '"]').removeClass("active"), $('.settings[pn-setting="custom-event"]').addClass("active"), $(".advanced").hide();
        for (var c = 0; c < a.length; c++) $('.advanced[pn-setting="' + a[c] + '"]').show(), $('.advanced[pn-setting="' + a[c] + '"] .pn-content-settings').show()
    }
}]);