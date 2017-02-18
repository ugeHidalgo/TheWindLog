(function (angular) {
    var theModule = angular.module ('userProfile', ['ui.bootstrap']); 
    
    theModule.controller ('userProfileController',  [
         '$scope', '$window', '$http',
         function ($scope, $window, $http) {
            var urlParts = $window.location.pathname.split('/'),
                userName = urlParts[urlParts.length-1],
                userProfileUrl = '/api/user/'+userName;

            $scope.notes = [];
            $scope.colors= ['yellow', 'blue', 'orange', 'green'];
            $scope.user = {};
            $scope.changePassword = function() {
                alert ('Change password.');
            };

            $http.get(userProfileUrl).
                then(function (result) {
                    //Success
                    $scope.user = result.data;
                }, function (error) {
                    //Error
                    alert (error);
                });
        }
    ]);
})(window.angular);
