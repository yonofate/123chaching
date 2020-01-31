var GetDataService = function () { };
GetDataService.prototype.init = function () { },
GetDataService.prototype.urlParam = function (a) {
    var b = new RegExp("[?&;]" + a + "=([^&;#]*)").exec(window.location.href);
    return null == b ? 0 : b[1] || 0
},
GetDataService.prototype.addStyleViewport = function () {
    void 0 == dummyData.viewport && (dummyData.viewport = {}), void 0 == dummyData.viewport.size_desktop && (dummyData.viewport.size_desktop = 960), void 0 == dummyData.viewport.size_mobile && (dummyData.viewport.size_mobile = 375);
    var a = '<style id="style-viewport">.is-maincontent.punnel-mobile #punnel-editor .widget-section {width: ' + dummyData.viewport.size_mobile + "px !important;} .is-maincontent .container {width: " + dummyData.viewport.size_desktop + "px}</style>";
    $("#style-viewport").remove(), $("head").append(a), "function" == typeof window.load_pndoc_css_default && window.load_pndoc_css_default()
},
GetDataService.prototype.xulySource = function (a, b) {
    pageSave = !0, deviceEdit = "desktop";
    var c, d, e;
    if (a) {
        dummyData = "string" == typeof a ? JSON.parse(a) : a, "function" == typeof window.loadViewport ? window.loadViewport() : this.addStyleViewport(), apiElement = dummyData.apiElement, PN_PAGE.resetAllImage(apiElement);

        //dummyData = "string" == typeof a ? JSON.parse(a) : a, apiElement = dummyData.apiElement, PN_PAGE.resetAllImage(apiElement);
        for (var f = apiElement.length - 1; f >= 0; f--) apiElement[f] && 1 != apiElement[f].sortmobile && (PN_PAGE.sortMobilePublish = 1), ("GROUP_TMP" == apiElement[f].id || "group" == apiElement[f].type_plugin) && apiElement.splice(f, 1);
        dummyData.head ? dummyData.head = dummyData.head.replace(/undefined/g, "") : dummyData.head = "", dummyData.body ? dummyData.body = dummyData.body.replace(/undefined/g, "") : dummyData.body = "", PN_PAGE.account.body = dummyData.body, PN_PAGE.account.head = dummyData.head, PN_PAGE.account.idpixel = dummyData.idpixel, PN_PAGE.account.idanalytics = dummyData.idanalytics, PN_PAGE.account.namePunnel = a.name, localStorage.setItem("body", dummyData.body), localStorage.setItem("head", dummyData.head), localStorage.setItem("idpixel", dummyData.idpixel), localStorage.setItem("idanalytics", dummyData.idanalytics), pageSave = !0, setTimeout(function () {
            $("title").html(a.name).attr("pn-id", PN_PAGE.account.idLadi), $(".topbar .current-page .title").html(a.name);
            var f = PN_PAGE.getElement(".widget-element");
            f.removeClass("selected"), f.each(function () {
                $(this).removeClass("widget-snap").addClass("widget-snap")
            }), selectedItem = void 0, PN_PAGE.PUNNEL_EDIT.html(""), getHtml = new setHtmlLadi;
            for (var g = 0; g < apiElement.length; g++)
                if (getHtml.getTemplate(apiElement[g], apiElement[g].type_plugin, function () {
                        $(".widget-element").attr("href", ""), $(".widget-element .widget-content").attr("href", "")
                }), g == apiElement.length - 1) {
                    var f = $(".widget-element");
                    f && f.length > 0 && f.each(function () {
                        var a = PN_PAGE.getIndexElement($(this).attr("id"));
                        a === !1 && $(this).remove()
                    }), PN_PAGE.loading.hide()
                }
            if (selectedItem = $(".widget-section").eq(0), typeAddNew == typeSection) {
                var h = new OptionWiget;
                h.sortWg(), $('.mtab li[pn-active="conversion"]').hide()
            }
            d = new AjaxPage, d.loadPunnelEdit(), e = new setStyleElement, e.init(apiElement, "desktop"), c = new RunApp, c.init();
            var i = new OptionWiget;
            i.fixsizeBody(), b()
        }, 3e3)
    } else setTimeout(function () {
        dummyData = $.extend(!0, {}, DummyData), apiElement = dummyData.apiElement, void 0 == dummyData.head && (dummyData.head = ""), void 0 == dummyData.body ? dummyData.body = "" : dummyData.body = dummyData.body.replace(/undefined/g, ""), (void 0 == dummyData.headConvertion || "undefined" == dummyData.headConvertion) && (dummyData.headConvertion = ""), void 0 == dummyData.bodyConvertion || "undefined" == dummyData.bodyConvertion ? dummyData.bodyConvertion = "" : dummyData.bodyConvertion = dummyData.bodyConvertion.replace(/undefined/g, ""), PN_PAGE.account.body = dummyData.body, PN_PAGE.account.head = dummyData.head, PN_PAGE.PUNNEL_EDIT.html(""), getHtml = new setHtmlLadi;
        for (var a = 0; a < apiElement.length; a++) getHtml.getTemplate(apiElement[a], apiElement[a].type_plugin, function () {
            $(".widget-element").attr("href", ""), $(".widget-element .widget-content").attr("href", "")
        });
        if (typeAddNew == typeSection) {
            var f = new OptionWiget;
            f.sortWg(), $('.mtab li[pn-active="conversion"]').hide()
        }
        d = new AjaxPage, d.loadPunnelEdit(), e = new setStyleElement, e.init(apiElement, "desktop"), c = new RunApp, c.init();
        var g = new OptionWiget;
        g.fixsizeBody(), PN_PAGE.loading.hide(), PN_PAGE.dbLoading.hide(), b()
    }, 3e3)
};