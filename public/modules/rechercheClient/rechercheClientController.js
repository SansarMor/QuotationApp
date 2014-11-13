'use strict';

angular.module('QuotationApp.masters').controller('rechercheClientController', ['$rootScope','$scope','$http','rechercheClientService', function($rootScope, $scope, $http, rechercheClientService){

    $scope.moreCriteriaDiv=false;
    $http.get('crud/clients').success(function(data){
        console.log('customer data is : ');
        console.dir(data);
        $scope.clientList=[];
        $scope.clientList=data;
    });

    $scope.clientDetails=function(client){

        rechercheClientService.setClientDetails(client);

        $rootScope.$broadcast('clientDetails',client);

    };

    $scope.showMoreCriteriaDiv=function(){
        $scope.moreCriteriaDiv=!$scope.moreCriteriaDiv;
    };

    $scope.searchMoreCriteria=function(){
        console.log('inside search more criteria function');
        console.log('client id is :- '+$scope.client.AN8);
        console.log('client name is :- '+$scope.client.corporate_name);
    }

    $scope.modalShown = false;
    $scope.toggleModal = function() {
        console.log('inside toggleModal function');
        $scope.modalShown = !$scope.modalShown;
    };

}]);