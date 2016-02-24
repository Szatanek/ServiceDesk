angular.module('serviceDeskApp')
    .controller('ActiveTicketsController', function($scope, UserService, TicketService){
                
        $scope.canLogTicket = function(){
            return UserService.canLogTicket();
        }
        
        var self = this;
        self.getActiveTickets = function(tickets){
            var result = [];
            for (var i = 0; i < tickets.length; i++) {
                var ticket = tickets[i];
                if (ticket.state !== 3){
                    result.push(ticket);
                }
            }
            
            $scope.tickets = result;
        }
        
        TicketService.registerTicketRefresh(self.getActiveTickets);
        TicketService.refreshTickets();
    });