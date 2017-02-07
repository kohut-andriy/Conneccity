angular
  .module('createEvent')
  .factory('createEvent', createEvent);

createEvent.$inject = ['$http'];

function createEvent($http) {
  return {
    create,
    update,
  };

  function create(data) {
    return $http({
      url: `${GOOGLE_IP}events/`,
      method: 'POST',
      data,
    });
  }

  function update(data, id) {
    return $http({
      url: `${GOOGLE_IP}events/${id}`,
      method: 'PUT',
      data,
    });
  }
}
