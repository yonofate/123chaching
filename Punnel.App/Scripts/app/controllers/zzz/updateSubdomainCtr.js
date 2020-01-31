angular.module("punnelApp").controller("updateSubdomainCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", "APP_CONFIG", function (a, b, c, d, e, f, g) {
    d.use(localStorage.getItem("lang"));
    var h = function (a) {
        c.errorMessage = a, f(function () {
            $(".ngdialog.error").remove()
        }, 1500)
    };
    c.subdomain = "", c.itemsDomain = lp_domain, c.selectDomainUser = c.itemsDomain[0].id, c.updatesubfolder = function () {
        var a = new GetDataService,
            b = (a.urlParam("ladi"), new RegExp("^[A-Za-z0-9_.-]{3,150}$"));
        b.test(c.subdomain) || h("Subdomain chưa đúng! độ dài ký tự từ 3 - 150 ký tự, bao gồm ký tự chữ hoa, chữ thường và dấu _ dấu . và dấu - ")
    }, c.changeDomainUser = function (a) { }, c.closeNew = function () {
        fadeOutAnimate($(".ngdialog.update_subdomain"))
    }
}]);