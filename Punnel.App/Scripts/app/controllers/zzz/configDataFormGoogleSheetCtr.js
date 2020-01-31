angular.module("punnelApp").controller("configDataFormGoogleSheetCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", "$restful", function ($rootScope, $state, $scope, $translate, $stateParams, $timeout, $restful) {
    $scope.idTMP = "";
    $scope.listConfig = [];
    $scope.configSelect = [];
    $scope.listSheet = [];
    $scope.stateSheet = "";
    $scope.sheetSelect = [];
    //$rootScope.$watch(function () {
    //    if (void 0 != selectedItem && selectedItem.length > 0 && $scope.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id") && ($scope.idTMP = selectedItem.attr("id"), "contact_form" == selectedItem.attr("pn-type"))) {
    //        var indexLookupKey = PN_PAGE.getIndexElement(selectedItem.attr("id"));
    //        $scope.configSelect = apiElement[indexLookupKey].configSelectGoogleSheet;
    //        $scope.sheetSelect = apiElement[indexLookupKey].configSelectSheet;
    //        $scope.loadListConfig();
    //    }
    //});
    $scope.loadListConfig = function () {
        
        $restful.post("/Config/FindFormConfigByType", {
            type: 9
        }, function (err, res) {
            if (!err) {
                if (res && 200 == res.code) {
                    $scope.listConfig = res.data;
                    if ($scope.configSelect && $scope.configSelect.length > 0) {
                        $scope.configSelect = $.grep($scope.listConfig, function (a) {
                            return a.id == $scope.configSelect.id;
                        });
                    } else {
                        $scope.configSelect = res.data[0];
                    }
                    if (res.data.length > 0) {
                        $scope.stateSheet = "email";
                    } else {
                        $scope.stateSheet = "";
                    }
                } else {
                    PN_PAGE.messageLadi(res.messager);
                }
            }
        });
    };
    $scope.getAuthGoogleSheet = function () {
        PN_PAGE.setCookie("googleSheetIdUser", PN_PAGE.account.id, 60);
        localStorage.setItem("googleSheetIdUser", PN_PAGE.account.id);
        $restful.get("/Auth/UrlGoogleSheets", {}, function (err, res) {
            if (err) {
                PN_PAGE.messageLadi("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
            } else {
                if (res && 200 == res.code) {
                    var d = screen.width / 2 - 200;
                    var y = screen.height / 2 - 275;
                    var rejectingServer = window.open(res.data, "myWindow", "width=400, height=550, left=" + d + ", top=" + y);
                    var chat_retry = setInterval(function () {
                        if (localStorage.getItem("googleSheetConfigSelect") && localStorage.getItem("googleSheetConfigSelect").length > 0) {
                            $scope.stateSheet = "emailSheet";
                            if ("complete" == localStorage.getItem("googleSheetConfigSelect")) {
                                rejectingServer.close();
                                clearInterval(chat_retry);
                                localStorage.removeItem("googleSheetConfigSelect");
                                PN_PAGE.deleteCookie("googleSheetIdUser");
                                localStorage.removeItem("googleSheetIdUser");
                                $scope.loadListConfig();
                            } else {
                                $scope.configSelect = localStorage.getItem("googleSheetConfigSelect");
                                rejectingServer.close();
                                clearInterval(chat_retry);
                                localStorage.removeItem("googleSheetConfigSelect");
                                PN_PAGE.deleteCookie("googleSheetIdUser");
                                localStorage.removeItem("googleSheetIdUser");
                                $scope.loadListConfig();
                            }
                        }
                    }, 1e3);
                } else {
                    if (res) {
                        PN_PAGE.messageLadi(res.messager);
                    } else {
                        PN_PAGE.messageLadi("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                }
            }
        });
    };
    $scope.loadAllSheet = function () {
        $restful.post("/Config/LoadGoogleSheets", {
            configid: $scope.configSelect.id
        }, function (err, res) {
            if (!err) {
                if (res && 200 == res.code) {
                    $scope.listSheet = res.data;
                    if (res.listSheet && res.listSheet.length > 0) {
                        $scope.sheetSelect = $.grep($scope.listSheet, function (a) {
                            return a.id == $scope.sheetSelect.id;
                        });
                    } else {
                        $scope.sheetSelect = res.data[0];
                    }
                    console.log("all sheet: ", res.data);
                } else {
                    PN_PAGE.messageLadi(res.messager);
                }
            }
        });
    };
    $scope.setSheetSelect = function (a) {
        $scope.sheetSelect = a;
    };
    $scope.nameSheet = "";
    $scope.createSheet = function () {
        if ($scope.nameSheet && $scope.nameSheet.length > 0) {
            $("#configFormGoogleSheet button").attr("disabled", "true");
            $restful.post("/Config/CreateGoogleSheets", {
                configID: $scope.configSelect.id,
                name: $scope.nameSheet
            }, function (err, res) {
                $("#configFormGoogleSheet button").removeAttr("disabled");
                if (err) {
                    PN_PAGE.messageLadi(err);
                } else {
                    if (res && 200 == res.code) {
                        $scope.sheetSelect = res.data;
                        $scope.listSheet.push(res.data);
                    } else {
                        PN_PAGE.messageLadi(res.messager);
                    }
                }
            });
        } else {
            PN_PAGE.messageLadi("Vui l\u00f2ng nh\u1eadp t\u00ean sheet");
        }
    };
    $scope.backSelectEmailGoogleSheet = function () {
        $scope.stateSheet = "email";
    };
    $scope.selectConfig = function (idx) {
        $scope.configSelect = $scope.listConfig[idx];
        $scope.stateSheet = "sheet";
        $scope.loadAllSheet();
    };
    $scope.applyDone = function () {
        if ($scope.sheetSelect.id && $scope.sheetSelect.id.length > 0) {
            var values = {
                Type: 9,
                FormConfigID: $scope.configSelect.id,
                SheetID: $scope.sheetSelect.id,
                SheetName: $scope.sheetSelect.name
            };
            if (!$rootScope.configFormServe) {
                $rootScope.configFormServe = [];
            }
            $rootScope.configFormServe.push(values);
            $("#configFormGoogleSheet").modal("hide");
            $("#saveDataForms").modal("show");
        } else {
            PN_PAGE.messageLadi("Vui l\u00f2ng \u0111i\u1ec1n \u0111\u1ea9y \u0111\u1ee7 d\u1eef li\u1ec7u \u0111\u1ec3 ti\u1ebfp t\u1ee5c");
        }
    };
    $scope.backConfig = function () {
        $("#configFormGoogleSheet").modal("hide");
        $("#saveDataForms").modal("show");
    };
}]);
