angular.module("punnelApp").controller("integrationDashboardCtr", ["$scope", "$restful", "$auth", "popupService", function ($scope, $restful, $auth, popupService) {
    $scope.integrationSites = {
        accs: [],
        sites:[]
    };

    $scope.newIntegration = {};
    
    $scope.getAll = function () {
        PN_PAGE.dbLoading.show();
        $restful.get("/integration/all", {}).then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.integrationSites = res.data;
        });
    };

    $scope.authCompletedGmail = function (fragment) {
        $scope.$apply(function () {
            if (fragment.email && fragment.email.length > 0) {
                PN_PAGE.dbLoading.show();
                $restful.post("/integration/gmail-auth", {
                    apikey: fragment.email,
                    userName: fragment.uid
            }).then(function (b) {
                PN_PAGE.dbLoading.hide();
                $scope.getAll();
            });
            }
        });
    }

    $scope.authCompletedGsheet = function (fragment) {
        $scope.$apply(function () {
            if (fragment.email && fragment.email.length > 0) {
                PN_PAGE.dbLoading.show();
                $restful.post("/integration/googlesheet-auth", {
                    apikey: fragment.email,
                    userName: fragment.uid
                }).then(function (b) {
                    PN_PAGE.dbLoading.hide();
                    $scope.getAll();
                });
            }
        });
    }

    $scope.authCompletedShopify = function (fragment) {
        $scope.$apply(function () {
            if (fragment.access_token && fragment.access_token.length > 0 && fragment.shop_url && fragment.shop_url.length > 0) {
                PN_PAGE.dbLoading.show();
                $restful.post("/integration/shopify-auth", {
                    apikey: fragment.access_token,
                    apiurl: fragment.shop_url
                }).then(function (b) {
                    PN_PAGE.dbLoading.hide();
                    $scope.getAll();
                });
            } else {
                PN_PAGE.showMessage("Lỗi kết nối, vui lòng thử lại!", "error");
            }
        });
    }

    $scope.authCompletedHaravan = function (fragment) {
        $scope.$apply(function () {
            if (fragment.access_token && fragment.access_token.length > 0 && fragment.shop_url && fragment.shop_url.length > 0) {
                PN_PAGE.dbLoading.show();
                $restful.post("/integration/haravan-auth", {
                    apikey: fragment.access_token,
                    apiurl: fragment.shop_url
                }).then(function (b) {
                    PN_PAGE.dbLoading.hide();
                    $scope.getAll();
                });
            } else {
                PN_PAGE.showMessage("Lỗi kết nối, vui lòng thử lại!", "error");
            }
        });
    }

    $scope.authCompletedInfusionSoft = function (fragment) {
        $scope.$apply(function () {
            if (fragment.code && fragment.code.length > 0) {
                PN_PAGE.dbLoading.show();
                $restful.post("/integration/infusionsoft-auth", {
                    apikey: fragment.code,
                }).then(function (b) {
                    PN_PAGE.dbLoading.hide();
                    $scope.getAll();
                });                
            } else {
                PN_PAGE.showMessage("Lỗi kết nối, vui lòng thử lại!", "error");
            }
        });
    }

    $scope.showApiConnect = function (item, index) {
        if (item.siteId == 8) {
            var uid = $auth.getUserId() + "_" + PN_PAGE.getUniqueId(); 
            var externalProviderUrl = "/integrationapi/gauth?uid=" + uid;
            window.$windowScope = $scope;
            var oauthWindow = window.open(externalProviderUrl, "Xác thực tài khoản", "location=0,status=0,width=700,height=600");
            return;
        }

        if (item.siteId == 9) {
            var uid = $auth.getUserId() + "_" + PN_PAGE.getUniqueId(); 
            var externalProviderUrl = "/integrationapi/gsheetauth?uid=" + uid;
            window.$windowScope = $scope;
            var oauthWindow = window.open(externalProviderUrl, "Xác thực tài khoản", "location=0,status=0,width=700,height=600");
            return;
        }
        
        if (item.siteId == 12) {
            var externalProviderUrl = "/api/integration/haravan-auth-uri?shopUrl=" + $scope.apiKey;
            window.$windowScope = $scope;
            var oauthWindow = window.open(externalProviderUrl, "Xác thực tài khoản", "location=0,status=0,width=700,height=600");
            return;
        }

        if (item.siteId == 16) {
            var externalProviderUrl = "https://signin.infusionsoft.com/app/oauth/authorize?response_type=code&client_id=bh6evrn8z6wygav5rf9rf4am&redirect_uri=https://app.punnel.com/integrationApi/infusionsoftinstall";
            window.$windowScope = $scope;
            var oauthWindow = window.open(externalProviderUrl, "Xác thực tài khoản", "location=0,status=0,width=700,height=600");
            return;
        }

        if (item.siteId == 15) {
            popupService.show('addIntegrationSms.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
                $scope.site = item;
                $scope.device = {
                    name: '',
                    sim1: '',
                    sim2: '',
                    pin:''
                }
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.hide = function (res) {
                    $mdDialog.hide(res);
                };

                $scope.submit = function () {
                    if ($scope.myForm.$valid == false) return;
                    PN_PAGE.btnLoading.show();
                    $restful.post("/integration/sms-auth", $scope.device).then(function (b) {
                        PN_PAGE.btnLoading.hide();
                        $scope.hide(b.data);
                    });
                };

            }], function (res) {
                $scope.getAll();
            });
        }
        else {
            popupService.show('addIntegration.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
                $scope.title = 'Nhập ' + item.name + ' API key';
                if (item.siteId == 11) $scope.title = 'Nhập Url Shop (ex:https://abc.shopify.com)';
                if (item.siteId == 13) $scope.title = 'Nhập Url Shop (ex:https://abc.mysapo.net)';
                if (item.siteId == 5 || item.siteId == 10) {
                    $scope.hasUrl = true;
                }
                if (item.siteId == 14) {
                    $scope.isFtp = true;
                    $scope.title = 'FTP Host (ex: 203.40.60.88)';
                }
                $scope.site = item;
                $scope.apiKey = '';
                $scope.apiUrl = '';
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.hide = function (res) {
                    $mdDialog.hide(res);
                };

                $scope.authCompletedShopify = function (fragment) {
                    $scope.$apply(function () {
                        if (fragment.access_token && fragment.access_token.length > 0 && fragment.shop_url && fragment.shop_url.length > 0) {
                            PN_PAGE.dbLoading.show();
                            $restful.post("/integration/shopify-auth", {
                                apikey: fragment.access_token,
                                apiurl: fragment.shop_url
                            }).then(function (b) {
                                PN_PAGE.dbLoading.hide();
                                PN_PAGE.loading.hide();
                                $scope.hide(b.data);
                            });
                        } else {
                            PN_PAGE.showMessage("Lỗi kết nối, vui lòng thử lại!", "error");
                        }
                    });
                }

                $scope.authCompletedSapo = function (fragment) {
                    $scope.$apply(function () {
                        if (fragment.access_token && fragment.access_token.length > 0 && fragment.shop_url && fragment.shop_url.length > 0) {
                            PN_PAGE.dbLoading.show();
                            $restful.post("/integration/sapo-auth", {
                                apikey: fragment.access_token,
                                apiurl: fragment.shop_url
                            }).then(function (b) {
                                PN_PAGE.dbLoading.hide();
                                PN_PAGE.loading.hide();
                                $scope.hide(b.data);
                            });
                        } else {
                            PN_PAGE.showMessage("Lỗi kết nối, vui lòng thử lại!", "error");
                        }
                    });
                }

                $scope.submit = function () {
                    if ($scope.myForm.$valid == false) return;
                    PN_PAGE.btnLoading.show();

                    if ($scope.site.siteId == 11) {
                        var externalProviderUrl = "/api/integration/shopify-auth-uri?shopUrl=" + $scope.apiKey;
                        window.$windowScope = $scope;
                        var oauthWindow = window.open(externalProviderUrl, "Xác thực tài khoản", "location=0,status=0,width=700,height=600");
                        return;
                    } else if ($scope.site.siteId == 12) {
                        var externalProviderUrl = "/api/integration/haravan-auth-uri?shopUrl=" + $scope.apiKey;
                        window.$windowScope = $scope;
                        var oauthWindow = window.open(externalProviderUrl, "Xác thực tài khoản", "location=0,status=0,width=700,height=600");
                        return;
                    } else if ($scope.site.siteId == 13) {
                        var externalProviderUrl = "/api/integration/sapo-auth-uri?shopUrl=" + $scope.apiKey;
                        window.$windowScope = $scope;
                        var oauthWindow = window.open(externalProviderUrl, "Xác thực tài khoản", "location=0,status=0,width=700,height=600");
                        return;
                    }

                    var url = "";
                    if ($scope.site.siteId == 3) url = "mailchimp-auth";
                    else if ($scope.site.siteId == 4) url = "getresponse-auth";
                    else if ($scope.site.siteId == 5) url = "activecampaign-auth";
                    else if ($scope.site.siteId == 10) url = "wp-auth";
                    else if ($scope.site.siteId == 14) url = "ftp-auth";
                    else if ($scope.site.siteId == 17) url = "autopilot-auth";
                    
                    $restful.post("/integration/" + url, {
                        apiKey: $scope.apiKey,
                        apiUrl: $scope.apiUrl,
                        userName: $scope.accId,
                        passWord: $scope.email
                    }).then(function (b) {
                        PN_PAGE.loading.hide();
                        PN_PAGE.btnLoading.hide();
                        $scope.hide(b.data);
                    });
                };

            }], function (res) {
                $scope.getAll();
            });
        }
    };

    $scope.disconnect = function (item, $index) {
        swal({
            title: "Chú ý",
            type: "warning",
            text: "Hủy kết nối sẽ ảnh hưởng đến các Landing Page khác đang sử dụng chung kết nối này, Bạn có chắc chắn xoá?",
            showCancelButton: !0,
            confirmButtonColor: "#d9534f",
            confirmButtonText: "Hủy kết nối",
            cancelButtonText: "Không",
            closeOnConfirm: !0
        }, function (ok) {
            if (ok) {
                PN_PAGE.dbLoading.show();
                $restful.post("/integration/disconnect", {
                    id: item.integrationId
                }).then(function (res) {
                    PN_PAGE.dbLoading.hide();
                    swal("Đã hủy tích hợp!", "", "success");
                    $scope.getAll();
                });
            }
        });
    };

    $scope.refresh = function (item) {
        PN_PAGE.btnLoading.show('btn-' + item.integrationId);
        $restful.post("/integration/refresh", {
            id: item.integrationId
        }).then(function (res) {
            PN_PAGE.btnLoading.hide('btn-' + item.integrationId);
            if (res.data.status == true) {
                swal("Vẫn kết nối tốt!", "", "success");
            } else {
                console.log(res.data.msg);
                if (item.domain == 'gmail.com' || item.domain == 'docs.google.com') {
                    swal({
                        title: '',
                        type: 'error',
                        html: true,
                        text: 'Quyền truy cập của bạn đã hết hạn, vui lòng kết nối lại bằng cách click vào link sau để xem hướng dẫn cụ thể: ' +
                            '<strong><a target="_blank" href="https://support.punnel.com/article/57-gia-han-ket-noi-google-sheet-gmail-tren-punnel">hướng dẫn kết nối lại gmail, gsheet hết hạn!</a></strong>',
                        showCancelButton: false,
                        confirmButtonText:
                            'OK',
                        confirmButtonColor: "#DD6B55"
                    });
                } else {
                    swal("Quyền truy cập của bạn đã hết hạn, vui lòng kết hủy & kết nối lại", "", "error");
                }
                item.connected = false;
                item.isExpired = true;
            }
        });
    }
}])