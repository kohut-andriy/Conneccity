placePicker.directive('placePicker', ['mapCreate', function (mapCreate) {
  return {


    template: "<conneccity-map class='map'></conneccity-map>",
    link: function (scope, elem, attrs) {
      var marker;
      var coordinates;


      google.maps.event.addListener(mapCreate.map, 'click', function(event) {
        if(marker) marker.setMap(null);

        marker = new google.maps.Marker({
          position: event.latLng,
          draggable:true,
          map: mapCreate.map
        });

        coordinates = { lat: marker.position.lat(), lng: marker.position.lng() };

        if(coordinates) scope.placePicker = coordinates;

      });

    }
  }
}]);