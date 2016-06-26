chatListModule.service('getSocketData', ['OAuthToken', '$rootScope', function (OAuthToken, $rootScope) {
  var self = this;

  var ws = new WebSocket('ws://46.63.89.93:8080/notifications?token=' + OAuthToken.getToken()['access_token']);

  self.message = {};

  self.connect = function () {
      ws.onopen = function (event) {

      };

      ws.onclose = function (event) {
        console.log('close');
      };

      ws.onmessage = function (event) {
        let gottenMessage = JSON.parse(event.data).payload;
        console.log(JSON.parse(event.data));
        self.message = {
          'message': gottenMessage.message,
          date: new Date(gottenMessage.date),
          'sender': {'id': gottenMessage.sender.id}
        };

        $rootScope.$digest();
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

chatListModule.value('unreadMessagesCount', 0);