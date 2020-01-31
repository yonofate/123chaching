angular.module("punnelApp").controller("customItemFormCtr", ["$scope", "$rootScope", function (a, b) {
    a.idTMP = "", a.checkSelect = "", a.showNameId = "false", a.nameItemForm = "", b.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && a.idTMP != selectedItem.attr("id") && "item_form" == selectedItem.attr("pn-type")) {
            a.idTMP = selectedItem.attr("id");
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            a.nameItemForm = selectedItem.find(".widget-content").eq(0).attr("name"), a.name = apiElement[b].name_form_id, a.name && a.name.length > 0 && (a.name = PN_PAGE.resetText(a.name), apiElement[b].name_form_id = PN_PAGE.resetText(a.name), -1 != a.nameItemForm.search("select") ? a.checkSelect = "true" : a.checkSelect = "false"), a.placeholder = apiElement[b].placeholder_form, a.required = apiElement[b].required_form, $(".bootstrap-tagsinput .label-info").remove(), apiElement[b].value_form && apiElement[b].value_form.length > 0 && a.setValueHtmlTag(apiElement[b].value_form)
        }
    }), a.setValue = function (b) {
        var c = b.which;
        if (13 == c) {
            var d = $(b.target).val().trim();
            if (selectedItem && selectedItem.length > 0 && d && d.length > 0) {
                var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                $.isArray(apiElement[e].value_form) || (apiElement[e].value_form = []), apiElement[e].value_form.push(d), $(".bootstrap-tagsinput .label-info").remove(), a.setValueHtmlTag(apiElement[e].value_form), $(b.target).val("")
            }
        }
    }, a.setRequired = function (b) {
        if (a.required = b, selectedItem && selectedItem.length > 0) {
            var c = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[c].required_form = a.required
        }
    }, a.setPlaceholder = function () {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].placeholder_form = a.placeholder, selectedItem.find(".widget-content").eq(0).attr("placeholder", a.placeholder);
            var c = selectedItem.find(".widget-content:eq(0)"); -1 != c.attr("name").search("select") && c.find("option:eq(0)").text(a.placeholder)
        }
    }, a.setName = function () {
        if (a.name.length > 0 && (a.name = PN_PAGE.resetText(a.name), selectedItem && selectedItem.length > 0)) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].name_form_id = a.name;
            var c = selectedItem.parent().parent();
            if (c && "contact_form" == c.attr("pn-type") && (b = PN_PAGE.getIndexElement(c.attr("id")), apiElement[b].valueApiForm && apiElement[b].valueApiForm.length > 0))
                for (var d = 0; d < apiElement[b].valueApiForm.length; d++) apiElement[b].valueApiForm[d].name == a.nameItemForm && (apiElement[b].valueApiForm[d].value = a.name)
        }
    }, a.setValueHtmlTag = function (b) {
        var c = $(".bootstrap-tagsinput");
        if (b && b.length > 0) {
            for (var d = "", e = 0; e < b.length; e++) d += '<span class="tag label label-info">' + b[e] + '<span data-role="remove"></span></span>';
            c && c.length > 0 && c.prepend(d)
        }
        a.removeItemTag()
    }, a.getValueForm = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                b = $(".bootstrap-tagsinput .label-info");
            b && b.length > 0 && (apiElement[a].value_form = [], b.each(function () {
                apiElement[a].value_form.push($(this).text())
            }))
        }
    }, a.removeItemTag = function () {
        var b = $(".bootstrap-tagsinput .label-info.tag");
        b.unbind("click").click(function (b) {
            b.preventDefault(), $(this).remove(), a.getValueForm()
        })
    }
}]);