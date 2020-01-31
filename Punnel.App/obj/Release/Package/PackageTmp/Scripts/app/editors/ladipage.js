var LandingPage = function () {
    this.debugreload = !1
};
LandingPage.prototype.onresizable = function () {
    var a = {
        animate: !1,
        minWidth: 100
    },
        b = $("[resizable]");
    b.resizable(a)
},
LandingPage.prototype.onbeforeunload = function () {
    window.onbeforeunload = function () {
        return "Your page doesn't save!"
    }
},
LandingPage.prototype.init = function () {
    this.onresizable(), this.debugreload && this.onbeforeunload()
};