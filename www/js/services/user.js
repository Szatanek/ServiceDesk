angular.module('utils')
    .service('UserService', ['$http', function($http){
        var self = this;
        self.isAuthenticated = false;
        self.user = {};
        
        self.authenticate = function(login, password, callback){
            if (!login){
                callback(false, 'Login is empty');
                return;
            }
            
            if (!password){
                callback(false, 'Password is empty');
                return;
            }
                        
            authenticateUser(login, password, callback);
        }
        
        self.canLogTicket = function(){
            return self.isAuthenticated &&
                self.user &&
                self.user.isClient;
        }
        
        self.canUpdateTicket = function(){
            return self.isAuthenticated &&
                self.user &&
                self.user.isAdmin;
        }
        
        function authenticateUser(login, password, callback){
            if (login === 'Test' && password === '1234'){
                self.isAuthenticated = true;
                self.user = {
                    id: 1,
                    firstName: "Miłosz",
                    lastName: "Wieczorek",
                    isClient: true
                };
                
                callback(true);
                return;
            }
            
            if (login === 'Admin' && password === '1234'){
                self.isAuthenticated = true;
                self.user = {
                    id: 1,
                    firstName: "Norbert",
                    lastName: "Wieczorek",
                    isAdmin: true
                };
                
                callback(true);
                return;
            }
        }
    }]);