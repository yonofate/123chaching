angular.module("punnelApp").controller("customColorBoxCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.items = lp_colors_all, d.use(localStorage.getItem("lang"));
    var f = new OptionWiget;
    c.colorSelect = "#ffffff", c.colorTmpSelect = f.hexToRgba(colorUsing, 1), c.itemsGr = [], c.getItemGroupColor = function (a) {
        void 0 != c.items[a] && void 0 != c.items[a].group && c.items[a].group.length > 0 ? c.itemsGr = c.items[a].group : c.itemsGr = []
    }, c.setChangeColorInput = function (a, b) {
        new OptionWiget;
        void 0 != b && "" != b ? (c.colorTmpSelect = b, $("input.minicolor").colorpicker("setValue", b)) : void 0 == a ? c.colorTmpSelect = $("input.minicolor").val() : c.colorTmpSelect = $(a.target).val(), c.colorSelect = c.colorTmpSelect
    }, c.close = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var a = new OptionWiget;
            a.addElementUndo("", selectedItem)
        }
        if (savedSel = "", fadeOutAnimate($(".ngdialog.custom_color_box")), "shape" == selectedItem.attr("pn-type")) $('.settings[pn-setting="shape"]').addClass("active");
        else {
            var b = $(".ngdialog.ng-scope").length;
            b >= 1 ? ($(".ngdialog.ng-scope").show(), $(".ngdialog.ng-scope .dialog.settings").addClass("active")) : $('.settings[pn-setting="custom-event"]').addClass("active")
        }
    }
}]);