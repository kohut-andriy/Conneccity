userProfileModule.controller('signedUserProfile', ['$scope', 'getUserData', 'formatter', '$cookies',
  function ($scope, getUserData, formatter, $cookies) {
    console.log('relodad');
    $scope.user = $cookies.getObject('currentUser');

    getUserData.getEvents($scope.user.id).then(function (result) {
      $scope.events = result.data;
      console.log($scope.events);
    });

    $scope.getEventImg = function (url) {
      return formatter.getEventListImg(url);
    };

    $scope.parseDate = function (date) {
      return formatter.formatDate(date);
    };

    $scope.getFilteredEventsList = function (type) {

      getUserData.getEvents($scope.user.id, type).then(function (data) {

        $scope.events = data.data;
      });
    };

    $scope.isProfile = true;

    $scope.aboutBox = false;

    $scope.toggleAbout = function () {
      $scope.aboutBox = !$scope.aboutBox;
    };

    $scope.lastSeenFormatted = function (date) {
      return formatter.getLastSeenTime(date);
    };

    $scope.getAge = function (date) {
      return formatter.getAge(date);
    };

    $scope.getAddress = function (lat, lng) {
      return formatter.getAddress(lat, lng);
    };

    $scope.getUserImgUrl = function (url) {
      return formatter.getUserImg(url);
    };

    $scope.$watch(function () {
      $scope.$broadcast('scrollRebuild');
    });
  }]);