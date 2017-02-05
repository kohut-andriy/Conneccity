angular
  .module('createEvent')
  .factory(createEvent);

createEvent.$inject = ['$http'];

function createEvent($http) {
  return {
    create(data) {
      return $http({
        url: `${GOOGLE_IP}events/`,
        method: 'POST',
        data,
      });
    },
    update(data, id) {
      return $http({
        url: `${GOOGLE_IP}events/${id}`,
        method: 'PUT',
        data,
      });
    },
  };
}
