angular.module("punnelApp").controller("templatesCtr", ["$scope", "$auth", "APP_CONFIG", "$restful", "suggestService", "$filter", "popupService", "Upload", function ($scope, $auth, APP_CONFIG, $restful, suggestService, $filter, popupService, Upload) {
    $scope.query = {
        type:10,
        gid: null,
        status: 2,//approve
        is_section: 0,
        is_popup: 0,
        is_store: true,
        is_free: null,
        is_community:null,
        me: null,
        cid: null,
        page: 1,
        limit:17
    }

    $scope.isWaitingForApprove = false;

    $scope.isEditor = $auth.isEditor();
    $scope.profileId = $auth.getUserId();

    $scope.group = {
        all:false,
        options: landingpage_group, 
        selecteds: []
    }
    $scope.totalItem = 0;
    $scope.cates = [];

    function getCates(type) {
        PN_PAGE.dbLoading.show();
        $scope.query.cid = null;//  suggestService.getVal('theme_cid');
        $restful.get("/cate", {
            type: type
        }).then(function (result) {
            PN_PAGE.dbLoading.hide();
            $scope.cates = result.data.sort(function (a, b) {
                return a.name - b.name;
            });
            $scope.cates.unshift({ id: null, name: 'Tất cả ngành nghề' });

            if ($scope.query.cid != null) {
                var c = $filter('filter')($scope.cates, function (d) { return d.id === $scope.query.cid; })
                if (c.length == 0) {
                    suggestService.setVal('theme_cid', null);
                }
            }
        });
    }

    function getTemplates() {
        PN_PAGE.dbLoading.show();
        if ($scope.group.selecteds.length == 0) $scope.query.gid = null;
        else {
            $scope.query.gid = sumSelectedValues();
        }
        $restful.get("/template", $scope.query).then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.templates = res.data.data;
            $scope.totalItem = res.data.total;
        });
    }

    function sumSelectedValues() {
        var total = 0;
        for (var i = 0; i < $scope.group.selecteds.length; i++) {
            total += $scope.group.selecteds[i];
        }
        return total;
    }

    $scope.getCateName = function (id) {
        if (id == null) return '';
        var cate = $filter('filter')($scope.cates, function (d) { return d.id === id; })[0];
        if (cate != null) return cate.name;
        else return '';
    }

    $scope.$watchCollection('group.selecteds', function (newCol, oldCol, scope) {
        if (newCol.length > 0) $scope.group.all = false;
        else $scope.group.all = true;
        $scope.query.page = 1;  
        if ($scope.query.me == true && newCol.length > 0) $scope.query.me = false;
        getTemplates();
    });

    $scope.getCates = function () {
        getCates(10);
    }

    $scope.searchInCate = function (cateId) {
        $scope.query.type = 10;
        $scope.query.page = 1;
        $scope.query.cid = cateId;
        getTemplates();
    }

    $scope.cateChanged = function () {
        $scope.query.type = 10;
        $scope.query.page = 1;
        getTemplates();
    }

    $scope.cateChoose = function (cid) {
        $scope.query.type = 10;
        $scope.query.page = 1;
        $scope.query.cid = cid;
        getTemplates();
    }

    $scope.search = function (type) {
        $scope.query.type = 10;
        if ($scope.query.is_section === true && type ==20) {
            $scope.query.is_popup = 0;
            $scope.query.type = 20;
        }

        if ($scope.query.is_popup === true && type == 30) {
            $scope.query.is_section = 0;
            $scope.query.type = 30;
        }

        if (type == -1 && $scope.query.me === true) {
            $scope.query.is_popup = 0;
            $scope.query.is_section = 0;
            $scope.group.selecteds = [];
        }

        $scope.query.page = 1;       
        getTemplates();
    };

    $scope.pageChanged = function () {
        getTemplates();
    }
    $scope.selectAllChange = function () {
        if ($scope.group.all === true) {
            $scope.group.selecteds = [];
        }
    }
    $scope.changeIsWaitingForApprove = function () {
        if ($scope.isWaitingForApprove === true) {
            $scope.query = {
                type: 10,
                gid: null,
                status: 1,//approve
                is_section: 0,
                is_popup: 0,
                is_store: true,
                me: null,
                cid: null,
                page: 1,
                limit: 17
            }
        } else {
            $scope.query.status = 2;
        }
        $scope.query.page = 1;
        getTemplates();
    }

    $scope.showCreatePageByTemplate = function (template_id) {
        var data = { template_id: template_id, type: $scope.query.type, cid: $scope.query.cid };       
        popupService.show('addName.html', { 'data': data }, ['$scope', '$state', '$mdDialog', 'suggestService', 'data', function ($scope, $state, $mdDialog, suggestService, data) {
            $scope.title = 'Tạo Landing Page';
            $scope.label = 'Tên Landing Page';
            $scope.name = '';
            $scope.newLandingPage = {
                name: '',
                gid: null,
                type: data.type,
                templateid: data.template_id,
                cid: null
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                $scope.newLandingPage.name = $scope.name;
                PN_PAGE.btnLoading.show();
                PN_PAGE.dbLoading.show();
                $restful.post("/landingpage",
                    $scope.newLandingPage).then(
                    function (result) {
                        if (data.cid) {
                            suggestService.setVal('theme_cid', data.cid);
                        }
                            PN_PAGE.dbLoading.hide();
                            $scope.cancel();
                            $state.go("editor", {
                                id: result.data.id,
                                type: 'p'
                            }, "_top");
                        });
            };
        }], function (res) {
        });
    }

    $scope.remove = function (id,index) {
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
            PN_PAGE.dbLoading.show();
            $restful.delete("/template", {
                id: id
            }).then(function (result) {
                PN_PAGE.dbLoading.hide();
                swal("Đã xóa!", "", "success");
                $scope.templates.splice(index, 1);
                //getTemplates();
            });
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
                opt: 'Cate'
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
                PN_PAGE.dbLoading.show();
                $restful.get("/cate", {
                    type: page.type
                }).then(function (result) {
                    PN_PAGE.dbLoading.hide();
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
                PN_PAGE.dbLoading.show();
                if ($scope.group.selecteds.length == 0) $scope.temp.gid = null;
                else {
                    $scope.temp.gid = sumSelectedValues();
                }
                PN_PAGE.btnLoading.show();
                $restful.put("/template", $scope.temp).then(function (result) {
                    PN_PAGE.dbLoading.hide();
                    $scope.hide();
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
                PN_PAGE.dbLoading.show();
                $restful.put("/template", {
                    id: $scope.data.id,
                    thumbnail: $scope.data.thumbnail,
                    opt: 'Thumb'
                }).then(function (result) {
                    PN_PAGE.dbLoading.hide();
                    $scope.hide($scope.data);
                });
            };
        }], function (res) {
            $filter('filter')($scope.data, function (d) { return d.id === res.id; })[0].thumbnail = res.thumbnail;
        });
    };
}]);
