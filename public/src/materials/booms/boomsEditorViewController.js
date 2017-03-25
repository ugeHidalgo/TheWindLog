'use strict';

angular
    .module ('boomsEditorViewModule', [
        'ui.bootstrap', 
        'ui-notification'])

    .controller ('boomsEditorViewController',  [
        '$scope', 
        '$routeParams', 
        'Notification', 
        '$http',
        function ($scope, $$routeParams, Notification, $http) {

            $scope.userName = $$routeParams.userName;
            $scope.boomId = $$routeParams.boomId;

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
                $scope.boom = prepareForNewItem(username);
                $scope.purchaseDate = new Date($scope.boom.purchase);
            };

            $scope.clearItem = function() {
                if ($$routeParams.boomId === '0') {
                    $scope.boom = prepareForNewItem($scope.userName);
                    $scope.purchaseDate = new Date($scope.boom.purchase);
                } else {
                    loadItem ($$routeParams.boomId, $$routeParams.userName);
                }
            };

            $scope.saveItem = function() {
                saveItem ();
            };

            if ($scope.boomId === '0') {
                $scope.id = 0;
                prepareForNewItem($scope.userName);
            } else {
                loadItem ($scope.boomId, $scope.userName)
            }

            function prepareForNewItem (userName) {
                var boom = {};

                boom.purchase = new Date();
                boom.updated = new Date();
                boom.userName = userName;
                boom.secondHand = false;
                boom.active = false;

                return boom;
            };

            function loadItem (id, userName) {
                $scope.busyIndicator = true;
                $http.get( '/api/booms/' + userName + '/' + id ).
                then(function (result) {
                    //Success
                    $scope.boom = result.data;
                    $scope.purchaseDate = new Date($scope.boom.purchase);
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get selected boom');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };

            function saveItem () {
                $scope.busyIndicator = true;
                $scope.boom.updated = new Date();
                $scope.boom.username = $scope.userName;
                $scope.boom.purchase = $scope.purchaseDate;
                $http.post( '/api/booms', $scope.boom ).
                then(function (result) {
                    //Success
                    $scope.boom = result.data;
                    Notification.success ('Boom saved successfully !');
                }, function (error) {
                    //Error
                    Notification.error ('Failed to save boom');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };
        }
]);