angular.module('userMang.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    controller: 'ListCtrl',
    templateUrl: 'list/list.html'
  });
}])

.controller('ListCtrl', ['users','$scope', '$location', function(users, $scope, $location) {


  users.then(function(response) {
    $scope.userList= response.data;
  });
  $scope.viewDetails = function(userId) {
    $location.path('/details/' + userId);
  }
  $scope.redirectToCreate = function() {
    $location.path('/create');
  }
}]);