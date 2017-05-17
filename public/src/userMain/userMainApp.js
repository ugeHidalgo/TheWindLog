'use strict';

angular
    .module('userMainApp', [
        'userMainStatsViewModule',
        'ngRoute',
        'd3Charts',
        'simpleControls', //WaitCursor
        'ui-notification'])

    .config(['$locationProvider', '$routeProvider', 'NotificationProvider',
        function ($locationProvider, $routeProvider, NotificationProvider) {

            $locationProvider.hashPrefix('');
            $routeProvider.
                when('/userMain/:userName', {
                    controller: 'userMainStatsViewController',
                    templateUrl: '/templates/userMain/userMainStats.html'
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