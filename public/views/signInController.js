'use strict';

angular.module('QuotationApp.system').controller('signInController', ['$scope', '$state', function($scope, $state) {

            $scope.loginbox=true;
            $scope.loginAlert=false;
            $scope.indexId=false;

			$scope.credentials = {
				email : '',
				password : ''
			};

			$scope.login = function(credentials) {

                $scope.indexId=true;
                $scope.loginbox=false;

			}

		}]);