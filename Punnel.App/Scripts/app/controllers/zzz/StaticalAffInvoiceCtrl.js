angular.module("punnelApp").controller("StaticalAffInvoiceCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    b.data = [], b.status = "1", b.codeRef = "", b.dateTo = new Date;
    var g = new Date;
    g.setDate(1), b.dateFrom = g, b.start = 0, b.linkdow = "", b.exelDT = "0", b.searchData = function () {
        b.exelDT = "0", $(".parLoading").show(), f.post("/Statistical/AffiliateData", {
            form: b.dateFrom,
            to: b.dateTo,
            type: parseFloat(b.status),
            page: b.start
        }, function (a, c) {
            $(".parLoading").hide(), c && 200 == c.code ? (b.linkExelDT = c.data, console.log(c)) : c ? PN_PAGE.messageLadi(c.messager) : PN_PAGE.messageLadi("Vui lòng kiểm tra lại!")
        })
    }, b.linkDown = "", b.repostAff = function () {
        b.exelDT = "1", $(".parLoading").show(), f.post("/Statistical/AffiliateData", {
            ref: b.codeRef
        }, function (a, c) {
            $(".parLoading").hide(), c && 200 == c.code ? (b.linkExelDT = c.data, console.log(c)) : c ? PN_PAGE.messageLadi(c.messager) : PN_PAGE.messageLadi("Vui lòng kiểm tra lại!")
        })
    }
}]);