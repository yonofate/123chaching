
$(document).ready(function () {
$('.desktop-view').on('click', function () {
    $("#preview_container").css({
        "width": "100%",
        "margin": "0px auto"
    });
    $('.list-menu > li').removeClass();
    $(this).parent().addClass('active');
});

$('.mobile-view').on('click', function () {
    $("#preview_container").css({
        "width": "385px",
        "margin": "0px auto"
    });
    $('.list-menu > li').removeClass();
    $(this).parent().addClass('active');
});
    console.log("ready!");
});