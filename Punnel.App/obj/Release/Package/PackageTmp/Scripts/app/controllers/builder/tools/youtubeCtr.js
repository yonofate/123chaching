angular.module("punnelApp").controller("youtubeCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", function (a, b, c, d, e) {
    c.urlVideo = "", c.idTMP = "";
    var f = "https://youtu.be/",
        g = "https://www.youtube.com/watch",
        h = "https://www.youtube.com/embed/";
    a.$watch(function () {
        if (selectedItem && selectedItem.length > 0 && c.idTMP != selectedItem.attr("id") && "videoyoutube" == selectedItem.attr("pn-type")) {
            c.idTMP = selectedItem.attr("id");
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.name = a.name, c.urlVideo = apiElement[b].link, c.autoPlay = apiElement[b].autoPlay, c.autoPlay || (c.autoPlay = "0", apiElement[b].autoPlay = "0"), c.hideTitle = apiElement[b].hideTitle, 0 != c.hideTitle && 1 != c.hideTitle && (c.hideTitle = 0, apiElement[b].hideTitle = 0), c.setHideTitle(c.hideTitle)
        }
    }), c.name = a.name,
        c.setValueUrl = function () {
        c.urlVideo.trim();
        var a = "",
            b = "";
        if (-1 != c.urlVideo.search(g)) {
            b = PN_PAGE.getNameParramUrl(c.urlVideo, "v");
            var d = PN_PAGE.getNameParramUrl(c.urlVideo, "list");
            a = "https://www.youtube.com/embed/" + b, d && d.length > 0 && (a += "?list=" + d)
        } else -1 != c.urlVideo.search(f) ? (b = c.urlVideo.replace(f, ""), a = "https://www.youtube.com/embed/" + b) : -1 != c.urlVideo.search(h) ? a = c.urlVideo : console.log("link không đúng");
        selectedItem.find(".widget-content").attr("src", a);
        var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[e].link = a, c.urlVideo = a, c.setHideTitle(c.hideTitle)
    }, c.setAutoPlay = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            var b = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            c.autoPlay = a, apiElement[b].autoPlay = a
        }
    }, c.setHideTitle = function (a) {
        if (selectedItem && selectedItem.length > 0) {
            for (var b = 0, d = 0; d < c.urlVideo.length; d++) "?" == c.urlVideo[d] && (b = 1);
            var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
            if (c.hideTitle = parseFloat(a), apiElement[e].hideTitle = parseFloat(a), 1 == b) {
                var f = c.urlVideo + "&showinfo=" + c.hideTitle;
                selectedItem.find(".widget-content").eq(0).attr("src", f)
            } else {
                var f = c.urlVideo + "?showinfo=" + c.hideTitle;
                selectedItem.find(".widget-content").eq(0).attr("src", f)
            }
        }
    }
}]);