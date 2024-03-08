angular.module('userMang.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    controller: 'ListCtrl',
    templateUrl: 'list/list.html'
  });
}])

.controller('ListCtrl', ['users', 'deleteStatus','createUser','$scope', '$location', '$timeout', function(users, deleteStatus,createUser, $scope, $location, $timeout) {
  
  //display all users 
  users.getAll().then(function(data) {
    $scope.userList = data;
  });

  //Check if user was successfully deleted
  if(deleteStatus.success) {
    $scope.showDeleteSuccessBanner = true;
    //display banner for 2 seconds
    $timeout(function() {
        $scope.showDeleteSuccessBanner = false;
    }, 2000);
    deleteStatus.success = false;
  }

  
  //Check if user was created successfully
  if(createUser.success) {
    $scope.showUserCreationSuccessBanner = true;
    //display banner for 2 seconds
    $timeout(function() {
        $scope.showUserCreationSuccessBanner = false;
    }, 2000);
    createUser.success = false;
  }

  //defining a function to pass the user id with the path to redirect to details page
  $scope.viewDetails = function(userId) {
    $location.path('/details/' + userId);
  }
  //defining a function to redirect to create page
  $scope.redirectToCreate = function() {
    $location.path('/create');
  }
}]);