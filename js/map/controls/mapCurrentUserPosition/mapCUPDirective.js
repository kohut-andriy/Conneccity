angular
  .module('conneccityMap')
  .directive(mapUserPosition);

function mapUserPosition() {
  return {
    templateUrl: 'views/mapCUP.html',
  };
}
