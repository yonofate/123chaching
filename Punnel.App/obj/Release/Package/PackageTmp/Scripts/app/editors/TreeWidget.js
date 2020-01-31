var TreeWidget = function() {};
TreeWidget.prototype.init = function() {}, 
TreeWidget.prototype.layerPopup = function() {
    var a = PN_PAGE.getElement(".widget-section"),
        b = "";
    a && a.length > 0 && (a.each(function() {
        "true" == $(this).attr("pn-popup") && (b += '<li data-id="' + $(this).attr("id") + '"> <a>' + $(this).attr("id") + "</a> </li>")
    }), $("#layer-popup .tab-content ul").html(b), this.clickLayer()), $('li[role="presentation"][data-active="popup"]').addClass("active"), $('li[role="presentation"][data-active="section"]').removeClass("active"), $("#layer-section").hide(), $("#layer-popup").show()
},
TreeWidget.prototype.layerSection = function () {
    var a = PN_PAGE.getElement(".widget-section"),
        b = "";
    a && a.length > 0 && (a.each(function() {
        "true" != $(this).attr("pn-popup") && (b += '<li data-id="' + $(this).attr("id") + '"> <a>' + $(this).attr("id") + "</a> </li>")
    }), $("#layer-section .tab-content ul").html(b), this.clickLayer()), $('li[role="presentation"][data-active="popup"]').removeClass("active"), $('li[role="presentation"][data-active="section"]').addClass("active"), $("#layer-section").show(), $("#layer-popup").hide()
},
TreeWidget.prototype.layer = function () {
    var a = PN_PAGE.getElement(".widget-section"),
        b = "",
        c = "";
    a && a.length > 0 && (a.each(function() {
        "true" == $(this).attr("pn-popup") ? c += '<li data-id="' + $(this).attr("id") + '" pn-popup="true"> <a>' + $(this).attr("id") + "</a> </li>" : b += '<li data-id="' + $(this).attr("id") + '" pn-popup="false"> <a>' + $(this).attr("id") + "</a> </li>"
    }), $("#layer-popup .tab-content ul").html(c), $("#layer-section .tab-content ul").html(b), "none" != $("#layer-section").css("display") ? $('[role="presentation"][data-active="section"]').addClass("active") : $('[role="presentation"][data-active="popup"]').addClass("active"), this.clickLayer())
},
TreeWidget.prototype.clickLayer = function () {
    $(".layers-element .tab-content li").click(function(a) {
        a.preventDefault(), $('.widget-section[pn-popup="true"]').hide();
        var b = $(this).attr("data-id"),
            c = $("#" + b),
            d = new IframeClick,
            e = new ShowBoxResize;
        if (d.addClassSelected(c), "true" == c.attr("pn-popup")) selectedItem.show(), e.showBoxSection(selectedItem), $("#punnel-editor").scrollTop(0), $("#resizable-section").hide(), $("#resizable-element").hide();
        else {
            var f = selectedItem.offset().top + $("#punnel-editor").scrollTop();
            $("#punnel-editor").animate({
                scrollTop: f
            }, "100")
        }
        e.showBoxSection(selectedItem);
        var g = "Sắp xếp lại section",
            h = new OptionWiget;
        g = selectedItem.hasClass("widget-section") ? selectedItem : h.getParentSection(selectedItem), $(".widget-item.custom-section .option .btn-full-body").text("Sắp xếp lại " + g.attr("id"))
    })
},
TreeWidget.prototype.layerHide = function () {
    if (apiElement && apiElement.length > 0) {       
        for (var a = "", b = 0; b < apiElement.length; b++) "none" == apiElement[b].media[deviceEdit].display && (a += '<li pn-layer-hide="' + apiElement[b].id + '" class="layer-item-hide"> <a> <span>' + apiElement[b].id + '</span> <i class="material-icons">visibility</i> </a> </li>');
        $(".dropdown.hidden-layer .submenu.dropdown-menu").html(a), this.clickshowElementHide()
    }
},
TreeWidget.prototype.clickshowElementHide = function () {
    var a = this;
    $(".dropdown.hidden-layer .submenu.dropdown-menu .layer-item-hide i").unbind("click").click(function(b) {
        b.preventDefault();
        var c = $(b.target).parent().parent(),
            d = $("#punnel-editor #" + c.attr("pn-layer-hide"));
        if (d && d.length > 0) {
            var e = PN_PAGE.getIndexElement(d.attr("id")),
                f = apiElement[e].media[deviceEdit].top;
            apiElement[e].media[deviceEdit].left, apiElement[e].media[deviceEdit].width, apiElement[e].media[deviceEdit].height;
            d.show(), apiElement[e].media[deviceEdit].display = "block",
                apiElement[e].sortmobile = 1,
                apiElement[e][deviceEdit] = 1,
                d = $("#punnel-editor #" + c.attr("pn-layer-hide"));
            if (deviceEdit == 'desktop') {
                d.attr('pn-display', apiElement[e].media.display); //'block');
            }
            if (deviceEdit == 'mobile') {
                var g = new OptionWiget;
                g.sapXepAnHienMobile(d),
                    d.hasClass("widget-group") || g.calulatorAllGroup(d),
                    g.fixSizeParentElement(d);
                    }
                    $("#punnel-editor .selected").removeClass("selected"),
                    selectedItem = $("#punnel-editor #" + c.attr("pn-layer-hide")),
                    selectedItem.addClass("selected"), f = selectedItem.offset().top - 100,
                    $("#punnel-editor").scrollTop(f);
                
                a.layerHide()
        }
    })
};