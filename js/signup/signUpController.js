signUpModule.controller('signUpController', ['$scope', 'addUser', 'OAuthToken', '$state', '$cookies', 'getUserLocation',
  function ($scope, addUser, OAuthToken, $state, $cookies, getUserLocation) {


    $scope.signUp = function (user) {

      $scope.userInfo = {
        "email": user.email,
        "name": user.firstName,
        "surname": user.lastName,
        "dateBirthday": "1997-12-20",//+(new Date()),
        "gender": user.genderMale ? "1" : "2",
        "password": user.password,
        "passwordConfirm": user.passwordConfirm
      };

      addUser.create($scope.userInfo).then(function (data) {
        OAuthToken.setToken(data.data);
        console.log(data);
        $cookies.putObject(user);
        getUserLocation.get();
      }).then(function () {
        $state.go('app');
      });

    };

  }]);
