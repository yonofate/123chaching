angular.module("punnelApp").controller("customFontFamilyCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function($rootScope, $state, $scope, $translate, $stateParams) {
  $scope.itemsFont = pn_fonts;
  $translate.use(localStorage.getItem("lang"));
  $scope.idTMP = "";
  $rootScope.$watch(function() {
    if (void 0 != selectedItem && selectedItem.length > 0 && $scope.idTMP != selectedItem.attr("id") && "GROUP_TMP" != selectedItem.attr("id")) {
      $scope.idTMP = selectedItem.attr("id");
      var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
      var font = apiElement[media_id].media.font_family;
      if (void 0 == font || "" == font) {
        font = "Open Sans";
      }
      $(".dialog.settings.font-family.active .content .list li").removeClass("active");
      $('.dialog.settings.font-family.active .content .list li[pn-add-active="' + font + '"]').addClass("active");
      $scope.fontSelect = apiElement[media_id].media.font_family;
      if (void 0 == $scope.fontSelect || "" == $scope.fontSelect || null == $scope.fontSelect) {
        $scope.fontSelect = "Open Sans";
        apiElement[media_id].media.font_family = "Open Sans";
      }
    }
  });
  
  $scope.setValueFont = function(lp_type_font, font_family, font_weight, font_name) {
    if (selectedItem && selectedItem.length > 0) {
      var contentEditor = $("#ID_BOX_EDITOR .contentEditor");
      var type_font = selectedItem.attr("pn-type-font");
      var media_id = PN_PAGE.getIndexElement(selectedItem.attr("id"));
      selectedItem.find(".widget-content").eq(0).removeClass(type_font);
      selectedItem.find(".widget-content").eq(0).css({
        "font-family" : font_family,
        "font-weight" : font_weight
      });
      selectedItem.attr("pn-type-font", lp_type_font);
      apiElement[media_id].media.font_family = font_family;
      apiElement[media_id].media.classFont = lp_type_font;
      apiElement[media_id].media.font_weight = font_weight;
      apiElement[media_id].media.font_name = font_name;
      var viewModel = new OptionWiget;
      if (viewModel.resetValueHeightText(selectedItem), "menu-header" == selectedItem.attr("pn-type")) {
        var syncedAnimals = selectedItem.find('.widget-item-child[pn-type="item_menu"]');
        if (void 0 != syncedAnimals && syncedAnimals.length > 0) {
          syncedAnimals.each(function() {
            var READONLY_CLS = $(this).attr("pn-type-font");
            var media_id = PN_PAGE.getIndexElement($(this).attr("id"));
            $(this).find(".widget-content").eq(0).removeClass(READONLY_CLS);
            $(this).find(".widget-content").eq(0).css({
              "font-family" : font_family,
              "font-weight" : font_weight
            });
            $(this).attr("pn-type-font", lp_type_font);
            apiElement[media_id].media.font_family = font_family;
            apiElement[media_id].media.classFont = lp_type_font;
            apiElement[media_id].media.font_weight = font_weight;
            apiElement[media_id].media.font_name = font_name;
          });
        }
      }
      contentEditor.contents().find("body .widget-content").eq(0).attr("contenteditable", "true");
    }
  };
  
  $scope.addClassActive = function(is_active) {
    $(".dialog.settings.font-family.active .list ul li.active").removeClass("active");
    $('.dialog.settings.font-family.active .list ul li[pn-add-active="' + is_active + '"]').addClass("active");
  };
  
  $scope.close = function() {
    if (void 0 != selectedItem) {
      if ("textinline" == selectedItem.attr("pn-type") || "textparagraph" == selectedItem.attr("pn-type") || "button" == selectedItem.attr("pn-type") || "textsymbol" == selectedItem.attr("pn-type")) {
        $('.settings[pn-setting="custom-event"]').addClass("active");
      } else {
        if ("menu-header" == selectedItem.attr("pn-type")) {
          $(".pn-custom-menu").addClass("active");
        } else {
          var lp_type = selectedItem.attr("pn-type");
          $(".settings").removeClass("active");
          $('.settings[pn-setting="' + lp_type + '"]').addClass("active");
        }
      }
      var _this = new OptionWiget;
      _this.addElementUndo("", selectedItem);
    } else {
      $(".settings.active").removeClass("active");
    }
    savedSel = "";
    fadeOutAnimate($(".ngdialog.custom_font"));
  };
}]);
