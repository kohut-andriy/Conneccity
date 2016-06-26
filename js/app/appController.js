app.controller('appController', ['$scope', 'getSignedUserInfo', 'OAuthToken', 'formatter', '$cookies', 'unreadMessagesCount',
  function ($scope, getSignedUserInfo, OAuthToken, formatter, $cookies, unreadMessagesCount) {

    getSignedUserInfo.get().then(function (data) {
      $scope.user = data.data;

      $cookies.putObject('currentUser', $scope.user);

      //console.log($cookies.getObject('currentUser'));

      $scope.ponchesList = [];

      for(var ponch in $scope.user.ponches) {
        $scope.ponchesList.push($scope.user.ponches[ponch].name);
      }

      
     // console.log($scope.ponchesList);
    });

    getSignedUserInfo.getInterests().then(function (data) {
      $scope.related = [];

      for(var ponch in data.data) {
        $scope.related.push(data.data[ponch].name);
      }

    //  console.log(data);
    });

    $scope.showEdit = false;
    
    $scope.add = function (ponch) {
      for(var i =0; i < 5; i++) {
        if($scope.ponchesList[i] == ponch) return;
      }
      if($scope.ponchesList.length < 5 )
        $scope.ponchesList.push(ponch);
    };

    $scope.delete = function (ponch) {
      for(var i = 0; i < 5; i++) {
        if($scope.ponchesList[i] == ponch) {
          $scope.ponchesList.splice(i, i+1);
        }
      }
    };

    $scope.getCounter = function () {
      return unreadMessagesCount;
    };

    $scope.submit = function () {
      getSignedUserInfo.putPonches($scope.ponchesList).then(function (data) {
       // console.log(data);
      });
    };

    $scope.hideDe = function () {
      $scope.showEdit = !$scope.showEdit;
    };

    $scope.logout = function () {
      OAuthToken.removeToken();
    };

    $scope.scrollBuild = function () {
      $scope.$broadcast('rebuild:me');
    };

    $scope.getUserImgUrl = function (url) {
      return formatter.getUserImg(url);
    };


  }]);

