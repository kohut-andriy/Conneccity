signUpModule.factory('addUser', ['$http', function ($http) {

  return {
    create: function (userData) {
      return $http({
        url: GOOGLE_IP + "signup",
        method: "POST",
        data: userData,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  };
}]);