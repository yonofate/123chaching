angular.module("punnelApp").controller("MainCtrl", ["$rootScope", "$auth", "$scope", function ($rootScope, $auth,$scope) {
    $scope.is_admin = $auth.isAdmin();
    $scope.is_owner = $auth.isOwner();
    $scope.is_editor = $auth.isEditor();
}]);