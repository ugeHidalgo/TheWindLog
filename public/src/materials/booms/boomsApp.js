'use strict';

angular
    .module('boomsApp', [
        'boomsViewModule',
        'boomsEditorViewModule',
        'ngRoute',
        'simpleControls', //WaitCursor
        'smart-table', //Grids
        'ui-notification'])

    .config(['$locationProvider', '$routeProvider', 'NotificationProvider',
        function ($locationProvider, $routeProvider, NotificationProvider) {

            $locationProvider.hashPrefix('');
            $routeProvider.
                when('/:userName', {
                    controller: 'boomsViewController',
                    templateUrl: '/templates/materials/booms/booms.html'
                }).

                when('/boomsEditor/:userName/:boomId', {
                    controller: 'boomsEditorViewController',
                    templateUrl: '/templates/materials/booms/boomsEditor.html'
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