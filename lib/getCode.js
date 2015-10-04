/**
 * Function to create a valid json response
 * throught the codes
 */

"use strict";

//Load the codes
var codes = require('../locales/messageCodes');

//Load the "mixin" function
var mixin = require('mixin');

/**
 * Return a code or a default error to reply
 * in the api
 * @param code String
 * @param data Any json data to give the user
 */
function getCode (code, data) {
    let result;

    //Check if the code exists
    if (!(code in codes)) {
        //If the code does not exists we try to look for
        // the default code "ERROR"

        //If error is passes but does not exists we
        // create a default error
        if (code === 'ERROR') {
            result = {
                status: 500,
                message: 'Unrecognized error',
                code: 'ERROR',
                data: data || {}
            }
        } else {
            //If the code is not error, try to return
            // "ERROR" as default code, perhaps it is
            // in the messageCodes.js file...
            return getCode('ERROR', data);
        }
    } else {

        result = mixin(codes[code], {
            code: code,
            data: data || {}
        });
    }

    return result;
};


module.exports = getCode;

