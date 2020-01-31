angular.module("punnelApp").controller("customTrackingCtr", ["$rootScope", "$scope", "$stateParams", function (a, b, c) {
    b.itemtracks = itemTracking, b.idTMP = "",
        a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && b.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            b.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            b.tracking = apiElement[a].tracking, b.tracking || (apiElement[a].tracking = "")
        }
    }), b.setTracking = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = $(".custom-tracking .value-tracking").val();
            b.tracking = a;
            var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[c].tracking = a
        }
    }, b.addTracking = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            b.tracking += b.itemtracks[a].value + "\n", $(".custom-tracking .value-tracking").val(b.tracking);
            var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[c].tracking = b.tracking
        }
    }
}]);