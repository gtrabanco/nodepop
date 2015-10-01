"use strict";

var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var httpForbidden = require('httpForbidden');
var i18n = require('i18n-2');


var app = express();


//Set the application root path to make sure we are using well the paths
//Maybe we need it, maybe we not
app.set('app path', __dirname);


//Get and set the configuration of the site
var config = require('readConfigurationFiles');
app.set('app config', config);

//Internalization of the app
//Setting the dev or not mode
config.app.language.devMode = app.get('env').toLowerCase() === 'development';

//Registering i18n module
i18n.expressBind(app, config.app.language);

//Using our custom middleware to check if we are and should be in https connection
app.use(httpForbidden);

//Setup the express configuration
for (let key in config.express) {
    console.info('Setting the var "%s" to "%s"', key, config.express[key]);

    if (key === "logger") {
        app.use(logger(config.express[key]));
    } else {
        app.set(key, config.express[key]);
    }
}


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

//Load the static files
for (let dir in config.app['serve-static']) {
    console.log('Adding the static dir "%s" with the options: ', dir, config.app['serve-static'][dir]);
    app.use(express.static(path.join(__dirname, dir), config.app['serve-static'][dir]));
}


//Loading the routes/index.js for all routes
//The routes must be especified in the controllers
// not the flow control of the application
var routes = require('./routes');
app.use('/', routes);

module.exports = app;
