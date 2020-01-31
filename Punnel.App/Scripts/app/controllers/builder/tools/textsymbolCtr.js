angular.module("punnelApp").controller("textsymbolCtr", ["$rootScope", "$state", "$scope", "$translate", "$stateParams", "$window", function (a, b, c, d, e, f) {
    c.itemTextSymbolGroup = "", c.showMoreTextSymbol = function () {
        c.itemTextSymbolGroup = lp_symbol_json[group_symbol[0].value]
    };
    var g = this;
    g.dbclickTextSymbol = function () {
        c.showMoreTextSymbol()
    }, f.angularControllerDbclickTextSymbol = g.dbclickTextSymbol
}]);