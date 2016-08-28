mapModule.directive('conneccityMap', ["mapCreate", function (mapCreate) {
  return {
    compile: function compile(templateElem, templateAttrs) {

      if (templateAttrs.hasOwnProperty('litemode')) {
        mapCreate.liteMapInit(templateElem[0]);
      } else {
        mapCreate.initMap(templateElem[0]);
      }

    }
  }
}]);

mapModule.directive('conneccityMarker', ["mapCreate", function (mapCreate) {
  return {
    scope: {
      marker: "=data"
    },
    link: function (scope, element, attrs) {

      if (attrs.type == 'default') {

        mapCreate.drawDefaultMarker(scope.marker);

      } else {
        mapCreate.drawMarker(scope.marker, attrs.type);
      }
    }
  }
}]);