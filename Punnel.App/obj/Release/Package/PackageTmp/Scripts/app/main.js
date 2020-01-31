
var _onPaste_StripFormatting_IEPaste = false;

function OnPaste_StripFormatting(elem, e) {
    e.preventDefault();
    var text = '';
    if (e.originalEvent && e.originalEvent.clipboardData && e.originalEvent.clipboardData.getData) {
        text = e.originalEvent.originalEvent.clipboardData.getData('text/plain');
        text = text.replace(/(?:\r\n|\r|\n)/g, '');
        window.document.execCommand('insertText', false, text);
    } else if (e.clipboardData && e.clipboardData.getData) {
        text = e.clipboardData.getData('text/plain');
        text = text.replace(/(?:\r\n|\r|\n)/g, '');
        window.document.execCommand('insertText', false, text);
    } else if (window.clipboardData && window.clipboardData.getData) {
        text = window.clipboardData.getData('text/plain');
        text = text.replace(/(?:\r\n|\r|\n)/g, '');
        if (!_onPaste_StripFormatting_IEPaste) {
            _onPaste_StripFormatting_IEPaste = true;

            window.document.execCommand('ms-pasteTextOnly', false);

            _onPaste_StripFormatting_IEPaste = false;
        }
    }
}
        window.intercomSettings = {
            app_id: "pvof7mzc"
    };

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip(); 
            function a() {
                var a = $("body > #wrapper").height() - 61;
                $(".sidebard-panel").css("min-height", a + "px");
                var b = $("nav.navbar-default").height(),
                    c = $("#page-wrapper").height();
                b > c && $("#page-wrapper").css("min-height", b + "px"), c > b && $("#page-wrapper").css("min-height", $(window).height() + "px")
            }
            $(window).bind("load resize scroll", function () {
            $("body").hasClass("body-small") || a()
        }), setTimeout(function () {
            a()
        })
    }),
            $(function () {
            $(window).bind("load resize", function () {
                $(this).width() < 769 ? $("body").addClass("body-small") : $("body").removeClass("body-small")
            })
        });
        var json = {
            ten: "Trang chủ"
    }