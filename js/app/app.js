



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

app.controller('mapController', ['$scope', '$http', '$window', function ($scope, $http, $window) {


}]);


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







