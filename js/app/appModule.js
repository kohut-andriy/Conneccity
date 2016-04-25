'use strict';

var GOOGLE_IP = "http://169.254.119.203:8080/";
var ACCESS_TOKEN = "f899930b-2aa2-4f85-a7c3-12680559ae4b";

var app = angular.module('conneccityApp',
  [
    'ngResource',
    'ui.router',
    'signIn',
    'signUp',
    'menu',
    'conneccityMap'
  ]);