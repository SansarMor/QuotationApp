'use strict';

angular.module('QuotationApp.masters').controller('clientQuoteEditCatalogueController',['$rootScope','rechercheClientService', '$scope', '$http', function($rootScope, rechercheClientService, $scope, $http) {

    console.dir($scope.selectedEditCatalogueItem);

    $scope.editItemsList=[];

    for(var i=0;i< $scope.selectedEditCatalogueItem.qteTotal;i++){

        $scope.editItem={
            batiment:'',
            etage:'',
            emplacement:'',
            pose:true,
            recyclage:false,
            supprimer:false
        }
        $scope.editItemsList.push($scope.editItem);
    }

    $scope.updateSelectedItems=function(editItemsList){

        $rootScope.$broadcast('catalogueUpdatedItemsSavedList', $scope.selectedEditCatalogueItem);
    }

}]);