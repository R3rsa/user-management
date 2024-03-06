'use strict';

angular.module('userMang.create', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/create', {
    templateUrl: 'create/create.html',
    controller: 'CreateCtrl'
  });
}])

.controller('CreateCtrl', ['$scope', '$http', function($scope, $http) {
  $scope.createUser = function() {
    var userData = new FormData();
    userData.append('first_name', $scope.first_name);
    userData.append('last_name', $scope.last_name);
    userData.append('email', $scope.email);
    if ($scope.avatar) {
      userData.append('avatar', $scope.avatar);
    }
    $http.post('https://reqres.in/api/users', userData, {
      //to prevent AngularJS from serializing the data and convert them to string format
      transformRequest: angular.identity,
      headers: {
        //to let the browser set the correct content type for the request
        'Content-Type': undefined
      }
    })
      .then(function(response) {
        console.log('User created successfully');
        // Redirect to list page after successful creation
        window.location.href = '#/list';
      }, function(error) {
        console.log(error);
      });
  };
}]);