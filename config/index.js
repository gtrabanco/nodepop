"use strict";


/**
 * Helper to load all the configuration in this directory
 * that the developers wants to load.
 */

exports.app = require('./app.config.js');
exports.express = require('./express.config.js');
exports.https = require('./server.secret.js');