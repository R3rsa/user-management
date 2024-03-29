angular.module('userMang.details', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/details/:id', {
    templateUrl: 'details/details.html',
    controller: 'detailsCtrl'
  });
}])

.controller('detailsCtrl', ['users', '$scope', '$routeParams','$location', function(users, $scope, $routeParams, $location ) {
  var userId = $routeParams.id;

  //Show loading and error if exist
  $scope.loading = false;
  $scope.error = '';
  
  //Hide the edit modal until edit button is pressed
  $scope.showEditModal = false;
  $scope.editedUser = {};

  
  //display user details by his id
  users.getById(userId)
  .then(function(userDetails) {
    $scope.user = userDetails.data.data;
  })
  .catch(function(error) {
    $scope.error = 'Failed to load user details. Please try again.';
    console.log(error);
  });
  
  $scope.deleteUser = function() {
    var confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if(confirmDelete) {
      users.delete(userId).then(function() {
        $location.path('/list').search('deleted', 'true');
      })
      .catch(function(error) {
        $scope.error = 'Failed to delete the user. Please try again.';
        console.log(error);
      });
    }
  }

  $scope.editUser = function() {

    //show page loading while edit form is off
    $scope.loading = true;
    $scope.editedUser = angular.copy($scope.user);
    $scope.showEditModal = true;
    // modalService.openModal('modal.html', 'detailsCtrl', 'md', $scope.editedUser);
    $scope.loading = false;
  };
  console.log($scope.showEditModal);

  $scope.saveEditedUser = function() {
    users.update(userId, $scope.editedUser).then(function() {
      $scope.loading = true;
      $scope.user.first_name = $scope.editedUser.first_name;
      $scope.user.last_name = $scope.editedUser.last_name;
      $scope.user.email = $scope.editedUser.email;
      $scope.user.avatar = $scope.editedUser.avatar;
      $scope.loading = false;
      $scope.closeEditModal();
    })
    .catch(function(error) {
      $scope.error = 'Failed to update user. Please try again.';
      console.log(error);
    });
  };

  $scope.closeEditModal = function() {
    $scope.showEditModal = false;
  };

}]);