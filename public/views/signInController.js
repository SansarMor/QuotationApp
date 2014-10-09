'use strict';

angular.module('QuotationApp.system').controller('signInController', ['$scope', '$state', function($scope, $state) {
            $scope.submenu=false;
            $scope.indexId=false;
			$scope.credentials = {
				email : '',
				password : ''
			};
			$scope.loginbox=true;
			$scope.loginAlert=false;
			$scope.login = function(credentials) {
                $scope.loginbox=false;
                $scope.submenu=true;
                $scope.indexId=true;

                $state.go('index');

			}

		}]);