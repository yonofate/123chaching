angular.module("punnelApp").controller("leftPageCtr", ["$rootScope", "$state", "$scope", "$translate", "$restful", "popupService", function (a, b, c, d, e, popupService) {
    d.use(localStorage.getItem("lang")), c.searchPlg = "", c.thumbGroup = thumbGroup, c.thumbHighlights = thumbHighlights, c.searchLayer = "";
    var f = 0;
    c.typePage = typeAddNew + "";
    var g = setInterval(function () {
        if (15 > f) {
            c.typePage = typeAddNew + "";
        } else {
            clearInterval(g);
        }
        f++;
    }, 500);
    c.role = PN_PAGE.account.role, c.searchLayerLadi = function () {
        var a = (new OptionWiget, $(".secondary-column.pn-layers .list .item"));
        if (a.hide(), "" != c.searchLayer && void 0 != c.searchLayer) {
            var b = c.searchLayer.toUpperCase();
            a.each(function () {
                var a = $(this).attr("pn-lang").toUpperCase(); -1 != a.search(b) && $(this).show()
            })
        } else a.show()
    }, c.hideElement = function () {
        $(".secondary-column.layers .header i").removeClass("active"), $('.secondary-column.layers .header i[pn-active="hide"]').addClass("active");
        var a = $(".secondary-column.layers .content .item");
        a.hide(), $('.topbar .mtab li[pn-active="popup"]').hasClass("active") ? void 0 != a && a.length > 0 && a.each(function () {
            "none" == $(this).attr("pn-show") && "true" == PN_PAGE.getElement("#" + $(this).attr("pn-lang")).attr("pn-popup") && $(this).show()
        }) : void 0 != a && a.length > 0 && a.each(function () {
            "none" == $(this).attr("pn-show") && "true" != PN_PAGE.getElement("#" + $(this).attr("pn-lang")).attr("pn-popup") && $(this).show()
        })
    }, c.showelement = function () {
        $(".secondary-column.layers .header i").removeClass("active"), $('.secondary-column.layers .header i[pn-active="show"]').addClass("active");
        var a = $(".secondary-column.layers .content .item");
        a.hide(), $('.topbar .mtab li[pn-active="popup"]').hasClass("active") ? void 0 != a && a.length > 0 && a.each(function () {
            "block" == $(this).attr("pn-show") && "true" == PN_PAGE.getElement("#" + $(this).attr("pn-lang")).attr("pn-popup") && $(this).show()
        }) : void 0 != a && a.length > 0 && a.each(function () {
            "block" == $(this).attr("pn-show") && "true" != PN_PAGE.getElement("#" + $(this).attr("pn-lang")).attr("pn-popup") && $(this).show()
        })
    }, c.searchPluginTpl = function () {
        for (var a = (new OptionWiget, $('.aside-left li[data-type="group-element"].active').attr("language")), b = [], d = 0; d < thumbGroup.length; d++)
            if (thumbGroup[d].name == a) {
                b = thumbGroup[d].child;
                break
            }
        if ("" != c.searchPlg)
            for (var e = 0; e < b.length; e++) {
                var f = $('.secondary-column.widgets li[language="' + b[e].name + '"]'),
                    g = f.attr("language"),
                    h = f.text().toUpperCase(); -1 == g.search(c.searchPlg.toUpperCase()) && -1 == h.search(c.searchPlg.toUpperCase()) ? f.hide() : f.show()
            } else
            for (var e = 0; e < b.length; e++) $('.secondary-column.widgets li[language="' + b[e].name + '"]').show()
    }, c.showUserDetail = function () { }, c.showPageSetting = function () { }, c.showEditorText = function () {
        console.log(1)
    },
        c.openAddImage = function () {
            popupService.imageManagerShow({}, function (res) {
                imgUtils.process(res, "", "");
            });
        },
        c.openAddSection = function (ev) {
            popupService.sectionManagerShow();
        },
        c.openAddPopup = function (ev) {
            popupService.popupManagerShow();
        }        
}]);