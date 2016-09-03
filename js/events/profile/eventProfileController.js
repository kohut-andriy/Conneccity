eventProfile.controller('eventProfileController', ['$scope', 'getEventInfo', '$stateParams', 'formatter', '$cookies',
  function ($scope, getEventInfo, $stateParams, formatter, $cookies) {

    getEventInfo.get($stateParams.id).then(function (response) {
      $scope.event = response.data;
      console.log($scope.event);
    });

    getEventInfo.getMembers($stateParams.id).then(function (response) {
      $scope.members = response.data;
      console.log($scope.members);
    });


    $scope.getAddress = function (lat, lng) {

      return formatter.getAddress(lat, lng);
    };

    $scope.parseDate = function (date) {

      return formatter.formatDate(date);
    };

    $scope.getUserImg = function (url) {
      return formatter.getUserImg(url);
    };
    

    $scope.$watch(function () {
      $scope.$broadcast('scrollRebuild');
    });

    $scope.join = function (id) {
      getEventInfo.join(id).success(function () {
        $scope.toggleMember();
      });
    };

    $scope.leave = function (id) {
      getEventInfo.leave(id).success(function () {
        $scope.toggleMember();
      });
    };

    $scope.toggleMember = function () {
      if($scope.event.isMember) {
        $scope.event.isMember = false;
        $scope.members.shift();
      } else {
        $scope.members.unshift($cookies.getObject('currentUser'));

        $scope.event.isMember = true;
      }
    };

    $scope.checkPermition = function (id) {
      return $cookies.getObject('currentUser').id == id;
    };

    getEventInfo.sendMessage($stateParams.id).then(function (data) {
      console.log(data);
      $scope.chatId = data.data.id;
    });
  }]);