'use strict';

angular
    .module('mastsApp', [
        'mastsViewModule',
        'mastsEditorViewModule',
        'ngRoute',
        'simpleControls', //WaitCursor
        'smart-table', //Grids
        'ui-notification'])

    .config(['$locationProvider', '$routeProvider', 'NotificationProvider',
        function ($locationProvider, $routeProvider, NotificationProvider) {

            $locationProvider.hashPrefix('');
            $routeProvider.
                when('/:userName', {
                    controller: 'mastsViewController',
                    templateUrl: '/templates/materials/masts/masts.html'
                }).

                when('/mastsEditor/:userName/:mastId', {
                    controller: 'mastsEditorViewController',
                    templateUrl: '/templates/materials/masts/mastsEditor.html'
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