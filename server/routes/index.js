"use strict"

var config = require('../../config/config');
var user = require('../controllers/user');

module.exports = function(app){

    /**
     * Home route is required only for ui and not for service.
     * */
        // Home route
    app.get('/', function(req, res) {
        /*res.render('index', config.app);*/
    	res.render('login', config.app);
    });
    
    app.get('/crud/users',user.create);

}