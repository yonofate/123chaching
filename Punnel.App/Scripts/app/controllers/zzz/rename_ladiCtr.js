angular.module("punnelApp").controller("rename_ladiCtr", ["$rootScope", "$scope", "$translate", "APP_CONFIG", "$window", "$timeout", function (a, b, c, d, e, f) {
    c.use(localStorage.getItem("lang"));
    b.name_new = "";
    var g = new GetDataService;
    b.ladi = g.urlParam("ladi"), b.changeNameLadi = function () { }, b.closeNew = function () {
        $(".ngdialog.rename_landingpage").remove()
    }
}]);