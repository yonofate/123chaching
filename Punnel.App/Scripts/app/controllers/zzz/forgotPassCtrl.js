angular.module("punnelApp").controller("forgotPassCtrl", ["$scope", "$http", "$timeout", "$translate", "$restful", "$state", "$window", function($scope, $http, $timeout, $translate, $restful, $state, $window) {
  if (interval) {
    clearInterval(interval);
    }
    if (PN_PAGE.useIntercom === 1) {
        Intercom("shutdown");
        var event = {
            app_id: "pvof7mzc",
            source: "web punnel"
        };
        Intercom("boot", event);
    }
  $translate.use(localStorage.getItem("lang"));
  $scope.user_email = "";
  $scope.forgotpassUser = function(data) {
    $(data.target).attr("disabled", "true");
    $(data.target).attr("value", "Vui l\u00f2ng \u0111\u1ee3i...");
    if ($scope.formSubmit.$valid) {
      $restful.post("/auth/forgot-password", {
        email : $scope.user_email
      }, function(err, result) {
        $(data.target).removeAttr("disabled");
        $(data.target).attr("value", "L\u1ea5y l\u1ea1i m\u1eadt kh\u1ea9u");
        if (err) {
          PN_PAGE.messageLadi(err.message);
        } else {
          if (result && 200 == result.code) {
            PN_PAGE.messageLadi("Truy c\u1eadp email v\u1eeba \u0111\u0103ng k\u00fd \u0111\u1ec3 \u0111\u01b0\u1ee3c h\u01b0\u1edbng d\u1eabn t\u1ea1o m\u1eadt kh\u1ea9u m\u1edbi!", function() {
              $state.go("auth.login");
            });
          } else {
            if (result) {
              PN_PAGE.messageLadi(result.messager);
            } else {
              PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
            }
          }
        }
      });
    } else {
      $(data.target).removeAttr("disabled");
      $(data.target).attr("value", "L\u1ea5y l\u1ea1i m\u1eadt kh\u1ea9u");
    }
  };
  $scope.submitForm = function(data) {
    var c = data.which || data.keyCode;
    if (13 === c) {
      $scope.forgotpassUser(data);
    }
  };
  $scope.goLogin = function() {
    $state.go("auth.login");
  };
  $scope.goRegister = function() {
      $state.go("auth.register");
  };
}])
