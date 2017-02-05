angular
  .module('eventProfile')
  .factory(getEventInfo);

getEventInfo.$inject = ['$http'];

function getEventInfo($http) {
  return {
    get(id) {
      return $http({
        url: `${GOOGLE_IP}events/${id}`,
        method: 'GET',
      });
    },
    getMembers(id) {
      return $http({
        url: `${GOOGLE_IP}events/${id}/members`,
        method: 'GET',
      });
    },
    join(id) {
      return $http({
        url: `${GOOGLE_IP}events/${id}/members`,
        method: 'POST',
      });
    },
    leave(id) {
      return $http({
        url: `${GOOGLE_IP}events/${id}/members`,
        method: 'DELETE',
      });
    },
    sendMessage(id) {
      return $http({
        url: `${GOOGLE_IP}events/${id}/chat`,
        method: 'GET',
      });
    },
  };
}
