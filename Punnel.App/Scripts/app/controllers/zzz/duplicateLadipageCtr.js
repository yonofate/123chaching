angular.module("punnelApp").controller("duplicateLadipageCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "APP_CONFIG", "$window", "$timeout", "templateSvr", function (a, b, c, d, e, f, g, h, i) {
    d.use(localStorage.getItem("lang")), c.name_new = "";
    var j = function (a) {
        c.errorMessage = a, h(function () {
            $(".ngdialog.error").remove()
        }, 1500)
    };
    c.guidCate = "", c.addNew = typeAddNew, c.guidLadi = "", c.closeNew = function () {
        fadeOutAnimate($(".ngdialog.duplicateLadipage"))
    }, c.newladipage = function () {
        "" != c.name_new || j("Please add the name!")
    }
}])