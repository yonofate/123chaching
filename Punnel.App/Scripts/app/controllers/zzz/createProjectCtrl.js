angular.module("punnelApp").controller("createProjectCtrl", ["$state", "$scope", "$stateParams", "$auth", "$restful", "$ladiService", function ($state, $scope, $stateParams, $auth, $restful, $ladiService) {
    if ($auth.getUser()) {
        $restful.get("/user", {}).then(function (res) {
            if (res.status===200 && res.data) {
                if (res.data.endday && parseFloat(res.data.endday) > 0) {
                    $ladiService.createProject("", $stateParams.idLa, 0, res.data.me.role);
                } else {
                    $("#inforupgrade").modal("show");
                }
            } else {
                if ($stateParams.idLa && $stateParams.idLa.length > 0) {
                    $state.go("login", {
                        idLa: $stateParams.idLa
                    });
                } else {
                    $state.go("auth.login");
                }
            }
        });
    } else {
        if ($stateParams.idLa && $stateParams.idLa.length > 0) {
            $state.go("login", {
                idLa: $stateParams.idLa
            });
        } else {
            $state.go("auth.login");
        }
    }
}]);
