'use strict';

angular.module('QuotationApp.system').controller('HeaderController', ['$scope', function($scope) {
	
	console.log('inside Header Controller');
        $scope.menu = [{
            'title': 'Home',
            'state': 'HOME'
        },{
            'title': 'Dashboard',
            'state': 'DASHBOARD'
        }/*,{
            'title': 'MyProfile',
            'state': 'MYPROFILE'
        }*/];

        $scope.isCollapsed = true;
    }
]);
