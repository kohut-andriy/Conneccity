angular
  .module('conneccityApp')
  .factory('getSignedUserInfo', getSignedUserInfo);

getSignedUserInfo.$inject = ['$http'];

function getSignedUserInfo($http) {
  return {
    get() {
      return $http({
        url: `${GOOGLE_IP}profile`,
        method: 'GET',
      });
    },
    getInterests() {
      return $http({
        url: `${GOOGLE_IP}ponches`,
        method: 'GET',
      });
    },
    putPonches(data) {
      return $http({
        url: `${GOOGLE_IP}profile/ponches`,
        method: 'PUT',
        data: {
          ponches: data,
        },
      });
    },
    getCounter() {
      return $http({
        url: `${GOOGLE_IP}profile/counters`,
        method: 'GET',
      });
    },
  };
}
