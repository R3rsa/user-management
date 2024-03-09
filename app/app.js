

// Declare app level module which depends on views, and core components
var app = angular.module('userMang', [
  'ngRoute',
  'userMang.list',
  'userMang.details',
  'userMang.create',
  'userMang.version'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('');

  $routeProvider.otherwise({redirectTo: '/list'});
}]).
controller('MainCtrl', ['$scope','$location', function($scope, $location) {
  this.redirectToCreate = function() {
    $location.path('/create');
  };

  this.redirectHome = function() {
    $location.path('/list');
  }

  this.showBackButton = function() {
    // Check if the current path is the edit page
    return $location.path().startsWith('/details');
  };

  this.hideCreateButton = function() {
    return $location.path().startsWith('/create');
  }

  this.goBack = function() {
    // Go back in history
    window.history.back();
  };

}]);
