'use strict';

angular
    .module('sessionsApp', [
        'sessionsViewModule',
        'sessionsEditorViewModule',
        'ngRoute',
        'simpleControls', //WaitCursor
        'smart-table', //Grids
        'ngMap',
        'ui-notification'])

    .config(['$locationProvider', '$routeProvider', 'NotificationProvider',
        function ($locationProvider, $routeProvider, NotificationProvider) {

            $locationProvider.hashPrefix('');
            $routeProvider.
                when('/:userName', {
                    controller: 'sessionsViewController',
                    templateUrl: '/templates/sessions/sessions.html'
                }).

                when('/sessionsEditor/:userName/:sessionId', {
                    controller: 'sessionsEditorViewController',
                    templateUrl: '/templates/sessions/sessionsEditor.html'
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
    ])

    .filter ('secondsToDateTime', function() {
        return function(seconds) {
            return new Date(0, 0, 0).setSeconds(seconds)
        };
    });