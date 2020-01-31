angular.module("punnelApp").controller("addTemplateCtrl", ["$scope", "$restful", "$mdDialog", function ($scope, $restful, $mdDialog) {
    $scope.activeCate = null;
    $scope.pluginSelect = "";
    $scope.type = 0;
    $scope.templateCates = [];
    $scope.templates = [];
    $scope.totalItems = 0;

    $scope.query = {
        type: 0,
        status: 2,
        cid: null,
        page: 1,
        limit: 19,
        status: 2,
        me: false
    };

    function getCates() {
        PN_PAGE.loading.show();
        $restful.get("/cate", {
            type: $scope.query.type
        }).then(function (result) {
            PN_PAGE.loading.hide();
            $scope.templateCates = result.data;
        });
    }

    function getTemplate(type, cid) {
        PN_PAGE.loading.show();
       
        if ($scope.query.cid === 'me') {
            $scope.query.cid = null;
            $scope.query.me = true;
            $scope.query.status = null;
        } else {
            $scope.query.me = false;
            $scope.query.status = 2;
        }
        $restful.get("/template", $scope.query).then(function (result) {
            PN_PAGE.loading.hide();
            $scope.templates = result.data.data;
            $scope.totalItems = result.data.total;
        });
    }

    $scope.init = function (type) {
        $scope.query.type = type;
        getCates();
        getTemplate();
    }

    $scope.getByCate = function (cid) {
        $scope.query.page = 1;
        $scope.query.cid = cid;
        getTemplate();
    }

    $scope.pageChanged = function () {
        getTemplate();
    }

    $scope.popupTemplate = {
        addSource: function (id, src) {
            var $existing_results = $('#punnel-editor .widget-section[pn-popup="true"]');
            if ($existing_results && $existing_results.length > 0 && 30 == typeAddNew) {
                PN_PAGE.showMessage("Không thêm popup vào popup", 'alert');
            } else {
                var f = $(".resizable-popup").attr("pn-id-popup");
                if (f && f.length > 0) {
                    $("#punnel-editor #" + f).hide();
                }
                $(".resizable-popup").attr("pn-id-popup", "").hide();
                $scope.pluginSelect = id;
                PN_PAGE.loading.show();
                $restful.get("/template", {
                    id: id
                }).then(function (result) {
                    PN_PAGE.loading.hide();
                    if (PN_PAGE.account.source = result.data.source, addNewSourceSection(PN_PAGE.account.source), showAddNewSection(), PN_PAGE.idShowPopup && PN_PAGE.idShowPopup.length > 0 && selectedItem && "true" == selectedItem.attr("pn-popup")) {
                        var j = PN_PAGE.getIndexElement(PN_PAGE.idShowPopup);
                        var $deepPage = $("#punnel-editor #" + PN_PAGE.idShowPopup);
                        if ("contact_form" == $deepPage.attr("pn-type")) {
                            apiElement[j].idPopupSub = selectedItem.attr("id");
                        } else {
                            apiElement[j].type_link = "popup";
                            apiElement[j].element_popup = selectedItem.attr("id");
                            apiElement[j].link_popup = selectedItem.attr("id");
                            apiElement[j].action = selectedItem.attr("id");
                        }
                    }
                    PN_PAGE.idShowPopup = "";
                    $scope.hide();
                    var currentDownloadRequest = new TreeWidget;
                    currentDownloadRequest.layer();
                });
            }
        },
        addBlank: function () {
            var $existing_results = $('#punnel-editor .widget-section[pn-popup="true"]');
            if ($existing_results && $existing_results.length > 0 && 30 == typeAddNew) {
                PN_PAGE.showMessage("Không thể thêm popup vào popup", 'alert');
            } else {
                var b = $(".resizable-popup").attr("pn-id-popup");
                if (b && b.length > 0) {
                    $("#punnel-editor #" + b).hide();
                }
                $(".resizable-popup").attr("pn-id-popup", "").hide();
                var c = new OptionWiget;
                c.addSectionEmpty(false, pageMouseX, pageMouseY, "widget-popup");
            }
            if (showAddNewSection(), PN_PAGE.idShowPopup && PN_PAGE.idShowPopup.length > 0 && selectedItem && "true" == selectedItem.attr("pn-popup")) {
                var index = PN_PAGE.getIndexElement(PN_PAGE.idShowPopup);
                var popupId = $("#punnel-editor #" + PN_PAGE.idShowPopup);
                if ("contact_form" == popupId.attr("pn-type")) {
                    apiElement[index].idPopupSub = selectedItem.attr("id");
                } else {
                    apiElement[index].type_link = "popup";
                    apiElement[index].element_popup = selectedItem.attr("id");
                    apiElement[index].link_popup = selectedItem.attr("id");
                    apiElement[index].action = selectedItem.attr("id");
                }
            }
            PN_PAGE.idShowPopup = "";
            $scope.hide();
            var currentDownloadRequest = new TreeWidget;
            currentDownloadRequest.layer();
        }
    }

    $scope.sectionTemplate = {
        addSource: function (id) {
            $scope.pluginSelect = id;
            PN_PAGE.loading.show();
            $restful.get("/template", {
                id: id
            }).then(function (result) {
                PN_PAGE.loading.hide();
                PN_PAGE.account.source = result.data.source;
                addNewSourceSection(PN_PAGE.account.source);
                showAddNewSection();
                $scope.hide();
                var currentDownloadRequest = new TreeWidget;
                currentDownloadRequest.layer();
            });
        },
        addBlank: function () {
            var a = new AddToFrame;
            a.themDoanTrang();
            $scope.hide();
            var currentDownloadRequest = new TreeWidget;
            currentDownloadRequest.layer();
        }
    }


    $scope.getPositionSection = function (a, b) {
        var elementAdd = void 0;
        var vtAdd = "tren";
        var e = new AddToFrame;
        return elementAdd = e.eleAdd(false).parent(), {
            elementAdd: elementAdd,
            vtAdd: vtAdd
        };
    };

    $scope.hide = function () {
        $mdDialog.hide();
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}]);
