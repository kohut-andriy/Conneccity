app.controller('appController', ['$scope','getSignedUserInfo', function ($scope,getSignedUserInfo) {
  getSignedUserInfo.get().then(function (data) {
    $scope.user = data.data;
    console.log($scope.user);
  });
}]);