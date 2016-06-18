signInModule.controller('signInController', ['$scope', '$http', '$state','OAuth',
  function ($scope, $http, $state ,OAuth) {

  $scope.login = function (user) {
    user.scope = '';

    $scope.encoded = btoa("clientapp:123456");

    OAuth.getAccessToken(user, {
      headers: {
        "Authorization": "Basic " + $scope.encoded,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    }).then(function () {
      $state.go('app');
    });
  };

}]);