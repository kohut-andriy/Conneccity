'use strict';

var GOOGLE_IP = "http://169.254.119.203:8080/";
var ACCESS_TOKEN = "04050fbe-575c-416a-8e8b-6d16c4403451";

var app = angular.module('conneccityApp',
  [
    'ngResource',
    'ui.router',
    'signIn',
    'signUp',
    'menu',
    'conneccityMap'
  ]);