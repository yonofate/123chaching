angular.module("punnelApp").controller("addPermissionCtr", ["$scope", "$timeout", function (a, b) {
    var c = function (c) {
        a.errorMessage = c, b(function () {
            $(".ngdialog.error").remove()
        }, 1500)
    },
        d = new GetDataService;
    d.urlParam("ladi");
    a.email = "", a.permisstion = "0", a.arrPermission = [], a.perMissRoot = PN_PAGE.account.email, a.loadPerMissionLadi = function () { }, a.loadPerMissionLadi(), a.setTypePermission = function (b) {
        a.permisstion = b
    }, a.setTypePermissionItem = function (a, b) { }, a.setPermission = function () {
        a.email = $.trim(a.email), a.formSubmit.$valid || c("Vui lòng nhập email được thêm!")
    }, a.removePermis = function (a) { }, a.getOwner = function (a) {
        if (void 0 != a && a.length > 0)
            for (var b = 0; b < a.length; b++)
                if (99 == parseFloat(a[b].permission)) return a[b];
        return !1
    }, a.close = function () {
        $(".ngdialog.addPermission").remove()
    }
}]);