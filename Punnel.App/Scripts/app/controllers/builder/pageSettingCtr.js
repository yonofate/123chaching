angular.module("punnelApp").controller("pageSettingCtr", ["$scope", "$rootScope", "$stateParams", "$restful", "facebookService", "$mdDialog", "popupService", function ($scope, $rootScope, $stateParams , $restful, facebookService, $mdDialog, popupService) {

    $scope.trackingItems = itemTracking;
    $scope.trackingValue = '';
    $scope.fanPageId = null;

    $scope.init = function () {
        $scope.pageInfo = {
            imageFavicon: dummyData.imageFavicon ? apiStaticDefault + 's64x64/' + dummyData.imageFavicon: '',
            imagePage: dummyData.imagePage ? apiStaticDefault + 's64x64/' + (dummyData.imagePage || 'images/noimage.png'): '',
            title: dummyData.title || '',
            desc: dummyData.desc || '',
            keyword: dummyData.keyword || '',
            head: dummyData.head || '',
            body: dummyData.body || '',
            idpixel: dummyData.idpixel || '',
            idanalytics: dummyData.idanalytics || '',
            idgoogletag: dummyData.idgoogletag || ''
        }
    }

    $scope.addTrackingItem = function (index) {
        $scope.pageInfo.head += "<script>" + $scope.trackingItems[index].value + "</script>\n";
    }

    function saveInfo() {
        dummyData.title = $scope.pageInfo.title;
        dummyData.desc = $scope.pageInfo.desc;
        dummyData.keyword = $scope.pageInfo.keyword;
        dummyData.head = $scope.pageInfo.head;
        dummyData.body = $scope.pageInfo.body;
        dummyData.idpixel = $scope.pageInfo.idpixel;
        dummyData.idanalytics = $scope.pageInfo.idanalytics;
        dummyData.idgoogletag = $scope.pageInfo.idgoogletag;
        if ($scope.pageInfo.imageFavicon) {
            dummyData.imageFavicon = $scope.pageInfo.imageFavicon.replace(apiStaticDefault + 's64x64/', '');
        }
    }

    $scope.updatePageInfo = function () {
        saveInfo();
        $scope.hide();
    }

    $scope.showImage = function (type) {
        typeImage = type;
        console.log(type)
        popupService.imageManagerShow({}, function (res) {
            imgUtils.process(res, type, "");
            console.log(res)
            popupService.settingManagerShow();
            if (type == 'image-share') {
                var apiPath = ApiStatic.substr(0, ApiStatic.length - 1);
                var imgUrl = apiPath + res.replace("/s200x200/", "/");
                $restful.put("/landingpage", {
                id: $stateParams.id,
                thumbnail: imgUrl.replace(ApiStatic, ''),
                source: result,
                opt: "thumb"
                }).then(function (b) {
                    console.log(b)
            });
            }
        });
    }

    $scope.initFacebook = function () {
        $scope.fanPageId = $rootScope.fanPageId;
        $scope.getPages();
    }

    $scope.getPages = function () {
        $restful.get('/facebook/fbpages', {}).then(function (res) {
            if (res.status === 200) {
                $scope.fanpages = res.data;
            }
        });
    }

    $scope.chooseFanPage = function ($index) {
        PN_PAGE.pageLoading.show();
        $restful.get('/facebook/widget?pid=' + $scope.fanPageId + '&id=' + $stateParams.id, {}).then(function (res) {
            PN_PAGE.pageLoading.hide();
            if (res.data && res.data.length > 0 && !(dummyData.domain == null || dummyData.domain.length < 3)) {
                var domains = [];
                if (dummyData.domain.search('//' + DomainDemo) === -1) domains.push(dummyData.domain);
                else domains.push(ApiDemo);
                facebookService.addDomain($scope.fanPageId, domains)
                    .then(function (r) {
                        $scope.pageInfo.body = res.data;
                    }, function (err) {
                        alert(err);
                    });
            }
        });
    }

    $scope.hide = function () {
        saveInfo();
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}]);