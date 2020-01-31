angular.module("punnelApp").controller("updatedomainCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", "APP_CONFIG", function (a, b, c, d, e, f, g) {
    d.use(localStorage.getItem("lang"));
    var h = function (a) {
        c.errorMessage = a, f(function () {
            $(".ngdialog.error").remove()
        }, 1500)
    };
    c.domain = "", c.updatedomain = function () {
        var a = new GetDataService;
        a.urlParam("ladi");
        "" != c.subdomain || h("Value is not null!")
    }, c.cancel = function () {
        $(".ngdialog.update_domain").remove()
    }, c.closeNew = function () {
        c.cancel()
    }
}]);