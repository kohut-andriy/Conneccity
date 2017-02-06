angular
  .module('meetings')
  .controller('MeetingsController', MeetingsController);

MeetingsController.$inject = ['$scope', 'getMeetings', 'formatter', 'getMeetingInfo', '$state'];

function MeetingsController($scope, getMeetings, formatter, getMeetingInfo, $state) {
  const vm = this;

  vm.getAddress = getAddress;
  vm.getDistance = getDistance;
  vm.getTime = getTime;
  vm.getFilteredMeetings = getFilteredMeetings;
  vm.accept = accept;
  vm.decline = decline;
  vm.getStatusStile = getStatusStile;

  startup();

  function startup() {
    getMeetings.get().then((response) => {
      vm.meetings = response.data;
    });

    $scope.$watch(() => {
      $scope.$broadcast('rebuild:me');
    });
  }

  function getAddress(lat, lng) {
    return formatter.getAddress(lat, lng);
  }

  function getDistance(distance) {
    return formatter.getDistance(distance);
  }

  function getTime(time) {
    return formatter.formatDate(time);
  }

  function getFilteredMeetings(type) {
    getMeetings.get(type).then((response) => {
      vm.meetings = response.data;
    });
  }

  function accept(id) {
    getMeetingInfo.join(id).then(() => {
      $state.reload();
    });
  }

  function decline(id) {
    getMeetingInfo.leave(id);
    $state.reload();
  }

  function getStatusStile(status) {
    return formatter.getMeetingStatusIconStyle(status);
  }
}
