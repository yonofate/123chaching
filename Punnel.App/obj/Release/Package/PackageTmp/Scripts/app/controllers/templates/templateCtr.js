angular.module("punnelApp").controller("templateCtr", ["$scope", "$auth", "$filter", "APP_CONFIG", "$restful", "popupService", "Upload", function ($scope, $auth, $filter, APP_CONFIG, $restful, popupService, Upload) {
    $scope.statusOptions = angular.copy(template_status); 
    $scope.statusOptions.unshift({ i: null, n: 'Tất cả' });
    $scope.typeOptions = angular.copy(template_type); 
    $scope.typeOptions.unshift({ i: 0, n: 'Tất cả' });

    $scope.isEditor = $auth.isEditor();

    $scope.getStatusName = function (status) {
        return template_status[status].n;
    }

    $scope.getTemplateTypeName = function (type) {
        if (type && type > 1) {
            return template_type[type / 10 - 1].n;
        }
        return "";
    }

    $scope.query = {
        type: 0,
        limit: 20,
        is_store:null,
        status: null,
        me: true
    };

    function getTemplates() {
        PN_PAGE.dbLoading.show();
        $restful.get("/template", $scope.query).then(function (result) {
            PN_PAGE.dbLoading.hide();
            $scope.data = result.data.data;
            angular.forEach($scope.data, function (value, key) {
                value.thumbnail = PN_PAGE.resizeImg(value.thumbnail, 360, 207);
            });
        });
    }

    $scope.search = function () {
        getTemplates();
    }

    $scope.editTemplate = function (id) {
        $state.go("editor", {
            id: id,
            type:'t'
        });
    };

    $scope.showChangeName = function (id, name) {
        popupService.show('addName.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.label = 'Nhập tên mới';
            $scope.title = 'Thay đổi tên';
            $scope.name = name;

            $scope.editName = {
                id: id,
                name: name
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide($scope.editName);
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                $scope.editName.name = $scope.name;
                PN_PAGE.btnLoading.show();
                $restful.put("/template", {
                    id: $scope.editName.id,
                    name: $scope.editName.name,
                    opt: "Name"
                }).then(function (result) {
                    $scope.hide();
                });
            };
        }], function (res) {
            $filter('filter')($scope.data, function (d) { return d.id === res.id; })[0].name = res.name;
        });
    };

    $scope.showEdit = function (item) {
        popupService.show('applyTemplateFromPage.html', { page: item }, ['$scope', '$state', '$mdDialog', 'page', function ($scope, $state, $mdDialog, page) {

            $scope.title = 'Sửa ' + template_type[(page.type / 10 - 1)].n.toLowerCase() + ' mẫu';
            $scope.label = 'Tên ' + template_type[(page.type / 10 - 1)].n.toLowerCase() + ' mẫu';

            $scope.group = {
                all: null,
                options: landingpage_group,
                selecteds: []
            }

            $scope.temp = {
                id: page.id,
                name: page.name,
                gid: page.groupid,
                templateCateId: page.templateCateId,
                price: page.price,
                isStore: page.isStore,
                opt:'Cate'
            }

            $scope.init = function () {
                initSelectedGroup();
            }

            function initSelectedGroup() {
                $scope.group.selecteds = [];
                angular.forEach($scope.group.options, function (value, idx) {
                    if ((value.i & page.groupid) === value.i) $scope.group.selecteds.push(value.i);
                });
            }
            $scope.init();

            

            $scope.initCates = function () {
                PN_PAGE.loading.show();
                $restful.get("/cate", {
                    type: page.type
                }).then(function (result) {
                    PN_PAGE.loading.hide();
                    $scope.cates = result.data;
                });
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.hide = function () {
                $mdDialog.hide($scope.temp);
            };

            function sumSelectedValues() {
                var total = 0;
                for (var i = 0; i < $scope.group.selecteds.length; i++) {
                    total += $scope.group.selecteds[i];
                }
                return total;
            }

            $scope.submit = function (a) {
                PN_PAGE.loading.show();
                if ($scope.group.selecteds.length == 0) $scope.temp.gid = null;
                else {
                    $scope.temp.gid = sumSelectedValues();
                }
                PN_PAGE.btnLoading.show();
                $restful.put("/template", $scope.temp).then(function (result) {
                    PN_PAGE.loading.hide();
                    $scope.hide();
                    PN_PAGE.show("Cập nhật thành công");
                });
            };
        }], function (res) {
            item.name = res.name;
            item.templateCateId = res.templateCateId;
            item.groupid = res.gid;
            item.price = res.price;
            item.isStore = res.isStore;
        });
    }

    $scope.remove = function (id) {
        swal({
            title: "Xóa template!",
            text: "Bạn không thể khôi phục sau khi xóa template này",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "\u0110\u1ed3ng \u00fd",
            cancelButtonText: "Kh\u00f4ng x\u00f3a",
            closeOnConfirm: true
        }, function (value) {
            if (value == false) return;
            $restful.delete("/template", {
                id: id
            }).then(function (result) {
                swal("Đã xóa!", "", "success");
                getTemplates();
            });
        });
    };

    $scope.showAddTemplate = function () {
        popupService.show('addTemplate.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.hide = function (res) {
                $mdDialog.hide(res);
            };

            $scope.choose = function (type) {
                $scope.hide(type);
            };

        }], function (res) {
            $scope.createBlankTemplate(res);
        });
    };

    $scope.createBlankTemplate = function (type) {
        $scope.createTemplate({type:type});
    }

    $scope.createTemplate = function (item) {
        popupService.show('applyTemplateFromPage.html', { page: item }, ['$scope', '$state', '$mdDialog', 'page', function ($scope, $state, $mdDialog, page) {

            $scope.title = 'Tạo ' + template_type[(page.type / 10 - 1)].n.toLowerCase() + ' mẫu';
            $scope.label = 'Tên ' + template_type[(page.type / 10 - 1)].n.toLowerCase() + ' mẫu';

            $scope.group = {
                all: null,
                options: landingpage_group, 
                selecteds: []
            }

            $scope.temp = {
                name: '',
                gid: null,
                templateCateId: null,
                fromTemplateId: page.id,
                source: page.source,
                type: page.type,
                thumbnail: page.thumbnail
            }

            $scope.initCates = function () {
                PN_PAGE.loading.show();
                $restful.get("/cate", {
                    type: page.type
                }).then(function (result) {
                    PN_PAGE.loading.hide();
                    $scope.cates = result.data;
                });
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.hide = function () {
                $mdDialog.hide();
            };

            function sumSelectedValues() {
                var total = 0;
                for (var i = 0; i < $scope.group.selecteds.length; i++) {
                    total += $scope.group.selecteds[i];
                }
                return total;
            }

            $scope.submit = function (a) {
                PN_PAGE.loading.show();

                if ($scope.group.selecteds.length == 0) $scope.temp.gid = null;
                else {
                    $scope.temp.gid = sumSelectedValues();
                }

                $restful.post("/template", $scope.temp).then(function (result) {
                    PN_PAGE.loading.hide();
                    $scope.hide();
                    $state.go("editor", {
                        id: result.data,
                        type: 't'
                    }, "_top");
                   
                });
            };
        }], function (res) {
        });
    }

    $scope.showUploadImg = function (data) {
        popupService.show('templateChangeImage.html', { data: data }, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.data = data;
            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.hide = function (res) {
                $mdDialog.hide(res);
            };

            $scope.uploadFiles = function (files) {
                if (files && files.length) {
                    var i = 0;
                    for (; i < files.length; i++) {
                        if (files[i].size > 5242880) {
                            return PN_PAGE.showMessage("\u1ea2nh v\u01b0\u1ee3t qu\u00e1 dung l\u01b0\u1ee3ng cho ph\u00e9p 5Mb, vui l\u00f2ng th\u1eed l\u1ea1i!", 'error'),
                                $(".loading").css({
                                opacity: "1"
                            }).hide(), false;
                        }
                    }
                    i = 0;
                    for (; i < files.length; i++) {
                        PN_PAGE.pageLoading.show();
                        PN_PAGE.uploadImageLadi(Upload, files[i], "/api/upload", 4, "", function (res) {
                            PN_PAGE.pageLoading.hide();
                            if (res.data.data.path && res.data.data.path != null) {
                                $scope.data.thumbnail = APP_CONFIG.URL_IMAGE + res.data.data.path;
                                $scope.apply();
                            }
                        });
                    }
                }
            };

            $scope.apply = function () {
                PN_PAGE.loading.show();
                $restful.put("/template", {
                    id: $scope.data.id,
                    thumbnail: $scope.data.thumbnail,
                    opt: 'Thumb'
                }).then(function (result) {
                    PN_PAGE.loading.hide();
                    $scope.hide($scope.data);
                 }); 
            };
        }], function (res) {
            $filter('filter')($scope.data, function (d) { return d.id === res.id; })[0].thumbnail = res.thumbnail;
        });
    };
}]);
