const GOOGLE_IP = 'http://93.77.133.213:8080/';

angular.module('conneccityApp', [
  'ngAnimate',
  'ngScrollbar',
  'ngResource',
  'ui.router',
  'signIn',
  'signUp',
  'conneccityMap',
  'users',
  'userProfile',
  'meetings',
  'events',
  'dataFormatter',
  'ngCookies',
  'angular-oauth2',
  'chatList',
  'chat',
  'eventProfile',
  'meetingProfile',
  'geolocation',
  'createMeeting',
  'createEvent',
  'websocket',
  'placePicker',
  'ponchPicker',
]).run(AppRun);

AppRun.$inject = ['$rootScope', '$state', 'OAuth', '$location'];

function AppRun($rootScope, $state, OAuth, $location) {
  if (!OAuth.isAuthenticated() && ($location.path() !== '/signUp')) {
    $location.path('/signIn');
  }

  const encoded = btoa('clientapp:123456');

  $rootScope.$on('oauth:error', (event, rejection) => {
    if (rejection.data.error === 'invalid_grant') {
      return;
    }

    if (rejection.data.error === 'invalid_token') {
      OAuth.getRefreshToken({}, {
        headers: {
          Authorization: `Basic ${encoded}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }).then(() => {
        $state.reload();
      }, () => {
        $state.go('authorization');
      });
    }

    $location.path('/signIn');
  });

  $rootScope.$on('$locationChangeStart', () => {
    if (!OAuth.isAuthenticated() && ($location.path() !== '/signUp')) {
      $location.path('/signIn');
    }
  });
}
