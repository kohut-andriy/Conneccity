// main app

'use strict';

var GOOGLE_IP = "http://169.254.119.203:8080/";
var ACCESS_TOKEN = "04050fbe-575c-416a-8e8b-6d16c4403451";

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
    url: "/",
    templateUrl: "views/app.html"
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
menuModule.directive('navigationMenu', function () {
  return {
    templateUrl: 'views/menu.html',
    controller: 'menuController'
  };
});
menuModule.controller('menuController', [function () {}]);

// map
var mapModule = angular.module('conneccityMap', ['ngResource', 'ui.router']);
mapModule.directive('conneccityMap', function () {
  return {
    templateUrl: "views/map.html",
    controller: "mapCreateController"
  };
});
mapModule.controller('mapCreateController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

  var map = new google.maps.Map(document.getElementById('map'), {
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
  var mc = new MarkerClusterer(map, [], { gridSize: 50, zoomOnClick: false, styles: clusterStyling });

  var req = {
    method: "GET", url: GOOGLE_IP + "/map",
    headers: {
      "Authorization": "Bearer " + ACCESS_TOKEN,
      "Content-Type": "application/json"
    }
  };

  $scope.data = /*[];*/[{ latitude: 35, longitude: 45 }, { latitude: 45, longitude: 45 }, { latitude: 44, longitude: 45 }];

  /*$http(req).success(({events, meetings, users}) => {
       $scope.data = $scope.data.concat(events, meetings, users);*/

  var _loop = function _loop(el) {
    if ($scope.data[el]) {
      (function () {
        console.log($scope.data[el].latitude + " " + $scope.data[el].longitude);

        var canvas = void 0,
            context = void 0;

        canvas = document.createElement("canvas");

        context = canvas.getContext("2d");

        var img1 = new Image();
        img1.src = 'img/pin.png';
        img1.onload = function () {
          context.drawImage(img1, 0, 0, 25, 25);
          //  context.drawImage(img2, 0, 0, 25, 25);
        };

        var img2 = new Image();
        img2.src = 'img/cluster.png';
        img2.onload = function () {
          context.drawImage(img2, 0, 0, 25, 25);
          context.drawImage(img1, 0, 0, 25, 25);
          var marker = new google.maps.Marker({
            map: map,
            id: $scope.data[el].id,
            position: { lat: $scope.data[el].latitude, lng: $scope.data[el].longitude },
            icon: { url: canvas.toDataURL(), size: new google.maps.Size(25, 25) } //,
            // data: $scope.data[el]
          });

          marker.addListener('click', function () {

            $scope.$apply(function () {
              alert($scope.data[2].longitude);
              //$location.path($location.path() + (currentElem.surname ? '/users' : currentElem.member ? '/meetings' : '/events') + "/" + currentElem.id);
            });
          });
        };

        /* let currentElem = $scope.data[el];
             marker.addListener('click', function () {
         $scope.$apply(function () {
         $location.path($location.path() + (currentElem.surname ? '/users' : currentElem.member ? '/meetings' : '/events') + "/" + currentElem.id);
         });
         });
             mc.addMarker(marker);
         */
      })();
    }
  };

  for (var el in $scope.data) {
    _loop(el);
  }

  // });

  google.maps.event.addListener(mc, 'clusterclick', function (cluster) {
    console.log(cluster.getMarkers());
  });
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