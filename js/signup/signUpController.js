signUpModule.controller('signUpController', ['$scope', 'addUser', 'OAuthToken', '$state', '$cookies',
  function ($scope, addUser, OAuthToken, $state, $cookies) {

    
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
        $state.go('app');
      });

    };
    /* var req = {
     method: "POST",
     url: GOOGLE_IP + "signup",
     data: $scope.data,
     headers: {
     //   "Authorization": "Basic " + $scope.encoded,
     "Content-Type": "application/json"
     }
     };

     // $http(req);*/

  }]);
