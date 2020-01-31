angular.module("punnelApp").controller("upgradepackageCtr", ["$rootScope", "$scope", "$translate", "$timeout", "APP_CONFIG", "$window", function (a, b, c, d, e, f) {
    b.checkdk = "";
    var g = function (a) {
        b.errorMessage = a, d(function () {
            $(".ngdialog.error").remove()
        }, 2e3)
    };
    b.coup = "", b.totalPrice = 0, b.method = "ND", b.valueCoup = 100, b.checkcoup = function () { }, b.setMethod = function (a) {
        b.method = a
    }, b.selectPack = function (a) {
        b.itemSl = b["package"][a], b.totalPrice = b.itemSl.price, b.valueCoup <= 100 ? b.totalPrice = b.totalPrice * b.valueCoup / 100 : b.totalPrice = b.totalPrice - b.valueCoup
    }, b.update = function () {
        "" != b.itemSl && "undefined" != b.itemSl && void 0 != b.itemSl ? (b.uses = "upgrade", $(".ngdialog.upgrade").remove()) : g("Vui lòng chọn gói!")
    }, b.checkcoup = function () { }, b.close = function () {
        $(".ngdialog.upgrade").remove()
    }
}]);