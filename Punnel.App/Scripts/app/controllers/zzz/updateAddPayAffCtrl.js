angular.module("punnelApp").controller("updateAddPayAffCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    b.email = "", b.addpay = "", b.updateAddPay = function () {
        $(".parLoading").show(), b.addpay = $(".addpay").val(), b.email && b.email.length > 0 && b.addpay && b.addpay.length > 0 ? f.post("/StatisticalController/UpdateAffPay", {
            key: b.email,
            addpay: b.addpay
        }, function (a, b) {
            $(".parLoading").hide(), b && 200 == b.code ? PN_PAGE.messageLadi("Update thành công!") : b ? PN_PAGE.messageLadi(b.messager) : PN_PAGE.messageLadi("Vui lòng kiểm tra lại!")
        }) : ($(".parLoading").hide(), PN_PAGE.messageLadi("Vui lòng không để thông tin trống"))
    }
}]);