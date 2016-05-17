signInModule.controller('signInController', ['$scope', '$http', '$httpParamSerializer', '$cookies', '$cookieStore', function ($scope, $http, $httpParamSerializer, $cookies, $cookieStore) {

  $scope.login = function (user) {

    $scope.data =
    {
      "grant_type": "password",
      "scope": "",
      "username": user.name,
      "password": user.password
    };

    $scope.encoded = btoa("clientapp:123456");

    var req = {
      method: 'POST',
      url: GOOGLE_IP + "oauth/token",
      data: $httpParamSerializer($scope.data),
      headers: {
        "Authorization": "Basic " + $scope.encoded,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      }
    };

    if (user) {
      console.log('req');
      $http(req).success(function (name) {
        $cookieStore.put('accessToken', name.access_token);
        console.log(name);
      }).error(function (name, ere) {
        console.log(ere);
      });
    }
  };

}]);