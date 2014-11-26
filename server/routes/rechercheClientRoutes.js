"use strict"

var config = require('../../config/config');
var rechercheClient = require('../controllers/rechercheClient');

module.exports = function(app){

    /**
     * Home route is required only for ui and not for service.
     * */
        // Home route

    app.get('/quotationApp/createDatabaseConnection/', rechercheClient.createDatabaseConnection);

    app.get('/crud/clients',rechercheClient.all);

    app.get('/crud/client/devis/:clientId', rechercheClient.getAllClientQuotes);

    app.get('/crud/client/sites/:clientId', rechercheClient.clientSites);

    app.get('/crud/client/site/sub_sites/', rechercheClient.clientSubSites);

    app.get('/crud/client/contacts/', rechercheClient.clientContacts);

    app.post('/crud/client/site/subSite/', rechercheClient.saveSubSite);

    app.get('/crud/clients/chapter', rechercheClient.clientChapter);

    app.get('/crud/client/saveDevis/:custmerId/:devisType', rechercheClient.saveQuote);

    app.get('/crud/client/Quote/saveQuoteParagraph/:selectedQuote/:selectedSite/:selectedSubSite/:paragraphDes', rechercheClient.saveQuoteParagraph);

    app.get('/crud/client/Quote/Panier/:selectedQuote', rechercheClient.fetchPanier);

    app.get('/crud/client/Quote/deleteQuoteParagraph/:selectedQuotePara', rechercheClient.deleteQuoteParagraph);

    app.post('/crud/client/Quote/updateQuoteParaDescription/:quoteParaId/:quoteParaDesc', rechercheClient.updateQuoteParaDescription);

    app.get('/crud/client/Quote/Catalogue/Category/:selectedDevisType', rechercheClient.getCategories);

    app.get('/crud/client/Quote/Catalogue/family/:selectedDevisType', rechercheClient.getFamilies);

    app.get('/crud/client/Quote/Catalogue/subFamily/:selectedDevisType', rechercheClient.getSubFamilies);

    app.get('/crud/client/Quote/Catalogue/items/', rechercheClient.getItemList);

    app.get('/crud/client/Quote/Catalogue/Items/byFamily/:familyKY', rechercheClient.getCategoryByFamily);

    app.get('/crud/client/Quote/Catalogue/Items/Family/bySubFamily/:subFamilyXY', rechercheClient.getFamilyBySubFamily);

    app.get('/crud/client/Quote/Catalogue/Items/componentItems/:item_usual_code', rechercheClient.getComponentItems);

    app.get('/crud/client/Quote/Catalogue/Items/fetchInstallComponentItems/:item_usual_code', rechercheClient.fetchInstalledComponentItem);

    app.get('/crud/client/Quote/Catalogue/Items/fetchRecycleComponentItems/:item_usual_code', rechercheClient.fetchRecycleComponentItem);

    app.get('/crud/client/Quote/recyCatalogue/items/:LANOValue', rechercheClient.fetchRecycleItemsList);

    app.get('/crud/client/Quote/Catalogue/allItems/', rechercheClient.getAllItemsList);

    app.get('/crud/client/Quote/Catalogue/getQPPByItemIdAndQPId/:selectedQPId/:selectedItemId', rechercheClient.getQPPByItemIdAndQPId);

    app.post('/crud/client/Quote/Catalogue/saveQuoteParagraphProduct/', rechercheClient.saveQuotationParagraphProduct);

    app.post('/crud/client/Quote/Catalogue/updateQuoteParagraphProduct/', rechercheClient.updateQuotationParagraphProduct);

    app.get('/crud/client/Quote/deleteQuoteParaProduct/:selectedQPPId', rechercheClient.deleteQuoteParaProduct);

    app.get('/crud/client/Quote/paragraph/allQuoteParaProduct/', rechercheClient.getAllQuoteParaProducts);

    app.post('/crud/client/Quote/Catalogue/QuoteParagraphProduct/saveQuoteParagraphProductDetail/', rechercheClient.saveQuotationParagraphProductDetail);

    app.post('/crud/client/Quote/Catalogue/QuoteParagraphProduct/updateQuoteParagraphProductDetail/', rechercheClient.updateQuoteParaProdDetail);

    app.get('/crud/client/Quote/Catalogue/QuoteParagraphProductDetail/fetchValuesFromQPPDByQuotePPId/:selectedQuotPPId', rechercheClient.fetchValuesFromQPPDByQuotePPId);

}