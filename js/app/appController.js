app.controller('appController',
  ['$scope', 'getSignedUserInfo', 'OAuthToken', 'formatter', '$cookies', 'socketFactory',
    '$stateParams', '$interval', 'getUserLocation',
    function appController($scope, getSignedUserInfo, OAuthToken, formatter,
      $cookies, socketFactory, $stateParams, $interval, getUserLocation) {
      getUserLocation.get();

      $interval(() => {
        getUserLocation.get();
      }, 1000 * 60 * 5);

      const getInterests = function getInterests() {
        getSignedUserInfo.get().then((data) => {
          $scope.user = data.data;

          $cookies.putObject('currentUser', $scope.user);

          $scope.ponchesList = [];

          $scope.user.ponches.forEach((ponch) => {
            $scope.ponchesList.push(ponch.name);
          });
        });

        getSignedUserInfo.getInterests().then((data) => {
          $scope.related = [];

          data.data.forEach((ponch) => {
            $scope.related.push(ponch.name);
          });
        });
      };

      $scope.hidePicker = function hide() {
        $scope.show = false;
      };

      getInterests();

      if (!OAuthToken.isAuthenticated) {
        socketFactory.connect();
      }

      getSignedUserInfo.getCounter().then((data) => {

        $scope.counter = new Set(data.data.unreadChatsIds);

        socketFactory.counter = $scope.counter;
      });

      $scope.logout = function logout() {
        OAuthToken.removeToken();
      };

      $scope.scrollBuild = function rebuild() {
        $scope.$broadcast('rebuild:me');
      };

      $scope.getUserImgUrl = function getUrl(url) {
        return formatter.getUserImg(url);
      };

      $scope.getCounter = function getCounter() {
        return $scope.counter ? $scope.counter.size : 0;
      };

      $scope.submitPonches = function submit(list) {
        getSignedUserInfo.putPonches(list).then(() => {
          $scope.show = false;
          getInterests();
        });
      };
    }]);
