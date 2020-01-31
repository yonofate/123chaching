angular.module("punnelApp").controller("buttonCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    a.$watch(function () {
        c.name = a.name
    }), c.name = a.name, c.items = lp_colors_all, c.items_button = lp_button, c.setValueAction = function (a) {
        var b = $(".search-action-bt"),
            c = $(a.target).val(),
            d = c.replace("#", ""),
            e = c.charAt(0);
        if ("#" == e) f(d, selectedItem), b.show();
        else {
            selectedItem.attr("href", c);
            var g = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[g].action = c, b.hide()
        }
    }, c.setValueFont = function (a) {
        var b = selectedItem.attr("pn-font-family");
        selectedItem.removeClass("" + b), selectedItem.addClass("" + a).attr("pn-font-family", a)
    }, c.setTextAlign = function (a) {
        var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[b].media.desktop["text-align"] = a, apiElement[b].media.mobile["text-align"] = a, selectedItem.css({
            "text-align": a
        })
    }, c.changeName = function (b) {
        var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        c.name = $(b.target).text(), a.name = c.name, selectedItem.attr("pn-lang", c.name), apiElement[d].lang = c.name
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
    }, c.selectStyle = function (b, d) {
        var e = (selectedItem.attr("pn-style"), selectedItem.find(".widget-content").eq(0)),
            f = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        $.extend(apiElement[f].media.desktop, apiElement[f].media.desktop, c.items_button[d].media.desktop), $.extend(apiElement[f].media.mobile, apiElement[f].media.mobile, c.items_button[d].media.mobile);
        var g = new CheckApiElement;
        g.setValueInJson(e, c.items_button[d].media.desktop), a.id = "reset", a.id = selectedItem.attr("id")
    }, c.focus = function (a) {
        $(a.target).focus();
        var b = new SelectRangeText;
        b.selectRange($(a.target)[0])
    }, c.closeSetting = function () {
        $('.settings[pn-setting="button"]').removeClass("active")
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
    };
    var f = function (a, b) {
        var c = $(".search-action-bt ul"),
            d = "";
        c.html("");
        for (var e = 0; e < apiElement.length; e++) -1 != apiElement[e].id.search(a) && "widget-element" == apiElement[e].lp_type && (d = d + '<li role="presentation"><a href="#">' + apiElement[e].id + "</a></li>");
        c.append(d);
        var f = c.find("li");
        f.unbind("click").click(function () {
            var a = $(this).text(),
                c = $(".properties_button .value_action input");
            b.attr("href", "#" + a);
            var d = PN_PAGE.getIndexElement(b.attr("id"));
            apiElement[d].action = "#" + a, c.val("#" + a), $(".search-action-bt").hide()
        }), f.unbind("hover").hover(function () {
            var a = $(this).text();
            a = $.trim(a), selectedItem = PN_PAGE.PUNNEL_EDIT("#" + a);
            var b = new ShowBoxResize;
            b.showBox(selectedItem)
        }), $(".search-action-bt").unbind("mouseleave").mouseleave(function () {
            $(".search-action-bt").hide()
        })
    }
}]);