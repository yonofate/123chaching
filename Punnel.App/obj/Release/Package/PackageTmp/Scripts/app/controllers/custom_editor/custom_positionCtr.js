angular.module("punnelApp").controller("custom_positionCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", function (a, b, c, d, e, f) {
    d.use(localStorage.getItem("lang")), $('.settings[pn-setting="basic"]').addClass("active"), c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.top = parseFloat(apiElement[a].media[deviceEdit].top), c.left = parseFloat(apiElement[a].media[deviceEdit].left), "true" == selectedItem.attr("pn-popup") ? (c.parWidth = apiElement[a].media[deviceEdit].width_container, c.parHeight = apiElement[a].media[deviceEdit].height_container, c.width = parseFloat(apiElement[a].media[deviceEdit].width_container), c.height = parseFloat(apiElement[a].media[deviceEdit].height_container)) : (c.parWidth = apiElement[a].media[deviceEdit].width, c.parHeight = apiElement[a].media[deviceEdit].height, c.width = parseFloat(apiElement[a].media[deviceEdit].width), c.height = parseFloat(apiElement[a].media[deviceEdit].height)), void 0 != apiElement[a].media[deviceEdit].top && "undefined" != apiElement[a].media[deviceEdit].top ? c.unitTop = apiElement[a].media[deviceEdit].top.replace(c.top, "") : c.unitTop = "px", void 0 !== apiElement[a].media[deviceEdit].left ? c.unitLeft = apiElement[a].media[deviceEdit].left.replace(c.left, "") : c.unitLeft = "px", void 0 !== c.parWidth ? c.unitWidth = c.parWidth.replace(c.width, "") : c.unitWidth = "px", void 0 !== c.parHeight ? c.unitHeight = c.parHeight.replace(c.height, "") : c.unitHeight = "px", c.rotate = apiElement[a].rotate, (void 0 == c.rotate || "" == c.rotate) && (c.rotate = 0, apiElement[a].rotate = 0), c.idelement = apiElement[a].id, "none" != apiElement[a].media.display ? ($('.item[pn-setting="custom-position-item"] i[pn-active="hideElement"]').show(), $('.item[pn-setting="custom-position-item"] i[pn-active="showElement"]').hide()) : ($('.item[pn-setting="custom-position-item"] i[pn-active="hideElement"]').hide(), $('.item[pn-setting="custom-position-item"] i[pn-active="showElement"]').show()), $('.item[pn-setting="custom-position-item"] .open-close-properties').hasClass("ion-android-arrow-dropdown") ? ($('.advanced[pn-setting="custom-position-item"] .pn-content-settings').show(), $('.item[pn-setting="custom-position-item"] .open-close-properties').parent().parent().addClass("active")) : ($('.advanced[pn-setting="custom-position-item"] .pn-content-settings').hide(), $('.item[pn-setting="custom-position-item"] .open-close-properties').parent().parent().removeClass("active"))
        }
    });
    var g = function (a) {
        c.errorMessage = a, f(function () { }, 2e3)
    };
    c.hideElement = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            $('.item[pn-setting="custom-position-item"] i[pn-active="hideElement"]').hide(), $('.item[pn-setting="custom-position-item"] i[pn-active="showElement"]').show();
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.display = "none", selectedItem.attr("pn-display", "none");
            var b = selectedItem.find(".widget-element");
            void 0 != b && b.length > 0 && b.each(function () {
                var a = PN_PAGE.getIndexElement($(this).attr("id"));
                apiElement[a].media.display = "none", $(this).attr("pn-display", "none"), $(this).hide()
            }), selectedItem.hasClass("widget-section") && $(".button-par-add-new-section-empty").hide(), selectedItem.hide();
            var c = new OptionWiget;
            c.fixsizeBody();
            var d = new TreeWidget;
            d.init(), selectedItem = void 0, $("#resizable-section").hide(), $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide(), $('.settings[pn-setting="custom-event"]').removeClass("active"), $(".secondary-column.layers .header i").removeClass("active"), $('.secondary-column.layers .header i[pn-active="hide"]').addClass("active")
        }
    }, c.showelement = function () {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            $('.item[pn-setting="custom-position-item"] i[pn-active="hideElement"]').show(), $('.item[pn-setting="custom-position-item"] i[pn-active="showElement"]').hide();
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].media.display = "block", selectedItem.show(), selectedItem.attr("pn-display", "block");
            var b = selectedItem.find(".widget-element");
            void 0 != b && b.length > 0 && b.each(function () {
                var a = PN_PAGE.getIndexElement($(this).attr("id"));
                apiElement[a].media.display = "block", $(this).attr("pn-display", "block"), $(this).show()
            });
            var c = new OptionWiget;
            c.fixsizeBody();
            var d = new TreeWidget;
            d.init(), $(".secondary-column.layers .header i").removeClass("active"), $('.secondary-column.layers .header i[pn-active="show"]').addClass("active")
        }
    }, c.changeName = function () {
        if (selectedItem && selectedItem.length > 0) {
            var b = new OptionWiget,
                d = b.resetID(c.idelement),
                e = selectedItem.attr("id");
            if ("" != d && void 0 != d && null != d) {
                var f = PN_PAGE.getElement("#" + d);
                if (f.length <= 0) {
                    var h = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                    if (a.id = d, c.idelement = d, selectedItem.attr("pn-lang", d), selectedItem.attr("id", d), apiElement[h].lang = d, apiElement[h].id = d, selectedItem = PN_PAGE.getElement("#" + d), "contact_form" == selectedItem.attr("pn-type")) {
                        var i = PN_PAGE.getElement('.widget-element[pn-parent="' + e + '"]'),
                            j = PN_PAGE.getIndexElement(i.attr("id"));
                        apiElement[j].id_parent = d, i.attr("pn-parent", d)
                    }
                } else g(d + " : existed")
            } else g("ID can not be empty")
        }
    }, c.selectText = function (a) {
        $(a.target).select()
    }, c.moveBack = function () {
        var a = new BoxRightClick;
        a.moveBottom()
    }, c.moveTop = function () {
        var a = new BoxRightClick;
        a.moveTop()
    }, c.duplicate = function () {
        var a = new BoxRightClick;
        a.boxRightClone()
    }, c.deleteItem = function () {
        var a = new BoxRightClick;
        a.boxRightDelete()
    }, c.setvalueRotate = function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-element")) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                b = $("#resizable-element"),
                d = $("#resizable-element").find(".textRotate");
            selectedItem.css({
                transform: "rotate(" + c.rotate + "deg)"
            }), selectedItem.css({
                mozTransform: "rotate(" + c.rotate + "deg)"
            }), selectedItem.css({
                msTransform: "rotate(" + c.rotate + "deg)"
            }), selectedItem.css({
                webkitTransform: "rotate(" + c.rotate + "deg)"
            }), selectedItem.css({
                oTransform: "rotate(" + c.rotate + "deg)"
            }), b.css({
                transform: "rotate(" + c.rotate + "deg)"
            }), b.css({
                mozTransform: "rotate(" + c.rotate + "deg)"
            }), b.css({
                msTransform: "rotate(" + c.rotate + "deg)"
            }), b.css({
                webkitTransform: "rotate(" + c.rotate + "deg)"
            }), b.css({
                oTransform: "rotate(" + c.rotate + "deg)"
            }), d.css({
                transform: "rotate(" + -c.rotate + "deg)"
            }), d.css({
                mozTransform: "rotate(" + -c.rotate + "deg)"
            }), d.css({
                msTransform: "rotate(" + -c.rotate + "deg)"
            }), d.css({
                webkitTransform: "rotate(" + -c.rotate + "deg)"
            }), d.css({
                oTransform: "rotate(" + -c.rotate + "deg)"
            }), apiElement[a].rotate = c.rotate
        }
    }, c.setvalue = function () {
        setTimeout(function () {
            if (void 0 != selectedItem && selectedItem.length > 0) {
                var a = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                    b = new ShowBoxResize;
                if (selectedItem.hasClass("widget-element")) apiElement[a].media[deviceEdit].top != c.top + c.unitTop && (apiElement[a].usingTopButon = "", apiElement[a].usingLeftRight = "", apiElement[a].media[deviceEdit].top = c.top + c.unitTop, selectedItem.css({
                    position: "absolute",
                    top: apiElement[a].media[deviceEdit].top,
                    left: apiElement[a].media[deviceEdit].left
                })), apiElement[a].media[deviceEdit].left != c.left + c.unitLeft && (apiElement[a].usingTopButon = "", apiElement[a].usingLeftRight = "", apiElement[a].media[deviceEdit].left = c.left + c.unitLeft, selectedItem.css({
                    position: "absolute",
                    top: apiElement[a].media[deviceEdit].top,
                    left: apiElement[a].media[deviceEdit].left
                })), apiElement[a].media[deviceEdit].width = c.width + c.unitWidth, apiElement[a].media[deviceEdit].height = c.height + c.unitHeight, selectedItem.css({
                    width: apiElement[a].media[deviceEdit].width,
                    height: apiElement[a].media[deviceEdit].height
                }), selectedItem.find(".widget-content").eq(0).css({
                    width: c.width + "px",
                    height: c.height + "px"
                }), b.showBox(selectedItem);
                else {
                    "true" == selectedItem.attr("pn-popup") ? (apiElement[a].media[deviceEdit].height_container = c.height + c.unitHeight, apiElement[a].media[deviceEdit].width_container = c.width + c.unitWidth, selectedItem.find(".container").eq(0).css({
                        height: apiElement[a].media[deviceEdit].height_container,
                        width: apiElement[a].media[deviceEdit].width_container
                    })) : (apiElement[a].media[deviceEdit].height = c.height + c.unitHeight, selectedItem.css({
                        height: apiElement[a].media[deviceEdit].height
                    })), b.showBoxSection(selectedItem);
                    var d = new OptionWiget;
                    d.fixsizeBody()
                }
            }
        }, 50)
    }, c.changeTypeUnitTop = function (a) {
        if (c.unitTop = a, void 0 != selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                d = new ShowBoxResize;
            selectedItem.hasClass("widget-element") ? (apiElement[b].media[deviceEdit].top = c.top + c.unitTop, selectedItem.css({
                top: apiElement[b].media[deviceEdit].top
            }), d.showBox(selectedItem)) : d.showBoxSection(selectedItem)
        }
    }, c.changeTypeUnitLeft = function (a) {
        if (c.unitLeft = a, void 0 != selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                d = new ShowBoxResize;
            selectedItem.hasClass("widget-element") ? (apiElement[b].media[deviceEdit].left = c.left + c.unitLeft, selectedItem.css({
                left: apiElement[b].media[deviceEdit].left
            }), d.showBox(selectedItem)) : d.showBoxSection(selectedItem)
        }
    }, c.changeTypeUnitWidth = function (a) {
        if (c.unitWidth = a, void 0 != selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                d = new ShowBoxResize;
            selectedItem.hasClass("widget-element") ? (apiElement[b].media[deviceEdit].width = c.width + c.unitWidth, selectedItem.css({
                width: apiElement[b].media[deviceEdit].width
            }), selectedItem.find(".widget-content:eq(0)").css({
                width: selectedItem.outerWidth() + "px"
            }), d.showBox(selectedItem)) : ("true" == selectedItem.attr("pn-popup") && (apiElement[b].media[deviceEdit].width_container = c.width + c.unitWidth, selectedItem.find(".container").eq(0).css({
                width: apiElement[b].media[deviceEdit].width_container
            })), d.showBoxSection(selectedItem))
        }
    }, c.changeTypeUnitHeight = function (a) {
        if (c.unitHeight = a, void 0 != selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id")),
                d = new ShowBoxResize;
            if (selectedItem.hasClass("widget-element")) apiElement[b].media[deviceEdit].height = c.height + c.unitHeight, selectedItem.css({
                height: apiElement[b].media[deviceEdit].height
            }), selectedItem.find(".widget-content:eq(0)").css({
                height: selectedItem.outerHeight() + "px"
            }), d.showBox(selectedItem);
            else {
                "true" == selectedItem.attr("pn-popup") ? (apiElement[b].media[deviceEdit].height_container = c.height + c.unitHeight, selectedItem.find(".container").eq(0).css({
                    height: apiElement[b].media[deviceEdit].height_container
                })) : (apiElement[b].media[deviceEdit].height = c.height + c.unitHeight, selectedItem.css({
                    height: apiElement[b].media[deviceEdit].height
                })), d.showBoxSection(selectedItem);
                var e = new OptionWiget;
                e.fixsizeBody()
            }
        }
    }, c.showContentSetting = function (a) {
        var b = $('.advanced[pn-setting="' + a + '"] .pn-content-settings');
        "none" == b.css("display") ? b.show() : b.hide()
    }
}]);