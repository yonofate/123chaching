angular.module("punnelApp").controller("khoiphucCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    b.emailForm = "", b.IDLadi = "", b.source = "", b.changeSource = function (a) {
        b.source = $(a.target).val()
    }, b.applyDone = function () {
        $(".parLoading").show(), b.emailForm && b.emailForm.length > 0 || b.IDLadi && b.IDLadi.length > 0 ? f.post("/Statistical/restoreLadi", {
            id: b.IDLadi,
            email: b.emailForm,
            source: b.source
        }, function (a, b) {
            $(".parLoading").hide(), a ? PN_PAGE.messageLadi("Đã xảy ra lỗi. Vui lòng thử lại") : b && 200 == b.code ? PN_PAGE.messageLadi("Khôi phục thành công") : PN_PAGE.messageLadi(b.messager)
        }) : ($(".parLoading").hide(), PN_PAGE.messageLadi("Vui lòng kiểm tra lại! Phải có id punnel hoặc domain của punnel"))
    }
}]);