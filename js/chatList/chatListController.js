chatListModule.controller('chatListController', ['$scope', 'formatter', 'getChats', 'getUserData', 'socketFactory',
  function chatListController($scope, formatter, getChats, getUserData, socketFactory) {
    getChats.get().then((data) => {
      $scope.chats = data.data;
    });

    $scope.getUserImg = function getUserImg(url) {
      return formatter.getUserImgUrl(url);
    };

    $scope.getLastSeenTime = function getLastSeenTime(date) {
      return formatter.getLastSeenTime(date);
    };

    $scope.getState = function getState(id) {
      return socketFactory.counter.has(id);
    };
  }]);
