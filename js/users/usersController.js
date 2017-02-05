usersModule.controller('usersController', ['$scope', 'getUsers', 'formatter',
  function usersController($scope, getUsers, formatter) {
    getUsers.get().then((response) => {
      $scope.users = response.data;
    });

    $scope.getEventImg = function getEventImg(url) {
      return formatter.getEventListImg(url);
    };

    $scope.parseDate = function parseDate(date) {
      return formatter.formatDate(date);
    };

    $scope.getFormattedDistance = function getFormattedDistance(distance) {
      return formatter.getDistance(distance);
    };

    $scope.$watch(() => {
      $scope.$broadcast('scrollRebuild');
    });

    $scope.getUserImgUrl = function getUserImgUrl(url) {
      return formatter.getUserListImg(url);
    };
  }]);
