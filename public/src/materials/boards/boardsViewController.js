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
            $scope.itemsByPage = 15;
            $scope.numberOfPages = 5;
            $scope.busyIndicator = true;

            getData();

            $scope.reloadGrid = function () {
                getData();
            };  

            function getData() {
                $http.get(url)
                .then(function (result) {
                    //Success
                    filterNonActiveItems(result.data);
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get boards !!');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };

            function filterNonActiveItems (data) {
                $scope.boards = []
                if ($scope.activeMaterials) {
                    data.forEach(function(item) {
                        if (item.active) {
                            $scope.boards.push(item);
                        }
                    });
                } else $scope.boards = data;
            }
        }
]);