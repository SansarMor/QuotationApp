'use strict';

/**
 * Module dependencies.
 */
var mssql=require('./mssql');

exports.all = function(req, res) {

    var sqlQuery='SELECT * from client';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
};