'use strict';

angular
    .module ('boardsViewModule', [
        'ui.bootstrap', 
        'smart-table'])

    .controller ('boardsViewController',  [
        '$scope', 
        '$window', 
        '$http',
        function ($scope, $window, $http) {

            var urlParts = $window.location.hash.split('/'),
                userName = urlParts[1],
                url = '/api/boards/' + userName;

            $scope.userName = userName;

            $http.get(url).
                then(function (result) {
                    //Success
                    $scope.boards = result.data;
                }, function (error) {
                    //Error
                    alert ('Failed to get user sails: ' + error);
                });
        }
]);