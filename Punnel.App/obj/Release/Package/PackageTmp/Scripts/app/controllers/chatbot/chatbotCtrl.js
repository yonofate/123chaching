
angular.module("punnelApp").controller("chatbotCtrl", ["$scope", "$filter", "$http", "facebookService", function ($scope, $filter, $http, facebookService) {

    $scope.crUser = {
        userID: null,
        connected: 0
    }
    $scope.pages = [];
    $scope.crPage = null;
    $scope.selectedPage = {
        id:0
    }

    function getPages(id) {
        PN_PAGE.loading.show();
        $http.get('/api/facebook/pages?id=' + id).then(function (res) {
            PN_PAGE.loading.hide();
            if (res.status === 200) {
                $scope.pages = res.data;
                if (res.data.length > 0) {
                    $scope.selectedPage.id = $scope.pages[0].id;
                    $scope.crPage = $scope.pages[0];
                    $('#clp').val($scope.crPage.theme_color);
                }
            }           
        });
    }

    function subcriblePage(page) {
        var data = {
            fbId: $scope.crUser.userID,
            access_token: page.access_token,
            id: page.id,
            name: page.name,
            category: page.category
        };
        PN_PAGE.loading.show();
        $http.post('/api/facebook/page', data).then(function (res) {
            PN_PAGE.loading.hide();
            if (res.status === 200) {
                $scope.pages.push(data);
                $scope.crPage = data;
                $scope.selectedPage.id = $scope.crPage.id;
            }            
        });
    }

    function updatePage() {
        $scope.crPage.theme_color = $('#clp').val();
        PN_PAGE.loading.show();
        $http.post('/api/facebook/config', $scope.crPage).then(function (res) {
            PN_PAGE.loading.hide();
            if (res.status === 200) {               
            }
        });
    }

    $scope.init = function () {
        facebookService.isLogin()
            .then(function (res) {
                if (res.status === 'connected') {  
                    $scope.crUser.userID = res.authResponse.userID;
                    facebookService.getPerms().then(function (r) {
                        var t = $.grep(r.data, function (n, i) {
                            return n.permission === 'manage_pages';
                        });
                        if (t.length > 0) {
                            $scope.crUser.connected = 1;
                            getPages(res.authResponse.userID);
                        } else {
                            $scope.crUser.connected = 0;
                        }                      
                    });
                }
                else {
                    $scope.crUser.connected = 0;
                }
            });
    }

    $scope.login = function () {
        facebookService.login()
            .then(function (res) {
                if (res.status === 'connected') {
                    $scope.crUser.connected = 1;
                    if ($scope.crUser.connected === 1) getPages(res.authResponse.userID);
                }
            });
    }

    $scope.showFBPage = function () {
        $("#chooseFBPage").modal("show");
        $scope.getPages();
    }

    $scope.getPages = function () {
        facebookService.getPages()
            .then(function (res) {
                $scope.fbpages = res.data;               
            });
    }

    $scope.subscribePage = function (item) {
        facebookService.loginPage(item.id, item.access_token)
            .then(function (res) {
                if (res.data.length === 0) {
                    facebookService.subscribePage(item.id, item.access_token)
                        .then(function (res) {
                            if (res.success === true) {
                                $("#chooseFBPage").modal("hide");
                                subcriblePage(item);
                            }
                        });
                } else {
                    $("#chooseFBPage").modal("hide");
                    subcriblePage(item);
                }
                
            });
    }

    $scope.updateConfig = function () {
        updatePage();
    }

    $scope.changePage = function () {
        $scope.crPage = $filter('filter')($scope.pages, function (d) { return d.id === $scope.selectedPage.id; })[0]
    }
}]);