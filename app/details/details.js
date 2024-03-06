'use strict';

angular.module('userMang.details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:id', {
    templateUrl: 'details/details.html',
    controller: 'detailsCtrl'
  });
}])

.controller('detailsCtrl', ['$scope','users','$routeParams', function(users, $routeParams, $scope) {
  var userId = $routeParams.id;
  users.then(function(data) {
    $scope.user = data[userId];
  })
    }]);