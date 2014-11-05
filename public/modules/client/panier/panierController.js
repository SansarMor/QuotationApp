'use strict';

angular.module('QuotationApp.masters').controller('ClientPanierController',['$rootScope','$scope', '$http', 'rechercheClientService', function($rootScope, $scope, $http, rechercheClientService){




    $scope.initFunction=function(){
        $scope.actualPanierList=[];
        $scope.actualPanier={
            QuotationParagraph_id : '',
            Quotation_id : '',
            Site_id: '',
            Site_name: '',
            SubSite_id:'',
            SubSite_name:'',
            Description: '',
            Date_Created: '',
            StatusFlag:'',
            SyncTimesstamp:''
        };
        console.log('inside init function');
        $http.get('crud/client/Quote/Panier/' + $scope.currentQuote.Quotation_id).success(function (data) {
            console.log('Quote Panier list : ');
            console.dir(data);
            $scope.panierList=data;
            $scope.panierList.forEach(function(panier, index){
                    $scope.actualPanier.QuotationParagraph_id=panier.QuotationParagraph_id;
                    $scope.actualPanier.Quotation_id=panier.Quotation_id;
                    $scope.actualPanier.Site_id=panier.Site_id;
                    $scope.actualPanier.SubSite_id=panier.SubSite_id;
                    $scope.actualPanier.Description=panier.Description;
                    $scope.actualPanier.Date_Created=panier.Date_Created;
                    $scope.actualPanier.StatusFlag=panier.StatusFlag;
                    $scope.actualPanier.SyncTimesstamp=panier.SyncTimesstamp;
                    $scope.clientSites.forEach(function(clientSite,index){
                       if(clientSite.id == panier.Site_id){
                           $scope.actualPanier.Site_name=clientSite.MLNM;
                       }
                    });
                    $scope.clientSubSites.forEach(function(clientSubSite,index){
                        if(clientSubSite.id == panier.SubSite_id){
                            $scope.actualPanier.SubSite_name=clientSubSite.MLNM;
                        }
                    });
                $scope.actualPanierList.push($scope.actualPanier);
            });
        });
    };

    $scope.divAddParagraph=false;
    $scope.divPanier=true;

    $scope.addParagraph=function(){
        $scope.divAddParagraph=true;
        $scope.divPanier=false;
    }

    $scope.cancelParagraph=function(){
        $scope.divAddParagraph=false;
        $scope.divPanier=true;
    }

    $scope.fetchedSubSiteList=[];

    $scope.paragraphDescription='';
    $scope.fetchSubSites=function(site){
        $("#siteId").text(site.MLNM);

        $scope.selectedSite=site.id;

        $scope.clientSubSites.forEach(function(subSite, index){

            if(site.id==subSite.Site_Id){
                $scope.fetchedSubSiteList.push(subSite);
            }
        });
    }

    $scope.selectedSubSite='';
    $scope.subSiteSelected=function(subSite){
        $("#subSiteId").text(subSite.id);
        $scope.selectedSubSite=subSite.id;
    }

    $scope.registerParagraph=function(){
        console.log('description is : '+$scope.paragraphDescription);
        console.log('current Quote id is : '+$scope.currentQuote.Quotation_id);
        if($scope.selectedSubSite==''){
            console.log('inside if condition');
            $http.get('crud/client/Quote/saveQuoteParagraph/' + $scope.currentQuote.Quotation_id + '/' + $scope.selectedSite + '/null/' + $scope.paragraphDescription).success(function (data) {
                console.log('quote paragraph saved');
                console.dir(data);
                $scope.initFunction();
                $scope.divAddParagraph=false;
                $scope.divPanier=true;
            });
        }else {
            console.log('inside else condition');
            $http.get('crud/client/Quote/saveQuoteParagraph/' + $scope.currentQuote.Quotation_id + '/' + $scope.selectedSite + '/' + $scope.selectedSubSite + '/' + $scope.paragraphDescription).success(function (data) {
                console.log('quote paragraph saved');
                console.dir(data);
                $scope.initFunction();
                $scope.divAddParagraph=false;
                $scope.divPanier=true;
            });
        }

    }

}]);