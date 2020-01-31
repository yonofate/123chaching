angular.module("punnelApp").controller("affilateCtr", ["$scope", "$restful", "$filter", "$auth", "APP_CONFIG", "popupService", function ($scope, $restful, $filter, $auth, APP_CONFIG, popupService) {

    $scope.isAgent = $auth.isAffilateAgent();
    $scope.user = {
        referralLink: APP_CONFIG.URL_REFERRAL + ($auth.getProfile().referralCode || '')
    }

    $scope.showRules = function () {
        popupService.show('affiliateRules.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };
        }], function (res) {
        });
    }

    $scope.getSummary = function () {
        if ($scope.isAgent == false) return;
        PN_PAGE.dbLoading.show();
        $restful.get("/affilate").then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.monthlyIncome = res.data.monthlyIncome;
            $scope.members = res.data.members;
            $scope.summary = res.data.summary;
        });
        $scope.initChart();
    }

    $scope.loadProfile = function () {
        $restful.get("/user", {}).then(function (result) {
            $auth.setProfile(result.data);
            $scope.isAgent = $auth.isAffilateAgent();
            $scope.user = {
                referralLink: APP_CONFIG.URL_REFERRAL + result.data.referralCode
            }
        });
    };

    $scope.showSubcrible = function () {
        popupService.show('affilateForm.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.data = {
                bankCode: '',
                bankAccount: '',
                referralCode:''
            }
            $scope.agree = false;

            $scope.bankOption = bank_list;

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function (res) {
                $mdDialog.hide(res);
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid == false) return;
                if ($scope.agree == false) {
                    swal({
                        title: "Thông báo",
                        text: "Để đăng kí bạn phải đồng ý với các Quy định về quyền lợi của đại lý",
                        showCancelButton: false,
                        closeOnConfirm: true
                    });
                    return;
                }
                PN_PAGE.loading.show();
                PN_PAGE.btnLoading.show();
                $restful.post("/affilate", $scope.data).then(function (res) {
                    PN_PAGE.loading.hide();
                    swal({
                        title: "Thông báo",
                        text: "Đăng kí đại lý liên kết thành công!",
                        showCancelButton: false,
                        closeOnConfirm: true
                    });
                    $scope.hide(res.data);
                });
            };
        }], function (res) {
            if (res == true) {
                $scope.loadProfile();
                $scope.getSummary();
            }
        });
    }

    $scope.initChart = function () {
        $scope.chart.affilateActionChart.Fetch();
    }

    $scope.chart = {
        affilateActionChart: {
            Data: [],
            Fetch: function () {
                PN_PAGE.dbLoading.show();
                $restful.get("/report/affilate-action").then(function (res) {
                    PN_PAGE.dbLoading.hide();
                    $scope.chart.affilateActionChart.Init(res.data);
                });
            },
            Options: {
                title: {
                    display: true,
                    text: 'Biến động thành viên trong tuần'
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        display: true,
                        scaleLabel: {
                            display: false
                        },
                        gridLines: { display: false }
                    }],
                    yAxes: [{
                        display: true,
                        ticks: {
                            min: 0, // it is for ignoring negative step.
                            beginAtZero: true,
                            callback: function (value, index, values) {
                                if (Math.floor(value) === value) {
                                    return value;
                                }
                            }
                        }
                    }]
                }
            },
            Init: function (objs) {
                var c = {
                    labels: [],
                    datasets: []
                }

                var subcrible = {
                    label: "Đăng kí mới",
                    fill: false,
                    lineTension: 0,
                    borderWidth: 2,
                    pointBorderWidth: 0,
                    backgroundColor: "#1e88e5",
                    borderColor: "#1e88e5",
                    data: []
                }
                var paid = {
                    label: "Trả phí",
                    fill: false,
                    lineTension: 0,
                    borderWidth: 2,
                    pointBorderWidth: 0,
                    backgroundColor: "#28d178",
                    borderColor: "#28d178",
                    data: []
                }
                var dateRanges = PN_PAGE.getDateRanges(7);

                angular.forEach(dateRanges, function (value, key) {
                    c.labels.push(value);

                    var x = $filter('filter')(objs, function (d) { return d.actionDate == value });
                    if (x.length > 0) {
                        subcrible.data.push(x[0].new);
                        paid.data.push(x[0].paid);
                    } else {
                        subcrible.data.push(0);
                        paid.data.push(0);
                    }                    
                });

                c.datasets.push(subcrible);
                c.datasets.push(paid);

                $scope.chart.affilateActionChart.Data = c;
            }
        },
        getDateRanges: function (range) {
            var d = new Date();
            var r = [];
            for (var i = 1; i <= range; i++) {
                var f = new Date(d.getFullYear(), d.getMonth(), d.getDate() - i);
                var n = f.getDate() + '/' + ((f.getMonth() + 1) < 10 ? '0' : '') + (f.getMonth() + 1);
                r.push(n);
            }
            return r.sort();
        }
    }

}]);