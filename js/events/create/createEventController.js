angular
  .module('createEvent')
  .controller('CreateEventController', CreateEventController);

CreateEventController.$inject = ['createEvent', 'formatter', '$cookies', '$state',
  '$stateParams', 'getEventInfo'];

function CreateEventController(createEvent, formatter, $cookies, $state,
  $stateParams, getEventInfo) {
  const vm = this;

  vm.user = $cookies.getObject('currentUser');
  vm.pickerVisible = false;
  vm.event = {};
  vm.create = create;
  vm.getMapSrc = getMapSrc;

  startup();

  function startup() {
    getEventInfo.get($stateParams.id).then((data) => {
      const event = data.data;
      vm.event.name = event.name;
      vm.event.startAt = new Date(event.startAt);
      vm.event.latitude = event.latitude;
      vm.event.longitude = event.longitude;
      vm.event.description = event.description;
      vm.event.price = event.priceFrom;
    });
  }

  function create(data) {
    if ($stateParams.id) {
      createEvent.update({
        name: data.name,
        startAt: data.startAt,
        latitude: vm.placePicker.lat,
        longitude: vm.placePicker.lng,
        description: data.description,
        priceFrom: data.price,
      }, $stateParams.id).then(() => {
        $state.go('app.events');
      });
    } else {
      createEvent.create({
        name: data.name,
        startAt: data.startAt,
        latitude: vm.placePicker.lat,
        longitude: vm.placePicker.lng,
        description: data.description,
        priceFrom: data.price,
      }).then(() => {
        $state.go('app.events');
      });
    }
  }

  function getMapSrc() {
    return formatter.getGoogleMapsSrc([vm.user.latitude,
      vm.user.latitude]);
  }
}
