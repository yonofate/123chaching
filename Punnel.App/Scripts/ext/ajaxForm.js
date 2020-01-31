var AjaxForm = function () { },
    sendFormServer = function (a, b, c) {
        var d = [],
            e = [];
        if (c && c.length > 0)
            for (var f = 0; f < c.length; f++) {
                var g = "";
                g = c[f].idName && c[f].idName.length > 0 ? c[f].idName : c[f].key, n = {
                    name: g,
                    value: c[f].value,
                    LadiName: c[f].key
                }, d.push(n)
            }
        var h = getUtm("utm_source"),
            i = getUtm("utm_medium"),
            j = getUtm("utm_campaign"),
            k = getUtm("utm_term"),
            l = getUtm("utm_content"),
            m = window.location.href,
            n = {
                name: "url_page",
                value: m
            };
        e.push(n), n = {
            name: "utm_source",
            value: h
        }, e.push(n), n = {
            name: "utm_medium",
            value: i
        }, e.push(n), n = {
            name: "utm_campaign",
            value: j
        }, e.push(n), n = {
            name: "utm_term",
            value: k
        }, e.push(n), n = {
            name: "utm_content",
            value: l
        }, e.push(n), d && d.length > 0 && $.ajax({
            type: "POST",
            url: "https://api.punnel.com/form/Config/SendForm",
            data: {
                formdetailid: a.attr("id-conf-sv"),
                form_data: d,
                tracking_form: e
            },
            success: function (a) {
                checkForm.countTo++, 200 == a.code && (checkForm.value = "true")
            },
            error: function (a) {
                checkForm.countTo++
            }
        })
    },
    sendFormClient = function (a, b, c) {
        var d = a.attr("pn-config-client");
        if (d && d.length > 0) {
            d = JSON.parse(a.attr("pn-config-client"));
            for (var e = 0; e < d.length; e++) switch (d[e].Type) {
                case "api":
                    sendFormClientApi(a, c, d[e].UrlApi);
                    break;
                case "google-form":
                    var f = d[e].Fvv,
                        g = d[e].DraftResponse,
                        h = d[e].PageHistory,
                        i = d[e].Fbzx,
                        j = d[e].Action;
                    sendFormClientGoogleForm(a, d[e].List, f, g, h, i, j)
            }
        }
    },
    sendFormClientApi = function (a, b, c) {
        for (var d = {}, e = 0; e < b.length; e++) d[b[e].idName] = b[e].value;
        var f = getUtm("utm_source"),
            g = getUtm("utm_medium"),
            h = getUtm("utm_campaign"),
            i = getUtm("utm_term"),
            j = getUtm("utm_content"),
            k = window.location.href;
        d.link = k, f && f.length > 0 && (d.utm_source = f), g && g.length > 0 && (d.utm_medium = g), h && h.length > 0 && (d.utm_campaign = h), i && i.length > 0 && (d.utm_term = i), j && j.length > 0 && (d.utm_content = j), $.ajax({
            type: "POST",
            url: c,
            contentType: "application/x-www-form-urlencoded",
            data: d,
            success: function (a) {
                checkForm.value = "true", checkForm.countTo++
            },
            error: function (a) {
                checkForm.countTo++
            }
        })
    },
    sendFormClientGoogleForm = function (a, b, c, d, e, f, g) {
        var h = {},
            i = "";
        if (h.fvv = c, h.draftResponse = d, h.pageHistory = e, h.fbzx = f, b && b.length > 0) {
            for (var j = 0; j < b.length; j++) i += $("#" + b[j].id).find(".widget-content").eq(0).val(), h[b[j].idGoogleForm] = $("#" + b[j].id).find(".widget-content").eq(0).val();
            if (i) {
                var k = new AjaxForm;
                k.senForm(h, a, g)
            } else popupForm("Vui lÃ²ng Ä‘iá»n thÃ´ng tin khÃ´ng Ä‘Æ°á»£c Ä‘á»ƒ trá»‘ng!", "punnel-check-value")
        }
    };
AjaxForm.prototype.sendValue = function (a, b, c, d, e) {
    var f = a.attr("pn-type-form"),
        g = $('.widget-element[pn-parent="' + a.attr("id") + '"]'),
        h = g.find(".widget-content").eq(0).html();
    if (
        g.attr("pn-value-text", h),
        g.find(".widget-content").eq(0).text("Vui lòng đợi"),
        a.attr("id-conf-sv") && a.attr("id-conf-sv").length > 0 || a.attr("pn-config-client") && a.attr("pn-config-client").length > 0)
        a.attr("id-conf-sv") && a.attr("id-conf-sv").length > 0 && (checkForm.countForm++, sendFormServer(a, d, c)), a.attr("pn-config-client") && a.attr("pn-config-client").length > 0 && (checkForm.countForm++, sendFormClient(a, d, c));
    else {
        checkForm.countForm++;
        this.saveGoogleSheet(a);
    }

    setTimeout(function () {
        var b = $('.widget-element[pn-parent="' + a.attr("id") + '"]');
        b && b.length > 0 && (b.css({
            "pointer-events": "auto"
        }), b.find(".widget-content").eq(0).html(g.attr("pn-value-text")))
    }, 3e3);
    var i = setInterval(function () {
        if (checkForm.countTo == checkForm.countForm && 0 != checkForm.countForm) {
            if (clearInterval(i), "true" == checkForm.value) {
                runTrackingForm(a), popupForm(a.attr("pn-message-form"), a.attr("id")), a.find(".widget-element .widget-content").val("");
                var b = $('.widget-element[pn-parent="' + a.attr("id") + '"]');
                b.find(".widget-content").eq(0).html(b.attr("pn-value-text"))
            } else {
                popupForm("ÄÃ£ xáº£y ra lá»—i, vui lÃ²ng kiá»ƒm tra láº¡i! Hoáº·c liÃªn há»‡ vá»›i chÃºng tÃ´i Ä‘á»ƒ Ä‘Æ°á»£c há»— trá»£!", a.attr("id")), a.find(".widget-element .widget-content").val("");
                var b = $('.widget-element[pn-parent="' + a.attr("id") + '"]');
                b.find(".widget-content").eq(0).html(b.attr("pn-value-text"))
            }
            checkForm.countForm = 0, checkForm.countTo = 0, checkForm.value = "false"
        }
    }, 200)
}, AjaxForm.prototype.saveApi = function (a) {
    for (var b = a.find(".widget-content:eq(0) .widget-element"), c = {}, d = JSON.parse(a.attr("pn-data-form")), e = 0; e < d.length; e++) b.each(function (a) {
        d[e].name == $(this).find(".widget-content").eq(0).attr("name") && (c[d[e].value] = $(this).find(".widget-content").eq(0).val())
    });
    var f = getUtm("utm_source"),
        g = getUtm("utm_medium"),
        h = getUtm("utm_campaign"),
        i = getUtm("utm_term"),
        j = getUtm("utm_content"),
        k = window.location.href;
    f && f.length > 0 && (c.utm_source = f), g && g.length > 0 && (c.utm_medium = g), h && h.length > 0 && (c.utm_campaign = h), i && i.length > 0 && (c.utm_term = i), j && j.length > 0 && (c.utm_content = j), c.link = k;
    var l = a.attr("pn-action");
    $.ajax({
        type: "POST",
        url: l,
        contentType: "application/x-www-form-urlencoded",
        data: c,
        success: function (a) {
            checkForm.countTo++, checkForm.value = "true"
        },
        error: function (a) {
            checkForm.countTo++
        }
    })
}, AjaxForm.prototype.saveGoogleSheet = function (a) {
    var b, c = a.find(".widget-content:eq(0) .widget-element"),
        d = [],
        e = a.attr("pn-action");
    if (c && c.length > 0 && (d = [], c.each(function () {
            b = {}, b = {
        top: $(this).offset().top,
        name: $(this).find(".widget-content").eq(0).attr("pn-name-id"),
        value: $(this).find(".widget-content").eq(0).val()
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
            name: "link",
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
    }, d.push(b), d && d.length > 0 &&
    $.ajax({
        "async": true,
        "crossDomain": true,
        type: "POST",
        "headers": {
            "content-type": "application/x-www-form-urlencoded"
        },
        url: "https://api.punnel.com/contactform/fill",
        data: {
            id: $("head .title-site").attr("pn-id"), //e
            dataForm: d
        },
        success: function (a) {
            checkForm.countTo++, checkForm.value = "true"
        },
        error: function (a) {
            checkForm.countTo++
        }
    })
}, AjaxForm.prototype.google = function (a) {
    var b, c = (a.attr("pn-action"), JSON.parse(a.attr("pn-data-form"))),
        d = a.find(".widget-content:eq(0) .widget-element");
    b = c.itemsSave && c.itemsSave.length > 0 ? c.itemsSave : c.items;
    var e = {},
        f = "";
    b && b.length > 0 ? (d.each(function (a) {
        for (var c = 0; c < b.length; c++)
            if (f += $(this).find(".widget-content").eq(0).val(), $(this).find(".widget-content").eq(0).attr("name") == b[c].nameFormUser) {
                e[b[c].id] = $(this).find(".widget-content").eq(0).val();
                break
            }
    }), e.fvv = c.fvv, e.draftResponse = c.draftResponse, e.pageHistory = c.pageHistory, e.fbzx = c.fbzx, f ? this.senForm(e, a, c.action) : popupForm("Vui lÃ²ng Ä‘iá»n thÃ´ng tin khÃ´ng Ä‘Æ°á»£c Ä‘á»ƒ trá»‘ng!", "punnel-check-value")) : popupForm("ChÆ°a gá»­i Ä‘Æ°á»£c thÃ´ng tin. Vui lÃ²ng liÃªn há»‡ trá»±c tiáº¿p vá»›i chÃºng tÃ´i!", "punnel-check-value")
}, AjaxForm.prototype.linkPost = function (a) {
    var b = a.find(".widget-content:eq(0) .widget-element"),
        c = {};
    b.each(function () {
        c[$(this).find(".widget-content").eq(0).attr("name")] = $(this).find(".widget-content").eq(0).val()
    });
    var d = a.attr("pn-action");
    this.senForm(c, a, d)
}, AjaxForm.prototype.saveFormPc = function (a, b, c, d, e) {
    var f = "https://api.punnel.com/api/subcrible",
        g = {
            formid: b,
            listcontact: c,
            punnelid: d,
            name: e
        };
    this.senForm(g, a, f)
}, AjaxForm.prototype.email = function (a) {
    var b = a.find(".widget-content:eq(0) .widget-element"),
        c = {},
        d = "",
        e = "";
    b.each(function () {
        $(this).find(".widget-content").eq(0).attr("pn-label") ? (d = d + "" + $(this).find(".widget-content").eq(0).attr("pn-label") + ": " + $(this).find(".widget-content").eq(0).val() + "<br>", c[$(this).find(".widget-content").eq(0).attr("pn-label")] = $(this).find(".widget-content").eq(0).val()) : (d = d + "" + $(this).find(".widget-content").eq(0).attr("name") + ": " + $(this).find(".widget-content").eq(0).val() + "<br>", c[$(this).find(".widget-content").eq(0).attr("name")] = $(this).find(".widget-content").eq(0).val()), e += $(this).find(".widget-content").eq(0).val()
    });
    var f = a.attr("pn-action"),
        g = {
            from: '"Punnel" <no-reply@punnel.com>',
            to: f,
            subject: "Thông báo dữ liệu từ: " + window.location.href,
            text: "Dữ liệu:",
            html: d + "<br>Dữ liệu từ: " + window.location.href,
            id: $("head .title-site").attr("pn-id")
        };
    f && f.length > 0 && -1 != f.search("https://docs.google.com/forms") || f && f.length > 0 && -1 != f.search("https://goo.gl/forms") ? this.google(a) : e ? $.ajax({
        type: "POST",
        url: "https://api.punnel.com/contactform/fill",
        data: g,
        success: function (a) {
            checkForm.countTo++, 200 == a.code && (checkForm.value = "true")
        },
        error: function (a) {
            checkForm.countTo++
        }
    }) : popupForm("Vui lòng nhập dữ liệu trước khi gửi!", a.attr("id"))
}, AjaxForm.prototype.mailchimp = function (a) {
    var b = a.find(".widget-content:eq(0) .widget-element"),
        c = {},
        d = "",
        e = "";
    b.each(function () {
        $(this).find(".widget-content").eq(0).attr("pn-label") ? (d = d + "" + $(this).find(".widget-content").eq(0).attr("pn-label") + ": " + $(this).find(".widget-content").eq(0).val() + "<br>", c[$(this).find(".widget-content").eq(0).attr("pn-label")] = $(this).find(".widget-content").eq(0).val()) : (d = d + "" + $(this).find(".widget-content").eq(0).attr("name") + ": " + $(this).find(".widget-content").eq(0).val() + "<br>", c[$(this).find(".widget-content").eq(0).attr("name")] = $(this).find(".widget-content").eq(0).val()), e += $(this).find(".widget-content").eq(0).val()
    });
    var f = a.attr("pn-action"),
        g = {
            from: '"Punnel" <no-reply@punnel.com>',
            to: f,
            subject: "Thông báo dữ liệu từ: " + window.location.href,
            text: "Dữ liệu:",
            html: d + "<br>Dữ liệu từ: " + window.location.href,
            id: $("head .title-site").attr("pn-id")
        };
    e ? $.ajax({
        type: "POST",
        url: "https://api.punnel.com/contactform/fill",
        data: g,
        success: function (a) {
            checkForm.countTo++, 200 == a.code && (checkForm.value = "true")
        },
        error: function (a) {
            checkForm.countTo++
        }
    }) : popupForm("Vui lòng nhập dữ liệu trước khi gửi!", a.attr("id"))
}, AjaxForm.prototype.getresponse = function (a) {
    var b = a.find(".widget-content:eq(0) .widget-element"),
        c = {},
        d = "",
        e = "";
    b.each(function () {
        $(this).find(".widget-content").eq(0).attr("pn-label") ? (d = d + "" + $(this).find(".widget-content").eq(0).attr("pn-label") + ": " + $(this).find(".widget-content").eq(0).val() + "<br>", c[$(this).find(".widget-content").eq(0).attr("pn-label")] = $(this).find(".widget-content").eq(0).val()) : (d = d + "" + $(this).find(".widget-content").eq(0).attr("name") + ": " + $(this).find(".widget-content").eq(0).val() + "<br>", c[$(this).find(".widget-content").eq(0).attr("name")] = $(this).find(".widget-content").eq(0).val()), e += $(this).find(".widget-content").eq(0).val()
    });
    var f = a.attr("pn-action"),
        g = {
            from: '"Punnel" <no-reply@punnel.com>',
            to: f,
            subject: "Thông báo dữ liệu từ: " + window.location.href,
            text: "Dữ liệu:",
            html: d + "<br>Dữ liệu từ: " + window.location.href,
            id: $("head .title-site").attr("pn-id")
        };
    e ? $.ajax({
        type: "POST",
        url: "https://api.punnel.com/contactform/fill",
        data: g,
        success: function (a) {
            checkForm.countTo++, 200 == a.code && (checkForm.value = "true")
        },
        error: function (a) {
            checkForm.countTo++
        }
    }) : popupForm("Vui lòng nhập dữ liệu trước khi gửi!", a.attr("id"))
}, AjaxForm.prototype.senForm = function (a, b, c) {
    var d, e = $('.widget-element[pn-parent="' + b.attr("id") + '"]');
    e && e.length > 0 && "popup" == e.attr("pn-action-type") && (d = $("#" + e.attr("pn-action-link"))), $.ajax({
        type: "POST",
        url: c,
        data: a,
        success: function (a) {
            checkForm.countTo++, checkForm.value = "true"
        },
        error: function (a) {
            checkForm.countTo++;
            var c = b.attr("pn-type-form");
            "pc" == c || (checkForm.value = "true")
        }
    })
};