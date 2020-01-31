punnelApp.factory("suggestService", ["localStorageService", function (localStorageService) {
    return {
        getVal: function (key) {
            var data = localStorageService.get('pn-help');
            if (data && data != null) return data[key];
            else return null;
        },
        setVal: function (key, value) {
            if (pnSuggest[key] != value) {
                var data = localStorageService.get('pn-help');
                if (data && data != null) {
                    data[key] = value;
                    localStorageService.set('pn-help', data);
                } else {
                    data = pnSuggest;
                    data[key] = value;
                    localStorageService.set('pn-help', data);
                }
                pnSuggest = data;
            }
        }
    }
}]);