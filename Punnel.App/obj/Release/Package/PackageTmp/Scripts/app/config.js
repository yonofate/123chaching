punnelApp.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

punnelApp.config(['FacebookProvider', function (FacebookProvider) {
    FacebookProvider.init(FB_APP_ID);
}]);

punnelApp.config(['tooltipsConfProvider', function configConf(tooltipsConfProvider) {
    tooltipsConfProvider.configure({
        'smart': true,
        'size': 'small',
        'speed': 'medium',
        'tooltipTemplateUrlCache': true
    });
}])

punnelApp.config(['uibPaginationConfig',
    function (paginationConfig) {
        paginationConfig.itemsPerPage = 20;
        paginationConfig.firstText = '«',
            paginationConfig.nextText = '›';
        paginationConfig.lastText = '»'
        paginationConfig.previousText = '‹';
        paginationConfig.maxSize = 10;
    }])
    .config(['uibDatepickerConfig', function (datePickerConfig) {
        datePickerConfig.showWeeks = false;
    }])
    .config(['uibDatepickerPopupConfig', function (datePickerConfig) {
        datePickerConfig.datepickerPopup = 'dd/MM/yyyy';
        datePickerConfig.clearText = 'Xóa';
        datePickerConfig.closeText = 'Đóng';
        datePickerConfig.showWeeks = false;
        datePickerConfig.currentText = 'Hôm nay';
    }]).config(['$mdThemingProvider', function ($mdThemingProvider) {
        $mdThemingProvider.theme('default')
            .primaryPalette('blue');
    }]);