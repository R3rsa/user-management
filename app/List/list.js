'use strict';

angular.module('userMang.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    controller: 'ListCtrl',
    templateUrl: 'List/list.html'
  });
}])

.controller('ListCtrl', ['users','$scope', '$location', function(users,$scope, $location) {


  users.then(function(response) {
    $scope.userList= response.data;
    console.log($scope.userList);
  });
  $scope.viewDetails = function(userId) {
    $location.path('/details/' + userId);
  }
}]);