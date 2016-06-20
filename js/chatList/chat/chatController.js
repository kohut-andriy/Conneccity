chatModule.controller('chatController', ['$scope', 'getSocketData', 'formatter', 'getChat', '$stateParams',
  function ($scope, getSocketData, formatter, getChat, $stateParams) {

  //  getSocketData.connect();

    getChat.get($stateParams.id).then(function (data) {
      $scope.chat = data.data;
      console.log(data);
    }).then(function () {
      getChat.getMessages($stateParams.id).then(function (data) {
        console.log(data);
      });
    });

    $scope.getUserImg = function (url) {
      return formatter.getUserImgUrl(url);
    };

    $scope.getLastSeenTime = function (date) {
      return formatter.getLastSeenTime(date);
    };

  }]);