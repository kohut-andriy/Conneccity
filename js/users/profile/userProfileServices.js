userProfileModule.factory('getUserData', ['$http', function ($http) {

  return {
    get: function (id) {
      return $http({
        url: GOOGLE_IP + "users/" + id,
        method: "GET"
      });
    }
  };
}]);