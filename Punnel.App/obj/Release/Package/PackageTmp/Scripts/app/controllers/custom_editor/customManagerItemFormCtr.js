angular.module("punnelApp").controller("customManagerItemFormCtr", ["$rootScope", "$state", "$scope", "$window", function (a, b, c, d) {
    c.idTMP = "", c.listItem = [], a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id") && (c.idTMP = selectedItem.attr("id"), "contact_form" == selectedItem.attr("pn-type"))) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].positionItem && apiElement[a].positionItem.length > 0 ? c.listItem = c.resetposition(apiElement[a].positionItem) : (c.listItem = c.getPosition(), apiElement[a].positionItem = c.listItem), c.sortItemForm()
        }
    }), c.getPosition = function () {
        if (selectedItem && "contact_form" == selectedItem.attr("pn-type")) {
            var a = [],
                b = selectedItem.find('.widget-element[pn-type="item_form"]');
            return b && b.length > 0 && b.each(function (b) {
                var c = {
                    id: $(this).attr("id"),
                    name: $(this).find(".widget-content").eq(0).attr("name"),
                    valueName: $(this).find(".widget-content").eq(0).attr("pn-name-id") || $(this).find(".widget-content").eq(0).attr("name"),
                    vt: b
                };
                a.push(c)
            }), a
        }
        return !1
    }, c.sortItemForm = function () {
        $("#item-form-manager").sortable({
            distroy: !0
        }), $("#item-form-manager").sortable({
            axit: "y",
            stop: function (a, b) {
                if (selectedItem && "contact_form" == selectedItem.attr("pn-type")) {
                    var d = $("#item-form-manager .item-mana-form");
                    d && d.length > 0 && d.each(function (a) {
                        for (var b = 0; b < c.listItem.length; b++) c.listItem[b].id == $(this).attr("pn-active") && (c.listItem[b].vt = a)
                    });
                    var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                    apiElement[e].positionItem = c.listItem, console.log(c.listItem)
                }
            }
        })
    }, c.resetposition = function (a) {
        if (a && a.length > 0) {
            for (var b = [], c = 0; c < a.length; c++)
                for (var d = 0; d < a.length; d++)
                    if (a[d].vt == c) {
                        var e = {
                            id: a[d].id,
                            vt: a[d].vt,
                            name: a[d].name,
                            valueName: a[d].valueName
                        };
                        b.push(e)
                    }
            return a = b
        }
        return a
    };
    var e = this;
    e.reSetItemForm = function () {
        if (selectedItem && "contact_form" == selectedItem.attr("pn-type")) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].positionItem = c.resetposition(apiElement[a].positionItem), c.listItem = apiElement[a].positionItem
        }
    }, d.angularControllerreSetItemForm = e.reSetItemForm
}]);