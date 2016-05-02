mapModule.controller('mapCreateController', ['$scope','mapCreate', 'getMapInfo', function ($scope, mapCreate, getMapInfo) {

  // online
  $scope.filterState = false;

  $scope.toggleState = function () {
    $scope.filterState = !$scope.filterState;
  };

  $scope.peopleState = false;

  $scope.togglePeople = function () {
    $scope.peopleState = !$scope.peopleState;
  };


  mapCreate.initMap();

  getMapInfo.get().then(function (data) {
    console.log(data.data);
    mapCreate.setData(data.data);
  });
  
  
  // offline

  /*var data = [{latitude: 45.3, longitude: 45, id: 2}, {latitude: 45.7, longitude: 45, id:3}, {latitude: 45, longitude: 45, id:5}];
   mapCreate.setData(data);*/

}]);