angular.module("punnelApp").controller("googlemapplgCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function ($rootScope, $state, $scope, $translate, $stateParams) {
    $rootScope.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && "googlemap" == selectedItem.attr("pn-type")) {
            var lp_type_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $scope.address = apiElement[lp_type_id].value_google_map.address;
            $scope.zoom = apiElement[lp_type_id].value_google_map.zoom;
            $scope.icon = apiElement[lp_type_id].value_google_map.icon;
            $scope.titleMap = apiElement[lp_type_id].value_google_map.title;
            $scope.keyapi = apiElement[lp_type_id].keyapi;
            if (!$scope.address) {
                $scope.address = "Ha Noi";
                apiElement[lp_type_id].value_google_map.address = "Ha Noi";
            }
            if (!$scope.zoom) {
                $scope.zoom = 14;
                apiElement[lp_type_id].value_google_map.zoom = 14;
            }
            if (!$scope.icon) {
                $scope.icon = "";
                apiElement[lp_type_id].value_google_map.icon = "";
            }
            if (!$scope.titleMap) {
                $scope.titleMap = "Hoan Kiem, Ha Noi, Viet Nam";
                apiElement[lp_type_id].value_google_map.title = "Hoan Kiem, Ha Noi, Viet Nam";
            }
            if ($('.item[pn-setting="custom-googlemap"] .open-close-properties').hasClass("ion-android-arrow-dropdown")) {
                $('.advanced[pn-setting="custom-googlemap"] .pn-content-settings').show();
                $('.item[pn-setting="custom-googlemap"] .open-close-properties').parent().parent().addClass("active");
            } else {
                $('.advanced[pn-setting="custom-googlemap"] .pn-content-settings').hide();
                $('.item[pn-setting="custom-googlemap"] .open-close-properties').parent().parent().removeClass("active");
            }
        } else {
            $('.item[pn-setting="custom-googlemap"]').hide();
        }
    });
    $scope.setKeyapi = function () {
        if (selectedItem && selectedItem.length > 0) {
            var indexLookupKey = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[indexLookupKey].keyapi = $scope.keyapi;
        }
    };
    $scope.setAddress = function () {
        if (selectedItem && selectedItem.length > 0) {
            $scope.address = $("#addressGoogleMap").val();
            var indexLookupKey = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[indexLookupKey].value_google_map.address = $scope.address, selectedItem.attr("pn-mapaddress", $scope.address), void 0 != $scope.icon && "" != $scope.icon) {
                var oldaxe = '<div class="pn-maptitle"><p><img src="' + $scope.icon + '"></p><p>' + $scope.titleMap + "</p></div>";
            } else {
                oldaxe = $scope.titleMap;
            }
            var driver = selectedItem.find(".widget-content").eq(0)[0];
            var driverHelper = new OptionWiget;
            driverHelper.createMapsgoogle(driver, $scope.zoom, $scope.address, oldaxe);
        }
    };
    $scope.setTitle = function () {
        if (selectedItem && selectedItem.length > 0) {
            var indexLookupKey = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[indexLookupKey].value_google_map.title = $scope.titleMap, selectedItem.attr("pn-maptitletext", $scope.titleMap), void 0 != $scope.icon && "" != $scope.icon) {
                var oldaxe = '<div class="pn-maptitle"><p><img src="' + $scope.icon + '"></p><p>' + $scope.titleMap + "</p></div>";
            } else {
                oldaxe = $scope.titleMap;
            }
            var driver = selectedItem.find(".widget-content").eq(0)[0];
            var driverHelper = new OptionWiget;
            driverHelper.createMapsgoogle(driver, $scope.zoom, $scope.address, oldaxe);
        }
    };
    $scope.setZoom = function () {
        if (selectedItem && selectedItem.length > 0) {
            var index_element = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[index_element].value_google_map.zoom = $scope.zoom, selectedItem.attr("pn-mapzoom", $scope.zoom), void 0 != $scope.icon && "" != $scope.icon) {
                var oldaxe = '<div class="pn-maptitle"><p><img src="' + $scope.icon + '"></p><p>' + $scope.titleMap + "</p></div>";
            } else {
                oldaxe = $scope.titleMap;
            }
            var driver = selectedItem.find(".widget-content").eq(0)[0];
            var driverHelper = new OptionWiget;
            driverHelper.createMapsgoogle(driver, $scope.zoom, $scope.address, oldaxe);
        }
    };
    $scope.setIcon = function () {
        if (selectedItem && selectedItem.length > 0) {
            var index_element = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[index_element].value_google_map.icon = $scope.icon, selectedItem.attr("pn-maptitleimage", $scope.icon), void 0 != $scope.icon && "" != $scope.icon) {
                var oldaxe = '<div class="pn-maptitle"><p><img src="' + $scope.icon + '"></p><p>' + $scope.titleMap + "</p></div>";
            } else {
                oldaxe = $scope.titleMap;
            }
            var driver = selectedItem.find(".widget-content").eq(0)[0];
            var driverHelper = new OptionWiget;
            driverHelper.createMapsgoogle(driver, $scope.zoom, $scope.address, oldaxe);
        }
    };
    $scope.applyFileManage = function () {
        var time = $(".lp_image_manager .column.active img").attr("src");
        if (void 0 != time && "" != time && null != time) {
            $(".ngdialog.lp_image_manager").remove();
            $scope.addImage(time);
        }
    };
    $scope.addImage = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            $scope.icon = a;
            var index_element = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[index_element].value_google_map.icon = a, selectedItem.attr("pn-maptitleimage", $scope.icon), void 0 != $scope.icon && "" != $scope.icon) {
                var oldaxe = '<div class="pn-maptitle"><p><img src="' + $scope.icon + '"></p><p>' + $scope.titleMap + "</p></div>";
            } else {
                oldaxe = $scope.titleMap;
            }
            var driver = selectedItem.find(".widget-content").eq(0)[0];
            var driverHelper = new OptionWiget;
            driverHelper.createMapsgoogle(driver, $scope.zoom, $scope.address, oldaxe);
            $scope.cancelFileManager();
        }
    };
    $scope.getgoogle = function (event) {
        function initialize() {
            new FilePicker({
                apiKey: "AIzaSyB36Ys5AGYvw26wiPLImIBYrrKiq50qALY",
                clientId: 916817526922,
                buttonEl: document.getElementById("imagepiker"),
                onSelect: function (res) {
                    var doc = res.thumbnailLink;
                    doc = doc.replace("=s220", "");
                    $scope.addImage(doc);
                }
            });
        }
        event.stopPropagation();
        initialize();
    };
    $scope.showContentSetting = function (data) {
        var settings = $('.advanced[pn-setting="' + data + '"] .pn-content-settings');
        if ("none" == settings.css("display")) {
            settings.css({
                display: "block"
            });
        } else {
            settings.css({
                display: "none"
            });
        }
    };
    $scope.cancelFileManager = function () {
        $(".ngdialog.lp_image_manager").remove();
    };
    $scope.showImageIcon = function () {
    };
}]);
