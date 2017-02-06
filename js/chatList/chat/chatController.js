angular
  .module('chat')
  .controller('ChatController', ChatController);

ChatController.$inject = ['$scope', 'socketFactory', 'formatter', 'getChat', '$stateParams', '$cookies', '$rootScope'];

function ChatController($scope, socketFactory, formatter, getChat, $stateParams, $cookies) {
  const vm = this;

  vm.currentUserId = $cookies.getObject('currentUser').id;
  vm.messages = [];

  vm.getTime = getTime;
  vm.getUserImg = getUserImg;
  vm.getLastSeenTime = getLastSeenTime;
  vm.checkSender = checkSender;
  vm.sendMessage = sendMessage;
  vm.getStatus = getStatus;

  startup();

  function startup() {
    getChat.get($stateParams.id)
    .then((data) => {
      vm.chat = data.data;
    }).then(() => {
      getChat.getMessages($stateParams.id)
      .then((data) => {
        vm.messages = data.data;
      });
    });

    $scope.$watch(() => socketFactory.message,
      (newVal, oldVal) => {
        if (newVal && newVal !== oldVal) {
          if (newVal.chatId === $stateParams.id) {
            vm.messages.unshift(newVal);
          }

          if (newVal.chatId === $stateParams.id) {
            let i = 1;

            do {
              if (socketFactory.chatMessage[newVal.chatId] >= vm.messages[i].id) {
                vm.messages[i].readState = 1;
              }

              i += 1;
            } while (!vm.messages[i].readState);
          }

          vm.message = '';

          if (newVal.sender.id !== $scope.currentUserId) {
            socketFactory.counter.add(newVal.chatId);
          }
        }
      });
  }

  function getTime(date) {
    return formatter.getTime(date);
  }

  function getUserImg(url) {
    return formatter.getUserImgUrl(url);
  }

  function getLastSeenTime(date) {
    return formatter.getTime(date);
  }

  function checkSender(data) {
    return data === vm.currentUserId;
  }

  function sendMessage(message) {
    getChat.read($stateParams.id);

    if (message) {
      getChat.send($stateParams.id, message).then(() => {
        vm.message = '';

        socketFactory.counter.delete($stateParams.id);
      });
    }
  }

  function getStatus(state) {
    return !state.readState && $cookies.getObject('currentUser').id !== state.sender.id;
  }
}
