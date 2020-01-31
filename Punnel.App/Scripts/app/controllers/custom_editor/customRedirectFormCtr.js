angular.module("punnelApp").controller("customRedirectFormCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "contact_form" == selectedItem.attr("pn-type")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.messageThanks = apiElement[a].message_form_post, c.messageThanks || (c.messageThanks = "Cám ơn bạn đã quan tâm", apiElement[a].message_form_post = "Cám ơn bạn đã quan tâm"), $('.pn-thanks-form input[pn-name="pageCustom"]').is(":checked") && $('.pn-thanks-form input[type="text"]').show()
        }
    }), c.updateMessageFrom = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].message_form_post = c.messageThanks, selectedItem.attr("pn-message-form", c.messageThanks)
        }
    }, c.setTypeForm = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].type_form = a, selectedItem.attr("pn-type-form", a), $(".form-setting .list .icon").removeClass("active"), $('.form-setting .list .icon[pn-active="' + a + '"]').addClass("active");
            var c = PN_PAGE.getElement('.widget-element[pn-type="contact_form"]');
            void 0 != c && c.length > 1 && c.each(function () {
                if ($(this).attr("id") != selectedItem.attr("id")) {
                    var b = PN_PAGE.getIndexElement($(this).attr("id"));
                    apiElement[b].type_form = a, $(this).attr("pn-type-form", a)
                }
            })
        }
    }, c.showAddFormGoogle = function () { }, c.showAddUrlPostForm = function () { }, c.show_setting_form_redirect = function () { }, c.close = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = selectedItem.attr("pn-type");
            $('.settings[pn-setting="' + a + '"]').addClass("active"), fadeOutAnimate($(".ngdialog.custom_redirect_form"))
        }
    }
}]);