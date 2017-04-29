'use strict';

angular
    .module ('sailsViewModule', [
        'ui.bootstrap', 
        'smart-table',
        'ui-notification'])

    .controller ('sailsViewController', [
        '$scope', 
        '$window', 
        '$http',
        'Notification',
        function ($scope, $window, $http) {

            var urlParts = $window.location.hash.split('/'),
                userName = urlParts[1],
                url = '/api/sails/' + userName;

            $scope.userName = userName;
            $scope.itemsByPage = 15;
            $scope.numberOfPages = 5;
            $scope.busyIndicator = true;
            $scope.activeMaterials = true; 

            getData();

            $scope.reloadGrid = function () {
                getData();
            };

            function getData() {
                $http.get(url).
                then(function (result) {
                    //Success
                    filterNonActiveItems(result.data);
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get sails !!! ');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };
            
            function filterNonActiveItems (data) {
                $scope.sails = []
                if ($scope.activeMaterials) {
                    data.forEach(function(item) {
                        if (item.active) {
                            $scope.sails.push(item);
                        }
                    });
                } else $scope.sails = data;
            }
        }
    ]);