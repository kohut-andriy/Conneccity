createMeetingModule.controller('createMeetingController',
  ['$scope', 'createMeeting', 'formatter', '$cookies', '$state', 'getMeetingInfo', '$stateParams',
    function ($scope, createMeeting, formatter, $cookies, $state, getMeetingInfo, $stateParams) {

      $scope.user = $cookies.getObject('currentUser');
      $scope.getMapSrc = function () {
        return formatter.getGoogleMapsSrc([$scope.user.latitude,
          $scope.user.latitude]);
      };

      $scope.meeting = {};
      
      getMeetingInfo.get($stateParams.id).then(function (data) {
        var meeting = data.data;
        $scope.meeting.invitedIds = [];
        $scope.meeting.startAt = new Date(meeting.startAt);
        $scope.meeting.latitude = meeting.latitude;
        $scope.meeting.longitude = meeting.longitude;
        for(var member in meeting.members) {
          if(meeting.members[member].id != $cookies.getObject('currentUser').id) {
            $scope.meeting.invitedIds.push(meeting.members[member].id);
            console.log(meeting.members[member].id);
          }
        }

        $scope.meeting.description =  meeting.description;
      });

      $scope.create = function (data) {

        console.log($cookies.userId);

        if($stateParams.id) {
          createMeeting.update({
            "startAt": data.startAt,
            "latitude": data.latitude,
            "longitude": data.longitude,
            "description": data.description,
            "invitedIds": $cookies.userId ? [$cookies.userId] : $scope.meeting.invitedIds
          }, $stateParams.id).then(function (data) {
            $state.go('app.meetings');
            console.log(data);
            $cookies.userId = '';
          });
        } else {
          createMeeting.create({
            "startAt": data.startAt,
            "latitude": data.latitude,
            "longitude": data.longitude,
            "description": data.description,
            "invitedIds": $cookies.userId ? [$cookies.userId] : $scope.meeting.invitedIds
          }).then(function (data) {
            $state.go('app.meetings');
            console.log(data);
            $cookies.userId = '';
          });
        }
      }

    }]);