angular
  .module('chat')
  .factory('getChat', getChat);

getChat.$inject = ['$http'];

function getChat($http) {
  return {
    read,
    send,
    get,
    getMessages,
  };

  function read(id) {
    return $http({
      url: `${GOOGLE_IP}chats/${id}/messages`,
      method: 'PUT',
    });
  }

  function send(id, message) {
    return $http({
      url: `${GOOGLE_IP}chats/${id}/messages`,
      data: {
        message,
      },
      method: 'POST',
    });
  }

  function getMessages(id) {
    return $http({
      url: `${GOOGLE_IP}chats/${id}/messages`,
      method: 'GET',
    });
  }

  function get(id) {
    return $http({
      url: `${GOOGLE_IP}chats/'${id}`,
      method: 'GET',
    });
  }
}
