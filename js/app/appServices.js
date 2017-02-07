angular
.module('conneccityApp')
.factory('getSignedUserInfo', getSignedUserInfo);

getSignedUserInfo.$inject = ['$http'];

function getSignedUserInfo($http) {
  return {
    get,
    getCounter,
    getInterests,
    putPonches,
  };

  function get() {
    return $http({
      url: `${GOOGLE_IP}profile`,
      method: 'GET',
    });
  }

  function getInterests() {
    return $http({
      url: `${GOOGLE_IP}ponches`,
      method: 'GET',
    });
  }

  function putPonches(data) {
    return $http({
      url: `${GOOGLE_IP}profile/ponches`,
      method: 'PUT',
      data: {
        ponches: data,
      },
    });
  }

  function getCounter() {
    return $http({
      url: `${GOOGLE_IP}profile/counters`,
      method: 'GET',
    });
  }
}
