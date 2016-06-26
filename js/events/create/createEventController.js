createMeetingModule.controller('createEventController', ['$scope', 'createEvent', 'formatter', '$cookies', '$state', '$stateParams', 'getEventInfo',
  function ($scope, createEvent, formatter, $cookies, $state, $stateParams, getEventInfo) {

    $scope.user = $cookies.getObject('currentUser');
    $scope.getMapSrc = function () {
      return formatter.getGoogleMapsSrc([$scope.user.latitude,
        $scope.user.latitude]);
    };

    console.log($stateParams.id);

    $scope.event = {};

    getEventInfo.get($stateParams.id).then(function (data) {

      var event = data.data;
      console.log(event);
      $scope.event.name = event.name;
      $scope.event.startAt = new Date(event.startAt);
      $scope.event.latitude = event.latitude;
      $scope.event.longitude = event.longitude;
      $scope.event.description = event.description;
      $scope.event.price = event.priceFrom;
    });

    $scope.create = function (data) {

      console.log($cookies.userId);
      if ($stateParams.id) {
        createEvent.update({
          "name": data.name,
          "startAt": data.startAt,
          "latitude": data.latitude,
          "longitude": data.longitude,
          "description": data.description,
          "priceFrom": data.price
        }, $stateParams.id).then(function (data) {
          $state.go('app.events');
          console.log(data);
        });
      } else {
        createEvent.create({
          "name": data.name,
          "startAt": data.startAt,
          "latitude": data.latitude,
          "longitude": data.longitude,
          "description": data.description,
          "priceFrom": data.price
        }).then(function (data) {
          $state.go('app.events');
          console.log(data);
        });
      }
    }

  }]);