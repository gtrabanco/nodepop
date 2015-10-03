/**
 * Authentication check middleware to make it simple and do
 * it when you really need it
 */

"use strict";

//Requiring the jsonwebtoken lib
var jswt = require('jsonwebtoken');

//Lib to get the codes that return the api
var getCode = require('getCode');

module.exports = function(req, res, next) {

    //Get the jswt configuration
    let jswtConfig = req.app.get('app config').jswt;

    //Get the token
    let token = request.body.token ||
        request.query.token ||
        request.headers['x-access-token'];

    jswt.verify(token, jswtConfig.secret, function(err, token) {

        let response = {};

        if (err) {

            response = {
                code: 'TOKEN_ERROR',
                data: {}
            };

            if (err.name.toLowerCase() === 'tokenexpirederror') {
                response.data = {
                    token: "Expired"
                }
            }

            return next(response);
        }

        req.mytoken = token;

        return next();
    });
};