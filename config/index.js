"use strict";


/**
 * Helper to load all the configuration in this directory
 * that the developers wants to load.
 */

let secret = require('./server.secret.js');

exports.app = require('./app.config.js');
exports.express = require('./express.config.js');
exports.https = secret.https;
exports.db = secret.databse;