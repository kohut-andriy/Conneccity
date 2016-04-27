app.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function ($stateProvider, $urlRouterProvider,$locationProvider) {
  
  $stateProvider
    .state('authorization', {
      url: "/signIn",
      templateUrl: "views/signin.html",
      controller: 'signInController'
    })
    .state('registration',{
      url: "/signUp",
      templateUrl: "views/signup.html",
      controller: 'signUpController'
    })
    .state('app',{
      url: '/',
      views: {
        '': {
          templateUrl: 'views/app.html',
          controller: function () {
            /*setNormalHeight();
            console.log('hello');
            window.addEventListener("resize", setNormalHeight);
            window.addEventListener("load", setNormalHeight);*/
          }
        },
        'content@app' : {
          template: '<conneccity-map></conneccity-map>'
        }
      }
    })
    .state('app.map',{
      url: "map/:id",
      views : {
        "content" : {
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