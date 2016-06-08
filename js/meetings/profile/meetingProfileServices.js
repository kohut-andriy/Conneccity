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
    }
  };
}]);