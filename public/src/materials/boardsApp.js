(function () {
    angular.
        module('boardsApp', [
            'ngRoute',
            'smart-table', //Grids
            'ui-notification'
        ]).
        config(['$locationProvider', '$routeProvider', 'NotificationProvider',
            function ($locationProvider, $routeProvider, NotificationProvider) {

                $locationProvider.hashPrefix('!');
                $locationProvider.html5Mode(true);
                $routeProvider.
                    when('/', {
                        controller: 'boardsView',
                        controllerAs: 'vm',
                        templateUrl: '/views/materials/boards/boards.vash'
                    }).

                    when('/editor/:boardId', {
                        controller: 'boardsEditorView',
                        controllerAs: 'vm',
                        templateUrl: '/views/materials/boards/boardsEditor.vash'
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
})();