'use strict';

angular.module('userMang.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    templateUrl: '/list.html',
    controller: 'ListCtrl'
  });
}])

.controller('ListCtrl', ['$http','$scope', '$location', function($http, $location, $scope) {
  $http.get('https://reqres.in/api/users')
    .success(function(data) {
      $scope.users = data;
    }).error(function(err) {
      return err;
    });
  $scope.viewDetails = function(userId) {
    $location.path('/details/' + userId);
  }
}]);