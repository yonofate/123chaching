angular.module("punnelApp").controller("customColorGradientCtrl", ["$rootScope", "$scope", "$sce", function ($rootScope, $scope, $sce) {

    $scope.positions = [
        { p:1, v: 'to right bottom', t: 'linear', i:'<path d="M.557 1.208a.692.692 0 01.651-.651L6.886.178a.776.776 0 01.811.682.691.691 0 01-.643.78l-4.129.275 6.292 6.292c.293.293.305.757.026 1.036-.28.279-.743.267-1.036-.026L1.915 2.925 1.64 7.054a.691.691 0 01-.78.643.776.776 0 01-.682-.811l.379-5.678z"></path>' },
        { p: 2, v: 'to bottom', t: 'linear', t: 'linear', i:'<path d="M4.54.177a.692.692 0 01.92 0l4.283 3.747a.776.776 0 01.091 1.056.691.691 0 01-1.006.096L5.714 2.351v8.899c0 .414-.32.75-.714.75-.394 0-.714-.336-.714-.75V2.351L1.172 5.076A.691.691 0 01.166 4.98a.776.776 0 01.091-1.056L4.539.177z"></path>' },
        { p: 3, v: 'to left bottom', t: 'linear', i:'<path d="M8.792.557a.692.692 0 01.651.651l.379 5.678a.776.776 0 01-.682.811.691.691 0 01-.78-.643l-.275-4.129-6.292 6.292c-.293.293-.757.305-1.036.026C.478 8.963.49 8.5.783 8.207l6.292-6.292-4.129-.275a.691.691 0 01-.643-.78.776.776 0 01.811-.682l5.678.379z"></path>' },
        { p: 4, v: 'to right', t: 'linear', i:'<path d="M.177 5.46a.692.692 0 010-.92L3.924.256A.776.776 0 014.98.166a.691.691 0 01.096 1.006L2.351 4.286h8.899c.414 0 .75.32.75.714 0 .394-.336.714-.75.714H2.351l2.725 3.114a.691.691 0 01-.096 1.006.776.776 0 01-1.056-.091L.177 5.461z"></path>' },
        { p: 5, v: '', t: 'linear', i: '<circle stroke="#3D4853" stroke-width="1.46" cx="5.5" cy="5.5" r="4.5" fill="none" fill-rule="evenodd"></circle>' },
        { p: 6, v: 'to left', t: 'linear', i: '<path d="M11.823 4.54a.692.692 0 010 .92L8.076 9.744a.776.776 0 01-1.056.091.691.691 0 01-.096-1.006l2.725-3.114H.75C.336 5.714 0 5.394 0 5c0-.394.336-.714.75-.714h8.899L6.924 1.172A.691.691 0 017.02.166a.776.776 0 011.056.091l3.747 4.282z"></path>' },
        { p: 7, v: 'to right top', t: 'linear', i: '<path d="M1.208 9.443a.692.692 0 01-.651-.651L.178 3.114a.776.776 0 01.682-.811.691.691 0 01.78.643l.275 4.129L8.207.783C8.5.49 8.964.478 9.243.757c.279.28.267.743-.026 1.036L2.925 8.085l4.129.275c.402.027.69.376.643.78a.776.776 0 01-.811.682l-5.678-.379z"></path>'},
        { p: 8, v: 'to top', t: 'linear', i: '<path d="M5.46 11.823a.692.692 0 01-.92 0L.256 8.076A.776.776 0 01.166 7.02a.691.691 0 011.006-.096l3.114 2.725V.75c0-.414.32-.75.714-.75.394 0 .714.336.714.75v8.899l3.114-2.725a.691.691 0 011.006.096.776.776 0 01-.091 1.056l-4.282 3.747z"></path>' },
        { p: 9, v: 'to left top', t: 'linear', i: '<path d="M9.443 8.792a.692.692 0 01-.651.651l-5.678.379a.776.776 0 01-.811-.682.691.691 0 01.643-.78l4.129-.275L.783 1.793C.49 1.5.478 1.036.757.757 1.037.478 1.5.49 1.793.783l6.292 6.292.275-4.129a.691.691 0 01.78-.643c.403.046.709.41.682.811l-.379 5.678z"></path>' },

        { p: 1, v: 'at left top', t: 'radial', i: '<path d="M.557 1.208a.692.692 0 01.651-.651L6.886.178a.776.776 0 01.811.682.691.691 0 01-.643.78l-4.129.275 6.292 6.292c.293.293.305.757.026 1.036-.28.279-.743.267-1.036-.026L1.915 2.925 1.64 7.054a.691.691 0 01-.78.643.776.776 0 01-.682-.811l.379-5.678z"></path>' },
        { p: 2, v: 'at center top', t: 'radial', t: 'radial', i: '<path d="M4.54.177a.692.692 0 01.92 0l4.283 3.747a.776.776 0 01.091 1.056.691.691 0 01-1.006.096L5.714 2.351v8.899c0 .414-.32.75-.714.75-.394 0-.714-.336-.714-.75V2.351L1.172 5.076A.691.691 0 01.166 4.98a.776.776 0 01.091-1.056L4.539.177z"></path>' },
        { p: 3, v: 'at right top', t: 'radial', i: '<path d="M8.792.557a.692.692 0 01.651.651l.379 5.678a.776.776 0 01-.682.811.691.691 0 01-.78-.643l-.275-4.129-6.292 6.292c-.293.293-.757.305-1.036.026C.478 8.963.49 8.5.783 8.207l6.292-6.292-4.129-.275a.691.691 0 01-.643-.78.776.776 0 01.811-.682l5.678.379z"></path>' },
        { p: 4, v: 'at left center', t: 'radial', i: '<path d="M.177 5.46a.692.692 0 010-.92L3.924.256A.776.776 0 014.98.166a.691.691 0 01.096 1.006L2.351 4.286h8.899c.414 0 .75.32.75.714 0 .394-.336.714-.75.714H2.351l2.725 3.114a.691.691 0 01-.096 1.006.776.776 0 01-1.056-.091L.177 5.461z"></path>' },
        { p: 5, v: 'at center center', t: 'radial', i: '<circle stroke="#3D4853" stroke-width="1.46" cx="5.5" cy="5.5" r="4.5" fill="none" fill-rule="evenodd"></circle>' },
        { p: 6, v: 'at right center', t: 'radial', i: '<path d="M11.823 4.54a.692.692 0 010 .92L8.076 9.744a.776.776 0 01-1.056.091.691.691 0 01-.096-1.006l2.725-3.114H.75C.336 5.714 0 5.394 0 5c0-.394.336-.714.75-.714h8.899L6.924 1.172A.691.691 0 017.02.166a.776.776 0 011.056.091l3.747 4.282z"></path>' },
        { p: 7, v: 'at left bottom', t: 'radial', i: '<path d="M1.208 9.443a.692.692 0 01-.651-.651L.178 3.114a.776.776 0 01.682-.811.691.691 0 01.78.643l.275 4.129L8.207.783C8.5.49 8.964.478 9.243.757c.279.28.267.743-.026 1.036L2.925 8.085l4.129.275c.402.027.69.376.643.78a.776.776 0 01-.811.682l-5.678-.379z"></path>' },
        { p: 8, v: 'at center bottom', t: 'radial', i: '<path d="M5.46 11.823a.692.692 0 01-.92 0L.256 8.076A.776.776 0 01.166 7.02a.691.691 0 011.006-.096l3.114 2.725V.75c0-.414.32-.75.714-.75.394 0 .714.336.714.75v8.899l3.114-2.725a.691.691 0 011.006.096.776.776 0 01-.091 1.056l-4.282 3.747z"></path>' },
        { p: 9, v: 'at right bottom', t: 'radial', i: '<path d="M9.443 8.792a.692.692 0 01-.651.651l-5.678.379a.776.776 0 01-.811-.682.691.691 0 01.643-.78l4.129-.275L.783 1.793C.49 1.5.478 1.036.757.757 1.037.478 1.5.49 1.793.783l6.292 6.292.275-4.129a.691.691 0 01.78-.643c.403.046.709.41.682.811l-.379 5.678z"></path>' },
    ];

    $scope.htmlAce = function (v) {
        return $sce.trustAsHtml(v);
    }
    $scope.hexToRgbA = function (a, alpha) {
        var b;
        return /^#([A-Fa-f0-9]{3}){1,2}$/.test(a) ? (b = a.substring(1).split(""), 3 == b.length && (b = [b[0], b[0], b[1], b[1], b[2], b[2]]), b = "0x" + b.join(""), "rgba(" + [b >> 16 & 255, b >> 8 & 255, 255 & b].join(",") + "," + alpha +")") : a
    }

    $scope.radialPos = [];
    $scope.close = function () {
        $(".widget-item.custom-color-gradient-picker").hide()
    }

    var cl = {
        type: 'linear',
        position: 'to top',
        color1: 'rgba(255,255,255,0)',
        color2: 'rgba(255,255,255,0)'
    }
    $rootScope.colorGradientPickerUsing = cl;

    $scope.randomColor = function() {
        for (var a = "#", b = 0; 6 > b; b++) a += "0123456789ABCDEF"[Math.floor(16 * Math.random())];
        b = "#";
        for (var c = 0; 6 > c; c++) b += "0123456789ABCDEF"[Math.round(15 * Math.random())];
        hex_1 = a;
        hex_2 = b
        
        var alpha1 = ($scope.color.color1 && $scope.color.color1 != 'rgba(255,255,255,0)')? $scope.color.color1.replace('rgba(', '').replace(')', '').split(',')[3]:1;
        var alpha2 = ($scope.color.color2 && $scope.color.color2 != 'rgba(255,255,255,0)')? $scope.color.color2.replace('rgba(', '').replace(')', '').split(',')[3]:1;

        $("#lpColorG1PickerCtrl").colorpicker("setValue", $scope.hexToRgbA(hex_1, alpha1));
        $("#lpColorG2PickerCtrl").colorpicker("setValue", $scope.hexToRgbA(hex_2, alpha2));
    }

    $scope.setValueColorChangeInput = function (p, c) {
        if (p == 1) {
            $rootScope.colorGradientPickerUsing.color1 = c;
            $("#lpColorG1PickerCtrl").colorpicker("setValue", $rootScope.colorGradientPickerUsing.color1);
        } else {
            $rootScope.colorGradientPickerUsing.color2 = c;
            $("#lpColorG2PickerCtrl").colorpicker("setValue", $rootScope.colorGradientPickerUsing.color2);
        }
    }

    $(function () {
        $("#lpColorG1PickerCtrl").colorpicker({
            color: $rootScope.colorGradientPickerUsing.color1,
            container: !0,
            inline: !0,
            format: "rgba",
            sliders: {
                saturation: {
                    maxLeft: 170,
                    maxTop: 170,
                    callLeft: "setSaturation",
                    callTop: "setBrightness"
                },
                hue: {
                    maxLeft: 0,
                    maxTop: 170,
                    callLeft: !1,
                    callTop: "setHue"
                },
                alpha: {
                    maxLeft: 0,
                    maxTop: 170,
                    callLeft: !1,
                    callTop: "setAlpha"
                }
            }
        }).on("changeColor", function () {
            $scope.color = $rootScope.colorGradientPickerUsing;
            var v = $("#lpColorG1PickerCtrl").colorpicker("getValue");
            $scope.color.color1 = v;
            //$rootScope.colorGradientPickerUsing = $scope.color;
            $(".color1").css({
                "background-color": v
            });
            $scope.setColor();
        });

        $("#lpColorG2PickerCtrl").colorpicker({
            color: $rootScope.colorGradientPickerUsing.color2,
            container: !0,
            inline: !0,
            format: "rgba",
            sliders: {
                saturation: {
                    maxLeft: 170,
                    maxTop: 170,
                    callLeft: "setSaturation",
                    callTop: "setBrightness"
                },
                hue: {
                    maxLeft: 0,
                    maxTop: 170,
                    callLeft: !1,
                    callTop: "setHue"
                },
                alpha: {
                    maxLeft: 0,
                    maxTop: 170,
                    callLeft: !1,
                    callTop: "setAlpha"
                }
            }
        }).on("changeColor", function () {
            $scope.color = $rootScope.colorGradientPickerUsing;
            var v = $("#lpColorG2PickerCtrl").colorpicker("getValue");
            $scope.color.color2 = v;
            //$rootScope.colorGradientPickerUsing = $scope.color;
            $(".color2").css({
                "background-color": v
            });
            $scope.setColor();
        });
    });

    $scope.clear = function () {
        $scope.color = {
            type: 'linear',
            position: 'to top',
            color1: 'rgba(255,255,255,0)',
            color2: 'rgba(255,255,255,0)'
        };
        $rootScope.colorGradientPickerUsing = $scope.color;
        $scope.setColor();
    }

    $scope.changeType = function () {
        console.log($scope.color.position);
        var pos = $.grep($scope.positions, function (n, i) {
            return n.v == $scope.color.position;
        });

        var posnew = $.grep($scope.positions, function (n, i) {
            return n.p == pos[0].p && n.t == $scope.color.type;
        });
        $scope.color.position = posnew[0].v;       
        $scope.setColor();
    }

    $scope.showColor = function (pos) {
        if (pos == 2) {
            $("#lpColorG2PickerCtrl").colorpicker("show");
            $("#lpColorG1PickerCtrl").colorpicker("hide");
        } else {
            $("#lpColorG1PickerCtrl").colorpicker("show");
            $("#lpColorG2PickerCtrl").colorpicker("hide");
        }
    }

    $scope.setColor = function () {
        if (selectedItem && selectedItem.length > 0) {
            var color = PN_PAGE.toGradientColor($scope.color);
            //$rootScope.colorGradientPickerUsing = $scope.color;

            $(".custom-color-gradient-background input").val(color);

            $(".custom-color-gradient-background span span").css({
                "background-image": color
            });

            var c = $scope.getContentSetValue(),
                d = c.index,
                e = c.content;

            apiElement[d].media.desktop.colorGradient = $scope.color;//$rootScope.colorGradientPickerUsing;
            apiElement[d].media.mobile.colorGradient = $scope.color;//$rootScope.colorGradientPickerUsing;
            $scope.setValueColorBgWg(e,d);
            $('[pn-show-bg-image="true"]').hide();
        }
    }

    $scope.setValueColorBgWg = function (a,d) {
        var b = apiElement[d].media[deviceEdit]["background-image"] || '';
        var f = apiElement[d].media[deviceEdit]["background-color"] || '';
        var g = PN_PAGE.toGradientColor($scope.color);
        var o = apiElement[d].media.overlay_color || PN_PAGE.nonGradientColor;
        var c = g == PN_PAGE.nonGradientColor ? "linear-gradient(" + o + "," + o + ')' : g;

        b && b.length > 0 ? (a.css({
            "background-image": c + ",url('" + b + "')"
        }), a.css({
            "background-image": "-o-" + c + ",url('" + b + "')"
        }), a.css({
            "background-image": "-ms-" + c + ",url('" + b + "')"
        }), a.css({
            "background-image": "-moz-" + c + ",url('" + b + "')"
        }), a.css({
            "background-image": "-webkit-" + c + ",url('" + b + "')"
        })) : a.css({
            "background-image": c
        }), a.css({
            "background-color": f
        })
    }

    $scope.getContentSetValue = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a, b;
            if ("slider" == selectedItem.attr("pn-type")) {
                var c = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left")),
                    d = (Math.round(c / selectedItem.outerWidth()), $(".widget-item.custom-manager-slider .item-slider.active").attr("pn-active"));
                b = PN_PAGE.getIndexElement(d)
            } else b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            return a = selectedItem.hasClass("widget-element") ? $("#punnel-editor #" + apiElement[b].id).find(".widget-content").eq(0) : 1 == apiElement[b].popup ? selectedItem.find(".container") : selectedItem, {
                index: b,
                content: a
            }
        }
        return !1
    }
}]);