mapModule.service('mapCreate', ['markerFactory', function (markerFactory) {
  var self = this;

  self.map =
    self.map = new google.maps.Map(document.getElementById('map'), {
      center: {
        lat: 45,
        lng: 45
      },
      zoom: 8,
      disableDefaultUI: true,
      minZoom: 2
    });


  self.markerCluster = new MarkerClusterer(self.map, [],
    {
      gridSize: 50, zoomOnClick: false, styles: [{
      url: "img/cluster.png",
      height: 28,
      width: 28
    }]
    });

  self.setData = function (data) {//{ events: e = [], meetings: m = [], users: u = []}) {
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

mapModule.factory('markerFactory', ['$state',function ($state) {


  var createMarker = function (img, data, map) {
    console.log("creting");
    let marker = new google.maps.Marker({
      map: map,
      // id: data.id,
      position: new google.maps.LatLng(data.latitude, data.longitude),
      icon: {url: img, size: new google.maps.Size(25, 25)}
      // data: data
    });

    marker.addListener('click', function () {
        $state.go('app.map',{ id : data.id});
      });

  };

  var drawIcon = function (img, bg, data, map) {

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

        createMarker(canvas.toDataURL(), data, map);
      }
    }

    let img1 = new Image();
    img1.src = img;
    img1.onload = draw;

    let img2 = new Image();
    img2.src = bg;
    img2.onload = draw;

  };


  return {
    get: drawIcon
  }
}]);


mapModule.factory('getMapInfo', ['$resource', '$http', function ($resource, $http) {
  var token = ACCESS_TOKEN;

  return {
    get: function () {
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