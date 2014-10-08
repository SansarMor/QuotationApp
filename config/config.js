'use strict';

// Utilize Lo-Dash utility library
var _ = require('lodash'),
    pathExtra = require('path-extra'),
    fs = require('fs');

var userConfigFileName = pathExtra.homedir() + '/QuotationApp-' + process.env.NODE_ENV + '.json',
    envConfigFileName = __dirname + '/../config/env/' + process.env.NODE_ENV + '.js',
    userConfig = fs.existsSync(userConfigFileName) ? require(userConfigFileName) : {},

    // Extend the base configuration in all.js with environment
    // specific configuration
    config = _.extend(
        require(__dirname + '/../config/env/all.js'),
        fs.existsSync(envConfigFileName) ? require(envConfigFileName) : {},
        userConfig
    );

delete config.db;
module.exports = config;
