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

            $http.get( '/api/sails/' + $scope.userName+ '/' + $scope.sailId ).
                then(function (result) {
                    //Success
                    $scope.sail = result.data;
                }, function (error) {
                    //Error
                    alert (error);
                });
        }
    ]);