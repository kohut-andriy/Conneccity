angular
  .module('createMeeting')
  .controller(CreateMeetingController);

CreateMeetingController.$inject = ['$scope', 'createMeeting', 'formatter', '$cookies', '$state',
  'getMeetingInfo', '$stateParams'];

function CreateMeetingController($scope, createMeeting, formatter, $cookies, $state,
  getMeetingInfo, $stateParams) {
  $scope.user = $cookies.getObject('currentUser');
  $scope.getMapSrc = function getMapSrc() {
    return formatter.getGoogleMapsSrc([$scope.user.latitude,
      $scope.user.longitude]);
  };

  $scope.meeting = {};

  getMeetingInfo.get($stateParams.id).then((data) => {
    const meeting = data.data;
    $scope.meeting.invitedIds = [];
    $scope.meeting.startAt = new Date(meeting.startAt);
    $scope.meeting.latitude = meeting.latitude;
    $scope.meeting.longitude = meeting.longitude;
    for (var member in meeting.members) {
      if (meeting.members[member].id !== $cookies.getObject('currentUser').id) {
        $scope.meeting.invitedIds.push(meeting.members[member].id);
      }
    }

    $scope.meeting.description = meeting.description;
  });

  $scope.create = function create(data) {
    if ($stateParams.id) {
      createMeeting.update({
        startAt: data.startAt,
        latitude: $scope.placePicker.lat,
        longitude: $scope.placePicker.lng,
        description: data.description,
        invitedIds: $cookies.userId ? [$cookies.userId] : $scope.meeting.invitedIds,
      }, $stateParams.id).then(() => {
        $cookies.userId = '';
        $state.go('app.meetings');
      });
    } else {
      createMeeting.create({
        startAt: data.startAt,
        latitude: $scope.placePicker.lat,
        longitude: $scope.placePicker.lng,
        description: data.description,
        invitedIds: $cookies.userId ? [$cookies.userId] : $scope.meeting.invitedIds,
      }).then(() => {
        $cookies.userId = '';
        $state.go('app.meetings');
      });
    }
  };
}
