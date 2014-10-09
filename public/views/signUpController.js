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