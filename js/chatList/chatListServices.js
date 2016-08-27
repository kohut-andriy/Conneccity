chatListModule.service('getSocketData', ['OAuthToken', '$rootScope', function (OAuthToken, $rootScope) {
  var self = this;

  var ws = new WebSocket('ws://api.conneccity.net/dev/notifications?token=' + OAuthToken.getToken()['access_token']);

  self.message = {};

  self.connect = function () {
    ws.onopen = function (event) {

    };

    ws.onclose = function (event) {
      console.log('close');
    };

    ws.onmessage = function (event) {
      // let gottenMessage = JSON.parse(event.data).payload;
      let eventData = JSON.parse(event.data);

      console.log(eventData);

      if (eventData.type == 'MESSAGE_RECEIVED') {
        self.message = eventData.payload;
      } else if (eventData.type == 'MESSAGE_READ') {
        $rootScope.counter.delete(eventData.payload.chatId);
      }

    };

    ws.onerror = function (error) {
      console.log(error);
    };
  };
}]);

chatListModule.factory('getChats', ['$http', function ($http) {

  return {
    get: function () {
      return $http({
        url: GOOGLE_IP + "chats/",
        method: "GET"
      });
    }
  };
}]);

