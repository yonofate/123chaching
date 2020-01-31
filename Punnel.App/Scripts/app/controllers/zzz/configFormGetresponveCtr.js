angular.module("punnelApp").controller("configFormGetresponseCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$timeout", "$restful", function (a, b, c, d, e, f, g) {
    c.nameMailC = "", c.apiKeyMailC = "", c.listConfig = [], c.type = "listAccount", c.listCampant = [], c.campainSl = {}, c.accountIdMail = "", c.edit = "false", c.model = {
        contacts: [],
        selected: {}
    },
    //a.$watch(function () {
    //    if (void 0 != selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id") && (c.idTMP = selectedItem.attr("id"), "contact_form" == selectedItem.attr("pn-type"))) {
    //        c.nameMailC = "", c.apiKeyMailC = "", c.listConfig = [], c.listCampant = [], c.accountIdMail = "", c.campainSl = {};
    //        PN_PAGE.getIndexElement(selectedItem.attr("id"));
    //        c.loadListConfig(), c.type = "listAccount"
    //    }
    //}),
    c.backConfig = function () {
        $("#configFormGetresponse").modal("hide"), $("#saveDataForms").modal("show"), c.type = "listAccount"
    }, c.addConfigMailChimp = function () {
        c.nameMailC && c.apiKeyMailC && c.nameMailC.length > 0 && c.apiKeyMailC.length > 0 && ($(".loading").css({
            opacity: "0.4"
        }).show(), g.post("/Config/AddFormConfig", {
            type: 4,
            name: c.nameMailC,
            apikey: c.apiKeyMailC
        }, function (a, b) {
            if (PN_PAGE.loading.hide(), a) PN_PAGE.messageLadi(a);
            else if (b && 200 == b.code) {
                var d = {
                    Config: {
                        Name: c.nameMailC,
                        APIKey: c.apiKeyMailC
                    },
                    id: b.data.id
                };
                c.listConfig.push(d), c.nameMailC = "", c.apiKeyMailC = ""
            } else PN_PAGE.messageLadi(b.messager)
        }))
    }, c.loadListConfig = function () {
        g.post("/Config/FindFormConfigByType", {
            type: 4
        }, function (a, b) {
            a || (b && 200 == b.code ? (c.listConfig = b.data, c.model.contacts = b.data) : PN_PAGE.messageLadi(b.messager))
        })
    }, c.deleteAcc = function (a, b, d) {
        d.preventDefault(), d.stopPropagation(), swal({
            title: "Chú ý",
            type: "warning",
            text: "Xoá API Key sẽ ảnh hưởng đến các Landing Page khác đang sử dụng chung Key này, Bạn có chắc chắn xoá?",
            showCancelButton: !0,
            confirmButtonColor: "#d9534f",
            confirmButtonText: "Xóa",
            cancelButtonText: "Không",
            closeOnConfirm: !0
        }, function (d) {
            d && ($(".loading").css({
                opacity: "0.4"
            }).show(), g.post("/Config/DeleteFormConfig", {
                id: a
            }, function (a, d) {
                $(".loading").css({
                    opacity: "0.4"
                }).hide(), a ? PN_PAGE.messageLadi(a) : d && 200 == d.code ? (c.listConfig.splice(b, 1), c.accountIdMail = "") : PN_PAGE.messageLadi(d.messager)
            }))
        })
    }, c.selectMailc = function (a) {
        "false" == c.edit && ($(".loading").css({
            opacity: "0.4"
        }).show(), g.post("/Config/LoadListData", {
            id: a
        }, function (b, d) {
            PN_PAGE.loading.hide(), b ? PN_PAGE.messageLadi(b) : d && 200 == d.code ? (c.accountIdMail = a, c.type = "listCampain", c.listCampant = d.data) : PN_PAGE.messageLadi(d.messager)
        }))
    }, c.backToAccount = function () {
        c.accountIdMail = "", c.campainSl = {}, c.type = "listAccount"
    }, c.selectCam = function (a, b) {
        $(".list-ac-mail ul li").removeClass("active"), $('.list-ac-mail ul li[pn-active-campain="' + a + '"]').addClass("active"), c.campainSl = {
            id: c.listCampant[b].id,
            name: c.listCampant[b].name
        }
    }, c.applyDone = function () {
        if (c.accountIdMail && c.accountIdMail.length > 0 && c.campainSl && c.campainSl.id && c.campainSl.id.length > 0) {
            var b = {
                Type: 4,
                FormConfigID: c.accountIdMail,
                CampaignName: c.campainSl.name,
                CampaignId: c.campainSl.id
            };
            a.configFormServe || (a.configFormServe = []), a.configFormServe.push(b), $("#configFormGetresponse").modal("hide"), $("#saveDataForms").modal("show"), c.type = "listAccount", c.campainSl = {}
        } else PN_PAGE.messageLadi("Lựa chọn tài khoản và chiến dịch của bạn để tiếp tục!")
    }, c.getTemplate = function (a) {
        return a.id === c.model.selected.id ? "lpeditRes" : "lpdisplayRes"
    }, c.editContact = function (a) {
        c.edit = "true", c.model.selected = angular.copy(a)
    }, c.saveContact = function (a) {
        c.model.contacts[a] = angular.copy(c.model.selected), g.post("/Config/AddFormConfig", {
            formconfigid: c.model.contacts[a].id,
            type: 4,
            name: c.model.contacts[a].Config.Name,
            apikey: c.model.contacts[a].Config.APIKey
        }, function (a, b) {
            a ? PN_PAGE.messageLadi(a) : b && 200 == b.code || PN_PAGE.messageLadi(b.messager)
        }), c.reset()
    }, c.reset = function () {
        c.edit = "false", c.model.selected = {}
    }
}]);