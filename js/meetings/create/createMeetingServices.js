createMeetingModule.factory('createMeeting',  ['$http', function ($http) {
  return {
    create: function (data) {
      return $http({
        url: GOOGLE_IP + "meetings/",
        method: "POST",
        data: data
      });
    }
  }
}]);