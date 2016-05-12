userProfileModule.controller('userProfileController', ['$scope', 'getUserData', '$stateParams', function ($scope, getUserData, $stateParams) {

  getUserData.get($stateParams.id).then(function (result) {
    $scope.user = result.data;
    console.log($scope.user);
  }).then(function () {
    $scope.$broadcast('rebuild:me');
  });

  $scope.aboutBox = false;

  $scope.toggleAbout = function () {
    $scope.aboutBox = !$scope.aboutBox;

  };

  $scope.getAge = function (date) {
    var currentDate = new Date();

    var birthdayDate = new Date(date);
    
    return currentDate.getYear() - birthdayDate.getYear() - !!(currentDate.getMonth() - birthdayDate.getMonth());
  };
  $scope.lastSeenFormatted = function (date) {
    var MINUTE = 60 * 1000;
    var HOUR = MINUTE * 60;
    var DAY = HOUR * 24;
    var locale = "en-us";

    let currentDate = new Date();
    let lastSeenDate = new Date(date);
    let dif = new Date(currentDate - lastSeenDate);

    if (dif > DAY) {
      return lastSeenDate.toLocaleDateString(locale);
    } else if (dif > HOUR) {
      return (dif / HOUR).toFixed(0) + 'hours ego';
    } else if (dif > MINUTE) {
      return (dif / MINUTE).toFixed(0) + 'minutes ego';
    } else if (dif < MINUTE) {
      return (dif / 1000).toFixed(0) + 'seconds ego';
    }
  }
}]);