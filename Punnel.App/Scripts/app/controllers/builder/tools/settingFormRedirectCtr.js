angular.module("punnelApp").controller("settingFormRedirectCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", function (a, b, c, d, e, f) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "contact_form" == selectedItem.attr("pn-type")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.urlPost = apiElement[a].url_form_google, void 0 == c.urlPost && (c.urlPost = "", apiElement[a].url_form_google = ""), void 0 == apiElement[a].settingsForm && (apiElement[a].settingsForm = {}), c.listItemsFormUser = apiElement[a].item_form, c.listItemsFormUrl = apiElement[a].settingsForm.items, c.valueSelectItemForm = ""
        }
    });
    var g = function (a) {
        $(".dialog_lp_error p").text(a), $(".dialog_lp_error").show(), f(function () {
            $(".dialog_lp_error").hide()
        }, 2e3)
    };
    c.dem = 0, c.changeValueSelect = function (a, b) {
        for (var d = 0; d < c.listItemsFormUrl.length; d++) c.listItemsFormUrl[d].id == a && (c.listItemsFormUser[b].nameFormUrl = c.listItemsFormUrl[d].name, c.listItemsFormUrl[d].nameFormUser = c.listItemsFormUser[b].name)
    }, c.changeUrlPost = function () {
        if (selectedItem && selectedItem.length > 0) {
            c.dem = 1;
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.listItemsFormUser = apiElement[a].item_form
        }
    }, c.changeValueUrlPost = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].url_form_google = c.urlPost;
            var b = PN_PAGE.getElement('.widget-element[pn-type="contact_form"]');
            void 0 != b && b.length > 1 && b.each(function () {
                if ($(this).attr("id") != selectedItem.attr("id")) {
                    var a = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[a].url_form_google = c.urlPost
                }
            }), c.dem = 0
        }
    }, c.applyDone = function () {
        if (selectedItem && selectedItem.length > 0)
            if (1 == c.dem) {
                var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[a].item_form = c.listItemsFormUser, apiElement[a].settingsForm.items = c.listItemsFormUrl, selectedItem.attr("pn-action", apiElement[a].settingsForm.action), selectedItem.attr("pn-data-form", JSON.stringify(apiElement[a].settingsForm));
                var b = PN_PAGE.getElement('.widget-element[pn-type="contact_form"]');
                void 0 != b && b.length > 1 && b.each(function () {
                    if ($(this).attr("id") != selectedItem.attr("id")) {
                        var a = PN_PAGE.getIndexElement($(this).attr("id"));
                        apiElement[a].item_form = c.listItemsFormUser, apiElement[a].settingsForm.items = c.listItemsFormUrl, $(this).attr("pn-action", apiElement[a].settingsForm.action), $(this).attr("pn-data-form", JSON.stringify(apiElement[a].settingsForm))
                    }
                }), fadeOutAnimate($(".ngdialog.setting_from_redirect"))
            } else g("Please click to Campaign")
    }, c.close = function () {
        fadeOutAnimate($(".ngdialog.setting_from_redirect"))
    }
}]);