angular.module("punnelApp").controller("lpshapeCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$sce", "$window", function (a, b, c, d, e, f, g) {
    c.idTMP = "", a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.idTMP = selectedItem.attr("id"), c.color_shape = apiElement[a].media.desktop.color, c.color_shape || (c.color_shape = "rgba(0,0,0,1)", apiElement[a].media.desktop.color = "rgba(0,0,0,1)")
        }
    }), c.shapeHtml = shape_value, c.items = lp_colors_all, c.itemsGr = [], c.getItemGroupColor = function (a) {
        void 0 != c.items[a] && void 0 != c.items[a].group && c.items[a].group.length > 0 ? c.itemsGr = c.items[a].group : c.itemsGr = []
    }, c.maxItem = 40, c.name = a.name;
    for (var h = 0; h < type_shape.length; h++)
        for (var i = 0; i < shape_value[type_shape[h].value].length; i++) "string" == typeof c.shapeHtml[type_shape[h].value][i].html && (c.shapeHtml[type_shape[h].value][i].html = f.trustAsHtml(shape_value[type_shape[h].value][i].html));
    c.items_shape = c.shapeHtml.google_material, c.itemGroupShape = type_shape, c.getItemGroupColor = function (a) {
        $("input.minicolor").focus(), $(".colorpicker.colorpicker-hidden").show(), void 0 != c.items[a] && void 0 != c.items[a].group && c.items[a].group.length > 0 ? c.itemsGr = c.items[a].group : c.itemsGr = []
    }, c.setChangeColorInput = function (a, b) {
        var d = (new OptionWiget, b);
        void 0 != b && "" != b ? $("input.minicolor").colorpicker("setValue", d) : d = void 0 == a ? $("input.minicolor").val() : $(a.target).val(), c.color_shape = d
    }, c.setColor = function (a) {
        var a = PN_PAGE.checkColor(a);
        if (a) {
            selectedItem.find("svg").eq(0).attr("fill", a), c.color_shape = a;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].media.desktop.color = a, apiElement[b].media.mobile.color = a, colorUsing = a
        }
    }, c.showContentSetting = function (a) {
        var b = $('.advanced[pn-setting="' + a + '"] .pn-content-settings');
        "none" == b.css("display") ? b.css({
            display: "block"
        }) : b.css({
            display: "none"
        })
    }, c.showMoreShape = function (a) {
        c.items_shape = c.shapeHtml[a], c.maxItem = 40
    }, c.setValueSvg = function (a) {
        var b = $(a.target),
            c = 0;
        do {
            if (c++, b.hasClass("column")) {
                selectedItem.find(".widget-content").eq(0).html(b.find("svg").html()), selectedItem.find(".widget-content").eq(0)[0].setAttribute("viewBox", "0 0 24 24");
                break
            }
            b = b.parent()
        } while (10 > c)
    }, c.showColorSetting = function (b) {
        if (selectedItem && selectedItem.length > 0) {
            var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            a.typeColorPicker = b, a.colorPickerUsing = apiElement[c].media.desktop.color, $("#lpColorPickerCtrl").colorpicker("setValue", a.colorPickerUsing), $(".widget-item.custom-color-picker").show()
        }
    }
}]);