'use strict';

angular.module('userMang.details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:id', {
    templateUrl: 'details/details.html',
    controller: 'detailsCtrl'
  });
}])

.controller('detailsCtrl', ['$scope','$http','$routeParams', function($http, $routeParams, $scope) {
  var userId = $routeParams.id;
  $http.get('https://reqres.in/api/users/' + userId)
    .success(function(data) {
      $scope.user = data;
    }).error(function(err) {
      return err;
    });
    }]);