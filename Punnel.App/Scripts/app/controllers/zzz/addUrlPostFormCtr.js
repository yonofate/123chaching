angular.module("punnelApp").controller("addUrlPostFormCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "contact_form" == selectedItem.attr("pn-type")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.messageThanks = apiElement[a].message_form_post, c.urlPost = apiElement[a].url_form_post, (void 0 == c.messageThanks || "" == c.messageThanks) && (c.messageThanks = "Thanks you!", apiElement[a].message_form_post = "Thanks you!"), void 0 == c.urlPost && (c.urlPost = "", apiElement[a].url_form_post = "")
        }
    }), c.changeUrlPost = function () {
        var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[a].url_form_post = c.urlPost, selectedItem.attr("pn-action", c.urlPost);
        var b = PN_PAGE.getElement('.widget-element[pn-type="contact_form"]');
        void 0 != b && b.length > 1 && b.each(function () {
            if ($(this).attr("id") != selectedItem.attr("id")) {
                var a = PN_PAGE.getIndexElement($(this).attr("id"));
                apiElement[a].url_form_post = c.urlPost, $(this).attr("pn-action", c.urlPost)
            }
        })
    }, c.applyDone = function () {
        var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[a].url_form_post = c.urlPost, selectedItem.attr("pn-action", c.urlPost), $(".ngdialog.add_url_post_form").remove();
        var b = PN_PAGE.getElement('.widget-element[pn-type="contact_form"]');
        void 0 != b && b.length > 1 && b.each(function () {
            if ($(this).attr("id") != selectedItem.attr("id")) {
                var a = PN_PAGE.getIndexElement($(this).attr("id"));
                apiElement[a].url_form_post = c.urlPost, $(this).attr("pn-action", c.urlPost)
            }
        })
    }
}]);