angular.module("punnelApp").controller("emailTemplateCtrl", ["$scope", "$auth", "$state", "$stateParams", "$restful", "$filter", function ($scope, $auth, $state, $stateParams, $restful, $filter) {
    $scope.profile = $auth.getProfile();
    $scope.templates = [];

    $scope.useremail = {
        integration_emails: [],
        selected:[],
        init: function () {
            PN_PAGE.dbLoading.show();
            $restful.get("/integration/gmail").then(function (res) {
                PN_PAGE.dbLoading.hide();
                $scope.useremail.integration_emails = res.data;
                if ($stateParams.id == 0) return;
                if ($scope.detail && $scope.detail.sendFromType && $scope.detail.sendFromType == 1 && $scope.detail.fromEmails && $scope.detail.fromEmails.length > 0) {
                    var email_selected = JSON.parse($scope.detail.fromEmails);
                    angular.forEach(email_selected, function (v, i) {
                        $scope.useremail.selected.push(v.id);
                        var u = $filter('filter')($scope.useremail.integration_emails, function (d) { return d.id === v.id; });
                        if (u.length > 0) {
                            u[0].name = v.name;
                        }
                    });
                }
            });
        },
        toggle: function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        },
        exists : function (item, list) {
            return list.indexOf(item) > -1;
        }
    }

    $scope.usersms = {
        integration_sms: [],
        selected: [],
        init: function () {
            PN_PAGE.dbLoading.show();
            $restful.get("/integration/sms-mos").then(function (res) {
                PN_PAGE.dbLoading.hide();
                $scope.usersms.integration_sms = res.data;
                if ($stateParams.id == 0) return;
                if ($scope.detail && $scope.detail.sendFromType && $scope.detail.sendFromType == 1 && $scope.detail.fromSms && $scope.detail.fromSms.length > 0) {
                    var sms_selected = JSON.parse($scope.detail.fromSms);
                    angular.forEach(sms_selected, function (v, i) {
                        $scope.usersms.selected.push(v.id);
                        var u = $filter('filter')($scope.usersms.integration_sms, function (d) { return d.id === v.id; });
                        if (u.length > 0) {
                            u[0].name = v.name;
                        }
                    });
                }
            });
        },
        toggle: function (item, list) {
            var idx = list.indexOf(item);
            if (idx > -1) {
                list.splice(idx, 1);
            }
            else {
                list.push(item);
            }
        },
        exists: function (item, list) {
            return list.indexOf(item) > -1;
        }
    }

    $scope.search = function () {
        getTemplates();
    };

    function getTemplates() {
        $scope.templates = [];
        PN_PAGE.dbLoading.show();
        $restful.get("/emailtemplate").then(function (res) {
            PN_PAGE.dbLoading.hide();
            $scope.templates = res.data;
        });
    }

    $scope.delete = function (id,index) {
        swal({
            title: "Xóa mẫu Email!",
            text: "Xóa mẫu email đồng thời hủy bỏ trả lời email tự động đối với landing page đang sử dụng nó",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "\u0110\u1ed3ng \u00fd",
            cancelButtonText: "Kh\u00f4ng x\u00f3a",
            closeOnConfirm: true
        }, function (value) {
            if (value == true) {
                PN_PAGE.loading.show();
                $restful.delete("/emailtemplate", { id: id }).then(function (res) {
                    PN_PAGE.loading.hide();
                    $scope.templates.splice(index, 1);
                    swal('', 'Đã xóa!', 'success');
                    return;
                });
            }
            });
    }


    $scope.tinymceOptions = {
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | forecolor backcolor emoticons | bullist numlist outdent indent | link image preview",
        //toolbar2: "preview | forecolor backcolor emoticons",
        image_advtab: true,
        entity_encoding: "raw",
        image_class_list: [{ title: 'None', value: '' }, { title: 'Responsive', value: 'cms-img-auto' }],
        height: "400px",
        width: "100%"
    };

    $scope.variants = [{ n: '{#NAME}', v: 'Tên' }, { n: '{#FULLNAME}', v: 'Họ tên' }, { n: '{#DOMAIN}', v: 'Landing Page' }, { n: '{#REGION}', v: 'Tỉnh/thành' }, { n: '{#CODE}', v: 'Mã Code' }];
    //$scope.variantOptions = [{ i: 1, n: 'Họ tên' }, { i: 2, n: 'Domain' }, { i: 3, n: 'Khu vực' }, {i:4, n:'Auto Code'}];
    $scope.detail = {
        id: 0,
        type:1,
        sendName: $scope.profile.full_name,
        replyTo: $scope.profile.email,
        name: '',
        title: '',
        sendFromType:0,
        bodyHtml: ''
    }

    $scope.goBack = function () {
        $state.go('dashboard.emailTemplate');
    }

    $scope.gotoDetail = function (id, type) {
        if (type == 1) {
            $state.go('dashboard.emailTemplateDetail', {
                id: id
            });
        } else {
            $state.go('dashboard.smsTemplateDetail', {
                id: id
            });
        }
    }

    $scope.initDetail = function (type) {
        var id = $stateParams.id;
        getDetail(id,type);
    }

    function getDetail(id,type) {  
        if (id == 0) {
            $scope.detail.type = type;
            if (type == 1) $scope.useremail.init();
            if (type == 2) $scope.usersms.init();
        } else if (id > 0) {
            PN_PAGE.dbLoading.show();
            $restful.get("/emailTemplate", { id: id }).then(function (res) {
                PN_PAGE.dbLoading.hide();
                $scope.detail = res.data;
                if (type == 1) $scope.useremail.init();
                if (type == 2) $scope.usersms.init();
            });
        }
    }

    $scope.submitDetail = function () {
        if ($scope.myForm.$valid == false) return;
        PN_PAGE.loading.show();
        if ($scope.detail.sendFromType == 1) {
            if ($scope.detail.type == 1) {
                var user_emails = $.grep($scope.useremail.integration_emails, function (item) {
                    return $scope.useremail.selected.indexOf(item.id) > -1;
                });
                $scope.detail.fromEmails = JSON.stringify(user_emails);
            } else if ($scope.detail.type == 2) {
                var user_sms = $.grep($scope.usersms.integration_sms, function (item) {
                    return $scope.usersms.selected.indexOf(item.id) > -1;
                });
                $scope.detail.fromSms = JSON.stringify(user_sms);
            }
        } 

        $restful.post("/emailTemplate", $scope.detail).then(function (res) {
            PN_PAGE.loading.hide();
            swal('', 'Đã lưu!', 'success');
        });
    }
}]);