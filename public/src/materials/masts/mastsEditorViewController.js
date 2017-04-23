'use strict';

angular
    .module ('mastsEditorViewModule', [
        'ui.bootstrap', 
        'ui-notification'])

    .controller ('mastsEditorViewController',  [
        '$scope', 
        '$routeParams', 
        'Notification', 
        '$http',
        function ($scope, $$routeParams, Notification, $http) {

            $scope.userName = $$routeParams.userName;
            $scope.mastId = $$routeParams.mastId;

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
                $scope.mast = prepareForNewItem(username);
                $scope.purchaseDate = new Date($scope.mast.purchase);
            };

            $scope.clearItem = function() {
                $scope.busyIndicator = true;
                if ($$routeParams.mastId === '0') {
                    $scope.mast = prepareForNewItem($scope.userName);
                    $scope.purchaseDate = new Date($scope.mast.purchase);
                } else {
                    loadItem ($$routeParams.mastId, $$routeParams.userName);
                }
            };

            $scope.saveItem = function() {
                saveItem ();
            };

            if ($scope.mastId === '0') {
                $scope.id = 0;
                $scope.mast = prepareForNewItem($scope.userName);
            } else {
                loadItem ($scope.mastId, $scope.userName)
            }

            function prepareForNewItem (userName) {
                var mast = {};

                mast.purchase = new Date();
                mast.updated = new Date();
                mast.userName = userName;
                mast.secondHand = false;
                mast.active = false;

                return mast;
            };

            function loadItem (id, userName) {
                $scope.busyIndicator = true;
                $http.get( '/api/masts/' + userName + '/' + id ).
                then(function (result) {
                    //Success
                    $scope.mast = result.data;
                    $scope.purchaseDate = new Date($scope.mast.purchase);
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get selected mast');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };

            function saveItem () {
                $scope.busyIndicator = true;
                $scope.mast.updated = new Date();
                $scope.mast.username = $scope.userName;
                $scope.mast.purchase = $scope.purchaseDate;
                $http.post( '/api/masts', $scope.mast ).
                then(function (result) {
                    //Success
                    $scope.mast = result.data;
                    Notification.success ('Mast saved successfully !');
                }, function (error) {
                    //Error
                    Notification.error ('Failed to save mast');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };
        }
]);