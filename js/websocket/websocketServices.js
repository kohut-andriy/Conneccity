websocket.service('socketFactory', ['OAuthToken', '$rootScope', '$cookies', function (OAuthToken, $rootScope, $cookies) {
  var self = this;

  var ws = new WebSocket('ws://api.conneccity.net/dev/notifications?token=' + OAuthToken.getToken()['access_token']);

  self.counter = new Set();

  self.chatMessage = { };

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

      self.message = eventData.payload;

      if (self.message.sender.id != $cookies.getObject('currentUser').id) {
        self.counter.add(eventData.payload.chatId);
      }


      if (eventData.type == 'MESSAGE_READ') {
        self.counter.delete(eventData.payload.chatId);
      } else  {
        self.chatMessage[eventData.payload.chatId] = eventData.payload.id;
      }
      $rootScope.$digest();
    };

    ws.onerror = function (error) {
      console.log(error);
    };
  };
}]);
