'use strict';

angular
    .module ('spotsViewModule', [
        'ui.bootstrap', 
        'smart-table',
        'ui-notification'])

    .controller ('spotsViewController',  [
        '$scope', 
        '$window', 
        '$http',
        'Notification',
        function ($scope, $window, $http, Notification) {

            var urlParts = $window.location.hash.split('/'),
                userName = urlParts[1],
                url = '/api/spots/' + userName;

            $scope.userName = userName;
            $scope.itemsByPage = 15;
            $scope.numberOfPages = 5;
            $scope.busyIndicator = true;
            $scope.activeMaterials = true;

            $http.get(url)
                .then(function (result) {
                    //Success
                    filterNonActiveItems(result.data);
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get spots !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });

            function filterNonActiveItems (data) {
                $scope.spots = []
                if ($scope.activeMaterials) {
                    data.forEach(function(item) {
                        if (item.active) {
                            $scope.spots.push(item);
                        }
                    });
                } else $scope.spots = data;
            }
        }
]);