angular.module("punnelApp").directive("sideNavigation", ["$timeout", function (a) {
    return {
        restrict: "A",
        link: ["$scope", "$element", function (b, c) {
            a(function () {
                c.metisMenu()
            })
        }]
    }
}]);