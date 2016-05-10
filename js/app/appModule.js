'use strict';

var GOOGLE_IP = "http://10.5.6.14:8080/";
var ACCESS_TOKEN = "85978db6-246b-4c54-862e-c9b6badfec4d";

var app = angular.module('conneccityApp',
  [
    'ngScrollbar',
    'ngResource',
    'ui.router',
    'signIn',
    'signUp',
    'menu',
    'conneccityMap',
    'users',
    'userProfile',
    'meetings',
    'events'
  ]);