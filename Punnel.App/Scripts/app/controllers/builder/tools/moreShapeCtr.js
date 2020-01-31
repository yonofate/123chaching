angular.module("punnelApp").controller("moreShapeCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$sce", function (a, b, c, d, e, f) {
    d.use(localStorage.getItem("lang")), c.idTMP = "", a.$watch(function () {
        void 0 != selectedItem && selectedItem.length > 0 && "shape" == selectedItem.attr("pn-type") && c.idTMP != selectedItem.attr("id") && (c.idTMP = selectedItem.attr("id"), c.htmlCustom = selectedItem.find(".widget-content").html(), $("#managerShape .tab-content .item").show(), $("#myTabShape li").removeClass("active"), $("#myTabShape li").eq(0).addClass("active"))
    }), c.shape_select = "", c.shape_search = "", c.shapeYouUsing = "", c.shapecustom = "", c.indexSelect = "", c.itemGroupShapeMore = type_shape, c.typeLoad = "google_material", c.items_shape = shape_value[c.typeLoad], c.changeTypeLoad = function (a) {
        $(".loading").css({
            opacity: "0.4"
        }).show(), $("#myTabShape li").removeClass("active"), $('#myTabShape li[pn-active="' + a + '"]').addClass("active"), c.typeLoad = a, c.items_shape = shape_value[a], setTimeout(function () {
            $(".loading").css({
                opacity: "1"
            }).hide()
        }, 3e3)
    }, c.setValueShapeCustom = function () {
        if (c.shapecustom = $(".valueShapeCustom").val(), $(".shapeUsingCustom").html(""), -1 != c.shapecustom.search("<svg") && -1 != c.shapecustom.search("</svg")) {
            var a = selectedItem.find(".widget-content svg").attr("fill");
            $(".shapeUsingCustom").html(c.shapecustom), $(".shapeUsingCustom svg").attr("fill", a), $(".valueShapeCustom").val($(".shapeUsingCustom").html())
        }
    }, c.addnewshapewg = function () {
        var a = PN_PAGE.PUNNEL_EDIT,
            b = 0,
            d = new AddToFrame,
            e = d.eleAdd(!1);
        e.append(valueTemplate.shape);
        var f = a.contents().find("#pn-new");
        void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain && (b = dummyData.numLayerMain), f.attr("id", f.attr("pn-lang") + "" + b), b++, dummyData.numLayerMain = b;
        var g = $(window).outerHeight() / 2 - e.offset().top - TOP_FRAME - 16,
            h = (e.outerWidth() - 32) / 2;
        d.apiDefault("shape", "widget-element", f.attr("id"), "", g, h, "32px", "32px"), console.log(e), selectedItem = a.contents().find("#" + f.attr("id")), apiElement[apiElement.length - 1].htmlShape = c.shape_select, f.find(".widget-content").eq(0).html(c.shape_select);
        var i = new OptionWiget;
        i.addElementUndo("new", selectedItem);
        var j = new IframeClick;
        j.addClassSelected(selectedItem);
        var k = new ShowBoxResize;
        e.parent().hasClass("widget-section") && "true" == e.parent().attr("pn-popup") && "none" != e.parent().css("display") && (j.addClassSelected(e.parent()), k.showBoxSection(e.parent())), k.showBox(selectedItem), i.resetImageMobile(selectedItem);
        var l = new OptionWiget;
        l.fixSizeParent(selectedItem);
        var m = new TreeWidget;
        m.init(), $("#managerShape").modal("hide")
    }, c.selectShape = function () {
        if (selectedItem = $("#punnel-editor .widget-element.selected"), selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            switch (typeselecteShape) {
                case "iconlist":
                    apiElement[a].typeicon = "svg", apiElement[a].icon_list_svg = c.shape_select, c.setValueIcon(selectedItem), $("#managerShape").modal("hide");
                    break;
                case "addnewshape":
                    c.addnewshapewg();
                    break;
                default:
                    if ("shape" == selectedItem.attr("pn-type")) {
                        var b = selectedItem.find(".widget-content svg").attr("fill");
                        apiElement[a].htmlShape = c.shape_select, selectedItem.find(".widget-content").eq(0).html(c.shape_select), selectedItem.find(".widget-content svg").attr("fill", b);
                        var d = new OptionWiget;
                        d.addElementUndo("", selectedItem), $("#managerShape").modal("hide")
                    }
            }
        } else "addnewshape" == typeselecteShape && c.addnewshapewg()
    }, c.usingCustom = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.shapecustom = $(".valueShapeCustom").val(), void 0 != c.shapecustom && "" != c.shapecustom && ("undefined" == typeof $.base64 && ($.base64 = window.BASE64), apiElement[a].htmlShape = $(".shapeUsingCustom").html(), selectedItem.find(".widget-content").eq(0).html($(".shapeUsingCustom").html()), $("#managerShape").modal("hide"))
        }
    }, c.setValueIcon = function (a) {
        if (a && a.length > 0) {
            var b = PN_PAGE.getIndexElement(a.attr("id"));
            PN_PAGE.setTypeListIcon(apiElement[b])
        }
    }, c.back = function () {
        $(".custom-shape-svg").hide(), $(".list-shape-copy").show()
    }, c.customSvg = function () {
        $(".custom-shape-svg").show(), $(".list-shape-copy").hide(), c.shapeYouUsing = selectedItem.find(".widget-content").eq(0).html(), $(".shapeUsing").html(c.shapeYouUsing)
    }, c.search_name_shape = function () {
        var a = $("#managerShape .tab-content .item");
        a.hide(), "" != c.shape_search ? a.each(function () {
            -1 != $(this).attr("pn-name-search").search(c.shape_search) && $(this).show()
        }) : a.show()
    }, c.showAllShape = function () {
        c.maxItem = c.items_shape.length
    }, c.addActive = function (a) {
        c.indexSelect = a, c.shape_select = c.items_shape[a].html.toString(), $("#managerShape .container-shape .item .item-child").removeClass("active"), $('#managerShape .container-shape .item[pn-add-active="' + a + '"] .item-child').addClass("active")
    }
}]);