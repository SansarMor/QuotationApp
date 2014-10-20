'use strict';

angular.module('QuotationApp.masters').controller('clientContactsController',['$scope','$http','rechercheClientService', function($scope, $http, rechercheClientService){

    console.log('inside client contacts controller');

    $scope.contactListDiv=true;
    $scope.addContactDiv=false;

    $scope.clientDetails=rechercheClientService.getClientDetails();

    $http.get('crud/client/contacts/').success(function(data){
        console.log('client contacts are : ');
        console.dir(data);
        $scope.clientContacts=data;

    });

    $scope.addContact=function(){
        $scope.contactListDiv=false;
        $scope.addContactDiv=true;
        console.log('add contact function');
        $scope.clientBodyURL='modules/client/facturation/views/facturation.html';
    }

    $scope.cancel=function(){
        $scope.contactListDiv=true;
        $scope.addContactDiv=false;
    }
}]);