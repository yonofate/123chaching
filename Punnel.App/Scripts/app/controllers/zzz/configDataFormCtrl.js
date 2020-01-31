angular.module("punnelApp").controller("configDataFormCtrl", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", "$restful", "$timeout", "popupService", "$mdDialog", function (a, b, c, d, e, f, g, $timeout, popupService, $mdDialog) {
    c.idTMP = "",
    c.arrWgsection = [],
    c.email = PN_PAGE.account.email,
    c.itemTracksfrom = itemTracking,
    c.tabShow = "configSaveData",
    c.dataSheet = "false",
    c.idConfigGoogleSheetSelected = "",
    c.idFolderGoogleSheetSelected = "",
    c.emailGoogleSheetSelected = "",
    c.listEmailGoogleSheet = [],
    c.listSheetWithEmail = [],
    c.idSheetSelected = "",
    c.nameSheet = "",
    c.vtIdConfig = 0,
    c.searchSheet = "",
    c.stateSheet = "",
    c.hideGoogleForm = "false",
    c.valueApiForm = [],
    c.urlApi = "",
    a.configFormServe = [],
    a.configFormClient = [],
    c.listConfigUsing = [],
    c.configFormServe = "",
    c.configFormClient = "",
    c.showNodata = "true";
    c.typedo = "";

    c.integrationSites = [];

    c.close = function () {
        $uibModalInstance.dismiss('cancel');
    }

    c.activecampain = {
        apiKey: "",
        apiUrl:"",
        configured: false,
        type: "listAccount",
        selected: {},
        accounts: [],
        campains: [],
        selectedAcc: {},
        selectedCampain: {},
        step0: function () {
            c.showFormConfig("configFormActiveCampain");
        },
        step1: function () {
            this.type = "listAccount";
        },
        load: function () {
            var connectedAccs = $.grep(c.integrationSites, function (n, i) {
                return n.connected && n.siteId == 5;
            });
            c.getresponse.accounts = connectedAccs;
            var configuredAccs = $.grep(c.integrationSites, function (n, i) {
                return n.configured && n.siteId == 5;
            });
            c.getresponse.configured = (configuredAccs && configuredAccs.length > 0);
        },
        connect: function () {
            if (!this.apiKey || this.apiKey.length == 0 || !this.apiUrl || this.apiUrl.length == 0) return;
            PN_PAGE.pageLoading.show();
            g.post("/integration/activecampain-auth", {
                apikey: this.apiKey,
                apiUrl: this.apiUrl
            }).then(function (b) {
                PN_PAGE.pageLoading.hide();
                var ncc = {
                    accId: b.data.accId,
                    email: b.data.email,
                    apiKey: b.data.apikey,
                    siteId: b.data.siteId,
                    integrationId: b.data.id
                };
                c.activecampain.accounts.push(ncc);
                c.activecampain.selectedAcc = ncc;
                c.activecampain.apiKey = "";
                c.activecampain.apiUrl = "";
            });
        },
        selectAccount: function () {
            c.activecampain.getCampains();
        },
        gotoGetCampains: function (item) {
            c.showConfig("configFormActiveCampain");
            this.selectedAcc = item;
            this.selectedCampain = {
                campaignId: item.listId,
                name: item.listName
            }
            c.getresponse.getCampains();
        },
        getCampains: function () {
            PN_PAGE.pageLoading.show();
            g.post("/integration/activecampain-campains", {
                AccId: this.selectedAcc.accId
            }).then(function (d) {
                PN_PAGE.pageLoading.hide();
                c.activecampain.campains = d.data;
                c.activecampain.type = "listCampain";
            });
        },
        selectCampain: function () {
            if (c.activecampain.selectedCampain) {
                var cmp = $.grep(c.activecampain.campains, function (n, i) { return n.campaignId == c.activecampain.selectedCampain.campaignId; })[0];
                PN_PAGE.pageLoading.show();
                g.post("/integration/getresponse-setcampain", {
                    id: cmp.campaignId,
                    name: cmp.name,
                    pageid: e.id,
                    integrationid: this.selectedAcc.integrationId
                }).then(function (d) {
                    PN_PAGE.pageLoading.show();
                    c.showFormConfig("configFormActiveCampain");
                    c.loadConfigForm();
                });
            }
        },
        disconnect: function () {
            if (c.getresponse.selectedAcc) {
                PN_PAGE.pageLoading.show();
                g.post("/integration/activecampain-removeconfig", {
                    pageid: e.id,
                    integrationid: this.selectedAcc.integrationId
                }).then(function (d) {
                    PN_PAGE.pageLoading.hide();
                    c.showFormConfig("configFormActiveCampain");
                    c.loadConfigForm();
                });
            }
        }
    };

    c.getresponse = {
        apiKey: "",
        configured: false,
        type: "listAccount",
        selected: {},
        accounts: [],
        campains: [],
        selectedAcc: {},
        selectedCampain: {},
        step0: function () {
            c.showFormConfig("configFormGetresponse");
        },
        step1: function(){
            this.type = "listAccount";
        },
        load: function () {
            var connectedAccs = $.grep(c.integrationSites, function (n, i) {
                return n.connected && n.siteId == 4;
            });
            c.getresponse.accounts = connectedAccs;
            var configuredAccs = $.grep(c.integrationSites, function (n, i) {
                return n.configured && n.siteId == 4;
            });
            c.getresponse.configured = (configuredAccs && configuredAccs.length > 0);
        },
        connect: function () {
            if (!this.apiKey && this.length == 0) return;
            PN_PAGE.pageLoading.show();
            g.post("/integration/getresponse-auth", {
                apikey: this.apiKey
            }).then(function (b) {
                PN_PAGE.pageLoading.hide();
                var ncc = {
                    accId: b.data.accId,
                    email: b.data.email,
                    apiKey: b.data.apikey,
                    siteId: b.data.siteId,
                    integrationId: b.data.id
                };
                c.getresponse.accounts.push(ncc);
                c.getresponse.selectedAcc = ncc;
                c.getresponse.apiKey = "";
            });
        },
        selectAccount: function(){
            c.getresponse.getCampains();
        },
        gotoGetCampains: function (item) {
            c.showConfig(item.configId);
            this.selectedAcc = item;
            this.selectedCampain = {
                campaignId: item.listId,
                name: item.listName
            }
            c.getresponse.getCampains();
        },
        getCampains: function () {
            PN_PAGE.pageLoading.show();
            g.post("/integration/getresponse-campains", {
                AccId: this.selectedAcc.accId
            }).then(function (d) {
                PN_PAGE.pageLoading.hide();
                c.getresponse.campains = d.data;
                c.getresponse.type = "listCampain";
            });
        },
        selectCampain: function () {
            if (c.getresponse.selectedCampain) {
                var cmp = $.grep(c.getresponse.campains, function (n, i) { return n.campaignId == c.getresponse.selectedCampain.campaignId; })[0];
                PN_PAGE.pageLoading.show();
                g.post("/integration/getresponse-setcampain", {
                    id: cmp.campaignId,
                    name: cmp.name,
                    pageid: e.id,
                    integrationid: this.selectedAcc.integrationId
                }).then(function (d) {
                    PN_PAGE.pageLoading.hide();
                    c.showFormConfig("configFormGetresponse");
                    c.loadConfigForm();
                });
            }
        },
        disconnect: function () {
            if (c.getresponse.selectedAcc) {
                PN_PAGE.pageLoading.show();
                g.post("/integration/getresponse-removeconfig", {
                    pageid: e.id,
                    integrationid: this.selectedAcc.integrationId
                }).then(function (d) {
                    PN_PAGE.pageLoading.hide();
                    c.showFormConfig("configFormGetresponse");
                    c.loadConfigForm();
                });
            }
        }
    };

    c.mailchimp = {
        apiKey: "",
        configured: false,
        type: "listAccount",
        selected: {},
        accounts: [],
        campains: [],
        selectedAcc: {},
        selectedCampain:{},
        step0: function () {
            c.showFormConfig("configFormMailchimp");
        },
        step1: function () {
            this.type = "listAccount";
        },
        load: function(){
            var connectedAccs = $.grep(c.integrationSites, function (n, i) {
                return n.connected && n.siteId == 3;
            });
            c.mailchimp.accounts = connectedAccs;
            var configuredAccs = $.grep(c.integrationSites, function (n, i) {
                return n.configured && n.siteId == 3;
            });
            c.mailchimp.configured = (configuredAccs && configuredAccs.length > 0);
        },
        connect: function () {
            PN_PAGE.pageLoading.show();
            g.post("/integration/mailchimp-auth", {
                apikey: this.apiKey
            }).then(function (b) {
                PN_PAGE.pageLoading.hide();
                var ncc = {
                    accId: b.data.accId,
                    email: b.data.email,
                    apiKey: b.data.apikey,
                    siteId: b.data.siteId,
                    integrationId: b.data.id
                };
                c.mailchimp.accounts.push(ncc);
                c.mailchimp.selectedAcc = ncc;
                c.mailchimp.apiKey = "";
            });
        },
        selectAccount: function () {
            c.mailchimp.getCampains();
        },
        gotoGetCampains: function (item) {
            c.showConfig(item.configId);
            this.selectedAcc = item;
            this.selectedCampain = {
                id: item.listId,
                name: item.listName
            }
            c.mailchimp.getCampains();
        },
        getCampains: function () {
            PN_PAGE.pageLoading.show();
            g.post("/integration/mailchimp-campains", {
                AccId: this.selectedAcc.accId
            }).then(function (d) {
                PN_PAGE.pageLoading.hide();
                c.mailchimp.campains = d.data;
                c.mailchimp.type = "listCampain";
            });
        },
        selectCampain: function () {
            if (c.mailchimp.selectedCampain) {
                var cmp = $.grep(c.mailchimp.campains, function (n, i) { return n.id == c.mailchimp.selectedCampain.id; })[0];
                PN_PAGE.pageLoading.show();
                g.post("/integration/mailchimp-setcampain", {
                    id: cmp.id,
                    name: cmp.name,
                    pageid: e.id,
                    integrationid: this.selectedAcc.integrationId
                }).then(function (d) {
                    PN_PAGE.pageLoading.hide();
                    c.showFormConfig("configFormMailchimp");
                    c.loadConfigForm();
                });
            }
        },
        disconnect: function () {
            if (c.mailchimp.selectedAcc) {
                PN_PAGE.pageLoading.show();
                g.post("/integration/mailchimp-removeconfig", {
                    pageid: e.id,
                    integrationid: this.selectedAcc.integrationId
                }).then(function (d) {
                    PN_PAGE.pageLoading.hide();
                    c.showFormConfig("configFormMailchimp");
                    c.loadConfigForm();
                });
            }
        }
    };

    c.loadConfigForm = function () {
        if (e.id && e.id.length>0) {
            PN_PAGE.pageLoading.show();
            g.get("/integration/formconfig-sites?pageId=" + e.id, {})
                .then(function (d) {
                    PN_PAGE.pageLoading.hide();
                    c.integrationSites = d.data;
                    c.getresponse.load();
                    c.mailchimp.load();
            });
        }
    }

    c.gotoGetCampains = function (item) {
        if (item.siteId == 4) c.getresponse.gotoGetCampains(item);
        else if (item.siteId == 3) c.mailchimp.gotoGetCampains(item);
    }
    c.showConfig = function (b) {
        //$uibModalInstance.close();
        $("#" + b).modal("show");
        
        //$("#saveDataForms").modal("hide");
    };

    c.showFormConfig = function (b) {
        $("#" + b).modal("hide");
        popupService.formManagerShow();
        //$("#saveDataForms").modal("show");
    };

    c.showGridBottomSheet = function (ev) {
        $mdDialog.show({
            templateUrl: 'scripts/app/views/dialog/configFormActiveCampain.html',
            controller: 'configDataFormCtrl',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });
    };


    c.getlistConUsing = function () {
        if (c.listConfigUsing = [], a.configFormServe && a.configFormServe.length > 0)
            for (var b = 0; b < a.configFormServe.length; b++) c.listConfigUsing.push(a.configFormServe[b])
    },
    c.dem = 0,
    c.updateUrlSubmit = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].urlSubmit = c.urlSubmit
        }
    },
    c.setValueIdPopupSub = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            c.idPopupSub = a;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].idPopupSub = c.idPopupSub
        }
    },
    c.setTypeForm = function (a) {
        selectedItem && selectedItem.length > 0 && (c.typeForm = a, "google-sheet" == a && c.loadListConfigGoogleSheet())
    },
    c.updateMessageFrom = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].message_form_post = c.messageThanks, selectedItem.attr("pn-message-form", c.messageThanks)
        }
    },
    c.changeValueSelect = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            for (var d = PN_PAGE.getIndexElement(selectedItem.attr("id")), e = 0; e < c.listItemsFormUrl.length; e++)
                if (c.listItemsFormUrl[e].id == a) {
                    c.listItemsFormUser[b].idFormUrl = c.listItemsFormUrl[e].id, c.listItemsFormUser[b].nameFormUrl = c.listItemsFormUrl[e].name, c.listItemsFormUrl[e].nameFormUser = c.listItemsFormUser[b].name;
                    break
                }
            switch (apiElement[d].type_form) {
                case "email":
                    apiElement[d].actionEmail = c.urlEmail;
                    break;
                case "google":
                    for (var f = [], e = 0; e < c.listItemsFormUser.length; e++) {
                        var g = {
                            id: c.listItemsFormUser[e].idFormUrl,
                            name: c.listItemsFormUser[e].nameFormUrl,
                            nameFormUser: c.listItemsFormUser[e].name
                        };
                        f.push(g)
                    }
                    apiElement[d].item_form = c.listItemsFormUser, apiElement[d].settingsForm.items = c.listItemsFormUrl, apiElement[d].settingsForm.itemsSave = f, selectedItem.attr("pn-action", apiElement[d].settingsForm.action), selectedItem.attr("pn-data-form", JSON.stringify(apiElement[d].settingsForm))
            }
        }
    },
    c.applyDone = function () {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            g.post("/Config/AddFormDetail", {
                formdetailid: apiElement[b].formdetailid,
                ladiid: e.id,
                configs: a.configFormServe
            }, function (c, d) {
                c ? PN_PAGE.messageLadi("Xảy ra lỗi: " + c) : d && 200 == d.code ? (apiElement[b].configFormClient = a.configFormClient, apiElement[b].configFormServe = a.configFormServe, d.data && (apiElement[b].formdetailid = d.data.formDetailID, apiElement[b].configFormServe = a.configFormServe), $uibModalInstance.close()) : PN_PAGE.messageLadi(d.messager)
            })
        }
    },
    c.changeUrlPost = function () {
        if (selectedItem && selectedItem.length > 0) {
            c.dem = 1;
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.listItemsFormUser = apiElement[a].item_form, $(".loading").css({
                opacity: "0.4"
            }).show(), g.get("/user-access/getHtmlFromLink", {
                link: c.urlPost
            }, function (a, b) {
                if (b && 200 == b.code) {
                    if (c.listItemsFormUser && c.listItemsFormUser.length > 0)
                        for (var d = 0; d < c.listItemsFormUser.length; d++) c.listItemsFormUser[d].idFormUrl = "";
                    var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                    apiElement[e].url_form_google = c.urlPost;
                    var f = $(b.data),
                        g = [],
                        h = f.find('[name*="entry"]');
                    h.each(function () {
                        var a = {
                            name: "",
                            id: $(this).attr("name")
                        };
                        g.push(a)
                    });
                    var i = f.find("[aria-label]");
                    i.each(function (a) {
                        a < g.length && (g[a].name = $(this).attr("aria-label"))
                    }), void 0 == apiElement[e].settingsForm && (apiElement[e].settingsForm = {}), apiElement[e].settingsForm.items = g, apiElement[e].settingsForm.fvv = f.find('[name="fvv"]').attr("value"), apiElement[e].settingsForm.draftResponse = f.find('[name="draftResponse"]').attr("value"), apiElement[e].settingsForm.pageHistory = f.find('[name="pageHistory"]').attr("value"), apiElement[e].settingsForm.fbzx = f.find('[name="fbzx"]').attr("value"), apiElement[e].settingsForm.action = f.find("form").attr("action"), c.listItemsFormUrl = g, $(".loading").css({
                        opacity: "1"
                    }).hide(), PN_PAGE.messageLadi("Lựa chọn các trường phù hợp với form của bạn rồi nhấn SỬ DỤNG")
                } else b ? PN_PAGE.messageLadi(b.messager) : PN_PAGE.messageLadi("Vui lòng kiểm tra kết nối hoặc liên hệ với chúng tôi!"), $(".loading").css({
                    opacity: "1"
                }).hide()
            })
        }
    },
    c.changeValueUrlPost = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            switch (apiElement[a].type_form) {
                case "email":
                    apiElement[a].actionEmail = c.urlEmail;
                    break;
                case "google":
                    apiElement[a].url_form_google = c.urlPost
            }
            c.dem = 0
        }
    },
    c.setTracking = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = $("#tracking-form-value textarea");
            c.tracking = a.val();
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].tracking = c.tracking, console.log(apiElement[b].tracking)
        }
    },
    c.addTrackingForm = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            c.tracking += c.itemTracksfrom[a].value + "\n";
            var b = $("#tracking-form-value textarea");
            b.val(c.tracking);
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[d].tracking = c.tracking
        }
    },
    c.getItemWgSection = function () {
        var a = [],
            b = $("#punnel-editor .widget-section");
        return b && b.length > 0 && b.each(function () {
            if ("true" == $(this).attr("pn-popup")) {
                var b = {
                    id: $(this).attr("id")
                };
                a.push(b)
            }
        }), a
    },
    c.changeValueNameMailchimp = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].nameMailchimp = c.nameMailchimp
        }
    },
    c.changeValueApiKeyGetresponse = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].apiKeyGetresponse = c.apiKeyGetresponse
        }
    },
    c.changeValueNameGetresponse = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].nameGetresponse = c.nameGetresponse
        }
    },
    c.createNewPopup = function () {
        selectedItem && selectedItem.length > 0 && (PN_PAGE.idShowPopup = selectedItem.attr("id"), $("#modal-add-popup").modal("show"), $("#my-modal-send-form").modal("hide"), $("#my-modal-send-form-new").modal("hide"), $uibModalInstance.close())
    },
    c.showPopUp = function (b) {
        var c = $("#punnel-editor #" + b);
        if (c && c.length > 0) {
            $('.widget-section[pn-popup="true"]').hide();
            var d = new IframeClick;
            $("#my-modal-send-form").modal("hide"), $("#my-modal-send-form-new").modal("hide"), $("#punnel-editor .selected").removeClass("selected"), $("#resizable-element").hide(), $("#resizable-section").hide(), selectedItem = c, selectedItem.addClass("selected").show(), d.addClassSelected(selectedItem), a.id = b;
            var e = new ShowBoxResize;
            e.showBoxSection(selectedItem)
        }
    },
    c.setValueListUser = function (a) {
        c.idListUser = a
    },
    c.managerMailchimp = function () {
        $("#modal-manager-mailchimp").modal("show"), $("#my-modal-send-form").modal("hide")
    },
    c.showTab = function (a) {
        "bieu-mau" == a ? ($("#bieumaucu").modal("show"), $uibModalInstance.close()) : c.tabShow = a
    },
    c.fnSelectedEmailGoogleSheet = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.idConfigGoogleSheetSelected = c.listEmailGoogleSheet[a].id, c.idFolderGoogleSheetSelected = c.listEmailGoogleSheet[a].Config.FolderID, c.emailGoogleSheetSelected = c.listEmailGoogleSheet[a].Config.Email, c.listSheetWithEmail = c.listEmailGoogleSheet[a].Data, apiElement[b].idConfigGoogleSheetSelected = c.idConfigGoogleSheetSelected, apiElement[b].idFolderGoogleSheetSelected = c.idFolderGoogleSheetSelected, apiElement[b].emailGoogleSheetSelected = c.emailGoogleSheetSelected, c.idConfigGoogleSheetSelected && c.idConfigGoogleSheetSelected.length > 0 ? c.refreshSheet() : c.loadListConfigGoogleSheet(), c.stateSheet = "sheet"
        }
    },
    c.getAuthGoogleSheet = function () {
        PN_PAGE.setCookie("googleSheetIdUser", PN_PAGE.account.id, 60), localStorage.setItem("googleSheetIdUser", PN_PAGE.account.id),
        g.get("/Auth/UrlGoogleSheets", {}, function (a, b) {
            if (a) PN_PAGE.messageLadi("Vui lòng thử lại hoặc liên hệ với chúng tôi!");
            else if (b && 200 == b.code) var d = screen.width / 2 - 200,
                e = screen.height / 2 - 275,
                f = window.open(b.data, "myWindow", "width=400, height=550, left=" + d + ", top=" + e),
                h = setInterval(function () {
                    localStorage.getItem("googleSheetId") && localStorage.getItem("googleSheetId").length > 0 && localStorage.getItem("googleSheetEmail") && localStorage.getItem("googleSheetEmail").length > 0 && localStorage.getItem("googleSheetFolderID") && localStorage.getItem("googleSheetFolderID").length > 0 && (c.stateSheet = "emailSheet", "complete" == localStorage.getItem("googleSheetId") ? (f.close(), clearInterval(h), c.loadListConfigGoogleSheet()) : (c.idConfigGoogleSheetSelected = localStorage.getItem("googleSheetId"), c.idFolderGoogleSheetSelected = localStorage.getItem("googleSheetFolderID"), c.emailGoogleSheetSelected = localStorage.getItem("googleSheetEmail"), f.close(), clearInterval(h), localStorage.removeItem("googleSheetEmail"), localStorage.removeItem("googleSheetFolderID"), localStorage.removeItem("googleSheetId"), PN_PAGE.deleteCookie("googleSheetIdUser"), localStorage.removeItem("googleSheetIdUser"),
                    g.get("/Config/FindFormConfigByType", {
                        type: 9
                    }, function (a, b) {
                        b && 200 == b.code ? (c.listEmailGoogleSheet = b.data, c.idSheetSelected = "") : 503 == b.code && $("#reLogin").modal("show")
                    })))
                }, 1e3);
            else b ? PN_PAGE.messageLadi(b.messager) : PN_PAGE.messageLadi("Vui lòng thử lại hoặc liên hệ với chúng tôi!")
        })
    },
    c.loadListConfigGoogleSheet = function () {
        "none" != $("#my-modal-send-form-new").css("display") && "" != c.stateSheet && $(".loading").css({
            opacity: "0.4"
        }).show(), localStorage.removeItem("googleSheetEmail"), localStorage.removeItem("googleSheetFolderID"), localStorage.removeItem("googleSheetId"),
        g.get("/Config/FindFormConfigByType", {
            type: 9,
            status: 1
        }, function (a, b) {
            if ($(".loading").css({
                opacity: "1"
            }).hide(), a) "none" != $("#my-modal-send-form-new").css("display") && "" != c.stateSheet && PN_PAGE.messageLadi("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ với chúng tôi"), c.listEmailGoogleSheet = [], c.stateSheet = "";
            else if (b && 200 == b.code) {
                c.listEmailGoogleSheet = b.data;
                var d = c.checkValueEmail(b.data, c.emailGoogleSheetSelected);
                if (d) {
                    c.stateSheet = "sheet";
                    var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                    c.idConfigGoogleSheetSelected = d.id, c.idFolderGoogleSheetSelected = c.listEmailGoogleSheet[d.vt].Config.FolderID, c.emailGoogleSheetSelected = c.listEmailGoogleSheet[d.vt].Config.Email, c.listSheetWithEmail = c.listEmailGoogleSheet[d.vt].Data, apiElement[e].idConfigGoogleSheetSelected = c.idConfigGoogleSheetSelected, apiElement[e].idFolderGoogleSheetSelected = c.idFolderGoogleSheetSelected, apiElement[e].emailGoogleSheetSelected = c.emailGoogleSheetSelected, c.refreshSheet()
                } else b.data && b.data.length > 0 ? (c.emailGoogleSheetSelected = b.data[0].Config.Email, c.stateSheet = "emailSheet") : c.stateSheet = ""
            } else c.listEmailGoogleSheet = [], c.stateSheet = "", b ? 503 == b.code ? $("#reLogin").modal("show") : "none" != $("#my-modal-send-form-new").css("display") && "" != c.stateSheet && PN_PAGE.messageLadi(b.messager) : "none" != $("#my-modal-send-form-new").css("display") && "" != c.stateSheet && PN_PAGE.messageLadi("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ với chúng tôi")
        })
    },
    c.createSheet = function () {
        "none" != $("#my-modal-send-form-new").css("display") && $(".loading").css({
            opacity: "0.4"
        }).show(), c.nameSheet && c.nameSheet.length > 0 && c.idConfigGoogleSheetSelected && c.idConfigGoogleSheetSelected.length > 0 ?
        g.post("/Config/CreateGoogleSheets", {
            configID: c.idConfigGoogleSheetSelected,
            name: c.nameSheet
        }, function (a, b) {
            if ($(".loading").css({
                opacity: "1"
            }).hide(), a) PN_PAGE.messageLadi("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ với chúng tôi");
            else if (b && 200 == b.code) {
                if (c.nameSheet = "", c.idSheetSelected = b.data, c.listSheetWithEmail.unshift(b.data), selectedItem && selectedItem.length > 0) {
                    var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                    apiElement[d].idSheetSelected = c.idSheetSelected
                }
            } else b ? PN_PAGE.messageLadi(b.messager) : PN_PAGE.messageLadi("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ với chúng tôi")
        }) : (PN_PAGE.messageLadi("Không được để tên trống!"), $(".loading").css({
            opacity: "1"
        }).hide())
    },
    c.fnSetSheetSelect = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.idSheetSelected = a, apiElement[b].idSheetSelected = c.idSheetSelected
        }
    },
    c.searchSheetItem = function () {
        if ("" != c.searchSheet && c.searchSheet.length > 0) {
            var a = $("#my-modal-send-form-new .list-sheet-connect div");
            a.hide(), $('#my-modal-send-form-new .list-sheet-connect div[pn-search*="' + c.searchSheet.toUpperCase() + '"]').show()
        } else $("#my-modal-send-form-new .list-sheet-connect div").show()
    },
    c.backSelectEmailGoogleSheet = function () {
        c.emailGoogleSheetSelected = "", c.loadListConfigGoogleSheet(), c.stateSheet = "emailSheet"
    },
    c.refreshSheet = function () {
        "none" != $("#my-modal-send-form-new").css("display") && $(".loading").css({
            opacity: "0.4"
        }).show(), g.get("/Config/LoadGoogleSheets", {
            id: c.idConfigGoogleSheetSelected,
            reload: "true"
        }, function (a, b) {
            if ($(".loading").css({
                opacity: "1"
            }).hide(), a) c.listSheetWithEmail = [];
            else if (b && 200 == b.code) {
                c.listSheetWithEmail = b.data;
                var d = c.checkValueGoogleSheet(b.data, c.idSheetSelected.id);
                if (d);
                else {
                    c.idSheetSelected = b.data[0];
                    var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                    apiElement[e].idSheetSelected = c.idSheetSelected
                }
            } else c.listSheetWithEmail = [], b || PN_PAGE.messageLadi("Đã xảy ra lỗi vui lòng thử lại hoặc liên hệ với chúng tôi")
        })
    },
    c.checkValueEmail = function (a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c].Config.Email == b) return {
                id: a[c].id,
                vt: c
            };
        return !1
    },
    c.checkValueGoogleSheet = function (a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c].id == b) return {
                id: a[c].id,
                vt: c
            };
        return !1
    },
    //c.loadConfigForm = function () {
    //    if (selectedItem && "contact_form" == selectedItem.attr("pn-type")) {
    //        var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
    //        g.post("/formconfig", {
    //            id: null,//apiElement[b].formdetailid,
    //            pageid: e.id,
    //            integrations: ''
    //        }, function (b, d) {
    //            if (b) PN_PAGE.messageLadi(b);
    //            else if (d && 200 == d.code)
    //                if (d && d.data && d.data.pageid && d.data.pageid == e.id) {
    //                    if (d.data.Config && d.data.Config.length > 0) {
    //                        a.configFormServe = [];
    //                        for (var f = 0; f < d.data.Config.length; f++)
    //                            switch (d.data.Config[f].Type) {
    //                                case 8:
    //                                    var g = {
    //                                        Type: 8,
    //                                        Email: d.data.Config[f].Email
    //                                    };
    //                                    a.configFormServe.push(g);
    //                                    break;
    //                                case 9:
    //                                    var g = {
    //                                        Type: 9,
    //                                        FormConfigID: d.data.Config[f].FormConfigID,
    //                                        SheetID: d.data.Config[f].SheetID,
    //                                        SheetName: d.data.Config[f].SheetName
    //                                    };
    //                                    a.configFormServe.push(g);
    //                                    break;
    //                                case 3:
    //                                    var g = {
    //                                        Type: 3,
    //                                        FormConfigID: d.data.Config[f].FormConfigID,
    //                                        CampaignName: d.data.Config[f].CampaignName,
    //                                        CampaignId: d.data.Config[f].CampaignId
    //                                    };
    //                                    a.configFormServe.push(g);
    //                                    break;
    //                                case 4:
    //                                    var g = {
    //                                        Type: 4,
    //                                        FormConfigID: d.data.Config[f].FormConfigID,
    //                                        CampaignName: d.data.Config[f].CampaignName,
    //                                        CampaignId: d.data.Config[f].CampaignId
    //                                    };
    //                                    a.configFormServe.push(g)
    //                            }
    //                        if (selectedItem && "contact_form" == selectedItem.attr("pn-type")) {
    //                            var h = PN_PAGE.getIndexElement(selectedItem.attr("id"));
    //                            apiElement[h].configFormServe = a.configFormServe, c.configFormServe = apiElement[h].configFormServe, c.configFormServe && c.configFormServe.length > 0 && (c.showNodata = "false")
    //                        }
    //                    }
    //                } else {
    //                    var h = PN_PAGE.getIndexElement(selectedItem.attr("id"));
    //                    apiElement[h].configFormServe = [], apiElement[h].formdetailid = ""
    //                }
    //            else PN_PAGE.messageLadi(d.messager)
    //        })
    //    }
    //},
    c.getValueFormApi = function () {
        if (selectedItem && selectedItem.length > 0 && "contact_form" == selectedItem.attr("pn-type")) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (apiElement[a].valueApiForm && apiElement[a].valueApiForm.length > 0) c.valueApiForm = apiElement[a].valueApiForm;
            else {
                apiElement[a].valueApiForm = [];
                var b = selectedItem.find('.widget-element[pn-type="item_form"]');
                b && b.length > 0 && b.each(function () {
                    var b = {
                        name: $(this).find(".widget-content").eq(0).attr("name"),
                        value: $(this).find(".widget-content").eq(0).attr("name")
                    };
                    c.valueApiForm.push(b), apiElement[a].valueApiForm.push(b)
                })
            }
            apiElement[a].urlApi && apiElement[a].urlApi.length > 0 && (c.urlApi = apiElement[a].urlApi)
        }
    },
    c.changeValue = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[d].valueApiForm[b].value = a, c.valueApiForm[b].value = a;
            var e = selectedItem.find('.widget-content[name="' + apiElement[d].valueApiForm[b].name + '"]').parent();
            d = PN_PAGE.getIndexElement(e.attr("id")), apiElement[d].name_form_id = a
        }
    },
    
    c.applyDoneGoogleForm = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].item_form = c.listItemsFormUser, apiElement[a].settingsForm.items = c.listItemsFormUrl;
            for (var b = [], d = 0; d < c.listItemsFormUser.length; d++) {
                var e = {
                    id: c.listItemsFormUser[d].idFormUrl,
                    name: c.listItemsFormUser[d].nameFormUrl,
                    nameFormUser: c.listItemsFormUser[d].name
                };
                b.push(e)
            }
            apiElement[a].item_form = c.listItemsFormUser, apiElement[a].settingsForm.items = c.listItemsFormUrl, apiElement[a].settingsForm.itemsSave = b, selectedItem.attr("pn-action", apiElement[a].settingsForm.action), selectedItem.attr("pn-data-form", JSON.stringify(apiElement[a].settingsForm));
            var e = {
                type: "google-form",
                action: apiElement[a].settingsForm.action,
                data: JSON.stringify(apiElement[a].settingsForm)
            };
            c.configFormClient.push(e), $("#configFormGoogleForm").modal("hide"), popupService.formManagerShow()
        }
    },
    c.applyDoneFormApi = function () {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].urlApi = c.urlApi, apiElement[b].type_form = c.typeForm, selectedItem.attr("pn-type-form", c.typeForm);
            var d = {
                type: "api",
                action: c.urlApi,
                data: JSON.stringify(apiElement[b].settingsForm)
            };
            a.configFormClient.push(d), $("#configFormAPI").modal("hide"), popupService.formManagerShow()
        }
    },
    c.deleteItemFormServe = function (b) {
        a.configFormServe.splice(b, 1), c.configFormServe = a.configFormServe
    },
    c.deleteItemFormClient = function (b) {
        a.configFormClient.splice(b, 1), c.configFormClient = a.configFormClient
    }
}]);