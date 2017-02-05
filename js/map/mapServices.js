mapModule.service('mapCreate', ['$rootScope', '$q', '$cookies', function mapCreate($rootScope, $q, $cookies) {
  const self = this;

  self.map = null;
  self.cluster = null;

  // map of marker => marker's data
  self.markersMap = new Map();

  // map of [lat,lng].join('|') => address
  self.coordinatesMap = new Map();

  // array selected markers info for cards
  self.cardsArray = [];

  // geocoder init
  self.geocoder = new google.maps.Geocoder();

  // show user location
  self.centerMapToUser = function centerMapToUser() {
    self.map.setCenter(new google.maps.LatLng(
      $cookies.getObject('currentUser').latitude,
      $cookies.getObject('currentUser').longitude));

    self.map.setZoom(10);
  };

  // create map, clusterer, geocoder
  self.initMap = (elem) => {
    self.map = new google.maps.Map(elem, {
      center: {
        lat: 49,
        lng: 26,
      },
      zoom: 8,
      disableDefaultUI: true,
      minZoom: 2,
    });

    self.markerCluster = new MarkerClusterer(self.map, [],
      {
        gridSize: 70,
        zoomOnClick: false,
        styles: [{
          height: 51,
          url: 'img/cluster.png',
          width: 54,
          fontFamily: 'Roboto',
          textSize: 14,
          textColor: '#898989',
        }, {
          height: 51,
          url: 'img/cluster-favorite.png',
          width: 54,
          fontFamily: 'Roboto',
          textSize: 14,
          textColor: '#ffffff',
        }],
      });

    self.markerCluster.setCalculator(calculator);

    google.maps.event.addListener(self.markerCluster, 'clusterclick', function clusterclick(cluster) {
      const markers = cluster.getMarkers();

      self.cardsArray = [];
      for (let i = 0; i < markers.length; i += 1) {
        self.cardsArray.push(self.markersMap.get(markers[i]));
      }

      $rootScope.$digest();
    });
  };

  // markerClusterer calculator
  const calculator = (markers) => {
    for (let marker in markers) {
      if (self.markersMap.get(markers[marker]).hasPonchesMatches) {
        return { text: markers.length, index: 2 };
      }
    }

    return { text: markers.length, index: 1 };
  };

  // draw marker icon, push data to create markers
  self.drawMarker = function drawMarker(data, type) {
    let instance = 0;
    let draw;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    const img1 = new Image();
    const img2 = new Image();

    switch (type) {
      case 'meeting': {
        img2.src = 'img/meeting-marker.png';
        img1.src = data.photos ? data.photos.photo200px : 'img/test/meeting_icon.png';
        draw = drawMeetingMarker;
        break;
      }
      case 'event': {
        img1.src = data.photos ? data.photos.photo200px : 'img/test/event_icon.png';
        img2.src = data.hasPonchesMatches ? 'img/event-marker-favorite.png' : 'img/event-marker.png';
        draw = drawEventMarker;
        break;
      }
      default: {
        img1.src = data.photos ? data.photos.photo200px : 'img/test/user_icon.png';
        img2.src = data.hasPonchesMatches ? 'img/user-marker-favorite.png' : 'img/user-marker.png';
        draw = drawUserMarker;
      }
    }

    img1.onload = draw;
    img1.crossOrigin = 'anonymous';

    img2.onload = draw;
    img2.crossOrigin = 'anonymous';

    function drawMeetingMarker() {
      instance += 1;

      if (instance === 2) {

        canvas.width = 400;
        canvas.height = 600;

        context.drawImage(img2, 0, 3, 300, 420);

        context.arc(150, 160, 110, 0, Math.PI * 2, true);
        context.clip();

        context.drawImage(img1, 20, 40, 250, 250);
        context.clip();

        self.createMarker(canvas.toDataURL(), data, new google.maps.Size(60, 85));
      }
    }

    function drawUserMarker() {
      instance += 1;

      if (instance === 2) {

        canvas.width = 400;
        canvas.height = 400;

        context.drawImage(img2, 0, 0, 400, 400);
        context.arc(200, 190, 140, 0, Math.PI * 2, true);
        context.clip();

        context.drawImage(img1, 45, 35, 310, 310);
        context.clip();

        self.createMarker(canvas.toDataURL(), data, new google.maps.Size(50, 50));
      }
    }

    function drawEventMarker() {
      instance += 1;

      if (instance === 2) {
        canvas.width = 400;
        canvas.height = 600;

        context.drawImage(img2, 0, 0, 400, 430);
        roundedImage(75, 60, 250, 250, 0);
        context.clip();
        context.drawImage(img1, 50, 30, 300, 300);

        self.createMarker(canvas.toDataURL(), data, new google.maps.Size(50, 70));
      }
    }

    function roundedImage(x, y, width, height, radius) {
      context.beginPath();
      context.moveTo(x + radius, y);
      context.lineTo(x + (width - radius), y);
      context.quadraticCurveTo(x + width, y, x + width, y + radius);
      context.lineTo(x + width, y + (height - radius));
      context.quadraticCurveTo(x + width, y + height, x + (width - radius), y + height);
      context.lineTo(x + radius, y + height);
      context.quadraticCurveTo(x, y + height, x, y + (height - radius));
      context.lineTo(x, y + radius);
      context.quadraticCurveTo(x, y, x + radius, y);
      context.closePath();
    }
  };

  // create markers, add 'em to clusterer
  self.createMarker = function createMarker(img, data, size) {
    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.latitude, data.longitude),
      icon: {
        url: img,
        size,
        scaledSize: size,
      },
      animation: google.maps.Animation.DROP,
    });

    self.markersMap.set(marker, data);

    marker.addListener('click', () => {
      self.cardsArray = [];

      self.cardsArray.push(self.markersMap.get(marker));

      $rootScope.$digest();
    });

    self.markerCluster.addMarker(marker);
  };

  self.drawDefaultMarker = function drawDefaultMarker(data) {
    self.map.setCenter({ lat: data.latitude, lng: data.longitude + 0.005 });
  };

  // get geocoder data
  self.getAddress = function getAddress(latlng) {
    self.geocoder.geocode({
      latLng: new google.maps.LatLng(latlng[0], latlng[1]),
    }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          self.coordinatesMap.set(latlng.join('|'),
            `${results[0].address_components[1].short_name},
            ${results[0].address_components[0].short_name}`);
          $rootScope.$digest();
        }
      }
    });
  };

  // clear map
  self.clearMap = function clearMap() {
    self.markerCluster.clearMarkers();
  };

  // resize
  self.zoomIn = function zoomIn() {
    self.map.setZoom(self.map.getZoom() + 1);
  };

  self.zoomOut = function zoomOut() {
    self.map.setZoom(self.map.getZoom() - 1);
  };
}]);

// send request to server
mapModule.factory('getMapInfo', ['$http', function getMapInfo($http) {
  return {
    getAll() {
      return $http({
        url: `${GOOGLE_IP}map`,
        method: 'GET',
        params: {},
      });
    },
    getFilteredInfo(param) {
      function convertOptionsToUrl(options) {
        let url = `${GOOGLE_IP}map?`;

        for (param in options) {
          if (options[param]) {
            url += `${param}=${options[param]}&`;
          }
        }

        url = url.slice(0, -1);
        return url;
      }

      return $http({
        url: convertOptionsToUrl(param),
        method: 'GET',
        params: {},
      });
    },
  };
}]);
