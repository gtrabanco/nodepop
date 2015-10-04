"use strict";

/**
 * Read the configuration file and exports the configuration
 * this is used to have more securely the passwords and
 * certs in order to not distribute them with our code.
 *
 * This
 * @module lib/config
 */


var fs = require('fs');
var path = require('path');


//The config file we want to load
var config = require(path.join(__dirname, '..', 'config'));

//Now we are going to replace the key and cert with the files content
if (typeof config.https !== 'undefined' && config.https.activate) {

    if (typeof config.https.passphrase !== 'undefined' && config.https.passphrase.length === 0) {
        delete config.https.passphrase;
    }

    config.https.key = fs.readFileSync(path.join(__dirname, '..', config.https.key));
    config.https.cert = fs.readFileSync(path.join(__dirname, '..', config.https.cert));
}


module.exports = config;