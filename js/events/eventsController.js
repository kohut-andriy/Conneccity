angular
  .module('events')
  .controller('EventsController', EventsController);

EventsController.$inject = ['$scope', 'getEvents', 'formatter', '$cookies'];

function EventsController($scope, getEvents, formatter, $cookies) {
  const vm = this;

  vm.getCurrentUserId = getCurrentUserId;
  vm.getFilteredEvents = getFilteredEvents;
  vm.getFormattedDistance = getFormattedDistance;
  vm.parseDate = parseDate;
  vm.getAddress = getAddress;
  vm.getEventImg = getEventImg;

  startup();

  function startup() {
    getEvents.get().then((response) => {
      vm.events = response.data;
    });

    $scope.$watch(() => {
      $scope.$broadcast('rebuild:me');
    });
  }

  function getFilteredEvents(type) {
    getEvents.get(type).then((response) => {
      vm.events = response.data;
    });
  }

  function getCurrentUserId() {
    return $cookies.getObject('currentUser').id;
  }

  function getFormattedDistance(distance) {
    return formatter.getDistance(distance);
  }

  function parseDate(date) {
    return formatter.formatDate(date);
  }

  function getAddress(lat, lng) {
    return formatter.getAddress(lat, lng);
  }

  function getEventImg(url) {
    return formatter.getEventListImg(url);
  }
}
