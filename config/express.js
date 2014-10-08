'use strict';

/**
 * Module dependencies.
 */
var express = require('express'),
    consolidate = require('consolidate'),
    flash = require('connect-flash'),
    helpers = require('view-helpers'),
    config = require('./config'),
    proxit = require('proxit'),
    swig = require('swig');

module.exports = function(app) {
    app.set('showStackError', true);

    // Prettify HTML
    app.locals.pretty = true;
    // cache=memory or swig dies in NODE_ENV=production
    app.locals.cache = 'memory';

    // Use Proxit for artifact graph
    // Put this before another middleware
    app.use(proxit(config.proxit));

    // Should be placed before express.static
    // To ensure that all assets and data are compressed (utilize bandwidth)
    app.use(express.compress({
        filter: function(req, res) {
            return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
        },
        // Levels are specified in a range of 0 to 9, where-as 0 is
        // no compression and 9 is best compression, but slowest
        level: 9
    }));

    // assign the template engine to .html files
    app.engine('html', consolidate[config.templateEngine]);

    // set .html as the default extension
    app.set('view engine', 'html');

    // Set views path, template engine and default layout
    app.set('views', config.root + '/public/views');

    // Enable jsonp
    app.enable('jsonp callback');

    app.configure(function() {
        // The cookieParser should be above session
        app.use(express.cookieParser());

        // Request body parsing middleware should be above methodOverride
        app.use(express.urlencoded());
        app.use(express.json());
        app.use(express.methodOverride());

        // Dynamic helpers
        app.use(helpers(config.app.name));

        // Connect flash for flash messages
        app.use(flash());

        // Setting the fav icon and static folder
        app.use(express.favicon());
        app.use(express.static(config.root + '/public'));

        // Only use logger for development environment
        if (process.env.NODE_ENV === 'local') {
            app.use(express.logger('dev'));
            // Swig will cache templates for you, but you can disable
            // that and use Express's caching instead, if you like:
            app.set('view cache', false);
            // To disable Swig's cache, do the following:
            swig.setDefaults({
                cache: false
            });
        }

        // Routes should be at the last
        app.use(app.router);

        // Assume "not found" in the error message is a 404. this is somewhat
        // silly, but valid, you can do whatever you like, set properties,
        // use instanceof etc.
        app.use(function(err, req, res, next) {
            // Treat as 404
            if (~err.message.indexOf('not found')) return next();

            // Log it
            console.error(err.stack);

            // Error page
            res.status(500).send('500', {
                error: err.stack
            });
        });

        // Assume 404 since no middleware responded
        app.use(function(req, res) {
            res.status(404).send('404', {
                url: req.originalUrl,
                error: 'Not found'
            });
        });

    });
};
