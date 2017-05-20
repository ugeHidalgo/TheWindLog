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
                $scope.sessionsTotals = recalculateSessionTotals(newItems);
            });
        }
    ]);


var recalculateSessionTotals = function (data) {
    var sessionsTotals = [],
        sessionsTotalsData = {
            avgSpeed: 0,
            avgValue: 0,
            maxSpeed: 0,
            sessionsCount: 0,
            totalDistance: 0,
            totalTime: 0
        };
    
    data.forEach(function(item) {
        sessionsTotalsData.avgSpeed+= item.avgSpeed * item.sessionsCount;
        sessionsTotalsData.avgValue+= item.avgValue * item.sessionsCount;
        if (item.maxSpeed > sessionsTotalsData.maxSpeed) sessionsTotalsData.maxSpeed = item.maxSpeed;
        sessionsTotalsData.sessionsCount+= item.sessionsCount;
        sessionsTotalsData.totalDistance+= item.totalDistance;
        sessionsTotalsData.totalTime+= item.totalTime;
    });

    sessionsTotalsData.avgSpeed = sessionsTotalsData.avgSpeed / sessionsTotalsData.sessionsCount;
    sessionsTotalsData.avgValue = sessionsTotalsData.avgValue / sessionsTotalsData.sessionsCount;
    sessionsTotals.push(sessionsTotalsData);
    return sessionsTotals;
};