// main app

'use strict';

var GOOGLE_IP = "http://10.5.6.14:8080/";
var ACCESS_TOKEN = "1cd94d53-c6a1-4cfa-9e80-863d899fcd9e";

var app = angular.module('conneccityApp', ['ngScrollbar', 'ngResource', 'ui.router', 'signIn', 'signUp', 'menu', 'conneccityMap', 'users', 'userProfile', 'meetings', 'events']);
app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

  $stateProvider.state('authorization', {
    url: "/signIn",
    templateUrl: "views/signin.html",
    controller: 'signInController'
  }).state('registration', {
    url: "/signUp",
    templateUrl: "views/signup.html",
    controller: 'signUpController'
  }).state('app', {
    url: '/',
    views: {
      '': {
        templateUrl: 'views/app.html',
        controller: 'appController'
      },
      'content@app': {
        template: '<conneccity-map class="map"></conneccity-map>'
      }
    }
  }).state('app.users', {
    url: 'users/',
    views: {
      'content@app': {
        templateUrl: 'views/users.html',
        controller: 'usersController'
      }
    }
  }).state('app.users.id', {
    url: '{id:int}',
    views: {
      'content@app': {
        templateUrl: 'views/userProfile.html',
        controller: 'userProfileController'
      }
    }
  }).state('app.events', {
    url: 'events/',
    views: {
      'content@app': {
        templateUrl: 'views/events.html',
        controller: 'eventsController'
      }
    }
  }).state('app.events.id', {
    url: ':id',
    views: {
      'content@app': {
        template: '<p>event id</p>'
      }
    }
  }).state('app.meetings', {
    url: 'meetings/',
    views: {
      'content@app': {
        templateUrl: 'views/meetings.html',
        controller: 'meetingsController'
      }
    }
  }).state('app.meetings.id', {
    url: ':id',
    views: {
      'content@app': {
        template: '<p>meeting id</p>'
      }
    }
  }).state('app.map', {
    url: "map/:id",
    views: {
      "content": {
        template: '<map-filter></map-filter>',
        link: function link(scope) {
          console.log('cont');

          scope.filterState = false;

          scope.toggleState = function () {
            scope.filterState = !scope.filterState;
          };
        }
      }
    }
  }).state('card', {
    url: "/card",
    templateUrl: "views/mapCard.html"
  });

  $urlRouterProvider.otherwise("/");
}]);
app.controller('appController', ['$scope', function ($scope) {
  $scope.isSho = true;
}]);

// authorization

var signInModule = angular.module('signIn', ['ngResource', 'ui.router']);

signInModule.controller('signInController', ['$scope', '$http', '$httpParamSerializer', function ($scope, $http, $httpParamSerializer) {

  $scope.data = {
    "grant_type": "password",
    "scope": "",
    "username": "google@mail.ru",
    "password": "google228"

  };
  $scope.encoded = btoa("clientapp:123456");

  var req = {
    method: 'POST',
    url: GOOGLE_IP + "oauth/token",
    data: $httpParamSerializer($scope.data),
    headers: {
      "Authorization": "Basic " + $scope.encoded,
      "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
  };
  $http(req).success(function (name) {
    console.log("Google WP");
    console.log(name);
  }).error(function (name, ere) {
    console.log(ere);
  });
}]);

// registration

var signUpModule = angular.module('signUp', ['ngResource', 'ui.router']);

signUpModule.controller('signUpController', ['$scope', '$http', function ($scope, $http) {

  $scope.data = {
    "email": "1234@gmail.com",
    "name": "kogut",
    "surname": "andrey",
    "dateBirthday": "1997-12-20", //+(new Date()),
    "gender": 1,
    "password": "123456",
    "passwordConfirm": "123456",
    "mobilePhone": "+12345678"
  };

  // $scope.encoded = btoa("clientapp:123456");

  var req = {
    method: "POST",
    url: GOOGLE_IP + "signup",
    data: $scope.data,
    headers: {
      //   "Authorization": "Basic " + $scope.encoded,
      "Content-Type": "application/json"
    }
  };

  $http(req);
}]);

// menu

var menuModule = angular.module('menu', ['ngResource', 'ui.router']);
menuModule.controller('menuController', [function () {}]);

// map
var mapModule = angular.module('conneccityMap', ['ngResource', 'ui.router']);
mapModule.directive('conneccityMap', function () {
  return {
    templateUrl: "views/map.html",
    controller: "mapCreateController"
  };
});
mapModule.controller('mapCreateController', ['$scope', 'mapCreate', 'getMapInfo', function ($scope, mapCreate, getMapInfo) {

  $scope.filterState = false;

  $scope.toggleState = function () {
    $scope.filterState = !$scope.filterState;
  };

  $scope.peopleState = false;

  $scope.togglePeople = function () {
    $scope.peopleState = !$scope.peopleState;
    $scope.eventState = false;
    $scope.meetingState = false;
  };

  $scope.meetingState = false;

  $scope.toggleMeeting = function () {
    $scope.meetingState = !$scope.meetingState;
    $scope.eventState = false;
    $scope.peopleState = false;
  };

  $scope.eventState = false;

  $scope.toggleEvent = function () {
    $scope.meetingState = false;
    $scope.peopleState = false;
    $scope.eventState = !$scope.eventState;
  };

  $scope.cardVisible = false;
  $scope.cardCounter = 0;

  $scope.toggleCard = function () {
    $scope.cardVisible = false;
  };

  $scope.getPreviousCard = function () {
    if ($scope.cardCounter > 0) $scope.cardCounter--;
  };

  $scope.getNextCard = function () {
    if ($scope.cardCounter < $scope.cardInfo.length - 1) $scope.cardCounter++;
  };

  $scope.getFormatedDistance = function (distance) {
    if (distance < 1000) {
      return distance + 'm';
    } else {
      return (distance / 1000).toFixed(1) + 'km';
    }
  };

  $scope.clear = function () {

    mapCreate.clearMap();
  };

  $scope.setAllInfo = function () {

    console.log('setting');
    mapCreate.clearMap();
    getMapInfo.getAll().then(function (data) {
      console.log(data.data);
      mapCreate.setData(data.data);
    });
  };

  $scope.parseDate = function (stringDate) {

    var date = new Date(stringDate);

    var locale = "en-us";
    var day = date.getDay();
    var month = date.toLocaleString(locale, { month: "short" });

    var hours = date.toLocaleTimeString(locale, { hour: "2-digit", minute: "2-digit", hour12: false });

    return day + ' ' + month + ', ' + hours;
  };
  $scope.coordinates = new Map();
  $scope.getAddress = function (lat, lng) {
    var address = $scope.coordinates.get([lat, lng].join("|"));
    if (!address && lat && lng) {
      address = mapCreate.getAddress([lat, lng]);
    }
    return address;
  };

  $scope.$watchGroup([function () {
    return mapCreate.cardsArray;
  }, function () {
    return mapCreate.coordinatesMap;
  }], function (newVal, oldVal) {

    if (newVal[0] != 'undefined' && newVal[0] != oldVal[0]) {
      $scope.cardVisible = true;
      $scope.cardInfo = mapCreate.cardsArray;
      $scope.cardCounter = 0;
    }

    if (newVal[1] != 'undefined') {
      $scope.coordinates = mapCreate.coordinatesMap;
    }
  });

  $scope.zoomIn = function () {
    mapCreate.zoomIn();
  };

  $scope.zoomOut = function () {
    mapCreate.zoomOut();
  };

  mapCreate.initMap();
  $scope.setAllInfo();

  $scope.filterMap = function () {
    console.log($scope.eventTimeTo);
    var a = new Date($scope.eventTimeTo).getTime();

    console.log(a);
    var options = {
      'meetingStartAtFrom': null,
      'meetingStartAtTo': null,
      'meetingMembersCountFrom': $scope.meetingMembersFrom,
      'meetingMembersCountTo': $scope.meetingMembersTo,
      'eventStartAtFrom': new Date($scope.eventTimeFrom).getTime() / 1000 | 0,
      'eventStartAtTo': new Date($scope.eventTimeTo).getTime() / 1000 | 0,
      'eventMembersCountFrom': $scope.eventMembersFrom,
      'eventMembersCountTo': $scope.eventMembersTo,
      'userGender': $scope.genderMale ? 1 : $scope.genderFemale ? 2 : null,
      'userAgeFrom': $scope.ageFrom,
      'userAgeTo': $scope.ageTo
    };

    getMapInfo.getFilteredInfo(options).then(function (data) {
      mapCreate.clearMap();
      mapCreate.setData(data.data);
    });
  };

  /*getMapInfo.getFilteredInfo(options).then(function (res) {
    console.log('cur');
    console.log(res);
  });*/
}]);
mapModule.service('mapCreate', ['$rootScope', function ($rootScope) {
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
  self.initMap = function () {
    self.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 49,
        lng: 26
      },
      zoom: 8,
      disableDefaultUI: true,
      minZoom: 2
    });

    self.markerCluster = new MarkerClusterer(self.map, [], {
      gridSize: 70,
      zoomOnClick: false,
      styles: [{
        height: 51,
        url: "img/cluster.png",
        width: 54,
        fontFamily: 'Roboto',
        textSize: 14,
        textColor: '#898989'
      }, {
        height: 51,
        url: "img/cluster-favorite.png",
        width: 54,
        fontFamily: 'Roboto',
        textSize: 14,
        textColor: '#ffffff'
      }]
    });
    self.markerCluster.setCalculator(calculator);

    self.geocoder = new google.maps.Geocoder();

    google.maps.event.addListener(self.markerCluster, "clusterclick", function (cluster) {
      var markers = cluster.getMarkers();
      self.cardsArray = [];
      for (var i = 0; i < markers.length; i++) {
        self.cardsArray.push(self.markersMap.get(markers[i]));
      }
      $rootScope.$digest();
    });
  };

  // markerClusterer calculator

  var calculator = function calculator(markers, numStyles) {

    for (var marker in markers) {
      if (self.markersMap.get(markers[marker]).hasPonchesMatches) {
        return { text: markers.length, index: 2 };
      }
    }

    return { text: markers.length, index: 1 };
  };

  // put data
  self.setData = function (data) {

    self.setMarkers(data);
  };

  // adding event's name, push data to get addresses ,push data to create markers
  self.setMarkers = function (data) {

    for (var eventType in data) {

      for (var eventInfo in data[eventType]) {
        var currentData = data[eventType][eventInfo];
        switch (eventType) {
          case 'meetings':
            {
              currentData.eventtype = 'meeting';
              break;
            }

          case 'events':
            {
              currentData.eventtype = 'event';
              break;
            }

          case 'people':
            {
              currentData.eventtype = '';
              break;
            }
        }

        /*if (!self.coordinatesMap.get([currentData.latitude, currentData.longitude].join('|'))) {
              self.getAddress([currentData.latitude, currentData.longitude]);
            }*/

        self.drawMarker(currentData.photos ? currentData.photos.photo200px : 'img/test/pin.png', "img/test/cluster.png", currentData);
      }
    }
  };

  // draw marker, push data to create markers

  self.drawMarker = function (img, bg, data) {

    var canvas = void 0;
    var context = void 0;
    var instance = 0;

    var draw = void 0;
    canvas = document.createElement("canvas");

    context = canvas.getContext("2d");

    var img1 = new Image();

    var img2 = new Image();

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

        context.drawImage(img1, 20, 40, 250, 250);context.clip();

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
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(data.latitude, data.longitude),
      icon: { url: img, size: size, scaledSize: size }

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
          self.coordinatesMap.set(latlng.join('|'), results[0].address_components[1].short_name + ',' + results[0].address_components[0].short_name);
        }
        $rootScope.$digest();
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
  var token = ACCESS_TOKEN;

  return {
    getAll: function getAll() {
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
    getFilteredInfo: function getFilteredInfo(param) {
      function convertOptionsToUrl(options) {
        var url = GOOGLE_IP + "map?";

        for (param in options) {
          if (options[param]) url += param + "=" + options[param] + "&";
        }

        url = url.slice(0, -1);
        console.log(url);
        return url;
      }
      return $http({
        url: convertOptionsToUrl(param),
        method: "GET",
        params: {},
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      });
    }
  };
}]);

// map.controls

// map.controls.resize

mapModule.directive('mapResize', [function () {
  return {
    templateUrl: "views/mapResize.html"
  };
}]);

// map.controls.filer

mapModule.directive('mapFilter', [function () {
  return {
    templateUrl: "views/mapFilter.html"
  };
}]);

// map.controls.mapCurrentPosition

mapModule.directive('mapUserPosition', [function () {
  return {
    templateUrl: "views/mapCUP.html"
  };
}]);

// map.controls.Cards

mapModule.directive('card', function () {
  return {
    templateUrl: 'views/mapCard.html'
  };
});

// app.users

var usersModule = angular.module('users', ['ngScrollbar']);
usersModule.controller('usersController', ['$scope', 'getUsers', function ($scope, getUsers) {
  getUsers.get().then(function (response) {
    $scope.users = response.data;
    console.log($scope.users);
  }).then(function () {
    $scope.$broadcast('rebuild:me');
  });

  $scope.getFormattedDistance = function (distance) {
    $scope.$broadcast('rebuild:me');
    return distance < 1000 ? distance + 'm' : distance / 1000 + 'km';
  };
}]);
usersModule.factory('getUsers', ['$http', function ($http) {
  var token = ACCESS_TOKEN;

  return {
    get: function get() {
      return $http({
        url: GOOGLE_IP + "users",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      });
    }
  };
}]);

// profile

var userProfileModule = angular.module('userProfile', ['ngScrollbar']);
userProfileModule.controller('userProfileController', ['$scope', 'getUserData', '$stateParams', function ($scope, getUserData, $stateParams) {

  getUserData.get($stateParams.id).then(function (result) {
    $scope.user = result.data;
    console.log($scope.user);
  }).then(function () {
    $scope.$broadcast('rebuild:me');
  });

  $scope.aboutBox = false;

  $scope.toggleAbout = function () {
    $scope.aboutBox = !$scope.aboutBox;
  };

  $scope.getAge = function (date) {
    var currentDate = new Date();

    var birthdayDate = new Date(date);

    return currentDate.getYear() - birthdayDate.getYear() - !!(currentDate.getMonth() - birthdayDate.getMonth());
  };
  $scope.lastSeenFormatted = function (date) {
    var MINUTE = 60 * 1000;
    var HOUR = MINUTE * 60;
    var DAY = HOUR * 24;
    var locale = "en-us";

    var currentDate = new Date();
    var lastSeenDate = new Date(date);
    var dif = new Date(currentDate - lastSeenDate);

    if (dif > DAY) {
      return lastSeenDate.toLocaleDateString(locale);
    } else if (dif > HOUR) {
      return (dif / HOUR).toFixed(0) + 'hours ego';
    } else if (dif > MINUTE) {
      return (dif / MINUTE).toFixed(0) + 'minutes ego';
    } else if (dif < MINUTE) {
      return (dif / 1000).toFixed(0) + 'seconds ego';
    }
  };
}]);
userProfileModule.factory('getUserData', ['$http', function ($http) {
  var token = ACCESS_TOKEN;

  return {
    get: function get(id) {
      return $http({
        url: GOOGLE_IP + "users/" + id,
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      });
    }
  };
}]);
// app.meetings

var meetingsModule = angular.module('meetings', []);
meetingsModule.controller('meetingsController', ['$scope', 'getMeetings', function ($scope, getMeetings) {
  getMeetings.get().then(function (response) {
    $scope.meetings = response.data;
  });
}]);
meetingsModule.factory('getMeetings', ['$http', function ($http) {
  var token = ACCESS_TOKEN;

  return {
    get: function get() {
      return $http({
        url: GOOGLE_IP + "meetings",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      });
    }
  };
}]);

// app.events

var eventsModule = angular.module('events', []);
var eventsModule = angular.module('events', []);
eventsModule.controller('eventsController', ['$scope', 'getEvents', function ($scope, getEvents) {
  getEvents.get().then(function (response) {
    $scope.events = response.data;
  });
}]);
eventsModule.factory('getEvents', ['$http', function ($http) {
  var token = ACCESS_TOKEN;

  return {
    get: function get() {
      return $http({
        url: GOOGLE_IP + "events",
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      });
    }
  };
}]);

// refactoring

/*function setNormalHeight() {
  var windowHeight, headerHeight, footerHeight;
  var header, footer, content;

  console.log("draw");

  header = document.getElementsByClassName('menu__header')[0];
  footer = document.getElementsByClassName('menu__footer')[0];
  content = document.getElementsByClassName('menu__navigation')[0];

  windowHeight = window.innerHeight;

  if (header) {
    headerHeight = header.clientHeight;
  }

  if (footer) {
    footerHeight = footer.clientHeight;
  }

  if (content){
    content.style.height = windowHeight - headerHeight - footerHeight + "px";
  }




  //console.log(windowHeight+" "+headerHeight+" "+ footerHeight+" ");
}*/

/*window.addEventListener("resize", setNormalHeight);
window.addEventListener("load", setNormalHeight);*/

/*app.factory('blendImage', function () {

 function createMarker(width, height, radius) {

 var canvas, context;

 canvas = document.createElement("canvas");
 canvas.width = width;
 canvas.height = height;

 context = canvas.getContext("2d");

 context.clearRect(0, 0, width, height);

 context.fillStyle = "rgba(255,255,0,1)";

 context.strokeStyle = "rgba(0,0,0,1)";

 context.beginPath();
 context.moveTo(radius, 0);
 context.lineTo(width - radius, 0);
 context.quadraticCurveTo(width, 0, width, radius);
 context.lineTo(width, height - radius);
 context.quadraticCurveTo(width, height, width - radius, height);
 context.lineTo(radius, height);
 context.quadraticCurveTo(0, height, 0, height - radius);
 context.lineTo(0, radius);
 context.quadraticCurveTo(0, 0, radius, 0);
 context.closePath();


 var img1 = new Image();
 img1.src = 'img/pin.png';
 img1.onload = function () {
 context.drawImage(img1, 0, 0, 25, 25);
 context.drawImage(img2, 0, 0, 25, 25);

 };

 var img2 = new Image();
 img2.src = 'img/cluster.png';
 img2.onload = function () {
 context.drawImage(img2, 0, 0, 25, 25);
 context.drawImage(img1, 0, 0, 25, 25);
 };

 context.fill();
 context.stroke();

 return canvas.toDataURL();

 }

 return {get: createMarker(25, 25, 5)}

 });*/