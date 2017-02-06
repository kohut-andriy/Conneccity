angular
  .module('conneccityMap')
  .controller('MapCreateController', MapCreateController);

MapCreateController.$inject = ['$scope', 'mapCreate', 'getMapInfo', 'formatter'];

function MapCreateController($scope, mapCreate, getMapInfo, formatter) {
  const vm = this;

  vm.coordinates = new Map();
  vm.filterState = false;
  vm.peopleState = false;
  vm.meetingState = false;
  vm.eventState = false;
  vm.cardVisible = false;
  vm.cardCounter = 0;
  vm.toggleState = toggleState;
  vm.togglePeople = togglePeople;
  vm.toggleMeeting = toggleMeeting;
  vm.toggleEvent = toggleEvent;
  vm.toggleCard = toggleCard;
  vm.getPreviousCard = getPreviousCard;
  vm.getNextCard = getNextCard;
  vm.getFormattedDistance = getFormattedDistance;
  vm.parseDate = parseDate;
  vm.getAddress = getAddress;
  vm.zoomIn = zoomIn;
  vm.zoomOut = zoomOut;
  vm.filterMap = filterMap;
  vm.centerMap = centerMap;
  vm.getGender = getGender;

  startup();

  function startup() {
    getMapInfo.getAll().then((data) => {
      vm.markers = data.data;
    });

    $scope.$watchGroup([
      () => mapCreate.cardsArray,
      () => mapCreate.coordinatesMap,
    ], (newVal, oldVal) => {
      if (newVal[0] && newVal[0] !== oldVal[0]) {
        vm.cardVisible = true;
        vm.cardInfo = mapCreate.cardsArray;
        vm.cardCounter = 0;
      }

      if (newVal[1]) {
        vm.coordinates = mapCreate.coordinatesMap;
      }
    });
  }

  function toggleState() {
    vm.filterState = !vm.filterState;
  }

  function togglePeople() {
    vm.peopleState = !vm.peopleState;
    vm.eventState = false;
    vm.meetingState = false;
  }

  function toggleMeeting() {
    vm.meetingState = !$scope.meetingState;
    vm.eventState = false;
    vm.peopleState = false;
  }

  function toggleEvent() {
    vm.meetingState = false;
    vm.peopleState = false;
    vm.eventState = !vm.eventState;
  }

  function toggleCard() {
    vm.cardVisible = false;
  }

  function getPreviousCard() {
    if (vm.cardCounter > 0) {
      vm.cardCounter -= 1;
    }
  }

  function getNextCard() {
    if (vm.cardCounter < vm.cardInfo.length - 1) {
      vm.cardCounter += 1;
    }
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

  function zoomIn() {
    mapCreate.zoomIn();
  }

  function zoomOut() {
    mapCreate.zoomOut();
  }

  function filterMap() {
    const options = {
      meetingStartAtFrom: formatter.getUnixTime(vm.meetingTimeFrom),
      meetingStartAtTo: formatter.getUnixTime(vm.meetingTimeTo),
      meetingMembersCountFrom: vm.meetingMembersFrom,
      meetingMembersCountTo: vm.meetingMembersTo,
      eventStartAtFrom: formatter.getUnixTime(vm.eventTimeFrom),
      eventStartAtTo: formatter.getUnixTime(vm.eventTimeTo),
      eventMembersCountFrom: vm.eventMembersFrom,
      eventMembersCountTo: vm.eventMembersTo,
      userGender: vm.getGender(vm.genderMale, vm.genderFemale),
      userAgeFrom: vm.ageFrom,
      userAgeTo: vm.ageTo,
    };

    getMapInfo.getFilteredInfo(options).then((data) => {
      mapCreate.clearMap();
      vm.markers = data.data;
    });
  }

  function centerMap() {
    mapCreate.centerMapToUser();
  }

  function getGender(male, female) {
    return formatter.getGender(male, female);
  }
}
