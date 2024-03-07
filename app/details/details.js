angular.module('userMang.details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:id', {
    templateUrl: 'details/details.html',
    controller: 'detailsCtrl'
  });
}])

.controller('detailsCtrl', ['users','$scope','$routeParams', function(users, $scope, $routeParams) {
  var userId = $routeParams.id;
  console.log('userId', userId);

  users.then(function(response) {
    $scope.user = response.data[userId - 1];
    console.log($scope.user);
  });
}]);