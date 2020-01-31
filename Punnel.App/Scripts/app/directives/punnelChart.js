punnelApp.directive('selectOnClick', ['$window', function ($window) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                if (!$window.getSelection().toString()) {
                    // Required for mobile Safari
                    this.setSelectionRange(0, this.value.length)
                }
            });
        }
    };
}]);

punnelApp.directive('ngclipboard', function () {
    return {
        restrict: 'A',
        scope: {
            ngclipboardSuccess: '&',
            ngclipboardError: '&'
        },
        link: function (scope, element) {
            //constructor for clipboardjs changed to ClipboardJS
            var clipboard = new ClipboardJS(element[0]);
            clipboard.on('success', function (e) {
                scope.$apply(function () {
                    scope.ngclipboardSuccess({
                        e: e
                    });
                });
            });

            clipboard.on('error', function (e) {
                scope.$apply(function () {
                    scope.ngclipboardError({
                        e: e
                    });
                });
            });

            element.on('$destroy', function () {
                clipboard.destroy();
            });
        }
    };
});

punnelApp.directive('pnSocialShare', function () {
    return {
        controller: ['$scope', '$mdToast', function ($scope, $mdToast) {
            var protocal = 'http://';
            if ($scope.data.domain.indexOf('.punnel.com') > 0) protocal = 'https://';
            $scope.Url = protocal + $scope.data.domain;
            $scope.facebook_id = FB_APP_ID;
            $scope.zalo_id = ZALO_ME_ID;

            function zalo() {
                var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
                po.src = 'https://sp.zalo.me/plugins/sdk.js';
                var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
            };

            $scope.copied = function (e) {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Đã copy link')
                        .position('top right')
                        .hideDelay(3000)
                );
            };

            (function activate() {
                zalo();
            })();
        }],
        replace: true,
        restrict: 'A',
        scope: {
            data: '=data'
        },
        templateUrl: '/scripts/app/views/common/social_share.html'
    }
});

punnelApp.directive('tcChartjs', function () {
    return {
        restrict: 'A',
        scope: {
            data: '=chartData',
            options: '=chartOptions',
            plugins: '=chartPlugins',
            type: '@chartType',
            legend: '=?chartLegend',
            chart: '=?chart',
            click: '&chartClick'
        },
        link: function ($scope, $elem, $attrs) {
            var chartType = null;
            var ctx = $elem[0].getContext('2d');
            var chartObj;
            var showLegend = false;
            var autoLegend = false;
            var exposeChart = false;
            var legendElem = null;

            for (var attr in $attrs) {
                if (attr === 'chartLegend') {
                    showLegend = true;
                } else if (attr === 'chart') {
                    exposeChart = true;
                } else if (attr === 'autoLegend') {
                    autoLegend = true;
                }
            }

            $scope.$on('$destroy', function () {
                if (chartObj && typeof chartObj.destroy === 'function') {
                    chartObj.destroy();
                }
            });

            if ($scope.click) {
                $elem[0].onclick = function (evt) {
                    var out = {
                        chartEvent: evt,
                        element: chartObj.getElementAtEvent(evt),
                        elements: chartObj.getElementsAtEvent(evt),
                        dataset: chartObj.getDatasetAtEvent(evt)
                    };

                    $scope.click({ event: out });
                };
            }

            $scope.$watch('[data, options, plugins]', function (value) {
                if (value && $scope.data) {
                    if (chartObj && typeof chartObj.destroy === 'function') {
                        chartObj.destroy();
                    }

                    var type = chartType || $scope.type;
                    if (!type) {
                        throw 'Error creating chart: Chart type required.';
                    }
                    type = cleanChartName(type);

                    chartObj = new Chart(ctx, {
                        type: type,
                        data: angular.copy($scope.data),
                        options: $scope.options,
                        plugins: $scope.plugins
                    });

                    if (showLegend) {
                        $scope.legend = chartObj.generateLegend();
                    }

                    if (autoLegend) {
                        if (legendElem) {
                            legendElem.remove();
                        }
                        angular.element($elem[0]).after(chartObj.generateLegend());
                        legendElem = angular.element($elem[0]).next();
                    }

                    if (exposeChart) {
                        $scope.chart = chartObj;
                    }
                    chartObj.resize();
                }
            }, true);
        }
    };
});

function cleanChartName(type) {
    var typeLowerCase = type.toLowerCase();
    switch (typeLowerCase) {
        case 'polararea':
            return 'polarArea';
        case 'horizontalbar':
            return 'horizontalBar';
        default:
            return type;
    }
}


punnelApp.directive('updateTitle', ['$rootScope', '$timeout',
    function ($rootScope, $timeout) {
        return {
            link: function (scope, element) {
                var listener = function (event, toState) {

                    var title = 'Punnel - Powerful Page Funnel';
                    if (toState.data && toState.data.pageTitle) title = toState.data.pageTitle + " - Punnel";

                    $timeout(function () {
                        element.text(title);
                    }, 0, false);
                };

                $rootScope.$on('$stateChangeSuccess', listener);
            }
        };
    }
])