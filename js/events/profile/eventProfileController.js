eventProfile.controller('eventProfileController', ['$scope', 'getEventInfo', '$stateParams', 'formatter',
  function ($scope, getEventInfo, $stateParams, formatter) {

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

    $scope.$watch(function () {
      $scope.$broadcast('scrollRebuild');
    });
  }]);