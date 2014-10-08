'use strict';

angular.module('QuotationApp.system').controller('signUpController', ['$scope', 'AUTH_EVENTS', '$rootScope', 'AuthService', '$http', function($scope,AUTH_EVENTS,$rootScope, AuthService, $http) {
	
	$scope.userInfo = {
			email: '',
			firstName: '',
			lastName: '',
			password: '',
			role: 'Guest'
		  };
	
	$scope.signupalert=false;
	$scope.mailCheckAlert=false;
	
	 $scope.signup = function (userInfo) {
		 /*var checkEmail=false;
		 $http.get('sapience/users/'+userInfo.email).success(function(data) {
					
					$scope.usersForMailCheck=[];
					$scope.usersForMailCheck=data;
					$scope.usersForMailCheck.forEach(function(user){
						console.log('inside for loop');
						checkEmail=true;
		    		});
					if(checkEmail==false){
						console.log('inside false');
						AuthService.signup(userInfo).then(function () {
						    console.log('inside signup controller successful function : ');
						    $scope.signupalert=true;
						    $scope.mailCheckAlert=false;
						    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
						    
						    }, function () {
						    	console.log('inside signup controller failer function : ');
						      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
						    })
						
					}
					else{
						$scope.mailCheckAlert=true;
						$scope.signupalert=false;
						console.log('inside true');
					}
					
				  })
		 
		    ;*/
		  };
		  
		  $scope.createProfile=function(userInfo){
			  AuthService.signup(userInfo).then(function () {
				    console.log('inside signup controller successful function : ');
				    $scope.signupalert=true;
				    $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				    
				    }, function () {
				    	console.log('inside signup controller failer function : ');
				      $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				    })
		  };
    }
]);