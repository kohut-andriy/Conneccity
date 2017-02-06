angular
  .module('conneccityMap')
  .directive(conneccityMap);

conneccityMap.$inject = ['mapCreate'];

function conneccityMap(mapCreate) {
  return {
    compile: function compile(templateElem) {
      mapCreate.initMap(templateElem[0]);
    },
  };
}
