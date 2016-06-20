chatModule.controller('chatController', ['$scope', 'getSocketData', 'formatter', 'getChat', '$stateParams', '$cookies', '$interval',
  function ($scope, getSocketData, formatter, getChat, $stateParams, $cookies, $interval) {

  //  getSocketData.connect();
    $scope.currentUserId = $cookies.getObject('currentUser').id;

    getChat.get($stateParams.id).then(function (data) {
      $scope.chat = data.data;
      console.log(data);
    }).then(function () {
      getChat.getMessages($stateParams.id).then(function (data) {
        $scope.messages = data.data;
        console.log(data);
      });
    });


    $interval(function () {
      getChat.getMessages($stateParams.id).then(function (data) {
        if($scope.messages != data.data) {
          $scope.messages != data.data;
        }
      });
    }, 5000);

    $scope.getTime = function (date) {
      return formatter.getTime(date);
    };

    $scope.getUserImg = function (url) {
      return formatter.getUserImgUrl(url);
    };

    $scope.getLastSeenTime = function (date) {
  //    $scope.$broadcast('message');
      return formatter.getTime(date);
    };

    $scope.checkSender = function (data) {

      return data == $scope.currentUserId;
    };
 /*   $scope.$watch(function () {
      $scope.$broadcast('message');
    });*/

    $scope.sendMessage = function (message) {
      console.log(message);
      getChat.send($stateParams.id, message).then(function (data) {
        $scope.messages.unshift({ 'message' : message, date : new Date(), 'sender' : { 'id' : $scope.currentUserId }});
        $scope.message = '';
      });
    }
  }]);


chatModule.directive('schrollBottom', function () {
  return {
    scope: {
      schrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('schrollBottom', function (newValue) {

        if (newValue)
        {
          element[0].scrollTop = element[0].scrollHeight;
        }
      });
    }
  }
});