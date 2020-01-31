angular.module("punnelApp").service("$restful", ["$http", "$q", "$auth", function ($http, $q, $auth) {  
    return {
        get: function (path, params) {
            return $http.get(ApiPath + path, {
                params: params
            }, {
                    withCredentials: true
                });
        },
        post: function (type, options) {
            var frm = {};
            return $http.post(ApiPath + type, options || {}, frm);
        },
        put: function (token, options) {
            return $http.put(ApiPath + token, options || {});
        },
        "delete": function (url, options) {
            return $http["delete"](ApiPath + url, {
                params: options
            });
        }
    };
}]).factory("authInterceptorService", ["$q", "$rootScope", "$location", "$injector", function ($q, $rootScope, $location, $injector) {   
    var _responseErr = function (rejection) {
        PN_PAGE.dbLoading.hide();
        PN_PAGE.pageLoading.hide();
        PN_PAGE.loading.hide();
        console.log('err-status: ' + rejection.status);
        if (rejection.status === 400) {
            if (rejection.data && rejection.data.message && rejection.data.message.indexOf('(405)')<1) {
                swal("", rejection.data.message, "warning");
            }
            PN_PAGE.btnLoading.hide();
            PN_PAGE.loading.hide();
            PN_PAGE.btnLoading.hide();
        }
        if (rejection.status === 404) {
            if (rejection.data && rejection.data.message) swal("", "Không tìm thấy thông tin này!", "warning");
            //window.location = "/";
        }
        else if (rejection.status === 401 || rejection.status === 409) {
            var deferred = $q.defer();
            var localStorageService = $injector.get("localStorageService");
            var authSvc = $injector.get("$auth");   
            var authData = authSvc.getUser();
            if (authData && 1==0) {
                var k = $rootScope.isRf || false;
                if (authData.refresh_token && k == false) {
                    var loginSvc = $injector.get("authService");
                    $rootScope.isRf = true;
                    loginSvc.refreshToken().then(function (response) {
                        var res = response.data;
                        console.log(response.data);
                        var data = {
                            user_id: res.user_id,
                            token: res.token_type + ' ' + res.access_token,
                            refresh_token: res.refresh_token,
                            useRefreshTokens: true
                        }
                        authSvc.setUser(data);

                        $injector.get("$http")(response.config).then(function (resp) {
                            deferred.resolve(resp);
                        }, function (resp) {
                            authSvc.clearUser();
                            deferred.reject();
                            });
                    }, function (err) {
                        console.log(err);
                        authSvc.clearUser();
                        deferred.reject();
                        });
                    return deferred.promise;
                }
            } else {
                authSvc.clearUser();
                if ($rootScope.$state == 0) {
                    PN_PAGE.showMessage("Phiên làm việc của bạn đã kết thúc. Vui lòng đăng nhập lại!", 'error');
                    window.location = "/#!/auth/login?redirectUrl=" + document.URL;
                } else {
                    var deferred = $q.defer();
                    if ($rootScope.isRelogin != true) {
                        var popupSvc = $injector.get("popupService");
                        popupSvc.reLoginShow(function (res) {
                            $rootScope.isRelogin = false;
                            deferred.resolve;//, deferred.reject;
                            return $q.reject(rejection);
                            //var stv = $injector.get("$state");
                            //window.location.reload();
                        });
                        $rootScope.isRelogin = true;
                    }
                    var $http = $injector.get('$http');
                    return deferred.promise.then(function () {
                        return $http(rejection.config);
                    });
                }
            }
        } else if (rejection.status === 503) {
            PN_PAGE.showMessage("Đã có lỗi kết nối. Vui lòng kiểm tra lại kết nối mạng!", 'error');
        }
        return $q.reject(rejection);
    };
    return {
        responseError: _responseErr
    }
}])
    .config(["$httpProvider", function (a) {
        a.interceptors.push("authInterceptorService")
    }]);