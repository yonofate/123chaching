angular.module("punnelApp").controller("customTextCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function ($rootScope, $state, seft, $translate, $stateParams) {
    $translate.use(localStorage.getItem("lang"));
    seft.idTMP = "";
    $rootScope.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && seft.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            seft.idTMP = selectedItem.attr("id");
            var id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            seft.paddingLeft = apiElement[id].media.padding_left;
            if (void 0 == seft.paddingLeft || "undefined" == seft.paddingLeft || "" == seft.paddingLeft) {
                seft.paddingLeft = 0;
            }
            seft.paddingRight = apiElement[id].media.padding_right;
            if (void 0 == seft.paddingRight || "undefined" == seft.paddingRight || "" == seft.paddingRight) {
                seft.paddingRight = 0;
            }
            seft.font_weight = apiElement[id].media.font_weight;
            if (void 0 == seft.font_weight || "undefined" == seft.font_weight || "" == seft.font_weight) {
                seft.font_weight = 400;
            }
            seft.font_size = apiElement[id].media.desktop["font-size"];
            if (void 0 == seft.font_size || "" == seft.font_size) {
                seft.font_size = 13;
            } else {
                seft.font_size = parseFloat(apiElement[id].media.desktop["font-size"]);
            }
            seft.linkAdd = apiElement[id].action;
            if (void 0 == seft.linkAdd || "" == seft.linkAdd) {
                seft.linkAdd = apiElement[id].action = "";
            }
            seft.target = apiElement[id].target;
            if (void 0 == seft.target || "" == seft.target) {
                seft.target = apiElement[id].target = "";
            }
            seft.font_family = apiElement[id].media.font_family;
            seft.color_font = apiElement[id].media.desktop.color;
            if (void 0 == seft.color_font || "" == seft.color_font) {
                seft.color_font = "rgba(0,0,0,1)";
            }
            seft.text_align = apiElement[id].media.desktop["text-align"];
            seft.character_spacing = apiElement[id].character_spacing;
            seft.line_spacing = apiElement[id].line_spacing;
            seft.font_style = apiElement[id].media.font_style;
            seft.text_decoration = apiElement[id].media.text_decoration;
            seft.text = apiElement[id].text;
            seft.font_class = apiElement[id].media.classFont;
            if (void 0 == seft.font_family || "" == seft.font_family) {
                seft.font_family = "'Open Sans',sans-serif";
            }
            if (void 0 == seft.character_spacing || "" == seft.character_spacing) {
                seft.character_spacing = 0;
            } else {
                seft.character_spacing = parseFloat(apiElement[id].character_spacing);
            }
            if (void 0 == seft.line_spacing || "" == seft.line_spacing) {
                seft.line_spacing = seft.font_size;
            } else {
                seft.line_spacing = parseFloat(apiElement[id].line_spacing);
            }
            seft.text_Transform = apiElement[id].media.text_Transform;
        }
    });
    seft.items = lp_colors_all;
    seft.itemkcc = number;
    seft.itemkcd = number;
    seft.itemclt = number;
    seft.itemclp = number;
    seft.setChangeColorInput = function (a, time) {
        var link_el = (new OptionWiget, time);
        if (void 0 != time && "" != time) {
            $("input.minicolor").colorpicker("setValue", link_el);
        } else {
            link_el = void 0 == a ? $("input.minicolor").val() : $(a.target).val();
        }
        seft.color_font = link_el;
    };
    seft.setText = function () {
        if (selectedItem && selectedItem.length > 0) {
            var id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[id].text = seft.text;
            selectedItem.find(".widget-content").eq(0).text(seft.text);
            apiElement[id].media[deviceEdit].height = selectedItem.css("height");
            $(".resizable-element").css({
                height: selectedItem.css("height")
            });
        }
    };
    seft.changeCLT = function (val) {
        seft.paddingLeft = val;
        seft.setValuePadding("paddingleft");
    };
    seft.changeCLP = function (val) {
        seft.paddingRight = val;
        seft.setValuePadding("paddingright");
    };
    seft.setValuePadding = function (val) {
        var b = $(".editor-text");
        if (selectedItem && selectedItem.length > 0 || "none" != b.css("display")) {
            if ("none" != b.css("display")) {
                selectedItem = $("#punnel-editor #" + b.attr("pn-id"));
                $("#resizable-element").hide();
            }
            var viewModel = new OptionWiget;
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ("paddingleft" == val) {
                apiElement[media_id].media.padding_left = seft.paddingLeft;
                selectedItem.find(".widget-content").eq(0).css({
                    "padding-left": seft.paddingLeft + "px"
                });
                viewModel.resetValueHeightText(selectedItem);
            } else {
                if ("paddingright" == val) {
                    apiElement[media_id].media.padding_right = seft.paddingRight;
                    selectedItem.find(".widget-content").eq(0).css({
                        "padding-right": seft.paddingRight + "px"
                    });
                    viewModel.resetValueHeightText(selectedItem);
                }
            }
            viewModel.resetValueHeightText(selectedItem);
            viewModel.editextElement();
        }
    };
    seft.changeFontWeight = function (val) {
        seft.font_weight = val;
        seft.setFontWeight();
    };
    seft.setFontWeight = function () {
        var editor_element = $(".editor-text");
        if (selectedItem && selectedItem.length > 0 || "none" != editor_element.css("display")) {
            if ("none" != editor_element.css("display")) {
                selectedItem = $("#punnel-editor #" + editor_element.attr("pn-id"));
                $("#resizable-element").hide();
            }
            var element_index = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[element_index].media.font_weight = seft.font_weight;
            selectedItem.find(".widget-content").eq(0).css({
                "font-weight": seft.font_weight
            });
            var option_widget = new OptionWiget;
            option_widget.resetValueHeightText(selectedItem);
            option_widget.editextElement();
        }
    };
    seft.changeKCD = function (val) {
        seft.line_spacing = val;
        seft.setValueLineSpacing();
    };
    seft.setValueLineSpacing = function () {
        var editor_element = $(".editor-text");
        if (selectedItem && selectedItem.length > 0 || "none" != editor_element.css("display")) {
            if ("none" != editor_element.css("display")) {
                selectedItem = $("#punnel-editor #" + editor_element.attr("pn-id"));
                $("#resizable-element").hide();
            }
            var element_index = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[element_index].line_spacing = seft.line_spacing + "px";
            selectedItem.find(".widget-content").eq(0).css({
                "line-height": seft.line_spacing + "px"
            });
            var option_widget = new OptionWiget;
            option_widget.resetValueHeightText(selectedItem);
            option_widget.editextElement();
        }
    };
    seft.changeKCC = function (val) {
        seft.character_spacing = val;
        seft.setValueCharacterSpacing();
    };
    seft.setValueCharacterSpacing = function () {
        var element_editor = $(".editor-text");
        if (selectedItem && selectedItem.length > 0 || "none" != element_editor.css("display")) {
            if ("none" != element_editor.css("display")) {
                selectedItem = $("#punnel-editor #" + element_editor.attr("pn-id"));
            }
            var element_index = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[element_index].character_spacing = seft.character_spacing + "px";
            selectedItem.find(".widget-content").eq(0).css({
                "letter-spacing": seft.character_spacing + "px"
            });
            var option_widget = new OptionWiget;
            option_widget.resetValueHeightText(selectedItem);
            option_widget.editextElement();
        }
    };
    seft.setTextAlign = function (val) {
        var editor_element = $(".editor-text");
        if (selectedItem && selectedItem.length > 0 || "none" != editor_element.css("display")) {
            if ("none" != editor_element.css("display")) {
                selectedItem = $("#punnel-editor #" + editor_element.attr("pn-id"));
            }
            $(".text-align-custom li").removeClass("active");
            $('.text-align-custom li[pn-active="' + val + '"]').addClass("active");
            var element_index = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[element_index].media.desktop["text-align"] = val;
            if (1 != apiElement[element_index].sortmobile) {
                apiElement[element_index].media.mobile["text-align"] = val;
            }
            selectedItem.css({
                "text-align": val
            });
            seft.text_align = val;
            editor_element.css({
                "text-align": val
            });
            var option_widget = new OptionWiget;
            option_widget.resetValueHeightText(selectedItem);
            option_widget.editextElement();
        }
    };
    seft.setColor = function (val) {
        val = PN_PAGE.checkColor(val);
        if (val) {
            var editor_element = $(".editor-text");
            if (selectedItem && selectedItem.length > 0 || "none" != editor_element.css("display")) {
                if ("none" != editor_element.css("display")) {
                    selectedItem = $("#punnel-editor #" + editor_element.attr("pn-id"));
                    $("#resizable-element").hide();
                }
                seft.color_font = val;
                var element_index = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                selectedItem.find(".widget-content:eq(0) *").attr("color", "");
                selectedItem.find(".widget-content:eq(0) *").css({
                    color: val
                });
                selectedItem.find(".widget-content").eq(0).css({
                    color: val
                });
                apiElement[element_index].media.desktop.color = val;
                apiElement[element_index].media.mobile.color = val;
                apiElement[element_index].text = selectedItem.find(".widget-content").eq(0).html();
                colorUsing = val;
                var option_widget = new OptionWiget;
                option_widget.resetValueHeightText(selectedItem);
            }
        }
    };
    seft.itemsFont = pn_fonts;
    seft.itemFrontSize = font_size;
    seft.changeFontSize = function (size) {
        if (selectedItem && selectedItem.length > 0) {
            seft.font_size = size;
            seft.setFontSize();
        }
    };
    seft.setFontSize = function () {
        var a = $(".editor-text");
        if (selectedItem && selectedItem.length > 0 || "none" != a.css("display")) {
            if ("none" != a.css("display")) {
                selectedItem = $("#punnel-editor #" + a.attr("pn-id"));
                $("#resizable-element").hide();
            }
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ("desktop" == deviceEdit) {
                apiElement[media_id].line_spacing = seft.font_size + 6 + "px";
                seft.line_spacing = seft.font_size + 6;
                selectedItem.find(".widget-content").eq(0).css({
                    "line-height": seft.line_spacing + "px"
                });
            }
            apiElement[media_id].media["" + deviceEdit]["font-size"] = seft.font_size + "px";
            if (1 != apiElement[media_id].sortmobile) {
                apiElement[media_id].media.mobile["font-size"] = seft.font_size + "px";
            }
            selectedItem.find(".widget-content").eq(0).css({
                "font-size": seft.font_size + "px",
                height: ""
            });
            apiElement[media_id].media[deviceEdit].height = selectedItem.find(".widget-content").eq(0).css("height");
            $(".resizable-element").css({
                height: selectedItem.find(".widget-content").eq(0).css("height")
            });
            var viewModel = new OptionWiget;
            viewModel.resetValueHeightText(selectedItem);
            viewModel.editextElement();
            if ("listop" == selectedItem.attr("pn-type")) {
                PN_PAGE.setTypeListIcon(apiElement[media_id]);
            }
        }
    };
    seft.setActive = function (forceDispatch) {
        if (selectedItem && selectedItem.length > 0) {
            seft.target = "";
            restoreSelection(savedSel);
            var time;
            var d = $("iframe.contentEditor");
            var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ("none" != d.css("display")) {
                [].forEach.call(d, function (a) {
                    time = a.contentWindow.getSelection().toString();
                });
                if (void 0 != time && "" != time && null != time && "button" != selectedItem.attr("pn-type")) {
                    if ("" == seft.linkAdd) {
                        d[0].contentWindow.document.execCommand("unlink", false, null);
                    } else {
                        d[0].contentWindow.document.execCommand("createLink", true, seft.linkAdd);
                        d[0].contentWindow.getSelection().anchorNode.parentElement.setAttribute("target", "");
                        apiElement[e].text = d.contents().find(".widget-content").eq(0).text();
                    }
                } else {
                    selectedItem.find(".widget-content").eq(0).attr({
                        href: seft.linkAdd,
                        target: ""
                    });
                    d.contents().find(".widget-content").eq(0).attr({
                        href: seft.linkAdd,
                        target: ""
                    });
                    apiElement[e].action = seft.linkAdd;
                    apiElement[e].target = "";
                }
            } else {
                selectedItem.find(".widget-content").eq(0).attr({
                    href: seft.linkAdd,
                    target: ""
                });
                apiElement[e].action = seft.linkAdd;
                apiElement[e].target = "";
            }
        }
    };
    seft.setTargetLink = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var iconValue;
            var d = $("iframe.contentEditor");
            seft.target = $(a.target).attr("pn-target");
            var dbindex = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ("none" != d.css("display")) {
                [].forEach.call(d, function (a) {
                    iconValue = a.contentWindow.getSelection().toString();
                });
                if (void 0 != iconValue && null != iconValue && "" != iconValue && "button" != selectedItem.attr("pn-type")) {
                    d[0].contentWindow.document.execCommand("createLink", true, seft.linkAdd);
                    d[0].contentWindow.getSelection().anchorNode.parentElement.setAttribute("target", seft.target);
                } else {
                    selectedItem.find(".widget-content").eq(0).attr("target", seft.target);
                    d.contents().find(".widget-content").eq(0).attr("target", seft.target);
                    apiElement[dbindex].target = seft.target;
                }
            } else {
                selectedItem.find(".widget-content").eq(0).attr("target", seft.target);
                apiElement[dbindex].target = seft.target;
            }
        }
    };
    seft.setLinkWeb = function () {
        if (selectedItem && selectedItem.length > 0) {
            var iconValue;
            var b = $("iframe.contentEditor");
            seft.linkAdd = $("input.input_link_web").val();
            var reasonsNum = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ("none" != b.css("display")) {
                [].forEach.call(b, function (b) {
                    iconValue = b.contentWindow.getSelection().toString();
                });
                if (void 0 != iconValue && null != iconValue && "" != iconValue && "button" != selectedItem.attr("pn-type")) {
                    b[0].contentWindow.document.execCommand("createLink", true, seft.linkAdd);
                    apiElement[reasonsNum].text = b.contents().find(".widget-content").eq(0).html();
                    $("input.input_link_web").focus();
                    $("input.input_link_web").val(seft.linkAdd);
                } else {
                    selectedItem.find(".widget-content").eq(0).attr("href", seft.linkAdd);
                    b.contents().find(".widget-content").eq(0).attr("href", seft.linkAdd);
                    apiElement[reasonsNum].action = seft.linkAdd;
                }
            } else {
                selectedItem.find(".widget-content").eq(0).attr("href", seft.linkAdd);
                apiElement[reasonsNum].action = seft.linkAdd;
            }
        }
    };
    seft.setActiveStyleText = function (a) {
        var b = $('.style-text li[pn-active="' + a + '"]');
        if (b && b.length > 0) {
            if (b.hasClass("active")) {
                b.removeClass("active");
            } else {
                b.addClass("active");
            }
        }
    };
    seft.setbold = function () {
        if (selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            var b = $('.style-text li[pn-active="bold"]');
            //if (b.hasClass("active")) {
            if(seft.font_weight == 700){
                apiElement[media_id].media.font_weight = 400;
                seft.font_weight = 400;
            } else {
                apiElement[media_id].media.font_weight = 700;
                seft.font_weight = 700;
            }
            seft.setFontWeight();
        }
    };
    seft.setItalic = function () {
        var a = $(".editor-text");
        if (selectedItem && selectedItem.length > 0 || "none" != a.css("display")) {
            if ("none" != a.css("display")) {
                selectedItem = $("#punnel-editor #" + a.attr("pn-id"));
                $("#resizable-element").hide();
            }
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            var khover = $('.style-text li[pn-active="italic"]');
            //if (khover.hasClass("active")) {
            if(seft.font_style == "italic"){
                apiElement[media_id].media.font_style = "";
            } else {
                apiElement[media_id].media.font_style = "italic";
            }
            seft.font_style = apiElement[media_id].media.font_style;
            selectedItem.find(".widget-content").eq(0).css({
                "font-style": seft.font_style
            });
            var viewModel = new OptionWiget;
            viewModel.resetValueHeightText(selectedItem);
            viewModel.editextElement();
        }
    };
    seft.setUnderline = function () {
        var a = $(".editor-text");
        if (selectedItem && selectedItem.length > 0 || "none" != a.css("display")) {
            if ("none" != a.css("display")) {
                selectedItem = $("#punnel-editor #" + a.attr("pn-id"));
                $("#resizable-element").hide();
            }
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            var khover = $('.style-text li[pn-active="underline"]');
            //if (khover.hasClass("active")) {
            if (seft.text_decoration == "underline") {
                apiElement[media_id].media.text_decoration = "";
                seft.text_decoration = "";
            } else {
                seft.text_decoration = "underline";
                apiElement[media_id].media.text_decoration = "underline";
            }
            selectedItem.find(".widget-content").eq(0).css({
                "text-decoration": seft.text_decoration
            });
            var viewModel = new OptionWiget;
            viewModel.resetValueHeightText(selectedItem);
            viewModel.editextElement();
        }
    };
    seft.seStrike = function () {
        var a = $(".editor-text");
        if (selectedItem && selectedItem.length > 0 || "none" != a.css("display")) {
            if ("none" != a.css("display")) {
                selectedItem = $("#punnel-editor #" + a.attr("pn-id"));
                $("#resizable-element").hide();
            }
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            var khover = $('.style-text li[pn-active="strike"]');
            if (khover.hasClass("active")) {
                apiElement[media_id].media.text_decoration = "";
                seft.text_decoration = "";
            } else {
                seft.text_decoration = "line-through";
                apiElement[media_id].media.text_decoration = "line-through";
            }
            selectedItem.find(".widget-content").eq(0).css({
                "text-decoration": seft.text_decoration
            });
            var viewModel = new OptionWiget;
            viewModel.resetValueHeightText(selectedItem);
            viewModel.editextElement();
        }
    };
    seft.setuppercase = function () {
        var a = $(".editor-text");
        if (selectedItem && selectedItem.length > 0 || "none" != a.css("display")) {
            if ("none" != a.css("display")) {
                selectedItem = $("#punnel-editor #" + a.attr("pn-id"));
                $("#resizable-element").hide();
            }
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $('.style-text li[pn-active="uppercase"]');
            if ("uppercase" != seft.text_Transform) {
                seft.text_Transform = "uppercase";
                apiElement[media_id].media.text_Transform = "uppercase";
                selectedItem.find(".widget-content").eq(0).css({
                    "text-transform": "uppercase"
                });
            } else {
                seft.text_Transform = "";
                apiElement[media_id].media.text_Transform = "";
                selectedItem.find(".widget-content").eq(0).css({
                    "text-transform": ""
                });
            }
            var viewModel = new OptionWiget;
            viewModel.resetValueHeightText(selectedItem);
            viewModel.editextElement();
        }
    };
    seft.addActiveEditor = function (a) {
        if ($(a.target).parent().hasClass("active")) {
            $(a.target).parent().removeClass("active");
        } else {
            $(a.target).parent().addClass("active");
        }
    };
    seft.addActiveAlign = function (a) {
        var filteredView = $(a.target).parent().parent();
        filteredView.find(".active").removeClass("active");
        $(a.target).parent().addClass("active");
    };
    seft.showFont = function () {
    };
    seft.show_color = function () {
        colorUsing = seft.color_font;
    };
    seft.showContentSetting = function (a) {
        var b = $('.advanced[pn-setting="' + a + '"] .pn-content-settings');
        if ("none" == b.css("display")) {
            b.css({
                display: "block"
            });
        } else {
            b.css({
                display: "none"
            });
        }
    };
    seft.setValueFont = function (y, offsetTextY, font, escala, entityContainer) {
        var g = $(".editor-text");
        if (selectedItem && selectedItem.length > 0 || "none" != g.css("display")) {
            if ("none" != g.css("display")) {
                selectedItem = $("#punnel-editor #" + g.attr("pn-id"));
                $("#resizable-element").hide();
            }
            var renderedAnnotation = $("#ID_BOX_EDITOR .contentEditor");
            var READONLY_CLS = selectedItem.attr("pn-type-font");
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (selectedItem.find(".widget-content").eq(0).removeClass(READONLY_CLS), selectedItem.find(".widget-content").eq(0).css({
              "font-family": offsetTextY,
              "font-weight": font
            }), selectedItem.attr("pn-type-font", y), apiElement[media_id].media.font_family = offsetTextY, apiElement[media_id].media.classFont = y, apiElement[media_id].media.font_weight = font, apiElement[media_id].media.font_name = escala, apiElement[media_id].media.font_api = entityContainer, "menu-header" == selectedItem.attr("pn-type")) {
                var syncedAnimals = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
                if (void 0 != syncedAnimals && syncedAnimals.length > 0) {
                    syncedAnimals.each(function () {
                        var READONLY_CLS = $(this).attr("pn-type-font");
                        var media_id = PN_PAGE.getIndexElement($(this).attr("id"));
                        $(this).find(".widget-content").eq(0).removeClass(READONLY_CLS);
                        $(this).find(".widget-content").eq(0).css({
                            "font-family": offsetTextY,
                            "font-weight": font
                        });
                        $(this).attr("pn-type-font", y);
                        apiElement[media_id].media.font_family = offsetTextY;
                        apiElement[media_id].media.classFont = y;
                        apiElement[media_id].media.font_weight = font;
                        apiElement[media_id].media.font_name = escala;
                        apiElement[media_id].media.font_api = entityContainer;
                    });
                }
            }
            renderedAnnotation.contents().find("body .widget-content").eq(0).attr("contenteditable", "true");
            seft.font_family = escala;
            seft.font_weight = font;
            seft.font_class = y;
            seft.font_name = escala;
            var viewModel = new OptionWiget;
            viewModel.resetValueHeightText(selectedItem);
            viewModel.editextElement();
        }
    };
    seft.showColorSetting = function (mmaModSurveyComponent) {
        if (selectedItem && selectedItem.length > 0) {
            $rootScope.typeColorPicker = mmaModSurveyComponent;
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $rootScope.colorPickerUsing = apiElement[media_id].media.desktop.color;
            $(".punnel-picker").hide();
            $("#lpColorPickerCtrl").colorpicker("setValue", $rootScope.colorPickerUsing);
            $(".widget-item.custom-color-picker").show();
        }
    };
}]);
