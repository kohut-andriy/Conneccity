mapModule.controller('mapCreateController', ['$scope', '$http', '$location','mapCreate','getMapInfo', function ($scope, $http, $location,mapCreate,getMapInfo) {


  /*getMapInfo.get().then(function (data) {
    console.log(data.data);
    mapCreate.setData(data.data,"img/pin.png");
  });*/

  $scope.data = [{latitude: 45.3, longitude: 45, id: 2}, {latitude: 45.7, longitude: 45, id:3}, {latitude: 45, longitude: 45, id:5}];
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