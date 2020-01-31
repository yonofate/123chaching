angular.module("punnelApp").controller("customSettingPopupCtr", ["$scope", "$mdDialog", "locals", function ($scope,$mdDialog, locals) {
    var selectedItem = locals.selectedItem;
    $scope.options = {
        id: null,
        isOnOpen: false,
        isOnExit: false,
        onSection: '',
        delay: 0,
        tracking:'',
        trackingHeader: '',
        trackingBody: '',
        urlPop:''
    }

    $scope.aceOption = {
        mode: 'javascript',
        useWrapMode: true,
        showGutter: true,
        onLoad: function (editor) {
            var len = editor.session.getValue().length;
            var node = editor.renderer.emptyMessageNode;
            if (len > 0 && node) {
                editor.renderer.scroller.removeChild(editor.renderer.emptyMessageNode);
                editor.renderer.emptyMessageNode = null;
            } else if (len == 0 && node == undefined) {
                node = editor.renderer.emptyMessageNode = document.createElement("div");
                node.textContent = "Nhập mã tracking tại đây.."
                node.className = "ace_invisible ace_emptyMessage"
                node.style.padding = "0 9px"
                editor.renderer.scroller.appendChild(node);
            }
        },
        onChange: function (e) {
            var r = e[1].renderer;
            r.scroller.removeChild(r.emptyMessageNode);
            r.emptyMessageNode = null;
        }
    };

    $scope.sections = [];
    $scope.headerTrackingCodes = locals.itemTracking;

    $scope.loadSetting = function () {
        $scope.options.id = selectedItem.attr("id");
        var idx = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        $scope.options.trackingHeader = apiElement[idx].trackingPopHead || '';
        $scope.options.trackingBody = apiElement[idx].trackingPopBody || '';
        $scope.options.isOnOpen = apiElement[idx].showPopupPage == '1';
        $scope.options.delay = apiElement[idx].delayShowPopupPage || 0;
        $scope.options.isOnExit = apiElement[idx].showPopupExitPage =='1';

        getSections();
        $scope.options.onSection = apiElement[idx].idShowScroll || '';
        $scope.options.urlPop = "/" + selectedItem.attr("id").toLowerCase() + "-thanks.html";
    }

    function getSections() {
        $scope.sections = [];
        var sections = $("#punnel-editor .widget-section");
        if (sections && sections.length > 0) {
            $scope.sections.push({id:''});
            sections.each(function () {
                if ("true" != $(this).attr("pn-popup")) {
                    var item = {
                        id: $(this).attr("id")
                    };
                    $scope.sections.push(item);
                }
            });
        }
    };
    $scope.addTrackingHeader = function (value) {
        var txt = value;//"<script>" + value + "</script>";
        $scope.options.trackingHeader += txt;
    };

    $scope.selectSection = function (value) {
        //if ($scope.options.onSection && $scope.options.onSection.length > 0) {
        //    $scope.options.isOnOpen = false;
        //    $scope.options.isOnExit = false;
        //}
    }

    $scope.saveSettingPopup = function () {
        //if ($scope.options.onSection && $scope.options.onSection.length > 0) {
        //    $scope.options.isOnOpen = false;
        //    $scope.options.isOnExit = false;
        //}
        $scope.hide($scope.options);
    };

    $scope.hide = function (res) {
        $mdDialog.hide(res);
    };

    $scope.cancel = function () {
        $mdDialog.cancel();
    };
}]);
