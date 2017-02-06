angular
  .module('signUp')
  .factory('addUser', addUser);

addUser.$inject = ['$http'];

function addUser($http) {
  return {
    create(userData) {
      return $http({
        url: `${GOOGLE_IP}signup`,
        method: 'POST',
        data: userData,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    },
  };
}
