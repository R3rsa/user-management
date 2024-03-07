angular.module('userMang.details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:id', {
    templateUrl: 'details/details.html',
    controller: 'detailsCtrl'
  });
}])

.controller('detailsCtrl', ['$scope','users','$routeParams', function(users, $scope, $routeParams) {
  var userId = $routeParams.id;
  console.log('userId', userId);
  users.then(function(data) {
    $scope.user = data[userId];
    console.log($scope.user);
  })
    }]);