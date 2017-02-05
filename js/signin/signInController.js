angular
  .module('signIn')
  .controller('SignInController', SignInController);

SignInController.$inject = ['$scope', '$http', '$state', 'OAuth', '$timeout'];

function SignInController($scope, $http, $state, OAuth, $timeout) {
  $scope.isValid = true;
  $scope.conncction = true;

  $scope.login = function login(user) {
    $scope.encoded = btoa('clientapp:123456');

    OAuth.getAccessToken(user, {
      headers: {
        Authorization: `Basic ${$scope.encoded}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).then(() => {
      $state.go('app');
    }, (err) => {
      if (err.status === '401') {
        $scope.isValid = false;
      } else {
        $scope.conncction = false;
      }
      $timeout(() => {
        $scope.isValid = true;
        $scope.conncction = true;
      }, 5000);
    });
  };
}
