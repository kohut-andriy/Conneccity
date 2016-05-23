usersModule.controller('usersController', ['$scope', 'getUsers', 'formatter', function ($scope, getUsers, formatter) {
  getUsers.get().then(function (response) {
    $scope.users = response.data;
  }).then(function () {
    $scope.$broadcast('rebuild:me');
  });

  $scope.getFormattedDistance = function (distance) {
    $scope.$broadcast('rebuild:me');
    return formatter.getDistance(distance);
  }
}]);