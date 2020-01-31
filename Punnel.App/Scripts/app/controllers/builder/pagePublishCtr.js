angular.module("punnelApp").controller("pagePublishCtr", ["$scope", "$stateParams", "$restful", "$ladiService", "$mdDialog", 'data', function ($scope, $stateParams, $restful, $ladiService, $mdDialog, data) {
    $scope.domain = data.domain;
    $scope.domains = [];
    $scope.canPublish = true;
    $scope.new = false;

    $scope.initDomains = function () {
        $restful.get("/domain").then(function (res) {
            $scope.domains = res.data;
            //if ($scope.domains.length == 0) $scope.new = true;
        });
    }


    $scope.isPreviewDomain = function (domain) {
        if (domain.match("^landing.punnel.com")) {
            return true;
        }
        return false;
    }

    $scope.publishPage = function (k) {
        var options = this;
        if ($scope.canPublish===true) {
            //var BDA = new resetPage;
            if (!($scope.domain && $scope.domain.length > 0)) {
                $scope.domain = ApiDemo.replace("https://", "").replace("http://", "") + $stateParams.id;
            }
            $scope.domain = $.trim($scope.domain);
            $scope.domain = $scope.domain.replace(/ /g, "");
            if (options.checkDomain($scope.domain)) {
                $scope.domain = $scope.domain.replace("http", "");
                $scope.domain = $scope.domain.replace("https", "");
                if ("/" == $scope.domain.substr(-1)) {
                    $scope.domain = $scope.domain.substr(0, $scope.domain.length - 1);
                }
                dummyData.domain = $scope.domain;
                PN_PAGE.pageLoading.hide();
                $scope.getHtmlLandingpage(function (cando, ref) {
                    if (ref) {
                        PN_PAGE.loading.show();
                        $restful.post("/publish/page", {
                            id: $stateParams.id,
                            html: ref.html,
                            source: JSON.stringify(dummyData),
                            domain: $scope.domain,
                            listForm: ref.listForm
                        }).then(function (res) {
                            PN_PAGE.loading.hide();
                            swal("Đã xuất bản thành công!", "", "success");
                            $scope.domainPreview = $scope.checkdomainPreview(res.data);
                            dummyData.typePublish = "";
                            var req;
                            req = ApiDemo + $stateParams.id;
                            $scope.createThumbnail(req, function () {
                            });                            
                        });
                    } else {
                        PN_PAGE.loading.hide();
                        PN_PAGE.showMessage("Kh\u00f4ng c\u00f3 d\u1eef li\u1ec7u!", 'error');
                    }
                });
            }
            else {
                PN_PAGE.showMessage("\u0110\u1ecbnh d\u1ea1ng domain kh\u00f4ng \u0111\u00fang! Vui l\u00f2ng ki\u1ec3m tra l\u1ea1i!", 'error');
            }
        } else {
            PN_PAGE.showMessage("Vui l\u00f2ng n\u00e2ng c\u1ea5p \u0111\u1ec3 s\u1eed d\u1ee5ng t\u00ednh n\u0103ng n\u00e0y!", 'error');
        }
    };

    $scope.getfont = function (results) {
        var content = "";
        var commandHistory = [""];
        if (results && results.length > 0) {
            var i = 0;
            for (; i < results.length; i++) {
                if (results[i].media.classFont && results[i].media.classFont.length > 0 && -1 == $.inArray(results[i].media.classFont, commandHistory)) {
                    commandHistory.push(results[i].media.classFont);
                    var index = 0;
                    for (; index < lp_fonts.length; index++) {
                        if (results[i].media.classFont == lp_fonts[index]["class"]) {
                            content = content + ("" == content ? lp_fonts[index].font_api : "|" + lp_fonts[index].font_api);
                        }
                    }
                }
            }
        }
        return content;
    };

    $scope.getHtmlLandingpage = function (html_source) {
        if (1 == PN_PAGE.sortMobilePublish) {
            $ladiService.sortElementMobile();
            $ladiService.sortElementDesktop();
        }
        var _css = PN_PAGE.cssDefault;
        var _font = $scope.getfont(dummyData.apiElement);
        var _css_mobile = new RenCssMobile;
        var _css_responsive = "@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (orientation: portrait) {}";
        _css_responsive = _css_responsive + "@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {}";
        _css_responsive = _css_responsive + "@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {}";
        _css_responsive = _css_responsive + "@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {}";
        _css_responsive = _css_responsive + "@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation : portrait) {}";
        _css_responsive = _css_responsive + "@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation : landscape) {}";
        _css_responsive = _css_responsive + "@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation : portrait) {}";
        _css_responsive = _css_responsive + "@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation : landscape) {}";
        var base = "/*default*/" + _css + "/*custom*/" + _css_mobile.testCss(dummyData.apiElement) + "/*view*/" + _css_responsive;
        var that = $scope.saveHtmlPage(dummyData.apiElement, _css, _font, _css_mobile.testCss(dummyData.apiElement));
        var title = that.html;
        var names = that.list;
        $scope.resetHtmlPage();
        html_source(null, {
            html: title,
            css: base,
            listForm: names
        });
    };

    $scope.saveHtmlPage = function (list, scene, srvs, srvsDis) {
        var certs = [];
        var pix_color = "";
        var i = list.length - 1;
        for (; i >= 0; i--) {
            if ("GROUP_TMP" == list[i].id || "group" == list[i].type_plugin) {
                list.splice(i, 1);
            }
            var mainMessage = $scope.createTrackingPopup(list[i]);
            if (mainMessage && mainMessage.length > 0) {
                var data = {
                    id: list[i].id.toLowerCase(),
                    html: mainMessage
                };
                certs.push(data);
            }
        }
        $(".horizontal-line").appendTo($(".is-maincontent"));
        PN_PAGE.PUNNEL_EDIT.html("");
        var that = new setHtmlLadi;
        var m = 0;
        var n = 0;
        var g_wrappedText = "";
        var indent = "";
        i = 0;
        for (; i < list.length; i++) {
            that.getTemplate(list[i], list[i].type_plugin, function () {
            });
            if ("googlemap" == list[i].type_plugin) {
                n = 1;
                g_wrappedText = list[i].keyapi;
            }
            if (list[i].custom_css) {
                pix_color = pix_color + list[i].custom_css;
            }
            var api_key;
            switch (list[i].type_plugin) {
                case "facebook_comment":
                    m++;
                    if (list[i].value_facebook_comment && list[i].value_facebook_comment.api_key && list[i].value_facebook_comment.api_key.length > 0) {
                        indent = '<meta property="fb:app_id" content="' + list[i].value_facebook_comment.api_key + '" />';
                        api_key = list[i].value_facebook_comment.api_key;
                    }
                    PN_PAGE.getElement("#" + list[i].id).html(valueTemplate.facebook_comment_finish);
                    PN_PAGE.getElement("#" + list[i].id + " .fb-comments").eq(0).attr("data-href", list[i].value_facebook_comment.url).attr("data-numposts", list[i].value_facebook_comment.number_post);
                    break;
                case "facebook_messages":
                    m++;
                    PN_PAGE.getElement("#" + list[i].id).html(valueTemplate.facebook_messages_finish);
                    PN_PAGE.getElement("#" + list[i].id + " .widget-content").eq(0).attr("data-href", list[i].value_facebook_messages.url).attr("data-width", parseFloat(list[i].media[deviceEdit].width)).attr("data-height", parseFloat(list[i].media[deviceEdit].height));
                    break;
                case "image":
                    PN_PAGE.getElement("#" + list[i].id + " .widget-content:eq(0) img").eq(0).remove();
                    PN_PAGE.getElement("#" + list[i].id + " .widget-content").eq(0).prepend(valueTemplate.image_publish);
                    PN_PAGE.getElement("#" + list[i].id + " .widget-content:eq(0) .pn-show-image").eq(0).attr("alt", list[i].link);
            }
        }
        var desc = dummyData.desc;
        var keyword = dummyData.keyword;
        var topicTitle = dummyData.title;
        var keys = $stateParams.id;
        var base = "";
        var lineCount = dummyData.idpixel;
        var loadedAddons = dummyData.idanalytics;
        var expRecords = dummyData.idgoogletag;
        var id_google_ads = dummyData.idgoogleAds;

        base = base + '<!DOCTYPE html><html><head lang="en">';
        base = base + '<meta charset="UTF-8">';
        base = base + ('<title class="title-site" pn-id="' + keys + '">' + topicTitle + "</title>");
        base = base + '<meta http-equiv="Cache-control" content="no-cache">';
        base = base + '<meta http-equiv="Expires" content="-1">';
        base = base + ('<meta name="description" content="' + desc + '">');
        base = base + ('<meta name="keywords" content="' + keyword + '">');
        base = base + '<meta name="viewport" id="pn-viewport" content="width=device-width, initial-scale=1.0">';
        base = base + "<script>function pnViewport(){";
        base = base + "var width = (window.outerWidth > 0) ? window.outerWidth : screen.width;if(width > 3000){width = width / 10;}";
        base = base + 'var content = "width=device-width, initial-scale=1.0";';
        base = base + 'var zoom = 1;if(width < 768){zoom = width / 375;content = "width=375, initial-scale="+zoom}else{if(width < 960){zoom = width / 960;content = "width=960, initial-scale="+zoom}}';
        base = base + 'var meta=document.getElementsByTagName("meta");';
        base = base + "for (var i=0; i<meta.length; i++) {";
        base = base + 'if (meta[i].name.toLowerCase()=="viewport") {';
        base = base + "meta[i].content=content; ";
        base = base + "}}};pnViewport();\x3c/script>";
        base = base + ('<meta property="og:title" content="' + topicTitle + '" />');
        base = base + '<meta property="og:type" content="website" />';
        base = base + ('<meta property="og:url" content="http://' + $scope.domain + '" />');
        base = base + ('<meta property="og:image" content="' + apiStaticDefault + dummyData.imagePage + '">');
        base = base + ('<meta property="og:description" content="' + desc + '" />');
        base = base + '<meta name="format-detection" content="telephone=no" />';
        base = base + '<script>function reveal(){for(var a=0;a<view_elements.length;a++){var b=0,c=view_elements[a];do isNaN(c.offsetTop)||(b+=c.offsetTop);while(c=c.offsetParent);var d=window.pageYOffset,e=window.innerHeight,c=view_elements[a];window.pageXOffset,window.innerWidth;b>=d&&d+e>=b&&(view_elements[a].classList.remove("hide-background-image"),view_elements.splice(a,1),a--)}}function qazy_list_maker(){for(var a=document.getElementsByClassName("hide-background-image"),b=0;b<a.length;b++)view_elements.push(a[b])}var view_elements=[];window.addEventListener("resize",reveal,!1),window.addEventListener("scroll",reveal,!1);var intervalObject=setInterval(function(){qazy_list_maker()},50);window.addEventListener("load",function(){clearInterval(intervalObject),qazy_list_maker(),reveal();},!1);\x3c/script>';
        if (dummyData.imageFavicon && dummyData.imageFavicon.length > 0) {
            base = base + ('<link rel="shortcut icon" type="image/png" href="' + dummyData.imageFavicon + '"/>');
        }
        base = base + ('<style id="punnel-page-css">' + scene + "</style>");
        base = base + ('<style id="punnel-master-css">' + srvsDis + "</style>");
        var z = "https://hstatic.punnel.com/googlefonts.css?family=Open+Sans:400,600,700&amp;subset=latin-ext,vietnamese";
        if (srvs && srvs.length > 0) {
            z = "https://hstatic.punnel.com/googlefonts.css?family=" + srvs + "&amp;subset=latin-ext,vietnamese";
        }
        var A = "if(media!='all')media='all'";
        if (base = base + ('<link rel="stylesheet" href="' + z + '" media="none" onload="' + A + '">'), indent && indent.length > 0 && (base = base + indent), expRecords && expRecords.length > 0) {
            var bytesToRead = "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':";
            bytesToRead = bytesToRead + "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],";
            bytesToRead = bytesToRead + "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=";
            bytesToRead = bytesToRead + "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);";
            bytesToRead = bytesToRead + ("})(window,document,'script','dataLayer','" + expRecords + "');\x3c/script>");
            base = base + bytesToRead;
        }
        if (lineCount && lineCount.length > 0) {
            var bytesToRead = "<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?";
            bytesToRead = bytesToRead + "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n; ";
            bytesToRead = bytesToRead + "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;";
            bytesToRead = bytesToRead + "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, ";
            bytesToRead = bytesToRead + "document,'script','https://connect.facebook.net/en_US/fbevents.js'); ";
            bytesToRead = bytesToRead + "fbq('init', '" + lineCount + "'); ";
            bytesToRead = bytesToRead + "fbq('track', 'PageView'); fbq('track', 'ViewContent');\x3c/script>";
            bytesToRead = bytesToRead + '<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=' + lineCount + '&ev=PageView&noscript=1" /></noscript>';
            base = base + bytesToRead;
        }
        if (loadedAddons && loadedAddons.length > 0) {
            var bytesToRead = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){";
            bytesToRead = bytesToRead + "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),";
            bytesToRead = bytesToRead + "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)";
            bytesToRead = bytesToRead + "})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');";
            bytesToRead = bytesToRead + "ga('create', '" + loadedAddons + "', 'auto');";
            bytesToRead = bytesToRead + "ga('send', 'pageview');\x3c/script>";
            base = base + bytesToRead;
        }

        if (id_google_ads && id_google_ads.length > 0) {
            var bytesToRead = "<script async='' src='https://www.googletagmanager.com/gtag/js?id=id_ads_google'></script>";
            bytesToRead = bytesToRead + " <script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments); }gtag('js', new Date());gtag('config','" + id_google_ads + "');</script>";
            base = base + bytesToRead;
        }

        base = base + dummyData.head;
        var E = 0;
        i = 0;
        for (; i < list.length; i++) {
            var $this = PN_PAGE.getElement("#" + list[i].id);
            if (void 0 != list[i].animate && "" != list[i].animate && null != list[i].animate) {
                E = 1;
                if ("slide_show" == $this.attr("pn-type")) {
                    $this.find(".item_slide li").addClass("" + list[i].animate);
                } else {
                    if ($this.hasClass("widget-section")) {
                        $this.attr("pn-ani", list[i].animate);
                        $this.addClass("animated");
                    } else {
                        $this.addClass("" + list[i].animate);
                    }
                }
            }
        }
        if (1 == E) {
            A = ($.now(), "if(media!='all')media='all'");
            base = base + ('<link rel="stylesheet" href="https://hstatic.punnel.com/source/animate.min.css?v=160318" media="none" onload="' + A + '">');
        }
        base = base + "</head>";
        var html = "<body>";
        if (html = html + '<div class="punnel-wraper-page">', expRecords && expRecords.length > 0) {
            var shapeHolder = "<noscript>";
            shapeHolder = shapeHolder + ('<iframe src="https://www.googletagmanager.com/ns.html?id=' + expRecords + '"height="0" width="0" style="display:none;visibility:hidden"></iframe>');
            shapeHolder = shapeHolder + "</noscript>";
            html = html + shapeHolder;
        }
        if (m > 0) {
            var I = html.search('id="fb-root"');
            if (-1 == I) {
                html = html + '<div id="fb-root"></div><script>(function(d, s, id) {var js, fjs = d.getElementsByTagName(s)[0];if (d.getElementById(id)) return;';
                html = html + "js = d.createElement(s); js.id = id;";
                html = html + ('js.src = "//connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v2.10&appId=' + api_key + '";');
                html = html + "fjs.parentNode.insertBefore(js, fjs);";
                html = html + "}(document, 'script', 'facebook-jssdk'));\x3c/script>";
            }
        }
        html = html + PN_PAGE.PUNNEL_EDIT.html();
        $.now();
        if (g_wrappedText && g_wrappedText.length > 0) {
            html = html + ('<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false&key=' + g_wrappedText + '">\x3c/script>');
        } else {
            if (1 == n) {
                html = html + '<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false">\x3c/script>';
            }
        }
        html = html + '<script type="text/javascript" src="https://hstatic.punnel.com/source/punnel.lib.js?v=02060418">\x3c/script>';
        html = html + NaN;
        var output = $(html);
        i = 0;
        for (; i < list.length; i++) {
            var $Qv = output.find("#" + list[i].id);
            if ($Qv && $Qv.length > 0 && "customhtml" == $Qv.attr("pn-type") && list[i].valuePluginHtml && list[i].valuePluginHtml.length > 0) {
                $Qv.find(".widget-content:eq(0)").html(list[i].valuePluginHtml);
            }
        }
        if (output && output.length > 0) {
            html = "";
            i = 0;
            for (; i < output.length; i++) {
                html = html + output[i].outerHTML;
            }
        }
        return html = base + "<body>" + html.replace(/undefined/g, "") + dummyData.body + "</body></html>", $(".horizontal-line").appendTo($(".iframe-content")), {
            html: html,
            list: certs
        };
    };

    $scope.resetHtmlPage = function () {
        pageSave = true;
        apiElement = dummyData.apiElement;
        selectedItem = void 0;
        $("#resizable-element").hide();
        $("#resizable-section").hide();
        $("#ID_BOX_EDITOR").hide();
        $("#ID_CONTRO_SETTING_PLUGIN .control-edit").hide();
        $(".horizontal-line").appendTo($(".is-maincontent"));
        PN_PAGE.PUNNEL_EDIT.html("");
        var me = new setHtmlLadi;
        var i = 0;
        for (; i < apiElement.length; i++) {
            me.getTemplate(apiElement[i], apiElement[i].type_plugin, function () {
            });
        }
        var c = new OptionWiget;
        var d = new AjaxPage;
        d.loadPunnelEdit();
        var BDA = new setStyleElement;
        BDA.init(apiElement, deviceEdit);
        c.showHideElementDefault();
        var Collections = [];
        PN_PAGE.getElement('.widget-element[pn-type="contact_form"]').each(function () {
            var processedItem = {
                formid: $(this).attr("id"),
                name: $(this).attr("pn-lang")
            };
            Collections.push(processedItem);
        });
        selectedItem = PN_PAGE.getElement(".widget-section:visible").eq(0);
        $(".horizontal-line").appendTo($(".iframe-content"));
    };

    $scope.createTrackingPopup = function (params) {
        var t = "";
        if (1 == params.popup) {
            var evtDefs = dummyData.idpixel;
            var cmpDefs = dummyData.idanalytics;
            var lineCount = dummyData.idgoogletag;
            if (cmpDefs && cmpDefs.length > 0 || evtDefs && evtDefs.length > 0 || params.trackingPopHead && params.trackingPopHead.length > 0 || params.trackingPopBody && params.trackingPopBody.length > 0) {
                if (t = t + " <!DOCTYPE html><html>", t = t + '<head><meta charset="UTF-8">', lineCount && lineCount.length > 0) {
                    var scrollTop = "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':";
                    scrollTop = scrollTop + "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],";
                    scrollTop = scrollTop + "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=";
                    scrollTop = scrollTop + "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);";
                    scrollTop = scrollTop + ("})(window,document,'script','dataLayer','" + lineCount + "');\x3c/script>");
                    t = t + scrollTop;
                }
                if (evtDefs && evtDefs.length > 0) {
                    var scrollTop = "<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?";
                    scrollTop = scrollTop + "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n; ";
                    scrollTop = scrollTop + "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;";
                    scrollTop = scrollTop + "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, ";
                    scrollTop = scrollTop + "document,'script','https://connect.facebook.net/en_US/fbevents.js'); ";
                    scrollTop = scrollTop + "fbq('init', '" + evtDefs + "'); ";
                    scrollTop = scrollTop + "fbq('track', 'PageView'); fbq('track', 'ViewContent');\x3c/script>";
                    scrollTop = scrollTop + '<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=' + evtDefs + '&ev=PageView&noscript=1" /></noscript>';
                    t = t + scrollTop;
                }
                if (cmpDefs && cmpDefs.length > 0) {
                    var scrollTop = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){";
                    scrollTop = scrollTop + "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),";
                    scrollTop = scrollTop + "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)";
                    scrollTop = scrollTop + "})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');";
                    scrollTop = scrollTop + "ga('create', '" + cmpDefs + "', 'auto');";
                    scrollTop = scrollTop + "ga('send', 'pageview');\x3c/script>";
                    t = t + scrollTop;
                }
                if (params.trackingPopHead && params.trackingPopHead.length > 0 && (t = t + params.trackingPopHead), t = t + "</head>", t = t + "<body>", lineCount && lineCount.length > 0) {
                    var scrollTop = "<noscript>";
                    scrollTop = scrollTop + ('<iframe src="https://www.googletagmanager.com/ns.html?id=' + lineCount + '"height="0" width="0" style="display:none;visibility:hidden"></iframe>');
                    scrollTop = scrollTop + "</noscript>";
                    t = t + scrollTop;
                }
                if (params.trackingPopBody && params.trackingPopBody.length > 0) {
                    t = t + params.trackingPopBody;
                }
                t = t + "</body>";
                t = t + "</html>";
            }
        }
        return t;
    };

    $scope.checkDomain = function (url) {
        var tempLayoutArray;
        var gallery = 0;
        if (!(url.length > 0 && url.length < 253)) {
            return false;
        }
        if (tempLayoutArray = url.split("."), tempLayoutArray && tempLayoutArray.length > 0) {
            var i = 0;
            for (; i < tempLayoutArray.length; i++) {
                if (!(tempLayoutArray[i].length > 0 && tempLayoutArray[i].length < 63)) {
                    return false;
                }
            }
        }
        if (("." == url[0] || "-" == url[0] || "." == url[url.length - 1] || "-" == url[url.length - 1]) && (check = false), "" == url || null == url) {
            return false;
        }
        if (-1 != url.indexOf(" ")) {
            return false;
        }
        var loader = /[A-Za-z0-9_.:\/-]/;
        i = 0;
        for (; i < url.length; i++) {
            if (loader.test(url[i])) {
                gallery++;
            }
        }
        return gallery == url.length ? true : false;
    };

    $scope.checkdomainPreview = function (annotations) {
        var key = annotations;
        return annotations && annotations.length > 0 && (key = -1 != annotations.search("http://") || -1 != annotations.search("https://") ? annotations : "http://" + annotations), key;
    };

    $scope.screenUrlToimageBase = function (a, iter) {
        var rv = "";
        rv = -1 == a.search("http") ? "http://" + a : a;
        $.ajax({
            url: APP_CONFIG.URL_SCREENSHOT + rv,
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
    };

    $scope.createThumbnail = function (item, container) {
        if (!dummyData.imagePage || (dummyData.imagePage && dummyData.imagePage.indexOf(apiStaticDefault) < 0) || !(dummyData.imagePage && dummyData.imagePage.length > 0)) {
            $scope.screenUrlToimageBase(item, function (a, data) {
                $restful.post("/thumb", {
                    code: data.base64,
                    fileName: $stateParams.id,
                    type: 'p'
                }).then(function (data) {
                    dummyData.imagePage = data.data;
                    $("#settingPage .image-page").attr("src", apiStaticDefault + data.data);
                });
            });
        }
    };

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };


    //---Publish FTP------------
    $scope.valueEditFtpurl = "";
    $scope.valueEditFtpip = "";
    $scope.valueEditFtpport = "";
    $scope.valueEditFtpuserName = "";
    $scope.valueEditFtppass = "";
    $scope.ftpSelected = "";
    $scope.listftp = [];
    $scope.typeEditFtp = "";
    $scope.vtFtpSl = 0;
    $scope.checkFtp = "true";

    $scope.showModalPublish = function () {
        $("#manager-edit").modal("hide");
        $("#publish").modal("show");
    };

    $scope.loadFtp = function () {
    };

    $scope.loadFtp();

    $scope.fnselectedFtp = function (Register, listid) {
        $scope.valueEditFtpurl = "";
        $scope.valueEditFtpip = "";
        $scope.valueEditFtpport = "";
        $scope.valueEditFtpuserName = "";
        $scope.valueEditFtppass = "";
        $scope.vtFtpSl = listid;
        $scope.ftpSelected = $scope.listftp[listid];
        $scope.valueEditFtpurl = $scope.ftpSelected.Config.Site;
        $scope.valueEditFtpip = $scope.ftpSelected.Config.IP;
        $scope.valueEditFtpport = $scope.ftpSelected.Config.Port;
        $scope.valueEditFtpuserName = $scope.ftpSelected.Config.User;
        $scope.valueEditFtppass = $scope.ftpSelected.Config.Password;
    };

    $scope.showEditFtp = function () {
        if ($scope.ftpSelected) {
            $scope.typeEditFtp = "editftp";
            $("#manager-edit").modal("show");
            $("#publish").modal("hide");
        }
    };

    $scope.showAddnewFtp = function () {
        $scope.valueEditFtpurl = "";
        $scope.valueEditFtpip = "";
        $scope.valueEditFtpport = "";
        $scope.valueEditFtpuserName = "";
        $scope.valueEditFtppass = "";
        $scope.typeEditFtp = "addNewFtp";
        $("#manager-edit").modal("show");
        $("#publish").modal("hide");
    };

    $scope.addNewFtp = function () {
        if ($scope.valueEditFtpurl && $scope.valueEditFtpurl.length > 0 && $scope.valueEditFtpip && $scope.valueEditFtpip.length > 0 && $scope.valueEditFtpport && $scope.valueEditFtpport.length > 0 && $scope.valueEditFtpuserName && $scope.valueEditFtpuserName.length > 0) {
            $restful.post("/UserConfig/AddConfig", {
                type: 6,
                name: $scope.valueEditFtpuserName,
                site: $scope.valueEditFtpurl,
                ip: $scope.valueEditFtpip,
                port: $scope.valueEditFtpport,
                user: $scope.valueEditFtpuserName,
                password: $scope.valueEditFtppass
            }).then(function (event) {
                $scope.ftpSelected.id = event.data.id;
                $scope.ftpSelected.Name = event.data.Name;
                $scope.ftpSelected.Type = event.data.Type;
                $scope.ftpSelected.Config = {};
                $scope.ftpSelected.Config.Site = $scope.valueEditFtpurl;
                $scope.ftpSelected.Config.IP = $scope.valueEditFtpip;
                $scope.ftpSelected.Config.Port = $scope.valueEditFtpport;
                $scope.ftpSelected.Config.User = $scope.valueEditFtpuserName;
                $scope.ftpSelected.Config.Password = $scope.valueEditFtppass;
                $scope.listftp.push(event.data);
                PN_PAGE.showMessage("\u0110\u00e3 th\u00eam m\u1edbi c\u1ea5u h\u00ecnh FTP");
                $("#manager-edit").modal("hide");
                $("#publish").modal("show");
            });
        } else {
            PN_PAGE.showMessage("Vui l\u00f2ng \u0111i\u1ec1n \u0111\u1ea7y \u0111\u1ee7 th\u00f4ng tin!");
        }
    };

    $scope.editFtp = function () {
        $restful.post("/UserConfig/EditConfig", {
            type: 6,
            id: $scope.ftpSelected.id,
            name: $scope.valueEditFtpuserName,
            site: $scope.valueEditFtpurl,
            ip: $scope.valueEditFtpip,
            port: $scope.valueEditFtpport,
            user: $scope.valueEditFtpuserName,
            password: $scope.valueEditFtppass
        }, function (a, method) {
            if (a) {
                PN_PAGE.showMessage("X\u1ea3y ra l\u1ed7i, vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c live chat v\u1edbi ch\u00fang t\u00f4i!", 'error');
            } else {
                if (method && 200 == method.code) {
                    $scope.ftpSelected.Name = $scope.valueEditFtpuserName;
                    $scope.ftpSelected.IP = $scope.valueEditFtpip;
                    $scope.ftpSelected.Port = $scope.valueEditFtpport;
                    $scope.ftpSelected.Site = $scope.valueEditFtpurl;
                    $scope.ftpSelected.User = $scope.valueEditFtpuserName;
                    $scope.ftpSelected.Password = $scope.valueEditFtppass;
                    PN_PAGE.showMessage("\u0110\u00e3 ch\u1ec9nh s\u1eeda!");
                    $("#manager-edit").modal("hide");
                    $("#publish").modal("show");
                } else {
                    PN_PAGE.showMessage(method.messager);
                }
            }
        });
    };

    $scope.deleteFtp = function () {
        if ($scope.ftpSelected && $scope.ftpSelected.id && $scope.ftpSelected.id.length > 0) {
            swal({
                title: "Th\u00f4ng b\u00e1o ",
                text: "B\u1ea1n ch\u1eafc ch\u1eafn mu\u1ed1n x\u00f3a?",
                showCancelButton: true,
                confirmButtonColor: "#009FE3",
                confirmButtonText: "Ti\u1ebfp t\u1ee5c",
                cancelButtonText: "Kh\u00f4ng",
                closeOnConfirm: true
            }, function (a) {
                if (a) {
                    $restful.post("/UserConfig/DeleteConfig", {
                        id: $scope.ftpSelected.id
                    }, function (a, method) {
                        if (a) {
                            PN_PAGE.showMessage("X\u1ea3y ra l\u1ed7i, vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c live chat v\u1edbi ch\u00fang t\u00f4i!");
                        } else {
                            if (method && 200 == method.code) {
                                $scope.ftpSelected = "";
                                $scope.listftp.splice(parseFloat($scope.vtFtpSl), 1);
                                $scope.valueEditFtpip = "";
                                $scope.valueEditFtpport = "";
                                $scope.valueEditFtpurl = "";
                                $scope.valueEditFtpuserName = "";
                                $scope.valueEditFtppass = "";
                                PN_PAGE.showMessage("\u0110\u00e3 x\u00f3a th\u00e0nh c\u00f4ng!");
                                $("#manager-edit").modal("hide");
                                $("#publish").modal("show");
                            } else {
                                PN_PAGE.showMessage(method.messager);
                            }
                        }
                    });
                }
            });
        } else {
            PN_PAGE.showMessage("Ch\u01b0a c\u00f3 c\u1ea5u h\u00ecnh FTP \u0111\u01b0\u1ee3c ch\u1ecdn!");
        }
    };

    $scope.publishFtp = function () {
        $(".loading").css({
            opacity: "0.4"
        }).show();
        $restful.post("/landingpage/CheckFolderFTP", {
            id: $stateParams.id,
            idConfig: $scope.ftpSelected.id,
            name: $scope.publishLink
        }, function (a, module) {
            $(".loading").css({
                opacity: "1"
            }).hide();
            if (a) {
                PN_PAGE.showMessage("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
            } else {
                if (!module || 200 != module.code && 205 != module.code) {
                    if (module) {
                        PN_PAGE.showMessage(module.messager);
                    } else {
                        PN_PAGE.showMessage("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    }
                } else {
                    if (205 == module.code) {
                        swal({
                            title: "Th\u00f4ng b\u00e1o ",
                            text: module.messager,
                            showCancelButton: true,
                            confirmButtonColor: "#009FE3",
                            confirmButtonText: "Ti\u1ebfp t\u1ee5c",
                            cancelButtonText: "Kh\u00f4ng",
                            closeOnConfirm: true
                        }, function (a) {
                            if (a) {
                                $scope.postFtp();
                            }
                        });
                    } else {
                        $scope.postFtp();
                    }
                }
            }
        });
    };

    $scope.postFtp = function () {
        $(".loading").css({
            opacity: "0.4"
        }).show();
        var authorization_uri = "/Landingpage/publishFTP";
        var GET_USER_PROFILE_SUCCESS = 6;
        $scope.getHtmlLandingpage(function (canCreateDiscussions, action) {
            if (action) {
                $restful.post(authorization_uri, {
                    id: $stateParams.id,
                    idConfig: $scope.ftpSelected.id,
                    html: action.html,
                    forms: action.listForm,
                    name: $scope.publishLink,
                    type: GET_USER_PROFILE_SUCCESS
                }, function (a, method) {
                    $(".loading").css({
                        opacity: "1"
                    }).hide();
                    if (a) {
                        PN_PAGE.showMessage("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
                    } else {
                        if (method && 200 == method.code) {
                            $scope.tabSelect = "preview";
                            $scope.domainPreview = $scope.checkdomainPreview($scope.publishLink);
                            dummyData.domainFtp = $scope.publishLink;
                            dummyData.typePublish = "ftp";
                            saveLandingPageElement();
                            PN_PAGE.showMessage("Xu\u1ea5t b\u1ea3n th\u00e0nh c\u00f4ng!");
                            $(".loading").css({
                                opacity: "1"
                            }).hide();
                        } else {
                            PN_PAGE.showMessage(method.messager);
                        }
                    }
                });
            }
        });
    };

    //----End publish FTP---------


    //----------- publish WordPress-----------------
    $scope.checkFolder = function () {
    };

    $scope.setValueDomainWp = function (pirates) {
        $scope.domainWp = pirates;
    };

    $scope.createTokenWp = function () {
    };

    $scope.loadTokenWP = function () {
    };

    $scope.loadTokenWP();

    $scope.wpPost = function () {
        var authorization_uri = "/landingpage/publishWordpress";
        var GET_USER_PROFILE_SUCCESS = 7;

        $scope.getHtmlLandingpage(function (canCreateDiscussions, charRef) {
            if (charRef) {
                $(".loading").css({
                    opacity: "0.4"
                }).show();
                $scope.ischeckWp = false;
                $restful.post(authorization_uri, {
                    id: $stateParams.id,
                    html: charRef.html,
                    domain: $scope.domainWp,
                    listForm: charRef.listForm,
                    type: GET_USER_PROFILE_SUCCESS
                }).then(function (warn) {
                    $(".loading").css({
                        opacity: "0.4"
                    }).hide();
                    $scope.tabSelect = "preview";
                    $scope.domainPreview = $scope.checkdomainPreview($scope.domainWp);
                    dummyData.domainWp = $scope.domainWp;
                    dummyData.typePublish = "wordpress";
                    saveLandingPageElement();
                    PN_PAGE.showMessage("Xu\u1ea5t b\u1ea3n th\u00e0nh c\u00f4ng!");
                    $(".loading").css({
                        opacity: "1"
                    }).hide();
                });
                saveLandingPageElement();
            } else {
                $(".loading").css({
                    opacity: "0.4"
                }).hide();
            }
        });
    };

    $scope.publishLandingpageWp = function () {
        $(".loading").css({
            opacity: "0.4"
        }).show();
        $restful.post("/landingpage/CheckFolderWP", {
            id: $stateParams.id,
            domain: $scope.domainWp,
            https: PN_PAGE.account.ishttps
        }, function (a, module) {
            $(".loading").css({
                opacity: "0.4"
            }).hide();
            if (a) {
                PN_PAGE.showMessage("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c livechat v\u1edbi ch\u00fang t\u00f4i!", 'error');
            } else {
                if (!module || 200 != module.code && 205 != module.code) {
                    if (module) {
                        PN_PAGE.showMessage(module.messager);
                    } else {
                        PN_PAGE.showMessage("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c livechat v\u1edbi ch\u00fang t\u00f4i!", 'error');
                    }
                } else {
                    if (200 == module.code) {
                        $scope.wpPost();
                    } else {
                        swal({
                            title: "Th\u00f4ng b\u00e1o ",
                            text: module.messager,
                            showCancelButton: true,
                            confirmButtonColor: "#009FE3",
                            confirmButtonText: "Ti\u1ebfp t\u1ee5c",
                            cancelButtonText: "Kh\u00f4ng",
                            closeOnConfirm: true
                        }, function (a) {
                            if (a) {
                                $scope.wpPost();
                            }
                        });
                    }
                }
            }
        });
    };

    //-------End publish WordPress---------
}]);