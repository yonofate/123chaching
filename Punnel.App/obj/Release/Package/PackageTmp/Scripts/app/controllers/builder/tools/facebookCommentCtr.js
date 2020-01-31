angular.module("punnelApp").controller("facebookCommentCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function ($rootScope, $state, $scope, $translate, $stateParams) {
    $scope.idTMP = "";
    $rootScope.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && $scope.idTMP != selectedItem.attr("id") && "facebook_comment" == selectedItem.attr("pn-type")) {
            $scope.idTMP = selectedItem.attr("id");
            var element_fb = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[element_fb].value_facebook_comment) {
                $scope.url = apiElement[element_fb].value_facebook_comment.url;
                $scope.numberpost = apiElement[element_fb].value_facebook_comment.number_post;
                $scope.apikey = apiElement[element_fb].value_facebook_comment.api_key;
            } else {
                apiElement[element_fb].value_facebook_comment = {
                    url: "",
                    number_post: 5,
                    api_key: ""
                };
            }
            $scope.url = apiElement[element_fb].value_facebook_comment.url;
            $scope.numberpost = apiElement[element_fb].value_facebook_comment.number_post;
            $scope.apikey = apiElement[element_fb].value_facebook_comment.api_key;
            if (void 0 == $scope.url || "" == $scope.url) {
                apiElement[element_fb].value_facebook_comment.url = "https://www.facebook.com/congdongpunnel/?ref=page_internal";
                $scope.url = "https://www.facebook.com/congdongpunnel/?ref=page_internal";
            }
            if (void 0 == $scope.numberpost || "" == $scope.numberpost) {
                $scope.numberpost = 5;
                apiElement[element_fb].value_facebook_comment.number_post = 5;
            }
            if (void 0 == $scope.apikey) {
                $scope.apikey = "";
                apiElement[element_fb].value_facebook_comment.api_key = "";
            }
        }
    });
    $scope.seturl = function () {
        var element_fb = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[element_fb].value_facebook_comment.url = $scope.url;
        var _url = "https://www.facebook.com/plugins/comments.php?api_key=" + $scope.apikey + "&href=" + $scope.url + "&amp;numposts=" + $scope.numberpost + "&amp;channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Df123138e34%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff281f41a98%26relation%3Dparent.parent&&amp;locale=vi_VN&amp;sdk=joey&amp;version=v2.3";
        selectedItem.find(".widget-content").eq(0).attr("src", _url);
    };
    $scope.setapikey = function () {
        var element_fb = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[element_fb].value_facebook_comment.api_key = $scope.apikey;
        var _gif = "https://www.facebook.com/plugins/comments.php?api_key=" + $scope.apikey + "&href=" + $scope.url + "&amp;numposts=" + $scope.numberpost + "&amp;channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Df123138e34%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff281f41a98%26relation%3Dparent.parent&&amp;locale=vi_VN&amp;sdk=joey&amp;version=v2.3";
        selectedItem.find(".widget-content").eq(0).attr("src", _gif);
    };
    $scope.setnumberpost = function () {
        var element_fb = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[element_fb].value_facebook_comment.number_post = $scope.numberpost;
        var _gif = "https://www.facebook.com/plugins/comments.php?api_key=" + $scope.apikey + "&href=" + $scope.url + "&amp;numposts=" + $scope.numberpost + "&amp;channel_url=https%3A%2F%2Fstaticxx.facebook.com%2Fconnect%2Fxd_arbiter.php%3Fversion%3D42%23cb%3Df123138e34%26domain%3Ddevelopers.facebook.com%26origin%3Dhttps%253A%252F%252Fdevelopers.facebook.com%252Ff281f41a98%26relation%3Dparent.parent&&amp;locale=vi_VN&amp;sdk=joey&amp;version=v2.3";
        selectedItem.find(".widget-content").eq(0).attr("src", _gif);
    };
    $scope.showContentSetting = function (setting) {
        var content = $('.advanced[pn-setting="' + setting + '"] .pn-content-settings');
        if ("none" == content.css("display")) {
            content.css({
                display: "block"
            });
        } else {
            content.css({
                display: "none"
            });
        }
    };
}]);
