'use strict';

angular.module('QuotationApp.system').controller('signInController', ['$http', '$scope', '$state', function($http, $scope, $state) {

            $scope.loginbox=true;
            $scope.loginAlert=false;
            $scope.indexId=false;

			$scope.credentials = {
				email : '',
				password : ''
			};

			$scope.login = function(credentials) {

                $http.get('quotationApp/createDatabaseConnection/').success(function (data) {
                   console.log('database connection established');
                    $scope.indexId=true;
                    $scope.loginbox=false;
                });
			}

		}]);