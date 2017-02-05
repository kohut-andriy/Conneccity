angular
  .module('chatList')
  .controller(ChatListController);

ChatListController.$inject = ['$scope', 'formatter', 'getChats', 'socketFactory'];

function ChatListController($scope, formatter, getChats, socketFactory) {
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
}