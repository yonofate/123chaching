angular.module("punnelApp").controller("customSettingFormCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            "contact_form" == selectedItem.attr("pn-type") ? (c.colorInputBg = apiElement[a].media.background_input_color, c.colorInput = apiElement[a].media.color_value) : (c.colorInputBg = apiElement[a].media[deviceEdit]["background-color"], c.colorInput = apiElement[a].media[deviceEdit].color), c.placeholderColor = apiElement[a].media.placeholderColor, (void 0 == c.placeholderColor || "undefined" == c.placeholderColor || "" == c.placeholderColor) && (c.placeholderColor = "#C7C7CD"), (void 0 == c.colorInputBg || null == c.colorInputBg || "" == c.colorInputBg) && (c.colorInputBg = "rgba(255,255,255,1)"), (void 0 == c.colorInput || null == c.colorInput || "" == c.colorInput) && (c.colorInput = "#000000"), c.font_size = apiElement[a].media.desktop["font-size"], void 0 == c.font_size || "" == c.font_size ? c.font_size = 13 : c.font_size = parseFloat(apiElement[a].media.desktop["font-size"])
        }
    }), c.colorType = "", c.itemFrontSize = font_size, c.setChangeColorInput = function (a, b) {
        var d = (new OptionWiget, b);
        switch (void 0 != b && "" != b ? $("input.minicolor").colorpicker("setValue", d) : d = void 0 == a ? $("input.minicolor").val() : $(a.target).val(), c.colorType) {
            case "placeholder":
                c.placeholderColor = d;
                break;
            case "inputBg":
                c.colorInputBg = d;
                break;
            case "inputtext":
                c.colorInput = d
        }
    }, c.setColor = function (a) {
        var a = PN_PAGE.checkColor(a);
        PN_PAGE.checkColor(a) && (c.setValueColor(c.colorType, a), colorUsing = a)
    }, c.setcolorClose = function (a) {
        PN_PAGE.checkColor(a) && (c.setValueColor(c.colorType, a), $(".ngdialog.custom_color").remove(), colorUsing = a)
    }, c.changeFontSize = function (a) {
        c.font_size = a, c.setFontSize()
    }, c.setFontSize = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[a].media.mobile["font-size"] = c.font_size + "px", apiElement[a].media.desktop["font-size"] = c.font_size + "px", selectedItem.find(".widget-content").eq(0).css({
                    "font-size": c.font_size + "px"
            }), "contact_form" == selectedItem.attr("pn-type")) {
                var b = selectedItem.find('.widget-element[pn-type="item_form"]');
                void 0 != b && b.length > 0 && b.each(function () {
                    var a = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[a].media.mobile["font-size"] = c.font_size + "px", apiElement[a].media.desktop["font-size"] = c.font_size + "px", $(this).find(".widget-content").eq(0).css({
                        "font-size": c.font_size + "px"
                    })
                })
            }
        }
        },
        c.showContentSetting = function (a, b) {
        var c = $('.advanced[pn-setting="' + a + '"] .pn-content-settings.' + b);
        "none" == c.css("display") ? c.css({
            display: "block"
        }) : c.css({
            display: "none"
        })
    }, c.setValueColor = function (a, b) {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            switch (a) {
                case "inputtext":
                    if (c.colorInput = b, "contact_form" == selectedItem.attr("pn-type")) {
                        apiElement[d].media.color_value = b, selectedItem.find(".widget-element .widget-content").css({
                            color: b
                        });
                        var e = selectedItem.find('.widget-item-child[pn-type="item_form"]');
                        void 0 != e && e.length > 0 && e.each(function () {
                            var a = PN_PAGE.getIndexElement($(this).attr("id"));
                            apiElement[a].media.desktop.color = b, apiElement[a].media.mobile.color = b, $(this).find(".widget-content").eq(0).css({
                                color: b
                            })
                        })
                    } else apiElement[d].media.desktop.color = b, apiElement[d].media.mobile.color = b, selectedItem.find(".widget-content").eq(0).css({
                        color: b
                    });
                    break;
                case "inputBg":
                    if (c.colorInputBg = b, "contact_form" == selectedItem.attr("pn-type")) {
                        apiElement[d].media.background_input_color = b;
                        var e = selectedItem.find('.widget-item-child[pn-type="item_form"]');
                        void 0 != e && e.length > 0 && e.each(function () {
                            var a = PN_PAGE.getIndexElement($(this).attr("id"));
                            apiElement[a].media.desktop["background-color"] = b, apiElement[a].media.mobile["background-color"] = b, apiElement[a].bg_type = "color", $(this).find(".widget-content").eq(0).css({
                                "background-color": b
                            })
                        })
                    } else apiElement[d].media.desktop["background-color"] = b, apiElement[d].media.mobile["background-color"] = b, apiElement[d].bg_type = "color", selectedItem.find(".widget-content").eq(0).css({
                        "background-color": b
                    });
                    break;
                case "placeholder":
                    c.placeholderColor = b, apiElement[d].media.placeholderColor = b;
                    var e = selectedItem.find('.widget-item-child[pn-type="item_form"]');
                    void 0 != e && e.length > 0 && e.each(function () {
                        var a = PN_PAGE.getIndexElement($(this).attr("id"));
                        apiElement[a].media.placeholderColor = b, $("head #" + $(this).attr("id")).remove();
                        var c = "";
                        c = c + '<style id="' + $(this).attr("id") + 'placeholder">#' + $(this).attr("id") + " .widget-content::-webkit-input-placeholder{color:" + b + "}", c = c + "#" + $(this).attr("id") + " .widget-content:-moz-placeholder{color:" + b + "}", c = c + "#" + $(this).attr("id") + " .widget-content::-moz-placeholder{color:" + b + "}", c = c + "#" + $(this).attr("id") + " .widget-content:-ms-input-placeholder{color:" + b + "}", c += "</style>", $("head").append(c), $(this).find("select.widget-content").css({
                            color: b
                        }), $(this).find("select.widget-content option:first-child").css({
                            color: b
                        })
                    })
            }
        }
    }, c.showColor = function (a) {
        switch (a) {
            case "placeholder":
                colorUsing = c.placeholderColor;
                break;
            case "inputBg":
                colorUsing = c.colorInputBg;
                break;
            case "inputtext":
                colorUsing = c.colorInput
        }
        c.colorType = a
    }, c.close = function () {
        var a = selectedItem.attr("pn-type");
        $(".settings.active").removeClass("active"), $('.settings[pn-setting="' + a + '"]').addClass("active")
    }, c.showColorSetting = function (b) {
        if (selectedItem && selectedItem.length > 0) {
            var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            switch (a.typeColorPicker = b, b) {
                case "text-form":
                    "contact_form" == selectedItem.attr("pn-type") ? a.colorPickerUsing = apiElement[c].media.color_value : a.colorPickerUsing = apiElement[c].media.desktop.color, a.colorPickerUsing || (a.colorPickerUsing = "#000000");
                    break;
                case "bg-input-form":
                    "contact_form" == selectedItem.attr("pn-type") ? a.colorPickerUsing = apiElement[c].media.background_input_color : a.colorPickerUsing = "#000000", a.colorPickerUsing || (a.colorPickerUsing = "rgba(255,255,255,1)");
                    break;
                case "placeholder-form":
                    a.colorPickerUsing = apiElement[c].media.placeholderColor, a.colorPickerUsing || (a.colorPickerUsing = "#C7C7CD")
            }
            $("#lpColorPickerCtrl").colorpicker("setValue", a.colorPickerUsing), $(".widget-item.custom-color-picker").show()
        }
    }
}]);