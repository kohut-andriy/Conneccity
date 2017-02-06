angular
  .module('createMeeting')
  .factory('createMeeting', createMeeting);

createMeeting.$inject = ['$http'];

function createMeeting($http) {
  return {
    create(data) {
      return $http({
        url: `${GOOGLE_IP}meetings/`,
        method: 'POST',
        data,
      });
    },
    update(data, id) {
      return $http({
        url: `${GOOGLE_IP}meetings/${id}`,
        method: 'PUT',
        data,
      });
    },
  };
}
