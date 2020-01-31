var punnelApp = angular.module("punnelApp", ["ngAnimate", "ngCookies", "ngResource", "ngSanitize", "LocalStorageModule", "ui.ace", "ui.router", "ui.router.state.events", "pascalprecht.translate", "angular-md5", "ngStorage", "ngFileUpload", 'ui.bootstrap', 'facebook', 'ngMaterial', 'ngMessages', 'me-lazyload', 'ui.slimscroll', 'angularMoment', 'ui.tinymce', 'dndLists', 'daterangepicker', '720kb.tooltips', '720kb.socialshare', 'ngCsv','SignalR']);
punnelApp.run(["$rootScope", "$auth", "$state", "$window", "$http", "amMoment", '$mdDialog', function ($rootScope, $auth, $state, $window, $http, amMoment,$mdDialog) {
    $rootScope.$on("$stateChangeStart", function (e, toState, toParams, fromState, fromParams) {
        if ("dashboard.expires" === fromState.name && "main.upgrade" != toState.name && "main.payment" != toState.name && $auth.isExpires() === true) {
            e.preventDefault();
            return;
        }

        $rootScope.$user = $auth.getUser() || null;

        if (("auth.register" === toState.name || "auth.login" === toState.name) && $rootScope.$user != null) {
            e.preventDefault();
            if (toParams.tid && toParams.tid.length > 0) {
                window.location = "/#!/dashboard?tid=" + toParams.tid;
            }
            else window.location = "/#!/dashboard";
        }

        if ("loading" != toState.name && "dashboard.expires" != toState.name && "main.upgrade" != toState.name && "main.payment" != toState.name && $rootScope.$user != null && $auth.isExpires() === true) {
            e.preventDefault();
            window.location = "/#!/dashboard/expires";
        }
        $mdDialog.cancel();
    });

    $auth.init();
    amMoment.changeLocale('vi');
    $rootScope.$state = 0;   
}]);






