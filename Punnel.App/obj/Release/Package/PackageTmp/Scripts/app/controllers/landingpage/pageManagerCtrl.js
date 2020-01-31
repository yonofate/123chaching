angular.module("punnelApp").controller("pageManagerCtrl", ["$scope", "APP_CONFIG", "$restful", "$state", "$auth", "$filter", "popupService", function ($scope, APP_CONFIG, $restful, $state, $auth, $filter, popupService) {
    $scope.noItem = "false";    
    $scope.query = {
        is_publish: null,
        type: 10,
        page: 1,
        limit: 30,
        keyword: ''
    }

    $scope.totalPage = 0;

    $scope.publishOptions = [{ i: null, n: 'Tất cả' }, { i: true, n: 'Đã xuất bản' }, { i: false, n: 'Chưa xuất bản' }];

    $scope.search = function () {
        $scope.noItem = false;
        $scope.isLoad = true;
        $scope.listLadi = [];
        $scope.listGroup = [];
        PN_PAGE.dbLoading.show();
        $restful.get("/landingpage", $scope.query).then(function (r) {
            $scope.listLadi = r.data.data;
            $scope.totalPage = r.data.total;
            $restful.get("/collection", { tid: 1 }).then(function (result) {
                PN_PAGE.dbLoading.hide();
                if (result.data.length == 0 && $scope.listLadi.length == 0) {
                    $scope.noItem = true;
                    return;
                }
                result.data.push({ id: null, name: '' });
                angular.forEach(result.data, function (item, key) {
                    var pages = $filter('filter')($scope.listLadi, function (d) { return d.coid === item.id; });
                    var data = { id: item.id, name: item.name, pages: pages };
                    if (pages.length>0) $scope.listGroup.push(data);
                });
                $scope.isLoad = false;
            });
        });
    };

    $scope.makeUrl = function (domain) {
        var protocol = "http://";
        if (domain.indexOf('punnel.com') >= 0) protocol = "https://";
        return protocol + domain;
    }

    $scope.showChangeName = function (id, name, type, coid) {
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
                type: type,
                coid: coid
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
                PN_PAGE.btnLoading.show('btn-sm');
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
                var g = $filter('filter')($scope.listGroup, function (d) { return d.id === res.coid; })[0];
                $filter('filter')(g.pages, function (d) { return d.id === res.id; })[0].name = res.name;
            } else {
                $filter('filter')($scope.listGroup, function (d) { return d.id === res.id; })[0].name = res.name;
            }
        });
    };

    $scope.showCreateGroup = function () {
        popupService.show('addName.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.title = 'Tạo nhóm Landing Page';
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
                PN_PAGE.btnLoading.show('btn-sm');
                PN_PAGE.loading.show();
                $restful.post("/Collection", {
                    type: 1,
                    name: $scope.name
                }).then(function (result) {
                    PN_PAGE.loading.hide();
                    $scope.hide(result);
                });
            };
        }], function (res) {
            var data = { id: res.data.id, name: res.data.name, pages: [] };
            $scope.listGroup.unshift(data);
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

    $scope.showSharePage = function (data) {
        popupService.show('shareSocialPage.html', {data:data}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.title = 'Chia sẻ đến bạn bè';

            $scope.page = data;

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.hide = function () {
                $mdDialog.hide();
            };
        }], function () {
        });
    };

    $scope.goEditPunnel = function (id) {
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
    $scope.goLead = function (id) {
        $state.go("dashboard.lead", {
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
                PN_PAGE.btnLoading.show('btn-sm');
                PN_PAGE.loading.show();
                $restful.delete("/landingpage", {
                    id: item.id
                }).then(function (result) {
                    PN_PAGE.loading.hide();
                    var g = $filter('filter')($scope.listGroup, function (d) { return d.id === item.coid; })[0];
                    var idx = g.pages.indexOf(item);
                    g.pages.splice(idx, 1);
                    swal("Đã xóa!", "", "success");
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
                PN_PAGE.btnLoading.show('btn-sm');
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
                PN_PAGE.loading.show();
                PN_PAGE.btnLoading.show('btn-sm');
                $restful.delete("/Collection", {
                    id: item.id
                }).then(function (result) {
                    PN_PAGE.loading.hide();
                    swal("\u0110\u00e3 x\u00f3a!", "", "success");
                    var idx = $scope.listGroup.indexOf(item);
                    $scope.listGroup.splice(idx, 1);
                });
            }
        });
    }

    $scope.duplicatePage = function (code, name, coid, idx) {
        if (!name || name.length == 0) return;
        PN_PAGE.btnLoading.show();
        $restful.post("/landingpage", {
            name: name + " (copy)",
            code: code,
            type: 10,
            cid: "",
            coid: coid
        }).then(function (result) {
            PN_PAGE.btnLoading.hide();
            PN_PAGE.btnLoading.show('btn-sm');
            var g = $filter('filter')($scope.listGroup, function (d) { return d.id === coid; })[0];
            g.pages.splice(idx, 0, result.data);
            swal("Nhân bản thành công!", "", "success");
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
                PN_PAGE.btnLoading.show('btn-sm');
                $restful.post("/template", $scope.temp).then(function (result) {
                    PN_PAGE.loading.hide();
                    swal("Đã tạo giao diện mẫu thành công!","","success");
                    $scope.hide(a);
                });
            };
        }], function (res) {
            });
    }

    $scope.dropCallback = function (index, page, coid) {
        if (page.coid != coid) {
            var data = {
                id: page.id,
                coid: coid,
                position:index,
                opt: 'col'
            };
            $restful.put("/landingpage", data).then(function (result) {
            });
            page.coid = coid;
            return page;
        } else {
            var data = {
                id: page.id,
                coid: coid,
                position: index,
                opt: 'pos'
            };
            $restful.put("/landingpage", data).then(function (result) {
            });
            return page;
        }
    };

    $scope.showAutomationConfig = function (item) {
        popupService.show('automationConfig.html', {}, ['$scope', '$filter', '$state', '$mdDialog', function ($scope, $filter, $state, $mdDialog) {
            
            $scope.cancel = function(){
                $mdDialog.cancel();
            }
            $scope.hide = function (r) {
                $mdDialog.hide(r);
            }
            $scope.canAdd = {
                email: item.hasEmailFrm,
                phone: item.hasPhoneFrm
            }

            $scope.automation = {
                loaded: 0,
                new: {
                    landingPageId: item.id,
                    delayHour: 0,
                    delayMin: 0
                },
                type: null,
                isAdd: 0,
                data: [],
                list: [],
                templates: [],
                showAdd: function () {
                    $scope.automation.isAdd = 1;
                },
                hideAdd: function () {
                    $scope.automation.new = {
                        landingPageId: item.id,
                        delayHour: 0,
                        delayMin: 0,
                        templateId: null,
                        type: null
                    };
                    $scope.automation.isAdd = 0;
                },
                init: function () {
                    PN_PAGE.sectionLoading.show();
                    $restful.get("/emailtemplate?pageId=" + item.id).then(function (res) {
                        $scope.automation.data = res.data;
                        PN_PAGE.sectionLoading.hide();
                    });
                    PN_PAGE.sectionLoading.show();
                    $restful.get("/automation?pageId=" + item.id).then(function (res) {
                        $scope.automation.list = res.data;
                        PN_PAGE.sectionLoading.hide();
                        $scope.automation.loaded = 1;
                    });
                },

                changeType: function () {
                    if ($scope.automation.new.type == 1 && $scope.canAdd.email == false) {
                        PN_PAGE.showMessage('Landing page cần có form thu thập email!', "error");
                        $scope.automation.new.type = null;
                        return;
                    }
                    if ($scope.automation.new.type == 2 && $scope.canAdd.phone == false) {
                        PN_PAGE.showMessage('Landing page cần có form thu thập số điện thoại!', "error");
                        $scope.automation.new.type = null;
                        return;
                    }
                    $scope.automation.templates = $filter('filter')($scope.automation.data, function (d) { return d.type === $scope.automation.new.type; });
                },
                add: function () {
                    if ($scope.frmAutomation.$valid == false) return;
                    PN_PAGE.btnLoading.show();
                    $restful.post("/automation", $scope.automation.new).then(function (res) {
                        $scope.automation.init();
                        $scope.automation.hideAdd();
                    });
                },
                changeStatus: function (item) {
                    $restful.put("/automation", item).then(function (res) {
                    });
                },
                delete: function (id, index) {
                    swal({
                        title: "Xác nhận xóa",
                        text: "Bạn xác nhận xóa?",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#DD6B55",
                        confirmButtonText: "\u0110\u1ed3ng \u00fd",
                        cancelButtonText: "Kh\u00f4ng x\u00f3a",
                        closeOnConfirm: true
                    }, function (ok) {
                        if (ok == true) {
                            PN_PAGE.dbLoading.show();
                            $restful.delete("/automation", { id: id }).then(function (res) {
                                PN_PAGE.dbLoading.hide();
                                PN_PAGE.showMessage("Đã xóa!");
                                $scope.automation.list.splice(index, 1);
                                return;
                            });
                        }
                    });
                }
            }
        }], function (res) {
        });
    };

}]);
