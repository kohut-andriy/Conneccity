meetingsModule.controller('meetingsController', ['$scope', 'getMeetings', 'formatter', 'getMeetingInfo', '$state',
  function ($scope, getMeetings, formatter, getMeetingInfo, $state) {
    getMeetings.get().then((response) => {
      $scope.meetings = response.data;
    });

    $scope.getAddress = function getAddress(lat, lng) {
      return formatter.getAddress(lat, lng);
    };

    $scope.getDistance = function getDistance(distance) {
      return formatter.getDistance(distance);
    };

    $scope.getTime = function getTime(time) {
      return formatter.formatDate(time);
    };

    $scope.getFilteredMeetings = function getFilteredMeetings(type) {
      getMeetings.get(type).then((response) => {
        $scope.meetings = response.data;
      });
    };

    $scope.accept = function accept(id) {
      getMeetingInfo.join(id).then(() => {
        $state.reload();
      });
    };

    $scope.decline = function decline(id) {
      getMeetingInfo.leave(id);
      $state.reload();
    };

    $scope.getStatusStile = function getStatusStile(status) {
      return formatter.getMeetingStatusIconStyle(status);
    };

    $scope.$watch(() => {
      $scope.$broadcast('rebuild:me');
    });
  }]);
