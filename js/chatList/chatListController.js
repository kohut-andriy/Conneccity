angular
  .module('chatList')
  .controller('ChatListController', ChatListController);

ChatListController.$inject = ['formatter', 'getChats', 'socketFactory'];

function ChatListController(formatter, getChats, socketFactory) {
  const vm = this;

  vm.getUserImg = getUserImg;
  vm.getLastSeenTime = getLastSeenTime;
  vm.getState = getState;

  startup();

  function startup() {
    getChats.get().then((data) => {
      vm.chats = data.data;
    });
  }

  function getUserImg(url) {
    return formatter.getUserImgUrl(url);
  }

  function getLastSeenTime(date) {
    return formatter.getLastSeenTime(date);
  }

  function getState(id) {
    return socketFactory.counter.has(id);
  }
}