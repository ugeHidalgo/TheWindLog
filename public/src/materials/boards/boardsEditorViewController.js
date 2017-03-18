'use strict';

angular
    .module ('boardsEditorViewModule', [
        'ui.bootstrap', 
        'ui-notification'])

    .controller ('boardsEditorViewController',  [
        '$scope', 
        '$routeParams', 
        'Notification', 
        '$http',
        function ($scope, $$routeParams, Notification, $http) {

            $scope.userName = $$routeParams.userName;
            $scope.boardId = $$routeParams.boardId;

            $scope.dateOptions = {
                formatYear: 'yyyy',
                maxDate: new Date(2020, 5, 22),
                startingDay: 1
            };

            $scope.openPurchasePopUp = function() {
                $scope.purchasePopUp.opened = true;
            };
            $scope.purchasePopUp = {
                opened: false
            };

            if ($scope.boardId === '0') {

            } else {
                $http.get( '/api/boards/' + $scope.userName+ '/' + $scope.boardId ).
                then(function (result) {
                    //Success
                    $scope.board = result.data;
                    $scope.purchaseDate = new Date($scope.board.purchase);
                }, function (error) {
                    //Error
                    alert ('Failed to get selected board: ' + error);
                });
            }
        }
]);