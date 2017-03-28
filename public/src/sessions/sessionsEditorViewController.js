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
                    loadItem ($$routeParams.sessionId, $$routeParams.userName);
                }
            };

            $scope.saveItem = function() {
                saveItem ();
            };

            if ($scope.sessionId === '0') {
                $scope.id = 0;
                prepareForNewItem($scope.userName);
            } else {
                loadItem ($scope.sessionId, $scope.userName)
            }

            function prepareForNewItem (userName) {
                var session = {};

                session.date = new Date();
                session.updated = new Date();
                session.userName = userName;

                return session;
            };

            function loadItem (id, userName) {
                $scope.busyIndicator = true;
                $http.get( '/api/sessions/' + userName + '/' + id ).
                then(function (result) {
                    //Success
                    $scope.session = result.data;
                    $scope.dateDate = new Date($scope.session.date);
                }, function (error) {
                    //Error
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
        }
]);
