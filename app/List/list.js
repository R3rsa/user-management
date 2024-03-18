angular.module('userMang.list', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/list', {
    controller: 'ListCtrl',
    templateUrl: 'list/list.html'
  });
}])

.controller('ListCtrl', ['users','$scope', '$location', '$timeout', '$routeParams', 'toastr', function(users, $scope, $location, $timeout, $routeParams, toastr) {
  
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
  if($routeParams.deleted === 'true') {
    $scope.showDeleteSuccessBanner = true;
    // Use toastr here
    toastr.success('User deleted successfully', 'HAFAAA');
    $timeout(function() { //display banner for 2 seconds
        $scope.showDeleteSuccessBanner = false;
        $location.search('deleted', null);
    }, 2000);
  }

  //Check if user was created successfully
  if($routeParams.created === 'true') {
    $scope.showUserCreationSuccessBanner = true;
    toastr.success('User Created Successfully');
    $timeout(function() { //display banner for 2 seconds
        $scope.showUserCreationSuccessBanner = false;
        $location.search('created', null);
    }, 2000);
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