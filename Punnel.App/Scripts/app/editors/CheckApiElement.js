var CheckApiElement = function() {};
CheckApiElement.prototype.setValueInJson = function(a, b) {
    var c = PN_PAGE.getIndexElement(a.parent().attr("id"));
    for (var d in b) switch (d) {
        case "background-color":
            "color" == apiElement[c].bg_type && (a[0].style[d] = b[d]);
            break;
        case "background-image":
            "image" == apiElement[c].bg_type && (a[0].style[d] = b[d]);
            break;
        case "shadow-x":
            (void 0 == apiElement[c].media.desktop["shadow-color"] || "" == apiElement[c].media.desktop["shadow-color"]) && (apiElement[c].media.desktop["shadow-color"] = "#000000", apiElement[c].media.mobile["shadow-color"] = "#000000"), a.css({
                "box-shadow": b["shadow-x"] + " " + b["shadow-y"] + " " + b["shadow-blur"] + " " + apiElement[c].media.desktop["shadow-color"]
            });
            break;
        case "shadow-y":
            (void 0 == apiElement[c].media.desktop["shadow-color"] || "" == apiElement[c].media.desktop["shadow-color"]) && (apiElement[c].media.desktop["shadow-color"] = "#000000", apiElement[c].media.mobile["shadow-color"] = "#000000"), a.css({
                "box-shadow": b["shadow-x"] + " " + b["shadow-y"] + " " + b["shadow-blur"] + " " + apiElement[c].media.desktop["shadow-color"]
            });
            break;
        case "shadow-blur":
            (void 0 == apiElement[c].media.desktop["shadow-color"] || "" == apiElement[c].media.desktop["shadow-color"]) && (apiElement[c].media.desktop["shadow-color"] = "#000000", apiElement[c].media.mobile["shadow-color"] = "#000000"), a.css({
                "box-shadow": b["shadow-x"] + " " + b["shadow-y"] + " " + b["shadow-blur"] + " " + apiElement[c].media.desktop["shadow-color"]
            });
            break;
        default:
            a[0].style[d] = b[d]
    }
};