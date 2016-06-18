eventsModule.factory('getEvents', ['$http', function ($http) {

  return {
    get: function (type = "") {
      return $http({
        url: GOOGLE_IP + "events/" + type,
        method: "GET"
      });
    }
  };
}]);