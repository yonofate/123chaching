angular.module("punnelApp").controller("customSettingPageCtr", ["$scope","localStorageService", function ($scope, localStorageService) {
    $scope.list_size_desktop = [960, 1200];
    $scope.list_size_mobile = [375, 420];
    $scope.deviceEdit = deviceEdit;
    $scope.size_desktop = 960;
    $scope.size_mobile = 960;
    $scope.setSizeDesktop = function (width, height) {
        var lf = 0;
        if (localStorageService.get('setting-visible') == 1) lf = 250;

        if ($scope.size_desktop = width, void 0 != dummyData && (void 0 == dummyData.viewport && (dummyData.viewport = {}), dummyData.viewport.size_desktop = width), height) {
            var d = new GetDataService;
            d.addStyleViewport();
        }
        if ($scope.list_size_desktop.forEach(function (size) {
            $(".rule-desktop .punnel-number-hidden-" + size).removeClass("widget-hidden");
            $(".rule-desktop .punnel-number-width-" + size).css("width", "");
        }), $(".rule-desktop .punnel-number-hidden-" + $scope.size_desktop).addClass("widget-hidden"),
            $(".rule-desktop .punnel-number-width-" + $scope.size_desktop).css("width", $scope.size_desktop % 100 + "px"),
            
            $(".is-maincontent .vertical-line .rulers-number.rule-desktop").css("left", "calc((100% - " + ($scope.size_desktop + lf) + "px - 10px) / 2)"),
            $(".is-maincontent .vertical-line .rulers-background").css("background-position", "calc((100% - " + $scope.size_desktop + "px + 34px) / 2 + 50px)"),
            $(".horizontal-guide.rule-desktop").attr("data-content-width", $scope.size_desktop),
            $(".horizontal-guide.rule-desktop").each(function () {
                $(this).css("left", "calc(((100% - " + $scope.size_desktop + "px) / 2) + " + $(this).find(".content-wrapper .number").text() + ")");
            }), "desktop" == deviceEdit && void 0 != dummyData.arrRule && void 0 != dummyData.arrRule.rulerHor) {
            
            for (var i = 0; i < dummyData.arrRule.rulerHor.length; i++) {
                dummyData.arrRule.rulerHor[i].contentWidth = $scope.size_desktop + "";
            }
        }
    };
    $scope.setSizeMobile = function (width, height) {
        if ($scope.size_mobile = width, void 0 != dummyData && (void 0 == dummyData.viewport && (dummyData.viewport = {}), dummyData.viewport.size_mobile = width), height) {
            var d = new GetDataService;
            d.addStyleViewport();
        }
        if ($scope.list_size_mobile.forEach(function (size) {
            $(".rule-mobile .punnel-number-hidden-" + size).removeClass("widget-hidden");
            $(".rule-mobile .punnel-number-width-" + size).css("width", "");
        }), $(".rule-mobile .punnel-number-hidden-" + $scope.size_mobile).addClass("widget-hidden"),
            $(".is-maincontent.punnel-mobile .reset-mobile").css("left", "calc(50% + " + ($scope.size_mobile == 420? "230":"208") +"px)"),
            $(".rule-mobile .punnel-number-width-" + $scope.size_mobile).css("width", $scope.size_mobile % 100 + "px"),
            $(".is-maincontent .vertical-line .rulers-number.rule-mobile").css("left", "calc((100% - " + $scope.size_mobile + "px - 8px) / 2)"),
            $(".is-maincontent.punnel-mobile .vertical-line .rulers-background").css("background-position", "calc((100% - " + $scope.size_mobile + "px + 2px) / 2 + 50px)"),
            $(".horizontal-guide.rule-mobile").attr("data-content-width", $scope.size_mobile), $(".horizontal-guide.rule-mobile").each(function () {
                $(this).css("left", "calc(((100% - " + $scope.size_mobile + "px) / 2) + " + $(this).find(".content-wrapper .number").text() + ")");
            }), "mobile" == deviceEdit && void 0 != dummyData.arrRule && void 0 != dummyData.arrRule.rulerHor) {
            
            for (var i = 0; i < dummyData.arrRule.rulerHor.length; i++) {
                dummyData.arrRule.rulerHor[i].contentWidth = $scope.size_mobile + "";
            }
        }
    };
    $scope.loadViewport = function () {
        var lf = 0;
        if (localStorageService.get('setting-visible') == 1) lf = 250;
        if (void 0 != dummyData && void 0 != dummyData.viewport) {
            if (void 0 != dummyData.viewport.size_desktop) {
                $scope.setSizeDesktop(dummyData.viewport.size_desktop, false);
            } else {
                $scope.setSizeDesktop($scope.list_size_desktop[0], false);
            }
            if (void 0 != dummyData.viewport.size_mobile) {
                $scope.setSizeMobile(dummyData.viewport.size_mobile, false);
            } else {
                $scope.setSizeMobile($scope.list_size_mobile[0], false);
            }
        } else {
            $scope.setSizeDesktop($scope.list_size_desktop[0], false);
            $scope.setSizeMobile($scope.list_size_mobile[0], false);
        }
        var svc = new GetDataService;
        svc.addStyleViewport();
        $scope.deviceEdit = deviceEdit;
        $scope.size_desktop = dummyData.viewport.size_desktop || 960;
        $scope.size_mobile = dummyData.viewport.size_mobile || 375;
        $(".is-maincontent .vertical-line .rulers-number.rule-desktop").css("left", "calc((100% - " + ($scope.size_desktop + lf) + "px - 10px) / 2)");
    };
    window.loadViewport = $scope.loadViewport;
}]);
