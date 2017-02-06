angular
  .module('signUp')
  .controller('SignUpController', SignUpController);

SignUpController.$inject = ['addUser', 'OAuthToken', '$state', '$cookies', 'getUserLocation'];

function SignUpController(addUser, OAuthToken, $state, $cookies, getUserLocation) {
  const vm = this;

  vm.signUp = signUp;

  function signUp(user) {
    vm.userInfo = {
      email: user.email,
      name: user.firstName,
      surname: user.lastName,
      dateBirthday: '1997-12-20',
      gender: user.genderMale ? '1' : '2',
      password: user.password,
      passwordConfirm: user.passwordConfirm,
    };

    addUser.create(vm.userInfo).then((data) => {
      OAuthToken.setToken(data.data);
      $cookies.putObject(user);
      getUserLocation.get();
    }).then(() => {
      $state.go('app');
    });
  }
}
