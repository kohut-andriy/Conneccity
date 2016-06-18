meetingsModule.factory('getMeetings', ['$http', function ($http) {

  return {
    get: function (type = "") {
      return $http({
        url: GOOGLE_IP + "meetings/" + type,
        method: "GET"
      });
    }
  };
}]);