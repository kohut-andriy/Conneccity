angular
  .module('userProfile')
  .controller('UserProfileController', UserProfileController);

UserProfileController.$inject = ['$scope', 'getUserData', '$stateParams', 'formatter', '$cookies'];

function UserProfileController($scope, getUserData, $stateParams, formatter, $cookies) {
  const vm = this;

  vm.aboutBox = false;
  vm.getFilteredEventsList = getFilteredEventsList;
  vm.getEventImg = getEventImg;
  vm.parseDate = parseDate;
  vm.toggleAbout = toggleAbout;
  vm.getAge = getAge;
  vm.getAddress = getAddress;
  vm.getFormattedDistance = getFormattedDistance;
  vm.lastSeenFormatted = lastSeenFormatted;
  vm.getUserImgUrl = getUserImgUrl;
  vm.setUser = setUser;

  startup();

  function startup() {
    getUserData.get($stateParams.id).then((result) => {
      vm.user = result.data;

      getUserData.getEvents(vm.user.id).then((eventData) => {
        vm.events = eventData.data;
      });
    });

    getUserData.getChatId($stateParams.id).then((data) => {
      vm.chatId = data.data.id;
    });

    $scope.$watch(() => {
      $scope.$broadcast('scrollRebuild');
    });
  }

  function getFilteredEventsList(type) {
    getUserData.getEvents(vm.user.id, type).then((data) => {
      vm.events = data.data;
    });
  }

  function getEventImg(url) {
    return formatter.getEventListImg(url);
  }

  function parseDate(date) {
    return formatter.formatDate(date);
  }

  function toggleAbout() {
    vm.aboutBox = !vm.aboutBox;
  }

  function getAge(date) {
    return formatter.getAge(date);
  }

  function getAddress(lat, lng) {
    return formatter.getAddress(lat, lng);
  }

  function getFormattedDistance(distance) {
    return formatter.getDistance(distance);
  }

  function lastSeenFormatted(date) {
    return formatter.getLastSeenTime(date);
  }

  function getUserImgUrl(url) {
    return formatter.getUserImg(url);
  }

  function setUser() {
    $cookies.userId = vm.user.id;
  }
}
