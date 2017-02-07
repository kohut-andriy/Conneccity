angular
  .module('eventProfile')
  .factory('getEventInfo', getEventInfo);

getEventInfo.$inject = ['$http'];

function getEventInfo($http) {
  return {
    get,
    getMembers,
    join,
    leave,
    sendMessage,
  };

  function get(id) {
    return $http({
      url: `${GOOGLE_IP}events/${id}`,
      method: 'GET',
    });
  }

  function getMembers(id) {
    return $http({
      url: `${GOOGLE_IP}events/${id}/members`,
      method: 'GET',
    });
  }

  function join(id) {
    return $http({
      url: `${GOOGLE_IP}events/${id}/members`,
      method: 'POST',
    });
  }

  function leave(id) {
    return $http({
      url: `${GOOGLE_IP}events/${id}/members`,
      method: 'DELETE',
    });
  }

  function sendMessage(id) {
    return $http({
      url: `${GOOGLE_IP}events/${id}/chat`,
      method: 'GET',
    });
  }
}
