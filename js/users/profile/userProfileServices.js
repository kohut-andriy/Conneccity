userProfileModule.factory('getUserData', ['$http', function ($http) {

  return {
    get: function (id) {
      return $http({
        url: GOOGLE_IP + "users/" + id,
        method: "GET"
      });
    },
    getEvents: function (id, type = "") {
      console.log(type);

      return $http({
        url: GOOGLE_IP + "users/" + id + "/events/" + type,
        method: "GET"
      });
    }
  };
}]);