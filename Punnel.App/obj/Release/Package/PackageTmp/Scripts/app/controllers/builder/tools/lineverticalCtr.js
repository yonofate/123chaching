angular.module("punnelApp").controller("lineverticalCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.idTMP = "", a.$watch(function () {
        if (selectedItem && "linevertical" == selectedItem.attr("pn-type") && c.idTMP != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.widthLine = parseFloat(apiElement[a].style_linevertical["border-left"]), c.colorLine = apiElement[a].style_linevertical["border-color"], c.styleLine = apiElement[a].style_linevertical["border-style"]
        }
    }), c.changeBoderWidth = function (a) {
        c.widthLine = a, c.setValueWidth()
    }, c.setChangeColorInput = function (a, b) {
        var d = (new OptionWiget, b);
        void 0 != b && "" != b ? $("input.minicolor").colorpicker("setValue", d) : d = void 0 == a ? $("input.minicolor").val() : $(a.target).val(), c.colorLine = d
    }, c.setValueType = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            c.styleLine = a;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].style_linevertical["border-style"] = a, selectedItem.find(".widget-content .linevertical").css({
                "border-style": a
            })
        }
    }, c.setColor = function (a) {
        var a = PN_PAGE.checkColor(a);
        if (a && selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.colorLine = a, apiElement[b].style_linevertical["border-color"] = a, selectedItem.find(".widget-content .linevertical").css({
                "border-color": a
            })
        }
    }, c.setValueWidth = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].style_linevertical["border-left"] = c.widthLine + "px", apiElement[a].style_linevertical["margin-left"] = selectedItem.outerWidth() / 2 - c.widthLine + "px", selectedItem.find(".widget-content .linevertical").css({
                "border-left-width": c.widthLine + "px",
                "margin-left": apiElement[a].style_linevertical["margin-left"]
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
            a.typeColorPicker = b, a.colorPickerUsing = apiElement[c].style_linevertical["border-color"], $("#lpColorPickerCtrl").colorpicker("setValue", a.colorPickerUsing), $(".widget-item.custom-color-picker").show()
        }
    }
}]);