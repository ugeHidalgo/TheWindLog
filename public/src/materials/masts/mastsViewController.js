'use strict';

angular
    .module ('mastsViewModule', [
        'ui.bootstrap', 
        'smart-table'])

    .controller ('mastsViewController',  [
        '$scope', 
        '$window', 
        '$http',
        function ($scope, $window, $http) {

            var urlParts = $window.location.hash.split('/'),
                userName = urlParts[1],
                url = '/api/masts/' + userName;

            $scope.userName = userName;
            $scope.itemsByPage = 10;
            $scope.numberOfPages = 5;

            $http.get(url).
                then(function (result) {
                    //Success
                    $scope.masts = result.data;
                }, function (error) {
                    //Error
                    alert ('Failed to get user masts: ' + error);
                });
        }
]);