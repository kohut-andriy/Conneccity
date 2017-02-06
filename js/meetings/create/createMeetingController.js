angular
  .module('createMeeting')
  .controller('CreateMeetingController', CreateMeetingController);

CreateMeetingController.$inject = ['createMeeting', 'formatter', '$cookies', '$state',
  'getMeetingInfo', '$stateParams'];

function CreateMeetingController(createMeeting, formatter, $cookies, $state,
  getMeetingInfo, $stateParams) {
  const vm = this;

  vm.user = $cookies.getObject('currentUser');
  vm.meeting = {};
  vm.getMapSrc = getMapSrc;
  vm.create = create;

  getMeetingInfo.get($stateParams.id).then((data) => {
    const meeting = data.data;
    vm.meeting.invitedIds = [];
    vm.meeting.startAt = new Date(meeting.startAt);
    vm.meeting.latitude = meeting.latitude;
    vm.meeting.longitude = meeting.longitude;

    for (var member in meeting.members) {
      if (meeting.members[member].id !== $cookies.getObject('currentUser').id) {
        vm.meeting.invitedIds.push(meeting.members[member].id);
      }
    }

    vm.meeting.description = meeting.description;
  });

  function getMapSrc() {
    return formatter.getGoogleMapsSrc([vm.user.latitude,
      vm.user.longitude]);
  }

  function create(data) {
    if ($stateParams.id) {
      createMeeting.update({
        startAt: data.startAt,
        latitude: vm.placePicker.lat,
        longitude: vm.placePicker.lng,
        description: data.description,
        invitedIds: $cookies.userId ? [$cookies.userId] : vm.meeting.invitedIds,
      }, $stateParams.id).then(() => {
        $cookies.userId = '';
        $state.go('app.meetings');
      });
    } else {
      createMeeting.create({
        startAt: data.startAt,
        latitude: vm.placePicker.lat,
        longitude: vm.placePicker.lng,
        description: data.description,
        invitedIds: $cookies.userId ? [$cookies.userId] : vm.meeting.invitedIds,
      }).then(() => {
        $cookies.userId = '';
        $state.go('app.meetings');
      });
    }
  }
}
