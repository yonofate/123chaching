angular.module("punnelApp").controller("formSettingCtr", ["$scope", "$filter", "$rootScope", "$restful", "$stateParams", "popupService", "$mdDialog", "$auth", function ($scope, $filter, $rootScope, $restful, $stateParams, popupService, $mdDialog, $auth) {
    $scope.cancel = function () {
        $mdDialog.cancel();
    }

    $scope.hide = function (res) {
        $('#frmAutoReply').submit();
        $scope.redirect.save();
        $mdDialog.hide(res);
    }
    $scope.isAddNewAuto = 0;
    $scope.showAddAutoReply = function()
    {
        $scope.isAddNewAuto = 1;
    }

    $scope.pageId = $stateParams.id;

    $scope.redirect = {
        id:null,
        type: 0,
        url: '',
        message:'',
        options: [{ i: 0, n: 'Popup cảm ơn mặc định' }, { i: 1, n: 'Chuyển đến trang' }, { i: 2, n: 'Tạo popup khác' }],
        changed: function () {
            if ($scope.redirect.type == 2) {
                $scope.redirect.showCreatePopup();
            } 
            else if ($scope.redirect.type.length > 1) {
                if (selectedItem && selectedItem.length > 0) {
                    var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                    apiElement[b].idPopupSub = $scope.redirect.type;
                }
            }
        },
        init: function () {
            var a = $("#punnel-editor .widget-section");
            a && a.length > 0 && a.each(function () {
                if ("true" == $(this).attr("pn-popup")) {
                    var a = {
                        i: $(this).attr("id"),
                        n: $(this).attr("id")
                    };
                    $scope.redirect.options.push(a)
                }
            });
            $scope.redirect.id = selectedItem.attr("id");
            var idx = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            var x = apiElement[idx].idPopupSub;
            if (x && x != null) $scope.redirect.type = x;
            if ($scope.redirect.type == 1) {
                var url = apiElement[idx].urlSubmit;
                if (url && url != null) {
                    $scope.redirect.url = url;
                }
            }

            $scope.redirect.message = apiElement[idx].message_form_post;
        },
        showCreatePopup: function () {
            if (selectedItem && selectedItem.length > 0) {
                PN_PAGE.idShowPopup = selectedItem.attr("id");
                popupService.popupManagerShow();
            }
        },
        viewPopup: function () {
            var c = $("#punnel-editor #" + $scope.redirect.type);
            if (c && c.length > 0) {
                $('.widget-section[pn-popup="true"]').hide();
                var d = new IframeClick;
                    $("#punnel-editor .selected").removeClass("selected"),
                    $("#resizable-element").hide(),
                    $("#resizable-section").hide(),
                    selectedItem = c,
                    selectedItem.addClass("selected").show(),
                    d.addClassSelected(selectedItem),
                   $rootScope.id = $scope.redirect.type;
                    var e = new ShowBoxResize;
                    e.showBoxSection(selectedItem);
                    $scope.cancel();
            }
        },
        save: function () {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].message_form_post = $scope.redirect.message;
            apiElement[b].urlSubmit = $scope.redirect.url; 
            apiElement[b].idPopupSub = $scope.redirect.type;
        }
    }

    $scope.automation = {
        new: {
            landingPageId: $stateParams.id,
            delayHour: 0,
            delayMin:0
        },
        type:null,
        isAdd: 0,
        data: [],
        list:[],
        templates:[],
        showAdd: function () {
            $scope.automation.isAdd = 1;
        },
        hideAdd: function () {
            $scope.automation.new = {
                landingPageId: $stateParams.id,
                delayHour: 0,
                delayMin: 0,
                templateId: null,
                type: null
            };
            $scope.automation.isAdd = 0;
        },
        init: function(){
            $restful.get("/emailtemplate?pageId=" + $stateParams.id).then(function (res) {
                $scope.automation.data = res.data;
            });

            $restful.get("/automation?pageId=" + $stateParams.id).then(function (res) {
                $scope.automation.list = res.data;
            });
        },
        
        changeType : function () {
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

    $scope.emailAuto = {
        isAuto: false,
        delayHour: 0,
        delayMin:0,
        id: 0,
        frmId:0,
        templates: [],
        init: function () {
            PN_PAGE.loading.show();
            $restful.get("/emailtemplate").then(function (res) {
                PN_PAGE.loading.hide();
                $scope.emailAuto.templates = res.data;
            });
            $scope.emailAuto.frmId = selectedItem.attr("id");
            var idx = PN_PAGE.getIndexElement($scope.emailAuto.frmId);
            if (apiElement[idx].autoReply && apiElement[idx].autoReply>0) {
                $scope.emailAuto.isAuto = true;
                $scope.emailAuto.id = apiElement[idx].autoReply;
            }
            
        },
        change: function () {
            var idx = PN_PAGE.getIndexElement($scope.emailAuto.frmId);
            apiElement[idx].autoReply = $scope.emailAuto.id;
        },
        changeAuto: function () {
            if ($scope.emailAuto.isAuto == false) {
                $scope.emailAuto.id = 0;
                apiElement[idx].autoReply = 0;
            }
        }
    }

    $scope.tracking = {
        type: null,
        code: '',
        init: function () {
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            var val = apiElement[d].tracking;
            if (val && val != null) $scope.tracking.code = val;
        },
        options: itemTracking,
        add: function (index) {
           // $scope.tracking.code += "<script>" + $scope.tracking.options[index].value + "</script>\n";
            $scope.tracking.code += $scope.tracking.options[index].value + "\n";
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[d].tracking = $scope.tracking.code;
        }
    }

    $scope.disconnect = function (site) {
        if (site.integrationId != null) {
            PN_PAGE.loading.show();
            $restful.post("/integration/" + site.name + "-removeconfig", {
                pageid: $stateParams.id,
                integrationid: site.integrationId
            }).then(function (d) {
                PN_PAGE.loading.hide();
                //site.connected = false;
                site.configured = false;
                //site.integrationid = null;
                site.listId = null;
                site.listName = '';
                swal("Đã hủy tích hợp " + site.name + " thành công!", "", "success");
            });
        }
    }
    $scope.sites = [];

    $scope.loadConfigForm = function () {
        if ($scope.pageId && $scope.pageId.length > 0) {
            PN_PAGE.loading.show();
            $restful.get("/integration/formconfig-sites?pageId=" + $scope.pageId, {})
                .then(function (d) {
                    PN_PAGE.loading.hide();
                    angular.forEach(d.data, function (v, i) {
                        if (v.listId && v.listId.length > 0) {
                            $scope.sites.push(v);
                        }
                        else {
                            var k = $.grep($scope.sites, function (e) { return e.id == v.siteId; });
                            if (k.length == 0) {
                                $scope.sites.push(v);
                            }
                        }
                    });
                    $scope.integrationSites = d.data;
                });
        }
    };

    $scope.showIntegration = function (site) {       
        popupService.show('configForm.html', {
                sites: $scope.integrationSites,
                site: site,
                pageId: $stateParams.id
            }, ['$scope', '$mdDialog', 'sites', 'site', 'pageId', function ($scope, $mdDialog, sites, site, pageId) {
            $scope.integrationSites = sites;
            $scope.site = site;
            $scope.accounts = [];
            $scope.addAcc = 0;
            $scope.type = "listAccount";
                $scope.config = {
                    accId: '',
                    listId: 0,
                    integrationId: null
                };
                $scope.apiKey = "";
                $scope.apiUrl = "";

            $scope.initIntegration = function () {
                var connectedAccs = $.grep($scope.integrationSites, function (n, i) {
                    return n.connected && n.siteId == site.siteId;
                });
                if (connectedAccs && connectedAccs.length > 0) {
                    $scope.config.accId = connectedAccs[0].accId;
                    $scope.config.integrationId = connectedAccs[0].integrationId;
                } else {
                    if (site.siteId == 16 || site.siteId==9) {
                        $scope.showAdd();
                    }
                }

                $scope.accounts = connectedAccs;

                var configuredAccs = $.grep($scope.integrationSites, function (n, i) {
                    return n.configured && n.siteId == site.siteId;
                });

                $scope.configured = (configuredAccs && configuredAccs.length > 0);
                if ($scope.configured) {
                    $scope.config.listId = configuredAccs[0].listId;
                    $scope.config.listName = configuredAccs[0].listName;
                    if ($scope.config.listId && $scope.config.listId.length > 0) {
                        if (site.type == 1) $scope.type = "listAccount";
                        else if (site.type == 3) {
                            $scope.type = "googleSheet";
                            $scope.spreadId = $scope.config.listId;    
                            $scope.spreadTitle = $scope.config.listName;    
                        }
                    }
                }
            }

            $scope.connect = function () {
                PN_PAGE.btnLoading.show();
                if (site.type == 1 && site.siteId!=16) {
                    $restful.post("/integration/" + site.name + "-auth", {
                        apikey: $scope.apiKey,
                        apiUrl: $scope.apiUrl
                    }).then(function (b) {
                        PN_PAGE.btnLoading.hide();
                        var ncc = {
                            accId: b.data.accId,
                            email: b.data.email,
                            apiKey: b.data.apikey,
                            siteId: b.data.siteId,
                            integrationId: b.data.integrationId
                        };
                        $scope.accounts.push(ncc);
                        $scope.config.accId = ncc.accId;
                        $scope.config.integrationId = ncc.integrationId;
                    });
                }
                else if (site.siteId==16) {
                    var externalProviderUrl = "https://signin.infusionsoft.com/app/oauth/authorize?response_type=code&client_id=bh6evrn8z6wygav5rf9rf4am&redirect_uri=https://app.punnel.com/integrationApi/infusionsoftinstall";
                    window.$windowScope = $scope;
                    var oauthWindow = window.open(externalProviderUrl, "Xác thực tài khoản", "location=0,status=0,width=700,height=600");
                    return;
                }else if (site.type == 3) {
                    var uid = $auth.getUserId();
                    var externalProviderUrl = "/integrationapi/gsheetauth?uid=" + uid;
                    window.$windowScope = $scope;
                    var oauthWindow = window.open(externalProviderUrl, "Xác thực tài khoản", "location=0,status=0,width=700,height=600");
                }
                }

                $scope.authCompletedGsheet = function (fragment) {
                    $scope.$apply(function () {
                        if (fragment.email && fragment.email.length > 0) {
                            PN_PAGE.btnLoading.show();
                            $restful.post("/integration/googlesheet-auth", {
                                apikey: fragment.email
                            }).then(function (b) {
                                PN_PAGE.btnLoading.hide();
                                var ncc = {
                                    accId: b.data.accId,
                                    email: b.data.email,
                                    apiKey: b.data.apikey,
                                    siteId: b.data.siteId,
                                    integrationId: b.data.integrationId
                                };
                                $scope.accounts.push(ncc);
                                $scope.config.accId = ncc.accId;
                                $scope.config.integrationId = ncc.integrationId;
                            });
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
                                PN_PAGE.btnLoading.hide();
                                var ncc = {
                                    accId: b.data.accId,
                                    email: b.data.email,
                                    apiKey: b.data.apikey,
                                    siteId: b.data.siteId,
                                    integrationId: b.data.integrationId
                                };
                                $scope.accounts.push(ncc);
                                $scope.config.accId = ncc.accId;
                                $scope.config.integrationId = ncc.integrationId;
                            });
                        } else {
                            PN_PAGE.showMessage("Lỗi kết nối, vui lòng thử lại!", "error");
                        }
                    });
                }

            $scope.prev = function () {
                if ($scope.type == 'listAccount') $mdDialog.hide();
                else if ($scope.type == 'listCampain') $scope.type = 'listAccount';
                else if ($scope.type == 'googleSheet') $scope.type = 'listAccount';
            }

            $scope.next = function () {
                if ($scope.type == 'listAccount') {
                    if (site.type == 1) {
                        PN_PAGE.btnLoading.show();
                        $restful.post("/integration/" + site.name + "-campains", {
                            AccId: $scope.config.accId
                        }).then(function (d) {
                            PN_PAGE.btnLoading.hide();
                            $scope.campains = d.data;
                            $scope.type = "listCampain";
                        });
                    } else if (site.type == 3) {
                        $scope.type = 'googleSheet';
                    }
                } else if ($scope.type == 'listCampain') {
                    var cmp = $.grep($scope.campains, function (n, i) { return n.id == $scope.config.listId; })[0];
                    PN_PAGE.btnLoading.show();
                    $restful.post("/integration/" + site.name + "-setcampain", {
                        id: $scope.config.listId,
                        name: cmp.name,
                        pageid: pageId,
                        integrationid: $scope.config.integrationId
                    }).then(function (d) {
                        PN_PAGE.btnLoading.hide();
                        swal("Đã tích hợp " + site.name + " thành công!", "", "success");
                        $scope.hide();
                    });
                }
            }

            $scope.showAdd = function () {
                if (site.type == 1 && site.siteId!=16) {
                    $scope.addAcc = 1;
                }
                else if (site.siteId = 16) {
                    var externalProviderUrl = "https://signin.infusionsoft.com/app/oauth/authorize?response_type=code&client_id=bh6evrn8z6wygav5rf9rf4am&redirect_uri=https://app.punnel.com/integrationApi/infusionsoftinstall";
                    window.$windowScope = $scope;
                    var oauthWindow = window.open(externalProviderUrl, "Xác thực tài khoản", "location=0,status=0,width=700,height=600");
                    return;
                }
                else if (site.type == 3) {
                    var uid = $auth.getUserId();
                    var externalProviderUrl = "/integrationapi/gsheetauth?uid=" + uid;
                    window.$windowScope = $scope;
                    var oauthWindow = window.open(externalProviderUrl, "Xác thực tài khoản", "location=0,status=0,width=700,height=600");
                }
                }

                $scope.findSpread = function () {
                    PN_PAGE.btnLoading.show('btn-find');
                    $restful.post("/integration/" + site.name + "-campains", {
                        AccId: $scope.config.accId,
                        Data: $scope.spreadId,
                        Pageid: pageId,
                        Action: 'find'
                    }).then(function (d) {
                        PN_PAGE.btnLoading.hide('btn-find');
                        swal("Đã tích hợp " + site.name + " thành công!", "", "success");
                        $scope.hide();
                        }).error(function (e) {
                            PN_PAGE.btnLoading.hide('btn-find');
                    });
                }

                $scope.createSpread = function () {
                    PN_PAGE.btnLoading.show('btn-create');
                    $restful.post("/integration/" + site.name + "-campains", {
                        AccId: $scope.config.accId,
                        Data: $scope.spreadName,
                        Pageid: pageId,
                        Action: 'create'
                    }).then(function (d) {
                        PN_PAGE.btnLoading.hide('btn-create');
                        swal("Đã tích hợp " + site.name + " thành công!", "", "success");
                        $scope.hide();
                        }).error(function (e) {
                            PN_PAGE.btnLoading.hide('btn-create');
                        });
                }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };
                $scope.hide = function (res) { 
                $mdDialog.hide(res);
            };
        }], function (res) {
            popupService.formManagerShow();
        });
    }
}]);
