createMeetingModule.factory('createMeeting',  ['$http', function ($http) {
  return {
    create: function (data) {
      return $http({
        url: GOOGLE_IP + "meetings/",
        method: "POST",
        data: data
      });
    },
    update: function (data, id) {
      return $http({
        url: GOOGLE_IP + "meetings/" + id,
        method: "PUT",
        data: data
      });
    }
  }
}]);