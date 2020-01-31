punnelApp.service("notifyUserService", ["$restful", function ($restful) {
    return {
        sendNotifyToUser: function (userId,title,content,url,callback) {
            var data = {
                title: title,
                content: content,
                url: url,
                isBroadCast: false,
                userId: userId
            }
            $restful.post("/notification", data).then(function (result) {
                callback(result);
            });
        }
    }
}]);