'use strict';

angular
    .module('sailsApp', [ 
        'sailsViewModule', 
        'sailsEditorViewModule', 
        'ngRoute',
        'simpleControls', //WaitCursor
        'smart-table', //Grids
        'ui-notification'])

    .config(['$locationProvider', '$routeProvider', 'NotificationProvider',
        function ($locationProvider, $routeProvider, NotificationProvider) {

            $locationProvider.hashPrefix('');
            $routeProvider.
                when('/:userName', {
                    controller: 'sailsViewController',
                    templateUrl: '/templates/materials/sails/sails.html'
                }).

                when('/sailsEditor/:userName/:sailId', {
                    controller: 'sailsEditorViewController',
                    templateUrl: '/templates/materials/sails/sailsEditor.html'
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
