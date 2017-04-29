'use strict';

angular
    .module ('mastsViewModule', [
        'ui.bootstrap', 
        'smart-table'])

    .controller ('mastsViewController',  [
        '$scope', 
        '$window', 
        '$http',
        'Notification',
        function ($scope, $window, $http, Notification) {

            var urlParts = $window.location.hash.split('/'),
                userName = urlParts[1],
                url = '/api/masts/' + userName;

            $scope.userName = userName;
            $scope.itemsByPage = 15;
            $scope.numberOfPages = 5;
            $scope.busyIndicator = true;
            $scope.activeMaterials = true;

            $http.get(url).
                then(function (result) {
                    //Success
                    filterNonActiveItems(result.data);
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get masts !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });

            function filterNonActiveItems (data) {
                $scope.masts = []
                if ($scope.activeMaterials) {
                    data.forEach(function(item) {
                        if (item.active) {
                            $scope.masts.push(item);
                        }
                    });
                } else $scope.masts = result.data;
            }
        }
]);