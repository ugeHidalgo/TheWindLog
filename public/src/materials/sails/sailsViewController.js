'use strict';

angular
    .module ('sailsViewModule', [])

    .controller ('sailsViewController', [
        '$scope', 
        function ($scope) {

            $scope.message = 'A sails list must be here.(NEW)';
        }
    ]);