userProfileModule.controller('signedUserProfile', ['$scope', 'getUserData', 'formatter', '$cookies',
  function signedUserProfile($scope, getUserData, formatter, $cookies) {
    $scope.user = $cookies.getObject('currentUser');

    getUserData.getEvents($scope.user.id).then((result) => {
      $scope.events = result.data;
    });

    $scope.getEventImg = function getEventImg(url) {
      return formatter.getEventListImg(url);
    };

    $scope.parseDate = function parseDate(date) {
      return formatter.formatDate(date);
    };

    $scope.getFilteredEventsList = function getFilteredEventsList(type) {
      getUserData.getEvents($scope.user.id, type).then((data) => {
        $scope.events = data.data;
      });
    };

    $scope.isProfile = true;

    $scope.aboutBox = false;

    $scope.toggleAbout = function toggleAbout() {
      $scope.aboutBox = !$scope.aboutBox;
    };

    $scope.lastSeenFormatted = function lastSeenFormatted(date) {
      return formatter.getLastSeenTime(date);
    };

    $scope.getAge = function getAge(date) {
      return formatter.getAge(date);
    };

    $scope.getAddress = function getAddress(lat, lng) {
      return formatter.getAddress(lat, lng);
    };

    $scope.getUserImgUrl = function getUserImgUrl(url) {
      return formatter.getUserImg(url);
    };

    $scope.$watch(() => {
      $scope.$broadcast('scrollRebuild');
    });
  }]);
