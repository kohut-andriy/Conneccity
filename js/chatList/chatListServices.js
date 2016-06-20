chatListModule.factory('getSocketData', ['OAuthToken',  function(OAuthToken) {
  var service = {};

  service.connect = function() {
    if (service.ws) {
      return;
    }
    var ws = new WebSocket("ws://api.conneccity.net/notifications");

    ws.onopen = function() {
      /*ws.send(JSON.stringify({
        type: "auth",
        token: OAuthToken.getAccessToken()
      }));*/
      console.log("Succeeded to open a conection");
    };

    ws.onerror = function() {
      console.log("Failed to open a connection");
    };

    ws.onmessage = function(message) {
      /*var obj = JSON.parse(message.data);
      if (obj.result) return;

      if (obj.id) {
        setTimeout(function() {
          service.callback(obj);
        }, 1000)
      }*/
    };
    service.ws = ws;
  };

  service.subscribe = function(callback) {
    service.callback = callback;
  };

  return service;
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