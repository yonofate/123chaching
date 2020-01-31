var WindowResize = function() {};
WindowResize.prototype.init = function() {
    this.dropElementEditor(), $(window).unbind("beforeunload").bind("beforeunload", function() {
        return 1 != pageSave ? "Some changes are not save!" : void 0
    });
    var a = $(window).outerWidth(),
        b = $("#TOP-NUMBER");
    b.html("");
    var c = Math.ceil(a / 100);
    b.html("");
    for (var d = 0; c > d; d++) b.append("<p>" + 100 * d + "</p>");
    $(window).resize(function(a) {
        var c = PN_PAGE.PUNNEL_EDIT,
            d = c.contents().find('.widget-section[pn-popup="true"]');
        void 0 != d && d.length > 0 && d.each(function() {
            $(this).css({
                height: $(window).outerHeight() + "px"
            })
        }), $("#ID_BOX_RESIZE_POPUP").hide(), $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide();
        var e = PN_PAGE.getElement(".container");
        if ("desktop" == deviceEdit) {
            var f = $(".cover").outerWidth();
            $(".follow2").css({
                left: f / 2 + "px"
            }), $(".follow1").css({
                left: f / 2 - 480 + "px"
            }), $(".follow3").css({
                left: f / 2 + 480 + "px"
            })
        } else if (e.length > 0) {
            var g = e.eq(0).offset().left + PN_PAGE.PUNNEL_EDIT.offset().left;
            $(".follow1").css({
                left: g + "px"
            }), $(".follow2").css({
                left: g + 160 + "px"
            }), $(".follow3").css({
                left: g + 320 + "px"
            }), $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide()
        }
        var h = $(window).width(),
            i = Math.ceil(h / 100);
        b.html("");
        for (var j = 0; i > j; j++) b.append("<p>" + 100 * j + "</p>");
        var k = new OptionWiget;
        k.showButtonAddSection()
    }), $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide()
};
var settings = function() {
    if (selectedItem && selectedItem.length > 0) {
        var a = angular.element(document.body).scope(),
            b = a.$root;
        b.id = "", b.$apply(function() {
            b.id = selectedItem.attr("id")
        })
    }
};
WindowResize.prototype.dropElementEditor = function() {
    var a = PN_PAGE.getElement('.widget-element[pn-type="slider"],.widget-element[pn-type="box"],.widget-element[pn-type="button"], .widget-element[pn-type="image"], .widget-section');
    a.each(function() {
        $(this).droppable({
            destroy: !0
        })
    }), a.droppable({
        drop: function(a, b) {
            if (dragPlugin) {
                var c = new AddToFrame;
                c.addElementDrag(), dragSec = !0, dragPlugin = !1, pageYSec = a.pageY
            } else {
                dragSec = !1;
                var d, e = new OptionWiget;
                if (d = e.getParentElement(selectedItem), PN_PAGE.checkItemSlider($(this))) {
                    if (selectedItem && selectedItem.length > 0 && selectedItem.attr("id") != $(this).attr("id") && d.attr("id") != $(this).attr("id") && "GROUP_TMP" != selectedItem.attr("id") && "important" != selectedItem.attr("pn-type-background"))
                        if (selectedItem.attr("pn-group") && selectedItem.attr("pn-group").length > 0 || selectedItem.hasClass("widget-item-child") || "item_slider" == selectedItem.attr("pn-type"));
                        else {
                            var f, g, h = void 0,
                                i = "";
                            if ("hidden" != $(this).css("visibility") && ("button" == $(this).attr("pn-type") && "shape" == selectedItem.attr("pn-type") || "button" != $(this).attr("pn-type"))) {
                                if ($(this).hasClass("widget-section")) {
                                    h = $(this).find(".container").eq(0), i = "#" + $(this).attr("id") + " .container:eq(0)";
                                    var j = $(".resizable-popup");
                                    j && "none" != j.css("display") && (h = $("#" + j.attr("pn-id-popup")).find(".container").eq(0), i = "#" + j.attr("pn-id-popup") + " .container:eq(0)")
                                } else if ("slider" == $(this).attr("pn-type")) {
                                    var k = $(this).find(".wrap-child").eq(0),
                                        l = parseFloat(k.css("left")),
                                        m = Math.round((0 - l) / $(this).outerWidth());
                                    h = $(this).find('.widget-element[pn-type="item_slider"]').eq(m).find(".widget-content").eq(0), i = "#" + h.parent().attr("id") + " .widget-content:eq(0)"
                                } else h = $(this).find(".widget-content").eq(0), i = "#" + $(this).attr("id") + " .widget-content:eq(0)";
                                if (checkChild(selectedItem, $(this)) && !selectedItem.attr("pn-parent") && "desktop" == deviceEdit) {
                                    var n = selectedItem.find($(this));
                                    if (n && n.length > 0);
                                    else {
                                        var o = parseFloat($(this).css("padding"));
                                        o || (o = 0), f = selectedItem.offset().top - h.offset().top + o, g = selectedItem.offset().left - h.offset().left + o;
                                        h.find("#" + selectedItem.attr("id"));
                                        selectedItem.css({
                                            top: f + "px",
                                            left: g + "px"
                                        }), h.append(selectedItem);
                                        var p = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                                        if (apiElement[p].media[deviceEdit].top = f + "px", apiElement[p].media[deviceEdit].left = g + "px", apiElement[p].parent = i, "contact_form" == selectedItem.attr("pn-type")) {
                                            var q = $('.widget-element[pn-parent="' + selectedItem.attr("id") + '"]');
                                            q && q.length > 0 && (f = q.offset().top - h.offset().top, g = q.offset().left - h.offset().left, p = PN_PAGE.getIndexElement(q.attr("id")), apiElement[p].media[deviceEdit].top = f + "px", apiElement[p].media[deviceEdit].left = g + "px", apiElement[p].parent = i, h.append(q), q.css({
                                                top: f + "px",
                                                left: g + "px"
                                            }))
                                        }
                                        selectedItem.css({
                                            visibility: "visible"
                                        }), selectedItem.find(".widget-element").css({
                                            visibility: "visible"
                                        }), resetSizeElementParent($(this))
                                    }
                                }
                            }
                        }
                    $("#punnel-editor .parent-droped").removeClass("parent-droped")
                }
            }
        }
    })
};