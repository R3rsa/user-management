angular.module('userMang.create', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create', {
    templateUrl: 'create/create.html',
    controller: 'CreateCtrl'
  });
}])

.controller('CreateCtrl', ['createUser','$scope', '$http', '$location', function(createUser, $scope, $http, $location) {
  $scope.createUser = function() {
    // saving user input
    var userData = {
      first_name: $scope.first_name,
      last_name: $scope.last_name,
      email: $scope.email
    };
    $scope.error = '';

    $http.post('https://reqres.in/api/users', userData)
      .then(function() {
        createUser.success = true; //activating banner
        $location.path('/list'); // Redirect to list page after successful creation
        
      }).catch(function(error) {
        $scope.error = 'error in creating a user!';
        console.log(error);
      });
  };
  
  $scope.cancelCreate = function() {
    $location.path('/list');
  };

  $scope.avatarSrc = '';

  //displaying uploaded image
  $scope.fileChanged = function(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        $scope.$apply(function() {
          $scope.avatarSrc = e.target.result;
        });
      };
      reader.readAsDataURL(input.files[0]);
    }
  };
}]);