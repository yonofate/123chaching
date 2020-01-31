angular.module("punnelApp").factory("popupService", ["$mdDialog", function ($mdDialog) {
    return {
        imageManagerShow: function (data,callback) {
            return $mdDialog.show({
                templateUrl: 'scripts/app/views/dialog/imageManager.html',
                controller: 'imageManagerCtr',
                locals: data,
                parent: angular.element(document.body),
                clickOutsideToClose: true
            }).then(function (res) {
                if (callback) callback(res);
                }, function () {
                });
        },
        fontManagerShow: function () {
            return $mdDialog.show({
                templateUrl: 'scripts/app/views/dialog/fontManager.html',
                controller: 'fileManagerCtr',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
                .then(function (res) {
                }, function () {
                });
        },
        sectionManagerShow: function () {
            return $mdDialog.show({
                templateUrl: 'scripts/app/views/dialog/addSectionTemplate.html',
                controller: 'addTemplateCtrl',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
                .then(function (res) {
                }, function () {
                });
        },
        popupManagerShow: function () {
            return $mdDialog.show({
                templateUrl: 'scripts/app/views/dialog/addPopupTemplate.html',
                controller: 'addTemplateCtrl',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
                .then(function (res) {
                    
                }, function () {
                });
        },
        settingManagerShow: function () {
            return $mdDialog.show({
                templateUrl: 'scripts/app/views/dialog/settingManager.html',
                controller: 'pageSettingCtr',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
                .then(function (res) {
                }, function () {
                });
        },
        settingPopupShow: function (data, callback) {
            return $mdDialog.show({
                templateUrl: 'scripts/app/views/dialog/settingPopup.html',
                controller: 'customSettingPopupCtr',
                locals: data,
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
                .then(function (res) {
                    if (callback) callback(res);
                }, function () {
                });
        },
        formManagerShow: function (callback) {
            return $mdDialog.show({
                templateUrl: 'scripts/app/views/dialog/saveDataForm.html',
                controller: 'formSettingCtr',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
                .then(function (res) {
                    callback(res);
                }, function () {                   
                });
        },
        profileManagerShow: function (callback) {
            return $mdDialog.show({
                templateUrl: 'scripts/app/views/dialog/profileManager.html',
                controller: 'profileCtrl',
                parent: angular.element(document.body),
                clickOutsideToClose: true
            })
                .then(function (res) {
                    callback(res);
                }, function () {
            });
        },
        reLoginShow: function (callback) {
            return $mdDialog.show({
                templateUrl: 'scripts/app/views/dialog/reLogin.html',
                controller: 'reLoginCtrl',
                parent: angular.element(document.body),
                clickOutsideToClose: false
            })
                .then(function (res) {
                    callback(res);
                }, function () {
                });
        },
        show: function (html_view, locals, controller, callback, outsite) {
            if (outsite == undefined) outsite = true;
            return $mdDialog.show({
                templateUrl: 'scripts/app/views/dialog/' + html_view,
                locals: locals,
                controller: controller,              
                parent: angular.element(document.body),
                clickOutsideToClose: outsite
            }).then(function (res) {
                    callback(res);
                }, function () {
            });
        }
    }
}]);
