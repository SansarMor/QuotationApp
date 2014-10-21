'use strict';

/**
 * Module dependencies.
 */
var mssql=require('./mssql');

/*Load all client list*/
exports.all = function(req, res) {

    var sqlQuery='SELECT * from customer';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
};

/*Load client all sites*/
exports.clientSites= function(req, res){
    var sqlQuery='select * from site where PA8='+req.params.clientId;

    new mssql.SqlConnection(sqlQuery, function(data){
       res.jsonp(data);
    });
};

/*Load client all contacts*/
exports.clientContacts= function(req, res){
    var sqlQuery='select * from contact';

    new mssql.SqlConnection(sqlQuery, function(data){
        var sqlQuery1='select * from media where ';
        res.jsonp(data);
    });
};

exports.saveSubSite=function(req, res){

    console.log('site id is : '+req.body.Site_Id);
    console.log('sub site name is : '+req.body.MLNM);

    var mlnmValue=req.body.MLNM;

    var sqlQuery='INSERT INTO sub_site (Site_Id, MLNM) VALUES ('+req.body.Site_Id+' , 12345)';

    new mssql.SqlConnection(sqlQuery, function(data){
        console.log('inside sub site query success function : ');
        res.jsonp();
    });
}