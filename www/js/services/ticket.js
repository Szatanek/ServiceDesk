angular.module('utils')
    .service('TicketService', function(){
       var self = this;
       self.tickets = [
            {
                id: 1,
                state: 1,
                title: "First active ticket",
                description: "test description"
            },
            {
                id: 2,
                state: 2,
                title: "Critical ticket",
                alert: true
            },
            {
                id: 3,
                state: 2,
                title: "Another ticket",
            },
            {
                id: 4,
                state: 1,
                title: "Some flagged ticket",
                flag: true
            },
            {
                id: 5,
                state: 3,
                title: "First closed ticket"
            },
            {
                id: 6,
                state: 3,
                title: "Some critical closed ticket",
                alert: true
            }
        ];
      
      self.states = {};
      self.states[1] = "Open";
      self.states[2] = "In progress";
      self.states[3] = "Closed";
      
      self.ticketsRefreshCallbacks = [];
      
      self.registerTicketRefresh = function(callback){
          self.ticketsRefreshCallbacks.push(callback);
      }
      
      self.refreshTickets = function(){
          for (var i = 0; i < self.ticketsRefreshCallbacks.length; i++) {
              var callback = self.ticketsRefreshCallbacks[i];
              callback(self.tickets);
          }
      }
      
      self.updateTicket = function(updateTicket){
          for (var i = 0; i < self.tickets.length; i++) {
              var ticket = self.tickets[i];
              if (ticket.id === updateTicket.id){
                  console.log(JSON.stringify(ticket));
                  ticket = updateTicket;
                  console.log(JSON.stringify(ticket));
                  self.refreshTickets();
                  return;
              }
          }
      }
      
      self.addNewTicket = function(newTicket){
        var lastTicket = self.tickets[self.tickets.length - 1];
        newTicket.id = lastTicket.id + 1;
        newTicket.state = 1;
        self.tickets.push(newTicket);
        self.refreshTickets();
      }
    });