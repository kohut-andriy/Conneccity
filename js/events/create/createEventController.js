angular
  .module('createEvent')
  .controller(CreateEventController);

CreateEventController.$inject = ['$scope', 'createEvent', 'formatter', '$cookies', '$state',
  '$stateParams', 'getEventInfo'];

function CreateEventController($scope, createEvent, formatter, $cookies, $state,
  $stateParams, getEventInfo) {
  $scope.user = $cookies.getObject('currentUser');
  $scope.getMapSrc = function getMapSrc() {
    return formatter.getGoogleMapsSrc([$scope.user.latitude,
      $scope.user.latitude]);
  };

  $scope.pickerVisible = false;

  $scope.event = {};

  getEventInfo.get($stateParams.id).then((data) => {
    const event = data.data;
    $scope.event.name = event.name;
    $scope.event.startAt = new Date(event.startAt);
    $scope.event.latitude = event.latitude;
    $scope.event.longitude = event.longitude;
    $scope.event.description = event.description;
    $scope.event.price = event.priceFrom;
  });

  $scope.create = function create(data) {
    if ($stateParams.id) {
      createEvent.update({
        name: data.name,
        startAt: data.startAt,
        latitude: $scope.placePicker.lat,
        longitude: $scope.placePicker.lng,
        description: data.description,
        priceFrom: data.price,
      }, $stateParams.id).then(() => {
        $state.go('app.events');
      });
    } else {
      createEvent.create({
        name: data.name,
        startAt: data.startAt,
        latitude: $scope.placePicker.lat,
        longitude: $scope.placePicker.lng,
        description: data.description,
        priceFrom: data.price,
      }).then(() => {
        $state.go('app.events');
      });
    }
  };
}
