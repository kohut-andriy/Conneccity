// main app

'use strict';

var GOOGLE_IP = "http://169.254.119.203:8080/";
var ACCESS_TOKEN = "a88079ca-7f51-4b56-b709-1480ee1ac5f0";

var app = angular.module('conneccityApp', ['ngResource', 'ui.router', 'signIn', 'signUp', 'menu', 'conneccityMap']);
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
        controller: function controller() {
          /*setNormalHeight();
          console.log('hello');
          window.addEventListener("resize", setNormalHeight);
          window.addEventListener("load", setNormalHeight);*/
        }
      },
      'content@app': {
        template: '<conneccity-map></conneccity-map>'
      }
    }
  }).state('app.map', {
    url: "map/:id",
    views: {
      "content": {
        template: '<p>wp</p>'
      }
    }
  });

  $urlRouterProvider.otherwise("/");
  /*$routeProvider
   .when("/signin", {
   templateUrl: 'views/sign.html',
   controller: 'signInController'
   })
   .when("/signup", {
   templateUrl: 'views/signup.html',
   controller: 'signupController'
   })
   .when("/map", {
   templateUrl: "views/mappage.html",
   controller: "mapController"
   })
   .when("/map/users/:userId", {
   templateUrl: "views/user.html",
   controller: "userController"
   })
   .when("/map/events/:eventId", {
   templateUrl: "views/event.html",
   controller: "eventController"
   })
   .when("/map/meetings/:meetingId", {
   templateUrl: "views/meeting.html",
   controller: "meetingController"
   })*/
  /*  $locationProvider.html5Mode(true).hashPrefix('!');*/
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
    url: GOOGLE_IP + "/oauth/token",
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
    url: GOOGLE_IP + "/signup",
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
mapModule.controller('mapCreateController', ['mapCreate', 'getMapInfo', function (mapCreate, getMapInfo) {

  // online

  /*  getMapInfo.get().then(function (data) {
      console.log(data.data);
      mapCreate.setData(data.data);
    });
    */
  // offline
  /* var data = [{latitude: 45.3, longitude: 45, id: 2}, {latitude: 45.7, longitude: 45, id:3}, {latitude: 45, longitude: 45, id:5}];
    mapCreate.setData(data);*/

}]);
mapModule.service('mapCreate', ['markerFactory', function (markerFactory) {
  var self = this;

  self.map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 45,
      lng: 45
    },
    zoom: 8,
    disableDefaultUI: true,
    minZoom: 2
  });

  self.markerCluster = new MarkerClusterer(self.map, [], {
    gridSize: 50, zoomOnClick: false, styles: [{
      url: "img/cluster.png",
      height: 28,
      width: 28
    }]
  });

  self.setData = function (_ref) {
    var _ref$events = _ref.events;
    var e = _ref$events === undefined ? [] : _ref$events;
    var _ref$meetings = _ref.meetings;
    var m = _ref$meetings === undefined ? [] : _ref$meetings;
    var _ref$users = _ref.users;
    var u = _ref$users === undefined ? [] : _ref$users;
    //(data) {
    console.log("data set");
    var data = [].concat(e, m, u);
    self.all = data;
    self.meetings = m;
    self.events = e;
    self.users = u;
    console.log(data);
    self.setMarkers(data);
  };

  self.setMarkers = function (data) {

    for (var markerInfo in data) {
      markerFactory.get("img/pin.png", "img/cluster.png", data[markerInfo], self.markerCluster);
    }
  };
}]);

mapModule.factory('markerFactory', ['$state', function ($state) {

  var createMarker = function createMarker(img, data, cluster) {
    console.log("creting");
    var marker = new google.maps.Marker({
      id: data.id,
      position: new google.maps.LatLng(data.latitude, data.longitude),
      icon: { url: img, size: new google.maps.Size(25, 25) },
      data: data
    });

    marker.addListener('click', function () {
      $state.go('app.map', { id: data.id });
    });
    cluster.addMarker(marker);
  };

  var generateMarker = function generateMarker(img, bg, data, cluster) {

    var canvas = void 0;
    var context = void 0;
    var instance = 0;

    canvas = document.createElement("canvas");

    context = canvas.getContext("2d");

    function draw() {

      instance++;

      if (instance == 2) {

        context.drawImage(img2, 0, 0, 25, 25);
        context.drawImage(img1, 0, 0, 25, 25);

        createMarker(canvas.toDataURL(), data, cluster);
      }
    }

    var img1 = new Image();
    img1.src = img;
    img1.onload = draw;

    var img2 = new Image();
    img2.src = bg;
    img2.onload = draw;
  };

  return {
    get: generateMarker
  };
}]);

mapModule.factory('getMapInfo', ['$resource', '$http', function ($resource, $http) {
  var token = ACCESS_TOKEN;

  return {
    get: function get() {
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
  };

  /*return $resource(GOOGLE_IP + "map", {} , {
   getInfo : {
   method: "GET",
   params: {},
   headers: {
   "Authorization": "Bearer " + token,
   "Content-Type": "application/json"
   }
   }
   });*/
}]);

// map.controls

var controlsModule = angular.module('conneccityMapControls', ['markerFactory']);

// map.controls.resize

// map.controls.filer

// map.controls.mapCurrentPosition

// map.controls.Cards

// map.controls.cards.user

// map.controls.cards.event

// map.controls.cards.meeting

// refactoring

function setNormalHeight() {
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

  if (content) {
    content.style.height = windowHeight - headerHeight - footerHeight + "px";
  }

  //console.log(windowHeight+" "+headerHeight+" "+ footerHeight+" ");
}

window.load = function () {

  jQuery('#customScrollBar').nanoScroller();
  console.log('scr');
};

/*window.addEventListener("resize", setNormalHeight);
window.addEventListener("load", setNormalHeight);*/

app.controller('meetingController', ['$scope', '$http', "$routeParams", function ($scope, $http, $routeParams) {
  $http.get(GOOGLE_IP + "/meetings/" + $routeParams.meetingId, {
    headers: {
      "Authorization": "Bearer " + ACCESS_TOKEN
    }
  }).then(function (data) {
    console.log(data);
  });
  $scope.id = $routeParams.meetingId;
}]);

app.controller('eventController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  $http.get(GOOGLE_IP + "/events/" + $routeParams.eventId, {
    headers: {
      "Authorization": "Bearer " + ACCESS_TOKEN
    }
  }).then(function (data) {
    console.log(data);
  });
  $scope.id = $routeParams.eventId;
}]);
app.controller('userController', ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
  $http.get(GOOGLE_IP + "/users/" + $routeParams.userId, {
    headers: {
      "Authorization": "Bearer " + ACCESS_TOKEN
    }
  }).then(function (data) {
    console.log(data);
  });
  $scope.id = $routeParams.userId;
}]);

app.controller('mapController', ['$scope', '$http', '$window', function ($scope, $http, $window) {}]);

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