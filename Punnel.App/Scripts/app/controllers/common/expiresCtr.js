angular.module("punnelApp").controller("expiresCtr", ["$scope", "$filter", "APP_CONFIG", "$localStorage", "$restful", "$state", "$window", "$auth", "$ladiService", "$rootScope", "popupService", function ($scope, $filter, APP_CONFIG, $localStorage, $restful, $state, $window, $auth, $ladiService, $rootScope, popupService) {
    $scope.user_level = $auth.level();
}]);
