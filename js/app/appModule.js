'use strict';

var GOOGLE_IP = "http://10.5.6.14:8080/";
var ACCESS_TOKEN = "1c3fabde-2212-45ef-bedd-31f9f7dc219c";

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
    'meetings',
    'events'
  ]);