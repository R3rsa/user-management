angular.module('userMang.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    controller: 'ListCtrl',
    templateUrl: 'list/list.html'
  });
}])

.controller('ListCtrl', ['users', 'deleteStatus','createUser','$scope', '$location', '$timeout', function(users, deleteStatus,createUser, $scope, $location, $timeout) {
  
  $scope.totalPages = 2;
  $scope.currentPage = 1;
  $scope.usersPerPage = 6; // Change this to desired number of users per page
  
  $scope.filteredUserList = []; // Initialize filteredUserList as an empty array

  // Fetch the initial page of users
  users.getAll($scope.currentPage).then(function(data) {
    $scope.userList = data.data;
    $scope.totalPages = data.total_pages;
    console.log($scope.totalPages);
    $scope.updatePage();
  });

  //Check if user was successfully deleted
  if(deleteStatus.success) {
    $scope.showDeleteSuccessBanner = true;
    //display banner for 2 seconds
    $timeout(function() {
        $scope.showDeleteSuccessBanner = false;
    }, 2000);
    // toaster.success('Haffa', 'User deleted!');
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

  // Function to fetch the next page of users
  $scope.fetchNextPage = function() {
    if ($scope.currentPage <= $scope.totalPages) {
      
      users.getAll($scope.currentPage).then(function(data) {
        console.log("I entered fetch function");
        $scope.userList = $scope.userList.concat(data.data);
        $scope.updatePage();
      });
    }
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
      $scope.fetchNextPage();
    }
  };

  $scope.lastPage = function() {
    $scope.currentPage = $scope.totalPages;
    $scope.fetchNextPage();
  }

  $scope.firstPage = function() {
    $scope.currentPage = 1;
    $scope.updatePage();
  }

  //custom page number
  $scope.setPage = function(page) {
    //making sure we are in a valid range
    if(page > 0 && page <= $scope.totalPages) {
      $scope.currentPage = page;
      console.log($scope.currentPage);
      $scope.fetchNextPage();
    }
  };

  $scope.updatePage = function() {
      var startIndex = ($scope.currentPage - 1) * $scope.usersPerPage;

      //extracting and assigning users to filteredUserList
      $scope.filteredUserList = $scope.userList.slice(startIndex, startIndex + $scope.usersPerPage);
  };
}]);