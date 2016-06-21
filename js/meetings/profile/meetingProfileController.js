meetingProfileModule.controller('meetingProfileController',
  ['$scope', 'formatter', 'getMeetingInfo', '$stateParams', 'mapCreate', "$state", "$cookies",
    function ($scope, formatter, getMeetingInfo, $stateParams, mapCreate, $state, $cookies) {
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
      };
      
      getMeetingInfo.sendMessage($stateParams.id).then(function (data) {
        console.log(data);
        $scope.chatId = data.data.id;
      });
      
      $scope.getStatusStile = function (status) {
        return formatter.getMeetingStatusIconStyle(status);
      };
      
      $scope.checkPermition = function () {
        return $cookies.getObject('currentUser').id == $scope.meeting.creator.id;
      }
    }]);