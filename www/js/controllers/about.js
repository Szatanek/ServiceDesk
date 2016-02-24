angular.module('serviceDeskApp')
    .controller('AboutController', function($scope, UserService){
        
        $scope.canLogTicket = function(){
            return UserService.canLogTicket();
        }
    });