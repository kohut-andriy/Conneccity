placePicker.directive('placePicker', ['mapCreate', function placePicker(mapCreate) {
  return {
    template: "<conneccity-map class='map'></conneccity-map>",
    link(scope) {
      let marker;
      let coordinates;

      google.maps.event.addListener(mapCreate.map, 'click', (event) => {
        if (marker) marker.setMap(null);

        marker = new google.maps.Marker({
          position: event.latLng,
          draggable: true,
          map: mapCreate.map,
        });

        coordinates = { lat: marker.position.lat(), lng: marker.position.lng() };

        scope.placePicker = coordinates;
      });
    },
  };
}]);
