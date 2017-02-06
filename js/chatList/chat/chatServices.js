angular
  .module('chat')
  .factory('getChat', getChat);

getChat.$inject = ['$http'];

function getChat($http) {
  return {
    get(id) {
      return $http({
        url: `${GOOGLE_IP}chats/'${id}`,
        method: 'GET',
      });
    },
    getMessages(id) {
      return $http({
        url: `${GOOGLE_IP}chats/${id}/messages`,
        method: 'GET',
      });
    },
    send(id, message) {
      return $http({
        url: `${GOOGLE_IP}chats/${id}/messages`,
        data: {
          message,
        },
        method: 'POST',
      });
    },
    read(id) {
      return $http({
        url: `${GOOGLE_IP}chats/${id}/messages`,
        method: 'PUT',
      });
    },
  };
}
