angular.module("punnelApp").controller("sendMailCtrl", ["$scope", "$auth", "$state", "$stateParams", "$restful", function ($scope, $auth, $state, $stateParams, $restful) {
    $scope.profile = $auth.getProfile();
    $scope.templates = [];
    $scope.leadId = $stateParams.id;

    $scope.variants = [{ n: '{#NAME}', v: 'Tên' }, { n: '{#FULLNAME}', v: 'Họ tên' }, { n: '{#DOMAIN}', v: 'Landing Page' }, { n: '{#REGION}', v: 'Tỉnh/thành' }, { n: '{#CODE}', v: 'Mã Code' }];

    $scope.detail = {
        receiveName: '',
        sendTo:'',
        sendName: $scope.profile.full_name,
        replyTo: $scope.profile.email,
        title: '',
        bodyHtml: '<p>Ch&agrave;o {#NAME},</p> <p>&nbsp;</p> <p>Cảm ơn {#NAME} đ&atilde; đăng k&iacute; tr&ecirc;n trang {#DOMAIN} !</p> <p>M&igrave;nh xin gửi bạn m&atilde; code giảm gi&aacute; kh&oacute;a học online tr&ecirc;n website abc.com</p> <p>Bạn vui l&ograve;ng nhập m&atilde; code sau khi đăng k&iacute; kh&oacute;a học để được giảm gi&aacute; 50% : <strong>{#CODE} </strong></p> <p>&nbsp;</p> <p>P/s: Nếu c&oacute; thắc mắc vui l&ograve;ng gọi: 0909.xxx.xxx</p> <p>&nbsp;</p> <p>Tr&acirc;n trọng,</p> <p>&nbsp;</p>'
    }


    $scope.initData = function () {
        if ($scope.leadId && $scope.leadId.length > 0) {
            getInfoLead();
            $scope.template.fetchData();
        }
    }

    $scope.template = {
        id: null,
        fetchData: function () {
            getTemplates();
        },
        change: function () {
            getTemplateDetail($scope.template.id);
        }
    }

    function getTemplates() {
        $scope.templates = [];
        PN_PAGE.loading.show();
        $restful.get("/emailtemplate").then(function (res) {
            PN_PAGE.loading.hide();
            $scope.templates = res.data;
        });
    }

    function getInfoLead() {
        $scope.templates = [];
        PN_PAGE.loading.show();
        $restful.get("/lead", { lid: $scope.leadId }).then(function (res) {
            PN_PAGE.loading.hide();
            $scope.detail.receiveName = res.data.fullName;
            $scope.detail.sendTo = res.data.email;
        });
    }

    function getTemplateDetail(id) {
        PN_PAGE.loading.show();
        $restful.get("/emailTemplate", {id:id}).then(function (res) {
            PN_PAGE.loading.hide();
            $scope.detail.sendName = res.data.sendName;
            $scope.detail.replyTo = res.data.replyTo;
            $scope.detail.title = res.data.title;
            $scope.detail.bodyHtml = res.data.bodyHtml;
        });
    }

    $scope.submit = function () {
        if ($scope.myForm.$valid == false) return;
        PN_PAGE.loading.show();
        var model = {
            leadIds: $scope.leadId,
            templateId: $scope.template.id
        }
        $restful.post("/campain/sendmail", model).then(function (res) {
            PN_PAGE.loading.hide();
            swal('', 'Đã gửi!', 'success');
        });
    }

    $scope.goBack = function () {
        $state.go('dashboard.lead');
    }
}]);