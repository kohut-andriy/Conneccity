chatModule.controller('chatController', ['$scope', 'getSocketData', 'formatter', 'getChat', '$stateParams', '$cookies', '$rootScope',
  function ($scope, getSocketData, formatter, getChat, $stateParams, $cookies, $rootScope) {

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
      //console.log(message);
      getChat.send($stateParams.id, message).then(function (data) {
      }, function (error) {
        alert(error);
      });
    };

    $scope.$watch(function () {
      return getSocketData.message;
    }, function (newVal, oldVal) {

      if (newVal != 'undefined' && newVal != oldVal) {

        if(newVal.chatId == $stateParams.id) {
          $scope.messages.unshift(newVal);
        }

          $scope.message = '';


        //console.log(newVal);
        //console.log(1);

        if (newVal.sender.id != $scope.currentUserId) {
          $rootScope.counter.add(newVal.chatId);
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