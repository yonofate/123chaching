angular.module("punnelApp").controller("leadCtrl", ["$scope", "$restful", "$state", "$stateParams", "$location", "popupService", "$q", function ($scope, $restful, $state, $stateParams, $location, popupService, $q) {
    $scope.query = {
        keyword: '',
        page: 1,
        limit: 12,
        tagid: null,
        status: null,
        tagid: null,
        region: null,
        contact: null,
        ismobile: null,
        landingpageid: null,
        fromDate: new Date(),
        toDate: new Date()
    }
    $scope.query.landingpageid = $stateParams['id'];
    $scope.lead = {};
    $scope.pageOptions = [];
    $scope.tagOptions = [];
    $scope.isDirty = false;
    $scope.condition = {
        statusOptions: lead_status_filter,
        contactOptions: [{ i: null, n: 'Tất cả' }, { i: 1, n: 'Chưa gửi' }, { i: 2, n: 'Đã gửi' }, { i: 3, n: 'Đã xem' }],
        deviceOptions: [{ i: null, n: 'Tất cả' }, { i: false, n: 'Desktop' }, { i: true, n: 'Mobile' }],
        link: null,
        changed: function () {
            $scope.search();
            $stateParams['id'] = $scope.query.landingpageid;
            $state.params['id'] = $scope.query.landingpageid;
            $location.search('id', $scope.query.landingpageid);
            if ($scope.leadFilter.selected && $scope.leadFilter.selected.id > 0 && canMakeFilter() == true) {
                $scope.isDirty = true;
            } else {
                $scope.isDirty = false;
            }
        }
    }

    $scope.action = {
        items: [],
        isAll: false,
        allowSelect: true,
        select: function () {
            $scope.action.allowSelect = true;
        },
        canAction: function () {
            return ($scope.action.items.length > 0 && $scope.action.allowSelect == true);
        },
        exists: function (id) {
            return $scope.action.items.indexOf(id) > -1;
        },
        toggle: function (id) {
            var idx = $scope.action.items.indexOf(id);
            if (idx > -1) {
                $scope.action.items.splice(idx, 1);
            }
            else {
                $scope.action.items.push(id);
            }
        },
        toggleAll: function () {
            console.log($scope.action.isAll);
            if ($scope.action.isAll == false) {
                $scope.action.items = [];
                angular.forEach($scope.leads, function (v, i) {
                    $scope.action.items.push(v.id);
                });
            } else {
                $scope.action.items = [];
            }
        }
    }

    $scope.wdate = {
        dateRange: { startDate: moment().subtract(30, 'days'), endDate: moment() }
    }
    $scope.maxDate = moment().format("YYYY-MM-DD");
    $scope.options = PN_PAGE.dateRangeOption;

    $scope.$watch("wdate.dateRange", function (newValue, oldValue) {
        $scope.query.fromDate = $scope.wdate.dateRange.startDate.format("YYYY-MM-DD");
        $scope.query.toDate = $scope.wdate.dateRange.endDate.format("YYYY-MM-DD");
        $scope.condition.changed();
    });

    $scope.totalItem = 0;

    $scope.init = function () {
        if ($stateParams.id && $stateParams.id.length > 0) {
            $scope.query.landingpageid = $stateParams.id;
        }
        $scope.getTags();
        $scope.search();
    }

    $scope.pageChanged = function () {
        getLeads();
    }

    $scope.search = function () {
        $scope.query.page = 1;
        getLeads();
    };

    $scope.sendEmail = function (id) {
        $state.go("dashboard.sendmail", { id: id });
    }

    $scope.showSendmail = function () {
        var data = $scope.action.items;
        if (data.length == 0) {
            PN_PAGE.showMessage("Chưa chọn danh sách gửi email!", "warning");
            return;
        }
        popupService.show('leadSendMail.html', { data: data }, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.mail = {
                templateId: '',
                leadIds: data.join(',')
            }
            $scope.emails = [];

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.init = function () {
                PN_PAGE.loading.show();
                $restful.get("/emailtemplate").then(function (res) {
                    PN_PAGE.loading.hide();
                    $scope.emails = res.data;
                });
            }

            $scope.submit = function () {
                PN_PAGE.loading.show();
                PN_PAGE.btnLoading.show();
                $restful.post("/campain/sendmail", $scope.mail).then(function (res) {
                    PN_PAGE.loading.hide();
                    swal('', 'Đã gửi!', 'success');
                    $scope.hide();
                });
            };
        }], function (res) {
        });
    },

    $scope.deleteList = function () {
        swal({
            title: "Xóa lead!",
            text: "Bạn chắc muốn xóa " + $scope.action.items.length + " lead",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "\u0110\u1ed3ng \u00fd",
            cancelButtonText: "Kh\u00f4ng x\u00f3a",
            closeOnConfirm: true
        }, function (value) {
            if (value == true) {
                PN_PAGE.loading.show();
                var data = {
                    ids: $scope.action.items.join(',')
                }
                $restful.delete("/lead", data).then(function (res) {
                    PN_PAGE.loading.hide();
                    getLeads();
                    return;
                });
            }
        });
    }

    function getLeads() {
        $scope.leads = [];
        PN_PAGE.dbLoading.show();
        $restful.get("/lead", $scope.query).then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.totalItem = res.data.total;
            $scope.leads = res.data.data;
            angular.forEach($scope.leads, function (v, i) {
                v.tags = GetTagNames(v.tagId || 0);
                if (v.notes == '') v.notes = null;
            });
            //$scope.action.allowSelect = false;
            $scope.action.items = [];
        });
    }

    function GetTagNames(tagid) {
        if (tagid == 0) return "";
        var tags = [];
        angular.forEach($scope.tagOptions, function (v, i) {
            if ((tagid & v.id) > 0) tags.push(v.name);
        });
        return tags.join(", ")
    }

    $scope.getPages = function () {
        PN_PAGE.dbLoading.show();
        $restful.get('/report/publish-pages').then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.pageOptions = res.data;
            $scope.pageOptions.unshift({ id: null, name:'Tất cả', domain: 'Tất cả' });
            $scope.query.landingpageid = $stateParams.id;
        });
    }

    $scope.getRegions = function () {
        PN_PAGE.dbLoading.show();
        $scope.regions = [];
        $restful.get('/report/lead-region').then(function (res) {
            PN_PAGE.dbLoading.hide();
            angular.forEach(res.data, function (value, key) {
                $scope.regions.push({ i: value.regionName, n: value.regionName })
            });
            $scope.regions.unshift({ i: null, n: 'Tất cả' });
        });
    }

    $scope.getTags = function () {
        $scope.tagOptions = [];
        $restful.get("/leadtag").then(function (result) {
            $scope.tagOptions = result.data;
            if ($scope.tagOptions.length > 0) {
                $scope.tagOptions.unshift({id:null,name:'tất cả'});
            }
        });
    }

    $scope.changeStatus= function(item, status){
        PN_PAGE.loading.show();
        item.status = status;
        $restful.post("/lead", item).then(function (res) {
            PN_PAGE.loading.hide();
            $scope.hide($scope.lead);
        });
    }

    $scope.delete = function (item) {
        swal({
            title: "Xóa lead!",
            text: "Bạn chắc muốn xóa lead này",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "\u0110\u1ed3ng \u00fd",
            cancelButtonText: "Kh\u00f4ng x\u00f3a",
            closeOnConfirm: true
        }, function (value) {
            if (value == true) {
                PN_PAGE.dbLoading.show();
                $restful.delete("/lead", { id: item.id }).then(function (res) {
                    PN_PAGE.dbLoading.hide();
                    PN_PAGE.showMessage("Đã xóa!");
                    getLeads();
                    return;
                });
            }
            });
    }

    $scope.showDetail = function (data) {
        popupService.show('leadDetail.html', {data:data}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.lead = data;
            $scope.moreData = [];
            if (data.jsonData != null && data.jsonData.length > 0) $scope.moreData =  JSON.parse(data.jsonData);
            $scope.statusOptions = lead_status;
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function (res) {
                $mdDialog.hide(res);
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                PN_PAGE.btnLoading.show();
                PN_PAGE.loading.show();
                $restful.post("/lead", $scope.lead).then(function (res) {
                    PN_PAGE.loading.hide();
                    $scope.hide($scope.lead);
                });
            };
        }], function (res) {
            data = res;
        });
    }

    $scope.showHistory = function (data) {
        popupService.show('leadHistory.html', { data: data }, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {

            $scope.data = {
                email: data.email,
                phone: data.phone
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.init = function () {
                PN_PAGE.dbLoading.show();
                $restful.post("/report/lead-history", $scope.data).then(function (res) {
                    $scope.leads = res.data;
                    angular.forEach($scope.leads, function (v, i) {
                        v.tags = GetTagNames(v.tagId || 0);
                        if (v.notes == '') v.notes = null;
                        v.link = v.link.replace('@', '');
                        v.systemNotes = v.link.replace('https://', '').replace('http://', '');
                    });
                    PN_PAGE.dbLoading.hide();
                });
            };
        }], function () {
        });
    }

    $scope.showSendMailTracking = function (id) {
        popupService.show('emailTracking.html', { id: id }, ['$scope', '$restful', '$mdDialog', function ($scope, $restful, $mdDialog) {
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };
            $scope.tracks = [];
            $scope.init = function () {
                PN_PAGE.loading.show();
                $restful.get('/emailtrack/by-lead', { id: id }).then(function (res) {
                    PN_PAGE.loading.hide();
                    $scope.tracks = res.data;
                });
            }
        }], function () {
        });
    }

    $scope.getExportData = function () {
        var arr = [];
        $scope.query.limit = 1000;
        $scope.query.page = 1;
        PN_PAGE.loading.show();
        var deferred = $q.defer();
        $restful.get("/lead", $scope.query).then(function (res) {
            PN_PAGE.loading.hide();
            
            angular.forEach(res.data.data, function (value, key) {
                arr.push({
                    submitDate: value.submitDate,
                    fullName: value.fullName,
                    email: value.email,
                    phone: value.phone,
                    regionName: value.regionName,
                    linkDisplay: value.linkDisplay
                });
            });
            $scope.query.limit = 12;
            deferred.resolve(arr);
        });
        return deferred.promise;
    }

    $scope.leadFilter = {
        filters: [],
        selected: null,
        get: function () {
            PN_PAGE.btnLoading.show();
            $restful.get("/leadfilter").then(function (res) {
                PN_PAGE.btnLoading.hide();
                $scope.leadFilter.filters = res.data;
            });
        },
        choose: function (item) {
            $scope.query = JSON.parse(item.filterJson);
            $scope.condition.changed();
            $scope.leadFilter.selected = item;
            $scope.isDirty = false;
            $scope.tagFilter.selected = null;
        },
        save: function () {
            var data = $scope.query;
            if (canMakeFilter() == false) {
                PN_PAGE.showMessage("Chọn ít nhất 1 điều kiện tìm kiếm!", "warning");
                return;
            }
            $scope.leadFilter.selected.filterJson = JSON.stringify(data);
            PN_PAGE.loading.show();
            PN_PAGE.btnLoading.show();
            $restful.post("/leadfilter", $scope.leadFilter.selected).then(function (res) {
                PN_PAGE.loading.hide();
                PN_PAGE.showMessage("Đã cập nhật!");
                $scope.isDirty = false;
            });
        },
        showAdd: function () {
            var data = $scope.query;
            if (canMakeFilter() == false) {
                PN_PAGE.showMessage("Chọn ít nhất 1 điều kiện tìm kiếm!", "warning");
                return;
            }
            popupService.show('addName.html', { data: data }, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
                $scope.title = 'Tạo danh sách theo điều kiện tìm kiếm';
                $scope.label = 'Tên danh sách';
                $scope.name = '';
                $scope.leadFilter = {
                    name: '',
                    filterJson: JSON.stringify(data)
                }

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.hide = function (res) {
                    $mdDialog.hide(res);
                };

                $scope.submit = function () {
                    if ($scope.myForm.$valid == false) return;
                    $scope.leadFilter.name = $scope.name;
                    PN_PAGE.loading.show();
                    PN_PAGE.btnLoading.show();
                    $restful.post("/leadfilter", $scope.leadFilter).then(function (res) {
                        PN_PAGE.loading.hide();
                        $scope.hide(res.data);
                    });
                };
            }], function (res) {
                $scope.leadFilter.filters.push(res);
                $scope.leadFilter.selected = res;
                $scope.isDirty = false;
            });
        },
        delete: function (id,idx) {
            swal({
                title: "Xóa nhóm!",
                text: "Bạn chắc muốn xóa danh sách này?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "\u0110\u1ed3ng \u00fd",
                cancelButtonText: "Kh\u00f4ng x\u00f3a",
                closeOnConfirm: true
            }, function (value) {
                if (value == true) {
                    PN_PAGE.loading.show();
                    $restful.delete("/leadfilter", { id: id }).then(function (res) {
                        PN_PAGE.loading.hide();
                        $scope.leadFilter.filters.splice(idx, 1);
                        if ($scope.leadFilter.selected.id == id) $scope.leadFilter.selected = null;
                        return;
                    });
                }
            });
        }
    }

    function canMakeFilter() {
        var data = $scope.query;
        if (data.landingpageid == null && data.status == null && data.contact == null && data.ismobile == null && data.region == null && data.keyword == '') {
            return false;
        }
        return true;
    }

    $scope.showAddTag = function () {
        var leadIds = $scope.action.items;
        popupService.show('leadAddTag.html', {
            leadIds: leadIds
        }, ['$scope', '$restful', '$mdDialog', 'popupService', 'leadIds', function ($scope, $state, $mdDialog, popupService, leadIds) {

            $scope.leadTag = {
                tag: {
                    id:null,
                    name:''
                },
                leadIds: leadIds
            };
            $scope.newTag = {
                id: null,
                name: ''
            }

            $scope.cancel = function () {
                $mdDialog.hide();
            };
            $scope.hide = function (res) {
                $mdDialog.hide(res);
            };
            $scope.init = function () {
                $restful.get("/leadtag").then(function (result) {
                    $scope.tags = result.data;
                });
            }
            $scope.createTag = function () {
                $scope.leadTag.tag = $scope.newTag;
                $scope.submit();
            };

            $scope.submit = function () {
                PN_PAGE.loading.show();
                $restful.post("/leadtag", $scope.leadTag).then(function (result) {
                    PN_PAGE.loading.hide();
                    $scope.hide(result.data);
                    PN_PAGE.showMessage("Đã gắn nhãn!")
                });
            };
            }], function (res) {
                $scope.getTags();
        });
    }

    $scope.showRemoveTag = function () {
        var leadIds = $scope.action.items;
        popupService.show('leadRemoveTag.html', {
            leadIds: leadIds
        }, ['$scope', '$restful', '$mdDialog', 'popupService', 'leadIds', function ($scope, $state, $mdDialog, popupService, leadIds) {

            $scope.leadTag = {
                tag: {
                    id: null,
                    name: ''
                },
                leadIds: leadIds,
                isDelete: false
            };

            $scope.cancel = function () {
                $mdDialog.hide();
            };
            $scope.hide = function (res) {
                $mdDialog.hide(res);
            };
            $scope.init = function () {
                $restful.get("/leadtag").then(function (result) {
                    $scope.tags = result.data;
                });
            }

            $scope.submit = function () {
                PN_PAGE.loading.show();
                $restful.put("/leadtag", $scope.leadTag).then(function (result) {
                    PN_PAGE.loading.hide();
                    $scope.hide(result.data);
                    PN_PAGE.showMessage("Đã gỡ nhãn!")
                });
            };
        }], function (res) {
            $scope.getTags();
        });
    };

    $scope.tagFilter = {
        selected: null,
        choose: function (item) {
            $scope.query.tagid = item.id;
            $scope.condition.changed();
            $scope.tagFilter.selected = item;
            $scope.leadFilter.selected = null;
        },
        delete: function (id, idx) {
            swal({
                title: "Xóa nhãn!",
                text: "Xóa nhãn đồng thời gỡ nhãn này của lead?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "\u0110\u1ed3ng \u00fd",
                cancelButtonText: "Kh\u00f4ng x\u00f3a",
                closeOnConfirm: true
            }, function (value) {
                if (value == true) {
                    PN_PAGE.loading.show();
                    $restful.delete("/leadtag", { id: id }).then(function (res) {
                        PN_PAGE.loading.hide();
                        $scope.tagOptions.splice(idx, 1);
                        if ($scope.tagFilter.selected.id == id) $scope.tagFilter.selected = null;
                        return;
                    });
                }
            });
        }
    }
}]);