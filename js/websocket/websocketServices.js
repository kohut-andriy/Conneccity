angular
  .module('websocket')
  .service(socketFactory);

socketFactory.$inject = ['OAuthToken', '$rootScope', '$cookies'];

function socketFactory(OAuthToken, $rootScope, $cookies) {
  const ws = new WebSocket(`ws://api.conneccity.net/dev/notifications?token=${OAuthToken.getToken().access_token}`);

  this.counter = new Set();

  this.chatMessage = {};

  this.message = {};

  this.connect = () => {
    ws.onopen = () => {};

    ws.onclose = () => {};

    ws.onmessage = (event) => {
      const eventData = JSON.parse(event.data);

      this.message = eventData.payload;

      if (this.message.sender.id !== $cookies.getObject('currentUser').id) {
        this.counter.add(eventData.payload.chatId);
      }

      if (eventData.type === 'MESSAGE_READ') {
        this.counter.delete(eventData.payload.chatId);
      } else {
        this.chatMessage[eventData.payload.chatId] = eventData.payload.id;
      }

      $rootScope.$digest();
    };

    ws.onerror = () => {};
  };
}
