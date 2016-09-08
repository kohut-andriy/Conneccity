ponchPicker.controller('ponchPickerController', ["$scope", function ($scope) {

  var changed = false;

  $scope.add = function (ponch) {

    if ($scope.my.length < 5 && ponch) {
      for (var i = 0; i < $scope.my.length; i++) {
        if ($scope.my[i] == ponch) return;
      }
      $scope.my.push(ponch);
      $scope.item = "";
    }

    changed = true;
  };

  $scope.delete = function (ponch) {


    for (var i = 0; i < $scope.my.length; i++) {
      if ($scope.my[i] == ponch) {
        $scope.my.splice(i, 1);
        changed = true;
      }
    }
  };

  $scope.submit = function () {
    if (changed) {
      $scope.submitFunc({ponches: $scope.my});
    } else {
      $scope.hideFunc();
    }
  };

}]);