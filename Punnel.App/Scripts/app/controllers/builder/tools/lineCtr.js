angular.module("punnelApp").controller("lineCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.TMPID = "", a.$watch(function () {
        if (selectedItem && "line" == selectedItem.attr("pn-type") && c.TMPID != selectedItem.attr("id")) {
            c.TMPID = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.widthLine = parseFloat(apiElement[a].style_line["border-top"]), c.colorLine = apiElement[a].style_line["border-color"], c.styleLine = apiElement[a].style_line["border-style"]
        }
    }), c.changeBoderWidth = function (a) {
        c.widthLine = a, c.setValueWidth()
    }, c.setChangeColorInput = function (a, b) {
        var d = (new OptionWiget, b);
        b && b.length > 0 ? $("input.minicolor").colorpicker("setValue", d) : d = void 0 == a ? $("input.minicolor:visible").val() : $(a.target).val(), c.colorLine = d
    }, c.setValueType = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            c.styleLine = a;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].style_line["border-style"] = a, selectedItem.find(".widget-content .line").css({
                "border-style": a
            })
        }
    }, c.setColor = function (a) {
        var a = PN_PAGE.checkColor(a);
        if (a && selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.colorLine = a, apiElement[b].style_line["border-color"] = PN_PAGE.getHexToRgba(a), selectedItem.find(".widget-content .line").css({
                "border-color": PN_PAGE.getHexToRgba(a)
            })
        }
    }, c.setValueWidth = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].style_line["border-top"] = c.widthLine + "px", apiElement[a].style_line["margin-top"] = selectedItem.outerHeight() / 2 - c.widthLine + "px", selectedItem.find(".widget-content .line").css({
                "border-top-width": c.widthLine + "px",
                "margin-top": apiElement[a].style_line["margin-top"]
            })
        }
    }, c.showColor = function () {
        colorUsing = c.colorLine, $('.settings.active[pn-setting="custom-event"]').removeClass("active"), $(".ngdialog.ng-scope").hide(), $(".ngdialog.ng-scope .dialog.settings").removeClass("active")
    }, c.showContentSetting = function (a) {
        var b = $('.advanced[pn-setting="' + a + '"] .pn-content-settings');
        "none" == b.css("display") ? b.css({
            display: "block"
        }) : b.css({
            display: "none"
        })
    }, c.showColorSetting = function (b) {
        if (selectedItem && selectedItem.length > 0) {
            var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            a.typeColorPicker = b, a.colorPickerUsing = apiElement[c].style_line["border-color"], $("#lpColorPickerCtrl").colorpicker("setValue", a.colorPickerUsing), $(".widget-item.custom-color-picker").show()
        }
    }
}]);