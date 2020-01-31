angular.module("punnelApp").controller("configFormApiCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", "$restful", function (a, b, c, d, e, f, g) {
    c.idTMP = "", c.urlApi = "", c.valueApiForm = [], a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id") && (c.idTMP = selectedItem.attr("id"), "contact_form" == selectedItem.attr("pn-type"))) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.urlApi = "", c.valueApiForm = apiElement[a].valueApiForm
        }
    }), c.changeValue = function (a, b) {
        if (selectedItem && "contact_form" == selectedItem.attr("pn-type")) {
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[d].valueApiForm[b].value = a, c.valueApiForm[b].value = a;
            var e = selectedItem.find('.widget-content[name="' + apiElement[d].valueApiForm[b].name + '"]').parent();
            d = PN_PAGE.getIndexElement(e.attr("id")), apiElement[d].name_form_id = a
        }
    }, c.applyDoneFormApi = function () {
        if (selectedItem && "contact_form" == selectedItem.attr("pn-type"))
            if (c.urlApi && c.urlApi.length > 0) {
                var b = (PN_PAGE.getIndexElement(selectedItem.attr("id")), {
                    Type: "api",
                    UrlApi: c.urlApi,
                    ValueApiForm: c.valueApiForm
                });
                a.configFormClient || (a.configFormClient = []), a.configFormClient.push(b), c.urlApi = "", $("#configFormAPI").modal("hide"), $("#saveDataForms").modal("show")
            } else PN_PAGE.messageLadi("Vui lòng điền đầy đủ dữ liệu để tiếp tục")
    }, c.backConfig = function () {
        $("#configFormAPI").modal("hide"), $("#saveDataForms").modal("show")
    }
}]);