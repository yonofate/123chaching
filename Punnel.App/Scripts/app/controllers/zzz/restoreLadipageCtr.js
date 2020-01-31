angular.module("punnelApp").controller("restoreLadipageCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "APP_CONFIG", "$window", "$timeout", "ipCookie", "templateSvr", function (a, b, c, d, e, f, g, h, i, j) {
    d.use(localStorage.getItem("lang"));
    var k = new GetDataService;
    k.urlParam("uid"), k.urlParam("ladi");
    c.search_name = "";
    c.imageDefault = f.IMAGE_LADIPAGE_DEFAULT, c.typeLoad = "0", c.role = i("role"), c.itemDelete = "", c.changeName = function (a, b, d, e) {
        var f = $(e.target).text();
        f != c.itemsLadipage[d].name
    }, c.viewLadipage = function (a, b) { }, c.changeTypeLoad = function (a) {
        c.typeLoad = a
    }, c.retorePage = function (a) { }, c.showMenuItem = function (a) {
        var b = $(a.target).parent().find(".menu");
        "none" == b.css("display") ? b.show() : b.hide()
    }, c.hideMenuItem = function (a) {
        $(a.target).parent().find(".menu").hide()
    }, c.selectItemLadipage = function (a, b) {
        c.itemDelete = b, $(".column").removeClass("active"), "blank" == a ? (c.itemSelect = "blank", $('.column[pn-guid="blank"]').addClass("active")) : (c.itemSelect = c.itemsLadipage[a], $('.column[pn-guid="' + c.itemSelect.guid + '"]').addClass("active"))
    }, c.showOption = function (a) {
        $(".optional-menu.pages").hide();
        var b = $(a.target).parent().parent();
        b.find(".optional-menu.pages").show()
    }, c.closeManage = function () {
        fadeOutAnimate($(".ngdialog.retore_ladipage"))
    }, c.searchLadi = function () {
        if ("" != c.search_name) {
            var a = $(".page-management .searchladi");
            a.hide(), a.each(function () {
                var a = $(this).attr("pn-search-ladi"); -1 != a.search(c.search_name) && $(this).show()
            })
        } else $(".searchladi").show()
    };
    $(".settings").removeClass("active")
}]);