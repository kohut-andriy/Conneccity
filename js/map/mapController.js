mapModule.controller('mapCreateController', ['$scope','mapCreate', 'getMapInfo', function ($scope, mapCreate, getMapInfo) {

  $scope.filterState = false;

  $scope.toggleState = function () {
    $scope.filterState = !$scope.filterState;
  };

  $scope.peopleState = false;

  $scope.togglePeople = function () {
    $scope.peopleState = !$scope.peopleState;
  };

  $scope.cardVisible = false;
  $scope.cardCounter = 0;
  
  $scope.toggleCard = function () {
    $scope.cardVisible = false;
  };

  $scope.getPreviousCard = function () {
    if($scope.cardCounter > 0) $scope.cardCounter--;
  };

  $scope.getNextCard = function () {
    if($scope.cardCounter < $scope.cardInfo.length - 1) $scope.cardCounter++;
  };

  $scope.getFormatedDistance = function (distance) {
    if(distance<1000) {
      return distance+'m';
    } else {
      return (distance/1000).toFixed(1)+'km';
    }
  };

  $scope.clear = function () {

    mapCreate.clearMap();

  };

  $scope.setAllInfo = function() {
    
    console.log('setting');
    getMapInfo.getAll().then(function (data) {
      console.log(data.data);
      mapCreate.setData(data.data);

    });
  };

  $scope.parseDate = function (stringDate) {

    var date = new Date(stringDate);

    var locale = "en-us";
    var day = date.getDay();
    var month = date.toLocaleString(locale, { month: "short" });

    var hours = date.toLocaleTimeString(locale,{ hour: "2-digit", minute: "2-digit", hour12: false});

    return day + ' ' + month + ', ' + hours;
  };
  $scope.coordinates = new Map();
  $scope.getAddress = function (lat,lng) {
    var address = $scope.coordinates.get([lat,lng].join("|"));
    if(!address && lat && lng) {
      address = mapCreate.getAddress([lat,lng]);
    }
    return address;
  };

  $scope.$watchGroup([
    function () { return mapCreate.cardsArray },
    function () { return mapCreate.coordinatesMap}
  ],
    function (newVal, oldVal) {

      if(newVal[0] != 'undefined' && newVal[0] != oldVal[0]) {
        $scope.cardVisible = true;
        $scope.cardInfo = mapCreate.cardsArray;
        $scope.cardCounter = 0;
      }

      if(newVal[1] != 'undefined') {
        $scope.coordinates = mapCreate.coordinatesMap;
      }


  });

  mapCreate.initMap();
  $scope.setAllInfo();

}]);