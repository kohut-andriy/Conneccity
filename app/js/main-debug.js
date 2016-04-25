// main app

'use strict';

var GOOGLE_IP = "http://169.254.119.203:8080/";
var ACCESS_TOKEN = "f899930b-2aa2-4f85-a7c3-12680559ae4b";

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
      '': { templateUrl: 'views/app.html' },
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
mapModule.controller('mapCreateController', ['$scope', '$http', '$location', 'mapCreate', 'getMapInfo', function ($scope, $http, $location, mapCreate, getMapInfo) {

  /*getMapInfo.get().then(function (data) {
    console.log(data.data);
    mapCreate.setData(data.data,"img/pin.png");
  });*/

  $scope.data = [{ latitude: 45.3, longitude: 45, id: 2 }, { latitude: 45.7, longitude: 45, id: 3 }, { latitude: 45, longitude: 45, id: 5 }];
  mapCreate.setData($scope.data);
  /*getMapInfo.getInfo(function (data) {
    mapCreate.setData(data,"img/pin.png");
  });*
  /*  google.maps.event.addListenerOnce(mapCreate.map, 'idle', function(){
  var marker = new google.maps.Marker({
    /!*  id: data[markerInfo].id,*!/
    position: new google.maps.LatLng(45, 45),
    icon: {url: "img/pin.png", size: new google.maps.Size(50, 50)}
    /!* data: data[markerInfo]*!/
  });
  console.log("adding");
  marker.setMap(mapCreate.map);
  });*/

  /* var map = new google.maps.Map(document.getElementById('map'), {
     center: {
       lat: 45,
       lng: 45
     },
     zoom: 8,
     disableDefaultUI: true,
     minZoom: 2
   });
  
   var clusterStyling = [{
     url: "img/cluster.png",
     height: 28,
     width: 28
   }];
   var mc = new MarkerClusterer(map, [], {gridSize: 50, zoomOnClick: false, styles: clusterStyling});
  
   var req = {
     method: "GET", url: GOOGLE_IP + "/map",
     headers: {
       "Authorization": "Bearer " + ACCESS_TOKEN,
       "Content-Type": "application/json"
     }
   };
  
  
   $scope.data = /!*[];*!/[{latitude: 35, longitude: 45}, {latitude: 45, longitude: 45}, {latitude: 44, longitude: 45}];
  
   /!*$http(req).success(({events, meetings, users}) => {
  
    $scope.data = $scope.data.concat(events, meetings, users);*!/
  
   for (let el in $scope.data) {
     if ($scope.data[el]) {
       console.log($scope.data[el].latitude + " " + $scope.data[el].longitude);
  
  
       let canvas, context;
  
       canvas = document.createElement("canvas");
  
       context = canvas.getContext("2d");
  
       let img1 = new Image();
       img1.src = 'img/pin.png';
       img1.onload = function () {
         context.drawImage(img1, 0, 0, 25, 25);
         //  context.drawImage(img2, 0, 0, 25, 25);
  
  
       };
  
       let img2 = new Image();
       img2.src = 'img/cluster.png';
       img2.onload = function () {
         context.drawImage(img2, 0, 0, 25, 25);
         context.drawImage(img1, 0, 0, 25, 25);
         let marker = new google.maps.Marker({
           map: map,
           id: $scope.data[el].id,
           position: {lat: $scope.data[el].latitude, lng: $scope.data[el].longitude},
           icon: {url: canvas.toDataURL(), size: new google.maps.Size(25, 25)}//,
           // data: $scope.data[el]
         });
  
         marker.addListener('click', function () {
  
           $scope.$apply(function () {
             alert($scope.data[2].longitude);
             //$location.path($location.path() + (currentElem.surname ? '/users' : currentElem.member ? '/meetings' : '/events') + "/" + currentElem.id);
           });
         });
  
  
       };
  
       /!* let currentElem = $scope.data[el];
  
        marker.addListener('click', function () {
        $scope.$apply(function () {
        $location.path($location.path() + (currentElem.surname ? '/users' : currentElem.member ? '/meetings' : '/events') + "/" + currentElem.id);
        });
        });
  
        mc.addMarker(marker);
        *!/
  
  
     }
   }
  
   // });
  
   google.maps.event.addListener(mc, 'clusterclick',
     function (cluster) {
       console.log(cluster.getMarkers());
     });
  */
}]);
mapModule.service('mapCreate', ['markerFactory', function (markerFactory) {
  var self = this;

  self.map = self.map = new google.maps.Map(document.getElementById('map'), {
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

  self.setData = function (data) {
    //{ events: e = [], meetings: m = [], users: u = []}) {
    console.log("data set");
    //var data = [].concat(e,m,u);
    /*  self.all = data;
     self.meetings = m;
     self.events = e;
     self.users = u;*/
    console.log(data);
    self.setMarkers(data);
  };

  self.setMarkers = function (data) {

    for (var markerInfo in data) {
      markerFactory.get("img/pin.png", "img/cluster.png", data[markerInfo], self.map);
    }
  };

  /*  this.setMarkers = function () {
   for(let markerInfo in this.data) {
       }
   }*/
}]);

mapModule.factory('markerFactory', ['$state', function ($state) {

  var createMarker = function createMarker(img, data, map) {
    console.log("creting");
    var marker = new google.maps.Marker({
      map: map,
      // id: data.id,
      position: new google.maps.LatLng(data.latitude, data.longitude),
      icon: { url: img, size: new google.maps.Size(25, 25) }
      // data: data
    });

    marker.addListener('click', function () {
      $state.go('app.map', { id: data.id });
    });
  };

  var drawIcon = function drawIcon(img, bg, data, map) {

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

        createMarker(canvas.toDataURL(), data, map);
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
    get: drawIcon
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

// refactoring

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