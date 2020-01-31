angular.module("punnelApp").controller("managerUserByPartnerCtr", ["$scope", "$timeout", "APP_CONFIG", "$localStorage", "$restful", function ($scope, $timeout, APP_CONFIG, $localStorage, $restful) {
    var cr_date = new Date;
    $scope.searchFrom = new Date;
    $scope.searchTo = new Date;
    $scope.packge = "0";
    $scope.searchFrom.setDate(1);
    $scope.searchEmail = "";
    $scope.exl = 0;
    $scope.showExl = "";
    $scope.money = 0;
    $scope.affCode = "";
    var g = 0;
    var timeout_int = setInterval(function () {
        if (g >= 20) {
            clearInterval(timeout_int);
        }
        $scope.affCode = PN_PAGE.account.affCode;
        if ($scope.affCode) {
            $(".aff-code-text a").text("http://punnel.com/?ref=" + $scope.affCode);
        }
        g++;
    }, 200);
    $restful.get("/statistical/FindManyAff", {}, function (err, result) {
        if (result && 200 == result.code) {
            $scope.money = result.data;
            $scope.affCode = PN_PAGE.account.affCode;
        }
    });
    $scope.getData = function () {
        $(".parLoading").show();
        var data = {};
        data = $scope.searchEmail && $scope.searchEmail.length > 0 ? {
            email: $scope.searchEmail,
            exl: $scope.exl
        } : {
            form: $scope.searchFrom,
            to: $scope.searchTo,
            exl: $scope.exl
        };
        $restful.get("/Statistical/StatisticalAffMember", data, function (err, result) {
            if (result && 200 == result.code) {
                if (1 == $scope.exl) {
                    $scope.showExl = result.data;
                } else {
                    $scope.dataUser = result.data.data;
                }
            } else {
                PN_PAGE.messageLadi(result.messager);
            }
            $(".parLoading").hide();
        });
    };
    $scope.changePackge = function (a) {
    };
    $scope.search = function () {
        $scope.showExl = "";
        $scope.exl = 0;
        $scope.getData();
    };
    $scope.searchExcel = function () {
        $scope.exl = 1;
        $scope.getData();
    };
    $scope.changeDateFrom = function () {
        $scope.searchEmail = "";
    };
    $scope.changeDateTo = function () {
        $scope.searchEmail = "";
    };
    $scope.dateToDT = new Date;
    cr_date = new Date;
    cr_date.setDate(1);
    $scope.dateFromDT = cr_date;
    $scope.commissionDT = 0;
    $scope.dataReporDT = [];
    $scope.showComDT = "0";
    $scope.invoiSearchDT = "";
    $scope.exelDT = 0;
    $scope.linkExelDT = "";
    $scope.getDataDT = function () {
        $(".parLoading").show();
        var data = {};
        data = $scope.invoiSearchDT && $scope.invoiSearchDT.length > 0 ? {
            invoiceid: $scope.invoiSearchDT,
            exl: $scope.exelDT
        } : {
            form: $scope.dateFromDT,
            to: $scope.dateToDT,
            exl: $scope.exelDT
        };
        $restful.post("/Statistical/StaticcalAffCommi", data, function (err, result) {
            if (err) {
                PN_PAGE.messageLadi("\u0110\u00e3 x\u1ea3y ra l\u1ed7i. Vui l\u00f2ng th\u1eed l\u1ea1i");
            } else {
                if (result && 200 == result.code) {
                    if (0 == $scope.exelDT) {
                        $scope.dataReporDT = result.data.data;
                        $scope.commissionDT = result.data.commission;
                        $scope.showComDT = "1";
                    } else {
                        $scope.linkExelDT = result.data;
                    }
                } else {
                    PN_PAGE.messageLadi(result.messager);
                }
            }
            $(".parLoading").hide();
        });
        setTimeout(function () {
            $(".parLoading").hide();
        }, 3e4);
    };
    $scope.searchDT = function () {
        $scope.exelDT = 0;
        $scope.getDataDT();
    };
    $scope.changeDateDT = function () {
        $scope.invoiSearchDT = "";
    };
    $scope.searchExlDT = function () {
        $scope.exelDT = 1;
        $scope.getDataDT();
    };
}]);
