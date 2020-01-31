angular.module("punnelApp").controller("oldactivePartnerCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    b.emailPartner = "", b.codePartner = "", b.createPartner = function () {
        $(".parLoading").show(), b.emailPartner && b.emailPartner.length > 0 && b.codePartner && b.codePartner.length > 0 ? f.post("/Statistical/ActivePartner", {
            email: b.emailPartner,
            code: b.codePartner
        }, function (a, b) {
            $(".parLoading").hide(), b && 200 == b.code ? PN_PAGE.messageLadi("Nâng cấp Partner thành công") : b ? PN_PAGE.messageLadi(b.messager) : PN_PAGE.messageLadi("Vui lòng kiểm tra lại!")
        }) : ($(".parLoading").hide(), PN_PAGE.messageLadi("Vui lòng kiểm tra lại!"))
    }
}]);