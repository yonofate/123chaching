var SelectRangeText = function() {};
SelectRangeText.prototype.selectRange = function(a) {
    var b = document.createRange(),
        c = window.getSelection();
    b.setStart(a, 1), b.collapse(!0), c.removeAllRanges(), c.addRange(b)
},
SelectRangeText.prototype.selectAllText = function (a) {
    var b = document.createRange();
    b.selectNodeContents(a);
    var c = window.getSelection();
    c.removeAllRanges(), c.addRange(b)
},
SelectRangeText.prototype.getPositionSelection = function (a) {
    var b = a.getSelection();
    return b.focusOffset
},
SelectRangeText.prototype.insertText = function (a) {
    var b, c, d = $("iframe.contentEditor").eq(0);
    if (d[0].contentWindow.getSelection) {
        if (b = d[0].contentWindow.getSelection(), b.getRangeAt && b.rangeCount) {
            c = b.getRangeAt(0), c.deleteContents();
            var e = d[0].contentWindow.document.createElement("div");
            e.innerHTML = a;
            for (var f, g, h = d[0].contentWindow.document.createDocumentFragment(); f = e.firstChild;) g = h.appendChild(f);
            c.insertNode(h), g && (c = c.cloneRange(), c.setStartAfter(g), c.collapse(!0), b.removeAllRanges(), b.addRange(c))
        }
    } else d[0].contentWindow.document.selection && "Control" != d[0].contentWindow.document.selection.type && d[0].contentWindow.document.selection.createRange().pasteHTML(a)
};