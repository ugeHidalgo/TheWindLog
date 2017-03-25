'use strict';

angular
    .module ('sailsEditorViewModule', [
        'ui.bootstrap', 
        'ui-notification'])

    .controller ('sailsEditorViewController', [
        '$scope', 
        '$routeParams', 
        'Notification',
        '$http',
        function ($scope, $$routeParams, Notification, $http) {

            $scope.userName = $$routeParams.userName;
            $scope.sailId = $$routeParams.sailId;

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
                $scope.sail = prepareForNewItem(username);
                $scope.purchaseDate = new Date($scope.sail.purchase);
            };

            $scope.clearItem = function() {
                if ($$routeParams.sailId === '0') {
                    $scope.sail = prepareForNewItem($scope.userName);
                    $scope.purchaseDate = new Date($scope.sail.purchase);
                } else {
                    loadItem ($$routeParams.sailId, $$routeParams.userName);
                }
            };

            $scope.saveItem = function() {
                saveItem ();
            };

            if ($scope.sailId === '0') {
                $scope.id = 0;
                prepareForNewItem($scope.userName);
            } else {
                loadItem ($scope.sailId, $scope.userName)
            }

            function prepareForNewItem (userName) {
                var sail = {};

                sail.purchase = new Date();
                sail.updated = new Date();
                sail.userName = userName;
                sail.secondHand = false;
                sail.active = false;

                return sail;
            };

            function loadItem (id, userName) {
                $scope.busyIndicator = true;
                $http.get( '/api/sails/' + userName + '/' + id ).
                then(function (result) {
                    //Success
                    $scope.sail = result.data;
                    $scope.purchaseDate = new Date($scope.sail.purchase);
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get selected sail');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };

            function saveItem () {
                $scope.busyIndicator = true;
                $scope.sail.updated = new Date();
                $scope.sail.username = $scope.userName;
                $scope.sail.purchase = $scope.purchaseDate;
                $http.post( '/api/sails', $scope.sail ).
                then(function (result) {
                    //Success
                    $scope.sail = result.data;
                    Notification.success ('Sail saved successfully !');
                }, function (error) {
                    //Error
                    Notification.error ('Failed to save sail');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };
        }
    ]);