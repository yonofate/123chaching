angular.module("punnelApp").controller("ladiFillterCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", function (a, b, c, d, e, f) {
    b.dateTo = new Date;
    var g = new Date;
    g.setDate(1), b.dateFrom = g, b.linkDown = "", b.searchData = function () {
        $(".parLoading").show(), f.post("/Statistical/LadiFillter", {
            form: b.dateFrom,
            to: b.dateTo
        }, function (a, c) {
            $(".parLoading").hide(), a ? PN_PAGE.messageLadi("Vui lòng thử lại hoặc liên hệ với chúng tôi!") : c && 200 == c.code ? b.linkDown = c.data : PN_PAGE.messageLadi(c.messager)
        })
    }
}]);