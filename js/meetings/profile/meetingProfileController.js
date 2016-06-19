meetingProfileModule.controller('meetingProfileController',
  ['$scope', 'formatter', 'getMeetingInfo', '$stateParams', 'mapCreate', "$state",
    function ($scope, formatter, getMeetingInfo, $stateParams, mapCreate, $state) {
      getMeetingInfo.get($stateParams.id).then(function (response) {
        $scope.meeting = response.data;

        console.log($scope.meeting);

        mapCreate.liteMapInit($scope.meeting, 'meetings');
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
        getMeetingInfo.join(id);
      };

      $scope.leave = function (id) {
        getMeetingInfo.leave(id).success(function () {
          $state.go('app.meetings');
        });
      }
    }]);