eventsModule.factory('getEvents', ['$http', function getEvents($http) {
  return {
    get(type = '') {
      return $http({
        url: `${GOOGLE_IP}events/${type}`,
        method: 'GET',
      });
    },
  };
}]);
