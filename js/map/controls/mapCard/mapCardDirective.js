angular
  .module('conneccityMap')
  .directive(card);

function card() {
  return {
    templateUrl: 'views/mapCard.html',
  };
}
