angular.module("punnelApp").controller("MainEditorCtrl", ["$rootScope", "$scope", "$state", "editorSvr", "$timeout", "$translate", "$stateParams", "$window", "APP_CONFIG", function (a, b, c, d, e, f, g, h, i) {
    -1 != h.location.href.search("editor/#") && (h.location.href = i.URL_EDITOR), b.changeLanguage = function (a) {
        f.use(a), localStorage.setItem("lang", a)
    }, void 0 == localStorage.getItem("lang") && localStorage.setItem("lang", "vi"), f.use(localStorage.getItem("lang")), b.showEditSection = function () {
        void 0 !== selectedItem && selectedItem.length > 0 && ($(".settings").removeClass("active"), $(".advanced").hide(), $('.advanced[pn-setting="custom-background"]').show(), $('.advanced[pn-setting="custom-background"] .pn-content-settings').show(), $('.advanced[pn-setting="custom-overlay"]').show(), $('.advanced[pn-setting="custom-overlay"] .pn-content-settings').show(), $(".toolbar").show(), $('.settings[pn-setting="custom-event"]').addClass("active"), $('.settings[pn-setting="custom-event"] .event-tab .button').removeClass("active"), $('.settings[pn-setting="custom-event"] .event-tab .button[pn-active="list"]').addClass("active"), $('.settings[pn-setting="custom-event"] .list-tab-event').hide(), $('.settings[pn-setting="custom-event"] .list-tab-event[pn-content="list"]').show())
    }, b.showAnimateSection = function () {
        $(".settings").removeClass("active")
    }, b.moveSecTop = function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-section")) {
            var a = new BoxRightClick;
            a.moveTop(), pageSave = !1
        }
    }, b.exitPopup = function () {
        var a = PN_PAGE.getElement("#" + $(".resizable-popup").attr("pn-id-popup"));
        if (void 0 != a && a.length > 0) {
            a.hide();
            var b = new OptionWiget;
            b.addElementUndo("", a), $(".resizable-popup").hide(), $("#resizable-element").hide(), selectedItem = void 0
        }
    }, b.moveSecBottom = function () {
        if (void 0 != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-section")) {
            var a = new BoxRightClick;
            a.moveBottom(), pageSave = !1
        }
    }, b.showEditSec = function () {
        $('.settings[pn-setting="custom-event"]').addClass("active"), $('.settings[pn-setting="custom-event"] .event-tab .button').removeClass("active"), $('.settings[pn-setting="custom-event"] .event-tab .button[pn-active="list-position"]').addClass("active"), $('.settings[pn-setting="custom-event"] .list-tab-event').hide(), $('.settings[pn-setting="custom-event"] .list-tab-event[pn-content="list-position"]').show(), $('.settings[pn-setting="custom-event"] .list-tab-event[pn-content="list-position"] .item').show()
    }, b.deleteElementSection = function () {
        if (selectedItem) {
            var a = new BoxRightClick;
            a.boxRightDelete()
        }
    };
    var j = this;
    j.dbClickElement = function (a) {
        if (void 0 != selectedItem && selectedItem.length > 0) {
            var b, c;
            switch (c = selectedItem.attr("pn-type")) {
                case "slide_show":
                    h.angularControllerDbclickSlideShow();
                    break;
                case "image":
                    break;
                case "shape":
                    h.angularControllerDbClickShape();
                    break;
                case "textsymbol":
                    b = new BoxResizeClick, b.dbClickBox(a);
                    break;
                case "textinline":
                    b = new BoxResizeClick, b.dbClickBox(a);
                    break;
                case "button":
                    b = new BoxResizeClick, b.dbClickBox(a);
                    break;
                case "textparagraph":
                    b = new BoxResizeClick, b.dbClickBox(a)
            }
        }
    }, j.showCustomSection = function () {
        b.showEditSection()
    }, h.angularControllerDbClickElement = j.dbClickElement, h.angularControllerShowEditSection = j.showCustomSection
}]);