angular.module("punnelApp").controller("userManagerCtrl", ["$scope", "$restful", "$auth", "$state", "$stateParams", "$location", "$filter", "popupService", "authService", "notificationSvc", "notifyUserService", function ($scope, $restful, $auth, $state, $stateParams, $location, $filter, popupService, authService, notificationSvc, notifyUserService) {

    $scope.query = {
        limit: 20,
        page:1,
        keyword: getKeyword(),
        fromdate: null,
        todate: null,
        datetype: 1,
        role: null,
        level: null,
        userStatus: null,
        systemStatus:null,
        staffId: null
    }

    $scope.btnFilters = [
        {
            i:1,
            n: 'Ưu tiên 1 (Hot sắp hết hạn)',
            f: {
                limit: 20,
                page: 1,
                systemStatus: 1,
                level: 0,
                role: 'member',
                datetype: 2,
                fromdate: moment(),
                todate: moment().add(7, 'day')
            }
        },
        {
            i: 2,
            n: 'Ưu tiên 2 (Warm sắp hết hạn)',
            f: {
                limit: 20,
                page: 1,
                systemStatus: 2,
                level: 0,
                role: 'member',
                datetype: 2,
                fromdate: moment(),
                todate: moment().add(7, 'day')
            }
        },
        {
            i: 3,
            n: 'Ưu tiên 3 (Hot đã hết hạn)',
            f: {
                limit: 20,
                page: 1,
                systemStatus: 1,
                level: 0,
                role: 'member',
                datetype: 2,
                fromdate: moment().subtract(30, 'day'),
                todate: moment()
            }
        },
        {
            i: 4,
            n: 'Ưu tiên 4 (Warm đã hết hạn)',
            f: {
                limit: 20,
                page: 1,
                systemStatus: 2,
                level: 0,
                role: 'member',
                datetype: 2,
                fromdate: moment().subtract(30, 'day'),
                todate: moment()
            }
        }
    ];

    $scope.filter = function (i) {
        var u = $filter('filter')($scope.btnFilters, function (d) { return d.i == i })[0];
        $scope.query = u.f;
        $scope.wdate.dateRange.startDate = u.f.fromdate;
        $scope.wdate.dateRange.endDate = u.f.todate;
        $scope.search();
    }

    function getKeyword() {
        return $stateParams.w || '';
    }

    $scope.isAdmin = $auth.isAdmin();
    $scope.isEditor = $auth.isEditor();

    $scope.levelOptions = profile_level_filter;
    $scope.roleOptions = [{ i: null, n: 'Tất cả' }, { i: 'member', n: 'member' }, { i: 'editor', n: 'editor' }, { i: 'agent', n: 'agent' }, { i: 'admin', n: 'admin' }];
    $scope.dateTypeOptions = [{ i: 1, n: 'Ngày đăng kí' }, { i: 2, n: 'Ngày hết hạn' }];
    $scope.statusOptions = lead_status_filter;

    $scope.wdate = {
        dateRange: { startDate: moment().subtract(90, 'days'), endDate: moment() }
    }
    $scope.maxDate = moment().format("YYYY-MM-DD");
    $scope.options = PN_PAGE.dateRangeFOption;
    $scope.$watch("wdate.dateRange", function (newValue, oldValue) {
        $scope.query.fromdate = $scope.wdate.dateRange.startDate;
        $scope.query.todate = $scope.wdate.dateRange.endDate;
        $scope.search();
    });

    $scope.levelDisplay = function (id) {
        if (id <0 || id>3) return '---';
        return profile_level[id].n;
    }

    $scope.statusDisplay = function (id) {
        if (id == 0) return '---';
        return lead_status[id].n;
    }

    $scope.initStaff = function () {
        var data = {
            id: 0
        }
        $restful.get("/member/staff-support", data).then(function (res) {
            PN_PAGE.loading.hide();
            $scope.staffs = res.data;
            $scope.staffs.unshift({ id: 'no', fullName: 'Chưa chăm sóc', email: '', isSupported: false });
            $scope.staffs.unshift({ id: null, fullName: 'Tất cả', email: '', isSupported: false });
        });
    }
    $scope.initStaff();
    $scope.search = function () {
        $stateParams['w'] = $scope.query.keyword;
        $state.params['w'] = $scope.query.keyword;
        $location.search('w', $scope.query.keyword);
        $scope.query.page = 1;
        getListUser();
    };

    $scope.pageChanged = function () {
        getListUser();
    }

    $scope.$watch("wdate.dateRange", function (newValue, oldValue) {
        $scope.query.fromDate = $scope.wdate.dateRange.startDate;
        $scope.query.toDate = $scope.wdate.dateRange.endDate;
    });

    function getListUser() {
        PN_PAGE.dbLoading.show();
        $restful.post("/member/list", $scope.query).then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.members = res.data.data;
            $scope.total = res.data.total;
        });       
    }

    $scope.showDetail = function (data) {
        popupService.show('userProfileDetail.html', { data: data }, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.isAdmin = $auth.isAdmin();
            $scope.isEditor = $auth.isEditor();
            $scope.levelOptions = profile_level;
            $scope.roleOptions = [ { i: 'member', n: 'member' }, { i: 'editor', n: 'editor' }, { i: 'agent', n: 'agent' }, { i: 'admin', n: 'admin' }];
            $scope.data = data;
            $scope.statusOptions = lead_status; 
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function (r) {
                $mdDialog.hide(r);
            };
            $scope.tabIndex = 0;
            $scope.changeTab = function (index) {
                $scope.tabIndex = index;
            }

            $scope.pages = [];
            $scope.totalPages = 0;

            $scope.makeUrl = function (domain) {
                var protocol = "http://";
                if (domain.indexOf('punnel.com') >= 0) protocol = "https://";
                return protocol + domain;
            }

            $scope.initPages = function () {
                if ($scope.pages.length == 0) {
                    PN_PAGE.loading.show();
                    $restful.get("/member/pages", { userid: data.id }).then(function (res) {
                        PN_PAGE.loading.hide();
                        $scope.pages = res.data.list;
                        $scope.totalPages = res.data.total;
                    });
                }
            }

            $scope.submit = function () {
                if ($scope.tabIndex == 2) {
                    $scope.submitNotes();
                    return;
                }
                if ($scope.myForm.$valid == false) return;
                PN_PAGE.btnLoading.show();
                PN_PAGE.loading.show();
                $restful.post("/member/update", $scope.data).then(function (res) {
                    PN_PAGE.loading.hide();
                    PN_PAGE.showMessage("Đã cập nhật");                   
                    $scope.hide(1);
                });
            };
            $scope.submitNotes = function () {
                if ($scope.myForm.$valid == false) return;
                PN_PAGE.btnLoading.show();
                $restful.post("/member/update-status", {
                    id: data.id,
                    systemStatus: data.systemStatus,
                    systemNote: data.systemNote
                }).then(function (result) {
                    PN_PAGE.btnLoading.hide();
                    PN_PAGE.showMessage("Đã cập nhật");     
                });
            };
        }], function (res) {
            if (res == 1) {
                notificationSvc.sendCmd(data.id, 'PROFILE');
                console.log('profile updated!' + data.id);
                getListUser();
            }
        });
    }

    $scope.showStaffSupport = function (data) {
        popupService.show('staffSupport.html', { data: data }, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.customer = data;
            $scope.staff = {
                options: [],
                selecteds:[]
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.init = function () {
                PN_PAGE.loading.show();
                var data = {
                    id: $scope.customer.id
                }
                $restful.get("/member/staff-support", data ).then(function (res) {
                    PN_PAGE.loading.hide();
                    $scope.staff.options = res.data;
                    angular.forEach(res.data, function (i, v) {
                        if (i.isSupported == true) $scope.staff.selecteds.push(i.id);
                    });
                });
            }

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                var data = {
                    customerId: $scope.customer.id,
                    staffIds: $scope.staff.selecteds
                }
                PN_PAGE.btnLoading.show();
                $restful.post("/member/staff-support", data).then(function (res) {
                    PN_PAGE.btnLoading.hide();
                    PN_PAGE.showMessage("Đã cập nhật");
                    $scope.hide();
                });
            };
        }], function (res) {
        });
    }

    $scope.delete = function (item) {
        swal({
            title: "Xóa user " + item.email,
            text: "Bạn chắc chắn xóa tất cả thông tin user này vĩnh viễn?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "\u0110\u1ed3ng \u00fd",
            cancelButtonText: "Kh\u00f4ng x\u00f3a",
            closeOnConfirm: true
        }, function (ok) {
            if (ok==true) {
                PN_PAGE.dbLoading.show();
                $restful.delete("/user", { username: item.email }).then(function (res) {
                    PN_PAGE.dbLoading.hide();
                    PN_PAGE.showMessage("Đã xóa!");
                    getListUser();
                    return;
                });
            }
        });
    }

    $scope.showLoginUser = function (data) {
        popupService.show('loginUser.html', { data: data }, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.account = {
                userName: data,
                password: 'loginasadmin@123',
                grant_type: 'password',
                useRefreshTokens: true
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                PN_PAGE.btnLoading.show();
                PN_PAGE.loading.show();

                authService.login($scope.account).then(function (res) {                   
                    var data = {
                        user_id: res.data.user_id,
                        token: res.data.token_type + ' ' + res.data.access_token,
                        refresh_token: res.data.refresh_token,
                        useRefreshTokens: true
                    }
                    $auth.setUser(data);
                    $restful.get("/user", {}).then(function (result) {
                        if (result.data) {
                            $mdDialog.hide();
                            $auth.setProfile(result.data);
                            window.location = "/";
                        }
                    });
                });
            }

        }], function () {
        });
    }

    $scope.showSendNotifyUser = function (data) {
        popupService.show('notifyUser.html', {data:data}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.data = {
                title: '',
                content: '',
                url: '',
                isBroadCast: false,
                userId: data
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                PN_PAGE.btnLoading.show();
                notifyUserService.sendNotifyToUser(data, $scope.data.title, $scope.data.content, $scope.data.url, function (r) {
                    PN_PAGE.showMessage("Đã gửi");
                    PN_PAGE.btnLoading.hide();
                    $scope.hide();
                });
            }

        }], function () {
        });
    }

    $scope.changeStatus = function (item, status) {
        item.systemStatus = status;
        $restful.post("/member/update-status", item).then(function (res) {});
    }

    $scope.showAddNote = function (data) {
        popupService.show('addNote.html', { data: data }, ['$scope', '$state', '$stateParams', '$mdDialog', function ($scope, $state, $stateParams, $mdDialog) {
            $scope.title = 'Ghi chú'
            $scope.label = 'Nội dung';
            $scope.note = data.systemNote;

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
            $scope.hide = function (res) {
                $mdDialog.hide(res);
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                PN_PAGE.btnLoading.show();
                $restful.post("/member/update-status", {
                    id: data.id,
                    systemStatus: data.systemStatus,
                    systemNote: $scope.note
                }).then(function (result) {
                    PN_PAGE.btnLoading.hide();
                    $scope.hide($scope.note);
                });
            };
        }], function (res) {
            $filter('filter')($scope.members, function (d) { return d.id === data.id; })[0].systemNote = res;
            data.note = res;
        });
    }
}]);