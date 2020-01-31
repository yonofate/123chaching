angular.module("punnelApp").controller("customAnimationCtr", ["$rootScope", "$state", "$scope", "$translate", function (a, b, c, d) {
    c.numbers = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], c.items = lp_animation, c.animate = "", c.idTMP = "", a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].animate && apiElement[a].animate.length > 0 ? c.animate = apiElement[a].animate.replace("wow ", "").replace(" animated", "") : c.animate = "",
            apiElement[a].animateDuration && apiElement[a].animateDuration.length > 0 ? c.animateDuration = parseFloat(apiElement[a].animateDuration) : c.animateDuration = 1;
            if (apiElement[a].animate_ext && apiElement[a].animate_ext.length > 0) {
                c.animate_ext = apiElement[a].animate_ext.replace('pn-animate-', '');
            } else {
                c.animate_ext = ''
            }
            if (apiElement[a].animateRelay) {
                c.animateRelay = apiElement[a].animateRelay;
            } else {
                c.animateRelay = 0
            }

            if (apiElement[a].animateDelay) {
                c.animateDelay = apiElement[a].animateDelay;
            } else {
                c.animateDelay = 1
            }

            c.text_color_hover = apiElement[a].media.desktop["color-hover"];
            if ("" == c.text_color_hover || void 0 == c.text_color_hover) {
                c.text_color_hover = "rgba(0,0,0,1)";
            }

            c.background_color_hover = apiElement[a].media.desktop["background-color-hover"];
            if ("" == c.background_color_hover || void 0 == c.background_color_hover) {
                c.background_color_hover = "rgba(0,0,0,1)";
            }
        }
    }), d.use(localStorage.getItem("lang")),
        c.applyAnimate = function (a) {
            if (selectedItem && selectedItem.length > 0) {
                c.animate = a;
                var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                "" == a ? apiElement[b].animate = "" : apiElement[b].animate = "wow " + c.animate + " animated";
            }
        }, c.applyAnimateClose = function (a) {
            c.applyAnimate(a), $("#animation-demo").removeClass().addClass(c.animate + " animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
                $(this).removeClass()
            })
        }, c.setValueDuration = function (a) {
            if (c.animateDuration = a, selectedItem && selectedItem.length > 0) {
                var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[b].animateDuration = c.animateDuration + "s"
            }
        }, c.setValueDelay = function (a) {
            if (c.animateDelay = a, selectedItem && selectedItem.length > 0) {
                var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[b].animateDelay = c.animateDelay;
            }
        },
        c.setRelay = function (a) {
            if (c.animateRelay = a, selectedItem && selectedItem.length > 0) {
                var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[b].animateRelay = c.animateRelay;
                //c.animate == a ? apiElement[b].animate = "" : apiElement[b].animateRelay != 1 ? apiElement[b].animate = "wow " + c.animate + " animated" : apiElement[b].animate = "wow " + c.animate + " animated infinite";
            }
        },
        c.animateExt = pn_animate_ext,
        c.applyExtAnimate = function (a) {
        if (selectedItem && selectedItem.length > 0) {
                if (a == '') {
                    c.reset();
                }
                c.animate_ext = a;
                a = 'pn-animate-' + a;
                angular.forEach(c.animateExt, function (v, i) {
                    selectedItem.removeClass('pn-animate-' + v);
                    var ch = $('#' + selectedItem.attr("id") + ' .widget-content');
                    if (ch != void 0) {
                        ch.removeClass('pn-animate-' + v);
                    }
                });
                if ($.inArray(a, pn_animate_ext_inherit) >= 0) {
                    var ch = $('#' + selectedItem.attr("id") + ' .widget-content');
                    if (ch != void 0) {
                        ch.addClass(a);
                    }
                } else {
                    selectedItem.addClass(a);
                }
                var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                c.animate == a ? apiElement[b].animate_ext = "" : apiElement[b].animate_ext = a;
                
            }
        },
        c.reset = function () {
            c.background_color_hover = undefined;
            c.text_color_hover = undefined;
        $(".custom-color-background-hover input").val(c.text_color_hover), $(".custom-color-background-hover span span").css({
                "background-color": c.text_color_hover
            });
        $(".color-text-font-hover input").val(c.background_color_hover), $(".color-text-font-hover span span").css({
                "background-color": c.background_color_hover
            })
        $("#lpColorPickerCtrl").colorpicker("setValue", undefined);
        var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        if (a && a != null) {
            apiElement[a].media.desktop["color-hover"] = c.text_color_hover;
            apiElement[a].media.desktop["background-color-hover"] = c.background_color_hover;
        }
        }

        c.showColorSetting = function (typeColorPicker) {
            if (selectedItem && selectedItem.length > 0) {
                var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                a.typeColorPicker = typeColorPicker;
                a.colorPickerUsing = apiElement[media_id].media[deviceEdit]["color_hover"];
                $("#lpColorPickerCtrl").colorpicker("setValue", a.colorPickerUsing);
                $(".widget-item.custom-color-picker").show();
            }
        };
}]);