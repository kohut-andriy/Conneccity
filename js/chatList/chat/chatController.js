angular
  .module('chat')
  .controller(ChatController);

ChatController.$inject = ['$scope', 'socketFactory', 'formatter', 'getChat', '$stateParams', '$cookies', '$rootScope'];

function ChatController($scope, socketFactory, formatter, getChat, $stateParams, $cookies) {
  $scope.currentUserId = $cookies.getObject('currentUser').id;

  $scope.messages = [];

  getChat.get($stateParams.id)
  .then((data) => {
    $scope.chat = data.data;
  }).then(() => {
    getChat.getMessages($stateParams.id)
    .then((data) => {
      $scope.messages = data.data;
    });
  });

  $scope.getTime = function getTime(date) {
    return formatter.getTime(date);
  };

  $scope.getUserImg = function getUserImg(url) {
    return formatter.getUserImgUrl(url);
  };

  $scope.getLastSeenTime = function getLastSeenTime(date) {
    return formatter.getTime(date);
  };

  $scope.checkSender = function checkSender(data) {
    return data === $scope.currentUserId;
  };

  $scope.sendMessage = function sendMessage(message) {
    getChat.read($stateParams.id);

    if (message) {
      getChat.send($stateParams.id, message).then(() => {
        $scope.message = '';

        socketFactory.counter.delete($stateParams.id);
      });
    }
  };

  $scope.getStatus = function getStatus(state) {
    return !state.readState && $cookies.getObject('currentUser').id !== state.sender.id;
  };

  $scope.$watch(() => socketFactory.message,
    (newVal, oldVal) => {
      if (newVal !== 'undefined' && newVal !== oldVal) {
        if (newVal.chatId === $stateParams.id) {
          $scope.messages.unshift(newVal);
        }

        if (newVal.chatId === $stateParams.id) {
          let i = 1;

          do {
            if (socketFactory.chatMessage[newVal.chatId] >= $scope.messages[i].id) {
              $scope.messages[i].readState = 1;
            }

            i += 1;
          } while (!$scope.messages[i].readState);
        }

        $scope.message = '';

        if (newVal.sender.id !== $scope.currentUserId) {
          socketFactory.counter.add(newVal.chatId);
        }
      }
    });
}
