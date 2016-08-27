signInModule.controller('signInController', ['$scope', '$http', '$state', 'OAuth', '$timeout','$animate',
  function ($scope, $http, $state, OAuth, $timeout, $animate) {

    $scope.isValid = true;
    $scope.conncction = true;

    $scope.login = function (user) {

      $scope.encoded = btoa("clientapp:123456");

      OAuth.getAccessToken(user, {
        headers: {
          "Authorization": "Basic " + $scope.encoded,
          "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
        }
      }).then(function () {
          $state.go('app');
        },
        function (e) {
          if (e.status == '401') {
            $scope.isValid = false;
          } else {
            $scope.conncction = false;
          }
          $timeout(function () {
            $scope.isValid = true;
            $scope.conncction = true;
          }, 5000);
        });
    };

  }]);