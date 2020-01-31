angular.module("punnelApp").controller("customClickCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", function (a, b, c, d, e, f) {
    d.use(localStorage.getItem("lang")), c.itemWg = wgSectionItem, c.elementClickArr = [], c.idTMP = "", a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            c.idTMP = selectedItem.attr("id");
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.elementClickArr = apiElement[a].element_click, (void 0 == c.elementClickArr || "" == c.elementClickArr || null == c.elementClickArr) && (c.elementClickArr = [], apiElement[a].element_click = [])
        }
    }), c.idclickSelect = "", c.changeSelect = function () {
        if ($(".click-setting .content_link_current_page").show(), "" != c.idclickSelect) {
            var a = $(".click-setting .content_link_current_page .item");
            a.each(function () {
                -1 == $(this).attr("pn-active").search(c.idclickSelect) ? $(this).hide() : $(this).show()
            })
        } else $(".click-setting .content_link_current_page .item").show(), $(".click-setting .content_link_current_page").hide()
    }, c.setIdClickSelect = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            for (var d = 0, e = 0; e < c.elementClickArr.length; e++) a == c.elementClickArr[e].id && d++;
            if (0 == d) {
                var f = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                c.idclickSelect = a;
                var g = {
                    id: a,
                    click: "show"
                };
                c.elementClickArr.unshift(g), apiElement[f].element_click = c.elementClickArr, $(".click-setting .content_link_current_page").hide()
            }
        }
    }, c.removeItemClick = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.elementClickArr.splice(a, 1), apiElement[b].element_click = c.elementClickArr
        }
    }, c.changeHideShow = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[d].element_click[b].click = a, c.elementClickArr[b].click = a
        }
    }, c.showContentSetting = function (a) {
        var b = $(".advanced." + a + " .pn-content-settings");
        "none" == b.css("display") ? b.css({
            display: "block"
        }) : b.css({
            display: "none"
        })
    }, c.resetArr = function (a) {
        for (var b = 0; b < a.length; b++);
    }, c.close = function () {
        $(".ngdialog.custom_click").remove()
    }
}]);