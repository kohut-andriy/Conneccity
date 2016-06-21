createMeetingModule.factory('createEvent',  ['$http', function ($http) {
  return {
    create: function (data) {
      return $http({
        url: GOOGLE_IP + "events/",
        method: "POST",
        data: data
      });
    },
    update: function (data, id) {
      return $http({
        url: GOOGLE_IP + "events/" + id,
        method: "PUT",
        data: data
      });
    }
  }
}]);