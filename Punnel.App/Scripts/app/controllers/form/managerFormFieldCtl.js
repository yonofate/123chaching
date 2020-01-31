angular.module("punnelApp").controller("managerFormFieldCtl", ["$rootScope", "$state", "$scope", "$window", "$mdDialog", function (a, b, c, d, $mdDialog) {
    c.idTMP = "", c.itemForm = [], a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id") && (c.idTMP = selectedItem.attr("id"), "contact_form" == selectedItem.attr("pn-type"))) {
            c.itemForm = [];
            for (var a = PN_PAGE.getIndexElement(selectedItem.attr("id")), b = 0; b < type_field_form.length; b++) type_field_form[b].using = "true";
            for (var b = 0; b < type_field_form.length; b++)
                for (var d = 0; d < apiElement[a].item_form.length; d++) type_field_form[b].name == apiElement[a].item_form[d].name && (type_field_form[b].using = "false", type_field_form[b].required = apiElement[a].item_form[d].required);
            c.itemForm = type_field_form
        }
    }), c.changePlace = function (a, b) {
        var c = $(a.target).val();
        if (selectedItem && selectedItem.length > 0) {
            var d = selectedItem.find('[name="' + b + '"]');
            if (d && d.length > 0) {
                var e = PN_PAGE.getIndexElement(d.parent().attr("id"));
                apiElement[e].placeholder_form = c, d.attr("placeholder", c)
            }
        }
    }, c.removeRequired = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = selectedItem.find('[name="' + a + '"]');
            if (b && b.length > 0) {
                var d = PN_PAGE.getIndexElement(b.parent().attr("id"));
                apiElement[d].required_form = "false"
            }
            "contact_form" == selectedItem.attr("pn-type");
            for (var e = 0; e < c.itemForm.length; e++) c.itemForm[e].name == a && (c.itemForm[e].required = "false")
        }
    }, c.addRequired = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = selectedItem.find('[name="' + a + '"]');
            if (b && b.length > 0) {
                var d = PN_PAGE.getIndexElement(b.parent().attr("id"));
                apiElement[d].required_form = "true"
            }
            for (var e = 0; e < c.itemForm.length; e++) c.itemForm[e].name == a && (c.itemForm[e].required = "true")
        }
    }, c.removeItemForm = function (a) {
        if (selectedItem && "contact_form" == selectedItem.attr("pn-type")) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[b].item_form.length > 1) {
                for (var e = 0; e < apiElement[b].item_form.length; e++)
                    if (apiElement[b].item_form[e].name == a) {
                        apiElement[b].item_form.splice(e, 1);
                        break
                    }
                if (apiElement[b].valueApiForm && apiElement[b].valueApiForm.length > 0)
                    for (var f = 0; f < apiElement[b].valueApiForm.length; f++)
                        if (apiElement[b].valueApiForm[f].name == a) {
                            apiElement[b].valueApiForm.splice(f, 1);
                            break
                        }
                var g = selectedItem.find('.widget-content[name="' + a + '"]'),
                    h = g.outerHeight();
                if (apiElement[b].positionItem) {
                    var i = $.grep(apiElement[b].positionItem, function (a) {
                        return a.id == g.parent().attr("id")
                    });
                    console.log(i[0]);
                    var j = 0;
                    if (i && i.length > 0)
                        for (var k = 0; k < apiElement[b].positionItem.length; k++) parseFloat(i[0].vt) < parseFloat(apiElement[b].positionItem[k].vt) && (apiElement[b].positionItem[k].vt = parseFloat(apiElement[b].positionItem[k].vt) - 1), apiElement[b].positionItem[k].id == g.parent().attr("id") && (j = k), k == apiElement[b].positionItem.length - 1 && (apiElement[b].positionItem.splice(j, 1), d.angularControllerreSetItemForm())
                }
                g.parent().remove();
                var l = new OptionWiget;
                l.sortWg(), l.resetWidgetItemChild(selectedItem);
                var m = $('#punnel-editor .widget-element[pn-parent="' + selectedItem.attr("id") + '"]');
                if (m && m.length > 0) {
                    var n = parseFloat(m.css("top"));
                    m.css({
                        top: n - h + "px"
                    });
                    var b = PN_PAGE.getIndexElement(m.attr("id"));
                    apiElement[b].media[deviceEdit].top = m.css("top")
                }
                c.resetFieldFrom(a, "true", "delete")
            }
        }
    }, c.addItemForm = function (a) {
        if (selectedItem && "contact_form" == selectedItem.attr("pn-type")) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                d = {
                    name: a,
                    value: a
                };
            apiElement[b].item_form.push(d), c.resetFieldFrom(a, "false", "");
            for (var e = 0, f = 0; f < type_field_form.length; f++)
                if (type_field_form[f].name == a) {
                    e = f;
                    break
                }
            c.addItemFormNew(selectedItem, e);
            var g = new ShowBoxResize;
            g.showBox(selectedItem)
        }
    }, c.resetFieldFrom = function (a, b, c) {
        for (var d = 0; d < type_field_form.length; d++) type_field_form[d].name == a && (type_field_form[d].using = b)
        },
        c.addItemFormNew = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            var c = selectedItem.outerHeight(),// + 10,
                e = 0,
                f = PN_PAGE.getIndexElement(a.attr("id"));
            apiElement[f].item_form.unshift(type_field_form[b]), itemFieldFormUsing = apiElement[f].item_form;
            var g = PN_PAGE.getElement('.widget-element[pn-parent="' + a.attr("id") + '"]'),
                h = parseFloat(g.css("top")) - parseFloat(a.css("top")) - parseFloat(a.outerHeight()),
                i = new AddToFrame;

            var item_base = a.find(".widget-content:eq(0)").find(".widget-item-child:eq(0)")[0];

            var item_base_1 = a.find(".widget-content:eq(0)").find(".widget-item-child:eq(1)")[0];
            var item_base_index = PN_PAGE.getIndexElement($(item_base).attr("id"));

            var kc = 10;
            if (item_base && item_base_1) {
                kc= ($(item_base_1).offset().top - $(item_base).offset().top - $(item_base).height());
            }
            c = c + kc;

            a.find(".widget-content:eq(0)").append(valueTemplate.item_form);
            var j = a.find("#pn-new");

            j.append(type_field_form[b].html), void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain && (e = dummyData.numLayerMain),
                j.attr("id", j.attr("pn-lang") + "" + e),
                e++ ,
                dummyData.numLayerMain = e,
                j.css({
                    top: c + "px",
                    left: "0px"
                }), ("message" == type_field_form[b].type || "note" == type_field_form[b].type || "comment" == type_field_form[b].type) && j.css({
                    height: "180px",
                    width: item_base.offsetWidth,
                    top: c + "px"
                }),
                ($.inArray(type_field_form[b].html_type, ["input", "select"])>=0) && (j.css({
                height: item_base.offsetHeight,
                width: item_base.offsetWidth
                }),
                    j.find(".widget-content").eq(0).append("<option>" + type_field_form[b].placeholder + "</option>")), j.find(".widget-content").css({
                        color: apiElement[f].media.desktop["color"],
                        background: apiElement[f].media.desktop["background-color"],
                        border: "1px solid " + apiElement[f].media.desktop["border-color"],
                        "font-size": apiElement[f].media.desktop["font-size"]
                    }),
                i.apiDefault("item_form", "widget-element", j.attr("id"), "", j.css("top"), j.css("left"), j.css("width"), j.css("height"));
            var k = PN_PAGE.getIndexElement(j.attr("id"));
            apiElement[k].type_form = type_field_form[b].type, apiElement[k].placeholder_form = type_field_form[b].placeholder, apiElement[k].name_form = type_field_form[b].name, apiElement[k].label_form = type_field_form[b].label, apiElement[k].required_form = type_field_form[b].required, apiElement[k].html_form = type_field_form[b].html, apiElement[k].name_form_id = type_field_form[b].name;
            apiElement[k].media.desktop["color"] = apiElement[item_base_index].media.desktop["color"],
                    apiElement[k].media.desktop["background-color"] = apiElement[item_base_index].media.desktop["background-color"],
                apiElement[k].media.desktop["border-color"] = apiElement[item_base_index].media.desktop["border-color"];
            apiElement[k].media.desktop["border-top"] = apiElement[item_base_index].media.desktop["border-top"];
            apiElement[k].media.desktop["border-left"] = apiElement[item_base_index].media.desktop["border-left"];
            apiElement[k].media.desktop["border-right"] = apiElement[item_base_index].media.desktop["border-right"];
            apiElement[k].media.desktop["border-bottom"] = apiElement[item_base_index].media.desktop["border-bottom"];
            apiElement[k].media.desktop["border-style"] = apiElement[item_base_index].media.desktop["border-style"];

            apiElement[k].media.mobile["color"] = apiElement[item_base_index].media.desktop["color"],
                apiElement[k].media.mobile["background-color"] = apiElement[item_base_index].media.desktop["background-color"],
                apiElement[k].media.mobile["border-color"] = apiElement[item_base_index].media.desktop["border-color"];
            apiElement[k].media.mobile["border-top"] = apiElement[item_base_index].media.desktop["border-top"];
            apiElement[k].media.mobile["border-left"] = apiElement[item_base_index].media.desktop["border-left"];
            apiElement[k].media.mobile["border-right"] = apiElement[item_base_index].media.desktop["border-right"];
            apiElement[k].media.mobile["border-bottom"] = apiElement[item_base_index].media.desktop["border-bottom"];
            apiElement[k].media.mobile["border-style"] = apiElement[item_base_index].media.desktop["border-style"];
            

            j.find(".widget-content").css({
                color: apiElement[f].media.desktop["color"],
                background: apiElement[f].media.desktop["background-color"],
                border: "1px solid " + apiElement[f].media.desktop["border-color"],
                "font-size": apiElement[f].media.desktop["font-size"]
            });

            var l = new OptionWiget;
            l.resetWidgetItemChild(a), l.setValueNewItem(j);
            var m = parseFloat(a.css("top")) + parseFloat(a.css("height")) + parseFloat(h) + "px";
            f = PN_PAGE.getIndexElement(g.attr("id")), apiElement[f].media[deviceEdit].top = m, g.css({
                top: m
            });
           

            var n = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                o = {
                    vt: apiElement[n].positionItem.length,
                    id: j.attr("id"),
                    name: j.find(".widget-content").eq(0).attr("name"),
                    valueName: j.find(".widget-content").eq(0).attr("name")
                };
            apiElement[n].positionItem.push(o), d.angularControllerreSetItemForm()
        }
    }, c.sortWithTop = function (a, b) {
        if (b && b.length > 0 && "contact_form" == b.attr("pn-type") && a && a.length > 0 && "item_form" == a.attr("pn-type")) {
            var c = b.find('.widget-element[pn-type="item_form"]');
            if (c && c.length > 0) {
                a.offset().top;
                c.each(function () {
                    $(this).offset().top > a.offset().top
                })
            }
        }
        }
        ,
        c.cancel = function () {
            $mdDialog.cancel();
        }

    c.hide = function (res) {
        $mdDialog.hide(res);
    }
}]);