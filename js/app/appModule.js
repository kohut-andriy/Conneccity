'use strict';

var GOOGLE_IP = "http://192.168.1.102:8080/";
var ACCESS_TOKEN = "bc0178c1-f7fe-424c-a090-34a65b1493ae";

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