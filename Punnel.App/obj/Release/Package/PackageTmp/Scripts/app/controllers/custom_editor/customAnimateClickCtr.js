angular.module("punnelApp").controller("customAnimateClickCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.items = lp_animation, c.animate = "", d.use(localStorage.getItem("lang")), c.showContent = function (a) {
        $('input.cmn-toggle[pn-check="' + a + '"]').is(":checked") ? $('.dialog.settings.animation-setting ul[pn-show-content="' + a + '"]').show() : $('.dialog.settings.animation-setting ul[pn-show-content="' + a + '"]').hide()
    }, c.startAnimate = function () {
        $("#test_animate").removeClass().addClass(c.animate + " animated").one("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend", function () {
            $(this).removeClass()
        })
    }
}]);