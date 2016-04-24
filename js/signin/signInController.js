signInModule.controller('signInController', ['$scope', '$http', '$httpParamSerializer', function ($scope, $http, $httpParamSerializer) {

  $scope.data =
  {
    "grant_type": "password",
    "scope": "",
    "username": "google@mail.ru",
    "password": "google228"

  };
  $scope.encoded = btoa("clientapp:123456");

  var req = {
    method: 'POST',
    url: GOOGLE_IP + "/oauth/token",
    data: $httpParamSerializer($scope.data),
    headers: {
      "Authorization": "Basic " + $scope.encoded,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
  };
  $http(req).success(function (name) {
    console.log("Google WP");
    console.log(name);
  }).error(function (name, ere) {
    console.log(ere);
  });


}]);