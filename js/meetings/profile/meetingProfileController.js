meetingProfileModule.controller('meetingProfileController',
  ['$scope', 'formatter', 'getMeetingInfo', '$stateParams', "$state", "$cookies","mapCreate",
    function ($scope, formatter, getMeetingInfo, $stateParams, $state, $cookies, mapCreate) {

      getMeetingInfo.get($stateParams.id).then(function (response) {

        $scope.meeting = response.data;

        mapCreate.drawDefaultMarker($scope.meeting);
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
      };
      
      getMeetingInfo.sendMessage($stateParams.id).then(function (data) {
        console.log(data);
        $scope.chatId = data.data.id;
      });
      
      $scope.getStatusStile = function (status) {
        return formatter.getMeetingStatusIconStyle(status);
      };
      
      $scope.checkPermition = function (id) {
        return $cookies.getObject('currentUser').id == id;
      }
    }]);