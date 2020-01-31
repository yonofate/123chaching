angular.module("punnelApp").controller("previewHistoryCtrl", ["$state", "$scope", "$stateParams", "$auth", "$restful", "$window", "$ladiService", function ($state, $scope, $stateParams, $auth, $restful, $window, $ladiService) {
    PN_PAGE.pageLoading.show();
    $restful.get("/Landingpage/RestoreHistory", {
        id : $stateParams.id,
        name : $stateParams.name,
        preview : 1
    }, function(err, result) {
        if (err) {
            PN_PAGE.showMessage("Vui l\u00f2ng t\u1ea3i l\u1ea1i trang ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
        } else {
            if (result && 200 == result.code) {
                PN_PAGE.PUNNEL_EDIT = $("#punnel-editor");
                PN_PAGE.PUNNEL_EDIT.html("");
                var dataSvc = new GetDataService;
                dataSvc.xulySource(result.data, function () {
                    PN_PAGE.pageLoading.hide();
                    $("#preview_punnel iframe").attr("src", 'javascript:window["contents"]');
                    PN_PAGE.resetElementNotGroup();
                    var a = $('.widget-element[pn-type="slider"]');
                    if (a && a.length > 0) {
                        a.each(function() {
                            $(this).find('.widget-element[pn-type="item_slider"]').eq(0).css({
                                visibility : "visible"
                            });
                            $(this).find('.widget-element[pn-type="item_slider"]').eq(0).find(".widget-element").css({
                                visibility : "visible"
                            });
                        });
                    }
                    $scope.getHtmlLandingpage(function(err, result) {
                        var iframe = document.createElement("iframe");
                        var iframeProxy = document.getElementById("preview_punnel");
                        var input = result.html;
                        iframeProxy.appendChild(iframe);
                        iframe.contentWindow.document.open("text/htmlreplace");
                        iframe.contentWindow.document.write(input);
                        iframe.style = "width: 100%; min-height:100vh;border:0;min-width:375px;";
                        iframe.contentWindow.document.close();
                        PN_PAGE.PUNNEL_EDIT.html("");
                        
                    });
                });
            } else {
                PN_PAGE.showMessage("Vui l\u00f2ng t\u1ea3i l\u1ea1i trang ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
            }
        }
    });
    $scope.getHtmlLandingpage = function(data) {
        if (1 == PN_PAGE.sortMobilePublish) {
            $ladiService.sortElementMobile();
            $ladiService.sortElementDesktop();
        }
        var cssDefault = PN_PAGE.cssDefault;
        var font = $scope.getfont(dummyData.apiElement);
        var cssMobile = new RenCssMobile;
        var content = "@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (orientation: portrait) {}";
        content = content + "@media only screen and (min-device-width: 320px) and (max-device-width: 480px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {}";
        content = content + "@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {}";
        content = content + "@media only screen and (min-device-width: 320px) and (max-device-width: 568px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: landscape) {}";
        content = content + "@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation : portrait) {}";
        content = content + "@media only screen and (min-device-width: 375px) and (max-device-width: 667px) and (orientation : landscape) {}";
        content = content + "@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation : portrait) {}";
        content = content + "@media only screen and (min-device-width: 414px) and (max-device-width: 736px) and (orientation : landscape) {}";
        var css = "/*default*/" + cssDefault + "/*font*/" + font + "/*custom*/" + cssMobile.testCss(dummyData.apiElement) + "/*view*/" + content;
        var block = $scope.saveHtmlPage(dummyData.apiElement, cssDefault, font, cssMobile.testCss(dummyData.apiElement));
        var html = block.html;
        var list = block.list;
        data(null, {
            html : html,
            css : css,
            listForm : list
        });
    };
    $scope.getfont = function(results) {
        var font = "";
        var items = [];
        if (results && results.length > 0) {
            var i = 0;
            for (; i < results.length; i++) {
                if (results[i].media.classFont && results[i].media.classFont.length > 0 && -1 == $.inArray(results[i].media.classFont, items)) {
                    items.push(results[i].media.classFont);
                }
            }
        }
        if (items && items.length > 0) {
            var i = 0;
            for (; i < items.length; i++) {
                font = font + font_face[items[i]];
            }
        }
        return font;
    };
    $scope.saveHtmlPage = function(results, data, fn, macro_context) {
        var certs = [];
        var pix_color = "";
        var i = results.length - 1;
        for (; i >= 0; i--) {
            if ("GROUP_TMP" == results[i].id || "group" == results[i].type_plugin) {
                results.splice(i, 1);
            }
            var html = "";
            if (html && html.length > 0) {
                var data = {
                    id : results[i].id.toLowerCase(),
                    html : html
                };
                certs.push(data);
            }
        }
        PN_PAGE.PUNNEL_EDIT.html("");
        var that = new setHtmlLadi;
        var m = 0;
        var _jsons = 0;
        var _content = "";
        var controllerName = "";
        i = 0;
        for (; i < results.length; i++) {
            switch(that.getTemplate(results[i], results[i].type_plugin, function() {
            }), "googlemap" == results[i].type_plugin && (_jsons = 1, _content = results[i].keyapi), results[i].custom_css && (pix_color = pix_color + results[i].custom_css), results[i].type_plugin) {
                case "facebook_comment":
                    m++;
                    if (results[i].value_facebook_comment && results[i].value_facebook_comment.api_key && results[i].value_facebook_comment.api_key.length > 0) {
                        controllerName = '<meta property="fb:app_id" content="' + results[i].value_facebook_comment.api_key + '" />';
                    }
                    PN_PAGE.getElement("#" + results[i].id).html(valueTemplate.facebook_comment_finish);
                    PN_PAGE.getElement("#" + results[i].id + " .fb-comments").eq(0).attr("data-href", results[i].value_facebook_comment.url).attr("data-numposts", results[i].value_facebook_comment.number_post);
                    break;
                case "facebook_messages":
                    m++;
                    PN_PAGE.getElement("#" + results[i].id).html(valueTemplate.facebook_messages_finish);
                    PN_PAGE.getElement("#" + results[i].id + " .widget-content").eq(0).attr("data-href", results[i].value_facebook_messages.url).attr("data-width", parseFloat(results[i].media[deviceEdit].width)).attr("data-height", parseFloat(results[i].media[deviceEdit].height));
                    break;
                case "image":
                    PN_PAGE.getElement("#" + results[i].id + " .widget-content:eq(0) img").eq(0).remove();
                    PN_PAGE.getElement("#" + results[i].id + " .widget-content").eq(0).prepend(valueTemplate.image_publish);
                    PN_PAGE.getElement("#" + results[i].id + " .widget-content:eq(0) .pn-show-image").eq(0).attr("alt", results[i].link);
            }
        }
        var desc = dummyData.desc;
        var keyword = dummyData.keyword;
        var topicTitle = dummyData.title;
        var ld_id = $stateParams.id;
        var html = "";
        var idpixel = dummyData.idpixel;
        var idanalytics = dummyData.idanalytics;
        var idgoogletag = dummyData.idgoogletag;
        if (html = html + '<!DOCTYPE html><html><head lang="en">', html = html + '<meta charset="UTF-8">', html = html + ('<title class="title-site" pn-id="' + ld_id + '">' + topicTitle + "</title>"), html = html + '<meta http-equiv="Cache-control" content="no-cache">', html = html + '<meta http-equiv="Expires" content="-1">', html = html + ('<meta name="description" content="' + desc + '">'), html = html + 
        ('<meta name="keywords" content="' + keyword + '">'), html = html + '<meta name="viewport" id="pn-viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0">', html = html + "<script>function pnViewport(){", html = html + "var width = (window.outerWidth > 0) ? window.outerWidth : screen.width;if(width > 3000){width = width / 10;}", html = html + 'var content = "width=device-width, initial-scale=1.0, maximum-scale=1.0,minimum-scale=1.0";', 
        html = html + 'var zoom = 1;if(width < 768){zoom = width / 375;content = "width=375, initial-scale="+zoom+", maximum-scale="+zoom+",minimum-scale="+zoom;}else{if(width < 960){zoom = width / 960;content = "width=960, initial-scale="+zoom+", maximum-scale="+zoom+",minimum-scale="+zoom;}}', html = html + 'var meta=document.getElementsByTagName("meta");', html = html + "for (var i=0; i<meta.length; i++) {", html = html + 'if (meta[i].name.toLowerCase()=="viewport") {', 
        html = html + "meta[i].content=content; ", html = html + "}}};pnViewport();\x3c/script>", html = html + ('<meta property="og:title" content="' + topicTitle + '" />'), html = html + '<meta property="og:type" content="website" />', html = html + ('<meta property="og:url" content="http://' + $scope.domain + '" />'), html = html + ('<meta property="og:image" content="' + dummyData.imagePage + '">'), html = html + 
        ('<meta property="og:description" content="' + desc + '" />'), html = html + '<meta name="format-detection" content="telephone=no" />', html = html + '<script>function reveal(){for(var a=0;a<view_elements.length;a++){var b=0,c=view_elements[a];do isNaN(c.offsetTop)||(b+=c.offsetTop);while(c=c.offsetParent);var d=window.pageYOffset,e=window.innerHeight,c=view_elements[a];window.pageXOffset,window.innerWidth;b>=d&&d+e>=b&&(view_elements[a].classList.remove("hide-background-image"),view_elements.splice(a,1),a--)}}function qazy_list_maker(){for(var a=document.getElementsByClassName("hide-background-image"),b=0;b<a.length;b++)view_elements.push(a[b])}var view_elements=[];window.addEventListener("resize",reveal,!1),window.addEventListener("scroll",reveal,!1);var intervalObject=setInterval(function(){qazy_list_maker()},50);window.addEventListener("load",function(){clearInterval(intervalObject),qazy_list_maker(),reveal();},!1);\x3c/script>', 
        dummyData.imageFavicon && dummyData.imageFavicon.length > 0 && (html = html + ('<link rel="shortcut icon" type="image/png" href="' + dummyData.imageFavicon + '"/>')), html = html + ('<style id="punnel-page-css">' + data + "</style>"), html = html + ('<style id="pn-css-font">' + fn + "</style>"), html = html + ('<style id="punnel-master-css">' + macro_context + "</style>"), controllerName && controllerName.length > 0 && (html = html + controllerName), 
        idgoogletag && idgoogletag.length > 0) {
            var script_google_tags = "<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':";
            script_google_tags = script_google_tags + "new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],";
            script_google_tags = script_google_tags + "j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=";
            script_google_tags = script_google_tags + "'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);";
            script_google_tags = script_google_tags + ("})(window,document,'script','dataLayer','" + idgoogletag + "');\x3c/script>");
            html = html + script_google_tags;
        }
        if (idpixel && idpixel.length > 0) {
            var script_pixel = "<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?";
            script_pixel = script_pixel + "n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n; ";
            script_pixel = script_pixel + "n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;";
            script_pixel = script_pixel + "t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, ";
            script_pixel = script_pixel + "document,'script','https://connect.facebook.net/en_US/fbevents.js'); ";
            script_pixel = script_pixel + "fbq('init', '" + idpixel + "'); ";
            script_pixel = script_pixel + "fbq('track', 'PageView'); fbq('track', 'ViewContent');\x3c/script>";
            script_pixel = script_pixel + '<noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=' + idpixel + '&ev=PageView&noscript=1" /></noscript>';
            html = html + script_pixel;
        }
        if (idanalytics && idanalytics.length > 0) {
            var script_analytic = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){";
            script_analytic = script_analytic + "(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),";
            script_analytic = script_analytic + "m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)";
            script_analytic = script_analytic + "})(window,document,'script','https://www.google-analytics.com/analytics.js','ga');";
            script_analytic = script_analytic + "ga('create', '" + idanalytics + "', 'auto');";
            script_analytic = script_analytic + "ga('send', 'pageview');\x3c/script>";
            html = html + script_analytic;
        }
        html = html + dummyData.head;
        html = html + "</head>";
        i = 0;
        for (; i < results.length; i++) {
            var $parentLi = PN_PAGE.getElement("#" + results[i].id);
            if (void 0 != results[i].animate && "" != results[i].animate && null != results[i].animate) {
                if ("slide_show" == $parentLi.attr("pn-type")) {
                    $parentLi.find(".item_slide li").addClass("" + results[i].animate);
                } else {
                    $parentLi.addClass("" + results[i].animate);
                }
            }
        }
        var html = "<body>";
        if (html = html + '<div class="punnel-wraper-page">', idgoogletag && idgoogletag.length > 0) {
            var _noscript = "<noscript>";
            _noscript = _noscript + ('<iframe src="https://www.googletagmanager.com/ns.html?id=' + idgoogletag + '"height="0" width="0" style="display:none;visibility:hidden"></iframe>');
            _noscript = _noscript + "</noscript>";
            html = html + _noscript;
        }
        if (m > 0) {
            var fb_root = html.search('id="fb-root"');
            if (-1 == fb_root) {
                html = html + scriptFB;
            }
        }
        html = html + PN_PAGE.PUNNEL_EDIT.html();
        html = html + '<script type="text/javascript" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous" src="https://code.jquery.com/jquery-3.2.1.min.js">\x3c/script>';
        if (_content && _content.length > 0) {
            html = html + ('<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false&key=' + _content + '">\x3c/script>');
        } else {
            if (1 == _jsons) {
                html = html + '<script type="text/javascript" src="https://maps.google.com/maps/api/js?sensor=false">\x3c/script>';
            }
        }
        html = html + '<link rel="stylesheet" id="animate" href="https://hstatic.punnel.com/source/animate.min.css">';
        html = html + '<script type="text/javascript" src="https://hstatic.punnel.com/source/landingpage.1-0-1.js">\x3c/script>';
        html = html + dummyData.body;
        html = html + NaN;
        var output = $(html);
        i = 0;
        for (; i < results.length; i++) {
            var custom_ext = output.find("#" + results[i].id);
            if (custom_ext && custom_ext.length > 0 && "customhtml" == custom_ext.attr("pn-type") && results[i].valuePluginHtml && results[i].valuePluginHtml.length > 0) {
                custom_ext.find(".widget-content:eq(0)").html(results[i].valuePluginHtml);
            }
        }
        if (output && output.length > 0) {
            html = "";
            i = 0;
            for (; i < output.length; i++) {
                html = html + output[i].outerHTML;
            }
        }
        return html = html + "<body>" + html.replace(/undefined/g, "") + "</body></html>", {
            html : html,
            list : certs
        };
    };
}]);
