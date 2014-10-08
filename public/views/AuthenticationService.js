'use strict';

angular.module('QuotationApp.system').factory('AuthService', function ($http) {
	  return {
		  
		  /*signup: function (userInfo) {
		      return $http
		        .post('sapience/users', userInfo)
		        .then(function () {
		        	$scope.signupalert=true;
		        	console.log('inside method after saving data');
		        	
		          Session.create(res.id, res.userid, res.role);
		        })
		    }*/
		   /* isAuthenticated: function () {
		      return !!Session.userId;
		    },
		    isAuthorized: function (authorizedRoles) {
		      if (!angular.isArray(authorizedRoles)) {
		        authorizedRoles = [authorizedRoles];
		      }
		      return (this.isAuthenticated() &&
		        authorizedRoles.indexOf(Session.userRole) !== -1);
		    }*/
		  };
		})