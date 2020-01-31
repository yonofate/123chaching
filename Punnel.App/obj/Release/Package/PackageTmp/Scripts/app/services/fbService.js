angular.module("punnelApp").factory('facebookService', ['$q', 'Facebook', function ($q, Facebook) {
    return {
        isLogin: function () {
            var deferred = $q.defer();
            Facebook.getLoginStatus(function (response) {
                console.log(response);
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    //if (response.status === 'not_authorized') deferred.resolve(0);
                    deferred.resolve(response);
                }
            });
            return deferred.promise; 
        },
        getPerms: function () {
            var deferred = $q.defer();
            Facebook.api('/me/permissions',function (response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;  
        },
        getPages: function () {
            var deferred = $q.defer();
            Facebook.api('/me/accounts', function (response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        },
        login: function () {
            var deferred = $q.defer();
            Facebook.login(function (response) {
                if (!response || response.error) {
                    console.log(response);
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            }, {
                    //enable_profile_selector: true,
                    return_scopes: true,
                    scope: 'public_profile,manage_pages,pages_messaging',
                    //scope: 'public_profile,manage_pages',
                    auth_type: 'rerequest'
                });
            return deferred.promise; 
        },
        baseLogin: function () {
            var deferred = $q.defer();
            Facebook.login(function (response) {
                if (!response || response.error) {
                    console.log(response);
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            },{
                    //enable_profile_selector: true,
                    return_scopes: true,
                    scope: 'public_profile,manage_pages,pages_messaging',
                    //scope: 'user_birthday,user_photos,email,public_profile,manage_pages, pages_messaging'
                    //auth_type: 'rerequest'
                });
            return deferred.promise;
        },
        loginPage: function (id, token) {
            console.log('id:' + id);
            console.log('token:' + token);
            var deferred = $q.defer();
            Facebook.api('/' + id + '/subscribed_apps',
                { 'access_token': token },
                function (response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        },
        subscribePage: function (id, token) {
            var deferred = $q.defer();
            Facebook.api('/' + id + '/subscribed_apps','post',
                { 'access_token': token, 'subscribed_fields': "messages" },
                function (response) {
                    if (!response || response.error) {
                        deferred.reject('Error occured');
                    } else {
                        deferred.resolve(response);
                    }
                });
            return deferred.promise;
        },
        addDomain: function (token, domains) {
            domains = jQuery.grep(domains, function (value) {
                return value != ApiDemo;
            });
            var deferred = $q.defer();
            Facebook.api('/me/thread_settings?access_token='+ token, 'post',
                {
                    "setting_type": "domain_whitelisting",
                    "whitelisted_domains": domains,
                    "domain_action_type": "add"
                },
                function (response) {
                    if (!response || response.error) {
                        console.log(domains);
                        console.log(response.error);
                        deferred.reject('Error occured');
                    } else {
                        deferred.resolve(response);
                    }
                });
            return deferred.promise;
        },
        getMyLastName: function () {
            var deferred = $q.defer();
            Facebook.api('/me', {
                fields: 'last_name'
            }, function (response) {
                if (!response || response.error) {
                    deferred.reject('Error occured');
                } else {
                    deferred.resolve(response);
                }
            });
            return deferred.promise;
        }
    }
}]);