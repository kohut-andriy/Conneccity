'use strict';

var GOOGLE_IP = "http://10.5.6.14:8080/";
var ACCESS_TOKEN = "1cd94d53-c6a1-4cfa-9e80-863d899fcd9e";

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
    'events'
  ]);