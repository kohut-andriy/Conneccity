mapModule.service('mapCreate', ['$rootScope', '$q', '$cookies', function ($rootScope, $q, $cookies) {
  var self = this;

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

  self.centerMapToUser = function () {
    self.map.setCenter(new google.maps.LatLng(
      $cookies.getObject('currentUser').latitude,
      $cookies.getObject('currentUser').longitude
    ));

    self.map.setZoom(10);
  };

  // lite map init
  self.liteMapInit = (marker, markerType) => {
    self.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: marker.latitude,
        lng: (marker.longitude + 0.005)
      },
      zoom: 16,
      maxZoom: 16,
      minZoom: 16,
      clickableIcons: false,
      rotateControl: false,
      disableDefaultUI: true,
      draggable: false
    });

    self.markerCluster = new MarkerClusterer(self.map, [], []);

    let dataArray = {};

    dataArray[markerType] = {
      '0': marker
    };

    console.log(dataArray);

    self.setMarkers(dataArray);
  };

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
        gridSize: 70,
        zoomOnClick: false,
        styles: [{
          height: 51,
          url: "img/cluster.png",
          width: 54,
          fontFamily: 'Roboto',
          textSize: 14,
          textColor: '#898989'
        },
          {
            height: 51,
            url: "img/cluster-favorite.png",
            width: 54,
            fontFamily: 'Roboto',
            textSize: 14,
            textColor: '#ffffff'
          }]
      });

    self.markerCluster.setCalculator(calculator);

    google.maps.event.addListener(self.markerCluster, "clusterclick", function (cluster) {

      var markers = cluster.getMarkers();

      self.cardsArray = [];
      for (let i = 0; i < markers.length; i++) {
        self.cardsArray.push(self.markersMap.get(markers[i]));
      }

      $rootScope.$digest();
    });
  };

  // markerClusterer calculator

  var calculator = function (markers, numStyles) {

    for (let marker in markers) {
      if (self.markersMap.get(markers[marker]).hasPonchesMatches) {
        return {text: markers.length, index: 2};
      }
    }

    return {text: markers.length, index: 1};
  };

  // put data
  self.setData = function (data) {
    self.setMarkers(data);
  };

  // adding event's name, push data to get addresses ,push data to create markers
  self.setMarkers = function (data) {

    console.log('mark');
    for (let eventType in data) {
      console.log(data[eventType]);
      for (let eventInfo in data[eventType]) {
        let currentData = data[eventType][eventInfo];

        switch (eventType) {
          case 'meetings' :
            console.log('met');
          {
            currentData.eventtype = 'meeting';
            break;
          }

          case 'events' :
          {
            currentData.eventtype = 'event';
            break;
          }

          case 'people' :
          {
            currentData.eventtype = '';
            break;
          }
        }

        self.drawMarker(currentData.photos ? currentData.photos.photo200px : 'img/test/pin.png',
          "img/test/cluster.png",
          currentData);
      }

    }

  };

  // draw marker, push data to create markers

  self.drawMarker = function (img, bg, data) {

    console.log('draw');
    let canvas;
    let context;
    let instance = 0;

    let draw;
    canvas = document.createElement("canvas");

    context = canvas.getContext("2d");

    let img1 = new Image();

    let img2 = new Image();

    if (data.eventtype === 'meeting') {

      img2.src = 'img/meeting-marker.png';
      draw = drawMeetingMarker;
      console.log('create meeting');

    } else if (data.eventtype === 'event') {

      img2.src = data.hasPonchesMatches ? 'img/event-marker-favorite.png' : 'img/event-marker.png';
      draw = drawEventMarker;
      console.log('create event');

    } else {

      img2.src = data.hasPonchesMatches ? 'img/user-marker-favorite.png' : 'img/user-marker.png';
      draw = drawUserMarker;
      console.log('create user');

    }

    img1.onload = draw;
    img1.src = img;
    img1.crossOrigin = "anonymous";

    img2.onload = draw;
    img2.crossOrigin = "anonymous";

    function drawMeetingMarker() {
      instance++;

      if (instance == 2) {

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
      instance++;

      if (instance == 2) {

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
      instance++;

      if (instance == 2) {
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
      context.lineTo(x + width - radius, y);
      context.quadraticCurveTo(x + width, y, x + width, y + radius);
      context.lineTo(x + width, y + height - radius);
      context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      context.lineTo(x + radius, y + height);
      context.quadraticCurveTo(x, y + height, x, y + height - radius);
      context.lineTo(x, y + radius);
      context.quadraticCurveTo(x, y, x + radius, y);
      context.closePath();
    }

  };

  // create markers, add 'em to clusterer

  self.createMarker = function (img, data, size) {
    console.log('create marker');
    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.latitude, data.longitude),
      icon: {
        url: img,
        size: size,
        scaledSize: size
      },
      animation:google.maps.Animation.DROP
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
      'latLng': new google.maps.LatLng(latlng[0], latlng[1])
    }, function (results, status) {
      console.log('getting address');

      if (status === google.maps.GeocoderStatus.OK) {

        if (results[0]) {
          self.coordinatesMap.set(latlng.join('|'),
            results[0].address_components[1].short_name +
            ',' +
            results[0].address_components[0].short_name);
          $rootScope.$digest();
        }
      }
    });
  };

  // clear map

  self.clearMap = function () {
    self.markerCluster.clearMarkers();
  };

  // resize

  self.zoomIn = function () {
    self.map.setZoom(self.map.getZoom() + 1);
  };

  self.zoomOut = function () {
    self.map.setZoom(self.map.getZoom() - 1);
  };

}]);

// send request to server

mapModule.factory('getMapInfo', ['$http', function ($http) {

  return {
    getAll: function () {
      return $http({
        url: GOOGLE_IP + "map",
        method: "GET",
        params: {}
      });
    },
    getFilteredInfo: function (param) {
      function convertOptionsToUrl(options) {
        let url = GOOGLE_IP + "map?";

        for (param in options) {
          if (options[param])
            url += param + "=" + options[param] + "&";
        }

        url = url.slice(0, -1);
        console.log(url);
        return url;
      }

      return $http({
        url: convertOptionsToUrl(param),
        method: "GET",
        params: {}
      });
    }
  }
}]);