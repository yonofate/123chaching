angular.module("punnelApp").controller("dashboardCtr", ["$scope", "$filter", "$restful", "$state", "$auth", "$stateParams", function ($scope, $filter, $restful, $state, $auth, $stateParams) {

    $scope.user_level = $auth.level;
    $scope.showData = true;
    $scope.isExpires = false;

    $scope.initChart = function () {
        if ($auth.isVerifyEmail() == false && $auth.isVerifyMobile() == false) {
            var p = $auth.getProfile();
            if (p.mobile != '' && p.mobile != null) $state.go("auth.complete-verifymobile");
            else $state.go("auth.complete-verifyemail");
        }
        var tid = $stateParams.tid || '';
        if (tid.length > 0) {
            $state.go("preview-template", {
                id: $stateParams.tid,
                type: 'p',
                cf: 'themes'
            });
        } else {
            getSummary();
            $scope.chart.leadChart.Fetch();
            $scope.chart.leadSummaryChart.Fetch();
        }
    }

    function getSummary() {
        PN_PAGE.dbLoading.show();
        $restful.get("/report/summary").then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.summary = res.data;
        });
    }

    $scope.chart = {
        leadChart: {
            Data: [],
            Fetch: function () {
                PN_PAGE.dbLoading.show();
                $restful.get("/report/lead-daily").then(function (res) {
                    PN_PAGE.dbLoading.hide();
                    $scope.chart.leadChart.Init(res.data);
                });
            },
            Options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Lead trong 2 tuần gần đây'
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

                var line = {
                    label: "Lead",
                    fill: 1,
                    lineTension: 0,
                    borderWidth: 2,
                    pointBorderWidth: 0,
                    backgroundColor: "#eaf4ff",
                    borderColor: "#1e88e5",
                    data: []
                }
                var dateRanges = PN_PAGE.getDateRanges(14);

                angular.forEach(dateRanges, function (value, key) {
                    c.labels.push(value);
                    var x = $filter('filter')(objs, function (d) { return d.submitDate == value });
                    if (x.length > 0) {
                        line.data.push(x[0].quantity);
                    } else {
                        line.data.push(0);
                    }
                });

                c.datasets.push(line);
                $scope.chart.leadChart.Data = c;
            }
        },
        leadSummaryChart: {
            Data: [],
            Fetch: function () {
                PN_PAGE.dbLoading.show();
                $restful.get("/report/lead-summary").then(function (res) {
                    PN_PAGE.dbLoading.hide();
                    $scope.chart.leadSummaryChart.Init(res.data);
                });
            },
            Options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Nhóm theo triển vọng'
                },
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    yAxes: [{
                        gridLines: { display: false },
                        display: true
                    }],
                    xAxes: [{
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
                var opts = [{ t: 'New', bg: '#66b3ff', d: [] }, { t: 'Hot', bg: '#ff0000', d: [] }, { t: 'Warm', bg: '#ff944d', d: [] }, { t: 'Cold', bg: '#4ddbff', d: [] }];
                c.datasets.push({
                    label: '',
                    backgroundColor: [],
                    data: [],
                });

                angular.forEach(opts, function (value, key) {
                    c.labels.push(value.t);
                    if (key == 0) c.datasets[0].data.push(objs.new);
                    if (key == 1) c.datasets[0].data.push(objs.hot);
                    if (key == 2) c.datasets[0].data.push(objs.warm);
                    if (key == 3) c.datasets[0].data.push(objs.cold);
                    c.datasets[0].backgroundColor.push(opts[key].bg);
                });

                $scope.chart.leadSummaryChart.Data = c;
            }
        }
    }
}]);
