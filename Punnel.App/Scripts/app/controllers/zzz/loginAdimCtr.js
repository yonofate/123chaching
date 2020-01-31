angular.module("punnelApp").controller("loginAdimCtr", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    interval && clearInterval(interval), b.email = "", b.pass = "", b.submit = function () {
        b.functionSubmit()
    }, b.functionSubmit = function () {
        b.formSubmit.$valid && f.post("/auth/sign-in", {
            email: b.email,
            password: b.pass
        }, function (b, c) {
            c && 200 == c.code ? (e.setUser(c.data), a.go("admin-manager")) : c ? PN_PAGE.messageLadi(c.messager) : PN_PAGE.messageLadi(b.message)
        })
    }, b.getKeyDown = function (a) {
        var c = a.which || a.keyCode;
        13 === c && b.functionSubmit()
    }
}]);