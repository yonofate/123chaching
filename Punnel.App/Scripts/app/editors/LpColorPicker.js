var LpColorPicker = function() {};
LpColorPicker.prototype.runColor = function() {
    $("input.minicolor").colorpicker({
        color: colorUsing,
        format: "rgba",
        sliders: {
            saturation: {
                maxLeft: 100,
                maxTop: 100,
                callLeft: "setSaturation",
                callTop: "setBrightness"
            },
            hue: {
                maxLeft: 0,
                maxTop: 100,
                callLeft: !1,
                callTop: "setHue"
            },
            alpha: {
                maxLeft: 0,
                maxTop: 100,
                callLeft: !1,
                callTop: "setAlpha"
            }
        }
    }).on("changeColor.colorpicker", function(a) {
        $(this).focus()
    })
};