chatListModule.controller('chatListController', ['$scope', 'getSocketData', 'formatter', 'getChats', 'getUserData',
  function ($scope, getSocketData, formatter, getChats, getUserData) {

    getSocketData.connect();

    getChats.get().then(function (data) {
      $scope.chats = data.data;
      console.log(data);
    }).then(function () {

     /* for (var chat in  $scope.chats)

        switch ($scope.chats[chat].type) {
          case "EVENT" :
          {
            $scope.chats[chat].info = $scope.chats[chat].event;
            break;
          }
          case "MEETING" :
          {
            $scope.chats[chat].info = $scope.chats[chat].meeting;
          }
          default :
          {
            getUserData.get($scope.chats[chat].userIds['0']).then(function (data) {
             // console.log(data);
              $scope.chats[chat].info = data.data;
             // console.log($scope.chats[chat].user);
            });
            break;
          }
        }
*/
      console.log($scope.chats);
    });

    $scope.getUserImg = function (url) {
      return formatter.getUserImgUrl(url);
    };

    $scope.getLastSeenTime = function (date) {
      return formatter.getLastSeenTime(date);
    };

    $scope.$watch(function () {
      $scope.$broadcast('rebuild:me');
    });
  }]);