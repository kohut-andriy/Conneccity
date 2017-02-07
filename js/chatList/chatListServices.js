angular
  .module('chatList')
  .factory('getChats', getChats);

getChats.$inject = ['$http'];

function getChats($http) {
  return {
    get,
  };

  function get() {
    return $http({
      url: `${GOOGLE_IP}chats/`,
      method: 'GET',
    });
  }
}
