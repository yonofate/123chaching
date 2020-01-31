angular.module("punnelApp").controller("changeEmailCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    b.emailOld = "", b.codeNew = "", b.changeEmail = function () {
        $(".parLoading").show(), b.emailOld && b.emailOld.length > 0 && b.codeNew && b.codeNew.length > 0 ? f.post("/Statistical/ChangeEmail", {
            emailold: b.emailOld,
            emailnew: b.codeNew
        }, function (a, b) {
            $(".parLoading").hide(), b && 200 == b.code ? PN_PAGE.messageLadi("Đổi Email thành công") : b ? PN_PAGE.messageLadi(b.messager) : PN_PAGE.messageLadi("Vui lòng kiểm tra lại!")
        }) : ($(".parLoading").hide(), PN_PAGE.messageLadi("Vui lòng kiểm tra lại!"))
    }
}]);