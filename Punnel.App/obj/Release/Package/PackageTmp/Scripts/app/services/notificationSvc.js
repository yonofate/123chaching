punnelApp.factory('notificationSvc', ['$rootScope', 'Hub', '$timeout', '$auth', 'APP_CONFIG', function ($rootScope, Hub, $timeout, $auth, APP_CONFIG){
	//declaring the hub connection
    var token = $auth.getToken() || '';
    var uid = $auth.getUserId() || '';
    var hub = new Hub('notificationHub', {
        rootPath: APP_CONFIG.URL_HUB,
		//client side methods
		listeners:{
			'notifyuser_receive': function (data) {
                $rootScope.$apply(function () {
                    $rootScope.$broadcast('eNotifyUrl', data);
                });
			},
			'subcrible_receive': function (data) {
                $rootScope.$apply(function () {
                    $rootScope.$broadcast('eSubcrible', data);
                });
            },
            'unview_receive': function (data) {
                $rootScope.$apply(function () {
                    $rootScope.$broadcast('eUnView',data);
                });
            },
            'cmd_receive': function (data) {
                $rootScope.$apply(function () {
                    $rootScope.$broadcast('eCommand', data);
                });
            }
		},
        jsonp: true,        
		//server side methods
        methods: ['unView', 'resetCount', 'read','sendCmd'],
		
		//query params sent on initial connection
        queryParams: {
            'token': token,
            'uid': uid
		},

		//handle connection error
        errorHandler: function (error) {
            console.log(error.message);
		},
		
        stateChanged: function(state){
            switch (state.newState) {
                case $.signalR.connectionState.connecting:
                    break;
                case $.signalR.connectionState.connected:
                    //console.log('connected:' + uid);
                    unView();
                    break;
                case $.signalR.connectionState.reconnecting:
                    console.log('reconnecting');
                    break;
                case $.signalR.connectionState.disconnected:
                    //console.log('disconnected');
                    break;
            }
        }
	});


    var unView = function () {
        hub.unView(uid); 
    };
    var resetCount = function (date) {
        hub.resetCount(uid, date); 
    };
    var read = function (id) {
        hub.read(id);
    };
    var sendCmd = function (u,cmd) {
        hub.sendCmd(u,cmd);
    };

	return {
        unView: unView,
        resetCount: resetCount,
        read: read,
        sendCmd: sendCmd
	};
}]);