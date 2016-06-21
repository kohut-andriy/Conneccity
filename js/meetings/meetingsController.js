meetingsModule.controller('meetingsController', ['$scope', 'getMeetings', 'formatter', 'getMeetingInfo', '$state',
  function ($scope, getMeetings, formatter, getMeetingInfo, $state) {
    getMeetings.get().then(function (response) {
      $scope.meetings = response.data;
      console.log($scope.meetings);
    });

    $scope.getAddress = function (lat, lng) {

      return formatter.getAddress(lat, lng);
    };

    $scope.getDistance = function (distance) {

      return formatter.getDistance(distance);
    };

    $scope.getTime = function (time) {

      return formatter.formatDate(time);
    };

    $scope.getFilteredMeetings = function (type) {
      getMeetings.get(type).then(function (response) {
        $scope.meetings = response.data;
        console.log($scope.meetings);
      });
    };

    $scope.accept = function (id) {
      getMeetingInfo.join(id).then(function () {
        $state.reload();
      });
    };

    $scope.decline = function (id) {
      getMeetingInfo.leave(id);
      $state.reload();
    };

    $scope.getStatusStile = function (status) {
      return formatter.getMeetingStatusIconStyle(status);
    };

    $scope.$watch(function () {
      $scope.$broadcast('rebuild:me');
    });
  }]);