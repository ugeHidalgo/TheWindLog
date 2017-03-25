'use strict';

angular
    .module ('boomsViewModule', [
        'ui.bootstrap', 
        'smart-table',
        'ui-notification'])

    .controller ('boomsViewController',  [
        '$scope', 
        '$window', 
        '$http',
        'Notification',
        function ($scope, $window, $http, Notification) {

            var urlParts = $window.location.hash.split('/'),
                userName = urlParts[1],
                url = '/api/booms/' + userName;

            $scope.userName = userName;
            $scope.itemsByPage = 10;
            $scope.numberOfPages = 5;
            $scope.busyIndicator = true;

            $http.get(url)
                .then(function (result) {
                    //Success
                    $scope.booms = result.data;
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get booms !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
        }
]);