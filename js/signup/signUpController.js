signUpModule.controller('signUpController', ['$scope', '$http', function ($scope, $http) {

  $scope.data = {
    "email": "1234@gmail.com",
    "name": "kogut",
    "surname": "andrey",
    "dateBirthday": "1997-12-20",//+(new Date()),
    "gender": 1,
    "password": "123456",
    "passwordConfirm": "123456",
    "mobilePhone": "+12345678"
  };

  // $scope.encoded = btoa("clientapp:123456");

  var req = {
    method: "POST",
    url: GOOGLE_IP + "signup",
    data: $scope.data,
    headers: {
      //   "Authorization": "Basic " + $scope.encoded,
      "Content-Type": "application/json"
    }
  };

  $http(req);

}]);
