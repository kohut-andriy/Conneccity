usersModule.controller('usersController', ['$scope','getUsers',function ($scope,getUsers) {
  getUsers.get().then(function (response) {
    $scope.users = response.data;
  });
}]);