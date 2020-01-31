angular.module("punnelApp").controller("configFormEmailCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", "$restful", function (a, b, c, d, e, f, g) {
    c.idTMP = "", c.emailForm = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id") && (c.idTMP = selectedItem.attr("id"), "contact_form" == selectedItem.attr("pn-type"))) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[a].configDataForm && apiElement[a].configDataForm.configs) {
                var b = $.grep(apiElement[a].configDataForm.configs, function (a) {
                    return 8 == a.type
                });
                c.emailForm = b.Email
            }
        }
    }), c.applyDone = function () {
        if (c.emailForm && c.emailForm.length > 0) {
            var b = {
                Type: 8,
                Email: c.emailForm
            };
            a.configFormServe || (a.configFormServe = []), a.configFormServe.push(b), c.emailForm = "", $("#configFormEmail").modal("hide"), $("#saveDataForms").modal("show")
        } else PN_PAGE.messageLadi("Vui lòng điền đẩy đủ dữ liệu để tiếp tục")
    }, c.backConfig = function () {
        $("#configFormEmail").modal("hide"), $("#saveDataForms").modal("show")
    }
}]);