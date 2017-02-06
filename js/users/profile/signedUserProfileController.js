angular
  .module('userProfile')
  .controller('SignedUserProfileController', SignedUserProfileController);

SignedUserProfileController.$inject = ['$scope', 'getUserData', 'formatter', '$cookies'];

function SignedUserProfileController($scope, getUserData, formatter, $cookies) {
  const vm = this;

  vm.user = $cookies.getObject('currentUser');
  vm.isProfile = true;
  vm.aboutBox = false;
  vm.getEventImg = getEventImg;
  vm.parseDate = parseDate;
  vm.getFilteredEventsList = getFilteredEventsList;
  vm.toggleAbout = toggleAbout;
  vm.lastSeenFormatted = lastSeenFormatted;
  vm.getAge = getAge;
  vm.getAddress = getAddress;
  vm.getUserImgUrl = getUserImgUrl;

  startup();

  function startup() {
    getUserData.getEvents(vm.user.id).then((result) => {
      vm.events = result.data;
    });

    $scope.$watch(() => {
      $scope.$broadcast('scrollRebuild');
    });
  }

  function getEventImg(url) {
    return formatter.getEventListImg(url);
  }

  function parseDate(date) {
    return formatter.formatDate(date);
  }

  function getFilteredEventsList(type) {
    getUserData.getEvents(vm.user.id, type).then((data) => {
      vm.events = data.data;
    });
  }

  function toggleAbout() {
    vm.aboutBox = !$scope.aboutBox;
  }

  function lastSeenFormatted(date) {
    return formatter.getLastSeenTime(date);
  }

  function getAge(date) {
    return formatter.getAge(date);
  }

  function getAddress(lat, lng) {
    return formatter.getAddress(lat, lng);
  }

  function getUserImgUrl(url) {
    return formatter.getUserImg(url);
  }
}
