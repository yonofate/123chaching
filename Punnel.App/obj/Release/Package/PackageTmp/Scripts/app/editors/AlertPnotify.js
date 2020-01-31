var AlertPnotify = function() {};
AlertPnotify.prototype.alert = function(a) {
    $(".saving").css({
        display: "none"
    })
},
AlertPnotify.prototype.createMessage = function (a) {
    var b = "";
    b = b + '<div class="messageAlert" style="position: absolute; z-index: 99999999999; background: #FFB74D; color: #fff;bottom:0; right:0; width: 400px; min-height: 60px; padding: 15px;">' + a + "</div>", $("body .messageAlert").remove(), $("body").append(b), setTimeout(function() {
        $("body .messageAlert").remove()
    }, 2e3)
};