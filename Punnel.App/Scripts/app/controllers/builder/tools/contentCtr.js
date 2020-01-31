punnelApp.controller("contentCtr", ["$rootScope", "$state", "$scope", function ($rootScope, $state, $scope) {
    if (/Safari/.test(navigator.userAgent)) {
        /Apple Computer/.test(navigator.vendor);
    }
    $scope.addNewSectionEmpty = function () {
        var a = new OptionWiget;
        a.addSectionEmpty(false, pageMouseX, pageMouseY, "widget-section-empty");
        var BDA = new TreeWidget;
        BDA.init();
        $(".button-par-add-new-section-empty").hide();
    };
}]);