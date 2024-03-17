// making api requests to retrieve/delete/update users
angular.module('userMang').factory('users', ['$http', function($http) {
    var service = {};
  
    service.getAll = function(page) {
            return $http.get('https://reqres.in/api/users?page=' + page)
                .then(function(response) {
                    return response.data;
                })
                .catch(function(err) {
                    return err;
                });
    };
    
    //retrieve a single user details
    service.getById = function(userId) {
      return $http.get('https://reqres.in/api/users/' + userId);
    };
  
    service.delete = function(userId) {
      return $http.delete('https://reqres.in/api/users/' + userId);
    };

    service.update = function(userId, userData) {
      return $http.put('https://reqres.in/api/users/' + userId, userData);
    }
  
    return service;
}]);
