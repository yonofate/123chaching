var RenCssMobile = function () { },
    sizeReziseImg = 50;
RenCssMobile.prototype.init = function (a) { },
    RenCssMobile.prototype.testCss = function (a) {
        var b = "",
            c = "";
        b += "@media(min-width:768px){";
        for (var d = 0; d < a.length; d++) b += this.cssMedia(a[d], "desktop"), c += this.cssHover(a[d]);
        b += "}";
        for (var d = 0; d < a.length; d++) {
            var e = PN_PAGE.getElement("#" + a[d].id);
            e.hasClass("widget-element") ? (b += this.testNewItemElement(a[d], "desktop"), "menu-header" == e.attr("pn-type") && (e.find(">.widget-content:eq(0) .ulMenuDeskTop li").attr("style", ""), e.find(">.widget-content:eq(0) .ulMenuDeskTop li a").attr("style", "")), e.attr("style", ""), e.find(">.widget-content:eq(0)").attr("style", "")) : (b += this.testNewItemSection(a[d], "desktop"), e.attr("style", ""))
        }
        b += c, b += "@media(max-width: 767px){", b += "body{position: relative;}";
        for (var d = 0; d < a.length; d++) {
            var e = PN_PAGE.getElement("#" + a[d].id);
            e.hasClass("widget-section") && (b += this.testNewItemSection(a[d], "mobile")), b += this.cssMedia(a[d], "mobile")
        }
        return b += "}"
    },
    RenCssMobile.prototype.testNewItemSection = function (a, b) {
        var c = "",
        d = "";
    if (d = 1 == a.popup ? d + "#" + a.id + " .container{" : d + "#" + a.id + "{", d += "none" == a.media.display ? "display:none;" : "display:block;", this.isVal(a.media.overlay_color) && this.isVal(a.media[b]["background-image"]) && (-1 == a.media.overlay_color.search("rgb") && -1 == a.media.overlay_color.search("#") && (a.media.overlay_color = "#" + a.media.overlay_color), c += 1 == a.popup ? "#" + a.id + " > .container .overlay-container-popup{background-color:" + a.media.overlay_color + ";}" : "#" + a.id + " > .punnel-widget-overlay{background-color:" + a.media.overlay_color + (PN_PAGE.toGradientColor(a.media[b].colorGradient) == PN_PAGE.nonGradientColor ? "" : (";background-image:" + PN_PAGE.toGradientColor(a.media[b].colorGradient))) + ";}"), this.isVal(a.media[b]["background-image"])) {
            //fix lazyload
            if ((a.lang != "SECTION") || (a.lang == "SECTION" && a.popup && a.popup == true) || (a.lang == "SECTION" && b =="mobile")) {
                a.media[b]["background-image"] = this.resetImage(a.media[b]["background-image"]);
                var e = a.media[b]["background-image"];
                e = this.zenImagePublish(a.media[b]["background-image"], a, b);
                if (e && e.length > 0) {
                    d = d + 'background-image:url("' + e + '") !important;'
                }
            }
    }

    if (this.isVal(a.media[b]["background-image"])==false && a.media[b].colorGradient && a.media[b].colorGradient != null) {
        d = d + ("background-image:" + PN_PAGE.toGradientColor(a.media[b].colorGradient) + ";");
        d = d + ("background-image:-webkit-" + PN_PAGE.toGradientColor(a.media[b].colorGradient) + ";");
        d = d + ("background-image:-o-" + PN_PAGE.toGradientColor(a.media[b].colorGradient) + ";");
        d = d + ("background-image:-ms-" + PN_PAGE.toGradientColor(a.media[b].colorGradient) + ";");
        d = d + ("background-image:-moz-" + PN_PAGE.toGradientColor(a.media[b].colorGradient) + ";");
    }
    
    if (this.isVal(a.media[b]["background-color"]) && (-1 == a.media[b]["background-color"].search("rgb") && -1 == a.media[b]["background-color"].search("#") && (a.media[b]["background-color"] = "#" + a.media[b]["background-color"]), d = d + "background-color:" + a.media[b]["background-color"] + ";"), this.isVal(a.media[b]["background-image"])) {
            var f;
            f = a.media[b].typePosBgImg ? a.media[b].typePosBgImg : a.media.typePosBgImg ? a.media.typePosBgImg : "center";
            var g;
            g = a.media[b].typeBgImage ? a.media[b].typeBgImage : a.media.typeBgImage;
            var h = a.repeatBg;
            switch (h || (h = "no-repeat"), g) {
                case "para":
                    d = d + "background-size: cover;background-attachment: fixed;background-position: top " + f + ";background-repeat:" + h + ";";
                    break;
                case "stre":
                    d = d + "background-size:cover;background-attachment: scroll;background-position:top " + f + ";background-repeat:" + h + ";";
                    break;
                case "streWH":
                    d = d + "background-size:100% 100%;background-attachment: scroll;background-position:top " + f + ";background-repeat:" + h + ";";
                    break;
                case "streW":
                    d = d + "background-size:100% auto;background-attachment: scroll;background-position:top " + f + ";background-repeat:" + h + ";";
                    break;
                case "streH":
                    d = d + "background-size:auto 100%;background-attachment: scroll;background-position:top " + f + ";background-repeat:" + h + ";";
                    break;
                case "title":
                    d = d + "background-position:top " + f + ";background-repeat:" + h + ";";
                    break;
                default:
                    d = d + "background-repeat:" + h + ";"
            }
        }
        return d += "}", c && c.length > 0 && (d += c), d
    },
    RenCssMobile.prototype.testNewItemElement = function (a, b) {
        var c = "",
            d = "",
            e = "",
            f = "",
            g = "",
            h = "",
            i = "";
    if (this.isVal(a.media[b]["background-image"])) {
        //fix lazyload
        if (a.type_plugin != "box" || (a.type_plugin == "box" && a.parent.indexOf("POPUP")>0)) {
                if (PN_PAGE.checkImage(a.media[b]["background-image"])) {
                    var j = a.media[b]["background-image"];
                    (j = a.media[b]["background-image"].replace(ApiStatic, ApiStatic + "p" + Math.ceil(parseFloat(a.media[b].width) / sizeReziseImg) * sizeReziseImg + "x" + Math.ceil(parseFloat(a.media[b].height) / sizeReziseImg) * sizeReziseImg + "/")), j = this.zenImagePublish(a.media[b]["background-image"], a, b), f = f + 'url("' + j + '")'
                } else f = f + 'url("' + a.media[b]["background-image"] + '")';

                g += "background-image:" + f + ";";
            }
            var k;
            k = a.media[b].typePosBgImg ? a.media[b].typePosBgImg : a.media.typePosBgImg ? a.media.typePosBgImg : "center";
            var l;
            l = a.media[b].typeBgImage ? a.media[b].typeBgImage : a.media.typeBgImage;
            var m = a.repeatBg;
            switch (m || (m = "no-repeat"), l) {
                case "para":
                    g = g + "background-size: cover; background-attachment: fixed; background-position: top " + k + ";background-repeat:" + m + ";";
                    break;
                case "stre":
                    g = g + "background-size:cover;background-attachment: scroll;background-position:top " + k + ";background-repeat:" + m + ";";
                    break;
                case "streWH":
                    g = g + "background-size:100% 100%;background-attachment: scroll;background-position:top " + k + ";background-repeat:" + m + ";";
                    break;
                case "streW":
                    g = g + "background-size:100% auto;background-attachment: scroll;background-position:top " + k + ";background-repeat:" + m + ";";
                    break;
                case "streH":
                    g = g + "background-size:auto 100%;background-attachment: scroll;background-position:top " + k + ";background-repeat:" + m + ";";
                    break;
                case "title":
                    g = g + "background-position:top " + k + ";background-repeat:" + m + ";";
                    break;
                default:
                    g = g + "background-size:cover;background-repeat:" + m + ";"
            }
    }

    if (this.isVal(a.media[b]["background-image"]) == false && a.media[b].colorGradient && a.media[b].colorGradient != null) {
        g = g + ("background-image:" + PN_PAGE.toGradientColor(a.media[b].colorGradient) + ";");
        g = g + ("background-image:-webkit-" + PN_PAGE.toGradientColor(a.media[b].colorGradient) + ";");
        g = g + ("background-image:-o-" + PN_PAGE.toGradientColor(a.media[b].colorGradient) + ";");
        g = g + ("background-image:-ms-" + PN_PAGE.toGradientColor(a.media[b].colorGradient) + ";");
        g = g + ("background-image:-moz-" + PN_PAGE.toGradientColor(a.media[b].colorGradient) + ";");
    }

    if (this.isVal(a.media[b]["background-color"]) && (-1 == a.media[b]["background-color"].search("rgb") && -1 == a.media[b]["background-color"].search("#") && (a.media[b]["background-color"] = "#" + a.media[b]["background-color"]), g += "background-color:" + a.media[b]["background-color"] + ";"), this.isVal(a.media.overlay_color) && this.isVal(a.media[b]["background-image"]) && (-1 == a.media.overlay_color.search("rgba") && -1 == a.media.overlay_color.search("#") && (a.media.overlay_color = "#" + a.media.overlay_color), i += "#" + a.id + " > .punnel-widget-overlay{background-color:" + a.media.overlay_color + (PN_PAGE.toGradientColor(a.media[b].colorGradient) == PN_PAGE.nonGradientColor ? "" : (";background-image:" + PN_PAGE.toGradientColor(a.media[b].colorGradient))) + ";}"), this.isVal(a.style_line) && (h = h + "#" + a.id + ">.widget-content .line{", (this.isVal(a.style_line["border-top"]) || this.isVal(a.style_line["border-left"]) || this.isVal(a.style_line["border-right"]) || this.isVal(a.style_line["border-bottom"])) && (this.isVal(a.style_line["border-color"]) && -1 == a.style_line["border-color"].search("rgb") && -1 == a.style_line["border-color"].search("#") && (a.style_line["border-color"] = "#" + a.style_line["border-color"]), a.style_line["border-top"] == a.style_line["border-left"] && a.style_line["border-left"] == a.style_line["border-right"] && a.style_line["border-right"] == a.style_line["border-bottom"] ? parseFloat(a.style_line["border-top"]) > 0 && (h = h + "border-width:" + a.style_line["border-top"] + ";", this.isVal(a.style_line["border-style"]) && (h = h + "border-style:" + a.style_line["border-style"] + ";"), this.isVal(a.style_line["border-color"]) && (h = h + "border-color:" + a.style_line["border-color"] + ";")) : (this.isVal(a.style_line["border-top"]) && (h = h + "border-top-width:" + a.style_line["border-top"] + ";"), this.isVal(a.style_line["border-left"]) && (h = h + "border-left-width:" + a.style_line["border-left"] + ";"), this.isVal(a.style_line["border-right"]) && (h = h + "border-right-width:" + a.style_line["border-right"] + ";"), this.isVal(a.style_line["border-bottom"]) && (h = h + "border-bottom-width:" + a.style_line["border-bottom"] + ";"), this.isVal(a.style_line["border-style"]) && (h = h + "border-style:" + a.style_line["border-style"] + ";"), this.isVal(a.style_line["border-color"]) && (h = h + "border-color:" + a.style_line["border-color"] + ";"))), this.isVal(a.style_line["margin-top"]) && (h = h + "margin-top:" + a.style_line["margin-top"] + ";"), h += "}"), this.isVal(a.style_linevertical) && (h = h + "#" + a.id + ">.widget-content .linevertical{", this.isVal(a.style_linevertical["border-top"]) && (h = h + "border-top-width:" + a.style_linevertical["border-top"] + ";"), this.isVal(a.style_linevertical["border-right"]) && (h = h + "border-right-width:" + a.style_linevertical["border-right"] + ";"), this.isVal(a.style_linevertical["border-left"]) && (h = h + "border-left-width:" + a.style_linevertical["border-left"] + ";"), this.isVal(a.style_linevertical["border-bottom"]) && (h = h + "border-bottom-width:" + a.style_linevertical["border-bottom"] + ";"), this.isVal(a.style_linevertical["border-style"]) && (h = h + "border-style:" + a.style_linevertical["border-style"] + ";"), this.isVal(a.style_linevertical["border-color"]) && (-1 == a.style_linevertical["border-color"].search("rgb") && -1 == a.style_linevertical["border-color"].search("#") && (a.style_linevertical["border-color"] = "#" + a.style_linevertical["border-color"]), h = h + "border-color:" + a.style_linevertical["border-color"] + ";"), this.isVal(a.style_linevertical["margin-left"]) && (h = h + "margin-left:" + a.style_linevertical["margin-left"] + ";"), h += "}"), d = d + "#" + a.id + "{", this.isVal(a.animateDelay) && (d = d + "-webkit-animation-delay: " + a.animateDelay + ";", d = d + "animation-delay: " + a.animateDelay + ";"), this.isVal(a.animateDuration) && (d = d + "-webkit-animation-duration: " + a.animateDuration + "; animation-fill-mode: both;", d = d + "animation-duration: " + a.animateDuration + ";"), this.isVal(a.media.display) && ("button" == a.type_plugin ? d += "display:table;" : "item_slider" == a.type_plugin || (d = d + "display:" + a.media.display + ";")), (this.isVal(a.rotate) || this.isVal(a.skewx) || this.isVal(a.skewy)) && (d = d + "transform: skewY(" + a.skewy + "deg) skewX(" + a.skewx + "deg) rotate(" + a.rotate + "deg);", d = d + "mozTransform: skewY(" + a.skewy + "deg) skewX(" + a.skewx + "deg) rotate(" + a.rotate + "deg);", d = d + "msTransform: skewY(" + a.skewy + "deg) skewX(" + a.skewx + "deg) rotate(" + a.rotate + "deg);", d = d + "webkitTransform: skewY(" + a.skewy + "deg) skewX(" + a.skewx + "deg) rotate(" + a.rotate + "deg);", d = d + "oTransform: skewY(" + a.skewy + "deg) skewX(" + a.skewx + "deg) rotate(" + a.rotate + "deg);"), d = d + "}" + h, this.isVal(a.media.padding_left) || this.isVal(a.media.padding_right) || "image" != a.type_plugin && this.isVal(g) || this.isVal(a.opacity) || this.isVal(a.media.font_family) || this.isVal(a.media[b].color) || this.isVal(a.media.text_Transform) || this.isVal(a.media.font_weight) || "italic" == a.media.font_style || this.isVal(a.media.text_decoration) || this.isVal(a.line_spacing) || this.isVal(a.character_spacing) || this.isVal(a.media[b]["background-image"]) || this.isVal(a.media[b]["shadow-x"]) && this.isVal(a.media[b]["shadow-y"]) && this.isVal(a.media[b]["shadow-blur"]) && this.isVal(a.media[b]["shadow-color"]) || this.isVal(a.media[b].customCss)) {
        if (d = d + "#" + a.id + " > .widget-content{", this.isVal(a.typeFixed)) {
                switch (a.typeFixed) {
                    case "topleft":
                        d = d + "top:" + a.fixedTop + ";left:" + a.fixedLeft + ";";
                        break;
                    case "topright":
                        d = d + "top:" + a.fixedTop + ";right:" + a.fixedRight + ";";
                        break;
                    case "bottomleft":
                        d = d + "bottom:" + a.fixedBottom + ";left:" + a.fixedLeft + ";";
                        break;
                    case "bottomright":
                        d = d + "bottom:" + a.fixedBottom + ";right:" + a.fixedRight + ";"
                }
                d += "position:fixed;"
            }
            if (g && g.length > 0 && (d += g), this.isVal(a.media.padding_left) && (d = d + "padding-left:" + a.media.padding_left + "px;"), this.isVal(a.media.padding_right) && (d = d + "padding-right:" + a.media.padding_right + "px;"), this.isVal(a.opacity) && (d = d + "opacity:" + a.opacity + ";"), this.isVal(a.media.font_family) && (a.media.font_family = PN_PAGE.setFontFamily(a.media.font_family), d = d + "font-family:" + a.media.font_family + ";", d += "text-rendering: optimizeLegibility;", d += " -webkit-font-smoothing: antialiased;"), this.isVal(a.media[b].color) && (a.media[b].color.search("rgb") && -1 == a.media[b].color.search("#") && (a.media[b].color = "#" + a.media[b].color), "item_form" == a.type_plugin && a.type_form && a.type_form.search("select") >= 0 ? c += "#" + a.id + " select.widget-content option{color: " + a.media[b].color + "}" : d = d + "color:" + a.media[b].color + ";", "box" != a.type_plugin && "shape" == a.type_plugin && (e = e + "#" + a.id + "> .widget-content svg{fill:" + a.media[b].color + ";}")), this.isVal(a.media.text_Transform) && (d = d + "text-transform:" + a.media.text_Transform + ";"), this.isVal(a.media.font_weight) && (d = d + "font-weight:" + a.media.font_weight + ";"), "italic" == a.media.font_style && (d += "font-style:italic;"), this.isVal(a.media.text_decoration) && (d += "text-decoration:" + a.media.text_decoration + ";", d += "-webkit-text-decoration-line:" + a.media.text_decoration + ";"), this.isVal(a.line_spacing) && (d = d + "line-height:" + a.line_spacing + ";"), (this.isVal(a.character_spacing) || 0 == a.character_spacing) && (d = d + "letter-spacing:" + a.character_spacing + ";"), this.isVal(a.media[b]["background-image"])) {
                var k;
                k = a.media[b].typePosBgImg ? a.media[b].typePosBgImg : a.media.typePosBgImg ? a.media.typePosBgImg : "center";
                var l = "";
                l = a.media[b].typeBgImage ? a.media[b].typeBgImage : a.media.typeBgImage;
                var m = a.repeatBg;
                switch (m || (m = "no-repeat"), l) {
                    case "para":
                        d = d + "background-size: cover;background-attachment: fixed;background-position: top " + k + ";background-repeat:" + m + ";";
                        break;
                    case "stre":
                        d = d + "background-size:cover;background-attachment: scroll;background-position: top " + k + ";background-repeat:" + m + ";";
                        break;
                    case "streWH":
                        d = d + "background-size:100% 100%;background-attachment: scroll;background-position: top " + k + ";background-repeat:" + m + ";";
                        break;
                    case "streW":
                        d = d + "background-size:100% auto;background-attachment: scroll;background-position: top " + k + ";background-repeat:" + m + ";";
                        break;
                    case "streH":
                        d = d + "background-size:auto 100%;background-attachment: scroll;background-position: top " + k + ";background-repeat:" + m + ";";
                        break;
                    case "title":
                        d = d + "background-position: top " + k + ";background-repeat:" + m + ";";
                        break;
                    default:
                        d = d + "background-repeat:" + m + ";"
                }
            }
            var n = "boxshadow";
            ("textinline" == a.type_plugin || "textinline2" == a.type_plugin || "textinline3" == a.type_plugin || "textinline5" == a.type_plugin || "textparagraph" == a.type_plugin || "textsymbol" == a.type_plugin || "listop" == a.type_plugin) && (n = "textshadow"), this.isVal(a.media[b]["shadow-x"]) && this.isVal(a.media[b]["shadow-y"]) && this.isVal(a.media[b]["shadow-blur"]) && this.isVal(a.media[b]["shadow-color"]) && (d = "boxshadow" == n ? d + "box-shadow:" + a.media[b]["shadow-x"] + " " + a.media[b]["shadow-y"] + " " + a.media[b]["shadow-blur"] + " " + a.media[b]["shadow-color"] + ";" : d + "text-shadow:" + a.media[b]["shadow-x"] + " " + a.media[b]["shadow-y"] + " " + a.media[b]["shadow-blur"] + " " + a.media[b]["shadow-color"] + ";"), this.isVal(a.media[b].customCss) && (d += a.media[b].customCss), d += "}"
        }
    return d += e, d = d + this.cssborderElement(a, b) + this.cssplaceholderColor(a) + i, "image" == a.type_plugin && this.isVal(a.media.overlay_color) && (d += "#" + a.id + " > .punnel-widget-overlay{background-color:" + a.media.overlay_color + (PN_PAGE.toGradientColor(a.media[b].colorGradient) == PN_PAGE.nonGradientColor ? "" : (";background-image:" + PN_PAGE.toGradientColor(a.media[b].colorGradient))) + "}"), d += c
    },
    RenCssMobile.prototype.cssplaceholderColor = function (a) {
        var b = "";
        return this.isVal(a.media.placeholderColor) && (-1 == a.media.placeholderColor.search("rgb") && -1 == a.media.placeholderColor.search("#") && (a.media.placeholderColor = "#" + a.media.placeholderColor), b = b + "#" + a.id + " .widget-content::-webkit-input-placeholder{color:" + a.media.placeholderColor + "}", b = b + "#" + a.id + " .widget-content:-moz-placeholder{color:" + a.media.placeholderColor + "}", b = b + "#" + a.id + " .widget-content::-moz-placeholder{color:" + a.media.placeholderColor + "}", b = b + "#" + a.id + " .widget-content:-ms-input-placeholder{color:" + a.media.placeholderColor + "}", b += "#" + a.id + " select.widget-content option:first-child{color: " + a.media.placeholderColor + "}", b += "#" + a.id + " select.widget-content{color: " + a.media.placeholderColor + "}"), b
    },
    RenCssMobile.prototype.cssborderElement = function (a, b) {
        var c = "";
        return "contact_form" == a.type_plugin || "menu_header" == a.type_plugin || (this.isVal(a.media[b]["border-bottom-right-radius"]) || this.isVal(a.media[b]["border-bottom-left-radius"]) || this.isVal(a.media[b]["border-top-left-radius"]) || this.isVal(a.media[b]["border-top-right-radius"]) || this.isVal(a.media[b]["border-top"]) || this.isVal(a.media[b]["border-left"]) || this.isVal(a.media[b]["border-right"]) || this.isVal(a.media[b]["border-bottom"])) && (c = c + "#" + a.id + "> .widget-content{", (this.isVal(a.media[b]["border-bottom-right-radius"]) || this.isVal(a.media[b]["border-bottom-left-radius"]) || this.isVal(a.media[b]["border-top-left-radius"]) || this.isVal(a.media[b]["border-top-right-radius"])) && (a.media[b]["border-bottom-right-radius"] == a.media[b]["border-bottom-left-radius"] && a.media[b]["border-bottom-left-radius"] == a.media[b]["border-top-left-radius"] && a.media[b]["border-top-right-radius"] == a.media[b]["border-top-left-radius"] ? parseFloat(a.media[b]["border-top-left-radius"]) >= 0 ? c = c + "border-radius:" + a.media[b]["border-bottom-right-radius"] + ";" : c += "border-radius:0px;" : (this.isVal(a.media[b]["border-bottom-right-radius"]) && (c = c + "border-bottom-right-radius:" + a.media[b]["border-bottom-right-radius"] + ";"), this.isVal(a.media[b]["border-bottom-left-radius"]) && (c = c + "border-bottom-left-radius:" + a.media[b]["border-bottom-left-radius"] + ";"), this.isVal(a.media[b]["border-top-left-radius"]) && (c = c + "border-top-left-radius:" + a.media[b]["border-top-left-radius"] + ";"), this.isVal(a.media[b]["border-top-right-radius"]) && (c = c + "border-top-right-radius:" + a.media[b]["border-top-right-radius"] + ";"))),
            this.isVal(a.media[b]["border-color"]) && -1 == a.media[b]["border-color"].search("rgb") && -1 == a.media[b]["border-color"].search("#") && (a.media[b]["border-color"] = "#" + a.media[b]["border-color"]), (this.isVal(a.media[b]["border-top"]) || this.isVal(a.media[b]["border-left"]) || this.isVal(a.media[b]["border-right"]) || this.isVal(a.media[b]["border-bottom"])) && (a.media[b]["border-top"] == a.media[b]["border-left"] && a.media[b]["border-left"] == a.media[b]["border-right"] && a.media[b]["border-right"] == a.media[b]["border-bottom"] ? parseFloat(a.media[b]["border-top"]) >= 0 ? (c = c + "border-width:" + a.media[b]["border-top"] + ";", this.isVal(a.media[b]["border-style"]) && (c = c + "border-style:" + a.media[b]["border-style"] + ";"), this.isVal(a.media[b]["border-color"]) && (c = c + "border-color:" + a.media[b]["border-color"] + ";")) : c += "border:0px;" : (this.isVal(a.media[b]["border-top"]) && (c = c + "border-top-width:" + a.media[b]["border-top"] + ";"), this.isVal(a.media[b]["border-left"]) && (c = c + "border-left-width:" + a.media[b]["border-left"] + ";"), this.isVal(a.media[b]["border-right"]) && (c = c + "border-right-width:" + a.media[b]["border-right"] + ";"), this.isVal(a.media[b]["border-bottom"]) && (c = c + "border-bottom-width:" + a.media[b]["border-bottom"] + ";"), this.isVal(a.media[b]["border-style"]) && (c = c + "border-style:" + a.media[b]["border-style"] + ";"), this.isVal(a.media[b]["border-color"]) && (c = c + "border-color:" + a.media[b]["border-color"] + ";"))), c += "}", c = c + "#" + a.id + "> .punnel-widget-overlay-1{", (this.isVal(a.media[b]["border-bottom-right-radius"]) || this.isVal(a.media[b]["border-bottom-left-radius"]) || this.isVal(a.media[b]["border-top-left-radius"]) || this.isVal(a.media[b]["border-top-right-radius"])) && (a.media[b]["border-bottom-right-radius"] == a.media[b]["border-bottom-left-radius"] && a.media[b]["border-bottom-left-radius"] == a.media[b]["border-top-left-radius"] && a.media[b]["border-top-right-radius"] == a.media[b]["border-top-left-radius"] ? parseFloat(a.media[b]["border-top-left-radius"]) >= 0 ? c = c + "border-radius:" + a.media[b]["border-bottom-right-radius"] + ";" : c += "border-radius:0px;" : (this.isVal(a.media[b]["border-bottom-right-radius"]) && (c = c + "border-bottom-right-radius:" + a.media[b]["border-bottom-right-radius"] + ";"), this.isVal(a.media[b]["border-bottom-left-radius"]) && (c = c + "border-bottom-left-radius:" + a.media[b]["border-bottom-left-radius"] + ";"), this.isVal(a.media[b]["border-top-left-radius"]) && (c = c + "border-top-left-radius:" + a.media[b]["border-top-left-radius"] + ";"), this.isVal(a.media[b]["border-top-right-radius"]) && (c = c + "border-top-right-radius:" + a.media[b]["border-top-right-radius"] + ";"))), this.isVal(a.media[b]["border-color"]) && -1 == a.media[b]["border-color"].search("rgb") && -1 == a.media[b]["border-color"].search("#") && (a.media[b]["border-color"] = "#" + a.media[b]["border-color"]), (this.isVal(a.media[b]["border-top"]) || this.isVal(a.media[b]["border-left"]) || this.isVal(a.media[b]["border-right"]) || this.isVal(a.media[b]["border-bottom"])) && (a.media[b]["border-top"] == a.media[b]["border-left"] && a.media[b]["border-left"] == a.media[b]["border-right"] && a.media[b]["border-right"] == a.media[b]["border-bottom"] ? parseFloat(a.media[b]["border-top"]) >= 0 ? (c = c + "border-width:" + a.media[b]["border-top"] + ";", this.isVal(a.media[b]["border-style"]) && (c = c + "border-style:" + a.media[b]["border-style"] + ";"), this.isVal(a.media[b]["border-color"]) && (c = c + "border-color:" + a.media[b]["border-color"] + ";")) : c += "border:0px;" : (this.isVal(a.media[b]["border-top"]) && (c = c + "border-top-width:" + a.media[b]["border-top"] + ";"), this.isVal(a.media[b]["border-left"]) && (c = c + "border-left-width:" + a.media[b]["border-left"] + ";"), this.isVal(a.media[b]["border-right"]) && (c = c + "border-right-width:" + a.media[b]["border-right"] + ";"), this.isVal(a.media[b]["border-bottom"]) && (c = c + "border-bottom-width:" + a.media[b]["border-bottom"] + ";"), this.isVal(a.media[b]["border-style"]) && (c = c + "border-style:" + a.media[b]["border-style"] + ";"), this.isVal(a.media[b]["border-color"]) && (c = c + "border-color:" + a.media[b]["border-color"] + ";"))), c += "}"), c
    },
    RenCssMobile.prototype.cssMedia = function (a, b) {
        var c = "",
            d = "",
        e = "";
     //sửa bỏ image src
       if ("image" == a.type_plugin && a.parent.indexOf('POPUP')>0) {
            var f = "";
            a.link = this.resetImage(a.link), PN_PAGE.checkImage(a.link) ? (f = a.link.replace("hstatic.punnel.com//", "hstatic.punnel.com/"), "lamktvn@gmail.com" == PN_PAGE.account.email && (f = f.replace(ApiStatic, ApiStatic + "p" + Math.ceil(parseFloat(a.media[b].width) / sizeReziseImg) * sizeReziseImg + "x" + Math.ceil(parseFloat(a.media[b].height) / sizeReziseImg) * sizeReziseImg + "/")), f = this.zenImagePublish(a.link, a, b)) : f = a.link, c += "#" + a.id + " .widget-content:first-child .pn-show-image:first-child{width: 100%; height: 100%;background-position: center center; background-size: cover;background-image:url(" + f + ");}"
       }
    else if ("image" == a.type_plugin) {
        var f = "";
        a.link = this.resetImage(a.link), PN_PAGE.checkImage(a.link) ? (f = a.link.replace("hstatic.punnel.com//", "hstatic.punnel.com/"), "lamktvn@gmail.com" == PN_PAGE.account.email && (f = f.replace(ApiStatic, ApiStatic + "p" + Math.ceil(parseFloat(a.media[b].width) / sizeReziseImg) * sizeReziseImg + "x" + Math.ceil(parseFloat(a.media[b].height) / sizeReziseImg) * sizeReziseImg + "/")), f = this.zenImagePublish(a.link, a, b)) : f = a.link, c += "#" + a.id + " .widget-content:first-child .pn-show-image:first-child{width: 100%; height: 100%;background-position: center center; background-size: cover;}"
    }
    if ("desktop" != b && "widget-element" == a.lp_type && this.isVal(a.media[b]["background-image"])) {
           a.media[b]["background-image"] =  this.resetImage(a.media[b]["background-image"]);
        var img_media = ((a.type_plugin == "box" && a.parent.indexOf("POPUP") == -1) || (a.type_plugin == "widget_section" && a.popup != true)) ? "" : a.media[b]["background-image"];
           var g = img_media;
            //if (PN_PAGE.checkImage(img_media) && (parseFloat(a.media[b].width) > 1400 ? "lamktvn@gmail.com" == PN_PAGE.account.email && (g = img_media.replace(ApiStatic, ApiStatic + "p1400x3000/")) : "lamktvn@gmail.com" == PN_PAGE.account.email && (g = img_media.replace(ApiStatic, ApiStatic + "p" + Math.ceil(parseFloat(a.media[b].width) / sizeReziseImg) * sizeReziseImg + "x" + Math.ceil(parseFloat(a.media[b].height) / sizeReziseImg) * sizeReziseImg + "/")), g = this.zenImagePublish(img_media, a, b)), this.isVal(img_media) && (d = PN_PAGE.checkImage(img_media) ? d + 'url("' + g + '")' : d + 'url("' + img_media + '")'), this.isVal(a.media.overlay_color) ? "image" == a.type_plugin || (this.isVal(img_media) && this.isVal(a.media[b]["background-color"]) ? (e = e + "background-image: linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ")," + d + ";", e = e + "background-image: -o-linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ")," + d + ";", e = e + "background-image: -ms-linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ")," + d + ";", e = e + "background-image: -moz-linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ")," + d + ";", e = e + "background-image: -webkit-linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ")," + d + ";") : this.isVal(img_media) && (e = PN_PAGE.checkImage(img_media) ? e + 'background-image: url("' + g + '");' : e + 'background-image: url("' + img_media + '");')) : this.isVal(img_media) && (e = PN_PAGE.checkImage(img_media) ? e + 'background-image: url("' + g + '");' : e + 'background-image: url("' + img_media + '");'), this.isVal(a.media.desktop["background-image"])) {
                //var h;
        if (PN_PAGE.checkImage(a.media[b]["background-image"]) && (g = this.zenImagePublish(a.media[b]["background-image"], a, b)), this.isVal(a.media[b]["background-image"]) && (d = PN_PAGE.checkImage(a.media[b]["background-image"]) ? d + 'url("' + g + '")' : d + 'url("' + a.media[b]["background-image"] + '")'), this.isVal(a.media.overlay_color) ? "image" == a.type_plugin || (this.isVal(a.media[b]["background-image"]) && this.isVal(a.media[b]["background-color"]) ? (e = e + "background-image: linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ")," + d + ";", e = e + "background-image: -o-linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ")," + d + ";", e = e + "background-image: -ms-linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ")," + d + ";", e = e + "background-image: -moz-linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ")," + d + ";", e = e + "background-image: -webkit-linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ")," + d + ";") : this.isVal(a.media[b]["background-image"]) && (e = PN_PAGE.checkImage(a.media[b]["background-image"]) ? e + 'background-image: url("' + g + '");' : e + 'background-image: url("' + a.media[b]["background-image"] + '");')) : this.isVal(a.media[b]["background-image"]) && (e = PN_PAGE.checkImage(a.media[b]["background-image"]) ? e + 'background-image: url("' + g + '");' : e + 'background-image: url("' + a.media[b]["background-image"] + '");'), this.isVal(a.media.desktop["background-image"])) {
            var h;
                h = a.media[b].typePosBgImg ? a.media[b].typePosBgImg : a.media.typePosBgImg ? a.media.typePosBgImg : "center";
                var i;
                i = a.media[b].typeBgImage ? a.media[b].typeBgImage : a.media.typeBgImage;
                var j = a.repeatBg;
                switch (j || (j = "no-repeat"), i) {
                    case "para":
                        e = e + "background-size: cover; background-attachment: fixed; background-position: top " + h + ";background-repeat:" + j + ";";
                        break;
                    case "stre":
                        e = e + "background-size:cover;background-attachment: scroll;background-position:top " + h + ";background-repeat:" + j + ";";
                        break;
                    case "streWH":
                        e = e + "background-size:100% 100%;background-attachment: scroll;background-position:top " + h + ";background-repeat:" + j + ";";
                        break;
                    case "streW":
                        e = e + "background-size:100% auto;background-attachment: scroll;background-position:top " + h + ";background-repeat:" + j + ";";
                        break;
                    case "streH":
                        e = e + "background-size:auto 100%;background-attachment: scroll;background-position:top " + h + ";background-repeat:" + j + ";";
                        break;
                    case "title":
                        e = e + "background-position:top " + h + ";background-repeat:" + j + ";";
                        break;
                    default:
                        e = e + "background-repeat:" + j + ";"
                }
            }
    }
    else if (this.isVal(a.media[b]["background-image"]) == false && a.media[b].colorGradient && a.media[b].colorGradient != null) {
        e = e + ("background-image:" + PN_PAGE.toGradientColor(a.media[b].colorGradient) + ";");
    }
        if ("widget-element" == a.lp_type) {
            if (c = c + "#" + a.id + "{", this.isVal(a.media[b].display) && ("button" == a.type_plugin ? c += "none" == a.media[b].display ? "display:none!important;" : "display:table!important;" : c = c + "display:" + a.media[b].display + "!important;"), this.isVal(a.usingTopButon) || this.isVal(a.usingLeftRight) ? (c += "position:fixed!important;z-index:9999;", c = "top" == a.usingTopButon ? c + "top:" + a.fixedTop + "!important;" : c + 'top:""!important;bottom:' + a.fixedBottom + "!important;", c = "left" == a.usingLeftRight ? c + "left:" + a.fixedLeft + "!important;" : c + 'left:""!important;right:' + a.fixedRight + "!important;") : (this.isVal(a.media[b].top) && (c = c + "top:" + a.media[b].top + ";"), this.isVal(a.media[b].left) && (c = c + "left:" + a.media[b].left + ";")), this.isVal(a.media[b].padding) && "slider" != a.type_plugin && (c = c + "padding:" + a.media[b].padding + ";"), this.isVal(a.media[b].width) && (c = c + "width:" + a.media[b].width + ";"), this.isVal(a.media[b].height) && (c = c + "height:" + a.media[b].height + ";"), c += "}", this.isVal(a.media[b]["font-size"]) || this.isVal(a.media.mobile.line_spacing) || this.isVal(a.media[b]["text-align"]) || "item_menu" == a.type_plugin && "mobile" == b || "image" != a.type_plugin && this.isVal(e)) {
                if (c = c + "#" + a.id + " > .widget-content {", "image" != a.type_plugin && this.isVal(e) && (c += e), this.isVal(a.media[b]["font-size"]) && (c = c + "font-size:" + a.media[b]["font-size"] + ";"), this.isVal(a.media[b]["text-align"]) && (c = c + "text-align:" + a.media[b]["text-align"] + ";"), this.isVal(a.media.mobile.line_spacing) && "mobile" == b && (c = c + "line-height:" + a.media.mobile.line_spacing + ";"), "item_menu" == a.type_plugin && "mobile" == b) {
                    var k = a.media.mobile["background-color"],
                        l = a.media.mobile.color,
                        m = a.media.mobile["border-width"],
                        n = a.media.mobile["border-color"];
                    this.isVal(k) && (c = c + "background-color:" + k + ";"), this.isVal(l) && (c = c + "color:" + l + "!important;"), this.isVal(m) && (c = c + "border-width:" + m + "!important;"), this.isVal(n) && (c = c + "border-color:" + n + "!important;")
                }
                c += "}"
            }
            c += this.styleList(a, b)
        } else {
            var o = "",
                p = 0, gc='';
            if ("desktop" != b && "widget-element" != a.lp_type)
                if (this.isVal(a.media[b]["background-image"])) {
                    a.media[b]["background-image"] = this.resetImage(a.media[b]["background-image"]);
                    var img_media = ((a.type_plugin == "box" && a.parent.indexOf("POPUP") == -1) || (a.type_plugin == "widget_section" && a.popup != true)) ? "" : a.media[b]["background-image"];
                    var q = img_media, q = this.zenImagePublish(img_media, a, b);
                    //if (, this.isVal(a.media.overlay_color)) {
                    //    var r = new OptionWiget;
                    //    p = r.getOpacityOverLay(a.media.overlay_color)
                    //}
                    debugger
                    if (this.isVal(a.media[b].colorGradient) || this.isVal(a.media.overlay_color)) {
                        var grd = "linear-gradient(" + a.media.overlay_color + "," + a.media.overlay_color + ')',
                            grdC = PN_PAGE.toGradientColor(a.media[b].colorGradient),
                            gc = grdC == PN_PAGE.nonGradientColor ? grd : grdC;
                        p = 1;
                    }

                    if (p > 0 && this.isVal(img_media) ? PN_PAGE.checkImage(img_media) ? (o = o + "background-image:" + gc + ',url("' + q + '");'
                        , o = o + "background-image:-o-" + gc + ',url("' + q + '");',
                        o = o + "background-image:-ms-" + gc + ',url("' + q + '");',
                        o = o + "background-image:-moz-" + gc + ',url("' + q + '");',
                        o = o + "background-image:-webkit-" + gc + ',url("' + q + '");')
                        : (o = o + "background-image:" + gc + ',url("' + img_media + '");',
                            o = o + "background-image:-o-" + gc + ',url("' + img_media + '");',
                            o = o + "background-image:-ms-" + gc + ',url("' + img_media + '");',
                            o = o + "background-image:-moz-" + gc + ',url("' + img_media + '");',
                            o = o + "background-image:-webkit-" + gc + ',url("' + img_media + '");')
                        : this.isVal(img_media) && (o = PN_PAGE.checkImage(img_media) ? o + 'background-image:url("' + q + '");'
                            : o + 'background-image:url("' + img_media + '");'), this.isVal(img_media)) {
                        var h;
                        h = a.media[b].typePosBgImg ? a.media[b].typePosBgImg : a.media.typePosBgImg ? a.media.typePosBgImg : "center";
                        var i;
                        i = a.media[b].typeBgImage ? a.media[b].typeBgImage : a.media.typeBgImage;
                        var j = a.repeatBg;
                        switch (j || (j = "no-repeat"), i) {
                            case "para":
                                o = o + "background-size:cover; background-attachment: fixed;background-position: center top;background-repeat:" + j + ";";
                                break;
                            case "stre":
                                o = o + "background-size:cover;background-attachment: scroll;background-position:top " + h + ";background-repeat:" + j + ";";
                                break;
                            case "streWH":
                                o = o + "background-size:100% 100%;background-attachment: scroll;background-position:top " + h + ";background-repeat:" + j + ";";
                                break;
                            case "streW":
                                o = o + "background-size:100% auto;background-attachment: scroll;background-position:top " + h + ";background-repeat:" + j + ";";
                                break;
                            case "streH":
                                o = o + "background-size:auto 100%;background-attachment: scroll;background-position:top " + h + ";background-repeat:" + j + ";";
                                break;
                            case "title":
                                o = o + "background-position:top " + h + ";background-repeat:" + j + ";";
                                break;
                            default:
                                o = o + "background-repeat:" + j + ";"
                        }
                    }
                } else if (this.isVal(a.media[b]["background-image"]) == false && a.media[b].colorGradient && a.media[b].colorGradient != null) {

                }else o += "background-image:none;";
            c = 1 == a.popup ? c + "#" + a.id + "{width:100%;height:100%;" : c + "#" + a.id + "{width:" + a.media[b].width + ";height:" + a.media[b].height + ";", (this.isVal(a.usingTopButon) || this.isVal(a.usingLeftRight)) && (c += "position:fixed!important;z-index:9999;", c = "top" == a.usingTopButon ? c + "top:" + a.fixedTop + "!important;" : c + 'top:""!important;bottom:' + a.fixedBottom + "!important;", c = "left" == a.usingLeftRight ? c + "left:" + a.fixedLeft + "!important;" : c + 'left:""!important;right:' + a.fixedRight + "!important;"), c += "}"
    }
    return "widget-section" == a.lp_type && (c = c + "#" + a.id + " .container{", 1 == a.popup && (this.isVal(a.media[b].width_container) ? c = c + "width:" + a.media[b].width_container + ";" : c += "mobile" == b ? "width:" + dummyData.viewport.size_mobile + "px;" : "width:" + dummyData.viewport.size_desktop + "px;", this.isVal(a.media[b].height_container) ? (c = c + "height:" + (a.media[b].height == '100vh' ? a.media[b].height : a.media[b].height_container) + ";", c = c + (a.media[b].popupPos == 'Trên trái' ? "top:0px !important; left:0px !important;position:absolute;" : a.media[b].popupPos == 'Trên phải' ? "top:0px !important; right:0px !important;position:absolute;" : a.media[b].popupPos == 'Dưới trái' ? "top:auto!important;bottom:0px !important; left:0px !important;position:absolute;" : a.media[b].popupPos == 'Dưới phải' ? "auto!important;bottom:0px !important; right:0px !important;position:absolute;" : "top:calc(100%-" + a.media[b].height_container + ");")) : (c += "height:500px;", c += "top:calc(100%-500px);")), c += "}", c = c + "#" + a.id + "{", "none" == a.media[b].display && (c += "display:none;"), c = c + o + "}"), c
    },
    RenCssMobile.prototype.isVal = function (a) {
        return void 0 == a || "" == a || "undefined" == a ? !1 : !0
    },
    RenCssMobile.prototype.cssHover = function (a) {
        var b = "";
        if (this.isVal(a.hover_element)) {
            if (b = b + "#" + a.id + ":hover>.widget-content {", this.isVal(a.hover_element.colorBg) && (b = b + "background:" + a.hover_element.colorBg + ";"), this.isVal(a.hover_element.opacityEle) && (b = b + "opacity:" + a.hover_element.opacityEle + ";"), this.isVal(a.hover_element.colorBorder)) {
                var c = "1px",
                    d = "1px",
                    e = "1px",
                    f = "1px",
                    g = "solid";
                this.isVal(a.media.desktop["border-top"]) && "0px" != a.media.desktop["border-top"] && (c = a.media.desktop["border-top"]), this.isVal(a.media.desktop["border-left"]) && "0px" != a.media.desktop["border-left"] && (d = a.media.desktop["border-left"]), this.isVal(a.media.desktop["border-right"]) && "0px" != a.media.desktop["border-right"] && (e = a.media.desktop["border-right"]), this.isVal(a.media.desktop["border-bottom"]) && "0px" != a.media.desktop["border-bottom"] && (f = a.media.desktop["border-bottom"]), this.isVal(a.media.desktop["border-style"]) && (g = a.media.desktop["border-style"]), b = b + "border-style:" + g + ";", b = b + "border-bottom-width:" + f + ";", b = b + "border-right-width:" + e + ";", b = b + "border-left-width:" + d + ";", b = b + "border-top-width:" + c + ";", b = b + "border-color:" + a.hover_element.colorBorder + ";"
            }
            if (this.isVal(a.hover_element.colorShadow)) {
                var h = "1px",
                    i = "1px",
                    j = "3px";
                this.isVal(a.media.desktop["shadow-x"]) && "0px" != a.media.desktop["shadow-x"] && (h = a.media.desktop["shadow-x"]), this.isVal(a.media.desktop["shadow-y"]) && "0px" != a.media.desktop["shadow-y"] && (i = a.media.desktop["shadow-y"]), this.isVal(a.media.desktop["shadow-blur"]) && "0px" != a.media.desktop["shadow-blur"] && (j = a.media.desktop["shadow-blur"]), b = "textinline" == a.type_plugin || "textparagraph" == a.type_plugin || "textsymbol" == a.type_plugin || "listop" == a.type_plugin ? b + "text-shadow:" + h + " " + i + " " + j + " " + a.hover_element.colorShadow + ";" : b + "box-shadow:" + h + " " + i + " " + j + " " + a.hover_element.colorShadow + ";"
            }
            this.isVal(a.hover_element.zoomEle) && (b += "-webkit-transition: all 1s ease; -moz-transition: all 1s ease; -o-transition: all 1s ease; -ms-transition: all 1s ease;transition: all 1s ease;", b = b + "-webkit-transform: scale(" + a.hover_element.zoomEle + "); -moz-transform: scale(" + a.hover_element.zoomEle + "); -ms-transform: scale(" + a.hover_element.zoomEle + "); -o-transform: scale(" + a.hover_element.zoomEle + ");transform: scale(" + a.hover_element.zoomEle + ");"), this.isVal(a.hover_element.colorText) && (b = b + "color:" + a.hover_element.colorText + ";"), b += "}", this.isVal(a.hover_element.colorText) && (b = b + "#" + a.id + ":hover>.widget-content  a{color:" + a.hover_element.colorText + "}", b = b + "#" + a.id + ":hover>.widget-content  svg{fill:" + a.hover_element.colorText + "}"), this.isVal(a.hover_element.hover_placeholderColor) && (b = b + "#" + a.id + " .widget-content:hover::-webkit-input-placeholder{color:" + a.hover_element.hover_placeholderColor + "}", b = b + "#" + a.id + " .widget-content:hover:-moz-placeholder{color:" + a.hover_element.hover_placeholderColor + "}", b = b + "#" + a.id + " .widget-content:hover::-moz-placeholder{color:" + a.hover_element.hover_placeholderColor + "}", b = b + "#" + a.id + " .widget-content:hover:-ms-input-placeholder{color:" + a.hover_element.hover_placeholderColor + "}")
    }

    return b + RenCssMobile.prototype.cssHoverNew(a);
    },
    RenCssMobile.prototype.cssHoverNew = function (a) {
    var b = "", val_bg = a.media.desktop['background-color-hover'], val_text = a.media.desktop['color-hover'];
    if (this.isVal(val_bg) || this.isVal(val_text)) {
            b = b + "#" + a.id + ":hover>.widget-content {";
        if (this.isVal(val_bg)) b = b + "background:" + val_bg + ";"
        if (this.isVal(val_text)) b = b + "color:" + val_text + ";"
        b = b + " }";
        }
        return b
    },
    RenCssMobile.prototype.styleList = function (a, b) {
        var c = "";
        if ("listop" == a.type_plugin) {
            var d, e, f, g, h, i, j, k, l, m;
            if (d = PN_PAGE.checkImage(a.icon_list_image) ? this.zenImagePublish(a.icon_list_image, a, b) : a.icon_list_image, e = a.icon_list_svg, f = a.typeicon, h = a.media.color_icon, "svg" == f && h && h.length > 0) {
                var n = '<svg fill="' + h + '"';
                e = e.replace("<svg", n)
            }
            "mobile" == b ? (m = a.media.mobile.character_spacing_icon, this.isVal(m) || (m = a.media.character_spacing_icon), i = a.media.mobile.widthIcon, this.isVal(i) || (i = a.widthIcon), j = a.media.mobile.heightIcon, this.isVal(j) || (j = a.heightIcon), k = a.media.mobile.lineList, this.isVal(k) || (k = a.lineList), l = a.media.mobile.topIcon, this.isVal(l) || (l = a.topIcon), g = parseFloat(i) / 2 + "px") : (m = a.media.character_spacing_icon, g = parseFloat(a.widthIcon) / 2 + "px", i = a.widthIcon, j = a.heightIcon, k = a.lineList, l = a.topIcon), c = c + "#" + a.id + " > ol.widget-content li::before{", c += "", this.isVal(a.media[b].content) && (c = c + "content: counter(linum, " + a.media[b].content + ");"), i && i.length > 0 && (c = c + "width:" + i + ";"), j && j.length > 0 && (c = c + "height:" + j + ";"), l && l.length > 0 && (c = c + "top:" + l + " !important;"), g && g.length > 0 && (c = c + "font-size:" + g + ";"), this.isVal(a.media.color_icon) && (c = c + "color:" + a.media.color_icon + ";"), this.isVal(m) && (c = c + "margin-right:" + m + ";"), "image" == f && this.isVal(d) && (c += 'content:"";', c = c + "background:url('" + d + "');background-repeat: no-repeat;background-size:100% 100%;", c += "position:relative;top:0px;left:0;"), "svg" == f && this.isVal(e) && (c = c + "content:url('data:image/svg+xml;utf8," + e + "');", c += "background-repeat: no-repeat;", c += "position:relative;top:0px;left:0;"), c += "}", k && k.length > 0 && (c = c + "#" + a.id + " > ol.widget-content li{margin-bottom:" + k + ";}", c = c + "#" + a.id + " > ol.widget-content li:last-child{margin-bottom:0px;}")
        }
        return c
    },
    RenCssMobile.prototype.resetImage = function (a) {
        var b = a;
        return PN_PAGE.checkImage(b) && (-1 != b.search("hstatic.punnel.com//") && (b = b.replace("hstatic.punnel.com//", "hstatic.punnel.com/")), -1 != b.search("hstatic.punnel.com/d/") && (b = b.replace("hstatic.punnel.com/d/", "hstatic.punnel.com/")), -1 != b.search("hstatic.punnel.com/t/") && (b = b.replace("hstatic.punnel.com/t/", "hstatic.punnel.com/")), -1 != b.search("hstatic.punnel.com/m/") && (b = b.replace("hstatic.punnel.com/m/", "hstatic.punnel.com/")), -1 != b.search("hstatic.punnel.com//") && (b = b.replace("hstatic.punnel.com//", "hstatic.punnel.com/"))), b
    },
    RenCssMobile.prototype.zenImagePublish = function (img_url, api_element, i) {
    var cols = 100;
    var new_img_url = this.resetImage(img_url);
    if (PN_PAGE.checkPunnelImage(img_url) == true) {
        var _h = api_element.media[i].height;
        if (_h == "100vh") _h = "800";
        
        if ("widget-section" == api_element.lp_type) {
            if ("desktop" == i && new_img_url.indexOf("/img/s1440x") < 0) {
                new_img_url = new_img_url.replace(ApiStatic, ApiStatic + "s1440x" + Math.ceil((parseFloat(_h) + 100) / cols) * cols + "/")
            } else if ("mobile" == i && new_img_url.indexOf("/img/s500x") < 0) {
                new_img_url = new_img_url.replace(ApiStatic, ApiStatic + "s500x" + Math.ceil((parseFloat(_h) + 100) / cols) * cols + "/")
            }
        } else if ("listop" == api_element.type_plugin && new_img_url.indexOf("/img/s100x100") < 0) {
            new_img_url = new_img_url.replace(ApiStatic, ApiStatic + "s100x100/")
        } else {
            new_img_url = new_img_url.replace(ApiStatic, ApiStatic + "s" + Math.ceil((parseFloat(api_element.media[i].width) + 100) / cols) * cols + "x" + Math.ceil((parseFloat(_h) + 100) / cols) * cols + "/");
        }
    }
    return new_img_url;

        //return PN_PAGE.checkPunnelImage(img_url) && (new_img_url = "widget-section" == api_element.lp_type ? "desktop" == i ? new_img_url.replace(ApiStatic, ApiStatic + "s1440x" + Math.ceil((parseFloat(api_element.media[i].height) + 100) / cols) * cols + "/") : new_img_url.replace(ApiStatic, ApiStatic + "s500x" + Math.ceil((parseFloat(api_element.media[i].height) + 100) / cols) * cols + "/") : "listop" == api_element.type_plugin ? new_img_url.replace(ApiStatic, ApiStatic + "s100x100/") :
        //    new_img_url.replace(ApiStatic, ApiStatic + "s" + Math.ceil((parseFloat(api_element.media[i].width) + 100) / cols) * cols + "x" + Math.ceil((parseFloat(api_element.media[i].height) + 100) / cols) * cols + "/")), new_img_url;
    };