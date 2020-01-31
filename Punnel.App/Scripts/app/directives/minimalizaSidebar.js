angular.module("punnelApp").directive("minimalizaSidebar", function () {
    return {
        restrict: "A",
        template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="minimalize()"><i class="fa fa-bars"></i></a>',
        controller: ["$scope", function (a) {
            a.minimalize = function () {
                $("body").toggleClass("mini-navbar"), !$("body").hasClass("mini-navbar") || $("body").hasClass("body-small") ? ($("#side-menu").hide(), setTimeout(function () {
                    $("#side-menu").fadeIn(500)
                }, 100)) : $("body").hasClass("fixed-sidebar") ? ($("#side-menu").hide(), setTimeout(function () {
                    $("#side-menu").fadeIn(500)
                }, 300)) : $("#side-menu").removeAttr("style")
            }
        }]
    }
});