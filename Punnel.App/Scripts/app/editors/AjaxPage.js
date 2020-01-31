var AjaxPage = function() {};
AjaxPage.prototype.init = function () { },
AjaxPage.prototype.itemDesktop = function () {
    TOP_FRAME = PN_PAGE.PUNNEL_EDIT.top, LEFT_FRAME = 0, deviceEdit = "desktop", $(".aside-left .hide-mobile").show(), $(".aside-left .show-mobile").hide(), $(".x-guide").css({
        left: "51px"
    }), $("#x-guide").css({
        left: "51px"
    }), $("#resizable-element").hide(), $("#resizable-section").hide();
    var a = new SortElementMobile;
    a.setCssElement("desktop");
    var b = new setStyleElement;
    b.init(apiElement, "desktop");
    var c = new OptionWiget;
    c.sortWg()
}, 
AjaxPage.prototype.itemMobile = function() {
    deviceEdit = "mobile", TOP_FRAME = PN_PAGE.PUNNEL_EDIT.offset().top, LEFT_FRAME = PN_PAGE.PUNNEL_EDIT.offset().left, $(".extra").removeClass("active"), $("#resizable-element").hide(), $("#resizable-section").hide();
    var a = new SortElementMobile;
    a.sortItem(), a.sortFormHightToLow("desktop");
    var b = new OptionWiget;
    b.sortWg(), b.fixsizeBody()
},
AjaxPage.prototype.itemPreview = function () {
    $(".settings").removeClass("active"), $(".draggable-x").hide(), $(".draggable-y").hide(), $("#resizable-section").hide(), $(".flo").hide(), $(".hide_preview").hide(), $(".topbar .show_preview").attr("style", "display:block!important"), PN_PAGE.getElement(".widget-section").css({
        border: "0px"
    }), PN_PAGE.getElement(".widget-dragg").css({
        cursor: "auto"
    }), PN_PAGE.getElement(".widget-element").removeClass("widget-dragg ui-draggable ui-draggable-handle"), preview = !0, $("#resizable-element").hide()
},
AjaxPage.prototype.itemBackEdit = function () {
    PN_PAGE.getElement(".widget-element").unbind("click"), $(".draggable-x").show(), $(".draggable-y").show(), $(".flo").show(), $(".hide_preview").show(), $(".topbar .show_preview").attr("style", "display:none!important"), $(".tools").show(), $("#ID_FRAME_WRAPPER").css({
        top: "64px",
        left: "60px"
    }), PN_PAGE.getElement(".widget-section").css({
        "border-bottom": "1px dashed rgba(6,21,40,1)"
    }), PN_PAGE.getElement(".menuMobile .showMenu").css({
        "pointer-events": "none"
    }), PN_PAGE.getElement(".widget-element").addClass("widget-dragg ui-draggable ui-draggable-handle"), PN_PAGE.getElement(".widget-dragg").css({
        cursor: "all-scroll"
    }), "desktop" == deviceEdit ? (PN_PAGE.getElement('.widget-element[pn-type="menu-header"] .menuMobile div').hide(), PN_PAGE.getElement('.widget-element[pn-type="menu-header"] .ulMenuDeskTop').show(), PN_PAGE.getElement('.widget-element[pn-type="menu-header"] .ulMenuDeskTop').css({
        "margin-left": "0px"
    })) : (PN_PAGE.getElement('.widget-element[pn-type="menu-header"] .menuMobile .hideMenu').hide(), PN_PAGE.getElement('.widget-element[pn-type="menu-header"] .menuMobile .showMenu').show(), PN_PAGE.getElement('.widget-element[pn-type="menu-header"] .ulMenuDeskTop').hide());
    var a = PN_PAGE.getElement(".container");
    if ("desktop" == deviceEdit) {
        var b = $(window).outerWidth();
        $(".follow2").css({
            left: b / 2 + "px"
        }), $(".follow1").css({
            left: b / 2 - 480 + "px"
        }), $(".follow3").css({
            left: b / 2 + 480 + "px"
        })
    } else if (a.length > 0) {
        var c = a.eq(0).offset().left + PN_PAGE.PUNNEL_EDIT.offset().left;
        $(".follow1").css({
            left: c + "px"
        }), $(".follow2").css({
            left: c + 160 + "px"
        }), $(".follow3").css({
            left: c + 320 + "px"
        }), $("#resizable-element").hide(), $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide()
    }
    preview = !1;
    PN_PAGE.getElement(".widget-element")
},
AjaxPage.prototype.loadPunnelEdit = function () {
    PN_PAGE.getElement(".widget-section").css({
        "border-bottom": "1px dashed rgba(6,21,40,1)"
    }), PN_PAGE.getElement(".widget-dragg").css({
        cursor: "all-scroll"
    }), PN_PAGE.getElement(".menuMobile .showMenu").css({
        "pointer-events": "none"
    });
    for (var a = 0; a < apiElement.length; a++) {
        var b = PN_PAGE.getElement("#" + apiElement[a].id),
            c = b.attr("pn-type");
        "image" == c ? PN_PAGE.getElement("#" + apiElement[a].id + " .widget-content").eq(0).attr({
            src: apiElement[a].link
        }) : "image" == apiElement[a].bg_type
    }
    var d = new SortElementMobile;
    d.setCssElement(deviceEdit)
},
AjaxPage.prototype.reName = function (a) {
    if (void 0 != a) {
        var b = a;
        return b = b.replace(/\ /g, "-"), b = b.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a"), b = b.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o"), b = b.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e"), b = b.replace(/ù|ú|ụ|ủ|ũ|ừ|ứ|ự|ử|ữ|ư/g, "u"), b = b.replace(/í|ì|ỉ|ị|ĩ/g, "i"), b = b.replace(/ý|ỳ|ỷ|ỵ|ỹ/g, "y"), b = b.replace(/đ/g, "d"), b = b.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A"), b = b.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ổ|Ộ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O"), b = b.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E"), b = b.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ừ|Ứ|Ự|Ử|Ữ|Ư/g, "U"), b = b.replace(/Í|Ì|Ỉ|Ị|Ĩ/g, "I"), b = b.replace(/Ý|Ỳ|Ỷ|Y|Ỹ/g, "Y"), b = b.replace(/Đ/g, "D")
    }
};