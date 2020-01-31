angular.module("punnelApp").controller("wrapperPropertiesCtr", ["$scope", "$state", "editorSvr", "$timeout", "$translate", "$stateParams", function ($scope, $state, editorSvr, $timeout, $translate, $stateParams) {
    $scope.ChangeLanguage = function (data) {
        $translate.use(data);
    };
    $scope.items = {};
    $scope.arrayTmp = [];
    $scope.nameImage = "";
    
    var resolve = function (data) {
        $scope.errorMessage = data;
    };
    $scope.fileUpload = "";
    
    $scope.uploadFile = function () {
        var length = $("#imageUpload").prop("files").length;
        var path = [];
        if (length > 0) {
            var index = 0;
            for (; length > index; index++) {
                path.push($("#imageUpload").prop("files")[index]);
            }
        }
        if (path.length > 0) {
            load(path);
        } else {
            resolve("No file");
        }
    };
    
    $scope.search = function () {
        if ("none" == $("#searchImageEd").css("display")) {
            $("#searchImageEd").val("");
            $("#searchImageEd").show();
        } else {
            $("#searchImageEd").hide();
        }
    };
    
    $scope.searchImageEditor = function () {
        $scope.nameImage = $("#searchImageEd").val();
        var b = $(".item_image");
        b.show();
        if ("" != $scope.nameImage) {
            b.each(function () {
                var b = $(this).attr("pn-name");
                if (-1 == b.search($scope.nameImage)) {
                    $(this).hide();
                }
            });
        }
    };
    
    $scope.selectImageAdd = function (params) {
        var type = selectedItem.attr("pn-type");
        var i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        if (i) {
            if ("image" == type) {
                apiElement[i].link = URL_IMAGE + params;
                selectedItem.find(".widget-content").eq(0).attr("src", URL_IMAGE + params);
            } else {
                apiElement[i].media[deviceEdit]["background-image"] = URL_IMAGE + params;
                apiElement[i].bg_type = "image";
                if (selectedItem.hasClass("widget-element")) {
                    selectedItem.find(".widget-content").eq(0).css({
                        background: 'url("' + URL_IMAGE + params + '")'
                    });
                } else {
                    selectedItem.css({
                        background: 'url("' + URL_IMAGE + params + '")'
                    });
                }
            }
        }
    };
    
    var load = function (file) {
        editorSvr.uploadImage(file, function (data) {
            if (200 == angular.fromJson(data).code) {
                getServerRecoveryCode();
            } else {
                resolve(data.message);
            }
        }, function (instance) {
            resolve(instance.message);
        });
    };
    
    var getServerRecoveryCode = function () {
        editorSvr.getAllImage(function (data) {
            if (200 == data.code) {
                $scope.items = data.data;
            } else {
                resolve(data.message);
            }
        }, function (instance) {
            resolve(instance.message);
        });
    };
    
    $scope.lpSelectImage = function () {
        editorSvr.getAllImage(function (data) {
            if (200 == data.code) {
                $scope.items = data.data;
            } else {
                resolve(data.message);
            }
        }, function (instance) {
            resolve(instance.message);
        });
    };
    
    $scope.cancel = function () {
    };
    $translate.use("en");
}]);