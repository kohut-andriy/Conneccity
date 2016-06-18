app.controller('appController', ['$scope', 'getSignedUserInfo', 'OAuthToken', 'formatter', '$cookies',
  function ($scope, getSignedUserInfo, OAuthToken, formatter, $cookies) {

    getSignedUserInfo.get().then(function (data) {
      $scope.user = data.data;

      $cookies.putObject('currentUser', $scope.user);

      console.log($cookies.getObject('currentUser'));

    });

    $scope.logout = function () {
      OAuthToken.removeToken();
    };

    $scope.scrollBuild = function () {
      $scope.$broadcast('rebuild:me');
    };

    $scope.getUserImgUrl = function (url) {
      return formatter.getUserImg(url);
    };
  }]);

