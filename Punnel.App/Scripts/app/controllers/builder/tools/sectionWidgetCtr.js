angular.module("punnelApp").controller("sectionWidgetCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "loginSvr", "$window", "APP_CONFIG", "templateSvr", function (a, b, c, d, e, f, g, h, i) {
    d.use(localStorage.getItem("lang"));
    var j = new GetDataService,
        k = (j.urlParam("uid"), j.urlParam("ladi"), function (a) {
            $(".dialog_lp_error p").text(a), $(".dialog_lp_error").show(), $timeout(function () {
                $(".dialog_lp_error").hide()
            }, 2e3)
        });
    c.guidUsing = "", c.start = 1, c.guidCate = "", i.getTemplatePublish(typeSection, "", "", 1, function (a) {
        200 == a.code && (l(a.data.data), c.itemsTemplate = a.data.data, c.totalItems = a.data.total_row)
    }, function (a) {
        k("Đã xảy ra lỗi")
    }), c.loadMoreItemPunnel = function () {
        $(".select-template .content").on("mousewheel", function () {
            c.start++, c.start <= c.totalItems / 8 + 1 && i.getTemplatePublish(typeSection, "", c.guidCate, c.start, function (a) {
                if (200 == a.code) {
                    l(a.data.data);
                    for (var b = 0; b < a.data.data.length; b++) c.itemsTemplate.push(a.data.data[b]);
                    c.totalItems = a.data.total_row
                } else k(a.message)
            }, function (a) {
                k("?ã x?y ra l?i!")
            })
        })
    }, i.loadCategory(typeSection, function (a) {
        200 == a.code ? c.itemsCategory = a.data : k(a.message)
    }, function (a) {
        k(a.message)
    }), c.loadAllTemplate = function (a) {
        $(".select-template .list-category .item").removeClass("active"), $(a.target).parent().addClass("active"), c.guidCate = "", i.getTemplatePublish(typeSection, "", "", 1, function (a) {
            200 == a.code && (c.start = 1, l(a.data.data), c.itemsTemplate = a.data.data, c.totalItems = a.data.total_row)
        }, function (a) {
            k("?ã x?y ra l?i!")
        })
    }, c.loadTemplateByCate = function (a, b) {
        $(".select-template .list-category .item").removeClass("active"), $(b.target).parent().addClass("active"), c.guidCate = a, i.getTemplatePublish(typeSection, "", a, 1, function (a) {
            200 == a.code ? (c.start = 1, l(a.data.data), c.itemsTemplate = a.data.data, c.totalItems = a.data.total_row) : k(a.message)
        }, function (a) {
            k("?ã x?y ra l?i!")
        })
    }, c.createNewPunnel = function (a) {
        $(".ngdialog.section_manager").remove(), c.guid_using = a
    }, c.usingTemplate = function () {
        void 0 != c.guidUsing && null != c.guidUsing && "" != c.guidUsing && c.createNewPunnel(c.guidUsing)
    }, c.searchTmp = function () {
        if ("" != c.nameSearch) {
            var a = $(".select-template .searchladi");
            a.hide(), a.each(function () {
                var a = $(this).attr("pn-search-ladi"); -1 != a.search(c.nameSearch) && $(this).show()
            })
        } else $(".select-template .searchladi").show()
    }, c.addClassActive = function (a) {
        $(".section_manager .category .icon8-bg.active").removeClass("active"), $(a.target).addClass("active")
    }, c.setItemSelect = function (a) {
        $(".templates .column").removeClass("active"), $('.templates .column[pn-add-active="' + a + '"]').addClass("active"), c.guidUsing = a
    }, $(".settings").removeClass("active"), c.cancelTemplate = function () {
        $(".ngdialog.section_manager").remove()
    };
    var l = function (a) {
        angular.forEach(a, function (a, b) {
            null != a.path_html && "" != a.path_html && void 0 != a.path_html ? 0 == a.thumbnail || -1 != a.thumbnail.search("https://hstatic.punnel.com") || "" == a.thumbnail ? a.thumbnail = "images/noimage.png" : a.thumbnail = $.base64.decode(a.thumbnail) : a.thumbnail = "images/noimage.png"
        })
    }
}]);