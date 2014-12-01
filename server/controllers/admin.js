'use strict';

/**
 * Module dependencies.
 */
var mssql=require('./mssql');

exports.fetchAllEmployee=function(req, res){

    var sqlQuery='SELECT * from Employee';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
}

exports.registerEmployee=function(req, res){

    var sqlQuery='insert into users (User_Employee_AN8, StatusFlag) VALUES ('+req.body.AN8+',0)';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.send('ok, employee registered successfully');
    });
}

exports.fetchAllUsers=function(req, res){
    var sqlQuery='SELECT * from users';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
}

exports.registerRole=function(req, res){

    var sqlQuery="insert into Roles (Name, Description) VALUES ('"+req.body.name+"','"+req.body.description+"')";
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.send('ok, role registered successfully');
    });
}

exports.fetchAllRoles=function(req, res){

    var sqlQuery='SELECT * from Roles';
    new mssql.SqlConnection(sqlQuery, function(data) {
        res.jsonp(data);
    });
}

exports.saveUserRoles=function(req, res){
    console.log(req.params.selectedUserId);
    var selectedUserRolesList=req.body;
    var i=0;
    selectedUserRolesList.forEach(function(selectedUserRole, index){
        var sqlQuery="insert into Userroles (User_id, Role_id) VALUES ("+req.params.selectedUserId+","+selectedUserRole.Role_id+")";
        new mssql.SqlConnection(sqlQuery, function(data) {

            if(i+1==selectedUserRolesList.length) {
                res.send('ok, role registered successfully');
            }else{
                i++;
            }
        });
    })
}