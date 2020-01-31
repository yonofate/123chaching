angular.module("punnelApp").factory("editorSvr", ["$http", "APP_CONFIG", function ($http, APP_CONFIG) {
    var $scope = {};
    return $scope.uploadImage = function (files, callback, err_callback) {
        var param = $scope.getParamsUrl("guidPro");
        var data = new FormData;
        var i = 0;
        for (; i < files.length; i++) {
            data.append("file" + i, files[i]);
        }
        data.append("project_id", param);
        $.ajax({
            url: "/api/index.php/files/upimg",
            dataType: "text",
            cache: false,
            contentType: false,
            processData: false,
            enctype: "multipart/form-data",
            data: data,
            type: "POST",
            success: callback,
            error: err_callback
        });
    }, $scope.getAllImage = function (callback, err_callback) {
        var params = {
            method: "GET",
            url: "/api/index.php/Files"
        };
        $http(params).success(function (result) {
            if ("undefined" == typeof result.data || null == result.data) {
                (err_callback || angular.noop)("editorSvr.getAllImage");
            } else {
                $scope.items = result.data;
            }
            (callback || angular.noop)(result);
        }).error(err_callback);
    }, $scope.getAllLandingPage = function (a, b, variableNames) {
    }, $scope.getParamsUrl = function (a) {
        var b = (new RegExp("[?&;]" + a + "=([^&;#]*)")).exec(window.location.href);
        return null == b ? 0 : b[1] || 0;
    }, $scope.getAllProject = function (callback, err_callback) {
        var params = {
            method: "GET",
            url: "/api/index.php/project/selectAll",
            params: {
                guid: guid
            }
        };
        $http(params).success(function (result) {
            return "undefined" == typeof result.data ? void (err_callback || angular.noop)("editorSvr.getAllProject") : ($scope.project = result.data[0], void (callback || angular.noop)(result));
        }).error(err_callback);
    }, $scope.deleteImage = function (file_guids, callback, err_callback) {
        $.ajax({
            url: APP_CONFIG.URL + "/Files/deleteimg",
            method: "POST",
            data: {
                file_guids: file_guids
            },
            success: callback,
            error: err_callback
        });
    }, $scope;
}]);
