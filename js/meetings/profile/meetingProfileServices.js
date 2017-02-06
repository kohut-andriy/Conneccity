angular
  .module('meetingProfile')
  .factory('getMeetingInfo', getMeetingInfo);

getMeetingInfo.$inject = ['$http'];

function getMeetingInfo($http) {
  return {
    get(id) {
      return $http({
        url: `${GOOGLE_IP}meetings/${id}`,
        method: 'GET',
      });
    },
    getMembers(id) {
      return $http({
        url: `${GOOGLE_IP}meetings/${id}/members`,
        method: 'GET',
      });
    },
    join(id) {
      return $http({
        url: `${GOOGLE_IP}meetings/${id}/members`,
        method: 'POST',
      });
    },
    leave(id) {
      return $http({
        url: `${GOOGLE_IP}meetings/${id}/members`,
        method: 'DELETE',
      });
    },
    sendMessage(id) {
      return $http({
        url: `${GOOGLE_IP}meetings/${id}/chat`,
        method: 'GET',
      });
    },
  };
}
