'use strict';
var GOOGLE_IP = "http://10.5.6.33:8080";
var ACCESS_TOKEN = "800ca3b3-c9d5-4b77-9b79-029707798e1c";
var app = angular.module('conneccityApp', ['ngRoute', 'ngResource']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
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
        })

}]);

app.controller('meetingController', function ($scope, $http, $routeParams) {
    $http.get(GOOGLE_IP + "/meetings/" + $routeParams.meetingId, {
        headers: {
            "Authorization": "Bearer " + ACCESS_TOKEN
        }
    }).then(function (data) {
        console.log(data);
    });
    $scope.id = $routeParams.meetingId;
});

app.controller('eventController', function ($scope, $http, $routeParams) {
    $http.get(GOOGLE_IP + "/events/" + $routeParams.eventId, {
        headers: {
            "Authorization": "Bearer " + ACCESS_TOKEN
        }
    }).then(function (data) {
        console.log(data);
    });
    $scope.id = $routeParams.eventId;

});
app.controller('userController', function ($scope, $http, $routeParams) {
    $http.get(GOOGLE_IP + "/users/" + $routeParams.userId, {
        headers: {
            "Authorization": "Bearer " + ACCESS_TOKEN
        }
    }).then(function (data) {
        console.log(data);
    });
    $scope.id = $routeParams.userId;

});

app.controller('mapController', function ($scope, $http, $window) {


});

app.directive('ngMap', function () {
    return {
        templateUrl: "views/map.html",
        controller: "mapCreateController"
    }
});

app.controller('mapCreateController', function ($scope, $window, $http, $location) {

    var map = new google.maps.Map(document.getElementById('map'), {
        center: {
            lat: 0,
            lng: 0
        },
        zoom: 1
    });

    var clusterStyling = [{
      url: "img/cluster.png",
        height: 28,
        width: 28
    }];
    var mc = new MarkerClusterer(map,[], { gridSize: 50, zoomOnClick: false, styles: clusterStyling});

    var req = {
        method: "GET", url: GOOGLE_IP + "/map",
        headers: {
            "Authorization": "Bearer " + ACCESS_TOKEN,
            "Content-Type": "application/json"
        }
    };
    $scope.data = [{latitude: 45, longitude: 45},{latitude: 45, longitude: 45},{latitude: 44, longitude: 45}];

   /* $http(req).success(({events, meetings, users}) => {

        $scope.data = $scope.data.concat(events, meetings, users);*/
        for (var el in $scope.data) {
            if ($scope.data[el]) {
                console.log($scope.data[el].latitude + " " + $scope.data[el].longitude);
                var marker = new google.maps.Marker({
                    //map: map,
                    id: $scope.data[el].id,
                    position: {lat: $scope.data[el].latitude, lng: $scope.data[el].longitude},
                    icon: {url: "img/pin.png", scaledSize: new google.maps.Size(20, 16)}
                                   });
                
                let currentElem = $scope.data[el];

                marker.addListener('click', function () {
                    $scope.$apply(function () {
                        $location.path($location.path() + (currentElem.surname ? '/users' : currentElem.member ? '/meetings' : '/events') + "/" + currentElem.id);
                    });
                });

                mc.addMarker(marker);

            }
        }

    //});

    google.maps.event.addListener(mc,'clusterclick',
        function(cluster){
            console.log(cluster.getMarkers());
        });


});


app.controller('signupController', function ($scope, $http) {

    $scope.data = {
        "email": "1234@gmail.com",
        "name": "kogut",
        "surname": "andrey",
        "dateBirthday": "1997-12-20",//+(new Date()),
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

});


app.controller('signInController', function ($scope, $resource, $http, $httpParamSerializer) {

    $scope.data =
    {
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

});

