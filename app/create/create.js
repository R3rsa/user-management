angular.module('userMang.create', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create', {
    templateUrl: 'create/create.html',
    controller: 'CreateCtrl'
  });
}])

.controller('CreateCtrl', ['createUser','$scope', '$http', '$location', function(createUser, $scope, $http, $location) {
  $scope.createUser = function() {
    var userData = {
      first_name: $scope.first_name,
      last_name: $scope.last_name,
      email: $scope.email
    };

    $http.post('https://reqres.in/api/users', userData)
      .then(function() {
        createUser.success = true;
        $location.path('/list'); // Redirect to list page after successful creation
      }).catch(function(error) {
        console.log(error);
        //need to check error handling here
      });
  };
}]);
