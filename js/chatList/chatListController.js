chatListModule.controller('chatListController', ['$scope', 'getSocketData', 'formatter', 'getChats', 'getUserData',
  function ($scope, getSocketData, formatter, getChats, getUserData) {

    getSocketData.connect();


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

    $scope.$watch(function () {
      $scope.$broadcast('rebuild:me');
    });
  }]);