'use strict';

angular
    .module ('sailsViewModule', [
        'ui.bootstrap', 
        'smart-table'])

    .controller ('sailsViewController', [
        '$scope', 
        '$window', 
        '$http',
        function ($scope, $window, $http) {

            var urlParts = $window.location.hash.split('/'),
                userName = urlParts[1],
                url = '/api/sails/' + userName;

            $scope.userName = userName;

            $http.get(url).
                then(function (result) {
                    //Success
                    $scope.sails = result.data;
                }, function (error) {
                    //Error
                    alert ('Failed to get user sails: ' + error);
                });
        }
    ]);