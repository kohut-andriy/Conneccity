eventsModule.factory('getEvents', ['$http', function ($http) {

  return {
    get: function () {
      return $http({
        url: GOOGLE_IP + "events",
        method: "GET"
      });
    }
  };
}]);