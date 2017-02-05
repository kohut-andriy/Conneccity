angular
  .module('ponchPicker')
  .controller(PonchPickerController);

PonchPickerController.$inject = ['$scope'];

function PonchPickerController($scope) {
  let changed = false;

  $scope.add = function addPocnch(ponch) {
    if ($scope.my.length < 5 && ponch) {
      for (let i = 0; i < $scope.my.length; i += 1) {
        if ($scope.my[i] === ponch) return;
      }
      $scope.my.push(ponch);
      $scope.item = '';
    }

    changed = true;
  };

  $scope.delete = function deletePonch(ponch) {
    for (let i = 0; i < $scope.my.length; i += 1) {
      if ($scope.my[i] === ponch) {
        $scope.my.splice(i, 1);
        changed = true;
      }
    }
  };

  $scope.submit = function submit() {
    if (changed) {
      $scope.submitFunc({ ponches: $scope.my });
    } else {
      $scope.hideFunc();
    }
  };
}
