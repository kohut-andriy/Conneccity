angular
  .module('users')
  .factory(getUsers);

getUsers.$inject = ['$http'];

function getUsers($http) {
  return {
    get() {
      return $http({
        url: `${GOOGLE_IP}users?count=50`,
        method: 'GET',
      });
    },
  };
}
