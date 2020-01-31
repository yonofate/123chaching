
angular.module("punnelApp").controller("addUrlFormGoogleCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", "$restful", function (a, b, c, d, e, f, g) {
    c.idTMP = "", c.arrWgsection = [], c.email = PN_PAGE.account.email, c.itemTracksfrom = itemTracking, c.tabShow = "bieu-mau", c.dataSheet = "false", c.idConfigGoogleSheetSelected = "", c.idFolderGoogleSheetSelected = "", c.emailGoogleSheetSelected = "", c.listEmailGoogleSheet = [], c.listSheetWithEmail = [], c.idSheetSelected = "", c.nameSheet = "", c.vtIdConfig = 0, c.searchSheet = "", c.stateSheet = "", c.hideGoogleForm = "false", c.valueApiForm = [], c.urlApi = "";
    var h = setInterval(function () {
        c.email ? clearInterval(h) : c.email = PN_PAGE.account.email
    }, 1e3);
    a.$watch(function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id") && (c.idTMP = selectedItem.attr("id"), "contact_form" == selectedItem.attr("pn-type"))) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.idConfigGoogleSheetSelected = apiElement[a].idConfigGoogleSheetSelected, c.idFolderGoogleSheetSelected = apiElement[a].idFolderGoogleSheetSelected, c.emailGoogleSheetSelected = apiElement[a].emailGoogleSheetSelected, c.idSheetSelected = apiElement[a].idSheetSelected, c.idSheetSelected || (c.idSheetSelected = ""), c.emailGoogleSheetSelected || (c.emailGoogleSheetSelected = ""), c.idFolderGoogleSheetSelected || (c.idFolderGoogleSheetSelected = ""), c.idConfigGoogleSheetSelected || (c.idConfigGoogleSheetSelected = ""), c.urlPost = apiElement[a].url_form_google, c.messageThanks = apiElement[a].message_form_post, c.urlEmail = apiElement[a].actionEmail, c.typeForm = apiElement[a].type_form, c.saveForm = apiElement[a].saveForm, c.typeForm && c.typeForm.length > 0 ? "google" == c.typeForm && (c.hideGoogleForm = "true") : (c.hideGoogleForm = "true", apiElement[a].type_form = "google-sheet", c.typeForm = "google-sheet"), c.messageThanks || (c.messageThanks = "Cám ơn bạn đã quan tâm", apiElement[a].message_form_post = "Cám ơn bạn đã quan tâm"), c.tracking = apiElement[a].tracking, c.tracking || (apiElement[a].tracking = ""), void 0 == c.urlPost && (c.urlPost = "", apiElement[a].url_form_google = ""), void 0 == apiElement[a].settingsForm && (apiElement[a].settingsForm = {}), c.idPopupSub = apiElement[a].idPopupSub, c.idPopupSub || (c.idPopupSub = ""), c.urlSubmit = apiElement[a].urlSubmit, c.urlSubmit || (c.urlSubmit = ""), c.nameMailchimp = apiElement[a].nameMailchimp, c.nameMailchimp || (c.nameMailchimp = ""), c.apiKeyGetresponse = apiElement[a].apiKeyGetresponse, c.apiKeyGetresponse || (c.apiKeyGetresponse = ""), c.nameGetresponse = apiElement[a].nameGetresponse, c.nameGetresponse || (c.nameGetresponse = ""), c.idListUser = apiElement[a].idListUser, c.idListUser || (c.idListUser = ""), c.listItemsFormUser = apiElement[a].item_form, c.listItemsFormUrl = apiElement[a].settingsForm.items, c.listItemsFormUrlSave = [], c.valueSelectItemForm = "", c.arrWgsection = c.getItemWgSection();
            var b = $("#tracking-form-value textarea");
            b.val(c.tracking), "google-sheet" == c.typeForm && c.loadListConfigGoogleSheet(), c.getValueFormApi()
        }
    }), c.dem = 0, c.updateUrlSubmit = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].urlSubmit = c.urlSubmit
        }
    }, c.setValueIdPopupSub = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            c.idPopupSub = a;
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].idPopupSub = c.idPopupSub
        }
    }, c.setTypeForm = function (a) {
        selectedItem && selectedItem.length > 0 && (c.typeForm = a, "google-sheet" == a && c.loadListConfigGoogleSheet())
    }, c.updateMessageFrom = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].message_form_post = c.messageThanks, selectedItem.attr("pn-message-form", c.messageThanks)
        }
    }, c.changeValueSelect = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            for (var d = PN_PAGE.getIndexElement(selectedItem.attr("id")), e = 0; e < c.listItemsFormUrl.length; e++)
                if (c.listItemsFormUrl[e].id == a) {
                    c.listItemsFormUser[b].idFormUrl = c.listItemsFormUrl[e].id, c.listItemsFormUser[b].nameFormUrl = c.listItemsFormUrl[e].name, c.listItemsFormUrl[e].nameFormUser = c.listItemsFormUser[b].name, apiElement[d].item_form = c.listItemsFormUser, apiElement[d].settingsForm.items = c.listItemsFormUrl;
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
    }, c.applyDone = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            switch (c.typeForm) {
                case "email":
                    c.urlEmail && c.urlEmail.length > 0 ? (apiElement[a].actionEmail = c.urlEmail, apiElement[a].type_form = c.typeForm, selectedItem.attr("pn-type-form", c.typeForm), $("#my-modal-send-form").modal("hide"), $("#bieumaucu").modal("hide"), PN_PAGE.messageLadi("Bạn đã sử dụng email " + apiElement[a].actionEmail + " để lưu trữ dữ liệu")) : PN_PAGE.messageLadi("Vui lòng nhập email để nhận thông tin dữ liệu!");
                    break;
                case "google":
                    for (var b = [], d = 0; d < c.listItemsFormUser.length; d++) {
                        var f = {
                            id: c.listItemsFormUser[d].idFormUrl,
                            name: c.listItemsFormUser[d].nameFormUrl,
                            nameFormUser: c.listItemsFormUser[d].name
                        };
                        b.push(f)
                    }
                    apiElement[a].item_form = c.listItemsFormUser, apiElement[a].settingsForm.items = c.listItemsFormUrl, apiElement[a].settingsForm.itemsSave = b, selectedItem.attr("pn-action", apiElement[a].settingsForm.action), selectedItem.attr("pn-data-form", JSON.stringify(apiElement[a].settingsForm)), apiElement[a].settingsForm.action && apiElement[a].settingsForm.action.length > 0 && JSON.stringify(apiElement[a].settingsForm) && JSON.stringify(apiElement[a].settingsForm).length > 0 ? (apiElement[a].type_form = c.typeForm, selectedItem.attr("pn-type-form", c.typeForm), $("#my-modal-send-form").modal("hide"), $("#bieumaucu").modal("hide"), PN_PAGE.messageLadi("Bạn đã sử dụng google form để lưu trữ dữ liệu")) : PN_PAGE.messageLadi("Vui lòng đồng bộ form google để lưu trữ dữ liệu");
                    break;
                case "google-sheet":
                    apiElement[a].idConfigGoogleSheetSelected && apiElement[a].idConfigGoogleSheetSelected.length > 0 && apiElement[a].idSheetSelected.id && apiElement[a].idSheetSelected.id.length > 0 ? g.post("/UserConfig/AddConfigDetail", {
                        configid: apiElement[a].idConfigGoogleSheetSelected,
                        formid: selectedItem.attr("id"),
                        punnelid: e.id,
                        type: 9,
                        sheetid: apiElement[a].idSheetSelected.id
                    }, function (a, b) {
                        if (b && 200 == b.code) {
                            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                            apiElement[d].type_form = c.typeForm, selectedItem.attr("pn-type-form", c.typeForm), apiElement[d].idSheetPublish = b.data.id, $("#my-modal-send-form").modal("hide"), $("#bieumaucu").modal("hide"), PN_PAGE.messageLadi("Bạn đã sử dụng Goole Sheet để lưu trữ dữ liệu")
                        } else b ? PN_PAGE.messageLadi(b.messager) : PN_PAGE.messageLadi("Chưa lưu được, vui lòng thử lại hoặc liên hệ với chúng tôi!")
                    }) : apiElement[a].idConfigGoogleSheetSelected ? apiElement[a].idSheetSelected.id ? PN_PAGE.messageLadi("Bạn đã sử dụng Goole Sheet để lưu trữ dữ liệu") : PN_PAGE.messageLadi("Vui lòng lựa chọn bảng tính") : PN_PAGE.messageLadi("Vui lòng kết nối tài khoản Google của bạn");
                    break;
                case "api":
                    if (c.urlApi && c.urlApi.length > 0 && c.valueApiForm && c.valueApiForm.length > 0) {
                        for (var h = !0, d = 0; d < c.valueApiForm.length; d++) c.valueApiForm[d].value || (h = !1);
                        h ? (apiElement[a].urlApi = c.urlApi, apiElement[a].type_form = c.typeForm, selectedItem.attr("pn-type-form", c.typeForm), $("#my-modal-send-form").modal("hide"), $("#bieumaucu").modal("hide"), PN_PAGE.messageLadi("Bạn đã sử dụng link xử lý lưu trữ dữ liệu riêng của bạn!")) : PN_PAGE.messageLadi("Vui lòng điền đầy đủ biến nhận dữ liệu của bạn!")
                    } else c.urlApi ? c.valueApiForm || PN_PAGE.messageLadi("Vui lòng điền biến nhận dữ liệu của bạn!") : PN_PAGE.messageLadi("Vui lòng điền link trang xử lý dữ liệu của bạn!")
            }
            apiElement[a].idPopupSub = c.idPopupSub, $("#bieumaucu").modal("hide"), $("#saveDataForms").modal("show")
        }
    }, c.changeUrlPost = function () {
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
    }, c.changeValueUrlPost = function () {
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
    }, c.setTracking = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = $("#tracking-form-value textarea");
            c.tracking = a.val();
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[b].tracking = c.tracking
        }
    }, c.addTrackingForm = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            c.tracking += c.itemTracksfrom[a].value + "\n";
            var b = $("#tracking-form-value textarea");
            b.val(c.tracking);
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[d].tracking = c.tracking
        }
    }, c.getItemWgSection = function () {
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
    }, c.changeValueNameMailchimp = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].nameMailchimp = c.nameMailchimp
        }
    }, c.changeValueApiKeyGetresponse = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].apiKeyGetresponse = c.apiKeyGetresponse
        }
    }, c.changeValueNameGetresponse = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[a].nameGetresponse = c.nameGetresponse
        }
    }, c.createNewPopup = function () {
        selectedItem && selectedItem.length > 0 && (PN_PAGE.idShowPopup = selectedItem.attr("id"), $("#modal-add-popup").modal("show"), $("#my-modal-send-form").modal("hide"), $("#bieumaucu").modal("hide"))
    }, c.showPopUp = function (b) {
        var c = $("#punnel-editor #" + b);
        if (c && c.length > 0) {
            $('.widget-section[pn-popup="true"]').hide();
            var d = new IframeClick;
            $("#my-modal-send-form").modal("hide"), $("#bieumaucu").modal("hide"), $("#punnel-editor .selected").removeClass("selected"), $("#resizable-element").hide(), $("#resizable-section").hide(), selectedItem = c, selectedItem.addClass("selected").show(), d.addClassSelected(selectedItem), a.id = b;
            var e = new ShowBoxResize;
            e.showBoxSection(selectedItem)
        }
    }, c.setValueListUser = function (a) {
        c.idListUser = a
    }, c.managerMailchimp = function () {
        $("#modal-manager-mailchimp").modal("show"), $("#my-modal-send-form").modal("hide")
    }, c.showTab = function (a) {
        c.tabShow = a
    }, c.fnSelectedEmailGoogleSheet = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.idConfigGoogleSheetSelected = c.listEmailGoogleSheet[a].id, c.idFolderGoogleSheetSelected = c.listEmailGoogleSheet[a].Config.FolderID, c.emailGoogleSheetSelected = c.listEmailGoogleSheet[a].Config.Email, c.listSheetWithEmail = c.listEmailGoogleSheet[a].Data, apiElement[b].idConfigGoogleSheetSelected = c.idConfigGoogleSheetSelected, apiElement[b].idFolderGoogleSheetSelected = c.idFolderGoogleSheetSelected, apiElement[b].emailGoogleSheetSelected = c.emailGoogleSheetSelected, c.idConfigGoogleSheetSelected && c.idConfigGoogleSheetSelected.length > 0 ? c.refreshSheet() : c.loadListConfigGoogleSheet(), c.stateSheet = "sheet"
        }
    }, c.getAuthGoogleSheet = function () {
        PN_PAGE.setCookie("googleSheetIdUser", PN_PAGE.account.id, 60), localStorage.setItem("googleSheetIdUser", PN_PAGE.account.id), g.get("/Auth/GoogleSheets", {}, function (a, b) {
            if (a) PN_PAGE.messageLadi("Vui lòng thử lại hoặc liên hệ với chúng tôi!");
            else if (b && 200 == b.code) var d = screen.width / 2 - 200,
                e = screen.height / 2 - 275,
                f = window.open(b.data, "myWindow", "width=400, height=550, left=" + d + ", top=" + e),
                h = setInterval(function () {
                    localStorage.getItem("googleSheetId") && localStorage.getItem("googleSheetId").length > 0 && localStorage.getItem("googleSheetEmail") && localStorage.getItem("googleSheetEmail").length > 0 && localStorage.getItem("googleSheetFolderID") && localStorage.getItem("googleSheetFolderID").length > 0 && (c.stateSheet = "emailSheet", "complete" == localStorage.getItem("googleSheetId") ? (f.close(), clearInterval(h), c.loadListConfigGoogleSheet()) : (c.idConfigGoogleSheetSelected = localStorage.getItem("googleSheetId"), c.idFolderGoogleSheetSelected = localStorage.getItem("googleSheetFolderID"), c.emailGoogleSheetSelected = localStorage.getItem("googleSheetEmail"), f.close(), clearInterval(h), localStorage.removeItem("googleSheetEmail"), localStorage.removeItem("googleSheetFolderID"), localStorage.removeItem("googleSheetId"), PN_PAGE.deleteCookie("googleSheetIdUser"), localStorage.removeItem("googleSheetIdUser"), g.get("/user", {
                        type: 9,
                        status: 1
                    }, function (a, b) {
                        b && 200 == b.code ? (c.listEmailGoogleSheet = b.data, c.idSheetSelected = "") : 503 == b.code && $("#reLogin").modal("show")
                    })))
                }, 1e3);
            else b ? PN_PAGE.messageLadi(b.messager) : PN_PAGE.messageLadi("Vui lòng thử lại hoặc liên hệ với chúng tôi!")
        })
    }, c.loadListConfigGoogleSheet = function () {
        "none" != $("#bieumaucu").css("display") && "" != c.stateSheet && $(".loading").css({
            opacity: "0.4"
        }).show(), localStorage.removeItem("googleSheetEmail"), localStorage.removeItem("googleSheetFolderID"), localStorage.removeItem("googleSheetId"), g.get("/user", {
            type: 9,
            status: 1
        }, function (a, b) {
            if ($(".loading").css({
                opacity: "1"
            }).hide(), a) "none" != $("#bieumaucu").css("display") && "" != c.stateSheet && PN_PAGE.messageLadi("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ với chúng tôi"), c.listEmailGoogleSheet = [], c.stateSheet = "";
            else if (b && 200 == b.code) {
                c.listEmailGoogleSheet = b.data;
                var d = c.checkValueEmail(b.data, c.emailGoogleSheetSelected);
                if (d) {
                    c.stateSheet = "sheet";
                    var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                    c.idConfigGoogleSheetSelected = d.id, c.idFolderGoogleSheetSelected = c.listEmailGoogleSheet[d.vt].Config.FolderID, c.emailGoogleSheetSelected = c.listEmailGoogleSheet[d.vt].Config.Email, c.listSheetWithEmail = c.listEmailGoogleSheet[d.vt].Data, apiElement[e].idConfigGoogleSheetSelected = c.idConfigGoogleSheetSelected, apiElement[e].idFolderGoogleSheetSelected = c.idFolderGoogleSheetSelected, apiElement[e].emailGoogleSheetSelected = c.emailGoogleSheetSelected, c.refreshSheet()
                } else b.data && b.data.length > 0 ? (c.emailGoogleSheetSelected = b.data[0].Config.Email, c.stateSheet = "emailSheet") : c.stateSheet = ""
            } else c.listEmailGoogleSheet = [], c.stateSheet = "", b ? 503 == b.code ? $("#reLogin").modal("show") : "none" != $("#bieumaucu").css("display") && "" != c.stateSheet && PN_PAGE.messageLadi(b.messager) : "none" != $("#bieumaucu").css("display") && "" != c.stateSheet && PN_PAGE.messageLadi("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ với chúng tôi")
        })
    }, c.createSheet = function () {
        "none" != $("#bieumaucu").css("display") && $(".loading").css({
            opacity: "0.4"
        }).show(), c.nameSheet && c.nameSheet.length > 0 && c.idConfigGoogleSheetSelected && c.idConfigGoogleSheetSelected.length > 0 ? ($("#bieumaucu button").attr("disabled", "true"), g.post("/UserConfig/CreateGoogleSheets", {
            configid: c.idConfigGoogleSheetSelected,
            name: c.nameSheet
        }, function (a, b) {
            if ($("#bieumaucu button").removeAttr("disabled"), $(".loading").css({
                opacity: "1"
            }).hide(), a) PN_PAGE.messageLadi("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ với chúng tôi");
            else if (b && 200 == b.code) {
                if (c.nameSheet = "", c.idSheetSelected = b.data, c.listSheetWithEmail.unshift(b.data), selectedItem && selectedItem.length > 0) {
                    var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                    apiElement[d].idSheetSelected = c.idSheetSelected
                }
            } else b ? PN_PAGE.messageLadi(b.messager) : PN_PAGE.messageLadi("Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ với chúng tôi")
        })) : (PN_PAGE.messageLadi("Không được để tên trống!"), $(".loading").css({
            opacity: "1"
        }).hide())
    }, c.fnSetSheetSelect = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.idSheetSelected = a, apiElement[b].idSheetSelected = c.idSheetSelected
        }
    }, c.searchSheetItem = function () {
        if ("" != c.searchSheet && c.searchSheet.length > 0) {
            var a = $("#bieumaucu .list-sheet-connect div");
            a.hide(), $('#bieumaucu .list-sheet-connect div[pn-search*="' + c.searchSheet.toUpperCase() + '"]').show()
        } else $("#bieumaucu .list-sheet-connect div").show()
    }, c.backSelectEmailGoogleSheet = function () {
        c.emailGoogleSheetSelected = "", c.loadListConfigGoogleSheet(), c.stateSheet = "emailSheet"
    }, c.refreshSheet = function () {
        "none" != $("#bieumaucu").css("display") && $(".loading").css({
            opacity: "0.4"
        }).show(), g.get("/UserConfig/LoadGoogleSheets", {
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
    }, c.checkValueEmail = function (a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c].Config.Email == b) return {
                id: a[c].id,
                vt: c
            };
        return !1
    }, c.checkValueGoogleSheet = function (a, b) {
        for (var c = 0; c < a.length; c++)
            if (a[c].id == b) return {
                id: a[c].id,
                vt: c
            };
        return !1
    }, c.getValueFormApi = function () {
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
    }, c.changeValue = function (a, b) {
        if (selectedItem && selectedItem.length > 0) {
            var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[d].valueApiForm[b].value = a, c.valueApiForm[b].value = a;
            var e = selectedItem.find('.widget-content[name="' + apiElement[d].valueApiForm[b].name + '"]').parent();
            d = PN_PAGE.getIndexElement(e.attr("id")), apiElement[d].name_form_id = a
        }
    }, c.showConfig = function (a) {
        $("#" + a).modal("show"), $("#saveDataForms").modal("hide")
    }, c.backConfig = function () {
        $("#bieumaucu").modal("hide"), $("#saveDataForms").modal("show")
    }
}]);