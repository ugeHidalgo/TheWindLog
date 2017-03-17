'use strict';

angular
    .module('boardsApp', [
        'boardsViewModule',
        'boardsEditorViewModule',
        'ngRoute',
        'simpleControls', //WaitCursor
        'smart-table', //Grids
        'ui-notification'])

    .config(['$locationProvider', '$routeProvider', 'NotificationProvider',
        function ($locationProvider, $routeProvider, NotificationProvider) {

            $locationProvider.hashPrefix('');
            $routeProvider.
                when('/:userName', {
                    controller: 'boardsViewController',
                    templateUrl: '/templates/materials/boards/boards.html'
                }).

                when('/boardsEditor/:userName/:boardId', {
                    controller: 'boardsEditorViewController',
                    templateUrl: '/templates/materials/boards/boardsEditor.html'
                }).

                otherwise({
                    redirectTo: '/'
                });

            NotificationProvider.setOptions({
                delay: 3000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'center',
                positionY: 'top'
            });
        }
    ]);