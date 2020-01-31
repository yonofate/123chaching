angular.module("punnelApp").controller("xuatFileUserCtrl", ["$state", "$scope", "$translate", "$stateParams", "$auth", "$restful", "$http", "$auth", function (a, b, c, d, e, f, g, e) {
    b.searchName = "", b.searchNamePart = "", b.typeTK = "0", b.dateTo = new Date;
    var h = new Date;
    h.setDate(1), b.dateFrom = h, b.checkLoad = !1, b.count = 0, b.urlFileExcelDownload = "", b.codeRef = "", b.type = "1", b.listEmail = [], b.emailListItem = "", b.urlFileExcelDownloadByEmail = "", b.settype = function () { }, b.getListEmail = function (a) {
        b.emailListItem = $(a.target).val(), b.listEmail = b.emailListItem.split("\n")
    }, b.creatExcel = function () {
        f.post("/Statistical/StatisticalCRM", {
            form: b.dateFrom,
            to: b.dateTo,
            type: parseFloat(b.type),
            ref: b.codeRef
        }, function (a, c) {
            c && 200 == c.code && (b.urlFileExcelDownload = c.data)
        })
    }, b.byEmail = function () {
        f.post("/Statistical/StatistiaclByEmails", {
            emails: b.listEmail
        }, function (a, c) {
            c && 200 == c.code && (b.urlFileExcelDownloadByEmail = c.data)
        })
    }
}]);