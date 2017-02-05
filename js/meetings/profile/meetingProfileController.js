angular
  .module('meetingProfile')
  .controller(MeetingProfileController);

MeetingProfileController.$inject = ['$scope', 'formatter', 'getMeetingInfo', '$stateParams', '$state',
  '$cookies', 'mapCreate'];

function MeetingProfileController($scope, formatter, getMeetingInfo, $stateParams, $state,
  $cookies, mapCreate) {
  getMeetingInfo.get($stateParams.id).then((response) => {
    $scope.meeting = response.data;

    mapCreate.drawDefaultMarker($scope.meeting);
  });

  $scope.getAddress = function getAddress(lat, lng) {

    return formatter.getAddress(lat, lng);
  };

  $scope.parseDate = function parseDate(date) {

    return formatter.formatDate(date);
  };

  $scope.getUserImg = function getUserImg(url) {
    return formatter.getUserImg(url);
  };

  $scope.$watch(() => {
    $scope.$broadcast('scrollRebuild');
  });

  $scope.join = function join(id) {
    getMeetingInfo.join(id);
  };

  $scope.leave = function leave(id) {
    getMeetingInfo.leave(id).success(() => {
      $state.go('app.meetings');
    });
  };

  getMeetingInfo.sendMessage($stateParams.id).then((data) => {
    $scope.chatId = data.data.id;
  });

  $scope.getStatusStile = function getStatusStile(status) {
    return formatter.getMeetingStatusIconStyle(status);
  };

  $scope.checkPermition = function checkPermition(id) {
    return $cookies.getObject('currentUser').id === id;
  };
}
