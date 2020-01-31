var ResizeSection = function () { };
ResizeSection.prototype.init = function () {
    this.resizeBoxSection(), this.resizePopup()
},
ResizeSection.prototype.setHeightSection = function (a) {
    if (a && a.length > 0) {
        var b, c = a.find(".widget-element:visible");
        b = "true" == a.attr("pn-popup") ? a.find(".container:eq(0)").offset().top : a.offset().top;
        var d = a.outerHeight(),
            e = b + d;
        if (c && c.length > 0 && (e = 0, c.each(function () {
                if ("none" != $(this).css("display")) {
                    var a = $(this).outerHeight(),
                        b = $(this).offset().top;
                    b + a > e && (e = b + a)
        }
        }), e > 0)) {
            e = e + 20 - b;
            var f = PN_PAGE.getIndexElement(a.attr("id"));
            "true" == a.attr("pn-popup") ? (a.find(".container:eq(0)").css({
                height: e + "px"
            }), apiElement[f].media["" + deviceEdit].height_container = e + "px") : (a.css({
                height: e + "px"
            }), apiElement[f].media["" + deviceEdit].height = e + "px")
        }
    }
},
ResizeSection.prototype.resizePopup = function () {
    $(".resizable-popup").each(function () {
        $(this).resizable({
            destroy: !0
        })
    });
    var a, b, c, d;
    new ShowBoxResize;
    $(".resizable-popup").resizable({
        scroll: !1,
        handles: "n, w, e, s",
        start: function (a, b) {
            a.preventDefault()
        },
        resize: function (e, f) {
            e.preventDefault();
            var g = void 0;
            if ("true" == selectedItem.attr("pn-popup")) g = selectedItem, b = $(this).css("width"), c = $(this).css("height"), selectedItem.find(".container").css({
                width: b,
                height: c
            }), d = PN_PAGE.getIndexElement(selectedItem.attr("id")), apiElement[d].media[deviceEdit].width_container = b, apiElement[d].media[deviceEdit].height_container = c, a = selectedItem.find(".container").offset().top, $(this).css({
                left: selectedItem.find(".container").offset().left + "px",
                top: a + "px"
            });
            else {
                var h = $("#" + $(".resizable-popup").attr("pn-id-popup"));
                g = h, h && h.length > 0 && "none" != h.css("display") && (b = $(this).css("width"), c = $(this).css("height"), h.find(".container").css({
                    width: b,
                    height: c
                }), d = PN_PAGE.getIndexElement(h.attr("id")), apiElement[d].media[deviceEdit].width_container = b, apiElement[d].media[deviceEdit].height_container = c, a = h.find(".container").offset().top, $(this).css({
                    left: h.find(".container").offset().left + "px",
                    top: a + "px"
                }))
            }
            g.find(".container:eq(0)").offset().top < 85 ? $(this).find(".edit-element").css({
                top: 50 - selectedItem.find(".container:eq(0)").offset().top + "px"
            }) : $(this).find(".edit-element").css({
                top: "-40px"
            })
        },
        stop: function (a, b) { }
    })
},
ResizeSection.prototype.checkChild = function (a) {
    if (a && a.length > 0) {
        var b = a.find(".container > .widget-element");
        return b && b.length > 0 && b.each(function () {
            return $(this).offset().top + $(this).outerHeight() > a.offset().top + a.outerHeight() ? !1 : !0
        }), !0
    }
    return !1
},
ResizeSection.prototype.resizeBoxSection = function () {
    var a = this;
    $("#resizable-section").each(function () {
        $(this).resizable({
            destroy: !0
        })
    }), $("#resizable-section").resizable({
        scroll: !1,
        handles: "s",
        start: function (a, b) { },
        resize: function (b, c) {
            if (selectedItem && selectedItem.hasClass("widget-section")) {
                a.checkChild(selectedItem) && selectedItem.css({
                    height: c.size.height + "px"
                });
                var d = selectedItem.find(".container > .widget-element");
                d && d.length > 0 && d.each(function () {
                    if ("none" != $(this).css("display") && $(this).offset().top + $(this).outerHeight() > selectedItem.offset().top + selectedItem.outerHeight()) {
                        var a = parseFloat($(this).css("top")) + $(this).outerHeight();
                        selectedItem.css({
                            height: a + "px"
                        }), $("#resizable-section").css({
                            height: a + "px"
                        })
                    }
                })
            }
            showAddNewSection()
        },
        stop: function (b, c) {
            if (b.preventDefault(), selectedItem && selectedItem.hasClass("widget-section")) {
                selectedItem.css({
                    height: $(this).outerHeight() + "px"
                });
                var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[d].media[deviceEdit].height = $(this).outerHeight() + "px", selectedItem.outerHeight() > 150 && (apiElement[d].stickyUsing = "0")
            }
            a.resizeImportantMap()
        }
    })
},
ResizeSection.prototype.resizeImportantMap = function () {
    if (void 0 !== selectedItem && selectedItem.length > 0) {
        var a = selectedItem.find(".widget-element.important").eq(0);
        if (void 0 != a && a.length > 0 && "undefined" != a && "googlemap" == a.attr("pn-type")) {
            var b = PN_PAGE.getIndexElement(a.attr("id")),
                c = apiElement[b].value_google_map.zoom,
                d = apiElement[b].value_google_map.address;
            if (void 0 != apiElement[b].value_google_map.icon && "" != apiElement[b].value_google_map.icon) var e = '<div class="pn-maptitle"><p><img src="' + apiElement[b].value_google_map.icon + '"></p><p>' + apiElement[b].value_google_map.title + "</p></div>";
            else var e = apiElement[b].value_google_map.title;
            var f = a.find(".widget-content").eq(0)[0],
                g = new OptionWiget;
            g.createMapsgoogle(f, c, d, e)
        }
    }
};