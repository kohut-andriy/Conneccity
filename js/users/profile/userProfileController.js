userProfileModule.controller('userProfileController', ['$scope', 'getUserData', '$stateParams', 'formatter',
  function ($scope, getUserData, $stateParams, formatter) {

    getUserData.get($stateParams.id).then(function (result) {
      $scope.user = result.data;
      console.log($scope.user);


      getUserData.getEvents($scope.user.id).then(function (result) {
        $scope.events = result.data;
        console.log($scope.events);
      });
    });

    $scope.getFilteredEventsList = function (type) {

      getUserData.getEvents($scope.user.id, type).then(function (data) {
        
        $scope.events = data.data;
      });
    };

    $scope.getEventImg = function (url) {
      return formatter.getEventListImg(url);
    };

    $scope.parseDate = function (date) {
      return formatter.formatDate(date);
    };

    $scope.aboutBox = false;

    $scope.toggleAbout = function () {
      $scope.aboutBox = !$scope.aboutBox;
    };

    $scope.getAge = function (date) {
      return formatter.getAge(date);
    };

    $scope.getAddress = function (lat, lng) {

      return formatter.getAddress(lat, lng);
    };

    $scope.getFormattedDistance = function (distance) {
      return formatter.getDistance(distance);
    };

    $scope.lastSeenFormatted = function (date) {
      return formatter.getLastSeenTime(date);
    };

    $scope.getUserImgUrl = function (url) {
      return formatter.getUserImg(url);
    };

    $scope.$watch(function () {
      $scope.$broadcast('scrollRebuild');
    });
  }]);