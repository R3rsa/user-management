angular.module('userMang.create', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create', {
    templateUrl: 'create/create.html',
    controller: 'CreateCtrl'
  });
}])

.controller('CreateCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
  $scope.createUser = function() {
    var userData = {
      first_name: $scope.first_name,
      last_name: $scope.last_name,
      email: $scope.email
    };
    console.log(userData);
    $http.post('https://reqres.in/api/users', userData)
      .then(function() {
        console.log('User created successfully');
        // Redirect to list page after successful creation
        $location.path('/list');
      }, function(error) {
        console.log(error);
      });
  };
}]);
