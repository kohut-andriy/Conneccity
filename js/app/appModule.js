'use strict';

var GOOGLE_IP = "http://10.5.6.14:8080/";
var ACCESS_TOKEN = "e2f32444-a9ab-4df3-9e00-3738dcbe8087";

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
    'dataFormatter'
  ]);