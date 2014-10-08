'use strict';

angular.module('QuotationApp.system').controller('signInController', ['$scope','$http', '$rootScope', 'AUTH_EVENTS','AuthService', function($scope, $http, $rootScope, AUTH_EVENTS, AuthService) {
			$scope.credentials = {
				email : '',
				password : ''
			};
			
			$scope.loginbox=true;
			$scope.loginAlert=false;
			$scope.indexId=false;
			$scope.login = function(credentials) {
				console.log('credentials email is : '+credentials.email);
				$http.get('crud/users/',credentials).success(function (data) {
					console.log('Hit detected successfully');
				});
				
			/*	$http.get('sapience/users/'+credentials.email+'/'+credentials.password).success(function(data) {
					
					console.log('checking indexId is : '+$scope.sect);
					
					$scope.userData=[];
					$scope.userData=data;
					$scope.userData.forEach(function(user){
						console.log('inside for loop');
						$scope.indexId=true;
						$scope.loginbox=false;
						$scope.userSession=user;
		    		});
					
					if($scope.userSession==undefined){
						$scope.loginAlert=true;
					console.log('user session data is : '+ $scope.userSession);
					}
				    	
				  })
			*/}
			
			/*isAuthenticated: function () {
			      return !!Session.userId;
			 },
			 
			 isAuthorized: function (authorizedRoles) {
			 if (!angular.isArray(authorizedRoles)) {
			       authorizedRoles = [authorizedRoles];
			   }
			     return (this.isAuthenticated() && authorizedRoles.indexOf(Session.userRole) !== -1);
			 }*/
			
			/*$scope.login = function (credentials) {
			    AuthService.login(credentials).then(function () {
			      $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			    }, function () {
			      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			    });
			  };*/
			
		}]);