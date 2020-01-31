angular.module("punnelApp").controller("customSliderCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", c.sliderdelay = 5e3, c.padding = 0, a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "slider" == selectedItem.attr("pn-type")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.sliderAutoPlay = apiElement[a].sliderAutoPlay, c.sliderAutoPlay && c.sliderAutoPlay.length > 0 || (c.sliderAutoPlay = "0", apiElement[a].sliderAutoPlay = "0");
            var b = selectedItem.find('.widget-element[pn-type="item_slider"]');
            if (b && b.length > 0) {
                var d = parseFloat(b.eq(0).css("width"));
                c.numItem = parseFloat(selectedItem.css("width")) / d
            } else c.numItem = 1;
            apiElement[a].sliderdelay && parseFloat(apiElement[a].sliderdelay) > 0 ? c.sliderdelay = parseFloat(apiElement[a].sliderdelay) / 1e3 : c.sliderdelay = 5, apiElement[a].media[deviceEdit].padding && parseFloat(apiElement[a].media[deviceEdit].padding) > 0 ? c.padding = parseFloat(apiElement[a].media[deviceEdit].padding) : c.padding = 0
        }
    }), c.num = numcselective, c.itempadding = number, c.changeAutoPlaySlider = function (a) {
        if (c.sliderAutoPlay = a, selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].sliderAutoPlay = a
        }
    }, c.changeShowItem = function (a) {
        if (selectedItem && selectedItem.length > 0 && "slider" == selectedItem.attr("pn-type")) {
            var b = selectedItem.find('.widget-element[pn-type="item_slider"]');
            if (b && b.length > 0) {
                var d = parseFloat(b.eq(0).css("width")),
                    e = parseFloat(selectedItem.css("width"));
                if (e / d != a) {
                    c.numItem = a, d = e / a;
                    var f, g, h = 0;
                    b.each(function () {
                        f = PN_PAGE.getIndexElement($(this).attr("id")), g = h * d, $(this).css({
                            left: g + "px",
                            width: d + "px"
                        }), $(this).find(".widget-content:eq(0)").css({
                            width: "100%",
                            height: "100%"
                        }), apiElement[f].media[deviceEdit].width = $(this).css("width"), apiElement[f].media[deviceEdit].left = $(this).css("left"), h++
                    })
                }
            }
        }
    }, c.changePadding = function (a) {
        if (c.padding = a, selectedItem && selectedItem.length > 0 && "slider" == selectedItem.attr("pn-type")) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].media[deviceEdit].padding = c.padding + "px";
            var d = selectedItem.find('.widget-element[pn-type="item_slider"]');
            d && d.length > 0 && d.each(function () {
                var a = PN_PAGE.getIndexElement($(this).attr("id"));
                apiElement[a].media[deviceEdit].padding = c.padding + "px", $(this).css({
                    padding: c.padding + "px"
                }), $(this).find(".widget-content:eq(0)").css({
                    width: "100%",
                    height: "100%"
                })
            })
        }
    }, c.setValueDelay = function (a) {
        if (selectedItem && selectedItem.length > 0 && "slider" == selectedItem.attr("pn-type")) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].sliderdelay = 1e3 * parseFloat(a), c.sliderdelay = parseFloat(a)
        }
    }
}]);