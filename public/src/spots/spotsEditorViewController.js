'use strict';

angular
    .module ('spotsEditorViewModule', [
        'ui.bootstrap', 
        'ui-notification'])

    .controller ('spotsEditorViewController',  [
        '$scope', 
        '$routeParams', 
        'Notification', 
        '$http',
        'NgMap',
        function ($scope, $$routeParams, Notification, $http, NgMap) {

            $scope.userName = $$routeParams.userName;
            $scope.spotId = $$routeParams.spotId;

            $scope.newItem = function(username) {
                $scope.id = 0;
                $scope.spot = prepareForNewItem(username);
            };

            $scope.clearItem = function() {
                if ($$routeParams.spotId === '0') {
                    $scope.spot = prepareForNewItem($scope.userName);
                } else {
                    loadItem ($$routeParams.spotId, $$routeParams.userName);
                }
            };

            $scope.saveItem = function() {
                saveItem ();
            };

            if ($scope.spotId === '0') {
                $scope.id = 0;
                prepareForNewItem($scope.userName);
            } else {
                loadItem ($scope.spotId, $scope.userName);
            }

            function prepareForNewItem (userName) {
                var spot = {};

                spot.updated = new Date();
                spot.userName = userName;
                spot.active = false;

                return spot;
            };

            function loadItem (id, userName) {
                $scope.busyIndicator = true;
                $http.get( '/api/spots/' + userName + '/' + id ).
                then(function (result) {
                    //Success
                    $scope.spot = result.data;
                    NgMap.getMap().then(function(map) {
                        var myLatLng = new google.maps.LatLng($scope.spot.lat,$scope.spot.long);
                        var marker = new google.maps.Marker({
                            position: myLatLng,
                            title: $scope.spot.name
                        });
                        marker.setMap(map);
                    });
                }, function (error) {
                    //Error
                    Notification.error ('Failed to get selected spot');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };

            function saveItem () {
                $scope.busyIndicator = true;
                $scope.spot.updated = new Date();
                $scope.spot.username = $scope.userName;
                $http.post( '/api/spots', $scope.spot ).
                then(function (result) {
                    //Success
                    $scope.spot = result.data;
                    Notification.success ('Spot saved successfully !');
                }, function (error) {
                    //Error
                    Notification.error ('Failed to save spot');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };
        }
]);