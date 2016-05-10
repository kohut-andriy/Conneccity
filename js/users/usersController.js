usersModule.controller('usersController', ['$scope','getUsers',function ($scope,getUsers) {
  getUsers.get().then(function (response) {
    $scope.users = response.data;
    console.log($scope.users);
  }).then(function () {
    $scope.$broadcast('rebuild:me');
  });
  
  $scope.getFormattedDistance = function (distance) {
    $scope.$broadcast('rebuild:me');
    return distance<1000?distance+'m':distance/1000+'km';
  }
}]);