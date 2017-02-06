angular
  .module('conneccityMap')
  .directive(conneccityMarker);

conneccityMarker.$inject = ['mapCreate'];

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
