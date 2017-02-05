eventsModule.controller('eventsController', ['$scope', 'getEvents', 'formatter', '$cookies',
  function eventsController($scope, getEvents, formatter, $cookies) {
    getEvents.get().then((response) => {
      $scope.events = response.data;
    });

    $scope.getCurrentUserId = function getCurrentUserId() {
      return $cookies.getObject('currentUser').id;
    };

    $scope.getFilteredEvents = function getFilteredEvents(type) {
      getEvents.get(type).then((response) => {
        $scope.events = response.data;
      });
    };

    $scope.getFormattedDistance = function getFormattedDistance(distance) {
      return formatter.getDistance(distance);
    };

    $scope.parseDate = function parseDate(date) {
      return formatter.formatDate(date);
    };

    $scope.getAddress = function getAddress(lat, lng) {
      return formatter.getAddress(lat, lng);
    };

    $scope.getEventImg = function getEventImg(url) {
      return formatter.getEventListImg(url);
    };

    $scope.$watch(() => {
      $scope.$broadcast('rebuild:me');
    });
  }]);
