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
  $stateProvider
  .state('authorization', {
    url: '/signIn',
    templateUrl: 'views/signin.html',
    controller: 'SignInController',
  })
  .state('registration', {
    url: '/signUp',
    templateUrl: 'views/signup.html',
    controller: 'SignUpController',
  })
  .state('app', {
    url: '/',
    views: {
      '': {
        templateUrl: 'views/app.html',
        controller: 'AppController',
      },
      'content@app': {
        templateUrl: 'views/map.html',
      },
    },
  })
  .state('app.profile', {
    url: 'profile',
    views: {
      'content@app': {
        templateUrl: 'views/userProfile.html',
        controller: 'SignedUserProfileController',
      },
    },
  })
  .state('app.users', {
    url: 'users',
    views: {
      'content@app': {
        templateUrl: 'views/users.html',
        controller: 'UsersController',
      },
    },
  })
  .state('app.users.id', {
    url: '/{id:int}',
    views: {
      'content@app': {
        templateUrl: 'views/userProfile.html',
        controller: 'UserProfileController',
      },
    },
  })
  .state('app.events', {
    url: 'events',
    views: {
      'content@app': {
        templateUrl: 'views/events.html',
        controller: 'EventsController',
      },
    },
  })
  .state('app.eventCreate', {
    url: 'createevent',
    views: {
      'content@app': {
        templateUrl: 'views/createEvent.html',
        controller: 'CreateEventController',
      },
    },
  })
  .state('app.eventEdit', {
    url: '{{id:int}/eventedit}',
    views: {
      'content@app': {
        templateUrl: 'views/createEvent.html',
        controller: 'CreateEventController',
      },
    },
  })
  .state('app.events.id', {
    url: '/{id:int}',
    views: {
      'content@app': {
        templateUrl: 'views/eventProfile.html',
        controller: 'EventProfileController',
      },
    },
  })
  .state('app.meetings', {
    url: 'meetings',
    views: {
      'content@app': {
        templateUrl: 'views/meetings.html',
        controller: 'MeetingsController',
      },
    },
  })
  .state('app.meetingCreate', {
    url: 'create-meeting',
    views: {
      'content@app': {
        templateUrl: 'views/createMeeting.html',
        controller: 'CreateMeetingController',
      },
    },
  })
  .state('app.meetingEdit', {
    url: '{{id:int}/meeting-edit}',
    views: {
      'content@app': {
        templateUrl: 'views/createMeeting.html',
        controller: 'CreateMeetingController',
      },
    },
  })
  .state('app.meetings.id', {
    url: '/{id:int}',
    views: {
      'content@app': {
        templateUrl: 'views/meetingProfile.html',
        controller: 'MeetingProfileController',
      },
    },
  })
  .state('app.chat', {
    url: 'chat',
    views: {
      'content@app': {
        templateUrl: 'views/chatList.html',
        controller: 'ChatListController',
      },
    },
  })
  .state('app.chat.id', {
    url: '/{id:int}',
    views: {
      'chat@app.chat': {
        templateUrl: 'views/chat.html',
        controller: 'ChatController',
      },
    },
  });

  $urlRouterProvider.otherwise('/');

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
}
