eventsModule.controller('eventsController', ['$scope', 'getEvents', 'formatter', '$cookies',
  function ($scope, getEvents, formatter, $cookies) {
    getEvents.get().then(function (response) {
      $scope.events = response.data;
    });

    $scope.getCurrentUserId = function () {
      return $cookies.getObject('currentUser').id;
    };

    $scope.getFilteredEvents = function (type) {
      getEvents.get(type).then(function (response) {
        $scope.events = response.data;
      });
    };

    $scope.getFormattedDistance = function (distance) {
      return formatter.getDistance(distance);
    };

    $scope.parseDate = function (date) {
      return formatter.formatDate(date);
    };

    $scope.getAddress = function (lat, lng) {
      return formatter.getAddress(lat, lng);
    };

    $scope.getEventImg = function (url) {
      return formatter.getEventListImg(url);
    };

    $scope.$watch(function () {
      $scope.$broadcast('rebuild:me');
    });
  }]);
