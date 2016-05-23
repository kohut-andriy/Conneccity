usersModule.factory('getUsers', ['$http', function ($http) {

  return {
    get: function () {
      return $http({
        url: GOOGLE_IP + "users?count=50",
        method: "GET"
      });
    }
  };
}]);