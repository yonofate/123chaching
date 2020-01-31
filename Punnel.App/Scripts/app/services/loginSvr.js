angular.module("punnelApp").factory("loginSvr", ["$http", "APP_CONFIG", function ($http, APP_CONFIG) {
    var obj = {};
    return obj.user = {}, obj.session = {}, obj.login = function (email, password, callback, errorHandler) {
        var request = {
            method: "POST",
            url: "http://192.168.0.110:3333/v1/auth/sign-in",
            headers: APP_CONFIG.HEADER(),
            data: {
                email: email,
                password: password
            }
        };
        $http(request).success(function (url) {
            (callback || angular.noop)(url);
        }).error(errorHandler);
    }, obj.register = function (username, password, email, callback, err_callback) {
        var request = {
            method: "POST",
            url: APP_CONFIG.URL + "/User/register",
            headers: APP_CONFIG.HEADER(),
            data: {
                user_name: username,
                password: password,
                email: email
            }
        };
        $http(request).success(callback).error(err_callback);
    }, obj.getSession = function (callback, err_callback) {
        var req = {
            method: "GET",
            cache: false,
            url: APP_CONFIG.URL + "/User/session",
            headers: APP_CONFIG.HEADER()
        };
        $http(req).success(function (result) {
            return "undefined" == typeof result.data ? void (err_callback || angular.noop)("loginSvr.getSession") : void (callback || angular.noop)(result);
        }).error(err_callback);
    }, obj.logout = function (callback, err_callback) {
        var req = {
            method: "POST",
            cache: false,
            url: APP_CONFIG.URL + "/User/logout",
            headers: APP_CONFIG.HEADER()
        };
        $http(req).success(callback).error(err_callback);
    }, obj.getinfouser = function (callback, err_callback) {
        req = {
            method: "GET",
            cache: false,
            url: APP_CONFIG.URL + "/User/selectinfo",
            headers: APP_CONFIG.HEADER()
        };
        $http(req).success(callback).error(err_callback);
    }, obj;
}]);
