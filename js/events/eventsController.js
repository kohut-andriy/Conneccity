eventsModule.controller('eventsController', ['$scope', 'getEvents', 'formatter', function ($scope, getEvents, formatter) {
  getEvents.get().then(function (response) {
    $scope.events = response.data;
  });

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
  }
}]);