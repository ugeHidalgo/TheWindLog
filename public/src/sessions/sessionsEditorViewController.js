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
        function ($scope, $$routeParams, Notification, $http) {

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

            $scope.newItem = function(username) {
                $scope.id = 0;
                $scope.session = prepareForNewItem(username);
                $scope.sessionDate = new Date($scope.session.date);
            };

            $scope.clearItem = function() {
                if ($$routeParams.sessionId === '0') {
                    $scope.session = prepareForNewItem($scope.userName);
                    $scope.sessionDate = new Date($scope.session.date);
                } else {
                    loadSession($$routeParams.sessionId, $$routeParams.userName);
                }
            };

            $scope.saveItem = function() {
                saveItem();
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

            $scope.busyIndicator = true;
            Promise.all([loadSpots, loadBoards, loadSails, loadBooms, loadMasts]).then(function() {
                if ($scope.sessionId === '0') {
                    $scope.id = 0;
                    $scope.session = prepareForNewItem($scope.userName);
                } else {
                    loadSession($scope.sessionId, $scope.userName)
                }
            });

            function loadSession(id, userName) {
                $http.get( '/api/sessions/' + userName + '/' + id ).
                then(function (result) {
                    //Success retrieving sessions
                    $scope.session = result.data;
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

            function saveItem () {
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

            function prepareForNewItem (userName) {
                var session = {};

                session.date = new Date();
                session.time = 0;
                session.updated = new Date();
                session.userName = userName;

                return session;
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
