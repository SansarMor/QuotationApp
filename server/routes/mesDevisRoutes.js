"use strict"

var config = require('../../config/config');
var mesDevis = require('../controllers/mesDevis');

module.exports = function(app){

    app.get('/crud/mesDevisList/', mesDevis.getAllQuotationList);
}