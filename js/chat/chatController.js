chatModule.controller('chatController', ['$scope','getSocketData', function ($scope,getSocketData) {
  
  $scope.encoded = btoa("clientapp:123456");


 // $scope.getOrders();
  getSocketData.connect();
}]);