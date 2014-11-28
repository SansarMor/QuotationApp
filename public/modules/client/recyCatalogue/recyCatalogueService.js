'use strict';

angular.module('QuotationApp.masters').factory('clientQuoteRecyCatalogueService', function($http, $rootScope) {

    var clientQuoteRecyCatalogueService= {
        saveRecySelectedItems:function(selectedRecyItemsList, selectedQuoteParagraphId, allItemsList){
        var checkingVariable='';
        var i=0;
        var itemListForQPP=[];
        var length=selectedRecyItemsList.length;
        saveRecyCatLoop(i, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
        return checkingVariable;
        }
    }
    function saveRecyCatLoop(i, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP){
        var indexNo=i;
        if (i < length) {

            var selectedRecyItem=selectedRecyItemsList[i];
            var quotePP={
                selectedQuoteParagraphId:selectedQuoteParagraphId,
                itemId:'',
                quantityT:'',
                quantityA:0,
                quantityR:'',
                statusFlag:1
            }

            var quotePPD={
                selectedQuoteParaProdId:'',
                building:selectedRecyItem.recyItem.Y56INDLA,
                floor:selectedRecyItem.recyItem.Y56ETAG,
                location:selectedRecyItem.recyItem.Y56EMPLA,
                install:1,
                recycle:1,
                isReplacement:0,
                statusFlag:0
            }
            if(itemListForQPP.length==0){
                allItemsList.forEach(function(item,index){
                    if(item.ITM == selectedRecyItem.recyItem.ITM){
                        quotePP.itemId=item.id;
                        quotePP.quantityT=1;
                        quotePP.quantityR=1;
                        itemListForQPP.push(quotePP);

                        $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePP.itemId).success(function(isFirstItemExists) {

                            if(isFirstItemExists.length == '0') {

                                $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePP).success(function (data) {
                                    console.log('well done , initial data saved is : ' + data[0]);

                                    quotePPD.selectedQuoteParaProdId = data[0].QuotationParagraphProduct_id;

                                    $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', quotePPD).success(function (data) {

                                        $http.get('crud/client/Quote/Catalogue/Items/fetchRecycleComponentItems/' + selectedRecyItem.usual_Code).success(function (data) {

                                            var quotePPForFetchItem = angular.copy(quotePP);
                                            quotePPForFetchItem.itemId = data[0].id;
                                            quotePPForFetchItem.statusFlag = 0;

                                            $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/' + selectedQuoteParagraphId + '/' + quotePPForFetchItem.itemId).success(function (QPPdata) {

                                                if (QPPdata.length == 0) {

                                                    $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePPForFetchItem).success(function (data) {

                                                        console.log('well done recycle item saved in QPP');

                                                        $http.get('crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/' + selectedRecyItem.usual_Code).success(function (installItemdata1) {

                                                            var quotePPForInstallItem = angular.copy(quotePP);
                                                            quotePPForInstallItem.itemId = installItemdata1[0].id;
                                                            quotePPForInstallItem.statusFlag = 0;
                                                            $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/' + selectedQuoteParagraphId + '/' + quotePPForInstallItem.itemId).success(function (instItemQPPdataInRec) {

                                                                if (instItemQPPdataInRec.length == 0) {

                                                                    $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePPForInstallItem).success(function (data) {
                                                                        console.log('well done install item saved in QPP');
                                                                        if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                            checkingVariable = 'done';
                                                                            $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                        } else {
                                                                            ++indexNo;
                                                                            saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                        }
                                                                    });
                                                                }
                                                                else {
                                                                    var quotePP1 = angular.copy(quotePPForInstallItem);
                                                                    quotePP1.quantityT = parseInt(quotePP1.quantityT) + parseInt(instItemQPPdataInRec[0].Quantity_Total);
                                                                    quotePP1.quantityA = parseInt(quotePP1.quantityA) + parseInt(instItemQPPdataInRec[0].Quantity_Additional);
                                                                    quotePP1.quantityR = parseInt(quotePP1.quantityR) + parseInt(instItemQPPdataInRec[0].Quantity_Replaced);

                                                                    $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP1).success(function (data) {
                                                                        console.log('well done install item updated in QPP');
                                                                        if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                            checkingVariable = 'done';
                                                                            $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                        } else {
                                                                            ++indexNo;
                                                                            saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        });

                                                    });
                                                } else {
                                                    var quotePP11 = angular.copy(quotePPForFetchItem);
                                                    quotePP11.quantityT = parseInt(quotePP11.quantityT) + parseInt(QPPdata[0].Quantity_Total);
                                                    quotePP11.quantityA = parseInt(quotePP11.quantityA) + parseInt(QPPdata[0].Quantity_Additional);
                                                    quotePP11.quantityR = parseInt(quotePP11.quantityR) + parseInt(QPPdata[0].Quantity_Replaced);

                                                    $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP11).success(function (data) {
                                                        console.log('well done recycle item updated in QPP');

                                                        $http.get('crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/' + selectedRecyItem.usual_Code).success(function (installItemdata2) {

                                                            var quotePPForInstallItem = angular.copy(quotePPForFetchItem);
                                                            quotePPForInstallItem.itemId = installItemdata2[0].id;
                                                            quotePPForInstallItem.statusFlag = 0;
                                                            $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/' + selectedQuoteParagraphId + '/' + quotePPForInstallItem.itemId).success(function (instItemQPPdataInRec) {

                                                                if (instItemQPPdataInRec.length == 0) {

                                                                    $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePPForInstallItem).success(function (data) {
                                                                        console.log('well done install item saved in QPP');
                                                                        if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                            checkingVariable = 'done';
                                                                            $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                        } else {
                                                                            ++indexNo;
                                                                            saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                        }
                                                                    });
                                                                }
                                                                else {
                                                                    var quotePP2 = angular.copy(quotePPForInstallItem);
                                                                    quotePP2.quantityT = parseInt(quotePP2.quantityT) + parseInt(instItemQPPdataInRec[0].Quantity_Total);
                                                                    quotePP2.quantityA = parseInt(quotePP2.quantityA) + parseInt(instItemQPPdataInRec[0].Quantity_Additional);
                                                                    quotePP2.quantityR = parseInt(quotePP2.quantityR) + parseInt(instItemQPPdataInRec[0].Quantity_Replaced);

                                                                    $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP2).success(function (data) {
                                                                        console.log('well done install item updated in QPP');
                                                                        if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                            checkingVariable = 'done';
                                                                            $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                        } else {
                                                                            ++indexNo;
                                                                            saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        });
                                                    });
                                                }

                                            });

                                        });

                                    });

                                });
                            }else{
                                var existingItem={
                                    selectedQuoteParagraphId:selectedQuoteParagraphId,
                                    itemId:0,
                                    quantityT:0,
                                    quantityA:0,
                                    quantityR:0,
                                    statusFlag:1
                                }

                                console.log('existing item initial is : ');
                                console.dir(existingItem);
                                existingItem.itemId= isFirstItemExists[0].Item_id;
                                existingItem.quantityT=parseInt(existingItem.quantityT) + parseInt(quotePP.quantityT);
                                existingItem.quantityA=parseInt(existingItem.quantityA) + parseInt(quotePP.quantityA);
                                existingItem.quantityR=parseInt(existingItem.quantityR) + parseInt(quotePP.quantityR);
                                console.dir(existingItem);
                                $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/',existingItem).success(function(data){

                                    quotePPD.selectedQuoteParaProdId=data[0].QuotationParagraphProduct_id;

                                    $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', quotePPD).success(function(data){

                                        $http.get('crud/client/Quote/Catalogue/Items/fetchRecycleComponentItems/'+selectedRecyItem.usual_Code).success(function(data){

                                            var quotePPForRecyItem1=angular.copy(quotePP);
                                            quotePPForRecyItem1.itemId=data[0].id;
                                            quotePPForRecyItem1.statusFlag=0;
                                            quotePPForRecyItem1.quantityT=1;
                                            quotePPForRecyItem1.quantityR=1;
                                            quotePPForRecyItem1.quantityA=0;

                                            $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePPForRecyItem1.itemId).success(function(QPPdata1) {

                                                var quotePP22= angular.copy(quotePPForRecyItem1);
                                                quotePP22.quantityT=parseInt(quotePP22.quantityT)+parseInt(QPPdata1[0].Quantity_Total);
                                                quotePP22.quantityA=parseInt(quotePP22.quantityA)+parseInt(QPPdata1[0].Quantity_Additional);
                                                quotePP22.quantityR=parseInt(quotePP22.quantityR)+parseInt(QPPdata1[0].Quantity_Replaced);

                                                $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP22).success(function (data) {

                                                    $http.get('crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/' + selectedRecyItem.usual_Code).success(function (installItemdata3) {

                                                        var quotePPForInstallItem1=angular.copy(quotePPForRecyItem1);
                                                        quotePPForInstallItem1.itemId=installItemdata3[0].id;
                                                        quotePPForInstallItem1.statusFlag=0;
                                                        $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePPForInstallItem1.itemId).success(function(instItemQPPdataInRec){

                                                            if(instItemQPPdataInRec.length == 0){

                                                                $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePPForInstallItem1).success(function (data) {
                                                                    console.log('well done install item saved in QPP');
                                                                    if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                        checkingVariable='done';
                                                                        $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                    }else{
                                                                        ++indexNo;
                                                                        saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                    }

                                                                });
                                                            }
                                                            else{
                                                                var quotePP4= angular.copy(quotePPForInstallItem1);
                                                                quotePP4.quantityT=parseInt(quotePP4.quantityT)+parseInt(instItemQPPdataInRec[0].Quantity_Total);
                                                                quotePP4.quantityA=parseInt(quotePP4.quantityA)+parseInt(instItemQPPdataInRec[0].Quantity_Additional);
                                                                quotePP4.quantityR=parseInt(quotePP4.quantityR)+parseInt(instItemQPPdataInRec[0].Quantity_Replaced);

                                                                $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP4).success(function (data) {
                                                                    console.log('well done install item updated in QPP');
                                                                    if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                        checkingVariable='done';
                                                                        $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                    }else{
                                                                        ++indexNo;
                                                                        saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                    }
                                                                });
                                                            }
                                                        });
                                                    });
                                                });

                                            });
                                        });

                                    });

                                });



                            }
                            /*----*/
                        });

                    }
                });
            }
            else{

                allItemsList.forEach(function(item,index) {
                    if (item.ITM == selectedRecyItem.recyItem.ITM) {
                        var exists = _.where(itemListForQPP, {itemId: item.id});

                        if(exists.length>0){

                            quotePP.itemId=item.id;
                            quotePP.quantityT=1;
                            quotePP.quantityR=1;
                            itemListForQPP.forEach(function(itemForQPP, index){
                                if(itemForQPP.itemId==item.id){
                                    itemListForQPP[index].quantityT += 1;
                                    itemListForQPP[index].quantityR +=1;
                                    $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/',itemListForQPP[index]).success(function(data){

                                        quotePPD.selectedQuoteParaProdId=data[0].QuotationParagraphProduct_id;

                                        $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', quotePPD).success(function(data){

                                            $http.get('crud/client/Quote/Catalogue/Items/fetchRecycleComponentItems/'+selectedRecyItem.usual_Code).success(function(data){

                                                var quotePPForRecyItem1=angular.copy(quotePP);
                                                quotePPForRecyItem1.itemId=data[0].id;
                                                quotePPForRecyItem1.statusFlag=0;
                                                quotePPForRecyItem1.quantityT=1;
                                                quotePPForRecyItem1.quantityR=1;
                                                quotePPForRecyItem1.quantityA=0;

                                                $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePPForRecyItem1.itemId).success(function(QPPdata1) {

                                                    var quotePP22= angular.copy(quotePPForRecyItem1);
                                                    quotePP22.quantityT=parseInt(quotePP22.quantityT)+parseInt(QPPdata1[0].Quantity_Total);
                                                    quotePP22.quantityA=parseInt(quotePP22.quantityA)+parseInt(QPPdata1[0].Quantity_Additional);
                                                    quotePP22.quantityR=parseInt(quotePP22.quantityR)+parseInt(QPPdata1[0].Quantity_Replaced);

                                                    $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP22).success(function (data) {

                                                        $http.get('crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/' + selectedRecyItem.usual_Code).success(function (installItemdata3) {

                                                            var quotePPForInstallItem1=angular.copy(quotePPForRecyItem1);
                                                            quotePPForInstallItem1.itemId=installItemdata3[0].id;
                                                            quotePPForInstallItem1.statusFlag=0;
                                                            $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePPForInstallItem1.itemId).success(function(instItemQPPdataInRec){

                                                                if(instItemQPPdataInRec.length == 0){

                                                                    $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePPForInstallItem1).success(function (data) {
                                                                        console.log('well done install item saved in QPP');
                                                                        if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                            checkingVariable='done';
                                                                            $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                        }else{
                                                                            ++indexNo;
                                                                            saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                        }

                                                                    });
                                                                }
                                                                else{
                                                                    var quotePP4= angular.copy(quotePPForInstallItem1);
                                                                    quotePP4.quantityT=parseInt(quotePP4.quantityT)+parseInt(instItemQPPdataInRec[0].Quantity_Total);
                                                                    quotePP4.quantityA=parseInt(quotePP4.quantityA)+parseInt(instItemQPPdataInRec[0].Quantity_Additional);
                                                                    quotePP4.quantityR=parseInt(quotePP4.quantityR)+parseInt(instItemQPPdataInRec[0].Quantity_Replaced);

                                                                    $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP4).success(function (data) {
                                                                        console.log('well done install item updated in QPP');
                                                                        if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                            checkingVariable='done';
                                                                            $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                        }else{
                                                                            ++indexNo;
                                                                            saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                        });
                                                    });

                                                });
                                            });

                                        });

                                    });
                                }
                            });
                        }
                        else{
                            quotePP.itemId=item.id;
                            quotePP.quantityT=1;
                            quotePP.quantityR=1;
                            itemListForQPP.push(quotePP);

                            $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/',quotePP).success(function (data) {

                                quotePPD.selectedQuoteParaProdId=data[0].QuotationParagraphProduct_id;
                                $http.post('crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', quotePPD).success(function(data){

                                    $http.get('crud/client/Quote/Catalogue/Items/fetchRecycleComponentItems/'+selectedRecyItem.usual_Code).success(function(data){
                                        var quotePPFetchItem5=angular.copy(quotePP);
                                        quotePPFetchItem5.itemId=data[0].id;
                                        quotePPFetchItem5.statusFlag=0;

                                        $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePPFetchItem5.itemId).success(function(QPPdata2) {
                                            var quotePP6= angular.copy(quotePPFetchItem5);
                                            quotePP6.quantityT=parseInt(quotePP6.quantityT)+parseInt(QPPdata2[0].Quantity_Total);
                                            quotePP6.quantityA=parseInt(quotePP6.quantityA)+parseInt(QPPdata2[0].Quantity_Additional);
                                            quotePP6.quantityR=parseInt(quotePP6.quantityR)+parseInt(QPPdata2[0].Quantity_Replaced);

                                            $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP6).success(function (data) {

                                                $http.get('crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/' + selectedRecyItem.usual_Code).success(function (installItemdata4) {

                                                    var quotePPForInstallItem7=angular.copy(quotePPFetchItem5);
                                                    quotePPForInstallItem7.itemId=installItemdata4[0].id;
                                                    quotePPForInstallItem7.statusFlag=0;
                                                    $http.get('crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/'+selectedQuoteParagraphId+'/'+quotePPForInstallItem7.itemId).success(function(instItemQPPdataInRec){

                                                        if(instItemQPPdataInRec.length == 0){

                                                            $http.post('crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', quotePPForInstallItem7).success(function (data) {
                                                                console.log('well done install item saved in QPP');
                                                                if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                    checkingVariable='done';
                                                                    $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                }else{
                                                                    ++indexNo;
                                                                    saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                }
                                                            });
                                                        }
                                                        else{
                                                            var quotePP8= angular.copy(quotePPForInstallItem7);
                                                            quotePP8.quantityT=parseInt(quotePP8.quantityT)+parseInt(instItemQPPdataInRec[0].Quantity_Total);
                                                            quotePP8.quantityA=parseInt(quotePP8.quantityA)+parseInt(instItemQPPdataInRec[0].Quantity_Additional);
                                                            quotePP8.quantityR=parseInt(quotePP8.quantityR)+parseInt(instItemQPPdataInRec[0].Quantity_Replaced);

                                                            $http.post('crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', quotePP8).success(function (data) {
                                                                console.log('well done install item updated in QPP');
                                                                if (indexNo + 1 == selectedRecyItemsList.length) {
                                                                    checkingVariable='done';
                                                                    $rootScope.$broadcast('catalogueRecyItemsSelectedList');
                                                                }else{
                                                                    ++indexNo;
                                                                    saveRecyCatLoop(indexNo, length, selectedRecyItemsList, selectedQuoteParagraphId, allItemsList, checkingVariable, itemListForQPP);
                                                                }
                                                            });
                                                        }
                                                    });
                                                });
                                            });

                                        });

                                    });



                                });

                            });
                        }
                    }
                });
            }

        }

    }
    return clientQuoteRecyCatalogueService;
});