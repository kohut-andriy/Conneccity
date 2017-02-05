geolocationModule.factory('getUserLocation', ['setLocation', function getUserLocation(setLocation) {
  return {
    get() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          setLocation.set({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        });
      } else {
        setLocation.set({ latitude: 45, longitude: 45 });
      }
    },
  };
}]);

geolocationModule.factory('setLocation', ['$http', function setLocation($http) {
  return {
    set(coordinates) {
      return $http({
        url: `${GOOGLE_IP}map`,
        method: 'POST',
        data: coordinates,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  };
}]);
