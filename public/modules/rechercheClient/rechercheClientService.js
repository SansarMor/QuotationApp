'use strict';

angular.module('QuotationApp.masters').factory('rechercheClientService', function(){

    var clientDetails=[];
    return {

        getClientDetails:function(){
               return clientDetails;
        },
        setClientDetails:function(client){
            clientDetails=client;
        }
    };
});