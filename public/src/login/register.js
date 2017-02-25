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
 
            $scope.email = '';
            $scope.username= '';
            $scope.errorMessage;

            $scope.changedPassword = function() {
                var pass = $scope.user.password,
                    confirm = $scope.user.confirmPassword;
                    
                $scope.passwordErrorMessage = '';

                if ( pass.length != confirm.length || pass !== confirm ) {
                    $scope.passwordErrorMessage = 'Password and confirm are not equal.';
                }
            };

            $scope.saveUser = function() {
                $scope.usernameErrorMessage = '';
                $scope.passwordErrorMessage = '';

                if ( $scope.user.password !== $scope.user.confirmPassword ) {
                    $scope.passwordErrorMessage = 'Password and confirm are not equal.';
                    Notification.error('User was not updated: Password and confirm are not equal. ');
                    return;
                }

                $http.post( '/login/register', $scope.user ).
                    then(function (result) {
                        Notification.success('User "' + result.data.username + '" successfully created.');
                    }, function (error) {
                        $scope.usernameErrorMessage = error.data;
                        Notification.error('User "' + $scope.user.username + '" was not created : ' + error.data);
                    }); 
            };
        }
    ]);
})(window.angular);