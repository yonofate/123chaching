angular.module("punnelApp").controller("menu_pageTemplateCtr", ["$ladiService", "$auth", "$rootScope", "$state", "$scope", "$translate", "$stateParams", "$window", "APP_CONFIG", "$timeout", "$restful", "APP_CONFIG", function (a, b, c, d, e, f, g, h, i, j, k, APP_CONFIG) {
    f.use(localStorage.getItem("lang"));
    var l;
    dummyData.title || (dummyData.title = "Đặt tiêu đề template"), $(".topbar .current-page .title span").text(dummyData.title), g.id || d.go("dashboard"), e.index = 1, e.showResetMobile = "0";
    var m = new GetDataService;
    e.uid = m.urlParam("uid"), e.name = PN_PAGE.account.fullname, e.user_name = PN_PAGE.account.user_name, e.role = PN_PAGE.account.role, c.$watch(function () {
        e.avatar = c.avatar
    });
    var n = JSON.stringify(apiElement);
    setInterval(function () {
        n != JSON.stringify(apiElement) && (n = JSON.stringify(apiElement),
        k.post("/user", {}, function (a, b) { }))
    }, 6e4), e.showActionPage = function () {
        $(".loading").css({
            opacity: "0.4"
        }).show(), dummyData.arrRule = e.saveRuleGuide();
        for (var a = "1", b = 0; b < apiElement.length; b++) 1 != apiElement[b].mobile && (a = "0");
        "1" == a ? e.publishLadipgeTmp() : (PN_PAGE.loading.hide(), $("#setting-edit-mobile").modal("show"))
    }, e.hideModalEditMobile = function () {
        $("#setting-edit-mobile").modal("hide")
    }, e.continuePublish = function () {
        $("#setting-edit-mobile").modal("hide"), e.publishLadipgeTmp()
    }, e.publishLadipgeTmp = function () {
        $(".loading").css({
            opacity: "0.4"
        }).show(), "wordpress" == dummyData.typePublish || "ftp" == dummyData.typePublish ? ($(".loading").css({
            opacity: "0.4"
        }).hide(), $("#publish").modal("show")) : h.angularControllerPublishLadiTest(), PN_PAGE.showElementEditorText()
    }, e.showEditMobile = function () {
        $("#setting-edit-mobile").modal("hide"), e.editMobile(), $(".action-mobile").removeClass("ng-hide"), e.showResetMobile = "1", deviceEdit = "mobile"
    }, e.addActive = function (a) {
        $(".topbar .active[pn-menu-active]").removeClass("active"), $('.topbar [pn-menu-active="' + a + '"]').addClass("active")
    }, e.editMobile = function () {
        var a = $('.widget-section[pn-popup != "true"]').eq(0);
        a || (a = $(".widget-section").eq(0)), a && a.length > 0 && ($(".reset-mobile li").eq(0).attr("data-original-title", "Sắp xếp lại " + a.attr("id")), $(".reset-mobile li").eq(1).attr("data-original-title", "Ẩn " + a.attr("id")).attr("id-section", a.attr("id"))), e.showResetMobile = "1", PN_PAGE.loading.show(), $(".is-maincontent").addClass("punnel-mobile"), $(".is-maincontent").css({
            "margin-left": "0",
            "padding-left": "0"
        });
        var b = new AddGroup;
        b.removeGroupTmp();
        var c = new OptionWiget;
        c.sortWg(), deviceEdit = "mobile", $('#header .action-screen li[pn-active="drive"]').removeClass("active"), $('#header .action-screen li[pn-menu-active="mobile"]').addClass("active"), $('[data-toggle="tooltip"]').tooltip("hide"), $(".grid-system").addClass("grid-mobile"), $(".aside-setting .widget-item").hide(), $(".widget-section").css({
            margin: "0"
        }), $(".grid-system").hide(), PN_PAGE.showElementEditorText(), $('.widget-section[pn-popup="true"]').hide(), $(".resizable-popup").hide(), e.settingValueMobile(), setTimeout(function () {
            PN_PAGE.loading.hide()
        }, 2e3), $("#punnel-editor .wrap-child").css({
            left: "0px"
        }), $("#punnel-editor .wrap-child .widget-element").css({
            visibility: "visible"
        }), $(".horizontal-guide-container .vertical-guide").removeClass("active"), $(".vertical-guide-container .horizontal-guide").removeClass("active")
    }, e.settingValueMobile = function () {
        PN_PAGE.sortMobilePublish = 0, PN_PAGE.PUNNEL_EDIT.scrollTop(0), deviceEdit = "mobile";
        var a = new OptionWiget;
        a.sortWg(), l = new AjaxPage, TOP_FRAME = PN_PAGE.PUNNEL_EDIT.offset().top, LEFT_FRAME = PN_PAGE.PUNNEL_EDIT.offset().left, a.fixsizeBody(), PN_PAGE.getElement('.widget-element[pn-type="menu-header"][pn-navigation="true"] .widget-content').eq(0).hide(), PN_PAGE.getElement('.widget-element[pn-type="menu-header"][pn-navigation="true"] .widget-content:eq(0) .widget-element').hide(), l.itemMobile(), $(".aside-left .hide-mobile").hide(), $(".aside-left .show-mobile").show(), arrIdOnScreen = [], selectedItem = PN_PAGE.getElement(".widget-section:visible").eq(0), arrIdOnScreen = a.getIdElementOnScreen();
        var b = new setStyleElement;
        if (b.init(apiElement, "mobile"), 30 == typeAddNew) {
            selectedItem = $('#punnel-editor .widget-section[pn-popup="true"]').eq(0), selectedItem.show();
            var d = new ShowBoxResize;
            d.showBoxSection(selectedItem)
        } else selectedItem = void 0;
        c.id = "", $(".rule-desktop").hide(), $(".rule-mobile").show();
        var e = new resetPage;
        e.init()
    }, e.editDesktop = function () {
        e.showResetMobile = "0", $(".action-mobile").addClass("ng-hide"), $(".is-maincontent").removeClass("punnel-mobile");
        var a = new AddGroup;
        a.removeGroupTmp(), deviceEdit = "desktop", $('#header .action-screen li[pn-active="drive"]').removeClass("active"), $('#header .action-screen li[pn-menu-active="desktop"]').addClass("active"), $('[data-toggle="tooltip"]').tooltip("hide"), $(".grid-system").removeClass("grid-mobile"), 1 == preview ? ($(".is-maincontent").attr("style", ""), $(".aside-left").hide()) : ($(".widget-section").css({
            "border-bottom": "1px dashed rgb(6, 21, 40)"
        }), $(".aside-left .hide-mobile").show(), $(".aside-left .show-mobile").hide()), $("#aside-lg .widget-item").hide(), $('.widget-section[pn-popup="true"]').hide(), $(".resizable-popup").hide(), e.settingValueDesktop(), $(".horizontal-guide-container .vertical-guide").removeClass("active"), $(".vertical-guide-container .horizontal-guide").removeClass("active")
    }, e.settingValueDesktop = function () {
        PN_PAGE.PUNNEL_EDIT.scrollTop(0), topScroll = 0, deviceEdit = "desktop", l = new AjaxPage, TOP_FRAME = PN_PAGE.PUNNEL_EDIT.offset().top, LEFT_FRAME = PN_PAGE.PUNNEL_EDIT.offset().left;
        var a = new OptionWiget;
        a.fixsizeBody(), PN_PAGE.getElement('.widget-element[pn-type="menu-header"][pn-navigation="true"] .widget-content').eq(0).show(), PN_PAGE.getElement('.widget-element[pn-type="menu-header"][pn-navigation="true"] .widget-content:eq(0) .widget-element').show(), l.itemDesktop(), arrIdOnScreen = [], selectedItem = PN_PAGE.getElement(".widget-section:visible").eq(0), arrIdOnScreen = a.getIdElementOnScreen();
        var b = new setStyleElement;
        if (b.init(apiElement, "desktop"), 30 == typeAddNew) {
            selectedItem = $('#punnel-editor .widget-section[pn-popup="true"]').eq(0);
            var d = new IframeClick;
            d.addClassSelected(selectedItem), selectedItem.show(), setTimeout(function () {
                var a = new ShowBoxResize;
                a.showBoxSection(selectedItem)
            }, 500)
        } else selectedItem = void 0;
        c.id = "", $(".rule-desktop").show(), $(".rule-mobile").hide();
        var e = new resetPage;
        e.init(), $("#punnel-editor .wrap-child").css({
            left: "0px"
        }), $("#punnel-editor .wrap-child .widget-element").css({
            visibility: "visible"
        })
    }, e.previewLadipage = function (a) {
        preview = !0, $(".aside-left li").removeClass("active"), l = new AjaxPage, l.itemPreview();
        var b = new AddGroup;
        b.removeGroupTmp(), PN_PAGE.showElementEditorText(), $(".aside-left").hide(), $(".aside-setting").hide(), $(".widget-section").css({
            "border-bottom": "0"
        }), $(".widget-section .container").css({
            outline: "0"
        }), $(".is-maincontent").addClass("preview"), $('[data-toggle="tooltip"]').tooltip("hide");
        var c = PN_PAGE.getElement('.widget-element[pn-type="box"], .widget-element[pn-type="image"], .widget-section');
        $(".grid-system").hide(), c.each(function () {
            $(this).droppable("disable")
        }), PN_PAGE.PUNNEL_EDIT.find("a").unbind("click").click(function (a) {
            a.preventDefault()
        }), $('.widget-section[pn-popup="true"]').hide(), $(".resizable-popup").hide(), showAddNewSection(), 30 == typeAddNew && (selectedItem = $('#punnel-editor .widget-section[pn-popup="true"]').eq(0), selectedItem.show())
    }, e.backEdit = function (a) {
        preview = !1, l = new AjaxPage, l.itemBackEdit(), $(".aside-left").show(), $(".aside-setting").show(), "desktop" != deviceEdit && ($(".aside-left .hide-mobile").hide(), $(".aside-left .show-mobile").show()), $(".widget-section .container").css({
            outline: "1px dashed #000"
        }), $(".is-maincontent").removeClass("preview"), $('[data-toggle="tooltip"]').tooltip("hide");
        var b = PN_PAGE.getElement('.widget-element[pn-type="box"], .widget-element[pn-type="image"], .widget-section');
        if (b.each(function () {
                $(this).droppable("enable")
        }), PN_PAGE.PUNNEL_EDIT.find("a").unbind("click").click(function (a) {
                a.preventDefault()
        }), 30 == typeAddNew) {
            selectedItem = $('#punnel-editor .widget-section[pn-popup="true"]').eq(0), selectedItem.show();
            var c = new ShowBoxResize;
            c.showBoxSection(selectedItem)
        }
        showAddNewSection()
    }, e.isRequestSaveAuto = "false", e.timeUpdate = PN_PAGE.account.timeUpdate,
    e.submitTemplate = function () {
        e.saveTemplate(1);
    },
    e.saveTemplate = function (status) {
        dummyData.arrRule = e.saveRuleGuide(), PN_PAGE.account.dayExpired > 0 ? (PN_PAGE.showElementEditorText(), e.isRequestSaveAuto = "false", e.saveTemplateElement(function () { })) : $("#inforupgrade").modal("show")
    }, e.saveTemplateElement = function (a) {
        $(".loading").css({
            opacity: "0.4"
        }).show();
        var b = JSON.stringify(dummyData);
        JSON.stringify(apiDefaultCheck) == JSON.stringify(dummyData.apiElement) ? (e.isRequestSaveAuto = "true", PN_PAGE.messageLadi("Template chưa được chỉnh sửa!"), $(".loading").css({
            opacity: "1"
        }).hide()) : (e.isRequestSaveAuto = "loading", k.put("/template", {
            id: g.id,
            source: b,
            status: status
        }, function (b, c) {
            e.index++, c && 200 == c.code ? (setTimeout(function () {
                var blob ='http://'+ window.location.host + '/#/preview-template/x/' + g.id;
                e.createThumbnail(blob, function () {});
            }, 3e3), e.isRequestSaveAuto = "true", pageSave = !0, $(".loading").css({
                opacity: "1"
            }).hide(), setTimeout(function () {
                e.isRequestSaveAuto = "false"
            }, 5e3), a()) : (c ? PN_PAGE.messageLadi(c.messager) : PN_PAGE.messageLadi("Vui lòng thử lại hoặc liên hệ với chúng tôi!"), $(".loading").css({
                opacity: "1"
            }).hide())
        }))
    }, e.saveLadipage = function (a) {
        PN_PAGE.showElementEditorText(), $(".saving").show(), e.saveTemplateElement(function () { })
    }, e.showManagerFont = function () {
        $("#managerFont").modal("show")
    }, e.setActiveDrive = function (a) {
        $('.topbar .menu li[pn-active="drive"]').removeClass("active"), $('.topbar .menu li[pn-menu-active="' + a + '"]').addClass("active")
    }, e.editUndo = function () {
        if (PN_PAGE.showElementEditorText(), 1 != preview) {
            var a = new EventKey;
            a.undoElement()
        }
    }, e.editRedo = function () {
        if (PN_PAGE.showElementEditorText(), 1 != preview) {
            var a = new EventKey;
            a.redoElement()
        }
    }, e.setActiveMtab = function (a) {
        $("#header .action-setting ul li").removeClass("active"), $("#header .action-setting ul li." + a).addClass("active")
    }, e.showSettingpage = function () {
        popupService.settingManagerShow() , PN_PAGE.showElementEditorText()
    }, e.showUpdateTitleLadipage = function () {
        $("#update-title-page").modal("show"), PN_PAGE.showElementEditorText()
    }, e.goToDashboad = function () {
        pageSave ? (localStorage.setItem("coundReload", 1), d.go("dashboard.template", {
            reload: !0
        })) : swal({
            title: "Lưu ý",
            text: "Chú ý lưu thay đổi trước khi rời khỏi Template Builder",
            type: "warning",
            showCancelButton: !0,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Rời khỏi",
            cancelButtonText: "Ở lại",
            closeOnConfirm: !0
        }, function () {
            selectedItem = void 0, localStorage.setItem("coundReload", 1), d.go("dashboard.template", {
                reload: !0
            })
        })
    }, e.logout = function () {
        k.post("/User/logout", {}, function (a, c) {
            b.clearUser(), d.go("auth.login")
        })
    }, e.showHotro = function () {
        $("#support-ladi").modal("show")
    }, e.sortMobile = function () {
        var a = new OptionWiget;
        a.sortWg();
        for (var b = new SortElementMobile, c = 0; c < apiElement.length; c++) apiElement[c].sortmobile = 0, apiElement[c].mobile = 0;
        PN_PAGE.sortMobilePublish = 1, b.sortItem(), b.sortFormHightToLow("desktop");
        var d = PN_PAGE.getElement(".widget-section");
        d.each(function () {
            var a = new ResizeSection;
            a.setHeightSection($(this))
        }), $("#resizable-element").hide()
    }, e.idPreview = g.id, e.previewPage = function () {
        e.saveTemplateElement(function () {
            d.go("preview-template", {
                id: g.id
            }, {
                newtab: !0
            }), window.open(url, "_blank")
        })
    }, e.saveRuleGuide = function () {
        var a = $(".vertical-guide"),
            b = $(".horizontal-guide"),
            c = {
                rulerVer: [],
                rulerHor: [],
                status: "show"
            };
        return a && a.length > 0 && a.each(function (a) {
            if (0 != a) {
                var b = {
                    "class": $(this).attr("class"),
                    top: $(this).css("top")
                };
                c.rulerVer.push(b)
            }
        }), b && b.length > 0 && b.each(function (a) {
            if (0 != a) {
                var b = {
                    "class": $(this).attr("class"),
                    left: $(this).css("left")
                };
                c.rulerHor.push(b)
            }
        }), "none" == $(".vertical-line").css("display") && (c.status = "hide"), c
    }, e.showHistory = function () {
        console.log('type:' + PN_PAGE.account.type);
        2 != PN_PAGE.account.type && 3 != PN_PAGE.account.type ? swal({
            title: "Thông báo ",
            text: "Nâng cấp gói dịch vụ để sử dụng tính năng này!",
            showCancelButton: !0,
            confirmButtonColor: "#009FE3",
            confirmButtonText: "Nâng cấp",
            cancelButtonText: "Không",
            closeOnConfirm: !0
        }, function (a) {
            a && $("#inforupgrade").modal("show")
        }) : $("#managerHistory").modal("show")
    },
    e.screenUrlToimageBase = function (a, iter) {
        var rv = "";
        rv = -1 == a.search("http") ? "http://" + a : a;
        $.ajax({
            url: APP_CONFIG.URL_SCREENSHOT + rv + "&screenshot=true",
            context: this,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var c = data.screenshot.data.replace(/_/g, "/").replace(/-/g, "+");
                var latLimit = "data:image/png;base64," + c;
                iter(null, {
                    base64: latLimit
                });
            }
        });
    },
    e.createThumbnail = function (item, container) {
        if (dummyData.imagePage.indexOf(apiStaticDefault) < 0 || !(dummyData.imagePage && dummyData.imagePage.length > 0)) {
            e.screenUrlToimageBase(item, function (a, data) {
                $restful.post("/thumb", {
                    code: data.base64,
                    fileName: $stateParams.id,
                    type: 2
                }, function (a, data) {
                    if (data && data.data && 200 == data.code) {
                        dummyData.imagePage = data.data;
                        //$("#settingPage .image-page").attr("src", data.data);
                    }
                });
            });
        }
    };
}]);