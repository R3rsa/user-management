'use strict';

// Declare app level module which depends on views, and core components
angular.module('userMang', [
  'ngRoute',
  'userMang.list',
  'userMang.details',
  'userMang.create',
  'userMang.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.otherwise({redirectTo: 'js/list/list.html'});
}]);
