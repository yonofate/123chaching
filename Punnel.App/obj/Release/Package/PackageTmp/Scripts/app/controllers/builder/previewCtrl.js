﻿angular.module("punnelApp").controller("previewCtrl", ["$state", "$scope", "$stateParams", "$auth", "$restful", "$window", "$ladiService", function ($state, $scope, $stateParams, $auth, $restful, $window, $ladiService) {
    PN_PAGE.pageLoading.show();
    PN_PAGE.dbLoading.hide();
    $restful.get("/landingpage", {
        id: $stateParams.id,
        time: $stateParams.time
    }).then(function (result) {
        PN_PAGE.PUNNEL_EDIT = $("#punnel-editor");
        PN_PAGE.PUNNEL_EDIT.html("");
        var svc = new GetDataService;
        svc.xulySource(result.data.source, function () {
            PN_PAGE.pageLoading.hide();
            $("#preview_punnel iframe").attr("src", 'javascript:window["contents"]');
            PN_PAGE.resetElementNotGroup();
            var a = $('.widget-element[pn-type="slider"]');
            if (a && a.length > 0) {
                a.each(function () {
                    $(this).find('.widget-element[pn-type="item_slider"]').eq(0).css({
                        visibility: "visible"
                    });
                    $(this).find('.widget-element[pn-type="item_slider"]').eq(0).find(".widget-element").css({
                        visibility: "visible"
                    });
                });
            }
            $scope.getHtmlLandingpage(function (a, body) {
                var iframe = document.createElement("iframe");
                var element = document.getElementById("preview_container");
                var input = body.html;
                element.appendChild(iframe);
                iframe.contentWindow.document.open("text/htmlreplace");
                iframe.contentWindow.document.write(input);
                iframe.style = "width: 100%; min-height:100vh;border:0;min-width:385px;";
                iframe.contentWindow.document.close();
                PN_PAGE.PUNNEL_EDIT.html("");
            });
        });
    });
    $scope.getHtmlLandingpage = function (body) {
        if (1 == PN_PAGE.sortMobilePublish) {
            $ladiService.sortElementMobile();
            $ladiService.sortElementDesktop();
        }
        var css_default = PN_PAGE.cssDefault;
        var font = $scope.getfont(dummyData.apiElement);
        var css_mobile = new RenCssMobile;
        var test = "@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (orientation: portrait) {}";
        test = test + "@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {}";
        test = test + "@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {}";
        test = test + "@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {}";
        test = test + "@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation : portrait) {}";
        test = test + "@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation : landscape) {}";
        test = test + "@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation : portrait) {}";
        test = test + "@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation : landscape) {}";
        var base = "/*default*/" + css_default + "/*font*/" + font + "/*custom*/" + css_mobile.testCss(dummyData.apiElement) + "/*view*/" + test;
        var block = $scope.saveHtmlPage(dummyData.apiElement, css_default, font, css_mobile.testCss(dummyData.apiElement));
        var html = block.html;
        var mode = block.list;
        body(null, {
            html: html,
            css: base,
            listForm: mode
        });
    };
    $scope.getfont = function (items) {
        var font_faces = "";
        var font_uses = [];
        if (items && items.length > 0) {
            var i = 0;
            for (; i < items.length; i++) {
                if (items[i].media.classFont && items[i].media.classFont.length > 0 && -1 == $.inArray(items[i].media.classFont, font_uses)) {
                    font_uses.push(items[i].media.classFont);
                }
            }
        }
        if (font_uses && font_uses.length > 0) {
            var i = 0;
            for (; i < font_uses.length; i++) {
                font_faces = font_faces + font_face[font_uses[i]];
            }
        }
        return font_faces;
    };
    $scope.saveHtmlPage = function (items, data, fn, macro_context) {
        var list = [];
        var pix_color = "";
        var i = items.length - 1;
        for (; i >= 0; i--) {
            if ("GROUP_TMP" == items[i].id || "group" == items[i].type_plugin) {
                items.splice(i, 1);
            }
            var infoText = "";
            if (infoText && infoText.length > 0) {
                var data = {
                    id: items[i].id.toLowerCase(),
                    html: infoText
                };
                list.push(data);
            }
        }
        PN_PAGE.PUNNEL_EDIT.html("");
        var that = new setHtmlLadi;
        var m = 0;
        var _jsons = 0;
        var _content = "";
        var controllerName = "";
        i = 0;
        for (; i < items.length; i++) {
            switch (that.getTemplate(items[i], items[i].type_plugin, function () {
            }), "googlemap" == items[i].type_plugin && (_jsons = 1, _content = items[i].keyapi), items[i].custom_css && (pix_color = pix_color + items[i].custom_css), items[i].type_plugin) {
                case "facebook_comment":
                    m++;
                    if (items[i].value_facebook_comment && items[i].value_facebook_comment.api_key && items[i].value_facebook_comment.api_key.length > 0) {
                        controllerName = '<meta property="fb:app_id" content="' + items[i].value_facebook_comment.api_key + '" />';
                    }
                    PN_PAGE.getElement("#" + items[i].id).html(valueTemplate.facebook_comment_finish);
                    PN_PAGE.getElement("#" + items[i].id + " .fb-comments").eq(0).attr("data-href", items[i].value_facebook_comment.url).attr("data-numposts", items[i].value_facebook_comment.number_post);
                    break;
                case "facebook_messages":
                    m++;
                    PN_PAGE.getElement("#" + items[i].id).html(valueTemplate.facebook_messages_finish);
                    PN_PAGE.getElement("#" + items[i].id + " .widget-content").eq(0).attr("data-href", items[i].value_facebook_messages.url).attr("data-width", parseFloat(items[i].media[deviceEdit].width)).attr("data-height", parseFloat(items[i].media[deviceEdit].height));
                    break;
                case "image":
                    PN_PAGE.getElement("#" + items[i].id + " .widget-content:eq(0) img").eq(0).remove();
                    PN_PAGE.getElement("#" + items[i].id + " .widget-content").eq(0).prepend(valueTemplate.image_publish);
                    PN_PAGE.getElement("#" + items[i].id + " .widget-content:eq(0) .pn-show-image").eq(0).attr("alt", items[i].link);
                    if (items[i].parent == undefined || items[i].parent.indexOf('POPUP') < 0) {
                        var img_resize = new RenCssMobile().zenImagePublish(items[i].link, items[i], "desktop");
                        PN_PAGE.getElement("#" + items[i].id + " .widget-content:eq(0) .pn-show-image").eq(0).attr("data-bg", "url('" + img_resize + "')");
                        PN_PAGE.getElement("#" + items[i].id + " .widget-content:eq(0) .pn-show-image").eq(0).addClass('pn-lazy-load');
                    }
                    break;
                case "box":
                    if ((items[i].parent == undefined || items[i].parent.indexOf('POPUP') < 0) && items[i].bg_type && items[i].media.desktop["background-image"] && items[i].media.desktop["background-image"].length > 0) {
                        PN_PAGE.getElement("#" + items[i].id + " .widget-content:eq(0)").eq(0).addClass('pn-lazy-load');
                        var img_resize_dk1 = new RenCssMobile().zenImagePublish(items[i].media.desktop["background-image"], items[i], "desktop");
                        PN_PAGE.getElement("#" + items[i].id + " .widget-content:eq(0)").eq(0).attr("data-bg", "url('" + img_resize_dk1 + "')");
                    }
                    break;
                case "widget_section":
                    if (items[i].lang == "SECTION") {
                        if ((items[i].popup == undefined || items[i].popup == false) && items[i].bg_type && items[i].media.desktop["background-image"] && items[i].media.desktop["background-image"].length > 0) {
                            $("#" + items[i].id).addClass('pn-lazy-load');
                            var img_resize_dk = new RenCssMobile().zenImagePublish(items[i].media.desktop["background-image"], items[i], "desktop");
                            $("#" + items[i].id).attr("data-bg", "url('" + img_resize_dk + "')");
                        }

                        if (items[i].media.desktop["background-video"] && items[i].media.desktop["background-video"].length > 0 && items[i].media.desktop["background-video"].indexOf('https://www.youtube.com/embed/') == 0) {
                            var o = $("#" + items[i].id).html();
                            var code = items[i].media.desktop["background-video"].replace("https://www.youtube.com/embed/", "");
                            var vn = '<div class="video-foreground"> <iframe src="' + items[i].media.desktop["background-video"] + '?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=' + code + '" frameborder="0" allowfullscreen></iframe></div>';
                            $("#" + items[i].id).html(vn + o);
                            $("#" + items[i].id).css({
                                "overflow": "hidden"
                            });
                        }
                    }
                    break;
            }
        }
        var desc = dummyData.desc;
        var keyword = dummyData.keyword;
        var topicTitle = dummyData.title;
        var gameId = $stateParams.id;
        var head = "";
        var lineCount = dummyData.idpixel;
        var actionName = dummyData.idanalytics;
        var expRecords = dummyData.idgoogletag;
        if (head = head + '<!DOCTYPE html><html><head lang="en">', head = head + '<meta charset="UTF-8">', head = head + ('<title class="title-site" pn-id="' + gameId + '">' + topicTitle + "</title>"), head = head + '<meta http-equiv="Cache-control" content="no-cache">', head = head + '<meta http-equiv="Expires" content="-1">', head = head + ('<meta name="description" content="' + desc + '">'), head = head +
            ('<meta name="keywords" content="' + keyword + '">'), 
            head = head + '<meta name= "viewport" content="width=device-width, initial-scale=1.0">',
            head = head + "<script>function pnViewport(){",
            head = head + "var width = (window.outerWidth > 0) ? window.outerWidth : screen.width;",
            head = head + 'var content = "user-scalable=no"; ',
            head = head + 'if (width < 768) { content += ", width=' + dummyData.viewport.size_mobile + '"; } else { if (width < ' + dummyData.viewport.size_desktop + ') { content += ", width=' + dummyData.viewport.size_desktop + '"; } else { content += ", width=device-width"; } } ',
            head = head + "var meta=document.querySelector('meta[name =\"viewport\"]');",
            head = head + "if (meta == undefined) {meta = document.createElement('meta'); meta.name = 'viewport'; document.head.prepend(meta);}",
            head = head + "meta.content=content; ",
            head = head + "}; pnViewport();</script>",
            head = head + ('<meta property="og:title" content="' + topicTitle + '" />'), head = head + '<meta property="og:type" content="website" />', head = head + ('<meta property="og:url" content="' + PN_PAGE.GetProtocal($scope.domain) + $scope.domain + '" />'), head = head + ('<meta property="og:image" content="' + apiStaticDefault + dummyData.imagePage + '">'), head = head +
        ('<meta property="og:description" content="' + desc + '" />'), head = head + '<meta name="format-detection" content="telephone=no" />', head = head + '<script>function reveal(){for(var a=0;a<view_elements.length;a++){var b=0,c=view_elements[a];do isNaN(c.offsetTop)||(b+=c.offsetTop);while(c=c.offsetParent);var d=window.pageYOffset,e=window.innerHeight,c=view_elements[a];window.pageXOffset,window.innerWidth;b>=d&&d+e>=b&&(view_elements[a].classList.remove("hide-background-image"),view_elements.splice(a,1),a--)}}function qazy_list_maker(){for(var a=document.getElementsByClassName("hide-background-image"),b=0;b<a.length;b++)view_elements.push(a[b])}var view_elements=[];window.addEventListener("resize",reveal,!1),window.addEventListener("scroll",reveal,!1);var intervalObject=setInterval(function(){qazy_list_maker()},50);window.addEventListener("load",function(){clearInterval(intervalObject),qazy_list_maker(),reveal();},!1);\x3c/script>',
        dummyData.imageFavicon && dummyData.imageFavicon.length > 0 && (head = head + ('<link rel="shortcut icon" type="image/png" href="' + dummyData.imageFavicon + '"/>')), head = head + ('<style id="punnel-page-css">' + data + "</style>"), head = head + ('<style id="pn-css-font">' + fn + "</style>"), head = head + ('<style id="punnel-master-css">' + macro_context + "</style>"), controllerName && controllerName.length > 0 && (head = head + controllerName),
        expRecords && expRecords.length > 0) {
            var controllerName = "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':";
            controllerName = controllerName + "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],";
            controllerName = controllerName + "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=";
            controllerName = controllerName + "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);";
            controllerName = controllerName + ("})(window,document,'script','dataLayer','" + expRecords + "');\x3c/script>");
            head = head + controllerName;
        }
        if (lineCount && lineCount.length > 0) {
            var file = "<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?";
            file = file + "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n; ";
            file = file + "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;";
            file = file + "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, ";
            file = file + "document,'script','https://connect.facebook.net/en_US/fbevents.js'); ";
            file = file + "fbq('init', '" + lineCount + "'); ";
            file = file + "fbq('track', 'PageView'); fbq('track', 'ViewContent');\x3c/script>";
            file = file + '<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=' + lineCount + '&ev=PageView&noscript=1" /></noscript>';
            head = head + file;
        }
        if (actionName && actionName.length > 0) {
            var script = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){";
            script = script + "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),";
            script = script + "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)";
            script = script + "})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');";
            script = script + "ga('create', '" + actionName + "', 'auto');";
            script = script + "ga('send', 'pageview');\x3c/script>";
            head = head + script;
        }
        var extCss = dummyData.headCss || '';
        var extCss = extCss.toLowerCase().startsWith('<style>') ? extCss : '<style>' + extCss + '</style>';
        head = head + extCss + dummyData.head;
        var vendor_css = '<link async rel="stylesheet" id="animate" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.3.1/animate.min.css"> <link async rel="stylesheet" href="https://hstatic.punnel.com/styles/common.css"/> <link async href="https://cdnjs.cloudflare.com/ajax/libs/sweetalert/1.1.3/sweetalert.min.css" rel="stylesheet" type="text/css">';
        head = head + (vendor_css);
        head = head + "</head>";
        i = 0;
        for (; i < items.length; i++) {
            var $parentLi = PN_PAGE.getElement("#" + items[i].id);
            if (void 0 != items[i].animate && "" != items[i].animate && null != items[i].animate) {
                if ("slide_show" == $parentLi.attr("pn-type")) {
                    $parentLi.find(".item_slide li").addClass("" + items[i].animate);
                } else {
                    $parentLi.addClass("" + items[i].animate);
                }
            }
        }
        var body = "<body>";
        if (body = body + '<div  id="punnel-wraper-page" class="punnel-wraper-page">', expRecords && expRecords.length > 0) {
            var shapeHolder = "<noscript>";
            shapeHolder = shapeHolder + ('<iframe src="https://www.googletagmanager.com/ns.html?id=' + expRecords + '"height="0" width="0" style="display:none;visibility:hidden"></iframe>');
            shapeHolder = shapeHolder + "</noscript>";
            body = body + shapeHolder;
        }
        if (m > 0) {
            var E = body.search('id="fb-root"');
            if (-1 == E) {
                body = body + scriptFB;
            }
        }
        body = body + PN_PAGE.PUNNEL_EDIT.html();
        if (_content && _content.length > 0) {
            body = body + ('<script type="text/javascript" async="async" src="https://maps.google.com/maps/api/js?sensor=false&key=' + _content + '">\x3c/script>');
        } else {
            if (1 == _jsons) {
                body = body + '<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false" async="async">\x3c/script>';
            }
        }

        var ts = $.now();
        body = body + '<script async="async" type="text/javascript" src="https://hstatic.punnel.com/source/punnel.preview.js?v=' + ts + '"></script>';
        body = body + '<script async type="text/javascript" src="https://hstatic.punnel.com/source/location.min.js"></script>';
        body = body + dummyData.body;
        body = body + NaN;
        var output = $(body);
        i = 0;
        for (; i < items.length; i++) {
            var $Qv = output.find("#" + items[i].id);
            if ($Qv && $Qv.length > 0 && "customhtml" == $Qv.attr("pn-type") && items[i].valuePluginHtml && items[i].valuePluginHtml.length > 0) {
                $Qv.find(".widget-content:eq(0)").html(items[i].valuePluginHtml);
            }
        }
        if (output && output.length > 0) {
            body = "";
            i = 0;
            for (; i < output.length; i++) {
                body = body + output[i].outerHTML;
            }
        }
        return body = head + "<body>" + body.replace(/undefined/g, "") + "</body></html>", {
            html: body,
            list: list
        };
    };

    $scope.previewDesktop = function () {
        $("#preview_container").css({
            "width": "100%",
            "margin": "59px auto"
        });
    };

    $scope.previewMobile = function () {
        $("#preview_container").css({
            "width": (dummyData.viewport.size_mobile + 10) + "px",
            "margin": "59px auto"
        });
    }
}]);
