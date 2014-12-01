"use strict"

var config = require('../../config/config');
var admin = require('../controllers/admin');

module.exports = function(app){

    app.get('/crud/admin/fetchAllEmployee/', admin.fetchAllEmployee);
    app.post('/crud/admin/registerEmployee/', admin.registerEmployee);
    app.get('/crud/admin/fetchAllUsers/', admin.fetchAllUsers);
    app.post('/crud/admin/registerRole/', admin.registerRole);
    app.get('/crud/admin/fetchAllRoles/', admin.fetchAllRoles);
    app.post('/crud/admin/roles/userRoles/saveUserRoles/:selectedUserId', admin.saveUserRoles);
}