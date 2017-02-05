signUpModule.controller('signUpController', ['$scope', 'addUser', 'OAuthToken', '$state', '$cookies', 'getUserLocation',
  function signUpController($scope, addUser, OAuthToken, $state, $cookies, getUserLocation) {
    $scope.signUp = function signUp(user) {
      $scope.userInfo = {
        email: user.email,
        name: user.firstName,
        surname: user.lastName,
        dateBirthday: '1997-12-20',
        gender: user.genderMale ? '1' : '2',
        password: user.password,
        passwordConfirm: user.passwordConfirm,
      };

      addUser.create($scope.userInfo).then((data) => {
        OAuthToken.setToken(data.data);
        $cookies.putObject(user);
        getUserLocation.get();
      }).then(() => {
        $state.go('app');
      });
    };
  }]);
