angular.module("punnelApp").controller("customSingerFormCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "item_form" == selectedItem.attr("pn-type")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            void 0 != apiElement[a].hover_element && "" != apiElement[a].hover_element && (c.placeholderColor = apiElement[a].hover_element.hover_placeholderColor, c.colorInputBg = apiElement[a].hover_element.colorBg, c.colorInput = apiElement[a].hover_element.colorText, c.colorBorder = apiElement[a].hover_element.colorBorder), (void 0 == c.placeholderColor || "undefined" == c.placeholderColor || "" == c.placeholderColor) && (c.placeholderColor = "rgba(255,255,255,0)"), (void 0 == c.colorInputBg || "undefined" == c.colorInputBg || "" == c.colorInputBg) && (c.colorInputBg = "rgba(255,255,255,0)"), (void 0 == c.colorInput || "undefined" == c.colorInput || "" == c.colorInput) && (c.colorInput = "rgba(255,255,255,0)"), (void 0 == c.colorBorder || "undefined" == c.colorBorder || "" == c.colorBorder) && (c.colorBorder = "rgba(255,255,255,0)"), c.itemValueEdit = {
                name: apiElement[a].name_form,
                placeholder: apiElement[a].placeholder_form,
                required: apiElement[a].required_form
            };
            var b = $(".item.single-item-field .open-close-properties");
            b.removeClass("ion-android-arrow-dropright"), b.removeClass("ion-android-arrow-dropdown"), $(".item.single-item-field .pn-content-single-form").show(), $(".item.single-item-field .pn-content-settings-hover").show(), b.parent().parent().addClass("active")
        }
    }), c.typeFormSinger = "", d.use(localStorage.getItem("lang")), c.setColor = function (a) {
        var a = PN_PAGE.checkColor(a);
        a && (c.setValueColor(c.typeColor, a), colorUsing = a)
    }, c.setcolorClose = function (a) {
        var a = PN_PAGE.checkColor(a);
        a && (c.setValueColor(c.typeColor, a), colorUsing = a)
    }, c.setValueColor = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            switch ((void 0 == apiElement[d].hover_element || "" == apiElement[d].hover_element) && (apiElement[d].hover_element = {}), a) {
                case "placeholder":
                    c.placeholderColor = b, apiElement[d].hover_element.hover_placeholderColor = b;
                    break;
                case "inputBg":
                    c.colorInputBg = b, apiElement[d].hover_element.colorBg = b;
                    break;
                case "inputtext":
                    c.colorInput = b, apiElement[d].hover_element.colorText = b;
                    break;
                case "border":
                    c.colorBorder = b, apiElement[d].hover_element.colorBorder = b
            }
        }
    }, c.setNameSinger = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                b = new AjaxPage;
            c.itemValueEdit.name = b.reName(c.itemValueEdit.name), apiElement[a].name_form = c.itemValueEdit.name, selectedItem.find(".widget-content").eq(0).attr("name", c.itemValueEdit.name);
            var d = PN_PAGE.getElement('.widget-element[pn-type="contact_form"]');
            void 0 != d && d.length > 1 && d.each(function () {
                if ($(this).attr("id") != selectedItem.attr("id")) {
                    var a = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[a].name_form = c.itemValueEdit.name, $(this).find(".widget-content").eq(0).attr("name", c.itemValueEdit.name)
                }
            })
        }
    }, c.checkRequied = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $(a.target).is(":checked") ? (c.itemValueEdit.required = !0, apiElement[b].required_form = !0) : (apiElement[b].required_form = !1, c.itemValueEdit.required = !1), selectedItem.find(".widget-content").eq(0).attr("required", c.itemValueEdit.required);
            var d = PN_PAGE.getElement('.widget-element[pn-type="contact_form"]');
            void 0 != d && d.length > 1 && d.each(function () {
                if ($(this).attr("id") != selectedItem.attr("id")) {
                    var a = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[a].required = c.itemValueEdit.required, $(this).find(".widget-content").eq(0).attr("required", c.itemValueEdit.required)
                }
            })
        }
    }, c.setPlaceholder = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].placeholder_form = c.itemValueEdit.placeholder, selectedItem.find(".widget-content").eq(0).attr("placeholder", c.itemValueEdit.placeholder);
            var b = PN_PAGE.getElement('.widget-element[pn-type="contact_form"]');
            void 0 != b && b.length > 1 && b.each(function () {
                if ($(this).attr("id") != selectedItem.attr("id")) {
                    var a = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[a].placeholder_form = c.itemValueEdit.placeholder, $(this).find(".widget-content").eq(0).attr("placeholder", c.itemValueEdit.placeholder)
                }
            })
        }
    }, c.showColor = function (a) {
        switch (c.typeColor = a, a) {
            case "placeholder":
                colorUsing = c.placeholderColor;
                break;
            case "inputBg":
                colorUsing = c.colorInputBg;
                break;
            case "inputtext":
                colorUsing = c.colorInput;
                break;
            case "border":
                colorUsing = c.colorBorder
        }
    }, c.showContentSetting = function (a) {
        "none" == $(".single-item-field ." + a).css("display") ? $(".single-item-field ." + a).show() : $(".single-item-field ." + a).hide()
    }, c.close = function () {
        fadeOutAnimate($(".ngdialog.custom_singer_form"))
    }
}]);