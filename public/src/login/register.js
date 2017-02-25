(function (angular) {
    var theModule = angular.
                    module ('register', ['ui.bootstrap', 'ui-notification']).
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
    
    theModule.controller ('registerController',  [
         '$scope', '$window', '$http', 'Notification',
         function ($scope, $window, $http, Notification) {
            var urlParts = $window.location.pathname.split('/'),
                userName = urlParts[urlParts.length-1],
                userProfileUrl = '/api/user/'+userName;

            $scope.email = '';
            $scope.username= '';
            $scope.errorMessage;

            $scope.changedPassword = function() {
                var pass = $scope.password,
                    confirm = $scope.confirmPassword;

                if ( pass.length != confirm.length || pass !== confirm ) {
                    $scope.errorMessage = 'Password and confirm are not equal.';
                } else {
                    $scope.errorMessage = '';
                }
            };

            $scope.saveUser = function() {
                if ( $scope.password !== $scope.confirmPassword ) {
                    $scope.errorMessage = 'Password and confirm are not equal.';
                    Notification.error('User was not updated: Password and confirm are not equal. ');
                    return;
                }
                $http.post( userProfileUrl, $scope.user ).
                    then(function (result) {
                        Notification.success('User successfully updated.');
                    }, function (error) {
                        Notification.error('User was not updated: ' + error.statusText);
                    }); 
            };
        }
    ]);
})(window.angular);