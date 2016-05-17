/*app.constant('defaultUrl', "http://10.5.6.14:8080/");

app.value('token', {
  accessToken: null,
  refreshToken: null
});*/

app.factory('getSignedUserInfo', ['$http', function ($http) {

  return {
    get: function () {
      return $http({
        url: GOOGLE_IP + "profile",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + ACCESS_TOKEN,
          "Content-Type": "application/json"
        }
      });
    }
  };
}]);