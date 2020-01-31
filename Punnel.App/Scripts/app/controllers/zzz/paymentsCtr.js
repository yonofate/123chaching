angular.module("punnelApp").controller("paymentsCtr", ["$rootScope", "$scope", "$translate", "$timeout", "APP_CONFIG", "$window", function (a, b, c, d, e, f) {
    var g = function (a) {
        b.errorMessage = a, d(function () {
            $(".ngdialog.error").remove()
        }, 2e3)
    };
    b.valueCoup = 0, b.selectPack = function (a) {
        b.itemSl = b["package"][a], b.totalPrice = b.itemSl.price, b.valueCoup <= 100 && b.valueCoup > 0 ? b.totalPrice = b.totalPrice * b.valueCoup / 100 : b.totalPrice = b.totalPrice - b.valueCoup
    }, b.update = function () {
        "check" == b.checkdk ? ($(".saving").show(), "PAY" == b.method) : "check" != b.checkdk && g("Vui lòng đọc kỹ điều khoản thanh toán!")
    }, b.coup = "", b.valueCoup = 0, b.checkcoup = function () { }, b.setCheckdk = function (a, c) {
        var d = $(c.target);
        d.is(":checked") ? b.checkdk = a : b.checkdk = ""
    }, b.close = function () {
        $(".ngdialog.payments").remove()
    }
}]);