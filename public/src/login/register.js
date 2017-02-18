(function (angular) {
    var theModule = angular.module ('register', ['ui.bootstrap']); 
    
    theModule.controller ('registerController',  [
         '$scope', '$window', '$http',
         function ($scope) {
            $scope.email = '';
            $scope.username= '';
            $scope.errorMessage;
            $scope.changedPassword = function() {
                if ($scope.confirmPassword !== $scope.password){
                    $scope.errorMessage = 'Password and confirm are not equal.';
                } else {
                    $scope.errorMessage = '';
                }
            };

        }
    ]);
})(window.angular);