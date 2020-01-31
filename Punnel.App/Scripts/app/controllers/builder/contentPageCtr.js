angular.module("punnelApp").controller("contentPageCtr", ["$rootScope", "$state", "$scope", "$stateParams", "$restful", "$window", "$auth", "popupService", function ($rootScope, $state, $scope, $stateParams, $restful, $window, $auth, popupService) {
    $scope.checkB = function () {
        var userAgent = $window.navigator.userAgent;
        var expected = {
            chrome: /chrome/i,
            safari: /safari/i,
            firefox: /firefox/i,
            ie: /internet explorer/i
        };
        var p;
        for (p in expected) {
            if (expected[p].test(userAgent)) {
                return p;
            }
        }
        return "unknown";
    };
    if ("chrome" != $scope.checkB()) {
        $state.go("not-suport");
    }

    $scope.checkClick = true;
    $scope.loadingData = false;

    $scope.fnUpdateTitle = function () {
        $restful.put("/landingpage", {
            id: $stateParams.id,
            name: $scope.updateTitle,
            opt: "name"
        }).then(function (sensorRootObj) {
            if (sensorRootObj && sensorRootObj.data) {
                $("#header .title a").text($scope.updateTitle);
                $("#update-title-page").modal("hide");
            } else {
                if (sensorRootObj) {
                    PN_PAGE.showMessage(sensorRootObj.messager);
                } else {
                    PN_PAGE.showMessage("Vui l\u00f2ng th\u1eed l\u1ea1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!", 'error');
                }
            }
        });
    };
    $scope.selectedItemElement = function () {
        if (!(selectedItem && selectedItem.length > 0)) {
            selectedItem = PN_PAGE.getElement(".widget-element.selected");           
        }
    };

    //$scope.messageUpdate = function () {
    //    Intercom("showNewMessage", "T\u00f4i \u0111\u00e3 chuy\u1ec3n kho\u1ea3n, h\u00e3y n\u00e2ng c\u1ea5p t\u00e0i kho\u1ea3n!");
    //};

    $scope.showlayerTab = function (layer, type) {
        if(type) type.preventDefault();
        $(".layers-element .myTab li").removeClass("active");
        $('.layers-element li[data-active="' + layer + '"]').addClass("active");
        $(".layers-element .tab-content .tab-pane").hide();
        $("#layer-" + layer).show();
        var currentDownloadRequest = new TreeWidget;
        currentDownloadRequest.layer();
        setTimeout(function () {
            $(".layers-element").show();
        }, 1e3);
    };

    $scope.showImageManager = function () {
        var locals = {
            typeImage: "image"
        };
        popupService.imageManagerShow(locals, function (res) {   
            imgUtils.process(res, "image", "");
        });
    };
    $scope.selectForm = function () {
        if (selectedItem && selectedItem.length > 0 && "item_form" == selectedItem.attr("pn-type")) {
            var editor = new OptionWiget;
            var item = editor.getParentElement(selectedItem);
            var cleanLastUsed = new IframeClick;
            cleanLastUsed.addClassSelected(item);
            var $scope = new ShowBoxResize;
            $scope.showBox(selectedItem);
        }
    };
    $scope.showSettingFixed = function () {
        $(".aside-setting .widget-item:visible .group-content-setting").hide();
        $(".aside-setting .widget-item:visible .widget-title i").addClass("ion-arrow-right-b").removeClass("ion-arrow-down-b");
        $(".aside-setting .widget-item.custom-fixed .group-content-setting").show();
        $(".aside-setting .widget-item.custom-fixed .widget-title i").addClass("ion-arrow-down-b").removeClass("ion-arrow-right-b");
    };
    
    $scope.showCustomLink = function () {
        $(".aside-setting .widget-item:visible .group-content-setting").hide();
        $(".aside-setting .widget-item:visible .widget-title i").addClass("ion-arrow-right-b").removeClass("ion-arrow-down-b");
        $(".aside-setting .widget-item.custom-links .group-content-setting").show();
        $(".aside-setting .widget-item.custom-links .widget-title i").addClass("ion-arrow-down-b").removeClass("ion-arrow-right-b");
        $(".aside-setting .widget-item.custom-tracking .group-content-setting").show();
        $(".aside-setting .widget-item.custom-tracking .widget-title i").addClass("ion-arrow-down-b").removeClass("ion-arrow-right-b");
        $("#box-full").trigger("click");
    };
    $scope.selectAllText = function () {
        document.execCommand("selectAll", false, null);
    };
    $scope.cancelgroupElement = function () {
        if (void 0 != selectedItem && "undefined" != selectedItem && selectedItem.length > 0 && selectedItem.hasClass("widget-group")) {
            var a = new EventKey;
            a.eventUngroup();
        }
    };
    $scope.creategroupElement = function () {
        if (selectedItem && selectedItem.length > 0 && "GROUP_TMP" == selectedItem.attr("id")) {
            var doc = new EventKey;
            doc.createGroup(selectedItem);
        }
    };
    $scope.aligngroupElement = function (newValue) {
        if (selectedItem && selectedItem.length > 0 && "GROUP_TMP" == selectedItem.attr("id")) {
            var viewModel = new EventKey;
            viewModel.alignGroup(selectedItem, newValue);
            $("#resizable-element").hide();
        }
    };
    $scope.movedown = function () {
        if (selectedItem && selectedItem.length > 0) {
            var $this = new BoxRightClick;
            $this.moveBottom();
            $(".click-right").hide();
        }
    };
    $scope.moveup = function () {
        if (selectedItem && selectedItem.length > 0) {
            var $this = new BoxRightClick;
            $this.moveTop();
            $(".click-right").hide();
        }
    };
    $scope.duplicate = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = new BoxRightClick;
            a.boxRightClone();
            $(".click-right").hide();
        }
    };
    $scope.clonePopup = function () {
        var element = $(".resizable-popup");
        if (element && "none" != element.css("display") && element.attr("pn-id-popup") && element.attr("pn-id-popup").length > 0) {
            selectedItem = PN_PAGE.getElement("#" + element.attr("pn-id-popup"));
            var b = new BoxRightClick;
            b.boxRightClone();
            PN_PAGE.showMessage("Pop-up \u0111\u01b0\u1ee3c nh\u00e2n b\u1ea3n th\u00e0nh c\u00f4ng. \nID Pop-up nh\u00e2n b\u1ea3n l\u00e0 " + selectedItem.attr("id") + " \nVui l\u00f2ng ki\u1ec3m tra t\u1ea1i ph\u1ea7n Layer -> Pop-up", 'alert');
        }
    };
    $scope.showSaveSection = function () {
        if (selectedItem && selectedItem.length > 0) {
            var data = '';
            var e = selectedItem;
            if (e && e.hasClass("widget-section"));
            else {
                var f = new OptionWiget;
                e = f.getParentSection(e)
            }
            if (e && e.length > 0 && "widget_section" == e.attr("pn-type")) {
                var g = PN_PAGE.getIndexElement(e.attr("id"));
                //apiElement[g].idTmpSec = d.data.id;
                var h = {
                    apiElement: []
                },
                    i = $.extend({}, apiElement[g]);
                h.apiElement.push(i);
                var j = e.find(".widget-element");
                j && j.length > 0 && j.each(function (a) {
                    var b = PN_PAGE.getIndexElement($(this).attr("id"));
                    i = $.extend({}, apiElement[b]), h.apiElement.push(i)
                })

                data = JSON.stringify(h);
                
            }
            if (data == '') return;

            popupService.show('addName.html', {data:data}, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
                $scope.title = 'Lưu section mẫu';
                $scope.label = 'Tên section mẫu';
                $scope.name = '';
                $scope.editName = {
                    name: '',
                    source: data,
                    type:20
                }

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.submit = function () {
                    if ($scope.myForm.$valid == false) return;
                    $scope.editName.name = $scope.name;
                    PN_PAGE.loading.show();
                    PN_PAGE.btnLoading.show();
                    $restful.post("/template", $scope.editName).then(function (result) {
                        PN_PAGE.loading.hide();
                        $scope.hide();
                        swal('', 'Đã lưu!', 'success');
                    });
                };
            }], function (res) {

            });
        }
    }
    $scope.showSavePopup = function () {
        if (selectedItem && selectedItem.length > 0) {
            var data = '';
            var e = selectedItem;
            if (e && e.hasClass("widget-section"));
            else {
                var f = new OptionWiget;
                e = f.getParentSection(e)
            }
            if (e && e.length > 0 && "widget_section" == e.attr("pn-type")) {
                var g = PN_PAGE.getIndexElement(e.attr("id"));
                //apiElement[g].idTmpSec = d.data.id;
                var h = {
                    apiElement: []
                },
                    i = $.extend({}, apiElement[g]);
                h.apiElement.push(i);
                var j = e.find(".widget-element");
                j && j.length > 0 && j.each(function (a) {
                    var b = PN_PAGE.getIndexElement($(this).attr("id"));
                    i = $.extend({}, apiElement[b]), h.apiElement.push(i)
                })

                data = JSON.stringify(h);

            }
            if (data == '') return;

            popupService.show('addName.html', { data: data }, ['$scope', '$state', '$mdDialog', function ($scope, $state, $mdDialog) {
                $scope.title = 'Lưu popup mẫu';
                $scope.label = 'Tên popup mẫu';
                $scope.name = '';
                $scope.editName = {
                    name: '',
                    source: data,
                    type: 30
                }

                $scope.cancel = function () {
                    $mdDialog.cancel();
                };

                $scope.hide = function () {
                    $mdDialog.hide();
                };

                $scope.submit = function () {
                    if ($scope.myForm.$valid == false) return;
                    $scope.editName.name = $scope.name;
                    PN_PAGE.loading.show();
                    PN_PAGE.btnLoading.show();
                    $restful.post("/template", $scope.editName).then(function (result) {
                        PN_PAGE.loading.hide();
                        $scope.hide();
                        swal('', 'Đã lưu!', 'success');
                    });
                };
            }], function (res) {

            });
        }
    }
    $scope.addNewSection = function (insertBackToTop) {
        if (1 != preview) {
            switch (typeAddNew) {
                case 30:
                    popupService.popupManagerShow();
                    break;
                default:
                    popupService.sectionManagerShow();
            }
        }
    };
    $scope.editext = function () {
        showDivEdittext();
    };
    $scope.exitPopup = function () {
        if (30 != typeAddNew) {
            var a = PN_PAGE.getElement("#" + $(".resizable-popup").attr("pn-id-popup"));
            if (a && a.length > 0) {
                a.hide();
                var avlt = new OptionWiget;
                if (avlt.addElementUndo("", a), $(".resizable-popup").hide(), $("#resizable-element").hide(), PN_PAGE.showElementEditorText(), $("#punnel-editor .selected").removeClass("selected"), selectedItem = $('.widget-element[pn-action-link="' + a.attr("id") + '"]'), selectedItem.addClass("selected"), selectedItem && selectedItem.length > 0) {
                    var viewModel = new IframeClick;
                    viewModel.showOptionProperties(selectedItem);
                    $(".aside-setting .widget-item").hide();
                }
            }
        }
    };
    $scope.showModalFormFieldNew = function () {
        popupService.show("addFormFill.html", {}, "managerFormFieldCtl", function (res) {
        });
    };
    $scope.deletePopup = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = $('.widget-element[pn-action-link="' + PN_PAGE.getElement("#" + $(".resizable-popup").attr("pn-id-popup")).attr("id") + '"]');
            var b = new BoxRightClick;
            if (b.boxRightDelete(), a && a.length > 0) {
                var indexLookupKey = PN_PAGE.getIndexElement(a.attr("id"));
                apiElement[indexLookupKey].type_link = "";
                apiElement[indexLookupKey].element_popup = "";
                apiElement[indexLookupKey].link_popup = "";
                var ObjectOperation = new IframeClick;
                ObjectOperation.addClassSelected(a);
                ObjectOperation.showOptionProperties(a);
                var b = new ShowBoxResize;
                b.showBox(a);
            }
            $(".resizable-popup").hide();
            var currentDownloadRequest = new TreeWidget;
            currentDownloadRequest.layerHide();
            currentDownloadRequest.layer();
        }
    };
    $scope.deleteElement = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a = new BoxRightClick;
            var $this = new IframeClick;
            switch (selectedItem.attr("pn-type")) {
                case "item_slider":
                    var editor = new OptionWiget;
                    var item = editor.getParentElement(selectedItem);
                    var f = item.find('.widget-element[pn-type="item_slider"]');
                    var version = parseFloat(selectedItem.css("left"));
                    var value = parseFloat(f.eq(0).css("width"));
                    if (f.length > 2) {
                        a.boxRightDelete();
                        selectedItem = void 0;
                        $this.showOptionProperties(selectedItem);
                        var i;
                        var media_id;
                        var distance = 0;
                        f = item.find('.widget-element[pn-type="item_slider"]');
                        var $DOMWindow = f.last();
                        var m = item.outerWidth() - parseFloat($DOMWindow.css("left")) + $DOMWindow.outerWidth();
                        f.each(function () {
                            media_id = PN_PAGE.getIndexElement($(this).attr("id"));
                            i = distance * value;
                            apiElement[media_id].media[deviceEdit].left = i + "px";
                            if (0 > m) {
                                if (parseFloat($(this).css("left")) > version) {
                                    $(this).animate({
                                        left: parseFloat($(this).css("left")) - value + "px"
                                    });
                                }
                            } else {
                                if (parseFloat($(this).css("left")) < version) {
                                    $(this).animate({
                                        left: parseFloat($(this).css("left")) + value + "px"
                                    });
                                }
                            }
                            distance++;
                        });
                    } else {
                        PN_PAGE.showMessage("C\u1ea7n c\u00f3 \u00edt nh\u1ea5t 2 ph\u1ea7n t\u1eed \u0111\u1ec3 ch\u1ea1y tr\u00ecnh chi\u1ebfu", 'error');
                    }
                    break;
                case "item_form":
                    editor = new OptionWiget;
                    item = editor.getParentElement(selectedItem);
                    var indexLookupKey = PN_PAGE.getIndexElement(item.attr("id"));
                    value = selectedItem[0].clientHeight;
                    var maxOffset = selectedItem[0].offsetTop;
                    if (item && "contact_form" == item.attr("pn-type") && apiElement[indexLookupKey].valueApiForm && apiElement[indexLookupKey].valueApiForm.length > 0) {
                        var buttonIndex = 0;
                        for (; buttonIndex < apiElement[indexLookupKey].valueApiForm.length; buttonIndex++) {
                            if (apiElement[indexLookupKey].valueApiForm[buttonIndex].name == name) {
                                apiElement[indexLookupKey].valueApiForm.splice(buttonIndex, 1);
                                break;
                            }
                        }
                    }
                    a.boxRightDelete();
                    selectedItem = void 0;
                    $this.showOptionProperties(selectedItem);
                    var savedValues = item.children().children();
                    var groupFigures = jQuery.grep(savedValues, function (item, i) {
                        return item.offsetTop > maxOffset;
                    });
                    i = 0;
                    for (; i < groupFigures.length; i++) {
                        $this = PN_PAGE.getElement("#" + groupFigures[i].id);
                        if ($this) {
                            $this.css({
                                top: $this[0].offsetTop - value - 10 + "px"
                            });
                            version = PN_PAGE.getIndexElement($this.attr("id"));
                            apiElement[version].media[deviceEdit].top = $this.css("top");
                        }
                    }
                    var $node = PN_PAGE.getElement('.widget-element[pn-parent="' + item.attr("id") + '"]');
                    if ($node) {
                        $node.css({
                            top: $node[0].offsetTop - value - 10 + "px"
                        });
                        version = PN_PAGE.getIndexElement($node.attr("id"));
                        apiElement[version].media[deviceEdit].top = $node.css("top");
                    }
                    break;
                default:
                    if (selectedItem && "contact_form" == selectedItem.attr("pn-type")) {
                        //media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
                        //$restful.post("/Config/DeleteFormDetail", {
                        //    id: apiElement[media_id].formdetailid
                        //}).then(function (b) {
                        //});
                    }
                    a.boxRightDelete();
                    selectedItem = void 0;
                    $this.showOptionProperties(selectedItem);
            }
            showAddNewSection();
            var currentDownloadRequest = new TreeWidget;
            currentDownloadRequest.layer();
        }
    };
    $scope.createGrid = function (e) {
        e.preventDefault();
        var $this = $(".grid-system");
        if ($this && "none" == $this.css("display")) {
            if ("desktop" == deviceEdit) {
                $this.removeClass("grid-mobile").show();
                $(".child-grid").addClass("active");
            } else {
                $this.addClass("grid-mobile").show();
                $(".child-grid").addClass("active");
            }
        } else {
            $this.hide();
            $(".child-grid.grid-item").removeClass("active");
        }
        if ("mobile" == deviceEdit) {
            $this.hide();
        }
        var areaSatBrightness = $(".widget-section:visible .container").eq(0);
        if (areaSatBrightness && areaSatBrightness.length > 0) {
            $this.css({
                left: areaSatBrightness.offset().left + "px",
                margin: "0px"
            });
        } else {
            $this.css({
                left: "0px",
                margin: "0px"
            });
        }
    };
    $scope.convertElementToBackground = function () {
        var that = new OptionWiget;
        that.addElementUndo("", selectedItem);
        $(".settings.active").removeClass("active");
        var i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        var container = that.getParentSection(selectedItem);
        var expRecords = container.find('.widget-element[pn-type-background="important"]');
        if (expRecords && expRecords.length > 0) {
        } else {
            apiElement[i].parent = "#" + container.attr("id");
            selectedItem.prependTo(container);
            selectedItem.addClass("important");
            apiElement[i].addClassBackground = "important";
            selectedItem.attr("pn-type-background", "important");
            var e = new OptionWiget;
            if (e.sortWg(), "googlemap" == selectedItem.attr("pn-type")) {
                var rp;
                var nameIdentifier = 14;
                if (apiElement[i].value_google_map) {
                    nameIdentifier = apiElement[i].value_google_map.zoom;
                    var prop = apiElement[i].value_google_map.address;
                    rp = void 0 != apiElement[i].value_google_map.icon && "" != apiElement[i].value_google_map.icon ? '<div class="pn-maptitle"><p><img src="' + apiElement[i].value_google_map.icon + '"></p><p>' + apiElement[i].value_google_map.title + "</p></div>" : apiElement[i].value_google_map.title;
                } else {
                    nameIdentifier = 14;
                    prop = "Ha Noi";
                    rp = "Hoan Kiem, Ha Noi, Viet Nam";
                }
                var newImportPath = selectedItem.find(".widget-content").eq(0)[0];
                var j = new OptionWiget;
                j.createMapsgoogle(newImportPath, nameIdentifier, prop, rp);
            }
            that = new OptionWiget;
            that.addElementUndo("", selectedItem);
            $("#resizable-element").hide();
        }
    };
    $scope.convertBackgroundToElement = function () {
        if (selectedItem && selectedItem.length > 0) {
            var item = void 0;
            if (item = selectedItem.hasClass("widget-section") ? selectedItem.find(".important").eq(0) : selectedItem, item && item.length > 0) {
                var colsArr = new OptionWiget;
                colsArr.addElementUndo("", item);
                $(".settings.active").removeClass("active");
                var i = PN_PAGE.getIndexElement(item.attr("id"));
                var d = item.parent();
                apiElement[i].parent = "#" + d.attr("id") + " .container";
                item.appendTo(d.find(".container"));
                item.removeClass("important");
                apiElement[i].addClassBackground = "";
                item.attr("pn-type-background", "");
                var e = new OptionWiget;
                if (e.sortWg(), "googlemap" == item.attr("pn-type")) {
                    var rp;
                    var nameIdentifier = 14;
                    if (apiElement[i].value_google_map) {
                        nameIdentifier = apiElement[i].value_google_map.zoom;
                        var prop = apiElement[i].value_google_map.address;
                        rp = void 0 != apiElement[i].value_google_map.icon && "" != apiElement[i].value_google_map.icon ? '<div class="pn-maptitle"><p><img src="' + apiElement[i].value_google_map.icon + '"></p><p>' + apiElement[i].value_google_map.title + "</p></div>" : apiElement[i].value_google_map.title;
                    } else {
                        nameIdentifier = 14;
                        prop = "Ha Noi";
                        rp = "Hoan Kiem, Ha Noi, Viet Nam";
                    }
                    var newImportPath = item.find(".widget-content").eq(0)[0];
                    var j = new OptionWiget;
                    j.createMapsgoogle(newImportPath, nameIdentifier, prop, rp);
                }
                colsArr.addElementUndo("", item);
                $("#resizable-element").hide();
            }
        }
    };
    $scope.addItemSlider = function () {
        if (selectedItem && selectedItem.length > 0 && "slider" == selectedItem.attr("pn-type")) {
            var eVideoId = selectedItem.attr("id");
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            var page = 0;
            var self = new AddToFrame;
            selectedItem.find(".widget-content:eq(0) .wrap-child:eq(0)").append(valueTemplate.item_slider);
            var item = selectedItem.find("#pn-new");
            if (void 0 != dummyData.numLayerMain && "" != dummyData.numLayerMain) {
                page = dummyData.numLayerMain;
            }
            item.attr("id", item.attr("pn-lang") + "" + page);
            item.css({
                top: "0px",
                width: selectedItem.css("width"),
                height: "100%"
            });
            $("#punnel-editor .widget-element.selected").removeClass("selected");
            selectedItem = item;
            selectedItem.addClass("selected");
            page++;
            dummyData.numLayerMain = page;
            self.apiDefault("item_slider", "widget-element", item.attr("id"), "", item.css("top"), item.css("left"), item.css("width"), item.css("height"));
            var id = PN_PAGE.getIndexElement(item.attr("id"));
            apiElement[id].media.mobile.width = apiElement[media_id].media.mobile.width;
            apiElement[id].media.mobile.height = apiElement[media_id].media.mobile.height;
            apiElement[id].media.desktop.width = apiElement[media_id].media.desktop.width;
            apiElement[id].media.desktop.height = apiElement[media_id].media.desktop.height;
            var $dropbox_section = $("#punnel-editor #" + eVideoId).find(".wrap-child").eq(0);
            var left = $dropbox_section.offset().left;
            left = left - item.offset().left;
            $dropbox_section.animate({
                left: left + "px"
            });
            var i = Math.round((0 - left) / selectedItem.outerWidth());
            setVisiableElementSlider(selectedItem, i);
        }
    };
    $scope.showNextItemSlider = function () {
        if (selectedItem && selectedItem.length > 0 && "slider" == selectedItem.attr("pn-type")) {
            var areaSatBrightness = selectedItem.find('.widget-element[pn-type="item_slider"]:last');
            if (areaSatBrightness && areaSatBrightness.length > 0) {
                var tickspace = selectedItem.outerWidth();
                var handle = selectedItem.find(".wrap-child").eq(0);
                handle.finish();
                var x = parseFloat(handle.css("left"));
                if (areaSatBrightness.offset().left > selectedItem.offset().left) {
                    x = x - tickspace;
                    var e = Math.round((0 - x) / selectedItem.outerWidth());
                    if (e < selectedItem.find('.widget-element[pn-type="item_slider"]').length) {
                        selectedItem.find(".widget-element").css({
                            visibility: "visible"
                        });
                        handle.animate({
                            left: x + "px"
                        }, function () {
                            setVisiableElementSlider(selectedItem, e);
                        });
                        var salesTeam = selectedItem.find('.widget-element[pn-type="item_slider"]').eq(e).attr("id");
                        $(".custom-manager-slider .item-slider").removeClass("active");
                        $('.custom-manager-slider .item-slider[pn-active="' + salesTeam + '"]').addClass("active");
                    }
                }
            }
        }
    };
    $scope.showPrevItemSlider = function () {
        if (selectedItem && selectedItem.length > 0 && "slider" == selectedItem.attr("pn-type")) {
            var areaSatBrightness = selectedItem.find('.widget-element[pn-type="item_slider"]:eq(0)');
            if (areaSatBrightness && areaSatBrightness.length > 0) {
                var aTop = selectedItem.outerWidth();
                var handle = selectedItem.find(".wrap-child").eq(0);
                handle.finish();
                var mTop = parseFloat(handle.css("left"));
                if (areaSatBrightness.offset().left < selectedItem.offset().left) {
                    mTop = mTop + aTop;
                    var e = Math.round((0 - mTop) / selectedItem.outerWidth());
                    if (e < selectedItem.find('.widget-element[pn-type="item_slider"]').length) {
                        selectedItem.find(".widget-element").css({
                            visibility: "visible"
                        });
                        handle.animate({
                            left: mTop + "px"
                        }, function () {
                            setVisiableElementSlider(selectedItem, e);
                        });
                        var salesTeam = selectedItem.find('.widget-element[pn-type="item_slider"]').eq(e).attr("id");
                        $(".custom-manager-slider .item-slider").removeClass("active");
                        $('.custom-manager-slider .item-slider[pn-active="' + salesTeam + '"]').addClass("active");
                    }
                }
            }
        }
    };
    $scope.resetMobile = function () {
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
        var syncedAnimals = PN_PAGE.getElement(".widget-section");
        syncedAnimals.each(function () {
            var lightboxContent = new ResizeSection;
            lightboxContent.setHeightSection($(this));
        });
        $("#resizable-element").hide();
    };
    $scope.resetMobileSection = function () {
        if (selectedItem && selectedItem.length > 0) {
            var a;
            var viewModel = new OptionWiget;
            if (a = selectedItem.hasClass("widget-section") ? selectedItem : viewModel.getParentSection(selectedItem), a && a.length > 0) {
                var i;
                var $imagesToLoad = a.find(".widget-element");
                i = PN_PAGE.getIndexElement(a.attr("id"));
                apiElement[i].sortmobile = 0;
                apiElement[i].mobile = 0;
                if ($imagesToLoad && $imagesToLoad.length > 0) {
                    $imagesToLoad.each(function () {
                        i = PN_PAGE.getIndexElement($(this).attr("id"));
                        apiElement[i].sortmobile = 0;
                        apiElement[i].mobile = 0;
                    });
                }
                PN_PAGE.sortMobilePublish = 1;
                var target = new SortElementMobile;
                target.sortItem();
                target.sortFormHightToLow("desktop");
                $("#resizable-element").hide();
            }
            var ObjectOperation = new ResizeSection;
            ObjectOperation.setHeightSection(a);
            //var inFont = new ShowBoxResize;
            //inFont.showBoxSection(a);
        }
    };
    $scope.showCustomhtml = function () {
        $("#custom-html").unbind("modal").modal("show");
    };
    $scope.showmanagerShape = function () {
        typeselecteShape = "";
        $("#managerShape").unbind("modal").modal("show");
    };
    $scope.showModalFormField = function () {
        $("#my-modal-form-field").unbind("modal").modal("show");
    };
    $scope.showmodalFormSave = function () {
        popupService.formManagerShow(function (res) {
        });
    };
    $scope.changeLangElement = function (jEvent) {
        if (selectedItem && selectedItem.length > 0) {
            var i = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            apiElement[i].lang = $(jEvent.target).text();
            selectedItem.attr("pn-lang", apiElement[i].lang);
        }
    };
    $scope.allowScroll = function () {
        if (selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            var isScroll = apiElement[media_id].media[deviceEdit].auto_scroll || false;
            if (deviceEdit == 'mobile') {
                apiElement[media_id].media[deviceEdit].auto_scroll = !isScroll;
            }
        }
    };

    $scope.hideElementMobile = function () {
        if (selectedItem && selectedItem.length > 0) {
            var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (deviceEdit == 'desktop') {
                selectedItem.attr('pn-display', 'none');
            }
            apiElement[media_id].media[deviceEdit].display = "none";
            //apiElement[media_id].media.mobile.display = "none";
            var viewModel = new OptionWiget;
            if (viewModel.fixSizeParentElement(selectedItem), "button" == selectedItem.attr("pn-type")) {
                var s = selectedItem.attr("style");
                var header_lines = s.split(";");
                if (s = "", header_lines && header_lines.length > 0) {
                    var i = 0;
                    for (; i < header_lines.length; i++) {
                        if (-1 != header_lines[i].search("display")) {
                            header_lines[i] = "display:none!important";
                        }
                        s = s + (header_lines[i] + ";");
                    }
                    if (-1 == s.search("display")) {
                        s = s + "display:none!important";
                    }
                }
                selectedItem.attr("style", s);
            } else {
                selectedItem.hide();
            }
            if (deviceEdit == 'mobile') {
                viewModel.calulatorAllGroup(selectedItem);
                viewModel.sapXepAnHienMobile(selectedItem);
            }
            $("#resizable-element").hide();
            $("#resizable-section").hide();
            selectedItem = void 0;
        }
    };
    $scope.hideSectionMobile = function () {
        var a = $(".reset-mobile .list-edit-mobile li").eq(1).attr("id-section");
        if (a && a.length > 0) {
            var id = PN_PAGE.getIndexElement(a);
            apiElement[id].media.mobile.display = "none";
            var thalassaServicesSet = new OptionWiget;
            var remove = $("#punnel-editor #" + a);
            remove.hide();
            thalassaServicesSet.calulatorAllGroup(remove);
            thalassaServicesSet.fixSizeParentElement(remove);
            thalassaServicesSet.sapXepAnHienMobile(remove);
            $("#resizable-element").hide();
            $("#resizable-section").hide();
        }
    };
    $scope.showEditPopup = function () {
        popupService.settingPopupShow({
            'selectedItem': selectedItem, 'itemTracking': itemTracking
        }, function(res) {
            var idx = PN_PAGE.getIndexElement(res.id);
            apiElement[idx].idShowScroll = res.onSection;
            apiElement[idx].showPopupExitPage = res.isOnExit == true?'1':'0';
            apiElement[idx].delayShowPopupPage = res.delay;
            apiElement[idx].showPopupPage = res.isOnOpen == true ? '1' : '0';
            apiElement[idx].trackingPopHead = res.trackingHeader;
            apiElement[idx].trackingPopBody = res.trackingBody;
        });
    };
    $scope.chatHotro = function () {
        Intercom("showNewMessage", "T\u00f4i c\u1ea7n h\u1ed7 tr\u1ee3 s\u1eed d\u1ee5ng Punnel!");
    };
    $scope.tongleRuleShow = 1;
    $scope.tongleRule = function (event) {
        if (1 == event.which) {
            var brandToggle = $("#cmn-toggle-1-rule");
            if (brandToggle.hasClass("active")) {
                brandToggle.removeClass("active");
                $scope.hideRule();
                $scope.tongleRuleShow = 0;
            } else {
                brandToggle.addClass("active");
                $scope.showRule();
                $scope.tongleRuleShow = 1;
            }
        }
    };
    $scope.showLuoi = function () {
        $("#create-grid").modal("show");
    };
    $scope.hideRule = function () {
        $(".vertical-line").hide();
        $(".horizontal-line").hide();
    };
    $scope.showRule = function () {
        $(".vertical-line").show();
        $(".horizontal-line").show();
    };
    $scope.element_dbclick = function () {
        if (selectedItem && selectedItem.length > 0 && "desktop" == deviceEdit) {
            var b = selectedItem.attr("pn-type");
            switch (b) {
                case "textinline":
                    showDivEdittext();
                    break;
                case "textparagraph":
                    showDivEdittext();
                    break;
                case "button":
                    showDivEdittext();
                    break;
                case "listop":
                    showDivEdittext();
                    break;
                case "image":
                    typeImage = "image", popupService.imageManagerShow({}, function (res) {
                        imgUtils.process(res, typeImage, "dbclick");
                    });
                    break;
                case "shape":
                    typeselecteShape = "", $("#managerShape").unbind("modal").modal("show");
                    break;
                case "customhtml":
                    $("#custom-html").unbind("modal").modal("show")
            }
        }
    }

}]);
