chatListModule.factory('getChats', ['$http', function getChats($http) {
  return {
    get() {
      return $http({
        url: GOOGLE_IP + 'chats/',
        method: 'GET',
      });
    },
  };
}]);

