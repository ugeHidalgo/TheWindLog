'use strict';

angular
    .module ('spotsStatsViewModule', [
        'ui.bootstrap', 
        'ui-notification'])

    .controller ('spotsStatsViewController',  [
        '$scope', 
        '$window',
        '$routeParams', 
        'Notification', 
        '$http',
        function ($scope, $window, $$routeParams, Notification, $http) {

            var urlParts = $window.location.hash.split('/'),
                userName = urlParts[2], data = [];

            $scope.userName = userName;
            $scope.itemsByPage = 10;
            $scope.numberOfPages = 5;
            $scope.busyIndicator = true;
            $scope.myData = [];
            
            $http.get('/api/sessionstotalsbyspot/' + userName)
                .then(function (result) {
                    //Success
                    $scope.sessionsTotalsBySpot = result.data;
                    $scope.myData = result.data;
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get spots sessions totals !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });

            $http.get('/api/sessionstotals/' + userName)
                .then(function (result) {
                    //Success
                    $scope.sessionsTotals = result.data;
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get sessions totals !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });

            $scope.$watch( 'displayedCollection', function (newItems, oldItems) {
                $scope.myData = newItems;
            });

        }
    ]);