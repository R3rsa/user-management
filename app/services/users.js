angular.module('userMang.list').factory('users', ['$http', function($http) {
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
}]);
