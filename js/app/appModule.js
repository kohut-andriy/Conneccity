'use strict';

var GOOGLE_IP = "http://192.168.1.102:8080/";

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
    'chat'
  ]);

app.run(['$rootScope', '$state', 'OAuth', '$location', function ($rootScope, $state, OAuth, $location) {
   if( !OAuth.isAuthenticated() ) {
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
        $state.go('authorization');
      });
    }
    $location.path('/signIn');
    return $location.path('/signIn');
  });

  $rootScope.$on("$locationChangeStart", function (event, next, current) {
    if (!OAuth.isAuthenticated()) {
     $location.path('/signIn');
    }
  });

}]);