/**
 * Connector to database to use it as singleton
 *
 * You should require this file in the app.js and pass an
 *  argument to the created function which is the express
 *  function to get the app database configuration.
 */


"use strict";

//Requesting the lib
let mongoose = require('mongoose');

//Reading the config
//we do this because in node all modules/files are loaded
// once, so it does not suppose a real extra memory. But the
// thing that matters is we need the configuration and
// we are not in the app main program right now, we
// will request the connection only in the files that the
// connection is essential
let config = require('readConfigurationFiles');

let db = mongoose.connection;

db.once('open', function () {
    console.info('Connected to the database');
});

db.on('error', function (error) {
    console.error('Registered the next error with the database: ', error);
});


mongoose.connect(config.db.connectionString);


module.exports = mongoose;
