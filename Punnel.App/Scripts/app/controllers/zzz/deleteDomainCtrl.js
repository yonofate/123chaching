angular.module("punnelApp").controller("deleteDomainCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    b.domainDl = "", b.checkdomail = function () {
        $(".parLoading").show(), f.post("/Statistical/CheckDomainUser", {
            domain: b.domainDl
        }, function (a, b) {
            $(".parLoading").hide(), a ? PN_PAGE.messageLadi(a) : PN_PAGE.messageLadi(b.messager)
        })
    }, b.deleteDomain = function () {
        $(".parLoading").show(), f.post("/Statistical/DeleteDomainverified", {
            domain: b.domainDl
        }, function (a, c) {
            $(".parLoading").hide(), a ? PN_PAGE.messageLadi("Vui lòng thử lại hoặc liên hệ với chúng tôi!") : c && 200 == c.code ? (PN_PAGE.messageLadi("Đã xóa domain!"), b.domainDl = "") : PN_PAGE.messageLadi(c.messager)
        })
    }
}]);