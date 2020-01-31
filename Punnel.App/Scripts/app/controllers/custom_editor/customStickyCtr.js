angular.module("punnelApp").controller("customStickyCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.stickyPos = apiElement[a].stickyPos, c.stickyPos || (c.stickyPos = "top", apiElement[a].stickyPos = "top"), c.stickyUsing = apiElement[a].stickyUsing, c.stickyUsing || (c.stickyUsing = "0"), apiElement[a].stickykc && apiElement[a].stickykc.length > 0 ? c.stickykc = parseFloat(apiElement[a].stickykc) : c.stickykc = 0
        }
    }), c.setStickyUsing = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            selectedItem.hasClass("widget-section") && parseFloat(apiElement[b].media.desktop.height) > 150 ? PN_PAGE.showMessage("Chiều cao phải nhỏ hơn 150px", 'error') : (apiElement[b].stickyUsing = a, c.stickyUsing = a)
        }
    }, c.setStickyPos = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].stickyPos = a, c.stickyPos = a
        }
    }, c.setValueStickykc = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].stickykc = c.stickykc + "px"
        }
    }
}]);