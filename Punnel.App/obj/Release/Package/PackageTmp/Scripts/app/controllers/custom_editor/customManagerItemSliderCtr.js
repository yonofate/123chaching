angular.module("punnelApp").controller("customManagerItemSliderCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.idTMP = "", a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id"), c.itemsSlider = [];
            PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.getItemSlder()
        } else if (selectedItem && selectedItem.length > 0 && "item_slider" == selectedItem.attr("pn-type")) {
            $("#punnel-editor .widget-element.selected").removeClass("selected"), selectedItem = $("#punnel-editor #" + selectedItem.parent().parent().parent().attr("id")).addClass("selected");
            var a = new IframeClick;
            a.addClassSelected(selectedItem);
            var b = new ShowBoxResize;
            b.showBox(selectedItem), c.getItemSlder()
        }
    }), c.cloneSlider = function (a, b) {
        if (b.stopPropagation(), selectedItem && selectedItem.length > 0 && "slider" == selectedItem.attr("pn-type")) {
            var d = selectedItem.attr("id"),
                e = $("#punnel-editor #" + a),
                f = PN_PAGE.getIndexElement(a),
                g = JSON.stringify(apiElement[f]),
                h = (PN_PAGE.getIndexElement(selectedItem.attr("id")), 0);
            new AddToFrame;
            selectedItem.find(".widget-content:eq(0) .wrap-child:eq(0)").append(valueTemplate.item_slider);
            var i = selectedItem.find("#pn-new");
            void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain && (h = dummyData.numLayerMain), i.attr("id", i.attr("pn-lang") + "" + h), i.css({
                top: "0px",
                width: selectedItem.css("width"),
                height: "100%"
            }), h++, dummyData.numLayerMain = h, g = JSON.parse(g), g.id = i.attr("id"), apiElement.push(g);
            var j = selectedItem.find(".wrap-child").eq(0),
                k = j.offset().left;
            k -= i.offset().left, selectedItem.find(".widget-element").css({
                visibility: "visible"
            }), j.animate({
                left: k + "px"
            }), c.getItemSlder(), $("#punnel-editor .widget-element.selected").removeClass("selected"), selectedItem = $("#punnel-editor #" + d).addClass("selected");
            var l = new ShowBoxResize;
            l.showBox(selectedItem);
            var m = new setStyleElement;
            m.setStyleItem(apiElement[apiElement.length - 1], "desktop");
            var n = e.find(".widget-content:eq(0)").html();
            i.find(".widget-content").eq(0).html(n);
            var o = i.find(".widget-element");
            o && o.length > 0 && o.each(function () {
                h++, dummyData.numLayerMain = h;
                var a = {},
                    b = $(this).attr("id"),
                    c = PN_PAGE.getIndexElement(b);
                a = $.extend({}, apiElement[c]), $(this).attr("id", $(this).attr("pn-lang") + "" + h), a.id = $(this).attr("id");
                var d = $(this).parent();
                d.hasClass("container") && (a.parent = "#" + d.parent().attr("id") + " .container"), d.hasClass("widget-content") && (a.parent = "#" + d.parent().attr("id") + " .widget-content"), d.hasClass("wrap-child") && (a.parent = "#" + d.parent().parent().attr("id") + " .widget-content"), apiElement.push(a), m.setStyleItem(apiElement[apiElement.length - 1], "desktop")
            }), c.getItemSlder();
            var p = selectedItem.find('.widget-element[pn-type="item_slider"]').length;
            setVisiableElementSlider(selectedItem, p - 1)
        }
    }, c.deleteItemSlider = function (a, b) {
        if (b.stopPropagation(), selectedItem && "slider" == selectedItem.attr("pn-type")) {
            var d = selectedItem.attr("id");
            if (selectedItem.find(".widget-element").length > 1) {
                var e = $("#" + d + " #" + a);
                $("#punnel-editor .widget-element.selected").removeClass("selected"), e.addClass("selected"), selectedItem = e;
                var f = new BoxRightClick;
                f.boxRightDelete(), $("#punnel-editor .widget-element.selected").removeClass("selected"), selectedItem = $("#punnel-editor #" + d), selectedItem.addClass("selected");
                var g = new ShowBoxResize;
                g.showBox(selectedItem), selectedItem.find(".wrap-child").css({
                    left: "0px"
                }), c.getItemSlder(), setVisiableElementSlider(selectedItem, 0)
            }
        }
    }, c.selectedItemSlider = function (a, b) {
        if (selectedItem && selectedItem.length > 0 && "slider" == selectedItem.attr("pn-type")) {
            var c = selectedItem.find('.widget-element[pn-type="item_slider"]').eq(a),
                d = selectedItem.find(".wrap-child").eq(0),
                e = d.offset().left - c.offset().left;
            selectedItem.find(".widget-element").css({
                visibility: "visible"
            }), d.animate({
                left: e + "px"
            }, function () {
                setVisiableElementSlider(selectedItem, a)
            }), $(".custom-manager-slider .item-slider").removeClass("active"), $('.custom-manager-slider .item-slider[pn-active="' + b + '"]').addClass("active")
        }
    }, c.getItemSlder = function () {
        if (selectedItem && selectedItem.length > 0 && "slider" == selectedItem.attr("pn-type")) {
            var a = selectedItem.find('.widget-element[pn-type="item_slider"]');
            a && a.length > 0 && (c.itemsSlider = [], a.each(function (a) {
                var b = {
                    id: $(this).attr("id"),
                    name: "slide-" + (a + 1)
                };
                c.itemsSlider.push(b)
            })), setTimeout(function () {
                var a = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left")),
                    b = Math.round(a / selectedItem.outerWidth()),
                    c = selectedItem.find('.widget-element[pn-type="item_slider"]').eq(b).attr("id");
                $(".custom-manager-slider .item-slider").removeClass("active"), $('.custom-manager-slider .item-slider[pn-active="' + c + '"]').addClass("active")
            }, 500)
        }
    }
}]);