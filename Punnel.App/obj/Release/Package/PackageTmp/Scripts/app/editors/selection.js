var saveSelection, restoreSelection;
window.getSelection ? (saveSelection = function() {
    var a = window.getSelection(),
        b = [];
    if (a.rangeCount)
        for (var c = 0, d = a.rangeCount; d > c; ++c) b.push(a.getRangeAt(c));
    return b
},
restoreSelection = function (a) {
    if (a) {
        var b = window.getSelection();
        b.removeAllRanges();
        for (var c = 0, d = a.length; d > c; ++c) b.addRange(a[c])
    }
}) : document.selection && document.selection.createRange && (saveSelection = function() {
    var a = document.selection;
    return "None" != a.type ? a.createRange() : null
},
restoreSelection = function (a) {
    a && a.select()
});