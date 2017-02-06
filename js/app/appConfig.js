angular
  .module('conneccityApp')
  .config(appConfig);

appConfig.$inject = [
  '$stateProvider',
  '$urlRouterProvider',
  'OAuthProvider',
  'OAuthTokenProvider',
];

function appConfig($stateProvider, $urlRouterProvider, OAuthProvider, OAuthTokenProvider) {
  OAuthProvider.configure({
    baseUrl: GOOGLE_IP,
    clientId: 'clientapp',
    clientSecret: '123456',
    grantPath: '/oauth/token',
    revokePath: '/oauth/token',
  });

  OAuthTokenProvider.configure({
    name: 'token',
    options: {
      secure: false,
    },
  });

  $stateProvider
  .state('authorization', {
    url: '/signIn',
    templateUrl: 'views/signin.html',
    controller: 'SignInController',
    controllerAs: 'user',
  })
  .state('registration', {
    url: '/signUp',
    templateUrl: 'views/signup.html',
    controller: 'SignUpController',
    controllerAs: 'visitor',
  })
  .state('app', {
    url: '/',
    views: {
      '': {
        templateUrl: 'views/app.html',
        controller: 'AppController',
        controllerAs: 'app',
      },
      'content@app': {
        templateUrl: 'views/map.html',
        controller: 'MapCreateController',
        controllerAs: 'mapVm',
      },
    },
  })
  .state('app.profile', {
    url: 'profile',
    views: {
      'content@app': {
        templateUrl: 'views/userProfile.html',
        controller: 'SignedUserProfileController',
        controllerAs: 'userVm',
      },
    },
  })
  .state('app.users', {
    url: 'users',
    views: {
      'content@app': {
        templateUrl: 'views/users.html',
        controller: 'UsersController',
        controllerAs: 'userVm',
      },
    },
  })
  .state('app.users.id', {
    url: '/{id:int}',
    views: {
      'content@app': {
        templateUrl: 'views/userProfile.html',
        controller: 'UserProfileController',
        controllerAs: 'userVm',
      },
    },
  })
  .state('app.events', {
    url: 'events',
    views: {
      'content@app': {
        templateUrl: 'views/events.html',
        controller: 'EventsController',
        controllerAs: 'eventVm',
      },
    },
  })
  .state('app.eventCreate', {
    url: 'createevent',
    views: {
      'content@app': {
        templateUrl: 'views/createEvent.html',
        controller: 'CreateEventController',
        controllerAs: 'eventVm',
      },
    },
  })
  .state('app.eventEdit', {
    url: '{{id:int}/eventedit}',
    views: {
      'content@app': {
        templateUrl: 'views/createEvent.html',
        controller: 'CreateEventController',
        controllerAs: 'eventVm',
      },
    },
  })
  .state('app.events.id', {
    url: '/{id:int}',
    views: {
      'content@app': {
        templateUrl: 'views/eventProfile.html',
        controller: 'EventProfileController',
        controllerAs: 'eventVm',
      },
    },
  })
  .state('app.meetings', {
    url: 'meetings',
    views: {
      'content@app': {
        templateUrl: 'views/meetings.html',
        controller: 'MeetingsController',
        controllerAs: 'meetingVm',
      },
    },
  })
  .state('app.meetingCreate', {
    url: 'create-meeting',
    views: {
      'content@app': {
        templateUrl: 'views/createMeeting.html',
        controller: 'CreateMeetingController',
        controllerAs: 'meetingVm',
      },
    },
  })
  .state('app.meetingEdit', {
    url: '{{id:int}/meeting-edit}',
    views: {
      'content@app': {
        templateUrl: 'views/createMeeting.html',
        controller: 'CreateMeetingController',
        controllerAs: 'meetingVm',
      },
    },
  })
  .state('app.meetings.id', {
    url: '/{id:int}',
    views: {
      'content@app': {
        templateUrl: 'views/meetingProfile.html',
        controller: 'MeetingProfileController',
        controllerAs: 'meetingVm',
      },
    },
  })
  .state('app.chat', {
    url: 'chat',
    views: {
      'content@app': {
        templateUrl: 'views/chatList.html',
        controller: 'ChatListController',
        controllerAs: 'chatListVm',
      },
    },
  })
  .state('app.chat.id', {
    url: '/{id:int}',
    views: {
      'chat@app.chat': {
        templateUrl: 'views/chat.html',
        controller: 'ChatController',
        controllerAs: 'chatVm',
      },
    },
  });

  $urlRouterProvider.otherwise('/');
}
