geolocationModule.factory('getUserLocation', ['setLocation', function (setLocation) {
  return {
    get: function () {
      if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {
          console.log(position);
          setLocation.set({'latitude': position.coords.latitude, 'longitude': position.coords.longitude});

        }, function () {

        });
      }

      else {
        setLocation.set({'latitude': 45, 'longitude': 45});
      }
    }
  }
}]);

geolocationModule.factory('setLocation', ['$http', function ($http) {
  return {

    set: function (coordinates) {
      return $http({
        url: GOOGLE_IP + "map",
        method: "POST",
        data: coordinates,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  }
}]);