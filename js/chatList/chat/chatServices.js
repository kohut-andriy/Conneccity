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
    }
  };
}]);