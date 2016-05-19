meetingsModule.factory('getMeetings', ['$http', function ($http) {

  return {
    get: function () {
      return $http({
        url: GOOGLE_IP + "meetings",
        method: "GET"
      });
    }
  };
}]);