angular
  .module('events')
  .factory('getEvents', getEvents);

getEvents.$inject = ['$http'];

function getEvents($http) {
  return {
    get,
  };

  function get(type = '') {
    return $http({
      url: `${GOOGLE_IP}events/${type}`,
      method: 'GET',
    });
  }
}
