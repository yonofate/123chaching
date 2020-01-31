angular.module("punnelApp").controller("activePartnerCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    b.email = "", b.code = "", b.level = "1", b.comission1 = 0, b.comission2 = 0, b.dateTrial = 0, b.addpay = "", b.checkAffEmail = function () {
        $(".parLoading").show(), f.post("/Statistical/CheckAff", {
            key: b.email,
            isref: !1
        }, function (a, c) {
            $(".parLoading").hide(), c && 200 == c.code ? (b.email = c.data.email, b.code = c.data.ref, b.comission1 = c.data.comission1, b.comission2 = c.data.comission2, b.dateTrial = c.data.dateTrial, b.addpay = c.data.AddPay, b.level = c.data.level + "", $(".addpay").val(b.addpay)) : (PN_PAGE.messageLadi(c.messager), b.code = "", b.level = "1", b.comission1 = 0, b.comission2 = 0, b.dateTrial = 0, b.addpay = "", $(".addpay").val(b.addpay))
        })
    }, b.checkAffRef = function () {
        $(".parLoading").show(), f.post("/Statistical/CheckAff", {
            key: b.code,
            isref: !0
        }, function (a, c) {
            $(".parLoading").hide(), c && 200 == c.code ? (b.email = c.data.email, b.code = c.data.ref, b.comission1 = c.data.comission1, b.comission2 = c.data.comission2, b.dateTrial = c.data.dateTrial, b.addpay = c.data.AddPay, b.level = c.data.level + "", $(".addpay").val(b.addpay)) : (PN_PAGE.messageLadi(c.messager), b.email = "", b.level = "1", b.comission1 = 0, b.comission2 = 0, b.dateTrial = 0, b.addpay = "", $(".addpay").val(b.addpay))
        })
    }, b.adminCreatePartner = function () {
        b.addpay = $(".addpay").val(), $(".parLoading").show(), f.post("/Statistical/ActiveAff", {
            email: b.email,
            code: b.code,
            level: parseFloat(b.level),
            comission1: parseFloat(b.comission1),
            comission2: parseFloat(b.comission2),
            dateTrial: parseFloat(b.dateTrial),
            addpay: b.addpay
        }, function (a, c) {
            $(".parLoading").hide(), c && 200 == c.code ? (PN_PAGE.messageLadi("Nâng cấp Partner thành công"), b.email = "", b.code = "", b.level = "1", b.comission1 = 0, b.comission2 = 0, b.dateTrial = 0, b.addpay = "") : c ? PN_PAGE.messageLadi(c.messager) : PN_PAGE.messageLadi("Vui lòng kiểm tra lại!")
        })
    }
}]);