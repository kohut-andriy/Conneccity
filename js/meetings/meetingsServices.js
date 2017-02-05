angular
  .module('meetings')
  .factory(getMeetings);

getMeetings.$inject = ['$http'];

function getMeetings($http) {
  return {
    get(type = '') {
      return $http({
        url: `${GOOGLE_IP}meetings/${type}`,
        method: 'GET',
      });
    },
  };
}
