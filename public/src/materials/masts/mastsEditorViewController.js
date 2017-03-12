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

            if ($scope.mastId === '0') {

            } else {
                $http.get( '/api/masts/' + $scope.userName+ '/' + $scope.mastId ).
                    then(function (result) {
                        //Success
                        $scope.mast = result.data;
                    }, function (error) {
                        //Error
                        alert ('Failed to get selected mast: ' + error);
                    });
            }
        }
]);