angular.module("punnelApp").controller("managerMailchimpCtr", ["$scope", "$stateParams", "$restful", function (a, b, c) {
    a.apiKey = "", a.nameMailManager = "", a.idKeyMailSelected = "", a.listapiKey = [], a.getListMail = function () {
        c.get("/User-Config/FindConfigMail", {
            type: 3,
            status: 1
        }, function (b, c) {
            c && 200 == c.code && (a.listapiKey = c.data)
        })
    }, a.addMailChimp = function () {
        c.post("/User-Config/AddConfigMail", {
            apiKey: a.apiKey,
            type: 3,
            name: a.nameMailManager
        }, function (b, c) {
            c && 200 == c.code && a.listapiKey.push(c.data)
        })
    }, a.editMailChimp = function () {
        c.post("/User-Config/EditConfigMail", {
            apiKey: a.apiKey,
            type: 3,
            name: a.nameMailManager,
            id: a.idMailSelect
        }, function (b, c) {
            c && 200 == c.code && a.getListMail()
        })
    }, a.deleteMailChimp = function () {
        c.post("/User-Config/DeleteConfigMail", {
            id: a.idMailSelect
        }, function (b, c) {
            c && 200 == c.code && (a.getListMail(), a.apiKey = "", a.nameMailManager = "", a.idKeyMailSelected = "")
        })
    }, a.selectedItemKey = function (b) {
        a.idKeyMailSelected = b.id, a.apiKey = b.apiKey, a.nameMailManager = b.name
    }, a.applyDone = function () {
        $("#modal-manager-mailchimp").modal("hide"), $("#my-modal-send-form").modal("show")
    }
}]);