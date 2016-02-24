angular.module('serviceDeskApp')
    .controller('LoginController', function($scope, $location, UserService){
        var self = this;
        $scope.data = {};
        
        $scope.authenticate = function(){
            UserService.authenticate($scope.data.login, $scope.data.password, self.authenticationCallback);
        }
        
        self.authenticationCallback = function(result, message){
            $scope.resultMessage = message;
            if (result){
                $location.path("/tab/active");
            }
        }
    });