angular.module("punnelApp").controller("customBackgroundCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "popupService", function ($rootScope, $state, $scope, $translate, $stateParams, popupService) {
    $translate.use(localStorage.getItem("lang"));
    $scope.idTMP = "";
    $scope.mobile = "false";
    $scope.device = "";
    $scope.isSection = false;
    $scope.noGradient = false;
    var f = "https://youtu.be/",
        g = "https://www.youtube.com/watch",
        h = "https://www.youtube.com/embed/";

    $rootScope.$watch(function () {
        if (deviceEdit != $scope.device && ($scope.device = deviceEdit, $scope.idTMP = "", "mobile" == deviceEdit ? $scope.mobile = "true" : $scope.mobile = "false"), selectedItem && selectedItem.length > 0 && $scope.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
            if (selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-section")) {
                $scope.isSection = true;
            }

            $scope.idTMP = selectedItem.attr("id");
            var media_id;
            if ("slider" == selectedItem.attr("pn-type")) {
                $scope.noGradient = true;
                var _left = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                var d = Math.round(_left / selectedItem.outerWidth());
                media_id = PN_PAGE.getIndexElement(selectedItem.find('.widget-element[pn-type="item_slider"]').eq(d).attr("id"));
            } else {
                $scope.noGradient = false;
                media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            }
            $scope.bg_color = apiElement[media_id].media.desktop["background-color"];
            $scope.bg_color_gradient = PN_PAGE.toGradientColor(apiElement[media_id].media.desktop.colorGradient);
            //if ($scope.bg_color_gradient == PN_PAGE.nonGradientColor) {
            //    var cl = {
            //        type: 'linear',
            //        position: 'to top',
            //        //color1: $scope.bg_color || 'rgba(255,255,255,1)',
            //        //color2: $scope.bg_color || 'rgba(255,255,255,1)'
            //        color1: $scope.bg_color || 'rgba(255,255,255,0)',
            //        color2: $scope.bg_color || 'rgba(255,255,255,0)'
            //    }
            //    $scope.bg_color_gradient = PN_PAGE.toGradientColor(cl);
            //}

            $scope.bg_color_gradient_style = ($scope.bg_color_gradient != PN_PAGE.nonGradientColor)? "background:" + $scope.bg_color_gradient + "; -webkit-background-clip: text; -webkit-text-fill-color: transparent;":"";
            $scope.bg_type = apiElement[media_id].bg_type;
            $scope.bg_image = apiElement[media_id].media[deviceEdit]["background-image"];
            $scope.bg_video = apiElement[media_id].media[deviceEdit]["background-video"];
            $scope.color_overlay = apiElement[media_id].media.overlay_color;
            if (apiElement[media_id].media[deviceEdit].typePosBgImg) {
                $scope.typePosBgImg = apiElement[media_id].media[deviceEdit].typePosBgImg;
            } else {
                $scope.typePosBgImg = apiElement[media_id].media.typePosBgImg;
            }
            if (!$scope.typePosBgImg) {
                $scope.typePosBgImg = "center";
                if (apiElement[media_id].media[deviceEdit].typePosBgImg) {
                    apiElement[media_id].media[deviceEdit].typePosBgImg = "center";
                } else {
                    apiElement[media_id].media.typePosBgImg = "center";
                }
            }

            var viewModel = new OptionWiget;
            var e = $scope.isSection ? selectedItem : viewModel.getParentSection(selectedItem);
            if (e) {
                $(".widget-item.custom-section .option .btn-full-body").text("S\u1eafp x\u1ebfp l\u1ea1i " + e.attr("id"));
            }
            if (!$scope.color_overlay) {
                $scope.color_overlay = "rgba(255,255,255,0)";
                apiElement[media_id].media.overlay_color = "rgba(255,255,255,0)";
            }
            if (apiElement[media_id].media[deviceEdit].typeBgImage) {
                $scope.typeBgImage = apiElement[media_id].media[deviceEdit].typeBgImage;
            } else {
                if (apiElement[media_id].media.typeBgImage) {
                    apiElement[media_id].media[deviceEdit].typeBgImage = apiElement[media_id].media.typeBgImage;
                    if (selectedItem.hasClass("widget-element")) {
                        apiElement[media_id].media.mobile.typeBgImage = apiElement[media_id].media.typeBgImage;
                    }
                    $scope.typeBgImage = apiElement[media_id].media.typeBgImage;
                } else {
                    if ("mobile" == deviceEdit && selectedItem.hasClass("widget-section")) {
                        $scope.typeBgImage = "streH";
                        apiElement[media_id].media[deviceEdit].typeBgImage = "streH";                       
                    } else {
                        $scope.typeBgImage = "stre";
                        apiElement[media_id].media[deviceEdit].typeBgImage = "stre";
                    }
                }
            }           
            if (!$scope.bg_color) {
                "rgba(255,255,255,0)" == $scope.bg_color;
                apiElement[media_id].media.mobile["background-color"] = "rgba(255,255,255,0)";
                apiElement[media_id].media.desktop["background-color"] = "rgba(255,255,255,0)";
            }
            if ("image" == $scope.bg_type) {
                $('[pn-show-bg-image="true"]').show();
            } else {
                $('[pn-show-bg-image="true"]').hide();
            }
            $scope.repeatBg = apiElement[media_id].repeatBg;
            if (!$scope.repeatBg) {
                $scope.repeatBg = "no-repeat";
                apiElement[media_id].repeatBg = "no-repeat";
            }
            $scope.bgHeight = apiElement[media_id].media[deviceEdit]["height"];

            if ($scope.isSection && $scope.bg_video && $scope.bg_video.length > 0) {
                $scope.addVideo($scope.bg_video);
            }
        }
    });
    $scope.items = lp_colors_all;
    $scope.colorTypePlg = "";
    
    $scope.setRepeatBgImg = function (isRepeatBg) {
        if (selectedItem && selectedItem.length > 0) {
            var indexLookupKey;
            if ("slider" == selectedItem.attr("pn-type")) {
                var _left = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                var e = Math.round(_left / selectedItem.outerWidth());
                indexLookupKey = PN_PAGE.getIndexElement(selectedItem.find('.widget-element[pn-type="item_slider"]').eq(e).attr("id"));
            } else {
                indexLookupKey = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            }
            $scope.repeatBg = isRepeatBg;
            apiElement[indexLookupKey].repeatBg = isRepeatBg;
            $scope.setBgTitle($scope.typeBgImage);
        }
    };

    $scope.setTypeHeightBgImg = function (typeHeightImg) {
        if ((typeHeightImg == 'auto' && $scope.bgHeight != '100vh') || selectedItem.hasClass("widget-section") == false) return;
        if (typeHeightImg == 'auto' && $scope.bgHeight == '100vh') typeHeightImg='550px';
        if (selectedItem && selectedItem.length > 0) {
            var i;
            if ("slider" == selectedItem.attr("pn-type")) {
                var _left = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                var e = Math.round(_left / selectedItem.outerWidth());
                i = PN_PAGE.getIndexElement(selectedItem.find('.widget-element[pn-type="item_slider"]').eq(e).attr("id"));
            } else {
                i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            }
            if (apiElement[i].media[deviceEdit].height) {
                apiElement[i].media[deviceEdit].height = typeHeightImg;
            } else {
                apiElement[i].media.height = typeHeightImg;
            }
            $scope.bgHeight = typeHeightImg;
            var $this;
            $this = selectedItem.hasClass("widget-element") ? $("#punnel-editor #" + apiElement[i].id).find(".widget-content").eq(0) : 1 == apiElement[i].popup ? selectedItem.find(".container") : selectedItem;
            $this.css({
                "height": typeHeightImg
            });
        }
    };
    
    $scope.setTypePosBgImg = function (typePosBgImg) {
        if (selectedItem && selectedItem.length > 0) {
            var i;
            if ("slider" == selectedItem.attr("pn-type")) {
                var _left = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                var e = Math.round(_left / selectedItem.outerWidth());
                i = PN_PAGE.getIndexElement(selectedItem.find('.widget-element[pn-type="item_slider"]').eq(e).attr("id"));
            } else {
                i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            }
            if (apiElement[i].media[deviceEdit].typePosBgImg) {
                apiElement[i].media[deviceEdit].typePosBgImg = typePosBgImg;
            } else {
                apiElement[i].media.typePosBgImg = typePosBgImg;
            }
            $scope.typePosBgImg = typePosBgImg;
            var $this;
            $this = selectedItem.hasClass("widget-element") ? $("#punnel-editor #" + apiElement[i].id).find(".widget-content").eq(0) : 1 == apiElement[i].popup ? selectedItem.find(".container") : selectedItem;
            $this.css({
                "background-position": "top " + typePosBgImg
            });
        }
    };
    
    $scope.setBgTitle = function (typeBgImage) {
        if (selectedItem && selectedItem.length > 0) {
            var i;
            if ("slider" == selectedItem.attr("pn-type")) {
                var filmSteps = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                var e = Math.round(filmSteps / selectedItem.outerWidth());
                i = PN_PAGE.getIndexElement(selectedItem.find('.widget-element[pn-type="item_slider"]').eq(e).attr("id"));
            } else {
                i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            }
            if (apiElement[i].media[deviceEdit].typeBgImage = typeBgImage, "desktop" == deviceEdit && !apiElement[i].media.mobile.typeBgImage && selectedItem.hasClass("widget-section") ? (console.log("1: "), apiElement[i].media.mobile.typeBgImage = "streH") : (console.log("2"), apiElement[i].media.mobile.typeBgImage = typeBgImage), $scope.typeBgImage = typeBgImage, $scope.bg_image = apiElement[i].media[deviceEdit]["background-image"], $scope.bg_image &&
            $scope.bg_image.length > 0) {
                var f = "center";
                f = apiElement[i].media[deviceEdit].typePosBgImg ? apiElement[i].media[deviceEdit].typePosBgImg : apiElement[i].media.typePosBgImg;
                var element;
                switch (element = selectedItem.hasClass("widget-element") ? $("#punnel-editor #" + apiElement[i].id).find(".widget-content").eq(0) : 1 == apiElement[i].popup ? selectedItem.find(".container") : selectedItem, typeBgImage) {
                    case "title":
                        element.css({
                            "background-repeat": $scope.repeatBg,
                            "background-attachment": "",
                            "background-position": "",
                            "background-size": "",
                            "background-origin": ""
                        });
                        break;
                    case "stre":
                        element.css({
                            "background-size": "cover",
                            "background-repeat": $scope.repeatBg,
                            "background-attachment": "scroll",
                            //"background-origin": "content-box",
                            "background-position": "top " + f
                        });
                        break;
                    case "streWH":
                        element.css({
                            "background-size": "100% 100%",
                            "background-repeat": $scope.repeatBg,
                            "background-attachment": "scroll",
                            //"background-origin": "content-box",
                            "background-position": "top " + f
                        });
                        break;
                    case "streW":
                        element.css({
                            "background-size": "100% auto",
                            "background-repeat": $scope.repeatBg,
                            "background-attachment": "scroll",
                            //"background-origin": "content-box",
                            "background-position": "top " + f
                        });
                        break;
                    case "streH":
                        element.css({
                            "background-size": "auto 100%",
                            "background-repeat": $scope.repeatBg,
                            "background-attachment": "scroll",
                            //"background-origin": "content-box",
                            "background-position": "top " + f
                        });
                        break;
                    case "para":
                        element.css({
                            "background-size": "cover",
                            "background-attachment": "fixed",
                            "background-origin": "",
                            "background-position": "top " + f,
                            "background-repeat": $scope.repeatBg
                        });
                        break;
                    default:
                        element.css({
                            "background-repeat": "no-repeat",
                            "background-attachment": "",
                            "background-position": "",
                            "background-size": "",
                            "background-origin": ""
                        });
                }
            }
        }
    };
    
    $scope.addImage = function (bg_image) {
        if (selectedItem && selectedItem.length > 0) {
            var i;
            if ("slider" == selectedItem.attr("pn-type")) {
                var filmSteps = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                var e = Math.round(filmSteps / selectedItem.outerWidth());
                i = PN_PAGE.getIndexElement(selectedItem.find('.widget-element[pn-type="item_slider"]').eq(e).attr("id"));
            } else {
                i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            }
            var finalSizeCropProperties;
            finalSizeCropProperties = selectedItem.hasClass("widget-element") ? $("#punnel-editor #" + apiElement[i].id).find(".widget-content").eq(0) : 1 == apiElement[i].popup ? selectedItem.find(".container") : selectedItem;
            if (bg_image && bg_image.length > 0) {
                if (-1 != bg_image.search(ApiStaticD)) {
                    $scope.bg_image = bg_image.replace(ApiStaticD, apiStaticDefault);
                } else {
                    if (-1 != bg_image.search(ApiStaticT)) {
                        $scope.bg_image = bg_image.replace(ApiStaticT, apiStaticDefault);
                    } else {
                        if (-1 != bg_image.search(ApiStaticM)) {
                            $scope.bg_image = bg_image.replace(ApiStaticM, apiStaticDefault);
                        } else {
                            $scope.bg_image = bg_image;
                        }
                    }
                }
                $scope.bg_type = "image";
                apiElement[i].bg_type = "image";
                apiElement[i].media[deviceEdit]["background-image"] = bg_image;
                if ("desktop" == deviceEdit) {
                    apiElement[i].media.mobile["background-image"] = bg_image;
                }
            } else {
                $scope.bg_image = "";
                $scope.bg_type = "color";
                apiElement[i].bg_type = "color";
                
                if ("desktop" == deviceEdit) {
                    apiElement[i].media.mobile["background-image"] = "";
                }
                apiElement[i].media[deviceEdit]["background-image"] = "";

                apiElement[i].media.overlay_color = "rgba(0,0,0,0)";
                $('[pn-show-bg-image="true"]').hide();
            }
            $scope.setValueColorBg(finalSizeCropProperties, apiElement[i].media[deviceEdit]["background-image"], $scope.color_overlay, apiElement[i].media.desktop["background-color"], apiElement[i].media[deviceEdit].colorGradient);
            $scope.setBgTitle($scope.typeBgImage);
        }
    };
    
    $scope.changetypeImage = function (typeImg) {
        popupService.imageManagerShow({}, function (res) {
            imgUtils.process(res, typeImg, "");
        });
    };
    
    $scope.showColorOverlay = function () {
        if (selectedItem && selectedItem.length > 0) {
            $scope.colorTypePlg = "overlay";
            colorUsing = $scope.color_overlay;
            var a;
            var i;
            var item = new OptionWiget;
            if ("slider" == selectedItem.attr("pn-type")) {
                var filmSteps = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                var f = Math.round(filmSteps / selectedItem.outerWidth());
                i = PN_PAGE.getIndexElement(selectedItem.find('.widget-element[pn-type="item_slider"]').eq(f).attr("id"));
            } else {
                i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            }
            if (a = selectedItem.hasClass("widget-element") ? $("#punnel-editor #" + apiElement[i].id).find(".widget-content").eq(0) : 1 == apiElement[i].popup ? selectedItem.find(".container") : selectedItem, "image" == selectedItem.attr("pn-type")) {
                var completeTitleOpacity = 1 - item.getOpacityOverLay($scope.color_overlay);
                var backgroundAttr = item.getHex($scope.color_overlay);
                selectedItem.css({
                    background: backgroundAttr
                });
                selectedItem.find(".widget-content").css({
                    opacity: completeTitleOpacity
                });
            } else {
                $scope.setValueColorBg(a, apiElement[i].media[deviceEdit]["background-image"], $scope.color_overlay, apiElement[i].media.desktop["background-color"], apiElement[i].media[deviceEdit].colorGradient);
            }
        }
    };
    
    $scope.showChangeImage = function (obj) {
        if ($(obj.target).is(":checked")) {
            $(".showChangeBackgroundImage").show();
        } else {
            $(".showChangeBackgroundImage").hide();
        }
    };
    
    $scope.showContentSetting = function (lp_setting) {
        var loadingMaskUI = $('.advanced[pn-setting="' + lp_setting + '"] .pn-content-settings');
        if ("none" == loadingMaskUI.css("display")) {
            loadingMaskUI.css({
                display: "block"
            });
        } else {
            loadingMaskUI.css({
                display: "none"
            });
        }
    };
    
    $scope.showFileManager = function () {
    };
    
    $scope.setValueColorBg = function (linear_gradient, url, vdwB, d, gradient) {
        if (url && url.length > 0) {
            linear_gradient.css({
                "background-image": "linear-gradient(" + vdwB + "," + vdwB + '),url("' + url + '")'
            });
            linear_gradient.css({
                "background-image": "-o-linear-gradient(" + vdwB + "," + vdwB + '),url("' + url + '")'
            });
            linear_gradient.css({
                "background-image": "-ms-linear-gradient(" + vdwB + "," + vdwB + '),url("' + url + '")'
            });
            linear_gradient.css({
                "background-image": "-moz-linear-gradient(" + vdwB + "," + vdwB + '),url("' + url + '")'
            });
            linear_gradient.css({
                "background-image": "-webkit-linear-gradient(" + vdwB + "," + vdwB + '),url("' + url + '")'
            });
        } else if (gradient && gradient != null) {
            linear_gradient.css({
                "background-image": PN_PAGE.toGradientColor(gradient)
            });
        }else {
            linear_gradient.css({
                "background-image": ""
            });
        }
        linear_gradient.css({
            "background-color": d
        });
    };

    $scope.showColorSettingTool = function (typeColorPicker) {
        if (selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));  
            var cl = {
                type: 'linear',
                position: 'to top',
                color1: 'rgba(255,255,255,0)',
                color2: 'rgba(255,255,255,0)'
            }
            if (apiElement[media_id].media[deviceEdit].colorGradient && apiElement[media_id].media[deviceEdit].colorGradient != null && PN_PAGE.toGradientColor(apiElement[media_id].media[deviceEdit].colorGradient) != PN_PAGE.nonGradientColor)
                $scope.showColorGradientSetting(typeColorPicker);
            else {
                $scope.showColorSetting(typeColorPicker);
            }
        }
    }
    
    $scope.showColorSetting = function (typeColorPicker) {
        if (selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if ($rootScope.typeColorPicker = typeColorPicker, "background" == typeColorPicker) {
                if ("slider" == selectedItem.attr("pn-type")) {
                    var filmSteps = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                    var e = Math.round(filmSteps / selectedItem.outerWidth());
                    var media_id = PN_PAGE.getIndexElement(selectedItem.find('.widget-element[pn-type="item_slider"]').eq(e).attr("id"));
                    $rootScope.colorPickerUsing = apiElement[media_id].media[deviceEdit]["background-color"];
                } else {
                    $rootScope.colorPickerUsing = apiElement[media_id].media[deviceEdit]["background-color"];
                }
            } else {
                $rootScope.colorPickerUsing = apiElement[media_id].media.overlay_color;
            }
            $("#lpColorPickerCtrl").colorpicker("setValue", $rootScope.colorPickerUsing);
            $(".widget-item.custom-color-picker").show();
        }
    };

    $scope.showColorGradientSetting = function (typeColorPicker) {
        if (selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            $rootScope.typeColorPicker = typeColorPicker;
            if ("background" == typeColorPicker) {
                if ("slider" != selectedItem.attr("pn-type")) {
                    var cl = {
                        type: 'linear',
                        position: 'to top',
                        //color1: apiElement[media_id].media[deviceEdit]["background-color"] || 'rgba(255,255,255,1)',
                        //color2: apiElement[media_id].media[deviceEdit]["background-color"] || 'rgba(255,255,255,1)'
                        color1: 'rgba(255,255,255,0)',
                        color2: 'rgba(255,255,255,0)'
                    }

                    $rootScope.colorGradientPickerUsing = apiElement[media_id].media[deviceEdit].colorGradient || cl; 
                    $("#lpColorG1PickerCtrl").colorpicker("setValue", $rootScope.colorGradientPickerUsing.color1);
                    $("#lpColorG2PickerCtrl").colorpicker("setValue", $rootScope.colorGradientPickerUsing.color2);
                    $(".widget-item.custom-color-gradient-picker").show();
                }             
            }           
        }
    };

    $scope.addVideo = function (bg_video) {
        if (selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-section")) {
            var i;
            i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            var element = selectedItem;


            if ($scope.bg_video && $scope.bg_video.length > 0) {
                $scope.bg_video.trim();
                var //a = "",
                    b = "";
                if (-1 != $scope.bg_video.search(g)) {
                    b = PN_PAGE.getNameParramUrl($scope.bg_video, "v");
                    var d = PN_PAGE.getNameParramUrl($scope.bg_video, "list");
                    bg_video = "https://www.youtube.com/embed/" + b, d && d.length > 0 && (a += "?list=" + d)
                } else -1 != $scope.bg_video.search(f) ? (b = $scope.bg_video.replace(f, ""), a = "https://www.youtube.com/embed/" + b) : -1 != $scope.bg_video.search(h) ? a = $scope.bg_video : console.log("link không đúng");

                var h = selectedItem.find('.video-foreground');
                if (h.length > 0) {
                    selectedItem.find('.video-foreground').eq(0).html('<iframe src="' + bg_video + '?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ" frameborder="0" allowfullscreen></iframe>');
                } else {
                    var o = element.html();
                    var vn = '<div class="video-foreground"> <iframe src="' + bg_video + '?controls=0&showinfo=0&rel=0&autoplay=1&loop=1&playlist=W0LHTWG-UmQ" frameborder="0" allowfullscreen></iframe> </div>';
                    element.html(vn + o);
                }
                apiElement[i].media[deviceEdit]["background-video"] = bg_video;
                if ("desktop" == deviceEdit) {
                    apiElement[i].media.mobile["background-video"] = bg_video;
                }

                element.css({
                    "background-size": "cover",
                    "background-repeat": $scope.repeatBg,
                    "background-attachment": "scroll",
                    "overflow": "hidden"
                });
            } else {
                apiElement[i].media[deviceEdit]["background-video"] = "";
                if ("desktop" == deviceEdit) {
                    apiElement[i].media.mobile["background-video"] = "";
                }
                var h = selectedItem.find('.video-foreground');
                if (h.length > 0) {
                    selectedItem.find('.video-foreground').remove();
                } 
            }
        }
    };
}]);
