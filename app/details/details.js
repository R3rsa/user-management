angular.module('userMang.details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:id', {
    templateUrl: 'details/details.html',
    controller: 'detailsCtrl'
  });
}])

.controller('detailsCtrl', ['users','$scope','$routeParams', function(users, $scope, $routeParams) {
  var userId = $routeParams.id;

  users.then(function(data) {
    $scope.user = data.find(function(user) {
      return user.id == userId;
    });
  });
}]);