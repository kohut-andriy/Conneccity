mapModule.controller('mapCreateController', ['$scope', 'mapCreate', 'getMapInfo', 'formatter',
  function mapCreateController($scope, mapCreate, getMapInfo, formatter) {
    getMapInfo.getAll().then((data) => {
      $scope.markers = data.data;
    });

    $scope.filterState = false;

    $scope.toggleState = function toggleState() {
      $scope.filterState = !$scope.filterState;
    };

    $scope.peopleState = false;

    $scope.togglePeople = function togglePeople() {
      $scope.peopleState = !$scope.peopleState;
      $scope.eventState = false;
      $scope.meetingState = false;
    };


    $scope.meetingState = false;

    $scope.toggleMeeting = function toggleMeeting() {
      $scope.meetingState = !$scope.meetingState;
      $scope.eventState = false;
      $scope.peopleState = false;
    };

    $scope.eventState = false;

    $scope.toggleEvent = function toggleEvent() {
      $scope.meetingState = false;
      $scope.peopleState = false;
      $scope.eventState = !$scope.eventState;
    };

    $scope.cardVisible = false;
    $scope.cardCounter = 0;

    $scope.toggleCard = function toggleCard() {
      $scope.cardVisible = false;
    };

    $scope.getPreviousCard = function getPreviousCard() {
      if ($scope.cardCounter > 0) {
        $scope.cardCounter -= 1;
      }
    };

    $scope.getNextCard = function getNextCard() {
      if ($scope.cardCounter < $scope.cardInfo.length - 1) {
        $scope.cardCounter += 1;
      }
    };

    $scope.getFormattedDistance = function getFormattedDistance(distance) {
      return formatter.getDistance(distance);
    };

    $scope.parseDate = function parseDate(date) {
      return formatter.formatDate(date);
    };

    $scope.coordinates = new Map();

    $scope.getAddress = function getAddress(lat, lng) {
      return formatter.getAddress(lat, lng);
    };

    $scope.$watchGroup([
      () => mapCreate.cardsArray,
      () => mapCreate.coordinatesMap,
    ], (newVal, oldVal) => {
      if (newVal[0] !== 'undefined' && newVal[0] !== oldVal[0]) {
        $scope.cardVisible = true;
        $scope.cardInfo = mapCreate.cardsArray;
        $scope.cardCounter = 0;
      }

      if (newVal[1] !== 'undefined') {
        $scope.coordinates = mapCreate.coordinatesMap;
      }
    });

    $scope.zoomIn = function zoomIn() {
      mapCreate.zoomIn();
    };

    $scope.zoomOut = function zoomOut() {
      mapCreate.zoomOut();
    };

    $scope.filterMap = function filterMap() {
      const options = {
        meetingStartAtFrom: formatter.getUnixTime($scope.meetingTimeFrom),
        meetingStartAtTo: formatter.getUnixTime($scope.meetingTimeTo),
        meetingMembersCountFrom: $scope.meetingMembersFrom,
        meetingMembersCountTo: $scope.meetingMembersTo,
        eventStartAtFrom: formatter.getUnixTime($scope.eventTimeFrom),
        eventStartAtTo: formatter.getUnixTime($scope.eventTimeTo),
        eventMembersCountFrom: $scope.eventMembersFrom,
        eventMembersCountTo: $scope.eventMembersTo,
        userGender: $scope.getGender($scope.genderMale, $scope.genderFemale),
        userAgeFrom: $scope.ageFrom,
        userAgeTo: $scope.ageTo,
      };

      getMapInfo.getFilteredInfo(options).then((data) => {
        mapCreate.clearMap();
        $scope.markers = data.data;
      });
    };

    $scope.centerMap = function centerMap() {
      mapCreate.centerMapToUser();
    };

    $scope.getGender = function getGender(male, female) {
      return formatter.getGender(male, female);
    };
  }]);
