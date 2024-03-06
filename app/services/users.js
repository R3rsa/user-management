angular.module('userMang.list').factory('users', ['$http', function($http) {
    return $http.get('https://reqres.in/api/users')
        .then(function(response) {
            console.log(response);
            return response.data;
        })
        .catch(function(err) {
            return err;
        });
}]);
