angular.module('userMang').directive('navbar', function() {
    return {
      restrict: 'E',
      templateUrl: 'navbar/navbar.html',
      controller: 'MainCtrl',
      controllerAs: 'main'
    };
  });
  