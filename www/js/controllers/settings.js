angular.module('serviceDeskApp')
    .controller('SettingsController', function($scope, UserService){
        $scope.canLogTicket = function(){
            return UserService.canLogTicket();
        }
    });