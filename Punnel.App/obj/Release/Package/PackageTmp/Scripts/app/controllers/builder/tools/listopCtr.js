angular.module("punnelApp").controller("listopCtr", ["$rootScope", "$state", "$scope", "popupService", function (a, b, c, popupService) {
    c.idTMP = "", a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id"), c.name = a.name;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].media.character_spacing_icon && apiElement[b].media.character_spacing_icon.length > 0 ? c.character_spacing_icon = parseFloat(apiElement[b].media.character_spacing_icon) : c.character_spacing_icon = 8, apiElement[b].media.color_icon && apiElement[b].media.color_icon.length > 0 ? c.color_icon = apiElement[b].media.color_icon : c.color_icon = apiElement[b].media.desktop.color, (void 0 == c.color_icon || "" == c.color_icon) && (c.color_icon = "rgba(0,0,0,1)"), apiElement[b].widthIcon && apiElement[b].widthIcon.length > 0 ? c.widthIcon = parseFloat(apiElement[b].widthIcon) : c.widthIcon = 30, apiElement[b].topIcon && apiElement[b].topIcon.length > 0 ? c.heightIcon = parseFloat(apiElement[b].topIcon) : c.heightIcon = 0, apiElement[b].lineList && apiElement[b].lineList.length > 0 ? c.lineList = parseFloat(apiElement[b].lineList) : c.lineList = 0, c.icon_list_image = apiElement[b].icon_list_image, c.typeicon = apiElement[b].typeicon, c.icon_list_default = apiElement[b].media.desktop.content, c.icon_list_default || (c.icon_list_default = "")
        }
    }), c.items = lp_colors_all, c.name = a.name, c.itemkcc = number, c.itemkcd = number, c.setValuelineList = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].lineList = c.lineList + "px", c.setValueIcon(selectedItem)
        }
    }, c.setValueheightIcon = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].topIcon = c.heightIcon + "px", c.setValueIcon(selectedItem)
        }
    }, c.setValuewidthIcon = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].widthIcon = c.widthIcon + "px", apiElement[a].heightIcon = c.widthIcon + "px", c.setValueIcon(selectedItem)
        }
    }, c.setChangeColorInput = function (a, b) {
        var d = (new OptionWiget, b);
        void 0 != b && "" != b ? $("input.minicolor").colorpicker("setValue", d) : d = void 0 == a ? $("input.minicolor").val() : $(a.target).val(), c.color_icon = d
    }, c.changeKCCIcon = function (a) {
        c.character_spacing_icon = a, c.setValueCharacterSpacing()
    }, c.setValueCharacterSpacing = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.character_spacing_icon = c.character_spacing_icon + "px", c.setValueIcon(selectedItem);
            var b = new OptionWiget;
            b.resetValueHeightText(selectedItem)
        }
    }, c.setColorIcon = function (a) {
        var a = PN_PAGE.checkColor(a);
        if (a && selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].media.color_icon = a, c.setValueIcon(selectedItem)
        }
    }, c.setListIcon = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].media.desktop.content = a, apiElement[b].media.mobile.content = a, apiElement[b].typeicon = "", c.icon_list_default = a, c.setValueIcon(selectedItem)
        }
    }, c.setIconImage = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].typeicon = "image", apiElement[b].icon_list_image = a
        }
    }, c.resetinputcontrol = function () {
        var a = new LpColorPicker;
        a.runColor()
    }, c.setTypeIcon = function (a, b) {
        selectedItem && selectedItem.length > 0 && (c.resetinputcontrol(), c.typeicon = a, setTimeout(function () {
            c.resetinputcontrol(), $(b.target).parent().parent().hide()
        }, 200))
    }, c.setValueIcon = function (a) {
        if (a && a.length > 0) {
            var b = PN_PAGE.getIndexElement(a.attr("id"));
            PN_PAGE.setTypeListIcon(apiElement[b]);
            var c = new OptionWiget;
            c.resetValueHeightText(selectedItem)
        }
    }, c.changetypeImage = function (typeImg) {
        popupService.imageManagerShow({}, function (res) {
            imgUtils.process(res, typeImg, "");
        });
    }, c.changetypeSvgicon = function (a) {
        typeselecteShape = a, $("#managerShape").unbind("modal").modal("show")
    }, c.hidedropdown = function (a) {
        $(a.target).hasClass("ng-scope") && $(a.target).parent().hasClass("dropdown")
    }, c.showColorSetting = function (b) {
        if (selectedItem && selectedItem.length > 0) {
            var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            a.typeColorPicker = b, a.colorPickerUsing = apiElement[c].media.color_icon, $("#lpColorPickerCtrl").colorpicker("setValue", a.colorPickerUsing), $(".widget-item.custom-color-picker").show()
        }
    }
}]);