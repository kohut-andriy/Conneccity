app.factory('getSignedUserInfo', ['$http', function ($http) {

  return {
    get: function () {
      return $http({
        url: GOOGLE_IP + "profile",
        method: "GET"
      });
    },
    getInterests: function () {
      return $http({
        url: GOOGLE_IP + "ponches",
        method: "GET"
      });
    },
    putPonches: function (data) {
      return $http({
        url: GOOGLE_IP + "profile/ponches",
        method: "PUT",
        data: {
          "ponches" : data
        }
      });
    },
    getCounter : function () {
      return $http({
        url: GOOGLE_IP + "profile/counters",
        method: "GET"
      })
    }
  };
}]);