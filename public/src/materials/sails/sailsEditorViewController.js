'use strict';

angular
    .module ('sailsEditorViewModule', [
        'ui.bootstrap', 
        'smart-table'])

    .controller ('sailsEditorViewController', [
        '$scope', 
        '$window', 
        '$http',
        function ($scope, $window, $http) {

            $scope.message = 'A sail data must be here.(NEW)';
        }
    ]);