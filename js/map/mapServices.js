mapModule.service('mapCreate', [ '$rootScope',function ($rootScope) {
  var self = this;

  self.map = null;
  self.cluster = null;

  // map of marker => marker's data
  self.markersMap = new Map();

  // map of [lat,lng].join('|') => address
  self.coordinatesMap = new Map();

  // array selected markers info for cards
  self.cardsArray = [];

  // create map, clusterer, geocoder
  self.initMap = () => {
    self.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 49,
        lng: 26
      },
      zoom: 8,
      disableDefaultUI: true,
      minZoom: 2
    });

    self.markerCluster = new MarkerClusterer(self.map, [],
      {
        gridSize: 50, zoomOnClick: false, styles: [{
        url: "img/test/cluster.png",
        height: 28,
        width: 28
      }]
      });

    self.geocoder = new google.maps.Geocoder();

    google.maps.event.addListener( self.markerCluster, "clusterclick" , function (cluster) {
      var markers = cluster.getMarkers();
      self.cardsArray = [];
      for(let i =0; i < markers.length; i++) {
        self.cardsArray.push(self.markersMap.get(markers[i]));
      }
      $rootScope.$digest();
    });
  };

  // put data
  self.setData = function (data) {

    self.setMarkers(data);

  };

  // adding event's name, push data to get addresses ,push data to create markers
  self.setMarkers = function (data) {

    for(let eventType in data) {

      for (let eventInfo in data[eventType]) {
        switch (eventType) {
          case 'meetings' :
          {
            data[eventType][eventInfo].eventtype = 'meeting';
            break;
          }

          case 'events' :
          {
            data[eventType][eventInfo].eventtype = 'event';
            break;
          }

          case 'people' :
          {
            data[eventType][eventInfo].eventtype = '';
            break;
          }
        }

        if (!self.coordinatesMap.get([data[eventType][eventInfo].latitude, data[eventType][eventInfo].longitude].join('|'))) {

          self.getAddress([data[eventType][eventInfo].latitude, data[eventType][eventInfo].longitude]);

        }

          self.drawMarker("img/test/pin.png", "img/test/cluster.png", data[eventType][eventInfo]);


      }

    }

  };

  // draw marker, push data to create markers

  self.drawMarker = function (img, bg, data) {

    let canvas;
    let context;
    let instance = 0;

    canvas = document.createElement("canvas");

    context = canvas.getContext("2d");

    function draw() {

      instance++;

      if (instance == 2) {

        context.drawImage(img2, 0, 0, 25, 25);
        context.drawImage(img1, 0, 0, 25, 25);

        self.createMarker(canvas.toDataURL(), data);
      }
    }

    let img1 = new Image();

    img1.onload = draw;
    img1.src = img;
    let img2 = new Image();

    img2.onload = draw;
    img2.src = bg;
  };

  // create markers, add 'em to clusterer

  self.createMarker = function (img, data) {

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.latitude, data.longitude),
      icon: {url: img, size: new google.maps.Size(25, 25)}
    });

    self.markersMap.set(marker, data);

    marker.addListener('click', function () {
      
      console.log(self.markersMap.get(marker));

      self.cardsArray = [];

      self.cardsArray.push(self.markersMap.get(marker));

      $rootScope.$digest();
      
    });

    self.markerCluster.addMarker(marker);

  };

  // get geocoder data
  self.getAddress = function (latlng) {

    self.geocoder.geocode({
      'latLng': new google.maps.LatLng(latlng[0],latlng[1])
    }, function (results, status) {
      console.log('getting address');
      if (status === google.maps.GeocoderStatus.OK) {

        if (results[0]) {
          self.coordinatesMap.set(latlng.join('|') ,results[0].address_components[1].short_name+','+results[0].address_components[0].short_name);

        }
        $rootScope.$digest();
      }

    });
  };

  // clear map

  self.clearMap = function () {

      self.markerCluster.clearMarkers();

  };
  
}]);

// send request to server

mapModule.factory('getMapInfo', ['$http', function ($http) {
  var token = ACCESS_TOKEN;

  return {
    getAll: function () {
      return $http({
        url: GOOGLE_IP + "map",
        method: "GET",
        params: {},
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      });
    },
    getFilteredInfo: function (options) {
      function convertOptionsToUrl() {
        
      }
      return $http({
        url: GOOGLE_IP + "map",
        method: "GET",
        params: {},
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      });
    }
  }
}]);