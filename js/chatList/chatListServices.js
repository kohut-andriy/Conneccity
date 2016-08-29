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

