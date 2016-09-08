ponchPicker.directive('ponchPicker', [function () {
  return {

    scope: {
      my: "=my",
      related: "=related",
      hideFunc: "&",
      submitFunc: "&"
    },
    templateUrl: "views/ponchPicker.html",
    controller: "ponchPickerController"/*,
    link: function (scope, elem, attrs) {

    }*/
  }
}]);