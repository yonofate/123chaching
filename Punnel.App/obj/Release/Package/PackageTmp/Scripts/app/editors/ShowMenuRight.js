var ShowMenuRight = function() {};
ShowMenuRight.prototype.show = function(a) {
    void 0 != a && ($(".right-side .settings").removeClass("active"), $('.right-side .settings[pn-option = "options"]').addClass("active"))
};