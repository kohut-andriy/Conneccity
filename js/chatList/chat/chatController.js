chatModule.controller('chatController', ['$scope', 'getSocketData', 'formatter', 'getChat', '$stateParams', '$cookies',
  function ($scope, getSocketData, formatter, getChat, $stateParams, $cookies) {

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

 /*   $scope.$watch(function () {
      $scope.$broadcast('message');
    });*/
  }]);


chatModule.directive('schrollBottom', function () {
  return {
    scope: {
      schrollBottom: "="
    },
    link: function (scope, element) {
      scope.$watchCollection('schrollBottom', function (newValue) {
        console.log(element);
        if (newValue)
        {
          element[0].scrollTop = element[0].scrollHeight;
        }
      });
    }
  }
});