app.controller('appController', ['$scope', 'getSignedUserInfo', 'OAuthToken', 'formatter', '$cookies', 'socketFactory', '$stateParams',
  function ($scope, getSignedUserInfo, OAuthToken, formatter, $cookies, socketFactory, $stateParams) {

    var getInterests = function () {
      getSignedUserInfo.get().then(function (data) {

        $scope.user = data.data;

        $cookies.putObject('currentUser', $scope.user);

        $scope.ponchesList = [];

        console.log($scope.user.ponches);

        for (var ponch in $scope.user.ponches) {
          $scope.ponchesList.push($scope.user.ponches[ponch].name);
        }

      });

      getSignedUserInfo.getInterests().then(function (data) {
        $scope.related = [];

        for (var ponch in data.data) {
          $scope.related.push(data.data[ponch].name);
        }

        //  console.log(data);
      });
    };

    $scope.hidePicker = function () {
      $scope.show = false;
    };

    getInterests();

    if (!OAuthToken.isAuthenticated) {
      socketFactory.connect();
    }

    getSignedUserInfo.getCounter().then(function (data) {

      $scope.counter = new Set(data.data.unreadChatsIds);

      socketFactory.counter = $scope.counter;
    });


    //$scope.showEdit = false;


    $scope.logout = function () {
      OAuthToken.removeToken();
    };

    $scope.scrollBuild = function () {
      $scope.$broadcast('rebuild:me');
    };

    $scope.getUserImgUrl = function (url) {
      return formatter.getUserImg(url);
    };

    $scope.getCounter = function () {
      return $scope.counter ? $scope.counter.size : 0;
    };

    $scope.submitPonches = function (list) {
      getSignedUserInfo.putPonches(list).then(function () {
        $scope.show = false;
        getInterests();
      });
    };

  }]);

