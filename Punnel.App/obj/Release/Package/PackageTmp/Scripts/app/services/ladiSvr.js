angular.module("punnelApp").service("$ladiService", ["$http", "$resource", "$localStorage", "$restful", "$state", function ($http, $resource, $localStorage, $restful, $state) {
    return {
        createProject: function (cid, origin_template, type, role) {
            var className = type;
            if ("editor" != role) {
                className = 0;
            }
            new Date;
            if (0 == className && "editor" != role || 0 != className && "editor" == role && cid.length > 0) {
                $restful.post("/landingpage", {
                    name: "Landing Page ch\u01b0a c\u00f3 ti\u00eau \u0111\u1ec1",
                    type: className + "",
                    templateid: origin_template,
                    cid: cid
                }, function (status, response) {
                    if (response && response.data && 200 == response.code) {
                        if ("TYPE_ERROR" != response.data) {
                            if (PN_PAGE.getCookie("cloneTemplate") && PN_PAGE.getCookie("cloneTemplate").length > 0) {
                                PN_PAGE.deleteCookie("cloneTemplate");
                            }
                            setTimeout(function () {
                                ApiBase + "/#/editor/" + response.data.id;
                                $state.go("editor", {
                                    id: response.data.id,
                                    type: 'p'
                                }, "_top");
                            }, 1e3);
                        } else {
                            PN_PAGE.showMessage("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!", 'error');
                        }
                    } else {
                        if (response) {
                            PN_PAGE.showMessage(response.messager);
                        } else {
                            PN_PAGE.showMessage("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!", 'error');
                        }
                    }
                });
            } else {
                PN_PAGE.showMessage("Vui l\u00f2ng ch\u1ecdn danh m\u1ee5c tr\u01b0\u1edbc khi t\u1ea1o m\u1edbi", 'error');
            }
        },
        sortElementMobile: function () {
            $(".is-maincontent").addClass("punnel-mobile");
            $(".is-maincontent").css({
                "margin-left": "0",
                "padding-left": "0"
            });
            var group = new AddGroup;
            group.removeGroupTmp();
            var option = new OptionWiget;
            option.sortWg();
            deviceEdit = "mobile";
            $('#header .action-screen li[pn-active="drive"]').removeClass("active");
            $('#header .action-screen li[pn-menu-active="mobile"]').addClass("active");
            $('[data-toggle="tooltip"]').tooltip("hide");
            $(".grid-system").addClass("grid-mobile");
            $(".grid-system").hide();
            $(".aside-setting .widget-item").hide();
            $(".widget-section").css({
                margin: "0"
            });
            PN_PAGE.showElementEditorText();
            $('.widget-section[pn-popup="true"]').hide();
            $(".resizable-popup").hide();
            PN_PAGE.sortMobilePublish = 0;
            PN_PAGE.PUNNEL_EDIT.scrollTop(0);
            deviceEdit = "mobile";
            option.sortWg();
            var ajaxPage = new AjaxPage;
            TOP_FRAME = PN_PAGE.PUNNEL_EDIT.offset().top;
            LEFT_FRAME = PN_PAGE.PUNNEL_EDIT.offset().left;
            option.fixsizeBody();
            PN_PAGE.getElement('.widget-element[pn-type="menu-header"][pn-navigation="true"] .widget-content').eq(0).hide();
            PN_PAGE.getElement('.widget-element[pn-type="menu-header"][pn-navigation="true"] .widget-content:eq(0) .widget-element').hide();
            ajaxPage.itemMobile();
            $(".aside-left .hide-mobile").hide();
            $(".aside-left .show-mobile").show();
            arrIdOnScreen = [];
            selectedItem = PN_PAGE.getElement(".widget-section:visible").eq(0);
            arrIdOnScreen = option.getIdElementOnScreen();
            var buttons = new setStyleElement;
            if (buttons.init(apiElement, "mobile"), 30 == typeAddNew) {
                selectedItem = $('#punnel-editor .widget-section[pn-popup="true"]').eq(0);
                selectedItem.show();
                var viewModel = new ShowBoxResize;
                viewModel.showBoxSection(selectedItem);
            } else {
                selectedItem = void 0;
            }
            var BDA = new resetPage;
            BDA.init();
        },
        sortElementDesktop: function () {
            $(".is-maincontent").removeClass("punnel-mobile");
            var a = new AddGroup;
            a.removeGroupTmp();
            deviceEdit = "desktop";
            $('#header .action-screen li[pn-active="drive"]').removeClass("active");
            $('#header .action-screen li[pn-menu-active="desktop"]').addClass("active");
            $('[data-toggle="tooltip"]').tooltip("hide");
            $(".grid-system").removeClass("grid-mobile");
            if (1 == preview) {
                $(".is-maincontent").attr("style", "");
                $(".aside-left").hide();
            } else {
                $(".widget-section").css({
                    "border-bottom": "1px dashed rgb(6, 21, 40)"
                });
                $(".aside-left .hide-mobile").show();
                $(".aside-left .show-mobile").hide();
            }
            $("#aside-lg .widget-item").hide();
            $('.widget-section[pn-popup="true"]').hide();
            $(".resizable-popup").hide();
            PN_PAGE.PUNNEL_EDIT.scrollTop(0);
            topScroll = 0;
            deviceEdit = "desktop";
            var ajaxPage = new AjaxPage;
            TOP_FRAME = PN_PAGE.PUNNEL_EDIT.offset().top;
            LEFT_FRAME = PN_PAGE.PUNNEL_EDIT.offset().left;
            var c = new OptionWiget;
            c.fixsizeBody();
            PN_PAGE.getElement('.widget-element[pn-type="menu-header"][pn-navigation="true"] .widget-content').eq(0).show();
            PN_PAGE.getElement('.widget-element[pn-type="menu-header"][pn-navigation="true"] .widget-content:eq(0) .widget-element').show();
            ajaxPage.itemDesktop();
            arrIdOnScreen = [];
            selectedItem = PN_PAGE.getElement(".widget-section:visible").eq(0);
            arrIdOnScreen = c.getIdElementOnScreen();
            var pack = new setStyleElement;
            if (pack.init(apiElement, "desktop"), 30 == typeAddNew) {
                selectedItem = $('#punnel-editor .widget-section[pn-popup="true"]').eq(0);
                var viewModel = new IframeClick;
                viewModel.addClassSelected(selectedItem);
                selectedItem.show();
                setTimeout(function () {
                    var viewModel = new ShowBoxResize;
                    viewModel.showBoxSection(selectedItem);
                }, 500);
            } else {
                selectedItem = void 0;
            }
            var BDA = new resetPage;
            BDA.init();
        }
    };
}]);
