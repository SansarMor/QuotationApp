"use strict"

var config = require('../../config/config');
var rechercheClient = require('../controllers/rechercheClient');

module.exports = function(app){

    /**
     * Home route is required only for ui and not for service.
     * */
        // Home route

    app.get('/crud/clients',rechercheClient.all);


    app.get('/crud/client/sites/:clientId', rechercheClient.clientSites);

    app.get('/crud/client/site/sub_sites/', rechercheClient.clientSubSites);

    app.get('/crud/client/contacts/', rechercheClient.clientContacts);

    app.post('/crud/client/site/subSite/', rechercheClient.saveSubSite);

    app.get('/crud/clients/chapter', rechercheClient.clientChapter);

    app.get('/crud/client/saveDevis/:custmerId/:devisType', rechercheClient.saveQuote);

    app.get('/crud/client/Quote/saveQuoteParagraph/:selectedQuote/:selectedSite/:selectedSubSite/:paragraphDes', rechercheClient.saveQuoteParagraph);

    app.get('/crud/client/Quote/Panier/:selectedQuote', rechercheClient.fetchPanier);

}