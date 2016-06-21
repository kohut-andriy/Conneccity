createMeetingModule.controller('createMeetingController', ['$scope', 'createMeeting', 'formatter', '$cookies', '$state',
  function ($scope, createMeeting, formatter, $cookies, $state) {

    $scope.user = $cookies.getObject('currentUser');
    $scope.getMapSrc = function () {
      return formatter.getGoogleMapsSrc([$scope.user.latitude,
        $scope.user.latitude]);
    };
    
    $scope.create = function (data) {

      console.log($cookies.userId);
      createMeeting.create({
        "startAt" : data.startAt,
        "latitude" : data.latitude,
        "longitude" : data.longitude,
        "description" : data.description,
        "invitedIds" : [$cookies.userId]
      }).then(function (data) {
        $state.go('app.meetings');
        console.log(data);
      });
    }
    
  }]);