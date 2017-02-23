(function (angular) {
    var theModule = angular.
        module ('userProfile', ['ui.bootstrap', 'ui-notification']).
        config (function (NotificationProvider) {
            NotificationProvider.setOptions ({
                delay: 3000,
                startTop: 20,
                startRight: 10,
                verticalSpacing: 20,
                horizontalSpacing: 20,
                positionX: 'center',
                positionY: 'top'
            });
        });
    
    theModule.controller ('userProfileController',  [
         '$scope', '$window', '$http', 'Notification',
         function ($scope, $window, $http, Notification) {
            var urlParts = $window.location.pathname.split('/'),
                userName = urlParts[urlParts.length-1],
                userProfileUrl = '/api/user/'+userName;

            $scope.user = {};

            $scope.saveUser = function() {

                $http.post( userProfileUrl, $scope.user).
                    then(function (result) {
                        Notification.success('User successfully updated.');
                    }, function (error) {
                        Notification.error('User was not updated: ' + error.statusText);
                    }); 
            };

            $http.get(userProfileUrl).
                then(function (result) {
                    //Success
                    $scope.user = result.data;
                    $scope.user.password ='';
                    $scope.user.confirmPassword ='';
                }, function (error) {
                    //Error
                    Notification.error('Unable to get ' + userName + ' data: ' + error.statusText);
                });
        }
    ]);
})(window.angular);
