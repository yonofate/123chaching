angular.module("punnelApp").controller("actionPageCtr", ["$rootScope", "$auth", "$state", "$scope", "$translate", "$stateParams", "$restful", "$window", "APP_CONFIG", "$ladiService", "localStorageService", "popupService", function ($rootScope, $auth, $state, $scope, $translate, $stateParams, $restful, $window, APP_CONFIG, $ladiService, localStorageService, popupService) {
    $rootScope.loadPage = "";

    $scope.canAction = {
        publish: true
    }

    $scope.setRole = function (type) {
        $scope.canDo = {
            publish: type == 10 && $stateParams.type == 'p',
            setting: type == 10 && $stateParams.type == 'p'
        }
    }

    $scope.initPage = function initPage() {
        if ($stateParams.id) {
            $scope.updateTitle = "";
            PN_PAGE.pageLoading.show();
            $restful.get("/landingpage", {
                id: $stateParams.id,
                type: $stateParams.type
            }).then(function (res) {
                //Kiểu trang: page,section,popup
                $rootScope.$state = 1;
                typeAddNew = res.data.type;
                $scope.typePage = res.data.type;
                $scope.setRole(res.data.type);
                dummyData.domain = res.data.domain;
                $scope.domain = res.data.domain;
                $scope.publishType = res.data.publishType;
                $scope.publishIntegrationId = res.data.publishIntegrationId;
                $scope.publishLink = res.data.domain;// + (res.data.urlCode || '');
                $scope.urlCode = res.data.urlCode;
                $scope.isUpThumbnail = res.data.isUpThumbnail;

                PN_PAGE.PUNNEL_EDIT = $("#punnel-editor");
                $(".horizontal-line").appendTo($(".is-maincontent"));
                PN_PAGE.PUNNEL_EDIT.html("");
                var FeedsService = new GetDataService;
                if (FeedsService.xulySource(res.data.source, function () {
                    PN_PAGE.pageLoading.hide();
                    //$("#header .title a").text(dummyData.title);
                    if (dummyData.title == "Đặt tiêu đề trang" && res.data.name.length > 0) {
                        dummyData.title = res.data.name;
                    }
                    showAddNewSection();
                    PN_PAGE.resetElementNotGroup();
                    $scope.updateTitle = res.data.name;
                    $("#header .title a").text(res.data.name);
                    $(".modal-backdrop").remove();
                    var b = $('.widget-element[pn-type="slider"]');
                    if (b && b.length > 0) {
                        b.each(function () {
                            $(this).find('.widget-element[pn-type="item_slider"]').eq(0).css({
                                visibility: "visible"
                            });
                            $(this).find('.widget-element[pn-type="item_slider"]').eq(0).find(".widget-element").css({
                                visibility: "visible"
                            });
                        });
                    }
                    $(".horizontal-line").appendTo($(".iframe-content"));
                    $scope.setListRuler(dummyData.arrRule);

                    var currentDownloadRequest = new TreeWidget;
                    currentDownloadRequest.layerHide();
                    currentDownloadRequest.layer();
                    $scope.setting_visible = 0;
                    var windowsize = $(window).width();
                    console.log(windowsize);
                    if (localStorageService.get('setting-visible') == 1 && windowsize >= 1170) {
                        $scope.setting_visible = 1;
                        $scope.anchorSetting(true);
                        $(".aside-setting-option").fadeOut();
                        if ($('.vertical-line').hasClass("left") == false) {
                            $('.vertical-line').addClass("left");
                        }
                        if (selectedItem == undefined || selectedItem == null) {
                            $(".aside-setting .heading-title .id-element").text("#ID:");
                        } else {
                            var r = new IframeClick;
                            r.showOptionProperties(selectedItem), selectedItem && selectedItem.hasClass("widget-element") && r.showControlEditPlugin(selectedItem)
                            $('#resizable-section').hide();
                        }
                    } else {
                        var container = $(".aside-setting");
                        container.removeClass('anchor-setting');
                        $('.is-maincontent').css('margin-right', '0px');
                        container.hide();
                        $scope.setting_visible = 0;
                        localStorageService.set('setting-visible',0);
                        if ($('.vertical-line').hasClass("left") == true) {
                            $('.vertical-line').removeClass("left");
                        }
                        $(".aside-setting-option").fadeIn();
                    }
                }),
                    $scope.loadingData = true,
                    !res.data.source && 30 == parseFloat(typeAddNew)) {
                    var g = new OptionWiget;
                    g.addSectionEmpty(false, pageMouseX, pageMouseY, "widget-popup");
                    showAddNewSection();
                }
                dummyData.imagePage = res.data.thumnail;
                $rootScope.loadPage = "true";
            });
        } else {
            $state.go("dashboard.landingpage");
            $scope.loadingData = true;
        }
    };
    $scope.initPage();

    $scope.setListRuler = function (a) {
        if (a) {
            if (a.rulerHor && a.rulerHor.length > 0) {
                var i = 0;
                for (; i < a.rulerHor.length; i++) {
                    var _hor_guide = $(".vertical-guide-container .horizontal-guide").eq(0).clone();
                    _hor_guide.css({
                        left: a.rulerHor[i].left
                    });
                    _hor_guide.addClass(a.rulerHor[i]["class"]);
                    _hor_guide.attr("id", $.now());
                    _hor_guide.find(".ruler-widget").attr("id", _hor_guide.attr("id") + "rule").addClass("widget-snap");
                    $(".vertical-guide-container").append(_hor_guide);
                    $window.angularControllerActionVer();
                }
            }
            if (a.rulerVer && a.rulerVer.length > 0) {
                var i = 0;
                for (; i < a.rulerVer.length; i++) {
                    _hor_guide = $(".horizontal-guide-container .vertical-guide").eq(0).clone();
                    var popoverTop = a.rulerVer[i].top;
                    var _ileft = 0 - $(".horizontal-guide-container").offset().left;
                    _hor_guide.addClass(a.rulerVer[i]["class"]);
                    _hor_guide.css({
                        top: popoverTop
                    });
                    _hor_guide.offset({
                        left: _ileft
                    });
                    _hor_guide.attr("id", $.now());
                    _hor_guide.find(".ruler-widget").attr("id", _hor_guide.attr("id") + "rule").addClass("widget-snap");
                    $(".horizontal-guide-container").append(_hor_guide);
                    $window.angularControllerActionHer();
                }
            }
            if ("hide" == a.status) {
                var g = $("#cmn-toggle-1-rule");
                g.removeClass("active");
                g.removeAttr("checked");
                g.trigger("mousedown");
                $(".vertical-line").hide();
                $(".horizontal-line").hide();
            }
        }
    };

    $scope.download = function () {
        if (1==2) {
            getHtmlLandingpage(function (a, charRef) {
                if (charRef) {
                    $(".loading").css({
                        opacity: "0.4"
                    }).show();
                    $restful.post("/publish/make-download", {
                        id: $stateParams.id,
                        html: charRef.html,
                        listForm: charRef.listForm
                    }).then(function (data) {
                        $(".loading").css({
                            opacity: "1"
                        }).hide();
                        $scope.urlDownload = "api/publish/download?id=" + data.data;
                        openLink($scope.urlDownload, "_blank");
                        resetPage();
                    });
                } else {
                    PN_PAGE.showMessage("Vui l\u00f2ng th\u1eed l\u1ea1i!", 'alert');
                    $(".loading").css({
                        opacity: "1"
                    }).hide();
                }
            });
        }           
    };

    function getHtmlLandingpage(html_source) {
        if (1 == PN_PAGE.sortMobilePublish) {
            $ladiService.sortElementMobile();
            $ladiService.sortElementDesktop();
        }
        var _css = PN_PAGE.cssAnimation + PN_PAGE.cssDefault;
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

        var that = saveHtmlPage(dummyData.apiElement, _css, _font, _css_mobile.testCss(dummyData.apiElement));
        var title = that.html;
        var names = that.list;
        resetHtmlPage();
        html_source(null, {
            html: title,
            css: base,
            listForm: names
        });
    };

    function resetHtmlPage() {
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

    $scope.screenUrlToimageBase = function (url, callback) {
        var rv = "";
        rv = -1 == url.search("http") ? "http://" + url : url;
        $.ajax({
            url: APP_CONFIG.URL_SCREENSHOT + rv,
            context: this,
            type: "GET",
            dataType: "json",
            success: function (data) {
                var c = data.screenshot.data.replace(/_/g, "/").replace(/-/g, "+");
                var latLimit = "data:image/png;base64," + c;
                callback(null, {
                    base64: latLimit
                });
            }
        });
    };

    $scope.createThumbnail = function (item) {
        var k = dummyData.imagePage || '';
        if (k=='') {
            $scope.screenUrlToimageBase(item, function (a, data) {
                $restful.post("/thumb", {
                    code: data.base64,
                    fileName: $stateParams.id,
                    type: $stateParams.type
                }).then(function (data) {
                    dummyData.imagePage = data.data;
                    $("#settingPage .image-page").attr("src", apiStaticDefault + data.data);
                });
            });
        }
    };

    $scope.createTemplateThumbnail = function (url) {
        $scope.screenUrlToimageBase(url, function (a, data) {
            $restful.post("/thumb", {
                code: data.base64,
                fileName: $stateParams.id,
                type: $stateParams.type
            }).then(function (data) {
                dummyData.imagePage = data.data;
            });
        });
    };

    $scope.acoundEnd = "false";

    function saveHtmlPage(list, pn_page_css, pn_page_font, srvsDis) {
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
        var mf = 0;
        var n = 0;
        var g_wrappedText = "";
        var indent = "";
        var trackPop = "";
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
           
            //trackPop += (list[i].trackingPopHead && list[i].popup && "widget_section" != list[i].type_plugin) ? "function " + list[i].id + "_click(){" + list[i].trackingPopHead + "}" : "function " + list[i].id + "_show(){" + list[i].trackingPopHead + "}";
            if (list[i].trackingPopHead && list[i].trackingPopHead.length>0 && list[i].popup && "widget_section" == list[i].type_plugin) {
                var fn = list[i].trackingPopHead.replace('<script>', '').replace('</script>', '')
                trackPop += "function " + list[i].id + "_show(){" + fn + "}";
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
                    mf++;
                    PN_PAGE.getElement("#" + list[i].id).html(valueTemplate.facebook_messages_finish);
                    PN_PAGE.getElement("#" + list[i].id + " .widget-content").eq(0).attr("data-href", list[i].value_facebook_messages.url).attr("data-width", parseFloat(list[i].media[deviceEdit].width)).attr("data-height", parseFloat(list[i].media[deviceEdit].height));
                    break;
                case "image":
                    PN_PAGE.getElement("#" + list[i].id + " .widget-content:eq(0) img").eq(0).remove();
                    PN_PAGE.getElement("#" + list[i].id + " .widget-content").eq(0).prepend(valueTemplate.image_publish);
                    PN_PAGE.getElement("#" + list[i].id + " .widget-content:eq(0) .pn-show-image").eq(0).attr("alt", list[i].link);
                    if (list[i].parent == undefined || list[i].parent.indexOf('POPUP') < 0) {
                        var img_resize = new RenCssMobile().zenImagePublish(list[i].link, list[i], "desktop");
                        PN_PAGE.getElement("#" + list[i].id + " .widget-content:eq(0) .pn-show-image").eq(0).attr("data-bg", "url('" + img_resize + "')");
                        PN_PAGE.getElement("#" + list[i].id + " .widget-content:eq(0) .pn-show-image").eq(0).addClass('pn-lazy-load');
                    }
                    break;
                case "box":
                    if ((list[i].parent == undefined || list[i].parent.indexOf('POPUP') < 0) && list[i].bg_type && list[i].media.desktop["background-image"] && list[i].media.desktop["background-image"].length > 0) {
                        PN_PAGE.getElement("#" + list[i].id + " .widget-content:eq(0)").eq(0).addClass('pn-lazy-load');
                        var img_resize_dk1 = new RenCssMobile().zenImagePublish(list[i].media.desktop["background-image"], list[i], "desktop");
                        PN_PAGE.getElement("#" + list[i].id + " .widget-content:eq(0)").eq(0).attr("data-bg", "url('" + img_resize_dk1 + "')");
                    }
                    break;
                case "widget_section":
                    if (list[i].lang == "SECTION") {
                        if ((list[i].popup == undefined || list[i].popup == false) && list[i].bg_type && list[i].media.desktop["background-image"] && list[i].media.desktop["background-image"].length > 0) {
                            $("#" + list[i].id).addClass('pn-lazy-load');
                            var img_resize_dk = new RenCssMobile().zenImagePublish(list[i].media.desktop["background-image"], list[i], "desktop");
                            $("#" + list[i].id).attr("data-bg", "url('" + img_resize_dk + "')");
                        }

                        if (list[i].media.desktop["background-video"] && list[i].media.desktop["background-video"].length > 0 && list[i].media.desktop["background-video"].indexOf('https://www.youtube.com/embed/')==0) {
                            var o = $("#" + list[i].id).html();
                            var code = list[i].media.desktop["background-video"].replace("https://www.youtube.com/embed/", "");
                            var vn = '<div class="video-foreground"> <iframe src="' + list[i].media.desktop["background-video"] + '?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist='+ code +'" frameborder="0" allowfullscreen></iframe></div>';
                            $("#" + list[i].id).html(vn + o);
                            $("#" + list[i].id).css({
                                "overflow":"hidden"
                            });
                        }
                    }
                    break;
            }
        }
        var desc = dummyData.desc || '';
        var keyword = dummyData.keyword || '';
        var topicTitle = dummyData.title || '';
        var keys = $stateParams.id;
        var base = "";

        var id_fb_pixel = dummyData.idpixel;
        var id_ga = dummyData.idanalytics;
        var id_google_tag = dummyData.idgoogletag;
        var id_google_ads = dummyData.idgoogleAds;
        var showAffiliateBadge = dummyData.showAffiliateBadge?1:0; 

        base = base + '<!DOCTYPE html><html><head lang="vi">';
        base = base + '<meta charset="UTF-8">';
        if (dummyData.allowIndex && dummyData.allowIndex == false) {
            base = base + ('<meta name="robots" content="noindex,nofollow">');
        }
        base = base + ('<title class="title-site" pn-id="' + keys + '" aff-badge="' + showAffiliateBadge + '">' + topicTitle + "</title>");
        base = base + '<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" /> <meta http-equiv="Pragma" content="no-cache" /> <meta http-equiv="Expires" content="0" />';
        base = base + ('<meta name="description" content="' + desc + '">');
        base = base + ('<meta name="keywords" content="' + keyword + '">');

        base = base + '<meta name= "viewport" content="width=device-width, initial-scale=1.0">',
            base = base + "<script>function pnViewport(){",
        base = base + "var width = (window.outerWidth > 0) ? window.outerWidth : screen.width;",
        base = base + 'var content = "user-scalable=no"; ',
        base = base + 'if (width < 768) { content += ", width=' + dummyData.viewport.size_mobile + '"; } else { if (width < ' + dummyData.viewport.size_desktop + ') { content += ", width=' + dummyData.viewport.size_desktop + '"; } else { content += ", width=device-width"; } } ',
        base = base + "var meta=document.querySelector('meta[name =\"viewport\"]');",
        base = base + "if (meta == undefined) {meta = document.createElement('meta'); meta.name = 'viewport'; document.head.prepend(meta);}",
            base = base + "meta.content=content; ",
            base = base + "}; pnViewport();</script>";

        //base = base + '<meta name="viewport" id="pn-viewport" content="width=device-width, initial-scale=1.0">';
        //base = base + "<script>function pnViewport(){";
        //base = base + "var width = (window.outerWidth > 0) ? window.outerWidth : screen.width;if(width > 3000){width = width / 10;}";
        //base = base + 'var content = "width=device-width, initial-scale=1.0";';
        //base = base + 'var zoom = 1;if(width < 768){zoom = width / 375;content = "width=375, initial-scale="+zoom}else{if(width < 960){zoom = width / 960;content = "width=960, initial-scale="+zoom}}';
        //base = base + 'var meta=document.getElementsByTagName("meta");';
        //base = base + "for (var i=0; i<meta.length; i++) {";
        //base = base + 'if (meta[i].name.toLowerCase()=="viewport") {';
        //base = base + "meta[i].content=content; ";
        //base = base + "}}};pnViewport();\x3c/script>";

        base = base + '<meta name="format-detection" content="telephone=no" />'; 
        base = base + ('<meta itemprop="name" content="' + topicTitle + '" />');
        base = base + ('<meta property="og:title" content="' + topicTitle + '" />');
        base = base + '<meta property="og:type" content="website" />';
        base = base + ('<meta property="og:url" content="' + PN_PAGE.GetFullUrl($scope.publishLink) + '" />');       
        base = base + ('<meta property="og:description" content="' + desc + '" />');
               
        if (dummyData.imagePage && dummyData.imagePage.length > 0) {
            base = base + ('<meta property="og:image" content="' + PN_PAGE.fullImgUrl(dummyData.imagePage, 1200, 628) + '">');
            //base = base + ('<meta property="og:image:secure_url" content="' + PN_PAGE.fullImgUrl(dummyData.imagePage, 1200, 628) + '">');
            base = base + ('<meta itemprop="image" content="' + PN_PAGE.fullImgUrl(dummyData.imagePage, 1200, 628) + '">');
        }
        if (dummyData.imageFavicon && dummyData.imageFavicon.length > 0) {
            base = base + ('<link rel="shortcut icon" type="image/png" href="' + apiStaticDefault + 's64x64/' + dummyData.imageFavicon + '"/>');
        }
        if (dummyData.canonicalUrl && dummyData.canonicalUrl.length>0) {
            base = base + ('<link rel="canonical" href="' + dummyData.canonicalUrl +'">');
        }

        base = base + ('<style id="punnel-page-css">' + pn_page_css + "</style>");
        base = base + ('<style id="punnel-master-css">' + srvsDis + "</style>"); 
        base += '<link rel="dns-prefetch">',
            base += '<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin>',
            base += '<link rel="preconnect" href="https://api.punnel.com/" crossorigin>',
            base += '<link rel="preconnect" href="https://hstatic.punnel.com/" crossorigin>';       
        base = base + ('<link async rel="stylesheet" href="https://hstatic.punnel.com/styles/alert.min.css?v=1">');

        if (indent && indent.length > 0 && (base = base + indent), id_google_tag && id_google_tag.length > 0) {
            var bytesToRead = "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':";
            bytesToRead = bytesToRead + "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],";
            bytesToRead = bytesToRead + "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=";
            bytesToRead = bytesToRead + "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);";
            bytesToRead = bytesToRead + ("})(window,document,'script','dataLayer','" + id_google_tag + "');\x3c/script>");
            base = base + bytesToRead;
        }
        if (id_fb_pixel && id_fb_pixel.length > 0) {
            var bytesToRead = "<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?";
            bytesToRead = bytesToRead + "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n; ";
            bytesToRead = bytesToRead + "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;";
            bytesToRead = bytesToRead + "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, ";
            bytesToRead = bytesToRead + "document,'script','https://connect.facebook.net/en_US/fbevents.js'); ";
            bytesToRead = bytesToRead + "fbq('init', '" + id_fb_pixel + "'); ";
            bytesToRead = bytesToRead + "fbq('track', 'PageView'); fbq('track', 'ViewContent');\x3c/script>";
            bytesToRead = bytesToRead + '<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=' + id_fb_pixel + '&ev=PageView&noscript=1" /></noscript>';
            base = base + bytesToRead;
        }
        if (id_ga && id_ga.length > 0) {
            var bytesToRead = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){";
            bytesToRead = bytesToRead + "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),";
            bytesToRead = bytesToRead + "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)";
            bytesToRead = bytesToRead + "})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');";
            bytesToRead = bytesToRead + "ga('create', '" + id_ga + "', 'auto');";
            bytesToRead = bytesToRead + "ga('send', 'pageview');\x3c/script>";
            base = base + bytesToRead;
        }
        if (id_google_ads && id_google_ads.length > 0) {
            var bytesToRead = "<script async='' src='https://www.googletagmanager.com/gtag/js?id=id_ads_google'></script>";
            bytesToRead = bytesToRead + " <script>window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments); }gtag('js', new Date());gtag('config','" + id_google_ads + "');</script>";
            base = base + bytesToRead;
        }
        base = base + '<script>function reveal(){for(var a=0;a<view_elements.length;a++){var b=0,c=view_elements[a];do isNaN(c.offsetTop)||(b+=c.offsetTop);while(c=c.offsetParent);var d=window.pageYOffset,e=window.innerHeight,c=view_elements[a];window.pageXOffset,window.innerWidth;b>=d&&d+e>=b&&(view_elements[a].classList.remove("hide-background-image"),view_elements.splice(a,1),a--)}}function qazy_list_maker(){for(var a=document.getElementsByClassName("hide-background-image"),b=0;b<a.length;b++)view_elements.push(a[b])}var view_elements=[];window.addEventListener("resize",reveal,!1),window.addEventListener("scroll",reveal,!1);var intervalObject=setInterval(function(){qazy_list_maker()},50);window.addEventListener("load",function(){clearInterval(intervalObject),qazy_list_maker(),reveal();},!1);\x3c/script>';
        base = base + '<script type="text/javascript">' + trackPop + '</script>';
        var extCss = dummyData.headCss || '';
        var extCss = extCss.toLowerCase().startsWith('<style>') ? extCss : '<style>' + extCss + '</style>';
        base = base + extCss + dummyData.head;
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
                        if (list[i].animateRelay == 1) {
                            $this.addClass("infinite");
                        }
                    }
                }
            }
            if (void 0 != list[i].animate_ext) {
                //var obj =  + ' .widget-content');
                var obj = $('#' + $this.attr("id")).find(".widget-content:eq(0)")
                if (obj != void 0 && $.inArray(list[i].animate_ext, pn_animate_ext_inherit) >= 0) {
                    obj.addClass(list[i].animate_ext);
                } else {
                    $this.addClass("" + list[i].animate_ext);
                }
            }
        }
        if (1 == E) {
            A = ($.now(), "if(media!='all')media='all'");
            base = base + ('<link async rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.3.1/animate.min.css" media="none" onload="' + A + '">');
        }

        base = base + "</head>";
        var html = "<body>";
        html += '<div class="preloader"><div class="spinner"><div class="pre-bounce1"></div> <div class="pre-bounce2"></div></div></div>';
        var pnTk = {
            idgAny: (id_google_tag && id_google_tag.length>0)? true: false,
            pixel: (id_fb_pixel && id_fb_pixel.length > 0) ? true : false,
            idgAds: (id_google_ads && id_google_ads.length > 0) ? true : false,
        };

        html = html + '<div id="punnel-wraper-page" class="punnel-wraper-page" pn-track="' + JSON.stringify(pnTk) + '">';

        if (id_google_tag && id_google_tag.length > 0) {
            var shapeHolder = "<noscript>";
            shapeHolder = shapeHolder + ('<iframe src="https://www.googletagmanager.com/ns.html?id=' + id_google_tag + '"height="0" width="0" style="display:none;visibility:hidden"></iframe>');
            shapeHolder = shapeHolder + "</noscript>";
            html = html + shapeHolder;
        }
        if (m > 0) {
            var I = html.search('id="fb-root"');
            if (-1 == I) {
                html = html + '<div id="fb-root"></div>';
                html = html + '<script async defer crossorigin="anonymous" src="https://connect.facebook.net/vi_VN/sdk.js#xfbml=1&version=v3.3&appId=' + api_key + '&autoLogAppEvents=1"></script>';
            }
        }
        if (mf > 0) {
            var I1 = html.search('id="fb-root"');
            if (-1 == I1) {
                html = html + '<div id="fb-root"></div>'
            }
            html = html +    '<script>(function (d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return;';
            html = html + "js = d.createElement(s); js.id = id;";
            html = html + ('js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js');
            html = html + "fjs.parentNode.insertBefore(js, fjs);";
            html = html + "}(document, 'script', 'facebook-jssdk'));\x3c/script>";
            
        }
        var punnel_html_body = PN_PAGE.PUNNEL_EDIT.html();
        html = html + punnel_html_body;
        var ts = $.now();
        if (g_wrappedText && g_wrappedText.length > 0) {
            html = html + ('<script async type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false&key=' + g_wrappedText + '">\x3c/script>');
        } else {
            if (1 == n) {
                html = html + '<script async type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false">\x3c/script>';
            }
        }

        var font_family = '"' + pn_page_font.split('|').join('","') + '"';
        html = html + '<script type="text/javascript"> WebFontConfig={google:{families:[' + font_family + ']}},function(){var e=document.createElement("script");e.src="https://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js",e.type="text/javascript",e.async="true";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}(); </script>';       
        html = html + '<script async src="https://hstatic.punnel.com/source/punnel.lib.js?v=' + ts + '"></script>';
        //html = html + '<script src="http://localhost:2171/Scripts/libs/jquery-3.3.1.js"></script><script src = "http://localhost:2171/Scripts/libs/sweetalert.js"></script><script src="http://localhost:2171/Scripts/ext/punnel.lib.js"></script>';

        if (punnel_html_body.indexOf('select_city') > 0) {
            html = html + '<script async src="https://hstatic.punnel.com/source/location.min.js"></script>';           
        }
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
        var fb_msg = dummyData.fb_messenger || "";

        var notifyBlock = '', notifySheetId = '';
        if (dummyData.notify && dummyData.notify != null && dummyData.notify.useNotify == true) {
            if (dummyData.notify.useCustom == false) notifySheetId = '1LXjHwcVx_rcabqcy5EEmbzQepnO7xkVn8Uyz93HN-RI';
            else notifySheetId = dummyData.notify.sheetId;
            notifyBlock = '<div class="pn-notify" style="width:340px;height:63px;" data-notify="{&quot;sheetid&quot;:&quot;' + notifySheetId + '&quot;,&quot;position&quot;:&quot;' + dummyData.notify.position + '&quot;,&quot;custom&quot;:&quot;' + dummyData.notify.useCustom + '&quot;}" style="opacity: 0;"> <div class="widget-content"> <div class="ntimage"><img src=""></div><div class="nttitle"></div><div class="ntcontent"></div><div class="nttime"></div><div class="notify-br-punnel"><svg width="15" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g><path d="M38.618,20H26V0.764L11.382,30H24v19.236L38.618,20z M14.618,28L24,9.236V22h11.382L26,40.764V28H14.618z"></path></g></svg><a href="https://punnel.com?utm_source=bypunnel" target="_blank">by <strong>Punnel</strong></a></div></div></div>';
        }

        var databindBlock = '';
        if (dummyData.databind && dummyData.databind != null && dummyData.databind && dummyData.databind.sheetId.length>0) {         
            databindBlock = '<div id="pn-databind-sheet" sheet-id="' + dummyData.databind.sheetId + '"></div>';
        }

        return html = base + "<body>" + databindBlock + html.replace(/undefined/g, "") + dummyData.body + notifyBlock + fb_msg + "</body></html>", $(".horizontal-line").appendTo($(".iframe-content")), {
            html: html,
            list: certs
        };
    };

    $scope.checkHethanUser = function () {
        return PN_PAGE.account.dayExpired && parseFloat(PN_PAGE.account.dayExpired) >= 0 ? 2 == PN_PAGE.account.type || 3 == PN_PAGE.account.type ? "true" : (swal({
            title: "Th\u00f4ng b\u00e1o ",
            text: "N\u00e2ng c\u1ea5p g\u00f3i d\u1ecbch v\u1ee5 \u0111\u1ec3 s\u1eed d\u1ee5ng t\u00ednh n\u0103ng n\u00e0y!",
            showCancelButton: true,
            confirmButtonColor: "#009FE3",
            confirmButtonText: "N\u00e2ng c\u1ea5p",
            cancelButtonText: "Kh\u00f4ng",
            closeOnConfirm: true
        }, function (a) {
            if (a) {
                $("#inforupgrade").modal("show");
                $("#publish").modal("hide");
            }
        }), "false") : (swal({
            title: "Th\u00f4ng b\u00e1o ",
            text: "T\u00e0i kho\u1ea3n c\u1ee7a b\u1ea1n l\u00e0 mi\u1ec5n ph\u00ed ho\u1eb7c h\u1ebft h\u1ea1n s\u1eed d\u1ee5ng. N\u00e2ng c\u1ea5p ho\u1eb7c gia h\u1ea1n g\u00f3i d\u1ecbch v\u1ee5 \u0111\u1ec3 ti\u1ebfp t\u1ee5c s\u1eed d\u1ee5ng!",
            showCancelButton: true,
            confirmButtonColor: "#009FE3",
            confirmButtonText: "N\u00e2ng c\u1ea5p",
            cancelButtonText: "Kh\u00f4ng",
            closeOnConfirm: true
        }, function (a) {
            if (a) {
                $("#inforupgrade").modal("show");
                $("#publish").modal("hide");
            }
        }), "false");
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

    $scope.createTrackingPopup = function (params) { 
        var t = "";
        if (1 == params.popup) {
            var evtDefs = dummyData.idpixel;
            var cmpDefs = dummyData.idanalytics;
            var id_fb_pixel = dummyData.idgoogletag;
            if (cmpDefs && cmpDefs.length > 0 || evtDefs && evtDefs.length > 0 || params.trackingPopHead && params.trackingPopHead.length > 0 || params.trackingPopBody && params.trackingPopBody.length > 0) {
                if (t = t + " <!DOCTYPE html><html>", t = t + '<head><meta charset="UTF-8">', id_fb_pixel && id_fb_pixel.length > 0) {
                    var scrollTop = "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':";
                    scrollTop = scrollTop + "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],";
                    scrollTop = scrollTop + "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=";
                    scrollTop = scrollTop + "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);";
                    scrollTop = scrollTop + ("})(window,document,'script','dataLayer','" + id_fb_pixel + "');\x3c/script>");
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
                if (params.trackingPopHead && params.trackingPopHead.length > 0 && (t = t + params.trackingPopHead), t = t + "</head>", t = t + "<body>", id_fb_pixel && id_fb_pixel.length > 0) {
                    var scrollTop = "<noscript>";
                    scrollTop = scrollTop + ('<iframe src="https://www.googletagmanager.com/ns.html?id=' + id_fb_pixel + '"height="0" width="0" style="display:none;visibility:hidden"></iframe>');
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

    $scope.checkValue = function (a) {
        if (!($(a.target).val().length > 0)) {
            $(a.target).focus();
        }
    };

    $scope.selectAllText = function () {
        document.execCommand("selectAll", false, null);
    };

    $scope.createUtm = function () {
        $scope.campaign_utm_url = "";
        if ($scope.campaign_source && $scope.campaign_source.length > 0 && ($scope.campaign_term && $scope.campaign_term.length > 0 || $scope.campaign_name && $scope.campaign_name.length > 0 || $scope.campaign_medium && $scope.campaign_medium.length > 0 || $scope.campaign_source && $scope.campaign_source.length > 0 || $scope.campaign_content && $scope.campaign_content.length > 0)) {
            if ($scope.publishLink && $scope.publishLink.length > 0) {
                if (-1 != $scope.publishLink.search("https") || -1 != $scope.publishLink.search("http")) {
                    $scope.campaign_utm_url += $scope.publishLink;
                } else {
                    $scope.campaign_utm_url += "http://" + $scope.publishLink;
                }
            } else {
                $scope.campaign_utm_url += "";
            }
            if ($scope.campaign_source && $scope.campaign_source.length > 0) {
                $scope.campaign_utm_url += "?utm_source=" + $scope.campaign_source;
            }
            if ($scope.campaign_medium && $scope.campaign_medium.length > 0) {
                $scope.campaign_utm_url += "&utm_medium=" + $scope.campaign_medium;
            }
            if ($scope.campaign_name && $scope.campaign_name.length > 0) {
                $scope.campaign_utm_url += "&utm_campaign=" + $scope.campaign_name;
            }
            if ($scope.campaign_term && $scope.campaign_term.length > 0) {
                $scope.campaign_utm_url += "&utm_term=" + $scope.campaign_term;
            }
            if ($scope.campaign_content && $scope.campaign_content.length > 0) {
                $scope.campaign_utm_url += "&utm_content=" + $scope.campaign_content;
            }
        }
    };

    $scope.previewPublish = function () {
        if ("wordpress" == dummyData.typePublish || "ftp" == dummyData.typePublish) {
            $scope.tabSelect = dummyData.typePublish;
        } else {
            $scope.tabSelect = "ten-mien";
        }
    };

    function checkdomainPreview (annotations) {
        var protocol = "http://";
        if (annotations.indexOf('punnel.com')>=0) protocol = "https://";
        var key = annotations;
        return annotations && annotations.length > 0 && (key = -1 != annotations.search("http://") || -1 != annotations.search("https://") ? annotations : protocol + annotations), key;
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
                    for (; index < pn_fonts.length; index++) {
                        if (results[i].media.classFont == pn_fonts[index]["class"]) {
                            content = content + ("" == content ? pn_fonts[index].font_api : "|" + pn_fonts[index].font_api);
                        }
                    }
                }
            }
        }
        return content;
    };

    $scope.urlExport = ApiPath + "/Landingpage/Export?id=" + $stateParams.id + "&token=";// + $auth.getToken();

    $scope.anchorSetting = function (visible) {
        var is_visible = visible || false;
        var container = $(".aside-setting");
        if (!container.hasClass('anchor-setting')) {
            //Hiện setting
            container.addClass('anchor-setting');
            $('.is-maincontent').css('margin-right', '250px');
            container.show();
            //$('#anchor-settings').text('close');
            $scope.setting_visible = 1;
            localStorageService.set('setting-visible', 1);
            if ($('.vertical-line').hasClass("left") == false) {
                $('.vertical-line').addClass("left");
            }
            $(".aside-setting-option").fadeOut();
            $(".is-maincontent .vertical-line .rulers-number.rule-desktop").css("left", "calc((100% - " + (dummyData.viewport.size_desktop || 960) + "px - 260px) / 2)");
        } else if (is_visible==false) {
            container.removeClass('anchor-setting');
            $('.is-maincontent').css('margin-right', '0px');
            container.hide();
            $scope.setting_visible = 0;
            localStorageService.set('setting-visible', 0);
            if ($('.vertical-line').hasClass("left") == true) {
                $('.vertical-line').removeClass("left");
            }
            $(".aside-setting-option").fadeIn();
            $(".is-maincontent .vertical-line .rulers-number.rule-desktop").css("left", "calc((100% - " + (dummyData.viewport.size_desktop || 960) + "px - 10px) / 2)");
        }
        $('#resizable-element').hide();
        $('.edit-section').hide();
        $("#box-hover-element").hide();
    }

    //-------------menu page ------------
    if (!dummyData.title) {
        dummyData.title = "Đặt tiêu đề trang";
    }
    $(".topbar .current-page .title span").text(dummyData.title);

    if (!$stateParams.id) {
        $state.go("dashboard");
    }

    $scope.index = 1;
    $scope.showResetMobile = "0";
    $scope.isRequestSaveAuto = "false";
    $scope.timeUpdate = PN_PAGE.account.timeUpdate;

    $scope.goToDashboad = function () {
        if (pageSave) {
            localStorage.setItem("coundReload", 1);
            if ($stateParams.type == 't') {
                $state.go("dashboard.template", {
                    reload: true
                });
            } else {
                $state.go("dashboard.landingpage", {
                    reload: true
                });
            }
        } else {
            swal({
                title: "L\u01b0u \u00fd",
                text: "Ch\u00fa \u00fd l\u01b0u thay \u0111\u1ed5i tr\u01b0\u1edbc khi r\u1eddi kh\u1ecfi Punnel Builder",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "R\u1eddi kh\u1ecfi",
                cancelButtonText: "\u1ede l\u1ea1i",
                closeOnConfirm: true
            }, function (value) {
                if (value == false) return;
                selectedItem = void 0;
                localStorage.setItem("coundReload", 1);
                if ($stateParams.type == 't') {
                    $state.go("dashboard.template", {
                        reload: true
                    });
                } else {
                    $state.go("dashboard.landingpage", {
                        reload: true
                    });
                }
            });
        }
    };
    $scope.showEditMobile = function () {
        $("#setting-edit-mobile").modal("hide");
        $scope.editMobile();
        $(".action-mobile").removeClass("ng-hide");
        $scope.showResetMobile = "1";
        deviceEdit = "mobile";
    };
    $scope.addActive = function (type) {
        $(".topbar .active[pn-menu-active]").removeClass("active");
        $('.topbar [pn-menu-active="' + type + '"]').addClass("active");
    };
    $scope.editMobile = function () {
        var a = $('.widget-section[pn-popup != "true"]').eq(0);
        if (!a) {
            a = $(".widget-section").eq(0);
        }
        if (a && a.length > 0) {
            $(".reset-mobile li").eq(0).attr("data-original-title", "S\u1eafp x\u1ebfp l\u1ea1i " + a.attr("id"));
            $(".reset-mobile li").eq(1).attr("data-original-title", "\u1ea8n " + a.attr("id")).attr("id-section", a.attr("id"));
        }
        $scope.showResetMobile = "1";
        PN_PAGE.loading.show();
        $(".is-maincontent").addClass("punnel-mobile");
        $(".is-maincontent").css({
            "margin-left": "0",
            "padding-left": "0"
        });
        var b = new AddGroup;
        b.removeGroupTmp();
        var c = new OptionWiget;
        c.sortWg();
        deviceEdit = "mobile";
        $('#header .action-screen li[pn-active="drive"]').removeClass("active");
        $('#header .action-screen li[pn-menu-active="mobile"]').addClass("active");
        $('[data-toggle="tooltip"]').tooltip("hide");
        $(".grid-system").addClass("grid-mobile");
        $(".aside-setting .widget-item").hide();
        $(".widget-section").css({
            margin: "0"
        });
        $(".grid-system").hide();
        PN_PAGE.showElementEditorText();
        $('.widget-section[pn-popup="true"]').hide();
        $(".resizable-popup").hide();
        $scope.settingValueMobile();
        setTimeout(function () {
            PN_PAGE.loading.hide();
        }, 2e3);
        $("#punnel-editor .wrap-child").css({
            left: "0px"
        });
        $("#punnel-editor .wrap-child .widget-element").css({
            visibility: "visible"
        });
        $(".horizontal-guide-container .vertical-guide").removeClass("active");
        $(".vertical-guide-container .horizontal-guide").removeClass("active"); 

        localStorageService.set('setting-visible', 1);
        $scope.anchorSetting(true);
        window.loadViewport();
    };
    $scope.sortMobile = function () {
        var a = new OptionWiget;
        a.sortWg();
        var target = new SortElementMobile;
        var i = 0;
        for (; i < apiElement.length; i++) {
            apiElement[i].sortmobile = 0;
            apiElement[i].mobile = 0;
        }
        PN_PAGE.sortMobilePublish = 1;
        target.sortItem();
        target.sortFormHightToLow("desktop");
        var sections = PN_PAGE.getElement(".widget-section");
        sections.each(function () {
            var resize_section = new ResizeSection;
            resize_section.setHeightSection($(this));
        });
        $("#resizable-element").hide();
    };
    $scope.settingValueMobile = function () {
        PN_PAGE.sortMobilePublish = 0;
        PN_PAGE.PUNNEL_EDIT.scrollTop(0);
        deviceEdit = "mobile";
        var a = new OptionWiget;
        a.sortWg();
        l = new AjaxPage;
        TOP_FRAME = PN_PAGE.PUNNEL_EDIT.offset().top;
        LEFT_FRAME = PN_PAGE.PUNNEL_EDIT.offset().left;
        a.fixsizeBody();
        PN_PAGE.getElement('.widget-element[pn-type="menu-header"][pn-navigation="true"] .widget-content').eq(0).hide();
        PN_PAGE.getElement('.widget-element[pn-type="menu-header"][pn-navigation="true"] .widget-content:eq(0) .widget-element').hide();
        l.itemMobile();
        $(".aside-left .hide-mobile").hide();
        $(".aside-left .show-mobile").show();
        arrIdOnScreen = [];
        selectedItem = PN_PAGE.getElement(".widget-section:visible").eq(0);
        arrIdOnScreen = a.getIdElementOnScreen();
        var api = new setStyleElement;
        if (api.init(apiElement, "mobile"), 30 == typeAddNew) {
            selectedItem = $('#punnel-editor .widget-section[pn-popup="true"]').eq(0);
            selectedItem.show();
            var viewModel = new ShowBoxResize;
            viewModel.showBoxSection(selectedItem);
        } else {
            selectedItem = void 0;
        }
        $rootScope.id = "";
        $(".rule-desktop").hide();
        $(".rule-mobile").show();
        var BDA = new resetPage;
        BDA.init();
    };
    $scope.editDesktop = function () {
        $scope.showResetMobile = "0";
        $(".action-mobile").addClass("ng-hide");
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
        $scope.settingValueDesktop();
        $(".horizontal-guide-container .vertical-guide").removeClass("active");
        $(".vertical-guide-container .horizontal-guide").removeClass("active");
        window.loadViewport();
    };
    $scope.settingValueDesktop = function () {
        PN_PAGE.PUNNEL_EDIT.scrollTop(0);
        topScroll = 0;
        deviceEdit = "desktop";
        l = new AjaxPage;
        TOP_FRAME = PN_PAGE.PUNNEL_EDIT.offset().top;
        LEFT_FRAME = PN_PAGE.PUNNEL_EDIT.offset().left;
        var a = new OptionWiget;
        a.fixsizeBody();
        PN_PAGE.getElement('.widget-element[pn-type="menu-header"][pn-navigation="true"] .widget-content').eq(0).show();
        PN_PAGE.getElement('.widget-element[pn-type="menu-header"][pn-navigation="true"] .widget-content:eq(0) .widget-element').show();
        l.itemDesktop();
        arrIdOnScreen = [];
        selectedItem = PN_PAGE.getElement(".widget-section:visible").eq(0);
        arrIdOnScreen = a.getIdElementOnScreen();
        var t = new setStyleElement;
        if (t.init(apiElement, "desktop"), 30 == typeAddNew) {
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
        $rootScope.id = "";
        $(".rule-desktop").show();
        $(".rule-mobile").hide();
        var BDA = new resetPage;
        BDA.init();
        $("#punnel-editor .wrap-child").css({
            left: "0px"
        });
        $("#punnel-editor .wrap-child .widget-element").css({
            visibility: "visible"
        });
    };
    $scope.editUndo = function () {
        if (PN_PAGE.showElementEditorText(), 1 != preview) {
            var a = new EventKey;
            a.undoElement();
        }
    };
    $scope.editRedo = function () {
        if (PN_PAGE.showElementEditorText(), 1 != preview) {
            var a = new EventKey;
            a.redoElement();
        }
    };
    $scope.showSettingpage = function () {
        popupService.settingManagerShow();
        PN_PAGE.showElementEditorText();
    };

    $scope.showSEOSetting = function () {
        popupService.show('pageSEOSetting.html', {}, ['$scope', '$state', '$mdDialog', '$restful', '$stateParams', function ($scope, $state, $mdDialog, $restful, $stateParams) {
            $scope.trackingItems = itemTracking;
            $scope.trackingValue = '';

            $scope.pageInfo = {
                imageFavicon: dummyData.imageFavicon ? apiStaticDefault + 's64x64/' + dummyData.imageFavicon : '',
                imagePage: dummyData.imagePage ? apiStaticDefault + (dummyData.imagePage || 'images/noimage.png') : '',
                title: dummyData.title || '',
                desc: dummyData.desc || '',
                keyword: dummyData.keyword || '',
                canonicalUrl: dummyData.canonicalUrl || '',
                allowIndex: dummyData.allowIndex || true
            }

            $scope.showImage = function (type) {
                typeImage = type;
                saveInfo();
                popupService.imageManagerShow({}, function (res) {
                    imgUtils.process(res, type, "");
                    $scope.hide('re-open');
                    if (type == 'image-share') {
                        var apiPath = ApiStatic.substr(0, ApiStatic.length - 1);
                        var imgUrl = apiPath + res.replace("/s200x200/", "/");
                        $restful.put("/landingpage", {
                            id: $stateParams.id,
                            thumbnail: imgUrl.replace(ApiStatic, ''),
                            opt: "thumb"
                        }).then(function (b) {
                            console.log(b)
                        });
                    }
                });
            }

            function saveInfo() {
                dummyData.title = $scope.pageInfo.title;
                dummyData.desc = $scope.pageInfo.desc;
                dummyData.keyword = $scope.pageInfo.keyword;
                dummyData.canonicalUrl = $scope.pageInfo.canonicalUrl;
                dummyData.allowIndex = $scope.pageInfo.allowIndex;
                if ($scope.pageInfo.imageFavicon) {
                    dummyData.imageFavicon = $scope.pageInfo.imageFavicon.replace(apiStaticDefault + 's64x64/', '');
                }
                if ($scope.pageInfo.imagePage) {
                    dummyData.imagePage = $scope.pageInfo.imagePage.replace(apiStaticDefault , '');
                }
            }

            $scope.submit = function () {
                saveInfo();
                $scope.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function (res) {
                $mdDialog.hide(res);
            };
        }], function (res) {
                if (res && res=== 're-open'){
                    $scope.showSEOSetting();
                }
        });
    }

    $scope.showTrackingSetting = function () {
        popupService.show('pageTrackingSetting.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.trackingItems = itemTracking;
            $scope.trackingValue = '';
            $scope.pageInfo = {
                idpixel: dummyData.idpixel || '',
                idanalytics: dummyData.idanalytics || '',
                idgoogletag: dummyData.idgoogletag || '',
                idgoogleAds: dummyData.idgoogleAds || ''
            }

            $scope.addTrackingItem = function (index) {
                $scope.pageInfo.head += "<script>" + $scope.trackingItems[index].value + "</script>\n";
            }

            function saveInfo() {
                dummyData.idpixel = $scope.pageInfo.idpixel;
                dummyData.idanalytics = $scope.pageInfo.idanalytics;
                dummyData.idgoogletag = $scope.pageInfo.idgoogletag;
                dummyData.idgoogleAds = $scope.pageInfo.idgoogleAds;
            }

            $scope.submit = function () {
                saveInfo();
                $scope.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };
            
        }], function () {
        });
    }

    $scope.showScriptSetting = function () {
        popupService.show('pageScriptSetting.html', {}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.trackingItems = itemTracking;
            $scope.trackingValue = '';
            $scope.pageInfo = {
                head: dummyData.head,
                body: dummyData.body
            }

            $scope.aceOption = {
                mode: 'javascript',
                useWrapMode: true,
                showGutter: true,
                onLoad: function (editor) {
                    var len = editor.session.getValue().length;
                    var node = editor.renderer.emptyMessageNode;
                    if (len>0 && node) {
                        editor.renderer.scroller.removeChild(editor.renderer.emptyMessageNode);
                        editor.renderer.emptyMessageNode = null;
                    } else if (len == 0 && node == undefined) {
                        node = editor.renderer.emptyMessageNode = document.createElement("div");
                        node.textContent = "Nhập thông tin cần thêm vào đây"
                        node.className = "ace_invisible ace_emptyMessage"
                        node.style.padding = "0 9px"
                        editor.renderer.scroller.appendChild(node);
                    }
                },
                onChange: function (e) {
                    var r = e[1].renderer;
                    r.scroller.removeChild(r.emptyMessageNode);
                    r.emptyMessageNode = null;
                }
            };

            function saveInfo() {
                dummyData.head = $scope.pageInfo.head;
                dummyData.body = $scope.pageInfo.body;
            }

            $scope.submit = function () {
                saveInfo();
                $scope.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

        }], function () {
        });
    }

    $scope.showCssSetting = function () {
        popupService.show('pageCssSetting.html', {}, ['$scope', '$mdDialog', function ($scope, $mdDialog) {
            $scope.pageInfo = {
                head: dummyData.headCss
            }

            $scope.aceOption = {
                mode: 'CSS',
                useWrapMode: true,
                showGutter: true,
                onLoad: function (editor) {
                    var len = editor.session.getValue().length;
                    var node = editor.renderer.emptyMessageNode;
                    if (len > 0 && node) {
                        editor.renderer.scroller.removeChild(editor.renderer.emptyMessageNode);
                        editor.renderer.emptyMessageNode = null;
                    } else if (len == 0 && node == undefined) {
                        node = editor.renderer.emptyMessageNode = document.createElement("div");
                        node.textContent = "<style></style>"
                        node.className = "ace_invisible ace_emptyMessage"
                        node.style.padding = "0 9px"
                        editor.renderer.scroller.appendChild(node);
                    }
                },
                onChange: function (e) {
                    var r = e[1].renderer;
                    r.scroller.removeChild(r.emptyMessageNode);
                    r.emptyMessageNode = null;
                }
            };

            function saveInfo() {
                dummyData.headCss = $scope.pageInfo.head;
            }

            $scope.submit = function () {
                saveInfo();
                $scope.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

        }], function () {
        });
    }

    $scope.showHistory = function () {
        popupService.show('pageHistory.html', {}, ['$scope', '$stateParams', '$restful', '$mdDialog', function ($scope, $stateParams, $restful, $mdDialog) {
            $scope.histories = [];
            var page_id = $stateParams.id;
           
            $scope.init = function () {
                PN_PAGE.loading.show();
                $restful.get('/history', { page_id: page_id}).then(function (res) {
                    PN_PAGE.loading.hide();
                    $scope.histories = res.data;
                });
            };

            $scope.preview = function (id) {
                var url = $state.href('preview', { id: page_id, time:id});
                window.open(url, "_blank");
            }

            $scope.apply = function (id) {
                PN_PAGE.pageLoading.show();
                $restful.get('/history', { id: id, page_id: page_id  }).then(function (res) {                    
                    PN_PAGE.PUNNEL_EDIT = $("#punnel-editor");
                    PN_PAGE.PUNNEL_EDIT.html("");
                    var FeedsService = new GetDataService;
                    FeedsService.xulySource(res.data.source, function () {
                        PN_PAGE.pageLoading.hide();
                        $scope.hide();
                    });
                });
            }

            $scope.remove = function (id, index) {
                swal({
                    title: "Xóa bản lưu!",
                    text: "Bạn chắc muốn xóa bản lưu này?",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "\u0110\u1ed3ng \u00fd",
                    cancelButtonText: "Kh\u00f4ng x\u00f3a",
                    closeOnConfirm: true
                }, function (value) {
                    if (value == true) {
                        PN_PAGE.loading.show();
                        $restful.delete("/history", { id: id, page_id: page_id }).then(function (res) {
                            PN_PAGE.loading.hide();
                            swal("Đã xóa!", "", "success");
                            $scope.histories.splice(index, 1);   
                            return;
                        });
                    }
                });
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

        }], function () {
        });
    }

    $scope.showMessengerSetting = function () {
        popupService.show('pageMessengerSetting.html', {}, ['$scope', '$http', 'facebookService', '$restful', '$mdDialog', '$mdColorPalette', function ($scope, $http, facebookService, $restful, $mdDialog, $mdColorPalette) {
            $scope.crPage = null;
            $scope.step = 0;
            $scope.pages = [];
            $scope.page = {
                id: '',
                name: '',
                access_token:'',
                greetingIn: 'Xin chào! Chúng tôi có thể giúp gì cho bạn?',
                greetingOut: 'Xin chào! Nếu cần trợ giúp xin hãy đăng nhập vào Facebook để chát với chúng tôi',
                delay: 0,
                color:'#0084ff'
            };

            $scope.colors = color_common;

            function findCrPage() {
                if (dummyData.fb_messenger && dummyData.fb_messenger.length > 0) {
                    //console.log(dummyData.fb_messenger);
                    var x = dummyData.fb_messenger.indexOf('page_id="');
                    var y = dummyData.fb_messenger.indexOf('" theme_color=');
                    if (x > 0 && y > 0) {
                        var code = dummyData.fb_messenger.substring(x + 9, y);
                        //console.log(code);
                        $scope.crPage = code;
                    }
                }
            }

            $scope.login = function() {
                console.log('resquest perms');
                facebookService.login().then(function (res) {
                    if (res.status == 'connected') {
                        getFanPages();
                    }
                });
            }

            function getFanPages() {
                facebookService.getPages()
                    .then(function (res) {
                        $scope.pages = res.data;   
                        $scope.step = 1;
                    });
            }

            function choosePage(page) {
                console.log(choosePage);
                $scope.page.id = page.id;
                $scope.page.name = page.name;
                $scope.page.access_token = page.access_token;
                $scope.step = 2;
            }
            
            $scope.chooseColor = function (color) {
                $scope.page.color = color;
            }

            $scope.init = function () {
                findCrPage();
                facebookService.isLogin()
                    .then(function (res) {
                        //console.log(res.status);
                        if (res.status === 'connected') {
                            //neu user da login fb => kiem tra app có quyen quan ly page
                            facebookService.getPerms().then(function (r) {
                                console.log(r.data);
                                var t = $.grep(r.data, function (n, i) {
                                    return n.permission === 'manage_pages';
                                });
                                if (t.length > 0) {
                                    console.log('get pages');
                                    getFanPages();
                                } else {
                                    $scope.step = 0;
                                }
                            });
                        } else if (res.status === 'unknown') {
                            $scope.step = 0;
                        } else if (res.status === 'not_authorized') {
                            $scope.step = 0;
                        }
                    });
            };

            $scope.subscribePage = function (item) {
                facebookService.loginPage(item.id, item.access_token)
                    .then(function (res) {
                        console.log('loginPage');
                        console.log(res);
                        console.log(res.data);
                        if (res.data.length === 0) {
                            facebookService.subscribePage(item.id, item.access_token)
                                .then(function (res) {
                                    console.log('subscribePage');
                                    console.log(res);
                                    console.log(res.data);
                                    if (res.success === true) {
                                        dummyData.fb_messenger = '';
                                        $scope.crPage = null;
                                        choosePage(item);
                                    }
                                });
                        } else {
                            choosePage(item);
                        }
                    });
            }

            $scope.unSubscribePage = function (item) {
                dummyData.fb_messenger = '';
                $scope.crPage = null;
                swal('Đã hủy cấu hình Facebook Messenger', '', 'success');
            }

            $scope.goBack = function () {
                $scope.step = 1;
            }

            $scope.apply = function () {
                var domains = [];
                domains.push(ApiDemo);
                var dm = (dummyData.domain.indexOf('/') > 6) ? dummyData.domain.split('/')[0] : dummyData.domain;
                if (dummyData.domain && dummyData.domain.indexOf('punnel.com') === -1 && $.inArray(dm, domains)<0) domains.push(dm);
                PN_PAGE.btnLoading.show();
                facebookService.addDomain($scope.page.access_token, domains)
                    .then(function (r) {
                        var res = '<div id="fb-root"></div> <script>(function(d, s, id) { var js, fjs = d.getElementsByTagName(s)[0]; if (d.getElementById(id)) return; js = d.createElement(s); js.id = id; js.src = "https://connect.facebook.net/vi_VN/sdk/xfbml.customerchat.js#xfbml=1&version=v5.0&autoLogAppEvents=1"; fjs.parentNode.insertBefore(js, fjs); }(document, "script", "facebook-jssdk"));</script>';
                        res += '<div class="fb-customerchat" attribution=setup_tool page_id="' + $scope.page.id + '" theme_color="' + $scope.page.color + '" logged_in_greeting="' + $scope.page.greetingIn + '" logged_out_greeting="' + $scope.page.greetingOut + '"> </div>';
                        dummyData.fb_messenger = res;
                        swal('Cấu hình Facebook Messenger thành công', '', 'success');
                        $scope.hide();
                    }, function (err) {
                        alert(err);
                    });
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

        }], function () {
        });
    }

    $scope.showAffiliateSetting = function () {
        popupService.show('pageAffilateSetting.html', {}, ['$scope', '$auth', '$mdDialog', function ($scope, $auth, $mdDialog) {
            $scope.requireAffiliate = false;

            $scope.trackingValue = '';

            $scope.pageInfo = {
                showAffiliateBadge: false
            }

            $scope.init = function () {
                if (dummyData.showAffiliateBadge) $scope.pageInfo.showAffiliateBadge = dummyData.showAffiliateBadge;
                var level = $auth.level();
                if (level == 0) {
                    $scope.pageInfo.showAffiliateBadge = true;
                    $scope.requireAffiliate = true;
                }
            }

            function saveInfo() {
                dummyData.showAffiliateBadge = $scope.pageInfo.showAffiliateBadge;
            }

            $scope.submit = function () {
                saveInfo();
                $scope.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

        }], function () {
        });
    }

    $scope.showNotifySetting = function () {
        popupService.show('pageNotifySetting.html', {}, ['$scope', '$mdDialog', function ($scope, $mdDialog) {

            $scope.notify = {
                useNotify: false,
                useCustom: false,
                sheetId: '',
                position:'topleft'
            }

            $scope.init = function () {
                if (dummyData.notify) {
                    $scope.notify = dummyData.notify;
                }
            }

            function saveInfo() {
                dummyData.notify = $scope.notify;
            }

            $scope.submit = function () {
                saveInfo();
                $scope.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

        }], function () {
        });
    }

    $scope.showDatabindSetting = function () {
        popupService.show('pageDatabindSetting.html', {}, ['$scope', '$mdDialog', function ($scope, $mdDialog) {
            $scope.databind = {
                sheetId: ''
            }

            $scope.init = function () {
                if (dummyData.databind) {
                    $scope.databind = dummyData.databind;
                }
            }

            function saveInfo() {
                dummyData.databind = $scope.databind;
            }

            $scope.submit = function () {
                saveInfo();
                $scope.hide();
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function () {
                $mdDialog.hide();
            };

        }], function () {
        });
    }

    $scope.saveRuleGuide = function () {
        var a = $(".vertical-guide");
        var b = $(".horizontal-guide");
        var publicInfo = {
            rulerVer: [],
            rulerHor: [],
            status: "show"
        };
        return a && a.length > 0 && a.each(function (a) {
            if (0 != a) {
                var falseySection = {
                    "class": $(this).attr("class"),
                    top: $(this).css("top")
                };
                publicInfo.rulerVer.push(falseySection);
            }
        }), b && b.length > 0 && b.each(function (a) {
            if (0 != a) {
                var b = {
                    "class": $(this).attr("class"),
                    left: $(this).css("left")
                };
                publicInfo.rulerHor.push(b);
            }
        }), "none" == $(".vertical-line").css("display") && (publicInfo.status = "hide"), publicInfo;
    };

    $scope.needEditMobile = function () {
        var a = false;
        for (var i = 0; i < apiElement.length; i++) {
            if (1 != apiElement[i].mobile) {
                a = true;
            }
        }
        return a;
    }

    $scope.isPublishing = 0;

    $scope.showPublishPage = function () {
        if ($scope.canAction.publish == false) {
            PN_PAGE.requirePaid();
            return;
        }
        //dummyData.arrRule = $scope.saveRuleGuide();
        if ($scope.needEditMobile() == true) {
            $scope.showAlertEditMobile();
        } else {
            publishPage($scope.publishLink);
        }
    };


    function publishPage(domain,type) {
        $scope.isPublishing = 1;
        PN_PAGE.loading.show();
        getHtmlLandingpage(function (cando, ref) {
            if (ref) {
                var postData = {
                    id: $stateParams.id,
                    source: JSON.stringify(dummyData),
                    html: ref.html,
                    domain: domain,
                    type: type
                    //listForm: ref.listForm
                }
                $restful.post("/publish/page", postData).then(function (res) {
                    updatePublishInfo(res.data);
                    PN_PAGE.loading.hide(); 
                    $scope.isPublishing = 0;
                    if (res.data.fullUrl && res.data.fullUrl.length > 0) {
                        var uriPublish = res.data.fullUrl.indexOf('http') == 0 ? res.data.fullUrl : res.data.fullUrl.indexOf(DomainDemo) > 0 ? 'https://' + res.data.fullUrl : 'http://' + res.data.fullUrl;
                        $scope.createThumbnail(uriPublish);
                    }
                    showSucessPublishPage(res.data);  
                });
            } else {
                PN_PAGE.loading.hide();
                $scope.isPublishing = 0;
                PN_PAGE.showMessage("Không có dữ liệu để xuất bản trang!", 'error');
            }
        });
    }

    function updatePublishInfo(info) {
        $scope.domain = info.fullUrl;
        $scope.publishLink = info.fullUrl;
        $scope.urlCode = info.pathUrl;
        $scope.publishType = info.type;
        $scope.publishIntegrationId = info.publishIntegrationId;
        dummyData.domain = info.fullUrl;
    }

    //domain,urlCode, publishType, publishIntegrationId
    function showSucessPublishPage(data) {
        popupService.show('publishPage.html', { data: data }, ['$scope', '$filter', '$mdDialog', function ($scope, $filter, $mdDialog) {

            var uriPublish = data.fullUrl.indexOf('http') == 0 ? new URL(data.fullUrl) : new URL('http://' + data.fullUrl);
            //var path_url =  uriPublish.pathname || '';
            data.domain = uriPublish.hostname;

            $scope.publishType = data.type;
            $scope.tabIndex = 0;//publishType == 2 ? 2 : 0;
            $scope.isSystemDomain = PN_PAGE.isSystemDomain(data.domain);
            $scope.domainPreview = checkdomainPreview(data.fullUrl),
                $scope.data = {
                domainid: (data.type == 0 || data.type == 1 )? data.domain:'',
                domainNew: '',
                urlcode: data.pathUrl //path_url.replace('/', '').replace('/', '')
            }

            if (PN_PAGE.isSystemDomain(data.domain)==true) {
                //$scope.data.domainid = null;
                $scope.data.domainNew = '';
            }
            $scope.domains = [];
            $scope.canPublish = true;
            $scope.opt = {
                add: false
            };

            $scope.initDomains = function () {
                $restful.get("/domain").then(function (res) {
                    var d = $filter('filter')(res.data, function (d) { return d.isChecked == true});
                    $scope.domains = d;
                    //if ($scope.domains.length == 0) $scope.opt.add = true;
                    var c = $filter('filter')(d, function (e) { return e.id == DomainDemo });
                    if (c.length==0) {
                        $scope.domains.push({ id: DomainDemo, dns: DomainDemo });
                    }
                });
            }

            $scope.changeUrl = function () {
                var data = $scope.domainPreview;
                popupService.show('changePublishUrl.html', {data:data}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };

                    $scope.hide = function (res) {
                        $mdDialog.hide(res);
                    };

                    var publish_url = new URL(data);

                    $scope.baseUrl = publish_url.origin;
                    $scope.url = publish_url.pathname.replace('/','');
                    $scope.submit = function () {
                        if ($scope.myForm.$valid == false) return;
                        PN_PAGE.loading.show();
                        PN_PAGE.btnLoading.show();
                        var data = { id: $stateParams.id, urlCode: $scope.url };               
                        $restful.post("/publish/change-url", data).then(function (res) {
                            PN_PAGE.loading.hide();
                            $scope.hide(res.data);
                        });
                    };
                }], function (res) {
                    updatePublishInfo(res);
                    showSucessPublishPage(res);
                });
            }

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function (r,type) {
                $mdDialog.hide({data:r, type:type});
            };

            $scope.choose = function () {
                if ($scope.data.domainid.length <= 0) {
                    PN_PAGE.showMessage("Vui lòng chọn tên miền", "error");
                    return;
                }
                if (PN_PAGE.isSystemDomain($scope.data.domainid) == true && $scope.data.urlcode == '') {
                    PN_PAGE.showMessage("Vui lòng nhập đường dẫn", "error");
                    return;
                }
                $scope.hide($scope.data,'dns');
            };

            $scope.add = function () {
                if ($scope.data.domainNew.length <= 0) return;
                $scope.hide($scope.data,1);
            };

            $scope.utm = {
                link: '',
                source: '',
                medium: '',
                campain: '',
                term: '',
                content:''
            }

            $scope.createUtm = function () {
                var param = '?';
                var utm = $scope.utm;
                var protocol = 'http://';
                if ($scope.isSystemDomain == true) protocol = 'https://';
                if (utm.source.length > 0) param += '&utm_source=' + utm.source;
                if (utm.medium.length > 0) param += '&utm_medium=' + utm.medium;
                if (utm.campain.length > 0) param += '&utm_campain=' + utm.campain;
                if (utm.term.length > 0) param += '&utm_term=' + utm.term;
                if (utm.content.length > 0) param += '&utm_content=' + utm.content;
                if (param.length > 1) param = param.replace('?&', '?');
                else param = '';
                utm.link = protocol + data.domain + param;
            }

            $scope.showPublishWP = function () {
                var data = $stateParams.id;
                popupService.show('publishPageWP.html', { data: data }, ['$scope', '$filter', '$mdDialog', function ($scope, $filter, $mdDialog) {
                    $scope.wp = {
                    };
                    $scope.fullpath = "";
                    $scope.init = function () {
                        $restful.get("/externalpublish", { pageid: $stateParams.id }).then(function (res) {
                            $scope.wp = res.data;
                            $scope.fullpath = $scope.wp.domain + $scope.wp.pathUrl;
                        });
                    }
                    $scope.init();

                    $scope.submit = function () {
                        PN_PAGE.loading.show();
                        PN_PAGE.btnLoading.show();
                        var postData = {
                            token: $scope.wp.token,
                            domain: $scope.wp.domain,
                            pathUrl: $scope.wp.pathUrl,
                            pageId: $stateParams.id,
                            html: ''
                        }
                        var newPath = $scope.wp.domain + $scope.wp.pathUrl;
                        if ($scope.wp.id && $scope.wp.id > 0 && newPath != $scope.fullpath) {
                            $restful.post("/publish/wp-checkurl", postData).then(function (res) {
                                if (res.data == true) {
                                    swal({
                                        title: "Xác nhận",
                                        type: "warning",
                                        text: "Trang WP với url này đã tồn tại, bạn có muốn cập nhật nội dung bằng landing page này?",
                                        showCancelButton: !0,
                                        confirmButtonColor: "#d9534f",
                                        confirmButtonText: "Đồng ý",
                                        cancelButtonText: "Không",
                                        closeOnConfirm: !0
                                    }, function (ok) {
                                        if (ok) {
                                            getHtmlLandingpage(function (cando, ref) {
                                                if (ref) {
                                                    postData.html = ref.html;
                                                    $restful.post("/publish/wp", postData).then(function (res) {
                                                        PN_PAGE.loading.hide();
                                                        PN_PAGE.btnLoading.hide();
                                                        PN_PAGE.showMessage("Đã xuất bản thành công!");
                                                        $scope.hide(res.data);
                                                    });
                                                }
                                            });
                                        }
                                    });
                                } else {
                                    getHtmlLandingpage(function (cando, ref) {
                                        if (ref) {
                                            postData.html = ref.html;
                                            $restful.post("/publish/wp", postData).then(function (res) {
                                                PN_PAGE.loading.hide();
                                                PN_PAGE.btnLoading.hide();
                                                PN_PAGE.showMessage("Đã xuất bản thành công!");
                                                $scope.hide(res.data);
                                            });
                                        }
                                    });
                                }
                            });
                        } else {
                            getHtmlLandingpage(function (cando, ref) {
                                if (ref) {
                                    postData.html = ref.html;
                                    $restful.post("/publish/wp", postData).then(function (res) {
                                        PN_PAGE.loading.hide();
                                        PN_PAGE.btnLoading.hide();
                                        PN_PAGE.showMessage("Đã xuất bản thành công!");
                                        $scope.hide(res.data);
                                    });
                                }
                            });
                        }
                    }
                    $scope.cancel = function () {
                        $mdDialog.cancel();
                    };

                    $scope.hide = function (r) {
                        $mdDialog.hide(r);
                    };

                }], function (res) {
                    showSucessPublishPage(res,2);
                });
            }

            $scope.deleteWP = function () {
                swal({
                    title: "Xác nhận xóa",
                    type: "warning",
                    text: "Hủy tích hợp & xóa trang trên Wordpress?",
                    showCancelButton: !0,
                    confirmButtonColor: "#d9534f",
                    confirmButtonText: "Xóa",
                    cancelButtonText: "Không",
                    closeOnConfirm: !0
                }, function (ok) {
                    if (ok) {
                        PN_PAGE.loading.show();
                        $restful.delete("/externalpublish", {
                            id: $stateParams.id
                        }).then(function (res) {
                            PN_PAGE.loading.hide();
                            swal("Đã xóa!", "", "success");
                            $scope.cancel();
                        });
                    }
                });
            }
            
            $scope.data3rd = {
                pageId: $stateParams.id,
                integrationId:  data.publishIntegrationId,
                vendor: null,
                pathUrl: data.pathUrl,
                html: '',
            }
            $scope.pageServices = [{ i: 10, n: 'Wordpress' }, { i: 11, n: 'Shopify' }];

            $scope.init3rd = function () {
                $restful.get("/integration/pages-3rd").then(function (res) {
                    $scope.pages3rd = res.data;
                });
            }
            $scope.init3rd();

            $scope.publish3rd = function () {
                PN_PAGE.loading.show();
                PN_PAGE.btnLoading.show();
                getHtmlLandingpage(function (cando, ref) {
                    if (ref) {
                        $scope.data3rd.html = ref.html;
                        var c = $filter('filter')($scope.pages3rd, function (e) { return e.id == $scope.data3rd.integrationId });
                        if (c.length > 0) {
                            $scope.data3rd.vendor = c[0].siteId;
                        }
                        $restful.post("/publish/vendor-3rd", $scope.data3rd).then(function (res) {
                            PN_PAGE.loading.hide();
                            PN_PAGE.btnLoading.hide();
                            $scope.hide(res.data, '3rd');
                        });
                    }
                });
            }
        }], function (r) {
            if (r.type == 'dns') {
                var res = r.data,
                    linkPublish = res.domainid;
                if (res.urlcode.length > 0) {
                    linkPublish = linkPublish + '/' + res.urlcode;
                    $scope.urlCode = res.urlcode;
                } else if(PN_PAGE.isSystemDomain(res.domainid) == true)
                {
                    PN_PAGE.showMessage("Vui lòng nhập đường dẫn","error");
                    return;
                }
                publishPage(linkPublish,1);
            } else if (r.type == '3rd') {
                updatePublishInfo(r.data);
                showSucessPublishPage(r.data);
            }
        });
    }

    $scope.isRequestSaveAuto = "false";

    $scope.saveLandingpage = function () {
        //dummyData.arrRule = $scope.saveRuleGuide();
        PN_PAGE.showElementEditorText();
        $scope.isRequestSaveAuto = "false";
        saveLandingPageElement(function () {
            if ($stateParams.type == 't') {
                getHtmlLandingpage(function (a, charRef) {
                    if (charRef) {
                        $restful.post("/theme", {
                            id: $stateParams.id,
                            html: charRef.html
                        }).then(function (data) {
                            if ($scope.isUpThumbnail == false) {
                                $scope.createTemplateThumbnail(data.data);
                            }
                        });
                    } 
                });               
            }
        });
    };

    function saveLandingPageElement(callback) {
        PN_PAGE.loading.show();
        var result = JSON.stringify(dummyData);
        if (JSON.stringify(apiDefaultCheck) == JSON.stringify(dummyData.apiElement)) {
            $scope.isRequestSaveAuto = "true";
            PN_PAGE.showMessage("Landing Page ch\u01b0a \u0111\u01b0\u1ee3c ch\u1ec9nh s\u1eeda!", 'alert');
            PN_PAGE.loading.hide();
        } else {
            $scope.isRequestSaveAuto = "loading";
            var otp = "source";
            if ($stateParams.type == 't') otp = "template";
            $restful.put("/landingpage", {
                id: $stateParams.id,
                source: result,
                opt: otp
            }).then(function (method) {
                $scope.index++;
                $scope.isRequestSaveAuto = "true";
                pageSave = true;
                PN_PAGE.loading.hide();
                setTimeout(function () {
                    $scope.isRequestSaveAuto = "false";
                }, 5e3);
                if (callback) callback();
            });
        }
    };

    $scope.idPreview = $stateParams.id;
    $scope.editType = $stateParams.type;
    $scope.previewPage = function () {
        //$scope.saveLandingPageElement(function () {
            if ($stateParams.type == 't') {
                var url = $state.href('preview-template', {id: $stateParams.id,type: 't'});
                window.open(url, '_blank');
            } else {
                var url = $state.href('preview', { id: $stateParams.id });
                window.open(url, "_blank");
            }
        //});
    };

    $scope.showAlertEditMobile = function () {
        popupService.show('alertMobileView.html', {}, ['$scope', '$mdDialog', function ($scope, $mdDialog) {
            
            $scope.continuePublish = function () {
                $scope.hide(1);
            };
            $scope.showEditMobile = function () {
                $scope.hide(2);
            };

            $scope.cancel = function () {
                $mdDialog.cancel();
            };

            $scope.hide = function (c) {
                $mdDialog.hide(c);
            };

        }], function (res) {
            if (res == 1) {
                publishPage($scope.publishLink);
            } else if (res == 2) {
                $scope.showEditMobile();
            }
        });
    }
    //-------------end menu page----------------------

    angular.element(document).on('click', function (ev) {
        if ($(ev.target).hasClass('submenu-no-hide') || $(ev.target).hasClass('input-number')) {
            ev.stopPropagation();
            return
        }

        if ($(ev.target).hasClass('widget-title')) {
            ev.stopPropagation();
            var content = $(ev.target).parent().find('.group-content-setting');
            var icon = $(ev.target).find('.pull-right i');
            if (content.is(":visible")) {
                content.hide();
                icon.removeClass('ion-arrow-down-b').addClass('ion-arrow-right-b');
            } else {
                content.show();
                icon.removeClass('ion-arrow-right-b').addClass('ion-arrow-down-b');
            }
        }

        $('.dropdown .submenu').hide();
        $('.dropdown-input .submenu').hide();
        if ($(ev.target).hasClass('modal-backdrop')) {
            $('.modal').modal('hide');
        }
        $('.click-right').hide();
        var target = $(ev.target);
        var clt = $(ev.target).parents('.color-table').length;
        if (target && target.attr('class') && (target.attr('class').search('color') != -1 || clt==1)) {
        } else {
            $('.colorpicker.dropdown-menu.colorpicker-visible').removeClass('colorpicker-visible').addClass('colorpicker-hidden');
            //$(".custom-color-picker").hide();
            $(".punnel-picker").hide();
        }

        if ($(ev.target.offsetParent).hasClass('dropdown')) {
            ev.stopPropagation();
            var saveRange = new saveAndRestoreRange();
            saveRange.restorRange();
            if ($(ev.target.offsetParent).find('.submenu').eq(0).css('display') != 'none') {
                $('.list-menu .dropdown .submenu').hide();
                $(this).find('.submenu').eq(0).hide();
            } else {
                $('.list-menu .dropdown .submenu').hide();
                $(ev.target.offsetParent).find('.submenu').eq(0).show();
            }
            var layer = new TreeWidget();
            if ($(ev.target.offsetParent).hasClass('show-layer')) {
                layer.layer();
                PN_PAGE.showElementEditorText();
            }
            if ($(ev.target.offsetParent).hasClass('hidden-layer')) {
                layer.layerHide();
                PN_PAGE.showElementEditorText();
            }
        }
        else if (!$(ev.target).hasClass('setting-opt')) {
            var container = $(".aside-setting");
            if (container.hasClass('anchor-setting')) return;
            // if the target of the click isn't the container nor a descendant of the container
            if (!container.is(ev.target) && container.has(ev.target).length === 0 && ev.target.id != 'setting-anchor-left') {
                $(".aside-setting").hide();
                $(".aside-setting-option").show();
            }
        }

        
    });

    $scope.showOption = function () {
        $(".aside-setting").show();
        $(".aside-setting-option").hide();
    };
}]);
