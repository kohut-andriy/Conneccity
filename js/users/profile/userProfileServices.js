userProfileModule.factory('getUserData', ['$http',function ($http) {
  var token = ACCESS_TOKEN;

  return {
    get: function (id) {
      return $http({
        url: GOOGLE_IP + "users/" + id,
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      });
    }
  };
}]);