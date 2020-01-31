﻿function documentClick(a) {
    var b = a.target || a.srcElement || a.eventtoElement;
    "function" == typeof window.documentClickCustomEditor && window.documentClickCustomEditor(b)
}
function lpBold() {
    pageSave = !1;
    var a, b = $("iframe.contentEditor"),
        c = null;
    [].forEach.call(b, function(b) {
        a = b.contentWindow.getSelection().toString(), c = b.contentWindow.getSelection()
    });
    var d = selectedItem.find(".widget-content").eq(0);
    if ("" != a) {
        var e = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        "textinline" == selectedItem.attr("pn-type") || b[0].contentWindow.document.execCommand("bold", !1, null), "button" == selectedItem.attr("pn-type") || d.html(b.contents().find(".widget-content").eq(0).html()), apiElement[e].text = b.contents().find(".widget-content").eq(0).html()
    } else {
        var f = b.contents().find(".widget-content").eq(0);
        "bold" == d.css("font-weight") ? (d.css({
            "font-weight": ""
        }), f.css({
            "font-weight": ""
        })) : (d.css({
            "font-weight": "bold"
        }), f.css({
            "font-weight": "bold"
        }))
    }
    restoreSelection(savedSel)
}

function lpUnderline() {
    restoreSelection(savedSel), pageSave = !1;
    var a, b = $("iframe.contentEditor");
    [].forEach.call(b, function(b) {
        a = b.contentWindow.getSelection().toString()
    });
    var c = selectedItem.find(".widget-content").eq(0);
    if ("" != a) {
        b[0].contentWindow.document.execCommand("underline", !1, null), "button" == selectedItem.attr("pn-type") || c.html(b.contents().find(".widget-content").eq(0).html());
        var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[d].text = b.contents().find(".widget-content").eq(0).html()
    } else {
        var e = b.contents().find(".widget-content").eq(0);
        "underline" == c.css("text-decoration") ? (c.css({
            "text-decoration": ""
        }), e.css({
            "text-decoration": ""
        })) : (c.css({
            "text-decoration": "underline"
        }), e.css({
            "text-decoration": "underline"
        }))
    }
    restoreSelection(savedSel)
}

function changeColor() {
    restoreSelection(savedSel);
    var a, b = "properties_" + selectedItem.attr("pn-properties"),
        c = $("iframe.contentEditor");
    [].forEach.call(c, function(b) {
        a = b.contentWindow.getSelection().toString()
    });
    var d = $("." + b + " .value_text_color input").val(),
        e = selectedItem.find(".widget-content").eq(0);
    if ("" != a) {
        c[0].contentWindow.document.execCommand("foreColor", !1, d), "button" == selectedItem.attr("pn-type") || e.html(c.contents().find(".widget-content").eq(0).html());
        var f = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[f].text = c.contents().find(".widget-content").eq(0).html()
    } else {
        var g = c.contents().find(".widget-content").eq(0);
        e.css({
            color: d
        }), g.css({
            color: d
        })
    }
    saveRange(), restoreSelection(savedSel)
}

function lpItalic() {
    restoreSelection(savedSel), pageSave = !1;
    var a, b = $("iframe.contentEditor");
    [].forEach.call(b, function(b) {
        a = b.contentWindow.getSelection().toString()
    });
    var c = selectedItem.find(".widget-content").eq(0);
    if ("" != a) {
        b[0].contentWindow.document.execCommand("italic", !1, null), "button" == selectedItem.attr("pn-type") || c.html(b.contents().find(".widget-content").eq(0).html());
        var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[d].text = b.contents().find(".widget-content").eq(0).html()
    } else {
        var e = b.contents().find(".widget-content").eq(0),
            c = selectedItem.find(".widget-content").eq(0);
        "italic" == c.css("font-style") ? (c.css({
            "font-style": ""
        }), e.css({
            "font-style": ""
        })) : (c.css({
            "font-style": "italic"
        }), e.css({
            "font-style": "italic"
        }))
    }
    restoreSelection(savedSel)
}

function lpStrikethrough() {
    restoreSelection(savedSel), pageSave = !1;
    var a, b = $("iframe.contentEditor");
    [].forEach.call(b, function(b) {
        a = b.contentWindow.getSelection().toString()
    });
    var c = selectedItem.find(".widget-content").eq(0);
    if ("" != a) {
        b[0].contentWindow.document.execCommand("strikethrough", !1, null), "button" == selectedItem.attr("pn-type") || c.html(b.contents().find(".widget-content").eq(0).html());
        var d = PN_PAGE.getIndexElement(selectedItem.attr("id"));
        apiElement[d].text = b.contents().find(".widget-content").eq(0).html()
    } else {
        var e = b.contents().find(".widget-content").eq(0),
            c = selectedItem.find(".widget-content").eq(0);
        "line-through" == c.css("text-decoration") ? (c.css({
            "text-decoration": ""
        }), e.css({
            "text-decoration": ""
        })) : (c.css({
            "text-decoration": "line-through"
        }), e.css({
            "text-decoration": "line-through"
        }))
    }
    restoreSelection(savedSel)
}

function saveRange() {
    var a = window.getSelection().toString();
    if ("" != a) {
        var b = window.getSelection();
        $("#inputLink").val(b.anchorNode.parentElement.getAttribute("href"));
        var c = b.anchorNode.parentElement.getAttribute("target");
        "_blank" == c ? $("#checkBlank").attr("checked", !0) : $("#checkBlank").attr("checked", !1), savedSel = saveSelection()
    } else $("#inputLink").val(""), $("#checkBlank").attr("checked", !1)
}

function getNodeIndex(a) {
    for (var b = 0; a = a.previousSibling;) b++;
    return b
}! function() {
    function a(a) {
        var b = c;
        a && (c[a] || (c[a] = {}), b = c[a]), b.define && b.define.packaged || (d.original = b.define, b.define = d, b.define.packaged = !0), b.require && b.require.packaged || (f.original = b.require, b.require = f, b.require.packaged = !0)
    }
    var b = "",
        c = function() {
            return this
        }();
    if (c || "undefined" == typeof window || (c = window), b || "undefined" == typeof requirejs) {
        var d = function(a, b, c) {
            return "string" != typeof a ? void(d.original ? d.original.apply(this, arguments) : (console.error("dropping module because define wasn't a string."), console.trace())) : (2 == arguments.length && (c = b), void(d.modules[a] || (d.payloads[a] = c, d.modules[a] = null)))
        };
        d.modules = {}, d.payloads = {};
        var e = function(a, b, c) {
                if ("string" == typeof b) {
                    var d = h(a, b);
                    if (void 0 != d) return c && c(), d
                } else if ("[object Array]" === Object.prototype.toString.call(b)) {
                    for (var e = [], g = 0, i = b.length; i > g; ++g) {
                        var j = h(a, b[g]);
                        if (void 0 == j && f.original) return;
                        e.push(j)
                    }
                    return c && c.apply(null, e) || !0
                }
            },
            f = function(a, b) {
                var c = e("", a, b);
                return void 0 == c && f.original ? f.original.apply(this, arguments) : c
            },
            g = function(a, b) {
                if (-1 !== b.indexOf("!")) {
                    var c = b.split("!");
                    return g(a, c[0]) + "!" + g(a, c[1])
                }
                if ("." == b.charAt(0)) {
                    var d = a.split("/").slice(0, -1).join("/");
                    for (b = d + "/" + b; - 1 !== b.indexOf(".") && e != b;) {
                        var e = b;
                        b = b.replace(/\/\.\//, "/").replace(/[^\/]+\/\.\.\//, "")
                    }
                }
                return b
            },
            h = function(a, b) {
                b = g(a, b);
                var c = d.modules[b];
                if (!c) {
                    if (c = d.payloads[b], "function" == typeof c) {
                        var f = {},
                            h = {
                                id: b,
                                uri: "",
                                exports: f,
                                packaged: !0
                            },
                            i = function(a, c) {
                                return e(b, a, c)
                            },
                            j = c(i, f, h);
                        f = j || h.exports, d.modules[b] = f, delete d.payloads[b]
                    }
                    c = d.modules[b] = f || c
                }
                return c
            };
        a(b)
    }
}(), define("ace/lib/regexp", ["require", "exports", "module"], function(a, b, c) {
        "use strict";

        function d(a) {
            return (a.global ? "g" : "") + (a.ignoreCase ? "i" : "") + (a.multiline ? "m" : "") + (a.extended ? "x" : "") + (a.sticky ? "y" : "")
        }

        function e(a, b, c) {
            if (Array.prototype.indexOf) return a.indexOf(b, c);
            for (var d = c || 0; d < a.length; d++)
                if (a[d] === b) return d;
            return -1
        }
        var f = {
                exec: RegExp.prototype.exec,
                test: RegExp.prototype.test,
                match: String.prototype.match,
                replace: String.prototype.replace,
                split: String.prototype.split
            },
            g = void 0 === f.exec.call(/()??/, "")[1],
            h = function() {
                var a = /^/g;
                return f.test.call(a, ""), !a.lastIndex
            }();
        h && g || (RegExp.prototype.exec = function(a) {
            var b, c, i = f.exec.apply(this, arguments);
            if ("string" == typeof a && i) {
                if (!g && i.length > 1 && e(i, "") > -1 && (c = RegExp(this.source, f.replace.call(d(this), "g", "")), f.replace.call(a.slice(i.index), c, function() {
                        for (var a = 1; a < arguments.length - 2; a++) void 0 === arguments[a] && (i[a] = void 0)
                    })), this._xregexp && this._xregexp.captureNames)
                    for (var j = 1; j < i.length; j++) b = this._xregexp.captureNames[j - 1], b && (i[b] = i[j]);
                !h && this.global && !i[0].length && this.lastIndex > i.index && this.lastIndex--
            }
            return i
        }, h || (RegExp.prototype.test = function(a) {
            var b = f.exec.call(this, a);
            return b && this.global && !b[0].length && this.lastIndex > b.index && this.lastIndex--, !!b
        }))
    }), define("ace/lib/es5-shim", ["require", "exports", "module"], function(a, b, c) {
        function d() {}

        function e(a) {
            try {
                return Object.defineProperty(a, "sentinel", {}), "sentinel" in a
            } catch (b) {}
        }

        function f(a) {
            return a = +a, a !== a ? a = 0 : 0 !== a && a !== 1 / 0 && a !== -(1 / 0) && (a = (a > 0 || -1) * Math.floor(Math.abs(a))), a
        }
        Function.prototype.bind || (Function.prototype.bind = function(a) {
            var b = this;
            if ("function" != typeof b) throw new TypeError("Function.prototype.bind called on incompatible " + b);
            var c = o.call(arguments, 1),
                e = function() {
                    if (this instanceof e) {
                        var d = b.apply(this, c.concat(o.call(arguments)));
                        return Object(d) === d ? d : this
                    }
                    return b.apply(a, c.concat(o.call(arguments)))
                };
            return b.prototype && (d.prototype = b.prototype, e.prototype = new d, d.prototype = null), e
        });
        var g, h, i, j, k, l = Function.prototype.call,
            m = Array.prototype,
            n = Object.prototype,
            o = m.slice,
            p = l.bind(n.toString),
            q = l.bind(n.hasOwnProperty);
        if ((k = q(n, "__defineGetter__")) && (g = l.bind(n.__defineGetter__), h = l.bind(n.__defineSetter__), i = l.bind(n.__lookupGetter__), j = l.bind(n.__lookupSetter__)), 2 != [1, 2].splice(0).length)
            if (function() {
                    function a(a) {
                        var b = new Array(a + 2);
                        return b[0] = b[1] = 0, b
                    }
                    var b, c = [];
                    return c.splice.apply(c, a(20)), c.splice.apply(c, a(26)), b = c.length, c.splice(5, 0, "XXX"), b + 1 == c.length, b + 1 == c.length ? !0 : void 0
                }()) {
                var r = Array.prototype.splice;
                Array.prototype.splice = function(a, b) {
                    return arguments.length ? r.apply(this, [void 0 === a ? 0 : a, void 0 === b ? this.length - a : b].concat(o.call(arguments, 2))) : []
                }
            } else Array.prototype.splice = function(a, b) {
                var c = this.length;
                a > 0 ? a > c && (a = c) : void 0 == a ? a = 0 : 0 > a && (a = Math.max(c + a, 0)), c > a + b || (b = c - a);
                var d = this.slice(a, a + b),
                    e = o.call(arguments, 2),
                    f = e.length;
                if (a === c) f && this.push.apply(this, e);
                else {
                    var g = Math.min(b, c - a),
                        h = a + g,
                        i = h + f - g,
                        j = c - h,
                        k = c - g;
                    if (h > i)
                        for (var l = 0; j > l; ++l) this[i + l] = this[h + l];
                    else if (i > h)
                        for (l = j; l--;) this[i + l] = this[h + l];
                    if (f && a === k) this.length = k, this.push.apply(this, e);
                    else
                        for (this.length = k + f, l = 0; f > l; ++l) this[a + l] = e[l]
                }
                return d
            };
        Array.isArray || (Array.isArray = function(a) {
            return "[object Array]" == p(a)
        });
        var s = Object("a"),
            t = "a" != s[0] || !(0 in s);
        if (Array.prototype.forEach || (Array.prototype.forEach = function(a) {
                var b = K(this),
                    c = t && "[object String]" == p(this) ? this.split("") : b,
                    d = arguments[1],
                    e = -1,
                    f = c.length >>> 0;
                if ("[object Function]" != p(a)) throw new TypeError;
                for (; ++e < f;) e in c && a.call(d, c[e], e, b)
            }), Array.prototype.map || (Array.prototype.map = function(a) {
                var b = K(this),
                    c = t && "[object String]" == p(this) ? this.split("") : b,
                    d = c.length >>> 0,
                    e = Array(d),
                    f = arguments[1];
                if ("[object Function]" != p(a)) throw new TypeError(a + " is not a function");
                for (var g = 0; d > g; g++) g in c && (e[g] = a.call(f, c[g], g, b));
                return e
            }), Array.prototype.filter || (Array.prototype.filter = function(a) {
                var b, c = K(this),
                    d = t && "[object String]" == p(this) ? this.split("") : c,
                    e = d.length >>> 0,
                    f = [],
                    g = arguments[1];
                if ("[object Function]" != p(a)) throw new TypeError(a + " is not a function");
                for (var h = 0; e > h; h++) h in d && (b = d[h], a.call(g, b, h, c) && f.push(b));
                return f
            }), Array.prototype.every || (Array.prototype.every = function(a) {
                var b = K(this),
                    c = t && "[object String]" == p(this) ? this.split("") : b,
                    d = c.length >>> 0,
                    e = arguments[1];
                if ("[object Function]" != p(a)) throw new TypeError(a + " is not a function");
                for (var f = 0; d > f; f++)
                    if (f in c && !a.call(e, c[f], f, b)) return !1;
                return !0
            }), Array.prototype.some || (Array.prototype.some = function(a) {
                var b = K(this),
                    c = t && "[object String]" == p(this) ? this.split("") : b,
                    d = c.length >>> 0,
                    e = arguments[1];
                if ("[object Function]" != p(a)) throw new TypeError(a + " is not a function");
                for (var f = 0; d > f; f++)
                    if (f in c && a.call(e, c[f], f, b)) return !0;
                return !1
            }), Array.prototype.reduce || (Array.prototype.reduce = function(a) {
                var b = K(this),
                    c = t && "[object String]" == p(this) ? this.split("") : b,
                    d = c.length >>> 0;
                if ("[object Function]" != p(a)) throw new TypeError(a + " is not a function");
                if (!d && 1 == arguments.length) throw new TypeError("reduce of empty array with no initial value");
                var e, f = 0;
                if (arguments.length >= 2) e = arguments[1];
                else
                    for (;;) {
                        if (f in c) {
                            e = c[f++];
                            break
                        }
                        if (++f >= d) throw new TypeError("reduce of empty array with no initial value")
                    }
                for (; d > f; f++) f in c && (e = a.call(void 0, e, c[f], f, b));
                return e
            }), Array.prototype.reduceRight || (Array.prototype.reduceRight = function(a) {
                var b = K(this),
                    c = t && "[object String]" == p(this) ? this.split("") : b,
                    d = c.length >>> 0;
                if ("[object Function]" != p(a)) throw new TypeError(a + " is not a function");
                if (!d && 1 == arguments.length) throw new TypeError("reduceRight of empty array with no initial value");
                var e, f = d - 1;
                if (arguments.length >= 2) e = arguments[1];
                else
                    for (;;) {
                        if (f in c) {
                            e = c[f--];
                            break
                        }
                        if (--f < 0) throw new TypeError("reduceRight of empty array with no initial value")
                    }
                do f in this && (e = a.call(void 0, e, c[f], f, b)); while (f--);
                return e
            }), Array.prototype.indexOf && -1 == [0, 1].indexOf(1, 2) || (Array.prototype.indexOf = function(a) {
                var b = t && "[object String]" == p(this) ? this.split("") : K(this),
                    c = b.length >>> 0;
                if (!c) return -1;
                var d = 0;
                for (arguments.length > 1 && (d = f(arguments[1])), d = d >= 0 ? d : Math.max(0, c + d); c > d; d++)
                    if (d in b && b[d] === a) return d;
                return -1
            }), Array.prototype.lastIndexOf && -1 == [0, 1].lastIndexOf(0, -3) || (Array.prototype.lastIndexOf = function(a) {
                var b = t && "[object String]" == p(this) ? this.split("") : K(this),
                    c = b.length >>> 0;
                if (!c) return -1;
                var d = c - 1;
                for (arguments.length > 1 && (d = Math.min(d, f(arguments[1]))), d = d >= 0 ? d : c - Math.abs(d); d >= 0; d--)
                    if (d in b && a === b[d]) return d;
                return -1
            }), Object.getPrototypeOf || (Object.getPrototypeOf = function(a) {
                return a.__proto__ || (a.constructor ? a.constructor.prototype : n)
            }), !Object.getOwnPropertyDescriptor) {
            var u = "Object.getOwnPropertyDescriptor called on a non-object: ";
            Object.getOwnPropertyDescriptor = function(a, b) {
                if ("object" != typeof a && "function" != typeof a || null === a) throw new TypeError(u + a);
                if (q(a, b)) {
                    var c, d, e;
                    if (c = {
                            enumerable: !0,
                            configurable: !0
                        }, k) {
                        var f = a.__proto__;
                        a.__proto__ = n;
                        var d = i(a, b),
                            e = j(a, b);
                        if (a.__proto__ = f, d || e) return d && (c.get = d), e && (c.set = e), c
                    }
                    return c.value = a[b], c
                }
            }
        }
        if (Object.getOwnPropertyNames || (Object.getOwnPropertyNames = function(a) {
                return Object.keys(a)
            }), !Object.create) {
            var v;
            v = null === Object.prototype.__proto__ ? function() {
                return {
                    __proto__: null
                }
            } : function() {
                var a = {};
                for (var b in a) a[b] = null;
                return a.constructor = a.hasOwnProperty = a.propertyIsEnumerable = a.isPrototypeOf = a.toLocaleString = a.toString = a.valueOf = a.__proto__ = null, a
            }, Object.create = function(a, b) {
                var c;
                if (null === a) c = v();
                else {
                    if ("object" != typeof a) throw new TypeError("typeof prototype[" + typeof a + "] != 'object'");
                    var d = function() {};
                    d.prototype = a, c = new d, c.__proto__ = a
                }
                return void 0 !== b && Object.defineProperties(c, b), c
            }
        }
        if (Object.defineProperty) {
            var w = e({}),
                x = "undefined" == typeof document || e(document.createElement("div"));
            if (!w || !x) var y = Object.defineProperty
        }
        if (!Object.defineProperty || y) {
            var z = "Property description must be an object: ",
                A = "Object.defineProperty called on non-object: ",
                B = "getters & setters can not be defined on this javascript engine";
            Object.defineProperty = function(a, b, c) {
                if ("object" != typeof a && "function" != typeof a || null === a) throw new TypeError(A + a);
                if ("object" != typeof c && "function" != typeof c || null === c) throw new TypeError(z + c);
                if (y) try {
                    return y.call(Object, a, b, c)
                } catch (d) {}
                if (q(c, "value"))
                    if (k && (i(a, b) || j(a, b))) {
                        var e = a.__proto__;
                        a.__proto__ = n, delete a[b], a[b] = c.value, a.__proto__ = e
                    } else a[b] = c.value;
                else {
                    if (!k) throw new TypeError(B);
                    q(c, "get") && g(a, b, c.get), q(c, "set") && h(a, b, c.set)
                }
                return a
            }
        }
        Object.defineProperties || (Object.defineProperties = function(a, b) {
            for (var c in b) q(b, c) && Object.defineProperty(a, c, b[c]);
            return a
        }), Object.seal || (Object.seal = function(a) {
            return a
        }), Object.freeze || (Object.freeze = function(a) {
            return a
        });
        try {
            Object.freeze(function() {})
        } catch (C) {
            Object.freeze = function(a) {
                return function(b) {
                    return "function" == typeof b ? b : a(b)
                }
            }(Object.freeze)
        }
        if (Object.preventExtensions || (Object.preventExtensions = function(a) {
                return a
            }), Object.isSealed || (Object.isSealed = function(a) {
                return !1
            }), Object.isFrozen || (Object.isFrozen = function(a) {
                return !1
            }), Object.isExtensible || (Object.isExtensible = function(a) {
                if (Object(a) === a) throw new TypeError;
                for (var b = ""; q(a, b);) b += "?";
                a[b] = !0;
                var c = q(a, b);
                return delete a[b], c
            }), !Object.keys) {
            var D = !0,
                E = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"],
                F = E.length;
            for (var G in {
                    toString: null
                }) D = !1;
            Object.keys = function L(a) {
                if ("object" != typeof a && "function" != typeof a || null === a) throw new TypeError("Object.keys called on a non-object");
                var L = [];
                for (var b in a) q(a, b) && L.push(b);
                if (D)
                    for (var c = 0, d = F; d > c; c++) {
                        var e = E[c];
                        q(a, e) && L.push(e)
                    }
                return L
            }
        }
        Date.now || (Date.now = function() {
            return (new Date).getTime()
        });
        var H = "	\n\f\r   ᠎             　\u2028\u2029\ufeff";
        if (!String.prototype.trim || H.trim()) {
            H = "[" + H + "]";
            var I = new RegExp("^" + H + H + "*"),
                J = new RegExp(H + H + "*$");
            String.prototype.trim = function() {
                return String(this).replace(I, "").replace(J, "")
            }
        }
        var K = function(a) {
            if (null == a) throw new TypeError("can't convert " + a + " to object");
            return Object(a)
        }
    }), define("ace/lib/fixoldbrowsers", ["require", "exports", "module", "ace/lib/regexp", "ace/lib/es5-shim"], function(a, b, c) {
        "use strict";
        a("./regexp"), a("./es5-shim")
    }), define("ace/lib/dom", ["require", "exports", "module"], function(a, b, c) {
        "use strict";
        var d = "http://www.w3.org/1999/xhtml";
        return b.getDocumentHead = function(a) {
            return a || (a = document), a.head || a.getElementsByTagName("head")[0] || a.documentElement
        }, b.createElement = function(a, b) {
            return document.createElementNS ? document.createElementNS(b || d, a) : document.createElement(a)
        }, b.hasCssClass = function(a, b) {
            var c = (a.className || "").split(/\s+/g);
            return -1 !== c.indexOf(b)
        }, b.addCssClass = function(a, c) {
            b.hasCssClass(a, c) || (a.className += " " + c)
        }, b.removeCssClass = function(a, b) {
            for (var c = a.className.split(/\s+/g);;) {
                var d = c.indexOf(b);
                if (-1 == d) break;
                c.splice(d, 1)
            }
            a.className = c.join(" ")
        }, b.toggleCssClass = function(a, b) {
            for (var c = a.className.split(/\s+/g), d = !0;;) {
                var e = c.indexOf(b);
                if (-1 == e) break;
                d = !1, c.splice(e, 1)
            }
            return d && c.push(b), a.className = c.join(" "), d
        }, b.setCssClass = function(a, c, d) {
            d ? b.addCssClass(a, c) : b.removeCssClass(a, c)
        }, b.hasCssString = function(a, b) {
            var c, d = 0;
            if (b = b || document, b.createStyleSheet && (c = b.styleSheets)) {
                for (; d < c.length;)
                    if (c[d++].owningElement.id === a) return !0
            } else if (c = b.getElementsByTagName("style"))
                for (; d < c.length;)
                    if (c[d++].id === a) return !0;
            return !1
        }, b.importCssString = function(a, c, d) {
            if (d = d || document, c && b.hasCssString(c, d)) return null;
            var e;
            c && (a += "\n/*# sourceURL=ace/css/" + c + " */"), d.createStyleSheet ? (e = d.createStyleSheet(), e.cssText = a, c && (e.owningElement.id = c)) : (e = b.createElement("style"), e.appendChild(d.createTextNode(a)), c && (e.id = c), b.getDocumentHead(d).appendChild(e))
        }, b.importCssStylsheet = function(a, c) {
            if (c.createStyleSheet) c.createStyleSheet(a);
            else {
                var d = b.createElement("link");
                d.rel = "stylesheet", d.href = a, b.getDocumentHead(c).appendChild(d)
            }
        }, b.getInnerWidth = function(a) {
            return parseInt(b.computedStyle(a, "paddingLeft"), 10) + parseInt(b.computedStyle(a, "paddingRight"), 10) + a.clientWidth
        }, b.getInnerHeight = function(a) {
            return parseInt(b.computedStyle(a, "paddingTop"), 10) + parseInt(b.computedStyle(a, "paddingBottom"), 10) + a.clientHeight
        }, b.scrollbarWidth = function(a) {
            var c = b.createElement("ace_inner");
            c.style.width = "100%", c.style.minWidth = "0px", c.style.height = "200px", c.style.display = "block";
            var d = b.createElement("ace_outer"),
                e = d.style;
            e.position = "absolute", e.left = "-10000px", e.overflow = "hidden", e.width = "200px", e.minWidth = "0px", e.height = "150px", e.display = "block", d.appendChild(c);
            var f = a.documentElement;
            f.appendChild(d);
            var g = c.offsetWidth;
            e.overflow = "scroll";
            var h = c.offsetWidth;
            return g == h && (h = d.clientWidth), f.removeChild(d), g - h
        }, "undefined" == typeof document ? void(b.importCssString = function() {}) : (void 0 !== window.pageYOffset ? (b.getPageScrollTop = function() {
            return window.pageYOffset
        }, b.getPageScrollLeft = function() {
            return window.pageXOffset
        }) : (b.getPageScrollTop = function() {
            return document.body.scrollTop
        }, b.getPageScrollLeft = function() {
            return document.body.scrollLeft
        }), window.getComputedStyle ? b.computedStyle = function(a, b) {
            return b ? (window.getComputedStyle(a, "") || {})[b] || "" : window.getComputedStyle(a, "") || {}
        } : b.computedStyle = function(a, b) {
            return b ? a.currentStyle[b] : a.currentStyle
        }, b.setInnerHtml = function(a, b) {
            var c = a.cloneNode(!1);
            return c.innerHTML = b, a.parentNode.replaceChild(c, a), c
        }, "textContent" in document.documentElement ? (b.setInnerText = function(a, b) {
            a.textContent = b
        }, b.getInnerText = function(a) {
            return a.textContent
        }) : (b.setInnerText = function(a, b) {
            a.innerText = b
        }, b.getInnerText = function(a) {
            return a.innerText
        }), void(b.getParentWindow = function(a) {
            return a.defaultView || a.parentWindow
        }))
    }), define("ace/lib/oop", ["require", "exports", "module"], function(a, b, c) {
        "use strict";
        b.inherits = function(a, b) {
            a.super_ = b, a.prototype = Object.create(b.prototype, {
                constructor: {
                    value: a,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            })
        }, b.mixin = function(a, b) {
            for (var c in b) a[c] = b[c];
            return a
        }, b.implement = function(a, c) {
            b.mixin(a, c)
        }
    }), define("ace/lib/keys", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop"], function(a, b, c) {
        "use strict";
        a("./fixoldbrowsers");
        var d = a("./oop"),
            e = function() {
                var a, b, c = {
                    MODIFIER_KEYS: {
                        16: "Shift",
                        17: "Ctrl",
                        18: "Alt",
                        224: "Meta"
                    },
                    KEY_MODS: {
                        ctrl: 1,
                        alt: 2,
                        option: 2,
                        shift: 4,
                        "super": 8,
                        meta: 8,
                        command: 8,
                        cmd: 8
                    },
                    FUNCTION_KEYS: {
                        8: "Backspace",
                        9: "Tab",
                        13: "Return",
                        19: "Pause",
                        27: "Esc",
                        32: "Space",
                        33: "PageUp",
                        34: "PageDown",
                        35: "End",
                        36: "Home",
                        37: "Left",
                        38: "Up",
                        39: "Right",
                        40: "Down",
                        44: "Print",
                        45: "Insert",
                        46: "Delete",
                        96: "Numpad0",
                        97: "Numpad1",
                        98: "Numpad2",
                        99: "Numpad3",
                        100: "Numpad4",
                        101: "Numpad5",
                        102: "Numpad6",
                        103: "Numpad7",
                        104: "Numpad8",
                        105: "Numpad9",
                        "-13": "NumpadEnter",
                        112: "F1",
                        113: "F2",
                        114: "F3",
                        115: "F4",
                        116: "F5",
                        117: "F6",
                        118: "F7",
                        119: "F8",
                        120: "F9",
                        121: "F10",
                        122: "F11",
                        123: "F12",
                        144: "Numlock",
                        145: "Scrolllock"
                    },
                    PRINTABLE_KEYS: {
                        32: " ",
                        48: "0",
                        49: "1",
                        50: "2",
                        51: "3",
                        52: "4",
                        53: "5",
                        54: "6",
                        55: "7",
                        56: "8",
                        57: "9",
                        59: ";",
                        61: "=",
                        65: "a",
                        66: "b",
                        67: "c",
                        68: "d",
                        69: "e",
                        70: "f",
                        71: "g",
                        72: "h",
                        73: "i",
                        74: "j",
                        75: "k",
                        76: "l",
                        77: "m",
                        78: "n",
                        79: "o",
                        80: "p",
                        81: "q",
                        82: "r",
                        83: "s",
                        84: "t",
                        85: "u",
                        86: "v",
                        87: "w",
                        88: "x",
                        89: "y",
                        90: "z",
                        107: "+",
                        109: "-",
                        110: ".",
                        186: ";",
                        187: "=",
                        188: ",",
                        189: "-",
                        190: ".",
                        191: "/",
                        192: "`",
                        219: "[",
                        220: "\\",
                        221: "]",
                        222: "'",
                        111: "/",
                        106: "*"
                    }
                };
                for (b in c.FUNCTION_KEYS) a = c.FUNCTION_KEYS[b].toLowerCase(), c[a] = parseInt(b, 10);
                for (b in c.PRINTABLE_KEYS) a = c.PRINTABLE_KEYS[b].toLowerCase(), c[a] = parseInt(b, 10);
                return d.mixin(c, c.MODIFIER_KEYS), d.mixin(c, c.PRINTABLE_KEYS), d.mixin(c, c.FUNCTION_KEYS), c.enter = c["return"], c.escape = c.esc, c.del = c["delete"], c[173] = "-",
                    function() {
                        for (var a = ["cmd", "ctrl", "alt", "shift"], b = Math.pow(2, a.length); b--;) c.KEY_MODS[b] = a.filter(function(a) {
                            return b & c.KEY_MODS[a]
                        }).join("-") + "-"
                    }(), c.KEY_MODS[0] = "", c.KEY_MODS[-1] = "input-", c
            }();
        d.mixin(b, e), b.keyCodeToString = function(a) {
            var b = e[a];
            return "string" != typeof b && (b = String.fromCharCode(a)), b.toLowerCase()
        }
    }), define("ace/lib/useragent", ["require", "exports", "module"], function(a, b, c) {
        "use strict";
        if (b.OS = {
                LINUX: "LINUX",
                MAC: "MAC",
                WINDOWS: "WINDOWS"
            }, b.getOS = function() {
                return b.isMac ? b.OS.MAC : b.isLinux ? b.OS.LINUX : b.OS.WINDOWS
            }, "object" == typeof navigator) {
            var d = (navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
                e = navigator.userAgent;
            b.isWin = "win" == d, b.isMac = "mac" == d, b.isLinux = "linux" == d, b.isIE = "Microsoft Internet Explorer" == navigator.appName || navigator.appName.indexOf("MSAppHost") >= 0 ? parseFloat((e.match(/(?:MSIE |Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]) : parseFloat((e.match(/(?:Trident\/[0-9]+[\.0-9]+;.*rv:)([0-9]+[\.0-9]+)/) || [])[1]), b.isOldIE = b.isIE && b.isIE < 9, b.isGecko = b.isMozilla = (window.Controllers || window.controllers) && "Gecko" === window.navigator.product, b.isOldGecko = b.isGecko && parseInt((e.match(/rv\:(\d+)/) || [])[1], 10) < 4, b.isOpera = window.opera && "[object Opera]" == Object.prototype.toString.call(window.opera), b.isWebKit = parseFloat(e.split("WebKit/")[1]) || void 0, b.isChrome = parseFloat(e.split(" Chrome/")[1]) || void 0, b.isAIR = e.indexOf("AdobeAIR") >= 0, b.isIPad = e.indexOf("iPad") >= 0, b.isTouchPad = e.indexOf("TouchPad") >= 0, b.isChromeOS = e.indexOf(" CrOS ") >= 0
        }
    }), define("ace/lib/event", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function(a, b, c) {
        "use strict";

        function d(a, b, c) {
            var d = j(b);
            if (!g.isMac && h) {
                if (h.OSKey && (d |= 8), h.altGr) {
                    if (3 == (3 & d)) return;
                    h.altGr = 0
                }
                if (18 === c || 17 === c) {
                    var e = "location" in b ? b.location : b.keyLocation;
                    if (17 === c && 1 === e) 1 == h[c] && (i = b.timeStamp);
                    else if (18 === c && 3 === d && 2 === e) {
                        var k = b.timeStamp - i;
                        50 > k && (h.altGr = !0)
                    }
                }
            }
            if (c in f.MODIFIER_KEYS && (c = -1), 8 & d && c >= 91 && 93 >= c && (c = -1), !d && 13 === c) {
                var e = "location" in b ? b.location : b.keyLocation;
                if (3 === e && (a(b, d, -c), b.defaultPrevented)) return
            }
            if (g.isChromeOS && 8 & d) {
                if (a(b, d, c), b.defaultPrevented) return;
                d &= -9
            }
            return d || c in f.FUNCTION_KEYS || c in f.PRINTABLE_KEYS ? a(b, d, c) : !1
        }

        function e() {
            h = Object.create(null), h.count = 0, h.lastT = 0
        }
        var f = a("./keys"),
            g = a("./useragent"),
            h = null,
            i = 0;
        b.addListener = function(a, b, c) {
            if (a.addEventListener) return a.addEventListener(b, c, !1);
            if (a.attachEvent) {
                var d = function() {
                    c.call(a, window.event)
                };
                c._wrapper = d, a.attachEvent("on" + b, d)
            }
        }, b.removeListener = function(a, b, c) {
            return a.removeEventListener ? a.removeEventListener(b, c, !1) : void(a.detachEvent && a.detachEvent("on" + b, c._wrapper || c))
        }, b.stopEvent = function(a) {
            return b.stopPropagation(a), b.preventDefault(a), !1
        }, b.stopPropagation = function(a) {
            a.stopPropagation ? a.stopPropagation() : a.cancelBubble = !0
        }, b.preventDefault = function(a) {
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        }, b.getButton = function(a) {
            return "dblclick" == a.type ? 0 : "contextmenu" == a.type || g.isMac && a.ctrlKey && !a.altKey && !a.shiftKey ? 2 : a.preventDefault ? a.button : {
                1: 0,
                2: 2,
                4: 1
            }[a.button]
        }, b.capture = function(a, c, d) {
            function e(a) {
                c && c(a), d && d(a), b.removeListener(document, "mousemove", c, !0), b.removeListener(document, "mouseup", e, !0), b.removeListener(document, "dragstart", e, !0)
            }
            return b.addListener(document, "mousemove", c, !0), b.addListener(document, "mouseup", e, !0), b.addListener(document, "dragstart", e, !0), e
        }, b.addTouchMoveListener = function(a, c) {
            if ("ontouchmove" in a) {
                var d, e;
                b.addListener(a, "touchstart", function(a) {
                    var b = a.changedTouches[0];
                    d = b.clientX, e = b.clientY
                }), b.addListener(a, "touchmove", function(a) {
                    var b = 1,
                        f = a.changedTouches[0];
                    a.wheelX = -(f.clientX - d) / b, a.wheelY = -(f.clientY - e) / b, d = f.clientX, e = f.clientY, c(a)
                })
            }
        }, b.addMouseWheelListener = function(a, c) {
            "onmousewheel" in a ? b.addListener(a, "mousewheel", function(a) {
                var b = 8;
                void 0 !== a.wheelDeltaX ? (a.wheelX = -a.wheelDeltaX / b, a.wheelY = -a.wheelDeltaY / b) : (a.wheelX = 0, a.wheelY = -a.wheelDelta / b), c(a)
            }) : "onwheel" in a ? b.addListener(a, "wheel", function(a) {
                var b = .35;
                switch (a.deltaMode) {
                    case a.DOM_DELTA_PIXEL:
                        a.wheelX = a.deltaX * b || 0, a.wheelY = a.deltaY * b || 0;
                        break;
                    case a.DOM_DELTA_LINE:
                    case a.DOM_DELTA_PAGE:
                        a.wheelX = 5 * (a.deltaX || 0), a.wheelY = 5 * (a.deltaY || 0)
                }
                c(a)
            }) : b.addListener(a, "DOMMouseScroll", function(a) {
                a.axis && a.axis == a.HORIZONTAL_AXIS ? (a.wheelX = 5 * (a.detail || 0), a.wheelY = 0) : (a.wheelX = 0, a.wheelY = 5 * (a.detail || 0)), c(a)
            })
        }, b.addMultiMouseDownListener = function(a, c, d, e) {
            function f(a) {
                if (0 !== b.getButton(a) ? l = 0 : a.detail > 1 ? (l++, l > 4 && (l = 1)) : l = 1, g.isIE) {
                    var f = Math.abs(a.clientX - i) > 5 || Math.abs(a.clientY - j) > 5;
                    (!k || f) && (l = 1), k && clearTimeout(k), k = setTimeout(function() {
                        k = null
                    }, c[l - 1] || 600), 1 == l && (i = a.clientX, j = a.clientY)
                }
                if (a._clicks = l, d[e]("mousedown", a), l > 4) l = 0;
                else if (l > 1) return d[e](m[l], a)
            }

            function h(a) {
                l = 2, k && clearTimeout(k), k = setTimeout(function() {
                    k = null
                }, c[l - 1] || 600), d[e]("mousedown", a), d[e](m[l], a)
            }
            var i, j, k, l = 0,
                m = {
                    2: "dblclick",
                    3: "tripleclick",
                    4: "quadclick"
                };
            Array.isArray(a) || (a = [a]), a.forEach(function(a) {
                b.addListener(a, "mousedown", f), g.isOldIE && b.addListener(a, "dblclick", h)
            })
        };
        var j = !g.isMac || !g.isOpera || "KeyboardEvent" in window ? function(a) {
            return 0 | (a.ctrlKey ? 1 : 0) | (a.altKey ? 2 : 0) | (a.shiftKey ? 4 : 0) | (a.metaKey ? 8 : 0)
        } : function(a) {
            return 0 | (a.metaKey ? 1 : 0) | (a.altKey ? 2 : 0) | (a.shiftKey ? 4 : 0) | (a.ctrlKey ? 8 : 0)
        };
        if (b.getModifierString = function(a) {
                return f.KEY_MODS[j(a)]
            }, b.addCommandKeyListener = function(a, c) {
                var f = b.addListener;
                if (g.isOldGecko || g.isOpera && !("KeyboardEvent" in window)) {
                    var i = null;
                    f(a, "keydown", function(a) {
                        i = a.keyCode
                    }), f(a, "keypress", function(a) {
                        return d(c, a, i)
                    })
                } else {
                    var j = null;
                    f(a, "keydown", function(a) {
                        var b = a.keyCode;
                        h[b] = (h[b] || 0) + 1, 91 == b || 92 == b ? h.OSKey = !0 : h.OSKey && a.timeStamp - h.lastT > 200 && 1 == h.count && e(), 1 == h[b] && h.count++, h.lastT = a.timeStamp;
                        var f = d(c, a, b);
                        return j = a.defaultPrevented, f
                    }), f(a, "keypress", function(a) {
                        j && (a.ctrlKey || a.altKey || a.shiftKey || a.metaKey) && (b.stopEvent(a), j = null)
                    }), f(a, "keyup", function(a) {
                        var b = a.keyCode;
                        h[b] ? h.count = Math.max(h.count - 1, 0) : e(), (91 == b || 92 == b) && (h.OSKey = !1), h[b] = null
                    }), h || (e(), f(window, "focus", e))
                }
            }, "object" == typeof window && window.postMessage && !g.isOldIE) {
            var k = 1;
            b.nextTick = function(a, c) {
                c = c || window;
                var d = "zero-timeout-message-" + k;
                b.addListener(c, "message", function e(f) {
                    f.data == d && (b.stopPropagation(f), b.removeListener(c, "message", e), a())
                }), c.postMessage(d, "*")
            }
        }
        b.nextFrame = "object" == typeof window && (window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || window.oRequestAnimationFrame), b.nextFrame ? b.nextFrame = b.nextFrame.bind(window) : b.nextFrame = function(a) {
            setTimeout(a, 17)
        }
    }), define("ace/lib/lang", ["require", "exports", "module"], function(a, b, c) {
        "use strict";
        b.last = function(a) {
            return a[a.length - 1]
        }, b.stringReverse = function(a) {
            return a.split("").reverse().join("")
        }, b.stringRepeat = function(a, b) {
            for (var c = ""; b > 0;) 1 & b && (c += a), (b >>= 1) && (a += a);
            return c
        };
        var d = /^\s\s*/,
            e = /\s\s*$/;
        b.stringTrimLeft = function(a) {
            return a.replace(d, "")
        }, b.stringTrimRight = function(a) {
            return a.replace(e, "")
        }, b.copyObject = function(a) {
            var b = {};
            for (var c in a) b[c] = a[c];
            return b
        }, b.copyArray = function(a) {
            for (var b = [], c = 0, d = a.length; d > c; c++) a[c] && "object" == typeof a[c] ? b[c] = this.copyObject(a[c]) : b[c] = a[c];
            return b
        }, b.deepCopy = function f(a) {
            if ("object" != typeof a || !a) return a;
            var b;
            if (Array.isArray(a)) {
                b = [];
                for (var c = 0; c < a.length; c++) b[c] = f(a[c]);
                return b
            }
            var d = a.constructor;
            if (d === RegExp) return a;
            b = d();
            for (var c in a) b[c] = f(a[c]);
            return b
        }, b.arrayToMap = function(a) {
            for (var b = {}, c = 0; c < a.length; c++) b[a[c]] = 1;
            return b
        }, b.createMap = function(a) {
            var b = Object.create(null);
            for (var c in a) b[c] = a[c];
            return b
        }, b.arrayRemove = function(a, b) {
            for (var c = 0; c <= a.length; c++) b === a[c] && a.splice(c, 1)
        }, b.escapeRegExp = function(a) {
            return a.replace(/([.*+?^${}()|[\]\/\\])/g, "\\$1")
        }, b.escapeHTML = function(a) {
            return a.replace(/&/g, "&#38;").replace(/"/g, "&#34;").replace(/'/g, "&#39;").replace(/</g, "&#60;")
        }, b.getMatchOffsets = function(a, b) {
            var c = [];
            return a.replace(b, function(a) {
                c.push({
                    offset: arguments[arguments.length - 2],
                    length: a.length
                })
            }), c
        }, b.deferredCall = function(a) {
            var b = null,
                c = function() {
                    b = null, a()
                },
                d = function(a) {
                    return d.cancel(), b = setTimeout(c, a || 0), d
                };
            return d.schedule = d, d.call = function() {
                return this.cancel(), a(), d
            }, d.cancel = function() {
                return clearTimeout(b), b = null, d
            }, d.isPending = function() {
                return b
            }, d
        }, b.delayedCall = function(a, b) {
            var c = null,
                d = function() {
                    c = null, a()
                },
                e = function(a) {
                    null == c && (c = setTimeout(d, a || b))
                };
            return e.delay = function(a) {
                c && clearTimeout(c), c = setTimeout(d, a || b)
            }, e.schedule = e, e.call = function() {
                this.cancel(), a()
            }, e.cancel = function() {
                c && clearTimeout(c), c = null
            }, e.isPending = function() {
                return c
            }, e
        }
    }), define("ace/keyboard/textinput", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/lib/dom", "ace/lib/lang"], function(a, b, c) {
        "use strict";
        var d = a("../lib/event"),
            e = a("../lib/useragent"),
            f = a("../lib/dom"),
            g = a("../lib/lang"),
            h = e.isChrome < 18,
            i = e.isIE,
            j = function(a, b) {
                function c(a) {
                    if (!p) {
                        if (p = !0, C) b = 0, c = a ? 0 : l.value.length - 1;
                        else var b = a ? 2 : 1,
                            c = 2;
                        try {
                            l.setSelectionRange(b, c)
                        } catch (d) {}
                        p = !1
                    }
                }

                function j() {
                    p || (l.value = m, e.isWebKit && v.schedule())
                }

                function k() {
                    clearTimeout(P), P = setTimeout(function() {
                        q && (l.style.cssText = q, q = ""), null == b.renderer.$keepTextAreaAtCursor && (b.renderer.$keepTextAreaAtCursor = !0, b.renderer.$moveTextAreaToCursor())
                    }, e.isOldIE ? 200 : 0)
                }
                var l = f.createElement("textarea");
                l.className = "ace_text-input", e.isTouchPad && l.setAttribute("x-palm-disable-auto-cap", !0), l.setAttribute("wrap", "off"), l.setAttribute("autocorrect", "off"), l.setAttribute("autocapitalize", "off"), l.setAttribute("spellcheck", !1), l.style.opacity = "0", e.isOldIE && (l.style.top = "-1000px"), a.insertBefore(l, a.firstChild);
                var m = "",
                    n = !1,
                    o = !1,
                    p = !1,
                    q = "",
                    r = !0;
                try {
                    var s = document.activeElement === l
                } catch (t) {}
                d.addListener(l, "blur", function(a) {
                    b.onBlur(a), s = !1
                }), d.addListener(l, "focus", function(a) {
                    s = !0, b.onFocus(a), c()
                }), this.focus = function() {
                    if (q) return l.focus();
                    var a = l.style.top;
                    l.style.position = "fixed", l.style.top = "0px", l.focus(), setTimeout(function() {
                        l.style.position = "", "0px" == l.style.top && (l.style.top = a)
                    }, 0)
                }, this.blur = function() {
                    l.blur()
                }, this.isFocused = function() {
                    return s
                };
                var u = g.delayedCall(function() {
                        s && c(r)
                    }),
                    v = g.delayedCall(function() {
                        p || (l.value = m, s && c())
                    });
                e.isWebKit || b.addEventListener("changeSelection", function() {
                    b.selection.isEmpty() != r && (r = !r, u.schedule())
                }), j(), s && b.onFocus();
                var w = function(a) {
                    return 0 === a.selectionStart && a.selectionEnd === a.value.length
                };
                if (!l.setSelectionRange && l.createTextRange && (l.setSelectionRange = function(a, b) {
                        var c = this.createTextRange();
                        c.collapse(!0), c.moveStart("character", a), c.moveEnd("character", b), c.select()
                    }, w = function(a) {
                        try {
                            var b = a.ownerDocument.selection.createRange()
                        } catch (c) {}
                        return b && b.parentElement() == a ? b.text == a.value : !1
                    }), e.isOldIE) {
                    var x = !1,
                        y = function(a) {
                            if (!x) {
                                var b = l.value;
                                if (!p && b && b != m) {
                                    if (a && b == m[0]) return z.schedule();
                                    E(b), x = !0, j(), x = !1
                                }
                            }
                        },
                        z = g.delayedCall(y);
                    d.addListener(l, "propertychange", y);
                    var A = {
                        13: 1,
                        27: 1
                    };
                    d.addListener(l, "keyup", function(a) {
                        return !p || l.value && !A[a.keyCode] || setTimeout(N, 0), (l.value.charCodeAt(0) || 0) < 129 ? z.call() : void(p ? M() : L())
                    }), d.addListener(l, "keydown", function(a) {
                        z.schedule(50)
                    })
                }
                var B = function(a) {
                        n ? n = !1 : w(l) ? (b.selectAll(), c()) : C && c(b.selection.isEmpty())
                    },
                    C = null;
                this.setInputHandler = function(a) {
                    C = a
                }, this.getInputHandler = function() {
                    return C
                };
                var D = !1,
                    E = function(a) {
                        C && (a = C(a), C = null), o ? (c(), a && b.onPaste(a), o = !1) : a == m.charAt(0) ? D ? b.execCommand("del", {
                            source: "ace"
                        }) : b.execCommand("backspace", {
                            source: "ace"
                        }) : (a.substring(0, 2) == m ? a = a.substr(2) : a.charAt(0) == m.charAt(0) ? a = a.substr(1) : a.charAt(a.length - 1) == m.charAt(0) && (a = a.slice(0, -1)), a.charAt(a.length - 1) == m.charAt(0) && (a = a.slice(0, -1)), a && b.onTextInput(a)), D && (D = !1)
                    },
                    F = function(a) {
                        if (!p) {
                            var b = l.value;
                            E(b), j()
                        }
                    },
                    G = function(a, b) {
                        var c = a.clipboardData || window.clipboardData;
                        if (c && !h) {
                            var d = i ? "Text" : "text/plain";
                            return b ? c.setData(d, b) !== !1 : c.getData(d)
                        }
                    },
                    H = function(a, e) {
                        var f = b.getCopyText();
                        return f ? void(G(a, f) ? (e ? b.onCut() : b.onCopy(), d.preventDefault(a)) : (n = !0, l.value = f, l.select(), setTimeout(function() {
                            n = !1, j(), c(), e ? b.onCut() : b.onCopy()
                        }))) : d.preventDefault(a)
                    },
                    I = function(a) {
                        H(a, !0)
                    },
                    J = function(a) {
                        H(a, !1)
                    },
                    K = function(a) {
                        var f = G(a);
                        "string" == typeof f ? (f && b.onPaste(f, a), e.isIE && setTimeout(c), d.preventDefault(a)) : (l.value = "", o = !0)
                    };
                d.addCommandKeyListener(l, b.onCommandKey.bind(b)), d.addListener(l, "select", B), d.addListener(l, "input", F), d.addListener(l, "cut", I), d.addListener(l, "copy", J), d.addListener(l, "paste", K), "oncut" in l && "oncopy" in l && "onpaste" in l || d.addListener(a, "keydown", function(a) {
                    if ((!e.isMac || a.metaKey) && a.ctrlKey) switch (a.keyCode) {
                        case 67:
                            J(a);
                            break;
                        case 86:
                            K(a);
                            break;
                        case 88:
                            I(a)
                    }
                });
                var L = function(a) {
                        p || !b.onCompositionStart || b.$readOnly || (p = {}, b.onCompositionStart(), setTimeout(M, 0), b.on("mousedown", N), b.selection.isEmpty() || (b.insert(""), b.session.markUndoGroup(), b.selection.clearSelection()), b.session.markUndoGroup())
                    },
                    M = function() {
                        if (p && b.onCompositionUpdate && !b.$readOnly) {
                            var a = l.value.replace(/\x01/g, "");
                            if (p.lastValue !== a && (b.onCompositionUpdate(a), p.lastValue && b.undo(), p.lastValue = a, p.lastValue)) {
                                var c = b.selection.getRange();
                                b.insert(p.lastValue), b.session.markUndoGroup(), p.range = b.selection.getRange(), b.selection.setRange(c), b.selection.clearSelection()
                            }
                        }
                    },
                    N = function(a) {
                        if (b.onCompositionEnd && !b.$readOnly) {
                            var c = p;
                            p = !1;
                            var d = setTimeout(function() {
                                d = null;
                                var a = l.value.replace(/\x01/g, "");
                                p || (a == c.lastValue ? j() : !c.lastValue && a && (j(), E(a)))
                            });
                            C = function(a) {
                                return d && clearTimeout(d), a = a.replace(/\x01/g, ""), a == c.lastValue ? "" : (c.lastValue && d && b.undo(), a)
                            }, b.onCompositionEnd(), b.removeListener("mousedown", N), "compositionend" == a.type && c.range && b.selection.setRange(c.range)
                        }
                    },
                    O = g.delayedCall(M, 50);
                d.addListener(l, "compositionstart", L), e.isGecko ? d.addListener(l, "text", function() {
                    O.schedule()
                }) : (d.addListener(l, "keyup", function() {
                    O.schedule()
                }), d.addListener(l, "keydown", function() {
                    O.schedule()
                })), d.addListener(l, "compositionend", N), this.getElement = function() {
                    return l
                }, this.setReadOnly = function(a) {
                    l.readOnly = a
                }, this.onContextMenu = function(a) {
                    D = !0, c(b.selection.isEmpty()), b._emit("nativecontextmenu", {
                        target: b,
                        domEvent: a
                    }), this.moveToMouse(a, !0)
                }, this.moveToMouse = function(a, c) {
                    if (c || !e.isOldIE) {
                        q || (q = l.style.cssText), l.style.cssText = (c ? "z-index:100000;" : "") + "height:" + l.style.height + ";" + (e.isIE ? "opacity:0.1;" : "");
                        var g = b.container.getBoundingClientRect(),
                            h = f.computedStyle(b.container),
                            i = g.top + (parseInt(h.borderTopWidth) || 0),
                            j = g.left + (parseInt(g.borderLeftWidth) || 0),
                            m = g.bottom - i - l.clientHeight - 2,
                            n = function(a) {
                                l.style.left = a.clientX - j - 2 + "px", l.style.top = Math.min(a.clientY - i - 2, m) + "px"
                            };
                        n(a), "mousedown" == a.type && (b.renderer.$keepTextAreaAtCursor && (b.renderer.$keepTextAreaAtCursor = null), clearTimeout(P), e.isWin && !e.isOldIE && d.capture(b.container, n, k))
                    }
                }, this.onContextMenuClose = k;
                var P, Q = function(a) {
                    b.textInput.onContextMenu(a), k()
                };
                d.addListener(l, "mouseup", Q), d.addListener(l, "mousedown", function(a) {
                    a.preventDefault(), k()
                }), d.addListener(b.renderer.scroller, "contextmenu", Q), d.addListener(l, "contextmenu", Q)
            };
        b.TextInput = j
    }), define("ace/mouse/default_handlers", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], function(a, b, c) {
        "use strict";

        function d(a) {
            a.$clickSelection = null;
            var b = a.editor;
            b.setDefaultHandler("mousedown", this.onMouseDown.bind(a)), b.setDefaultHandler("dblclick", this.onDoubleClick.bind(a)), b.setDefaultHandler("tripleclick", this.onTripleClick.bind(a)), b.setDefaultHandler("quadclick", this.onQuadClick.bind(a)), b.setDefaultHandler("mousewheel", this.onMouseWheel.bind(a)), b.setDefaultHandler("touchmove", this.onTouchMove.bind(a));
            var c = ["select", "startSelect", "selectEnd", "selectAllEnd", "selectByWordsEnd", "selectByLinesEnd", "dragWait", "dragWaitEnd", "focusWait"];
            c.forEach(function(b) {
                a[b] = this[b]
            }, this), a.selectByLines = this.extendSelectionBy.bind(a, "getLineRange"), a.selectByWords = this.extendSelectionBy.bind(a, "getWordRange")
        }

        function e(a, b, c, d) {
            return Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2))
        }

        function f(a, b) {
            if (a.start.row == a.end.row) var c = 2 * b.column - a.start.column - a.end.column;
            else if (a.start.row != a.end.row - 1 || a.start.column || a.end.column) var c = 2 * b.row - a.start.row - a.end.row;
            else var c = b.column - 4;
            return 0 > c ? {
                cursor: a.start,
                anchor: a.end
            } : {
                cursor: a.end,
                anchor: a.start
            }
        }
        var g = (a("../lib/dom"), a("../lib/event"), a("../lib/useragent"), 0);
        (function() {
            this.onMouseDown = function(a) {
                var b = a.inSelection(),
                    c = a.getDocumentPosition();
                this.mousedownEvent = a;
                var d = this.editor,
                    e = a.getButton();
                if (0 !== e) {
                    var f = d.getSelectionRange(),
                        g = f.isEmpty();
                    return d.$blockScrolling++, (g || 1 == e) && d.selection.moveToPosition(c), d.$blockScrolling--, void(2 == e && d.textInput.onContextMenu(a.domEvent))
                }
                return this.mousedownEvent.time = Date.now(), !b || d.isFocused() || (d.focus(), !this.$focusTimout || this.$clickSelection || d.inMultiSelectMode) ? (this.captureMouse(a), this.startSelect(c, a.domEvent._clicks > 1), a.preventDefault()) : (this.setState("focusWait"), void this.captureMouse(a))
            }, this.startSelect = function(a, b) {
                a = a || this.editor.renderer.screenToTextCoordinates(this.x, this.y);
                var c = this.editor;
                c.$blockScrolling++, this.mousedownEvent.getShiftKey() ? c.selection.selectToPosition(a) : b || c.selection.moveToPosition(a), b || this.select(), c.renderer.scroller.setCapture && c.renderer.scroller.setCapture(), c.setStyle("ace_selecting"), this.setState("select"), c.$blockScrolling--
            }, this.select = function() {
                var a, b = this.editor,
                    c = b.renderer.screenToTextCoordinates(this.x, this.y);
                if (b.$blockScrolling++, this.$clickSelection) {
                    var d = this.$clickSelection.comparePoint(c);
                    if (-1 == d) a = this.$clickSelection.end;
                    else if (1 == d) a = this.$clickSelection.start;
                    else {
                        var e = f(this.$clickSelection, c);
                        c = e.cursor, a = e.anchor
                    }
                    b.selection.setSelectionAnchor(a.row, a.column)
                }
                b.selection.selectToPosition(c), b.$blockScrolling--, b.renderer.scrollCursorIntoView()
            }, this.extendSelectionBy = function(a) {
                var b, c = this.editor,
                    d = c.renderer.screenToTextCoordinates(this.x, this.y),
                    e = c.selection[a](d.row, d.column);
                if (c.$blockScrolling++, this.$clickSelection) {
                    var g = this.$clickSelection.comparePoint(e.start),
                        h = this.$clickSelection.comparePoint(e.end);
                    if (-1 == g && 0 >= h) b = this.$clickSelection.end, (e.end.row != d.row || e.end.column != d.column) && (d = e.start);
                    else if (1 == h && g >= 0) b = this.$clickSelection.start, (e.start.row != d.row || e.start.column != d.column) && (d = e.end);
                    else if (-1 == g && 1 == h) d = e.end, b = e.start;
                    else {
                        var i = f(this.$clickSelection, d);
                        d = i.cursor, b = i.anchor
                    }
                    c.selection.setSelectionAnchor(b.row, b.column)
                }
                c.selection.selectToPosition(d), c.$blockScrolling--, c.renderer.scrollCursorIntoView()
            }, this.selectEnd = this.selectAllEnd = this.selectByWordsEnd = this.selectByLinesEnd = function() {
                this.$clickSelection = null, this.editor.unsetStyle("ace_selecting"), this.editor.renderer.scroller.releaseCapture && this.editor.renderer.scroller.releaseCapture()
            }, this.focusWait = function() {
                var a = e(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y),
                    b = Date.now();
                (a > g || b - this.mousedownEvent.time > this.$focusTimout) && this.startSelect(this.mousedownEvent.getDocumentPosition())
            }, this.onDoubleClick = function(a) {
                var b = a.getDocumentPosition(),
                    c = this.editor,
                    d = c.session,
                    e = d.getBracketRange(b);
                e ? (e.isEmpty() && (e.start.column--, e.end.column++), this.setState("select")) : (e = c.selection.getWordRange(b.row, b.column), this.setState("selectByWords")), this.$clickSelection = e, this.select()
            }, this.onTripleClick = function(a) {
                var b = a.getDocumentPosition(),
                    c = this.editor;
                this.setState("selectByLines");
                var d = c.getSelectionRange();
                d.isMultiLine() && d.contains(b.row, b.column) ? (this.$clickSelection = c.selection.getLineRange(d.start.row), this.$clickSelection.end = c.selection.getLineRange(d.end.row).end) : this.$clickSelection = c.selection.getLineRange(b.row), this.select()
            }, this.onQuadClick = function(a) {
                var b = this.editor;
                b.selectAll(), this.$clickSelection = b.getSelectionRange(), this.setState("selectAll")
            }, this.onMouseWheel = function(a) {
                if (!a.getAccelKey()) {
                    a.getShiftKey() && a.wheelY && !a.wheelX && (a.wheelX = a.wheelY, a.wheelY = 0);
                    var b = a.domEvent.timeStamp,
                        c = b - (this.$lastScrollTime || 0),
                        d = this.editor,
                        e = d.renderer.isScrollableBy(a.wheelX * a.speed, a.wheelY * a.speed);
                    return e || 200 > c ? (this.$lastScrollTime = b, d.renderer.scrollBy(a.wheelX * a.speed, a.wheelY * a.speed), a.stop()) : void 0
                }
            }, this.onTouchMove = function(a) {
                var b = a.domEvent.timeStamp,
                    c = b - (this.$lastScrollTime || 0),
                    d = this.editor,
                    e = d.renderer.isScrollableBy(a.wheelX * a.speed, a.wheelY * a.speed);
                return e || 200 > c ? (this.$lastScrollTime = b, d.renderer.scrollBy(a.wheelX * a.speed, a.wheelY * a.speed), a.stop()) : void 0
            }
        }).call(d.prototype), b.DefaultHandlers = d
    }), define("ace/tooltip", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom"], function(a, b, c) {
        "use strict";

        function d(a) {
            this.isOpen = !1, this.$element = null, this.$parentNode = a
        }
        var e = (a("./lib/oop"), a("./lib/dom"));
        (function() {
            this.$init = function() {
                return this.$element = e.createElement("div"), this.$element.className = "ace_tooltip", this.$element.style.display = "none", this.$parentNode.appendChild(this.$element), this.$element
            }, this.getElement = function() {
                return this.$element || this.$init()
            }, this.setText = function(a) {
                e.setInnerText(this.getElement(), a)
            }, this.setHtml = function(a) {
                this.getElement().innerHTML = a
            }, this.setPosition = function(a, b) {
                this.getElement().style.left = a + "px", this.getElement().style.top = b + "px"
            }, this.setClassName = function(a) {
                e.addCssClass(this.getElement(), a)
            }, this.show = function(a, b, c) {
                null != a && this.setText(a), null != b && null != c && this.setPosition(b, c), this.isOpen || (this.getElement().style.display = "block", this.isOpen = !0)
            }, this.hide = function() {
                this.isOpen && (this.getElement().style.display = "none", this.isOpen = !1)
            }, this.getHeight = function() {
                return this.getElement().offsetHeight
            }, this.getWidth = function() {
                return this.getElement().offsetWidth
            }
        }).call(d.prototype), b.Tooltip = d
    }), define("ace/mouse/default_gutter_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/event", "ace/tooltip"], function(a, b, c) {
        "use strict";

        function d(a) {
            function b() {
                var b = l.getDocumentPosition().row,
                    e = i.$annotations[b];
                if (!e) return c();
                var f = g.session.getLength();
                if (b == f) {
                    var h = g.renderer.pixelToScreenCoordinates(0, l.y).row,
                        k = l.$pos;
                    if (h > g.session.documentToScreenRow(k.row, k.column)) return c()
                }
                if (m != e)
                    if (m = e.text.join("<br/>"), j.setHtml(m), j.show(), g.on("mousewheel", c), a.$tooltipFollowsMouse) d(l);
                    else {
                        var n = l.domEvent.target,
                            o = n.getBoundingClientRect(),
                            p = j.getElement().style;
                        p.left = o.right + "px", p.top = o.bottom + "px"
                    }
            }

            function c() {
                k && (k = clearTimeout(k)), m && (j.hide(), m = null, g.removeEventListener("mousewheel", c))
            }

            function d(a) {
                j.setPosition(a.x, a.y)
            }
            var g = a.editor,
                i = g.renderer.$gutterLayer,
                j = new e(g.container);
            a.editor.setDefaultHandler("guttermousedown", function(b) {
                if (g.isFocused() && 0 == b.getButton()) {
                    var c = i.getRegion(b);
                    if ("foldWidgets" != c) {
                        var d = b.getDocumentPosition().row,
                            e = g.session.selection;
                        if (b.getShiftKey()) e.selectTo(d, 0);
                        else {
                            if (2 == b.domEvent.detail) return g.selectAll(), b.preventDefault();
                            a.$clickSelection = g.selection.getLineRange(d)
                        }
                        return a.setState("selectByLines"), a.captureMouse(b), b.preventDefault()
                    }
                }
            });
            var k, l, m;
            a.editor.setDefaultHandler("guttermousemove", function(e) {
                var g = e.domEvent.target || e.domEvent.srcElement;
                return f.hasCssClass(g, "ace_fold-widget") ? c() : (m && a.$tooltipFollowsMouse && d(e), l = e, void(k || (k = setTimeout(function() {
                    k = null, l && !a.isMousePressed ? b() : c()
                }, 50))))
            }), h.addListener(g.renderer.$gutter, "mouseout", function(a) {
                l = null, m && !k && (k = setTimeout(function() {
                    k = null, c()
                }, 50))
            }), g.on("changeSession", c)
        }

        function e(a) {
            i.call(this, a)
        }
        var f = a("../lib/dom"),
            g = a("../lib/oop"),
            h = a("../lib/event"),
            i = a("../tooltip").Tooltip;
        g.inherits(e, i),
            function() {
                this.setPosition = function(a, b) {
                    var c = window.innerWidth || document.documentElement.clientWidth,
                        d = window.innerHeight || document.documentElement.clientHeight,
                        e = this.getWidth(),
                        f = this.getHeight();
                    a += 15, b += 15, a + e > c && (a -= a + e - c), b + f > d && (b -= 20 + f), i.prototype.setPosition.call(this, a, b)
                }
            }.call(e.prototype), b.GutterHandler = d
    }), define("ace/mouse/mouse_event", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"], function(a, b, c) {
        "use strict";
        var d = a("../lib/event"),
            e = a("../lib/useragent"),
            f = b.MouseEvent = function(a, b) {
                this.domEvent = a, this.editor = b, this.x = this.clientX = a.clientX, this.y = this.clientY = a.clientY, this.$pos = null, this.$inSelection = null, this.propagationStopped = !1, this.defaultPrevented = !1
            };
        (function() {
            this.stopPropagation = function() {
                d.stopPropagation(this.domEvent), this.propagationStopped = !0
            }, this.preventDefault = function() {
                d.preventDefault(this.domEvent), this.defaultPrevented = !0
            }, this.stop = function() {
                this.stopPropagation(), this.preventDefault()
            }, this.getDocumentPosition = function() {
                return this.$pos ? this.$pos : (this.$pos = this.editor.renderer.screenToTextCoordinates(this.clientX, this.clientY), this.$pos)
            }, this.inSelection = function() {
                if (null !== this.$inSelection) return this.$inSelection;
                var a = this.editor,
                    b = a.getSelectionRange();
                if (b.isEmpty()) this.$inSelection = !1;
                else {
                    var c = this.getDocumentPosition();
                    this.$inSelection = b.contains(c.row, c.column)
                }
                return this.$inSelection
            }, this.getButton = function() {
                return d.getButton(this.domEvent)
            }, this.getShiftKey = function() {
                return this.domEvent.shiftKey
            }, this.getAccelKey = e.isMac ? function() {
                return this.domEvent.metaKey
            } : function() {
                return this.domEvent.ctrlKey
            }
        }).call(f.prototype)
    }), define("ace/mouse/dragdrop_handler", ["require", "exports", "module", "ace/lib/dom", "ace/lib/event", "ace/lib/useragent"], function(a, b, c) {
        "use strict";

        function d(a) {
            function b(a, b) {
                var c = Date.now(),
                    d = !b || a.row != b.row,
                    f = !b || a.column != b.column;
                if (!C || d || f) q.$blockScrolling += 1, q.moveCursorToPosition(a), q.$blockScrolling -= 1, C = c, D = {
                    x: u,
                    y: v
                };
                else {
                    var g = e(D.x, D.y, u, v);
                    g > k ? C = null : c - C >= j && (q.renderer.scrollCursorIntoView(), C = null)
                }
            }

            function c(a, b) {
                var c = Date.now(),
                    d = q.renderer.layerConfig.lineHeight,
                    e = q.renderer.layerConfig.characterWidth,
                    f = q.renderer.scroller.getBoundingClientRect(),
                    g = {
                        x: {
                            left: u - f.left,
                            right: f.right - u
                        },
                        y: {
                            top: v - f.top,
                            bottom: f.bottom - v
                        }
                    },
                    h = Math.min(g.x.left, g.x.right),
                    j = Math.min(g.y.top, g.y.bottom),
                    k = {
                        row: a.row,
                        column: a.column
                    };
                2 >= h / e && (k.column += g.x.left < g.x.right ? -3 : 2), 1 >= j / d && (k.row += g.y.top < g.y.bottom ? -1 : 1);
                var l = a.row != k.row,
                    m = a.column != k.column,
                    n = !b || a.row != b.row;
                l || m && !n ? B ? c - B >= i && q.renderer.scrollCursorIntoView(k) : B = c : B = null
            }

            function d() {
                var a = y;
                y = q.renderer.screenToTextCoordinates(u, v), b(y, a), c(y, a)
            }

            function l() {
                x = q.selection.toOrientedRange(), t = q.session.addMarker(x, "ace_selection", q.getSelectionStyle()), q.clearSelection(), q.isFocused() && q.renderer.$cursorLayer.setBlinking(!1), clearInterval(w), d(), w = setInterval(d, 20), F = 0, g.addListener(document, "mousemove", n)
            }

            function m() {
                clearInterval(w), q.session.removeMarker(t), t = null, q.$blockScrolling += 1, q.selection.fromOrientedRange(x), q.$blockScrolling -= 1, q.isFocused() && !A && q.renderer.$cursorLayer.setBlinking(!q.getReadOnly()), x = null, y = null, F = 0, B = null, C = null, g.removeListener(document, "mousemove", n)
            }

            function n() {
                null == G && (G = setTimeout(function() {
                    null != G && t && m()
                }, 20))
            }

            function o(a) {
                var b = a.types;
                return !b || Array.prototype.some.call(b, function(a) {
                    return "text/plain" == a || "Text" == a
                })
            }

            function p(a) {
                var b = ["copy", "copymove", "all", "uninitialized"],
                    c = ["move", "copymove", "linkmove", "all", "uninitialized"],
                    d = h.isMac ? a.altKey : a.ctrlKey,
                    e = "uninitialized";
                try {
                    e = a.dataTransfer.effectAllowed.toLowerCase()
                } catch (a) {}
                var f = "none";
                return d && b.indexOf(e) >= 0 ? f = "copy" : c.indexOf(e) >= 0 ? f = "move" : b.indexOf(e) >= 0 && (f = "copy"), f
            }
            var q = a.editor,
                r = f.createElement("img");
            r.src = "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==", h.isOpera && (r.style.cssText = "width:1px;height:1px;position:fixed;top:0;left:0;z-index:2147483647;opacity:0;");
            var s = ["dragWait", "dragWaitEnd", "startDrag", "dragReadyEnd", "onMouseDrag"];
            s.forEach(function(b) {
                a[b] = this[b]
            }, this), q.addEventListener("mousedown", this.onMouseDown.bind(a));
            var t, u, v, w, x, y, z, A, B, C, D, E = q.container,
                F = 0;
            this.onDragStart = function(a) {
                if (this.cancelDrag || !E.draggable) {
                    var b = this;
                    return setTimeout(function() {
                        b.startSelect(), b.captureMouse(a)
                    }, 0), a.preventDefault()
                }
                x = q.getSelectionRange();
                var c = a.dataTransfer;
                c.effectAllowed = q.getReadOnly() ? "copy" : "copyMove", h.isOpera && (q.container.appendChild(r), r.scrollTop = 0), c.setDragImage && c.setDragImage(r, 0, 0), h.isOpera && q.container.removeChild(r), c.clearData(), c.setData("Text", q.session.getTextRange()), A = !0, this.setState("drag")
            }, this.onDragEnd = function(a) {
                if (E.draggable = !1, A = !1, this.setState(null), !q.getReadOnly()) {
                    var b = a.dataTransfer.dropEffect;
                    z || "move" != b || q.session.remove(q.getSelectionRange()), q.renderer.$cursorLayer.setBlinking(!0)
                }
                this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle("")
            }, this.onDragEnter = function(a) {
                return !q.getReadOnly() && o(a.dataTransfer) ? (u = a.clientX, v = a.clientY, t || l(), F++, a.dataTransfer.dropEffect = z = p(a), g.preventDefault(a)) : void 0
            }, this.onDragOver = function(a) {
                return !q.getReadOnly() && o(a.dataTransfer) ? (u = a.clientX, v = a.clientY, t || (l(), F++), null !== G && (G = null), a.dataTransfer.dropEffect = z = p(a), g.preventDefault(a)) : void 0
            }, this.onDragLeave = function(a) {
                return F--, 0 >= F && t ? (m(), z = null, g.preventDefault(a)) : void 0
            }, this.onDrop = function(a) {
                if (y) {
                    var b = a.dataTransfer;
                    if (A) switch (z) {
                        case "move":
                            x = x.contains(y.row, y.column) ? {
                                start: y,
                                end: y
                            } : q.moveText(x, y);
                            break;
                        case "copy":
                            x = q.moveText(x, y, !0)
                    } else {
                        var c = b.getData("Text");
                        x = {
                            start: y,
                            end: q.session.insert(y, c)
                        }, q.focus(), z = null
                    }
                    return m(), g.preventDefault(a)
                }
            }, g.addListener(E, "dragstart", this.onDragStart.bind(a)), g.addListener(E, "dragend", this.onDragEnd.bind(a)), g.addListener(E, "dragenter", this.onDragEnter.bind(a)), g.addListener(E, "dragover", this.onDragOver.bind(a)), g.addListener(E, "dragleave", this.onDragLeave.bind(a)), g.addListener(E, "drop", this.onDrop.bind(a));
            var G = null
        }

        function e(a, b, c, d) {
            return Math.sqrt(Math.pow(c - a, 2) + Math.pow(d - b, 2))
        }
        var f = a("../lib/dom"),
            g = a("../lib/event"),
            h = a("../lib/useragent"),
            i = 200,
            j = 200,
            k = 5;
        (function() {
            this.dragWait = function() {
                var a = Date.now() - this.mousedownEvent.time;
                a > this.editor.getDragDelay() && this.startDrag()
            }, this.dragWaitEnd = function() {
                var a = this.editor.container;
                a.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition()), this.selectEnd()
            }, this.dragReadyEnd = function(a) {
                this.editor.renderer.$cursorLayer.setBlinking(!this.editor.getReadOnly()), this.editor.unsetStyle("ace_dragging"), this.editor.renderer.setCursorStyle(""), this.dragWaitEnd()
            }, this.startDrag = function() {
                this.cancelDrag = !1;
                var a = this.editor,
                    b = a.container;
                b.draggable = !0, a.renderer.$cursorLayer.setBlinking(!1), a.setStyle("ace_dragging");
                var c = h.isWin ? "default" : "move";
                a.renderer.setCursorStyle(c), this.setState("dragReady")
            }, this.onMouseDrag = function(a) {
                var b = this.editor.container;
                if (h.isIE && "dragReady" == this.state) {
                    var c = e(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
                    c > 3 && b.dragDrop()
                }
                if ("dragWait" === this.state) {
                    var c = e(this.mousedownEvent.x, this.mousedownEvent.y, this.x, this.y);
                    c > 0 && (b.draggable = !1, this.startSelect(this.mousedownEvent.getDocumentPosition()))
                }
            }, this.onMouseDown = function(a) {
                if (this.$dragEnabled) {
                    this.mousedownEvent = a;
                    var b = this.editor,
                        c = a.inSelection(),
                        d = a.getButton(),
                        e = a.domEvent.detail || 1;
                    if (1 === e && 0 === d && c) {
                        if (a.editor.inMultiSelectMode && (a.getAccelKey() || a.getShiftKey())) return;
                        this.mousedownEvent.time = Date.now();
                        var f = a.domEvent.target || a.domEvent.srcElement;
                        if ("unselectable" in f && (f.unselectable = "on"), b.getDragDelay()) {
                            if (h.isWebKit) {
                                this.cancelDrag = !0;
                                var g = b.container;
                                g.draggable = !0
                            }
                            this.setState("dragWait")
                        } else this.startDrag();
                        this.captureMouse(a, this.onMouseDrag.bind(this)), a.defaultPrevented = !0
                    }
                }
            }
        }).call(d.prototype), b.DragdropHandler = d
    }), define("ace/lib/net", ["require", "exports", "module", "ace/lib/dom"], function(a, b, c) {
        "use strict";
        var d = a("./dom");
        b.get = function(a, b) {
            var c = new XMLHttpRequest;
            c.open("GET", a, !0), c.onreadystatechange = function() {
                4 === c.readyState && b(c.responseText)
            }, c.send(null)
        }, b.loadScript = function(a, b) {
            var c = d.getDocumentHead(),
                e = document.createElement("script");
            e.src = a, c.appendChild(e), e.onload = e.onreadystatechange = function(a, c) {
                (c || !e.readyState || "loaded" == e.readyState || "complete" == e.readyState) && (e = e.onload = e.onreadystatechange = null, c || b())
            }
        }, b.qualifyURL = function(a) {
            var b = document.createElement("a");
            return b.href = a, b.href
        }
    }), define("ace/lib/event_emitter", ["require", "exports", "module"], function(a, b, c) {
        "use strict";
        var d = {},
            e = function() {
                this.propagationStopped = !0
            },
            f = function() {
                this.defaultPrevented = !0
            };
        d._emit = d._dispatchEvent = function(a, b) {
            this._eventRegistry || (this._eventRegistry = {}), this._defaultHandlers || (this._defaultHandlers = {});
            var c = this._eventRegistry[a] || [],
                d = this._defaultHandlers[a];
            if (c.length || d) {
                "object" == typeof b && b || (b = {}), b.type || (b.type = a), b.stopPropagation || (b.stopPropagation = e), b.preventDefault || (b.preventDefault = f), c = c.slice();
                for (var g = 0; g < c.length && (c[g](b, this), !b.propagationStopped); g++);
                return d && !b.defaultPrevented ? d(b, this) : void 0
            }
        }, d._signal = function(a, b) {
            var c = (this._eventRegistry || {})[a];
            if (c) {
                c = c.slice();
                for (var d = 0; d < c.length; d++) c[d](b, this)
            }
        }, d.once = function(a, b) {
            var c = this;
            b && this.addEventListener(a, function d() {
                c.removeEventListener(a, d), b.apply(null, arguments)
            })
        }, d.setDefaultHandler = function(a, b) {
            var c = this._defaultHandlers;
            if (c || (c = this._defaultHandlers = {
                    _disabled_: {}
                }), c[a]) {
                var d = c[a],
                    e = c._disabled_[a];
                e || (c._disabled_[a] = e = []), e.push(d);
                var f = e.indexOf(b); - 1 != f && e.splice(f, 1)
            }
            c[a] = b
        }, d.removeDefaultHandler = function(a, b) {
            var c = this._defaultHandlers;
            if (c) {
                var d = c._disabled_[a];
                if (c[a] == b) {
                    c[a];
                    d && this.setDefaultHandler(a, d.pop())
                } else if (d) {
                    var e = d.indexOf(b); - 1 != e && d.splice(e, 1)
                }
            }
        }, d.on = d.addEventListener = function(a, b, c) {
            this._eventRegistry = this._eventRegistry || {};
            var d = this._eventRegistry[a];
            return d || (d = this._eventRegistry[a] = []), -1 == d.indexOf(b) && d[c ? "unshift" : "push"](b), b
        }, d.off = d.removeListener = d.removeEventListener = function(a, b) {
            this._eventRegistry = this._eventRegistry || {};
            var c = this._eventRegistry[a];
            if (c) {
                var d = c.indexOf(b); - 1 !== d && c.splice(d, 1)
            }
        }, d.removeAllListeners = function(a) {
            this._eventRegistry && (this._eventRegistry[a] = [])
        }, b.EventEmitter = d
    }), define("ace/lib/app_config", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(a, b, c) {
        "no use strict";

        function d(a) {
            "undefined" != typeof console && console.warn
        }

        function e(a, b) {
            var c = new Error(a);
            c.data = b, "object" == typeof console && console.error && console.error(c), setTimeout(function() {
                throw c
            })
        }
        var f = a("./oop"),
            g = a("./event_emitter").EventEmitter,
            h = {
                setOptions: function(a) {
                    Object.keys(a).forEach(function(b) {
                        this.setOption(b, a[b])
                    }, this)
                },
                getOptions: function(a) {
                    var b = {};
                    return a ? Array.isArray(a) || (b = a, a = Object.keys(b)) : a = Object.keys(this.$options), a.forEach(function(a) {
                        b[a] = this.getOption(a)
                    }, this), b
                },
                setOption: function(a, b) {
                    if (this["$" + a] !== b) {
                        var c = this.$options[a];
                        if (!c) return d('misspelled option "' + a + '"');
                        if (c.forwardTo) return this[c.forwardTo] && this[c.forwardTo].setOption(a, b);
                        c.handlesSet || (this["$" + a] = b), c && c.set && c.set.call(this, b)
                    }
                },
                getOption: function(a) {
                    var b = this.$options[a];
                    return b ? b.forwardTo ? this[b.forwardTo] && this[b.forwardTo].getOption(a) : b && b.get ? b.get.call(this) : this["$" + a] : d('misspelled option "' + a + '"')
                }
            },
            i = function() {
                this.$defaultOptions = {}
            };
        (function() {
            f.implement(this, g), this.defineOptions = function(a, b, c) {
                return a.$options || (this.$defaultOptions[b] = a.$options = {}), Object.keys(c).forEach(function(b) {
                    var d = c[b];
                    "string" == typeof d && (d = {
                        forwardTo: d
                    }), d.name || (d.name = b), a.$options[d.name] = d, "initialValue" in d && (a["$" + d.name] = d.initialValue)
                }), f.implement(a, h), this
            }, this.resetOptions = function(a) {
                Object.keys(a.$options).forEach(function(b) {
                    var c = a.$options[b];
                    "value" in c && a.setOption(b, c.value)
                })
            }, this.setDefaultValue = function(a, b, c) {
                var d = this.$defaultOptions[a] || (this.$defaultOptions[a] = {});
                d[b] && (d.forwardTo ? this.setDefaultValue(d.forwardTo, b, c) : d[b].value = c)
            }, this.setDefaultValues = function(a, b) {
                Object.keys(b).forEach(function(c) {
                    this.setDefaultValue(a, c, b[c])
                }, this)
            }, this.warn = d, this.reportError = e
        }).call(i.prototype), b.AppConfig = i
    }), define("ace/config", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/lib/net", "ace/lib/app_config"], function(a, b, c) {
        "no use strict";

        function d(d) {
            if (i && i.document) {
                j.packaged = d || a.packaged || c.packaged || i.define && define.packaged;
                for (var f = {}, g = "", h = document.currentScript || document._currentScript, k = h && h.ownerDocument || document, l = k.getElementsByTagName("script"), m = 0; m < l.length; m++) {
                    var n = l[m],
                        o = n.src || n.getAttribute("src");
                    if (o) {
                        for (var p = n.attributes, q = 0, r = p.length; r > q; q++) {
                            var s = p[q];
                            0 === s.name.indexOf("data-ace-") && (f[e(s.name.replace(/^data-ace-/, ""))] = s.value)
                        }
                        var t = o.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);
                        t && (g = t[1])
                    }
                }
                g && (f.base = f.base || g, f.packaged = !0), f.basePath = f.base, f.workerPath = f.workerPath || f.base, f.modePath = f.modePath || f.base, f.themePath = f.themePath || f.base, delete f.base;
                for (var u in f) "undefined" != typeof f[u] && b.set(u, f[u])
            }
        }

        function e(a) {
            return a.replace(/-(.)/g, function(a, b) {
                return b.toUpperCase()
            })
        }
        var f = a("./lib/lang"),
            g = (a("./lib/oop"), a("./lib/net")),
            h = a("./lib/app_config").AppConfig;
        c.exports = b = new h;
        var i = function() {
                return this || "undefined" != typeof window && window
            }(),
            j = {
                packaged: !1,
                workerPath: null,
                modePath: null,
                themePath: null,
                basePath: "",
                suffix: ".js",
                $moduleUrls: {}
            };
        b.get = function(a) {
            if (!j.hasOwnProperty(a)) throw new Error("Unknown config key: " + a);
            return j[a]
        }, b.set = function(a, b) {
            if (!j.hasOwnProperty(a)) throw new Error("Unknown config key: " + a);
            j[a] = b
        }, b.all = function() {
            return f.copyObject(j)
        }, b.moduleUrl = function(a, b) {
            if (j.$moduleUrls[a]) return j.$moduleUrls[a];
            var c = a.split("/");
            b = b || c[c.length - 2] || "";
            var d = "snippets" == b ? "/" : "-",
                e = c[c.length - 1];
            if ("worker" == b && "-" == d) {
                var f = new RegExp("^" + b + "[\\-_]|[\\-_]" + b + "$", "g");
                e = e.replace(f, "")
            }(!e || e == b) && c.length > 1 && (e = c[c.length - 2]);
            var g = j[b + "Path"];
            return null == g ? g = j.basePath : "/" == d && (b = d = ""), g && "/" != g.slice(-1) && (g += "/"), g + b + d + e + this.get("suffix")
        }, b.setModuleUrl = function(a, b) {
            return j.$moduleUrls[a] = b
        }, b.$loading = {}, b.loadModule = function(c, d) {
            var e, f;
            Array.isArray(c) && (f = c[0], c = c[1]);
            try {
                e = a(c)
            } catch (h) {}
            if (e && !b.$loading[c]) return d && d(e);
            if (b.$loading[c] || (b.$loading[c] = []), b.$loading[c].push(d), !(b.$loading[c].length > 1)) {
                var i = function() {
                    a([c], function(a) {
                        b._emit("load.module", {
                            name: c,
                            module: a
                        });
                        var d = b.$loading[c];
                        b.$loading[c] = null, d.forEach(function(b) {
                            b && b(a)
                        })
                    })
                };
                return b.get("packaged") ? void g.loadScript(b.moduleUrl(c, f), i) : i()
            }
        }, d(!0), b.init = d
    }), define("ace/mouse/mouse_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent", "ace/mouse/default_handlers", "ace/mouse/default_gutter_handler", "ace/mouse/mouse_event", "ace/mouse/dragdrop_handler", "ace/config"], function(a, b, c) {
        "use strict";
        var d = a("../lib/event"),
            e = a("../lib/useragent"),
            f = a("./default_handlers").DefaultHandlers,
            g = a("./default_gutter_handler").GutterHandler,
            h = a("./mouse_event").MouseEvent,
            i = a("./dragdrop_handler").DragdropHandler,
            j = a("../config"),
            k = function(a) {
                var b = this;
                this.editor = a, new f(this), new g(this), new i(this);
                var c = function(b) {
                        var c = !document.hasFocus || !document.hasFocus() || !a.isFocused() && document.activeElement == (a.textInput && a.textInput.getElement());
                        c && window.focus(), a.focus()
                    },
                    h = a.renderer.getMouseEventTarget();
                d.addListener(h, "click", this.onMouseEvent.bind(this, "click")), d.addListener(h, "mousemove", this.onMouseMove.bind(this, "mousemove")), d.addMultiMouseDownListener([h, a.renderer.scrollBarV && a.renderer.scrollBarV.inner, a.renderer.scrollBarH && a.renderer.scrollBarH.inner, a.textInput && a.textInput.getElement()].filter(Boolean), [400, 300, 250], this, "onMouseEvent"), d.addMouseWheelListener(a.container, this.onMouseWheel.bind(this, "mousewheel")), d.addTouchMoveListener(a.container, this.onTouchMove.bind(this, "touchmove"));
                var j = a.renderer.$gutter;
                d.addListener(j, "mousedown", this.onMouseEvent.bind(this, "guttermousedown")), d.addListener(j, "click", this.onMouseEvent.bind(this, "gutterclick")), d.addListener(j, "dblclick", this.onMouseEvent.bind(this, "gutterdblclick")), d.addListener(j, "mousemove", this.onMouseEvent.bind(this, "guttermousemove")), d.addListener(h, "mousedown", c), d.addListener(j, "mousedown", c), e.isIE && a.renderer.scrollBarV && (d.addListener(a.renderer.scrollBarV.element, "mousedown", c), d.addListener(a.renderer.scrollBarH.element, "mousedown", c)), a.on("mousemove", function(c) {
                    if (!b.state && !b.$dragDelay && b.$dragEnabled) {
                        var d = a.renderer.screenToTextCoordinates(c.x, c.y),
                            e = a.session.selection.getRange(),
                            f = a.renderer;
                        !e.isEmpty() && e.insideStart(d.row, d.column) ? f.setCursorStyle("default") : f.setCursorStyle("")
                    }
                })
            };
        (function() {
            this.onMouseEvent = function(a, b) {
                this.editor._emit(a, new h(b, this.editor))
            }, this.onMouseMove = function(a, b) {
                var c = this.editor._eventRegistry && this.editor._eventRegistry.mousemove;
                c && c.length && this.editor._emit(a, new h(b, this.editor))
            }, this.onMouseWheel = function(a, b) {
                var c = new h(b, this.editor);
                c.speed = 2 * this.$scrollSpeed, c.wheelX = b.wheelX, c.wheelY = b.wheelY, this.editor._emit(a, c)
            }, this.onTouchMove = function(a, b) {
                var c = new h(b, this.editor);
                c.speed = 1, c.wheelX = b.wheelX, c.wheelY = b.wheelY, this.editor._emit(a, c)
            }, this.setState = function(a) {
                this.state = a
            }, this.captureMouse = function(a, b) {
                this.x = a.x, this.y = a.y, this.isMousePressed = !0;
                var c = this.editor.renderer;
                c.$keepTextAreaAtCursor && (c.$keepTextAreaAtCursor = null);
                var f = this,
                    g = function(a) {
                        if (a) {
                            if (e.isWebKit && !a.which && f.releaseMouse) return f.releaseMouse();
                            f.x = a.clientX, f.y = a.clientY, b && b(a), f.mouseEvent = new h(a, f.editor), f.$mouseMoved = !0
                        }
                    },
                    i = function(a) {
                        clearInterval(k), j(), f[f.state + "End"] && f[f.state + "End"](a), f.state = "", null == c.$keepTextAreaAtCursor && (c.$keepTextAreaAtCursor = !0, c.$moveTextAreaToCursor()), f.isMousePressed = !1, f.$onCaptureMouseMove = f.releaseMouse = null, a && f.onMouseEvent("mouseup", a)
                    },
                    j = function() {
                        f[f.state] && f[f.state](), f.$mouseMoved = !1
                    };
                if (e.isOldIE && "dblclick" == a.domEvent.type) return setTimeout(function() {
                    i(a)
                });
                f.$onCaptureMouseMove = g, f.releaseMouse = d.capture(this.editor.container, g, i);
                var k = setInterval(j, 20)
            }, this.releaseMouse = null, this.cancelContextMenu = function() {
                var a = function(b) {
                    b && b.domEvent && "contextmenu" != b.domEvent.type || (this.editor.off("nativecontextmenu", a), b && b.domEvent && d.stopEvent(b.domEvent))
                }.bind(this);
                setTimeout(a, 10), this.editor.on("nativecontextmenu", a)
            }
        }).call(k.prototype), j.defineOptions(k.prototype, "mouseHandler", {
            scrollSpeed: {
                initialValue: 2
            },
            dragDelay: {
                initialValue: e.isMac ? 150 : 0
            },
            dragEnabled: {
                initialValue: !0
            },
            focusTimout: {
                initialValue: 0
            },
            tooltipFollowsMouse: {
                initialValue: !0
            }
        }), b.MouseHandler = k
    }), define("ace/mouse/fold_handler", ["require", "exports", "module"], function(a, b, c) {
        "use strict";

        function d(a) {
            a.on("click", function(b) {
                var c = b.getDocumentPosition(),
                    d = a.session,
                    e = d.getFoldAt(c.row, c.column, 1);
                e && (b.getAccelKey() ? d.removeFold(e) : d.expandFold(e), b.stop())
            }), a.on("gutterclick", function(b) {
                var c = a.renderer.$gutterLayer.getRegion(b);
                if ("foldWidgets" == c) {
                    var d = b.getDocumentPosition().row,
                        e = a.session;
                    e.foldWidgets && e.foldWidgets[d] && a.session.onFoldWidgetClick(d, b), a.isFocused() || a.focus(), b.stop()
                }
            }), a.on("gutterdblclick", function(b) {
                var c = a.renderer.$gutterLayer.getRegion(b);
                if ("foldWidgets" == c) {
                    var d = b.getDocumentPosition().row,
                        e = a.session,
                        f = e.getParentFoldRangeData(d, !0),
                        g = f.range || f.firstRange;
                    if (g) {
                        d = g.start.row;
                        var h = e.getFoldAt(d, e.getLine(d).length, 1);
                        h ? e.removeFold(h) : (e.addFold("...", g), a.renderer.scrollCursorIntoView({
                            row: g.start.row,
                            column: 0
                        }))
                    }
                    b.stop()
                }
            })
        }
        b.FoldHandler = d
    }), define("ace/keyboard/keybinding", ["require", "exports", "module", "ace/lib/keys", "ace/lib/event"], function(a, b, c) {
        "use strict";
        var d = a("../lib/keys"),
            e = a("../lib/event"),
            f = function(a) {
                this.$editor = a, this.$data = {
                    editor: a
                }, this.$handlers = [], this.setDefaultHandler(a.commands)
            };
        (function() {
            this.setDefaultHandler = function(a) {
                this.removeKeyboardHandler(this.$defaultHandler), this.$defaultHandler = a, this.addKeyboardHandler(a, 0)
            }, this.setKeyboardHandler = function(a) {
                var b = this.$handlers;
                if (b[b.length - 1] != a) {
                    for (; b[b.length - 1] && b[b.length - 1] != this.$defaultHandler;) this.removeKeyboardHandler(b[b.length - 1]);
                    this.addKeyboardHandler(a, 1)
                }
            }, this.addKeyboardHandler = function(a, b) {
                if (a) {
                    "function" != typeof a || a.handleKeyboard || (a.handleKeyboard = a);
                    var c = this.$handlers.indexOf(a); - 1 != c && this.$handlers.splice(c, 1), void 0 == b ? this.$handlers.push(a) : this.$handlers.splice(b, 0, a), -1 == c && a.attach && a.attach(this.$editor)
                }
            }, this.removeKeyboardHandler = function(a) {
                var b = this.$handlers.indexOf(a);
                return -1 == b ? !1 : (this.$handlers.splice(b, 1), a.detach && a.detach(this.$editor), !0)
            }, this.getKeyboardHandler = function() {
                return this.$handlers[this.$handlers.length - 1]
            }, this.getStatusText = function() {
                var a = this.$data,
                    b = a.editor;
                return this.$handlers.map(function(c) {
                    return c.getStatusText && c.getStatusText(b, a) || ""
                }).filter(Boolean).join(" ")
            }, this.$callKeyboardHandlers = function(a, b, c, d) {
                for (var f, g = !1, h = this.$editor.commands, i = this.$handlers.length; i-- && (f = this.$handlers[i].handleKeyboard(this.$data, a, b, c, d), !(f && f.command && (g = "null" == f.command ? !0 : h.exec(f.command, this.$editor, f.args, d), g && d && -1 != a && 1 != f.passEvent && 1 != f.command.passEvent && e.stopEvent(d), g))););
                return g || -1 != a || (f = {
                    command: "insertstring"
                }, g = h.exec("insertstring", this.$editor, b)), g && this.$editor._signal("keyboardActivity", f), g
            }, this.onCommandKey = function(a, b, c) {
                var e = d.keyCodeToString(c);
                this.$callKeyboardHandlers(b, e, c, a)
            }, this.onTextInput = function(a) {
                this.$callKeyboardHandlers(-1, a)
            }
        }).call(f.prototype), b.KeyBinding = f
    }), define("ace/range", ["require", "exports", "module"], function(a, b, c) {
        "use strict";
        var d = function(a, b) {
                return a.row - b.row || a.column - b.column
            },
            e = function(a, b, c, d) {
                this.start = {
                    row: a,
                    column: b
                }, this.end = {
                    row: c,
                    column: d
                }
            };
        (function() {
            this.isEqual = function(a) {
                return this.start.row === a.start.row && this.end.row === a.end.row && this.start.column === a.start.column && this.end.column === a.end.column
            }, this.toString = function() {
                return "Range: [" + this.start.row + "/" + this.start.column + "] -> [" + this.end.row + "/" + this.end.column + "]"
            }, this.contains = function(a, b) {
                return 0 == this.compare(a, b)
            }, this.compareRange = function(a) {
                var b, c = a.end,
                    d = a.start;
                return b = this.compare(c.row, c.column), 1 == b ? (b = this.compare(d.row, d.column), 1 == b ? 2 : 0 == b ? 1 : 0) : -1 == b ? -2 : (b = this.compare(d.row, d.column), -1 == b ? -1 : 1 == b ? 42 : 0)
            }, this.comparePoint = function(a) {
                return this.compare(a.row, a.column)
            }, this.containsRange = function(a) {
                return 0 == this.comparePoint(a.start) && 0 == this.comparePoint(a.end)
            }, this.intersects = function(a) {
                var b = this.compareRange(a);
                return -1 == b || 0 == b || 1 == b
            }, this.isEnd = function(a, b) {
                return this.end.row == a && this.end.column == b
            }, this.isStart = function(a, b) {
                return this.start.row == a && this.start.column == b
            }, this.setStart = function(a, b) {
                "object" == typeof a ? (this.start.column = a.column, this.start.row = a.row) : (this.start.row = a, this.start.column = b)
            }, this.setEnd = function(a, b) {
                "object" == typeof a ? (this.end.column = a.column, this.end.row = a.row) : (this.end.row = a, this.end.column = b)
            }, this.inside = function(a, b) {
                return 0 == this.compare(a, b) ? this.isEnd(a, b) || this.isStart(a, b) ? !1 : !0 : !1
            }, this.insideStart = function(a, b) {
                return 0 == this.compare(a, b) ? this.isEnd(a, b) ? !1 : !0 : !1
            }, this.insideEnd = function(a, b) {
                return 0 == this.compare(a, b) ? this.isStart(a, b) ? !1 : !0 : !1
            }, this.compare = function(a, b) {
                return this.isMultiLine() || a !== this.start.row ? a < this.start.row ? -1 : a > this.end.row ? 1 : this.start.row === a ? b >= this.start.column ? 0 : -1 : this.end.row === a ? b <= this.end.column ? 0 : 1 : 0 : b < this.start.column ? -1 : b > this.end.column ? 1 : 0
            }, this.compareStart = function(a, b) {
                return this.start.row == a && this.start.column == b ? -1 : this.compare(a, b)
            }, this.compareEnd = function(a, b) {
                return this.end.row == a && this.end.column == b ? 1 : this.compare(a, b)
            }, this.compareInside = function(a, b) {
                return this.end.row == a && this.end.column == b ? 1 : this.start.row == a && this.start.column == b ? -1 : this.compare(a, b)
            }, this.clipRows = function(a, b) {
                if (this.end.row > b) var c = {
                    row: b + 1,
                    column: 0
                };
                else if (this.end.row < a) var c = {
                    row: a,
                    column: 0
                };
                if (this.start.row > b) var d = {
                    row: b + 1,
                    column: 0
                };
                else if (this.start.row < a) var d = {
                    row: a,
                    column: 0
                };
                return e.fromPoints(d || this.start, c || this.end)
            }, this.extend = function(a, b) {
                var c = this.compare(a, b);
                if (0 == c) return this;
                if (-1 == c) var d = {
                    row: a,
                    column: b
                };
                else var f = {
                    row: a,
                    column: b
                };
                return e.fromPoints(d || this.start, f || this.end)
            }, this.isEmpty = function() {
                return this.start.row === this.end.row && this.start.column === this.end.column
            }, this.isMultiLine = function() {
                return this.start.row !== this.end.row
            }, this.clone = function() {
                return e.fromPoints(this.start, this.end)
            }, this.collapseRows = function() {
                return 0 == this.end.column ? new e(this.start.row, 0, Math.max(this.start.row, this.end.row - 1), 0) : new e(this.start.row, 0, this.end.row, 0)
            }, this.toScreenRange = function(a) {
                var b = a.documentToScreenPosition(this.start),
                    c = a.documentToScreenPosition(this.end);
                return new e(b.row, b.column, c.row, c.column)
            }, this.moveBy = function(a, b) {
                this.start.row += a, this.start.column += b, this.end.row += a, this.end.column += b
            }
        }).call(e.prototype), e.fromPoints = function(a, b) {
            return new e(a.row, a.column, b.row, b.column)
        }, e.comparePoints = d, e.comparePoints = function(a, b) {
            return a.row - b.row || a.column - b.column
        }, b.Range = e
    }), define("ace/selection", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter", "ace/range"], function(a, b, c) {
        "use strict";
        var d = a("./lib/oop"),
            e = a("./lib/lang"),
            f = a("./lib/event_emitter").EventEmitter,
            g = a("./range").Range,
            h = function(a) {
                this.session = a, this.doc = a.getDocument(), this.clearSelection(), this.lead = this.selectionLead = this.doc.createAnchor(0, 0), this.anchor = this.selectionAnchor = this.doc.createAnchor(0, 0);
                var b = this;
                this.lead.on("change", function(a) {
                    b._emit("changeCursor"), b.$isEmpty || b._emit("changeSelection"), b.$keepDesiredColumnOnChange || a.old.column == a.value.column || (b.$desiredColumn = null)
                }), this.selectionAnchor.on("change", function() {
                    b.$isEmpty || b._emit("changeSelection")
                })
            };
        (function() {
            d.implement(this, f), this.isEmpty = function() {
                return this.$isEmpty || this.anchor.row == this.lead.row && this.anchor.column == this.lead.column
            }, this.isMultiLine = function() {
                return this.isEmpty() ? !1 : this.getRange().isMultiLine()
            }, this.getCursor = function() {
                return this.lead.getPosition()
            }, this.setSelectionAnchor = function(a, b) {
                this.anchor.setPosition(a, b), this.$isEmpty && (this.$isEmpty = !1, this._emit("changeSelection"))
            }, this.getSelectionAnchor = function() {
                return this.$isEmpty ? this.getSelectionLead() : this.anchor.getPosition()
            }, this.getSelectionLead = function() {
                return this.lead.getPosition()
            }, this.shiftSelection = function(a) {
                if (this.$isEmpty) return void this.moveCursorTo(this.lead.row, this.lead.column + a);
                var b = this.getSelectionAnchor(),
                    c = this.getSelectionLead(),
                    d = this.isBackwards();
                d && 0 === b.column || this.setSelectionAnchor(b.row, b.column + a), (d || 0 !== c.column) && this.$moveSelection(function() {
                    this.moveCursorTo(c.row, c.column + a)
                })
            }, this.isBackwards = function() {
                var a = this.anchor,
                    b = this.lead;
                return a.row > b.row || a.row == b.row && a.column > b.column
            }, this.getRange = function() {
                var a = this.anchor,
                    b = this.lead;
                return this.isEmpty() ? g.fromPoints(b, b) : this.isBackwards() ? g.fromPoints(b, a) : g.fromPoints(a, b)
            }, this.clearSelection = function() {
                this.$isEmpty || (this.$isEmpty = !0, this._emit("changeSelection"))
            }, this.selectAll = function() {
                var a = this.doc.getLength() - 1;
                this.setSelectionAnchor(0, 0), this.moveCursorTo(a, this.doc.getLine(a).length)
            }, this.setRange = this.setSelectionRange = function(a, b) {
                b ? (this.setSelectionAnchor(a.end.row, a.end.column), this.selectTo(a.start.row, a.start.column)) : (this.setSelectionAnchor(a.start.row, a.start.column), this.selectTo(a.end.row, a.end.column)), this.getRange().isEmpty() && (this.$isEmpty = !0), this.$desiredColumn = null
            }, this.$moveSelection = function(a) {
                var b = this.lead;
                this.$isEmpty && this.setSelectionAnchor(b.row, b.column), a.call(this)
            }, this.selectTo = function(a, b) {
                this.$moveSelection(function() {
                    this.moveCursorTo(a, b)
                })
            }, this.selectToPosition = function(a) {
                this.$moveSelection(function() {
                    this.moveCursorToPosition(a)
                })
            }, this.moveTo = function(a, b) {
                this.clearSelection(), this.moveCursorTo(a, b)
            }, this.moveToPosition = function(a) {
                this.clearSelection(), this.moveCursorToPosition(a)
            }, this.selectUp = function() {
                this.$moveSelection(this.moveCursorUp)
            }, this.selectDown = function() {
                this.$moveSelection(this.moveCursorDown)
            }, this.selectRight = function() {
                this.$moveSelection(this.moveCursorRight)
            }, this.selectLeft = function() {
                this.$moveSelection(this.moveCursorLeft)
            }, this.selectLineStart = function() {
                this.$moveSelection(this.moveCursorLineStart)
            }, this.selectLineEnd = function() {
                this.$moveSelection(this.moveCursorLineEnd)
            }, this.selectFileEnd = function() {
                this.$moveSelection(this.moveCursorFileEnd)
            }, this.selectFileStart = function() {
                this.$moveSelection(this.moveCursorFileStart)
            }, this.selectWordRight = function() {
                this.$moveSelection(this.moveCursorWordRight)
            }, this.selectWordLeft = function() {
                this.$moveSelection(this.moveCursorWordLeft)
            }, this.getWordRange = function(a, b) {
                if ("undefined" == typeof b) {
                    var c = a || this.lead;
                    a = c.row, b = c.column
                }
                return this.session.getWordRange(a, b)
            }, this.selectWord = function() {
                this.setSelectionRange(this.getWordRange())
            }, this.selectAWord = function() {
                var a = this.getCursor(),
                    b = this.session.getAWordRange(a.row, a.column);
                this.setSelectionRange(b)
            }, this.getLineRange = function(a, b) {
                var c, d = "number" == typeof a ? a : this.lead.row,
                    e = this.session.getFoldLine(d);
                return e ? (d = e.start.row, c = e.end.row) : c = d, b === !0 ? new g(d, 0, c, this.session.getLine(c).length) : new g(d, 0, c + 1, 0)
            }, this.selectLine = function() {
                this.setSelectionRange(this.getLineRange())
            }, this.moveCursorUp = function() {
                this.moveCursorBy(-1, 0)
            }, this.moveCursorDown = function() {
                this.moveCursorBy(1, 0)
            }, this.moveCursorLeft = function() {
                var a, b = this.lead.getPosition();
                if (a = this.session.getFoldAt(b.row, b.column, -1)) this.moveCursorTo(a.start.row, a.start.column);
                else if (0 === b.column) b.row > 0 && this.moveCursorTo(b.row - 1, this.doc.getLine(b.row - 1).length);
                else {
                    var c = this.session.getTabSize();
                    this.session.isTabStop(b) && this.doc.getLine(b.row).slice(b.column - c, b.column).split(" ").length - 1 == c ? this.moveCursorBy(0, -c) : this.moveCursorBy(0, -1)
                }
            }, this.moveCursorRight = function() {
                var a, b = this.lead.getPosition();
                if (a = this.session.getFoldAt(b.row, b.column, 1)) this.moveCursorTo(a.end.row, a.end.column);
                else if (this.lead.column == this.doc.getLine(this.lead.row).length) this.lead.row < this.doc.getLength() - 1 && this.moveCursorTo(this.lead.row + 1, 0);
                else {
                    var c = this.session.getTabSize(),
                        b = this.lead;
                    this.session.isTabStop(b) && this.doc.getLine(b.row).slice(b.column, b.column + c).split(" ").length - 1 == c ? this.moveCursorBy(0, c) : this.moveCursorBy(0, 1)
                }
            }, this.moveCursorLineStart = function() {
                var a = this.lead.row,
                    b = this.lead.column,
                    c = this.session.documentToScreenRow(a, b),
                    d = this.session.screenToDocumentPosition(c, 0),
                    e = this.session.getDisplayLine(a, null, d.row, d.column),
                    f = e.match(/^\s*/);
                f[0].length == b || this.session.$useEmacsStyleLineStart || (d.column += f[0].length), this.moveCursorToPosition(d)
            }, this.moveCursorLineEnd = function() {
                var a = this.lead,
                    b = this.session.getDocumentLastRowColumnPosition(a.row, a.column);
                if (this.lead.column == b.column) {
                    var c = this.session.getLine(b.row);
                    if (b.column == c.length) {
                        var d = c.search(/\s+$/);
                        d > 0 && (b.column = d)
                    }
                }
                this.moveCursorTo(b.row, b.column)
            }, this.moveCursorFileEnd = function() {
                var a = this.doc.getLength() - 1,
                    b = this.doc.getLine(a).length;
                this.moveCursorTo(a, b)
            }, this.moveCursorFileStart = function() {
                this.moveCursorTo(0, 0)
            }, this.moveCursorLongWordRight = function() {
                var a, b = this.lead.row,
                    c = this.lead.column,
                    d = this.doc.getLine(b),
                    e = d.substring(c);
                this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0;
                var f = this.session.getFoldAt(b, c, 1);
                return f ? void this.moveCursorTo(f.end.row, f.end.column) : ((a = this.session.nonTokenRe.exec(e)) && (c += this.session.nonTokenRe.lastIndex, this.session.nonTokenRe.lastIndex = 0, e = d.substring(c)), c >= d.length ? (this.moveCursorTo(b, d.length), this.moveCursorRight(), void(b < this.doc.getLength() - 1 && this.moveCursorWordRight())) : ((a = this.session.tokenRe.exec(e)) && (c += this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), void this.moveCursorTo(b, c)))
            }, this.moveCursorLongWordLeft = function() {
                var a, b = this.lead.row,
                    c = this.lead.column;
                if (a = this.session.getFoldAt(b, c, -1)) return void this.moveCursorTo(a.start.row, a.start.column);
                var d = this.session.getFoldStringAt(b, c, -1);
                null == d && (d = this.doc.getLine(b).substring(0, c));
                var f, g = e.stringReverse(d);
                return this.session.nonTokenRe.lastIndex = 0, this.session.tokenRe.lastIndex = 0, (f = this.session.nonTokenRe.exec(g)) && (c -= this.session.nonTokenRe.lastIndex, g = g.slice(this.session.nonTokenRe.lastIndex), this.session.nonTokenRe.lastIndex = 0), 0 >= c ? (this.moveCursorTo(b, 0), this.moveCursorLeft(), void(b > 0 && this.moveCursorWordLeft())) : ((f = this.session.tokenRe.exec(g)) && (c -= this.session.tokenRe.lastIndex, this.session.tokenRe.lastIndex = 0), void this.moveCursorTo(b, c))
            }, this.$shortWordEndIndex = function(a) {
                var b, c, d = 0,
                    e = /\s/,
                    f = this.session.tokenRe;
                if (f.lastIndex = 0, b = this.session.tokenRe.exec(a)) d = this.session.tokenRe.lastIndex;
                else {
                    for (;
                        (c = a[d]) && e.test(c);) d++;
                    if (1 > d)
                        for (f.lastIndex = 0;
                            (c = a[d]) && !f.test(c);)
                            if (f.lastIndex = 0, d++, e.test(c)) {
                                if (d > 2) {
                                    d--;
                                    break
                                }
                                for (;
                                    (c = a[d]) && e.test(c);) d++;
                                if (d > 2) break
                            }
                }
                return f.lastIndex = 0, d
            }, this.moveCursorShortWordRight = function() {
                var a = this.lead.row,
                    b = this.lead.column,
                    c = this.doc.getLine(a),
                    d = c.substring(b),
                    e = this.session.getFoldAt(a, b, 1);
                if (e) return this.moveCursorTo(e.end.row, e.end.column);
                if (b == c.length) {
                    var f = this.doc.getLength();
                    do a++, d = this.doc.getLine(a); while (f > a && /^\s*$/.test(d));
                    /^\s+/.test(d) || (d = ""), b = 0
                }
                var g = this.$shortWordEndIndex(d);
                this.moveCursorTo(a, b + g)
            }, this.moveCursorShortWordLeft = function() {
                var a, b = this.lead.row,
                    c = this.lead.column;
                if (a = this.session.getFoldAt(b, c, -1)) return this.moveCursorTo(a.start.row, a.start.column);
                var d = this.session.getLine(b).substring(0, c);
                if (0 === c) {
                    do b--, d = this.doc.getLine(b); while (b > 0 && /^\s*$/.test(d));
                    c = d.length, /\s+$/.test(d) || (d = "")
                }
                var f = e.stringReverse(d),
                    g = this.$shortWordEndIndex(f);
                return this.moveCursorTo(b, c - g)
            }, this.moveCursorWordRight = function() {
                this.session.$selectLongWords ? this.moveCursorLongWordRight() : this.moveCursorShortWordRight()
            }, this.moveCursorWordLeft = function() {
                this.session.$selectLongWords ? this.moveCursorLongWordLeft() : this.moveCursorShortWordLeft()
            }, this.moveCursorBy = function(a, b) {
                var c = this.session.documentToScreenPosition(this.lead.row, this.lead.column);
                0 === b && (this.$desiredColumn ? c.column = this.$desiredColumn : this.$desiredColumn = c.column);
                var d = this.session.screenToDocumentPosition(c.row + a, c.column);
                0 !== a && 0 === b && d.row === this.lead.row && d.column === this.lead.column && this.session.lineWidgets && this.session.lineWidgets[d.row] && (d.row > 0 || a > 0) && d.row++, this.moveCursorTo(d.row, d.column + b, 0 === b)
            }, this.moveCursorToPosition = function(a) {
                this.moveCursorTo(a.row, a.column)
            }, this.moveCursorTo = function(a, b, c) {
                var d = this.session.getFoldAt(a, b, 1);
                d && (a = d.start.row, b = d.start.column), this.$keepDesiredColumnOnChange = !0, this.lead.setPosition(a, b), this.$keepDesiredColumnOnChange = !1, c || (this.$desiredColumn = null)
            }, this.moveCursorToScreen = function(a, b, c) {
                var d = this.session.screenToDocumentPosition(a, b);
                this.moveCursorTo(d.row, d.column, c)
            }, this.detach = function() {
                this.lead.detach(), this.anchor.detach(), this.session = this.doc = null
            }, this.fromOrientedRange = function(a) {
                this.setSelectionRange(a, a.cursor == a.start), this.$desiredColumn = a.desiredColumn || this.$desiredColumn
            }, this.toOrientedRange = function(a) {
                var b = this.getRange();
                return a ? (a.start.column = b.start.column, a.start.row = b.start.row, a.end.column = b.end.column, a.end.row = b.end.row) : a = b, a.cursor = this.isBackwards() ? a.start : a.end, a.desiredColumn = this.$desiredColumn, a
            }, this.getRangeOfMovements = function(a) {
                var b = this.getCursor();
                try {
                    a(this);
                    var c = this.getCursor();
                    return g.fromPoints(b, c)
                } catch (d) {
                    return g.fromPoints(b, b)
                } finally {
                    this.moveCursorToPosition(b)
                }
            }, this.toJSON = function() {
                if (this.rangeCount) var a = this.ranges.map(function(a) {
                    var b = a.clone();
                    return b.isBackwards = a.cursor == a.start, b
                });
                else {
                    var a = this.getRange();
                    a.isBackwards = this.isBackwards()
                }
                return a
            }, this.fromJSON = function(a) {
                if (void 0 == a.start) {
                    if (this.rangeList) {
                        this.toSingleRange(a[0]);
                        for (var b = a.length; b--;) {
                            var c = g.fromPoints(a[b].start, a[b].end);
                            a[b].isBackwards && (c.cursor = c.start), this.addRange(c, !0)
                        }
                        return
                    }
                    a = a[0]
                }
                this.rangeList && this.toSingleRange(a), this.setSelectionRange(a, a.isBackwards)
            }, this.isEqual = function(a) {
                if ((a.length || this.rangeCount) && a.length != this.rangeCount) return !1;
                if (!a.length || !this.ranges) return this.getRange().isEqual(a);
                for (var b = this.ranges.length; b--;)
                    if (!this.ranges[b].isEqual(a[b])) return !1;
                return !0
            }
        }).call(h.prototype), b.Selection = h
    }), define("ace/tokenizer", ["require", "exports", "module", "ace/config"], function(a, b, c) {
        "use strict";
        var d = a("./config"),
            e = 2e3,
            f = function(a) {
                this.states = a, this.regExps = {}, this.matchMappings = {};
                for (var b in this.states) {
                    for (var c = this.states[b], d = [], e = 0, f = this.matchMappings[b] = {
                            defaultToken: "text"
                        }, g = "g", h = [], i = 0; i < c.length; i++) {
                        var j = c[i];
                        if (j.defaultToken && (f.defaultToken = j.defaultToken), j.caseInsensitive && (g = "gi"), null != j.regex) {
                            j.regex instanceof RegExp && (j.regex = j.regex.toString().slice(1, -1));
                            var k = j.regex,
                                l = new RegExp("(?:(" + k + ")|(.))").exec("a").length - 2;
                            Array.isArray(j.token) ? 1 == j.token.length || 1 == l ? j.token = j.token[0] : l - 1 != j.token.length ? (this.reportError("number of classes and regexp groups doesn't match", {
                                rule: j,
                                groupCount: l - 1
                            }), j.token = j.token[0]) : (j.tokenArray = j.token, j.token = null, j.onMatch = this.$arrayTokens) : "function" != typeof j.token || j.onMatch || (l > 1 ? j.onMatch = this.$applyToken : j.onMatch = j.token), l > 1 && (/\\\d/.test(j.regex) ? k = j.regex.replace(/\\([0-9]+)/g, function(a, b) {
                                return "\\" + (parseInt(b, 10) + e + 1)
                            }) : (l = 1, k = this.removeCapturingGroups(j.regex)), j.splitRegex || "string" == typeof j.token || h.push(j)), f[e] = i, e += l, d.push(k), j.onMatch || (j.onMatch = null)
                        }
                    }
                    d.length || (f[0] = 0, d.push("$")), h.forEach(function(a) {
                        a.splitRegex = this.createSplitterRegexp(a.regex, g)
                    }, this), this.regExps[b] = new RegExp("(" + d.join(")|(") + ")|($)", g)
                }
            };
        (function() {
            this.$setMaxTokenCount = function(a) {
                e = 0 | a
            }, this.$applyToken = function(a) {
                var b = this.splitRegex.exec(a).slice(1),
                    c = this.token.apply(this, b);
                if ("string" == typeof c) return [{
                    type: c,
                    value: a
                }];
                for (var d = [], e = 0, f = c.length; f > e; e++) b[e] && (d[d.length] = {
                    type: c[e],
                    value: b[e]
                });
                return d
            }, this.$arrayTokens = function(a) {
                if (!a) return [];
                var b = this.splitRegex.exec(a);
                if (!b) return "text";
                for (var c = [], d = this.tokenArray, e = 0, f = d.length; f > e; e++) b[e + 1] && (c[c.length] = {
                    type: d[e],
                    value: b[e + 1]
                });
                return c
            }, this.removeCapturingGroups = function(a) {
                var b = a.replace(/\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g, function(a, b) {
                    return b ? "(?:" : a
                });
                return b
            }, this.createSplitterRegexp = function(a, b) {
                if (-1 != a.indexOf("(?=")) {
                    var c = 0,
                        d = !1,
                        e = {};
                    a.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g, function(a, b, f, g, h, i) {
                        return d ? d = "]" != h : h ? d = !0 : g ? (c == e.stack && (e.end = i + 1, e.stack = -1), c--) : f && (c++, 1 != f.length && (e.stack = c, e.start = i)), a
                    }), null != e.end && /^\)*$/.test(a.substr(e.end)) && (a = a.substring(0, e.start) + a.substr(e.end))
                }
                return "^" != a.charAt(0) && (a = "^" + a), "$" != a.charAt(a.length - 1) && (a += "$"), new RegExp(a, (b || "").replace("g", ""))
            }, this.getLineTokens = function(a, b) {
                if (b && "string" != typeof b) {
                    var c = b.slice(0);
                    b = c[0], "#tmp" === b && (c.shift(), b = c.shift())
                } else var c = [];
                var d = b || "start",
                    f = this.states[d];
                f || (d = "start", f = this.states[d]);
                var g = this.matchMappings[d],
                    h = this.regExps[d];
                h.lastIndex = 0;
                for (var i, j = [], k = 0, l = 0, m = {
                        type: null,
                        value: ""
                    }; i = h.exec(a);) {
                    var n = g.defaultToken,
                        o = null,
                        p = i[0],
                        q = h.lastIndex;
                    if (q - p.length > k) {
                        var r = a.substring(k, q - p.length);
                        m.type == n ? m.value += r : (m.type && j.push(m), m = {
                            type: n,
                            value: r
                        })
                    }
                    for (var s = 0; s < i.length - 2; s++)
                        if (void 0 !== i[s + 1]) {
                            o = f[g[s]], n = o.onMatch ? o.onMatch(p, d, c) : o.token, o.next && (d = "string" == typeof o.next ? o.next : o.next(d, c), f = this.states[d], f || (this.reportError("state doesn't exist", d), d = "start", f = this.states[d]), g = this.matchMappings[d], k = q, h = this.regExps[d], h.lastIndex = q);
                            break
                        }
                    if (p)
                        if ("string" == typeof n) o && o.merge === !1 || m.type !== n ? (m.type && j.push(m), m = {
                            type: n,
                            value: p
                        }) : m.value += p;
                        else if (n) {
                        m.type && j.push(m), m = {
                            type: null,
                            value: ""
                        };
                        for (var s = 0; s < n.length; s++) j.push(n[s])
                    }
                    if (k == a.length) break;
                    if (k = q, l++ > e) {
                        for (l > 2 * a.length && this.reportError("infinite loop with in ace tokenizer", {
                                startState: b,
                                line: a
                            }); k < a.length;) m.type && j.push(m), m = {
                            value: a.substring(k, k += 2e3),
                            type: "overflow"
                        };
                        d = "start", c = [];
                        break
                    }
                }
                return m.type && j.push(m), c.length > 1 && c[0] !== d && c.unshift("#tmp", d), {
                    tokens: j,
                    state: c.length ? c : d
                }
            }, this.reportError = d.reportError
        }).call(f.prototype), b.Tokenizer = f
    }), define("ace/mode/text_highlight_rules", ["require", "exports", "module", "ace/lib/lang"], function(a, b, c) {
        "use strict";
        var d = a("../lib/lang"),
            e = function() {
                this.$rules = {
                    start: [{
                        token: "empty_line",
                        regex: "^$"
                    }, {
                        defaultToken: "text"
                    }]
                }
            };
        (function() {
            this.addRules = function(a, b) {
                if (b)
                    for (var c in a) {
                        for (var d = a[c], e = 0; e < d.length; e++) {
                            var f = d[e];
                            (f.next || f.onMatch) && ("string" == typeof f.next && 0 !== f.next.indexOf(b) && (f.next = b + f.next), f.nextState && 0 !== f.nextState.indexOf(b) && (f.nextState = b + f.nextState))
                        }
                        this.$rules[b + c] = d
                    } else
                        for (var c in a) this.$rules[c] = a[c]
            }, this.getRules = function() {
                return this.$rules
            }, this.embedRules = function(a, b, c, e, f) {
                var g = "function" == typeof a ? (new a).getRules() : a;
                if (e)
                    for (var h = 0; h < e.length; h++) e[h] = b + e[h];
                else {
                    e = [];
                    for (var i in g) e.push(b + i)
                }
                if (this.addRules(g, b), c)
                    for (var j = Array.prototype[f ? "push" : "unshift"], h = 0; h < e.length; h++) j.apply(this.$rules[e[h]], d.deepCopy(c));
                this.$embeds || (this.$embeds = []), this.$embeds.push(b)
            }, this.getEmbeds = function() {
                return this.$embeds
            };
            var a = function(a, b) {
                    return ("start" != a || b.length) && b.unshift(this.nextState, a), this.nextState
                },
                b = function(a, b) {
                    return b.shift(), b.shift() || "start"
                };
            this.normalizeRules = function() {
                function c(f) {
                    var g = e[f];
                    g.processed = !0;
                    for (var h = 0; h < g.length; h++) {
                        var i = g[h];
                        !i.regex && i.start && (i.regex = i.start, i.next || (i.next = []), i.next.push({
                            defaultToken: i.token
                        }, {
                            token: i.token + ".end",
                            regex: i.end || i.start,
                            next: "pop"
                        }), i.token = i.token + ".start", i.push = !0);
                        var j = i.next || i.push;
                        if (j && Array.isArray(j)) {
                            var k = i.stateName;
                            k || (k = i.token, "string" != typeof k && (k = k[0] || ""), e[k] && (k += d++)), e[k] = j, i.next = k, c(k)
                        } else "pop" == j && (i.next = b);
                        if (i.push && (i.nextState = i.next || i.push, i.next = a, delete i.push), i.rules)
                            for (var l in i.rules) e[l] ? e[l].push && e[l].push.apply(e[l], i.rules[l]) : e[l] = i.rules[l];
                        if (i.include || "string" == typeof i) var m = i.include || i,
                            n = e[m];
                        else Array.isArray(i) && (n = i);
                        if (n) {
                            var o = [h, 1].concat(n);
                            i.noEscape && (o = o.filter(function(a) {
                                return !a.next
                            })), g.splice.apply(g, o), h--, n = null
                        }
                        i.keywordMap && (i.token = this.createKeywordMapper(i.keywordMap, i.defaultToken || "text", i.caseInsensitive), delete i.defaultToken)
                    }
                }
                var d = 0,
                    e = this.$rules;
                Object.keys(e).forEach(c, this)
            }, this.createKeywordMapper = function(a, b, c, d) {
                var e = Object.create(null);
                return Object.keys(a).forEach(function(b) {
                    var f = a[b];
                    c && (f = f.toLowerCase());
                    for (var g = f.split(d || "|"), h = g.length; h--;) e[g[h]] = b
                }), Object.getPrototypeOf(e) && (e.__proto__ = null), this.$keywordList = Object.keys(e), a = null, c ? function(a) {
                    return e[a.toLowerCase()] || b
                } : function(a) {
                    return e[a] || b
                }
            }, this.getKeywords = function() {
                return this.$keywords
            }
        }).call(e.prototype), b.TextHighlightRules = e
    }), define("ace/mode/behaviour", ["require", "exports", "module"], function(a, b, c) {
        "use strict";
        var d = function() {
            this.$behaviours = {}
        };
        (function() {
            this.add = function(a, b, c) {
                switch (void 0) {
                    case this.$behaviours:
                        this.$behaviours = {};
                    case this.$behaviours[a]:
                        this.$behaviours[a] = {}
                }
                this.$behaviours[a][b] = c
            }, this.addBehaviours = function(a) {
                for (var b in a)
                    for (var c in a[b]) this.add(b, c, a[b][c])
            }, this.remove = function(a) {
                this.$behaviours && this.$behaviours[a] && delete this.$behaviours[a]
            }, this.inherit = function(a, b) {
                if ("function" == typeof a) var c = (new a).getBehaviours(b);
                else var c = a.getBehaviours(b);
                this.addBehaviours(c)
            }, this.getBehaviours = function(a) {
                if (a) {
                    for (var b = {}, c = 0; c < a.length; c++) this.$behaviours[a[c]] && (b[a[c]] = this.$behaviours[a[c]]);
                    return b
                }
                return this.$behaviours
            }
        }).call(d.prototype), b.Behaviour = d
    }), define("ace/unicode", ["require", "exports", "module"], function(a, b, c) {
        "use strict";

        function d(a) {
            var c = /\w{4}/g;
            for (var d in a) b.packages[d] = a[d].replace(c, "\\u$&")
        }
        b.packages = {}, d({
            L: "0041-005A0061-007A00AA00B500BA00C0-00D600D8-00F600F8-02C102C6-02D102E0-02E402EC02EE0370-037403760377037A-037D03860388-038A038C038E-03A103A3-03F503F7-0481048A-05250531-055605590561-058705D0-05EA05F0-05F20621-064A066E066F0671-06D306D506E506E606EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA07F407F507FA0800-0815081A082408280904-0939093D09500958-0961097109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E460E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EC60EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10A0-10C510D0-10FA10FC1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317D717DC1820-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541AA71B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C7D1CE9-1CEC1CEE-1CF11D00-1DBF1E00-1F151F18-1F1D1F20-1F451F48-1F4D1F50-1F571F591F5B1F5D1F5F-1F7D1F80-1FB41FB6-1FBC1FBE1FC2-1FC41FC6-1FCC1FD0-1FD31FD6-1FDB1FE0-1FEC1FF2-1FF41FF6-1FFC2071207F2090-209421022107210A-211321152119-211D212421262128212A-212D212F-2139213C-213F2145-2149214E218321842C00-2C2E2C30-2C5E2C60-2CE42CEB-2CEE2D00-2D252D30-2D652D6F2D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE2E2F300530063031-3035303B303C3041-3096309D-309F30A1-30FA30FC-30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A48CA4D0-A4FDA500-A60CA610-A61FA62AA62BA640-A65FA662-A66EA67F-A697A6A0-A6E5A717-A71FA722-A788A78BA78CA7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2A9CFAA00-AA28AA40-AA42AA44-AA4BAA60-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADB-AADDABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB00-FB06FB13-FB17FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF21-FF3AFF41-FF5AFF66-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
            Ll: "0061-007A00AA00B500BA00DF-00F600F8-00FF01010103010501070109010B010D010F01110113011501170119011B011D011F01210123012501270129012B012D012F01310133013501370138013A013C013E014001420144014601480149014B014D014F01510153015501570159015B015D015F01610163016501670169016B016D016F0171017301750177017A017C017E-0180018301850188018C018D019201950199-019B019E01A101A301A501A801AA01AB01AD01B001B401B601B901BA01BD-01BF01C601C901CC01CE01D001D201D401D601D801DA01DC01DD01DF01E101E301E501E701E901EB01ED01EF01F001F301F501F901FB01FD01FF02010203020502070209020B020D020F02110213021502170219021B021D021F02210223022502270229022B022D022F02310233-0239023C023F0240024202470249024B024D024F-02930295-02AF037103730377037B-037D039003AC-03CE03D003D103D5-03D703D903DB03DD03DF03E103E303E503E703E903EB03ED03EF-03F303F503F803FB03FC0430-045F04610463046504670469046B046D046F04710473047504770479047B047D047F0481048B048D048F04910493049504970499049B049D049F04A104A304A504A704A904AB04AD04AF04B104B304B504B704B904BB04BD04BF04C204C404C604C804CA04CC04CE04CF04D104D304D504D704D904DB04DD04DF04E104E304E504E704E904EB04ED04EF04F104F304F504F704F904FB04FD04FF05010503050505070509050B050D050F05110513051505170519051B051D051F0521052305250561-05871D00-1D2B1D62-1D771D79-1D9A1E011E031E051E071E091E0B1E0D1E0F1E111E131E151E171E191E1B1E1D1E1F1E211E231E251E271E291E2B1E2D1E2F1E311E331E351E371E391E3B1E3D1E3F1E411E431E451E471E491E4B1E4D1E4F1E511E531E551E571E591E5B1E5D1E5F1E611E631E651E671E691E6B1E6D1E6F1E711E731E751E771E791E7B1E7D1E7F1E811E831E851E871E891E8B1E8D1E8F1E911E931E95-1E9D1E9F1EA11EA31EA51EA71EA91EAB1EAD1EAF1EB11EB31EB51EB71EB91EBB1EBD1EBF1EC11EC31EC51EC71EC91ECB1ECD1ECF1ED11ED31ED51ED71ED91EDB1EDD1EDF1EE11EE31EE51EE71EE91EEB1EED1EEF1EF11EF31EF51EF71EF91EFB1EFD1EFF-1F071F10-1F151F20-1F271F30-1F371F40-1F451F50-1F571F60-1F671F70-1F7D1F80-1F871F90-1F971FA0-1FA71FB0-1FB41FB61FB71FBE1FC2-1FC41FC61FC71FD0-1FD31FD61FD71FE0-1FE71FF2-1FF41FF61FF7210A210E210F2113212F21342139213C213D2146-2149214E21842C30-2C5E2C612C652C662C682C6A2C6C2C712C732C742C76-2C7C2C812C832C852C872C892C8B2C8D2C8F2C912C932C952C972C992C9B2C9D2C9F2CA12CA32CA52CA72CA92CAB2CAD2CAF2CB12CB32CB52CB72CB92CBB2CBD2CBF2CC12CC32CC52CC72CC92CCB2CCD2CCF2CD12CD32CD52CD72CD92CDB2CDD2CDF2CE12CE32CE42CEC2CEE2D00-2D25A641A643A645A647A649A64BA64DA64FA651A653A655A657A659A65BA65DA65FA663A665A667A669A66BA66DA681A683A685A687A689A68BA68DA68FA691A693A695A697A723A725A727A729A72BA72DA72F-A731A733A735A737A739A73BA73DA73FA741A743A745A747A749A74BA74DA74FA751A753A755A757A759A75BA75DA75FA761A763A765A767A769A76BA76DA76FA771-A778A77AA77CA77FA781A783A785A787A78CFB00-FB06FB13-FB17FF41-FF5A",
            Lu: "0041-005A00C0-00D600D8-00DE01000102010401060108010A010C010E01100112011401160118011A011C011E01200122012401260128012A012C012E01300132013401360139013B013D013F0141014301450147014A014C014E01500152015401560158015A015C015E01600162016401660168016A016C016E017001720174017601780179017B017D018101820184018601870189-018B018E-0191019301940196-0198019C019D019F01A001A201A401A601A701A901AC01AE01AF01B1-01B301B501B701B801BC01C401C701CA01CD01CF01D101D301D501D701D901DB01DE01E001E201E401E601E801EA01EC01EE01F101F401F6-01F801FA01FC01FE02000202020402060208020A020C020E02100212021402160218021A021C021E02200222022402260228022A022C022E02300232023A023B023D023E02410243-02460248024A024C024E03700372037603860388-038A038C038E038F0391-03A103A3-03AB03CF03D2-03D403D803DA03DC03DE03E003E203E403E603E803EA03EC03EE03F403F703F903FA03FD-042F04600462046404660468046A046C046E04700472047404760478047A047C047E0480048A048C048E04900492049404960498049A049C049E04A004A204A404A604A804AA04AC04AE04B004B204B404B604B804BA04BC04BE04C004C104C304C504C704C904CB04CD04D004D204D404D604D804DA04DC04DE04E004E204E404E604E804EA04EC04EE04F004F204F404F604F804FA04FC04FE05000502050405060508050A050C050E05100512051405160518051A051C051E0520052205240531-055610A0-10C51E001E021E041E061E081E0A1E0C1E0E1E101E121E141E161E181E1A1E1C1E1E1E201E221E241E261E281E2A1E2C1E2E1E301E321E341E361E381E3A1E3C1E3E1E401E421E441E461E481E4A1E4C1E4E1E501E521E541E561E581E5A1E5C1E5E1E601E621E641E661E681E6A1E6C1E6E1E701E721E741E761E781E7A1E7C1E7E1E801E821E841E861E881E8A1E8C1E8E1E901E921E941E9E1EA01EA21EA41EA61EA81EAA1EAC1EAE1EB01EB21EB41EB61EB81EBA1EBC1EBE1EC01EC21EC41EC61EC81ECA1ECC1ECE1ED01ED21ED41ED61ED81EDA1EDC1EDE1EE01EE21EE41EE61EE81EEA1EEC1EEE1EF01EF21EF41EF61EF81EFA1EFC1EFE1F08-1F0F1F18-1F1D1F28-1F2F1F38-1F3F1F48-1F4D1F591F5B1F5D1F5F1F68-1F6F1FB8-1FBB1FC8-1FCB1FD8-1FDB1FE8-1FEC1FF8-1FFB21022107210B-210D2110-211221152119-211D212421262128212A-212D2130-2133213E213F214521832C00-2C2E2C602C62-2C642C672C692C6B2C6D-2C702C722C752C7E-2C802C822C842C862C882C8A2C8C2C8E2C902C922C942C962C982C9A2C9C2C9E2CA02CA22CA42CA62CA82CAA2CAC2CAE2CB02CB22CB42CB62CB82CBA2CBC2CBE2CC02CC22CC42CC62CC82CCA2CCC2CCE2CD02CD22CD42CD62CD82CDA2CDC2CDE2CE02CE22CEB2CEDA640A642A644A646A648A64AA64CA64EA650A652A654A656A658A65AA65CA65EA662A664A666A668A66AA66CA680A682A684A686A688A68AA68CA68EA690A692A694A696A722A724A726A728A72AA72CA72EA732A734A736A738A73AA73CA73EA740A742A744A746A748A74AA74CA74EA750A752A754A756A758A75AA75CA75EA760A762A764A766A768A76AA76CA76EA779A77BA77DA77EA780A782A784A786A78BFF21-FF3A",
            Lt: "01C501C801CB01F21F88-1F8F1F98-1F9F1FA8-1FAF1FBC1FCC1FFC",
            Lm: "02B0-02C102C6-02D102E0-02E402EC02EE0374037A0559064006E506E607F407F507FA081A0824082809710E460EC610FC17D718431AA71C78-1C7D1D2C-1D611D781D9B-1DBF2071207F2090-20942C7D2D6F2E2F30053031-3035303B309D309E30FC-30FEA015A4F8-A4FDA60CA67FA717-A71FA770A788A9CFAA70AADDFF70FF9EFF9F",
            Lo: "01BB01C0-01C3029405D0-05EA05F0-05F20621-063F0641-064A066E066F0671-06D306D506EE06EF06FA-06FC06FF07100712-072F074D-07A507B107CA-07EA0800-08150904-0939093D09500958-096109720979-097F0985-098C098F09900993-09A809AA-09B009B209B6-09B909BD09CE09DC09DD09DF-09E109F009F10A05-0A0A0A0F0A100A13-0A280A2A-0A300A320A330A350A360A380A390A59-0A5C0A5E0A72-0A740A85-0A8D0A8F-0A910A93-0AA80AAA-0AB00AB20AB30AB5-0AB90ABD0AD00AE00AE10B05-0B0C0B0F0B100B13-0B280B2A-0B300B320B330B35-0B390B3D0B5C0B5D0B5F-0B610B710B830B85-0B8A0B8E-0B900B92-0B950B990B9A0B9C0B9E0B9F0BA30BA40BA8-0BAA0BAE-0BB90BD00C05-0C0C0C0E-0C100C12-0C280C2A-0C330C35-0C390C3D0C580C590C600C610C85-0C8C0C8E-0C900C92-0CA80CAA-0CB30CB5-0CB90CBD0CDE0CE00CE10D05-0D0C0D0E-0D100D12-0D280D2A-0D390D3D0D600D610D7A-0D7F0D85-0D960D9A-0DB10DB3-0DBB0DBD0DC0-0DC60E01-0E300E320E330E40-0E450E810E820E840E870E880E8A0E8D0E94-0E970E99-0E9F0EA1-0EA30EA50EA70EAA0EAB0EAD-0EB00EB20EB30EBD0EC0-0EC40EDC0EDD0F000F40-0F470F49-0F6C0F88-0F8B1000-102A103F1050-1055105A-105D106110651066106E-10701075-1081108E10D0-10FA1100-1248124A-124D1250-12561258125A-125D1260-1288128A-128D1290-12B012B2-12B512B8-12BE12C012C2-12C512C8-12D612D8-13101312-13151318-135A1380-138F13A0-13F41401-166C166F-167F1681-169A16A0-16EA1700-170C170E-17111720-17311740-17511760-176C176E-17701780-17B317DC1820-18421844-18771880-18A818AA18B0-18F51900-191C1950-196D1970-19741980-19AB19C1-19C71A00-1A161A20-1A541B05-1B331B45-1B4B1B83-1BA01BAE1BAF1C00-1C231C4D-1C4F1C5A-1C771CE9-1CEC1CEE-1CF12135-21382D30-2D652D80-2D962DA0-2DA62DA8-2DAE2DB0-2DB62DB8-2DBE2DC0-2DC62DC8-2DCE2DD0-2DD62DD8-2DDE3006303C3041-3096309F30A1-30FA30FF3105-312D3131-318E31A0-31B731F0-31FF3400-4DB54E00-9FCBA000-A014A016-A48CA4D0-A4F7A500-A60BA610-A61FA62AA62BA66EA6A0-A6E5A7FB-A801A803-A805A807-A80AA80C-A822A840-A873A882-A8B3A8F2-A8F7A8FBA90A-A925A930-A946A960-A97CA984-A9B2AA00-AA28AA40-AA42AA44-AA4BAA60-AA6FAA71-AA76AA7AAA80-AAAFAAB1AAB5AAB6AAB9-AABDAAC0AAC2AADBAADCABC0-ABE2AC00-D7A3D7B0-D7C6D7CB-D7FBF900-FA2DFA30-FA6DFA70-FAD9FB1DFB1F-FB28FB2A-FB36FB38-FB3CFB3EFB40FB41FB43FB44FB46-FBB1FBD3-FD3DFD50-FD8FFD92-FDC7FDF0-FDFBFE70-FE74FE76-FEFCFF66-FF6FFF71-FF9DFFA0-FFBEFFC2-FFC7FFCA-FFCFFFD2-FFD7FFDA-FFDC",
            M: "0300-036F0483-04890591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DE-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0903093C093E-094E0951-0955096209630981-098309BC09BE-09C409C709C809CB-09CD09D709E209E30A01-0A030A3C0A3E-0A420A470A480A4B-0A4D0A510A700A710A750A81-0A830ABC0ABE-0AC50AC7-0AC90ACB-0ACD0AE20AE30B01-0B030B3C0B3E-0B440B470B480B4B-0B4D0B560B570B620B630B820BBE-0BC20BC6-0BC80BCA-0BCD0BD70C01-0C030C3E-0C440C46-0C480C4A-0C4D0C550C560C620C630C820C830CBC0CBE-0CC40CC6-0CC80CCA-0CCD0CD50CD60CE20CE30D020D030D3E-0D440D46-0D480D4A-0D4D0D570D620D630D820D830DCA0DCF-0DD40DD60DD8-0DDF0DF20DF30E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F3E0F3F0F71-0F840F860F870F90-0F970F99-0FBC0FC6102B-103E1056-1059105E-10601062-10641067-106D1071-10741082-108D108F109A-109D135F1712-17141732-1734175217531772177317B6-17D317DD180B-180D18A91920-192B1930-193B19B0-19C019C819C91A17-1A1B1A55-1A5E1A60-1A7C1A7F1B00-1B041B34-1B441B6B-1B731B80-1B821BA1-1BAA1C24-1C371CD0-1CD21CD4-1CE81CED1CF21DC0-1DE61DFD-1DFF20D0-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66F-A672A67CA67DA6F0A6F1A802A806A80BA823-A827A880A881A8B4-A8C4A8E0-A8F1A926-A92DA947-A953A980-A983A9B3-A9C0AA29-AA36AA43AA4CAA4DAA7BAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE3-ABEAABECABEDFB1EFE00-FE0FFE20-FE26",
            Mn: "0300-036F0483-04870591-05BD05BF05C105C205C405C505C70610-061A064B-065E067006D6-06DC06DF-06E406E706E806EA-06ED07110730-074A07A6-07B007EB-07F30816-0819081B-08230825-08270829-082D0900-0902093C0941-0948094D0951-095509620963098109BC09C1-09C409CD09E209E30A010A020A3C0A410A420A470A480A4B-0A4D0A510A700A710A750A810A820ABC0AC1-0AC50AC70AC80ACD0AE20AE30B010B3C0B3F0B41-0B440B4D0B560B620B630B820BC00BCD0C3E-0C400C46-0C480C4A-0C4D0C550C560C620C630CBC0CBF0CC60CCC0CCD0CE20CE30D41-0D440D4D0D620D630DCA0DD2-0DD40DD60E310E34-0E3A0E47-0E4E0EB10EB4-0EB90EBB0EBC0EC8-0ECD0F180F190F350F370F390F71-0F7E0F80-0F840F860F870F90-0F970F99-0FBC0FC6102D-10301032-10371039103A103D103E10581059105E-10601071-1074108210851086108D109D135F1712-17141732-1734175217531772177317B7-17BD17C617C9-17D317DD180B-180D18A91920-19221927192819321939-193B1A171A181A561A58-1A5E1A601A621A65-1A6C1A73-1A7C1A7F1B00-1B031B341B36-1B3A1B3C1B421B6B-1B731B801B811BA2-1BA51BA81BA91C2C-1C331C361C371CD0-1CD21CD4-1CE01CE2-1CE81CED1DC0-1DE61DFD-1DFF20D0-20DC20E120E5-20F02CEF-2CF12DE0-2DFF302A-302F3099309AA66FA67CA67DA6F0A6F1A802A806A80BA825A826A8C4A8E0-A8F1A926-A92DA947-A951A980-A982A9B3A9B6-A9B9A9BCAA29-AA2EAA31AA32AA35AA36AA43AA4CAAB0AAB2-AAB4AAB7AAB8AABEAABFAAC1ABE5ABE8ABEDFB1EFE00-FE0FFE20-FE26",
            Mc: "0903093E-09400949-094C094E0982098309BE-09C009C709C809CB09CC09D70A030A3E-0A400A830ABE-0AC00AC90ACB0ACC0B020B030B3E0B400B470B480B4B0B4C0B570BBE0BBF0BC10BC20BC6-0BC80BCA-0BCC0BD70C01-0C030C41-0C440C820C830CBE0CC0-0CC40CC70CC80CCA0CCB0CD50CD60D020D030D3E-0D400D46-0D480D4A-0D4C0D570D820D830DCF-0DD10DD8-0DDF0DF20DF30F3E0F3F0F7F102B102C10311038103B103C105610571062-10641067-106D108310841087-108C108F109A-109C17B617BE-17C517C717C81923-19261929-192B193019311933-193819B0-19C019C819C91A19-1A1B1A551A571A611A631A641A6D-1A721B041B351B3B1B3D-1B411B431B441B821BA11BA61BA71BAA1C24-1C2B1C341C351CE11CF2A823A824A827A880A881A8B4-A8C3A952A953A983A9B4A9B5A9BAA9BBA9BD-A9C0AA2FAA30AA33AA34AA4DAA7BABE3ABE4ABE6ABE7ABE9ABEAABEC",
            Me: "0488048906DE20DD-20E020E2-20E4A670-A672",
            N: "0030-003900B200B300B900BC-00BE0660-066906F0-06F907C0-07C90966-096F09E6-09EF09F4-09F90A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BF20C66-0C6F0C78-0C7E0CE6-0CEF0D66-0D750E50-0E590ED0-0ED90F20-0F331040-10491090-10991369-137C16EE-16F017E0-17E917F0-17F91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C5920702074-20792080-20892150-21822185-21892460-249B24EA-24FF2776-27932CFD30073021-30293038-303A3192-31953220-32293251-325F3280-328932B1-32BFA620-A629A6E6-A6EFA830-A835A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
            Nd: "0030-00390660-066906F0-06F907C0-07C90966-096F09E6-09EF0A66-0A6F0AE6-0AEF0B66-0B6F0BE6-0BEF0C66-0C6F0CE6-0CEF0D66-0D6F0E50-0E590ED0-0ED90F20-0F291040-10491090-109917E0-17E91810-18191946-194F19D0-19DA1A80-1A891A90-1A991B50-1B591BB0-1BB91C40-1C491C50-1C59A620-A629A8D0-A8D9A900-A909A9D0-A9D9AA50-AA59ABF0-ABF9FF10-FF19",
            Nl: "16EE-16F02160-21822185-218830073021-30293038-303AA6E6-A6EF",
            No: "00B200B300B900BC-00BE09F4-09F90BF0-0BF20C78-0C7E0D70-0D750F2A-0F331369-137C17F0-17F920702074-20792080-20892150-215F21892460-249B24EA-24FF2776-27932CFD3192-31953220-32293251-325F3280-328932B1-32BFA830-A835",
            P: "0021-00230025-002A002C-002F003A003B003F0040005B-005D005F007B007D00A100AB00B700BB00BF037E0387055A-055F0589058A05BE05C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F3A-0F3D0F850FD0-0FD4104A-104F10FB1361-13681400166D166E169B169C16EB-16ED1735173617D4-17D617D8-17DA1800-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD32010-20272030-20432045-20512053-205E207D207E208D208E2329232A2768-277527C527C627E6-27EF2983-299829D8-29DB29FC29FD2CF9-2CFC2CFE2CFF2E00-2E2E2E302E313001-30033008-30113014-301F3030303D30A030FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFD3EFD3FFE10-FE19FE30-FE52FE54-FE61FE63FE68FE6AFE6BFF01-FF03FF05-FF0AFF0C-FF0FFF1AFF1BFF1FFF20FF3B-FF3DFF3FFF5BFF5DFF5F-FF65",
            Pd: "002D058A05BE140018062010-20152E172E1A301C303030A0FE31FE32FE58FE63FF0D",
            Ps: "0028005B007B0F3A0F3C169B201A201E2045207D208D23292768276A276C276E27702772277427C527E627E827EA27EC27EE2983298529872989298B298D298F299129932995299729D829DA29FC2E222E242E262E283008300A300C300E3010301430163018301A301DFD3EFE17FE35FE37FE39FE3BFE3DFE3FFE41FE43FE47FE59FE5BFE5DFF08FF3BFF5BFF5FFF62",
            Pe: "0029005D007D0F3B0F3D169C2046207E208E232A2769276B276D276F27712773277527C627E727E927EB27ED27EF298429862988298A298C298E2990299229942996299829D929DB29FD2E232E252E272E293009300B300D300F3011301530173019301B301E301FFD3FFE18FE36FE38FE3AFE3CFE3EFE40FE42FE44FE48FE5AFE5CFE5EFF09FF3DFF5DFF60FF63",
            Pi: "00AB2018201B201C201F20392E022E042E092E0C2E1C2E20",
            Pf: "00BB2019201D203A2E032E052E0A2E0D2E1D2E21",
            Pc: "005F203F20402054FE33FE34FE4D-FE4FFF3F",
            Po: "0021-00230025-0027002A002C002E002F003A003B003F0040005C00A100B700BF037E0387055A-055F058905C005C305C605F305F40609060A060C060D061B061E061F066A-066D06D40700-070D07F7-07F90830-083E0964096509700DF40E4F0E5A0E5B0F04-0F120F850FD0-0FD4104A-104F10FB1361-1368166D166E16EB-16ED1735173617D4-17D617D8-17DA1800-18051807-180A1944194519DE19DF1A1E1A1F1AA0-1AA61AA8-1AAD1B5A-1B601C3B-1C3F1C7E1C7F1CD3201620172020-20272030-2038203B-203E2041-20432047-205120532055-205E2CF9-2CFC2CFE2CFF2E002E012E06-2E082E0B2E0E-2E162E182E192E1B2E1E2E1F2E2A-2E2E2E302E313001-3003303D30FBA4FEA4FFA60D-A60FA673A67EA6F2-A6F7A874-A877A8CEA8CFA8F8-A8FAA92EA92FA95FA9C1-A9CDA9DEA9DFAA5C-AA5FAADEAADFABEBFE10-FE16FE19FE30FE45FE46FE49-FE4CFE50-FE52FE54-FE57FE5F-FE61FE68FE6AFE6BFF01-FF03FF05-FF07FF0AFF0CFF0EFF0FFF1AFF1BFF1FFF20FF3CFF61FF64FF65",
            S: "0024002B003C-003E005E0060007C007E00A2-00A900AC00AE-00B100B400B600B800D700F702C2-02C502D2-02DF02E5-02EB02ED02EF-02FF03750384038503F604820606-0608060B060E060F06E906FD06FE07F609F209F309FA09FB0AF10B700BF3-0BFA0C7F0CF10CF20D790E3F0F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-139917DB194019E0-19FF1B61-1B6A1B74-1B7C1FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE20442052207A-207C208A-208C20A0-20B8210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B2140-2144214A-214D214F2190-2328232B-23E82400-24262440-244A249C-24E92500-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE27C0-27C427C7-27CA27CC27D0-27E527F0-29822999-29D729DC-29FB29FE-2B4C2B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F309B309C319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A700-A716A720A721A789A78AA828-A82BA836-A839AA77-AA79FB29FDFCFDFDFE62FE64-FE66FE69FF04FF0BFF1C-FF1EFF3EFF40FF5CFF5EFFE0-FFE6FFE8-FFEEFFFCFFFD",
            Sm: "002B003C-003E007C007E00AC00B100D700F703F60606-060820442052207A-207C208A-208C2140-2144214B2190-2194219A219B21A021A321A621AE21CE21CF21D221D421F4-22FF2308-230B23202321237C239B-23B323DC-23E125B725C125F8-25FF266F27C0-27C427C7-27CA27CC27D0-27E527F0-27FF2900-29822999-29D729DC-29FB29FE-2AFF2B30-2B442B47-2B4CFB29FE62FE64-FE66FF0BFF1C-FF1EFF5CFF5EFFE2FFE9-FFEC",
            Sc: "002400A2-00A5060B09F209F309FB0AF10BF90E3F17DB20A0-20B8A838FDFCFE69FF04FFE0FFE1FFE5FFE6",
            Sk: "005E006000A800AF00B400B802C2-02C502D2-02DF02E5-02EB02ED02EF-02FF0375038403851FBD1FBF-1FC11FCD-1FCF1FDD-1FDF1FED-1FEF1FFD1FFE309B309CA700-A716A720A721A789A78AFF3EFF40FFE3",
            So: "00A600A700A900AE00B000B60482060E060F06E906FD06FE07F609FA0B700BF3-0BF80BFA0C7F0CF10CF20D790F01-0F030F13-0F170F1A-0F1F0F340F360F380FBE-0FC50FC7-0FCC0FCE0FCF0FD5-0FD8109E109F13601390-1399194019E0-19FF1B61-1B6A1B74-1B7C210021012103-21062108210921142116-2118211E-2123212521272129212E213A213B214A214C214D214F2195-2199219C-219F21A121A221A421A521A7-21AD21AF-21CD21D021D121D321D5-21F32300-2307230C-231F2322-2328232B-237B237D-239A23B4-23DB23E2-23E82400-24262440-244A249C-24E92500-25B625B8-25C025C2-25F72600-266E2670-26CD26CF-26E126E326E8-26FF2701-27042706-2709270C-27272729-274B274D274F-27522756-275E2761-276727942798-27AF27B1-27BE2800-28FF2B00-2B2F2B452B462B50-2B592CE5-2CEA2E80-2E992E9B-2EF32F00-2FD52FF0-2FFB300430123013302030363037303E303F319031913196-319F31C0-31E33200-321E322A-32503260-327F328A-32B032C0-32FE3300-33FF4DC0-4DFFA490-A4C6A828-A82BA836A837A839AA77-AA79FDFDFFE4FFE8FFEDFFEEFFFCFFFD",
            Z: "002000A01680180E2000-200A20282029202F205F3000",
            Zs: "002000A01680180E2000-200A202F205F3000",
            Zl: "2028",
            Zp: "2029",
            C: "0000-001F007F-009F00AD03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-0605061C061D0620065F06DD070E070F074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17B417B517DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF200B-200F202A-202E2060-206F20722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-F8FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFD-FF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFFBFFFEFFFF",
            Cc: "0000-001F007F-009F",
            Cf: "00AD0600-060306DD070F17B417B5200B-200F202A-202E2060-2064206A-206FFEFFFFF9-FFFB",
            Co: "E000-F8FF",
            Cs: "D800-DFFF",
            Cn: "03780379037F-0383038B038D03A20526-05300557055805600588058B-059005C8-05CF05EB-05EF05F5-05FF06040605061C061D0620065F070E074B074C07B2-07BF07FB-07FF082E082F083F-08FF093A093B094F095609570973-097809800984098D098E0991099209A909B109B3-09B509BA09BB09C509C609C909CA09CF-09D609D8-09DB09DE09E409E509FC-0A000A040A0B-0A0E0A110A120A290A310A340A370A3A0A3B0A3D0A43-0A460A490A4A0A4E-0A500A52-0A580A5D0A5F-0A650A76-0A800A840A8E0A920AA90AB10AB40ABA0ABB0AC60ACA0ACE0ACF0AD1-0ADF0AE40AE50AF00AF2-0B000B040B0D0B0E0B110B120B290B310B340B3A0B3B0B450B460B490B4A0B4E-0B550B58-0B5B0B5E0B640B650B72-0B810B840B8B-0B8D0B910B96-0B980B9B0B9D0BA0-0BA20BA5-0BA70BAB-0BAD0BBA-0BBD0BC3-0BC50BC90BCE0BCF0BD1-0BD60BD8-0BE50BFB-0C000C040C0D0C110C290C340C3A-0C3C0C450C490C4E-0C540C570C5A-0C5F0C640C650C70-0C770C800C810C840C8D0C910CA90CB40CBA0CBB0CC50CC90CCE-0CD40CD7-0CDD0CDF0CE40CE50CF00CF3-0D010D040D0D0D110D290D3A-0D3C0D450D490D4E-0D560D58-0D5F0D640D650D76-0D780D800D810D840D97-0D990DB20DBC0DBE0DBF0DC7-0DC90DCB-0DCE0DD50DD70DE0-0DF10DF5-0E000E3B-0E3E0E5C-0E800E830E850E860E890E8B0E8C0E8E-0E930E980EA00EA40EA60EA80EA90EAC0EBA0EBE0EBF0EC50EC70ECE0ECF0EDA0EDB0EDE-0EFF0F480F6D-0F700F8C-0F8F0F980FBD0FCD0FD9-0FFF10C6-10CF10FD-10FF1249124E124F12571259125E125F1289128E128F12B112B612B712BF12C112C612C712D7131113161317135B-135E137D-137F139A-139F13F5-13FF169D-169F16F1-16FF170D1715-171F1737-173F1754-175F176D17711774-177F17DE17DF17EA-17EF17FA-17FF180F181A-181F1878-187F18AB-18AF18F6-18FF191D-191F192C-192F193C-193F1941-1943196E196F1975-197F19AC-19AF19CA-19CF19DB-19DD1A1C1A1D1A5F1A7D1A7E1A8A-1A8F1A9A-1A9F1AAE-1AFF1B4C-1B4F1B7D-1B7F1BAB-1BAD1BBA-1BFF1C38-1C3A1C4A-1C4C1C80-1CCF1CF3-1CFF1DE7-1DFC1F161F171F1E1F1F1F461F471F4E1F4F1F581F5A1F5C1F5E1F7E1F7F1FB51FC51FD41FD51FDC1FF01FF11FF51FFF2065-206920722073208F2095-209F20B9-20CF20F1-20FF218A-218F23E9-23FF2427-243F244B-245F26CE26E226E4-26E727002705270A270B2728274C274E2753-2755275F27602795-279727B027BF27CB27CD-27CF2B4D-2B4F2B5A-2BFF2C2F2C5F2CF2-2CF82D26-2D2F2D66-2D6E2D70-2D7F2D97-2D9F2DA72DAF2DB72DBF2DC72DCF2DD72DDF2E32-2E7F2E9A2EF4-2EFF2FD6-2FEF2FFC-2FFF3040309730983100-3104312E-3130318F31B8-31BF31E4-31EF321F32FF4DB6-4DBF9FCC-9FFFA48D-A48FA4C7-A4CFA62C-A63FA660A661A674-A67BA698-A69FA6F8-A6FFA78D-A7FAA82C-A82FA83A-A83FA878-A87FA8C5-A8CDA8DA-A8DFA8FC-A8FFA954-A95EA97D-A97FA9CEA9DA-A9DDA9E0-A9FFAA37-AA3FAA4EAA4FAA5AAA5BAA7C-AA7FAAC3-AADAAAE0-ABBFABEEABEFABFA-ABFFD7A4-D7AFD7C7-D7CAD7FC-D7FFFA2EFA2FFA6EFA6FFADA-FAFFFB07-FB12FB18-FB1CFB37FB3DFB3FFB42FB45FBB2-FBD2FD40-FD4FFD90FD91FDC8-FDEFFDFEFDFFFE1A-FE1FFE27-FE2FFE53FE67FE6C-FE6FFE75FEFDFEFEFF00FFBF-FFC1FFC8FFC9FFD0FFD1FFD8FFD9FFDD-FFDFFFE7FFEF-FFF8FFFEFFFF"
        })
    }), define("ace/token_iterator", ["require", "exports", "module"], function(a, b, c) {
        "use strict";
        var d = function(a, b, c) {
            this.$session = a, this.$row = b, this.$rowTokens = a.getTokens(b);
            var d = a.getTokenAt(b, c);
            this.$tokenIndex = d ? d.index : -1
        };
        (function() {
            this.stepBackward = function() {
                for (this.$tokenIndex -= 1; this.$tokenIndex < 0;) {
                    if (this.$row -= 1, this.$row < 0) return this.$row = 0, null;
                    this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = this.$rowTokens.length - 1
                }
                return this.$rowTokens[this.$tokenIndex]
            }, this.stepForward = function() {
                this.$tokenIndex += 1;
                for (var a; this.$tokenIndex >= this.$rowTokens.length;) {
                    if (this.$row += 1, a || (a = this.$session.getLength()), this.$row >= a) return this.$row = a - 1, null;
                    this.$rowTokens = this.$session.getTokens(this.$row), this.$tokenIndex = 0
                }
                return this.$rowTokens[this.$tokenIndex]
            }, this.getCurrentToken = function() {
                return this.$rowTokens[this.$tokenIndex]
            }, this.getCurrentTokenRow = function() {
                return this.$row
            }, this.getCurrentTokenColumn = function() {
                var a = this.$rowTokens,
                    b = this.$tokenIndex,
                    c = a[b].start;
                if (void 0 !== c) return c;
                for (c = 0; b > 0;) b -= 1, c += a[b].value.length;
                return c
            }, this.getCurrentTokenPosition = function() {
                return {
                    row: this.$row,
                    column: this.getCurrentTokenColumn()
                }
            }
        }).call(d.prototype), b.TokenIterator = d
    }), define("ace/mode/text", ["require", "exports", "module", "ace/tokenizer", "ace/mode/text_highlight_rules", "ace/mode/behaviour", "ace/unicode", "ace/lib/lang", "ace/token_iterator", "ace/range"], function(a, b, c) {
        "use strict";
        var d = a("../tokenizer").Tokenizer,
            e = a("./text_highlight_rules").TextHighlightRules,
            f = a("./behaviour").Behaviour,
            g = a("../unicode"),
            h = a("../lib/lang"),
            i = a("../token_iterator").TokenIterator,
            j = a("../range").Range,
            k = function() {
                this.HighlightRules = e, this.$behaviour = new f
            };
        (function() {
            this.tokenRe = new RegExp("^[" + g.packages.L + g.packages.Mn + g.packages.Mc + g.packages.Nd + g.packages.Pc + "\\$_]+", "g"), this.nonTokenRe = new RegExp("^(?:[^" + g.packages.L + g.packages.Mn + g.packages.Mc + g.packages.Nd + g.packages.Pc + "\\$_]|\\s])+", "g"), this.getTokenizer = function() {
                return this.$tokenizer || (this.$highlightRules = this.$highlightRules || new this.HighlightRules, this.$tokenizer = new d(this.$highlightRules.getRules())), this.$tokenizer
            }, this.lineCommentStart = "", this.blockComment = "", this.toggleCommentLines = function(a, b, c, d) {
                function e(a) {
                    for (var b = c; d >= b; b++) a(f.getLine(b), b)
                }
                var f = b.doc,
                    g = !0,
                    i = !0,
                    j = 1 / 0,
                    k = b.getTabSize(),
                    l = !1;
                if (this.lineCommentStart) {
                    if (Array.isArray(this.lineCommentStart)) var m = this.lineCommentStart.map(h.escapeRegExp).join("|"),
                        n = this.lineCommentStart[0];
                    else var m = h.escapeRegExp(this.lineCommentStart),
                        n = this.lineCommentStart;
                    m = new RegExp("^(\\s*)(?:" + m + ") ?"), l = b.getUseSoftTabs();
                    var o = function(a, b) {
                            var c = a.match(m);
                            if (c) {
                                var d = c[1].length,
                                    e = c[0].length;
                                s(a, d, e) || " " != c[0][e - 1] || e--, f.removeInLine(b, d, e)
                            }
                        },
                        p = n + " ",
                        q = function(a, b) {
                            (!g || /\S/.test(a)) && (s(a, j, j) ? f.insertInLine({
                                row: b,
                                column: j
                            }, p) : f.insertInLine({
                                row: b,
                                column: j
                            }, n))
                        },
                        r = function(a, b) {
                            return m.test(a)
                        },
                        s = function(a, b, c) {
                            for (var d = 0; b-- && " " == a.charAt(b);) d++;
                            if (d % k != 0) return !1;
                            for (var d = 0;
                                " " == a.charAt(c++);) d++;
                            return k > 2 ? d % k != k - 1 : d % k == 0
                        }
                } else {
                    if (!this.blockComment) return !1;
                    var n = this.blockComment.start,
                        t = this.blockComment.end,
                        m = new RegExp("^(\\s*)(?:" + h.escapeRegExp(n) + ")"),
                        u = new RegExp("(?:" + h.escapeRegExp(t) + ")\\s*$"),
                        q = function(a, b) {
                            r(a, b) || (!g || /\S/.test(a)) && (f.insertInLine({
                                row: b,
                                column: a.length
                            }, t), f.insertInLine({
                                row: b,
                                column: j
                            }, n))
                        },
                        o = function(a, b) {
                            var c;
                            (c = a.match(u)) && f.removeInLine(b, a.length - c[0].length, a.length), (c = a.match(m)) && f.removeInLine(b, c[1].length, c[0].length)
                        },
                        r = function(a, c) {
                            if (m.test(a)) return !0;
                            for (var d = b.getTokens(c), e = 0; e < d.length; e++)
                                if ("comment" === d[e].type) return !0
                        }
                }
                var v = 1 / 0;
                e(function(a, b) {
                    var c = a.search(/\S/); - 1 !== c ? (j > c && (j = c), i && !r(a, b) && (i = !1)) : v > a.length && (v = a.length)
                }), j == 1 / 0 && (j = v, g = !1, i = !1), l && j % k != 0 && (j = Math.floor(j / k) * k), e(i ? o : q)
            }, this.toggleBlockComment = function(a, b, c, d) {
                var e = this.blockComment;
                if (e) {
                    !e.start && e[0] && (e = e[0]);
                    var f, g, h = new i(b, d.row, d.column),
                        k = h.getCurrentToken(),
                        l = (b.selection, b.selection.toOrientedRange());
                    if (k && /comment/.test(k.type)) {
                        for (var m, n; k && /comment/.test(k.type);) {
                            var o = k.value.indexOf(e.start);
                            if (-1 != o) {
                                var p = h.getCurrentTokenRow(),
                                    q = h.getCurrentTokenColumn() + o;
                                m = new j(p, q, p, q + e.start.length);
                                break
                            }
                            k = h.stepBackward()
                        }
                        for (var h = new i(b, d.row, d.column), k = h.getCurrentToken(); k && /comment/.test(k.type);) {
                            var o = k.value.indexOf(e.end);
                            if (-1 != o) {
                                var p = h.getCurrentTokenRow(),
                                    q = h.getCurrentTokenColumn() + o;
                                n = new j(p, q, p, q + e.end.length);
                                break
                            }
                            k = h.stepForward()
                        }
                        n && b.remove(n), m && (b.remove(m), f = m.start.row, g = -e.start.length)
                    } else g = e.start.length, f = c.start.row, b.insert(c.end, e.end), b.insert(c.start, e.start);
                    l.start.row == f && (l.start.column += g), l.end.row == f && (l.end.column += g), b.selection.fromOrientedRange(l)
                }
            }, this.getNextLineIndent = function(a, b, c) {
                return this.$getIndent(b)
            }, this.checkOutdent = function(a, b, c) {
                return !1
            }, this.autoOutdent = function(a, b, c) {}, this.$getIndent = function(a) {
                return a.match(/^\s*/)[0]
            }, this.createWorker = function(a) {
                return null
            }, this.createModeDelegates = function(a) {
                this.$embeds = [], this.$modes = {};
                for (var b in a) a[b] && (this.$embeds.push(b), this.$modes[b] = new a[b]);
                for (var c = ["toggleBlockComment", "toggleCommentLines", "getNextLineIndent", "checkOutdent", "autoOutdent", "transformAction", "getCompletions"], b = 0; b < c.length; b++) ! function(a) {
                    var d = c[b],
                        e = a[d];
                    a[c[b]] = function() {
                        return this.$delegator(d, arguments, e)
                    }
                }(this)
            }, this.$delegator = function(a, b, c) {
                var d = b[0];
                "string" != typeof d && (d = d[0]);
                for (var e = 0; e < this.$embeds.length; e++)
                    if (this.$modes[this.$embeds[e]]) {
                        var f = d.split(this.$embeds[e]);
                        if (!f[0] && f[1]) {
                            b[0] = f[1];
                            var g = this.$modes[this.$embeds[e]];
                            return g[a].apply(g, b)
                        }
                    }
                var h = c.apply(this, b);
                return c ? h : void 0
            }, this.transformAction = function(a, b, c, d, e) {
                if (this.$behaviour) {
                    var f = this.$behaviour.getBehaviours();
                    for (var g in f)
                        if (f[g][b]) {
                            var h = f[g][b].apply(this, arguments);
                            if (h) return h
                        }
                }
            }, this.getKeywords = function(a) {
                if (!this.completionKeywords) {
                    var b = this.$tokenizer.rules,
                        c = [];
                    for (var d in b)
                        for (var e = b[d], f = 0, g = e.length; g > f; f++)
                            if ("string" == typeof e[f].token) /keyword|support|storage/.test(e[f].token) && c.push(e[f].regex);
                            else if ("object" == typeof e[f].token)
                        for (var h = 0, i = e[f].token.length; i > h; h++)
                            if (/keyword|support|storage/.test(e[f].token[h])) {
                                var d = e[f].regex.match(/\(.+?\)/g)[h];
                                c.push(d.substr(1, d.length - 2))
                            }
                    this.completionKeywords = c
                }
                return a ? c.concat(this.$keywordList || []) : this.$keywordList
            }, this.$createKeywordList = function() {
                return this.$highlightRules || this.getTokenizer(), this.$keywordList = this.$highlightRules.$keywordList || []
            }, this.getCompletions = function(a, b, c, d) {
                var e = this.$keywordList || this.$createKeywordList();
                return e.map(function(a) {
                    return {
                        name: a,
                        value: a,
                        score: 0,
                        meta: "keyword"
                    }
                })
            }, this.$id = "ace/mode/text"
        }).call(k.prototype), b.Mode = k
    }), define("ace/apply_delta", ["require", "exports", "module"], function(a, b, c) {
        "use strict";
        b.applyDelta = function(a, b, c) {
            var d = b.start.row,
                e = b.start.column,
                f = a[d] || "";
            switch (b.action) {
                case "insert":
                    var g = b.lines;
                    if (1 === g.length) a[d] = f.substring(0, e) + b.lines[0] + f.substring(e);
                    else {
                        var h = [d, 1].concat(b.lines);
                        a.splice.apply(a, h), a[d] = f.substring(0, e) + a[d], a[d + b.lines.length - 1] += f.substring(e)
                    }
                    break;
                case "remove":
                    var i = b.end.column,
                        j = b.end.row;
                    d === j ? a[d] = f.substring(0, e) + f.substring(i) : a.splice(d, j - d + 1, f.substring(0, e) + a[j].substring(i))
            }
        }
    }), define("ace/anchor", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(a, b, c) {
        "use strict";
        var d = a("./lib/oop"),
            e = a("./lib/event_emitter").EventEmitter,
            f = b.Anchor = function(a, b, c) {
                this.$onChange = this.onChange.bind(this), this.attach(a), "undefined" == typeof c ? this.setPosition(b.row, b.column) : this.setPosition(b, c)
            };
        (function() {
            function a(a, b, c) {
                var d = c ? a.column <= b.column : a.column < b.column;
                return a.row < b.row || a.row == b.row && d
            }

            function b(b, c, d) {
                var e = "insert" == b.action,
                    f = (e ? 1 : -1) * (b.end.row - b.start.row),
                    g = (e ? 1 : -1) * (b.end.column - b.start.column),
                    h = b.start,
                    i = e ? h : b.end;
                return a(c, h, d) ? {
                    row: c.row,
                    column: c.column
                } : a(i, c, !d) ? {
                    row: c.row + f,
                    column: c.column + (c.row == i.row ? g : 0)
                } : {
                    row: h.row,
                    column: h.column
                }
            }
            d.implement(this, e), this.getPosition = function() {
                return this.$clipPositionToDocument(this.row, this.column)
            }, this.getDocument = function() {
                return this.document
            }, this.$insertRight = !1, this.onChange = function(a) {
                if (!(a.start.row == a.end.row && a.start.row != this.row || a.start.row > this.row)) {
                    var c = b(a, {
                        row: this.row,
                        column: this.column
                    }, this.$insertRight);
                    this.setPosition(c.row, c.column, !0)
                }
            }, this.setPosition = function(a, b, c) {
                var d;
                if (d = c ? {
                        row: a,
                        column: b
                    } : this.$clipPositionToDocument(a, b), this.row != d.row || this.column != d.column) {
                    var e = {
                        row: this.row,
                        column: this.column
                    };
                    this.row = d.row, this.column = d.column, this._signal("change", {
                        old: e,
                        value: d
                    })
                }
            }, this.detach = function() {
                this.document.removeEventListener("change", this.$onChange)
            }, this.attach = function(a) {
                this.document = a || this.document, this.document.on("change", this.$onChange)
            }, this.$clipPositionToDocument = function(a, b) {
                var c = {};
                return a >= this.document.getLength() ? (c.row = Math.max(0, this.document.getLength() - 1), c.column = this.document.getLine(c.row).length) : 0 > a ? (c.row = 0, c.column = 0) : (c.row = a, c.column = Math.min(this.document.getLine(c.row).length, Math.max(0, b))), 0 > b && (c.column = 0), c
            }
        }).call(f.prototype)
    }), define("ace/document", ["require", "exports", "module", "ace/lib/oop", "ace/apply_delta", "ace/lib/event_emitter", "ace/range", "ace/anchor"], function(a, b, c) {
        "use strict";
        var d = a("./lib/oop"),
            e = a("./apply_delta").applyDelta,
            f = a("./lib/event_emitter").EventEmitter,
            g = a("./range").Range,
            h = a("./anchor").Anchor,
            i = function(a) {
                this.$lines = [""], 0 === a.length ? this.$lines = [""] : Array.isArray(a) ? this.insertMergedLines({
                    row: 0,
                    column: 0
                }, a) : this.insert({
                    row: 0,
                    column: 0
                }, a)
            };
        (function() {
            d.implement(this, f), this.setValue = function(a) {
                var b = this.getLength() - 1;
                this.remove(new g(0, 0, b, this.getLine(b).length)), this.insert({
                    row: 0,
                    column: 0
                }, a)
            }, this.getValue = function() {
                return this.getAllLines().join(this.getNewLineCharacter())
            }, this.createAnchor = function(a, b) {
                return new h(this, a, b)
            }, 0 === "aaa".split(/a/).length ? this.$split = function(a) {
                return a.replace(/\r\n|\r/g, "\n").split("\n")
            } : this.$split = function(a) {
                return a.split(/\r\n|\r|\n/)
            }, this.$detectNewLine = function(a) {
                var b = a.match(/^.*?(\r\n|\r|\n)/m);
                this.$autoNewLine = b ? b[1] : "\n", this._signal("changeNewLineMode")
            }, this.getNewLineCharacter = function() {
                switch (this.$newLineMode) {
                    case "windows":
                        return "\r\n";
                    case "unix":
                        return "\n";
                    default:
                        return this.$autoNewLine || "\n"
                }
            }, this.$autoNewLine = "", this.$newLineMode = "auto", this.setNewLineMode = function(a) {
                this.$newLineMode !== a && (this.$newLineMode = a, this._signal("changeNewLineMode"))
            }, this.getNewLineMode = function() {
                return this.$newLineMode
            }, this.isNewLine = function(a) {
                return "\r\n" == a || "\r" == a || "\n" == a
            }, this.getLine = function(a) {
                return this.$lines[a] || ""
            }, this.getLines = function(a, b) {
                return this.$lines.slice(a, b + 1)
            }, this.getAllLines = function() {
                return this.getLines(0, this.getLength())
            }, this.getLength = function() {
                return this.$lines.length
            }, this.getTextRange = function(a) {
                return this.getLinesForRange(a).join(this.getNewLineCharacter())
            }, this.getLinesForRange = function(a) {
                var b;
                if (a.start.row === a.end.row) b = [this.getLine(a.start.row).substring(a.start.column, a.end.column)];
                else {
                    b = this.getLines(a.start.row, a.end.row), b[0] = (b[0] || "").substring(a.start.column);
                    var c = b.length - 1;
                    a.end.row - a.start.row == c && (b[c] = b[c].substring(0, a.end.column))
                }
                return b
            }, this.insertLines = function(a, b) {
                return console.warn("Use of document.insertLines is deprecated. Use the insertFullLines method instead."), this.insertFullLines(a, b)
            }, this.removeLines = function(a, b) {
                return console.warn("Use of document.removeLines is deprecated. Use the removeFullLines method instead."), this.removeFullLines(a, b)
            }, this.insertNewLine = function(a) {
                return console.warn("Use of document.insertNewLine is deprecated. Use insertMergedLines(position, ['', '']) instead."), this.insertMergedLines(a, ["", ""])
            }, this.insert = function(a, b) {
                return this.getLength() <= 1 && this.$detectNewLine(b), this.insertMergedLines(a, this.$split(b))
            }, this.insertInLine = function(a, b) {
                var c = this.clippedPos(a.row, a.column),
                    d = this.pos(a.row, a.column + b.length);
                return this.applyDelta({
                    start: c,
                    end: d,
                    action: "insert",
                    lines: [b]
                }, !0), this.clonePos(d)
            }, this.clippedPos = function(a, b) {
                var c = this.getLength();
                void 0 === a ? a = c : 0 > a ? a = 0 : a >= c && (a = c - 1, b = void 0);
                var d = this.getLine(a);
                return void 0 == b && (b = d.length), b = Math.min(Math.max(b, 0), d.length), {
                    row: a,
                    column: b
                }
            }, this.clonePos = function(a) {
                return {
                    row: a.row,
                    column: a.column
                }
            }, this.pos = function(a, b) {
                return {
                    row: a,
                    column: b
                }
            }, this.$clipPosition = function(a) {
                var b = this.getLength();
                return a.row >= b ? (a.row = Math.max(0, b - 1), a.column = this.getLine(b - 1).length) : (a.row = Math.max(0, a.row), a.column = Math.min(Math.max(a.column, 0), this.getLine(a.row).length)), a
            }, this.insertFullLines = function(a, b) {
                a = Math.min(Math.max(a, 0), this.getLength());
                var c = 0;
                a < this.getLength() ? (b = b.concat([""]), c = 0) : (b = [""].concat(b), a--, c = this.$lines[a].length), this.insertMergedLines({
                    row: a,
                    column: c
                }, b)
            }, this.insertMergedLines = function(a, b) {
                var c = this.clippedPos(a.row, a.column),
                    d = {
                        row: c.row + b.length - 1,
                        column: (1 == b.length ? c.column : 0) + b[b.length - 1].length
                    };
                return this.applyDelta({
                    start: c,
                    end: d,
                    action: "insert",
                    lines: b
                }), this.clonePos(d)
            }, this.remove = function(a) {
                var b = this.clippedPos(a.start.row, a.start.column),
                    c = this.clippedPos(a.end.row, a.end.column);
                return this.applyDelta({
                    start: b,
                    end: c,
                    action: "remove",
                    lines: this.getLinesForRange({
                        start: b,
                        end: c
                    })
                }), this.clonePos(b)
            }, this.removeInLine = function(a, b, c) {
                var d = this.clippedPos(a, b),
                    e = this.clippedPos(a, c);
                return this.applyDelta({
                    start: d,
                    end: e,
                    action: "remove",
                    lines: this.getLinesForRange({
                        start: d,
                        end: e
                    })
                }, !0), this.clonePos(d)
            }, this.removeFullLines = function(a, b) {
                a = Math.min(Math.max(0, a), this.getLength() - 1), b = Math.min(Math.max(0, b), this.getLength() - 1);
                var c = b == this.getLength() - 1 && a > 0,
                    d = b < this.getLength() - 1,
                    e = c ? a - 1 : a,
                    f = c ? this.getLine(e).length : 0,
                    h = d ? b + 1 : b,
                    i = d ? 0 : this.getLine(h).length,
                    j = new g(e, f, h, i),
                    k = this.$lines.slice(a, b + 1);
                return this.applyDelta({
                    start: j.start,
                    end: j.end,
                    action: "remove",
                    lines: this.getLinesForRange(j)
                }), k
            }, this.removeNewLine = function(a) {
                a < this.getLength() - 1 && a >= 0 && this.applyDelta({
                    start: this.pos(a, this.getLine(a).length),
                    end: this.pos(a + 1, 0),
                    action: "remove",
                    lines: ["", ""]
                })
            }, this.replace = function(a, b) {
                if (a instanceof g || (a = g.fromPoints(a.start, a.end)), 0 === b.length && a.isEmpty()) return a.start;
                if (b == this.getTextRange(a)) return a.end;
                this.remove(a);
                var c;
                return c = b ? this.insert(a.start, b) : a.start
            }, this.applyDeltas = function(a) {
                for (var b = 0; b < a.length; b++) this.applyDelta(a[b])
            }, this.revertDeltas = function(a) {
                for (var b = a.length - 1; b >= 0; b--) this.revertDelta(a[b]);
            }, this.applyDelta = function(a, b) {
                var c = "insert" == a.action;
                (c ? a.lines.length <= 1 && !a.lines[0] : !g.comparePoints(a.start, a.end)) || (c && a.lines.length > 2e4 && this.$splitAndapplyLargeDelta(a, 2e4), e(this.$lines, a, b), this._signal("change", a))
            }, this.$splitAndapplyLargeDelta = function(a, b) {
                for (var c = a.lines, d = c.length, e = a.start.row, f = a.start.column, g = 0, h = 0;;) {
                    g = h, h += b - 1;
                    var i = c.slice(g, h);
                    if (h > d) {
                        a.lines = i, a.start.row = e + g, a.start.column = f;
                        break
                    }
                    i.push(""), this.applyDelta({
                        start: this.pos(e + g, f),
                        end: this.pos(e + h, f = 0),
                        action: a.action,
                        lines: i
                    }, !0)
                }
            }, this.revertDelta = function(a) {
                this.applyDelta({
                    start: this.clonePos(a.start),
                    end: this.clonePos(a.end),
                    action: "insert" == a.action ? "remove" : "insert",
                    lines: a.lines.slice()
                })
            }, this.indexToPosition = function(a, b) {
                for (var c = this.$lines || this.getAllLines(), d = this.getNewLineCharacter().length, e = b || 0, f = c.length; f > e; e++)
                    if (a -= c[e].length + d, 0 > a) return {
                        row: e,
                        column: a + c[e].length + d
                    };
                return {
                    row: f - 1,
                    column: c[f - 1].length
                }
            }, this.positionToIndex = function(a, b) {
                for (var c = this.$lines || this.getAllLines(), d = this.getNewLineCharacter().length, e = 0, f = Math.min(a.row, c.length), g = b || 0; f > g; ++g) e += c[g].length + d;
                return e + a.column
            }
        }).call(i.prototype), b.Document = i
    }), define("ace/background_tokenizer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/event_emitter"], function(a, b, c) {
        "use strict";
        var d = a("./lib/oop"),
            e = a("./lib/event_emitter").EventEmitter,
            f = function(a, b) {
                this.running = !1, this.lines = [], this.states = [], this.currentLine = 0, this.tokenizer = a;
                var c = this;
                this.$worker = function() {
                    if (c.running) {
                        for (var a = new Date, b = c.currentLine, d = -1, e = c.doc, f = b; c.lines[b];) b++;
                        var g = e.getLength(),
                            h = 0;
                        for (c.running = !1; g > b;) {
                            c.$tokenizeRow(b), d = b;
                            do b++; while (c.lines[b]);
                            if (h++, h % 5 === 0 && new Date - a > 20) {
                                c.running = setTimeout(c.$worker, 20);
                                break
                            }
                        }
                        c.currentLine = b, d >= f && c.fireUpdateEvent(f, d)
                    }
                }
            };
        (function() {
            d.implement(this, e), this.setTokenizer = function(a) {
                this.tokenizer = a, this.lines = [], this.states = [], this.start(0)
            }, this.setDocument = function(a) {
                this.doc = a, this.lines = [], this.states = [], this.stop()
            }, this.fireUpdateEvent = function(a, b) {
                var c = {
                    first: a,
                    last: b
                };
                this._signal("update", {
                    data: c
                })
            }, this.start = function(a) {
                this.currentLine = Math.min(a || 0, this.currentLine, this.doc.getLength()), this.lines.splice(this.currentLine, this.lines.length), this.states.splice(this.currentLine, this.states.length), this.stop(), this.running = setTimeout(this.$worker, 700)
            }, this.scheduleStart = function() {
                this.running || (this.running = setTimeout(this.$worker, 700))
            }, this.$updateOnChange = function(a) {
                var b = a.start.row,
                    c = a.end.row - b;
                if (0 === c) this.lines[b] = null;
                else if ("remove" == a.action) this.lines.splice(b, c + 1, null), this.states.splice(b, c + 1, null);
                else {
                    var d = Array(c + 1);
                    d.unshift(b, 1), this.lines.splice.apply(this.lines, d), this.states.splice.apply(this.states, d)
                }
                this.currentLine = Math.min(b, this.currentLine, this.doc.getLength()), this.stop()
            }, this.stop = function() {
                this.running && clearTimeout(this.running), this.running = !1
            }, this.getTokens = function(a) {
                return this.lines[a] || this.$tokenizeRow(a)
            }, this.getState = function(a) {
                return this.currentLine == a && this.$tokenizeRow(a), this.states[a] || "start"
            }, this.$tokenizeRow = function(a) {
                var b = this.doc.getLine(a),
                    c = this.states[a - 1],
                    d = this.tokenizer.getLineTokens(b, c, a);
                return this.states[a] + "" != d.state + "" ? (this.states[a] = d.state, this.lines[a + 1] = null, this.currentLine > a + 1 && (this.currentLine = a + 1)) : this.currentLine == a && (this.currentLine = a + 1), this.lines[a] = d.tokens
            }
        }).call(f.prototype), b.BackgroundTokenizer = f
    }), define("ace/search_highlight", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function(a, b, c) {
        "use strict";
        var d = a("./lib/lang"),
            e = (a("./lib/oop"), a("./range").Range),
            f = function(a, b, c) {
                this.setRegexp(a), this.clazz = b, this.type = c || "text"
            };
        (function() {
            this.MAX_RANGES = 500, this.setRegexp = function(a) {
                this.regExp + "" != a + "" && (this.regExp = a, this.cache = [])
            }, this.update = function(a, b, c, f) {
                if (this.regExp)
                    for (var g = f.firstRow, h = f.lastRow, i = g; h >= i; i++) {
                        var j = this.cache[i];
                        null == j && (j = d.getMatchOffsets(c.getLine(i), this.regExp), j.length > this.MAX_RANGES && (j = j.slice(0, this.MAX_RANGES)), j = j.map(function(a) {
                            return new e(i, a.offset, i, a.offset + a.length)
                        }), this.cache[i] = j.length ? j : "");
                        for (var k = j.length; k--;) b.drawSingleLineMarker(a, j[k].toScreenRange(c), this.clazz, f)
                    }
            }
        }).call(f.prototype), b.SearchHighlight = f
    }), define("ace/edit_session/fold_line", ["require", "exports", "module", "ace/range"], function(a, b, c) {
        "use strict";

        function d(a, b) {
            this.foldData = a, Array.isArray(b) ? this.folds = b : b = this.folds = [b];
            var c = b[b.length - 1];
            this.range = new e(b[0].start.row, b[0].start.column, c.end.row, c.end.column), this.start = this.range.start, this.end = this.range.end, this.folds.forEach(function(a) {
                a.setFoldLine(this)
            }, this)
        }
        var e = a("../range").Range;
        (function() {
            this.shiftRow = function(a) {
                this.start.row += a, this.end.row += a, this.folds.forEach(function(b) {
                    b.start.row += a, b.end.row += a
                })
            }, this.addFold = function(a) {
                if (a.sameRow) {
                    if (a.start.row < this.startRow || a.endRow > this.endRow) throw new Error("Can't add a fold to this FoldLine as it has no connection");
                    this.folds.push(a), this.folds.sort(function(a, b) {
                        return -a.range.compareEnd(b.start.row, b.start.column)
                    }), this.range.compareEnd(a.start.row, a.start.column) > 0 ? (this.end.row = a.end.row, this.end.column = a.end.column) : this.range.compareStart(a.end.row, a.end.column) < 0 && (this.start.row = a.start.row, this.start.column = a.start.column)
                } else if (a.start.row == this.end.row) this.folds.push(a), this.end.row = a.end.row, this.end.column = a.end.column;
                else {
                    if (a.end.row != this.start.row) throw new Error("Trying to add fold to FoldRow that doesn't have a matching row");
                    this.folds.unshift(a), this.start.row = a.start.row, this.start.column = a.start.column
                }
                a.foldLine = this
            }, this.containsRow = function(a) {
                return a >= this.start.row && a <= this.end.row
            }, this.walk = function(a, b, c) {
                var d, e, f, g = 0,
                    h = this.folds,
                    i = !0;
                null == b && (b = this.end.row, c = this.end.column);
                for (var j = 0; j < h.length; j++) {
                    if (d = h[j], e = d.range.compareStart(b, c), -1 == e) return void a(null, b, c, g, i);
                    if (f = a(null, d.start.row, d.start.column, g, i), f = !f && a(d.placeholder, d.start.row, d.start.column, g), f || 0 === e) return;
                    i = !d.sameRow, g = d.end.column
                }
                a(null, b, c, g, i)
            }, this.getNextFoldTo = function(a, b) {
                for (var c, d, e = 0; e < this.folds.length; e++) {
                    if (c = this.folds[e], d = c.range.compareEnd(a, b), -1 == d) return {
                        fold: c,
                        kind: "after"
                    };
                    if (0 === d) return {
                        fold: c,
                        kind: "inside"
                    }
                }
                return null
            }, this.addRemoveChars = function(a, b, c) {
                var d, e, f = this.getNextFoldTo(a, b);
                if (f)
                    if (d = f.fold, "inside" == f.kind && d.start.column != b && d.start.row != a) window.console && window.console.log(a, b, d);
                    else if (d.start.row == a) {
                    e = this.folds;
                    var g = e.indexOf(d);
                    for (0 === g && (this.start.column += c), g; g < e.length; g++) {
                        if (d = e[g], d.start.column += c, !d.sameRow) return;
                        d.end.column += c
                    }
                    this.end.column += c
                }
            }, this.split = function(a, b) {
                var c = this.getNextFoldTo(a, b);
                if (!c || "inside" == c.kind) return null;
                var e = c.fold,
                    f = this.folds,
                    g = this.foldData,
                    h = f.indexOf(e),
                    i = f[h - 1];
                this.end.row = i.end.row, this.end.column = i.end.column, f = f.splice(h, f.length - h);
                var j = new d(g, f);
                return g.splice(g.indexOf(this) + 1, 0, j), j
            }, this.merge = function(a) {
                for (var b = a.folds, c = 0; c < b.length; c++) this.addFold(b[c]);
                var d = this.foldData;
                d.splice(d.indexOf(a), 1)
            }, this.toString = function() {
                var a = [this.range.toString() + ": ["];
                return this.folds.forEach(function(b) {
                    a.push("  " + b.toString())
                }), a.push("]"), a.join("\n")
            }, this.idxToPosition = function(a) {
                for (var b = 0, c = 0; c < this.folds.length; c++) {
                    var d = this.folds[c];
                    if (a -= d.start.column - b, 0 > a) return {
                        row: d.start.row,
                        column: d.start.column + a
                    };
                    if (a -= d.placeholder.length, 0 > a) return d.start;
                    b = d.end.column
                }
                return {
                    row: this.end.row,
                    column: this.end.column + a
                }
            }
        }).call(d.prototype), b.FoldLine = d
    }), define("ace/range_list", ["require", "exports", "module", "ace/range"], function(a, b, c) {
        "use strict";
        var d = a("./range").Range,
            e = d.comparePoints,
            f = function() {
                this.ranges = []
            };
        (function() {
            this.comparePoints = e, this.pointIndex = function(a, b, c) {
                for (var d = this.ranges, f = c || 0; f < d.length; f++) {
                    var g = d[f],
                        h = e(a, g.end);
                    if (!(h > 0)) {
                        var i = e(a, g.start);
                        return 0 === h ? b && 0 !== i ? -f - 2 : f : i > 0 || 0 === i && !b ? f : -f - 1
                    }
                }
                return -f - 1
            }, this.add = function(a) {
                var b = !a.isEmpty(),
                    c = this.pointIndex(a.start, b);
                0 > c && (c = -c - 1);
                var d = this.pointIndex(a.end, b, c);
                return 0 > d ? d = -d - 1 : d++, this.ranges.splice(c, d - c, a)
            }, this.addList = function(a) {
                for (var b = [], c = a.length; c--;) b.push.apply(b, this.add(a[c]));
                return b
            }, this.substractPoint = function(a) {
                var b = this.pointIndex(a);
                return b >= 0 ? this.ranges.splice(b, 1) : void 0
            }, this.merge = function() {
                var a = [],
                    b = this.ranges;
                b = b.sort(function(a, b) {
                    return e(a.start, b.start)
                });
                for (var c, d = b[0], f = 1; f < b.length; f++) {
                    c = d, d = b[f];
                    var g = e(c.end, d.start);
                    0 > g || (0 != g || c.isEmpty() || d.isEmpty()) && (e(c.end, d.end) < 0 && (c.end.row = d.end.row, c.end.column = d.end.column), b.splice(f, 1), a.push(d), d = c, f--)
                }
                return this.ranges = b, a
            }, this.contains = function(a, b) {
                return this.pointIndex({
                    row: a,
                    column: b
                }) >= 0
            }, this.containsPoint = function(a) {
                return this.pointIndex(a) >= 0
            }, this.rangeAtPoint = function(a) {
                var b = this.pointIndex(a);
                return b >= 0 ? this.ranges[b] : void 0
            }, this.clipRows = function(a, b) {
                var c = this.ranges;
                if (c[0].start.row > b || c[c.length - 1].start.row < a) return [];
                var d = this.pointIndex({
                    row: a,
                    column: 0
                });
                0 > d && (d = -d - 1);
                var e = this.pointIndex({
                    row: b,
                    column: 0
                }, d);
                0 > e && (e = -e - 1);
                for (var f = [], g = d; e > g; g++) f.push(c[g]);
                return f
            }, this.removeAll = function() {
                return this.ranges.splice(0, this.ranges.length)
            }, this.attach = function(a) {
                this.session && this.detach(), this.session = a, this.onChange = this.$onChange.bind(this), this.session.on("change", this.onChange)
            }, this.detach = function() {
                this.session && (this.session.removeListener("change", this.onChange), this.session = null)
            }, this.$onChange = function(a) {
                if ("insert" == a.action) var b = a.start,
                    c = a.end;
                else var c = a.start,
                    b = a.end;
                for (var d = b.row, e = c.row, f = e - d, g = -b.column + c.column, h = this.ranges, i = 0, j = h.length; j > i; i++) {
                    var k = h[i];
                    if (!(k.end.row < d)) {
                        if (k.start.row > d) break;
                        if (k.start.row == d && k.start.column >= b.column && (k.start.column == b.column && this.$insertRight || (k.start.column += g, k.start.row += f)), k.end.row == d && k.end.column >= b.column) {
                            if (k.end.column == b.column && this.$insertRight) continue;
                            k.end.column == b.column && g > 0 && j - 1 > i && k.end.column > k.start.column && k.end.column == h[i + 1].start.column && (k.end.column -= g), k.end.column += g, k.end.row += f
                        }
                    }
                }
                if (0 != f && j > i)
                    for (; j > i; i++) {
                        var k = h[i];
                        k.start.row += f, k.end.row += f
                    }
            }
        }).call(f.prototype), b.RangeList = f
    }), define("ace/edit_session/fold", ["require", "exports", "module", "ace/range", "ace/range_list", "ace/lib/oop"], function(a, b, c) {
        "use strict";

        function d(a, b) {
            a.row -= b.row, 0 == a.row && (a.column -= b.column)
        }

        function e(a, b) {
            d(a.start, b), d(a.end, b)
        }

        function f(a, b) {
            0 == a.row && (a.column += b.column), a.row += b.row
        }

        function g(a, b) {
            f(a.start, b), f(a.end, b)
        }
        var h = (a("../range").Range, a("../range_list").RangeList),
            i = a("../lib/oop"),
            j = b.Fold = function(a, b) {
                this.foldLine = null, this.placeholder = b, this.range = a, this.start = a.start, this.end = a.end, this.sameRow = a.start.row == a.end.row, this.subFolds = this.ranges = []
            };
        i.inherits(j, h),
            function() {
                this.toString = function() {
                    return '"' + this.placeholder + '" ' + this.range.toString()
                }, this.setFoldLine = function(a) {
                    this.foldLine = a, this.subFolds.forEach(function(b) {
                        b.setFoldLine(a)
                    })
                }, this.clone = function() {
                    var a = this.range.clone(),
                        b = new j(a, this.placeholder);
                    return this.subFolds.forEach(function(a) {
                        b.subFolds.push(a.clone())
                    }), b.collapseChildren = this.collapseChildren, b
                }, this.addSubFold = function(a) {
                    if (!this.range.isEqual(a)) {
                        if (!this.range.containsRange(a)) throw new Error("A fold can't intersect already existing fold" + a.range + this.range);
                        e(a, this.start);
                        for (var b = a.start.row, c = a.start.column, d = 0, f = -1; d < this.subFolds.length && (f = this.subFolds[d].range.compare(b, c), 1 == f); d++);
                        var g = this.subFolds[d];
                        if (0 == f) return g.addSubFold(a);
                        for (var b = a.range.end.row, c = a.range.end.column, h = d, f = -1; h < this.subFolds.length && (f = this.subFolds[h].range.compare(b, c), 1 == f); h++);
                        this.subFolds[h];
                        if (0 == f) throw new Error("A fold can't intersect already existing fold" + a.range + this.range);
                        this.subFolds.splice(d, h - d, a);
                        return a.setFoldLine(this.foldLine), a
                    }
                }, this.restoreRange = function(a) {
                    return g(a, this.start)
                }
            }.call(j.prototype)
    }), define("ace/edit_session/folding", ["require", "exports", "module", "ace/range", "ace/edit_session/fold_line", "ace/edit_session/fold", "ace/token_iterator"], function(a, b, c) {
        "use strict";

        function d() {
            this.getFoldAt = function(a, b, c) {
                var d = this.getFoldLine(a);
                if (!d) return null;
                for (var e = d.folds, f = 0; f < e.length; f++) {
                    var g = e[f];
                    if (g.range.contains(a, b)) {
                        if (1 == c && g.range.isEnd(a, b)) continue;
                        if (-1 == c && g.range.isStart(a, b)) continue;
                        return g
                    }
                }
            }, this.getFoldsInRange = function(a) {
                var b = a.start,
                    c = a.end,
                    d = this.$foldData,
                    e = [];
                b.column += 1, c.column -= 1;
                for (var f = 0; f < d.length; f++) {
                    var g = d[f].range.compareRange(a);
                    if (2 != g) {
                        if (-2 == g) break;
                        for (var h = d[f].folds, i = 0; i < h.length; i++) {
                            var j = h[i];
                            if (g = j.range.compareRange(a), -2 == g) break;
                            if (2 != g) {
                                if (42 == g) break;
                                e.push(j)
                            }
                        }
                    }
                }
                return b.column -= 1, c.column += 1, e
            }, this.getFoldsInRangeList = function(a) {
                if (Array.isArray(a)) {
                    var b = [];
                    a.forEach(function(a) {
                        b = b.concat(this.getFoldsInRange(a))
                    }, this)
                } else var b = this.getFoldsInRange(a);
                return b
            }, this.getAllFolds = function() {
                for (var a = [], b = this.$foldData, c = 0; c < b.length; c++)
                    for (var d = 0; d < b[c].folds.length; d++) a.push(b[c].folds[d]);
                return a
            }, this.getFoldStringAt = function(a, b, c, d) {
                if (d = d || this.getFoldLine(a), !d) return null;
                for (var e, f, g = {
                        end: {
                            column: 0
                        }
                    }, h = 0; h < d.folds.length; h++) {
                    f = d.folds[h];
                    var i = f.range.compareEnd(a, b);
                    if (-1 == i) {
                        e = this.getLine(f.start.row).substring(g.end.column, f.start.column);
                        break
                    }
                    if (0 === i) return null;
                    g = f
                }
                return e || (e = this.getLine(f.start.row).substring(g.end.column)), -1 == c ? e.substring(0, b - g.end.column) : 1 == c ? e.substring(b - g.end.column) : e
            }, this.getFoldLine = function(a, b) {
                var c = this.$foldData,
                    d = 0;
                for (b && (d = c.indexOf(b)), -1 == d && (d = 0), d; d < c.length; d++) {
                    var e = c[d];
                    if (e.start.row <= a && e.end.row >= a) return e;
                    if (e.end.row > a) return null
                }
                return null
            }, this.getNextFoldLine = function(a, b) {
                var c = this.$foldData,
                    d = 0;
                for (b && (d = c.indexOf(b)), -1 == d && (d = 0), d; d < c.length; d++) {
                    var e = c[d];
                    if (e.end.row >= a) return e
                }
                return null
            }, this.getFoldedRowCount = function(a, b) {
                for (var c = this.$foldData, d = b - a + 1, e = 0; e < c.length; e++) {
                    var f = c[e],
                        g = f.end.row,
                        h = f.start.row;
                    if (g >= b) {
                        b > h && (h >= a ? d -= b - h : d = 0);
                        break
                    }
                    g >= a && (d -= h >= a ? g - h : g - a + 1)
                }
                return d
            }, this.$addFoldLine = function(a) {
                return this.$foldData.push(a), this.$foldData.sort(function(a, b) {
                    return a.start.row - b.start.row
                }), a
            }, this.addFold = function(a, b) {
                var c, d = this.$foldData,
                    e = !1;
                a instanceof g ? c = a : (c = new g(b, a), c.collapseChildren = b.collapseChildren), this.$clipRangeToDocument(c.range);
                var h = c.start.row,
                    i = c.start.column,
                    j = c.end.row,
                    k = c.end.column;
                if (!(j > h || h == j && k - 2 >= i)) throw new Error("The range has to be at least 2 characters width");
                var l = this.getFoldAt(h, i, 1),
                    m = this.getFoldAt(j, k, -1);
                if (l && m == l) return l.addSubFold(c);
                l && !l.range.isStart(h, i) && this.removeFold(l), m && !m.range.isEnd(j, k) && this.removeFold(m);
                var n = this.getFoldsInRange(c.range);
                n.length > 0 && (this.removeFolds(n), n.forEach(function(a) {
                    c.addSubFold(a)
                }));
                for (var o = 0; o < d.length; o++) {
                    var p = d[o];
                    if (j == p.start.row) {
                        p.addFold(c), e = !0;
                        break
                    }
                    if (h == p.end.row) {
                        if (p.addFold(c), e = !0, !c.sameRow) {
                            var q = d[o + 1];
                            if (q && q.start.row == j) {
                                p.merge(q);
                                break
                            }
                        }
                        break
                    }
                    if (j <= p.start.row) break
                }
                return e || (p = this.$addFoldLine(new f(this.$foldData, c))), this.$useWrapMode ? this.$updateWrapData(p.start.row, p.start.row) : this.$updateRowLengthCache(p.start.row, p.start.row), this.$modified = !0, this._signal("changeFold", {
                    data: c,
                    action: "add"
                }), c
            }, this.addFolds = function(a) {
                a.forEach(function(a) {
                    this.addFold(a)
                }, this)
            }, this.removeFold = function(a) {
                var b = a.foldLine,
                    c = b.start.row,
                    d = b.end.row,
                    e = this.$foldData,
                    f = b.folds;
                if (1 == f.length) e.splice(e.indexOf(b), 1);
                else if (b.range.isEnd(a.end.row, a.end.column)) f.pop(), b.end.row = f[f.length - 1].end.row, b.end.column = f[f.length - 1].end.column;
                else if (b.range.isStart(a.start.row, a.start.column)) f.shift(), b.start.row = f[0].start.row, b.start.column = f[0].start.column;
                else if (a.sameRow) f.splice(f.indexOf(a), 1);
                else {
                    var g = b.split(a.start.row, a.start.column);
                    f = g.folds, f.shift(), g.start.row = f[0].start.row, g.start.column = f[0].start.column
                }
                this.$updating || (this.$useWrapMode ? this.$updateWrapData(c, d) : this.$updateRowLengthCache(c, d)), this.$modified = !0, this._signal("changeFold", {
                    data: a,
                    action: "remove"
                })
            }, this.removeFolds = function(a) {
                for (var b = [], c = 0; c < a.length; c++) b.push(a[c]);
                b.forEach(function(a) {
                    this.removeFold(a)
                }, this), this.$modified = !0
            }, this.expandFold = function(a) {
                this.removeFold(a), a.subFolds.forEach(function(b) {
                    a.restoreRange(b), this.addFold(b)
                }, this), a.collapseChildren > 0 && this.foldAll(a.start.row + 1, a.end.row, a.collapseChildren - 1), a.subFolds = []
            }, this.expandFolds = function(a) {
                a.forEach(function(a) {
                    this.expandFold(a)
                }, this)
            }, this.unfold = function(a, b) {
                var c, d;
                if (null == a ? (c = new e(0, 0, this.getLength(), 0), b = !0) : c = "number" == typeof a ? new e(a, 0, a, this.getLine(a).length) : "row" in a ? e.fromPoints(a, a) : a, d = this.getFoldsInRangeList(c), b) this.removeFolds(d);
                else
                    for (var f = d; f.length;) this.expandFolds(f), f = this.getFoldsInRangeList(c);
                return d.length ? d : void 0
            }, this.isRowFolded = function(a, b) {
                return !!this.getFoldLine(a, b)
            }, this.getRowFoldEnd = function(a, b) {
                var c = this.getFoldLine(a, b);
                return c ? c.end.row : a
            }, this.getRowFoldStart = function(a, b) {
                var c = this.getFoldLine(a, b);
                return c ? c.start.row : a
            }, this.getFoldDisplayLine = function(a, b, c, d, e) {
                null == d && (d = a.start.row), null == e && (e = 0), null == b && (b = a.end.row), null == c && (c = this.getLine(b).length);
                var f = this.doc,
                    g = "";
                return a.walk(function(a, b, c, h) {
                    if (!(d > b)) {
                        if (b == d) {
                            if (e > c) return;
                            h = Math.max(e, h)
                        }
                        g += null != a ? a : f.getLine(b).substring(h, c)
                    }
                }, b, c), g
            }, this.getDisplayLine = function(a, b, c, d) {
                var e = this.getFoldLine(a);
                if (e) return this.getFoldDisplayLine(e, a, b, c, d);
                var f;
                return f = this.doc.getLine(a), f.substring(d || 0, b || f.length)
            }, this.$cloneFoldData = function() {
                var a = [];
                return a = this.$foldData.map(function(b) {
                    var c = b.folds.map(function(a) {
                        return a.clone()
                    });
                    return new f(a, c)
                })
            }, this.toggleFold = function(a) {
                var b, c, d = this.selection,
                    e = d.getRange();
                if (e.isEmpty()) {
                    var f = e.start;
                    if (b = this.getFoldAt(f.row, f.column)) return void this.expandFold(b);
                    (c = this.findMatchingBracket(f)) ? 1 == e.comparePoint(c) ? e.end = c : (e.start = c, e.start.column++, e.end.column--): (c = this.findMatchingBracket({
                        row: f.row,
                        column: f.column + 1
                    })) ? (1 == e.comparePoint(c) ? e.end = c : e.start = c, e.start.column++) : e = this.getCommentFoldRange(f.row, f.column) || e
                } else {
                    var g = this.getFoldsInRange(e);
                    if (a && g.length) return void this.expandFolds(g);
                    1 == g.length && (b = g[0])
                }
                if (b || (b = this.getFoldAt(e.start.row, e.start.column)), b && b.range.toString() == e.toString()) return void this.expandFold(b);
                var h = "...";
                if (!e.isMultiLine()) {
                    if (h = this.getTextRange(e), h.length < 4) return;
                    h = h.trim().substring(0, 2) + ".."
                }
                this.addFold(h, e)
            }, this.getCommentFoldRange = function(a, b, c) {
                var d = new h(this, a, b),
                    f = d.getCurrentToken();
                if (f && /^comment|string/.test(f.type)) {
                    var g = new e,
                        i = new RegExp(f.type.replace(/\..*/, "\\."));
                    if (1 != c) {
                        do f = d.stepBackward(); while (f && i.test(f.type));
                        d.stepForward()
                    }
                    if (g.start.row = d.getCurrentTokenRow(), g.start.column = d.getCurrentTokenColumn() + 2, d = new h(this, a, b), -1 != c) {
                        do f = d.stepForward(); while (f && i.test(f.type));
                        f = d.stepBackward()
                    } else f = d.getCurrentToken();
                    return g.end.row = d.getCurrentTokenRow(), g.end.column = d.getCurrentTokenColumn() + f.value.length - 2, g
                }
            }, this.foldAll = function(a, b, c) {
                void 0 == c && (c = 1e5);
                var d = this.foldWidgets;
                if (d) {
                    b = b || this.getLength(), a = a || 0;
                    for (var e = a; b > e; e++)
                        if (null == d[e] && (d[e] = this.getFoldWidget(e)), "start" == d[e]) {
                            var f = this.getFoldWidgetRange(e);
                            if (f && f.isMultiLine() && f.end.row <= b && f.start.row >= a) {
                                e = f.end.row;
                                try {
                                    var g = this.addFold("...", f);
                                    g && (g.collapseChildren = c)
                                } catch (h) {}
                            }
                        }
                }
            }, this.$foldStyles = {
                manual: 1,
                markbegin: 1,
                markbeginend: 1
            }, this.$foldStyle = "markbegin", this.setFoldStyle = function(a) {
                if (!this.$foldStyles[a]) throw new Error("invalid fold style: " + a + "[" + Object.keys(this.$foldStyles).join(", ") + "]");
                if (this.$foldStyle != a) {
                    this.$foldStyle = a, "manual" == a && this.unfold();
                    var b = this.$foldMode;
                    this.$setFolding(null), this.$setFolding(b)
                }
            }, this.$setFolding = function(a) {
                if (this.$foldMode != a) {
                    if (this.$foldMode = a, this.off("change", this.$updateFoldWidgets), this.off("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets), this._signal("changeAnnotation"), !a || "manual" == this.$foldStyle) return void(this.foldWidgets = null);
                    this.foldWidgets = [], this.getFoldWidget = a.getFoldWidget.bind(a, this, this.$foldStyle), this.getFoldWidgetRange = a.getFoldWidgetRange.bind(a, this, this.$foldStyle), this.$updateFoldWidgets = this.updateFoldWidgets.bind(this), this.$tokenizerUpdateFoldWidgets = this.tokenizerUpdateFoldWidgets.bind(this), this.on("change", this.$updateFoldWidgets), this.on("tokenizerUpdate", this.$tokenizerUpdateFoldWidgets)
                }
            }, this.getParentFoldRangeData = function(a, b) {
                var c = this.foldWidgets;
                if (!c || b && c[a]) return {};
                for (var d, e = a - 1; e >= 0;) {
                    var f = c[e];
                    if (null == f && (f = c[e] = this.getFoldWidget(e)), "start" == f) {
                        var g = this.getFoldWidgetRange(e);
                        if (d || (d = g), g && g.end.row >= a) break
                    }
                    e--
                }
                return {
                    range: -1 !== e && g,
                    firstRange: d
                }
            }, this.onFoldWidgetClick = function(a, b) {
                b = b.domEvent;
                var c = {
                        children: b.shiftKey,
                        all: b.ctrlKey || b.metaKey,
                        siblings: b.altKey
                    },
                    d = this.$toggleFoldWidget(a, c);
                if (!d) {
                    var e = b.target || b.srcElement;
                    e && /ace_fold-widget/.test(e.className) && (e.className += " ace_invalid")
                }
            }, this.$toggleFoldWidget = function(a, b) {
                if (this.getFoldWidget) {
                    var c = this.getFoldWidget(a),
                        d = this.getLine(a),
                        e = "end" === c ? -1 : 1,
                        f = this.getFoldAt(a, -1 === e ? 0 : d.length, e);
                    if (f) return void(b.children || b.all ? this.removeFold(f) : this.expandFold(f));
                    var g = this.getFoldWidgetRange(a, !0);
                    if (g && !g.isMultiLine() && (f = this.getFoldAt(g.start.row, g.start.column, 1), f && g.isEqual(f.range))) return void this.removeFold(f);
                    if (b.siblings) {
                        var h = this.getParentFoldRangeData(a);
                        if (h.range) var i = h.range.start.row + 1,
                            j = h.range.end.row;
                        this.foldAll(i, j, b.all ? 1e4 : 0)
                    } else b.children ? (j = g ? g.end.row : this.getLength(), this.foldAll(a + 1, j, b.all ? 1e4 : 0)) : g && (b.all && (g.collapseChildren = 1e4), this.addFold("...", g));
                    return g
                }
            }, this.toggleFoldWidget = function(a) {
                var b = this.selection.getCursor().row;
                b = this.getRowFoldStart(b);
                var c = this.$toggleFoldWidget(b, {});
                if (!c) {
                    var d = this.getParentFoldRangeData(b, !0);
                    if (c = d.range || d.firstRange) {
                        b = c.start.row;
                        var e = this.getFoldAt(b, this.getLine(b).length, 1);
                        e ? this.removeFold(e) : this.addFold("...", c)
                    }
                }
            }, this.updateFoldWidgets = function(a) {
                var b = a.start.row,
                    c = a.end.row - b;
                if (0 === c) this.foldWidgets[b] = null;
                else if ("remove" == a.action) this.foldWidgets.splice(b, c + 1, null);
                else {
                    var d = Array(c + 1);
                    d.unshift(b, 1), this.foldWidgets.splice.apply(this.foldWidgets, d)
                }
            }, this.tokenizerUpdateFoldWidgets = function(a) {
                var b = a.data;
                b.first != b.last && this.foldWidgets.length > b.first && this.foldWidgets.splice(b.first, this.foldWidgets.length)
            }
        }
        var e = a("../range").Range,
            f = a("./fold_line").FoldLine,
            g = a("./fold").Fold,
            h = a("../token_iterator").TokenIterator;
        b.Folding = d
    }), define("ace/edit_session/bracket_match", ["require", "exports", "module", "ace/token_iterator", "ace/range"], function(a, b, c) {
        "use strict";

        function d() {
            this.findMatchingBracket = function(a, b) {
                if (0 == a.column) return null;
                var c = b || this.getLine(a.row).charAt(a.column - 1);
                if ("" == c) return null;
                var d = c.match(/([\(\[\{])|([\)\]\}])/);
                return d ? d[1] ? this.$findClosingBracket(d[1], a) : this.$findOpeningBracket(d[2], a) : null
            }, this.getBracketRange = function(a) {
                var b, c = this.getLine(a.row),
                    d = !0,
                    e = c.charAt(a.column - 1),
                    g = e && e.match(/([\(\[\{])|([\)\]\}])/);
                if (g || (e = c.charAt(a.column), a = {
                        row: a.row,
                        column: a.column + 1
                    }, g = e && e.match(/([\(\[\{])|([\)\]\}])/), d = !1), !g) return null;
                if (g[1]) {
                    var h = this.$findClosingBracket(g[1], a);
                    if (!h) return null;
                    b = f.fromPoints(a, h), d || (b.end.column++, b.start.column--), b.cursor = b.end
                } else {
                    var h = this.$findOpeningBracket(g[2], a);
                    if (!h) return null;
                    b = f.fromPoints(h, a), d || (b.start.column++, b.end.column--), b.cursor = b.start
                }
                return b
            }, this.$brackets = {
                ")": "(",
                "(": ")",
                "]": "[",
                "[": "]",
                "{": "}",
                "}": "{"
            }, this.$findOpeningBracket = function(a, b, c) {
                var d = this.$brackets[a],
                    f = 1,
                    g = new e(this, b.row, b.column),
                    h = g.getCurrentToken();
                if (h || (h = g.stepForward()), h) {
                    c || (c = new RegExp("(\\.?" + h.type.replace(".", "\\.").replace("rparen", ".paren").replace(/\b(?:end)\b/, "(?:start|begin|end)") + ")+"));
                    for (var i = b.column - g.getCurrentTokenColumn() - 2, j = h.value;;) {
                        for (; i >= 0;) {
                            var k = j.charAt(i);
                            if (k == d) {
                                if (f -= 1, 0 == f) return {
                                    row: g.getCurrentTokenRow(),
                                    column: i + g.getCurrentTokenColumn()
                                }
                            } else k == a && (f += 1);
                            i -= 1
                        }
                        do h = g.stepBackward(); while (h && !c.test(h.type));
                        if (null == h) break;
                        j = h.value, i = j.length - 1
                    }
                    return null
                }
            }, this.$findClosingBracket = function(a, b, c) {
                var d = this.$brackets[a],
                    f = 1,
                    g = new e(this, b.row, b.column),
                    h = g.getCurrentToken();
                if (h || (h = g.stepForward()), h) {
                    c || (c = new RegExp("(\\.?" + h.type.replace(".", "\\.").replace("lparen", ".paren").replace(/\b(?:start|begin)\b/, "(?:start|begin|end)") + ")+"));
                    for (var i = b.column - g.getCurrentTokenColumn();;) {
                        for (var j = h.value, k = j.length; k > i;) {
                            var l = j.charAt(i);
                            if (l == d) {
                                if (f -= 1, 0 == f) return {
                                    row: g.getCurrentTokenRow(),
                                    column: i + g.getCurrentTokenColumn()
                                }
                            } else l == a && (f += 1);
                            i += 1
                        }
                        do h = g.stepForward(); while (h && !c.test(h.type));
                        if (null == h) break;
                        i = 0
                    }
                    return null
                }
            }
        }
        var e = a("../token_iterator").TokenIterator,
            f = a("../range").Range;
        b.BracketMatch = d
    }), define("ace/edit_session", ["require", "exports", "module", "ace/lib/oop", "ace/lib/lang", "ace/config", "ace/lib/event_emitter", "ace/selection", "ace/mode/text", "ace/range", "ace/document", "ace/background_tokenizer", "ace/search_highlight", "ace/edit_session/folding", "ace/edit_session/bracket_match"], function(a, b, c) {
        "use strict";
        var d = a("./lib/oop"),
            e = a("./lib/lang"),
            f = a("./config"),
            g = a("./lib/event_emitter").EventEmitter,
            h = a("./selection").Selection,
            i = a("./mode/text").Mode,
            j = a("./range").Range,
            k = a("./document").Document,
            l = a("./background_tokenizer").BackgroundTokenizer,
            m = a("./search_highlight").SearchHighlight,
            n = function(a, b) {
                this.$breakpoints = [], this.$decorations = [], this.$frontMarkers = {}, this.$backMarkers = {}, this.$markerId = 1, this.$undoSelect = !0, this.$foldData = [], this.$foldData.toString = function() {
                    return this.join("\n")
                }, this.on("changeFold", this.onChangeFold.bind(this)), this.$onChange = this.onChange.bind(this), "object" == typeof a && a.getLine || (a = new k(a)), this.setDocument(a), this.selection = new h(this), f.resetOptions(this), this.setMode(b), f._signal("session", this)
            };
        (function() {
            function a(a) {
                return 4352 > a ? !1 : a >= 4352 && 4447 >= a || a >= 4515 && 4519 >= a || a >= 4602 && 4607 >= a || a >= 9001 && 9002 >= a || a >= 11904 && 11929 >= a || a >= 11931 && 12019 >= a || a >= 12032 && 12245 >= a || a >= 12272 && 12283 >= a || a >= 12288 && 12350 >= a || a >= 12353 && 12438 >= a || a >= 12441 && 12543 >= a || a >= 12549 && 12589 >= a || a >= 12593 && 12686 >= a || a >= 12688 && 12730 >= a || a >= 12736 && 12771 >= a || a >= 12784 && 12830 >= a || a >= 12832 && 12871 >= a || a >= 12880 && 13054 >= a || a >= 13056 && 19903 >= a || a >= 19968 && 42124 >= a || a >= 42128 && 42182 >= a || a >= 43360 && 43388 >= a || a >= 44032 && 55203 >= a || a >= 55216 && 55238 >= a || a >= 55243 && 55291 >= a || a >= 63744 && 64255 >= a || a >= 65040 && 65049 >= a || a >= 65072 && 65106 >= a || a >= 65108 && 65126 >= a || a >= 65128 && 65131 >= a || a >= 65281 && 65376 >= a || a >= 65504 && 65510 >= a
            }
            d.implement(this, g), this.setDocument = function(a) {
                this.doc && this.doc.removeListener("change", this.$onChange), this.doc = a, a.on("change", this.$onChange), this.bgTokenizer && this.bgTokenizer.setDocument(this.getDocument()), this.resetCaches()
            }, this.getDocument = function() {
                return this.doc
            }, this.$resetRowCache = function(a) {
                if (!a) return this.$docRowCache = [], void(this.$screenRowCache = []);
                var b = this.$docRowCache.length,
                    c = this.$getRowCacheIndex(this.$docRowCache, a) + 1;
                b > c && (this.$docRowCache.splice(c, b), this.$screenRowCache.splice(c, b))
            }, this.$getRowCacheIndex = function(a, b) {
                for (var c = 0, d = a.length - 1; d >= c;) {
                    var e = c + d >> 1,
                        f = a[e];
                    if (b > f) c = e + 1;
                    else {
                        if (!(f > b)) return e;
                        d = e - 1
                    }
                }
                return c - 1
            }, this.resetCaches = function() {
                this.$modified = !0, this.$wrapData = [], this.$rowLengthCache = [], this.$resetRowCache(0), this.bgTokenizer && this.bgTokenizer.start(0)
            }, this.onChangeFold = function(a) {
                var b = a.data;
                this.$resetRowCache(b.start.row)
            }, this.onChange = function(a) {
                this.$modified = !0, this.$resetRowCache(a.start.row);
                var b = this.$updateInternalDataOnChange(a);
                this.$fromUndo || !this.$undoManager || a.ignore || (this.$deltasDoc.push(a), b && 0 != b.length && this.$deltasFold.push({
                    action: "removeFolds",
                    folds: b
                }), this.$informUndoManager.schedule()), this.bgTokenizer && this.bgTokenizer.$updateOnChange(a), this._signal("change", a)
            }, this.setValue = function(a) {
                this.doc.setValue(a), this.selection.moveTo(0, 0), this.$resetRowCache(0), this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.setUndoManager(this.$undoManager), this.getUndoManager().reset()
            }, this.getValue = this.toString = function() {
                return this.doc.getValue()
            }, this.getSelection = function() {
                return this.selection
            }, this.getState = function(a) {
                return this.bgTokenizer.getState(a)
            }, this.getTokens = function(a) {
                return this.bgTokenizer.getTokens(a)
            }, this.getTokenAt = function(a, b) {
                var c, d = this.bgTokenizer.getTokens(a),
                    e = 0;
                if (null == b) f = d.length - 1, e = this.getLine(a).length;
                else
                    for (var f = 0; f < d.length && (e += d[f].value.length, !(e >= b)); f++);
                return (c = d[f]) ? (c.index = f, c.start = e - c.value.length, c) : null
            }, this.setUndoManager = function(a) {
                if (this.$undoManager = a, this.$deltas = [], this.$deltasDoc = [], this.$deltasFold = [], this.$informUndoManager && this.$informUndoManager.cancel(), a) {
                    var b = this;
                    this.$syncInformUndoManager = function() {
                        b.$informUndoManager.cancel(), b.$deltasFold.length && (b.$deltas.push({
                            group: "fold",
                            deltas: b.$deltasFold
                        }), b.$deltasFold = []), b.$deltasDoc.length && (b.$deltas.push({
                            group: "doc",
                            deltas: b.$deltasDoc
                        }), b.$deltasDoc = []), b.$deltas.length > 0 && a.execute({
                            action: "aceupdate",
                            args: [b.$deltas, b],
                            merge: b.mergeUndoDeltas
                        }), b.mergeUndoDeltas = !1, b.$deltas = []
                    }, this.$informUndoManager = e.delayedCall(this.$syncInformUndoManager)
                }
            }, this.markUndoGroup = function() {
                this.$syncInformUndoManager && this.$syncInformUndoManager()
            }, this.$defaultUndoManager = {
                undo: function() {},
                redo: function() {},
                reset: function() {}
            }, this.getUndoManager = function() {
                return this.$undoManager || this.$defaultUndoManager
            }, this.getTabString = function() {
                return this.getUseSoftTabs() ? e.stringRepeat(" ", this.getTabSize()) : "	"
            }, this.setUseSoftTabs = function(a) {
                this.setOption("useSoftTabs", a)
            }, this.getUseSoftTabs = function() {
                return this.$useSoftTabs && !this.$mode.$indentWithTabs
            }, this.setTabSize = function(a) {
                this.setOption("tabSize", a)
            }, this.getTabSize = function() {
                return this.$tabSize
            }, this.isTabStop = function(a) {
                return this.$useSoftTabs && a.column % this.$tabSize === 0
            }, this.$overwrite = !1, this.setOverwrite = function(a) {
                this.setOption("overwrite", a)
            }, this.getOverwrite = function() {
                return this.$overwrite
            }, this.toggleOverwrite = function() {
                this.setOverwrite(!this.$overwrite)
            }, this.addGutterDecoration = function(a, b) {
                this.$decorations[a] || (this.$decorations[a] = ""), this.$decorations[a] += " " + b, this._signal("changeBreakpoint", {})
            }, this.removeGutterDecoration = function(a, b) {
                this.$decorations[a] = (this.$decorations[a] || "").replace(" " + b, ""), this._signal("changeBreakpoint", {})
            }, this.getBreakpoints = function() {
                return this.$breakpoints
            }, this.setBreakpoints = function(a) {
                this.$breakpoints = [];
                for (var b = 0; b < a.length; b++) this.$breakpoints[a[b]] = "ace_breakpoint";
                this._signal("changeBreakpoint", {})
            }, this.clearBreakpoints = function() {
                this.$breakpoints = [], this._signal("changeBreakpoint", {})
            }, this.setBreakpoint = function(a, b) {
                void 0 === b && (b = "ace_breakpoint"), b ? this.$breakpoints[a] = b : delete this.$breakpoints[a], this._signal("changeBreakpoint", {})
            }, this.clearBreakpoint = function(a) {
                delete this.$breakpoints[a], this._signal("changeBreakpoint", {})
            }, this.addMarker = function(a, b, c, d) {
                var e = this.$markerId++,
                    f = {
                        range: a,
                        type: c || "line",
                        renderer: "function" == typeof c ? c : null,
                        clazz: b,
                        inFront: !!d,
                        id: e
                    };
                return d ? (this.$frontMarkers[e] = f, this._signal("changeFrontMarker")) : (this.$backMarkers[e] = f, this._signal("changeBackMarker")), e
            }, this.addDynamicMarker = function(a, b) {
                if (a.update) {
                    var c = this.$markerId++;
                    return a.id = c, a.inFront = !!b, b ? (this.$frontMarkers[c] = a, this._signal("changeFrontMarker")) : (this.$backMarkers[c] = a, this._signal("changeBackMarker")), a
                }
            }, this.removeMarker = function(a) {
                var b = this.$frontMarkers[a] || this.$backMarkers[a];
                if (b) {
                    var c = b.inFront ? this.$frontMarkers : this.$backMarkers;
                    b && (delete c[a], this._signal(b.inFront ? "changeFrontMarker" : "changeBackMarker"))
                }
            }, this.getMarkers = function(a) {
                return a ? this.$frontMarkers : this.$backMarkers
            }, this.highlight = function(a) {
                if (!this.$searchHighlight) {
                    var b = new m(null, "ace_selected-word", "text");
                    this.$searchHighlight = this.addDynamicMarker(b)
                }
                this.$searchHighlight.setRegexp(a)
            }, this.highlightLines = function(a, b, c, d) {
                "number" != typeof b && (c = b, b = a), c || (c = "ace_step");
                var e = new j(a, 0, b, 1 / 0);
                return e.id = this.addMarker(e, c, "fullLine", d), e
            }, this.setAnnotations = function(a) {
                this.$annotations = a, this._signal("changeAnnotation", {})
            }, this.getAnnotations = function() {
                return this.$annotations || [];
            }, this.clearAnnotations = function() {
                this.setAnnotations([])
            }, this.$detectNewLine = function(a) {
                var b = a.match(/^.*?(\r?\n)/m);
                b ? this.$autoNewLine = b[1] : this.$autoNewLine = "\n"
            }, this.getWordRange = function(a, b) {
                var c = this.getLine(a),
                    d = !1;
                if (b > 0 && (d = !!c.charAt(b - 1).match(this.tokenRe)), d || (d = !!c.charAt(b).match(this.tokenRe)), d) var e = this.tokenRe;
                else if (/^\s+$/.test(c.slice(b - 1, b + 1))) var e = /\s/;
                else var e = this.nonTokenRe;
                var f = b;
                if (f > 0) {
                    do f--; while (f >= 0 && c.charAt(f).match(e));
                    f++
                }
                for (var g = b; g < c.length && c.charAt(g).match(e);) g++;
                return new j(a, f, a, g)
            }, this.getAWordRange = function(a, b) {
                for (var c = this.getWordRange(a, b), d = this.getLine(c.end.row); d.charAt(c.end.column).match(/[ \t]/);) c.end.column += 1;
                return c
            }, this.setNewLineMode = function(a) {
                this.doc.setNewLineMode(a)
            }, this.getNewLineMode = function() {
                return this.doc.getNewLineMode()
            }, this.setUseWorker = function(a) {
                this.setOption("useWorker", a)
            }, this.getUseWorker = function() {
                return this.$useWorker
            }, this.onReloadTokenizer = function(a) {
                var b = a.data;
                this.bgTokenizer.start(b.first), this._signal("tokenizerUpdate", a)
            }, this.$modes = {}, this.$mode = null, this.$modeId = null, this.setMode = function(a, b) {
                if (a && "object" == typeof a) {
                    if (a.getTokenizer) return this.$onChangeMode(a);
                    var c = a,
                        d = c.path
                } else d = a || "ace/mode/text";
                return this.$modes["ace/mode/text"] || (this.$modes["ace/mode/text"] = new i), this.$modes[d] && !c ? (this.$onChangeMode(this.$modes[d]), void(b && b())) : (this.$modeId = d, f.loadModule(["mode", d], function(a) {
                    return this.$modeId !== d ? b && b() : (this.$modes[d] && !c ? this.$onChangeMode(this.$modes[d]) : a && a.Mode && (a = new a.Mode(c), c || (this.$modes[d] = a, a.$id = d), this.$onChangeMode(a)), void(b && b()))
                }.bind(this)), void(this.$mode || this.$onChangeMode(this.$modes["ace/mode/text"], !0)))
            }, this.$onChangeMode = function(a, b) {
                if (b || (this.$modeId = a.$id), this.$mode !== a) {
                    this.$mode = a, this.$stopWorker(), this.$useWorker && this.$startWorker();
                    var c = a.getTokenizer();
                    if (void 0 !== c.addEventListener) {
                        var d = this.onReloadTokenizer.bind(this);
                        c.addEventListener("update", d)
                    }
                    if (this.bgTokenizer) this.bgTokenizer.setTokenizer(c);
                    else {
                        this.bgTokenizer = new l(c);
                        var e = this;
                        this.bgTokenizer.addEventListener("update", function(a) {
                            e._signal("tokenizerUpdate", a)
                        })
                    }
                    this.bgTokenizer.setDocument(this.getDocument()), this.tokenRe = a.tokenRe, this.nonTokenRe = a.nonTokenRe, b || (a.attachToSession && a.attachToSession(this), this.$options.wrapMethod.set.call(this, this.$wrapMethod), this.$setFolding(a.foldingRules), this.bgTokenizer.start(0), this._emit("changeMode"))
                }
            }, this.$stopWorker = function() {
                this.$worker && (this.$worker.terminate(), this.$worker = null)
            }, this.$startWorker = function() {
                try {
                    this.$worker = this.$mode.createWorker(this)
                } catch (a) {
                    f.warn("Could not load worker", a), this.$worker = null
                }
            }, this.getMode = function() {
                return this.$mode
            }, this.$scrollTop = 0, this.setScrollTop = function(a) {
                this.$scrollTop === a || isNaN(a) || (this.$scrollTop = a, this._signal("changeScrollTop", a))
            }, this.getScrollTop = function() {
                return this.$scrollTop
            }, this.$scrollLeft = 0, this.setScrollLeft = function(a) {
                this.$scrollLeft === a || isNaN(a) || (this.$scrollLeft = a, this._signal("changeScrollLeft", a))
            }, this.getScrollLeft = function() {
                return this.$scrollLeft
            }, this.getScreenWidth = function() {
                return this.$computeWidth(), this.lineWidgets ? Math.max(this.getLineWidgetMaxWidth(), this.screenWidth) : this.screenWidth
            }, this.getLineWidgetMaxWidth = function() {
                if (null != this.lineWidgetsWidth) return this.lineWidgetsWidth;
                var a = 0;
                return this.lineWidgets.forEach(function(b) {
                    b && b.screenWidth > a && (a = b.screenWidth)
                }), this.lineWidgetWidth = a
            }, this.$computeWidth = function(a) {
                if (this.$modified || a) {
                    if (this.$modified = !1, this.$useWrapMode) return this.screenWidth = this.$wrapLimit;
                    for (var b = this.doc.getAllLines(), c = this.$rowLengthCache, d = 0, e = 0, f = this.$foldData[e], g = f ? f.start.row : 1 / 0, h = b.length, i = 0; h > i; i++) {
                        if (i > g) {
                            if (i = f.end.row + 1, i >= h) break;
                            f = this.$foldData[e++], g = f ? f.start.row : 1 / 0
                        }
                        null == c[i] && (c[i] = this.$getStringScreenWidth(b[i])[0]), c[i] > d && (d = c[i])
                    }
                    this.screenWidth = d
                }
            }, this.getLine = function(a) {
                return this.doc.getLine(a)
            }, this.getLines = function(a, b) {
                return this.doc.getLines(a, b)
            }, this.getLength = function() {
                return this.doc.getLength()
            }, this.getTextRange = function(a) {
                return this.doc.getTextRange(a || this.selection.getRange())
            }, this.insert = function(a, b) {
                return this.doc.insert(a, b)
            }, this.remove = function(a) {
                return this.doc.remove(a)
            }, this.removeFullLines = function(a, b) {
                return this.doc.removeFullLines(a, b)
            }, this.undoChanges = function(a, b) {
                if (a.length) {
                    this.$fromUndo = !0;
                    for (var c = null, d = a.length - 1; - 1 != d; d--) {
                        var e = a[d];
                        "doc" == e.group ? (this.doc.revertDeltas(e.deltas), c = this.$getUndoSelection(e.deltas, !0, c)) : e.deltas.forEach(function(a) {
                            this.addFolds(a.folds)
                        }, this)
                    }
                    return this.$fromUndo = !1, c && this.$undoSelect && !b && this.selection.setSelectionRange(c), c
                }
            }, this.redoChanges = function(a, b) {
                if (a.length) {
                    this.$fromUndo = !0;
                    for (var c = null, d = 0; d < a.length; d++) {
                        var e = a[d];
                        "doc" == e.group && (this.doc.applyDeltas(e.deltas), c = this.$getUndoSelection(e.deltas, !1, c))
                    }
                    return this.$fromUndo = !1, c && this.$undoSelect && !b && this.selection.setSelectionRange(c), c
                }
            }, this.setUndoSelect = function(a) {
                this.$undoSelect = a
            }, this.$getUndoSelection = function(a, b, c) {
                function d(a) {
                    return b ? "insert" !== a.action : "insert" === a.action
                }
                var e, f, g = a[0],
                    h = !1;
                d(g) ? (e = j.fromPoints(g.start, g.end), h = !0) : (e = j.fromPoints(g.start, g.start), h = !1);
                for (var i = 1; i < a.length; i++) g = a[i], d(g) ? (f = g.start, -1 == e.compare(f.row, f.column) && e.setStart(f), f = g.end, 1 == e.compare(f.row, f.column) && e.setEnd(f), h = !0) : (f = g.start, -1 == e.compare(f.row, f.column) && (e = j.fromPoints(g.start, g.start)), h = !1);
                if (null != c) {
                    0 === j.comparePoints(c.start, e.start) && (c.start.column += e.end.column - e.start.column, c.end.column += e.end.column - e.start.column);
                    var k = c.compareRange(e);
                    1 == k ? e.setStart(c.start) : -1 == k && e.setEnd(c.end)
                }
                return e
            }, this.replace = function(a, b) {
                return this.doc.replace(a, b)
            }, this.moveText = function(a, b, c) {
                var d = this.getTextRange(a),
                    e = this.getFoldsInRange(a),
                    f = j.fromPoints(b, b);
                if (!c) {
                    this.remove(a);
                    var g = a.start.row - a.end.row,
                        h = g ? -a.end.column : a.start.column - a.end.column;
                    h && (f.start.row == a.end.row && f.start.column > a.end.column && (f.start.column += h), f.end.row == a.end.row && f.end.column > a.end.column && (f.end.column += h)), g && f.start.row >= a.end.row && (f.start.row += g, f.end.row += g)
                }
                if (f.end = this.insert(f.start, d), e.length) {
                    var i = a.start,
                        k = f.start,
                        g = k.row - i.row,
                        h = k.column - i.column;
                    this.addFolds(e.map(function(a) {
                        return a = a.clone(), a.start.row == i.row && (a.start.column += h), a.end.row == i.row && (a.end.column += h), a.start.row += g, a.end.row += g, a
                    }))
                }
                return f
            }, this.indentRows = function(a, b, c) {
                c = c.replace(/\t/g, this.getTabString());
                for (var d = a; b >= d; d++) this.doc.insertInLine({
                    row: d,
                    column: 0
                }, c)
            }, this.outdentRows = function(a) {
                for (var b = a.collapseRows(), c = new j(0, 0, 0, 0), d = this.getTabSize(), e = b.start.row; e <= b.end.row; ++e) {
                    var f = this.getLine(e);
                    c.start.row = e, c.end.row = e;
                    for (var g = 0; d > g && " " == f.charAt(g); ++g);
                    d > g && "	" == f.charAt(g) ? (c.start.column = g, c.end.column = g + 1) : (c.start.column = 0, c.end.column = g), this.remove(c)
                }
            }, this.$moveLines = function(a, b, c) {
                if (a = this.getRowFoldStart(a), b = this.getRowFoldEnd(b), 0 > c) {
                    var d = this.getRowFoldStart(a + c);
                    if (0 > d) return 0;
                    var e = d - a
                } else if (c > 0) {
                    var d = this.getRowFoldEnd(b + c);
                    if (d > this.doc.getLength() - 1) return 0;
                    var e = d - b
                } else {
                    a = this.$clipRowToDocument(a), b = this.$clipRowToDocument(b);
                    var e = b - a + 1
                }
                var f = new j(a, 0, b, Number.MAX_VALUE),
                    g = this.getFoldsInRange(f).map(function(a) {
                        return a = a.clone(), a.start.row += e, a.end.row += e, a
                    }),
                    h = 0 == c ? this.doc.getLines(a, b) : this.doc.removeFullLines(a, b);
                return this.doc.insertFullLines(a + e, h), g.length && this.addFolds(g), e
            }, this.moveLinesUp = function(a, b) {
                return this.$moveLines(a, b, -1)
            }, this.moveLinesDown = function(a, b) {
                return this.$moveLines(a, b, 1)
            }, this.duplicateLines = function(a, b) {
                return this.$moveLines(a, b, 0)
            }, this.$clipRowToDocument = function(a) {
                return Math.max(0, Math.min(a, this.doc.getLength() - 1))
            }, this.$clipColumnToRow = function(a, b) {
                return 0 > b ? 0 : Math.min(this.doc.getLine(a).length, b)
            }, this.$clipPositionToDocument = function(a, b) {
                if (b = Math.max(0, b), 0 > a) a = 0, b = 0;
                else {
                    var c = this.doc.getLength();
                    a >= c ? (a = c - 1, b = this.doc.getLine(c - 1).length) : b = Math.min(this.doc.getLine(a).length, b)
                }
                return {
                    row: a,
                    column: b
                }
            }, this.$clipRangeToDocument = function(a) {
                a.start.row < 0 ? (a.start.row = 0, a.start.column = 0) : a.start.column = this.$clipColumnToRow(a.start.row, a.start.column);
                var b = this.doc.getLength() - 1;
                return a.end.row > b ? (a.end.row = b, a.end.column = this.doc.getLine(b).length) : a.end.column = this.$clipColumnToRow(a.end.row, a.end.column), a
            }, this.$wrapLimit = 80, this.$useWrapMode = !1, this.$wrapLimitRange = {
                min: null,
                max: null
            }, this.setUseWrapMode = function(a) {
                if (a != this.$useWrapMode) {
                    if (this.$useWrapMode = a, this.$modified = !0, this.$resetRowCache(0), a) {
                        var b = this.getLength();
                        this.$wrapData = Array(b), this.$updateWrapData(0, b - 1)
                    }
                    this._signal("changeWrapMode")
                }
            }, this.getUseWrapMode = function() {
                return this.$useWrapMode
            }, this.setWrapLimitRange = function(a, b) {
                (this.$wrapLimitRange.min !== a || this.$wrapLimitRange.max !== b) && (this.$wrapLimitRange = {
                    min: a,
                    max: b
                }, this.$modified = !0, this.$useWrapMode && this._signal("changeWrapMode"))
            }, this.adjustWrapLimit = function(a, b) {
                var c = this.$wrapLimitRange;
                c.max < 0 && (c = {
                    min: b,
                    max: b
                });
                var d = this.$constrainWrapLimit(a, c.min, c.max);
                return d != this.$wrapLimit && d > 1 ? (this.$wrapLimit = d, this.$modified = !0, this.$useWrapMode && (this.$updateWrapData(0, this.getLength() - 1), this.$resetRowCache(0), this._signal("changeWrapLimit")), !0) : !1
            }, this.$constrainWrapLimit = function(a, b, c) {
                return b && (a = Math.max(b, a)), c && (a = Math.min(c, a)), a
            }, this.getWrapLimit = function() {
                return this.$wrapLimit
            }, this.setWrapLimit = function(a) {
                this.setWrapLimitRange(a, a)
            }, this.getWrapLimitRange = function() {
                return {
                    min: this.$wrapLimitRange.min,
                    max: this.$wrapLimitRange.max
                }
            }, this.$updateInternalDataOnChange = function(a) {
                var b = this.$useWrapMode,
                    c = a.action,
                    d = a.start,
                    e = a.end,
                    f = d.row,
                    g = e.row,
                    h = g - f,
                    i = null;
                if (this.$updating = !0, 0 != h)
                    if ("remove" === c) {
                        this[b ? "$wrapData" : "$rowLengthCache"].splice(f, h);
                        var j = this.$foldData;
                        i = this.getFoldsInRange(a), this.removeFolds(i);
                        var k = this.getFoldLine(e.row),
                            l = 0;
                        if (k) {
                            k.addRemoveChars(e.row, e.column, d.column - e.column), k.shiftRow(-h);
                            var m = this.getFoldLine(f);
                            m && m !== k && (m.merge(k), k = m), l = j.indexOf(k) + 1
                        }
                        for (l; l < j.length; l++) {
                            var k = j[l];
                            k.start.row >= e.row && k.shiftRow(-h)
                        }
                        g = f
                    } else {
                        var n = Array(h);
                        n.unshift(f, 0);
                        var o = b ? this.$wrapData : this.$rowLengthCache;
                        o.splice.apply(o, n);
                        var j = this.$foldData,
                            k = this.getFoldLine(f),
                            l = 0;
                        if (k) {
                            var p = k.range.compareInside(d.row, d.column);
                            0 == p ? (k = k.split(d.row, d.column), k && (k.shiftRow(h), k.addRemoveChars(g, 0, e.column - d.column))) : -1 == p && (k.addRemoveChars(f, 0, e.column - d.column), k.shiftRow(h)), l = j.indexOf(k) + 1
                        }
                        for (l; l < j.length; l++) {
                            var k = j[l];
                            k.start.row >= f && k.shiftRow(h)
                        }
                    }
                else {
                    h = Math.abs(a.start.column - a.end.column), "remove" === c && (i = this.getFoldsInRange(a), this.removeFolds(i), h = -h);
                    var k = this.getFoldLine(f);
                    k && k.addRemoveChars(f, d.column, h)
                }
                return b && this.$wrapData.length != this.doc.getLength() && console.error("doc.getLength() and $wrapData.length have to be the same!"), this.$updating = !1, b ? this.$updateWrapData(f, g) : this.$updateRowLengthCache(f, g), i
            }, this.$updateRowLengthCache = function(a, b, c) {
                this.$rowLengthCache[a] = null, this.$rowLengthCache[b] = null
            }, this.$updateWrapData = function(a, b) {
                var c, d, e = this.doc.getAllLines(),
                    f = this.getTabSize(),
                    g = this.$wrapData,
                    i = this.$wrapLimit,
                    j = a;
                for (b = Math.min(b, e.length - 1); b >= j;) d = this.getFoldLine(j, d), d ? (c = [], d.walk(function(a, b, d, f) {
                    var g;
                    if (null != a) {
                        g = this.$getDisplayTokens(a, c.length), g[0] = h;
                        for (var i = 1; i < g.length; i++) g[i] = k
                    } else g = this.$getDisplayTokens(e[b].substring(f, d), c.length);
                    c = c.concat(g)
                }.bind(this), d.end.row, e[d.end.row].length + 1), g[d.start.row] = this.$computeWrapSplits(c, i, f), j = d.end.row + 1) : (c = this.$getDisplayTokens(e[j]), g[j] = this.$computeWrapSplits(c, i, f), j++)
            };
            var b = 1,
                c = 2,
                h = 3,
                k = 4,
                n = 9,
                o = 10,
                p = 11,
                q = 12;
            this.$computeWrapSplits = function(a, b, d) {
                function e() {
                    var b = 0;
                    if (0 === s) return b;
                    if (r)
                        for (var c = 0; c < a.length; c++) {
                            var e = a[c];
                            if (e == o) b += 1;
                            else {
                                if (e != p) {
                                    if (e == q) continue;
                                    break
                                }
                                b += d
                            }
                        }
                    return m && r !== !1 && (b += d), Math.min(b, s)
                }

                function f(b) {
                    var c = a.slice(j, b),
                        d = c.length;
                    c.join("").replace(/12/g, function() {
                        d -= 1
                    }).replace(/2/g, function() {
                        d -= 1
                    }), g.length || (t = e(), g.indent = t), l += d, g.push(l), j = b
                }
                if (0 == a.length) return [];
                for (var g = [], i = a.length, j = 0, l = 0, m = this.$wrapAsCode, r = this.$indentedSoftWrap, s = b <= Math.max(2 * d, 8) || r === !1 ? 0 : Math.floor(b / 2), t = 0; i - j > b - t;) {
                    var u = j + b - t;
                    if (a[u - 1] >= o && a[u] >= o) f(u);
                    else if (a[u] != h && a[u] != k) {
                        for (var v = Math.max(u - (b - (b >> 2)), j - 1); u > v && a[u] < h;) u--;
                        if (m) {
                            for (; u > v && a[u] < h;) u--;
                            for (; u > v && a[u] == n;) u--
                        } else
                            for (; u > v && a[u] < o;) u--;
                        u > v ? f(++u) : (u = j + b, a[u] == c && u--, f(u - t))
                    } else {
                        for (u; u != j - 1 && a[u] != h; u--);
                        if (u > j) {
                            f(u);
                            continue
                        }
                        for (u = j + b; u < a.length && a[u] == k; u++);
                        if (u == a.length) break;
                        f(u)
                    }
                }
                return g
            }, this.$getDisplayTokens = function(d, e) {
                var f, g = [];
                e = e || 0;
                for (var h = 0; h < d.length; h++) {
                    var i = d.charCodeAt(h);
                    if (9 == i) {
                        f = this.getScreenTabSize(g.length + e), g.push(p);
                        for (var j = 1; f > j; j++) g.push(q)
                    } else 32 == i ? g.push(o) : i > 39 && 48 > i || i > 57 && 64 > i ? g.push(n) : i >= 4352 && a(i) ? g.push(b, c) : g.push(b)
                }
                return g
            }, this.$getStringScreenWidth = function(b, c, d) {
                if (0 == c) return [0, 0];
                null == c && (c = 1 / 0), d = d || 0;
                var e, f;
                for (f = 0; f < b.length && (e = b.charCodeAt(f), d += 9 == e ? this.getScreenTabSize(d) : e >= 4352 && a(e) ? 2 : 1, !(d > c)); f++);
                return [d, f]
            }, this.lineWidgets = null, this.getRowLength = function(a) {
                if (this.lineWidgets) var b = this.lineWidgets[a] && this.lineWidgets[a].rowCount || 0;
                else b = 0;
                return this.$useWrapMode && this.$wrapData[a] ? this.$wrapData[a].length + 1 + b : 1 + b
            }, this.getRowLineCount = function(a) {
                return this.$useWrapMode && this.$wrapData[a] ? this.$wrapData[a].length + 1 : 1
            }, this.getRowWrapIndent = function(a) {
                if (this.$useWrapMode) {
                    var b = this.screenToDocumentPosition(a, Number.MAX_VALUE),
                        c = this.$wrapData[b.row];
                    return c.length && c[0] < b.column ? c.indent : 0
                }
                return 0
            }, this.getScreenLastRowColumn = function(a) {
                var b = this.screenToDocumentPosition(a, Number.MAX_VALUE);
                return this.documentToScreenColumn(b.row, b.column)
            }, this.getDocumentLastRowColumn = function(a, b) {
                var c = this.documentToScreenRow(a, b);
                return this.getScreenLastRowColumn(c)
            }, this.getDocumentLastRowColumnPosition = function(a, b) {
                var c = this.documentToScreenRow(a, b);
                return this.screenToDocumentPosition(c, Number.MAX_VALUE / 10)
            }, this.getRowSplitData = function(a) {
                return this.$useWrapMode ? this.$wrapData[a] : void 0
            }, this.getScreenTabSize = function(a) {
                return this.$tabSize - a % this.$tabSize
            }, this.screenToDocumentRow = function(a, b) {
                return this.screenToDocumentPosition(a, b).row
            }, this.screenToDocumentColumn = function(a, b) {
                return this.screenToDocumentPosition(a, b).column
            }, this.screenToDocumentPosition = function(a, b) {
                if (0 > a) return {
                    row: 0,
                    column: 0
                };
                var c, d, e = 0,
                    f = 0,
                    g = 0,
                    h = 0,
                    i = this.$screenRowCache,
                    j = this.$getRowCacheIndex(i, a),
                    k = i.length;
                if (k && j >= 0) var g = i[j],
                    e = this.$docRowCache[j],
                    l = a > i[k - 1];
                else var l = !k;
                for (var m = this.getLength() - 1, n = this.getNextFoldLine(e), o = n ? n.start.row : 1 / 0; a >= g && (h = this.getRowLength(e), !(g + h > a || e >= m));) g += h, e++, e > o && (e = n.end.row + 1, n = this.getNextFoldLine(e, n), o = n ? n.start.row : 1 / 0), l && (this.$docRowCache.push(e), this.$screenRowCache.push(g));
                if (n && n.start.row <= e) c = this.getFoldDisplayLine(n), e = n.start.row;
                else {
                    if (a >= g + h || e > m) return {
                        row: m,
                        column: this.getLine(m).length
                    };
                    c = this.getLine(e), n = null
                }
                var p = 0;
                if (this.$useWrapMode) {
                    var q = this.$wrapData[e];
                    if (q) {
                        var r = Math.floor(a - g);
                        d = q[r], r > 0 && q.length && (p = q.indent, f = q[r - 1] || q[q.length - 1], c = c.substring(f))
                    }
                }
                return f += this.$getStringScreenWidth(c, b - p)[1], this.$useWrapMode && f >= d && (f = d - 1), n ? n.idxToPosition(f) : {
                    row: e,
                    column: f
                }
            }, this.documentToScreenPosition = function(a, b) {
                if ("undefined" == typeof b) var c = this.$clipPositionToDocument(a.row, a.column);
                else c = this.$clipPositionToDocument(a, b);
                a = c.row, b = c.column;
                var d = 0,
                    e = null,
                    f = null;
                f = this.getFoldAt(a, b, 1), f && (a = f.start.row, b = f.start.column);
                var g, h = 0,
                    i = this.$docRowCache,
                    j = this.$getRowCacheIndex(i, a),
                    k = i.length;
                if (k && j >= 0) var h = i[j],
                    d = this.$screenRowCache[j],
                    l = a > i[k - 1];
                else var l = !k;
                for (var m = this.getNextFoldLine(h), n = m ? m.start.row : 1 / 0; a > h;) {
                    if (h >= n) {
                        if (g = m.end.row + 1, g > a) break;
                        m = this.getNextFoldLine(g, m), n = m ? m.start.row : 1 / 0
                    } else g = h + 1;
                    d += this.getRowLength(h), h = g, l && (this.$docRowCache.push(h), this.$screenRowCache.push(d))
                }
                var o = "";
                m && h >= n ? (o = this.getFoldDisplayLine(m, a, b), e = m.start.row) : (o = this.getLine(a).substring(0, b), e = a);
                var p = 0;
                if (this.$useWrapMode) {
                    var q = this.$wrapData[e];
                    if (q) {
                        for (var r = 0; o.length >= q[r];) d++, r++;
                        o = o.substring(q[r - 1] || 0, o.length), p = r > 0 ? q.indent : 0
                    }
                }
                return {
                    row: d,
                    column: p + this.$getStringScreenWidth(o)[0]
                }
            }, this.documentToScreenColumn = function(a, b) {
                return this.documentToScreenPosition(a, b).column
            }, this.documentToScreenRow = function(a, b) {
                return this.documentToScreenPosition(a, b).row
            }, this.getScreenLength = function() {
                var a = 0,
                    b = null;
                if (this.$useWrapMode)
                    for (var c = this.$wrapData.length, d = 0, e = 0, b = this.$foldData[e++], f = b ? b.start.row : 1 / 0; c > d;) {
                        var g = this.$wrapData[d];
                        a += g ? g.length + 1 : 1, d++, d > f && (d = b.end.row + 1, b = this.$foldData[e++], f = b ? b.start.row : 1 / 0)
                    } else {
                        a = this.getLength();
                        for (var h = this.$foldData, e = 0; e < h.length; e++) b = h[e], a -= b.end.row - b.start.row
                    }
                return this.lineWidgets && (a += this.$getWidgetScreenLength()), a
            }, this.$setFontMetrics = function(a) {
                this.$enableVarChar && (this.$getStringScreenWidth = function(b, c, d) {
                    if (0 === c) return [0, 0];
                    c || (c = 1 / 0), d = d || 0;
                    var e, f;
                    for (f = 0; f < b.length && (e = b.charAt(f), d += "	" === e ? this.getScreenTabSize(d) : a.getCharacterWidth(e), !(d > c)); f++);
                    return [d, f]
                })
            }, this.destroy = function() {
                this.bgTokenizer && (this.bgTokenizer.setDocument(null), this.bgTokenizer = null), this.$stopWorker()
            }
        }).call(n.prototype), a("./edit_session/folding").Folding.call(n.prototype), a("./edit_session/bracket_match").BracketMatch.call(n.prototype), f.defineOptions(n.prototype, "session", {
            wrap: {
                set: function(a) {
                    if (a && "off" != a ? "free" == a ? a = !0 : "printMargin" == a ? a = -1 : "string" == typeof a && (a = parseInt(a, 10) || !1) : a = !1, this.$wrap != a)
                        if (this.$wrap = a, a) {
                            var b = "number" == typeof a ? a : null;
                            this.setWrapLimitRange(b, b), this.setUseWrapMode(!0)
                        } else this.setUseWrapMode(!1)
                },
                get: function() {
                    return this.getUseWrapMode() ? -1 == this.$wrap ? "printMargin" : this.getWrapLimitRange().min ? this.$wrap : "free" : "off"
                },
                handlesSet: !0
            },
            wrapMethod: {
                set: function(a) {
                    a = "auto" == a ? "text" != this.$mode.type : "text" != a, a != this.$wrapAsCode && (this.$wrapAsCode = a, this.$useWrapMode && (this.$modified = !0, this.$resetRowCache(0), this.$updateWrapData(0, this.getLength() - 1)))
                },
                initialValue: "auto"
            },
            indentedSoftWrap: {
                initialValue: !0
            },
            firstLineNumber: {
                set: function() {
                    this._signal("changeBreakpoint")
                },
                initialValue: 1
            },
            useWorker: {
                set: function(a) {
                    this.$useWorker = a, this.$stopWorker(), a && this.$startWorker()
                },
                initialValue: !0
            },
            useSoftTabs: {
                initialValue: !0
            },
            tabSize: {
                set: function(a) {
                    isNaN(a) || this.$tabSize === a || (this.$modified = !0, this.$rowLengthCache = [], this.$tabSize = a, this._signal("changeTabSize"))
                },
                initialValue: 4,
                handlesSet: !0
            },
            overwrite: {
                set: function(a) {
                    this._signal("changeOverwrite")
                },
                initialValue: !1
            },
            newLineMode: {
                set: function(a) {
                    this.doc.setNewLineMode(a)
                },
                get: function() {
                    return this.doc.getNewLineMode()
                },
                handlesSet: !0
            },
            mode: {
                set: function(a) {
                    this.setMode(a)
                },
                get: function() {
                    return this.$modeId
                }
            }
        }), b.EditSession = n
    }), define("ace/search", ["require", "exports", "module", "ace/lib/lang", "ace/lib/oop", "ace/range"], function(a, b, c) {
        "use strict";
        var d = a("./lib/lang"),
            e = a("./lib/oop"),
            f = a("./range").Range,
            g = function() {
                this.$options = {}
            };
        (function() {
            this.set = function(a) {
                return e.mixin(this.$options, a), this
            }, this.getOptions = function() {
                return d.copyObject(this.$options)
            }, this.setOptions = function(a) {
                this.$options = a
            }, this.find = function(a) {
                var b = this.$options,
                    c = this.$matchIterator(a, b);
                if (!c) return !1;
                var d = null;
                return c.forEach(function(a, c, e) {
                    if (a.start) d = a;
                    else {
                        var g = a.offset + (e || 0);
                        if (d = new f(c, g, c, g + a.length), !a.length && b.start && b.start.start && 0 != b.skipCurrent && d.isEqual(b.start)) return d = null, !1
                    }
                    return !0
                }), d
            }, this.findAll = function(a) {
                var b = this.$options;
                if (!b.needle) return [];
                this.$assembleRegExp(b);
                var c = b.range,
                    e = c ? a.getLines(c.start.row, c.end.row) : a.doc.getAllLines(),
                    g = [],
                    h = b.re;
                if (b.$isMultiLine) {
                    var i, j = h.length,
                        k = e.length - j;
                    a: for (var l = h.offset || 0; k >= l; l++) {
                        for (var m = 0; j > m; m++)
                            if (-1 == e[l + m].search(h[m])) continue a;
                        var n = e[l],
                            o = e[l + j - 1],
                            p = n.length - n.match(h[0])[0].length,
                            q = o.match(h[j - 1])[0].length;
                        i && i.end.row === l && i.end.column > p || (g.push(i = new f(l, p, l + j - 1, q)), j > 2 && (l = l + j - 2))
                    }
                } else
                    for (var r = 0; r < e.length; r++)
                        for (var s = d.getMatchOffsets(e[r], h), m = 0; m < s.length; m++) {
                            var t = s[m];
                            g.push(new f(r, t.offset, r, t.offset + t.length))
                        }
                if (c) {
                    for (var u = c.start.column, v = c.start.column, r = 0, m = g.length - 1; m > r && g[r].start.column < u && g[r].start.row == c.start.row;) r++;
                    for (; m > r && g[m].end.column > v && g[m].end.row == c.end.row;) m--;
                    for (g = g.slice(r, m + 1), r = 0, m = g.length; m > r; r++) g[r].start.row += c.start.row, g[r].end.row += c.start.row
                }
                return g
            }, this.replace = function(a, b) {
                var c = this.$options,
                    d = this.$assembleRegExp(c);
                if (c.$isMultiLine) return b;
                if (d) {
                    var e = d.exec(a);
                    if (!e || e[0].length != a.length) return null;
                    if (b = a.replace(d, b), c.preserveCase) {
                        b = b.split("");
                        for (var f = Math.min(a.length, a.length); f--;) {
                            var g = a[f];
                            g && g.toLowerCase() != g ? b[f] = b[f].toUpperCase() : b[f] = b[f].toLowerCase()
                        }
                        b = b.join("")
                    }
                    return b
                }
            }, this.$matchIterator = function(a, b) {
                var c = this.$assembleRegExp(b);
                if (!c) return !1;
                var e;
                if (b.$isMultiLine) var g = c.length,
                    h = function(b, d, h) {
                        var i = b.search(c[0]);
                        if (-1 != i) {
                            for (var j = 1; g > j; j++)
                                if (b = a.getLine(d + j), -1 == b.search(c[j])) return;
                            var k = b.match(c[g - 1])[0].length,
                                l = new f(d, i, d + g - 1, k);
                            return 1 == c.offset ? (l.start.row--, l.start.column = Number.MAX_VALUE) : h && (l.start.column += h), e(l) ? !0 : void 0
                        }
                    };
                else if (b.backwards) var h = function(a, b, f) {
                    for (var g = d.getMatchOffsets(a, c), h = g.length - 1; h >= 0; h--)
                        if (e(g[h], b, f)) return !0
                };
                else var h = function(a, b, f) {
                    for (var g = d.getMatchOffsets(a, c), h = 0; h < g.length; h++)
                        if (e(g[h], b, f)) return !0
                };
                var i = this.$lineIterator(a, b);
                return {
                    forEach: function(a) {
                        e = a, i.forEach(h)
                    }
                }
            }, this.$assembleRegExp = function(a, b) {
                if (a.needle instanceof RegExp) return a.re = a.needle;
                var c = a.needle;
                if (!a.needle) return a.re = !1;
                a.regExp || (c = d.escapeRegExp(c)), a.wholeWord && (c = "\\b" + c + "\\b");
                var e = a.caseSensitive ? "gm" : "gmi";
                if (a.$isMultiLine = !b && /[\n\r]/.test(c), a.$isMultiLine) return a.re = this.$assembleMultilineRegExp(c, e);
                try {
                    var f = new RegExp(c, e)
                } catch (g) {
                    f = !1
                }
                return a.re = f
            }, this.$assembleMultilineRegExp = function(a, b) {
                for (var c = a.replace(/\r\n|\r|\n/g, "$\n^").split("\n"), d = [], e = 0; e < c.length; e++) try {
                    d.push(new RegExp(c[e], b))
                } catch (f) {
                    return !1
                }
                return "" == c[0] ? (d.shift(), d.offset = 1) : d.offset = 0, d
            }, this.$lineIterator = function(a, b) {
                var c = 1 == b.backwards,
                    d = 0 != b.skipCurrent,
                    e = b.range,
                    f = b.start;
                f || (f = e ? e[c ? "end" : "start"] : a.selection.getRange()), f.start && (f = f[d != c ? "end" : "start"]);
                var g = e ? e.start.row : 0,
                    h = e ? e.end.row : a.getLength() - 1,
                    i = c ? function(c) {
                        var d = f.row,
                            e = a.getLine(d).substring(0, f.column);
                        if (!c(e, d)) {
                            for (d--; d >= g; d--)
                                if (c(a.getLine(d), d)) return;
                            if (0 != b.wrap)
                                for (d = h, g = f.row; d >= g; d--)
                                    if (c(a.getLine(d), d)) return
                        }
                    } : function(c) {
                        var d = f.row,
                            e = a.getLine(d).substr(f.column);
                        if (!c(e, d, f.column)) {
                            for (d += 1; h >= d; d++)
                                if (c(a.getLine(d), d)) return;
                            if (0 != b.wrap)
                                for (d = g, h = f.row; h >= d; d++)
                                    if (c(a.getLine(d), d)) return
                        }
                    };
                return {
                    forEach: i
                }
            }
        }).call(g.prototype), b.Search = g
    }), define("ace/keyboard/hash_handler", ["require", "exports", "module", "ace/lib/keys", "ace/lib/useragent"], function(a, b, c) {
        "use strict";

        function d(a, b) {
            this.platform = b || (g.isMac ? "mac" : "win"), this.commands = {}, this.commandKeyBinding = {}, this.addCommands(a), this.$singleCommand = !0
        }

        function e(a, b) {
            d.call(this, a, b), this.$singleCommand = !1
        }
        var f = a("../lib/keys"),
            g = a("../lib/useragent"),
            h = f.KEY_MODS;
        e.prototype = d.prototype,
            function() {
                function a(a) {
                    return "object" == typeof a && a.bindKey && a.bindKey.position || 0
                }
                this.addCommand = function(a) {
                    this.commands[a.name] && this.removeCommand(a), this.commands[a.name] = a, a.bindKey && this._buildKeyHash(a)
                }, this.removeCommand = function(a, b) {
                    var c = a && ("string" == typeof a ? a : a.name);
                    a = this.commands[c], b || delete this.commands[c];
                    var d = this.commandKeyBinding;
                    for (var e in d) {
                        var f = d[e];
                        if (f == a) delete d[e];
                        else if (Array.isArray(f)) {
                            var g = f.indexOf(a); - 1 != g && (f.splice(g, 1), 1 == f.length && (d[e] = f[0]))
                        }
                    }
                }, this.bindKey = function(a, b, c) {
                    return "object" == typeof a && a && (void 0 == c && (c = a.position), a = a[this.platform]), a ? "function" == typeof b ? this.addCommand({
                        exec: b,
                        bindKey: a,
                        name: b.name || a
                    }) : void a.split("|").forEach(function(a) {
                        var d = "";
                        if (-1 != a.indexOf(" ")) {
                            var e = a.split(/\s+/);
                            a = e.pop(), e.forEach(function(a) {
                                var b = this.parseKeys(a),
                                    c = h[b.hashId] + b.key;
                                d += (d ? " " : "") + c, this._addCommandToBinding(d, "chainKeys")
                            }, this), d += " "
                        }
                        var f = this.parseKeys(a),
                            g = h[f.hashId] + f.key;
                        this._addCommandToBinding(d + g, b, c)
                    }, this) : void 0
                }, this._addCommandToBinding = function(b, c, d) {
                    var e, f = this.commandKeyBinding;
                    if (c)
                        if (!f[b] || this.$singleCommand) f[b] = c;
                        else {
                            Array.isArray(f[b]) ? -1 != (e = f[b].indexOf(c)) && f[b].splice(e, 1) : f[b] = [f[b]], "number" != typeof d && (d = d || c.isDefault ? -100 : a(c));
                            var g = f[b];
                            for (e = 0; e < g.length; e++) {
                                var h = g[e],
                                    i = a(h);
                                if (i > d) break
                            }
                            g.splice(e, 0, c)
                        }
                    else delete f[b]
                }, this.addCommands = function(a) {
                    a && Object.keys(a).forEach(function(b) {
                        var c = a[b];
                        if (c) {
                            if ("string" == typeof c) return this.bindKey(c, b);
                            "function" == typeof c && (c = {
                                exec: c
                            }), "object" == typeof c && (c.name || (c.name = b), this.addCommand(c))
                        }
                    }, this)
                }, this.removeCommands = function(a) {
                    Object.keys(a).forEach(function(b) {
                        this.removeCommand(a[b])
                    }, this)
                }, this.bindKeys = function(a) {
                    Object.keys(a).forEach(function(b) {
                        this.bindKey(b, a[b])
                    }, this)
                }, this._buildKeyHash = function(a) {
                    this.bindKey(a.bindKey, a)
                }, this.parseKeys = function(a) {
                    var b = a.toLowerCase().split(/[\-\+]([\-\+])?/).filter(function(a) {
                            return a
                        }),
                        c = b.pop(),
                        d = f[c];
                    if (f.FUNCTION_KEYS[d]) c = f.FUNCTION_KEYS[d].toLowerCase();
                    else {
                        if (!b.length) return {
                            key: c,
                            hashId: -1
                        };
                        if (1 == b.length && "shift" == b[0]) return {
                            key: c.toUpperCase(),
                            hashId: -1
                        }
                    }
                    for (var e = 0, g = b.length; g--;) {
                        var h = f.KEY_MODS[b[g]];
                        if (null == h) return "undefined" != typeof console && console.error("invalid modifier " + b[g] + " in " + a), !1;
                        e |= h
                    }
                    return {
                        key: c,
                        hashId: e
                    }
                }, this.findKeyCommand = function(a, b) {
                    var c = h[a] + b;
                    return this.commandKeyBinding[c]
                }, this.handleKeyboard = function(a, b, c, d) {
                    if (!(0 > d)) {
                        var e = h[b] + c,
                            f = this.commandKeyBinding[e];
                        return a.$keyChain && (a.$keyChain += " " + e, f = this.commandKeyBinding[a.$keyChain] || f), !f || "chainKeys" != f && "chainKeys" != f[f.length - 1] ? (a.$keyChain && (b && 4 != b || 1 != c.length ? (-1 == b || d > 0) && (a.$keyChain = "") : a.$keyChain = a.$keyChain.slice(0, -e.length - 1)), {
                            command: f
                        }) : (a.$keyChain = a.$keyChain || e, {
                            command: "null"
                        })
                    }
                }, this.getStatusText = function(a, b) {
                    return b.$keyChain || ""
                }
            }.call(d.prototype), b.HashHandler = d, b.MultiHashHandler = e
    }), define("ace/commands/command_manager", ["require", "exports", "module", "ace/lib/oop", "ace/keyboard/hash_handler", "ace/lib/event_emitter"], function(a, b, c) {
        "use strict";
        var d = a("../lib/oop"),
            e = a("../keyboard/hash_handler").MultiHashHandler,
            f = a("../lib/event_emitter").EventEmitter,
            g = function(a, b) {
                e.call(this, b, a), this.byName = this.commands, this.setDefaultHandler("exec", function(a) {
                    return a.command.exec(a.editor, a.args || {})
                })
            };
        d.inherits(g, e),
            function() {
                d.implement(this, f), this.exec = function(a, b, c) {
                    if (Array.isArray(a)) {
                        for (var d = a.length; d--;)
                            if (this.exec(a[d], b, c)) return !0;
                        return !1
                    }
                    if ("string" == typeof a && (a = this.commands[a]), !a) return !1;
                    if (b && b.$readOnly && !a.readOnly) return !1;
                    var e = {
                        editor: b,
                        command: a,
                        args: c
                    };
                    return e.returnValue = this._emit("exec", e), this._signal("afterExec", e), e.returnValue === !1 ? !1 : !0
                }, this.toggleRecording = function(a) {
                    return this.$inReplay ? void 0 : (a && a._emit("changeStatus"), this.recording ? (this.macro.pop(), this.removeEventListener("exec", this.$addCommandToMacro), this.macro.length || (this.macro = this.oldMacro), this.recording = !1) : (this.$addCommandToMacro || (this.$addCommandToMacro = function(a) {
                        this.macro.push([a.command, a.args])
                    }.bind(this)), this.oldMacro = this.macro, this.macro = [], this.on("exec", this.$addCommandToMacro), this.recording = !0))
                }, this.replay = function(a) {
                    if (!this.$inReplay && this.macro) {
                        if (this.recording) return this.toggleRecording(a);
                        try {
                            this.$inReplay = !0, this.macro.forEach(function(b) {
                                "string" == typeof b ? this.exec(b, a) : this.exec(b[0], a, b[1])
                            }, this)
                        } finally {
                            this.$inReplay = !1
                        }
                    }
                }, this.trimMacro = function(a) {
                    return a.map(function(a) {
                        return "string" != typeof a[0] && (a[0] = a[0].name), a[1] || (a = a[0]), a
                    })
                }
            }.call(g.prototype), b.CommandManager = g
    }), define("ace/commands/default_commands", ["require", "exports", "module", "ace/lib/lang", "ace/config", "ace/range"], function(a, b, c) {
        "use strict";

        function d(a, b) {
            return {
                win: a,
                mac: b
            }
        }
        var e = a("../lib/lang"),
            f = a("../config"),
            g = a("../range").Range;
        b.commands = [{
            name: "showSettingsMenu",
            bindKey: d("Ctrl-,", "Command-,"),
            exec: function(a) {
                f.loadModule("ace/ext/settings_menu", function(b) {
                    b.init(a), a.showSettingsMenu()
                })
            },
            readOnly: !0
        }, {
            name: "goToNextError",
            bindKey: d("Alt-E", "Ctrl-E"),
            exec: function(a) {
                f.loadModule("ace/ext/error_marker", function(b) {
                    b.showErrorMarker(a, 1)
                })
            },
            scrollIntoView: "animate",
            readOnly: !0
        }, {
            name: "goToPreviousError",
            bindKey: d("Alt-Shift-E", "Ctrl-Shift-E"),
            exec: function(a) {
                f.loadModule("ace/ext/error_marker", function(b) {
                    b.showErrorMarker(a, -1)
                })
            },
            scrollIntoView: "animate",
            readOnly: !0
        }, {
            name: "selectall",
            bindKey: d("Ctrl-A", "Command-A"),
            exec: function(a) {
                a.selectAll()
            },
            readOnly: !0
        }, {
            name: "centerselection",
            bindKey: d(null, "Ctrl-L"),
            exec: function(a) {
                a.centerSelection()
            },
            readOnly: !0
        }, {
            name: "gotoline",
            bindKey: d("Ctrl-L", "Command-L"),
            exec: function(a) {
                var b = parseInt(prompt("Enter line number:"), 10);
                isNaN(b) || a.gotoLine(b)
            },
            readOnly: !0
        }, {
            name: "fold",
            bindKey: d("Alt-L|Ctrl-F1", "Command-Alt-L|Command-F1"),
            exec: function(a) {
                a.session.toggleFold(!1)
            },
            multiSelectAction: "forEach",
            scrollIntoView: "center",
            readOnly: !0
        }, {
            name: "unfold",
            bindKey: d("Alt-Shift-L|Ctrl-Shift-F1", "Command-Alt-Shift-L|Command-Shift-F1"),
            exec: function(a) {
                a.session.toggleFold(!0)
            },
            multiSelectAction: "forEach",
            scrollIntoView: "center",
            readOnly: !0
        }, {
            name: "toggleFoldWidget",
            bindKey: d("F2", "F2"),
            exec: function(a) {
                a.session.toggleFoldWidget()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "center",
            readOnly: !0
        }, {
            name: "toggleParentFoldWidget",
            bindKey: d("Alt-F2", "Alt-F2"),
            exec: function(a) {
                a.session.toggleFoldWidget(!0)
            },
            multiSelectAction: "forEach",
            scrollIntoView: "center",
            readOnly: !0
        }, {
            name: "foldall",
            bindKey: d(null, "Ctrl-Command-Option-0"),
            exec: function(a) {
                a.session.foldAll()
            },
            scrollIntoView: "center",
            readOnly: !0
        }, {
            name: "foldOther",
            bindKey: d("Alt-0", "Command-Option-0"),
            exec: function(a) {
                a.session.foldAll(), a.session.unfold(a.selection.getAllRanges())
            },
            scrollIntoView: "center",
            readOnly: !0
        }, {
            name: "unfoldall",
            bindKey: d("Alt-Shift-0", "Command-Option-Shift-0"),
            exec: function(a) {
                a.session.unfold()
            },
            scrollIntoView: "center",
            readOnly: !0
        }, {
            name: "findnext",
            bindKey: d("Ctrl-K", "Command-G"),
            exec: function(a) {
                a.findNext()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "center",
            readOnly: !0
        }, {
            name: "findprevious",
            bindKey: d("Ctrl-Shift-K", "Command-Shift-G"),
            exec: function(a) {
                a.findPrevious()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "center",
            readOnly: !0
        }, {
            name: "selectOrFindNext",
            bindKey: d("Alt-K", "Ctrl-G"),
            exec: function(a) {
                a.selection.isEmpty() ? a.selection.selectWord() : a.findNext()
            },
            readOnly: !0
        }, {
            name: "selectOrFindPrevious",
            bindKey: d("Alt-Shift-K", "Ctrl-Shift-G"),
            exec: function(a) {
                a.selection.isEmpty() ? a.selection.selectWord() : a.findPrevious()
            },
            readOnly: !0
        }, {
            name: "find",
            bindKey: d("Ctrl-F", "Command-F"),
            exec: function(a) {
                f.loadModule("ace/ext/searchbox", function(b) {
                    b.Search(a)
                })
            },
            readOnly: !0
        }, {
            name: "overwrite",
            bindKey: "Insert",
            exec: function(a) {
                a.toggleOverwrite()
            },
            readOnly: !0
        }, {
            name: "selecttostart",
            bindKey: d("Ctrl-Shift-Home", "Command-Shift-Up"),
            exec: function(a) {
                a.getSelection().selectFileStart()
            },
            multiSelectAction: "forEach",
            readOnly: !0,
            scrollIntoView: "animate",
            aceCommandGroup: "fileJump"
        }, {
            name: "gotostart",
            bindKey: d("Ctrl-Home", "Command-Home|Command-Up"),
            exec: function(a) {
                a.navigateFileStart()
            },
            multiSelectAction: "forEach",
            readOnly: !0,
            scrollIntoView: "animate",
            aceCommandGroup: "fileJump"
        }, {
            name: "selectup",
            bindKey: d("Shift-Up", "Shift-Up"),
            exec: function(a) {
                a.getSelection().selectUp()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "golineup",
            bindKey: d("Up", "Up|Ctrl-P"),
            exec: function(a, b) {
                a.navigateUp(b.times)
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selecttoend",
            bindKey: d("Ctrl-Shift-End", "Command-Shift-Down"),
            exec: function(a) {
                a.getSelection().selectFileEnd()
            },
            multiSelectAction: "forEach",
            readOnly: !0,
            scrollIntoView: "animate",
            aceCommandGroup: "fileJump"
        }, {
            name: "gotoend",
            bindKey: d("Ctrl-End", "Command-End|Command-Down"),
            exec: function(a) {
                a.navigateFileEnd()
            },
            multiSelectAction: "forEach",
            readOnly: !0,
            scrollIntoView: "animate",
            aceCommandGroup: "fileJump"
        }, {
            name: "selectdown",
            bindKey: d("Shift-Down", "Shift-Down"),
            exec: function(a) {
                a.getSelection().selectDown();
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "golinedown",
            bindKey: d("Down", "Down|Ctrl-N"),
            exec: function(a, b) {
                a.navigateDown(b.times)
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selectwordleft",
            bindKey: d("Ctrl-Shift-Left", "Option-Shift-Left"),
            exec: function(a) {
                a.getSelection().selectWordLeft()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "gotowordleft",
            bindKey: d("Ctrl-Left", "Option-Left"),
            exec: function(a) {
                a.navigateWordLeft()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selecttolinestart",
            bindKey: d("Alt-Shift-Left", "Command-Shift-Left"),
            exec: function(a) {
                a.getSelection().selectLineStart()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "gotolinestart",
            bindKey: d("Alt-Left|Home", "Command-Left|Home|Ctrl-A"),
            exec: function(a) {
                a.navigateLineStart()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selectleft",
            bindKey: d("Shift-Left", "Shift-Left"),
            exec: function(a) {
                a.getSelection().selectLeft()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "gotoleft",
            bindKey: d("Left", "Left|Ctrl-B"),
            exec: function(a, b) {
                a.navigateLeft(b.times)
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selectwordright",
            bindKey: d("Ctrl-Shift-Right", "Option-Shift-Right"),
            exec: function(a) {
                a.getSelection().selectWordRight()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "gotowordright",
            bindKey: d("Ctrl-Right", "Option-Right"),
            exec: function(a) {
                a.navigateWordRight()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selecttolineend",
            bindKey: d("Alt-Shift-Right", "Command-Shift-Right"),
            exec: function(a) {
                a.getSelection().selectLineEnd()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "gotolineend",
            bindKey: d("Alt-Right|End", "Command-Right|End|Ctrl-E"),
            exec: function(a) {
                a.navigateLineEnd()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selectright",
            bindKey: d("Shift-Right", "Shift-Right"),
            exec: function(a) {
                a.getSelection().selectRight()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "gotoright",
            bindKey: d("Right", "Right|Ctrl-F"),
            exec: function(a, b) {
                a.navigateRight(b.times)
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selectpagedown",
            bindKey: "Shift-PageDown",
            exec: function(a) {
                a.selectPageDown()
            },
            readOnly: !0
        }, {
            name: "pagedown",
            bindKey: d(null, "Option-PageDown"),
            exec: function(a) {
                a.scrollPageDown()
            },
            readOnly: !0
        }, {
            name: "gotopagedown",
            bindKey: d("PageDown", "PageDown|Ctrl-V"),
            exec: function(a) {
                a.gotoPageDown()
            },
            readOnly: !0
        }, {
            name: "selectpageup",
            bindKey: "Shift-PageUp",
            exec: function(a) {
                a.selectPageUp()
            },
            readOnly: !0
        }, {
            name: "pageup",
            bindKey: d(null, "Option-PageUp"),
            exec: function(a) {
                a.scrollPageUp()
            },
            readOnly: !0
        }, {
            name: "gotopageup",
            bindKey: "PageUp",
            exec: function(a) {
                a.gotoPageUp()
            },
            readOnly: !0
        }, {
            name: "scrollup",
            bindKey: d("Ctrl-Up", null),
            exec: function(a) {
                a.renderer.scrollBy(0, -2 * a.renderer.layerConfig.lineHeight)
            },
            readOnly: !0
        }, {
            name: "scrolldown",
            bindKey: d("Ctrl-Down", null),
            exec: function(a) {
                a.renderer.scrollBy(0, 2 * a.renderer.layerConfig.lineHeight)
            },
            readOnly: !0
        }, {
            name: "selectlinestart",
            bindKey: "Shift-Home",
            exec: function(a) {
                a.getSelection().selectLineStart()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selectlineend",
            bindKey: "Shift-End",
            exec: function(a) {
                a.getSelection().selectLineEnd()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "togglerecording",
            bindKey: d("Ctrl-Alt-E", "Command-Option-E"),
            exec: function(a) {
                a.commands.toggleRecording(a)
            },
            readOnly: !0
        }, {
            name: "replaymacro",
            bindKey: d("Ctrl-Shift-E", "Command-Shift-E"),
            exec: function(a) {
                a.commands.replay(a)
            },
            readOnly: !0
        }, {
            name: "jumptomatching",
            bindKey: d("Ctrl-P", "Ctrl-P"),
            exec: function(a) {
                a.jumpToMatching()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "animate",
            readOnly: !0
        }, {
            name: "selecttomatching",
            bindKey: d("Ctrl-Shift-P", "Ctrl-Shift-P"),
            exec: function(a) {
                a.jumpToMatching(!0)
            },
            multiSelectAction: "forEach",
            scrollIntoView: "animate",
            readOnly: !0
        }, {
            name: "expandToMatching",
            bindKey: d("Ctrl-Shift-M", "Ctrl-Shift-M"),
            exec: function(a) {
                a.jumpToMatching(!0, !0)
            },
            multiSelectAction: "forEach",
            scrollIntoView: "animate",
            readOnly: !0
        }, {
            name: "passKeysToBrowser",
            bindKey: d(null, null),
            exec: function() {},
            passEvent: !0,
            readOnly: !0
        }, {
            name: "copy",
            exec: function(a) {},
            readOnly: !0
        }, {
            name: "cut",
            exec: function(a) {
                var b = a.getSelectionRange();
                a._emit("cut", b), a.selection.isEmpty() || (a.session.remove(b), a.clearSelection())
            },
            scrollIntoView: "cursor",
            multiSelectAction: "forEach"
        }, {
            name: "paste",
            exec: function(a, b) {
                a.$handlePaste(b)
            },
            scrollIntoView: "cursor"
        }, {
            name: "removeline",
            bindKey: d("Ctrl-D", "Command-D"),
            exec: function(a) {
                a.removeLines()
            },
            scrollIntoView: "cursor",
            multiSelectAction: "forEachLine"
        }, {
            name: "duplicateSelection",
            bindKey: d("Ctrl-Shift-D", "Command-Shift-D"),
            exec: function(a) {
                a.duplicateSelection()
            },
            scrollIntoView: "cursor",
            multiSelectAction: "forEach"
        }, {
            name: "sortlines",
            bindKey: d("Ctrl-Alt-S", "Command-Alt-S"),
            exec: function(a) {
                a.sortLines()
            },
            scrollIntoView: "selection",
            multiSelectAction: "forEachLine"
        }, {
            name: "togglecomment",
            bindKey: d("Ctrl-/", "Command-/"),
            exec: function(a) {
                a.toggleCommentLines()
            },
            multiSelectAction: "forEachLine",
            scrollIntoView: "selectionPart"
        }, {
            name: "toggleBlockComment",
            bindKey: d("Ctrl-Shift-/", "Command-Shift-/"),
            exec: function(a) {
                a.toggleBlockComment()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "selectionPart"
        }, {
            name: "modifyNumberUp",
            bindKey: d("Ctrl-Shift-Up", "Alt-Shift-Up"),
            exec: function(a) {
                a.modifyNumber(1)
            },
            scrollIntoView: "cursor",
            multiSelectAction: "forEach"
        }, {
            name: "modifyNumberDown",
            bindKey: d("Ctrl-Shift-Down", "Alt-Shift-Down"),
            exec: function(a) {
                a.modifyNumber(-1)
            },
            scrollIntoView: "cursor",
            multiSelectAction: "forEach"
        }, {
            name: "replace",
            bindKey: d("Ctrl-H", "Command-Option-F"),
            exec: function(a) {
                f.loadModule("ace/ext/searchbox", function(b) {
                    b.Search(a, !0)
                })
            }
        }, {
            name: "undo",
            bindKey: d("Ctrl-Z", "Command-Z"),
            exec: function(a) {
                a.undo()
            }
        }, {
            name: "redo",
            bindKey: d("Ctrl-Shift-Z|Ctrl-Y", "Command-Shift-Z|Command-Y"),
            exec: function(a) {
                a.redo()
            }
        }, {
            name: "copylinesup",
            bindKey: d("Alt-Shift-Up", "Command-Option-Up"),
            exec: function(a) {
                a.copyLinesUp()
            },
            scrollIntoView: "cursor"
        }, {
            name: "movelinesup",
            bindKey: d("Alt-Up", "Option-Up"),
            exec: function(a) {
                a.moveLinesUp()
            },
            scrollIntoView: "cursor"
        }, {
            name: "copylinesdown",
            bindKey: d("Alt-Shift-Down", "Command-Option-Down"),
            exec: function(a) {
                a.copyLinesDown()
            },
            scrollIntoView: "cursor"
        }, {
            name: "movelinesdown",
            bindKey: d("Alt-Down", "Option-Down"),
            exec: function(a) {
                a.moveLinesDown()
            },
            scrollIntoView: "cursor"
        }, {
            name: "del",
            bindKey: d("Delete", "Delete|Ctrl-D|Shift-Delete"),
            exec: function(a) {
                a.remove("right")
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor"
        }, {
            name: "backspace",
            bindKey: d("Shift-Backspace|Backspace", "Ctrl-Backspace|Shift-Backspace|Backspace|Ctrl-H"),
            exec: function(a) {
                a.remove("left")
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor"
        }, {
            name: "cut_or_delete",
            bindKey: d("Shift-Delete", null),
            exec: function(a) {
                return a.selection.isEmpty() ? void a.remove("left") : !1
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor"
        }, {
            name: "removetolinestart",
            bindKey: d("Alt-Backspace", "Command-Backspace"),
            exec: function(a) {
                a.removeToLineStart()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor"
        }, {
            name: "removetolineend",
            bindKey: d("Alt-Delete", "Ctrl-K"),
            exec: function(a) {
                a.removeToLineEnd()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor"
        }, {
            name: "removewordleft",
            bindKey: d("Ctrl-Backspace", "Alt-Backspace|Ctrl-Alt-Backspace"),
            exec: function(a) {
                a.removeWordLeft()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor"
        }, {
            name: "removewordright",
            bindKey: d("Ctrl-Delete", "Alt-Delete"),
            exec: function(a) {
                a.removeWordRight()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor"
        }, {
            name: "outdent",
            bindKey: d("Shift-Tab", "Shift-Tab"),
            exec: function(a) {
                a.blockOutdent()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "selectionPart"
        }, {
            name: "indent",
            bindKey: d("Tab", "Tab"),
            exec: function(a) {
                a.indent()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "selectionPart"
        }, {
            name: "blockoutdent",
            bindKey: d("Ctrl-[", "Ctrl-["),
            exec: function(a) {
                a.blockOutdent()
            },
            multiSelectAction: "forEachLine",
            scrollIntoView: "selectionPart"
        }, {
            name: "blockindent",
            bindKey: d("Ctrl-]", "Ctrl-]"),
            exec: function(a) {
                a.blockIndent()
            },
            multiSelectAction: "forEachLine",
            scrollIntoView: "selectionPart"
        }, {
            name: "insertstring",
            exec: function(a, b) {
                a.insert(b)
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor"
        }, {
            name: "inserttext",
            exec: function(a, b) {
                a.insert(e.stringRepeat(b.text || "", b.times || 1))
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor"
        }, {
            name: "splitline",
            bindKey: d(null, "Ctrl-O"),
            exec: function(a) {
                a.splitLine()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor"
        }, {
            name: "transposeletters",
            bindKey: d("Ctrl-T", "Ctrl-T"),
            exec: function(a) {
                a.transposeLetters()
            },
            multiSelectAction: function(a) {
                a.transposeSelections(1)
            },
            scrollIntoView: "cursor"
        }, {
            name: "touppercase",
            bindKey: d("Ctrl-U", "Ctrl-U"),
            exec: function(a) {
                a.toUpperCase()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor"
        }, {
            name: "tolowercase",
            bindKey: d("Ctrl-Shift-U", "Ctrl-Shift-U"),
            exec: function(a) {
                a.toLowerCase()
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor"
        }, {
            name: "expandtoline",
            bindKey: d("Ctrl-Shift-L", "Command-Shift-L"),
            exec: function(a) {
                var b = a.selection.getRange();
                b.start.column = b.end.column = 0, b.end.row++, a.selection.setRange(b, !1)
            },
            multiSelectAction: "forEach",
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "joinlines",
            bindKey: d(null, null),
            exec: function(a) {
                for (var b = a.selection.isBackwards(), c = b ? a.selection.getSelectionLead() : a.selection.getSelectionAnchor(), d = b ? a.selection.getSelectionAnchor() : a.selection.getSelectionLead(), f = a.session.doc.getLine(c.row).length, h = a.session.doc.getTextRange(a.selection.getRange()), i = h.replace(/\n\s*/, " ").length, j = a.session.doc.getLine(c.row), k = c.row + 1; k <= d.row + 1; k++) {
                    var l = e.stringTrimLeft(e.stringTrimRight(a.session.doc.getLine(k)));
                    0 !== l.length && (l = " " + l), j += l
                }
                d.row + 1 < a.session.doc.getLength() - 1 && (j += a.session.doc.getNewLineCharacter()), a.clearSelection(), a.session.doc.replace(new g(c.row, 0, d.row + 2, 0), j), i > 0 ? (a.selection.moveCursorTo(c.row, c.column), a.selection.selectTo(c.row, c.column + i)) : (f = a.session.doc.getLine(c.row).length > f ? f + 1 : f, a.selection.moveCursorTo(c.row, f))
            },
            multiSelectAction: "forEach",
            readOnly: !0
        }, {
            name: "invertSelection",
            bindKey: d(null, null),
            exec: function(a) {
                var b = a.session.doc.getLength() - 1,
                    c = a.session.doc.getLine(b).length,
                    d = a.selection.rangeList.ranges,
                    e = [];
                d.length < 1 && (d = [a.selection.getRange()]);
                for (var f = 0; f < d.length; f++) f == d.length - 1 && (d[f].end.row !== b || d[f].end.column !== c) && e.push(new g(d[f].end.row, d[f].end.column, b, c)), 0 === f ? (0 !== d[f].start.row || 0 !== d[f].start.column) && e.push(new g(0, 0, d[f].start.row, d[f].start.column)) : e.push(new g(d[f - 1].end.row, d[f - 1].end.column, d[f].start.row, d[f].start.column));
                a.exitMultiSelectMode(), a.clearSelection();
                for (var f = 0; f < e.length; f++) a.selection.addRange(e[f], !1)
            },
            readOnly: !0,
            scrollIntoView: "none"
        }]
    }), define("ace/editor", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/keyboard/textinput", "ace/mouse/mouse_handler", "ace/mouse/fold_handler", "ace/keyboard/keybinding", "ace/edit_session", "ace/search", "ace/range", "ace/lib/event_emitter", "ace/commands/command_manager", "ace/commands/default_commands", "ace/config", "ace/token_iterator"], function(a, b, c) {
        "use strict";
        a("./lib/fixoldbrowsers");
        var d = a("./lib/oop"),
            e = a("./lib/dom"),
            f = a("./lib/lang"),
            g = a("./lib/useragent"),
            h = a("./keyboard/textinput").TextInput,
            i = a("./mouse/mouse_handler").MouseHandler,
            j = a("./mouse/fold_handler").FoldHandler,
            k = a("./keyboard/keybinding").KeyBinding,
            l = a("./edit_session").EditSession,
            m = a("./search").Search,
            n = a("./range").Range,
            o = a("./lib/event_emitter").EventEmitter,
            p = a("./commands/command_manager").CommandManager,
            q = a("./commands/default_commands").commands,
            r = a("./config"),
            s = a("./token_iterator").TokenIterator,
            t = function(a, b) {
                var c = a.getContainerElement();
                this.container = c, this.renderer = a, this.commands = new p(g.isMac ? "mac" : "win", q), this.textInput = new h(a.getTextAreaContainer(), this), this.renderer.textarea = this.textInput.getElement(), this.keyBinding = new k(this), this.$mouseHandler = new i(this), new j(this), this.$blockScrolling = 0, this.$search = (new m).set({
                    wrap: !0
                }), this.$historyTracker = this.$historyTracker.bind(this), this.commands.on("exec", this.$historyTracker), this.$initOperationListeners(), this._$emitInputEvent = f.delayedCall(function() {
                    this._signal("input", {}), this.session && this.session.bgTokenizer && this.session.bgTokenizer.scheduleStart()
                }.bind(this)), this.on("change", function(a, b) {
                    b._$emitInputEvent.schedule(31)
                }), this.setSession(b || new l("")), r.resetOptions(this), r._signal("editor", this)
            };
        (function() {
            d.implement(this, o), this.$initOperationListeners = function() {
                this.selections = [], this.commands.on("exec", this.startOperation.bind(this), !0), this.commands.on("afterExec", this.endOperation.bind(this), !0), this.$opResetTimer = f.delayedCall(this.endOperation.bind(this)), this.on("change", function() {
                    this.curOp || this.startOperation(), this.curOp.docChanged = !0
                }.bind(this), !0), this.on("changeSelection", function() {
                    this.curOp || this.startOperation(), this.curOp.selectionChanged = !0
                }.bind(this), !0)
            }, this.curOp = null, this.prevOp = {}, this.startOperation = function(a) {
                if (this.curOp) {
                    if (!a || this.curOp.command) return;
                    this.prevOp = this.curOp
                }
                a || (this.previousCommand = null, a = {}), this.$opResetTimer.schedule(), this.curOp = {
                    command: a.command || {},
                    args: a.args,
                    scrollTop: this.renderer.scrollTop
                }, this.curOp.command.name && void 0 !== this.curOp.command.scrollIntoView && this.$blockScrolling++
            }, this.endOperation = function(a) {
                if (this.curOp) {
                    if (a && a.returnValue === !1) return this.curOp = null;
                    this._signal("beforeEndOperation");
                    var b = this.curOp.command;
                    b.name && this.$blockScrolling > 0 && this.$blockScrolling--;
                    var c = b && b.scrollIntoView;
                    if (c) {
                        switch (c) {
                            case "center-animate":
                                c = "animate";
                            case "center":
                                this.renderer.scrollCursorIntoView(null, .5);
                                break;
                            case "animate":
                            case "cursor":
                                this.renderer.scrollCursorIntoView();
                                break;
                            case "selectionPart":
                                var d = this.selection.getRange(),
                                    e = this.renderer.layerConfig;
                                (d.start.row >= e.lastRow || d.end.row <= e.firstRow) && this.renderer.scrollSelectionIntoView(this.selection.anchor, this.selection.lead)
                        }
                        "animate" == c && this.renderer.animateScrolling(this.curOp.scrollTop)
                    }
                    this.prevOp = this.curOp, this.curOp = null
                }
            }, this.$mergeableCommands = ["backspace", "del", "insertstring"], this.$historyTracker = function(a) {
                if (this.$mergeUndoDeltas) {
                    var b = this.prevOp,
                        c = this.$mergeableCommands,
                        d = b.command && a.command.name == b.command.name;
                    if ("insertstring" == a.command.name) {
                        var e = a.args;
                        void 0 === this.mergeNextCommand && (this.mergeNextCommand = !0), d = d && this.mergeNextCommand && (!/\s/.test(e) || /\s/.test(b.args)), this.mergeNextCommand = !0
                    } else d = d && -1 !== c.indexOf(a.command.name);
                    "always" != this.$mergeUndoDeltas && Date.now() - this.sequenceStartTime > 2e3 && (d = !1), d ? this.session.mergeUndoDeltas = !0 : -1 !== c.indexOf(a.command.name) && (this.sequenceStartTime = Date.now())
                }
            }, this.setKeyboardHandler = function(a, b) {
                if (a && "string" == typeof a) {
                    this.$keybindingId = a;
                    var c = this;
                    r.loadModule(["keybinding", a], function(d) {
                        c.$keybindingId == a && c.keyBinding.setKeyboardHandler(d && d.handler), b && b()
                    })
                } else this.$keybindingId = null, this.keyBinding.setKeyboardHandler(a), b && b()
            }, this.getKeyboardHandler = function() {
                return this.keyBinding.getKeyboardHandler()
            }, this.setSession = function(a) {
                if (this.session != a) {
                    this.curOp && this.endOperation(), this.curOp = {};
                    var b = this.session;
                    if (b) {
                        this.session.off("change", this.$onDocumentChange), this.session.off("changeMode", this.$onChangeMode), this.session.off("tokenizerUpdate", this.$onTokenizerUpdate), this.session.off("changeTabSize", this.$onChangeTabSize), this.session.off("changeWrapLimit", this.$onChangeWrapLimit), this.session.off("changeWrapMode", this.$onChangeWrapMode), this.session.off("changeFold", this.$onChangeFold), this.session.off("changeFrontMarker", this.$onChangeFrontMarker), this.session.off("changeBackMarker", this.$onChangeBackMarker), this.session.off("changeBreakpoint", this.$onChangeBreakpoint), this.session.off("changeAnnotation", this.$onChangeAnnotation), this.session.off("changeOverwrite", this.$onCursorChange), this.session.off("changeScrollTop", this.$onScrollTopChange), this.session.off("changeScrollLeft", this.$onScrollLeftChange);
                        var c = this.session.getSelection();
                        c.off("changeCursor", this.$onCursorChange), c.off("changeSelection", this.$onSelectionChange)
                    }
                    this.session = a, a ? (this.$onDocumentChange = this.onDocumentChange.bind(this), a.on("change", this.$onDocumentChange), this.renderer.setSession(a), this.$onChangeMode = this.onChangeMode.bind(this), a.on("changeMode", this.$onChangeMode), this.$onTokenizerUpdate = this.onTokenizerUpdate.bind(this), a.on("tokenizerUpdate", this.$onTokenizerUpdate), this.$onChangeTabSize = this.renderer.onChangeTabSize.bind(this.renderer), a.on("changeTabSize", this.$onChangeTabSize), this.$onChangeWrapLimit = this.onChangeWrapLimit.bind(this), a.on("changeWrapLimit", this.$onChangeWrapLimit), this.$onChangeWrapMode = this.onChangeWrapMode.bind(this), a.on("changeWrapMode", this.$onChangeWrapMode), this.$onChangeFold = this.onChangeFold.bind(this), a.on("changeFold", this.$onChangeFold), this.$onChangeFrontMarker = this.onChangeFrontMarker.bind(this), this.session.on("changeFrontMarker", this.$onChangeFrontMarker), this.$onChangeBackMarker = this.onChangeBackMarker.bind(this), this.session.on("changeBackMarker", this.$onChangeBackMarker), this.$onChangeBreakpoint = this.onChangeBreakpoint.bind(this), this.session.on("changeBreakpoint", this.$onChangeBreakpoint), this.$onChangeAnnotation = this.onChangeAnnotation.bind(this), this.session.on("changeAnnotation", this.$onChangeAnnotation), this.$onCursorChange = this.onCursorChange.bind(this), this.session.on("changeOverwrite", this.$onCursorChange), this.$onScrollTopChange = this.onScrollTopChange.bind(this), this.session.on("changeScrollTop", this.$onScrollTopChange), this.$onScrollLeftChange = this.onScrollLeftChange.bind(this), this.session.on("changeScrollLeft", this.$onScrollLeftChange), this.selection = a.getSelection(), this.selection.on("changeCursor", this.$onCursorChange), this.$onSelectionChange = this.onSelectionChange.bind(this), this.selection.on("changeSelection", this.$onSelectionChange), this.onChangeMode(), this.$blockScrolling += 1, this.onCursorChange(), this.$blockScrolling -= 1, this.onScrollTopChange(), this.onScrollLeftChange(), this.onSelectionChange(), this.onChangeFrontMarker(), this.onChangeBackMarker(), this.onChangeBreakpoint(), this.onChangeAnnotation(), this.session.getUseWrapMode() && this.renderer.adjustWrapLimit(), this.renderer.updateFull()) : (this.selection = null, this.renderer.setSession(a)), this._signal("changeSession", {
                        session: a,
                        oldSession: b
                    }), this.curOp = null, b && b._signal("changeEditor", {
                        oldEditor: this
                    }), a && a._signal("changeEditor", {
                        editor: this
                    })
                }
            }, this.getSession = function() {
                return this.session
            }, this.setValue = function(a, b) {
                return this.session.doc.setValue(a), b ? 1 == b ? this.navigateFileEnd() : -1 == b && this.navigateFileStart() : this.selectAll(), a
            }, this.getValue = function() {
                return this.session.getValue()
            }, this.getSelection = function() {
                return this.selection
            }, this.resize = function(a) {
                this.renderer.onResize(a)
            }, this.setTheme = function(a, b) {
                this.renderer.setTheme(a, b)
            }, this.getTheme = function() {
                return this.renderer.getTheme()
            }, this.setStyle = function(a) {
                this.renderer.setStyle(a)
            }, this.unsetStyle = function(a) {
                this.renderer.unsetStyle(a)
            }, this.getFontSize = function() {
                return this.getOption("fontSize") || e.computedStyle(this.container, "fontSize")
            }, this.setFontSize = function(a) {
                this.setOption("fontSize", a)
            }, this.$highlightBrackets = function() {
                if (this.session.$bracketHighlight && (this.session.removeMarker(this.session.$bracketHighlight), this.session.$bracketHighlight = null), !this.$highlightPending) {
                    var a = this;
                    this.$highlightPending = !0, setTimeout(function() {
                        a.$highlightPending = !1;
                        var b = a.session;
                        if (b && b.bgTokenizer) {
                            var c = b.findMatchingBracket(a.getCursorPosition());
                            if (c) var d = new n(c.row, c.column, c.row, c.column + 1);
                            else if (b.$mode.getMatching) var d = b.$mode.getMatching(a.session);
                            d && (b.$bracketHighlight = b.addMarker(d, "ace_bracket", "text"))
                        }
                    }, 50)
                }
            }, this.$highlightTags = function() {
                if (!this.$highlightTagPending) {
                    var a = this;
                    this.$highlightTagPending = !0, setTimeout(function() {
                        a.$highlightTagPending = !1;
                        var b = a.session;
                        if (b && b.bgTokenizer) {
                            var c = a.getCursorPosition(),
                                d = new s(a.session, c.row, c.column),
                                e = d.getCurrentToken();
                            if (!e || !/\b(?:tag-open|tag-name)/.test(e.type)) return b.removeMarker(b.$tagHighlight), void(b.$tagHighlight = null);
                            if (-1 == e.type.indexOf("tag-open") || (e = d.stepForward())) {
                                var f = e.value,
                                    g = 0,
                                    h = d.stepBackward();
                                if ("<" == h.value) {
                                    do h = e, e = d.stepForward(), e && e.value === f && -1 !== e.type.indexOf("tag-name") && ("<" === h.value ? g++ : "</" === h.value && g--); while (e && g >= 0)
                                } else {
                                    do e = h, h = d.stepBackward(), e && e.value === f && -1 !== e.type.indexOf("tag-name") && ("<" === h.value ? g++ : "</" === h.value && g--); while (h && 0 >= g);
                                    d.stepForward()
                                }
                                if (!e) return b.removeMarker(b.$tagHighlight), void(b.$tagHighlight = null);
                                var i = d.getCurrentTokenRow(),
                                    j = d.getCurrentTokenColumn(),
                                    k = new n(i, j, i, j + e.value.length);
                                b.$tagHighlight && 0 !== k.compareRange(b.$backMarkers[b.$tagHighlight].range) && (b.removeMarker(b.$tagHighlight), b.$tagHighlight = null), k && !b.$tagHighlight && (b.$tagHighlight = b.addMarker(k, "ace_bracket", "text"))
                            }
                        }
                    }, 50)
                }
            }, this.focus = function() {
                var a = this;
                setTimeout(function() {
                    a.textInput.focus()
                }), this.textInput.focus()
            }, this.isFocused = function() {
                return this.textInput.isFocused()
            }, this.blur = function() {
                this.textInput.blur()
            }, this.onFocus = function(a) {
                this.$isFocused || (this.$isFocused = !0, this.renderer.showCursor(), this.renderer.visualizeFocus(), this._emit("focus", a))
            }, this.onBlur = function(a) {
                this.$isFocused && (this.$isFocused = !1, this.renderer.hideCursor(), this.renderer.visualizeBlur(), this._emit("blur", a))
            }, this.$cursorChange = function() {
                this.renderer.updateCursor()
            }, this.onDocumentChange = function(a) {
                var b = this.session.$useWrapMode,
                    c = a.start.row == a.end.row ? a.end.row : 1 / 0;
                this.renderer.updateLines(a.start.row, c, b), this._signal("change", a), this.$cursorChange(), this.$updateHighlightActiveLine()
            }, this.onTokenizerUpdate = function(a) {
                var b = a.data;
                this.renderer.updateLines(b.first, b.last)
            }, this.onScrollTopChange = function() {
                this.renderer.scrollToY(this.session.getScrollTop())
            }, this.onScrollLeftChange = function() {
                this.renderer.scrollToX(this.session.getScrollLeft())
            }, this.onCursorChange = function() {
                this.$cursorChange(), this.$blockScrolling || (r.warn("Automatically scrolling cursor into view after selection change", "this will be disabled in the next version", "set editor.$blockScrolling = Infinity to disable this message"), this.renderer.scrollCursorIntoView()), this.$highlightBrackets(), this.$highlightTags(), this.$updateHighlightActiveLine(), this._signal("changeSelection")
            }, this.$updateHighlightActiveLine = function() {
                var a, b = this.getSession();
                if (this.$highlightActiveLine && ("line" == this.$selectionStyle && this.selection.isMultiLine() || (a = this.getCursorPosition()), !this.renderer.$maxLines || 1 !== this.session.getLength() || this.renderer.$minLines > 1 || (a = !1)), b.$highlightLineMarker && !a) b.removeMarker(b.$highlightLineMarker.id), b.$highlightLineMarker = null;
                else if (!b.$highlightLineMarker && a) {
                    var c = new n(a.row, a.column, a.row, 1 / 0);
                    c.id = b.addMarker(c, "ace_active-line", "screenLine"), b.$highlightLineMarker = c
                } else a && (b.$highlightLineMarker.start.row = a.row, b.$highlightLineMarker.end.row = a.row, b.$highlightLineMarker.start.column = a.column, b._signal("changeBackMarker"))
            }, this.onSelectionChange = function(a) {
                var b = this.session;
                if (b.$selectionMarker && b.removeMarker(b.$selectionMarker), b.$selectionMarker = null, this.selection.isEmpty()) this.$updateHighlightActiveLine();
                else {
                    var c = this.selection.getRange(),
                        d = this.getSelectionStyle();
                    b.$selectionMarker = b.addMarker(c, "ace_selection", d)
                }
                var e = this.$highlightSelectedWord && this.$getSelectionHighLightRegexp();
                this.session.highlight(e), this._signal("changeSelection")
            }, this.$getSelectionHighLightRegexp = function() {
                var a = this.session,
                    b = this.getSelectionRange();
                if (!b.isEmpty() && !b.isMultiLine()) {
                    var c = b.start.column - 1,
                        d = b.end.column + 1,
                        e = a.getLine(b.start.row),
                        f = e.length,
                        g = e.substring(Math.max(c, 0), Math.min(d, f));
                    if (!(c >= 0 && /^[\w\d]/.test(g) || f >= d && /[\w\d]$/.test(g)) && (g = e.substring(b.start.column, b.end.column), /^[\w\d]+$/.test(g))) {
                        var h = this.$search.$assembleRegExp({
                            wholeWord: !0,
                            caseSensitive: !0,
                            needle: g
                        });
                        return h
                    }
                }
            }, this.onChangeFrontMarker = function() {
                this.renderer.updateFrontMarkers()
            }, this.onChangeBackMarker = function() {
                this.renderer.updateBackMarkers()
            }, this.onChangeBreakpoint = function() {
                this.renderer.updateBreakpoints()
            }, this.onChangeAnnotation = function() {
                this.renderer.setAnnotations(this.session.getAnnotations())
            }, this.onChangeMode = function(a) {
                this.renderer.updateText(), this._emit("changeMode", a)
            }, this.onChangeWrapLimit = function() {
                this.renderer.updateFull()
            }, this.onChangeWrapMode = function() {
                this.renderer.onResize(!0)
            }, this.onChangeFold = function() {
                this.$updateHighlightActiveLine(), this.renderer.updateFull()
            }, this.getSelectedText = function() {
                return this.session.getTextRange(this.getSelectionRange())
            }, this.getCopyText = function() {
                var a = this.getSelectedText();
                return this._signal("copy", a), a
            }, this.onCopy = function() {
                this.commands.exec("copy", this)
            }, this.onCut = function() {
                this.commands.exec("cut", this)
            }, this.onPaste = function(a, b) {
                var c = {
                    text: a,
                    event: b
                };
                this.commands.exec("paste", this, c)
            }, this.$handlePaste = function(a) {
                "string" == typeof a && (a = {
                    text: a
                }), this._signal("paste", a);
                var b = a.text;
                if (!this.inMultiSelectMode || this.inVirtualSelectionMode) this.insert(b);
                else {
                    var c = b.split(/\r\n|\r|\n/),
                        d = this.selection.rangeList.ranges;
                    if (c.length > d.length || c.length < 2 || !c[1]) return this.commands.exec("insertstring", this, b);
                    for (var e = d.length; e--;) {
                        var f = d[e];
                        f.isEmpty() || this.session.remove(f), this.session.insert(f.start, c[e])
                    }
                }
            }, this.execCommand = function(a, b) {
                return this.commands.exec(a, this, b)
            }, this.insert = function(a, b) {
                var c = this.session,
                    d = c.getMode(),
                    e = this.getCursorPosition();
                if (this.getBehavioursEnabled() && !b) {
                    var f = d.transformAction(c.getState(e.row), "insertion", this, c, a);
                    f && (a !== f.text && (this.session.mergeUndoDeltas = !1, this.$mergeNextCommand = !1), a = f.text)
                }
                if ("	" == a && (a = this.session.getTabString()), this.selection.isEmpty()) {
                    if (this.session.getOverwrite()) {
                        var g = new n.fromPoints(e, e);
                        g.end.column += a.length, this.session.remove(g)
                    }
                } else {
                    var g = this.getSelectionRange();
                    e = this.session.remove(g), this.clearSelection()
                }
                if ("\n" == a || "\r\n" == a) {
                    var h = c.getLine(e.row);
                    if (e.column > h.search(/\S|$/)) {
                        var i = h.substr(e.column).search(/\S|$/);
                        c.doc.removeInLine(e.row, e.column, e.column + i)
                    }
                }
                this.clearSelection();
                var j = e.column,
                    k = c.getState(e.row),
                    h = c.getLine(e.row),
                    l = d.checkOutdent(k, h, a);
                c.insert(e, a);
                if (f && f.selection && (2 == f.selection.length ? this.selection.setSelectionRange(new n(e.row, j + f.selection[0], e.row, j + f.selection[1])) : this.selection.setSelectionRange(new n(e.row + f.selection[0], f.selection[1], e.row + f.selection[2], f.selection[3]))), c.getDocument().isNewLine(a)) {
                    var m = d.getNextLineIndent(k, h.slice(0, e.column), c.getTabString());
                    c.insert({
                        row: e.row + 1,
                        column: 0
                    }, m)
                }
                l && d.autoOutdent(k, c, e.row)
            }, this.onTextInput = function(a) {
                this.keyBinding.onTextInput(a)
            }, this.onCommandKey = function(a, b, c) {
                this.keyBinding.onCommandKey(a, b, c)
            }, this.setOverwrite = function(a) {
                this.session.setOverwrite(a)
            }, this.getOverwrite = function() {
                return this.session.getOverwrite()
            }, this.toggleOverwrite = function() {
                this.session.toggleOverwrite()
            }, this.setScrollSpeed = function(a) {
                this.setOption("scrollSpeed", a)
            }, this.getScrollSpeed = function() {
                return this.getOption("scrollSpeed")
            }, this.setDragDelay = function(a) {
                this.setOption("dragDelay", a)
            }, this.getDragDelay = function() {
                return this.getOption("dragDelay")
            }, this.setSelectionStyle = function(a) {
                this.setOption("selectionStyle", a)
            }, this.getSelectionStyle = function() {
                return this.getOption("selectionStyle")
            }, this.setHighlightActiveLine = function(a) {
                this.setOption("highlightActiveLine", a)
            }, this.getHighlightActiveLine = function() {
                return this.getOption("highlightActiveLine")
            }, this.setHighlightGutterLine = function(a) {
                this.setOption("highlightGutterLine", a)
            }, this.getHighlightGutterLine = function() {
                return this.getOption("highlightGutterLine")
            }, this.setHighlightSelectedWord = function(a) {
                this.setOption("highlightSelectedWord", a)
            }, this.getHighlightSelectedWord = function() {
                return this.$highlightSelectedWord
            }, this.setAnimatedScroll = function(a) {
                this.renderer.setAnimatedScroll(a)
            }, this.getAnimatedScroll = function() {
                return this.renderer.getAnimatedScroll()
            }, this.setShowInvisibles = function(a) {
                this.renderer.setShowInvisibles(a)
            }, this.getShowInvisibles = function() {
                return this.renderer.getShowInvisibles()
            }, this.setDisplayIndentGuides = function(a) {
                this.renderer.setDisplayIndentGuides(a)
            }, this.getDisplayIndentGuides = function() {
                return this.renderer.getDisplayIndentGuides()
            }, this.setShowPrintMargin = function(a) {
                this.renderer.setShowPrintMargin(a)
            }, this.getShowPrintMargin = function() {
                return this.renderer.getShowPrintMargin()
            }, this.setPrintMarginColumn = function(a) {
                this.renderer.setPrintMarginColumn(a)
            }, this.getPrintMarginColumn = function() {
                return this.renderer.getPrintMarginColumn()
            }, this.setReadOnly = function(a) {
                this.setOption("readOnly", a)
            }, this.getReadOnly = function() {
                return this.getOption("readOnly")
            }, this.setBehavioursEnabled = function(a) {
                this.setOption("behavioursEnabled", a)
            }, this.getBehavioursEnabled = function() {
                return this.getOption("behavioursEnabled")
            }, this.setWrapBehavioursEnabled = function(a) {
                this.setOption("wrapBehavioursEnabled", a)
            }, this.getWrapBehavioursEnabled = function() {
                return this.getOption("wrapBehavioursEnabled")
            }, this.setShowFoldWidgets = function(a) {
                this.setOption("showFoldWidgets", a)
            }, this.getShowFoldWidgets = function() {
                return this.getOption("showFoldWidgets")
            }, this.setFadeFoldWidgets = function(a) {
                this.setOption("fadeFoldWidgets", a)
            }, this.getFadeFoldWidgets = function() {
                return this.getOption("fadeFoldWidgets")
            }, this.remove = function(a) {
                this.selection.isEmpty() && ("left" == a ? this.selection.selectLeft() : this.selection.selectRight());
                var b = this.getSelectionRange();
                if (this.getBehavioursEnabled()) {
                    var c = this.session,
                        d = c.getState(b.start.row),
                        e = c.getMode().transformAction(d, "deletion", this, c, b);
                    if (0 === b.end.column) {
                        var f = c.getTextRange(b);
                        if ("\n" == f[f.length - 1]) {
                            var g = c.getLine(b.end.row);
                            /^\s+$/.test(g) && (b.end.column = g.length)
                        }
                    }
                    e && (b = e)
                }
                this.session.remove(b), this.clearSelection()
            }, this.removeWordRight = function() {
                this.selection.isEmpty() && this.selection.selectWordRight(), this.session.remove(this.getSelectionRange()), this.clearSelection()
            }, this.removeWordLeft = function() {
                this.selection.isEmpty() && this.selection.selectWordLeft(), this.session.remove(this.getSelectionRange()), this.clearSelection()
            }, this.removeToLineStart = function() {
                this.selection.isEmpty() && this.selection.selectLineStart(), this.session.remove(this.getSelectionRange()), this.clearSelection()
            }, this.removeToLineEnd = function() {
                this.selection.isEmpty() && this.selection.selectLineEnd();
                var a = this.getSelectionRange();
                a.start.column == a.end.column && a.start.row == a.end.row && (a.end.column = 0, a.end.row++), this.session.remove(a), this.clearSelection()
            }, this.splitLine = function() {
                this.selection.isEmpty() || (this.session.remove(this.getSelectionRange()), this.clearSelection());
                var a = this.getCursorPosition();
                this.insert("\n"), this.moveCursorToPosition(a)
            }, this.transposeLetters = function() {
                if (this.selection.isEmpty()) {
                    var a = this.getCursorPosition(),
                        b = a.column;
                    if (0 !== b) {
                        var c, d, e = this.session.getLine(a.row);
                        b < e.length ? (c = e.charAt(b) + e.charAt(b - 1), d = new n(a.row, b - 1, a.row, b + 1)) : (c = e.charAt(b - 1) + e.charAt(b - 2), d = new n(a.row, b - 2, a.row, b)), this.session.replace(d, c)
                    }
                }
            }, this.toLowerCase = function() {
                var a = this.getSelectionRange();
                this.selection.isEmpty() && this.selection.selectWord();
                var b = this.getSelectionRange(),
                    c = this.session.getTextRange(b);
                this.session.replace(b, c.toLowerCase()), this.selection.setSelectionRange(a)
            }, this.toUpperCase = function() {
                var a = this.getSelectionRange();
                this.selection.isEmpty() && this.selection.selectWord();
                var b = this.getSelectionRange(),
                    c = this.session.getTextRange(b);
                this.session.replace(b, c.toUpperCase()), this.selection.setSelectionRange(a)
            }, this.indent = function() {
                var a = this.session,
                    b = this.getSelectionRange();
                if (b.start.row < b.end.row) {
                    var c = this.$getSelectedRows();
                    return void a.indentRows(c.first, c.last, "	")
                }
                if (b.start.column < b.end.column) {
                    var d = a.getTextRange(b);
                    if (!/^\s+$/.test(d)) {
                        var c = this.$getSelectedRows();
                        return void a.indentRows(c.first, c.last, "	")
                    }
                }
                var e = a.getLine(b.start.row),
                    g = b.start,
                    h = a.getTabSize(),
                    i = a.documentToScreenColumn(g.row, g.column);
                if (this.session.getUseSoftTabs()) var j = h - i % h,
                    k = f.stringRepeat(" ", j);
                else {
                    for (var j = i % h;
                        " " == e[b.start.column] && j;) b.start.column--, j--;
                    this.selection.setSelectionRange(b), k = "	"
                }
                return this.insert(k)
            }, this.blockIndent = function() {
                var a = this.$getSelectedRows();
                this.session.indentRows(a.first, a.last, "	")
            }, this.blockOutdent = function() {
                var a = this.session.getSelection();
                this.session.outdentRows(a.getRange())
            }, this.sortLines = function() {
                var a = this.$getSelectedRows(),
                    b = this.session,
                    c = [];
                for (e = a.first; e <= a.last; e++) c.push(b.getLine(e));
                c.sort(function(a, b) {
                    return a.toLowerCase() < b.toLowerCase() ? -1 : a.toLowerCase() > b.toLowerCase() ? 1 : 0
                });
                for (var d = new n(0, 0, 0, 0), e = a.first; e <= a.last; e++) {
                    var f = b.getLine(e);
                    d.start.row = e, d.end.row = e, d.end.column = f.length, b.replace(d, c[e - a.first])
                }
            }, this.toggleCommentLines = function() {
                var a = this.session.getState(this.getCursorPosition().row),
                    b = this.$getSelectedRows();
                this.session.getMode().toggleCommentLines(a, this.session, b.first, b.last)
            }, this.toggleBlockComment = function() {
                var a = this.getCursorPosition(),
                    b = this.session.getState(a.row),
                    c = this.getSelectionRange();
                this.session.getMode().toggleBlockComment(b, this.session, c, a)
            }, this.getNumberAt = function(a, b) {
                var c = /[\-]?[0-9]+(?:\.[0-9]+)?/g;
                c.lastIndex = 0;
                for (var d = this.session.getLine(a); c.lastIndex < b;) {
                    var e = c.exec(d);
                    if (e.index <= b && e.index + e[0].length >= b) {
                        var f = {
                            value: e[0],
                            start: e.index,
                            end: e.index + e[0].length
                        };
                        return f
                    }
                }
                return null
            }, this.modifyNumber = function(a) {
                var b = this.selection.getCursor().row,
                    c = this.selection.getCursor().column,
                    d = new n(b, c - 1, b, c),
                    e = this.session.getTextRange(d);
                if (!isNaN(parseFloat(e)) && isFinite(e)) {
                    var f = this.getNumberAt(b, c);
                    if (f) {
                        var g = f.value.indexOf(".") >= 0 ? f.start + f.value.indexOf(".") + 1 : f.end,
                            h = f.start + f.value.length - g,
                            i = parseFloat(f.value);
                        i *= Math.pow(10, h), a *= g !== f.end && g > c ? Math.pow(10, f.end - c - 1) : Math.pow(10, f.end - c), i += a, i /= Math.pow(10, h);
                        var j = i.toFixed(h),
                            k = new n(b, f.start, b, f.end);
                        this.session.replace(k, j), this.moveCursorTo(b, Math.max(f.start + 1, c + j.length - f.value.length))
                    }
                }
            }, this.removeLines = function() {
                var a = this.$getSelectedRows();
                this.session.removeFullLines(a.first, a.last), this.clearSelection()
            }, this.duplicateSelection = function() {
                var a = this.selection,
                    b = this.session,
                    c = a.getRange(),
                    d = a.isBackwards();
                if (c.isEmpty()) {
                    var e = c.start.row;
                    b.duplicateLines(e, e)
                } else {
                    var f = d ? c.start : c.end,
                        g = b.insert(f, b.getTextRange(c), !1);
                    c.start = f, c.end = g, a.setSelectionRange(c, d)
                }
            }, this.moveLinesDown = function() {
                this.$moveLines(1, !1)
            }, this.moveLinesUp = function() {
                this.$moveLines(-1, !1)
            }, this.moveText = function(a, b, c) {
                return this.session.moveText(a, b, c)
            }, this.copyLinesUp = function() {
                this.$moveLines(-1, !0)
            }, this.copyLinesDown = function() {
                this.$moveLines(1, !0)
            }, this.$moveLines = function(a, b) {
                var c, d, e = this.selection;
                if (!e.inMultiSelectMode || this.inVirtualSelectionMode) {
                    var f = e.toOrientedRange();
                    c = this.$getSelectedRows(f), d = this.session.$moveLines(c.first, c.last, b ? 0 : a), b && -1 == a && (d = 0), f.moveBy(d, 0), e.fromOrientedRange(f)
                } else {
                    var g = e.rangeList.ranges;
                    e.rangeList.detach(this.session), this.inVirtualSelectionMode = !0;
                    for (var h = 0, i = 0, j = g.length, k = 0; j > k; k++) {
                        var l = k;
                        g[k].moveBy(h, 0), c = this.$getSelectedRows(g[k]);
                        for (var m = c.first, n = c.last; ++k < j;) {
                            i && g[k].moveBy(i, 0);
                            var o = this.$getSelectedRows(g[k]);
                            if (b && o.first != n) break;
                            if (!b && o.first > n + 1) break;
                            n = o.last
                        }
                        for (k--, h = this.session.$moveLines(m, n, b ? 0 : a), b && -1 == a && (l = k + 1); k >= l;) g[l].moveBy(h, 0), l++;
                        b || (h = 0), i += h
                    }
                    e.fromOrientedRange(e.ranges[0]), e.rangeList.attach(this.session), this.inVirtualSelectionMode = !1
                }
            }, this.$getSelectedRows = function(a) {
                return a = (a || this.getSelectionRange()).collapseRows(), {
                    first: this.session.getRowFoldStart(a.start.row),
                    last: this.session.getRowFoldEnd(a.end.row)
                }
            }, this.onCompositionStart = function(a) {
                this.renderer.showComposition(this.getCursorPosition())
            }, this.onCompositionUpdate = function(a) {
                this.renderer.setCompositionText(a)
            }, this.onCompositionEnd = function() {
                this.renderer.hideComposition()
            }, this.getFirstVisibleRow = function() {
                return this.renderer.getFirstVisibleRow()
            }, this.getLastVisibleRow = function() {
                return this.renderer.getLastVisibleRow()
            }, this.isRowVisible = function(a) {
                return a >= this.getFirstVisibleRow() && a <= this.getLastVisibleRow()
            }, this.isRowFullyVisible = function(a) {
                return a >= this.renderer.getFirstFullyVisibleRow() && a <= this.renderer.getLastFullyVisibleRow()
            }, this.$getVisibleRowCount = function() {
                return this.renderer.getScrollBottomRow() - this.renderer.getScrollTopRow() + 1
            }, this.$moveByPage = function(a, b) {
                var c = this.renderer,
                    d = this.renderer.layerConfig,
                    e = a * Math.floor(d.height / d.lineHeight);
                this.$blockScrolling++, b === !0 ? this.selection.$moveSelection(function() {
                    this.moveCursorBy(e, 0)
                }) : b === !1 && (this.selection.moveCursorBy(e, 0), this.selection.clearSelection()), this.$blockScrolling--;
                var f = c.scrollTop;
                c.scrollBy(0, e * d.lineHeight), null != b && c.scrollCursorIntoView(null, .5), c.animateScrolling(f)
            }, this.selectPageDown = function() {
                this.$moveByPage(1, !0)
            }, this.selectPageUp = function() {
                this.$moveByPage(-1, !0)
            }, this.gotoPageDown = function() {
                this.$moveByPage(1, !1)
            }, this.gotoPageUp = function() {
                this.$moveByPage(-1, !1)
            }, this.scrollPageDown = function() {
                this.$moveByPage(1)
            }, this.scrollPageUp = function() {
                this.$moveByPage(-1)
            }, this.scrollToRow = function(a) {
                this.renderer.scrollToRow(a)
            }, this.scrollToLine = function(a, b, c, d) {
                this.renderer.scrollToLine(a, b, c, d)
            }, this.centerSelection = function() {
                var a = this.getSelectionRange(),
                    b = {
                        row: Math.floor(a.start.row + (a.end.row - a.start.row) / 2),
                        column: Math.floor(a.start.column + (a.end.column - a.start.column) / 2)
                    };
                this.renderer.alignCursor(b, .5)
            }, this.getCursorPosition = function() {
                return this.selection.getCursor()
            }, this.getCursorPositionScreen = function() {
                return this.session.documentToScreenPosition(this.getCursorPosition())
            }, this.getSelectionRange = function() {
                return this.selection.getRange()
            }, this.selectAll = function() {
                this.$blockScrolling += 1, this.selection.selectAll(), this.$blockScrolling -= 1
            }, this.clearSelection = function() {
                this.selection.clearSelection()
            }, this.moveCursorTo = function(a, b) {
                this.selection.moveCursorTo(a, b)
            }, this.moveCursorToPosition = function(a) {
                this.selection.moveCursorToPosition(a)
            }, this.jumpToMatching = function(a, b) {
                var c = this.getCursorPosition(),
                    d = new s(this.session, c.row, c.column),
                    e = d.getCurrentToken(),
                    f = e || d.stepForward();
                if (f) {
                    var g, h, i = !1,
                        j = {},
                        k = c.column - f.start,
                        l = {
                            ")": "(",
                            "(": "(",
                            "]": "[",
                            "[": "[",
                            "{": "{",
                            "}": "{"
                        };
                    do {
                        if (f.value.match(/[{}()\[\]]/g)) {
                            for (; k < f.value.length && !i; k++)
                                if (l[f.value[k]]) switch (h = l[f.value[k]] + "." + f.type.replace("rparen", "lparen"), isNaN(j[h]) && (j[h] = 0), f.value[k]) {
                                    case "(":
                                    case "[":
                                    case "{":
                                        j[h]++;
                                        break;
                                    case ")":
                                    case "]":
                                    case "}":
                                        j[h]--, -1 === j[h] && (g = "bracket", i = !0)
                                }
                        } else f && -1 !== f.type.indexOf("tag-name") && (isNaN(j[f.value]) && (j[f.value] = 0), "<" === e.value ? j[f.value]++ : "</" === e.value && j[f.value]--, -1 === j[f.value] && (g = "tag", i = !0));
                        i || (e = f, f = d.stepForward(), k = 0)
                    } while (f && !i);
                    if (g) {
                        var m, o;
                        if ("bracket" === g) m = this.session.getBracketRange(c), m || (m = new n(d.getCurrentTokenRow(), d.getCurrentTokenColumn() + k - 1, d.getCurrentTokenRow(), d.getCurrentTokenColumn() + k - 1), o = m.start, (b || o.row === c.row && Math.abs(o.column - c.column) < 2) && (m = this.session.getBracketRange(o)));
                        else if ("tag" === g) {
                            if (!f || -1 === f.type.indexOf("tag-name")) return;
                            var p = f.value;
                            if (m = new n(d.getCurrentTokenRow(), d.getCurrentTokenColumn() - 2, d.getCurrentTokenRow(), d.getCurrentTokenColumn() - 2), 0 === m.compare(c.row, c.column)) {
                                i = !1;
                                do f = e, e = d.stepBackward(), e && (-1 !== e.type.indexOf("tag-close") && m.setEnd(d.getCurrentTokenRow(), d.getCurrentTokenColumn() + 1), f.value === p && -1 !== f.type.indexOf("tag-name") && ("<" === e.value ? j[p]++ : "</" === e.value && j[p]--, 0 === j[p] && (i = !0))); while (e && !i)
                            }
                            f && f.type.indexOf("tag-name") && (o = m.start, o.row == c.row && Math.abs(o.column - c.column) < 2 && (o = m.end))
                        }
                        o = m && m.cursor || o, o && (a ? m && b ? this.selection.setRange(m) : m && m.isEqual(this.getSelectionRange()) ? this.clearSelection() : this.selection.selectTo(o.row, o.column) : this.selection.moveTo(o.row, o.column))
                    }
                }
            }, this.gotoLine = function(a, b, c) {
                this.selection.clearSelection(), this.session.unfold({
                    row: a - 1,
                    column: b || 0
                }), this.$blockScrolling += 1, this.exitMultiSelectMode && this.exitMultiSelectMode(), this.moveCursorTo(a - 1, b || 0), this.$blockScrolling -= 1, this.isRowFullyVisible(a - 1) || this.scrollToLine(a - 1, !0, c)
            }, this.navigateTo = function(a, b) {
                this.selection.moveTo(a, b)
            }, this.navigateUp = function(a) {
                if (this.selection.isMultiLine() && !this.selection.isBackwards()) {
                    var b = this.selection.anchor.getPosition();
                    return this.moveCursorToPosition(b)
                }
                this.selection.clearSelection(), this.selection.moveCursorBy(-a || -1, 0)
            }, this.navigateDown = function(a) {
                if (this.selection.isMultiLine() && this.selection.isBackwards()) {
                    var b = this.selection.anchor.getPosition();
                    return this.moveCursorToPosition(b)
                }
                this.selection.clearSelection(), this.selection.moveCursorBy(a || 1, 0)
            }, this.navigateLeft = function(a) {
                if (this.selection.isEmpty())
                    for (a = a || 1; a--;) this.selection.moveCursorLeft();
                else {
                    var b = this.getSelectionRange().start;
                    this.moveCursorToPosition(b)
                }
                this.clearSelection()
            }, this.navigateRight = function(a) {
                if (this.selection.isEmpty())
                    for (a = a || 1; a--;) this.selection.moveCursorRight();
                else {
                    var b = this.getSelectionRange().end;
                    this.moveCursorToPosition(b)
                }
                this.clearSelection()
            }, this.navigateLineStart = function() {
                this.selection.moveCursorLineStart(), this.clearSelection()
            }, this.navigateLineEnd = function() {
                this.selection.moveCursorLineEnd(), this.clearSelection()
            }, this.navigateFileEnd = function() {
                this.selection.moveCursorFileEnd(), this.clearSelection()
            }, this.navigateFileStart = function() {
                this.selection.moveCursorFileStart(), this.clearSelection()
            }, this.navigateWordRight = function() {
                this.selection.moveCursorWordRight(), this.clearSelection()
            }, this.navigateWordLeft = function() {
                this.selection.moveCursorWordLeft(), this.clearSelection()
            }, this.replace = function(a, b) {
                b && this.$search.set(b);
                var c = this.$search.find(this.session),
                    d = 0;
                return c ? (this.$tryReplace(c, a) && (d = 1), null !== c && (this.selection.setSelectionRange(c), this.renderer.scrollSelectionIntoView(c.start, c.end)), d) : d
            }, this.replaceAll = function(a, b) {
                b && this.$search.set(b);
                var c = this.$search.findAll(this.session),
                    d = 0;
                if (!c.length) return d;
                this.$blockScrolling += 1;
                var e = this.getSelectionRange();
                this.selection.moveTo(0, 0);
                for (var f = c.length - 1; f >= 0; --f) this.$tryReplace(c[f], a) && d++;
                return this.selection.setSelectionRange(e), this.$blockScrolling -= 1, d
            }, this.$tryReplace = function(a, b) {
                var c = this.session.getTextRange(a);
                return b = this.$search.replace(c, b), null !== b ? (a.end = this.session.replace(a, b), a) : null
            }, this.getLastSearchOptions = function() {
                return this.$search.getOptions()
            }, this.find = function(a, b, c) {
                b || (b = {}), "string" == typeof a || a instanceof RegExp ? b.needle = a : "object" == typeof a && d.mixin(b, a);
                var e = this.selection.getRange();
                null == b.needle && (a = this.session.getTextRange(e) || this.$search.$options.needle, a || (e = this.session.getWordRange(e.start.row, e.start.column), a = this.session.getTextRange(e)), this.$search.set({
                    needle: a
                })), this.$search.set(b), b.start || this.$search.set({
                    start: e
                });
                var f = this.$search.find(this.session);
                return b.preventScroll ? f : f ? (this.revealRange(f, c), f) : (b.backwards ? e.start = e.end : e.end = e.start, void this.selection.setRange(e))
            }, this.findNext = function(a, b) {
                this.find({
                    skipCurrent: !0,
                    backwards: !1
                }, a, b)
            }, this.findPrevious = function(a, b) {
                this.find(a, {
                    skipCurrent: !0,
                    backwards: !0
                }, b)
            }, this.revealRange = function(a, b) {
                this.$blockScrolling += 1, this.session.unfold(a), this.selection.setSelectionRange(a), this.$blockScrolling -= 1;
                var c = this.renderer.scrollTop;
                this.renderer.scrollSelectionIntoView(a.start, a.end, .5), b !== !1 && this.renderer.animateScrolling(c)
            }, this.undo = function() {
                this.$blockScrolling++, this.session.getUndoManager().undo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5)
            }, this.redo = function() {
                this.$blockScrolling++, this.session.getUndoManager().redo(), this.$blockScrolling--, this.renderer.scrollCursorIntoView(null, .5)
            }, this.destroy = function() {
                this.renderer.destroy(), this._signal("destroy", this), this.session && this.session.destroy()
            }, this.setAutoScrollEditorIntoView = function(a) {
                if (a) {
                    var b, c = this,
                        d = !1;
                    this.$scrollAnchor || (this.$scrollAnchor = document.createElement("div"));
                    var e = this.$scrollAnchor;
                    e.style.cssText = "position:absolute", this.container.insertBefore(e, this.container.firstChild);
                    var f = this.on("changeSelection", function() {
                            d = !0
                        }),
                        g = this.renderer.on("beforeRender", function() {
                            d && (b = c.renderer.container.getBoundingClientRect())
                        }),
                        h = this.renderer.on("afterRender", function() {
                            if (d && b && (c.isFocused() || c.searchBox && c.searchBox.isFocused())) {
                                var a = c.renderer,
                                    f = a.$cursorLayer.$pixelPos,
                                    g = a.layerConfig,
                                    h = f.top - g.offset;
                                d = f.top >= 0 && h + b.top < 0 ? !0 : f.top < g.height && f.top + b.top + g.lineHeight > window.innerHeight ? !1 : null, null != d && (e.style.top = h + "px", e.style.left = f.left + "px", e.style.height = g.lineHeight + "px", e.scrollIntoView(d)), d = b = null
                            }
                        });
                    this.setAutoScrollEditorIntoView = function(a) {
                        a || (delete this.setAutoScrollEditorIntoView, this.off("changeSelection", f), this.renderer.off("afterRender", h), this.renderer.off("beforeRender", g))
                    }
                }
            }, this.$resetCursorStyle = function() {
                var a = this.$cursorStyle || "ace",
                    b = this.renderer.$cursorLayer;
                b && (b.setSmoothBlinking(/smooth/.test(a)), b.isBlinking = !this.$readOnly && "wide" != a, e.setCssClass(b.element, "ace_slim-cursors", /slim/.test(a)))
            }
        }).call(t.prototype), r.defineOptions(t.prototype, "editor", {
            selectionStyle: {
                set: function(a) {
                    this.onSelectionChange(), this._signal("changeSelectionStyle", {
                        data: a
                    })
                },
                initialValue: "line"
            },
            highlightActiveLine: {
                set: function() {
                    this.$updateHighlightActiveLine()
                },
                initialValue: !0
            },
            highlightSelectedWord: {
                set: function(a) {
                    this.$onSelectionChange()
                },
                initialValue: !0
            },
            readOnly: {
                set: function(a) {
                    this.$resetCursorStyle()
                },
                initialValue: !1
            },
            cursorStyle: {
                set: function(a) {
                    this.$resetCursorStyle()
                },
                values: ["ace", "slim", "smooth", "wide"],
                initialValue: "ace"
            },
            mergeUndoDeltas: {
                values: [!1, !0, "always"],
                initialValue: !0
            },
            behavioursEnabled: {
                initialValue: !0
            },
            wrapBehavioursEnabled: {
                initialValue: !0
            },
            autoScrollEditorIntoView: {
                set: function(a) {
                    this.setAutoScrollEditorIntoView(a)
                }
            },
            keyboardHandler: {
                set: function(a) {
                    this.setKeyboardHandler(a)
                },
                get: function() {
                    return this.keybindingId
                },
                handlesSet: !0
            },
            hScrollBarAlwaysVisible: "renderer",
            vScrollBarAlwaysVisible: "renderer",
            highlightGutterLine: "renderer",
            animatedScroll: "renderer",
            showInvisibles: "renderer",
            showPrintMargin: "renderer",
            printMarginColumn: "renderer",
            printMargin: "renderer",
            fadeFoldWidgets: "renderer",
            showFoldWidgets: "renderer",
            showLineNumbers: "renderer",
            showGutter: "renderer",
            displayIndentGuides: "renderer",
            fontSize: "renderer",
            fontFamily: "renderer",
            maxLines: "renderer",
            minLines: "renderer",
            scrollPastEnd: "renderer",
            fixedWidthGutter: "renderer",
            theme: "renderer",
            scrollSpeed: "$mouseHandler",
            dragDelay: "$mouseHandler",
            dragEnabled: "$mouseHandler",
            focusTimout: "$mouseHandler",
            tooltipFollowsMouse: "$mouseHandler",
            firstLineNumber: "session",
            overwrite: "session",
            newLineMode: "session",
            useWorker: "session",
            useSoftTabs: "session",
            tabSize: "session",
            wrap: "session",
            indentedSoftWrap: "session",
            foldStyle: "session",
            mode: "session"
        }), b.Editor = t
    }), define("ace/undomanager", ["require", "exports", "module"], function(a, b, c) {
        "use strict";
        var d = function() {
            this.reset()
        };
        (function() {
            function a(a) {
                return {
                    action: a.action,
                    start: a.start,
                    end: a.end,
                    lines: 1 == a.lines.length ? null : a.lines,
                    text: 1 == a.lines.length ? a.lines[0] : null
                }
            }

            function b(a) {
                return {
                    action: a.action,
                    start: a.start,
                    end: a.end,
                    lines: a.lines || [a.text]
                }
            }

            function c(a, b) {
                for (var c = new Array(a.length), d = 0; d < a.length; d++) {
                    for (var e = a[d], f = {
                            group: e.group,
                            deltas: new Array(e.length)
                        }, g = 0; g < e.deltas.length; g++) {
                        var h = e.deltas[g];
                        f.deltas[g] = b(h)
                    }
                    c[d] = f
                }
                return c
            }
            this.execute = function(a) {
                var b = a.args[0];
                this.$doc = a.args[1], a.merge && this.hasUndo() && (this.dirtyCounter--, b = this.$undoStack.pop().concat(b)), this.$undoStack.push(b), this.$redoStack = [], this.dirtyCounter < 0 && (this.dirtyCounter = NaN), this.dirtyCounter++
            }, this.undo = function(a) {
                var b = this.$undoStack.pop(),
                    c = null;
                return b && (c = this.$doc.undoChanges(b, a), this.$redoStack.push(b), this.dirtyCounter--), c
            }, this.redo = function(a) {
                var b = this.$redoStack.pop(),
                    c = null;
                return b && (c = this.$doc.redoChanges(this.$deserializeDeltas(b), a), this.$undoStack.push(b), this.dirtyCounter++), c
            }, this.reset = function() {
                this.$undoStack = [], this.$redoStack = [], this.dirtyCounter = 0
            }, this.hasUndo = function() {
                return this.$undoStack.length > 0
            }, this.hasRedo = function() {
                return this.$redoStack.length > 0
            }, this.markClean = function() {
                this.dirtyCounter = 0
            }, this.isClean = function() {
                return 0 === this.dirtyCounter
            }, this.$serializeDeltas = function(b) {
                return c(b, a)
            }, this.$deserializeDeltas = function(a) {
                return c(a, b)
            }
        }).call(d.prototype), b.UndoManager = d
    }), define("ace/layer/gutter", ["require", "exports", "module", "ace/lib/dom", "ace/lib/oop", "ace/lib/lang", "ace/lib/event_emitter"], function(a, b, c) {
        "use strict";
        var d = a("../lib/dom"),
            e = a("../lib/oop"),
            f = a("../lib/lang"),
            g = a("../lib/event_emitter").EventEmitter,
            h = function(a) {
                this.element = d.createElement("div"), this.element.className = "ace_layer ace_gutter-layer", a.appendChild(this.element), this.setShowFoldWidgets(this.$showFoldWidgets), this.gutterWidth = 0, this.$annotations = [], this.$updateAnnotations = this.$updateAnnotations.bind(this), this.$cells = []
            };
        (function() {
            e.implement(this, g), this.setSession = function(a) {
                this.session && this.session.removeEventListener("change", this.$updateAnnotations), this.session = a, a && a.on("change", this.$updateAnnotations)
            }, this.addGutterDecoration = function(a, b) {
                window.console && console.warn && console.warn("deprecated use session.addGutterDecoration"), this.session.addGutterDecoration(a, b)
            }, this.removeGutterDecoration = function(a, b) {
                window.console && console.warn && console.warn("deprecated use session.removeGutterDecoration"), this.session.removeGutterDecoration(a, b)
            }, this.setAnnotations = function(a) {
                this.$annotations = [];
                for (var b = 0; b < a.length; b++) {
                    var c = a[b],
                        d = c.row,
                        e = this.$annotations[d];
                    e || (e = this.$annotations[d] = {
                        text: []
                    });
                    var g = c.text;
                    g = g ? f.escapeHTML(g) : c.html || "", -1 === e.text.indexOf(g) && e.text.push(g);
                    var h = c.type;
                    "error" == h ? e.className = " ace_error" : "warning" == h && " ace_error" != e.className ? e.className = " ace_warning" : "info" != h || e.className || (e.className = " ace_info")
                }
            }, this.$updateAnnotations = function(a) {
                if (this.$annotations.length) {
                    var b = a.start.row,
                        c = a.end.row - b;
                    if (0 === c);
                    else if ("remove" == a.action) this.$annotations.splice(b, c + 1, null);
                    else {
                        var d = new Array(c + 1);
                        d.unshift(b, 1), this.$annotations.splice.apply(this.$annotations, d)
                    }
                }
            }, this.update = function(a) {
                for (var b = this.session, c = a.firstRow, e = Math.min(a.lastRow + a.gutterOffset, b.getLength() - 1), f = b.getNextFoldLine(c), g = f ? f.start.row : 1 / 0, h = this.$showFoldWidgets && b.foldWidgets, i = b.$breakpoints, j = b.$decorations, k = b.$firstLineNumber, l = 0, m = b.gutterRenderer || this.$renderer, n = null, o = -1, p = c;;) {
                    if (p > g && (p = f.end.row + 1, f = b.getNextFoldLine(p, f), g = f ? f.start.row : 1 / 0), p > e) {
                        for (; this.$cells.length > o + 1;) n = this.$cells.pop(), this.element.removeChild(n.element);
                        break
                    }
                    n = this.$cells[++o], n || (n = {
                        element: null,
                        textNode: null,
                        foldWidget: null
                    }, n.element = d.createElement("div"), n.textNode = document.createTextNode(""), n.element.appendChild(n.textNode), this.element.appendChild(n.element), this.$cells[o] = n);
                    var q = "ace_gutter-cell ";
                    i[p] && (q += i[p]), j[p] && (q += j[p]), this.$annotations[p] && (q += this.$annotations[p].className), n.element.className != q && (n.element.className = q);
                    var r = b.getRowLength(p) * a.lineHeight + "px";
                    if (r != n.element.style.height && (n.element.style.height = r), h) {
                        var s = h[p];
                        null == s && (s = h[p] = b.getFoldWidget(p))
                    }
                    if (s) {
                        n.foldWidget || (n.foldWidget = d.createElement("span"), n.element.appendChild(n.foldWidget));
                        var q = "ace_fold-widget ace_" + s;
                        q += "start" == s && p == g && p < f.end.row ? " ace_closed" : " ace_open", n.foldWidget.className != q && (n.foldWidget.className = q);
                        var r = a.lineHeight + "px";
                        n.foldWidget.style.height != r && (n.foldWidget.style.height = r)
                    } else n.foldWidget && (n.element.removeChild(n.foldWidget), n.foldWidget = null);
                    var t = l = m ? m.getText(b, p) : p + k;
                    t != n.textNode.data && (n.textNode.data = t), p++
                }
                this.element.style.height = a.minHeight + "px", (this.$fixedWidth || b.$useWrapMode) && (l = b.getLength() + k);
                var u = m ? m.getWidth(b, l, a) : l.toString().length * a.characterWidth,
                    v = this.$padding || this.$computePadding();
                u += v.left + v.right, u === this.gutterWidth || isNaN(u) || (this.gutterWidth = u, this.element.style.width = Math.ceil(this.gutterWidth) + "px", this._emit("changeGutterWidth", u))
            }, this.$fixedWidth = !1, this.$showLineNumbers = !0, this.$renderer = "", this.setShowLineNumbers = function(a) {
                this.$renderer = !a && {
                    getWidth: function() {
                        return ""
                    },
                    getText: function() {
                        return ""
                    }
                }
            }, this.getShowLineNumbers = function() {
                return this.$showLineNumbers
            }, this.$showFoldWidgets = !0, this.setShowFoldWidgets = function(a) {
                a ? d.addCssClass(this.element, "ace_folding-enabled") : d.removeCssClass(this.element, "ace_folding-enabled"), this.$showFoldWidgets = a, this.$padding = null
            }, this.getShowFoldWidgets = function() {
                return this.$showFoldWidgets
            }, this.$computePadding = function() {
                if (!this.element.firstChild) return {
                    left: 0,
                    right: 0
                };
                var a = d.computedStyle(this.element.firstChild);
                return this.$padding = {}, this.$padding.left = parseInt(a.paddingLeft) + 1 || 0, this.$padding.right = parseInt(a.paddingRight) || 0, this.$padding
            }, this.getRegion = function(a) {
                var b = this.$padding || this.$computePadding(),
                    c = this.element.getBoundingClientRect();
                return a.x < b.left + c.left ? "markers" : this.$showFoldWidgets && a.x > c.right - b.right ? "foldWidgets" : void 0
            }
        }).call(h.prototype), b.Gutter = h
    }), define("ace/layer/marker", ["require", "exports", "module", "ace/range", "ace/lib/dom"], function(a, b, c) {
        "use strict";
        var d = a("../range").Range,
            e = a("../lib/dom"),
            f = function(a) {
                this.element = e.createElement("div"), this.element.className = "ace_layer ace_marker-layer", a.appendChild(this.element)
            };
        (function() {
            function a(a, b, c, d) {
                return (a ? 1 : 0) | (b ? 2 : 0) | (c ? 4 : 0) | (d ? 8 : 0)
            }
            this.$padding = 0, this.setPadding = function(a) {
                this.$padding = a
            }, this.setSession = function(a) {
                this.session = a
            }, this.setMarkers = function(a) {
                this.markers = a
            }, this.update = function(a) {
                var a = a || this.config;
                if (a) {
                    this.config = a;
                    var b = [];
                    for (var c in this.markers) {
                        var d = this.markers[c];
                        if (d.range) {
                            var e = d.range.clipRows(a.firstRow, a.lastRow);
                            if (!e.isEmpty())
                                if (e = e.toScreenRange(this.session), d.renderer) {
                                    var f = this.$getTop(e.start.row, a),
                                        g = this.$padding + e.start.column * a.characterWidth;
                                    d.renderer(b, e, g, f, a)
                                } else "fullLine" == d.type ? this.drawFullLineMarker(b, e, d.clazz, a) : "screenLine" == d.type ? this.drawScreenLineMarker(b, e, d.clazz, a) : e.isMultiLine() ? "text" == d.type ? this.drawTextMarker(b, e, d.clazz, a) : this.drawMultiLineMarker(b, e, d.clazz, a) : this.drawSingleLineMarker(b, e, d.clazz + " ace_start ace_br15", a)
                        } else d.update(b, this, this.session, a)
                    }
                    this.element.innerHTML = b.join("")
                }
            }, this.$getTop = function(a, b) {
                return (a - b.firstRowScreen) * b.lineHeight
            }, this.drawTextMarker = function(b, c, e, f, g) {
                for (var h = this.session, i = c.start.row, j = c.end.row, k = i, l = 0, m = 0, n = h.getScreenLastRowColumn(k), o = new d(k, c.start.column, k, m); j >= k; k++) o.start.row = o.end.row = k, o.start.column = k == i ? c.start.column : h.getRowWrapIndent(k), o.end.column = n, l = m, m = n, n = j > k + 1 ? h.getScreenLastRowColumn(k + 1) : k == j ? 0 : c.end.column, this.drawSingleLineMarker(b, o, e + (k == i ? " ace_start" : "") + " ace_br" + a(k == i || k == i + 1 && c.start.column, m > l, m > n, k == j), f, k == j ? 0 : 1, g)
            }, this.drawMultiLineMarker = function(a, b, c, d, e) {
                var f = this.$padding,
                    g = d.lineHeight,
                    h = this.$getTop(b.start.row, d),
                    i = f + b.start.column * d.characterWidth;
                e = e || "", a.push("<div class='", c, " ace_br1 ace_start' style='", "height:", g, "px;", "right:0;", "top:", h, "px;", "left:", i, "px;", e, "'></div>"), h = this.$getTop(b.end.row, d);
                var j = b.end.column * d.characterWidth;
                if (a.push("<div class='", c, " ace_br12' style='", "height:", g, "px;", "width:", j, "px;", "top:", h, "px;", "left:", f, "px;", e, "'></div>"), g = (b.end.row - b.start.row - 1) * d.lineHeight, !(0 >= g)) {
                    h = this.$getTop(b.start.row + 1, d);
                    var k = (b.start.column ? 1 : 0) | (b.end.column ? 0 : 8);
                    a.push("<div class='", c, k ? " ace_br" + k : "", "' style='", "height:", g, "px;", "right:0;", "top:", h, "px;", "left:", f, "px;", e, "'></div>")
                }
            }, this.drawSingleLineMarker = function(a, b, c, d, e, f) {
                var g = d.lineHeight,
                    h = (b.end.column + (e || 0) - b.start.column) * d.characterWidth,
                    i = this.$getTop(b.start.row, d),
                    j = this.$padding + b.start.column * d.characterWidth;
                a.push("<div class='", c, "' style='", "height:", g, "px;", "width:", h, "px;", "top:", i, "px;", "left:", j, "px;", f || "", "'></div>")
            }, this.drawFullLineMarker = function(a, b, c, d, e) {
                var f = this.$getTop(b.start.row, d),
                    g = d.lineHeight;
                b.start.row != b.end.row && (g += this.$getTop(b.end.row, d) - f), a.push("<div class='", c, "' style='", "height:", g, "px;", "top:", f, "px;", "left:0;right:0;", e || "", "'></div>")
            }, this.drawScreenLineMarker = function(a, b, c, d, e) {
                var f = this.$getTop(b.start.row, d),
                    g = d.lineHeight;
                a.push("<div class='", c, "' style='", "height:", g, "px;", "top:", f, "px;", "left:0;right:0;", e || "", "'></div>")
            }
        }).call(f.prototype), b.Marker = f
    }), define("ace/layer/text", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter"], function(a, b, c) {
        "use strict";
        var d = a("../lib/oop"),
            e = a("../lib/dom"),
            f = a("../lib/lang"),
            g = (a("../lib/useragent"), a("../lib/event_emitter").EventEmitter),
            h = function(a) {
                this.element = e.createElement("div"), this.element.className = "ace_layer ace_text-layer", a.appendChild(this.element), this.$updateEolChar = this.$updateEolChar.bind(this)
            };
        (function() {
            d.implement(this, g), this.EOF_CHAR = "¶", this.EOL_CHAR_LF = "¬", this.EOL_CHAR_CRLF = "¤", this.EOL_CHAR = this.EOL_CHAR_LF, this.TAB_CHAR = "—", this.SPACE_CHAR = "·", this.$padding = 0, this.$updateEolChar = function() {
                var a = "\n" == this.session.doc.getNewLineCharacter() ? this.EOL_CHAR_LF : this.EOL_CHAR_CRLF;
                return this.EOL_CHAR != a ? (this.EOL_CHAR = a, !0) : void 0
            }, this.setPadding = function(a) {
                this.$padding = a, this.element.style.padding = "0 " + a + "px"
            }, this.getLineHeight = function() {
                return this.$fontMetrics.$characterSize.height || 0
            }, this.getCharacterWidth = function() {
                return this.$fontMetrics.$characterSize.width || 0
            }, this.$setFontMetrics = function(a) {
                this.$fontMetrics = a, this.$fontMetrics.on("changeCharacterSize", function(a) {
                    this._signal("changeCharacterSize", a)
                }.bind(this)), this.$pollSizeChanges()
            }, this.checkForSizeChanges = function() {
                this.$fontMetrics.checkForSizeChanges()
            }, this.$pollSizeChanges = function() {
                return this.$pollSizeChangesTimer = this.$fontMetrics.$pollSizeChanges()
            }, this.setSession = function(a) {
                this.session = a, a && this.$computeTabString()
            }, this.showInvisibles = !1, this.setShowInvisibles = function(a) {
                return this.showInvisibles == a ? !1 : (this.showInvisibles = a, this.$computeTabString(), !0)
            }, this.displayIndentGuides = !0, this.setDisplayIndentGuides = function(a) {
                return this.displayIndentGuides == a ? !1 : (this.displayIndentGuides = a, this.$computeTabString(), !0)
            }, this.$tabStrings = [], this.onChangeTabSize = this.$computeTabString = function() {
                var a = this.session.getTabSize();
                this.tabSize = a;
                for (var b = this.$tabStrings = [0], c = 1; a + 1 > c; c++) this.showInvisibles ? b.push("<span class='ace_invisible ace_invisible_tab'>" + f.stringRepeat(this.TAB_CHAR, c) + "</span>") : b.push(f.stringRepeat(" ", c));
                if (this.displayIndentGuides) {
                    this.$indentGuideRe = /\s\S| \t|\t |\s$/;
                    var d = "ace_indent-guide",
                        e = "",
                        g = "";
                    if (this.showInvisibles) {
                        d += " ace_invisible", e = " ace_invisible_space", g = " ace_invisible_tab";
                        var h = f.stringRepeat(this.SPACE_CHAR, this.tabSize),
                            i = f.stringRepeat(this.TAB_CHAR, this.tabSize)
                    } else var h = f.stringRepeat(" ", this.tabSize),
                        i = h;
                    this.$tabStrings[" "] = "<span class='" + d + e + "'>" + h + "</span>", this.$tabStrings["	"] = "<span class='" + d + g + "'>" + i + "</span>"
                }
            }, this.updateLines = function(a, b, c) {
                (this.config.lastRow != a.lastRow || this.config.firstRow != a.firstRow) && this.scrollLines(a), this.config = a;
                for (var d = Math.max(b, a.firstRow), e = Math.min(c, a.lastRow), f = this.element.childNodes, g = 0, h = a.firstRow; d > h; h++) {
                    var i = this.session.getFoldLine(h);
                    if (i) {
                        if (i.containsRow(d)) {
                            d = i.start.row;
                            break
                        }
                        h = i.end.row
                    }
                    g++
                }
                for (var h = d, i = this.session.getNextFoldLine(h), j = i ? i.start.row : 1 / 0;;) {
                    if (h > j && (h = i.end.row + 1, i = this.session.getNextFoldLine(h, i), j = i ? i.start.row : 1 / 0), h > e) break;
                    var k = f[g++];
                    if (k) {
                        var l = [];
                        this.$renderLine(l, h, !this.$useLineGroups(), h == j ? i : !1), k.style.height = a.lineHeight * this.session.getRowLength(h) + "px", k.innerHTML = l.join("")
                    }
                    h++
                }
            }, this.scrollLines = function(a) {
                var b = this.config;
                if (this.config = a, !b || b.lastRow < a.firstRow) return this.update(a);
                if (a.lastRow < b.firstRow) return this.update(a);
                var c = this.element;
                if (b.firstRow < a.firstRow)
                    for (var d = this.session.getFoldedRowCount(b.firstRow, a.firstRow - 1); d > 0; d--) c.removeChild(c.firstChild);
                if (b.lastRow > a.lastRow)
                    for (var d = this.session.getFoldedRowCount(a.lastRow + 1, b.lastRow); d > 0; d--) c.removeChild(c.lastChild);
                if (a.firstRow < b.firstRow) {
                    var e = this.$renderLinesFragment(a, a.firstRow, b.firstRow - 1);
                    c.firstChild ? c.insertBefore(e, c.firstChild) : c.appendChild(e)
                }
                if (a.lastRow > b.lastRow) {
                    var e = this.$renderLinesFragment(a, b.lastRow + 1, a.lastRow);
                    c.appendChild(e)
                }
            }, this.$renderLinesFragment = function(a, b, c) {
                for (var d = this.element.ownerDocument.createDocumentFragment(), f = b, g = this.session.getNextFoldLine(f), h = g ? g.start.row : 1 / 0;;) {
                    if (f > h && (f = g.end.row + 1, g = this.session.getNextFoldLine(f, g), h = g ? g.start.row : 1 / 0), f > c) break;
                    var i = e.createElement("div"),
                        j = [];
                    if (this.$renderLine(j, f, !1, f == h ? g : !1), i.innerHTML = j.join(""), this.$useLineGroups()) i.className = "ace_line_group", d.appendChild(i), i.style.height = a.lineHeight * this.session.getRowLength(f) + "px";
                    else
                        for (; i.firstChild;) d.appendChild(i.firstChild);
                    f++
                }
                return d
            }, this.update = function(a) {
                this.config = a;
                for (var b = [], c = a.firstRow, d = a.lastRow, e = c, f = this.session.getNextFoldLine(e), g = f ? f.start.row : 1 / 0;;) {
                    if (e > g && (e = f.end.row + 1, f = this.session.getNextFoldLine(e, f), g = f ? f.start.row : 1 / 0), e > d) break;
                    this.$useLineGroups() && b.push("<div class='ace_line_group' style='height:", a.lineHeight * this.session.getRowLength(e), "px'>"), this.$renderLine(b, e, !1, e == g ? f : !1), this.$useLineGroups() && b.push("</div>"), e++
                }
                this.element.innerHTML = b.join("")
            }, this.$textToken = {
                text: !0,
                rparen: !0,
                lparen: !0
            }, this.$renderToken = function(a, b, c, d) {
                var e = this,
                    g = /\t|&|<|>|( +)|([\x00-\x1f\x80-\xa0\xad\u1680\u180E\u2000-\u200f\u2028\u2029\u202F\u205F\u3000\uFEFF\uFFF9-\uFFFC])|[\u1100-\u115F\u11A3-\u11A7\u11FA-\u11FF\u2329-\u232A\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3000-\u303E\u3041-\u3096\u3099-\u30FF\u3105-\u312D\u3131-\u318E\u3190-\u31BA\u31C0-\u31E3\u31F0-\u321E\u3220-\u3247\u3250-\u32FE\u3300-\u4DBF\u4E00-\uA48C\uA490-\uA4C6\uA960-\uA97C\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFAFF\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE66\uFE68-\uFE6B\uFF01-\uFF60\uFFE0-\uFFE6]/g,
                    h = function(a, c, d, g, h) {
                        if (c) return e.showInvisibles ? "<span class='ace_invisible ace_invisible_space'>" + f.stringRepeat(e.SPACE_CHAR, a.length) + "</span>" : a;
                        if ("&" == a) return "&#38;";
                        if ("<" == a) return "&#60;";
                        if (">" == a) return "&#62;";
                        if ("	" == a) {
                            var i = e.session.getScreenTabSize(b + g);
                            return b += i - 1, e.$tabStrings[i]
                        }
                        if ("　" == a) {
                            var j = e.showInvisibles ? "ace_cjk ace_invisible ace_invisible_space" : "ace_cjk",
                                k = e.showInvisibles ? e.SPACE_CHAR : "";
                            return b += 1, "<span class='" + j + "' style='width:" + 2 * e.config.characterWidth + "px'>" + k + "</span>"
                        }
                        return d ? "<span class='ace_invisible ace_invisible_space ace_invalid'>" + e.SPACE_CHAR + "</span>" : (b += 1, "<span class='ace_cjk' style='width:" + 2 * e.config.characterWidth + "px'>" + a + "</span>")
                    },
                    i = d.replace(g, h);
                if (this.$textToken[c.type]) a.push(i);
                else {
                    var j = "ace_" + c.type.replace(/\./g, " ace_"),
                        k = "";
                    "fold" == c.type && (k = " style='width:" + c.value.length * this.config.characterWidth + "px;' "), a.push("<span class='", j, "'", k, ">", i, "</span>")
                }
                return b + d.length
            }, this.renderIndentGuide = function(a, b, c) {
                var d = b.search(this.$indentGuideRe);
                return 0 >= d || d >= c ? b : " " == b[0] ? (d -= d % this.tabSize, a.push(f.stringRepeat(this.$tabStrings[" "], d / this.tabSize)), b.substr(d)) : "	" == b[0] ? (a.push(f.stringRepeat(this.$tabStrings["	"], d)), b.substr(d)) : b
            }, this.$renderWrappedLine = function(a, b, c, d) {
                for (var e = 0, g = 0, h = c[0], i = 0, j = 0; j < b.length; j++) {
                    var k = b[j],
                        l = k.value;
                    if (0 == j && this.displayIndentGuides) {
                        if (e = l.length, l = this.renderIndentGuide(a, l, h), !l) continue;
                        e -= l.length
                    }
                    if (e + l.length < h) i = this.$renderToken(a, i, k, l), e += l.length;
                    else {
                        for (; e + l.length >= h;) i = this.$renderToken(a, i, k, l.substring(0, h - e)), l = l.substring(h - e), e = h, d || a.push("</div>", "<div class='ace_line' style='height:", this.config.lineHeight, "px'>"), a.push(f.stringRepeat(" ", c.indent)), g++, i = 0, h = c[g] || Number.MAX_VALUE;
                        0 != l.length && (e += l.length, i = this.$renderToken(a, i, k, l))
                    }
                }
            }, this.$renderSimpleLine = function(a, b) {
                var c = 0,
                    d = b[0],
                    e = d.value;
                this.displayIndentGuides && (e = this.renderIndentGuide(a, e)),
                    e && (c = this.$renderToken(a, c, d, e));
                for (var f = 1; f < b.length; f++) d = b[f], e = d.value, c = this.$renderToken(a, c, d, e)
            }, this.$renderLine = function(a, b, c, d) {
                if (d || 0 == d || (d = this.session.getFoldLine(b)), d) var e = this.$getFoldLineTokens(b, d);
                else var e = this.session.getTokens(b);
                if (c || a.push("<div class='ace_line' style='height:", this.config.lineHeight * (this.$useLineGroups() ? 1 : this.session.getRowLength(b)), "px'>"), e.length) {
                    var f = this.session.getRowSplitData(b);
                    f && f.length ? this.$renderWrappedLine(a, e, f, c) : this.$renderSimpleLine(a, e)
                }
                this.showInvisibles && (d && (b = d.end.row), a.push("<span class='ace_invisible ace_invisible_eol'>", b == this.session.getLength() - 1 ? this.EOF_CHAR : this.EOL_CHAR, "</span>")), c || a.push("</div>")
            }, this.$getFoldLineTokens = function(a, b) {
                function c(a, b, c) {
                    for (var d = 0, f = 0; f + a[d].value.length < b;)
                        if (f += a[d].value.length, d++, d == a.length) return;
                    if (f != b) {
                        var g = a[d].value.substring(b - f);
                        g.length > c - b && (g = g.substring(0, c - b)), e.push({
                            type: a[d].type,
                            value: g
                        }), f = b + g.length, d += 1
                    }
                    for (; c > f && d < a.length;) {
                        var g = a[d].value;
                        g.length + f > c ? e.push({
                            type: a[d].type,
                            value: g.substring(0, c - f)
                        }) : e.push(a[d]), f += g.length, d += 1
                    }
                }
                var d = this.session,
                    e = [],
                    f = d.getTokens(a);
                return b.walk(function(a, b, g, h, i) {
                    null != a ? e.push({
                        type: "fold",
                        value: a
                    }) : (i && (f = d.getTokens(b)), f.length && c(f, h, g))
                }, b.end.row, this.session.getLine(b.end.row).length), e
            }, this.$useLineGroups = function() {
                return this.session.getUseWrapMode()
            }, this.destroy = function() {
                clearInterval(this.$pollSizeChangesTimer), this.$measureNode && this.$measureNode.parentNode.removeChild(this.$measureNode), delete this.$measureNode
            }
        }).call(h.prototype), b.Text = h
    }), define("ace/layer/cursor", ["require", "exports", "module", "ace/lib/dom"], function(a, b, c) {
        "use strict";
        var d, e = a("../lib/dom"),
            f = function(a) {
                this.element = e.createElement("div"), this.element.className = "ace_layer ace_cursor-layer", a.appendChild(this.element), void 0 === d && (d = !("opacity" in this.element.style)), this.isVisible = !1, this.isBlinking = !0, this.blinkInterval = 1e3, this.smoothBlinking = !1, this.cursors = [], this.cursor = this.addCursor(), e.addCssClass(this.element, "ace_hidden-cursors"), this.$updateCursors = (d ? this.$updateVisibility : this.$updateOpacity).bind(this)
            };
        (function() {
            this.$updateVisibility = function(a) {
                for (var b = this.cursors, c = b.length; c--;) b[c].style.visibility = a ? "" : "hidden"
            }, this.$updateOpacity = function(a) {
                for (var b = this.cursors, c = b.length; c--;) b[c].style.opacity = a ? "" : "0"
            }, this.$padding = 0, this.setPadding = function(a) {
                this.$padding = a
            }, this.setSession = function(a) {
                this.session = a
            }, this.setBlinking = function(a) {
                a != this.isBlinking && (this.isBlinking = a, this.restartTimer())
            }, this.setBlinkInterval = function(a) {
                a != this.blinkInterval && (this.blinkInterval = a, this.restartTimer())
            }, this.setSmoothBlinking = function(a) {
                a == this.smoothBlinking || d || (this.smoothBlinking = a, e.setCssClass(this.element, "ace_smooth-blinking", a), this.$updateCursors(!0), this.$updateCursors = this.$updateOpacity.bind(this), this.restartTimer())
            }, this.addCursor = function() {
                var a = e.createElement("div");
                return a.className = "ace_cursor", this.element.appendChild(a), this.cursors.push(a), a
            }, this.removeCursor = function() {
                if (this.cursors.length > 1) {
                    var a = this.cursors.pop();
                    return a.parentNode.removeChild(a), a
                }
            }, this.hideCursor = function() {
                this.isVisible = !1, e.addCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
            }, this.showCursor = function() {
                this.isVisible = !0, e.removeCssClass(this.element, "ace_hidden-cursors"), this.restartTimer()
            }, this.restartTimer = function() {
                var a = this.$updateCursors;
                if (clearInterval(this.intervalId), clearTimeout(this.timeoutId), this.smoothBlinking && e.removeCssClass(this.element, "ace_smooth-blinking"), a(!0), this.isBlinking && this.blinkInterval && this.isVisible) {
                    this.smoothBlinking && setTimeout(function() {
                        e.addCssClass(this.element, "ace_smooth-blinking")
                    }.bind(this));
                    var b = function() {
                        this.timeoutId = setTimeout(function() {
                            a(!1)
                        }, .6 * this.blinkInterval)
                    }.bind(this);
                    this.intervalId = setInterval(function() {
                        a(!0), b()
                    }, this.blinkInterval), b()
                }
            }, this.getPixelPosition = function(a, b) {
                if (!this.config || !this.session) return {
                    left: 0,
                    top: 0
                };
                a || (a = this.session.selection.getCursor());
                var c = this.session.documentToScreenPosition(a),
                    d = this.$padding + c.column * this.config.characterWidth,
                    e = (c.row - (b ? this.config.firstRowScreen : 0)) * this.config.lineHeight;
                return {
                    left: d,
                    top: e
                }
            }, this.update = function(a) {
                this.config = a;
                var b = this.session.$selectionMarkers,
                    c = 0,
                    d = 0;
                (void 0 === b || 0 === b.length) && (b = [{
                    cursor: null
                }]);
                for (var c = 0, e = b.length; e > c; c++) {
                    var f = this.getPixelPosition(b[c].cursor, !0);
                    if (!((f.top > a.height + a.offset || f.top < 0) && c > 1)) {
                        var g = (this.cursors[d++] || this.addCursor()).style;
                        this.drawCursor ? this.drawCursor(g, f, a, b[c], this.session) : (g.left = f.left + "px", g.top = f.top + "px", g.width = a.characterWidth + "px", g.height = a.lineHeight + "px")
                    }
                }
                for (; this.cursors.length > d;) this.removeCursor();
                var h = this.session.getOverwrite();
                this.$setOverwrite(h), this.$pixelPos = f, this.restartTimer()
            }, this.drawCursor = null, this.$setOverwrite = function(a) {
                a != this.overwrite && (this.overwrite = a, a ? e.addCssClass(this.element, "ace_overwrite-cursors") : e.removeCssClass(this.element, "ace_overwrite-cursors"))
            }, this.destroy = function() {
                clearInterval(this.intervalId), clearTimeout(this.timeoutId)
            }
        }).call(f.prototype), b.Cursor = f
    }), define("ace/scrollbar", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/event", "ace/lib/event_emitter"], function(a, b, c) {
        "use strict";
        var d = a("./lib/oop"),
            e = a("./lib/dom"),
            f = a("./lib/event"),
            g = a("./lib/event_emitter").EventEmitter,
            h = function(a) {
                this.element = e.createElement("div"), this.element.className = "ace_scrollbar ace_scrollbar" + this.classSuffix, this.inner = e.createElement("div"), this.inner.className = "ace_scrollbar-inner", this.element.appendChild(this.inner), a.appendChild(this.element), this.setVisible(!1), this.skipEvent = !1, f.addListener(this.element, "scroll", this.onScroll.bind(this)), f.addListener(this.element, "mousedown", f.preventDefault)
            };
        (function() {
            d.implement(this, g), this.setVisible = function(a) {
                this.element.style.display = a ? "" : "none", this.isVisible = a
            }
        }).call(h.prototype);
        var i = function(a, b) {
            h.call(this, a), this.scrollTop = 0, b.$scrollbarWidth = this.width = e.scrollbarWidth(a.ownerDocument), this.inner.style.width = this.element.style.width = (this.width || 15) + 5 + "px"
        };
        d.inherits(i, h),
            function() {
                this.classSuffix = "-v", this.onScroll = function() {
                    this.skipEvent || (this.scrollTop = this.element.scrollTop, this._emit("scroll", {
                        data: this.scrollTop
                    })), this.skipEvent = !1
                }, this.getWidth = function() {
                    return this.isVisible ? this.width : 0
                }, this.setHeight = function(a) {
                    this.element.style.height = a + "px"
                }, this.setInnerHeight = function(a) {
                    this.inner.style.height = a + "px"
                }, this.setScrollHeight = function(a) {
                    this.inner.style.height = a + "px"
                }, this.setScrollTop = function(a) {
                    this.scrollTop != a && (this.skipEvent = !0, this.scrollTop = this.element.scrollTop = a)
                }
            }.call(i.prototype);
        var j = function(a, b) {
            h.call(this, a), this.scrollLeft = 0, this.height = b.$scrollbarWidth, this.inner.style.height = this.element.style.height = (this.height || 15) + 5 + "px"
        };
        d.inherits(j, h),
            function() {
                this.classSuffix = "-h", this.onScroll = function() {
                    this.skipEvent || (this.scrollLeft = this.element.scrollLeft, this._emit("scroll", {
                        data: this.scrollLeft
                    })), this.skipEvent = !1
                }, this.getHeight = function() {
                    return this.isVisible ? this.height : 0
                }, this.setWidth = function(a) {
                    this.element.style.width = a + "px"
                }, this.setInnerWidth = function(a) {
                    this.inner.style.width = a + "px"
                }, this.setScrollWidth = function(a) {
                    this.inner.style.width = a + "px"
                }, this.setScrollLeft = function(a) {
                    this.scrollLeft != a && (this.skipEvent = !0, this.scrollLeft = this.element.scrollLeft = a)
                }
            }.call(j.prototype), b.ScrollBar = i, b.ScrollBarV = i, b.ScrollBarH = j, b.VScrollBar = i, b.HScrollBar = j
    }), define("ace/renderloop", ["require", "exports", "module", "ace/lib/event"], function(a, b, c) {
        "use strict";
        var d = a("./lib/event"),
            e = function(a, b) {
                this.onRender = a, this.pending = !1, this.changes = 0, this.window = b || window
            };
        (function() {
            this.schedule = function(a) {
                if (this.changes = this.changes | a, !this.pending && this.changes) {
                    this.pending = !0;
                    var b = this;
                    d.nextFrame(function() {
                        b.pending = !1;
                        for (var a; a = b.changes;) b.changes = 0, b.onRender(a)
                    }, this.window)
                }
            }
        }).call(e.prototype), b.RenderLoop = e
    }), define("ace/layer/font_metrics", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/lib/lang", "ace/lib/useragent", "ace/lib/event_emitter"], function(a, b, c) {
        var d = a("../lib/oop"),
            e = a("../lib/dom"),
            f = a("../lib/lang"),
            g = a("../lib/useragent"),
            h = a("../lib/event_emitter").EventEmitter,
            i = 0,
            j = b.FontMetrics = function(a) {
                this.el = e.createElement("div"), this.$setMeasureNodeStyles(this.el.style, !0), this.$main = e.createElement("div"), this.$setMeasureNodeStyles(this.$main.style), this.$measureNode = e.createElement("div"), this.$setMeasureNodeStyles(this.$measureNode.style), this.el.appendChild(this.$main), this.el.appendChild(this.$measureNode), a.appendChild(this.el), i || this.$testFractionalRect(), this.$measureNode.innerHTML = f.stringRepeat("X", i), this.$characterSize = {
                    width: 0,
                    height: 0
                }, this.checkForSizeChanges()
            };
        (function() {
            d.implement(this, h), this.$characterSize = {
                width: 0,
                height: 0
            }, this.$testFractionalRect = function() {
                var a = e.createElement("div");
                this.$setMeasureNodeStyles(a.style), a.style.width = "0.2px", document.documentElement.appendChild(a);
                var b = a.getBoundingClientRect().width;
                i = b > 0 && 1 > b ? 50 : 100, a.parentNode.removeChild(a)
            }, this.$setMeasureNodeStyles = function(a, b) {
                a.width = a.height = "auto", a.left = a.top = "0px", a.visibility = "hidden", a.position = "absolute", a.whiteSpace = "pre", g.isIE < 8 ? a["font-family"] = "inherit" : a.font = "inherit", a.overflow = b ? "hidden" : "visible"
            }, this.checkForSizeChanges = function() {
                var a = this.$measureSizes();
                if (a && (this.$characterSize.width !== a.width || this.$characterSize.height !== a.height)) {
                    this.$measureNode.style.fontWeight = "bold";
                    var b = this.$measureSizes();
                    this.$measureNode.style.fontWeight = "", this.$characterSize = a, this.charSizes = Object.create(null), this.allowBoldFonts = b && b.width === a.width && b.height === a.height, this._emit("changeCharacterSize", {
                        data: a
                    })
                }
            }, this.$pollSizeChanges = function() {
                if (this.$pollSizeChangesTimer) return this.$pollSizeChangesTimer;
                var a = this;
                return this.$pollSizeChangesTimer = setInterval(function() {
                    a.checkForSizeChanges()
                }, 500)
            }, this.setPolling = function(a) {
                a ? this.$pollSizeChanges() : this.$pollSizeChangesTimer && (clearInterval(this.$pollSizeChangesTimer), this.$pollSizeChangesTimer = 0)
            }, this.$measureSizes = function() {
                if (50 === i) {
                    var a = null;
                    try {
                        a = this.$measureNode.getBoundingClientRect()
                    } catch (b) {
                        a = {
                            width: 0,
                            height: 0
                        }
                    }
                    var c = {
                        height: a.height,
                        width: a.width / i
                    }
                } else var c = {
                    height: this.$measureNode.clientHeight,
                    width: this.$measureNode.clientWidth / i
                };
                return 0 === c.width || 0 === c.height ? null : c
            }, this.$measureCharWidth = function(a) {
                this.$main.innerHTML = f.stringRepeat(a, i);
                var b = this.$main.getBoundingClientRect();
                return b.width / i
            }, this.getCharacterWidth = function(a) {
                var b = this.charSizes[a];
                return void 0 === b && (b = this.charSizes[a] = this.$measureCharWidth(a) / this.$characterSize.width), b
            }, this.destroy = function() {
                clearInterval(this.$pollSizeChangesTimer), this.el && this.el.parentNode && this.el.parentNode.removeChild(this.el)
            }
        }).call(j.prototype)
    }), define("ace/virtual_renderer", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/config", "ace/lib/useragent", "ace/layer/gutter", "ace/layer/marker", "ace/layer/text", "ace/layer/cursor", "ace/scrollbar", "ace/scrollbar", "ace/renderloop", "ace/layer/font_metrics", "ace/lib/event_emitter"], function(a, b, c) {
        "use strict";
        var d = a("./lib/oop"),
            e = a("./lib/dom"),
            f = a("./config"),
            g = a("./lib/useragent"),
            h = a("./layer/gutter").Gutter,
            i = a("./layer/marker").Marker,
            j = a("./layer/text").Text,
            k = a("./layer/cursor").Cursor,
            l = a("./scrollbar").HScrollBar,
            m = a("./scrollbar").VScrollBar,
            n = a("./renderloop").RenderLoop,
            o = a("./layer/font_metrics").FontMetrics,
            p = a("./lib/event_emitter").EventEmitter,
            q = '.ace_editor {position: relative;overflow: hidden;font: 12px/normal \'Monaco\', \'Menlo\', \'Ubuntu Mono\', \'Consolas\', \'source-code-pro\', monospace;direction: ltr;}.ace_scroller {position: absolute;overflow: hidden;top: 0;bottom: 0;background-color: inherit;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;cursor: text;}.ace_content {position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;min-width: 100%;}.ace_dragging .ace_scroller:before{position: absolute;top: 0;left: 0;right: 0;bottom: 0;content: \'\';background: rgba(250, 250, 250, 0.01);z-index: 1000;}.ace_dragging.ace_dark .ace_scroller:before{background: rgba(0, 0, 0, 0.01);}.ace_selecting, .ace_selecting * {cursor: text !important;}.ace_gutter {position: absolute;overflow : hidden;width: auto;top: 0;bottom: 0;left: 0;cursor: default;z-index: 4;-ms-user-select: none;-moz-user-select: none;-webkit-user-select: none;user-select: none;}.ace_gutter-active-line {position: absolute;left: 0;right: 0;}.ace_scroller.ace_scroll-left {box-shadow: 17px 0 16px -16px rgba(0, 0, 0, 0.4) inset;}.ace_gutter-cell {padding-left: 19px;padding-right: 6px;background-repeat: no-repeat;}.ace_gutter-cell.ace_error {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAABOFBMVEX/////////QRswFAb/Ui4wFAYwFAYwFAaWGAfDRymzOSH/PxswFAb/SiUwFAYwFAbUPRvjQiDllog5HhHdRybsTi3/Tyv9Tir+Syj/UC3////XurebMBIwFAb/RSHbPx/gUzfdwL3kzMivKBAwFAbbvbnhPx66NhowFAYwFAaZJg8wFAaxKBDZurf/RB6mMxb/SCMwFAYwFAbxQB3+RB4wFAb/Qhy4Oh+4QifbNRcwFAYwFAYwFAb/QRzdNhgwFAYwFAbav7v/Uy7oaE68MBK5LxLewr/r2NXewLswFAaxJw4wFAbkPRy2PyYwFAaxKhLm1tMwFAazPiQwFAaUGAb/QBrfOx3bvrv/VC/maE4wFAbRPBq6MRO8Qynew8Dp2tjfwb0wFAbx6eju5+by6uns4uH9/f36+vr/GkHjAAAAYnRSTlMAGt+64rnWu/bo8eAA4InH3+DwoN7j4eLi4xP99Nfg4+b+/u9B/eDs1MD1mO7+4PHg2MXa347g7vDizMLN4eG+Pv7i5evs/v79yu7S3/DV7/498Yv24eH+4ufQ3Ozu/v7+y13sRqwAAADLSURBVHjaZc/XDsFgGIBhtDrshlitmk2IrbHFqL2pvXf/+78DPokj7+Fz9qpU/9UXJIlhmPaTaQ6QPaz0mm+5gwkgovcV6GZzd5JtCQwgsxoHOvJO15kleRLAnMgHFIESUEPmawB9ngmelTtipwwfASilxOLyiV5UVUyVAfbG0cCPHig+GBkzAENHS0AstVF6bacZIOzgLmxsHbt2OecNgJC83JERmePUYq8ARGkJx6XtFsdddBQgZE2nPR6CICZhawjA4Fb/chv+399kfR+MMMDGOQAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: 2px center;}.ace_gutter-cell.ace_warning {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAAmVBMVEX///8AAAD///8AAAAAAABPSzb/5sAAAAB/blH/73z/ulkAAAAAAAD85pkAAAAAAAACAgP/vGz/rkDerGbGrV7/pkQICAf////e0IsAAAD/oED/qTvhrnUAAAD/yHD/njcAAADuv2r/nz//oTj/p064oGf/zHAAAAA9Nir/tFIAAAD/tlTiuWf/tkIAAACynXEAAAAAAAAtIRW7zBpBAAAAM3RSTlMAABR1m7RXO8Ln31Z36zT+neXe5OzooRDfn+TZ4p3h2hTf4t3k3ucyrN1K5+Xaks52Sfs9CXgrAAAAjklEQVR42o3PbQ+CIBQFYEwboPhSYgoYunIqqLn6/z8uYdH8Vmdnu9vz4WwXgN/xTPRD2+sgOcZjsge/whXZgUaYYvT8QnuJaUrjrHUQreGczuEafQCO/SJTufTbroWsPgsllVhq3wJEk2jUSzX3CUEDJC84707djRc5MTAQxoLgupWRwW6UB5fS++NV8AbOZgnsC7BpEAAAAABJRU5ErkJggg==");background-position: 2px center;}.ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAAAAAA6mKC9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAAJ0Uk5TAAB2k804AAAAPklEQVQY02NgIB68QuO3tiLznjAwpKTgNyDbMegwisCHZUETUZV0ZqOquBpXj2rtnpSJT1AEnnRmL2OgGgAAIKkRQap2htgAAAAASUVORK5CYII=");background-position: 2px center;}.ace_dark .ace_gutter-cell.ace_info {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQBAMAAADt3eJSAAAAJFBMVEUAAAChoaGAgIAqKiq+vr6tra1ZWVmUlJSbm5s8PDxubm56enrdgzg3AAAAAXRSTlMAQObYZgAAAClJREFUeNpjYMAPdsMYHegyJZFQBlsUlMFVCWUYKkAZMxZAGdxlDMQBAG+TBP4B6RyJAAAAAElFTkSuQmCC");}.ace_scrollbar {position: absolute;right: 0;bottom: 0;z-index: 6;}.ace_scrollbar-inner {position: absolute;cursor: text;left: 0;top: 0;}.ace_scrollbar-v{overflow-x: hidden;overflow-y: scroll;top: 0;}.ace_scrollbar-h {overflow-x: scroll;overflow-y: hidden;left: 0;}.ace_print-margin {position: absolute;height: 100%;}.ace_text-input {position: absolute;z-index: 0;width: 0.5em;height: 1em;opacity: 0;background: transparent;-moz-appearance: none;appearance: none;border: none;resize: none;outline: none;overflow: hidden;font: inherit;padding: 0 1px;margin: 0 -1px;text-indent: -1em;-ms-user-select: text;-moz-user-select: text;-webkit-user-select: text;user-select: text;white-space: pre!important;}.ace_text-input.ace_composition {background: inherit;color: inherit;z-index: 1000;opacity: 1;text-indent: 0;}.ace_layer {z-index: 1;position: absolute;overflow: hidden;word-wrap: normal;white-space: pre;height: 100%;width: 100%;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;pointer-events: none;}.ace_gutter-layer {position: relative;width: auto;text-align: right;pointer-events: auto;}.ace_text-layer {font: inherit !important;}.ace_cjk {display: inline-block;text-align: center;}.ace_cursor-layer {z-index: 4;}.ace_cursor {z-index: 4;position: absolute;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;border-left: 2px solid;transform: translatez(0);}.ace_slim-cursors .ace_cursor {border-left-width: 1px;}.ace_overwrite-cursors .ace_cursor {border-left-width: 0;border-bottom: 1px solid;}.ace_hidden-cursors .ace_cursor {opacity: 0.2;}.ace_smooth-blinking .ace_cursor {-webkit-transition: opacity 0.18s;transition: opacity 0.18s;}.ace_editor.ace_multiselect .ace_cursor {border-left-width: 1px;}.ace_marker-layer .ace_step, .ace_marker-layer .ace_stack {position: absolute;z-index: 3;}.ace_marker-layer .ace_selection {position: absolute;z-index: 5;}.ace_marker-layer .ace_bracket {position: absolute;z-index: 6;}.ace_marker-layer .ace_active-line {position: absolute;z-index: 2;}.ace_marker-layer .ace_selected-word {position: absolute;z-index: 4;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;}.ace_line .ace_fold {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;display: inline-block;height: 11px;margin-top: -2px;vertical-align: middle;background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACJJREFUeNpi+P//fxgTAwPDBxDxD078RSX+YeEyDFMCIMAAI3INmXiwf2YAAAAASUVORK5CYII=");background-repeat: no-repeat, repeat-x;background-position: center center, top left;color: transparent;border: 1px solid black;border-radius: 2px;cursor: pointer;pointer-events: auto;}.ace_dark .ace_fold {}.ace_fold:hover{background-image:url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAJCAYAAADU6McMAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAJpJREFUeNpi/P//PwOlgAXGYGRklAVSokD8GmjwY1wasKljQpYACtpCFeADcHVQfQyMQAwzwAZI3wJKvCLkfKBaMSClBlR7BOQikCFGQEErIH0VqkabiGCAqwUadAzZJRxQr/0gwiXIal8zQQPnNVTgJ1TdawL0T5gBIP1MUJNhBv2HKoQHHjqNrA4WO4zY0glyNKLT2KIfIMAAQsdgGiXvgnYAAAAASUVORK5CYII="),url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAA3CAYAAADNNiA5AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAACBJREFUeNpi+P//fz4TAwPDZxDxD5X4i5fLMEwJgAADAEPVDbjNw87ZAAAAAElFTkSuQmCC");}.ace_tooltip {background-color: #FFF;background-image: -webkit-linear-gradient(top, transparent, rgba(0, 0, 0, 0.1));background-image: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.1));border: 1px solid gray;border-radius: 1px;box-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);color: black;max-width: 100%;padding: 3px 4px;position: fixed;z-index: 999999;-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;cursor: default;white-space: pre;word-wrap: break-word;line-height: normal;font-style: normal;font-weight: normal;letter-spacing: normal;pointer-events: none;}.ace_folding-enabled > .ace_gutter-cell {padding-right: 13px;}.ace_fold-widget {-moz-box-sizing: border-box;-webkit-box-sizing: border-box;box-sizing: border-box;margin: 0 -12px 0 1px;display: none;width: 11px;vertical-align: top;background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42mWKsQ0AMAzC8ixLlrzQjzmBiEjp0A6WwBCSPgKAXoLkqSot7nN3yMwR7pZ32NzpKkVoDBUxKAAAAABJRU5ErkJggg==");background-repeat: no-repeat;background-position: center;border-radius: 3px;border: 1px solid transparent;cursor: pointer;}.ace_folding-enabled .ace_fold-widget {display: inline-block;   }.ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAANElEQVR42m3HwQkAMAhD0YzsRchFKI7sAikeWkrxwScEB0nh5e7KTPWimZki4tYfVbX+MNl4pyZXejUO1QAAAABJRU5ErkJggg==");}.ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAGCAYAAAAG5SQMAAAAOUlEQVR42jXKwQkAMAgDwKwqKD4EwQ26sSOkVWjgIIHAzPiCgaqiqnJHZnKICBERHN194O5b9vbLuAVRL+l0YWnZAAAAAElFTkSuQmCCXA==");}.ace_fold-widget:hover {border: 1px solid rgba(0, 0, 0, 0.3);background-color: rgba(255, 255, 255, 0.2);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);}.ace_fold-widget:active {border: 1px solid rgba(0, 0, 0, 0.4);background-color: rgba(0, 0, 0, 0.05);box-shadow: 0 1px 1px rgba(255, 255, 255, 0.8);}.ace_dark .ace_fold-widget {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHklEQVQIW2P4//8/AzoGEQ7oGCaLLAhWiSwB146BAQCSTPYocqT0AAAAAElFTkSuQmCC");}.ace_dark .ace_fold-widget.ace_end {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAH0lEQVQIW2P4//8/AxQ7wNjIAjDMgC4AxjCVKBirIAAF0kz2rlhxpAAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget.ace_closed {background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAFCAYAAACAcVaiAAAAHElEQVQIW2P4//+/AxAzgDADlOOAznHAKgPWAwARji8UIDTfQQAAAABJRU5ErkJggg==");}.ace_dark .ace_fold-widget:hover {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);background-color: rgba(255, 255, 255, 0.1);}.ace_dark .ace_fold-widget:active {box-shadow: 0 1px 1px rgba(255, 255, 255, 0.2);}.ace_fold-widget.ace_invalid {background-color: #FFB4B4;border-color: #DE5555;}.ace_fade-fold-widgets .ace_fold-widget {-webkit-transition: opacity 0.4s ease 0.05s;transition: opacity 0.4s ease 0.05s;opacity: 0;}.ace_fade-fold-widgets:hover .ace_fold-widget {-webkit-transition: opacity 0.05s ease 0.05s;transition: opacity 0.05s ease 0.05s;opacity:1;}.ace_underline {text-decoration: underline;}.ace_bold {font-weight: bold;}.ace_nobold .ace_bold {font-weight: normal;}.ace_italic {font-style: italic;}.ace_error-marker {background-color: rgba(255, 0, 0,0.2);position: absolute;z-index: 9;}.ace_highlight-marker {background-color: rgba(255, 255, 0,0.2);position: absolute;z-index: 8;}.ace_br1 {border-top-left-radius    : 3px;}.ace_br2 {border-top-right-radius   : 3px;}.ace_br3 {border-top-left-radius    : 3px; border-top-right-radius:    3px;}.ace_br4 {border-bottom-right-radius: 3px;}.ace_br5 {border-top-left-radius    : 3px; border-bottom-right-radius: 3px;}.ace_br6 {border-top-right-radius   : 3px; border-bottom-right-radius: 3px;}.ace_br7 {border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px;}.ace_br8 {border-bottom-left-radius : 3px;}.ace_br9 {border-top-left-radius    : 3px; border-bottom-left-radius:  3px;}.ace_br10{border-top-right-radius   : 3px; border-bottom-left-radius:  3px;}.ace_br11{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-left-radius:  3px;}.ace_br12{border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br13{border-top-left-radius    : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br14{border-top-right-radius   : 3px; border-bottom-right-radius: 3px; border-bottom-left-radius:  3px;}.ace_br15{border-top-left-radius    : 3px; border-top-right-radius:    3px; border-bottom-right-radius: 3px; border-bottom-left-radius: 3px;}';
        e.importCssString(q, "ace_editor.css");
        var r = function(a, b) {
            var c = this;
            this.container = a || e.createElement("div"), this.$keepTextAreaAtCursor = !g.isOldIE, e.addCssClass(this.container, "ace_editor"), this.setTheme(b), this.$gutter = e.createElement("div"), this.$gutter.className = "ace_gutter", this.container.appendChild(this.$gutter), this.scroller = e.createElement("div"), this.scroller.className = "ace_scroller", this.container.appendChild(this.scroller), this.content = e.createElement("div"), this.content.className = "ace_content", this.scroller.appendChild(this.content), this.$gutterLayer = new h(this.$gutter), this.$gutterLayer.on("changeGutterWidth", this.onGutterResize.bind(this)), this.$markerBack = new i(this.content);
            var d = this.$textLayer = new j(this.content);
            this.canvas = d.element, this.$markerFront = new i(this.content), this.$cursorLayer = new k(this.content), this.$horizScroll = !1, this.$vScroll = !1, this.scrollBar = this.scrollBarV = new m(this.container, this), this.scrollBarH = new l(this.container, this), this.scrollBarV.addEventListener("scroll", function(a) {
                c.$scrollAnimation || c.session.setScrollTop(a.data - c.scrollMargin.top)
            }), this.scrollBarH.addEventListener("scroll", function(a) {
                c.$scrollAnimation || c.session.setScrollLeft(a.data - c.scrollMargin.left)
            }), this.scrollTop = 0, this.scrollLeft = 0, this.cursorPos = {
                row: 0,
                column: 0
            }, this.$fontMetrics = new o(this.container), this.$textLayer.$setFontMetrics(this.$fontMetrics), this.$textLayer.addEventListener("changeCharacterSize", function(a) {
                c.updateCharacterSize(), c.onResize(!0, c.gutterWidth, c.$size.width, c.$size.height), c._signal("changeCharacterSize", a)
            }), this.$size = {
                width: 0,
                height: 0,
                scrollerHeight: 0,
                scrollerWidth: 0,
                $dirty: !0
            }, this.layerConfig = {
                width: 1,
                padding: 0,
                firstRow: 0,
                firstRowScreen: 0,
                lastRow: 0,
                lineHeight: 0,
                characterWidth: 0,
                minHeight: 1,
                maxHeight: 1,
                offset: 0,
                height: 1,
                gutterOffset: 1
            }, this.scrollMargin = {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                v: 0,
                h: 0
            }, this.$loop = new n(this.$renderChanges.bind(this), this.container.ownerDocument.defaultView), this.$loop.schedule(this.CHANGE_FULL), this.updateCharacterSize(), this.setPadding(4), f.resetOptions(this), f._emit("renderer", this)
        };
        (function() {
            this.CHANGE_CURSOR = 1, this.CHANGE_MARKER = 2, this.CHANGE_GUTTER = 4, this.CHANGE_SCROLL = 8, this.CHANGE_LINES = 16, this.CHANGE_TEXT = 32, this.CHANGE_SIZE = 64, this.CHANGE_MARKER_BACK = 128, this.CHANGE_MARKER_FRONT = 256, this.CHANGE_FULL = 512, this.CHANGE_H_SCROLL = 1024, d.implement(this, p), this.updateCharacterSize = function() {
                this.$textLayer.allowBoldFonts != this.$allowBoldFonts && (this.$allowBoldFonts = this.$textLayer.allowBoldFonts, this.setStyle("ace_nobold", !this.$allowBoldFonts)), this.layerConfig.characterWidth = this.characterWidth = this.$textLayer.getCharacterWidth(), this.layerConfig.lineHeight = this.lineHeight = this.$textLayer.getLineHeight(), this.$updatePrintMargin()
            }, this.setSession = function(a) {
                this.session && this.session.doc.off("changeNewLineMode", this.onChangeNewLineMode), this.session = a, a && this.scrollMargin.top && a.getScrollTop() <= 0 && a.setScrollTop(-this.scrollMargin.top), this.$cursorLayer.setSession(a), this.$markerBack.setSession(a), this.$markerFront.setSession(a), this.$gutterLayer.setSession(a), this.$textLayer.setSession(a), a && (this.$loop.schedule(this.CHANGE_FULL), this.session.$setFontMetrics(this.$fontMetrics), this.onChangeNewLineMode = this.onChangeNewLineMode.bind(this), this.onChangeNewLineMode(), this.session.doc.on("changeNewLineMode", this.onChangeNewLineMode))
            }, this.updateLines = function(a, b, c) {
                if (void 0 === b && (b = 1 / 0), this.$changedLines ? (this.$changedLines.firstRow > a && (this.$changedLines.firstRow = a), this.$changedLines.lastRow < b && (this.$changedLines.lastRow = b)) : this.$changedLines = {
                        firstRow: a,
                        lastRow: b
                    }, this.$changedLines.lastRow < this.layerConfig.firstRow) {
                    if (!c) return;
                    this.$changedLines.lastRow = this.layerConfig.lastRow
                }
                this.$changedLines.firstRow > this.layerConfig.lastRow || this.$loop.schedule(this.CHANGE_LINES)
            }, this.onChangeNewLineMode = function() {
                this.$loop.schedule(this.CHANGE_TEXT), this.$textLayer.$updateEolChar()
            }, this.onChangeTabSize = function() {
                this.$loop.schedule(this.CHANGE_TEXT | this.CHANGE_MARKER), this.$textLayer.onChangeTabSize()
            }, this.updateText = function() {
                this.$loop.schedule(this.CHANGE_TEXT)
            }, this.updateFull = function(a) {
                a ? this.$renderChanges(this.CHANGE_FULL, !0) : this.$loop.schedule(this.CHANGE_FULL)
            }, this.updateFontSize = function() {
                this.$textLayer.checkForSizeChanges()
            }, this.$changes = 0, this.$updateSizeAsync = function() {
                this.$loop.pending ? this.$size.$dirty = !0 : this.onResize()
            }, this.onResize = function(a, b, c, d) {
                if (!(this.resizing > 2)) {
                    this.resizing > 0 ? this.resizing++ : this.resizing = a ? 1 : 0;
                    var e = this.container;
                    d || (d = e.clientHeight || e.scrollHeight), c || (c = e.clientWidth || e.scrollWidth);
                    var f = this.$updateCachedSize(a, b, c, d);
                    if (!this.$size.scrollerHeight || !c && !d) return this.resizing = 0;
                    a && (this.$gutterLayer.$padding = null), a ? this.$renderChanges(f | this.$changes, !0) : this.$loop.schedule(f | this.$changes), this.resizing && (this.resizing = 0), this.scrollBarV.scrollLeft = this.scrollBarV.scrollTop = null
                }
            }, this.$updateCachedSize = function(a, b, c, d) {
                d -= this.$extraHeight || 0;
                var e = 0,
                    f = this.$size,
                    g = {
                        width: f.width,
                        height: f.height,
                        scrollerHeight: f.scrollerHeight,
                        scrollerWidth: f.scrollerWidth
                    };
                return d && (a || f.height != d) && (f.height = d, e |= this.CHANGE_SIZE, f.scrollerHeight = f.height, this.$horizScroll && (f.scrollerHeight -= this.scrollBarH.getHeight()), this.scrollBarV.element.style.bottom = this.scrollBarH.getHeight() + "px", e |= this.CHANGE_SCROLL), c && (a || f.width != c) && (e |= this.CHANGE_SIZE, f.width = c, null == b && (b = this.$showGutter ? this.$gutter.offsetWidth : 0), this.gutterWidth = b, this.scrollBarH.element.style.left = this.scroller.style.left = b + "px", f.scrollerWidth = Math.max(0, c - b - this.scrollBarV.getWidth()), this.scrollBarH.element.style.right = this.scroller.style.right = this.scrollBarV.getWidth() + "px", this.scroller.style.bottom = this.scrollBarH.getHeight() + "px", (this.session && this.session.getUseWrapMode() && this.adjustWrapLimit() || a) && (e |= this.CHANGE_FULL)), f.$dirty = !c || !d, e && this._signal("resize", g), e
            }, this.onGutterResize = function() {
                var a = this.$showGutter ? this.$gutter.offsetWidth : 0;
                a != this.gutterWidth && (this.$changes |= this.$updateCachedSize(!0, a, this.$size.width, this.$size.height)), this.session.getUseWrapMode() && this.adjustWrapLimit() ? this.$loop.schedule(this.CHANGE_FULL) : this.$size.$dirty ? this.$loop.schedule(this.CHANGE_FULL) : (this.$computeLayerConfig(), this.$loop.schedule(this.CHANGE_MARKER))
            }, this.adjustWrapLimit = function() {
                var a = this.$size.scrollerWidth - 2 * this.$padding,
                    b = Math.floor(a / this.characterWidth);
                return this.session.adjustWrapLimit(b, this.$showPrintMargin && this.$printMarginColumn)
            }, this.setAnimatedScroll = function(a) {
                this.setOption("animatedScroll", a)
            }, this.getAnimatedScroll = function() {
                return this.$animatedScroll
            }, this.setShowInvisibles = function(a) {
                this.setOption("showInvisibles", a)
            }, this.getShowInvisibles = function() {
                return this.getOption("showInvisibles")
            }, this.getDisplayIndentGuides = function() {
                return this.getOption("displayIndentGuides")
            }, this.setDisplayIndentGuides = function(a) {
                this.setOption("displayIndentGuides", a)
            }, this.setShowPrintMargin = function(a) {
                this.setOption("showPrintMargin", a)
            }, this.getShowPrintMargin = function() {
                return this.getOption("showPrintMargin")
            }, this.setPrintMarginColumn = function(a) {
                this.setOption("printMarginColumn", a)
            }, this.getPrintMarginColumn = function() {
                return this.getOption("printMarginColumn")
            }, this.getShowGutter = function() {
                return this.getOption("showGutter")
            }, this.setShowGutter = function(a) {
                return this.setOption("showGutter", a)
            }, this.getFadeFoldWidgets = function() {
                return this.getOption("fadeFoldWidgets")
            }, this.setFadeFoldWidgets = function(a) {
                this.setOption("fadeFoldWidgets", a)
            }, this.setHighlightGutterLine = function(a) {
                this.setOption("highlightGutterLine", a)
            }, this.getHighlightGutterLine = function() {
                return this.getOption("highlightGutterLine")
            }, this.$updateGutterLineHighlight = function() {
                var a = this.$cursorLayer.$pixelPos,
                    b = this.layerConfig.lineHeight;
                if (this.session.getUseWrapMode()) {
                    var c = this.session.selection.getCursor();
                    c.column = 0, a = this.$cursorLayer.getPixelPosition(c, !0), b *= this.session.getRowLength(c.row)
                }
                this.$gutterLineHighlight.style.top = a.top - this.layerConfig.offset + "px", this.$gutterLineHighlight.style.height = b + "px"
            }, this.$updatePrintMargin = function() {
                if (this.$showPrintMargin || this.$printMarginEl) {
                    if (!this.$printMarginEl) {
                        var a = e.createElement("div");
                        a.className = "ace_layer ace_print-margin-layer", this.$printMarginEl = e.createElement("div"), this.$printMarginEl.className = "ace_print-margin", a.appendChild(this.$printMarginEl),
                            this.content.insertBefore(a, this.content.firstChild)
                    }
                    var b = this.$printMarginEl.style;
                    b.left = this.characterWidth * this.$printMarginColumn + this.$padding + "px", b.visibility = this.$showPrintMargin ? "visible" : "hidden", this.session && -1 == this.session.$wrap && this.adjustWrapLimit()
                }
            }, this.getContainerElement = function() {
                return this.container
            }, this.getMouseEventTarget = function() {
                return this.scroller
            }, this.getTextAreaContainer = function() {
                return this.container
            }, this.$moveTextAreaToCursor = function() {
                if (this.$keepTextAreaAtCursor) {
                    var a = this.layerConfig,
                        b = this.$cursorLayer.$pixelPos.top,
                        c = this.$cursorLayer.$pixelPos.left;
                    b -= a.offset;
                    var d = this.textarea.style,
                        e = this.lineHeight;
                    if (0 > b || b > a.height - e) return void(d.top = d.left = "0");
                    var f = this.characterWidth;
                    if (this.$composition) {
                        var g = this.textarea.value.replace(/^\x01+/, "");
                        f *= this.session.$getStringScreenWidth(g)[0] + 2, e += 2
                    }
                    c -= this.scrollLeft, c > this.$size.scrollerWidth - f && (c = this.$size.scrollerWidth - f), c += this.gutterWidth, d.height = e + "px", d.width = f + "px", d.left = Math.min(c, this.$size.scrollerWidth - f) + "px", d.top = Math.min(b, this.$size.height - e) + "px"
                }
            }, this.getFirstVisibleRow = function() {
                return this.layerConfig.firstRow
            }, this.getFirstFullyVisibleRow = function() {
                return this.layerConfig.firstRow + (0 === this.layerConfig.offset ? 0 : 1)
            }, this.getLastFullyVisibleRow = function() {
                var a = this.layerConfig,
                    b = a.lastRow,
                    c = this.session.documentToScreenRow(b, 0) * a.lineHeight;
                return c - this.session.getScrollTop() > a.height - a.lineHeight ? b - 1 : b
            }, this.getLastVisibleRow = function() {
                return this.layerConfig.lastRow
            }, this.$padding = null, this.setPadding = function(a) {
                this.$padding = a, this.$textLayer.setPadding(a), this.$cursorLayer.setPadding(a), this.$markerFront.setPadding(a), this.$markerBack.setPadding(a), this.$loop.schedule(this.CHANGE_FULL), this.$updatePrintMargin()
            }, this.setScrollMargin = function(a, b, c, d) {
                var e = this.scrollMargin;
                e.top = 0 | a, e.bottom = 0 | b, e.right = 0 | d, e.left = 0 | c, e.v = e.top + e.bottom, e.h = e.left + e.right, e.top && this.scrollTop <= 0 && this.session && this.session.setScrollTop(-e.top), this.updateFull()
            }, this.getHScrollBarAlwaysVisible = function() {
                return this.$hScrollBarAlwaysVisible
            }, this.setHScrollBarAlwaysVisible = function(a) {
                this.setOption("hScrollBarAlwaysVisible", a)
            }, this.getVScrollBarAlwaysVisible = function() {
                return this.$vScrollBarAlwaysVisible
            }, this.setVScrollBarAlwaysVisible = function(a) {
                this.setOption("vScrollBarAlwaysVisible", a)
            }, this.$updateScrollBarV = function() {
                var a = this.layerConfig.maxHeight,
                    b = this.$size.scrollerHeight;
                !this.$maxLines && this.$scrollPastEnd && (a -= (b - this.lineHeight) * this.$scrollPastEnd, this.scrollTop > a - b && (a = this.scrollTop + b, this.scrollBarV.scrollTop = null)), this.scrollBarV.setScrollHeight(a + this.scrollMargin.v), this.scrollBarV.setScrollTop(this.scrollTop + this.scrollMargin.top)
            }, this.$updateScrollBarH = function() {
                this.scrollBarH.setScrollWidth(this.layerConfig.width + 2 * this.$padding + this.scrollMargin.h), this.scrollBarH.setScrollLeft(this.scrollLeft + this.scrollMargin.left)
            }, this.$frozen = !1, this.freeze = function() {
                this.$frozen = !0
            }, this.unfreeze = function() {
                this.$frozen = !1
            }, this.$renderChanges = function(a, b) {
                if (this.$changes && (a |= this.$changes, this.$changes = 0), !this.session || !this.container.offsetWidth || this.$frozen || !a && !b) return void(this.$changes |= a);
                if (this.$size.$dirty) return this.$changes |= a, this.onResize(!0);
                this.lineHeight || this.$textLayer.checkForSizeChanges(), this._signal("beforeRender");
                var c = this.layerConfig;
                if (a & this.CHANGE_FULL || a & this.CHANGE_SIZE || a & this.CHANGE_TEXT || a & this.CHANGE_LINES || a & this.CHANGE_SCROLL || a & this.CHANGE_H_SCROLL) {
                    if (a |= this.$computeLayerConfig(), c.firstRow != this.layerConfig.firstRow && c.firstRowScreen == this.layerConfig.firstRowScreen) {
                        var d = this.scrollTop + (c.firstRow - this.layerConfig.firstRow) * this.lineHeight;
                        d > 0 && (this.scrollTop = d, a |= this.CHANGE_SCROLL, a |= this.$computeLayerConfig())
                    }
                    c = this.layerConfig, this.$updateScrollBarV(), a & this.CHANGE_H_SCROLL && this.$updateScrollBarH(), this.$gutterLayer.element.style.marginTop = -c.offset + "px", this.content.style.marginTop = -c.offset + "px", this.content.style.width = c.width + 2 * this.$padding + "px", this.content.style.height = c.minHeight + "px"
                }
                return a & this.CHANGE_H_SCROLL && (this.content.style.marginLeft = -this.scrollLeft + "px", this.scroller.className = this.scrollLeft <= 0 ? "ace_scroller" : "ace_scroller ace_scroll-left"), a & this.CHANGE_FULL ? (this.$textLayer.update(c), this.$showGutter && this.$gutterLayer.update(c), this.$markerBack.update(c), this.$markerFront.update(c), this.$cursorLayer.update(c), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight(), void this._signal("afterRender")) : a & this.CHANGE_SCROLL ? (a & this.CHANGE_TEXT || a & this.CHANGE_LINES ? this.$textLayer.update(c) : this.$textLayer.scrollLines(c), this.$showGutter && this.$gutterLayer.update(c), this.$markerBack.update(c), this.$markerFront.update(c), this.$cursorLayer.update(c), this.$highlightGutterLine && this.$updateGutterLineHighlight(), this.$moveTextAreaToCursor(), void this._signal("afterRender")) : (a & this.CHANGE_TEXT ? (this.$textLayer.update(c), this.$showGutter && this.$gutterLayer.update(c)) : a & this.CHANGE_LINES ? (this.$updateLines() || a & this.CHANGE_GUTTER && this.$showGutter) && this.$gutterLayer.update(c) : (a & this.CHANGE_TEXT || a & this.CHANGE_GUTTER) && this.$showGutter && this.$gutterLayer.update(c), a & this.CHANGE_CURSOR && (this.$cursorLayer.update(c), this.$moveTextAreaToCursor(), this.$highlightGutterLine && this.$updateGutterLineHighlight()), a & (this.CHANGE_MARKER | this.CHANGE_MARKER_FRONT) && this.$markerFront.update(c), a & (this.CHANGE_MARKER | this.CHANGE_MARKER_BACK) && this.$markerBack.update(c), void this._signal("afterRender"))
            }, this.$autosize = function() {
                var a = this.session.getScreenLength() * this.lineHeight,
                    b = this.$maxLines * this.lineHeight,
                    c = Math.max((this.$minLines || 1) * this.lineHeight, Math.min(b, a)) + this.scrollMargin.v + (this.$extraHeight || 0);
                this.$horizScroll && (c += this.scrollBarH.getHeight());
                var d = a > b;
                if (c != this.desiredHeight || this.$size.height != this.desiredHeight || d != this.$vScroll) {
                    d != this.$vScroll && (this.$vScroll = d, this.scrollBarV.setVisible(d));
                    var e = this.container.clientWidth;
                    this.container.style.height = c + "px", this.$updateCachedSize(!0, this.$gutterWidth, e, c), this.desiredHeight = c, this._signal("autosize")
                }
            }, this.$computeLayerConfig = function() {
                var a = this.session,
                    b = this.$size,
                    c = b.height <= 2 * this.lineHeight,
                    d = this.session.getScreenLength(),
                    e = d * this.lineHeight,
                    f = this.$getLongestLine(),
                    g = !c && (this.$hScrollBarAlwaysVisible || b.scrollerWidth - f - 2 * this.$padding < 0),
                    h = this.$horizScroll !== g;
                h && (this.$horizScroll = g, this.scrollBarH.setVisible(g));
                var i = this.$vScroll;
                this.$maxLines && this.lineHeight > 1 && this.$autosize();
                var j = this.scrollTop % this.lineHeight,
                    k = b.scrollerHeight + this.lineHeight,
                    l = !this.$maxLines && this.$scrollPastEnd ? (b.scrollerHeight - this.lineHeight) * this.$scrollPastEnd : 0;
                e += l;
                var m = this.scrollMargin;
                this.session.setScrollTop(Math.max(-m.top, Math.min(this.scrollTop, e - b.scrollerHeight + m.bottom))), this.session.setScrollLeft(Math.max(-m.left, Math.min(this.scrollLeft, f + 2 * this.$padding - b.scrollerWidth + m.right)));
                var n = !c && (this.$vScrollBarAlwaysVisible || b.scrollerHeight - e + l < 0 || this.scrollTop > m.top),
                    o = i !== n;
                o && (this.$vScroll = n, this.scrollBarV.setVisible(n));
                var p, q, r = Math.ceil(k / this.lineHeight) - 1,
                    s = Math.max(0, Math.round((this.scrollTop - j) / this.lineHeight)),
                    t = s + r,
                    u = this.lineHeight;
                s = a.screenToDocumentRow(s, 0);
                var v = a.getFoldLine(s);
                v && (s = v.start.row), p = a.documentToScreenRow(s, 0), q = a.getRowLength(s) * u, t = Math.min(a.screenToDocumentRow(t, 0), a.getLength() - 1), k = b.scrollerHeight + a.getRowLength(t) * u + q, j = this.scrollTop - p * u;
                var w = 0;
                return this.layerConfig.width != f && (w = this.CHANGE_H_SCROLL), (h || o) && (w = this.$updateCachedSize(!0, this.gutterWidth, b.width, b.height), this._signal("scrollbarVisibilityChanged"), o && (f = this.$getLongestLine())), this.layerConfig = {
                    width: f,
                    padding: this.$padding,
                    firstRow: s,
                    firstRowScreen: p,
                    lastRow: t,
                    lineHeight: u,
                    characterWidth: this.characterWidth,
                    minHeight: k,
                    maxHeight: e,
                    offset: j,
                    gutterOffset: Math.max(0, Math.ceil((j + b.height - b.scrollerHeight) / u)),
                    height: this.$size.scrollerHeight
                }, w
            }, this.$updateLines = function() {
                var a = this.$changedLines.firstRow,
                    b = this.$changedLines.lastRow;
                this.$changedLines = null;
                var c = this.layerConfig;
                return a > c.lastRow + 1 || b < c.firstRow ? void 0 : b === 1 / 0 ? (this.$showGutter && this.$gutterLayer.update(c), void this.$textLayer.update(c)) : (this.$textLayer.updateLines(c, a, b), !0)
            }, this.$getLongestLine = function() {
                var a = this.session.getScreenWidth();
                return this.showInvisibles && !this.session.$useWrapMode && (a += 1), Math.max(this.$size.scrollerWidth - 2 * this.$padding, Math.round(a * this.characterWidth))
            }, this.updateFrontMarkers = function() {
                this.$markerFront.setMarkers(this.session.getMarkers(!0)), this.$loop.schedule(this.CHANGE_MARKER_FRONT)
            }, this.updateBackMarkers = function() {
                this.$markerBack.setMarkers(this.session.getMarkers()), this.$loop.schedule(this.CHANGE_MARKER_BACK)
            }, this.addGutterDecoration = function(a, b) {
                this.$gutterLayer.addGutterDecoration(a, b)
            }, this.removeGutterDecoration = function(a, b) {
                this.$gutterLayer.removeGutterDecoration(a, b)
            }, this.updateBreakpoints = function(a) {
                this.$loop.schedule(this.CHANGE_GUTTER)
            }, this.setAnnotations = function(a) {
                this.$gutterLayer.setAnnotations(a), this.$loop.schedule(this.CHANGE_GUTTER)
            }, this.updateCursor = function() {
                this.$loop.schedule(this.CHANGE_CURSOR)
            }, this.hideCursor = function() {
                this.$cursorLayer.hideCursor()
            }, this.showCursor = function() {
                this.$cursorLayer.showCursor()
            }, this.scrollSelectionIntoView = function(a, b, c) {
                this.scrollCursorIntoView(a, c), this.scrollCursorIntoView(b, c)
            }, this.scrollCursorIntoView = function(a, b, c) {
                if (0 !== this.$size.scrollerHeight) {
                    var d = this.$cursorLayer.getPixelPosition(a),
                        e = d.left,
                        f = d.top,
                        g = c && c.top || 0,
                        h = c && c.bottom || 0,
                        i = this.$scrollAnimation ? this.session.getScrollTop() : this.scrollTop;
                    i + g > f ? (b && i + g > f + this.lineHeight && (f -= b * this.$size.scrollerHeight), 0 === f && (f = -this.scrollMargin.top), this.session.setScrollTop(f)) : i + this.$size.scrollerHeight - h < f + this.lineHeight && (b && i + this.$size.scrollerHeight - h < f - this.lineHeight && (f += b * this.$size.scrollerHeight), this.session.setScrollTop(f + this.lineHeight - this.$size.scrollerHeight));
                    var j = this.scrollLeft;
                    j > e ? (e < this.$padding + 2 * this.layerConfig.characterWidth && (e = -this.scrollMargin.left), this.session.setScrollLeft(e)) : j + this.$size.scrollerWidth < e + this.characterWidth ? this.session.setScrollLeft(Math.round(e + this.characterWidth - this.$size.scrollerWidth)) : j <= this.$padding && e - j < this.characterWidth && this.session.setScrollLeft(0)
                }
            }, this.getScrollTop = function() {
                return this.session.getScrollTop()
            }, this.getScrollLeft = function() {
                return this.session.getScrollLeft()
            }, this.getScrollTopRow = function() {
                return this.scrollTop / this.lineHeight
            }, this.getScrollBottomRow = function() {
                return Math.max(0, Math.floor((this.scrollTop + this.$size.scrollerHeight) / this.lineHeight) - 1)
            }, this.scrollToRow = function(a) {
                this.session.setScrollTop(a * this.lineHeight)
            }, this.alignCursor = function(a, b) {
                "number" == typeof a && (a = {
                    row: a,
                    column: 0
                });
                var c = this.$cursorLayer.getPixelPosition(a),
                    d = this.$size.scrollerHeight - this.lineHeight,
                    e = c.top - d * (b || 0);
                return this.session.setScrollTop(e), e
            }, this.STEPS = 8, this.$calcSteps = function(a, b) {
                var c = 0,
                    d = this.STEPS,
                    e = [],
                    f = function(a, b, c) {
                        return c * (Math.pow(a - 1, 3) + 1) + b
                    };
                for (c = 0; d > c; ++c) e.push(f(c / this.STEPS, a, b - a));
                return e
            }, this.scrollToLine = function(a, b, c, d) {
                var e = this.$cursorLayer.getPixelPosition({
                        row: a,
                        column: 0
                    }),
                    f = e.top;
                b && (f -= this.$size.scrollerHeight / 2);
                var g = this.scrollTop;
                this.session.setScrollTop(f), c !== !1 && this.animateScrolling(g, d)
            }, this.animateScrolling = function(a, b) {
                var c = this.scrollTop;
                if (this.$animatedScroll) {
                    var d = this;
                    if (a != c) {
                        if (this.$scrollAnimation) {
                            var e = this.$scrollAnimation.steps;
                            if (e.length && (a = e[0], a == c)) return
                        }
                        var f = d.$calcSteps(a, c);
                        this.$scrollAnimation = {
                            from: a,
                            to: c,
                            steps: f
                        }, clearInterval(this.$timer), d.session.setScrollTop(f.shift()), d.session.$scrollTop = c, this.$timer = setInterval(function() {
                            f.length ? (d.session.setScrollTop(f.shift()), d.session.$scrollTop = c) : null != c ? (d.session.$scrollTop = -1, d.session.setScrollTop(c), c = null) : (d.$timer = clearInterval(d.$timer), d.$scrollAnimation = null, b && b())
                        }, 10)
                    }
                }
            }, this.scrollToY = function(a) {
                this.scrollTop !== a && (this.$loop.schedule(this.CHANGE_SCROLL), this.scrollTop = a)
            }, this.scrollToX = function(a) {
                this.scrollLeft !== a && (this.scrollLeft = a), this.$loop.schedule(this.CHANGE_H_SCROLL)
            }, this.scrollTo = function(a, b) {
                this.session.setScrollTop(b), this.session.setScrollLeft(b)
            }, this.scrollBy = function(a, b) {
                b && this.session.setScrollTop(this.session.getScrollTop() + b), a && this.session.setScrollLeft(this.session.getScrollLeft() + a)
            }, this.isScrollableBy = function(a, b) {
                return 0 > b && this.session.getScrollTop() >= 1 - this.scrollMargin.top ? !0 : b > 0 && this.session.getScrollTop() + this.$size.scrollerHeight - this.layerConfig.maxHeight < -1 + this.scrollMargin.bottom ? !0 : 0 > a && this.session.getScrollLeft() >= 1 - this.scrollMargin.left ? !0 : a > 0 && this.session.getScrollLeft() + this.$size.scrollerWidth - this.layerConfig.width < -1 + this.scrollMargin.right ? !0 : void 0
            }, this.pixelToScreenCoordinates = function(a, b) {
                var c = this.scroller.getBoundingClientRect(),
                    d = (a + this.scrollLeft - c.left - this.$padding) / this.characterWidth,
                    e = Math.floor((b + this.scrollTop - c.top) / this.lineHeight),
                    f = Math.round(d);
                return {
                    row: e,
                    column: f,
                    side: d - f > 0 ? 1 : -1
                }
            }, this.screenToTextCoordinates = function(a, b) {
                var c = this.scroller.getBoundingClientRect(),
                    d = Math.round((a + this.scrollLeft - c.left - this.$padding) / this.characterWidth),
                    e = (b + this.scrollTop - c.top) / this.lineHeight;
                return this.session.screenToDocumentPosition(e, Math.max(d, 0))
            }, this.textToScreenCoordinates = function(a, b) {
                var c = this.scroller.getBoundingClientRect(),
                    d = this.session.documentToScreenPosition(a, b),
                    e = this.$padding + Math.round(d.column * this.characterWidth),
                    f = d.row * this.lineHeight;
                return {
                    pageX: c.left + e - this.scrollLeft,
                    pageY: c.top + f - this.scrollTop
                }
            }, this.visualizeFocus = function() {
                e.addCssClass(this.container, "ace_focus")
            }, this.visualizeBlur = function() {
                e.removeCssClass(this.container, "ace_focus")
            }, this.showComposition = function(a) {
                this.$composition || (this.$composition = {
                    keepTextAreaAtCursor: this.$keepTextAreaAtCursor,
                    cssText: this.textarea.style.cssText
                }), this.$keepTextAreaAtCursor = !0, e.addCssClass(this.textarea, "ace_composition"), this.textarea.style.cssText = "", this.$moveTextAreaToCursor()
            }, this.setCompositionText = function(a) {
                this.$moveTextAreaToCursor()
            }, this.hideComposition = function() {
                this.$composition && (e.removeCssClass(this.textarea, "ace_composition"), this.$keepTextAreaAtCursor = this.$composition.keepTextAreaAtCursor, this.textarea.style.cssText = this.$composition.cssText, this.$composition = null)
            }, this.setTheme = function(a, b) {
                function c(c) {
                    if (d.$themeId != a) return b && b();
                    if (c.cssClass) {
                        e.importCssString(c.cssText, c.cssClass, d.container.ownerDocument), d.theme && e.removeCssClass(d.container, d.theme.cssClass);
                        var f = "padding" in c ? c.padding : "padding" in (d.theme || {}) ? 4 : d.$padding;
                        d.$padding && f != d.$padding && d.setPadding(f), d.$theme = c.cssClass, d.theme = c, e.addCssClass(d.container, c.cssClass), e.setCssClass(d.container, "ace_dark", c.isDark), d.$size && (d.$size.width = 0, d.$updateSizeAsync()), d._dispatchEvent("themeLoaded", {
                            theme: c
                        }), b && b()
                    }
                }
                var d = this;
                if (this.$themeId = a, d._dispatchEvent("themeChange", {
                        theme: a
                    }), a && "string" != typeof a) c(a);
                else {
                    var g = a || this.$options.theme.initialValue;
                    f.loadModule(["theme", g], c)
                }
            }, this.getTheme = function() {
                return this.$themeId
            }, this.setStyle = function(a, b) {
                e.setCssClass(this.container, a, b !== !1)
            }, this.unsetStyle = function(a) {
                e.removeCssClass(this.container, a)
            }, this.setCursorStyle = function(a) {
                this.scroller.style.cursor != a && (this.scroller.style.cursor = a)
            }, this.setMouseCursor = function(a) {
                this.scroller.style.cursor = a
            }, this.destroy = function() {
                this.$textLayer.destroy(), this.$cursorLayer.destroy()
            }
        }).call(r.prototype), f.defineOptions(r.prototype, "renderer", {
            animatedScroll: {
                initialValue: !1
            },
            showInvisibles: {
                set: function(a) {
                    this.$textLayer.setShowInvisibles(a) && this.$loop.schedule(this.CHANGE_TEXT)
                },
                initialValue: !1
            },
            showPrintMargin: {
                set: function() {
                    this.$updatePrintMargin()
                },
                initialValue: !0
            },
            printMarginColumn: {
                set: function() {
                    this.$updatePrintMargin()
                },
                initialValue: 80
            },
            printMargin: {
                set: function(a) {
                    "number" == typeof a && (this.$printMarginColumn = a), this.$showPrintMargin = !!a, this.$updatePrintMargin()
                },
                get: function() {
                    return this.$showPrintMargin && this.$printMarginColumn
                }
            },
            showGutter: {
                set: function(a) {
                    this.$gutter.style.display = a ? "block" : "none", this.$loop.schedule(this.CHANGE_FULL), this.onGutterResize()
                },
                initialValue: !0
            },
            fadeFoldWidgets: {
                set: function(a) {
                    e.setCssClass(this.$gutter, "ace_fade-fold-widgets", a)
                },
                initialValue: !1
            },
            showFoldWidgets: {
                set: function(a) {
                    this.$gutterLayer.setShowFoldWidgets(a)
                },
                initialValue: !0
            },
            showLineNumbers: {
                set: function(a) {
                    this.$gutterLayer.setShowLineNumbers(a), this.$loop.schedule(this.CHANGE_GUTTER)
                },
                initialValue: !0
            },
            displayIndentGuides: {
                set: function(a) {
                    this.$textLayer.setDisplayIndentGuides(a) && this.$loop.schedule(this.CHANGE_TEXT)
                },
                initialValue: !0
            },
            highlightGutterLine: {
                set: function(a) {
                    return this.$gutterLineHighlight ? (this.$gutterLineHighlight.style.display = a ? "" : "none", void(this.$cursorLayer.$pixelPos && this.$updateGutterLineHighlight())) : (this.$gutterLineHighlight = e.createElement("div"), this.$gutterLineHighlight.className = "ace_gutter-active-line", void this.$gutter.appendChild(this.$gutterLineHighlight))
                },
                initialValue: !1,
                value: !0
            },
            hScrollBarAlwaysVisible: {
                set: function(a) {
                    this.$hScrollBarAlwaysVisible && this.$horizScroll || this.$loop.schedule(this.CHANGE_SCROLL)
                },
                initialValue: !1
            },
            vScrollBarAlwaysVisible: {
                set: function(a) {
                    this.$vScrollBarAlwaysVisible && this.$vScroll || this.$loop.schedule(this.CHANGE_SCROLL)
                },
                initialValue: !1
            },
            fontSize: {
                set: function(a) {
                    "number" == typeof a && (a += "px"), this.container.style.fontSize = a, this.updateFontSize()
                },
                initialValue: 12
            },
            fontFamily: {
                set: function(a) {
                    this.container.style.fontFamily = a, this.updateFontSize()
                }
            },
            maxLines: {
                set: function(a) {
                    this.updateFull()
                }
            },
            minLines: {
                set: function(a) {
                    this.updateFull()
                }
            },
            scrollPastEnd: {
                set: function(a) {
                    a = +a || 0, this.$scrollPastEnd != a && (this.$scrollPastEnd = a, this.$loop.schedule(this.CHANGE_SCROLL))
                },
                initialValue: 0,
                handlesSet: !0
            },
            fixedWidthGutter: {
                set: function(a) {
                    this.$gutterLayer.$fixedWidth = !!a, this.$loop.schedule(this.CHANGE_GUTTER)
                }
            },
            theme: {
                set: function(a) {
                    this.setTheme(a)
                },
                get: function() {
                    return this.$themeId || this.theme
                },
                initialValue: "./theme/textmate",
                handlesSet: !0
            }
        }), b.VirtualRenderer = r
    }), define("ace/worker/worker_client", ["require", "exports", "module", "ace/lib/oop", "ace/lib/net", "ace/lib/event_emitter", "ace/config"], function(a, b, c) {
        "use strict";
        var d = a("../lib/oop"),
            e = a("../lib/net"),
            f = a("../lib/event_emitter").EventEmitter,
            g = a("../config"),
            h = function(b, c, d, e) {
                if (this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.onMessage = this.onMessage.bind(this), a.nameToUrl && !a.toUrl && (a.toUrl = a.nameToUrl), g.get("packaged") || !a.toUrl) e = e || g.moduleUrl(c, "worker");
                else {
                    var f = this.$normalizePath;
                    e = e || f(a.toUrl("ace/worker/worker.js", null, "_"));
                    var h = {};
                    b.forEach(function(b) {
                        h[b] = f(a.toUrl(b, null, "_").replace(/(\.js)?(\?.*)?$/, ""))
                    })
                }
                try {
                    this.$worker = new Worker(e)
                } catch (i) {
                    if (!(i instanceof window.DOMException)) throw i;
                    var j = this.$workerBlob(e),
                        k = window.URL || window.webkitURL,
                        l = k.createObjectURL(j);
                    this.$worker = new Worker(l), k.revokeObjectURL(l)
                }
                this.$worker.postMessage({
                    init: !0,
                    tlns: h,
                    module: c,
                    classname: d
                }), this.callbackId = 1, this.callbacks = {}, this.$worker.onmessage = this.onMessage
            };
        (function() {
            d.implement(this, f), this.onMessage = function(a) {
                var b = a.data;
                switch (b.type) {
                    case "event":
                        this._signal(b.name, {
                            data: b.data
                        });
                        break;
                    case "call":
                        var c = this.callbacks[b.id];
                        c && (c(b.data), delete this.callbacks[b.id]);
                        break;
                    case "error":
                        this.reportError(b.data);
                        break;
                    case "log":
                        window.console && console.log && console.log.apply(console, b.data)
                }
            }, this.reportError = function(a) {
                window.console && console.error && console.error(a)
            }, this.$normalizePath = function(a) {
                return e.qualifyURL(a)
            }, this.terminate = function() {
                this._signal("terminate", {}), this.deltaQueue = null, this.$worker.terminate(), this.$worker = null, this.$doc && this.$doc.off("change", this.changeListener), this.$doc = null
            }, this.send = function(a, b) {
                this.$worker.postMessage({
                    command: a,
                    args: b
                })
            }, this.call = function(a, b, c) {
                if (c) {
                    var d = this.callbackId++;
                    this.callbacks[d] = c, b.push(d)
                }
                this.send(a, b)
            }, this.emit = function(a, b) {
                try {
                    this.$worker.postMessage({
                        event: a,
                        data: {
                            data: b.data
                        }
                    })
                } catch (c) {
                    console.error(c.stack)
                }
            }, this.attachToDocument = function(a) {
                this.$doc && this.terminate(), this.$doc = a, this.call("setValue", [a.getValue()]), a.on("change", this.changeListener)
            }, this.changeListener = function(a) {
                this.deltaQueue || (this.deltaQueue = [], setTimeout(this.$sendDeltaQueue, 0)), "insert" == a.action ? this.deltaQueue.push(a.start, a.lines) : this.deltaQueue.push(a.start, a.end)
            }, this.$sendDeltaQueue = function() {
                var a = this.deltaQueue;
                a && (this.deltaQueue = null, a.length > 50 && a.length > this.$doc.getLength() >> 1 ? this.call("setValue", [this.$doc.getValue()]) : this.emit("change", {
                    data: a
                }))
            }, this.$workerBlob = function(a) {
                var b = "importScripts('" + e.qualifyURL(a) + "');";
                try {
                    return new Blob([b], {
                        type: "application/javascript"
                    })
                } catch (c) {
                    var d = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder,
                        f = new d;
                    return f.append(b), f.getBlob("application/javascript")
                }
            }
        }).call(h.prototype);
        var i = function(a, b, c) {
            this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this), this.changeListener = this.changeListener.bind(this), this.callbackId = 1, this.callbacks = {}, this.messageBuffer = [];
            var d = null,
                e = !1,
                h = Object.create(f),
                i = this;
            this.$worker = {}, this.$worker.terminate = function() {}, this.$worker.postMessage = function(a) {
                i.messageBuffer.push(a), d && (e ? setTimeout(j) : j())
            }, this.setEmitSync = function(a) {
                e = a
            };
            var j = function() {
                var a = i.messageBuffer.shift();
                a.command ? d[a.command].apply(d, a.args) : a.event && h._signal(a.event, a.data)
            };
            h.postMessage = function(a) {
                i.onMessage({
                    data: a
                })
            }, h.callback = function(a, b) {
                this.postMessage({
                    type: "call",
                    id: b,
                    data: a
                })
            }, h.emit = function(a, b) {
                this.postMessage({
                    type: "event",
                    name: a,
                    data: b
                })
            }, g.loadModule(["worker", b], function(a) {
                for (d = new a[c](h); i.messageBuffer.length;) j()
            })
        };
        i.prototype = h.prototype, b.UIWorkerClient = i, b.WorkerClient = h
    }), define("ace/placeholder", ["require", "exports", "module", "ace/range", "ace/lib/event_emitter", "ace/lib/oop"], 
    function(a, b, c) {
        "use strict";
        var d = a("./range").Range,
            e = a("./lib/event_emitter").EventEmitter,
            f = a("./lib/oop"),
            g = function(a, b, c, d, e, f) {
                var g = this;
                this.length = b, this.session = a, this.doc = a.getDocument(), this.mainClass = e, this.othersClass = f, this.$onUpdate = this.onUpdate.bind(this), this.doc.on("change", this.$onUpdate), this.$others = d, this.$onCursorChange = function() {
                    setTimeout(function() {
                        g.onCursorChange()
                    })
                }, this.$pos = c;
                var h = a.getUndoManager().$undoStack || a.getUndoManager().$undostack || {
                    length: -1
                };
                this.$undoStackDepth = h.length, this.setup(), a.selection.on("changeCursor", this.$onCursorChange)
            };
        (function() {
            f.implement(this, e), this.setup = function() {
                var a = this,
                    b = this.doc,
                    c = this.session;
                this.selectionBefore = c.selection.toJSON(), c.selection.inMultiSelectMode && c.selection.toSingleRange(), this.pos = b.createAnchor(this.$pos.row, this.$pos.column);
                var e = this.pos;
                e.$insertRight = !0, e.detach(), e.markerId = c.addMarker(new d(e.row, e.column, e.row, e.column + this.length), this.mainClass, null, !1), this.others = [], this.$others.forEach(function(c) {
                    var d = b.createAnchor(c.row, c.column);
                    d.$insertRight = !0, d.detach(), a.others.push(d)
                }), c.setUndoSelect(!1)
            }, this.showOtherMarkers = function() {
                if (!this.othersActive) {
                    var a = this.session,
                        b = this;
                    this.othersActive = !0, this.others.forEach(function(c) {
                        c.markerId = a.addMarker(new d(c.row, c.column, c.row, c.column + b.length), b.othersClass, null, !1)
                    })
                }
            }, this.hideOtherMarkers = function() {
                if (this.othersActive) {
                    this.othersActive = !1;
                    for (var a = 0; a < this.others.length; a++) this.session.removeMarker(this.others[a].markerId)
                }
            }, this.onUpdate = function(a) {
                if (this.$updating) return this.updateAnchors(a);
                var b = a;
                if (b.start.row === b.end.row && b.start.row === this.pos.row) {
                    this.$updating = !0;
                    var c = "insert" === a.action ? b.end.column - b.start.column : b.start.column - b.end.column,
                        e = b.start.column >= this.pos.column && b.start.column <= this.pos.column + this.length + 1,
                        f = b.start.column - this.pos.column;
                    if (this.updateAnchors(a), e && (this.length += c), e && !this.session.$fromUndo)
                        if ("insert" === a.action)
                            for (var g = this.others.length - 1; g >= 0; g--) {
                                var h = this.others[g],
                                    i = {
                                        row: h.row,
                                        column: h.column + f
                                    };
                                this.doc.insertMergedLines(i, a.lines)
                            } else if ("remove" === a.action)
                                for (var g = this.others.length - 1; g >= 0; g--) {
                                    var h = this.others[g],
                                        i = {
                                            row: h.row,
                                            column: h.column + f
                                        };
                                    this.doc.remove(new d(i.row, i.column, i.row, i.column - c))
                                }
                    this.$updating = !1, this.updateMarkers()
                }
            }, this.updateAnchors = function(a) {
                this.pos.onChange(a);
                for (var b = this.others.length; b--;) this.others[b].onChange(a);
                this.updateMarkers()
            }, this.updateMarkers = function() {
                if (!this.$updating) {
                    var a = this,
                        b = this.session,
                        c = function(c, e) {
                            b.removeMarker(c.markerId), c.markerId = b.addMarker(new d(c.row, c.column, c.row, c.column + a.length), e, null, !1)
                        };
                    c(this.pos, this.mainClass);
                    for (var e = this.others.length; e--;) c(this.others[e], this.othersClass)
                }
            }, this.onCursorChange = function(a) {
                if (!this.$updating && this.session) {
                    var b = this.session.selection.getCursor();
                    b.row === this.pos.row && b.column >= this.pos.column && b.column <= this.pos.column + this.length ? (this.showOtherMarkers(), this._emit("cursorEnter", a)) : (this.hideOtherMarkers(), this._emit("cursorLeave", a))
                }
            }, this.detach = function() {
                this.session.removeMarker(this.pos && this.pos.markerId), this.hideOtherMarkers(), this.doc.removeEventListener("change", this.$onUpdate), this.session.selection.removeEventListener("changeCursor", this.$onCursorChange), this.session.setUndoSelect(!0), this.session = null
            }, this.cancel = function() {
                if (-1 !== this.$undoStackDepth) {
                    for (var a = this.session.getUndoManager(), b = (a.$undoStack || a.$undostack).length - this.$undoStackDepth, c = 0; b > c; c++) a.undo(!0);
                    this.selectionBefore && this.session.selection.fromJSON(this.selectionBefore)
                }
            }
        }).call(g.prototype), b.PlaceHolder = g
    }), define("ace/mouse/multi_select_handler", ["require", "exports", "module", "ace/lib/event", "ace/lib/useragent"],
    function (a, b, c) {
        function d(a, b) {
            return a.row == b.row && a.column == b.column
        }

        function e(a) {
            var b = a.domEvent,
                c = b.altKey,
                e = b.shiftKey,
                h = b.ctrlKey,
                i = a.getAccelKey(),
                j = a.getButton();
            if (h && g.isMac && (j = b.button), a.editor.inMultiSelectMode && 2 == j) return void a.editor.textInput.onContextMenu(a.domEvent);
            if (!h && !c && !i) return void(0 === j && a.editor.inMultiSelectMode && a.editor.exitMultiSelectMode());
            if (0 === j) {
                var k, l = a.editor,
                    m = l.selection,
                    n = l.inMultiSelectMode,
                    o = a.getDocumentPosition(),
                    p = m.getCursor(),
                    q = a.inSelection() || m.isEmpty() && d(o, p),
                    r = a.x,
                    s = a.y,
                    t = function(a) {
                        r = a.clientX, s = a.clientY
                    },
                    u = l.session,
                    v = l.renderer.pixelToScreenCoordinates(r, s),
                    w = v;
                if (l.$mouseHandler.$enableJumpToDef) h && c || i && c ? k = e ? "block" : "add" : c && l.$blockSelectEnabled && (k = "block");
                else if (i && !c) {
                    if (k = "add", !n && e) return
                } else c && l.$blockSelectEnabled && (k = "block");
                if (k && g.isMac && b.ctrlKey && l.$mouseHandler.cancelContextMenu(), "add" == k) {
                    if (!n && q) return;
                    if (!n) {
                        var x = m.toOrientedRange();
                        l.addSelectionMarker(x)
                    }
                    var y = m.rangeList.rangeAtPoint(o);
                    l.$blockScrolling++, l.inVirtualSelectionMode = !0, e && (y = null, x = m.ranges[0] || x, l.removeSelectionMarker(x)), l.once("mouseup", function() {
                        var a = m.toOrientedRange();
                        y && a.isEmpty() && d(y.cursor, a.cursor) ? m.substractPoint(a.cursor) : (e ? m.substractPoint(x.cursor) : x && (l.removeSelectionMarker(x), m.addRange(x)), m.addRange(a)), l.$blockScrolling--, l.inVirtualSelectionMode = !1
                    })
                } else if ("block" == k) {
                    a.stop(), l.inVirtualSelectionMode = !0;
                    var z, A = [],
                        B = function() {
                            var a = l.renderer.pixelToScreenCoordinates(r, s),
                                b = u.screenToDocumentPosition(a.row, a.column);
                            d(w, a) && d(b, m.lead) || (w = a, l.$blockScrolling++, l.selection.moveToPosition(b), l.renderer.scrollCursorIntoView(), l.removeSelectionMarkers(A), A = m.rectangularRangeBlock(w, v), l.$mouseHandler.$clickSelection && 1 == A.length && A[0].isEmpty() && (A[0] = l.$mouseHandler.$clickSelection.clone()), A.forEach(l.addSelectionMarker, l), l.updateSelectionMarkers(), l.$blockScrolling--)
                        };
                    l.$blockScrolling++, n && !i ? m.toSingleRange() : !n && i && (z = m.toOrientedRange(), l.addSelectionMarker(z)), e ? v = u.documentToScreenPosition(m.lead) : m.moveToPosition(o), l.$blockScrolling--, w = {
                        row: -1,
                        column: -1
                    };
                    var C = function(a) {
                            clearInterval(E), l.removeSelectionMarkers(A), A.length || (A = [m.toOrientedRange()]), l.$blockScrolling++, z && (l.removeSelectionMarker(z), m.toSingleRange(z));
                            for (var b = 0; b < A.length; b++) m.addRange(A[b]);
                            l.inVirtualSelectionMode = !1, l.$mouseHandler.$clickSelection = null, l.$blockScrolling--
                        },
                        D = B;
                    f.capture(l.container, t, C);
                    var E = setInterval(function() {
                        D()
                    }, 20);
                    return a.preventDefault()
                }
            }
        }
        var f = a("../lib/event"),
            g = a("../lib/useragent");
        b.onMouseDown = e
    }), define("ace/commands/multi_select_commands", ["require", "exports", "module", "ace/keyboard/hash_handler"],
    function (a, b, c) {
        b.defaultCommands = [{
            name: "addCursorAbove",
            exec: function(a) {
                a.selectMoreLines(-1)
            },
            bindKey: {
                win: "Ctrl-Alt-Up",
                mac: "Ctrl-Alt-Up"
            },
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "addCursorBelow",
            exec: function(a) {
                a.selectMoreLines(1)
            },
            bindKey: {
                win: "Ctrl-Alt-Down",
                mac: "Ctrl-Alt-Down"
            },
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "addCursorAboveSkipCurrent",
            exec: function(a) {
                a.selectMoreLines(-1, !0)
            },
            bindKey: {
                win: "Ctrl-Alt-Shift-Up",
                mac: "Ctrl-Alt-Shift-Up"
            },
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "addCursorBelowSkipCurrent",
            exec: function(a) {
                a.selectMoreLines(1, !0)
            },
            bindKey: {
                win: "Ctrl-Alt-Shift-Down",
                mac: "Ctrl-Alt-Shift-Down"
            },
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selectMoreBefore",
            exec: function(a) {
                a.selectMore(-1)
            },
            bindKey: {
                win: "Ctrl-Alt-Left",
                mac: "Ctrl-Alt-Left"
            },
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selectMoreAfter",
            exec: function(a) {
                a.selectMore(1)
            },
            bindKey: {
                win: "Ctrl-Alt-Right",
                mac: "Ctrl-Alt-Right"
            },
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selectNextBefore",
            exec: function(a) {
                a.selectMore(-1, !0)
            },
            bindKey: {
                win: "Ctrl-Alt-Shift-Left",
                mac: "Ctrl-Alt-Shift-Left"
            },
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "selectNextAfter",
            exec: function(a) {
                a.selectMore(1, !0)
            },
            bindKey: {
                win: "Ctrl-Alt-Shift-Right",
                mac: "Ctrl-Alt-Shift-Right"
            },
            scrollIntoView: "cursor",
            readOnly: !0
        }, {
            name: "splitIntoLines",
            exec: function(a) {
                a.multiSelect.splitIntoLines()
            },
            bindKey: {
                win: "Ctrl-Alt-L",
                mac: "Ctrl-Alt-L"
            },
            readOnly: !0
        }, {
            name: "alignCursors",
            exec: function(a) {
                a.alignCursors()
            },
            bindKey: {
                win: "Ctrl-Alt-A",
                mac: "Ctrl-Alt-A"
            },
            scrollIntoView: "cursor"
        }, {
            name: "findAll",
            exec: function(a) {
                a.findAll()
            },
            bindKey: {
                win: "Ctrl-Alt-K",
                mac: "Ctrl-Alt-G"
            },
            scrollIntoView: "cursor",
            readOnly: !0
        }],
        b.multiSelectCommands = [{
            name: "singleSelection",
            bindKey: "esc",
            exec: function(a) {
                a.exitMultiSelectMode()
            },
            scrollIntoView: "cursor",
            readOnly: !0,
            isAvailable: function(a) {
                return a && a.inMultiSelectMode
            }
        }];
        var d = a("../keyboard/hash_handler").HashHandler;
        b.keyboardHandler = new d(b.multiSelectCommands)
    }), define("ace/multi_select", ["require", "exports", "module", "ace/range_list", "ace/range", "ace/selection", "ace/mouse/multi_select_handler", "ace/lib/event", "ace/lib/lang", "ace/commands/multi_select_commands", "ace/search", "ace/edit_session", "ace/editor", "ace/config"],
    function (a, b, c) {
        function d(a, b, c) {
            return p.$options.wrap = !0, p.$options.needle = b, p.$options.backwards = -1 == c, p.find(a)
        }

        function e(a, b) {
            return a.row == b.row && a.column == b.column
        }

        function f(a) {
            a.$multiselectOnSessionChange || (a.$onAddRange = a.$onAddRange.bind(a), a.$onRemoveRange = a.$onRemoveRange.bind(a), a.$onMultiSelect = a.$onMultiSelect.bind(a), a.$onSingleSelect = a.$onSingleSelect.bind(a), a.$multiselectOnSessionChange = b.onSessionChange.bind(a), a.$checkMultiselectChange = a.$checkMultiselectChange.bind(a), a.$multiselectOnSessionChange(a), a.on("changeSession", a.$multiselectOnSessionChange), a.on("mousedown", k), a.commands.addCommands(n.defaultCommands), g(a))
        }

        function g(a) {
            function b(b) {
                d && (a.renderer.setMouseCursor(""), d = !1)
            }
            var c = a.textInput.getElement(),
                d = !1;
            l.addListener(c, "keydown", function(c) {
                var e = 18 == c.keyCode && !(c.ctrlKey || c.shiftKey || c.metaKey);
                a.$blockSelectEnabled && e ? d || (a.renderer.setMouseCursor("crosshair"), d = !0) : d && b()
            }), l.addListener(c, "keyup", b), l.addListener(c, "blur", b)
        }
        var h = a("./range_list").RangeList,
            i = a("./range").Range,
            j = a("./selection").Selection,
            k = a("./mouse/multi_select_handler").onMouseDown,
            l = a("./lib/event"),
            m = a("./lib/lang"),
            n = a("./commands/multi_select_commands");
        b.commands = n.defaultCommands.concat(n.multiSelectCommands);
        var o = a("./search").Search,
            p = new o,
            q = a("./edit_session").EditSession;
        (function() {
            this.getSelectionMarkers = function() {
                return this.$selectionMarkers
            }
        }).call(q.prototype),
            function() {
                this.ranges = null,
                    this.rangeList = null, this.addRange = function(a, b) {
                        if (a) {
                            if (!this.inMultiSelectMode && 0 === this.rangeCount) {
                                var c = this.toOrientedRange();
                                if (this.rangeList.add(c), this.rangeList.add(a), 2 != this.rangeList.ranges.length) return this.rangeList.removeAll(), b || this.fromOrientedRange(a);
                                this.rangeList.removeAll(), this.rangeList.add(c), this.$onAddRange(c)
                            }
                            a.cursor || (a.cursor = a.end);
                            var d = this.rangeList.add(a);
                            return this.$onAddRange(a), d.length && this.$onRemoveRange(d), this.rangeCount > 1 && !this.inMultiSelectMode && (this._signal("multiSelect"), this.inMultiSelectMode = !0, this.session.$undoSelect = !1, this.rangeList.attach(this.session)), b || this.fromOrientedRange(a)
                        }
                    }, this.toSingleRange = function(a) {
                        a = a || this.ranges[0];
                        var b = this.rangeList.removeAll();
                        b.length && this.$onRemoveRange(b), a && this.fromOrientedRange(a)
                    }, this.substractPoint = function(a) {
                        var b = this.rangeList.substractPoint(a);
                        return b ? (this.$onRemoveRange(b), b[0]) : void 0
                    }, this.mergeOverlappingRanges = function() {
                        var a = this.rangeList.merge();
                        a.length ? this.$onRemoveRange(a) : this.ranges[0] && this.fromOrientedRange(this.ranges[0])
                    }, this.$onAddRange = function(a) {
                        this.rangeCount = this.rangeList.ranges.length, this.ranges.unshift(a), this._signal("addRange", {
                            range: a
                        })
                    }, this.$onRemoveRange = function(a) {
                        if (this.rangeCount = this.rangeList.ranges.length, 1 == this.rangeCount && this.inMultiSelectMode) {
                            var b = this.rangeList.ranges.pop();
                            a.push(b), this.rangeCount = 0
                        }
                        for (var c = a.length; c--;) {
                            var d = this.ranges.indexOf(a[c]);
                            this.ranges.splice(d, 1)
                        }
                        this._signal("removeRange", {
                            ranges: a
                        }), 0 === this.rangeCount && this.inMultiSelectMode && (this.inMultiSelectMode = !1, this._signal("singleSelect"), this.session.$undoSelect = !0, this.rangeList.detach(this.session)), b = b || this.ranges[0], b && !b.isEqual(this.getRange()) && this.fromOrientedRange(b)
                    }, this.$initRangeList = function() {
                        this.rangeList || (this.rangeList = new h, this.ranges = [], this.rangeCount = 0)
                    }, this.getAllRanges = function() {
                        return this.rangeCount ? this.rangeList.ranges.concat() : [this.getRange()]
                    }, this.splitIntoLines = function() {
                        if (this.rangeCount > 1) {
                            var a = this.rangeList.ranges,
                                b = a[a.length - 1],
                                c = i.fromPoints(a[0].start, b.end);
                            this.toSingleRange(), this.setSelectionRange(c, b.cursor == b.start)
                        } else {
                            var c = this.getRange(),
                                d = this.isBackwards(),
                                e = c.start.row,
                                f = c.end.row;
                            if (e == f) {
                                if (d) var g = c.end,
                                    h = c.start;
                                else var g = c.start,
                                    h = c.end;
                                return this.addRange(i.fromPoints(h, h)), void this.addRange(i.fromPoints(g, g))
                            }
                            var j = [],
                                k = this.getLineRange(e, !0);
                            k.start.column = c.start.column, j.push(k);
                            for (var l = e + 1; f > l; l++) j.push(this.getLineRange(l, !0));
                            k = this.getLineRange(f, !0), k.end.column = c.end.column, j.push(k), j.forEach(this.addRange, this)
                        }
                    }, this.toggleBlockSelection = function() {
                        if (this.rangeCount > 1) {
                            var a = this.rangeList.ranges,
                                b = a[a.length - 1],
                                c = i.fromPoints(a[0].start, b.end);
                            this.toSingleRange(), this.setSelectionRange(c, b.cursor == b.start)
                        } else {
                            var d = this.session.documentToScreenPosition(this.selectionLead),
                                e = this.session.documentToScreenPosition(this.selectionAnchor),
                                f = this.rectangularRangeBlock(d, e);
                            f.forEach(this.addRange, this)
                        }
                    }, this.rectangularRangeBlock = function(a, b, c) {
                        var d = [],
                            f = a.column < b.column;
                        if (f) var g = a.column,
                            h = b.column;
                        else var g = b.column,
                            h = a.column;
                        var j = a.row < b.row;
                        if (j) var k = a.row,
                            l = b.row;
                        else var k = b.row,
                            l = a.row;
                        0 > g && (g = 0), 0 > k && (k = 0), k == l && (c = !0);
                        for (var m = k; l >= m; m++) {
                            var n = i.fromPoints(this.session.screenToDocumentPosition(m, g), this.session.screenToDocumentPosition(m, h));
                            if (n.isEmpty()) {
                                if (o && e(n.end, o)) break;
                                var o = n.end
                            }
                            n.cursor = f ? n.start : n.end, d.push(n)
                        }
                        if (j && d.reverse(), !c) {
                            for (var p = d.length - 1; d[p].isEmpty() && p > 0;) p--;
                            if (p > 0)
                                for (var q = 0; d[q].isEmpty();) q++;
                            for (var r = p; r >= q; r--) d[r].isEmpty() && d.splice(r, 1)
                        }
                        return d
                    }
            }.call(j.prototype);
        var r = a("./editor").Editor;
        (function() {
            this.updateSelectionMarkers = function() {
                this.renderer.updateCursor(), this.renderer.updateBackMarkers()
            }, this.addSelectionMarker = function(a) {
                a.cursor || (a.cursor = a.end);
                var b = this.getSelectionStyle();
                return a.marker = this.session.addMarker(a, "ace_selection", b), this.session.$selectionMarkers.push(a), this.session.selectionMarkerCount = this.session.$selectionMarkers.length, a
            }, this.removeSelectionMarker = function(a) {
                if (a.marker) {
                    this.session.removeMarker(a.marker);
                    var b = this.session.$selectionMarkers.indexOf(a); - 1 != b && this.session.$selectionMarkers.splice(b, 1), this.session.selectionMarkerCount = this.session.$selectionMarkers.length
                }
            }, this.removeSelectionMarkers = function(a) {
                for (var b = this.session.$selectionMarkers, c = a.length; c--;) {
                    var d = a[c];
                    if (d.marker) {
                        this.session.removeMarker(d.marker);
                        var e = b.indexOf(d); - 1 != e && b.splice(e, 1)
                    }
                }
                this.session.selectionMarkerCount = b.length
            }, this.$onAddRange = function(a) {
                this.addSelectionMarker(a.range), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
            }, this.$onRemoveRange = function(a) {
                this.removeSelectionMarkers(a.ranges), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
            }, this.$onMultiSelect = function(a) {
                this.inMultiSelectMode || (this.inMultiSelectMode = !0, this.setStyle("ace_multiselect"), this.keyBinding.addKeyboardHandler(n.keyboardHandler), this.commands.setDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers())
            }, this.$onSingleSelect = function(a) {
                this.session.multiSelect.inVirtualMode || (this.inMultiSelectMode = !1, this.unsetStyle("ace_multiselect"), this.keyBinding.removeKeyboardHandler(n.keyboardHandler), this.commands.removeDefaultHandler("exec", this.$onMultiSelectExec), this.renderer.updateCursor(), this.renderer.updateBackMarkers(), this._emit("changeSelection"))
            }, this.$onMultiSelectExec = function(a) {
                var b = a.command,
                    c = a.editor;
                if (c.multiSelect) {
                    if (b.multiSelectAction) "forEach" == b.multiSelectAction ? d = c.forEachSelection(b, a.args) : "forEachLine" == b.multiSelectAction ? d = c.forEachSelection(b, a.args, !0) : "single" == b.multiSelectAction ? (c.exitMultiSelectMode(), d = b.exec(c, a.args || {})) : d = b.multiSelectAction(c, a.args || {});
                    else {
                        var d = b.exec(c, a.args || {});
                        c.multiSelect.addRange(c.multiSelect.toOrientedRange()), c.multiSelect.mergeOverlappingRanges()
                    }
                    return d
                }
            }, this.forEachSelection = function(a, b, c) {
                if (!this.inVirtualSelectionMode) {
                    var d, e = c && c.keepOrder,
                        f = 1 == c || c && c.$byLines,
                        g = this.session,
                        h = this.selection,
                        i = h.rangeList,
                        k = (e ? h : i).ranges;
                    if (!k.length) return a.exec ? a.exec(this, b || {}) : a(this, b || {});
                    var l = h._eventRegistry;
                    h._eventRegistry = {};
                    var m = new j(g);
                    this.inVirtualSelectionMode = !0;
                    for (var n = k.length; n--;) {
                        if (f)
                            for (; n > 0 && k[n].start.row == k[n - 1].end.row;) n--;
                        m.fromOrientedRange(k[n]), m.index = n, this.selection = g.selection = m;
                        var o = a.exec ? a.exec(this, b || {}) : a(this, b || {});
                        d || void 0 === o || (d = o), m.toOrientedRange(k[n])
                    }
                    m.detach(), this.selection = g.selection = h, this.inVirtualSelectionMode = !1, h._eventRegistry = l, h.mergeOverlappingRanges();
                    var p = this.renderer.$scrollAnimation;
                    return this.onCursorChange(), this.onSelectionChange(), p && p.from == p.to && this.renderer.animateScrolling(p.from), d
                }
            }, this.exitMultiSelectMode = function() {
                this.inMultiSelectMode && !this.inVirtualSelectionMode && this.multiSelect.toSingleRange()
            }, this.getSelectedText = function() {
                var a = "";
                if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
                    for (var b = this.multiSelect.rangeList.ranges, c = [], d = 0; d < b.length; d++) c.push(this.session.getTextRange(b[d]));
                    var e = this.session.getDocument().getNewLineCharacter();
                    a = c.join(e), a.length == (c.length - 1) * e.length && (a = "")
                } else this.selection.isEmpty() || (a = this.session.getTextRange(this.getSelectionRange()));
                return a
            }, this.$checkMultiselectChange = function(a, b) {
                if (this.inMultiSelectMode && !this.inVirtualSelectionMode) {
                    var c = this.multiSelect.ranges[0];
                    if (this.multiSelect.isEmpty() && b == this.multiSelect.anchor) return;
                    var d = b == this.multiSelect.anchor ? c.cursor == c.start ? c.end : c.start : c.cursor;
                    (d.row != b.row || this.session.$clipPositionToDocument(d.row, d.column).column != b.column) && this.multiSelect.toSingleRange(this.multiSelect.toOrientedRange())
                }
            }, this.findAll = function(a, b, c) {
                if (b = b || {}, b.needle = a || b.needle, void 0 == b.needle) {
                    var d = this.selection.isEmpty() ? this.selection.getWordRange() : this.selection.getRange();
                    b.needle = this.session.getTextRange(d)
                }
                this.$search.set(b);
                var e = this.$search.findAll(this.session);
                if (!e.length) return 0;
                this.$blockScrolling += 1;
                var f = this.multiSelect;
                c || f.toSingleRange(e[0]);
                for (var g = e.length; g--;) f.addRange(e[g], !0);
                return d && f.rangeList.rangeAtPoint(d.start) && f.addRange(d, !0), this.$blockScrolling -= 1, e.length
            }, this.selectMoreLines = function(a, b) {
                var c = this.selection.toOrientedRange(),
                    d = c.cursor == c.end,
                    e = this.session.documentToScreenPosition(c.cursor);
                this.selection.$desiredColumn && (e.column = this.selection.$desiredColumn);
                var f = this.session.screenToDocumentPosition(e.row + a, e.column);
                if (c.isEmpty()) var g = f;
                else var h = this.session.documentToScreenPosition(d ? c.end : c.start),
                    g = this.session.screenToDocumentPosition(h.row + a, h.column);
                if (d) {
                    var j = i.fromPoints(f, g);
                    j.cursor = j.start
                } else {
                    var j = i.fromPoints(g, f);
                    j.cursor = j.end
                }
                if (j.desiredColumn = e.column, this.selection.inMultiSelectMode) {
                    if (b) var k = c.cursor
                } else this.selection.addRange(c);
                this.selection.addRange(j), k && this.selection.substractPoint(k)
            }, this.transposeSelections = function(a) {
                for (var b = this.session, c = b.multiSelect, d = c.ranges, e = d.length; e--;) {
                    var f = d[e];
                    if (f.isEmpty()) {
                        var g = b.getWordRange(f.start.row, f.start.column);
                        f.start.row = g.start.row, f.start.column = g.start.column, f.end.row = g.end.row, f.end.column = g.end.column
                    }
                }
                c.mergeOverlappingRanges();
                for (var h = [], e = d.length; e--;) {
                    var f = d[e];
                    h.unshift(b.getTextRange(f))
                }
                0 > a ? h.unshift(h.pop()) : h.push(h.shift());
                for (var e = d.length; e--;) {
                    var f = d[e],
                        g = f.clone();
                    b.replace(f, h[e]), f.start.row = g.start.row, f.start.column = g.start.column
                }
            }, this.selectMore = function(a, b, c) {
                var e = this.session,
                    f = e.multiSelect,
                    g = f.toOrientedRange();
                if (!g.isEmpty() || (g = e.getWordRange(g.start.row, g.start.column), g.cursor = -1 == a ? g.start : g.end, this.multiSelect.addRange(g), !c)) {
                    var h = e.getTextRange(g),
                        i = d(e, h, a);
                    i && (i.cursor = -1 == a ? i.start : i.end, this.$blockScrolling += 1, this.session.unfold(i), this.multiSelect.addRange(i), this.$blockScrolling -= 1, this.renderer.scrollCursorIntoView(null, .5)), b && this.multiSelect.substractPoint(g.cursor)
                }
            }, this.alignCursors = function() {
                var a = this.session,
                    b = a.multiSelect,
                    c = b.ranges,
                    d = -1,
                    e = c.filter(function(a) {
                        return a.cursor.row == d ? !0 : void(d = a.cursor.row)
                    });
                if (c.length && e.length != c.length - 1) {
                    e.forEach(function(a) {
                        b.substractPoint(a.cursor)
                    });
                    var f = 0,
                        g = 1 / 0,
                        h = c.map(function(b) {
                            var c = b.cursor,
                                d = a.getLine(c.row),
                                e = d.substr(c.column).search(/\S/g);
                            return -1 == e && (e = 0), c.column > f && (f = c.column), g > e && (g = e), e
                        });
                    c.forEach(function(b, c) {
                        var d = b.cursor,
                            e = f - d.column,
                            j = h[c] - g;
                        e > j ? a.insert(d, m.stringRepeat(" ", e - j)) : a.remove(new i(d.row, d.column, d.row, d.column - e + j)), b.start.column = b.end.column = f, b.start.row = b.end.row = d.row, b.cursor = b.end
                    }), b.fromOrientedRange(c[0]), this.renderer.updateCursor(), this.renderer.updateBackMarkers()
                } else {
                    var j = this.selection.getRange(),
                        k = j.start.row,
                        l = j.end.row,
                        n = k == l;
                    if (n) {
                        var o, p = this.session.getLength();
                        do o = this.session.getLine(l); while (/[=:]/.test(o) && ++l < p);
                        do o = this.session.getLine(k); while (/[=:]/.test(o) && --k > 0);
                        0 > k && (k = 0), l >= p && (l = p - 1)
                    }
                    var q = this.session.removeFullLines(k, l);
                    q = this.$reAlignText(q, n), this.session.insert({
                        row: k,
                        column: 0
                    }, q.join("\n") + "\n"), n || (j.start.column = 0, j.end.column = q[q.length - 1].length), this.selection.setRange(j)
                }
            }, this.$reAlignText = function(a, b) {
                function c(a) {
                    return m.stringRepeat(" ", a)
                }

                function d(a) {
                    return a[2] ? c(g) + a[2] + c(h - a[2].length + i) + a[4].replace(/^([=:])\s+/, "$1 ") : a[0]
                }

                function e(a) {
                    return a[2] ? c(g + h - a[2].length) + a[2] + c(i, " ") + a[4].replace(/^([=:])\s+/, "$1 ") : a[0]
                }

                function f(a) {
                    return a[2] ? c(g) + a[2] + c(i) + a[4].replace(/^([=:])\s+/, "$1 ") : a[0]
                }
                var g, h, i, j = !0,
                    k = !0;
                return a.map(function(a) {
                    var b = a.match(/(\s*)(.*?)(\s*)([=:].*)/);
                    return b ? null == g ? (g = b[1].length, h = b[2].length, i = b[3].length, b) : (g + h + i != b[1].length + b[2].length + b[3].length && (k = !1), g != b[1].length && (j = !1), g > b[1].length && (g = b[1].length), h < b[2].length && (h = b[2].length), i > b[3].length && (i = b[3].length), b) : [a]
                }).map(b ? d : j ? k ? e : d : f)
            }
        }).call(r.prototype), b.onSessionChange = function(a) {
            var b = a.session;
            b && !b.multiSelect && (b.$selectionMarkers = [], b.selection.$initRangeList(), b.multiSelect = b.selection), this.multiSelect = b && b.multiSelect;
            var c = a.oldSession;
            c && (c.multiSelect.off("addRange", this.$onAddRange), c.multiSelect.off("removeRange", this.$onRemoveRange), c.multiSelect.off("multiSelect", this.$onMultiSelect), c.multiSelect.off("singleSelect", this.$onSingleSelect), c.multiSelect.lead.off("change", this.$checkMultiselectChange), c.multiSelect.anchor.off("change", this.$checkMultiselectChange)), b && (b.multiSelect.on("addRange", this.$onAddRange), b.multiSelect.on("removeRange", this.$onRemoveRange), b.multiSelect.on("multiSelect", this.$onMultiSelect), b.multiSelect.on("singleSelect", this.$onSingleSelect), b.multiSelect.lead.on("change", this.$checkMultiselectChange), b.multiSelect.anchor.on("change", this.$checkMultiselectChange)), b && this.inMultiSelectMode != b.selection.inMultiSelectMode && (b.selection.inMultiSelectMode ? this.$onMultiSelect() : this.$onSingleSelect())
        }, b.MultiSelect = f, a("./config").defineOptions(r.prototype, "editor", {
            enableMultiselect: {
                set: function(a) {
                    f(this), a ? (this.on("changeSession", this.$multiselectOnSessionChange), this.on("mousedown", k)) : (this.off("changeSession", this.$multiselectOnSessionChange), this.off("mousedown", k))
                },
                value: !0
            },
            enableBlockSelect: {
                set: function(a) {
                    this.$blockSelectEnabled = a
                },
                value: !0
            }
        })
    }), define("ace/mode/folding/fold_mode", ["require", "exports", "module", "ace/range"], 
    function(a, b, c) {
        "use strict";
        var d = a("../../range").Range,
            e = b.FoldMode = function() {};
        (function() {
            this.foldingStartMarker = null, this.foldingStopMarker = null, this.getFoldWidget = function(a, b, c) {
                var d = a.getLine(c);
                return this.foldingStartMarker.test(d) ? "start" : "markbeginend" == b && this.foldingStopMarker && this.foldingStopMarker.test(d) ? "end" : ""
            }, this.getFoldWidgetRange = function(a, b, c) {
                return null
            }, this.indentationBlock = function(a, b, c) {
                var e = /\S/,
                    f = a.getLine(b),
                    g = f.search(e);
                if (-1 != g) {
                    for (var h = c || f.length, i = a.getLength(), j = b, k = b; ++b < i;) {
                        var l = a.getLine(b).search(e);
                        if (-1 != l) {
                            if (g >= l) break;
                            k = b
                        }
                    }
                    if (k > j) {
                        var m = a.getLine(k).length;
                        return new d(j, h, k, m)
                    }
                }
            }, this.openingBracketBlock = function(a, b, c, e, f) {
                var g = {
                        row: c,
                        column: e + 1
                    },
                    h = a.$findClosingBracket(b, g, f);
                if (h) {
                    var i = a.foldWidgets[h.row];
                    return null == i && (i = a.getFoldWidget(h.row)), "start" == i && h.row > g.row && (h.row--, h.column = a.getLine(h.row).length), d.fromPoints(g, h)
                }
            }, this.closingBracketBlock = function(a, b, c, e, f) {
                var g = {
                        row: c,
                        column: e
                    },
                    h = a.$findOpeningBracket(b, g);
                return h ? (h.column++, g.column--, d.fromPoints(h, g)) : void 0
            }
        }).call(e.prototype)
    }), define("ace/theme/textmate", ["require", "exports", "module", "ace/lib/dom"],
    function (a, b, c) {
        "use strict";
        b.isDark = !1, b.cssClass = "ace-tm", b.cssText = '.ace-tm .ace_gutter {background: #f0f0f0;color: #333;}.ace-tm .ace_print-margin {width: 1px;background: #e8e8e8;}.ace-tm .ace_fold {background-color: #6B72E6;}.ace-tm {background-color: #FFFFFF;color: black;}.ace-tm .ace_cursor {color: black;}.ace-tm .ace_invisible {color: rgb(191, 191, 191);}.ace-tm .ace_storage,.ace-tm .ace_keyword {color: blue;}.ace-tm .ace_constant {color: rgb(197, 6, 11);}.ace-tm .ace_constant.ace_buildin {color: rgb(88, 72, 246);}.ace-tm .ace_constant.ace_language {color: rgb(88, 92, 246);}.ace-tm .ace_constant.ace_library {color: rgb(6, 150, 14);}.ace-tm .ace_invalid {background-color: rgba(255, 0, 0, 0.1);color: red;}.ace-tm .ace_support.ace_function {color: rgb(60, 76, 114);}.ace-tm .ace_support.ace_constant {color: rgb(6, 150, 14);}.ace-tm .ace_support.ace_type,.ace-tm .ace_support.ace_class {color: rgb(109, 121, 222);}.ace-tm .ace_keyword.ace_operator {color: rgb(104, 118, 135);}.ace-tm .ace_string {color: rgb(3, 106, 7);}.ace-tm .ace_comment {color: rgb(76, 136, 107);}.ace-tm .ace_comment.ace_doc {color: rgb(0, 102, 255);}.ace-tm .ace_comment.ace_doc.ace_tag {color: rgb(128, 159, 191);}.ace-tm .ace_constant.ace_numeric {color: rgb(0, 0, 205);}.ace-tm .ace_variable {color: rgb(49, 132, 149);}.ace-tm .ace_xml-pe {color: rgb(104, 104, 91);}.ace-tm .ace_entity.ace_name.ace_function {color: #0000A2;}.ace-tm .ace_heading {color: rgb(12, 7, 255);}.ace-tm .ace_list {color:rgb(185, 6, 144);}.ace-tm .ace_meta.ace_tag {color:rgb(0, 22, 142);}.ace-tm .ace_string.ace_regex {color: rgb(255, 0, 0)}.ace-tm .ace_marker-layer .ace_selection {background: rgb(181, 213, 255);}.ace-tm.ace_multiselect .ace_selection.ace_start {box-shadow: 0 0 3px 0px white;}.ace-tm .ace_marker-layer .ace_step {background: rgb(252, 255, 0);}.ace-tm .ace_marker-layer .ace_stack {background: rgb(164, 229, 101);}.ace-tm .ace_marker-layer .ace_bracket {margin: -1px 0 0 -1px;border: 1px solid rgb(192, 192, 192);}.ace-tm .ace_marker-layer .ace_active-line {background: rgba(0, 0, 0, 0.07);}.ace-tm .ace_gutter-active-line {background-color : #dcdcdc;}.ace-tm .ace_marker-layer .ace_selected-word {background: rgb(250, 250, 255);border: 1px solid rgb(200, 200, 250);}.ace-tm .ace_indent-guide {background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAACCAYAAACZgbYnAAAAE0lEQVQImWP4////f4bLly//BwAmVgd1/w11/gAAAABJRU5ErkJggg==") right repeat-y;}';
        var d = a("../lib/dom");
        d.importCssString(b.cssText, b.cssClass)
    }), define("ace/line_widgets", ["require", "exports", "module", "ace/lib/oop", "ace/lib/dom", "ace/range"], 
    function(a, b, c) {
        "use strict";

        function d(a) {
            this.session = a, this.session.widgetManager = this, this.session.getRowLength = this.getRowLength, this.session.$getWidgetScreenLength = this.$getWidgetScreenLength, this.updateOnChange = this.updateOnChange.bind(this), this.renderWidgets = this.renderWidgets.bind(this), this.measureWidgets = this.measureWidgets.bind(this), this.session._changedWidgets = [], this.$onChangeEditor = this.$onChangeEditor.bind(this), this.session.on("change", this.updateOnChange), this.session.on("changeFold", this.updateOnFold), this.session.on("changeEditor", this.$onChangeEditor)
        }
        var e = (a("./lib/oop"), a("./lib/dom"));
        a("./range").Range;
        (function() {
            this.getRowLength = function(a) {
                var b;
                return b = this.lineWidgets ? this.lineWidgets[a] && this.lineWidgets[a].rowCount || 0 : 0, this.$useWrapMode && this.$wrapData[a] ? this.$wrapData[a].length + 1 + b : 1 + b
            }, this.$getWidgetScreenLength = function() {
                var a = 0;
                return this.lineWidgets.forEach(function(b) {
                    b && b.rowCount && !b.hidden && (a += b.rowCount)
                }), a
            }, this.$onChangeEditor = function(a) {
                this.attach(a.editor)
            }, this.attach = function(a) {
                a && a.widgetManager && a.widgetManager != this && a.widgetManager.detach(), this.editor != a && (this.detach(), this.editor = a, a && (a.widgetManager = this, a.renderer.on("beforeRender", this.measureWidgets), a.renderer.on("afterRender", this.renderWidgets)))
            }, this.detach = function(a) {
                var b = this.editor;
                if (b) {
                    this.editor = null, b.widgetManager = null, b.renderer.off("beforeRender", this.measureWidgets), b.renderer.off("afterRender", this.renderWidgets);
                    var c = this.session.lineWidgets;
                    c && c.forEach(function(a) {
                        a && a.el && a.el.parentNode && (a._inDocument = !1, a.el.parentNode.removeChild(a.el))
                    })
                }
            }, this.updateOnFold = function(a, b) {
                var c = b.lineWidgets;
                if (c && a.action) {
                    for (var d = a.data, e = d.start.row, f = d.end.row, g = "add" == a.action, h = e + 1; f > h; h++) c[h] && (c[h].hidden = g);
                    c[f] && (g ? c[e] ? c[f].hidden = g : c[e] = c[f] : (c[e] == c[f] && (c[e] = void 0), c[f].hidden = g))
                }
            }, this.updateOnChange = function(a) {
                var b = this.session.lineWidgets;
                if (b) {
                    var c = a.start.row,
                        d = a.end.row - c;
                    if (0 === d);
                    else if ("remove" == a.action) {
                        var e = b.splice(c + 1, d);
                        e.forEach(function(a) {
                            a && this.removeLineWidget(a)
                        }, this), this.$updateRows()
                    } else {
                        var f = new Array(d);
                        f.unshift(c, 0), b.splice.apply(b, f), this.$updateRows()
                    }
                }
            }, this.$updateRows = function() {
                var a = this.session.lineWidgets;
                if (a) {
                    var b = !0;
                    a.forEach(function(a, c) {
                        if (a)
                            for (b = !1, a.row = c; a.$oldWidget;) a.$oldWidget.row = c, a = a.$oldWidget
                    }), b && (this.session.lineWidgets = null)
                }
            }, this.addLineWidget = function(a) {
                this.session.lineWidgets || (this.session.lineWidgets = new Array(this.session.getLength()));
                var b = this.session.lineWidgets[a.row];
                b && (a.$oldWidget = b, b.el && b.el.parentNode && (b.el.parentNode.removeChild(b.el), b._inDocument = !1)), this.session.lineWidgets[a.row] = a, a.session = this.session;
                var c = this.editor.renderer;
                a.html && !a.el && (a.el = e.createElement("div"), a.el.innerHTML = a.html), a.el && (e.addCssClass(a.el, "ace_lineWidgetContainer"), a.el.style.position = "absolute", a.el.style.zIndex = 5, c.container.appendChild(a.el), a._inDocument = !0), a.coverGutter || (a.el.style.zIndex = 3), a.pixelHeight || (a.pixelHeight = a.el.offsetHeight), null == a.rowCount && (a.rowCount = a.pixelHeight / c.layerConfig.lineHeight);
                var d = this.session.getFoldAt(a.row, 0);
                if (a.$fold = d, d) {
                    var f = this.session.lineWidgets;
                    a.row != d.end.row || f[d.start.row] ? a.hidden = !0 : f[d.start.row] = a
                }
                return this.session._emit("changeFold", {
                    data: {
                        start: {
                            row: a.row
                        }
                    }
                }), this.$updateRows(), this.renderWidgets(null, c), this.onWidgetChanged(a), a
            }, this.removeLineWidget = function(a) {
                if (a._inDocument = !1, a.session = null, a.el && a.el.parentNode && a.el.parentNode.removeChild(a.el), a.editor && a.editor.destroy) try {
                    a.editor.destroy()
                } catch (b) {}
                if (this.session.lineWidgets) {
                    var c = this.session.lineWidgets[a.row];
                    if (c == a) this.session.lineWidgets[a.row] = a.$oldWidget, a.$oldWidget && this.onWidgetChanged(a.$oldWidget);
                    else
                        for (; c;) {
                            if (c.$oldWidget == a) {
                                c.$oldWidget = a.$oldWidget;
                                break
                            }
                            c = c.$oldWidget
                        }
                }
                this.session._emit("changeFold", {
                    data: {
                        start: {
                            row: a.row
                        }
                    }
                }), this.$updateRows()
            }, this.getWidgetsAtRow = function(a) {
                for (var b = this.session.lineWidgets, c = b && b[a], d = []; c;) d.push(c), c = c.$oldWidget;
                return d
            }, this.onWidgetChanged = function(a) {
                this.session._changedWidgets.push(a), this.editor && this.editor.renderer.updateFull()
            }, this.measureWidgets = function(a, b) {
                var c = this.session._changedWidgets,
                    d = b.layerConfig;
                if (c && c.length) {
                    for (var e = 1 / 0, f = 0; f < c.length; f++) {
                        var g = c[f];
                        if (g && g.el && g.session == this.session) {
                            if (!g._inDocument) {
                                if (this.session.lineWidgets[g.row] != g) continue;
                                g._inDocument = !0, b.container.appendChild(g.el)
                            }
                            g.h = g.el.offsetHeight, g.fixedWidth || (g.w = g.el.offsetWidth, g.screenWidth = Math.ceil(g.w / d.characterWidth));
                            var h = g.h / d.lineHeight;
                            g.coverLine && (h -= this.session.getRowLineCount(g.row), 0 > h && (h = 0)), g.rowCount != h && (g.rowCount = h, g.row < e && (e = g.row))
                        }
                    }
                    e != 1 / 0 && (this.session._emit("changeFold", {
                        data: {
                            start: {
                                row: e
                            }
                        }
                    }), this.session.lineWidgetWidth = null), this.session._changedWidgets = []
                }
            }, this.renderWidgets = function(a, b) {
                var c = b.layerConfig,
                    d = this.session.lineWidgets;
                if (d) {
                    for (var e = Math.min(this.firstRow, c.firstRow), f = Math.max(this.lastRow, c.lastRow, d.length); e > 0 && !d[e];) e--;
                    this.firstRow = c.firstRow, this.lastRow = c.lastRow, b.$cursorLayer.config = c;
                    for (var g = e; f >= g; g++) {
                        var h = d[g];
                        if (h && h.el)
                            if (h.hidden) h.el.style.top = -100 - (h.pixelHeight || 0) + "px";
                            else {
                                h._inDocument || (h._inDocument = !0, b.container.appendChild(h.el));
                                var i = b.$cursorLayer.getPixelPosition({
                                    row: g,
                                    column: 0
                                }, !0).top;
                                h.coverLine || (i += c.lineHeight * this.session.getRowLineCount(h.row)), h.el.style.top = i - c.offset + "px";
                                var j = h.coverGutter ? 0 : b.gutterWidth;
                                h.fixedWidth || (j -= b.scrollLeft), h.el.style.left = j + "px", h.fullWidth && h.screenWidth && (h.el.style.minWidth = c.width + 2 * c.padding + "px"), h.fixedWidth ? h.el.style.right = b.scrollBar.getWidth() + "px" : h.el.style.right = ""
                            }
                    }
                }
            }
        }).call(d.prototype), b.LineWidgets = d
    }), define("ace/ext/error_marker", ["require", "exports", "module", "ace/line_widgets", "ace/lib/dom", "ace/range"],
    function (a, b, c) {
        "use strict";

        function d(a, b, c) {
            for (var d = 0, e = a.length - 1; e >= d;) {
                var f = d + e >> 1,
                    g = c(b, a[f]);
                if (g > 0) d = f + 1;
                else {
                    if (!(0 > g)) return f;
                    e = f - 1
                }
            }
            return -(d + 1)
        }

        function e(a, b, c) {
            var e = a.getAnnotations().sort(h.comparePoints);
            if (e.length) {
                var f = d(e, {
                    row: b,
                    column: -1
                }, h.comparePoints);
                0 > f && (f = -f - 1), f >= e.length ? f = c > 0 ? 0 : e.length - 1 : 0 === f && 0 > c && (f = e.length - 1);
                var g = e[f];
                if (g && c) {
                    if (g.row === b) {
                        do g = e[f += c]; while (g && g.row === b);
                        if (!g) return e.slice()
                    }
                    var i = [];
                    b = g.row;
                    do i[0 > c ? "unshift" : "push"](g), g = e[f += c]; while (g && g.row == b);
                    return i.length && i
                }
            }
        }
        var f = a("../line_widgets").LineWidgets,
            g = a("../lib/dom"),
            h = a("../range").Range;
        b.showErrorMarker = function(a, b) {
            var c = a.session;
            c.widgetManager || (c.widgetManager = new f(c), c.widgetManager.attach(a));
            var d = a.getCursorPosition(),
                h = d.row,
                i = c.widgetManager.getWidgetsAtRow(h).filter(function(a) {
                    return "errorMarker" == a.type
                })[0];
            i ? i.destroy() : h -= b;
            var j, k = e(c, h, b);
            if (k) {
                var l = k[0];
                d.column = (l.pos && "number" != typeof l.column ? l.pos.sc : l.column) || 0, d.row = l.row, j = a.renderer.$gutterLayer.$annotations[d.row]
            } else {
                if (i) return;
                j = {
                    text: ["Looks good!"],
                    className: "ace_ok"
                }
            }
            a.session.unfold(d.row), a.selection.moveToPosition(d);
            var m = {
                    row: d.row,
                    fixedWidth: !0,
                    coverGutter: !0,
                    el: g.createElement("div"),
                    type: "errorMarker"
                },
                n = m.el.appendChild(g.createElement("div")),
                o = m.el.appendChild(g.createElement("div"));
            o.className = "error_widget_arrow " + j.className;
            var p = a.renderer.$cursorLayer.getPixelPosition(d).left;
            o.style.left = p + a.renderer.gutterWidth - 5 + "px", m.el.className = "error_widget_wrapper", n.className = "error_widget " + j.className, n.innerHTML = j.text.join("<br>"), n.appendChild(g.createElement("div"));
            var q = function(a, b, c) {
                return 0 !== b || "esc" !== c && "return" !== c ? void 0 : (m.destroy(), {
                    command: "null"
                })
            };
            m.destroy = function() {
                a.$mouseHandler.isMousePressed || (a.keyBinding.removeKeyboardHandler(q), c.widgetManager.removeLineWidget(m), a.off("changeSelection", m.destroy), a.off("changeSession", m.destroy), a.off("mouseup", m.destroy), a.off("change", m.destroy))
            }, a.keyBinding.addKeyboardHandler(q), a.on("changeSelection", m.destroy), a.on("changeSession", m.destroy), a.on("mouseup", m.destroy), a.on("change", m.destroy), a.session.widgetManager.addLineWidget(m), m.el.onmousedown = a.focus.bind(a), a.renderer.scrollCursorIntoView(null, .5, {
                bottom: m.el.offsetHeight
            })
        }, g.importCssString("    .error_widget_wrapper {        background: inherit;        color: inherit;        border:none    }    .error_widget {        border-top: solid 2px;        border-bottom: solid 2px;        margin: 5px 0;        padding: 10px 40px;        white-space: pre-wrap;    }    .error_widget.ace_error, .error_widget_arrow.ace_error{        border-color: #ff5a5a    }    .error_widget.ace_warning, .error_widget_arrow.ace_warning{        border-color: #F1D817    }    .error_widget.ace_info, .error_widget_arrow.ace_info{        border-color: #5a5a5a    }    .error_widget.ace_ok, .error_widget_arrow.ace_ok{        border-color: #5aaa5a    }    .error_widget_arrow {        position: absolute;        border: solid 5px;        border-top-color: transparent!important;        border-right-color: transparent!important;        border-left-color: transparent!important;        top: -5px;    }", "")
    }), define("ace/ace", ["require", "exports", "module", "ace/lib/fixoldbrowsers", "ace/lib/dom", "ace/lib/event", "ace/editor", "ace/edit_session", "ace/undomanager", "ace/virtual_renderer", "ace/worker/worker_client", "ace/keyboard/hash_handler", "ace/placeholder", "ace/multi_select", "ace/mode/folding/fold_mode", "ace/theme/textmate", "ace/ext/error_marker", "ace/config"],
    function (a, b, c) {
        "use strict";
        a("./lib/fixoldbrowsers");
        var d = a("./lib/dom"),
            e = a("./lib/event"),
            f = a("./editor").Editor,
            g = a("./edit_session").EditSession,
            h = a("./undomanager").UndoManager,
            i = a("./virtual_renderer").VirtualRenderer;
        a("./worker/worker_client"), a("./keyboard/hash_handler"), a("./placeholder"), a("./multi_select"), a("./mode/folding/fold_mode"), a("./theme/textmate"), a("./ext/error_marker"), b.config = a("./config"), b.require = a, b.edit = function(a) {
            if ("string" == typeof a) {
                var c = a;
                a = document.getElementById(c)
            }
            if (a && a.env && a.env.editor instanceof f) return a.env.editor;
            var g = "";
            if (a && /input|textarea/i.test(a.tagName)) {
                var h = a;
                g = h.value, a = d.createElement("pre"), h.parentNode.replaceChild(a, h)
            } else a && (g = d.getInnerText(a), a.innerHTML = "");
            var j = b.createEditSession(g),
                k = new f(new i(a));
            k.setSession(j);
            var l = {
                document: j,
                editor: k,
                onResize: k.resize.bind(k, null)
            };
            return h && (l.textarea = h), e.addListener(window, "resize", l.onResize), k.on("destroy", function() {
                e.removeListener(window, "resize", l.onResize), l.editor.container.env = null
            }), k.container.env = k.env = l, k
        }, b.createEditSession = function(a, b) {
            var c = new g(a, b);
            return c.setUndoManager(new h), c
        }, b.EditSession = g, b.UndoManager = h, b.version = "1.2.3"
    }),
    function() {
        window.require(["ace/ace"], function(a) {
            a && a.config.init(!0), window.ace || (window.ace = a);
            for (var b in a) a.hasOwnProperty(b) && (window.ace[b] = a[b])
        })
    }(),
    function(a) {
        "use strict";
        "object" == typeof exports ? module.exports = a(window.jQuery) : "function" == typeof define && define.amd ? define(["jquery"], a) : window.jQuery && !window.jQuery.fn.colorpicker && a(window.jQuery)
    }(function(a) {
        "use strict";
        var b = function(b, c) {
            this.value = {
                h: 0,
                s: 0,
                b: 0,
                a: 1
            }, this.origFormat = null, c && a.extend(this.colors, c), b && (void 0 !== b.toLowerCase ? (b += "", this.setColor(b)) : void 0 !== b.h && (this.value = b))
        };
        b.prototype = {
            constructor: b,
            colors: {
                aliceblue: "#f0f8ff",
                antiquewhite: "#faebd7",
                aqua: "#00ffff",
                aquamarine: "#7fffd4",
                azure: "#f0ffff",
                beige: "#f5f5dc",
                bisque: "#ffe4c4",
                black: "#000000",
                blanchedalmond: "#ffebcd",
                blue: "#0000ff",
                blueviolet: "#8a2be2",
                brown: "#a52a2a",
                burlywood: "#deb887",
                cadetblue: "#5f9ea0",
                chartreuse: "#7fff00",
                chocolate: "#d2691e",
                coral: "#ff7f50",
                cornflowerblue: "#6495ed",
                cornsilk: "#fff8dc",
                crimson: "#dc143c",
                cyan: "#00ffff",
                darkblue: "#00008b",
                darkcyan: "#008b8b",
                darkgoldenrod: "#b8860b",
                darkgray: "#a9a9a9",
                darkgreen: "#006400",
                darkkhaki: "#bdb76b",
                darkmagenta: "#8b008b",
                darkolivegreen: "#556b2f",
                darkorange: "#ff8c00",
                darkorchid: "#9932cc",
                darkred: "#8b0000",
                darksalmon: "#e9967a",
                darkseagreen: "#8fbc8f",
                darkslateblue: "#483d8b",
                darkslategray: "#2f4f4f",
                darkturquoise: "#00ced1",
                darkviolet: "#9400d3",
                deeppink: "#ff1493",
                deepskyblue: "#00bfff",
                dimgray: "#696969",
                dodgerblue: "#1e90ff",
                firebrick: "#b22222",
                floralwhite: "#fffaf0",
                forestgreen: "#228b22",
                fuchsia: "#ff00ff",
                gainsboro: "#dcdcdc",
                ghostwhite: "#f8f8ff",
                gold: "#ffd700",
                goldenrod: "#daa520",
                gray: "#808080",
                green: "#008000",
                greenyellow: "#adff2f",
                honeydew: "#f0fff0",
                hotpink: "#ff69b4",
                indianred: "#cd5c5c",
                indigo: "#4b0082",
                ivory: "#fffff0",
                khaki: "#f0e68c",
                lavender: "#e6e6fa",
                lavenderblush: "#fff0f5",
                lawngreen: "#7cfc00",
                lemonchiffon: "#fffacd",
                lightblue: "#add8e6",
                lightcoral: "#f08080",
                lightcyan: "#e0ffff",
                lightgoldenrodyellow: "#fafad2",
                lightgrey: "#d3d3d3",
                lightgreen: "#90ee90",
                lightpink: "#ffb6c1",
                lightsalmon: "#ffa07a",
                lightseagreen: "#20b2aa",
                lightskyblue: "#87cefa",
                lightslategray: "#778899",
                lightsteelblue: "#b0c4de",
                lightyellow: "#ffffe0",
                lime: "#00ff00",
                limegreen: "#32cd32",
                linen: "#faf0e6",
                magenta: "#ff00ff",
                maroon: "#800000",
                mediumaquamarine: "#66cdaa",
                mediumblue: "#0000cd",
                mediumorchid: "#ba55d3",
                mediumpurple: "#9370d8",
                mediumseagreen: "#3cb371",
                mediumslateblue: "#7b68ee",
                mediumspringgreen: "#00fa9a",
                mediumturquoise: "#48d1cc",
                mediumvioletred: "#c71585",
                midnightblue: "#191970",
                mintcream: "#f5fffa",
                mistyrose: "#ffe4e1",
                moccasin: "#ffe4b5",
                navajowhite: "#ffdead",
                navy: "#000080",
                oldlace: "#fdf5e6",
                olive: "#808000",
                olivedrab: "#6b8e23",
                orange: "#ffa500",
                orangered: "#ff4500",
                orchid: "#da70d6",
                palegoldenrod: "#eee8aa",
                palegreen: "#98fb98",
                paleturquoise: "#afeeee",
                palevioletred: "#d87093",
                papayawhip: "#ffefd5",
                peachpuff: "#ffdab9",
                peru: "#cd853f",
                pink: "#ffc0cb",
                plum: "#dda0dd",
                powderblue: "#b0e0e6",
                purple: "#800080",
                red: "#ff0000",
                rosybrown: "#bc8f8f",
                royalblue: "#4169e1",
                saddlebrown: "#8b4513",
                salmon: "#fa8072",
                sandybrown: "#f4a460",
                seagreen: "#2e8b57",
                seashell: "#fff5ee",
                sienna: "#a0522d",
                silver: "#c0c0c0",
                skyblue: "#87ceeb",
                slateblue: "#6a5acd",
                slategray: "#708090",
                snow: "#fffafa",
                springgreen: "#00ff7f",
                steelblue: "#4682b4",
                tan: "#d2b48c",
                teal: "#008080",
                thistle: "#d8bfd8",
                tomato: "#ff6347",
                turquoise: "#40e0d0",
                violet: "#ee82ee",
                wheat: "#f5deb3",
                white: "#ffffff",
                whitesmoke: "#f5f5f5",
                yellow: "#ffff00",
                yellowgreen: "#9acd32",
                transparent: "transparent"
            },
            _sanitizeNumber: function(a) {
                return "number" == typeof a ? a : isNaN(a) || null === a || "" === a || void 0 === a ? 1 : void 0 !== a.toLowerCase ? parseFloat(a) : 1
            },
            isTransparent: function(a) {
                return a ? (a = a.toLowerCase().trim(), "transparent" === a || a.match(/#?00000000/) || a.match(/(rgba|hsla)\(0,0,0,0?\.?0\)/)) : !1
            },
            rgbaIsTransparent: function(a) {
                return 0 === a.r && 0 === a.g && 0 === a.b && 0 === a.a
            },
            setColor: function(a) {
                a = a.toLowerCase().trim(), a && (this.isTransparent(a) ? this.value = {
                    h: 0,
                    s: 0,
                    b: 0,
                    a: 0
                } : this.value = this.stringToHSB(a) || {
                    h: 0,
                    s: 0,
                    b: 0,
                    a: 1
                })
            },
            stringToHSB: function(b) {
                b = b.toLowerCase();
                var c;
                "undefined" != typeof this.colors[b] && (b = this.colors[b], c = "alias");
                var d = this,
                    e = !1;
                return a.each(this.stringParsers, function(a, f) {
                    var g = f.re.exec(b),
                        h = g && f.parse.apply(d, [g]),
                        i = c || f.format || "rgba";
                    return h ? (e = i.match(/hsla?/) ? d.RGBtoHSB.apply(d, d.HSLtoRGB.apply(d, h)) : d.RGBtoHSB.apply(d, h), d.origFormat = i, !1) : !0
                }), e
            },
            setHue: function(a) {
                this.value.h = 1 - a
            },
            setSaturation: function(a) {
                this.value.s = a
            },
            setBrightness: function(a) {
                this.value.b = 1 - a
            },
            setAlpha: function(a) {
                this.value.a = parseInt(100 * (1 - a), 10) / 100
            },
            toRGB: function(a, b, c, d) {
                a || (a = this.value.h, b = this.value.s, c = this.value.b), a *= 360;
                var e, f, g, h, i;
                return a = a % 360 / 60, i = c * b, h = i * (1 - Math.abs(a % 2 - 1)), e = f = g = c - i, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a], {
                    r: Math.round(255 * e),
                    g: Math.round(255 * f),
                    b: Math.round(255 * g),
                    a: d || this.value.a
                }
            },
            toHex: function(a, b, c, d) {
                var e = this.toRGB(a, b, c, d);
                return this.rgbaIsTransparent(e) ? "transparent" : "#" + (1 << 24 | parseInt(e.r) << 16 | parseInt(e.g) << 8 | parseInt(e.b)).toString(16).substr(1)
            },
            toHSL: function(a, b, c, d) {
                a = a || this.value.h, b = b || this.value.s, c = c || this.value.b, d = d || this.value.a;
                var e = a,
                    f = (2 - b) * c,
                    g = b * c;
                return g /= f > 0 && 1 >= f ? f : 2 - f, f /= 2, g > 1 && (g = 1), {
                    h: isNaN(e) ? 0 : e,
                    s: isNaN(g) ? 0 : g,
                    l: isNaN(f) ? 0 : f,
                    a: isNaN(d) ? 0 : d
                }
            },
            toAlias: function(a, b, c, d) {
                var e = this.toHex(a, b, c, d);
                for (var f in this.colors)
                    if (this.colors[f] === e) return f;
                return !1
            },
            RGBtoHSB: function(a, b, c, d) {
                a /= 255, b /= 255, c /= 255;
                var e, f, g, h;
                return g = Math.max(a, b, c), h = g - Math.min(a, b, c), e = 0 === h ? null : g === a ? (b - c) / h : g === b ? (c - a) / h + 2 : (a - b) / h + 4, e = (e + 360) % 6 * 60 / 360, f = 0 === h ? 0 : h / g, {
                    h: this._sanitizeNumber(e),
                    s: f,
                    b: g,
                    a: this._sanitizeNumber(d)
                }
            },
            HueToRGB: function(a, b, c) {
                return 0 > c ? c += 1 : c > 1 && (c -= 1), 1 > 6 * c ? a + (b - a) * c * 6 : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a) * (2 / 3 - c) * 6 : a
            },
            HSLtoRGB: function(a, b, c, d) {
                0 > b && (b = 0);
                var e;
                e = .5 >= c ? c * (1 + b) : c + b - c * b;
                var f = 2 * c - e,
                    g = a + 1 / 3,
                    h = a,
                    i = a - 1 / 3,
                    j = Math.round(255 * this.HueToRGB(f, e, g)),
                    k = Math.round(255 * this.HueToRGB(f, e, h)),
                    l = Math.round(255 * this.HueToRGB(f, e, i));
                return [j, k, l, this._sanitizeNumber(d)]
            },
            toString: function(a) {
                a = a || "rgba";
                var b = !1;
                switch (a) {
                    case "rgb":
                        return b = this.toRGB(), this.rgbaIsTransparent(b) ? "transparent" : "rgb(" + b.r + "," + b.g + "," + b.b + ")";
                    case "rgba":
                        return b = this.toRGB(), "rgba(" + b.r + "," + b.g + "," + b.b + "," + b.a + ")";
                    case "hsl":
                        return b = this.toHSL(), "hsl(" + Math.round(360 * b.h) + "," + Math.round(100 * b.s) + "%," + Math.round(100 * b.l) + "%)";
                    case "hsla":
                        return b = this.toHSL(), "hsla(" + Math.round(360 * b.h) + "," + Math.round(100 * b.s) + "%," + Math.round(100 * b.l) + "%," + b.a + ")";
                    case "hex":
                        return this.toHex();
                    case "alias":
                        return this.toAlias() || this.toHex();
                    default:
                        return b
                }
            },
            stringParsers: [{
                re: /rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*?\)/,
                format: "rgb",
                parse: function(a) {
                    return [a[1], a[2], a[3], 1]
                }
            }, {
                re: /rgb\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*?\)/,
                format: "rgb",
                parse: function(a) {
                    return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], 1]
                }
            }, {
                re: /rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                format: "rgba",
                parse: function(a) {
                    return [a[1], a[2], a[3], a[4]]
                }
            }, {
                re: /rgba\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                format: "rgba",
                parse: function(a) {
                    return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
                }
            }, {
                re: /hsl\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*?\)/,
                format: "hsl",
                parse: function(a) {
                    return [a[1] / 360, a[2] / 100, a[3] / 100, a[4]]
                }
            }, {
                re: /hsla\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)/,
                format: "hsla",
                parse: function(a) {
                    return [a[1] / 360, a[2] / 100, a[3] / 100, a[4]]
                }
            }, {
                re: /#?([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/,
                format: "hex",
                parse: function(a) {
                    return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16), 1]
                }
            }, {
                re: /#?([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/,
                format: "hex",
                parse: function(a) {
                    return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16), 1]
                }
            }],
            colorNameToHex: function(a) {
                return "undefined" != typeof this.colors[a.toLowerCase()] ? this.colors[a.toLowerCase()] : !1
            }
        };
        var c = {
                horizontal: !1,
                inline: !1,
                color: !1,
                format: !1,
                input: "input",
                container: !1,
                component: ".add-on, .input-group-addon",
                sliders: {
                    saturation: {
                        maxLeft: 100,
                        maxTop: 100,
                        callLeft: "setSaturation",
                        callTop: "setBrightness"
                    },
                    hue: {
                        maxLeft: 0,
                        maxTop: 100,
                        callLeft: !1,
                        callTop: "setHue"
                    },
                    alpha: {
                        maxLeft: 0,
                        maxTop: 100,
                        callLeft: !1,
                        callTop: "setAlpha"
                    }
                },
                slidersHorz: {
                    saturation: {
                        maxLeft: 100,
                        maxTop: 100,
                        callLeft: "setSaturation",
                        callTop: "setBrightness"
                    },
                    hue: {
                        maxLeft: 100,
                        maxTop: 0,
                        callLeft: "setHue",
                        callTop: !1
                    },
                    alpha: {
                        maxLeft: 100,
                        maxTop: 0,
                        callLeft: "setAlpha",
                        callTop: !1
                    }
                },
                template: '<div class="colorpicker dropdown-menu"><div class="colorpicker-saturation"><i><b></b></i></div><div class="colorpicker-hue"><i></i></div><div class="colorpicker-alpha"><i></i></div><div class="colorpicker-color"><div /></div><div class="colorpicker-selectors"></div></div>',
                align: "right",
                customClass: null,
                colorSelectors: null
            },
            d = function(d, e) {
                if (this.element = a(d).addClass("colorpicker-element"), this.options = a.extend(!0, {}, c, this.element.data(), e), this.component = this.options.component, this.component = this.component !== !1 ? this.element.find(this.component) : !1, this.component && 0 === this.component.length && (this.component = !1), this.container = this.options.container === !0 ? this.element : this.options.container, this.container = this.container !== !1 ? a(this.container) : !1, this.input = this.element.is("input") ? this.element : this.options.input ? this.element.find(this.options.input) : !1, this.input && 0 === this.input.length && (this.input = !1), this.color = new b(this.options.color !== !1 ? this.options.color : this.getValue(), this.options.colorSelectors), this.format = this.options.format !== !1 ? this.options.format : this.color.origFormat, this.picker = a(this.options.template), this.options.customClass && this.picker.addClass(this.options.customClass), this.options.inline ? this.picker.addClass("colorpicker-inline colorpicker-visible") : this.picker.addClass("colorpicker-hidden"), this.options.horizontal && this.picker.addClass("colorpicker-horizontal"), ("rgba" === this.format || "hsla" === this.format || this.options.format === !1) && this.picker.addClass("colorpicker-with-alpha"), "right" === this.options.align && this.picker.addClass("colorpicker-right"), this.options.colorSelectors) {
                    var f = this;
                    a.each(this.options.colorSelectors, function(b, c) {
                        var d = a("<i />").css("background-color", c).data("class", b);
                        d.click(function() {
                            f.setValue(a(this).css("background-color"))
                        }), f.picker.find(".colorpicker-selectors").append(d)
                    }), this.picker.find(".colorpicker-selectors").show()
                }
                this.picker.on("mousedown.colorpicker touchstart.colorpicker", a.proxy(this.mousedown, this)), this.picker.appendTo(this.container ? this.container : a("input.minicolor").parent()), this.input !== !1 && (this.input.on({
                    "keyup.colorpicker": a.proxy(this.keyup, this)
                }), this.input.on({
                    "change.colorpicker": a.proxy(this.change, this)
                }), this.component === !1 && this.element.on({
                    "focus.colorpicker": a.proxy(this.show, this)
                }), this.options.inline === !1 && this.element.on({
                    "focusout.colorpicker": a.proxy(this.hide, this)
                })), this.component !== !1 && this.component.on({
                    "click.colorpicker": a.proxy(this.show, this)
                }), this.input === !1 && this.component === !1 && this.element.on({
                    "click.colorpicker": a.proxy(this.show, this)
                }), this.input !== !1 && this.component !== !1 && "color" === this.input.attr("type") && this.input.on({
                    "click.colorpicker": a.proxy(this.show, this),
                    "focus.colorpicker": a.proxy(this.show, this)
                }), this.update(), a(a.proxy(function() {
                    this.element.trigger("create")
                }, this))
            };
        d.Color = b, d.prototype = {
            constructor: d,
            destroy: function() {
                this.picker.remove(), this.element.removeData("colorpicker").off(".colorpicker"), this.input !== !1 && this.input.off(".colorpicker"), this.component !== !1 && this.component.off(".colorpicker"), this.element.removeClass("colorpicker-element"), this.element.trigger({
                    type: "destroy"
                })
            },
            reposition: function() {
                if (this.options.inline !== !1 || this.options.container) return !1;
                var a = this.container && this.container[0] !== document.body ? "position" : "offset",
                    b = this.component || this.element,
                    c = b[a]();
                "right" === this.options.align && (c.left -= this.picker.outerWidth() - b.outerWidth()), this.picker.css({
                    top: c.top + b.outerHeight(),
                    left: c.left
                })
            },
            show: function(b) {
                return this.isDisabled() ? !1 : (this.picker.addClass("colorpicker-visible").removeClass("colorpicker-hidden"), this.reposition(), a(window).on("resize.colorpicker", a.proxy(this.reposition, this)), !b || this.hasInput() && "color" !== this.input.attr("type") || b.stopPropagation && b.preventDefault && (b.stopPropagation(), b.preventDefault()), this.options.inline === !1 && a(window.document).on({
                    "mousedown.colorpicker": a.proxy(this.hide, this)
                }), void this.element.trigger({
                    type: "showPicker",
                    color: this.color
                }))
            },
            hide: function() {
                this.picker.addClass("colorpicker-hidden").removeClass("colorpicker-visible"), a(window).off("resize.colorpicker", this.reposition), a(document).off({
                    "mousedown.colorpicker": this.hide
                }), this.update(), this.element.trigger({
                    type: "hidePicker",
                    color: this.color
                })
            },
            updateData: function(a) {
                return a = a || this.color.toString(this.format), this.element.data("color", a), a
            },
            updateInput: function(a) {
                if (a = a || this.color.toString(this.format), this.input !== !1) {
                    if (this.options.colorSelectors) {
                        var c = new b(a, this.options.colorSelectors),
                            d = c.toAlias();
                        "undefined" != typeof this.options.colorSelectors[d] && (a = d)
                    }
                    this.input.prop("value", a)
                }
                return a
            },
            updatePicker: function(a) {
                void 0 !== a && (this.color = new b(a, this.options.colorSelectors));
                var c = this.options.horizontal === !1 ? this.options.sliders : this.options.slidersHorz,
                    d = this.picker.find("i");
                return 0 !== d.length ? (this.options.horizontal === !1 ? (c = this.options.sliders, d.eq(1).css("top", c.hue.maxTop * (1 - this.color.value.h)).end().eq(2).css("top", c.alpha.maxTop * (1 - this.color.value.a))) : (c = this.options.slidersHorz, d.eq(1).css("left", c.hue.maxLeft * (1 - this.color.value.h)).end().eq(2).css("left", c.alpha.maxLeft * (1 - this.color.value.a))), d.eq(0).css({
                    top: c.saturation.maxTop - this.color.value.b * c.saturation.maxTop,
                    left: this.color.value.s * c.saturation.maxLeft
                }), this.picker.find(".colorpicker-saturation").css("backgroundColor", this.color.toHex(this.color.value.h, 1, 1, 1)), this.picker.find(".colorpicker-alpha").css("backgroundColor", this.color.toHex()), this.picker.find(".colorpicker-color, .colorpicker-color div").css("backgroundColor", this.color.toString(this.format)), a) : void 0
            },
            updateComponent: function(a) {
                if (a = a || this.color.toString(this.format), this.component !== !1) {
                    var b = this.component.find("i").eq(0);
                    b.length > 0 ? b.css({
                        backgroundColor: a
                    }) : this.component.css({
                        backgroundColor: a
                    })
                }
                return a
            },
            update: function(a) {
                var b;
                return (this.getValue(!1) !== !1 || a === !0) && (b = this.updateComponent(), this.updateInput(b), this.updateData(b), this.updatePicker()), b
            },
            setValue: function(a) {
                this.color = new b(a, this.options.colorSelectors), this.update(!0), this.element.trigger({
                    type: "changeColor",
                    color: this.color,
                    value: a
                })
            },
            getValue: function(a) {
                a = void 0 === a ? "#000000" : a;
                var b;
                return b = this.hasInput() ? this.input.val() : this.element.data("color"), (void 0 === b || "" === b || null === b) && (b = a), b
            },
            hasInput: function() {
                return this.input !== !1
            },
            isDisabled: function() {
                return this.hasInput() ? this.input.prop("disabled") === !0 : !1
            },
            disable: function() {
                return this.hasInput() ? (this.input.prop("disabled", !0), this.element.trigger({
                    type: "disable",
                    color: this.color,
                    value: this.getValue()
                }), !0) : !1
            },
            enable: function() {
                return this.hasInput() ? (this.input.prop("disabled", !1), this.element.trigger({
                    type: "enable",
                    color: this.color,
                    value: this.getValue()
                }), !0) : !1
            },
            currentSlider: null,
            mousePointer: {
                left: 0,
                top: 0
            },
            mousedown: function(b) {
                b.pageX || b.pageY || !b.originalEvent || (b.pageX = b.originalEvent.touches[0].pageX, b.pageY = b.originalEvent.touches[0].pageY), b.stopPropagation(), b.preventDefault();
                var c = a(b.target),
                    d = c.closest("div"),
                    e = this.options.horizontal ? this.options.slidersHorz : this.options.sliders;
                if (!d.is(".colorpicker")) {
                    if (d.is(".colorpicker-saturation")) this.currentSlider = a.extend({}, e.saturation);
                    else if (d.is(".colorpicker-hue")) this.currentSlider = a.extend({}, e.hue);
                    else {
                        if (!d.is(".colorpicker-alpha")) return !1;
                        this.currentSlider = a.extend({}, e.alpha)
                    }
                    var f = d.offset();
                    this.currentSlider.guide = d.find("i")[0].style, this.currentSlider.left = b.pageX - f.left, this.currentSlider.top = b.pageY - f.top, this.mousePointer = {
                        left: b.pageX,
                        top: b.pageY
                    }, a(document).on({
                        "mousemove.colorpicker": a.proxy(this.mousemove, this),
                        "touchmove.colorpicker": a.proxy(this.mousemove, this),
                        "mouseup.colorpicker": a.proxy(this.mouseup, this),
                        "touchend.colorpicker": a.proxy(this.mouseup, this)
                    }).trigger("mousemove")
                }
                return !1
            },
            mousemove: function(a) {
                a.pageX || a.pageY || !a.originalEvent || (a.pageX = a.originalEvent.touches[0].pageX, a.pageY = a.originalEvent.touches[0].pageY), a.stopPropagation(), a.preventDefault();
                var b = Math.max(0, Math.min(this.currentSlider.maxLeft, this.currentSlider.left + ((a.pageX || this.mousePointer.left) - this.mousePointer.left))),
                    c = Math.max(0, Math.min(this.currentSlider.maxTop, this.currentSlider.top + ((a.pageY || this.mousePointer.top) - this.mousePointer.top)));
                return this.currentSlider.guide.left = b + "px", this.currentSlider.guide.top = c + "px", this.currentSlider.callLeft && this.color[this.currentSlider.callLeft].call(this.color, b / this.currentSlider.maxLeft), this.currentSlider.callTop && this.color[this.currentSlider.callTop].call(this.color, c / this.currentSlider.maxTop), "setAlpha" === this.currentSlider.callTop && this.options.format === !1 && (1 !== this.color.value.a ? (this.format = "rgba", this.color.origFormat = "rgba") : (this.format = "hex", this.color.origFormat = "hex")), this.update(!0), this.element.trigger({
                    type: "changeColor",
                    color: this.color
                }), !1
            },
            mouseup: function(b) {
                return b.stopPropagation(), b.preventDefault(), a(document).off({
                    "mousemove.colorpicker": this.mousemove,
                    "touchmove.colorpicker": this.mousemove,
                    "mouseup.colorpicker": this.mouseup,
                    "touchend.colorpicker": this.mouseup
                }), !1
            },
            change: function(a) {
                this.keyup(a)
            },
            keyup: function(a) {
                38 === a.keyCode ? (this.color.value.a < 1 && (this.color.value.a = Math.round(100 * (this.color.value.a + .01)) / 100), this.update(!0)) : 40 === a.keyCode ? (this.color.value.a > 0 && (this.color.value.a = Math.round(100 * (this.color.value.a - .01)) / 100), this.update(!0)) : (this.color = new b(this.input.val(), this.options.colorSelectors), this.color.origFormat && this.options.format === !1 && (this.format = this.color.origFormat), this.getValue(!1) !== !1 && (this.updateData(), this.updateComponent(), this.updatePicker())), this.element.trigger({
                    type: "changeColor",
                    color: this.color,
                    value: this.input.val()
                })
            }
        }, a.colorpicker = d, a.fn.colorpicker = function(b) {
            var c, e = arguments,
                f = this.each(function() {
                    var f = a(this),
                        g = f.data("colorpicker"),
                        h = "object" == typeof b ? b : {};
                    g || "string" == typeof b ? "string" == typeof b && (c = g[b].apply(g, Array.prototype.slice.call(e, 1))) : f.data("colorpicker", new d(this, h))
                });
            return "getValue" === b ? c : f
        }, a.fn.colorpicker.constructor = d
        }),
    function (a) {
        a.fn.ladiNotify = function (b) {
            var c = a.extend({
                showDuration: 4e3,
                hideDuration: 6e3
            }, b),
                d = "https://hstatic.punnel.com/img/icon/notify.svg",
                e = [{
                    key: "gsx$title",
                    className: ".nttitle"
                }, {
                    key: "gsx$content",
                    className: ".ntcontent"
                }, {
                    key: "gsx$time",
                    className: ".nttime"
                }, {
                    key: "gsx$image",
                    className: ".ntimage img"
                }];
            this.each(function () {
                function b(b) {
                    b = b.sort(function () {
                        return .5 - Math.random()
                    });
                    var g = c.showDuration,
                        j = c.hideDuration + g;
                    a(b).each(function () {
                        var a = this;
                        setTimeout(function () {
                            var b = Object.keys(a);
                            switch (e.forEach(function (c) {
                                if (-1 != b.indexOf(c.key))
                                    if ("gsx$image" != c.key) f.find(c.className).text(a[c.key].$t);
                                    else {
                                        var e = a[c.key].$t;
                                        Boolean(a[c.key].$t) || (e = d), f.find(c.className).attr("src", e)
                                    }
                            }), f.css("opacity", "1"), h) {
                                case "topleft":
                                    f.css("top", "0");
                                    break;
                                case "topright":
                                    f.css("top", "0");
                                    break;
                                case "bottomright":
                                    f.css("bottom", "0");
                                    break;
                                case "bottomleft":
                                    f.css("bottom", "0");
                                    break;
                                default:
                                    f.css("bottom", "0")
                            }
                        }, g), g += i, setTimeout(function () {
                            switch (f.css("opacity", "0"), h) {
                                case "topleft":
                                    f.css("top", "-100px");
                                    break;
                                case "topright":
                                    f.css("top", "-100px");
                                    break;
                                case "bottomright":
                                    f.css("bottom", "-100px");
                                    break;
                                case "bottomleft":
                                    f.css("bottom", "-100px");
                                    break;
                                default:
                                    f.css("bottom", "0")
                            }
                        }, j), j += i
                    })
                }
                var f = a(this),
                    g = f.data("notify").sheetid;
                if (void 0 != g && 0 != g.trim().length) {
                    e.forEach(function (a) {
                        "gsx$image" != a.key ? f.find(a.className).text("") : f.find(a.className).attr("src", d)
                    }), c.showDuration = Boolean(f.data("notify").showDuration) ? f.data("notify").showDuration : c.showDuration, c.hideDuration = Boolean(f.data("notify").hideDuration) ? f.data("notify").hideDuration : c.hideDuration;
                    var h = f.data("notify").position;
                    switch (h) {
                        case "topleft":
                            f.css({
                                top: "-100px",
                                left: "0",
                                right: "auto",
                                bottom: "auto"
                            });
                            break;
                        case "topright":
                            f.css({
                                top: "-100px",
                                right: "0",
                                left: "auto",
                                bottom: "auto"
                            });
                            break;
                        case "bottomright":
                            f.css({
                                bottom: "-100px",
                                right: "0",
                                left: "auto",
                                top: "auto"
                            });
                            break;
                        case "bottomleft":
                            f.css({
                                bottom: "-100px",
                                left: "0",
                                right: "auto",
                                top: "auto"
                            });
                            break;
                        default:
                            f[0].style.setProperty("position", "absolute", "important")
                    }
                    var i = c.showDuration + c.hideDuration;
                    a.getJSON("https://spreadsheets.google.com/feeds/list/" + g + "/1/public/values?alt=json", function (a) {
                        var c = a.feed.entry;
                        b(c);
                        var d = c.length;
                        setInterval(function () {
                            b(c)
                        }, i * d)
                    })
                }
            })
        }
    }(jQuery),
    function(a) {
        function b(b) {
            if ("string" == typeof b.data && (b.data = {
                    keys: b.data
                }), b.data && b.data.keys && "string" == typeof b.data.keys) {
                var c = b.handler,
                    d = b.data.keys.toLowerCase().split(" ");
                b.handler = function(b) {
                    if (this === b.target || !(a.hotkeys.options.filterInputAcceptingElements && a.hotkeys.textInputTypes.test(b.target.nodeName) || a.hotkeys.options.filterContentEditable && a(b.target).attr("contenteditable") || a.hotkeys.options.filterTextInputs && a.inArray(b.target.type, a.hotkeys.textAcceptingInputTypes) > -1)) {
                        var e = "keypress" !== b.type && a.hotkeys.specialKeys[b.which],
                            f = String.fromCharCode(b.which).toLowerCase(),
                            g = "",
                            h = {};
                        a.each(["alt", "ctrl", "shift"], function(a, c) {
                            b[c + "Key"] && e !== c && (g += c + "+")
                        }), b.metaKey && !b.ctrlKey && "meta" !== e && (g += "meta+"), b.metaKey && "meta" !== e && g.indexOf("alt+ctrl+shift+") > -1 && (g = g.replace("alt+ctrl+shift+", "hyper+")), e ? h[g + e] = !0 : (h[g + f] = !0, h[g + a.hotkeys.shiftNums[f]] = !0, "shift+" === g && (h[a.hotkeys.shiftNums[f]] = !0));
                        for (var i = 0, j = d.length; j > i; i++)
                            if (h[d[i]]) return c.apply(this, arguments)
                    }
                }
            }
        }
        a.hotkeys = {
            version: "0.8",
            specialKeys: {
                8: "backspace",
                9: "tab",
                10: "return",
                13: "return",
                16: "shift",
                17: "ctrl",
                18: "alt",
                19: "pause",
                20: "capslock",
                27: "esc",
                32: "space",
                33: "pageup",
                34: "pagedown",
                35: "end",
                36: "home",
                37: "left",
                38: "up",
                39: "right",
                40: "down",
                45: "insert",
                46: "del",
                59: ";",
                61: "=",
                96: "0",
                97: "1",
                98: "2",
                99: "3",
                100: "4",
                101: "5",
                102: "6",
                103: "7",
                104: "8",
                105: "9",
                106: "*",
                107: "+",
                109: "-",
                110: ".",
                111: "/",
                112: "f1",
                113: "f2",
                114: "f3",
                115: "f4",
                116: "f5",
                117: "f6",
                118: "f7",
                119: "f8",
                120: "f9",
                121: "f10",
                122: "f11",
                123: "f12",
                144: "numlock",
                145: "scroll",
                173: "-",
                186: ";",
                187: "=",
                188: ",",
                189: "-",
                190: ".",
                191: "/",
                192: "`",
                219: "[",
                220: "\\",
                221: "]",
                222: "'"
            },
            shiftNums: {
                "`": "~",
                1: "!",
                2: "@",
                3: "#",
                4: "$",
                5: "%",
                6: "^",
                7: "&",
                8: "*",
                9: "(",
                0: ")",
                "-": "_",
                "=": "+",
                ";": ": ",
                "'": '"',
                ",": "<",
                ".": ">",
                "/": "?",
                "\\": "|"
            },
            textAcceptingInputTypes: ["text", "password", "number", "email", "url", "range", "date", "month", "week", "time", "datetime", "datetime-local", "search", "color", "tel"],
            textInputTypes: /textarea|input|select/i,
            options: {
                filterInputAcceptingElements: !0,
                filterTextInputs: !0,
                filterContentEditable: !0
            }
        }, a.each(["keydown", "keyup", "keypress"], function() {
            a.event.special[this] = {
                add: b
            }
        })
    }(jQuery || this.jQuery || window.jQuery),
    function(a) {
        function b(a, b, c, d, e, f) {
            a = String(a);
            for (var g = 0, h = 0, i = a.length, j = "", k = 0; i > h;) {
                var l = a.charCodeAt(h);
                for (l = 256 > l ? c[l] : -1, g = (g << e) + l, k += e; k >= f;) {
                    k -= f;
                    var m = g >> k;
                    j += d.charAt(m), g ^= m << k
                }++h
            }
            return !b && k > 0 && (j += d.charAt(g << f - k)), j
        }
        for (var c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", d = "", e = [256], f = [256], g = 0, h = {
                encode: function(a) {
                    var b = a.replace(/[\u0080-\u07ff]/g, function(a) {
                        var b = a.charCodeAt(0);
                        return String.fromCharCode(192 | b >> 6, 128 | 63 & b)
                    }).replace(/[\u0800-\uffff]/g, function(a) {
                        var b = a.charCodeAt(0);
                        return String.fromCharCode(224 | b >> 12, 128 | b >> 6 & 63, 128 | 63 & b)
                    });
                    return b
                },
                decode: function(a) {
                    var b = a.replace(/[\u00e0-\u00ef][\u0080-\u00bf][\u0080-\u00bf]/g, function(a) {
                        var b = (15 & a.charCodeAt(0)) << 12 | (63 & a.charCodeAt(1)) << 6 | 63 & a.charCodeAt(2);
                        return String.fromCharCode(b)
                    }).replace(/[\u00c0-\u00df][\u0080-\u00bf]/g, function(a) {
                        var b = (31 & a.charCodeAt(0)) << 6 | 63 & a.charCodeAt(1);
                        return String.fromCharCode(b)
                    });
                    return b
                }
            }; 256 > g;) {
            var i = String.fromCharCode(g);
            d += i, f[g] = g, e[g] = c.indexOf(i), ++g
        }
        var j = a.base64 = function(a, b, c) {
            return b ? j[a](b, c) : a ? null : this
        };
        j.btoa = j.encode = function(a, d) {
            return a = j.raw === !1 || j.utf8encode || d ? h.encode(a) : a, a = b(a, !1, f, c, 8, 6), a + "====".slice(a.length % 4 || 4)
        }, j.atob = j.decode = function(a, c) {
            a = String(a).split("=");
            var f = a.length;
            do --f, a[f] = b(a[f], !0, e, d, 6, 8); while (f > 0);
            return a = a.join(""), j.raw === !1 || j.utf8decode || c ? h.decode(a) : a
        }
    }(jQuery), window.BASE64 = jQuery.base64,
    function(a, b) {
        a.widget("ui.rotatable", a.ui.mouse, {
            widgetEventPrefix: "rotate",
            options: {
                handle: !1,
                angle: !1,
                wheelRotate: !0,
                snap: !1,
                step: 22.5,
                handleOffset: {
                    top: 0,
                    left: 0
                },
                rotationCenterX: !1,
                rotationCenterY: !1,
                start: null,
                rotate: null,
                stop: null
            },
            rotationCenterX: function(a) {
                return a === b ? this.options.rotationCenterX : void(this.options.rotationCenterX = a)
            },
            rotationCenterY: function(a) {
                return a === b ? this.options.rotationCenterY : void(this.options.rotationCenterY = a)
            },
            handle: function(a) {
                return a === b ? this.options.handle : void(this.options.handle = a)
            },
            angle: function(a) {
                return a === b ? this.options.angle : (this.options.angle = a, this.elementCurrentAngle = a, void this.performRotation(this.options.angle))
            },
            _create: function() {
                var b;
                this.options.handle ? b = this.options.handle : (b = a(document.createElement("div")), b.addClass("ui-rotatable-handle")), this.listeners = {
                    rotateElement: a.proxy(this.rotateElement, this),
                    startRotate: a.proxy(this.startRotate, this),
                    stopRotate: a.proxy(this.stopRotate, this),
                    wheelRotate: a.proxy(this.wheelRotate, this)
                }, this.options.wheelRotate, b.draggable({
                    helper: "clone",
                    start: this.dragStart,
                    handle: b
                }), b.bind("mousedown", this.listeners.startRotate), b.closest(this.element).length || b.appendTo(this.element), 0 != this.options.angle ? (this.elementCurrentAngle = this.options.angle, this.performRotation(this.elementCurrentAngle)) : this.elementCurrentAngle = 0
            },
            _destroy: function() {
                this.element.removeClass("ui-rotatable"), this.element.find(".ui-rotatable-handle").remove(), this.options.wheelRotate
            },
            performRotation: function(a) {
                this.element.css("transform-origin", this.options.rotationCenterX + "% " + this.options.rotationCenterY + "%"), this.element.css("-ms-transform-origin", this.options.rotationCenterX + "% " + this.options.rotationCenterY + "%"), this.element.css("-webkit-transform-origin", this.options.rotationCenterX + "% " + this.options.rotationCenterY + "%"), this.element.css("transform", "rotate(" + a + "rad)"), this.element.css("-moz-transform", "rotate(" + a + "rad)"), this.element.css("-webkit-transform", "rotate(" + a + "rad)"), this.element.css("-o-transform", "rotate(" + a + "rad)")
            },
            getElementOffset: function() {
                this.performRotation(0);
                var a = this.element.offset();
                return this.performRotation(this.elementCurrentAngle), a
            },
            getElementCenter: function() {
                var a = this.getElementOffset();
                if (this.options.rotationCenterX === !1) var b = a.left + this.element.width() / 2,
                    c = a.top + this.element.height() / 2;
                else var b = a.left + this.element.width() / 100 * this.options.rotationCenterX,
                    c = a.top + this.element.height() / 100 * this.options.rotationCenterY;
                return Array(b, c)
            },
            dragStart: function(a) {
                return this.element ? !1 : void 0
            },
            startRotate: function(b) {
                var c = this.getElementCenter(),
                    d = b.pageX - this.options.handleOffset.left - c[0],
                    e = b.pageY - this.options.handleOffset.top - c[1];
                return this.mouseStartAngle = Math.atan2(e, d), this.elementStartAngle = this.elementCurrentAngle, this.hasRotated = !1, this._propagate("start", b), a(document).bind("mousemove", this.listeners.rotateElement), a(document).bind("mouseup", this.listeners.stopRotate), !1
            },
            rotateElement: function(a) {
                if (!this.element || this.element.disabled) return !1;
                var b = this.getRotateAngle(a),
                    c = this.elementCurrentAngle;
                if (this.elementCurrentAngle = b, this._propagate("rotate", a), this._propagate("rotate", a) === !1) return this.elementCurrentAngle = c, !1;
                var d = this.ui();
                return this._trigger("rotate", a, d) === !1 ? (this.elementCurrentAngle = c, !1) : (d.angle.current != b && (b = d.angle.current, this.elementCurrentAngle = b), this.performRotation(b), c != b && (this.hasRotated = !0), !1)
            },
            stopRotate: function(b) {
                return this.element && !this.element.disabled ? (a(document).unbind("mousemove", this.listeners.rotateElement), a(document).unbind("mouseup", this.listeners.stopRotate), this.elementStopAngle = this.elementCurrentAngle, this._propagate("stop", b), setTimeout(function() {
                    this.element = !1
                }, 10), !1) : void 0
            },
            getRotateAngle: function(a) {
                var b = this.getElementCenter(),
                    c = a.pageX - this.options.handleOffset.left - b[0],
                    d = a.pageY - this.options.handleOffset.top - b[1],
                    e = Math.atan2(d, c),
                    f = e - this.mouseStartAngle + this.elementStartAngle;
                return (this.options.snap || a.shiftKey) && (f = this._calculateSnap(f)), f
            },
            wheelRotate: function(a) {
                var b = Math.round(a.originalEvent.deltaY / 10) * Math.PI / 180;
                (this.options.snap || a.shiftKey) && (b = this._calculateSnap(b)), b = this.elementCurrentAngle + b, this.angle(b), this._trigger("rotate", a, this.ui())
            },
            _calculateSnap: function(a) {
                var b = a / Math.PI * 180;
                return b = Math.round(b / this.options.step) * this.options.step, b * Math.PI / 180
            },
            _propagate: function(b, c) {
                a.ui.plugin.call(this, b, [c, this.ui()]), "rotate" !== b && this._trigger(b, c, this.ui())
            },
            plugins: {},
            ui: function() {
                return {
                    api: this,
                    element: this.element,
                    angle: {
                        start: this.elementStartAngle,
                        current: this.elementCurrentAngle,
                        stop: this.elementStopAngle
                    }
                }
            }
        })
    }(jQuery);