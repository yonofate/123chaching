angular.module("punnelApp").controller("imageManagerCtr", ["$scope", "$auth", "suggestService", "$restful", "Upload", "$mdDialog", "$filter", "popupService", "locals", function ($scope, $auth, suggestService, $restful, Upload, $mdDialog, $filter, popupService,locals) {
    $scope.type = 1;//image
    $scope.apiPath = ApiStatic.substr(0, ApiStatic.length - 1);
    $scope.activeFolderId = '';
    $scope.listFolder = [];
    $scope.listFolder_Stock = [];
    $scope.images = [];
    $scope.images_Stock = [];
    $scope.imageSelect = [];
    $scope.query = {
        coid: null,
        page: 1,
        limit:40,
        type: 1
    }

    $scope.queryStock = {
        coid: null,
        page: 1,
        limit: 20,
        type: 1
    }

    $scope.stock_loaded = 0;
    $scope.isEditor = $auth.isEditor();

    $scope.pageChanged = function () {
        getImages();
    }
    $scope.pageStockChanged = function () {
        getImages_Stock();
    }
    
    $scope.getImageInFolder = function (col) {
        $scope.query.page = 1;
        $scope.query.coid = col;
        getImages();
    };

    $scope.getImageInFolder_Stock = function (col) {
        $scope.queryStock.page = 1;
        $scope.queryStock.coid = col;
        getImages_Stock();
    };

    $scope.initImages = function () {
        getImageFolders();
    }

    $scope.image_from = 0;

    $scope.init_MyPic = function () {
        $scope.image_from = 0;
    }

    $scope.init_Stock = function () {
        $scope.image_from = 1;
        if ($scope.stock_loaded==0) getImageFolders_Stock();
    }

    function getImages() {
        $scope.images = [];
        $scope.noItem = false;
        PN_PAGE.sectionLoading.show();
        $restful.post("/File", $scope.query).then(function (res) {
            PN_PAGE.sectionLoading.hide();
            $scope.totalItem = res.data.total;
            if (res.data.data.length == 0) {
                $scope.noItem = true;
            } else {
                $scope.images = $scope.resizeImagesPath(res.data.data, "s200x200");
            }
        });
    }

    function getImages_Stock() {
        $scope.images_Stock = [];
        $scope.noItem = false;
        PN_PAGE.sectionLoading.show();
        $restful.post("/ImageStock", $scope.queryStock).then(function (res) {
            PN_PAGE.sectionLoading.hide();
            $scope.totalStockItem = res.data.total;
            if (res.data.data.length == 0) {
                $scope.noItem = true;
            } else {
                $scope.images_Stock = res.data.data;// $scope.resizeImagesPath(res.data.data, "s200x200");
            }
            $scope.stock_loaded = 1;
        });
    }

    function getImageFolders() {
        $scope.listFolder = [];
        PN_PAGE.sectionLoading.show();
        $restful.get("/collection", {
            tid: 2
        }).then(function (res) {
            PN_PAGE.sectionLoading.hide();
            $scope.listFolder = res.data;
            if (locals && locals.coid) {
                $scope.query.coid = locals.coid;
            } else {
                var suggest_folder = suggestService.getVal('image_folder');
                if (suggest_folder && suggest_folder.length > 0) {
                    var c = $filter('filter')($scope.listFolder, function (d) { return d.id === suggest_folder; })
                    if (c.length == 0) {
                        suggestService.setVal('image_folder', null);
                    } else {
                        $scope.query.coid = suggest_folder;
                    }
                }
            }
            getImages();
        });
    }

    function getImageFolders_Stock() {
        $scope.listFolder_Stock = [];
        PN_PAGE.sectionLoading.show();
        $restful.get("/cate", {
            type: 10
        }).then(function (res) {
            PN_PAGE.sectionLoading.hide();
            $scope.listFolder_Stock = res.data;
            if ($scope.listFolder_Stock.length > 0) {
                $scope.queryStock.coid = $scope.listFolder_Stock[0].id;
                getImages_Stock();
            }
        });
    }

    $scope.resizeImagesPath = function (imgs, size) {
        if (imgs && imgs.length > 0) {
            for (var i = 0; i < imgs.length; i++) {
                if (PN_PAGE.checkImage(imgs[i].path)==true) {
                    imgs[i].path = "/" + size + imgs[i].path;
                }
            }
        }
        return imgs;
    }

    $scope.uploadFiles = function (files) {
        if (files && files.length) {
            var i = 0;
            for (i = 0; i < files.length; i++) {
                if (files[i].size > 5242880) {
                    PN_PAGE.showMessage("Ảnh vượt quá dung lượng cho phép 5Mb, vui lòng giảm dung lượng ảnh trước khi upload!", 'error');
                    PN_PAGE.sectionLoading.hide();
                    return;
                }
            }

            for (i =0; i < files.length; i++) {
                PN_PAGE.sectionLoading.show();
                var isLib = (($scope.image_from || 0) == 1);
                var coid = isLib == false ? '' : $scope.queryStock.coid;
                if ($scope.query.coid !== null) coid = $scope.query.coid;
                var type = isLib == false ? 1 : 5;
                PN_PAGE.uploadImageLadi(Upload, files[i], "/api/upload", type, coid, function (res) {
                    PN_PAGE.sectionLoading.hide();
                    $(".file-manager .column.active").removeClass("active");
                    if (isLib == false) {
                        $scope.imageSelect = [];
                        $scope.images.unshift(res.data.data);
                        if ($scope.images.length == 0) {
                            $scope.noItem = true;
                        } else {
                            $scope.noItem = false;
                        }
                    } else {
                        $scope.imageSelect = [];
                        $scope.images_Stock.unshift(res.data.data);
                        if ($scope.images_Stock.length == 0) {
                            $scope.noItem = true;
                        } else {
                            $scope.noItem = false;
                        }
                    }
                });
            }
        }
    }

    $scope.deleteSelectImage = function (item) {
        $('#managerImage .container-image .container-image-' + ($scope.image_from || 0) + ' .item.active').removeClass("active");
        $scope.setActive((item.id || item.path), item.path);
        $scope.deleteImages();
    }

    $scope.deleteImages = function () {
        var a = $('#managerImage .container-image-' + ($scope.image_from || 0) + ' .item.active');
        if (a && a.length > 0) {
            swal({
                title: "Xóa hình",
                text: "Bạn không thể khôi phục hình sau khi xóa!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Đồng ý xóa",
                cancelButtonText: "Không xóa",
                closeOnConfirm: true
            }, function (b) {
                    if (b == true) {
                        var ids = [];
                    a.each(function () {
                        PN_PAGE.sectionLoading.show();
                        var imgId = $(this).attr("pn-active");
                        ids.push(imgId);
                    });
                        var apiPath = ($scope.image_from || 0) == 0 ? "/file" : "/imagestock";
                        $restful.delete(apiPath, {
                            ids: ids.join(',')
                        }).then(function (res) {
                            var listImg = ($scope.image_from || 0) == 0 ? $scope.images : $scope.images_Stock;
                        $.each(ids, function (key, value) {
                            var item = $filter('filter')(listImg, function (d) { return d.id === value; })[0];
                            var idx = listImg.indexOf(item);
                            listImg.splice(idx, 1);
                        });
                        PN_PAGE.sectionLoading.hide();
                        PN_PAGE.showMessage("Đã xóa!");
                    });

                    $("#managerImage .item.active").removeClass("active");                   
                }
            });
        } else {
            PN_PAGE.showMessage("Vui lòng chọn hình muốn xóa!", 'error');
        }
    }

    $scope.removeFolder = function (item, $index) {
        swal({
            title: "Xóa nhóm",
            text: "Bạn chắc chắn muốn xóa nhóm & ảnh trong nhóm: " + item.name,
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "\u0110\u1ed3ng \u00fd",
            cancelButtonText: "Kh\u00f4ng x\u00f3a",
            closeOnConfirm: true
        }, function (b) {
            if (b === true) {
                PN_PAGE.sectionLoading.show();
                $restful.delete("/Collection", {
                    id: item.id
                }).then(function (res) {
                    PN_PAGE.sectionLoading.hide();
                    $scope.listFolder.splice($index, 1);
                    swal("Đã xóa!", "", "success");
                });
            }
        });
    };

    $scope.showAddFolder = function (item) {
        popupService.show('addName.html', {}, ['$scope', '$restful', '$mdDialog', function ($scope, $state, $mdDialog) {
            $scope.label = 'Tên nhóm';
            $scope.title = 'Thêm nhóm';
            $scope.name = '';
            if (item) {
                $scope.name = item.name;
                $scope.title = 'Sửa tên nhóm';
            }

            $scope.cancel = function () {
                $mdDialog.hide();
            };

            $scope.hide = function (res) {
                $mdDialog.hide(res);
            };

            $scope.submit = function () {
                if ($scope.myForm.$valid === false) return;
                if (item) {
                    PN_PAGE.sectionLoading.show();
                    PN_PAGE.btnLoading.show();
                    $restful.put("/Collection", {
                        type: 2,
                        id: item.id,
                        name: $scope.name
                    }).then(function (res) {
                        PN_PAGE.sectionLoading.hide();
                        $scope.hide(res.data);
                    });
                } else {
                    PN_PAGE.sectionLoading.show();
                    PN_PAGE.btnLoading.show();
                    $restful.post("/Collection", {
                        type: 2,
                        name: $scope.name
                    }).then(function (res) {
                        PN_PAGE.sectionLoading.hide();
                        $scope.hide(res.data);
                    });
                }
            };
        }], function (res) {
            var locals = {
                coid: null
            }
            if (res) locals.coid = res;
            popupService.imageManagerShow(locals, function () { });
        });
    };

    $scope.changeGroup = function (coid) {
        if ($scope.imageSelect.length == 0) return;
        var move = {
            coid: coid,
            ids: $scope.imageSelect
        };

        PN_PAGE.sectionLoading.show();
        $restful.put("/file", move).then(function (result) {
            PN_PAGE.sectionLoading.hide();
            $("#managerImage .item.active").removeClass("active");    
            //PN_PAGE.showMessage("Đã chuyển nhóm!");
            $scope.query.page = 1;
            $scope.getImageInFolder(coid);
        });
    }
    $scope.changeCate = function (coid) {
        if ($scope.imageSelect.length == 0) return;
        var move = {
            coid: coid,
            ids: $scope.imageSelect
        };

        PN_PAGE.sectionLoading.show();
        $restful.put("/imagestock", move).then(function (result) {
            PN_PAGE.sectionLoading.hide();
            $("#managerImage .item.active").removeClass("active");    
            //PN_PAGE.showMessage("Đã chuyển nhóm!");
            $scope.queryStock.page = 1;
            $scope.getImageInFolder_Stock(coid);
        });
    }

    $scope.showChangeGroup = function () {
        var data = $scope.imageSelect;
        popupService.show('movePageInGroup.html', {
            imageSelect: data
        }, ['$scope', '$restful', '$mdDialog', 'popupService', 'imageSelect', function ($scope, $state, $mdDialog, popupService, imageSelect) {

            $scope.ladiMove = {
                coid: null,
                ids: imageSelect
            };
            $scope.newGroup = {
                type: 2,
                name: ''
            }

            $scope.cancel = function () {
                $mdDialog.hide();
            };
            $scope.hide = function (a) {
                 $mdDialog.hide($scope.ladiMove.coid);
            };
            $scope.init = function () {
                $restful.get("/collection", {
                    tid: 2
                }).then(function (result) {
                    $scope.listGroup = result.data;
                });
            }
            $scope.createGroupNew = function () {
                PN_PAGE.sectionLoading.show();
                $restful.post("/Collection", $scope.newGroup).then(function (result) {
                    PN_PAGE.sectionLoading.hide();
                    $scope.ladiMove.coid = result.data.id;
                    $scope.submit(result.data);
                });
            };

            $scope.submit = function (a) {
                PN_PAGE.sectionLoading.show();
                $restful.put("/file", $scope.ladiMove).then(function (result) {
                    PN_PAGE.sectionLoading.hide();
                    $scope.hide();
                });
            };
            }], function (res) {
                var locals = {
                    coid: null
                }
                if (res) locals.coid = res;
                popupService.imageManagerShow(locals, function () { });
        });
    };

    $scope.setActive = function (id, path) {
        var selectedImg = $('#managerImage .container-image-' + ($scope.image_from || 0) + ' .item[pn-active="' + id + '"]');
        if (selectedImg && selectedImg.length > 0) {
            if (selectedImg.hasClass("active")) {
                selectedImg.removeClass("active");
                var e = $.inArray(id, $scope.imageSelect);
                $scope.imageSelect.splice(e, 1);
            } else {
                selectedImg.addClass("active");
                $scope.imageSelect.push(id);
            }
        }
        $scope.imgSelect = path.replace("/s200x200/", "/");
    };

    $scope.applyImage = function (item) {
        $scope.hide(item.path);
        suggestService.setVal('image_folder', $scope.query.coid);
        //var path = $scope.apiPath + item.path.replace("/s200x200/", "/");
        
    }

    $scope.applyImage_Stock = function (item) {
        //var path = $scope.apiPath + item.path.replace("/s200x200/", "/");
        $scope.hide(item.path);//.replace($scope.apiPath,''));
    }

    $scope.hide = function (path) {
        $mdDialog.hide(path);
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };


}]);
