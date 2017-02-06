angular
  .module('userProfile')
  .factory('getUserData', getUserData);

getUserData.$inject = ['$http'];

function getUserData($http) {
  return {
    get(id) {
      return $http({
        url: `${GOOGLE_IP}users/${id}`,
        method: 'GET',
      });
    },
    getEvents(id, type = '') {
      return $http({
        url: `${GOOGLE_IP}users/${id}/events/${type}`,
        method: 'GET',
      });
    },
    getChatId(id) {
      return $http({
        url: `${GOOGLE_IP}users/${id}/chat`,
        method: 'GET',
      });
    },
  };
}
