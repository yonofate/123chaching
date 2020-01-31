angular.module("punnelApp").controller("textparagraphyCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    a.$watch(function () {
        c.name = a.name
    }), c.items = lp_colors_all, c.name = a.name, c.changeName = function (b) {
        var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        c.name = $(b.target).text(), a.name = c.name, selectedItem.attr("pn-lang", c.name), apiElement[d].lang = c.name
    }, c.setValueFont = function (a) {
        var b = selectedItem.attr("pn-font-family");
        selectedItem.removeClass("" + b), selectedItem.addClass("" + a).attr("pn-font-family", a)
    }, c.setTextAlign = function (a) {
        var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[b].media.desktop["text-align"] = a, apiElement[b].media.mobile["text-align"] = a, selectedItem.css({
            "text-align": a
        })
    }, c.setColor = function (a) {
        var a = PN_PAGE.checkColor(a);
        if (a) {
            restoreSelection(savedSel);
            var b = window.getSelection().toString(),
                c = selectedItem.find(".widget-content").eq(0);
            "" != b ? document.execCommand("foreColor", !1, a) : (c.css({
                color: a
            }), "block" == $("#ID_BOX_EDITOR").css("display") && $("#ID_BOX_EDITOR").find(".contentEditor").html(c.parent().html())), colorUsing = a
        }
    }, c.focus = function (a) {
        $(a.target).focus();
        var b = new SelectRangeText;
        b.selectRange($(a.target)[0])
    }, c.closeSetting = function () {
        $('.settings[pn-setting="textparagraph"]').removeClass("active")
    }, c.showFont = function () {
        $(".settings.active").removeClass("active")
    }, c.show_color = function () { }, c.show_animate = function () {
        $(".settings").removeClass("active")
    }, c.show_custom = function (a) {
        var b = selectedItem.attr("pn-type");
        $('.settings[pn-setting="' + b + '"]').removeClass("active"), $('.settings[pn-setting="custom-event"]').addClass("active"), $(".advanced").hide();
        for (var c = 0; c < a.length; c++) $('.advanced[pn-setting="' + a[c] + '"]').show(), $('.advanced[pn-setting="' + a[c] + '"] .pn-content-settings').show()
    }, c.back = function (a) {
        savedSel = "";
        var b = $(a.target).parent().parent().parent();
        b.removeClass("active")
    }
}]);