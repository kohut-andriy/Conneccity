usersModule.factory('getUsers', ['$http', function ($http) {
  var token = ACCESS_TOKEN;

  return {
    get: function () {
      return $http({
        url: GOOGLE_IP + "users",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      });
    }
  };
}]);