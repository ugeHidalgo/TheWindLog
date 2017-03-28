'use strict';

angular
    .module ('sessionsViewModule', [
        'ui.bootstrap', 
        'smart-table',
        'ui-notification'])

    .controller ('sessionsViewController',  [
        '$scope', 
        '$window', 
        '$http',
        'Notification',
        function ($scope, $window, $http, Notification) {

            var urlParts = $window.location.hash.split('/'),
                userName = urlParts[1],
                url = '/api/sessions/' + userName;

            $scope.userName = userName;
            $scope.itemsByPage = 10;
            $scope.numberOfPages = 5;
            $scope.busyIndicator = true;

            $http.get(url)
                .then(function (result) {
                    //Success
                    $scope.sessions = result.data;
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get sessions !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
        }
]);