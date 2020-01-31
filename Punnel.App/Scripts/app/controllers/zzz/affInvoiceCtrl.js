angular.module("punnelApp").controller("affInvoiceCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    b.data = [], b.moreAff = function () {
        $(".parLoading").show(), f.post("/Statistical/AffInvoice", {}, function (a, c) {
            $(".parLoading").hide(), c && 200 == c.code ? b.data = c.data : c ? PN_PAGE.messageLadi(c.messager) : PN_PAGE.messageLadi("Vui lòng kiểm tra lại!")
        })
    }, b.moreAff(), b.linkdown = "", b.moreAffExl = function () {
        $(".parLoading").show(), f.post("/Statistical/AffInvoice", {
            xlsx: 1
        }, function (a, c) {
            $(".parLoading").hide(), c && 200 == c.code ? b.linkdown = c.data : c ? PN_PAGE.messageLadi(c.messager) : PN_PAGE.messageLadi("Vui lòng kiểm tra lại!")
        })
    }, b.commission = 0, b.listaffid = [], b.idTT = "", b.showpopup = function (a, c) {
        $(".parLoading").show(), b.idTT = a, f.post("/Statistical/FindPayCommiByAff", {
            invoiceid: a
        }, function (a, c) {
            $(".parLoading").hide(), c && 200 == c.code ? (b.commission = c.data.commission, b.listaffid = c.data.data, console.log(c), $("#setting-FindPayCommiByAff").modal("show")) : PN_PAGE.messageLadi("Đã xảy ra lỗi vui lòng thử lại")
        })
    }, b.tattoan = function () {
        $(".parLoading").show(), f.post("/Statistical/PayCommiForAff", {
            invoiceid: b.idTT
        }, function (a, b) {
            $(".parLoading").hide(), b && 200 == b.code ? PN_PAGE.messageLadi("Đã tất toán") : PN_PAGE.messageLadi("Chưa tất toán, xảy ra lỗi")
        })
    }
}]);