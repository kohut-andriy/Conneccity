eventsModule.controller('eventsController', ['$scope', 'getEvents', function ($scope, getEvents) {
  getEvents.get().then(function (response) {
    $scope.events = response.data;
  });
}]);