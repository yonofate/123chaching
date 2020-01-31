angular.module("punnelApp").directive("pageTitle", ["$rootScope", "$timeout", function (a, b) {
    return {
        link: ["$element", function (c) {
            a.$on("$stateChangeStart", ["$state", function (a) {
                var d = "LANDING PAGE | Responsive Admin Theme";
                a.data && a.data.pageTitle && (d = "LANDING PAGE | " + a.data.pageTitle), b(function () {
                    c.text(d)
                })
            }])
        }]
    }
}]);