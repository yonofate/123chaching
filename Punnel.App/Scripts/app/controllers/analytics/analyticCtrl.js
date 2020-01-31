angular.module("punnelApp").controller("analyticCtrl", ["$scope", "$restful", "$filter", "$stateParams", "$state", "$location", function ($scope, $restful, $filter, $stateParams, $state, $location) {
    $scope.query = {
        pageId: $stateParams.id,
        fromDate: new Date(),
        toDate: new Date(),
        isMobile:null
    }
    $scope.wdate = {
        dateRange : { startDate: moment().subtract(6, 'days'), endDate: moment() }
    }
    $scope.maxDate = moment().format("YYYY-MM-DD");
    $scope.options = PN_PAGE.dateRangeOption;

    $scope.$watch("wdate.dateRange", function (newValue, oldValue) {
        $scope.query.fromDate = $scope.wdate.dateRange.startDate;
        $scope.query.toDate = $scope.wdate.dateRange.endDate;
        loadData();
    });

    $scope.initData = function () {
        getPublishPage();
    }

    $scope.pageChanged = function () {
        loadData();
        $stateParams['id'] = $scope.query.pageId;
        $state.params['id'] = $scope.query.pageId;
        $location.search('id', $scope.query.pageId);
    }

    $scope.loadData = function () {
        loadData();
    }

    $scope.setView = function (val) {
        $scope.query.isMobile = val;
        loadData();
    }

    function getPageSummary() {
        PN_PAGE.dbLoading.show();
        $restful.post('/report/page-summary', $scope.query).then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.pageSummary = res.data;
        });  
    }

    function loadData() {
        if ($scope.query.pageId) {
            getPageSummary();
            $scope.chart.dailyChart.Fetch();
            $scope.chart.regionChart.Fetch();
            $scope.chart.trafficChannelChart.Fetch();
            $scope.chart.refererChart.Fetch();
        }
    }

    function getPublishPage() {
        PN_PAGE.dbLoading.show();
        $restful.get('/report/publish-pages').then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.pages = res.data;
            if ($stateParams.id) $scope.query.pageId = $stateParams.id;
            else if (res.data.length > 0) $scope.query.pageId = res.data[0].id;
            loadData();
        });
    }


    $scope.chart = {
        dailyChart: {
            Data: [],
            Fetch: function () {
                PN_PAGE.dbLoading.show();
                $restful.post("/report/page-daily", $scope.query).then(function (res) {
                    PN_PAGE.dbLoading.hide();
                    $scope.chart.dailyChart.Init(res.data);
                });
            },
            Options: {
                legend: {
                    display: true
                },
                title: {
                    display: false,
                    text: 'Thống kê theo ngày'
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

                var line_view = {
                    label: "Lượt xem",
                    fill: false,
                    lineTension: 0,
                    borderWidth: 2,
                    pointBorderWidth: 0,
                    backgroundColor: color_common[6],
                    borderColor: color_common[6],
                    data: []
                }

                var line_user = {
                    label: "Người xem",
                    fill: false,
                    lineTension: 0,
                    borderWidth: 2,
                    pointBorderWidth: 0,
                    backgroundColor: color_common[2],
                    borderColor: color_common[2],
                    data: []
                }

                var line_lead = {
                    label: "Đăng kí",
                    fill: 1,
                    lineTension: 0,
                    borderWidth: 2,
                    pointBorderWidth: 0,
                    backgroundColor: "#eaf4ff",
                    borderColor: color_common[0],
                    data: []
                }
                var dateRanges = PN_PAGE.getDateRanges1($scope.query.fromDate.toDate(), $scope.query.toDate.toDate());
                var kc = 1;
                var l = false;
                if (dateRanges.length >= 20) {
                    kc = Math.floor(dateRanges.length / 10);
                    l = (kc * 7 === dateRanges.length);
                }
                var u = 0;
                angular.forEach(dateRanges, function (value, key) {
                    if (key == u * kc) {
                        c.labels.push(value);
                        u = u + 1;
                    
                    var x = $filter('filter')(objs, function (d) { return d.actionDate == value });
                    if (x.length > 0) {
                        line_view.data.push(x[0].viewCount);
                        line_user.data.push(x[0].userCount);
                        line_lead.data.push(x[0].leadCount);
                    } else {
                        line_view.data.push(0);
                        line_user.data.push(0);
                        line_lead.data.push(0);
                        }
                    }
                    else if (u>1 && key == dateRanges.length-1) {
                        c.labels.push(value);
                        var x = $filter('filter')(objs, function (d) { return d.actionDate == value });
                        if (x.length > 0) {
                            line_view.data.push(x[0].viewCount);
                            line_user.data.push(x[0].userCount);
                            line_lead.data.push(x[0].leadCount);
                        } else {
                            line_view.data.push(0);
                            line_user.data.push(0);
                            line_lead.data.push(0);
                        }
                    }
                });

                c.datasets.push(line_view);
                c.datasets.push(line_user);
                c.datasets.push(line_lead);
                $scope.chart.dailyChart.Data = c;
            }
        },
        regionChart: {
            Data: [],
            Fetch: function () {
                PN_PAGE.dbLoading.show();
                $restful.post("/report/page-region", $scope.query).then(function (res) {
                    PN_PAGE.dbLoading.hide();
                    $scope.chart.regionChart.Init(res.data);
                });
            },
            Options: {
                legend: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Khu vực'
                },
                responsive: true,
                maintainAspectRatio: false,
            },
            Init: function (objs) {
                var c = {
                    labels: [],
                    datasets: []
                }
                c.datasets.push({
                    backgroundColor: [],
                    data: [],
                });
                c.datasets.push({
                    backgroundColor: [],
                    data: [],
                });

                var lists = [];
                var nocity = $filter('filter')(objs, function (d) { return d.title.length == 0 });
                //xử lý 
                if (objs.length > 7 || nocity.length>0) {
                    objs = objs.sort(function (a, b) { return b.totalView - a.totalView });
                    var tv = 0, tl = 0;
                    angular.forEach(objs, function (value, key) {
                        if (key <= 7 && value.title.length>0) lists.push(value);
                        else {
                            tv = tv + value.totalView;
                            tl = tl + value.totalLead;
                        }
                    });
                    lists.push({ title: 'Khác', totalView: tv, totalLead: tl });
                } else lists = objs;

                angular.forEach(lists, function (value, key) {
                    c.labels.push(value.title);
                    c.datasets[0].data.push(value.totalView);
                    c.datasets[0].backgroundColor.push(color_common[key]);

                    c.datasets[1].data.push(value.totalLead);
                    c.datasets[1].backgroundColor.push(color_common[key]);
                });

                $scope.chart.regionChart.Data = c;
            }
        },
        trafficChannelChart: {
            Data: [],
            Fetch: function () {
                PN_PAGE.dbLoading.show();
                $restful.post("/report/page-traffic-channel", $scope.query).then(function (res) {
                    PN_PAGE.dbLoading.hide();
                    $scope.chart.trafficChannelChart.Init(res.data);
                });
            },
            Options: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'Kênh lưu lượng'
                },
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
                },
                responsive: true,
                maintainAspectRatio: false,
            },
            Init: function (objs) {
                var c = {
                    labels: [],
                    datasets: []
                }
                //var channels = [{ i: 0, n: 'Direct' }, { i: 1, n: 'Organic Search' }, { i: 4, n: 'Paid Search' }, { i: 2, n: 'Organic Social' }, { i: 5, n: 'Paid Social' }, { i: 3, n: 'Other' }];
                var channels = [{ i: 0, n: 'Direct' }, { i: 1, n: 'Search' }, { i: 2, n: 'Social' }, { i: 3, n: 'Other' }];
                c.datasets.push({
                    backgroundColor: [],
                    data: []
                });

                angular.forEach(channels, function (value, key) {
                    c.labels.push(value.n);
                    c.datasets[0].backgroundColor.push(color_common[key]);
                    var x = $filter('filter')(objs, function (d) { return d.title == value.n });
                    if (x.length > 0) {
                        c.datasets[0].data.push(x[0].totalView);                        
                    } else {
                        c.datasets[0].data.push(0);   
                    }               
                });
                $scope.chart.trafficChannelChart.Data = c;
            }
        },
        refererChart: {
            Data: [],
            Fetch: function () {
                PN_PAGE.dbLoading.show();
                $restful.post("/report/page-referer", $scope.query).then(function (res) {
                    PN_PAGE.dbLoading.hide();
                    var data = res.data.sort(function (a, b) { return b.totalView - a.totalView });

                    var lists = [];

                    //xử lý 
                    if (data.length >=8) {
                        var tv = 0, tl = 0;
                        angular.forEach(data, function (value, key) {
                            if (key < 9 || lists.length<9) {
                                if (value.title.startsWith('http')) {
                                    var l = document.createElement("a");
                                    l.href = value.title;
                                    value.title = l.origin + (l.pathname.length > 1 ? l.pathname:'');
                                }
                                var x = $filter('filter')(lists, function (d) { return d.title == value.title })
                                if (x.length == 0) lists.push(value);
                                else {
                                    x[0].totalView += value.totalView;
                                    x[0].totalLead += value.totalLead;
                                    //lists.push(value);
                                }
                            }
                            else {
                                tv = tv + value.totalView;
                                tl = tl + value.totalLead;
                            }
                        });
                        lists.push({ title: 'khác', totalView: tv, totalLead: tl });
                    } else lists = data;

                    $scope.chart.refererChart.Data = lists;
                });
            },
            Options: {
                legend: {
                    display: true
                },
                title: {
                    display: true,
                    text: 'Khu vực'
                },
                responsive: true,
                maintainAspectRatio: false,
            },
            Init: function (objs) {
                var c = {
                    labels: [],
                    datasets: []
                }
                c.datasets.push({
                    backgroundColor: [],
                    data: []
                });

                angular.forEach(objs, function (value, key) {
                    if (value.n.startWith('http')) {
                        var l = document.createElement("a");
                        l.href = value.n;
                        c.labels.push(l.hostName);
                    } else c.labels.push(value.n);
                    
                    c.datasets[0].backgroundColor.push(color_common[key]);
                    c.datasets[0].data.push(value.totalView);
                });
                $scope.chart.refererChart.Data = c;
            }
        }
    }
}]);