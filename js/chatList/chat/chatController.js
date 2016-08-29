chatModule.controller('chatController', ['$scope', 'socketFactory', 'formatter', 'getChat', '$stateParams', '$cookies', '$rootScope',
  function ($scope, socketFactory, formatter, getChat, $stateParams, $cookies, $rootScope) {

    //  getSocketData.connect();
    $scope.currentUserId = $cookies.getObject('currentUser').id;

    $scope.messages = [];

    getChat.get($stateParams.id)
      .then(function (data) {
        $scope.chat = data.data;
        //console.log(data);
      }).then(function () {
      getChat.getMessages($stateParams.id)
        .then(function (data) {
          $scope.messages = data.data;
          //console.log(data);
        });
    });

    $scope.getTime = function (date) {
      return formatter.getTime(date);
    };

    $scope.getUserImg = function (url) {
      return formatter.getUserImgUrl(url);
    };

    $scope.getLastSeenTime = function (date) {

      return formatter.getTime(date);
    };

    $scope.checkSender = function (data) {

      return data == $scope.currentUserId;
    };

    $scope.sendMessage = function (message) {

      getChat.read($stateParams.id).then(function (data) {});

      if (message) {
        getChat.send($stateParams.id, message).then(function (data) {
          $scope.message = '';

          socketFactory.counter.delete($stateParams.id);

        }, function (error) {
          console.log(error);
        });
      }
    };

    $scope.getStatus = function (state) {
      return !state.readState && $cookies.getObject('currentUser').id != state.sender.id;
    };

    $scope.$watch(function () {
      return socketFactory.message;
    }, function (newVal, oldVal) {
      if (newVal != 'undefined' && newVal != oldVal) {

        if (newVal.chatId == $stateParams.id) {
          $scope.messages.unshift(newVal);
        }

        console.log(newVal.chatId == $stateParams.id);
        if (newVal.chatId == $stateParams.id) {
          var i = 1;

          do {
            console.log(socketFactory.chatMessage[newVal.chatId]);
            if(socketFactory.chatMessage[newVal.chatId] >= $scope.messages[i].id) {
              $scope.messages[i].readState = 1;
              console.log($scope.messages[i].readState);
            }
            console.log(i);

            i++;
          } while (!$scope.messages[i].readState);
        }

        $scope.message = '';

        //console.log(newVal);
        //console.log(1);

        if (newVal.sender.id != $scope.currentUserId) {
          socketFactory.counter.add(newVal.chatId);
        }
      }

    });
  }]);


chatModule.directive('schrollBottom', function () {
  return {
    scope: {
      schrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('schrollBottom', function (newValue) {

        if (newValue) {
          element[0].scrollTop = element[0].scrollHeight;
        }
      });
    }
  }
});