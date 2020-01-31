angular.module("punnelApp").controller("setRefCtr", ["$scope", "$state", "$stateParams", function (a, b, c) {
    c.ref && c.ref.length > 0 && PN_PAGE.setCookie("referral", c.ref, 60)
}]);