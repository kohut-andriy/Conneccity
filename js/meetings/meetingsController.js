meetingsModule.controller('meetingsController', ['$scope', 'getMeetings', 'formatter', function ($scope, getMeetings, formatter) {
  getMeetings.get().then(function (response) {
    $scope.meetings = response.data;
    console.log($scope.meetings);
  });

  $scope.getAddress = function (lat, lng) {

    return formatter.getAddress(lat ,lng);
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
}]);