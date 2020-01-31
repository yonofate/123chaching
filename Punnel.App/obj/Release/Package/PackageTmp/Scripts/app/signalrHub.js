(function ($) {
    $.ajax({
        url: "https://api.punnel.com/signalr/hubs",
        dataType: "script",
        async: false
    });
}(jQuery));