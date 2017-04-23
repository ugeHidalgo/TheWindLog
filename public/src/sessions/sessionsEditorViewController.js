'use strict';

angular
    .module ('sessionsEditorViewModule', [
        'ui.bootstrap', 
        'ui-notification'])

    .controller ('sessionsEditorViewController',  [
        '$scope', 
        '$routeParams', 
        'Notification', 
        '$http',
        'NgMap',
        function ($scope, $$routeParams, Notification, $http, NgMap) {

            $scope.userName = $$routeParams.userName;
            $scope.sessionId = $$routeParams.sessionId;
            $scope.spots = [];
            $scope.boards = [];
            $scope.sails = [];
            $scope.masts = [];
            $scope.booms = [];

            $scope.dateOptions = {
                formatYear: 'yyyy',
                maxDate: new Date(2020, 5, 22),
                startingDay: 1
            };

            $scope.openDatePopUp = function() {
                $scope.datePopUp.opened = true;
            };
            $scope.datePopUp = {
                opened: false
            };

            $scope.changeSpot = function() {
                $scope.initMap($scope.session.spot[0]);
            };

            $scope.newItem = function(username) {
                $scope.id = 0;
                $scope.session = $scope.prepareForNewItem(username);
                $scope.sessionDate = new Date($scope.session.date);
            };

            $scope.clearItem = function() {
                if ($$routeParams.sessionId === '0') {
                    $scope.session = $scope.prepareForNewItem($scope.userName);
                    $scope.sessionDate = new Date($scope.session.date);
                } else {
                    $scope.busyIndicator = true;
                    $scope.loadSession($$routeParams.sessionId, $$routeParams.userName);
                }
            };

            var loadSpots = new Promise(function(resolve,reject) {
                $http.get('/api/spots/' + $scope.userName).
                    then (function(spots) {
                        //Success retrieving spots
                        $scope.spots = spots.data;
                        resolve (spots.data);
                    }, function(error) {
                        //Error retrieving spots
                        Notification.error ('Failed to get spots to be used with sessions');
                        reject(error);
                    });
            });

            var loadBoards = new Promise(function(resolve,reject) {
                $http.get('/api/boards/' + $scope.userName).
                    then (function(boards) {
                        //Success retrieving boards
                        $scope.boards = boards.data;
                        resolve (boards.data);
                    }, function(error) {
                        //Error retrieving boards
                        Notification.error ('Failed to get boards to be used with sessions');
                        reject(error);
                    });
            });

            var loadSails = new Promise(function(resolve,reject) {
                $http.get('/api/sails/' + $scope.userName).
                    then (function(sails) {
                        //Success retrieving sails
                        $scope.sails = sails.data;
                        resolve (sails.data);
                    }, function(error) {
                        //Error retrieving sails
                        Notification.error ('Failed to get sails to be used with sessions');
                        reject(error);
                    });
            });

            var loadBooms = new Promise(function(resolve,reject) {
                $http.get('/api/booms/' + $scope.userName).
                    then (function(booms) {
                        //Success retrieving booms
                        $scope.booms = booms.data;
                        resolve (booms.data);
                    }, function(error) {
                        //Error retrieving booms
                        Notification.error ('Failed to get booms to be used with sessions');
                        reject(error);
                    });
            });

            var loadMasts = new Promise(function(resolve,reject) {
                $http.get('/api/masts/' + $scope.userName).
                    then (function(masts) {
                        //Success retrieving masts
                        $scope.masts = masts.data;
                        resolve (masts.data);
                    }, function(error) {
                        //Error retrieving masts
                        Notification.error ('Failed to get masts to be used with sessions');
                        reject(error);
                    });
            });

            Promise.all([loadSpots, loadBoards, loadSails, loadBooms, loadMasts]).then(function() {
                if ($scope.sessionId === '0') {
                    $scope.id = 0;
                    $scope.session = $scope.prepareForNewItem($scope.userName);
                } else {
                    $scope.busyIndicator = true;
                    $scope.loadSession($scope.sessionId, $scope.userName)
                }
            });

            $scope.loadSession =  function (id, userName) {
                $http.get( '/api/sessions/' + userName + '/' + id ).
                then(function (result) {
                    //Success retrieving sessions
                    $scope.session = result.data;
                    $scope.initMap($scope.session.spot[0]);
                    $scope.sessionDate = new Date($scope.session.date);
                    $scope.sessionTime = secondsToTime ($scope.session.time);
                }, function (error) {
                    //Error retrieving sessions
                    Notification.error ('Failed to get selected session');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };

            $scope.saveItem = function () {
                $scope.busyIndicator = true;
                $scope.session.updated = new Date();
                $scope.session.username = $scope.userName;
                $scope.session.date = $scope.sessionDate;
                $scope.session.time = timeToSeconds($scope.sessionTime);
                $http.post( '/api/sessions', $scope.session ).
                then(function (result) {
                    //Success
                    $scope.session = result.data;
                    Notification.success ('Session saved successfully !');
                }, function (error) {
                    //Error
                    Notification.error ('Failed to save session');
                })
                .finally(function (){
                    $scope.busyIndicator = false;
                });
            };

            $scope.prepareForNewItem = function (userName) {
                var session = {};

                session.date = new Date();
                session.time = 0;
                session.updated = new Date();
                session.userName = userName;

                return session;
            };

            $scope.initMap = function (spot) {
                NgMap.getMap().then(function(map) {
                    var myLatLng = new google.maps.LatLng(spot.lat,spot.long);
                    map.setCenter(myLatLng);
                    map.setZoom(15);
                    map.setMapTypeId('satellite');
                    var marker = new google.maps.Marker({
                        position: myLatLng,
                        title: spot.name + '\nLat: ' + spot.lat + '\nLong: ' + spot.long
                    });
                    marker.setMap(map);
                });
            };

            function secondsToTime (secondsAmount) {
                var days  = 1,
                    hours = Math.floor (secondsAmount / 3600),
                    minutes = Math.floor ((secondsAmount % 3600) / 60),
                    seconds = Math.floor ((secondsAmount % 3600) % 60);

                return new Date(1970, 0, days, hours, minutes, seconds);
            };

            function timeToSeconds (timeString) {
                var hours = 0,
                    minutes = 0,
                    seconds = 0;
                if (timeString) {
                    hours = timeString.getHours();
                    minutes = timeString.getMinutes();
                    seconds = timeString.getSeconds();
                }
                return hours + 3600 + minutes * 60 + seconds;
            };
        }
]);
