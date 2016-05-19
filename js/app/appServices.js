app.factory('getSignedUserInfo', ['$http', function ($http) {

  return {
    get: function () {
      return $http({
        url: GOOGLE_IP + "profile",
        method: "GET"
      });
    }
  };
}]);