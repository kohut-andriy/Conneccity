angular
  .module('conneccityApp')
  .controller('AppController', AppController);

AppController.$inject = ['getSignedUserInfo', 'OAuthToken', 'formatter', '$cookies', 'socketFactory',
  '$interval', 'getUserLocation'];

function AppController(getSignedUserInfo, OAuthToken, formatter, $cookies, socketFactory,
  $interval, getUserLocation) {
  const vm = this;

  vm.logout = logout;
  vm.scrollBuild = scrollBuild;
  vm.getUserImgUrl = getUserImgUrl;
  vm.getCounter = getCounter;
  vm.submitPonches = submitPonches;
  vm.hidePicker = hidePicker;

  startup();

  function startup() {
    $interval(() => {
      getUserLocation.get();
    }, 1000 * 60 * 5);

    getInterests();

    if (!OAuthToken.isAuthenticated) {
      socketFactory.connect();
    }

    getSignedUserInfo.getCounter().then((data) => {
      vm.counter = new Set(data.data.unreadChatsIds);

      socketFactory.counter = vm.counter;
    });
  }

  function getInterests() {
    getSignedUserInfo.get().then((data) => {
      vm.user = data.data;

      $cookies.putObject('currentUser', vm.user);

      vm.ponchesList = [];

      vm.user.ponches.forEach((ponch) => {
        vm.ponchesList.push(ponch.name);
      });
    });

    getSignedUserInfo.getInterests().then((data) => {
      vm.related = [];

      data.data.forEach((ponch) => {
        vm.related.push(ponch.name);
      });
    });
  }

  function hidePicker() {
    vm.show = false;
  }

  function logout() {
    OAuthToken.removeToken();
  }

  function scrollBuild() {
    vm.$broadcast('rebuild:me');
  }

  function getUserImgUrl(url) {
    return formatter.getUserImg(url);
  }

  function getCounter() {
    return vm.counter ? vm.counter.size : 0;
  }

  function submitPonches(list) {
    getSignedUserInfo.putPonches(list).then(() => {
      vm.show = false;
      getInterests();
    });
  }
}
