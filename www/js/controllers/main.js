angular.module('serviceDeskApp')
    .controller('MainController', function($scope, $location, $ionicPopup, UserService, TicketService){
        $scope.newTicket = new utils.Ticket();
        $scope.data = {};
        
        $scope.logTicket = function(){
            TicketService.addNewTicket($scope.newTicket);
            $scope.clearTicket();
            $location.path("/tab/active");
        }
        
        $scope.clearTicket = function(){
            $scope.newTicket = new utils.Ticket();
            $scope.validationError = "";
            $scope.solution = "";
            $scope.data = {};
        }
        
        $scope.setTicketDetails = function(ticket){
            $scope.ticketDetails = ticket;
        }
        
        $scope.isAuthenticated = function(){
            return UserService.isAuthenticated;
        }
        
        $scope.getUserName = function(){
            return UserService.user.firstName;
        }
        
        $scope.isReadonly = function(){
            return !UserService.canUpdateTicket();
        }
        
        $scope.canStartTicket = function(){
            return UserService.canUpdateTicket() &&
                $scope.ticketDetails.state === 1;
        }
        
        $scope.canCompleteTicket = function(){
            return UserService.canUpdateTicket() &&
                $scope.ticketDetails.state === 2;
        }
        
        $scope.getState = function(){
            if ($scope.ticketDetails){
                return TicketService.states[$scope.ticketDetails.state];
            }
        }
        
        $scope.moveToInProgress = function(){
            $scope.ticketDetails.state = 2;
            TicketService.updateTicket($scope.ticketDetails);
            $location.path("/tab/active");
        } 
        
        $scope.completeTicket = function(){
            if (!$scope.ticketDetails.solution){
                $scope.validationError = "Aby zakończyć zgłoszenie należy wpisać rozwiązanie.";
                return;
            }
            
            addComment($scope.ticketDetails, $scope.ticketDetails.solution);
            $scope.ticketDetails.solution = "";
            $scope.validationError = "";
            $scope.ticketDetails.state = 3;
            TicketService.updateTicket($scope.ticketDetails);
            $location.path("/tab/active");
        }
        
        $scope.addComment = function(){
            $ionicPopup.show({
                template: '<textarea rows="4" ng-model="data.comment"></textarea>',
                title: 'Enter comment',
                scope: $scope,
                buttons: [
                { 
                    text: 'Cancel' 
                },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        console.log($scope);
                        if (!$scope.data.comment) {
                            e.preventDefault();
                        } else {
                            return $scope.data.comment;
                        }
                    }
                }]
            })
            .then(function(result){
                console.log('Result: ' + result);
                if (result){
                    if ($scope.ticketDetails.comments){
                        $scope.ticketDetails.comments.push($scope.data.comment);
                    } else {
                        $scope.ticketDetails.comments = [
                            $scope.data.comment
                        ];
                    }
                    
                    $scope.data.comment = "";
                    TicketService.updateTicket($scope.ticketDetails);
                }
            });
        }
        
        function addComment(ticket, comment){
            if (!ticket.comments){
                ticket.comments = [];
            }
            
            ticket.comments.push(comment);
        }
});

var utils = {
    Ticket: function (title, description, comments){
        var self = this;
        self.title = title ? title : "";
        self.description = description ? description : "";
        self.comments = comments ? comments : [];
    }
}
    