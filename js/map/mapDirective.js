angular
  .module('conneccityMap')
  .directive(conneccityMap)
  .directive(conneccityMarker);

conneccityMap.$inject = ['mapCreate'];
conneccityMarker.$inject = ['mapCreate'];

function conneccityMap(mapCreate) {
  return {
    compile: function compile(templateElem) {
      mapCreate.initMap(templateElem[0]);
    },
  };
}

function conneccityMarker(mapCreate) {
  return {
    scope: {
      marker: '=data',
    },
    link(scope, attrs) {
      mapCreate.drawMarker(scope.marker, attrs.type);
    },
  };
}
