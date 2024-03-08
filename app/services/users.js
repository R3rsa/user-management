angular.module('userMang').factory('users', ['$http', function($http) {
    var service = {};
  
    service.getAll = function() {
        var users = [];

        function getUsers(page) {
            return $http.get('https://reqres.in/api/users?page=' + page)
                .then(function(response) {
                    users = users.concat(response.data.data);
                    if (response.data.total_pages > page) {
                        return getUsers(page + 1);
                    } else {
                        return users;
                    }
                })
                .catch(function(err) {
                    return err;
                });
        }

        return getUsers(1);
    };
  
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
