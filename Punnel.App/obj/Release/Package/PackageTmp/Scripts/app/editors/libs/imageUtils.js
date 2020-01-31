function processImg(path, typeImage, action) {
    var apiPath = ApiStatic.substr(0, ApiStatic.length - 1);
    var imgUrl = apiPath + path.replace("/s200x200/", "/");
    var smallUrl = apiPath + path;
    var listImgs = [];
    listImgs.push(imgUrl);
    switch (typeImage) {
        case "background":
            if (selectedItem && selectedItem.length > 0) {
                var id;
                if ("slider" == selectedItem.attr("pn-type")) {
                    var $deepPage = $(".widget-item.custom-manager-slider .item-slider.active");
                    var filmSteps = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                    var artistTrack = Math.round(filmSteps / selectedItem.outerWidth());
                    id = PN_PAGE.getIndexElement($deepPage.attr("pn-active"));
                    setVisiableElementSlider(selectedItem, artistTrack);
                } else {
                    id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                }
                var k;
                k = selectedItem.hasClass("widget-element") ? $("#punnel-editor #" + apiElement[id].id).find(".widget-content").eq(0) : 1 == apiElement[id].popup ? selectedItem.find(".container") : selectedItem;
                apiElement[id].bg_type = "image";
                apiElement[id].media[deviceEdit]["background-image"] = imgUrl;
                if ("desktop" == deviceEdit) {
                    apiElement[id].media.mobile["background-image"] = imgUrl;
                }
                var libraryToUse = new setStyleElement;
                if (selectedItem.hasClass("widget-section")) {
                    libraryToUse.setStyleSection(apiElement[id], deviceEdit);
                } else {
                    libraryToUse.setStyleItem(apiElement[id], deviceEdit);
                }
                if (apiElement[id].media[deviceEdit].typeBgImage) {
                    imgUtils.setBgTitle(apiElement[id].media[deviceEdit].typeBgImage);
                } else {
                    imgUtils.setBgTitle(apiElement[id].media.typeBgImage);
                }
                $('[pn-show-bg-image="true"]').show();
                $('[pn-value-bg-image="true"] input[type="text"]').val(smallUrl);
                var e = new ShowBoxResize;
                selectedItem.show();
                if (selectedItem.hasClass("widget-element")) {
                    e.showBox(selectedItem);
                } else {
                    e.showBoxSection(selectedItem);
                }
                $(".custom-background .link-bg-image").val(imgUrl).change();
            }
            break;
        case "addnew":
            if ("dbclick" == action) {
                var n = new Image;
                n.src = imgUrl;
                n.onload = function () {
                    var width = this.width;
                    var height = this.height;
                    if (parseFloat(width) > 960) {
                        height = 960 * parseFloat(height) / parseFloat(width);
                        width = 960;
                    }
                    if (10 > width) {
                        width = 250;
                        height = 250;
                    }
                    var e = new AddToFrame;
                    var window = e.eleAdd(false);
                    var g = (window.outerHeight() - height) / 2 + "px";
                    var expectedPostition = (window.outerWidth() - width) / 2 + "px";
                    imgUtils.buildImg(window, g, expectedPostition, width, height, imgUrl);
                };
                $(".custom-image .link-pl-image").val(imgUrl).change();
            } else {
                if (listImgs && listImgs.length > 0) {
                    listImgs.each(function (b, idx) {
                        var d = new Image;
                        d.src = b;
                        d.onload = function () {
                            var width = this.width;
                            var height = this.height;
                            if (parseFloat(width) > 960) {
                                height = 960 * parseFloat(height) / parseFloat(width);
                                width = 960;
                            }
                            if (10 > width) {
                                width = 250;
                                height = 250;
                            }
                            var e = new AddToFrame;
                            var window = e.eleAdd(false);
                            var g = (window.outerHeight() - height) / 2 + "px";
                            var expectedPostition = (window.outerWidth() - width) / 2 + "px";
                            imgUtils.buildImg(window, g, expectedPostition, width, height, b);
                        };
                    });
                } else {
                    PN_PAGE.showMessage("Vui lòng chọn hình", 'alert');
                }
            }
            break;
        case "image":
            imgUtils.setUrlImage(imgUrl);
            $(".custom-image .link-pl-image").val(imgUrl).change();
            break;
        case "image-share":
            dummyData.imagePage = imgUrl.replace(ApiStatic, '');
            //$("#settingPage .image-page").attr("src", dummyData.imagePage);
            //var result = JSON.stringify(dummyData);
            //$restful.put("/landingpage", {
            //    id: $stateParams.id,
            //    thumbnail: dummyData.imagePage,
            //    source: result,
            //    opt: "thumb"
            //}).then(function (b) {
            //});
            //popupService.settingManagerShow();
            break;
        case "favicon":
            dummyData.imageFavicon = imgUrl.replace(ApiStatic, '');
            break;
        case "iconlist":
            if (selectedItem && selectedItem.length > 0) {
                var id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[id].typeicon = "image";
                apiElement[id].icon_list_image = imgUrl;
                $(".custom-list-icon .image-icon-list").val(apiElement[id].icon_list_image).change();
                imgUtils.setValueIcon(selectedItem);
            }
            break;
        default:
            imgUtils.setImgs(imgUrl);
    };
};
var imgUtils = {
    process: processImg,
        setImgs: function (value) {
            var obj;
            var width;
            var bottom;
            var window;
            var values = [];
            var obj = new Image;
            values.push(value);
            if (values.length > 0) {
                if (selectedItem && selectedItem.length > 0) {
                    if ("image" == selectedItem.attr("pn-type")) {
                        if (1 == values.length) {
                            imgUtils.setUrlImage(values[0]);
                        } else {
                            imgUtils.setUrlImage(values[0]);

                            for (var i = 1; i < values.length; i++) {
                                var url = values[i];
                                obj.src = url;
                                width = obj.width;
                                bottom = obj.height;
                                window = selectedItem.parent();
                                imgUtils.buildImg(window, selectedItem.css("top"), selectedItem.css("left"), width, bottom, url);
                            }
                        }
                    } else {
                        for (var i = 0; i < values.length; i++) {
                            var url = values[i];
                            obj.src = url;
                            width = obj.width;
                            bottom = obj.height;
                            
                            if (obj.src.endsWith('.svg')) {
                                if (obj.width >= obj.height) {
                                    width = 500;
                                    bottom = 500 * obj.height / obj.width;
                                } else {
                                    bottom = 500;
                                    width = 500 * obj.width / obj.height;
                                }
                            }

                            if (parseFloat(width) > 960) {
                                bottom = 960 * parseFloat(bottom) / parseFloat(width);
                                width = 960;
                            }
                            if (parseFloat(bottom) > 680) {
                                width = 680 * parseFloat(width) / parseFloat(bottom);
                                bottom = 680;
                            }
                            else if (10 > width) {
                                width = 250;
                                bottom = 250;
                            }
                            var index = new AddToFrame;
                            window = index.eleAdd(false);
                            var will = (window.outerHeight() - bottom) / 2 + "px";
                            var newMargin = (window.outerWidth() - width) / 2 + "px";


                            imgUtils.buildImg(window, will, newMargin, width, bottom, url);
                        }
                    }
                } else {
                    for (var i = 0; i < values.length; i++) {
                        var url = values[i];
                        obj.src = url;

                        $(obj).on('load', function () {
                            width = obj.width;
                            bottom = obj.height;
                            if (obj.src.endsWith('.svg')) {
                                if (obj.width >= obj.height) {
                                    width = 500;
                                    bottom = 500 * obj.height / obj.width;
                                } else {
                                    bottom = 500;
                                    width = 500 * obj.width / obj.height;
                                }
                            }
                            if (100 > width) {
                                width = 200;
                            }
                            if (100 > bottom) {
                                bottom = 200;
                            }
                            if (parseFloat(width) > 960) {
                                bottom = 960 * parseFloat(bottom) / parseFloat(width);
                                width = 960;
                            }
                            if (parseFloat(bottom) > 680) {
                                width = 680 * parseFloat(width) / parseFloat(bottom);
                                bottom = 680;
                            }
                            index = new AddToFrame;
                            window = index.eleAdd(false);
                            will = (window.outerHeight() - bottom) / 2 + "px";
                            newMargin = (window.outerWidth() - width) / 2 + "px";
                            imgUtils.buildImg(window, will, newMargin, width, bottom, url);
                        });
                    }
                }
            }
            var BDA = new RunApp;
            BDA.init();
            if (30 == typeAddNew) {
                selectedItem = $('#punnel-editor .widget-section[pn-popup="true"]').eq(0);
                selectedItem.show();
                var viewModel = new ShowBoxResize;
                viewModel.showBoxSection(selectedItem);
                $("#resizable-element").hide();
            }
        },
        setUrlImage: function (value) {
            if (selectedItem && selectedItem.length > 0) {
                var i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                apiElement[i].link = value;
                var target = value;
                var pix_color = "";
                if (PN_PAGE.checkImage(target)) {
                    target = target.replace(apiStaticDefault, ApiStaticM);
                    pix_color = pix_color + (target + " 768w, " + value.replace(apiStaticDefault, ApiStaticT) + " 960w, " + value.replace(apiStaticDefault, ApiStaticD) + " 1280w");
                } else {
                    pix_color = pix_color + (target + " 768w, " + value.replace(apiStaticDefault, ApiStaticT) + " 960w, " + value.replace(apiStaticDefault, ApiStaticD) + " 1280w");
                }
                selectedItem.find(".pn-show-image").eq(0).css({
                    "background-image": 'url("' + value + '")'
                });
                var widget = new OptionWiget;
                widget.addElementUndo("", selectedItem);
                //$(".custom-image .link-pl-image").val(value).change();
            }
        },
        setValueIcon: function (id) {
            if (id && id.length > 0) {
                var indexLookupKey = PN_PAGE.getIndexElement(id.attr("id"));
                PN_PAGE.setTypeListIcon(apiElement[indexLookupKey]);
            }
        },
        setBgTitle: function (t) {
            if (selectedItem && selectedItem.length > 0) {
                var i;
                if ("slider" == selectedItem.attr("pn-type")) {
                    var candidatesWidth = 0 - parseFloat(selectedItem.find(".wrap-child").eq(0).css("left"));
                    var e = Math.floor(candidatesWidth / selectedItem.outerWidth());
                    i = PN_PAGE.getIndexElement(selectedItem.find('.widget-element[pn-type="item_slider"]').eq(e).attr("id"));
                } else {
                    i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                }
                if (apiElement[i].media[deviceEdit].typeBgImage) apiElement[i].media[deviceEdit].typeBgImage = t;
                else apiElement[i].media.typeBgImage = t;
                //apiElement[i].media[deviceEdit].typeBgImage ? apiElement[i].media[deviceEdit].typeBgImage = t : apiElement[i].media.typeBgImage = t;
                    //self.typeBgImage = t,
                    var bg_image = apiElement[i].media.desktop["background-image"];

                if (bg_image && bg_image.length > 0) {
                    var element;
                    element = selectedItem.hasClass("widget-element") ? $("#punnel-editor #" + apiElement[i].id).find(".widget-content").eq(0) : 1 == apiElement[i].popup ? selectedItem.find(".container") : selectedItem;
                    var y;
                    switch (y = apiElement[i].media[deviceEdit].typePosBgImg ? apiElement[i].media[deviceEdit].typePosBgImg : apiElement[i].media.typePosBgImg ? apiElement[i].media.typePosBgImg : "center", t) {
                        case "title":
                            element.css({
                                "background-repeat": "repeat",
                                "background-attachment": "",
                                "background-position": "",
                                "background-size": ""
                            });
                            break;
                        case "stre":
                            element.css({
                                "background-size": "cover",
                                "background-repeat": "",
                                "background-attachment": "scroll",
                                "background-position": "top " + y
                            });
                            break;
                        case "streWH":
                            element.css({
                                "background-size": "100% 100%",
                                "background-repeat": "",
                                "background-attachment": "scroll",
                                "background-position": "top " + y
                            });
                            break;
                        case "streH":
                            element.css({
                                "background-size": "auto 100%",
                                "background-repeat": "",
                                "background-attachment": "scroll",
                                "background-position": "top " + y
                            });
                            break;
                        case "streW":
                            element.css({
                                "background-size": "100% auto",
                                "background-repeat": "",
                                "background-attachment": "scroll",
                                "background-position": "top " + y
                            });
                            break;
                        case "para":
                            element.css({
                                "background-size": "cover",
                                "background-attachment": "fixed",
                                "background-position": "top " + y,
                                "background-repeat": ""
                            });
                            break;
                        default:
                            element.css({
                                "background-repeat": "no-repeat",
                                "background-attachment": "",
                                "background-position": "",
                                "background-size": ""
                            });
                    }
                }
            }
        },
        buildImg: function (g, b, position, width, height, a) {
            var renderedAnnotation = PN_PAGE.PUNNEL_EDIT;
            var updatesCount = 0;
            var console = new AddToFrame;
            g.append(valueTemplate.image);
            var pnNew = renderedAnnotation.contents().find("#pn-new");
            if (void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain) {
                updatesCount = dummyData.numLayerMain;
            }
            pnNew.attr("id", pnNew.attr("pn-lang") + "" + updatesCount);
            updatesCount++;
            dummyData.numLayerMain = updatesCount;
            if (parseFloat(b) < 0) {
                b = "0px";
            }
            pnNew.css({
                top: b,
                left: position,
                width: width + "px",
                height: height + "px"
            });
            pnNew.find(".widget-content").eq(0).css({
                top: b,
                left: position,
                width: width + "px",
                height: height + "px"
            });
            console.apiDefault("image", "widget-element", pnNew.attr("id"), "", b, position, pnNew.css("width"), pnNew.css("height"));
            selectedItem = renderedAnnotation.contents().find("#" + pnNew.attr("id"));
            imgUtils.setUrlImage(a);
            var that = new OptionWiget;
            that.addElementUndo("new", selectedItem);
            that.resetImageMobile(selectedItem);
            var viewModel = new OptionWiget;
            viewModel.fixSizeParent(selectedItem);
            var BDA = new TreeWidget;
            BDA.init();
        }
    }
