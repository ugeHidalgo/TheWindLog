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

            if ($scope.spotId === '0') {
                $scope.id = 0;
                $scope.spot = prepareForNewItem($scope.userName);
            } else {
                loadItem ($scope.spotId, $scope.userName);
            }

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
                    $scope.initMap($scope.spot);
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

            $scope.initMap = function (spot) {
                NgMap.getMap().then(function(map) {
                    var myLatLng = new google.maps.LatLng(spot.lat,spot.long);
                    map.setCenter(myLatLng);
                    map.setZoom(15);
                    map.setMapTypeId('satellite');
                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        title: 'Spot: ' + spot.name + '\nProvince: ' + spot.province + '\nCountry: ' + spot.country,
                        map: map
                    });
                    map.markers = [];
                    map.markers.push(marker);

                    google.maps.event.addListener (map, 'click' , function(event) {
                        addMarker (event.latLng, map, spot);
                    });
                });
            };

            function addMarker(positionClicked, map, spot) {
                var marker;

                $scope.spot.lat = positionClicked.lat();
                $scope.spot.long = positionClicked.lng();

                if (map.markers.length>0) {
                    map.markers[0].setMap(null);
                    map.markers =  [];
                }
                marker = new google.maps.Marker({
                        position: positionClicked,
                        draggable: true,
                        animation: google.maps.Animation.DROP,
                        title: 'Spot: ' + spot.name + '\nProvince: ' + spot.province + '\nCountry: ' + spot.country,
                        map: map
                });
                map.markers.push(marker);
            }
        }
]);