usersModule.factory('getUsers', ['$http', function getUsers($http) {
  return {
    get() {
      return $http({
        url: `${GOOGLE_IP}users?count=50`,
        method: 'GET',
      });
    },
  };
}]);
