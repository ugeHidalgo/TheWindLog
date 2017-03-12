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

            if ($scope.boardId === '0') {

            } else {
                $http.get( '/api/boards/' + $scope.userName+ '/' + $scope.boardId ).
                then(function (result) {
                    //Success
                    $scope.board = result.data;
                }, function (error) {
                    //Error
                    alert ('Failed to get selected board: ' + error);
                });
            }
        }
]);