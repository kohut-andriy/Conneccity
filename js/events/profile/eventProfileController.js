angular
  .module('eventProfile')
  .controller('EventProfileController', EventProfileController);

EventProfileController.$inject = ['$scope', 'getEventInfo', '$stateParams', 'formatter', '$cookies'];

function EventProfileController($scope, getEventInfo, $stateParams, formatter, $cookies) {
  const vm = this;

  vm.join = join;
  vm.leave = leave;
  vm.getAddress = getAddress;
  vm.parseDate = parseDate;
  vm.getUserImg = getUserImg;
  vm.toggleMember = toggleMember;
  vm.checkPermition = checkPermition;

  startup();

  function startup() {
    getEventInfo.get($stateParams.id).then((response) => {
      vm.event = response.data;
    });

    getEventInfo.getMembers($stateParams.id).then((response) => {
      vm.members = response.data;
    });

    getEventInfo.sendMessage($stateParams.id).then((data) => {
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
    getEventInfo.join(id).success(() => {
      vm.toggleMember();
    });
  }

  function leave(id) {
    getEventInfo.leave(id).success(() => {
      vm.toggleMember();
    });
  }

  function toggleMember() {
    if (vm.event.isMember) {
      vm.event.isMember = false;
      vm.members.shift();
    } else {
      vm.members.unshift($cookies.getObject('currentUser'));
      vm.event.isMember = true;
    }
  }

  function checkPermition(id) {
    return $cookies.getObject('currentUser').id === id;
  }
}
