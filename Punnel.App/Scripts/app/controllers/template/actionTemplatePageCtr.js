!(function (global, factory) {
    "use strict";

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = global.document ? factory(global, true) : function (w) {
            if (!w.document) {
                throw new Error("harafunnel widget requires a window with a document");
            }

            return factory(w);
        };
    } else {
        factory(global);
    }
})(typeof window !== "undefined" ? window : this, function (window) {
    "use strict";

    var utils = {
        randomInt: function () {
            var min = Number.MIN_SAFE_INTEGER;
            var max = Number.MAX_SAFE_INTEGER;

            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        isMobile: function (plusWidthScreen) {
            return plusWidthScreen && screen && screen.width ?
                (screen.width <= 699 || navigator.userAgent.match(/(iPad|iPhone|iPod|Android)/g) ? true : false) :
                (navigator.userAgent.match(/(iPad|iPhone|iPod|Android)/g) ? true : false)
        },
        getNewGuid: function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        },
        setCookie: function (cname, cvalue, exdays, samesite) {
            var d = new Date();
            d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
            var expires = "expires=" + d.toUTCString();
            var c = cname + "=" + cvalue + ";" + expires + ";path=/;";
            if (samesite) c += "SameSite=" + samesite + ";";
            document.cookie = c;
        },
        getCookie: function (cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) == 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        },
        removeCookie: function (cname, cpath, cdomain) {
            document.cookie = encodeURIComponent(cname) +
                "=; expires=Thu, 01 Jan 1970 00:00:00 GMT" +
                (cdomain ? "; domain=" + cdomain : "") +
                (cpath ? "; path=" + cpath : "");
        },

        getParameterByName: function (name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },
        addListener: function (element, eventName, handler) {
            if (element.addEventListener) {
                element.addEventListener(eventName, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + eventName, handler);
            } else {
                element['on' + eventName] = handler;
            }
        },

        hasCustomerChat: false
    };

    function fw1(a, p, w, c) {
        if (utils.hasCustomerChat) {
            return;
        }
        if (c == null || c == undefined || c.length == 0) {
            return;
        }

        utils.hasCustomerChat = true;

        var element = document.createElement('div');
        element.setAttribute('class', 'fb-customerchat');
        element.setAttribute('page_id', p);
        //element.setAttribute('minimized', 'true');

        if (c.greeting_dialog_display)
            element.setAttribute('greeting_dialog_display', c.greeting_dialog_display);
        else
            element.setAttribute('greeting_dialog_display', 'hide');

        if (c.logged_in_greeting) {
            element.setAttribute('logged_in_greeting', c.logged_in_greeting);
        }

        if (c.logged_out_greeting) {
            element.setAttribute('logged_out_greeting', c.logged_out_greeting);
        }
        if (w.hasOwnProperty('ref')) {
            var ref = w['ref'];

            if (ref != undefined && ref != null && ref.length > 0)
                element.setAttribute('ref', ref);
        }

        document.getElementsByTagName('body').item(0).append(element);

        if (utils.isMobile(true)) {
            var interval = setInterval(function () {
                var fbRoot = document.getElementById('fb-root');
                var fbDialog = fbRoot.getElementsByClassName('fb_dialog');

                if (fbDialog && fbDialog.length > 0) {
                    fbDialog
                        .css('display', 'inline')
                        .html('<img src="//staticxx.facebook.com/images/messaging/commerce/livechat/MessengerIcon.png" height="60" width="60" alt="" class="img">')
                        .click(function (e) {
                            var url = '//m.me/' + p;
                            window.open('//m.me/' + p + '?ref=' + ref, '_blank');
                        });

                    clearInterval(interval);
                }
            }, 250);
        }
    };

    function fw2(a, p, w, c) {
        if (c == null || c == undefined || c.length == 0) {
            return;
        }
        var size = c.settings != null ? c.settings.button_size : 'standard';
        var align = c.settings != null ? c.settings.plugin_align : false;
        var skin = (c.settings != null && c.settings.skin == 1) ? 'light' : 'dark';
        var element = document.createElement('div');
        var origin = 'https://' + location.hostname;
        element.setAttribute('class', 'fb-messenger-checkbox');
        element.setAttribute('origin', origin);
        element.setAttribute('page_id', p);
        element.setAttribute('minimized', 'true');
        element.setAttribute('messenger_app_id', a);
        element.setAttribute('prechecked', 'false');
        element.setAttribute('size', size);
        element.setAttribute('skin', skin);
        element.setAttribute('center_align', align);
        element.setAttribute('id', c.growthtool_id);
        if (w.hasOwnProperty('ref')) {
            var ref = utils.getNewGuid();
            var id = w['id']
            if (ref != undefined && ref != null && ref.length > 0)
                element.setAttribute('user_ref', ref);
        }

        var dataWidget = "[data-widget-id='" + id + "']";

        var checkboxPosition = document.querySelectorAll(dataWidget);
        if (checkboxPosition != null && checkboxPosition.length > 0) {
            checkboxPosition[0].replaceWith(element);
        }

    };

    function init(a, p, w, c) {
        if (w != undefined && w != null && w.hasOwnProperty('type')) {
            var t = w['type'];

            if (t === 'customer_chat') fw1(a, p, w, c);
        }
    };

    function init2(a, p, w, c) {
        if (w != undefined && w != null && w.hasOwnProperty('type') && c != null) {

            fw2(a, p, w, c);
        }
    };


    if (window.hasOwnProperty('hrfwidget')) {
        debugger
        var js = window['hrfwidget'];
        if (js != undefined && js != null && js.hasOwnProperty('appId') && js.hasOwnProperty('pageId') && js.hasOwnProperty('widgets')) {
            var appId = js['appId'];
            var pageId = js['pageId'];
            var widgets = js['widgets'];
            var checkboxs = js['checkboxs'];
            var customer_chats = js['customer_chats'];
            if (appId == undefined || appId == null) return;
            if (pageId == undefined || pageId == null) return;
            if (widgets == undefined || widgets == null || !Array.isArray(widgets) || widgets.length == 0) return;

            var id = 'facebook-jssdk';
            if (document.getElementById(id)) {
                widgets.map(function (w) {
                    var t = w['type'];
                    if (t === 'customer_chat') {
                        var index = customer_chats.findIndex(p => p.growthtool_id == w['id']);
                        var c = null;
                        if (index > -1)
                            c = customer_chats[index];
                        init(appId, pageId, w, c);
                    } else if (t === 'checkbox') {
                        var index = checkboxs.findIndex(p => p.growthtool_id == w['id']);
                        var c = null;
                        if (index > -1)
                            c = checkboxs[index];
                        init2(appId, pageId, w, c);
                    }

                });
            } else {
                var js, id = 'facebook-jssdk';
                if (document.getElementById(id)) {
                    return;
                }
                js = document.createElement('script');
                js.id = id;
                js.async = true;
                js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js#xfbml=1&appId=" + appId + "&version=v2.0";
                js.onload = function () {
                    widgets.map(function (w) {
                        var t = w['type'];
                        if (t === 'customer_chat') {
                            var index = customer_chats.findIndex(p => p.growthtool_id == w['id']);
                            var c = null;
                            if (index > -1)
                                c = customer_chats[index];
                            init(appId, pageId, w, c);
                        } else if (t === 'checkbox') {
                            var index = checkboxs.findIndex(p => p.growthtool_id == w['id']);
                            var c = null;
                            if (index > -1)
                                c = checkboxs[index];
                            init2(appId, pageId, w, c);
                        }
                    });
                };

                document.getElementsByTagName('head')[0].appendChild(js);
            }
        }
    }
});