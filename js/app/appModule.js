'use strict';

var GOOGLE_IP = "http://46.63.90.181:8080/";

var app = angular.module('conneccityApp',
  [
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
    'createMeeting'
  ]);

app.run(['$rootScope', '$state', 'OAuth', '$location', function ($rootScope, $state, OAuth, $location) {
  if (!OAuth.isAuthenticated() && $location.path() != '/signUp') {

    $location.path('/signIn');
  }

  var encoded = btoa("clientapp:123456");

  $rootScope.$on('oauth:error', function (event, rejection) {

    if ('invalid_grant' === rejection.data.error) {
      return;
    }

    if ('invalid_token' === rejection.data.error) {
      return OAuth.getRefreshToken({}, {
          headers: {
            "Authorization": "Basic " + encoded,
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
          }
        }
      ).then(function () {
        $state.reload();
      }, function () {
        /*  if($state.getName() != 'registration')
         console.log($state.getName());*/
        $state.go('authorization');
      });
    }

    $location.path('/signIn');
    return $location.path('/signIn');
  });

  $rootScope.$on("$locationChangeStart", function (event, next, current) {

    if (!OAuth.isAuthenticated() && ($location.path() != '/signUp')) {
      $location.path('/signIn');
    }
  });

}]);
