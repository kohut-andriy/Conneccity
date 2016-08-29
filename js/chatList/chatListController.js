chatListModule.controller('chatListController', ['$scope', 'formatter', 'getChats', 'getUserData', 'socketFactory',
  function ($scope, formatter, getChats, getUserData, socketFactory) {

    //websocket.connect();


    getChats.get().then(function (data) {
      $scope.chats = data.data;
      // console.log(data);
    });
    
    $scope.getUserImg = function (url) {
      return formatter.getUserImgUrl(url);
    };

    $scope.getLastSeenTime = function (date) {
      return formatter.getLastSeenTime(date);
    };

    $scope.getState = function (id) {
        return socketFactory.counter.has(id);
    };
   // $scope.$broadcast('rebuild:me');
   /* $scope.$watch(function () {
      return ;
    }, function (newVal, oldVal) {


    });*/
  }]);