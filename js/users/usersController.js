usersModule.controller('usersController', ['$scope', 'getUsers', 'formatter', function ($scope, getUsers, formatter) {
  getUsers.get().then(function (response) {
    $scope.users = response.data;
  });

  $scope.getFormattedDistance = function (distance) {
    return formatter.getDistance(distance);
  };

  $scope.$watch(function () {
    $scope.$broadcast('scrollRebuild');
  });

  $scope.getUserImgUrl = function (url) {
    return formatter.getUserListImg(url);
  };
}]);