ponchPicker.directive('ponchPicker', function ponchPicker() {
  return {
    scope: {
      my: '=my',
      related: '=related',
      hideFunc: '&',
      submitFunc: '&',
    },
    templateUrl: 'views/ponchPicker.html',
    controller: 'ponchPickerController',
  };
});
