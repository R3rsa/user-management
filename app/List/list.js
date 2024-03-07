angular.module('userMang.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    controller: 'ListCtrl',
    templateUrl: 'list/list.html'
  });
}])

.controller('ListCtrl', ['users','$scope', '$location', function(users, $scope, $location) {
  
  // $scope.currentPage = 1;

  users.then(function(data) {
    $scope.userList = data;
  });

  
  //defining a function to pass the user id with the path to redirect to details page
  $scope.viewDetails = function(userId) {
    $location.path('/details/' + userId);
  }
  //defining a function to redirect to create page
  $scope.redirectToCreate = function() {
    $location.path('/create');
  }
}]);