angular.module("punnelApp").controller("moveLadipageCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    b.emailForm = "", b.emailTo = "", b.IDLadi = "", b.domainLadi = "", b.changeEmail = function () {
        $(".parLoading").show(), (b.domainLadi && b.domainLadi.length > 0 || b.IDLadi && b.IDLadi.length > 0) && b.emailForm && b.emailForm.length > 0 && b.emailTo && b.emailTo.length > 0 ? f.post("/Statistical/MoveLadi", {
            domain: b.domainLadi,
            emailform: b.emailForm,
            emailto: b.emailTo,
            ladiid: b.IDLadi
        }, function (a, b) {
            $(".parLoading").hide(), b && 200 == b.code ? PN_PAGE.messageLadi("Di chuyển Landing Page thành công") : b ? PN_PAGE.messageLadi(b.messager) : PN_PAGE.messageLadi("Vui lòng kiểm tra lại!")
        }) : ($(".parLoading").hide(), PN_PAGE.messageLadi("Vui lòng kiểm tra lại! Phải có id punnel hoặc domain của punnel"))
    }
}]);