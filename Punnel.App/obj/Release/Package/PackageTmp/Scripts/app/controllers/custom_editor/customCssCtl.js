angular.module("punnelApp").controller("customCssCtl", ["$rootScope", "$scope", "$stateParams", function (a, b, c) {
    b.idTMP = "", a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && b.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            b.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            b.customcss = apiElement[a].media[deviceEdit].customCss, b.addClass = apiElement[a].addClass, b.addClass || (b.addClass = "")
        }
    }), b.setClassName = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].addClass = b.addClass
        }
    }, b.setcustomCss = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            b.customcss = $(a.target).val();
            var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[c].media.desktop.customCss = b.customcss, apiElement[c].media.mobile.customCss = b.customcss
        }
    }
}]);