angular
  .module('conneccityMap')
  .directive(mapResize);

function mapResize() {
  return {
    templateUrl: 'views/mapResize.html',
  };
}
