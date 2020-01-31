angular.module("punnelApp").controller("reportAffCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    b.dateTo = new Date;
    var g = new Date;
    g.setDate(1), b.dateFrom = g, b.commission = 0, b.dataRepor = [], b.showCom = "0", b.invoiSearch = "", b.exel = 0, b.linkExel = "", b.getData = function () {
        $(".parLoading").show();
        var a = {};
        a = b.invoiSearch && b.invoiSearch.length > 0 ? {
            invoiceid: b.invoiSearch,
            exl: b.exel
        } : {
            form: b.dateFrom,
            to: b.dateTo,
            exl: b.exel
        }, f.post("/Statistical/StaticcalAffCommi", a, function (a, c) {
            $(".parLoading").hide(), a ? PN_PAGE.messageLadi("Đã xảy ra lỗi. Vui lòng thử lại") : c && 200 == c.code ? 0 == b.exel ? (b.dataRepor = c.data.data, b.commission = c.data.commission, b.showCom = "1") : b.linkExel = c.data : PN_PAGE.messageLadi(c.messager), $(".parLoading").hide()
        })
    }, b.getData(), b.search = function () {
        b.exel = 0, b.getData()
    }, b.changeDate = function () {
        b.invoiSearch = ""
    }, b.searchExl = function () {
        b.exel = 1, b.getData()
    }
}]);