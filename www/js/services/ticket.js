angular.module('utils')
    .service('TicketService', function(){
       var self = this;
       self.tickets = [
            {
                id: 1,
                state: 1,
                title: "MS Sql Server 2008 R2",
                description: "Proszę o zainstalowanie MS Sql Server 2008 R2 na serwerze."
            },
            {
                id: 2,
                state: 2,
                title: "Pilne! Zainstlować Windows 7",
                description: "Proszę o pilne zainstalowanie Windows 7 na komputerach.",
                alert: true
            },
            {
                id: 4,
                state: 1,
                title: "Nie działa",
                description: "Aplikacja nie działa, proszę o pilny kontakt",
                flag: true
            },
            {
                id: 5,
                state: 3,
                title: "Dodanie użytkownika",
                description: "Proszę o utworzenie konta dla użytkownika Jan Kowalski",
                comments: [
                    "Konto zostało utworzone."   
                ]
            },
            {
                id: 6,
                state: 3,
                title: "Problem z zalogowaniem",
                description: "Użytkownik Grzegorz Brzęczyszczykiewicz nie może się zalogować. Proszę o rozwiązanie problemu.",
                alert: true,
                comments: [
                    "Hasło użytkownika zostało zresetowane."
                ]
            }
        ];
      
      self.states = {};
      self.states[1] = "Otwarte zgłoszenie";
      self.states[2] = "W trakcie realizacji";
      self.states[3] = "Zamknięte zgłoszenie";
      
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
                  ticket = updateTicket;
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