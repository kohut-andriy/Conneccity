angular
  .module('createMeeting')
  .factory('createMeeting', createMeeting);

createMeeting.$inject = ['$http'];

function createMeeting($http) {
  return {
    create,
    update,
  };

  function create(data) {
    return $http({
      url: `${GOOGLE_IP}meetings/`,
      method: 'POST',
      data,
    });
  }

  function update(data, id) {
    return $http({
      url: `${GOOGLE_IP}meetings/${id}`,
      method: 'PUT',
      data,
    });
  }
}
