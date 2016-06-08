userProfileModule.controller('signedUserProfile', ['$scope', 'getSignedUserInfo', 'formatter',
  function ($scope, getSignedUserInfo, formatter) {

    getSignedUserInfo.get().then(function (result) {
      $scope.user = result.data;
      console.log($scope.user);
    }).then(function () {
      $scope.$broadcast('rebuild:me');
    });

    $scope.isProfile = true;

    $scope.aboutBox = false;

    $scope.toggleAbout = function () {
      $scope.aboutBox = !$scope.aboutBox;
    };

    $scope.getAge = function (date) {
      return formatter.getAge(date);
    };

    $scope.getAddress = function (lat, lng) {
      return formatter.getAddress(lat, lng);
    };

    $scope.getUserImgUrl = function (url) {
      return formatter.getUserImg(url);
    };
    
    $scope.$watch(function () {
      $scope.$broadcast('scrollRebuild');
    });
  }]);