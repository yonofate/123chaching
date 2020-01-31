angular.module("punnelApp").controller("loadingController", ["$auth", "$state", function ($auth, $state) {
    console.log('loading!');
    if ($auth.getUser()) {
        $state.go("dashboard.main");
    } else {
        $state.go("auth.login");
    }
}]);
