'use strict';

angular
    .module('spotsApp', [
        'spotsViewModule',
        'spotsEditorViewModule',
        'spotsStatsViewModule',
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
                    controller: 'spotsViewController',
                    templateUrl: '/templates/spots/spots.html'
                }).

                when('/spotsEditor/:userName/:spotId', {
                    controller: 'spotsEditorViewController',
                    templateUrl: '/templates/spots/spotsEditor.html'
                }).

                when('/spotsStats/:userName', {
                    controller: 'spotsStatsViewController',
                    templateUrl: '/templates/spots/spotsStats.html'
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