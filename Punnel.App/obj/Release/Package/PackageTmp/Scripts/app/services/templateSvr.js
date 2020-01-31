angular.module("punnelApp").factory("templateSvr", ["$http", "APP_CONFIG", function ($http, APP_CONFIG) {
    var templates = {};
    return templates.getAllTemplate = function (type, start, sucess_callback, err_callback) {
        var req = {
            method: "GET",
            url: data.URL + "/ladingpage/selectalltemplate",
            headers: data.HEADER(),
            params: {
                type: type,
                start: start
            }
        };
        $http(req).success(function (result) {
            return "undefined" == typeof result.data ? void (err_callback || angular.noop)("templateSvr.getAllTemplate") : void (sucess_callback || angular.noop)(result);
        }).error(err_callback);
    }, templates.getTemplateByCategory = function (category_id, type, start, publish, callback, err_callback) {
        var params = {
            method: "GET",
            url: data.URL + "/ladingpage/selectbycate",
            header: data.HEADER(),
            params: {
                category_id: category_id,
                type: type,
                start: start,
                publish: publish
            }
        };
        $http(params).success(function (result) {
            return "undefined" == typeof result.data ? void (err_callback || angular.noop)("templateSvr.getTemplateByCategory") : void (callback || angular.noop)(result);
        }).error(err_callback);
    }, templates.viewTemplateByguid = function (guid, callback, err_callback) {
        var req = {
            method: "GET",
            url: data.URL + "/template/preview",
            headers: data.HEADER(),
            params: {
                guid: guid
            }
        };
        $http(req).success(function (result) {
            return "undefined" == typeof result.data ? void (err_callback || angular.noop)("templateSvr.getTemplateByCategory") : void (callback || angular.noop)(result);
        }).error(err_callback);
    }, templates.usingTemplate = function (landingpage_id, type, name, category_id, result, err_callback) {
        var req = {
            method: "POST",
            url: data.URL + "/ladingpage/using",
            headers: data.HEADER(),
            data: {
                punnel_id: punnel_id,
                type: type,
                name: name,
                category_id: category_id
            }
        };
        $http(req).success(result).error(err_callback);
    }, templates.loadCategory = function (name, callback, err_callback) {
        var req = {
            method: "GET",
            url: data.URL + "/Category/selectbytype",
            headers: data.HEADER(),
            params: {
                type: name
            }
        };
        $http(req).success(function (result) {
            return "undefined" == typeof result.data ? void (err_callback || angular.noop)("categorySvr.loadCategory") : void (callback || angular.noop)(result);
        }).error(err_callback);
    }, templates.getTemplatePublish = function (type, name, category_id, start, callback, err_callback) {
        var req = {
            method: "GET",
            url: data.URL + "/ladingpage/selectpublish",
            headers: data.HEADER(),
            params: {
                type: type,
                name: name,
                category_id: category_id,
                start: start
            }
        };
        $http(req).success(function (result) {
            return "undefined" == typeof result.data ? void (err_callback || angular.noop)("templateSvr.getAllTemplate") : void (callback || angular.noop)(result);
        }).error(err_callback);
    }, templates;
}]);
