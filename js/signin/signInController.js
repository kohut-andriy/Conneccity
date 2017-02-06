angular
  .module('signIn')
  .controller('SignInController', SignInController);

SignInController.$inject = ['$state', 'OAuth', '$timeout'];

function SignInController($state, OAuth, $timeout) {
  const vm = this;

  vm.isValid = true;
  vm.conncction = true;
  vm.login = login;

  function login(user) {
    vm.encoded = btoa('clientapp:123456');

    OAuth.getAccessToken(user, {
      headers: {
        Authorization: `Basic ${vm.encoded}`,
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    }).then(() => {
      $state.go('app');
    }, (err) => {
      if (err.status === '401') {
        vm.isValid = false;
      } else {
        vm.conncction = false;
      }
      $timeout(() => {
        vm.isValid = true;
        vm.conncction = true;
      }, 5000);
    });
  }
}
