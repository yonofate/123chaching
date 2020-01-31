angular.module("punnelApp").controller("landingPageManagerCtrl", ["$scope", "APP_CONFIG", "$restful", "$state", "$auth", "$filter", "popupService", function ($scope, APP_CONFIG, $restful, $state, $auth, $filter, popupService) {
    $scope.noItem = "false";    
    $scope.query = {
        is_publish: null,
        type: 10,
        page: 1,
        limit: 50,
        keyword: ''
    }

    $scope.publishOptions = [{ i: null, n: 'Tất cả' }, { i: true, n: 'Đã xuất bản' }, { i: false, n: 'Chưa xuất bản' }];

    $scope.makeUrl = function (domain) {
        var protocol = "http://";
        if (domain.indexOf('punnel.com') >= 0) protocol = "https://";
        return protocol + domain;
    }

    $scope.showChangeName = function (id, name, type, vt) {
        popupService.show('addName.html', {}, ['$scope', '$state', '$mdDialog',function ($scope, $state, $mdDialog) {
            if (type == 'ladi') {
                $scope.label = 'Tên Landing Page';
            } else {
                $scope.label = 'Tên nhóm';
            }
            $scope.title = 'Thay đổi tên';
            $scope.name = name;

            $scope.editName = {
                id: id,
                name: name,
                type: type
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
                if ("ladi" == $scope.editName.type) {
                    $restful.put("/landingpage", {
                        id: $scope.editName.id,
                        name: $scope.editName.name,
                        opt: "name"
                    }).then(function (result) {
                        $scope.hide();
                    });
                } else {
                    $restful.put("/Collection", {
                        id: $scope.editName.id,
                        name: $scope.editName.name
                    }).then(function (result) {
                        $scope.hide();
                    });
                }
            };
        }], function (res) {
            if (res.type == 'ladi') {
                $filter('filter')($scope.listLadi, function (d) { return d.id === res.id; })[0].name = res.name;
            } else {
                $filter('filter')($scope.listGroup, function (d) { return d.id === res.id; })[0].name = res.name;
            }
        });
    };

    $scope.showCreateGroup = function () {
        popupService.show('addName.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.title = 'Tạo nhóm Lading Page';
            $scope.label = 'Tên nhóm';
            $scope.name = '';

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.hide = function (res) {
                $mdDialog.hide(res);
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                $(".parLoading").show();
                $restful.post("/Collection", {
                    type: 1,
                    name: $scope.name
                }).then(function (result) {
                    $(".parLoading").hide();
                    $scope.hide(result);
                });
            };
        }], function (res) {
            $scope.listGroup.unshift(res.data);
            if (choose && choose == 1) {
                $scope.ladiMove.coid = res.data.id;
            }
        });
    };

    $scope.showMovePage = function (id, coid) {
        popupService.show('movePageInGroup.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.ladiMove = {
                id: id,
                coid: coid,
                opt: 'col'
            };
            $scope.newGroup = {
                type: 1,
                name: ''
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.hide = function (a) {
                $mdDialog.hide({ page: $scope.ladiMove, group: a });
            };
            $scope.init = function () {
                $restful.get("/collection", {
                    tid: 1
                }).then(function (result) {
                    $scope.listGroup = result.data;
                });
            }
            $scope.createGroupNew = function () {
                PN_PAGE.btnLoading.show();
                $restful.post("/Collection", $scope.newGroup).then(function (result) {
                    PN_PAGE.btnLoading.hide();
                    $scope.ladiMove.coid = result.data.id;
                    $scope.submit(result.data);
                });
            };

            $scope.submit = function (a) {
                PN_PAGE.btnLoading.show();
                $restful.put("/landingpage", $scope.ladiMove).then(function (result) {
                    PN_PAGE.btnLoading.hide();
                    $scope.hide(a);
                });
            };
        }], function (res) {
            if (res.group) {
                $scope.listGroup.unshift(res.group);
            }
            if (res.page.coid == 0) res.page.coid = null;
            var col = $filter('filter')($scope.listLadi, function (d) {
                return d.id === res.page.id;
            })[0].coid = res.page.coid;
        });
    };

    function getGroup() {
        $scope.listGroup = [];
        PN_PAGE.loading.show()
        $restful.get("/collection", {tid:1}).then(function (result) {
            PN_PAGE.loading.hide();
            $scope.listGroup = result.data;
            $scope.listGroup.push({ id: null, name: '' });           
        });
    };

    function getPages() {
        $scope.noItem = false;
        $scope.listLadi = [];
        PN_PAGE.loading.show();
        $restful.get("/landingpage", $scope.query).then(function (result) {
            PN_PAGE.loading.hide();
            if (result.data.length == 0) {
                $scope.noItem = true;
                return;
            }

            $scope.listLadi = result.data;
        });
    };
    $scope.init = function () {
        getGroup();
        getPages();
    };
    $scope.search = function () {
        getPages();
    };

    $scope.goEditLadipage = function (id) {
        $state.go("editor", {
            id: id,
            type: 'p'
        });
    };

    $scope.goAnalytic = function (id) {
        $state.go("dashboard.analytics", {
            id: id
        });
    }

    $scope.removePage = function (item) {
        swal({
            title: "Chú ý",
            type: "warning",
            text: "Việc phục hồi sau khi xóa không thực hiện được. Bạn có chắc chắn xoá Landing Page này?",
            showCancelButton: !0,
            confirmButtonColor: "#d9534f",
            confirmButtonText: "Xóa",
            cancelButtonText: "Không",
            closeOnConfirm: !0
        }, function (ok) {
            if (ok) {
                PN_PAGE.loading.show();
                $restful.delete("/landingpage", {
                    id: item.id
                }).then(function (result) {
                    PN_PAGE.loading.hide();
                    swal("Đã xóa!", "", "success");
                    var idx = $scope.listLadi.indexOf(item);
                    $scope.listLadi.splice(idx, 1);
                });
            }
        });
    }

    $scope.stopPage = function (item) {
        swal({
            title: "Chú ý",
            type: "warning",
            text: "Tạm ngưng & đưa trang này về trạng thái chưa xuất bản?",
            showCancelButton: !0,
            confirmButtonColor: "#d9534f",
            confirmButtonText: "Đồng ý",
            cancelButtonText: "Không",
            closeOnConfirm: !0
        }, function (ok) {
            if (ok) {
                PN_PAGE.loading.show();
                $restful.put("/landingpage", {
                    id: item.id,
                    opt:'unpublish'
                }).then(function (result) {
                    PN_PAGE.loading.hide();
                    swal("Đã ngưng trang!", "", "success");
                    item.is_publish = false;
                });
            }
        });
    }

    $scope.removeGroup = function (item) {
        swal({
            title: "Chú ý",
            type: "warning",
            text: "Tất cả các landing page trong nhóm này sẽ bị xóa. Bạn có chắc chắn xoá nhóm này?",
            showCancelButton: !0,
            confirmButtonColor: "#d9534f",
            confirmButtonText: "Xóa",
            cancelButtonText: "Không",
            closeOnConfirm: !0
        }, function (ok) {
            if (ok) {
                PN_PAGE.pageLoading.show();
                $restful.delete("/Collection", {
                    id: item.id
                }).then(function (result) {
                    PN_PAGE.pageLoading.hide();
                    swal("\u0110\u00e3 x\u00f3a!", "", "success");
                    var idx = $scope.listGroup.indexOf(item);
                    $scope.listGroup.splice(idx, 1);
                });
            }
        });
    }

    $scope.duplicatePage = function (code, name) {
        if (!name || name.length == 0) return;
        PN_PAGE.btnLoading.show();
        $restful.post("/landingpage", {
            name: name + " (copy)",
            code: code,
            type: 10,
            cid: "",
            coid: ""
        }).then(function (result) {
            PN_PAGE.btnLoading.hide();
            $scope.listLadi.unshift(result.data);
            var text = "Nh\u00e2n b\u1ea3n th\u00e0nh c\u00f4ng!";
            swal({
                title: "Th\u00f4ng b\u00e1o ",
                text: text,
                showCancelButton: false,
                closeOnConfirm: true
            });
        });
    };

    $scope.isEditor = $auth.isEditor();

    $scope.applyTemplate = function (item) {
        popupService.show('applyTemplateFromPage.html', { page: item }, ['$scope', '$state', '$mdDialog','page', function ($scope, $state, $mdDialog, page) {
            $scope.title = 'Tạo giao diện mẫu từ Landing Page';
            $scope.label = 'Tên giao diện mẫu';
            $scope.temp = {
                name: '',
                templateCateId: null,
                pageid: page.id,
                gid:null
            }

            $scope.group = {
                all: null,
                options: landingpage_group,
                selecteds: []
            }

            function sumSelectedValues() {
                var total = 0;
                for (var i = 0; i < $scope.group.selecteds.length; i++) {
                    total += $scope.group.selecteds[i];
                }
                return total;
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
            $scope.hide = function (a) {
                $mdDialog.hide();
            };

            $scope.submit = function (a) {
                PN_PAGE.loading.show();

                if ($scope.group.selecteds.length == 0) $scope.temp.gid = null;
                else {
                    $scope.temp.gid = sumSelectedValues();
                }

                $restful.post("/template", $scope.temp).then(function (result) {
                    PN_PAGE.loading.hide();
                    swal("Đã tạo giao diện mẫu thành công!","","success");
                    $scope.hide(a);
                });
            };
        }], function (res) {
            });
    }

}]);
