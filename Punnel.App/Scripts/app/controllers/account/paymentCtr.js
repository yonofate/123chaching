angular.module("punnelApp").controller("paymentCtr", ["$scope", "$restful", "$stateParams", function ($scope, $restful, $stateParams) {
    $scope.showQRCode = false;
    $scope.init = function () {
        PN_PAGE.loading.show();
        $restful.get("/invoice/payment", { code: $stateParams.id }).then(function (result) {
            PN_PAGE.loading.hide();
            $scope.data = result.data;
            $scope.payment_note = $scope.data.code;
        });
    }

    $scope.changePaymentType = function () {
        if ($scope.data.paymentType == 3) {
            $scope.submit();
        }
    }

    $scope.goBack = function () {
        $scope.data.paymentType = null;
        $scope.showQRCode = false;
    }

    $scope.submit = function () {
        PN_PAGE.loading.show();
        if ($scope.myForm.$valid == false) return;
        $restful.post("/invoice/payment-gate", $scope.data).then(function (rp) {
            PN_PAGE.loading.hide();
            //ATM
            if ($scope.data.paymentType == 1) {
                location.href = rp.data;
            //Credit Card
            } else if ($scope.data.paymentType == 2) {
                location.href = rp.data;
            } else if ($scope.data.paymentType == 3) {
                $scope.showQRCode = true;
                $scope.zptranstoken = rp.data.zptranstoken;
            }
        });
    }
}])
