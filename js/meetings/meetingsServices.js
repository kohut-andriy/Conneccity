meetingsModule.factory('getMeetings', ['$http', function getMeetings($http) {
  return {
    get(type = '') {
      return $http({
        url: `${GOOGLE_IP}meetings/${type}`,
        method: 'GET',
      });
    },
  };
}]);
