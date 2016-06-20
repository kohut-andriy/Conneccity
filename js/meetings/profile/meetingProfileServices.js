meetingProfileModule.factory('getMeetingInfo', ['$http', function ($http) {
  return {
    get: function (id) {
      return $http({
        url: GOOGLE_IP + "meetings/" + id,
        method: "GET"
      });
    },
    getMembers: function (id) {
      return $http({
        url: GOOGLE_IP + "meetings/" + id + "/members",
        method: "GET"
      });
    },
    join: function (id) {
      return $http({
        url: GOOGLE_IP + "meetings/" + id + "/members",
        method: "POST"
      });
    },
    leave: function (id) {
      return $http({
        url: GOOGLE_IP + "meetings/" + id + "/members",
        method: "DELETE"
      })
    }
  };
}]);