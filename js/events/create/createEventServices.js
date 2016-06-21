createMeetingModule.factory('createEvent',  ['$http', function ($http) {
  return {
    create: function (data) {
      return $http({
        url: GOOGLE_IP + "events/",
        method: "POST",
        data: data
      });
    }
  }
}]);