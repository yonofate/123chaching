angular.module("punnelApp").controller("configDataGoogleFormCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", "$restful", function (a, b, c, d, e, f, g) {
    c.urlPost = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id") && (c.idTMP = selectedItem.attr("id"), "contact_form" == selectedItem.attr("pn-type"))) {
            PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.listItemsFormUser = c.getItemForm()
        }
    }), c.getItemForm = function () {
        var a = [];
        if (selectedItem && "contact_form" == selectedItem.attr("pn-type")) {
            var b = selectedItem.find('.widget-element[pn-type="item_form"]');
            b && b.length > 0 && b.each(function () {
                var b = "";
                b = $(this).find(".widget-content").attr("pn-name-id") && $(this).find(".widget-content").attr("pn-name-id").length > 0 ? $(this).find(".widget-content").attr("pn-name-id") : $(this).find(".widget-content").attr("name");
                var c = {
                    id: $(this).attr("id"),
                    name: b
                };
                a.push(c)
            })
        }
        return a
    }, c.changeUrlPost = function () {
        selectedItem && "contact_form" == selectedItem.attr("pn-type") && g.get("/user-access/getHtmlFromLink", {
            link: c.urlPost
        }, function (a, b) {
            if (a);
            else if (b && 200 == b.code) {
                var d = $(b.data),
                    e = [],
                    f = d.find('[name*="entry"]');
                f.each(function () {
                    var a = {
                        name: "",
                        id: $(this).attr("name")
                    };
                    e.push(a)
                });
                var g = d.find("[aria-label]");
                g.each(function (a) {
                    a < e.length && (e[a].name = $(this).attr("aria-label"))
                }), c.listItemsFormUrl = e, c.fvv = d.find('[name="fvv"]').attr("value"), c.draftResponse = d.find('[name="draftResponse"]').attr("value"), c.pageHistory = d.find('[name="pageHistory"]').attr("value"), c.fbzx = d.find('[name="fbzx"]').attr("value"), c.action = d.find("form").attr("action"), PN_PAGE.messageLadi("Lựa chọn các trường phù hợp với form của bạn rồi nhấn SỬ DỤNG")
            } else PN_PAGE.messageLadi(b.messager)
        })
    }, c.changeValueSelect = function (a, b) {
        selectedItem && "contact_form" == selectedItem.attr("pn-type") && (c.listItemsFormUser[a].idGoogleForm = b)
    }, c.applyDoneGoogleForm = function () {
        if (selectedItem && "contact_form" == selectedItem.attr("pn-type"))
            if (c.action && c.action.length > 0) {
                var b = {
                    Type: "google-form",
                    List: c.listItemsFormUser,
                    Fvv: c.fvv,
                    DraftResponse: c.draftResponse,
                    PageHistory: c.pageHistory,
                    Action: c.action,
                    Fbzx: c.fbzx
                };
                a.configFormClient || (a.configFormClient = []), a.configFormClient.push(b), c.urlPost = "", c.listItemsFormUser = [], c.getItemForm(), $("#configFormGoogleForm").modal("hide"), $("#saveDataForms").modal("show")
            } else PN_PAGE.messageLadi("Vui lòng điền đầy đủ dữ liệu để tiếp tục")
    }, c.backConfig = function () {
        $("#configFormGoogleForm").modal("hide"), $("#saveDataForms").modal("show")
    }
}]);