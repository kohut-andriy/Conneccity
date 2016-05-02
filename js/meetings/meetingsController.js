meetingsModule.controller('meetingsController', ['$scope','getMeetings',function ($scope,getMeetings) {
  getMeetings.get().then(function (response) {
    $scope.meetings = response.data;

  });
}]);