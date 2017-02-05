mapModule.directive('conneccityMap', ['mapCreate', function conneccityMap(mapCreate) {
  return {
    compile: function compile(templateElem) {
      mapCreate.initMap(templateElem[0]);
    },
  };
}]);

mapModule.directive('conneccityMarker', ['mapCreate', function conneccityMarker(mapCreate) {
  return {
    scope: {
      marker: '=data',
    },
    link(scope, attrs) {
      mapCreate.drawMarker(scope.marker, attrs.type);
    },
  };
}]);
