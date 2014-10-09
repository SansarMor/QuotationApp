"use strict"

var config = require('../../config/config');
var rechercheClient = require('../controllers/rechercheClient');

module.exports = function(app){

    /**
     * Home route is required only for ui and not for service.
     * */
        // Home route
    app.get('/', function(req, res) {
        /*res.render('index', config.app);*/
        res.render('index', config.app);
    });

    app.get('/crud/clients',rechercheClient.all);

}