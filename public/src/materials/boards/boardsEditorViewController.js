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

            $scope.newItem = function(username) {
                $scope.id = 0;
                $scope.board = prepareForNewItem(username);
                $scope.purchaseDate = new Date($scope.board.purchase);
            };

            $scope.clearItem = function() {
                if ($$routeParams.boardId === '0') {
                    $scope.board = prepareForNewItem($scope.userName);
                    $scope.purchaseDate = new Date($scope.board.purchase);
                } else {
                    loadItem ($$routeParams.boardId, $$routeParams.userName);
                }
            };

            $scope.saveItem = function() {
                saveItem ();
            };

            if ($scope.boardId === '0') {
                $scope.id = 0;
                prepareForNewItem($scope.userName);
            } else {
                loadItem ($scope.boardId, $scope.userName)
            }

            function prepareForNewItem (userName) {
                var board = {};

                board.purchase = new Date();
                board.updated = new Date();
                board.userName = userName;
                board.secondHand = false;
                board.active = false;

                return board;
            };

            function loadItem (id, userName) {
                $scope.busyIndicator = true;
                $http.get( '/api/boards/' + userName + '/' + id ).
                then(function (result) {
                    //Success
                    $scope.board = result.data;
                    $scope.purchaseDate = new Date($scope.board.purchase);
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get selected board');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };

            function saveItem () {
                $scope.busyIndicator = true;
                $scope.board.updated = new Date();
                $scope.board.username = $scope.userName;
                $scope.board.purchase = $scope.purchaseDate;
                $http.post( '/api/boards', $scope.board ).
                then(function (result) {
                    //Success
                    $scope.board = result.data;
                    Notification.success ('Board saved successfully !');
                }, function (error) {
                    //Error
                    Notification.error ('Failed to save board');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };
        }
]);
