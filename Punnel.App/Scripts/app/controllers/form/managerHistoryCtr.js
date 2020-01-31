angular.module("punnelApp").controller("managerHistoryCtr", ["$auth", "$scope", "$stateParams", "$timeout", "$restful", "$state", "$window", function($auth, $scope, $stateParams, $timeout, $restful, $state, $window) {
  $scope.listHistory = [];
  $scope.idLadi = $stateParams.id;
  $scope.getListHistory = function() {
    $restful.get("/history", {
      id : $stateParams.id
    }, function(err, result) {
      if (result && 200 == result.code) {
        $scope.listHistory = result.data;
      }
    });
  };
  $scope.getListHistory();
  $scope.restorePunnel = function(id) {
    swal({
      title : "Kh\u00f4i ph\u1ee5c",
      text : "Landing Page c\u1ee7a b\u1ea1n s\u1ebd \u0111\u01b0\u1ee3c kh\u00f4i ph\u1ee5c, h\u00e3y l\u01b0u l\u1ea1i b\u1ea3n \u0111ang ch\u1ec9nh s\u1eeda!",
      type : "warning",
      showCancelButton : true,
      confirmButtonColor : "#DD6B55",
      confirmButtonText : "\u0110\u1ed3ng \u00fd",
      cancelButtonText : "H\u1ee7y"
    }, function(res) {
      if (res) {
        $("#managerHistory").modal("hide");
        $(".loading").css({
          opacity : "0.4"
        }).show();
        $scope.getSourceHistory(id);
      }
    });
  };
  $scope.getSourceHistory = function(name) {
    $restful.post("/Landingpage/RestoreHistory", {
      id : $stateParams.id,
      name : name
    }, function(err, res) {
      if (res && 200 == res.code) {
        $(".loading").css({
          opacity : "0.4"
        }).hide();
        $state.reload();
      }
    });
  };
  var self = this;
  self.reGetPunnelHistory = function() {
    //$scope.getListHistory();
  };
  $window.angularControllerreGetPunnelHistory = self.reGetPunnelHistory;
}]);
