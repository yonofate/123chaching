angular.module("punnelApp").controller("contentTemplatePageCtr", ["$rootScope", "$state", "$scope", "$stateParams", "$restful", "$window", "$auth", "popupService", function (a, b, c, d, e, f, g, popupService) {
    1 == localStorage.getItem("coundReload") && (localStorage.setItem("coundReload", 0), pageSave = !0, f.location.reload()), c.emailSt = "";
    var h = setInterval(function () {
        PN_PAGE.account.email && PN_PAGE.account.email.length > 0 && (c.emailSt = PN_PAGE.account.email, clearInterval(h))
    }, 200);

    c.typePage = typeAddNew + "";
    var i = 0;
    var g = setInterval(function () {
        if (15 > i) {
            c.typePage = typeAddNew + "";
        } else {
            clearInterval(g);
        }
        i++;
    }, 500);

    c.checkB = function () {
        var a = f.navigator.userAgent,
            b = {
                chrome: /chrome/i,
                safari: /safari/i,
                firefox: /firefox/i,
                ie: /internet explorer/i
            };
        for (var c in b)
            if (b[c].test(a)) return c;
        return "unknown"
    }, "chrome" != c.checkB() && b.go("not-suport"), c.checkClick = !0, c.loadingData = !1, $(".loading").css({
        opacity: "1"
    }).show(), c.fnUpdateTitle = function () {
        e.put("/template", {
            id: d.id,
            name: c.updateTitle
        }, function (a, b) {
            b && b.data && 200 == b.code ? ($("#header .title a").text(c.updateTitle), $("#update-title-page").modal("hide")) : b ? PN_PAGE.messageLadi(b.messager) : PN_PAGE.messageLadi("Vui lòng thử lại hoặc liên hệ với chúng tôi!")
        })
    }, c.selectedItemElement = function () {
        selectedItem && selectedItem.length > 0 || (selectedItem = PN_PAGE.getElement(".widget-element.selected"))
    }, c.messageUpdate = function () {
        Intercom("showNewMessage", "Tôi đã chuyển khoản, hãy nâng cấp tài khoản!")
    }, c.showlayerTab = function (a, b) {
        b.preventDefault(), $(".layers-element .myTab li").removeClass("active"), $('.layers-element li[data-active="' + a + '"]').addClass("active"), $(".layers-element .tab-content .tab-pane").hide(), $("#layer-" + a).show();
        var c = new TreeWidget;
        c.layer(), setTimeout(function () {
            $(".layers-element").show()
        }, 1e3)
    }, c.showLayer = function (a) { }, c.showImageManager = function () {
        typeImage = "image", popupService.imageManagerShow()
    }, c.selectForm = function () {
        if (selectedItem && selectedItem.length > 0 && "item_form" == selectedItem.attr("pn-type")) {
            var a = new OptionWiget,
                b = a.getParentElement(selectedItem),
                c = new IframeClick;
            c.addClassSelected(b);
            var d = new ShowBoxResize;
            d.showBox(selectedItem)
        }
    }, c.showSettingFixed = function () {
        $(".aside-setting .widget-item:visible .group-content-setting").hide(), $(".aside-setting .widget-item:visible .widget-title i").addClass("ion-arrow-right-b").removeClass("ion-arrow-down-b"), $(".aside-setting .widget-item.custom-fixed .group-content-setting").show(), $(".aside-setting .widget-item.custom-fixed .widget-title i").addClass("ion-arrow-down-b").removeClass("ion-arrow-right-b")
    },
    //dev-sua
    c.showOption = function () {
        $(".aside-setting").show();
    },
    c.showCustomLink = function () {
        $(".aside-setting .widget-item:visible .group-content-setting").hide(), $(".aside-setting .widget-item:visible .widget-title i").addClass("ion-arrow-right-b").removeClass("ion-arrow-down-b"), $(".aside-setting .widget-item.custom-links .group-content-setting").show(), $(".aside-setting .widget-item.custom-links .widget-title i").addClass("ion-arrow-down-b").removeClass("ion-arrow-right-b"), $(".aside-setting .widget-item.custom-tracking .group-content-setting").show(), $(".aside-setting .widget-item.custom-tracking .widget-title i").addClass("ion-arrow-down-b").removeClass("ion-arrow-right-b"), $("#box-full").trigger("click")
    }, c.selectAllText = function () {
        document.execCommand("selectAll", !1, null)
    }, c.cancelgroupElement = function () {
        if (void 0 != selectedItem && "undefined" != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-group")) {
            var a = new EventKey;
            a.eventUngroup()
        }
    }, c.creategroupElement = function () {
        if (selectedItem && selectedItem.length > 0 && "GROUP_TMP" == selectedItem.attr("id")) {
            var a = new EventKey;
            a.createGroup(selectedItem)
        }
    },c.aligngroupElement = function (pos) {
        if (selectedItem && selectedItem.length > 0 && "GROUP_TMP" == selectedItem.attr("id")) {
            var a = new EventKey;
            a.alignGroup(selectedItem, pos);
            $("#resizable-element").hide();
        }
    }, c.movedown = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = new BoxRightClick;
            a.moveBottom(), $(".click-right").hide()
        }
    }, c.moveup = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = new BoxRightClick;
            a.moveTop(), $(".click-right").hide()
        }
    }, c.duplicate = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = new BoxRightClick;
            a.boxRightClone(), $(".click-right").hide()
        }
    }, c.clonePopup = function () {
        var a = $(".resizable-popup");
        if (a && "none" != a.css("display") && a.attr("pn-id-popup") && a.attr("pn-id-popup").length > 0) {
            selectedItem = PN_PAGE.getElement("#" + a.attr("pn-id-popup"));
            var b = new BoxRightClick;
            b.boxRightClone(), PN_PAGE.messageLadi("Pop-up được nhân bản thành công. \nID Pop-up nhân bản là " + selectedItem.attr("id") + " \nVui lòng kiểm tra tại phần Layer -> Pop-up")
        }
    }, c.addNewSection = function (a) {
        if (1 != preview) switch (typeAddNew) {
            case 30:
                //$("#modal-add-popup").modal("show");
                popupService.popupManagerShow()
                break;
            default:
                popupService.sectionManagerShow()
               //$("#modal-add-section").modal("show")
        }
    }, c.editext = function () {
        showDivEdittext();
    }, c.exitPopup = function () {
        if (30 != typeAddNew) {
            var a = PN_PAGE.getElement("#" + $(".resizable-popup").attr("pn-id-popup"));
            if (a && a.length > 0) {
                a.hide();
                var b = new OptionWiget;
                if (b.addElementUndo("", a), $(".resizable-popup").hide(), $("#resizable-element").hide(), PN_PAGE.showElementEditorText(), $("#punnel-editor .selected").removeClass("selected"), selectedItem = $('.widget-element[pn-action-link="' + a.attr("id") + '"]'), selectedItem.addClass("selected"), selectedItem && selectedItem.length > 0) {
                    var c = new IframeClick;
                    c.showOptionProperties(selectedItem), $(".aside-setting .widget-item").hide()
                }
            }
        }
    }, c.showModalFormFieldNew = function () {
        $("#manager-form-field").unbind("modal").modal("show")
    }, c.deletePopup = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = $('.widget-element[pn-action-link="' + PN_PAGE.getElement("#" + $(".resizable-popup").attr("pn-id-popup")).attr("id") + '"]'),
                b = new BoxRightClick;
            if (b.boxRightDelete(), a && a.length > 0) {
                var c = PN_PAGE.getIndexElement(a.attr("id"));
                apiElement[c].type_link = "", apiElement[c].element_popup = "", apiElement[c].link_popup = "";
                var d = new IframeClick;
                d.addClassSelected(a), d.showOptionProperties(a);
                var e = new ShowBoxResize;
                e.showBox(a)
            }
            $(".resizable-popup").hide();
            var f = new TreeWidget;
            f.layerHide(), f.layer()
        }
    }, c.deleteElement = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = new BoxRightClick,
                b = new IframeClick;
            switch (selectedItem.attr("pn-type")) {
                case "item_slider":
                    var c = new OptionWiget,
                        d = c.getParentElement(selectedItem),
                        f = d.find('.widget-element[pn-type="item_slider"]'),
                        g = parseFloat(selectedItem.css("left")),
                        h = parseFloat(f.eq(0).css("width"));
                    if (f.length > 2) {
                        a.boxRightDelete(), selectedItem = void 0, b.showOptionProperties(selectedItem);
                        var i, j, k = 0;
                        f = d.find('.widget-element[pn-type="item_slider"]');
                        var l = f.last(),
                            m = d.outerWidth() - parseFloat(l.css("left")) + l.outerWidth();
                        f.each(function () {
                            j = PN_PAGE.getIndexElement($(this).attr("id")), i = k * h, apiElement[j].media[deviceEdit].left = i + "px", 0 > m ? parseFloat($(this).css("left")) > g && $(this).animate({
                                left: parseFloat($(this).css("left")) - h + "px"
                            }) : parseFloat($(this).css("left")) < g && $(this).animate({
                                left: parseFloat($(this).css("left")) + h + "px"
                            }), k++
                        })
                    } else PN_PAGE.messageLadi("Cần có ít nhất 2 phần tử để chạy trình chiếu");
                    break;
                case "item_form":
                    var c = new OptionWiget,
                        d = c.getParentElement(selectedItem),
                        n = PN_PAGE.getIndexElement(d.attr("id"));
                    if (d && "contact_form" == d.attr("pn-type") && apiElement[n].valueApiForm && apiElement[n].valueApiForm.length > 0)
                        for (var o = 0; o < apiElement[n].valueApiForm.length; o++)
                            if (apiElement[n].valueApiForm[o].name == name) {
                                apiElement[n].valueApiForm.splice(o, 1);
                                break
                            }
                    a.boxRightDelete(), selectedItem = void 0, b.showOptionProperties(selectedItem);
                    break;
                default:
                    if (selectedItem && "contact_form" == selectedItem.attr("pn-type")) {
                        var j = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                        e.post("/Config/DeleteFormDetail", {
                            id: apiElement[j].formdetailid
                        }, function (a, b) { })
                    }
                    a.boxRightDelete(), selectedItem = void 0, b.showOptionProperties(selectedItem)
            }
            showAddNewSection();
            var p = new TreeWidget;
            p.layer()
        }
    },
    ////dev-sua
    //c.setTextAlign = function (val) {
    //    var editor_element = $(".editor-text");
    //    if (selectedItem && selectedItem.length > 0 || "none" != editor_element.css("display")) {
    //        if ("none" != editor_element.css("display")) {
    //            selectedItem = $("#punnel-editor #" + editor_element.attr("pn-id"));
    //        }
    //        $(".text-align-custom li").removeClass("active");
    //        $('.text-align-custom li[pn-active="' + val + '"]').addClass("active");
    //        var element_index = PN_PAGE.getIndexElement(selectedItem.attr("id"));
    //        apiElement[element_index].media.desktop["text-align"] = val;
    //        if (1 != apiElement[element_index].sortmobile) {
    //            apiElement[element_index].media.mobile["text-align"] = val;
    //        }
    //        selectedItem.css({
    //            "text-align": val
    //        });
    //        editor_element.css({
    //            "text-align": val
    //        });
    //        var option_widget = new OptionWiget;
    //        option_widget.resetValueHeightText(selectedItem);
    //        option_widget.editextElement();
    //    }
    //},

    c.createGrid = function (a) {
        a.preventDefault();
        var b = $(".grid-system");
        b && "none" == b.css("display") ? "desktop" == deviceEdit ? (b.removeClass("grid-mobile").show(), $(".child-grid").addClass("active")) : (b.addClass("grid-mobile").show(), $(".child-grid").addClass("active")) : (b.hide(), $(".child-grid.grid-item").removeClass("active")), "mobile" == deviceEdit && b.hide();
        var c = $(".widget-section:visible .container").eq(0);
        c && c.length > 0 ? b.css({
            left: c.offset().left + "px",
            margin: "0px"
        }) : b.css({
            left: "0px",
            margin: "0px"
        })
    }, c.convertElementToBackground = function () {
        var a = new OptionWiget;
        a.addElementUndo("", selectedItem), $(".settings.active").removeClass("active");
        var b = PN_PAGE.getIndexElement(selectedItem.attr("id")),
            c = a.getParentSection(selectedItem),
            d = c.find('.widget-element[pn-type-background="important"]');
        if (d && d.length > 0);
        else {
            apiElement[b].parent = "#" + c.attr("id"), selectedItem.prependTo(c), selectedItem.addClass("important"), apiElement[b].addClassBackground = "important", selectedItem.attr("pn-type-background", "important");
            var e = new OptionWiget;
            if (e.sortWg(), "googlemap" == selectedItem.attr("pn-type")) {
                var f, g = 14;
                if (apiElement[b].value_google_map) {
                    g = apiElement[b].value_google_map.zoom;
                    var h = apiElement[b].value_google_map.address;
                    f = void 0 != apiElement[b].value_google_map.icon && "" != apiElement[b].value_google_map.icon ? '<div class="pn-maptitle"><p><img src="' + apiElement[b].value_google_map.icon + '"></p><p>' + apiElement[b].value_google_map.title + "</p></div>" : apiElement[b].value_google_map.title
                } else g = 14, h = "Ha Noi", f = "Hoan Kiem, Ha Noi, Viet Nam";
                var i = selectedItem.find(".widget-content").eq(0)[0],
                    j = new OptionWiget;
                j.createMapsgoogle(i, g, h, f)
            }
            a = new OptionWiget, a.addElementUndo("", selectedItem), $("#resizable-element").hide()
        }
    }, c.convertBackgroundToElement = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = void 0;
            if (a = selectedItem.hasClass("widget-section") ? selectedItem.find(".important").eq(0) : selectedItem, a && a.length > 0) {
                var b = new OptionWiget;
                b.addElementUndo("", a), $(".settings.active").removeClass("active");
                var c = PN_PAGE.getIndexElement(a.attr("id")),
                    d = a.parent();
                apiElement[c].parent = "#" + d.attr("id") + " .container", a.appendTo(d.find(".container")), a.removeClass("important"), apiElement[c].addClassBackground = "", a.attr("pn-type-background", "");
                var e = new OptionWiget;
                if (e.sortWg(), "googlemap" == a.attr("pn-type")) {
                    var f, g = 14;
                    if (apiElement[c].value_google_map) {
                        g = apiElement[c].value_google_map.zoom;
                        var h = apiElement[c].value_google_map.address;
                        f = void 0 != apiElement[c].value_google_map.icon && "" != apiElement[c].value_google_map.icon ? '<div class="pn-maptitle"><p><img src="' + apiElement[c].value_google_map.icon + '"></p><p>' + apiElement[c].value_google_map.title + "</p></div>" : apiElement[c].value_google_map.title
                    } else g = 14, h = "Ha Noi", f = "Hoan Kiem, Ha Noi, Viet Nam";
                    var i = a.find(".widget-content").eq(0)[0],
                        j = new OptionWiget;
                    j.createMapsgoogle(i, g, h, f)
                }
                b.addElementUndo("", a), $("#resizable-element").hide()
            }
        }
    }, c.addItemSlider = function () {
        if (selectedItem && selectedItem.length > 0 && "slider" == selectedItem.attr("pn-type")) {
            var a = selectedItem.attr("id"),
                b = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                c = 0,
                d = new AddToFrame;
            selectedItem.find(".widget-content:eq(0) .wrap-child:eq(0)").append(valueTemplate.item_slider);
            var e = selectedItem.find("#pn-new");
            void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain && (c = dummyData.numLayerMain), e.attr("id", e.attr("pn-lang") + "" + c), e.css({
                top: "0px",
                width: selectedItem.css("width"),
                height: "100%"
            }), $("#punnel-editor .widget-element.selected").removeClass("selected"), selectedItem = e, selectedItem.addClass("selected"), c++, dummyData.numLayerMain = c, d.apiDefault("item_slider", "widget-element", e.attr("id"), "", e.css("top"), e.css("left"), e.css("width"), e.css("height"));
            var f = PN_PAGE.getIndexElement(e.attr("id"));
            apiElement[f].media.mobile.width = apiElement[b].media.mobile.width, apiElement[f].media.mobile.height = apiElement[b].media.mobile.height, apiElement[f].media.desktop.width = apiElement[b].media.desktop.width, apiElement[f].media.desktop.height = apiElement[b].media.desktop.height;
            var g = $("#punnel-editor #" + a).find(".wrap-child").eq(0),
                h = g.offset().left;
            h -= e.offset().left, g.animate({
                left: h + "px"
            });
            var i = Math.round((0 - h) / selectedItem.outerWidth());
            setVisiableElementSlider(selectedItem, i)
        }
    }, c.showNextItemSlider = function () {
        if (selectedItem && selectedItem.length > 0 && "slider" == selectedItem.attr("pn-type")) {
            var a = selectedItem.find('.widget-element[pn-type="item_slider"]:last');
            if (a && a.length > 0) {
                var b = selectedItem.outerWidth(),
                    c = selectedItem.find(".wrap-child").eq(0);
                c.finish();
                var d = parseFloat(c.css("left"));
                if (a.offset().left > selectedItem.offset().left) {
                    d -= b;
                    var e = Math.round((0 - d) / selectedItem.outerWidth());
                    if (e < selectedItem.find('.widget-element[pn-type="item_slider"]').length) {
                        selectedItem.find(".widget-element").css({
                            visibility: "visible"
                        }), c.animate({
                            left: d + "px"
                        }, function () {
                            setVisiableElementSlider(selectedItem, e)
                        });
                        var f = selectedItem.find('.widget-element[pn-type="item_slider"]').eq(e).attr("id");
                        $(".custom-manager-slider .item-slider").removeClass("active"), $('.custom-manager-slider .item-slider[pn-active="' + f + '"]').addClass("active")
                    }
                }
            }
        }
    }, c.showPrevItemSlider = function () {
        if (selectedItem && selectedItem.length > 0 && "slider" == selectedItem.attr("pn-type")) {
            var a = selectedItem.find('.widget-element[pn-type="item_slider"]:eq(0)');
            if (a && a.length > 0) {
                var b = selectedItem.outerWidth(),
                    c = selectedItem.find(".wrap-child").eq(0);
                c.finish();
                var d = parseFloat(c.css("left"));
                if (a.offset().left < selectedItem.offset().left) {
                    d += b;
                    var e = Math.round((0 - d) / selectedItem.outerWidth());
                    if (e < selectedItem.find('.widget-element[pn-type="item_slider"]').length) {
                        selectedItem.find(".widget-element").css({
                            visibility: "visible"
                        }), c.animate({
                            left: d + "px"
                        }, function () {
                            setVisiableElementSlider(selectedItem, e)
                        });
                        var f = selectedItem.find('.widget-element[pn-type="item_slider"]').eq(e).attr("id");
                        $(".custom-manager-slider .item-slider").removeClass("active"), $('.custom-manager-slider .item-slider[pn-active="' + f + '"]').addClass("active")
                    }
                }
            }
        }
    }, c.resetMobile = function () {
        var a = new OptionWiget;
        a.sortWg();
        for (var b = new SortElementMobile, c = 0; c < apiElement.length; c++) apiElement[c].sortmobile = 0, apiElement[c].mobile = 0;
        PN_PAGE.sortMobilePublish = 1, b.sortItem(), b.sortFormHightToLow("desktop");
        var d = PN_PAGE.getElement(".widget-section");
        d.each(function () {
            var a = new ResizeSection;
            a.setHeightSection($(this))
        }), $("#resizable-element").hide()
    }, c.resetMobileSection = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a, b = new OptionWiget;
            if (a = selectedItem.hasClass("widget-section") ? selectedItem : b.getParentSection(selectedItem), a && a.length > 0) {
                var c, d = a.find(".widget-element");
                c = PN_PAGE.getIndexElement(a.attr("id")), apiElement[c].sortmobile = 0, apiElement[c].mobile = 0, d && d.length > 0 && d.each(function () {
                    c = PN_PAGE.getIndexElement($(this).attr("id")), apiElement[c].sortmobile = 0, apiElement[c].mobile = 0
                }), PN_PAGE.sortMobilePublish = 1;
                var e = new SortElementMobile;
                e.sortItem(), e.sortFormHightToLow("desktop"), $("#resizable-element").hide()
            }
            var f = new ResizeSection;
            f.setHeightSection(a);
            var g = new ShowBoxResize;
            g.showBoxSection(a)
        }
    }, c.showCustomhtml = function () {
        $("#custom-html").unbind("modal").modal("show")
    }, c.showmanagerShape = function () {
        typeselecteShape = "", $("#managerShape").unbind("modal").modal("show")
    }, c.showModalFormField = function () {
        $("#my-modal-form-field").unbind("modal").modal("show")
    }, c.showmodalFormSave = function () {
        $("#saveDataForms").modal("show")
    }, c.changeLangElement = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].lang = $(a.target).text(), selectedItem.attr("pn-lang", apiElement[b].lang)
        }
    }, c.hideElementMobile = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.mobile.display = "none";
            var b = new OptionWiget;
            if (b.fixSizeParentElement(selectedItem), "button" == selectedItem.attr("pn-type")) {
                var c = selectedItem.attr("style"),
                    d = c.split(";");
                if (c = "", d && d.length > 0) {
                    for (var e = 0; e < d.length; e++) -1 != d[e].search("display") && (d[e] = "display:none!important"), c += d[e] + ";"; -1 == c.search("display") && (c += "display:none!important")
                }
                selectedItem.attr("style", c)
            } else selectedItem.hide();
            b.calulatorAllGroup(selectedItem), b.sapXepAnHienMobile(selectedItem), $("#resizable-element").hide(), $("#resizable-section").hide(), selectedItem = void 0
        }
    }, c.hideSectionMobile = function () {
        var a = $(".reset-mobile .list-edit-mobile li").eq(1).attr("id-section");
        if (a && a.length > 0) {
            var b = PN_PAGE.getIndexElement(a);
            apiElement[b].media.mobile.display = "none";
            var c = new OptionWiget,
                d = $("#punnel-editor #" + a);
            d.hide(), c.calulatorAllGroup(d), c.fixSizeParentElement(d), c.sapXepAnHienMobile(d), $("#resizable-element").hide(), $("#resizable-section").hide()
        }
    }, c.showEditPopup = function () {
        if ("none" != $(".resizable-popup").css("display")) {
            var a = $("#punnel-editor #" + $(".resizable-popup").attr("pn-id-popup")),
                b = new IframeClick;
            b.addClassSelected(a), $("#settingPopup").modal("show")
        }
    }, c.chatHotro = function () {
        Intercom("showNewMessage", "Tôi cần hỗ trợ sử dụng LadiPage!")
    }, c.tongleRuleShow = 1, c.tongleRule = function (a) {
        if (1 == a.which) {
            var b = $("#cmn-toggle-1-rule");
            b.hasClass("active") ? (b.removeClass("active"), c.hideRule(), c.tongleRuleShow = 0) : (b.addClass("active"), c.showRule(), c.tongleRuleShow = 1)
        }
    }, c.showLuoi = function () {
        $("#create-grid").modal("show")
    }, c.hideRule = function () {
        $(".vertical-line").hide(), $(".horizontal-line").hide()
    }, c.showRule = function () {
        $(".vertical-line").show(), $(".horizontal-line").show()
    }
}]);