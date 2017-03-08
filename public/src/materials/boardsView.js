(function(angular) {
    angular
        .module ('boardsView', ['ui.bootstrap', 'smart-table'])
        .controller ('boardsViewController',  [
         '$scope', '$window', '$http',
         function ($scope, $window, $http) {

            var urlParts = $window.location.pathname.split('/'),
                userName = urlParts[urlParts.length-1],
                url = '/api/boards/' + userName;

            $http.get(url).
                then(function (result) {
                    //Success
                    $scope.boards = result.data;
                }, function (error) {
                    //Error
                    alert (error);
                });

        }
    ]);


})(window.angular);