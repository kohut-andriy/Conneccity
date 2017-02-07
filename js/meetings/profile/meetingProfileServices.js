angular
  .module('meetingProfile')
  .factory('getMeetingInfo', getMeetingInfo);

getMeetingInfo.$inject = ['$http'];

function getMeetingInfo($http) {
  return {
    get,
    getMembers,
    join,
    leave,
    sendMessage,
  };

  function get(id) {
    return $http({
      url: `${GOOGLE_IP}meetings/${id}`,
      method: 'GET',
    });
  }

  function getMembers(id) {
    return $http({
      url: `${GOOGLE_IP}meetings/${id}/members`,
      method: 'GET',
    });
  }

  function join(id) {
    return $http({
      url: `${GOOGLE_IP}meetings/${id}/members`,
      method: 'POST',
    });
  }

  function leave(id) {
    return $http({
      url: `${GOOGLE_IP}meetings/${id}/members`,
      method: 'DELETE',
    });
  }

  function sendMessage(id) {
    return $http({
      url: `${GOOGLE_IP}meetings/${id}/chat`,
      method: 'GET',
    });
  }
}
