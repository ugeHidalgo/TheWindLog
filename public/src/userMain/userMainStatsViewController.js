'use strict';

angular
    .module ('userMainStatsViewModule', [
        'ui.bootstrap', 
        'ui-notification'])

    .controller ('userMainStatsViewController',  [
        '$scope', 
        '$window',
        '$routeParams', 
        'Notification', 
        '$http',
        function ($scope, $window, $$routeParams, Notification, $http) {

            var urlParts = $window.location.hash.split('/'),
                userName = urlParts[2], data = [],
                url = '/api/sessionstotals/' + userName;

            $scope.userName = userName;
            $scope.itemsByPage = 10;
            $scope.numberOfPages = 5;
            $scope.busyIndicator = true;
            $scope.myData = [];
            
            $http.get(url)
                .then(function (result) {
                    //Success
                    $scope.sessionsTotals = result.data;
                    $scope.myData = result.data;
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get sessions totals !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });

            /*$scope.$watch( 'sessionsTotals', function (newItems, oldItems) {
                 $scope.myData = newItems;
                 //removeBars();
             }, true);*/
        }
    ]);