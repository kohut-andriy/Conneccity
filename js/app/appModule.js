'use strict';

var GOOGLE_IP = "http://192.168.1.102:8080/";
var ACCESS_TOKEN = "c31a865a-d393-4fcc-828c-e2a1421088df";

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