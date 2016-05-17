mapModule.controller('mapCreateController', ['$scope', 'mapCreate', 'getMapInfo', 'formatter',
  function ($scope, mapCreate, getMapInfo, formatter) {

    $scope.filterState = false;

    $scope.toggleState = function () {
      $scope.filterState = !$scope.filterState;
    };

    $scope.peopleState = false;

    $scope.togglePeople = function () {
      $scope.peopleState = !$scope.peopleState;
      $scope.eventState = false;
      $scope.meetingState = false;
    };

    $scope.meetingState = false;

    $scope.toggleMeeting = function () {
      $scope.meetingState = !$scope.meetingState;
      $scope.eventState = false;
      $scope.peopleState = false;
    };

    $scope.eventState = false;

    $scope.toggleEvent = function () {
      $scope.meetingState = false;
      $scope.peopleState = false;
      $scope.eventState = !$scope.eventState;
    };

    $scope.cardVisible = false;
    $scope.cardCounter = 0;

    $scope.toggleCard = function () {
      $scope.cardVisible = false;
    };

    $scope.getPreviousCard = function () {
      if ($scope.cardCounter > 0) $scope.cardCounter--;
    };

    $scope.getNextCard = function () {
      if ($scope.cardCounter < $scope.cardInfo.length - 1) $scope.cardCounter++;
    };

    $scope.getFormatedDistance = function (distance) {
      return formatter.getDistance(distance);
    };

    $scope.setAllInfo = function () {

      console.log('setting');
      mapCreate.clearMap();

      getMapInfo.getAll().then(function (data) {
        console.log(data.data);
        mapCreate.setData(data.data);
      });
    };

    $scope.parseDate = function (date) {
      return formatter.formatDate(date);
    };

    $scope.coordinates = new Map();

    $scope.getAddress = function (lat, lng) {
      return formatter.getAddress(lat, lng);
    };

    $scope.$watchGroup([
        function () {
          return mapCreate.cardsArray
        },
        function () {
          return mapCreate.coordinatesMap
        }
      ],
      function (newVal, oldVal) {

        if (newVal[0] != 'undefined' && newVal[0] != oldVal[0]) {
          $scope.cardVisible = true;
          $scope.cardInfo = mapCreate.cardsArray;
          $scope.cardCounter = 0;
        }

        if (newVal[1] != 'undefined') {
          $scope.coordinates = mapCreate.coordinatesMap;
        }

      });

    $scope.zoomIn = function () {
      mapCreate.zoomIn();
    };

    $scope.zoomOut = function () {
      mapCreate.zoomOut();
    };

    mapCreate.initMap();
    $scope.setAllInfo();

    $scope.filterMap = function () {

      let options = {
        'meetingStartAtFrom': formatter.getUnixTime($scope.meetingTimeFrom),
        'meetingStartAtTo': formatter.getUnixTime($scope.meetingTimeTo),
        'meetingMembersCountFrom': $scope.meetingMembersFrom,
        'meetingMembersCountTo': $scope.meetingMembersTo,
        'eventStartAtFrom': formatter.getUnixTime($scope.eventTimeFrom),
        'eventStartAtTo': formatter.getUnixTime($scope.eventTimeTo),
        'eventMembersCountFrom': $scope.eventMembersFrom,
        'eventMembersCountTo': $scope.eventMembersTo,
        'userGender': $scope.getGender($scope.genderMale, $scope.genderFemale),
        'userAgeFrom': $scope.ageFrom,
        'userAgeTo': $scope.ageTo
      };

      getMapInfo.getFilteredInfo(options).then(function (data) {
        mapCreate.clearMap();
        mapCreate.setData(data.data);
      });

    };

    $scope.getGender = function (male, female) {
      return formatter.getGender(male, female);
    };
  }]);