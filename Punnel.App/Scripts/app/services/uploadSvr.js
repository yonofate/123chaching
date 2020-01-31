angular.module("punnelApp").factory("uploadSvr", ["$http", "APP_CONFIG", function ($http, APP_CONFIG) {
    var items = {};
    return items.upload = function (object, callback, err_callback) {
        var value = object;
        var formData = new FormData;
        formData.append("file", value);
        $.ajax({
            url: APP_CONFIG.URL + "/project/upimg",
            dataType: "text",
            cache: false,
            contentType: false,
            processData: false,
            enctype: "multipart/form-data",
            data: formData,
            type: "POST",
            success: callback,
            error: err_callback
        });
    }, items.uploadAvatar = function (avatar, callback, err_callback) {
        var url = avatar;
        var formData = new FormData;
        formData.append("file", url);
        $.ajax({
            url: APP_CONFIG.URL + "/User/upavatar",
            dataType: "text",
            cache: false,
            contentType: false,
            processData: false,
            enctype: "multipart/form-data",
            data: formData,
            type: "POST",
            success: callback,
            error: err_callback
        });
    }, items.uploadThumb = function (res, next, err_callback) {
        var temp = res;
        var form = new FormData;
        form.append("file", temp);
        $.ajax({
            url: APP_CONFIG.URL + "/project/upthumbnail",
            dataType: "text",
            cache: false,
            contentType: false,
            processData: false,
            enctype: "multipart/form-data",
            data: form,
            type: "POST",
            success: callback,
            error: err_callback
        });
    }, items;
}]);
