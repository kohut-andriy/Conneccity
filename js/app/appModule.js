'use strict';

var GOOGLE_IP = "http://169.254.119.203:8080/";
var ACCESS_TOKEN = "a88079ca-7f51-4b56-b709-1480ee1ac5f0";

var app = angular.module('conneccityApp',
  [
    'ngResource',
    'ui.router',
    'signIn',
    'signUp',
    'menu',
    'conneccityMap'
  ]);