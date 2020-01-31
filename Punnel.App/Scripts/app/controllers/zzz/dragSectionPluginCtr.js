angular.module("punnelApp").controller("dragSectionPluginCtr", ["$scope", "$restful", function($scope, $restful) {
  $scope.pluginSelect = "";
  $scope.start = 1;
  $scope.checkLoadMore = true;
  $scope.itemsSection = [];
  $restful.get("/cate", {
    type : 20
  }).then(function(result) {
      $scope.itemsCategory = result.data;
  });
  $restful.get("/template", {
    type : 20,
    limit : 30,
    is_publish : "1"
  }).then(function(result) {
    if (result.data) {
      $scope.itemsSection = result.data;
      if (result.data.length < 20) {
        $scope.checkLoadMore = false;
        clearInterval($scope.interval);
      }
    }
  });
  $scope.loadMoreItemLadipage = function() {
    $scope.interval = setInterval(function() {
      if ($scope.checkLoadMore) {
        $scope.start++;
        $restful.get("/template", {
          type : 20,
          cid : $scope.cate,
          page : $scope.start,
          limit : 30,
          is_publish : "1"
        }).then(function(result) {
            if (result.data && result.data.length > 0) {
              if (parseFloat(result.data.length) < 20 && ($scope.checkLoadMore = false, $scope.start = 1, clearInterval($scope.interval)), result.data.length > 0) {
                var d = 0;
                for (; d < result.data.length; d++) {
                  $scope.itemsSection.push(result.data[d]);
                }
              }
              setTimeout(function() {
                addNewSectiondrag();
              }, 500);
            } else {
              $scope.checkLoadMore = false;
              clearInterval($scope.interval);
            }
          });
      }
    }, 800);
  };
  clearInterval($scope.interval);
  $scope.loadMoreItemLadipage();
  $scope.addNewSource = function(source) {
    addNewSectiondrag();
  };
  $scope.getPositionSection = function(a, b) {
    var elementAdd = void 0;
    var vtAdd = "tren";
    var e = new AddToFrame;
    return elementAdd = e.eleAdd(false).parent(), {
      elementAdd : elementAdd,
      vtAdd : vtAdd
    };
  };
  $scope.changeCategory = function(cate) {
    $scope.start = 1;
    $scope.checkLoadMore = true;
      $scope.cate = cate;
    $restful.get("/template", {
      type : 20,
      limit : 30,
      cid : cate,
      is_publish : "1"
    }).then(function(result) {
      if (result.data) {
        $scope.itemsSection = result.data;
        $(".list-category").hide();
        if (result.data.length < 20) {
          $scope.checkLoadMore = false;
          clearInterval($scope.interval);
        }
        setTimeout(function() {
          addNewSectiondrag();
        }, 500);
      } else {
          PN_PAGE.messageLadi("Vui l\u00f2ng ki\u1ec3m tra k\u1ebft n\u1ed1i ho\u1eb7c li\u00ean h\u1ec7 v\u1edbi ch\u00fang t\u00f4i!");
      }
    });
    clearInterval($scope.interval);
    $scope.loadMoreItemLadipage();
  };
  $scope.showListCategory = function() {
    $(".list-category").show();
  };
  $scope.getSource = function(id) {
    localStorage.setItem("source", $scope.itemsSection[id].source);
    PN_PAGE.account.source = $scope.itemsSection[id].source;
  };
}]);
