angular.module("punnelApp").controller("custom_pluginhtmlCtr", ["$rootScope", "$scope", "$translate", "$stateParams", function (a, b, c, d) {
    c.use(localStorage.getItem("lang")), b.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && b.idTMP != selectedItem.attr("id") && "customhtml" == selectedItem.attr("pn-type")) {
            b.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].valuePluginHtml && apiElement[a].valuePluginHtml.length > 0 ? b.valueHtml = apiElement[a].valuePluginHtml : b.valueHtml = selectedItem.find(".widget-content").html(), b.javacript = apiElement[a].javascript;
            var c = $("#editor-custom-html");
            c.length > 0 && (b.javacript && b.javacript.length > 0 ? apiElement[a].valuePluginHtml && apiElement[a].valuePluginHtml.length > 0 ? c.find("textarea").val(apiElement[a].valuePluginHtml) : c.find("textarea").val(b.valueHtml + b.javacript) : c.find("textarea").val(b.valueHtml))
        }
    }), b.applyValue = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                c = $("#editor-custom-html textarea").val(),
                d = $("#editor-custom-html textarea").val(),
                e = $("#editor-custom-html textarea").val(),
                f = "";
            if (void 0 != c && "" != c && c.length > 0) {
                var g = e.match(/<script(.*?)<\/script>/g);
                if (void 0 != g && g.length > 0)
                    for (var h = 0; h < g.length; h++) f += g[h], e = e.replace(g[h], "")
            } else e = $("#editor-custom-html textarea").val();
            "undefined" == typeof $.base64 && ($.base64 = window.BASE64), apiElement[a].html = $.base64.encode(encodeURI(e)), apiElement[a].javascript = f.replace(/undefined/g, ""), b.javacript = apiElement[a].javascript, apiElement[a].valuePluginHtml = d, $("#custom-html").modal("hide")
        }
    }, b.close = function () {
        $(".ngdialog.custom_pluginhtml").remove()
    }
}]);