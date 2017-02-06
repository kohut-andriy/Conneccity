angular
  .module('users')
  .controller('UsersController', UsersController);

UsersController.$inject = ['$scope', 'getUsers', 'formatter'];

function UsersController($scope, getUsers, formatter) {
  const vm = this;

  vm.getEventImg = getEventImg;
  vm.parseDate = parseDate;
  vm.getFormattedDistance = getFormattedDistance;
  vm.getUserImgUrl = getUserImgUrl;

  startup();

  function startup() {
    getUsers.get().then((response) => {
      vm.users = response.data;
    });

    $scope.$watch(() => {
      vm.$broadcast('scrollRebuild');
    });
  }

  function getEventImg(url) {
    return formatter.getEventListImg(url);
  }

  function parseDate(date) {
    return formatter.formatDate(date);
  }

  function getFormattedDistance(distance) {
    return formatter.getDistance(distance);
  }

  function getUserImgUrl(url) {
    return formatter.getUserListImg(url);
  }
}
