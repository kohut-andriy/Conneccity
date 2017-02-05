angular
  .module('conneccityMap')
  .directive(mapFilter);

function mapFilter() {
  return {
    templateUrl: 'views/mapFilter.html',
  };
}
