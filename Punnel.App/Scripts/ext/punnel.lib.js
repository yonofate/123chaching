function endTime(a) {
    var b = Date.parse(a) - Date.parse(new Date),
        c = Math.floor(b / 1e3 % 60),
        d = Math.floor(b / 1e3 / 60 % 60),
        e = Math.floor(b / 36e5 % 24),
        f = Math.floor(b / 864e5);
    return {
        t: b,
        d: f,
        h: e,
        m: d,
        s: c
    }
}

function countDown(a, b) {
    function c() {
        var c = endTime(b);
        c.t > 0 ? (e.text(c.d), f.text(c.h), g.text(c.m), h.text(c.s)) : (e.text("00"), f.text("00"), g.text("00"), h.text("00"), clearInterval(i), $(a.attr("pn-show")).addClass("animated fadeInDown").css({
            display: "block"
        }))
    }
    var d = a.find("div > span"),
        e = d.eq(0),
        f = d.eq(1),
        g = d.eq(2),
        h = d.eq(3);
    c();
    var i = setInterval(c, 1e3)
}

function showWatermark(show) {
    if ("1" == show) {
        var b = '<div class="pn-watermart" style="background: #fff;display: block!important;position: fixed;bottom: 0px;left: 0px;width: 100%; height: 32px;z-index: 9999999999; text-align: center"><a style="width: 100%; height: 100%; display: inline-block;" href="http://punnel.com/?utm_source=freemium" target="_blank" rel="nofollow"><img style="height:24px;margin-top:5px;" src="https://hstatic.punnel.com/img/punnel/punnel-watermark-32.png"></a></div>';
        setInterval(function () {
            if (!($("body").find(".pn-watermart").length > 0)) {
                $("body").append(b);
                $("body").css({
                    "margin-bottom": "32px!important"
                });
            }
            var links = document.getElementsByTagName("link");
            var c = 0;
            var i = 0;
            for (; i < links.length; i++) {
                if ("image/ico" == links[i].type && "shortcut icon" == links[i].rel) {
                    links[i].href = "https://hstatic.punnel.com/favicon.ico";
                    c = 1;
                }
            }
            if (0 == c) {
                $("head").append('<link rel="shortcut icon" type="image/ico" href="https://hstatic.punnel.com/favicon.ico">');
            }
        }, 2e3);
    }
}
function showBadge(show, referralCode) {
    var b = '<div class="pn-watermart" style="position:fixed;bottom:-5px;right:0;z-index:99999999"><a href="https://app.punnel.com/r/' + referralCode + '" target="_blank"><img src="https://hstatic.punnel.com/img/punnel/punnel-badge.png" alt="Powered By Punnel.com"></a></div>';
    setInterval(function () {
        if (!($("body").find(".pn-watermart").length > 0)) {
            $("body").append(b);
        }
        if ("1" == show) {
            var links = document.getElementsByTagName("link");
            var c = 0;
            var i = 0;
            for (; i < links.length; i++) {
                if ("image/ico" == links[i].type && "shortcut icon" == links[i].rel) {
                    links[i].href = "https://hstatic.punnel.com/favicon.ico";
                    c = 1;
                }
            }
            if (0 == c) {
                $("head").append('<link rel="shortcut icon" type="image/ico" href="https://hstatic.punnel.com/favicon.ico">');
            }
        }
    }, 2e3);
}

function accountFree() {
    $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://api.punnel.com/api/validate",
        "method": "GET",
        "data": {
            "id": $("head .title-site").attr("pn-id")
        },
        "headers": {
            "content-type": "application/json"
        },
        success: function (a) {
            //0 == a && (b = "1", showWatermark(b))
            var aff_badge = $("head .title-site").attr("aff-badge");
            if (a.show == true) {
                showBadge("1", a.referralCode)
            } else if (aff_badge == "1") {
                showBadge("0", a.referralCode)
            }
        }
    });
}

var runtrackingCus = function (ele) {
    if (ele && ele.length > 0) {
        if (ele.hasClass("widget-section") && "true" == ele.attr("pn-popup") && ele.attr("pn-url-tracking")=="true") {
            console.log("run tracking popup");
            var fnTrack = ele.attr("id") + "_show();";
            eval(fnTrack)
        }
    }
}
,checkForm = {
    countForm: 0,
    countTo: 0,
    value: "false"
},
    runSlider, timeoutSlider, leftchange = 1,
    widthWindow = $(window).outerWidth(),
    isOpera = !!window.opr && !!opr.addons || !!window.opera || navigator.userAgent.indexOf(" OPR/") >= 0,
    isFirefox = "undefined" != typeof InstallTrigger,
    isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor") > 0,
    isIE = !!document.documentMode,
    isEdge = !isIE && !!window.StyleMedia,
    isChrome = !!window.chrome && !!window.chrome.webstore,
    showpop = {
        loadpage: 0,
        outpage: 0,
        idSroll: []
    },
    testWindowWidth = $(window).outerWidth(),
    testWindowHeight = $(window).outerHeight(),
    PN_PAGE = {};

PN_PAGE.arrAnimate = [];
var resetTopPopup = function () {
    var a = $('.widget-section[pn-popup="true"]');
    if (a && a.length > 0) {
        var b, c, d = $(window).outerHeight();
        a.each(function () {
            b = $(this).find(".container").eq(0).outerHeight(), c = (d - b) / 2, 40 > c && (c = 40), $(this).find(".container").eq(0).css({
                top: c + "px"
            })
        })
    }
},
    getUtm = function (a) {
        var b = new RegExp("[?&;]" + a + "=([^&;#]*)").exec(window.location.href);
        return null == b ? "" : b[1] || ""
    },
    removecheckphone = function () {
        $(".formHintBubble").remove()
    },
    checkphone = function (a) {
        var b = !0;
        if ($(a) && $(a).length > 0 && "phone" == $(a).attr("name")) {
            var c = $(a).val();
            if ($(".formHintBubble").remove(), 10 == c.length || 11 == c.length)
                if (c = c.replace(/[^0-9]/g, ""), 10 == c.length || 11 == c.length);
                else {
                    var d = $(a).parent().parent(),
                        e = parseFloat($(a).parent().css("top")) - 45,
                        f = $("<span/>").html('<span class="formHintBubble" style="top: ' + e + 'px;">Vui lòng nhập số điện thoại hợp lệ</span>').contents();
                    d.append(f), $(a).val(c), b = !1
                }
            else {
                var d = $(a).parent().parent(),
                    e = parseFloat($(a).parent().css("top")) - 45,
                    f = $("<span/>").html('<span class="formHintBubble" style="top: ' + e + 'px;">Vui lòng nhập số điện thoại hợp lệ</span>').contents();
                d.append(f), $(a).val(c), b = !1
            }
        }
        return b
    },
    resetSrcIframe = function (a) {
        if (a && a.length > 0) {
            var b = a.find("iframe");
            if (b && b.length > 0) {
                var c = "";
                b.each(function () {
                    c = $(this).attr("src"), $(this).attr("src", ""), $(this).attr("src", c), $(this).show()
                })
            }
        }
    },
    showPopupLoadPage = function () {
        var a = $('.widget-section[pn-popup="true"]');
        a && a.length > 0 && 0 == showpop.loadpage && (a.each(function () {
            var a = $(this).attr("pn-delay-show-popup-page"),
                b = $(this).attr("pn-show-popup-page"),
                c = $(this);
            if (b && "1" == b) {
                var d = 0;
                a && parseFloat(a) > 0 && (d = 1e3 * a), setTimeout(function () {
                    if ($(".popup.punnel-popup-form").hide(), $('.widget-section[pn-popup="true"]').hide(), c.find(".container").find(".closePop").remove(), c.find(".container").find(".iframeTks").remove(), "true" == c.attr("pn-url-tracking")) {
                        var a = $(location).attr("href").split("?")[0] + "/" + c.attr("id") + "-thanks.html";
                        c.attr("id") && c.attr("id").length > 0 && (a = $(location).attr("href").split("?")[0] + "/" + c.attr("id").toLowerCase() + "-thanks.html"), a.replace("//", "/").replace(":/", "://") //, c.find(".container").eq(0).append('<iframe class="iframeTks" src="' + a + '" style="display: none;"></iframe>')
                    }
                    c.find(".container").eq(0).append('<div class="closePop" style="top:-25px; right:0;">X</div>'), c.css({
                        display: "block",
                        position: "fixed"
                    }), runtrackingCus(c), resetTopPopup(), c.find(".closePop").unbind("click").click(function () {
                        $(this).parent().parent().removeClass("pn-showpopup").hide(), $(this).parent().parent().addClass("pn-hidepopup").hide();
                        var a = c.find('.widget-element[pn-type="videoyoutube"] .widget-content:eq(0)');
                        a && a.length > 0 && a.each(function () {
                            var a = $(this).attr("src");
                            a = a.replace("autoplay=1", "autoplay=0"), $(this).attr("src", a)
                        })
                    }), c.removeClass("pn-hidepopup").show(), c.addClass("pn-showpopup").show(), resetSrcIframe(c)
                }, d)
            }
        }), showpop.loadpage++)
    },
    showPopupExitPage = function () {
        if (0 == showpop.outpage) {
            var a = $('.widget-section[pn-popup="true"]');
            a && a.length > 0 && a.each(function () {
                var a = $(this).attr("pn-show-popup-exit-page");
                if (a && "1" == a) {
                    if ($(".popup.punnel-popup-form").hide(), $('.widget-section[pn-popup="true"]').hide(), "true" == $(this).attr("pn-url-tracking")) {
                        var b = $(location).attr("href").split("?")[0] + "/" + $(this).attr("id") + "-thanks.html";
                        void 0 !== $(this).attr("id") && (b = $(location).attr("href").split("?")[0] + "/" + $(this).attr("id").toLowerCase() + "-thanks.html"), $(this).find(".container").eq(0).find(".iframeTks").remove(), b.replace("//", "/").replace(":/", "://"), $(this).find(".container").eq(0).append('<iframe class="iframeTks" src="' + b + '" style="display: none;"></iframe>')
                    }
                    $(this).removeClass("pn-hidepopup").show(), $(this).addClass("pn-showpopup").show(), resetSrcIframe($(this)), $(this).find(".container").find(".closePop").remove(), $(this).find(".container").eq(0).append('<div class="closePop" style="top:-25px; right:0;">X</div>'), $(this).css({
                        display: "block",
                        position: "fixed"
                    }), runtrackingCus($(this)), resetTopPopup(), $(this).find(".closePop").unbind("click").click(function () {
                        $(this).parent().parent().removeClass("pn-showpopup").hide(), $(this).parent().parent().addClass("pn-hidepopup").hide();
                        var a = $(this).parent().parent().find('.widget-element[pn-type="videoyoutube"] .widget-content:eq(0)');
                        a && a.length > 0 && a.each(function () {
                            var a = $(this).attr("src");
                            a = a.replace("autoplay=1", "autoplay=0"), $(this).attr("src", a)
                        })
                    })
                }
            }), showpop.outpage++
        }
    },
    showPopupScrollPage = function () {
        var a = $('.widget-section[pn-popup="true"]');
        a && a.length > 0 && a.each(function () {
            var a = $(this).attr("pn-show-popup-id-scroll");
            if (a && a.length > 0 && $("#" + a) && "none" != $("#" + a).css("display") && -1 == $.inArray(a, showpop.idSroll)) {
                var b = $(window).scrollTop();
                if ($("#" + a) && $("#" + a).offset() && $("#" + a).offset().top > b && b + $(window).outerHeight() > $("#" + a).offset().top) {
                    if ($(".popup.punnel-popup-form").hide(), $('.widget-section[pn-popup="true"]').hide(), "true" == $(this).attr("pn-url-tracking")) {
                        var c = $(location).attr("href").split("?")[0] + "/" + $(this).attr("id") + "-thanks.html";
                        void 0 !== $(this).attr("id") && (c = $(location).attr("href").split("?")[0] + "/" + $(this).attr("id").toLowerCase() + "-thanks.html"), $(this).find(".container").eq(0).find(".iframeTks").remove(), c.replace("//", "/").replace(":/", "://"), $(this).find(".container").eq(0).append('<iframe class="iframeTks" src="' + c + '" style="display: none;"></iframe>')
                    }
                    $(this).removeClass("pn-hidepopup").show(), $(this).addClass("pn-showpopup").show(), resetSrcIframe($(this)), $(this).find(".container").find(".closePop").remove(), $(this).find(".container").eq(0).append('<div class="closePop" style="top:-25px; right:0;">X</div>'), $(this).css({
                        display: "block",
                        position: "fixed"
                    }), runtrackingCus($(this)), resetTopPopup(), $(this).find(".closePop").unbind("click").click(function () {
                        $(this).parent().parent().removeClass("pn-showpopup").hide(), $(this).parent().parent().addClass("pn-hidepopup").hide();
                        var a = $(this).parent().parent().find('.widget-element[pn-type="videoyoutube"] .widget-content:eq(0)');
                        a && a.length > 0 && a.each(function () {
                            var a = $(this).attr("src");
                            a = a.replace("autoplay=1", "autoplay=0"), $(this).attr("src", a)
                        })
                    }), showpop.idSroll.push(a)
                }
            }
        })
    },
    actionLink = function (a) {
        if (a && a.length > 0) {
            var b = a.attr("pn-action-type"),
                c = a.attr("pn-action-link"),
                d = document.createElement("a");
            d.setAttribute("id", a.attr("id")), d.style.display = "none", document.body.appendChild(d);
            var e = a.attr("pn-target");
            switch (b) {
                case "email":
                    c = "mailto:" + c, d.setAttribute("href", c), d.style.display = "none", d.click(), document.body.removeChild(d);
                    break;
                case "phone":
                    c = "tel:" + c, d.setAttribute("href", c), d.style.display = "none", d.click(), document.body.removeChild(d);
                    break;
                case "page":
                    c = "#" + c;
                    var f = $(c).offset().top;
                    console.log("top: ", f), $("body,html").animate({
                        scrollTop: f
                    }, 1e3);
                    break;
                case "url":
                    d.setAttribute("href", c), d.setAttribute("target", e), d.style.display = "none", d.click(), document.body.removeChild(d);
                    break;
                case "popup":
                    var g = $("#" + c);
                    if (g && g.length > 0 && "true" == g.attr("pn-popup")) {
                        if ($(".popup.punnel-popup-form").hide(), $('.widget-section[pn-popup="true"]').hide(), "true" == g.attr("pn-url-tracking")) {
                            var h = $(location).attr("href").split("?")[0] + "/" + g.attr("id") + "-thanks.html";
                            void 0 !== g.attr("id") && (h = $(location).attr("href").split("?")[0] + "/" + g.attr("id").toLowerCase() + "-thanks.html"), g.find(".container").eq(0).find(".iframeTks").remove(), h.replace("//", "/").replace(":/", "://"), g.find(".container").eq(0).append('<iframe class="iframeTks" src="' + h + '" style="display: none;"></iframe>')
                        }
                        g.find(".container").find(".closePop").remove(), g.find(".container").eq(0).append('<div class="closePop" style="top:-25px; right:0;">X</div>'), g.removeClass("pn-hidepopup"), g.addClass("pn-showpopup"), g.css({
                            display: "block",
                            position: "fixed"
                        }), runtrackingCus(g), resetTopPopup(), g.find(".closePop").unbind("click").click(function () {
                            $(this).parent().parent().removeClass("pn-showpopup").hide(), $(this).parent().parent().addClass("pn-hidepopup").hide();
                            var a = $(this).parent().parent().find('.widget-element[pn-type="videoyoutube"] .widget-content:eq(0)');
                            a && a.length > 0 && a.each(function () {
                                var a = $(this).attr("src");
                                a = a.replace("autoplay=1", "autoplay=0"), $(this).attr("src", a)
                            })
                        }), resetSrcIframe(g)
                    }
                    break;
                default:
                    document.body.removeChild(d)
            }
        }
    },
    runTrackingForm = function (eleFrom) {
        if (eleFrom && eleFrom.length > 0 && eleFrom.attr("pn-tracking") && eleFrom.attr("pn-tracking").length > 0) try {
            eval(eleFrom.attr("pn-tracking"))
        } catch (e) { } finally { }
    },
    popupForm = function (a, b, success) {
        var c = "";
        c = a && a.length > 0 ? a : success && success == true? "Thông tin của bạn đã được gửi" : "Chưa gửi được thông tin, vui lòng kiểm tra thông tin hợp lệ và gửi lại!";

        var d = $("#" + b);
        if (success && success==true && d && d.attr("pn-id-pop-sub") && d.attr("pn-id-pop-sub").length > 0) {
            $(".popup.punnel-popup-form").hide(), $('.widget-section[pn-popup="true"]').hide();
            var e = $("#" + d.attr("pn-id-pop-sub"));
            if (e.find(".container").find(".closePop").remove(), e.find(".container").find(".iframeTks").remove(), "true" == e.attr("pn-url-tracking")) {
                e.find(".iframeTks").remove();
                var f = $(location).attr("href").split("?")[0] + "/" + e.attr("id") + "-thanks.html";
                void 0 !== e.attr("id") && (f = $(location).attr("href").split("?")[0] + "/" + e.attr("id").toLowerCase() + "-thanks.html"), f.replace("//", "/").replace(":/", "://"), e.find(".container").eq(0).append('<iframe class="iframeTks" src="' + f + '" style="display: none;"></iframe>')
            }
            e.find(".container").eq(0).append('<div class="closePop" style="top:-25px; right:0;">X</div>'), e.removeClass("pn-hidepopup"), e.addClass("pn-showpopup"), e.css({
                display: "block",
                position: "fixed"
            }), runtrackingCus(e), resetTopPopup(), e.find(".closePop").unbind("click").click(function () {
                $(this).parent().parent().removeClass("pn-showpopup").hide(), $(this).parent().parent().addClass("pn-hidepopup").hide();
                var a = $(this).parent().parent().find('.widget-element[pn-type="videoyoutube"] .widget-content:eq(0)');
                a && a.length > 0 && a.each(function () {
                    var a = $(this).attr("src");
                    a = a.replace("autoplay=1", "autoplay=0"), $(this).attr("src", a)
                })
            }), e.show()
        } else if (success && success == true && d.attr("pn-id-pop-url") && d.attr("pn-id-pop-url").length > 0) {
            var g = "";
            if (d.attr("pn-ss-f") && d.attr("pn-ss-f").length > 0) {
                var h = JSON.parse(d.attr("pn-ss-f"));
                d.find(".widget-element .widget-content");
                if (h && h.length > 0) {
                    for (var i = "?", j = d.attr("pn-id-pop-url").split("/"), k = 0; k < j[j.length - 1].length; k++) "?" == j[j.length - 1][k] && (i = "&");
                    for (var l = 0; l < h.length; l++) {
                        0 != l && (i = "&");
                        var m = d.find('.widget-element .widget-content[name="' + h[l].name + '"]');
                        m && m.length > 0 && (g += i + h[l].value + "=" + m.val())
                    }
                }
            }
            var n = d.attr("pn-id-pop-url") + g;
            console.log(n), window.location.href = d.attr("pn-id-pop-url")
        } else {
            $(".popup.punnel-popup-form").hide(), $('.widget-section[pn-popup="true"]').hide();
            if (success && success == true) {
                swal("Thành công!", c, "success");
                
            } else {
                swal("Thông báo!", c, "error");
            }
        }
    },
    Visitor = function () { },


    GoogleMap = function () { };
GoogleMap.prototype.init = function () {
    var a = this,
        b = $('.widget-element[pn-type="googlemap"]');
    b.length > 0 && b.each(function () {
        var b = $(this).find(".widget-content").eq(0)[0],
            c = parseFloat($(this).attr("pn-mapzoom")),
            d = $(this).attr("pn-mapaddress"),
            e = $(this).attr("pn-maptitletext"),
            f = $(this).attr("pn-maptitleimage");
        void 0 != f && "" != f && (e = '<div class="pn-maptitle"><p><img src="' + f + '"></p><p>' + e + "</p></div>"), a.createMaps(b, c, d, e)
    })
},
    GoogleMap.prototype.createMaps = function (a, b, c, d) {
        var e;
        window.google = window.google || {}, google.maps = google.maps || {}, google && (e = new google.maps.Geocoder, e.geocode({
            address: c
        }, function (c, e) {
            if (e == google.maps.GeocoderStatus.OK) {
                var f = new google.maps.Map(a, {
                    zoom: b,
                    center: c[0].geometry.location
                }),
                    g = new google.maps.Marker({
                        map: f,
                        position: c[0].geometry.location
                    }),
                    h = new google.maps.InfoWindow({
                        content: d
                    });
                h.open(f, g)
            }
        }))
    };


var LightBox = function () { };
LightBox.prototype.init = function () {
    var a = $("[pn-lightbox]");
    void 0 != a && a.length > 0 && a.unbind("click").click(function () {
        var a = $(this).attr("pn-lightbox");
        if (void 0 != a && "undefined" != a && "" != a && $("#" + a).length > 0) {
            var b = $("#" + a);
            if (void 0 != b && b.length > 0) {
                var c = "",
                    d = ($(window).outerHeight() - 600) / 2,
                    e = 600;
                0 > d && (d = 0, e = $(window).outerHeight()), c = c + '<div class="pn-popup-pub lightbox-image" style="position: fixed;"><div class="container animated fadeIn" style="display:none;"><div class="closePop" style="top:' + (d - 12) + 'px!important;left: -12px!important; padding:0px; padding-left: 6px;">X</div>' + b[0].outerHTML + "</div></div>", $("body").append(c), $(".lightbox-image #" + a).css({
                    width: "100%",
                    height: e + "px",
                    left: "0px",
                    top: d + "px"
                }), $(".lightbox-image .container").css({
                    background: "rgba(0,0,0,0)"
                }), $(".lightbox-image").css({
                    background: "rgba(0,0,0,0.5)"
                }), $(".lightbox-image #" + a).parent().show(), $(".lightbox-image #" + a).parent().css({
                    position: "fixed"
                }), $(".lightbox-image .closePop").click(function () {
                    $(this).parent().parent().remove()
                })
            }
        }
    })
};

function getSelectVal(obj) {
    var name = obj.attr("pn-name-id") || obj.attr("name");
    if (name == 'select_city' || name == 'select_district' || name == 'select_ward') {
        return (obj.find('option:selected').text() || '');
    } else return (obj.val() || '');
}

var AjaxForm = function () { };
AjaxForm.prototype.sendValue = function (a) {
    var f = a.attr("pn-type-form"),
        g = $('.widget-element[pn-parent="' + a.attr("id") + '"]'),
        h = g.find(".widget-content").eq(0).html();

    g.attr("pn-value-text", h);
    if (g.find(".widget-content").eq(0).text().length > 15) {
        g.find(".widget-content").eq(0).text("Vui lòng đợi..");
    }

    var b, c = a.find(".widget-content:eq(0) .widget-element"),
        d = [],
        e = a.attr("pn-action");
    if (c && c.length > 0 && (d = [], c.each(function () {
        b = {}, b = {
            top: $(this).offset().top,
            name: $(this).find(".widget-content").eq(0).attr("pn-name-id") || $(this).find(".widget-content").eq(0).attr("name") ,
            value: getSelectVal($(this).find(".widget-content").eq(0)) //$(this).find(".widget-content").eq(0).val()
        }, d.push(b)
    })), a.attr("pn-vt-item") && a.attr("pn-vt-item").length > 0);
    else
        for (var f = 0; f < d.length; f++)
            for (var g = 0; g < d.length; g++)
                if (d[f].top < d[g].top) {
                    var h = {};
                    h.top = d[g].top, h.name = d[g].name, h.value = d[g].value, d[g].top = d[f].top, d[g].name = d[f].name, d[g].value = d[f].value, d[f].top = h.top, d[f].name = h.name, d[f].value = h.value
                } var i = getUtm("utm_source"),
                    j = getUtm("utm_medium"),
                    k = getUtm("utm_campaign"),
                    l = getUtm("utm_term"),
                    m = getUtm("utm_content"),
                    n = window.location.href,
                    b = {
                        name: "auto_rep",
                        value: a.attr("pn-auto-reply")
                    };
                d.push(b)
    b = {
        name: "url_page",
        value: n
    };
    d.push(b), b = {
        name: "utm_source",
        value: i
    }, d.push(b), b = {
        name: "utm_medium",
        value: j
    }, d.push(b), b = {
        name: "utm_campaign",
        value: k
    }, d.push(b), b = {
        name: "utm_term",
        value: l
    }, d.push(b), b = {
        name: "utm_content",
        value: m
    }, d.push(b);
    if (d && d.length > 0) {
        $(".preloader").fadeIn();
        $.ajax({
            "async": true,
            "crossDomain": true,
            type: "POST",
            "headers": {
                "content-type": "application/x-www-form-urlencoded"
            },
            url: "https://api.punnel.com/api/subcrible",
            data: {
                id: $("head .title-site").attr("pn-id"), //e
                dataForm: d
            },
            success: function (res) {
                $(".preloader").fadeOut();
                runTrackingForm(a);
                var frmId = a.attr("pn-message-form");
                popupForm(a.attr("pn-message-form"), a.attr("id"), true);
                a.find(".widget-element .widget-content").val("");
                var b = $('.widget-element[pn-parent="' + a.attr("id") + '"]');
                b.find(".widget-content").eq(0).html(b.attr("pn-value-text"));
            },
            error: function (err) {
                console.log(err);
                runtrackingCus(f);
                popupForm("Đã có lỗi xảy ra với thông tin đăng kí của bạn! Vui lòng thử lại", a.attr("id"), false);
                a.find(".widget-element .widget-content").val("");
                var b = $('.widget-element[pn-parent="' + a.attr("id") + '"]');
                b.find(".widget-content").eq(0).html(b.attr("pn-value-text"))
            }
        });
    }
}


var ReponsivePage = function () { };
ReponsivePage.prototype.init = function () {
    var a = $("#pn-viewport");
    if (a && a.length > 0);
    else {
        var b = parseFloat($(window).outerWidth()),
            c = "width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0",
            d = 1;
        767 >= b ? (d = b / 375, c = "width=375, initial-scale=" + d) : 960 > d && (d = b / 960, c = "width=960, initial-scale=" + d);
        var a = $('head meta[name="viewport"]');
        a.attr("content", c)
    }
};


var onClick = function (ele, ev) {
    if (ev.preventDefault(), ev.stopPropagation(), "button" == $(ele).attr("pn-type") && $(ele).attr("pn-parent") && $(ele).attr("pn-parent").length > 0) {
        $(ele).css({
            "pointer-events": "none"
        });
        var parent = $(ele).parent().parent(),
            idForm = $(ele).attr("pn-parent"),
            formTarget = $("#" + idForm),
            inputValue = formTarget.find(".widget-element"),
            listcontact = [],
            punnelid = $("title.title-site").attr("pn-id"),
            nameForm = $("#" + idForm).attr("pn-lang"),
            value = "";
        inputValue.each(function () {
            var a = {
                key: $(this).find(".widget-content").eq(0).attr("name"),
                value: $(this).find(".widget-content").eq(0).val()
            };
            listcontact.push(a)
        });

        var inputRequired = formTarget.find('.widget-element [required="required"]');
        if (inputRequired && inputRequired.length > 0) inputRequired.each(function (a) {
            if (!this.validity.valid) {
                $(".formHintBubble").remove(), $(this).focus();
                var b = formTarget.find(".widget-content:eq(0)"),
                    c = $(this),
                    d = c.get(0),
                    e = (c.position(), d.validationMessage || "Invalid value.", $(this).outerHeight() + parseFloat($(this).parent().css("top"))) - 80,
                    f = $("<span/>").html('<span class="formHintBubble" style="top: ' + e + 'px;">Vui lòng nhập thông tin hợp lệ!</span>').contents();
                return b.append(f), $(ele).css({
                    "pointer-events": "auto"
                }), !1
            }
            if (!checkphone($(this))) return $(this).focus(), $(ele).css({
                "pointer-events": "auto"
            }), !1;
            if (a == formTarget.find('.widget-element [required="required"]').length - 1) {
                $(".formHintBubble").remove();
                var g = new AjaxForm;
                g.sendValue(formTarget)
            }
        });
        else {
            var ajaxForm = new AjaxForm;
            ajaxForm.sendValue(formTarget)
        }
    } else {
        var elementClick = $(ele).attr("pn-click-element"),
            elementAction = $(ele).attr("pn-action"),
            target = $(ele).attr("pn-target");
        if (elementAction && elementAction.length > 0 && "contact_form" != $(ele).attr("pn-type")) {
            var link = document.createElement("a");
            link.href = elementAction, link.target = target, document.body.appendChild(link), link.click(), link.remove()
        }
        if (elementClick && elementClick.length > 0) {
            elementClick = JSON.parse(elementClick);
            for (var i = 0; i < elementClick.length; i++) "show" == elementClick[i].click ? ($("#" + elementClick[i].id).removeClass(elementClick[i].animate), $("#" + elementClick[i].id).addClass(elementClick[i].animate).hide(), $("#" + elementClick[i].id).show()) : $("#" + elementClick[i].id).hide()
        }
        try {
            if ($(ele).attr("pn-tracking") && $(ele).attr("pn-tracking").length > 0 && "contact_form" != $(ele).attr("pn-type")) {
                var tracking = $(ele).attr("pn-tracking");
                try {
                    eval(tracking)
                } catch (e) { } finally { }
            }
        } catch (e) { } finally {
            actionLink($(ele))
        }
    }
},
    LadiApp = function () { },
    arrClassSectionAnimate = [],
    checkId = function (a, b) {
        if (a && a.length > 0)
            for (var c = 0; c < a.length; c++)
                if (a[c].id == b) return b;
        return !1
    };


LadiApp.prototype.runAnimateSection = function () {
    var a = $('.widget-section.animated[pn-popup!="true"]');
    if (a && a.length > 0) {
        var b = $(window).scrollTop(),
            c = $(window).outerHeight();
        a.each(function () {
            var d = $(this).offset().top,
                e = $(this).outerHeight();
            if (b > d + e || d > b + c);
            else {
                $(this).addClass($(this).attr("pn-ani"));
                $(this);
                setTimeout(function () {
                    a.each(function () {
                        $(this).removeClass($(this).attr("pn-ani"))
                    })
                }, 1500)
            }
        })
    }
},
    LadiApp.prototype.runAdimate = function () {
    var a = $(window).scrollTop(),
        b = $(".widget-section:visible"),
        c = $('.widget-section[pn-popup="true"]:visible');
    if (c && c.length > 0);
    else {
        var d = $(window).outerHeight();
        b.each(function () {
            var b = $(this).offset().top,
                c = $(this).outerHeight(),
                e = $(this).find(".animated");
            e && e.length > 0 && -1 == $.inArray($(this).attr("id"), PN_PAGE.arrAnimate) && (e.hide(), a > b + c || b > a + d ? e.each(function () {
                "none" == $(this).css("display") && "none" != $(this).attr("pn-display") && $(this).css({
                    display: $(this).attr("pn-display")
                })
            }) : (e.each(function () {
                $(this).hide(), "fixed" != $(this).css("position") && $(this).hasClass("widget-element") && "true" == $(this).attr("pn-popup") || $(this).show()
            }), PN_PAGE.arrAnimate.push($(this).attr("id"))))
        }), stickyRun()
    }
},


    LadiApp.prototype.init = function () {
        var a = this,
            b = $(".widget-element");
        if (b && b.length > 0) {
            var c = "",
                d = "";
            b.each(function () {
                c = $(this).attr("pn-type"), d = $(this).attr("pn-action-link");
                var a = $(this).attr("pn-tracking");
                if ("customhtml" != c && d && d.length > 0 && ($(this).attr("onclick", "onClick(this, event)"), $(this).css({
                    cursor: "pointer"
                })), "contact_form" == c) {
                    var b = $(this).attr("id"),
                        e = $('.widget-element[pn-parent="' + b + '"]');
                    e.attr("onclick", "onClick(this, event)"), e.css({
                        cursor: "pointer"
                    })
                }
                if ("videoyoutube" == c && "1" == $(this).attr("pn-autoPlay")) {
                    for (var f = $(this).find(".widget-content").eq(0).attr("src"), g = 0, h = 0; h < f.length; h++) "?" == f[h] && (g = 1);
                    f += 0 == g ? "?autoplay=1" : "&autoplay=1", $(this).find(".widget-content").eq(0).attr("src", f)
                }
                a && a.length > 0 && ($(this).attr("onclick", "onClick(this, event)"), $(this).css({
                    cursor: "pointer"
                }))
            })
        }
        $(window).on("mousewheel", function (b) {
            b.originalEvent.wheelDelta >= 0 || (showImage(), showPopupScrollPage());
            var c = $(window).scrollTop(),
                d = $(".widget-section:visible"),
                e = $('.widget-section[pn-popup="true"]:visible');
            if (e && e.length > 0);
            else {
                var f = $(window).outerHeight();
                d.each(function () {
                    var a = $(this).offset().top,
                        b = $(this).outerHeight(),
                        d = $(this).find(".animated");
                    d && d.length > 0 && -1 == $.inArray($(this).attr("id"), PN_PAGE.arrAnimate) && (d.hide(), c > a + b || a > c + f ? d.each(function () {
                        "none" == $(this).css("display") && "none" != $(this).attr("pn-display") && $(this).css({
                            display: $(this).attr("pn-display")
                        })
                    }) : (d.each(function () {
                        $(this).hide(), "fixed" != $(this).css("position") && $(this).hasClass("widget-element") && "true" == $(this).attr("pn-popup") || $(this).show()
                    }), PN_PAGE.arrAnimate.push($(this).attr("id"))))
                }), stickyRun()
            }
            a.runAnimateSection()
        }), $(window).on("scroll", function (b) {
            var c = $('.widget-section[pn-popup="true"]:visible');
            if (c && c.length > 0);
            else {
                if (768 > widthWindow) {
                    showImage(), showPopupScrollPage();
                    var d = $(window).scrollTop(),
                        e = $(".widget-section:visible"),
                        f = $(window).outerHeight();
                    e.each(function () {
                        var a = $(this).offset().top,
                            b = $(this).outerHeight(),
                            c = $(this).find(".animated");
                        c && c.length > 0 && -1 == $.inArray($(this).attr("id"), PN_PAGE.arrAnimate) && (c.hide(), d > a + b || a > d + f ? c.each(function () {
                            "none" == $(this).css("display") && "none" != $(this).attr("pn-display") && $(this).css({
                                display: $(this).attr("pn-display")
                            })
                        }) : (c.each(function () {
                            $(this).hide(), "fixed" != $(this).css("position") && $(this).hasClass("widget-element") && "true" == $(this).attr("pn-popup") || $(this).show()
                        }), PN_PAGE.arrAnimate.push($(this).attr("id"))))
                    })
                }
                stickyRun()
            }
            a.runAnimateSection()
        });
        
        var f = new GoogleMap;
        f.init();
        var g = new LightBox;
        g.init();
        var h = $('.widget-section[pn-popup="true"]');
        h && h.length > 0, h.on("scroll", function (a) {
            showImage();
            var b = $(this).find(".closePop");
            b && b.length > 0 && b.css({
                top: $(this).scrollTop() - 25 + "px"
            })
        })
    };


var stickyRun = function () {
    var a, b, c, d, e = $('[pn-sticky="1"]'),
        f = $(window).scrollTop(),
        g = $(window).outerHeight();
    e && e.length > 0 && e.each(function () {
        c = $(this).attr("pn-style-offset-left") + "px", d = parseFloat($(this).attr("pn-style-offset-top")), a = $(this).attr("pn-sticky-pos"), b = parseFloat($(this).attr("pn-sticky-kc")), f > d || d > f + g ? ($(this).css({
            position: "fixed",
            "z-index": "9999"
        }), "top" == a ? $(this).css({
            top: b,
            bottom: "auto",
            left: c
        }) : $(this).css({
            bottom: b,
            top: "auto",
            left: c
        })) : $(this).hasClass("widget-element") ? $(this).css({
            position: "absolute",
            "z-index": "99",
            top: $(this).attr("pn-style-old-top"),
            left: $(this).attr("pn-style-old-left")
        }) : $(this).hasClass("widget-section") && $(this).css({
            position: "",
            "z-index": "",
            top: "",
            left: ""
        })
    })
},
    sapxepphantuform = function (a) {
        if ($('.widget-element[pn-type="button"][pn-parent="' + a.attr("id") + '"]').css({
            "z-index": 2
        }), a.attr("pn-vt-item") && a.attr("pn-vt-item").length > 0)
            for (var b = JSON.parse(a.attr("pn-vt-item")), c = 0; c < b.length; c++) {
                var d = a.find('.widget-content:eq(0) .widget-element[pn-type="item_form"]');
                if ($("#" + b[c].id).insertBefore(d.eq(b[c].vt)), c == b.length - 1) return !0
            } else {
            var b = [],
                e = a.find('.widget-element[pn-type="item_form"]');
            if (!(e && e.length > 0)) return !0;
            e.each(function () {
                var a = {
                    id: $(this).attr("id"),
                    top: parseFloat($(this).css("top"))
                };
                b.push(a)
            });
            for (var c = 0; c < b.length; c++)
                for (var f = 0; f < b.length; f++)
                    if (b[f].top > b[c].top) {
                        var g = {};
                        g.id = b[f].id, g.top = b[f].top, b[f].id = b[c].id, b[f].top = b[c].top, b[c].id = g.id, b[c].top = g.top
                    }
            for (var h = 0; h < b.length; h++)
                if ($("#" + b[h].id).insertBefore(a.find(".widget-element").eq(h)), h == b.length - 1) return !0
        }
    },
    resetInputForm = function () {
        var a = $('.widget-element[pn-type="contact_form"]');
        a && a.length > 0 && a.each(function () {
            var a = $(this).attr("id");
            if ($('.widget-element[pn-type="button"][pn-parent="' + $(this).attr("id") + '"]').css({
                "z-index": 2
            }), $(this).attr("pn-vt-item") && $(this).attr("pn-vt-item").length > 0)
                for (var b = JSON.parse($(this).attr("pn-vt-item")), c = 0; c < b.length; c++) {
                    var d = $("#" + a).find('.widget-content:eq(0) .widget-element[pn-type="item_form"]');
                    a == $("#" + b[c].id).parent().parent().attr("id") && $("#" + b[c].id).insertBefore(d.eq(b[c].vt))
                } else {
                var b = [],
                    e = $(this).find('.widget-element[pn-type="item_form"]');
                if (e && e.length > 0 && (e.each(function () {
                    var a = {
                        id: $(this).attr("id"),
                        top: parseFloat($(this).css("top"))
                    };
                    b.push(a)
                }), b && b.length > 0)) {
                    for (var c = 0; c < b.length; c++)
                        for (var f = 0; f < b.length; f++)
                            if (b[f].top > b[c].top) {
                                var g = {};
                                g.id = b[f].id, g.top = b[f].top, b[f].id = b[c].id, b[f].top = b[c].top, b[c].id = g.id, b[c].top = g.top
                            }
                    for (var h = 0; h < b.length; h++) a == $("#" + b[h].id).parent().parent().attr("id") && $("#" + b[h].id).insertBefore($(this).find(".widget-element").eq(h))
                }
            }
        })
    },
    showImage = function () {
        var a = $(".hide-background-image");
        if (a && a.length > 0) {
            var b = $(window).scrollTop(),
                c = $(window).outerHeight();
            a.each(function () {
                var a = $(this).offset().top,
                    d = $(this).outerHeight();
                b > a + d || a > b + c || $(this).removeClass("hide-background-image")
            })
        }
    },
    bindData = function () {
        var sheetId = $("#pn-databind-sheet").attr('sheet-id') || '';
        if (sheetId == '') return;
        $.getJSON("https://spreadsheets.google.com/feeds/list/" + sheetId + "/1/public/values?alt=json", function (n) {
            var list = n.feed.entry;
            var objs = $("*[pn-data-bind]");
            $.each(objs, function (i, v) {
                var pos = v.attributes['pn-data-bind'].value;
                var type = v.attributes['pn-type'].value;
                var b = pos.split(',');

                $.each(b, function (i, vl) {
                    var tv = vl.split(':');
                    if (tv.length != 2) return;
                    var vp = tv[1].trim().split('.');
                    var to = tv[0].trim();
                    if (vp.length == 2) {
                        var val = list[vp[1] - 2]['gsx$' + vp[0]];
                        if (val == undefined || val.$t == undefined || val.$t == null) return;
                        switch (type) {
                            case 'image':
                                if (to == 'text') {
                                    $(v).find('.widget-content').find('.pn-lazy-load').attr("data-bg", "url('" + val.$t + "')");
                                    $(v).find('.widget-content').find('.pn-lazy-load').css('background-image', 'url(' + val.$t + ')');
                                } else if (to == 'url' && v.attributes['pn-action-type'].value == 'url') {
                                    $(v).attr('pn-action-link', val.$t);
                                    $(v).attr('href', val.$t);
                                }
                                break;
                            case 'textinline':
                                if (to == 'text') {
                                    $(v).find('.widget-content').text(val.$t);
                                } else if (to == 'url' && v.attributes['pn-action-type'].value == 'url') {
                                    $(v).attr('pn-action-link', val.$t);
                                    $(v).attr('href', val.$t);
                                }
                                break;
                            case 'textparagraph':
                                if (to == 'text') {
                                    $(v).find('.widget-content').text(val.$t);
                                } else if (to == 'url' && v.attributes['pn-action-type'].value == 'url') {
                                    $(v).attr('pn-action-link', val.$t);
                                    $(v).attr('href', val.$t);
                                }
                                break;
                            case 'button':
                                if (to == 'text') {
                                    $(v).find('.widget-content').text(val.$t);
                                } else if (to == 'url' && v.attributes['pn-action-type'].value == 'url') {
                                    $(v).attr('pn-action-link', val.$t);
                                    $(v).attr('href', val.$t);
                                }
                                break;
                        }
                    }
                });
            });
        })
    },
    bindLocate = function () {
        fillCities();
    },
    preloadComplete = function () {
        $(".preloader").fadeOut();
    };

function punnelNotify() {
    var t;
    (t = jQuery).fn.punnelNotify = function (e) {
        var i = t.extend({
            showDuration: 4e3,
            hideDuration: 6e3
        }, e),
            a = "https://hstatic.punnel.com/img/icon/notify.svg",
            n = [{
                key: "gsx$title",
                className: ".nttitle"
            }, {
                key: "gsx$content",
                className: ".ntcontent"
            }, {
                key: "gsx$time",
                className: ".nttime"
            }, {
                key: "gsx$image",
                className: ".ntimage img"
            }];
        this.each(function () {
            var e = t(this),
                o = e.data("notify").sheetid, custom = e.data("notify").custom;
            if (void 0 != o && 0 != o.trim().length) {
                n.forEach(function (t) {
                    "gsx$image" != t.key ? e.find(t.className).text("") : e.find(t.className).attr("src", a)
                }), i.showDuration = void 0 != e.data("notify").showDuration ? e.data("notify").showDuration : i.showDuration, i.hideDuration = void 0 != e.data("notify").hideDuration ? e.data("notify").hideDuration : i.hideDuration;
                var r = e.data("notify").position;
                switch (r) {
                    case "topleft":
                        e.css({
                            top: "-100px",
                            left: "0",
                            right: "auto",
                            bottom: "auto"
                        });
                        break;
                    case "topright":
                        e.css({
                            top: "-100px",
                            right: "0",
                            left: "auto",
                            bottom: "auto"
                        });
                        break;
                    case "bottomright":
                        e.css({
                            bottom: "-100px",
                            right: "0",
                            left: "auto",
                            top: "auto"
                        });
                        break;
                    case "bottomleft":
                        e.css({
                            bottom: "-100px",
                            left: "0",
                            right: "auto",
                            top: "auto"
                        });
                        break;
                    default:
                        e[0].style.setProperty("position", "absolute", "important")
                }
                var l = i.showDuration + i.hideDuration;
                t.getJSON("https://spreadsheets.google.com/feeds/list/" + o + "/1/public/values?alt=json", function (t) {
                    var e = t.feed.entry;
                    s(e);
                    var i = e.length;
                    if (custom == false) {
                        e= shuffle(e);
                    }
                    setInterval(function () {
                        s(e)
                    }, l * i)
                })
            }

            function shuffle(arra1) {
                var ctr = arra1.length, temp, index;

                // While there are elements in the array
                while (ctr > 0) {
                    // Pick a random index
                    index = Math.floor(Math.random() * ctr);
                    // Decrease ctr by 1
                    ctr--;
                    // And swap the last element with it
                    temp = arra1[ctr];
                    arra1[ctr] = arra1[index];
                    arra1[index] = temp;
                }
                return arra1;
            }

            function s(o) {
                o = o.sort(function () {
                    return .5 - Math.random()
                });
                var s = i.showDuration,
                    c = i.hideDuration + s;
                t(o).each(function () {
                    var t = this;
                    setTimeout(function () {
                        var i = Object.keys(t);
                        switch (n.forEach(function (n) {
                            if (-1 != i.indexOf(n.key))
                                if ("gsx$image" != n.key) e.find(n.className).text(t[n.key].$t);
                                else {
                                    var o = t[n.key].$t;
                                    Boolean(t[n.key].$t) || (o = a), e.find(n.className).attr("src", o)
                                }
                        }), e.css("opacity", "1"), r) {
                            case "topleft":
                            case "topright":
                                e.css("top", "0");
                                break;
                            case "bottomright":
                            case "bottomleft":
                                e.css("bottom", "0");
                                break;
                            default:
                                e.css("bottom", "0")
                        }
                    }, s), s += l, setTimeout(function () {
                        switch (e.css("opacity", "0"), r) {
                            case "topleft":
                            case "topright":
                                e.css("top", "-100px");
                                break;
                            case "bottomright":
                            case "bottomleft":
                                e.css("bottom", "-100px");
                                break;
                            default:
                                e.css("bottom", "0")
                        }
                    }, c), c += l
                })
            }
        })
    }, $(".pn-notify").punnelNotify()
}

function carouselRun() {
    var t;
    (t = jQuery).fn.carouselRun = function (e) {
        var i = t.extend({
            autoplay: !1,
            delay: 5e3
        }, e);
        this.each(function () {
            var e = t(this),
                n = e.width(),
                o = n * (e.find(".widget-item-child").length - 1),
                a = e.find(".wrap-child");
            a.css("left", 0), a.addClass("animatecarousel");
            var r = parseFloat(a.css("left")),
                l = e.find(".control-slider-right"),
                s = e.find(".control-slider-left");

            function c() {
                0 == r ? s.hide(300) : s.show(300), r == -o ? l.hide(300) : l.show(300)
            }
            c(), l.on("click", function () {
                r > -o && (r -= n, a.css("left", r), c())
            }), s.on("click", function () {
                r < 0 && (r += n, a.css("left", r), c())
            }), i.autoplay = Boolean(e.data("carousel").autoplay) ? e.data("carousel").autoplay : i.autoplay, i.delay = Boolean(e.data("carousel").delay) ? e.data("carousel").delay : i.delay;
            var p, d, h, u = i.autoplay,
                g = i.delay;
            u && setInterval(function () {
                r == -o ? (r = 0, a.css("left", r), c()) : l.click()
            }, g), a.on("touchstart", function (t) {
                f(t)
            }), a.on("touchmove", function (t) {
                v(t)
            }), a.on("touchend", function (t) {
                $()
            }), a.on("mousedown", function (t) {
                f(t)
            }), a.on("mousemove", function (t) {
                v(t)
            }), a.on("mouseup", function (t) {
                $()
            }), a.on("mouseout", function (t) {
                $()
            });
            var m = !1;

            function f(t) {
                m = !0, p = "touchstart" == t.type ? t.originalEvent.touches[0].pageX : t.pageX, a.removeClass("animatecarousel")
            }

            function v(t) {
                m && (h = parseFloat(a.css("left"))) <= 0 && h >= -o && (d = "touchmove" == t.type ? t.originalEvent.touches[0].pageX : t.pageX, (h = r + (d - p)) <= 0 && h >= -o && a.css("left", h))
            }

            function $(t) {
                if (0 != d) {
                    a.addClass("animatecarousel");
                    var e = d - p;
                    h <= 0 && h >= -o && Math.abs(e) >= 10 && (e > 0 ? r += n : r -= n), a.css("left", r), c()
                }
                m = !1, d = 0
            }
        })
    }, $(".pn-carousel").carouselRun()
}

function getUrls(t) {
    for (var e, i = [], a = (t = t.slice(t.indexOf("?") + 1, -1 == t.indexOf("#") ? t.length : t.indexOf("#"))).split("&"), n = 0; n < a.length; n++) e = a[n].split("="), i.push(e[0]), i[e[0]] = decodeURIComponent(e[1]);
    return i
}

function UTMTracking() {
    var t = getUrls(window.location.href),
        e = "";
    Boolean(t.utm_source) && (e = "utm_source=" + t.utm_source, Boolean(t.utm_medium) && (e += "&utm_medium=" + t.utm_medium), Boolean(t.utm_campaign) && (e += "&utm_campaign=" + t.utm_campaign), Boolean(t.utm_term) && (e += "&utm_term=" + t.utm_term), Boolean(t.utm_content) && (e += "&utm_content=" + t.utm_content)), $("a").each(function () {
        var t = $(this).attr("href"),
            i = "";
        Boolean(t) && (t.indexOf("#") > 0 && (i = t.slice(t.indexOf("#") + 1), t = t.slice(0, t.indexOf("#"))), !Boolean(getUrls(t).utm_source) && "" != e && (0 == t.indexOf("/") || t.indexOf("//") > 0) && (t.indexOf("?") > 0 ? t += "&" + e : t += "?" + e, "" != i && (t += "#" + i), $(this).attr("href", t), $(this).attr("pn-action-link", t)))
    })
}

function animatedtext() {
    var t;
    (t = jQuery).fn.ladiHeadline = function (e) {
        var a = t.extend({
            animationType: "rotate-1",
            animationDelay: 2500,
            barAnimationDelay: 3800,
            barWaiting: 800,
            lettersDelay: 50,
            typeLettersDelay: 150,
            selectionDuration: 500,
            typeAnimationDelay: 1300,
            revealDuration: 600,
            revealAnimationDelay: 1500
        }, e),
            n = a.animationDelay;

        function o(e) {
            var i = s(e);
            if (e.parents().hasClass("type")) {
                var n = e.parent(".pn-text-word");
                n.addClass("selected").removeClass("waiting"),
                    setTimeout(function () {
                    n.removeClass("selected"), e.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out")
                }, a.selectionDuration), setTimeout(function () {
                    r(i, a.typeLettersDelay)
                }, a.typeAnimationDelay)
            } else if (e.parents().hasClass("letters")) {
                var p = e.children("i").length >= i.children("i").length;
                ! function e(i, n, r, l) {
                    if (i.removeClass("in").addClass("out"), i.is(":last-child") ? r && setTimeout(function () {
                        o(s(n))
                    }, a.animationDelay) : setTimeout(function () {
                        e(i.next(), n, r, l)
                    }, l), i.is(":last-child") && t("html").hasClass("no-csstransitions")) {
                        var p = s(n);
                        c(n, p)
                    }
                }(e.find("i").eq(0), e, p, a.lettersDelay), l(i.find("i").eq(0), i, p, a.lettersDelay)
            } else e.parents().hasClass("clip") ? e.parents(".pn-text-word").animate({
                width: "2px"
            }, a.revealDuration, function () {
                c(e, i), r(i)
            }) : e.parents().hasClass("loading-bar") ? (e.parents(".pn-text-word").removeClass("is-loading"), c(e, i), setTimeout(function () {
                o(i)
            }, a.barAnimationDelay), setTimeout(function () {
                e.parents(".pn-text-word").addClass("is-loading")
            }, a.barWaiting)) : (c(e, i), setTimeout(function () {
                o(i)
            }, a.animationDelay))
        }

        function r(t, e) {
            t.parents().hasClass("type") ? (l(t.find("i").eq(0), t, !1, e), t.addClass("is-visible").removeClass("is-hidden")) : t.parents().hasClass("clip") && t.parents(".pn-text-word").animate({
                width: t.width() + 10
            }, a.revealDuration, function () {
                setTimeout(function () {
                    o(t)
                }, a.revealAnimationDelay)
            })
        }

        function l(t, e, i, n) {
            var r = e.parent(),
                s = r.parent();
            s.hasClass("pn-text-animated") || (s = s.parent()), (s.hasClass("rotate-2") || s.hasClass("rotate-3") || s.hasClass("scale")) && r.css("width", e.width()), t.addClass("in").removeClass("out"), t.is(":last-child") ? (e.parents().hasClass("type") && setTimeout(function () {
                e.parents(".pn-text-word").addClass("waiting")
            }, 200), i || setTimeout(function () {
                o(e)
            }, a.animationDelay)) : setTimeout(function () {
                l(t.next(), e, i, n)
            }, n)
        }

        function s(t) {
            return t.is(":last-child") ? t.parent().children().eq(0) : t.next().hasClass("after") ? t.parent().children().eq(0) : t.next()
        }

        function c(t, e) {
            t.removeClass("is-visible").addClass("is-hidden"), e.removeClass("is-hidden").addClass("is-visible")
        }
        this.each(function () {
            var e = t(this),
                r = e.find(".pn-text-word"),
                l = r.text();
            r.empty(), r.append('<b class="is-visible">' + l + "</b>");
            var s = Boolean(r.attr("data-word")) ? JSON.parse(r.attr("data-word")) : [];
            if (t.each(s, function (e, i) {
                i = t.trim(i), r.append("<b>" + i + "</b>")
            }), r.parents().hasClass("type") || r.parents().hasClass("loading-bar") || r.parents().hasClass("clip")) {
                r.append('<div class="after"></div>');
                var c = r.css("color");
                r.find(".after").css("background-color", c)
            }
            "type" == a.animationType && r.addClass("waiting");
            var p = e.attr("class").split(" ");
            if (t.each(p, function (t, e) {
                if ("pn-text-animated" === e) return a.animationType = p[t + 1], !1
            }), a.animationType && ("type" == a.animationType || "rotate-2" == a.animationType || "rotate-3" == a.animationType || "scale" == a.animationType ? e.addClass("letters " + a.animationType) : e.addClass(a.animationType)), t(".letters").find("b").each(function () {
                var e = t(this),
                    a = e.text().split(""),
                    n = e.hasClass("is-visible");
                for (i in a) " " === a[i] && (a[i] = "&nbsp;"), e.parents(".rotate-2").length > 0 && (a[i] = "<em>" + a[i] + "</em>"), a[i] = n ? '<i class="in">' + a[i] + "</i>" : "<i>" + a[i] + "</i>";
                var o = a.join("");
                e.html(o).css("opacity", 1)
            }), e.hasClass("loading-bar")) n = a.barAnimationDelay, setTimeout(function () {
                e.find(".pn-text-word").addClass("is-loading")
            }, a.barWaiting);
            else if (e.hasClass("clip")) {
                var d = e.find(".pn-text-word"),
                    h = d.width() + 10;
                d.css("width", h)
            }
            setTimeout(function () {
                o(e.find(".is-visible").eq(0))
            }, n)
        })
    }, $(".pn-text-animated").ladiHeadline()
}

function fillCities() {
    if ($("[name='select_city']").length == 0) return;
    $.each(PnLocation['VN'].data, function (index, item) {
        $("[name='select_city']").append($('<option>').text(item.name).attr('value', item.id));
    });
}

function fillDist() {
    var cityId = $("[name='select_city'] :selected").val();
    var dists = PnLocation['VN'].data[parseInt(cityId)].data;
    $("[name='select_district']").html('');
    $("[name='select_ward']").html('');
    $("[name='select_district']").append($('<option>').text('Chọn quận/huyện').attr('value', null));
    $("[name='select_ward']").append($('<option>').text('Chọn phường/xã').attr('value', null));
    $.each(dists, function (index, item) {
        $("[name='select_district']").append($('<option>').text(item.name).attr('value', item.id));
    });
}

function fillWard() {
    if ($("[name='select_ward']").length == 0) return;
    var cityId = $("[name='select_city'] :selected").val();
    var distId = $("[name='select_district'] :selected").val();
    var wards = PnLocation['VN'].data[parseInt(cityId)].data[parseInt(distId)].data;
    $("[name='select_ward']").html('');
    $.each(wards, function (index, item) {
        $("[name='select_ward']").append($('<option>').text(item.name).attr('value', item.id));
    });
}

function bindLocation() {
    if ($("[name='select_city']").length > 0) {
        setTimeout(
            function () {
                bindLocate();
            }
            , 3000);
    }
}

jQuery.fn.utm_tracking = function (domain, source, medium, campaign) {
    $(this).find('a[href^="' + domain + '"]').each(function () {
        var url = $(this).attr('href');
        $(this).attr('href', url + '?utm_source=' + source + '&utm_medium=' + medium + '&utm_campaign=' + campaign);
    });
}

function fixCss() {
    //$("[pn-type=contact_form]").parent().parent().each(function () {
    //    $(this).css('zIndex', 2);
    //});
    $(".pn-text-word").attr("contenteditable", false);
    $(".pn-text-animated").attr("contenteditable", false);
}

(function (w, d) {
    var b = d.getElementsByTagName('body')[0];
    var s = d.createElement("script");
    var v = !("IntersectionObserver" in w) ? "8.17.0" : "10.19.0";
    s.async = true; 
    s.src = "https://cdn.jsdelivr.net/npm/vanilla-lazyload@" + v + "/dist/lazyload.min.js";
    w.lazyLoadOptions = { elements_selector: ".pn-lazy-load"};
    b.appendChild(s);
}(window, document));

$(document).ready(function () {
    showImage(), resetInputForm(), preloadComplete();
    var a = $(".punnel-wraper-page");
    a && a.length > 0 || $(".widget-section").wrapAll("<div class='punnel-wraper-page'/>");
    var b = new ReponsivePage;
    //b.init(),
        showPopupLoadPage(), $(".pn-close-fb-mes").unbind("click").click(function (a) {
        var b = $(this).parent();
        if (b && b.hasClass("widget-element")) {
            '<style id-style-mes="' + b.attr("id") + '">#' + b.attr("id") + " .widget-content{display:none!important}</style>";
            $('style[id-style-mes="' + b.attr("id") + '"]').remove(), b.find(".widget-content").removeClass("fadeOutDown fadeInUp animated").addClass("fadeOutDown animated"), setTimeout(function () { }, 1e3), $(this).hide(), b.find(".pn-open-fb-mes").show()
        }
    }), $(".pn-open-fb-mes").unbind("click").click(function (a) {
        var b = $(this).parent();
        if (b && b.hasClass("widget-element")) {
            var c = '<style id-style-mes="' + b.attr("id") + '">#' + b.attr("id") + " .widget-content{display:block!important}</style>";
            $('style[id-style-mes="' + b.attr("id") + '"]').remove(), b.find(".widget-content").eq(0).removeClass("fadeInUp fadeOutDown animated").addClass("fadeInUp animated"), $("head").append(c), $(this).hide(), b.find(".pn-close-fb-mes").show()
        }
    }), $('.widget-element[pn-type!="button"]').removeAttr("href"), $(".widget-element .widget-content").removeAttr("href"), $(window).resize(function () {
        resetTopPopup(), showImage()
    }), $("input").focus(function (a) {
        a.preventDefault()
    }), $('.widget-section[pn-display="none"]').css({
        display: "none"
    }), $('.widget-section[pn-popup="true"]').hide(), $('.widget-element[pn-type="countdown"]').each(function () {
        var a, b = $(this).attr("pn-endtimeType");
        if (a = $(this).attr("pn-endtime"), "time" == b) a = a.replace("GMT ", "GMT+"), countDown($(this), new Date(a));
        else {
            var c = new Date;
            c.setMinutes(c.getMinutes() + parseFloat(a)), countDown($(this), new Date(c))
        }
    }), $(".widget-section").click(function (a) {
        if ("true" == $(this).attr("pn-popup") && ($(a.target).hasClass("widget-section") || $(a.target).hasClass("punnel-widget-overlay") && "true" == $(a.target).parent().attr("pn-popup"))) {
            if ($(a.target).hasClass("punnel-widget-overlay") && "true" == $(a.target).parent().attr("pn-popup")) {
                var b = $(a.target).parent().find(".container").eq(0);
                a.pageX >= b.offset().left && a.pageX <= b.offset().left + b.outerWidth() && a.pageY >= b.offset().top && a.pageY <= b.offset().top + b.outerHeight() || ($(this).addClass("pn-hidepopup"), $(this).removeClass("pn-showpopup"), $(this).hide(), $("body").css({
                    overflow: "auto"
                }))
            } else $(this).addClass("pn-hidepopup"), $(this).removeClass("pn-showpopup"), $(this).hide(), $("body").css({
                overflow: "auto"
            });
            var c = $(this).find('.widget-element[pn-type="videoyoutube"] .widget-content:eq(0)');
            c && c.length > 0 && c.each(function () {
                var a = $(this).attr("src");
                a = a.replace("autoplay=1", "autoplay=0"), $(this).attr("src", a)
            })
        }
    });

    
    
    $("[name='select_city']").change(function () {
        fillDist();
    });
    $("[name='select_district']").change(function () {
        fillWard();
    });

    var c = new LadiApp;
    c.init(), c.runAdimate(), c.runAnimateSection(), $(document).mouseleave(function () {
        showPopupExitPage()
    }), $('.widget-element[pn-type="facebook_comment"]').scrollTop(0);
    var d = $('[pn-sticky="1"]');
    d && d.length > 0 && d.each(function () {
        $(this).parent();
        $(this).attr({
            "pn-style-old-top": $(this).css("top"),
            "pn-style-old-left": $(this).css("left"),
            "pn-style-offset-top": $(this).offset().top,
            "pn-style-offset-left": $(this).offset().left
        })
    }), stickyRun(), accountFree(), carouselRun(), UTMTracking(), animatedtext(), fixCss(), punnelNotify(), bindData(), bindLocation()
});