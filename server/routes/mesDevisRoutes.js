"use strict"

var config = require('../../config/config');
var rechercheClient = require('../controllers/rechercheClient');

module.exports = function(app){

    app.get('/crud/mesDevisList/', rechercheClient.getAllQuotationList);
}