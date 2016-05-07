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
          controller: 'appController'
        },
        'content@app' : {
          template: '<conneccity-map class="map"></conneccity-map>'
        }
      }
    })
    .state('app.users',{
      url: 'users/',
      views: {
        'content@app' : {
          templateUrl: 'views/users.html',
          controller: 'usersController'
        }
      }
    })
    .state('app.users.id',{
      url: '{id:int}',
      views: {
        'content@app' : {
          template: '<p>user id</p>'
        }
      }
    })
    .state('app.events',{
      url: 'events/',
      views: {
        'content@app' : {
          templateUrl: 'views/events.html',
          controller: 'eventsController'
        }
      }
    })
    .state('app.events.id',{
      url: ':id',
      views: {
        'content@app' : {
          template: '<p>event id</p>'
        }
      }
    })
    .state('app.meetings',{
      url: 'meetings/',
      views: {
        'content@app' : {
          templateUrl: 'views/meetings.html',
          controller: 'meetingsController'
        }
      }
    })
    .state('app.meetings.id',{
      url: ':id',
      views: {
        'content@app' : {
          template: '<p>meeting id</p>'
        }
      }
    })
    .state('app.map',{
      url: "map/:id",
      views : {
        "content" : {
          template: '<map-filter></map-filter>',
          link: function(scope) {
            console.log('cont');

            scope.filterState = false;

            scope.toggleState = function () {
              scope.filterState = !scope.filterState;
            };
          }
        }
      }
    })
    .state('card',{
      url: "/card",
      templateUrl: "views/mapCard.html"
    });

  $urlRouterProvider.otherwise("/");


}]);