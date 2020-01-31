angular.module("punnelApp").service("$auth", ["$http", "$resource", "localStorageService", function ($http, $resource, localStorageService) {
    //if (!store.enabled) {
    //    return void alert('Local storage is not supported by your browser. Please disable "Private Mode", or upgrade to a modern browser.');
    //}
    var self = {
        authKey: "__Authorization",
        userProfileKey: "__UserProfile",
        getToken: function () {
            var data = localStorageService.get(self.authKey);
            if (data) {
                return data.token || null;
            }
            return null;
        },
        clearUser: function () {
            localStorageService.remove(self.authKey);
            localStorageService.remove(self.userProfileKey);
            delete $http.defaults.headers.common.Authorization;
        },
        init: function () {
            var u = localStorageService.get(self.authKey) || null;
            if (u!=null) {
                localStorageService.set(self.authKey, u);
                $http.defaults.headers.common.Authorization = u.token;
            }
        },
        setUser: function (res) {
            if (res) {
                localStorageService.set(self.authKey, res);
                $http.defaults.headers.common.Authorization = res.token;
            }
        },
        getUser: function () {
            var u = localStorageService.get(self.authKey) || null;
            return u;
        },
        getUserId: function () {
            var u = self.getUser();
            if (u == null) {
                return null;
            }
            return u.user_id;
        },
        setProfile: function (profile) {
            localStorageService.set(self.userProfileKey, profile);
        },
        getProfile: function () {
            var u = localStorageService.get(self.userProfileKey);
            return void 0 === u ? self.clearUser() : u;
        },
        isEditor: function () {
            var profile = self.getProfile();
            if (profile != null) {
                return profile.role == 'editor' || profile.role == 'admin';
            }
            else return false;
        },
        isAdmin: function () {
            var profile = self.getProfile();
            if (profile != null) {
                return profile.role == 'admin';
            }
            else return false;
        },
        isOwner: function () {
            var profile = self.getProfile();
            if (profile != null) {
                return profile.role == 'admin' && profile.email == 'lamktvn@gmail.com';
            }
            else return false;
        },
        isMe: function (userId) {
            var u = self.getUser();
            if (u != null) {
                return u.user_id == userId;
            }
            else return false;
        },
        isAffilateAgent: function () {
            var profile = self.getProfile();
            if (profile != null) {
                return profile.isAffilateAgent == true;
            }
            else return false;
        },
        isVerifyEmail: function () {
            var profile = self.getProfile();
            if (profile != null) {
                return profile.isVerifyEmail || profile.provider.length>0;
            }
            else return false;
        },
        isVerifyMobile: function () {
            var profile = self.getProfile();
            if (profile != null) {
                return profile.isVerifyMobile;
            }
            else return false;
        },
        isFullInfo: function () {
            var profile = self.getProfile();
            if (profile != null) {
                var m = profile.mobile || '', e = profile.email || '';
                return m != '' || e != '';
            }
            else return false;
        },
        isExpires: function () {
            var profile = self.getProfile();
            if (profile != null) {
                return (profile.enddate <=0);
            }
            else return false;
        },
        level: function () {
            var profile = self.getProfile();
            if (profile != null) {
                return profile.level;
            }
            else return 0;
        },
        endday: function () {
            var profile = self.getProfile();
            if (profile != null) {
                return profile.enddate;
            }
            else return 100;
        }
    };
    return self;
}]);
