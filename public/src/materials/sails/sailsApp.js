'use strict';

angular
    .module('sailsApp', [ 
        'sailsViewModule', 
        'sailsEditorViewModule', 
        'ngRoute', 
        'ui-notification'])

    .config(['$locationProvider', '$routeProvider', 'NotificationProvider',
        function ($locationProvider, $routeProvider, NotificationProvider) {

            $locationProvider.hashPrefix('');
            $routeProvider.
                when('/', {
                    controller: 'sailsViewController',
                    templateUrl: '/templates/materials/sails/sails.html'
                }).

                when('/sailsEditor/:userName/:boardId', {
                    controller: 'sailsEditorViewController',
                    templateUrl: '/templates/materials/sails/sailsEditor.html'
                }).

                otherwise({
                    redirectTo: '/'
                });
        }
    ]);
