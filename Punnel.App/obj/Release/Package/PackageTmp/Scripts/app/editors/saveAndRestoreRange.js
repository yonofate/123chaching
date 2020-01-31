
//var saveAndRestoreRange = function() {},
//    lp_range;
//saveAndRestoreRange.prototype.saveRange = function() {
//    window.getSelection ? (sel = window.getSelection(), sel.getRangeAt && sel.rangeCount && (lp_range = sel.getRangeAt(0))) : lp_range = document.selection && document.selection.createRange ? document.selection.createRange() : null
//},
//saveAndRestoreRange.prototype.restorRange = function () {
//    lp_range && (window.getSelection ? (sel = window.getSelection(), sel.removeAllRanges(), sel.addRange(lp_range)) : document.selection && range.select && lp_range.select())
//};
var saveAndRestoreRange = function () { },
    lp_range;
saveAndRestoreRange.prototype.saveRange = function () {
    window.getSelection ? (sel = window.getSelection(), sel.getRangeAt && sel.rangeCount && (lp_range = sel.getRangeAt(0))) : lp_range = document.selection && document.selection.createRange ? document.selection.createRange() : null
}, saveAndRestoreRange.prototype.selectAllElement = function (a) {
    if (document.body.createTextRange) {
        var b = document.body.createTextRange();
        b.moveToElementText(a), b.select()
    } else if (window.getSelection) {
        var c = window.getSelection(),
            b = document.createRange();
        b.selectNodeContents(a), c.removeAllRanges(), c.addRange(b)
    }
}, saveAndRestoreRange.prototype.restorRange = function () {
    lp_range && (window.getSelection ? (sel = window.getSelection(), sel.removeAllRanges(), sel.addRange(lp_range)) : document.selection && range.select && lp_range.select())
}, saveAndRestoreRange.prototype.convertStringToAnimated = function (a) {
    var b = [];
    return Boolean(a) && a.trim().split("\n").forEach(function (a) {
        a.trim().length > 0 && b.push(a.trim())
    }), JSON.stringify(b)
}, saveAndRestoreRange.prototype.convertAnimatedToString = function (a) {
    var b = "";
    if (Boolean(a)) try {
        var c = JSON.parse(a);
        c.forEach(function (a) {
            a.trim().length > 0 && ("" != b && (b += "\n"), b += a.trim())
        })
    } catch (d) {
        b = a
    }
    return b
}, saveAndRestoreRange.prototype.setAnimatedHeadline = function (a, b, c, d) {
    function e(a, b) {
        if (a += "", b += "", b.length <= 0) return a.length + 1;
        var c = b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
        return (a.match(new RegExp(c, "gi")) || []).length
    }
    if (lp_range) {
        if (a) return d.forEach(function (b) {
            $(a).removeClass(b.name)
        }), $(a).addClass(b).attr("data-type", b), $(a).find(".pn-text-word").attr("data-word", c), a;
        var f = lp_range.extractContents(),
            g = document.createElement("span");
        g.className = "pn-text-word", g.appendChild(f), $(g).attr("data-word", c), $(g).find(".pn-text-word").removeClass("pn-text-word").removeAttr("data-word"), d.forEach(function (a) {
            $(g).find(".pn-text-animated." + a.name).removeClass(a.name)
        }), $(g).find(".pn-text-animated").removeClass("pn-text-animated").removeAttr("data-type"), e($(g).html(), "style=") == e($(g).html(), 'style=""') && $(g).text($(g).text());
        var h = document.createElement("span");
        return h.className = "pn-text-animated " + b, h.appendChild(g), $(h).attr("data-type", b), lp_range.insertNode(h), h
    }
};