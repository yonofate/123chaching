angular.module("punnelApp").controller("galleryManagerCtr", ["$rootScope", "$state", "$scope", "$stateParams", "editorSvr", "$timeout", "$translate", function (a, b, c, d, e, f, g) {
    g.use(localStorage.getItem("lang"));
    var h = function (a) {
        c.errorMessage = a, f(function () {
            $(".ngdialog.error").remove()
        }, 2e3)
    };
    if (c.addNew = 0, c.item_src = "", c.item_title = "", c.item_desc = "", c.item_link = {
        id: "",
        name: ""
    }, c.itemImages = [], selectedItem && selectedItem.length > 0) {
        var i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        c.itemImages = apiElement[i].image, c.itemImages.length > 0 && (c.item_src = c.itemImages[0].src, c.item_title = c.itemImages[0].title, c.item_desc = c.itemImages[0].desc, c.item_link.id = c.itemImages[0].action, c.item_link.name = c.itemImages[0].name, void 0 == c.item_link.name && (c.item_link.name = ""), c.indexEdit = 0)
    }
    c.uploadFile = function () {
        var a = $("#fileUpload").prop("files");
        e.uploadImage(a, function (a) {
            200 == a.code ? e.getAllImage(function (a) {
                if (200 == a.code) {
                    var b = {
                        src: a.data,
                        title: "item new",
                        desc: "item new",
                        action: ""
                    };
                    i = PN_PAGE.getIndexElement(selectedItem.attr("id")), c.itemImages.push(b)
                } else h(a.message)
            }, function (a) {
                h(a.message)
            }) : h(a.message)
        }, function (a) {
            h(a.message)
        })
    }, c.changeAction = function () {
        c.itemImages[c.indexEdit].action = c.item_link.id, c.itemImages[c.indexEdit].name = c.item_link.name
    }, c.changeTitle = function () {
        c.itemImages[c.indexEdit].title = c.item_title
    }, c.changeDesc = function (a) {
        c.item_desc = $(a.target).text(), c.itemImages[c.indexEdit].desc = c.item_desc
    }, c.applySlide = function () {
        if (c.itemImages.length > 2) {
            var a = [],
                b = selectedItem.find(".widget-content:eq(0) > .item_slide > li");
            b.each(function () {
                var b = {},
                    c = $(this).find(".main-slide:eq(0) .widget-element");
                if (void 0 != c && c.length > 0) {
                    var d = [];
                    c.each(function () {
                        d.push($(this).attr("id"))
                    }), b.arrId = d
                }
                a.push(b)
            }), l = PN_PAGE.getIndexElement(selectedItem.attr("id")), apiElement[l].image = c.itemImages;
            var d = selectedItem.find(".pager .pager-item").eq(0)[0].outerHTML;
            selectedItem.find(".widget-content:eq(0) > .item_slide > li .main-slide:eq(0)").html("");
            var e = selectedItem.find(".item_slide li").eq(0)[0].outerHTML;
            selectedItem.find(".item_slide").html(""), selectedItem.find(".pager").html("");
            for (var f = 0; f < c.itemImages.length; f++) selectedItem.find(".item_slide").append(e), selectedItem.find(".pager").append(d), selectedItem.find(".item_slide li").eq(f).find("img").eq(0).attr("src", c.itemImages[f].src).attr("title", c.itemImages[f].name), selectedItem.find(".pager .pager-item").eq(f).find("a").attr("data-slide-index", f);
            var g = new setHtmlLadi,
                i = new setStyleElement,
                j = a.length;
            a.length > selectedItem.find(".widget-content:eq(0) > .item_slide > li").length && (j = selectedItem.find(".widget-content:eq(0) > .item_slide > li").length);
            for (var f = 0; j > f; f++)
                if (void 0 != a[f].arrId && a[f].arrId.length > 0)
                    for (var k = 0; k < a[f].arrId.length; k++) {
                        var l = PN_PAGE.getIndexElement(a[f].arrId[k]);
                        g.getTemplate(apiElement[l], apiElement[l].type_plugin, function () {
                            $(".widget-element").attr("href", ""), $(".widget-element .widget-content").attr("href", "")
                        }), i.setStyleItem(apiElement[l], deviceEdit)
                    }
            var m = selectedItem.attr("pn-row"),
                n = selectedItem.attr("pn-col");
            (void 0 == m || "" == m || null == m || "NaN" == m) && (m = 1), (void 0 == n || "" == n || null == n || "NaN" == n) && (n = 1);
            var o = parseFloat(m * n);
            selectedItem.find(".item_slide li").hide(), selectedItem.find(".item_slide li:lt(" + o + ")").show();
            var p = new OptionWiget;
            p.addElementUndo("", selectedItem), p.sortWg(), $(".ngdialog.lp_gallery_manager").remove()
        } else h("The number of slides must be greater than 2!")
    }, c.addImage = function (a) {
        c.item_src = a;
        var b = {
            src: c.item_src,
            title: "item new",
            desc: "item new"
        };
        c.itemImages.push(b), c.item_title = "item new", c.item_desc = "item new", $(".ngdialog.lp_image_manager").remove()
    }, c.applyFileManage = function () {
        var a = [],
            b = $(".file-manager .list .column.active img");
        b.each(function () {
            var b = $(this).attr("src"),
                d = {
                    src: b,
                    title: "item new",
                    desc: "item new"
                };
            c.itemImages.push(d), a.push(d)
        }), c.item_src = c.itemImages[c.itemImages.length - 1].src, c.item_title = c.itemImages[c.itemImages.length - 1].title, c.item_desc = c.itemImages[c.itemImages.length - 1].desc, a.length > 0 ? $(".ngdialog.lp_image_manager").remove() : h("Click on the picture to add the item to the slide!")
    }, c.getgoogle = function (a) {
        function b() {
            new FilePicker({
                apiKey: "AIzaSyB36Ys5AGYvw26wiPLImIBYrrKiq50qALY",
                clientId: 916817526922,
                buttonEl: document.getElementById("imagepiker"),
                onSelect: function (a) {
                    var b = a.thumbnailLink;
                    b = b.replace("=s220", ""), c.addImage(b)
                }
            })
        }
        a.stopPropagation(), b()
    }, c.deleteItem = function () {
        var a = $(".gallery .list .column.active").attr("pn-add-active");
        c.itemImages.splice(a, 1), c.indexEdit = c.itemImages.length - 1, c.indexEdit >= 0 && (c.item_src = c.itemImages[c.indexEdit].src, c.item_title = c.itemImages[c.indexEdit].title, c.item_desc = c.itemImages[c.indexEdit].desc, c.item_link.id = c.itemImages[c.indexEdit].action, c.item_link.name = c.itemImages[c.indexEdit].name), void 0 == c.item_link.name && (c.item_link.name = ""), $(".gallery .list .column.active").remove()
    }, c.searchAction = function () {
        if (void 0 != c.item_link.name && null != c.item_link.name && "" != c.item_link.name) {
            var a = c.item_link.name.replace("#", ""),
                b = c.item_link.name.charAt(0),
                d = $(".search-action-slide");
            "#" == b && (j(a), d.show())
        }
    };
    var j = function (a) {
        var b = PN_PAGE.getElement(".widget-element"),
            d = $(".search-action-slide ul"),
            e = "";
        b.each(function () {
            -1 != $(this).attr("id").search(a) && (e = e + '<li pn-search="' + $(this).attr("id") + '">' + $(this).attr("id") + "</li>")
        }), d.html(e);
        var f = d.find("li");
        f.unbind("click").click(function () {
            c.item_link.name = "#" + $(this).text(), c.item_link.id = "#" + $(this).attr("pn-search").toString(), c.itemImages[c.indexEdit].action = c.item_link.id, c.itemImages[c.indexEdit].name = c.item_link.name, $(".search-action-slide").hide(), c.$apply()
        }), d.unbind("mouseleave").mouseleave(function () {
            $(".search-action-slide").hide()
        })
    };
    c.addNewItem = function () { }, c.showFileManager = function () {
        c.addItemGallery = 1
    }, c.setActiveItem = function (a) {
        c.indexEdit = a, c.item_src = c.itemImages[a].src, c.item_title = c.itemImages[a].title, c.item_desc = c.itemImages[a].desc, c.item_link.id = c.itemImages[a].action, c.item_link.name = c.itemImages[a].name, void 0 == c.item_link.name && (c.item_link.name = ""), $(".gallery .column").removeClass("active"), $('.gallery .list .column[pn-add-active="' + a + '"]').addClass("active")
    }, c.hideBoxAction = function () {
        $(".search-action-slide").hide()
    }, c.closeDialog = function () {
        savedSel = "", fadeOutAnimate($(".ngdialog.lp_gallery_manager"))
    }, c.cancelGalleryManager = function () {
        $(".ngdialog.lp_gallery_manager").remove()
    }
}]);