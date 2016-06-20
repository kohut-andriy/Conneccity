chatModule.factory('getChat', ['$http', function ($http) {

  return {
    get: function (id) {
      return $http({
        url: GOOGLE_IP + "chats/" + id,
        method: "GET"
      });
    }, 
    getMessages: function (id) {
      return $http({
        url: GOOGLE_IP + "chats/" + id + "/messages",
        method: "GET"
      });
    },
    send: function (id, message) {
      return $http({
        url: GOOGLE_IP + "chats/" + id + "/messages",
        data: {
          "message": message
        },
        method: "POST"
      }) 
    }
  };
}]);