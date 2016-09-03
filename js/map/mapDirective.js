mapModule.directive('conneccityMap', ["mapCreate", function (mapCreate) {
  return {
    compile: function compile(templateElem, templateAttrs) {
      mapCreate.initMap(templateElem[0]);
    }
  }
}]);

mapModule.directive('conneccityMarker', ["mapCreate", function (mapCreate) {
  return {
    scope: {
      marker: "=data"
    },
    link: function (scope, element, attrs) {
      mapCreate.drawMarker(scope.marker, attrs.type);
    }
  }
}]);