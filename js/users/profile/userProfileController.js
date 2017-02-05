angular
  .module('userProfile')
  .controller(UserProfileController);

UserProfileController.$inject = ['$scope', 'getUserData', '$stateParams', 'formatter', '$cookies'];

function UserProfileController($scope, getUserData, $stateParams, formatter, $cookies) {
  getUserData.get($stateParams.id).then((result) => {
    $scope.user = result.data;

    getUserData.getEvents($scope.user.id).then((eventData) => {
      $scope.events = eventData.data;
    });
  });

  getUserData.getChatId($stateParams.id).then((data) => {
    $scope.chatId = data.data.id;
  });

  $scope.getFilteredEventsList = function getFilteredEventsList(type) {
    getUserData.getEvents($scope.user.id, type).then((data) => {
      $scope.events = data.data;
    });
  };

  $scope.getEventImg = function getEventImg(url) {
    return formatter.getEventListImg(url);
  };

  $scope.parseDate = function parseDate(date) {
    return formatter.formatDate(date);
  };

  $scope.aboutBox = false;

  $scope.toggleAbout = function toggleAbout() {
    $scope.aboutBox = !$scope.aboutBox;
  };

  $scope.getAge = function getAge(date) {
    return formatter.getAge(date);
  };

  $scope.getAddress = function getAddress(lat, lng) {
    return formatter.getAddress(lat, lng);
  };

  $scope.getFormattedDistance = function getFormattedDistance(distance) {
    return formatter.getDistance(distance);
  };

  $scope.lastSeenFormatted = function lastSeenFormatted(date) {
    return formatter.getLastSeenTime(date);
  };

  $scope.getUserImgUrl = function getUserImgUrl(url) {
    return formatter.getUserImg(url);
  };

  $scope.$watch(() => {
    $scope.$broadcast('scrollRebuild');
  });

  $scope.setUser = function setUser() {
    $cookies.userId = $scope.user.id;
  };
}
