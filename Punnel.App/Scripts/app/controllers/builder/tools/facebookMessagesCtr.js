angular.module("punnelApp").controller("facebookMessagesCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function ($rootScope, $state, $scope, $translate, $stateParams) {
    $rootScope.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && "facebook_messages" == selectedItem.attr("pn-type")) {
            var element_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $scope.url = apiElement[element_id].value_facebook_messages.url;
            if (void 0 == $scope.url || "" == $scope.url) {
                $scope.url = "https://www.facebook.com/congdongpunnel/?ref=page_internal";
                apiElement[element_id].value_facebook_messages.url = "https://www.facebook.com/congdongpunnel/?ref=page_internal";
            }
        }
    });
    $scope.seturl = function () {
        if (selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[media_id].value_facebook_messages.url = $scope.url;
            var _url = "https://www.facebook.com/v2.5/plugins/page.php?adapt_container_width=true&app_id=113869198637480&channel=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Dfc17a1604%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff1e8e518fc%26relation%3Dparent.parent&container_width=613&hide_cover=true&locale=vi_VN&sdk=joey&show_facepile=true&small_header=true&tabs=messages&width=" + parseFloat(apiElement[media_id].media[deviceEdit].width) +
            "&height=" + parseFloat(apiElement[media_id].media[deviceEdit].height) + "&href=" + apiElement[media_id].value_facebook_messages.url;
            selectedItem.find(".widget-content").eq(0).attr("src", _url);
        }
    };
}]);
