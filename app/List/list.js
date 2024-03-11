angular.module('userMang.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    controller: 'ListCtrl',
    templateUrl: 'list/list.html'
  });
}])

.controller('ListCtrl', ['users', 'deleteStatus','createUser','$scope', '$location', '$timeout', function(users, deleteStatus,createUser, $scope, $location, $timeout) {
  
  //display users per page
  users.getAll().then(function(data) {
    $scope.userList = data; //users from API call
    $scope.totalPages = Math.ceil($scope.userList.length / $scope.usersPerPage);
    $scope.paginatedUsers();
  });

  $scope.currentPage = 1;
  $scope.usersPerPage = 6; // Change this to desired number of users per page
  
  $scope.paginatedUsers = function() {
    var begin = (($scope.currentPage - 1) * $scope.usersPerPage); //determining the starting index of the slice.
    var end = begin + $scope.usersPerPage; //determining the ending index.
    $scope.filteredUserList = $scope.userList.slice(begin, end); //contains the sliced array of users to be displayed on current page
  };

  //Check if user was successfully deleted
  if(deleteStatus.success) {
    $scope.showDeleteSuccessBanner = true;
    //display banner for 2 seconds
    $timeout(function() {
        $scope.showDeleteSuccessBanner = false;
    }, 2000);
    deleteStatus.success = false; // so we make sure it is activated only when user is deleted
  }

  
  //Check if user was created successfully
  if(createUser.success) {
    $scope.showUserCreationSuccessBanner = true;
    //display banner for 2 seconds
    $timeout(function() {
        $scope.showUserCreationSuccessBanner = false;
    }, 2000);
    createUser.success = false; //so we make sure it is activated only when user is created
  }

  //defining a function to pass the user id with the path to redirect to details page
  $scope.viewDetails = function(userId) {
    $location.path('/details/' + userId);
  };

  $scope.prevPage = function() {
    if ($scope.currentPage > 1) {
        $scope.currentPage--;
        $scope.updatePage();
    }
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.totalPages) {
        $scope.currentPage++;
        $scope.updatePage();
    }
  };

  $scope.lastPage = function() {
    $scope.currentPage = $scope.totalPages;
    $scope.updatePage();
  }

  $scope.firstPage = function() {
    $scope.currentPage = 1;
    $scope.updatePage();
  }

  //custom page number
  $scope.setPage = function(page) {
    //making sure we are in a valid range
    if(page <= $scope.totalPages) {
      $scope.currentPage = page;
      $scope.updatePage();
    }
  };

  $scope.updatePage = function() {
      var startIndex = ($scope.currentPage - 1) * $scope.usersPerPage;

      //extracting and assigning users to filteredUserList
      $scope.filteredUserList = $scope.userList.slice(startIndex, startIndex + $scope.usersPerPage);
  };
}]);