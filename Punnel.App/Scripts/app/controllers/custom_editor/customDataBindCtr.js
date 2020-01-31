angular.module("punnelApp").controller("customDatabindCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.dataBindId = apiElement[a].dataBindId || ''
        }
    }), c.setId = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].dataBindId = c.dataBindId;
            //c.dataBindId = a;
        }
    }
}]);