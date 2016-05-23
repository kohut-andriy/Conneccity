app.controller('appController', ['$scope', 'getSignedUserInfo', 'OAuthToken', function ($scope, getSignedUserInfo, OAuthToken) {
  getSignedUserInfo.get().then(function (data) {
    $scope.user = data.data;
    console.log($scope.user);
  });

  $scope.logout = function () {
    OAuthToken.removeToken();
  };
}]);