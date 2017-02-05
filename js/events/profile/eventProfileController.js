eventProfile.controller('eventProfileController', ['$scope', 'getEventInfo', '$stateParams', 'formatter', '$cookies',
  function eventProfileController($scope, getEventInfo, $stateParams, formatter, $cookies) {
    getEventInfo.get($stateParams.id).then((response) => {
      $scope.event = response.data;
    });

    getEventInfo.getMembers($stateParams.id).then((response) => {
      $scope.members = response.data;
    });

    $scope.getAddress = function getAddress(lat, lng) {
      return formatter.getAddress(lat, lng);
    };

    $scope.parseDate = function parseDate(date) {
      return formatter.formatDate(date);
    };

    $scope.getUserImg = function getUserImg(url) {
      return formatter.getUserImg(url);
    };

    $scope.$watch(() => {
      $scope.$broadcast('scrollRebuild');
    });

    $scope.join = function join(id) {
      getEventInfo.join(id).success(() => {
        $scope.toggleMember();
      });
    };

    $scope.leave = function leave(id) {
      getEventInfo.leave(id).success(() => {
        $scope.toggleMember();
      });
    };

    $scope.toggleMember = function toggleMember() {
      if ($scope.event.isMember) {
        $scope.event.isMember = false;
        $scope.members.shift();
      } else {
        $scope.members.unshift($cookies.getObject('currentUser'));
        $scope.event.isMember = true;
      }
    };

    $scope.checkPermition = function checkPermition(id) {
      return $cookies.getObject('currentUser').id === id;
    };

    getEventInfo.sendMessage($stateParams.id).then((data) => {
      $scope.chatId = data.data.id;
    });
  }]);
