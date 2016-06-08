meetingProfileModule.controller('meetingProfileController', ['$scope', 'formatter', 'getMeetingInfo', '$stateParams', 'mapCreate',
  function ($scope, formatter, getMeetingInfo, $stateParams, mapCreate) {
    getMeetingInfo.get($stateParams.id).then(function (response) {
      $scope.meetings = response.data;

      console.log($scope.meetings);
      /*mapCreate.clearMap();
      mapCreate.markerClusterer.clearMarkers();*/

      mapCreate.liteMapInit($scope.meetings, 'meetings');


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
  }]);