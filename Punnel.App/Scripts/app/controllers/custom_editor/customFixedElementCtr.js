angular.module("punnelApp").controller("customFixedElementCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && "undefined" != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.typeFixed = apiElement[a].typeFixed, c.typeFixed || (c.typeFixed = "none", apiElement[a].typeFixed = "")
        }
    }), c.setTypeFixed = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            c.typeFixed = a;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            "none" == a ? (apiElement[b].typeFixed = "", selectedItem.find(".widget-content").eq(0).css({
                position: ""
            })) : (apiElement[b].typeFixed = a, selectedItem.find(".widget-content").eq(0).css({
                position: "fixed"
            })), c.setValue(a)
        }
    }, c.setValue = function (a) {
        setValueFixed(a)
    }
}]);