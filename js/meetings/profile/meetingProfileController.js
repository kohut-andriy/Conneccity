angular
  .module('meetingProfile')
  .controller('MeetingProfileController', MeetingProfileController);

MeetingProfileController.$inject = ['$scope', 'formatter', 'getMeetingInfo', '$stateParams', '$state',
  '$cookies', 'mapCreate'];

function MeetingProfileController($scope, formatter, getMeetingInfo, $stateParams, $state,
  $cookies, mapCreate) {
  const vm = this;

  vm.getAddress = getAddress;
  vm.parseDate = parseDate;
  vm.getUserImg = getUserImg;
  vm.join = join;
  vm.leave = leave;
  vm.getStatusStile = getStatusStile;
  vm.checkPermition = checkPermition;

  startup();

  function startup() {
    getMeetingInfo.get($stateParams.id).then((response) => {
      vm.meeting = response.data;
      mapCreate.drawDefaultMarker(vm.meeting);
    });

    getMeetingInfo.sendMessage($stateParams.id).then((data) => {
      vm.chatId = data.data.id;
    });

    $scope.$watch(() => {
      $scope.$broadcast('scrollRebuild');
    });
  }

  function getAddress(lat, lng) {
    return formatter.getAddress(lat, lng);
  }

  function parseDate(date) {
    return formatter.formatDate(date);
  }

  function getUserImg(url) {
    return formatter.getUserImg(url);
  }

  function join(id) {
    getMeetingInfo.join(id);
  }

  function leave(id) {
    getMeetingInfo.leave(id).success(() => {
      $state.go('app.meetings');
    });
  }

  function getStatusStile(status) {
    return formatter.getMeetingStatusIconStyle(status);
  }

  function checkPermition(id) {
    return $cookies.getObject('currentUser').id === id;
  }
}
