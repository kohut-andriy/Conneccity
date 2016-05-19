usersModule.factory('getUsers', ['$http', function ($http) {
  var token = ACCESS_TOKEN;

  return {
    get: function () {
      return $http({
        url: GOOGLE_IP + "users?count=50",
        method: "GET"
      });
    }
  };
}]);