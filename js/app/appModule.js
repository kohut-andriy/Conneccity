'use strict';

var GOOGLE_IP = "http://10.5.6.22:8080/";
var ACCESS_TOKEN = "82c5eb84-f373-4885-a185-c67440f59760";

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