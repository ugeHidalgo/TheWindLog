'use strict';

angular
    .module ('boardsViewModule', [
        'ui.bootstrap', 
        'smart-table',
        'ui-notification'])

    .controller ('boardsViewController',  [
        '$scope', 
        '$window', 
        '$http',
        'Notification',
        function ($scope, $window, $http, Notification) {

            var urlParts = $window.location.hash.split('/'),
                userName = urlParts[1],
                url = '/api/boards/' + userName;

            $scope.userName = userName;
            $scope.itemsByPage = 10;
            $scope.numberOfPages = 5;
            $scope.busyIndicator = true;

            $http.get(url)
                .then(function (result) {
                    //Success
                    $scope.boards = result.data;
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get boards !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
        }
]);